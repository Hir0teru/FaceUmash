import { generateUniqueRandomNumbers } from '../db'

describe('Test for api/db.ts', () => {
  let randomSpy: jest.SpyInstance<number, []>

  beforeEach(() => {
    randomSpy = jest.spyOn(Math, 'random')
  })

  afterEach(() => {
    randomSpy.mockRestore()
  })

  test('should generate unique random numbers with the same input and output for each test', () => {
    const mockRandomValues: number[] = [0.1, 0.5, 0.3, 0.8, 0.6, 0.2, 0.9, 0.4, 0.7, 0.0]
    randomSpy.mockImplementation(() => mockRandomValues.shift() as number)

    const max: number = 10
    const len: number = 5
    const expectedResult: number[] = [1, 5, 3, 8, 6]

    expect(generateUniqueRandomNumbers(max, len)).toEqual(expectedResult)
  })

  test('should throw an error when the range is too small to generate unique random numbers', () => {
    expect(() => generateUniqueRandomNumbers(3, 5)).toThrow(
      'The range is too small to generate unique random numbers.',
    )
  })
})
