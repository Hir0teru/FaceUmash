import type { NextApiRequest, NextApiResponse } from 'next'
const admin = require('firebase-admin')
const { cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert({
          projectId: process.env.PROJECT_ID || '',
          privateKey: process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n') : '',
          clientEmail: process.env.CLIENT_EMAIL || '',
        }),
      })
    }
    if (req.method === 'GET') {
      const db = getFirestore()
      const snapshot = await db.collection('develop').doc('ZVP3ieLUu9RTLQN8vkIe').get()
      if (snapshot.exists) {
        const data = snapshot.data()
        if (data && data.characters) {
          const selected: string = (req.query?.selected as string) || ''
          // TODO:Refactor validation process to make it reusable

          if (selected.match(/^00([0-7][0-9]|8[0-8])$/)) {
            const characters = generateUniqueRandomNumbers(
              data.characters.length - 1,
              Number(process.env.NEXT_PUBLIC_POOL),
              parseInt(selected, 10),
            ).map((index) => data.characters[index])
            res.status(200).json(characters)
          } else {
            const characters = generateUniqueRandomNumbers(
              89,
              Number(process.env.NEXT_PUBLIC_POOL),
            ).map((index) => data.characters[index])
            res.status(200).json(characters)
          }
        } else {
          res.status(404).json({ message: 'Characters not found' })
        }
      } else {
        res.status(404).json({ message: 'Document not found' })
      }
    }
  } catch (exception: unknown) {
    res.status(400).json({ exception })
  }
}

export const generateUniqueRandomNumbers = (
  max: number,
  len: number,
  selectedId: number = -1,
): number[] => {
  if (max < len - 1) {
    throw new Error('The range is too small to generate unique random numbers.')
  }

  const numbers: Set<number> = new Set()
  if (selectedId !== -1) numbers.add(selectedId)

  while (numbers.size < len) {
    const randomNumber = Math.floor(Math.random() * (max + 1))
    numbers.add(randomNumber)
  }

  return Array.from(numbers)
}
