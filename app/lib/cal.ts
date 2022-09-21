import { Character, Points } from '../interfaces'

export const getResult = (
  winner: Character,
  loser: Character,
): { winner: Character; loser: Character } => {
  try {
    return { winner: calElorate(winner, loser, 1), loser: calElorate(loser, winner, 0) }
  } catch (e) {
    throw e
  }
}

// イロレート = レート + K × (勝ち点 - 勝利確率)
// イロレートは小数点第一位を四捨五入する
export const calElorate = (target: Character, compared: Character, points: Points): Character => {
  try {
    const { rate: targetRate, id, name } = target
    const { rate: comparedRate } = compared
    // Kの値は16か32のどちらか。今回は16を採用する。
    const K: number = 16
    const winProbability: number = calWinProbability(targetRate, comparedRate)
    const rate: number = Math.round(targetRate + K * (points - winProbability))
    return { id, name, rate }
  } catch (e) {
    throw e
  }
}

// 勝利確率を計算する
export const calWinProbability = (targetRate: number, comparedRate: number): number => {
  try {
    return 1 / (1 + Math.pow(10, (comparedRate - targetRate) / 400))
  } catch (e) {
    throw e
  }
}
