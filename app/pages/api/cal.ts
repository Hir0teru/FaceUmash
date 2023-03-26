import { Ratings, WinPoint } from '../../interfaces'

export const getRatings = (winnerRating: number, loserRating: number): Ratings => {
  return {
    winnerRating: calElorating(winnerRating, loserRating, true),
    loserRating: calElorating(loserRating, winnerRating, false),
  }
}

// イロレーティングを算出する
export const calElorating = (
  targetRating: number,
  comparedRating: number,
  isWinner: boolean,
): number => {
  const point: WinPoint = isWinner ? 1 : 0
  // Kの値は16か32のどちらか。今回は16を採用する。
  const K: number = 16
  const winProbability: number = calWinProbability(targetRating, comparedRating)
  const rating: number = Math.round(targetRating + K * (point - winProbability))
  return rating
}

// イロレーティングで使用する勝利確率を算出する
export const calWinProbability = (targetRate: number, comparedRate: number): number => {
  return 1 / (1 + Math.pow(10, (comparedRate - targetRate) / 400))
}
