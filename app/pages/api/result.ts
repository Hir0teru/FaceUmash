import {
  getFirestore,
  doc,
  getDoc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
} from '@firebase/firestore'
import { FirebaseApp, initializeApp } from '@firebase/app'
import type { NextApiRequest, NextApiResponse } from 'next'

const config = {
  projectId: process.env.PROJECT_ID || '',
  privateKey: process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n') : '',
  clientEmail: process.env.CLIENT_EMAIL || '',
}

const app: FirebaseApp = initializeApp(config)

/**
 * API handler for fetching the latest rankings.
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({
        error: {
          message: `Method ${req.method} Not Allowed`,
          statusCode: 405,
        },
      })
      return
    }

    const {
      query: { id },
    } = req

    if (typeof id !== 'string') {
      res.status(404).json({
        error: {
          message: 'Resource is not found',
          statusCode: 404,
        },
      })
      return
    }

    const docRef: DocumentReference<DocumentData> = await doc(
      getFirestore(app),
      'characters',
      id as string,
    )
    const docSnapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef)
    if (docSnapshot.exists()) {
      res.status(200).json({ result: docSnapshot.data() })
    } else {
      res.status(404).json({
        error: {
          message: 'Resource is not found',
          statusCode: 404,
        },
      })
    }
  } catch (e: any) {
    res.status(500).json({
      error: {
        message: e.message,
        statusCode: 500,
      },
    })
  }
}
