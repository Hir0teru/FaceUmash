import { getShardRefById, aggregateShards, updateRating, calNewCount } from '../rating'

describe('Test for api/rating.ts', () => {
  test('calNewCount test', () => {
    expect(calNewCount(300, 2004, 2000)).toEqual(304)
  })
})
