import { getRatings, calElorating, calWinProbability } from '../cal'

describe('Test for api/cal.ts', () => {
  test('calWinProbability test with rate difference 50 won', () => {
    expect(calWinProbability(1550, 1500)).toBe(0.5714631174083814)
  })

  test('calWinProbability test with rate difference 50 lose', () => {
    expect(calWinProbability(1500, 1550)).toBe(0.4285368825916186)
  })

  test('calWinProbability test with same rate', () => {
    expect(calWinProbability(1500, 1500)).toBe(0.5)
  })

  test('calElorating test with rate difference 200 won', () => {
    expect(calElorating(2000, 1800, true)).toEqual(2004)
  })

  test('calElorating test with rate difference 200 lose', () => {
    expect(calElorating(2000, 1800, false)).toEqual(1988)
  })

  test('calElorating test with same rate won', () => {
    expect(calElorating(2000, 2000, true)).toEqual(2008)
  })

  test('calElorating test with same rate lose', () => {
    expect(calElorating(2000, 2000, false)).toEqual(1992)
  })

  test('getRatings test', () => {
    expect(getRatings(2000, 2000)).toEqual({ winnerRating: 2008, loserRating: 1992 })
  })
})
