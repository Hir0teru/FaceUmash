import { Timestamp } from '@firebase/firestore'

export type Character = {
  id: string
  name: string
  url: string
}

export type Pool = {
  characters: Character[]
  rest: Character[]
}

export type Ratings = {
  winnerRating: number
  loserRating: number
}

export type WinPoint = 0 | 1

export type Ranking = {
  createdAt: Timestamp
  ranking: {
    id: string
    name: string
    rating: number
  }[]
}
