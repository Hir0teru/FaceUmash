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
