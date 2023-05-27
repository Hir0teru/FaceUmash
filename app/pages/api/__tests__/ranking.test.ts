import handler, { createBodyFromRanking, timeStampToMMDDyymm } from '../ranking'
import { Timestamp } from '@firebase/firestore'
import { Timestamp as ts } from 'firebase-admin/firestore' // Constructors
import type { NextApiRequest, NextApiResponse } from 'next'
import { Ranking } from '../../../interfaces'

jest.mock('@firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      docs: [
        {
          data: () => ({
            createdAt: new ts(1672531200, 0) as Timestamp,
            ranking: [
              { id: '0000', name: 'test1', rating: 1500 },
              { id: '0001', name: 'test2', rating: 1700 },
            ],
          }),
        },
      ],
    })
  }),
  query: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
}))

describe('Test for api/ranking', () => {
  test('responds with 405 for POST requests', async () => {
    const req = {
      method: 'POST',
      query: {},
      cookies: {},
      body: '',
      env: {},
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse

    await handler(req, res)

    expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed.' })
    expect(res.status).toHaveBeenCalledWith(405)
  })

  test('handles exceptions', async () => {
    const req = {
      method: 'GET',
      query: {},
      cookies: {},
      body: '',
      env: {},
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse

    const error = new Error('test error')
    jest.spyOn(console, 'error').mockImplementation(() => {})

    jest.requireMock('@firebase/firestore').getDocs.mockRejectedValue(error)

    await handler(req, res)

    expect(res.json).toHaveBeenCalledWith({ message: error.message })
    expect(res.status).toHaveBeenCalledWith(500)
  })

  test('transforms the raw ranking object into a formatted object', () => {
    const ranking: Ranking = {
      createdAt: new ts(1672531200, 0) as Timestamp,
      ranking: [
        { id: '0000', name: 'test1', rating: 1500 },
        { id: '0001', name: 'test2', rating: 1700 },
      ],
    }

    const result = createBodyFromRanking(ranking)

    expect(result).toEqual({
      createdAt: '01/01 00:00',
      ranking: [
        { id: '0000', name: 'test1', rank: 1, image: '/test1.png' },
        { id: '0001', name: 'test2', rank: 2, image: '/test2.png' },
      ],
    })
  })

  test('converts a Firebase Timestamp to a formatted string (MM/DD hh:mm)', () => {
    const timestamp: Timestamp = new ts(1704024000, 0) as Timestamp
    const result = timeStampToMMDDyymm(timestamp)
    expect(result).toEqual('12/31 12:00')
  })
})
