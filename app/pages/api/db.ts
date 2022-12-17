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
      const { characters } = snapshot.data()
      res.status(200).json(characters)
    }
  } catch (exception: unknown) {
    res.status(400).json({ exception })
  }
}
