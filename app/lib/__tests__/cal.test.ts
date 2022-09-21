import { getResult, calWinProbability, calElorate } from '../cal'

describe('cal.ts test', () => {
  const MejiroDober = { id: 1, name: 'メジロドーベル', rate: 2000 }
  const MihonoBourbon = { id: 2, name: 'ミホノブルボン', rate: 2000 }
  const MejiroArdan = { id: 3, name: 'メジロアルダン', rate: 1800 }

  test('calWinProbability test with rate difference 50 won', () => {
    expect(calWinProbability(1550, 1500)).toBe(0.5714631174083814)
  })

  test('calWinProbability test with rate difference 50 lose', () => {
    expect(calWinProbability(1500, 1550)).toBe(0.4285368825916186)
  })

  test('calWinProbability test with same rate', () => {
    expect(calWinProbability(1500, 1500)).toBe(0.5)
  })

  test('calElorate test with rate difference 200 won', () => {
    expect(calElorate(MejiroDober, MejiroArdan, 1)).toEqual({ ...MejiroDober, rate: 2004 })
  })

  test('calElorate test with rate difference 200 lose', () => {
    expect(calElorate(MejiroDober, MejiroArdan, 0)).toEqual({ ...MejiroDober, rate: 1988 })
  })

  test('calElorate test with same rate won', () => {
    expect(calElorate(MejiroDober, MihonoBourbon, 1)).toEqual({ ...MejiroDober, rate: 2008 })
  })

  test('calElorate test with same rate lose', () => {
    expect(calElorate(MejiroDober, MihonoBourbon, 0)).toEqual({ ...MejiroDober, rate: 1992 })
  })

  test('getResult test', () => {
    const winner = { ...MejiroArdan, rate: 1812 }
    const loser = { ...MejiroDober, rate: 1988 }
    expect(getResult(MejiroArdan, MejiroDober)).toEqual({ winner, loser })
  })
})
