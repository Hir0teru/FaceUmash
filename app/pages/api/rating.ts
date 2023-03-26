import {
  Firestore,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  Transaction,
} from '@google-cloud/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getRatings } from './cal'
const admin = require('firebase-admin')
const { cert } = require('firebase-admin/app')

/**
 * API for updating the ratings of two characters.
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert({
        projectId: process.env.PROJECT_ID || '',
        privateKey: process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n') : '',
        clientEmail: process.env.CLIENT_EMAIL || '',
      }),
    })
  }
  const db: Firestore = admin.firestore()
  const NUM_SHARDS: number = 5

  const winnerId: string = req.query.winnerId as string
  const loserId: string = req.query.loserId as string

  if (!winnerId || !loserId) {
    res.status(400).json({ message: 'winnerId and loserId are required' })
    return
  }

  const getShardRefByIdWithNumShards = getShardRefById(db)('ratings')('shards')(NUM_SHARDS)
  const winnerRef: DocumentReference = getShardRefByIdWithNumShards(winnerId)
  const loserRef: DocumentReference = getShardRefByIdWithNumShards(loserId)

  try {
    await db.runTransaction(async (transaction: Transaction) => {
      const winner: DocumentSnapshot = await transaction.get(winnerRef)
      const loser: DocumentSnapshot = await transaction.get(loserRef)

      if (!winner.exists || !loser.exists) {
        throw new Error('Document does not exist')
      }

      const oldWinnerRating: number = await aggregateShards(transaction, winnerId, db)
      const oldLoserRating: number = await aggregateShards(transaction, loserId, db)

      const { winnerRating: newWinnerRating, loserRating: newLoserRating } = getRatings(
        oldWinnerRating,
        oldLoserRating,
      )

      const oldWinnerCount: number = winner.data()?.count
      const oldLoserCount: number = loser.data()?.count

      if (oldWinnerCount === undefined || oldLoserCount === undefined) {
        throw new Error('Count is not defined')
      }

      await updateRating(
        transaction,
        winnerRef,
        calNewCount(oldWinnerCount, newWinnerRating, oldWinnerRating),
      )
      await updateRating(
        transaction,
        loserRef,
        calNewCount(oldLoserCount, newLoserRating, oldLoserRating),
      )

      // TODO:improve request body
      res.status(200).json({ message: 'sucess' })
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * Returns a shard reference by Character ID.
 * @param {Firestore} db - The Firestore instance.
 * @param {string} ratings - The ratings collection name.
 * @param {string} shards - The shards collection name.
 * @param {number} numShards - The number of shards.
 * @param {string} id - The character ID.
 * @returns {DocumentReference} - The reference to the shard.
 */
const getShardRefById =
  (db: Firestore) =>
  (ratings: string) =>
  (shards: string) =>
  (numShards: number) =>
  (id: string): DocumentReference => {
    return db
      .collection(ratings)
      .doc(id)
      .collection(shards)
      .doc(String(Math.floor(Math.random() * numShards)))
  }

/**
 * Aggregates the count of all shards for a given character ID.
 * @param {Transaction} transaction - The Firestore transaction.
 * @param {string} id - The character ID.
 * @param {Firestore} db - The Firestore instance.
 * @returns {Promise<number>} - The aggregated count.
 */
const aggregateShards = async (
  transaction: Transaction,
  id: string,
  db: Firestore,
): Promise<number> => {
  const shardsRef: CollectionReference = db.collection('ratings').doc(id).collection('shards')
  const shardsSnapshot = await transaction.get(shardsRef)

  return shardsSnapshot.docs.reduce((total: number, shard: DocumentSnapshot) => {
    const shardData = shard.data()
    if (!shardData) throw new Error('Shard is undefined')
    return total + shardData.count
  }, 0)
}

/**
 * Updates the rating count of a given document reference.
 * @param {Transaction} transaction - The Firestore transaction.
 * @param {DocumentReference} docRef - The document reference to update.
 * @param {number} count - The new count to set.
 * @returns {Promise<void>} - A Promise that resolves when the update is complete.
 */
const updateRating = async (
  transaction: Transaction,
  docRef: DocumentReference,
  count: number,
): Promise<void> => {
  transaction.update(docRef, {
    count,
  })
}

/**
 * Calculates the new count based on the old and new ratings.
 * @param {number} count - The old count.
 * @param {number} newRating - The new rating.
 * @param {number} oldRating - The old rating.
 * @returns {number} - The calculated new count.
 */
const calNewCount = (count: number, newRating: number, oldRating: number): number => {
  return count + newRating - oldRating
}
