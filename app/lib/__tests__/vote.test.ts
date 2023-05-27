import type { Character } from '../../interfaces'
import { generatePool } from '../vote'

describe('Test for lib/vote.ts', () => {
  test('generatePool with a selected character', () => {
    const characters: Character[] = [
      { id: '0002', name: 'test3', url: 'test3.com' },
      { id: '0001', name: 'test2', url: 'test2.com' },
      { id: '0000', name: 'test1', url: 'test1.com' },
    ]
    const selectedCharacter: Character = { id: '0003', name: 'test4', url: 'test4.com' }

    const pool = generatePool(characters, selectedCharacter)

    expect(pool.characters.length).toBe(2)
    expect(pool.characters[0]).toEqual(selectedCharacter)
    expect(pool.characters[1]).toEqual(characters[0])
    expect(pool.rest.length).toBe(2)
    expect(pool.rest).toEqual(expect.arrayContaining([characters[1], characters[2]]))
  })

  test('generatePool without a selected character', () => {
    const characters: Character[] = [
      { id: '0002', name: 'test3', url: 'test3.com' },
      { id: '0001', name: 'test2', url: 'test2.com' },
      { id: '0000', name: 'test1', url: 'test1.com' },
    ]

    const pool = generatePool(characters)

    expect(pool.characters.length).toBe(2)
    expect(pool.characters).toEqual(expect.arrayContaining([characters[0], characters[1]]))
    expect(pool.rest.length).toBe(1)
    expect(pool.rest).toEqual(expect.arrayContaining([characters[2]]))
  })
})
