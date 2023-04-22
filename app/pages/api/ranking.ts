import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  CollectionReference,
  DocumentData,
  Query,
  QuerySnapshot,
  Timestamp,
} from '@firebase/firestore'
import { FirebaseApp, initializeApp } from '@firebase/app'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Ranking } from '../../interfaces'

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
      res.status(405).json({ message: 'Method not allowed.' })
      return
    }
    const collectionRef: CollectionReference<DocumentData> = collection(
      getFirestore(app),
      'ranking',
    )
    const q: Query<DocumentData> = query(collectionRef, orderBy('createdAt', 'desc'), limit(1))
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(q)
    let result: Ranking = {
      createdAt: Timestamp.now(),
      ranking: [],
    }
    snapshot.forEach((doc) => {
      result = doc.data() as Ranking
    })
    res.status(200).json({ result: createBodyFromRanking(result) })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Transforms the raw ranking object into a formatted object suitable for the response body.
 * @param {Ranking} result - The raw ranking object.
 * @returns {{
 *   createdAt: string,
 *   ranking: {
 *     id: string,
 *     rank: number,
 *     name: string,
 *     image: string,
 *   }[]
 * }} - The formatted ranking object containing createdAt timestamp and an array of ranking items with id, rank, name, and image.
 */
export const createBodyFromRanking = (
  result: Ranking,
): {
  createdAt: string
  ranking: {
    id: string
    name: string
  }[]
} => {
  const {
    createdAt,
    ranking,
  }: {
    createdAt: Timestamp
    ranking: {
      id: string
      name: string
    }[]
  } = result

  return {
    createdAt: timeStampToMMDDyymm(createdAt),
    ranking: ranking.map((value, index) => {
      const {
        id,
        name,
      }: {
        id: string
        name: string
      } = value

      return {
        id,
        rank: index + 1,
        name,
        image: `/${name}.png`,
      }
    }),
  }
}

/**
 * Converts a Firebase Timestamp to a formatted string (MM/DD hh:mm).
 * @param {Timestamp} timestamp - The Firebase Timestamp object.
 * @returns {string} - The formatted date string in the format of "MM/DD hh:mm".
 */

export const timeStampToMMDDyymm = (timestamp: Timestamp): string => {
  const date: Date = timestamp.toDate()

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${month}/${day} ${hours}:${minutes}`
}
