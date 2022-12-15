import { characters } from '../../__mocks__/db'
import type { Character, Pool } from '../../interfaces'
import { generatePool, generateNumbers, generateRandomNumbers, shuffle } from '../vote'
process.env.NEXT_PUBLIC_POOL = '15'

describe('Test for vote.ts', () => {
  test('generateNumbersのテスト:引数が0以下', () => {
    const len: number = 0
    const expected: number[] = []
    const result: number[] = generateNumbers(len)
    expect(result).toEqual(expected)
    expect(result).toHaveLength(len)
  })

  test('generateNumbersのテスト:引数が0より大きい', () => {
    const len: number = 5
    const expected: number[] = [0, 1, 2, 3, 4]
    const result: number[] = generateNumbers(len)
    expect(result).toEqual(expected)
    expect(result).toHaveLength(len)
  })

  test('shuffleのテスト:シャッフルあり', () => {
    const spyRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5)
    const input: number[] = [0, 1, 2, 3, 4]
    const expected: number[] = [0, 3, 1, 4, 2]
    const result: number[] = shuffle(input)
    spyRandom.mockRestore()
    expect(result).toEqual(expected)
  })

  test('shuffleのテスト:シャッフルなし', () => {
    const spyRandom = jest.spyOn(Math, 'random').mockReturnValue(0.9)
    const input: number[] = [0, 1, 2, 3, 4]
    const result: number[] = shuffle(input)
    spyRandom.mockRestore()
    expect(result).toEqual(input)
  })

  test('generateRandomNumbersのテスト', () => {
    // シャッフルなし
    const spyRandom = jest.spyOn(Math, 'random').mockReturnValue(0.9)
    const max: number = 7
    const len: number = 5
    const expected: number[] = [0, 1, 2, 3, 4]
    const result: number[] = generateRandomNumbers(max, len)
    spyRandom.mockRestore()
    expect(result).toEqual(expected)
    expect(result).toEqual(Array.from(new Set(result)))
    expect(result).toHaveLength(len)
  })

  test('generatePoolのテスト:selectedCharacter指定なし', () => {
    // シャッフルなし
    const spyRandom = jest.spyOn(Math, 'random').mockReturnValue(0.9999)
    const expected: Pool = {
      characters: characters.slice(0, 2),
      rest: characters.slice(2, Number(process.env.NEXT_PUBLIC_POOL)),
    }
    const result: Pool = generatePool(characters)
    spyRandom.mockRestore()
    expect(result).toEqual(expected)
  })

  test('generatePoolのテスト:selectedCharacter指定ありかつ、selectedCharacterがランダムに生成された配列に含まれていない場合', () => {
    // シャッフルなし
    const spyRandom = jest.spyOn(Math, 'random').mockReturnValue(0.9999)
    const selectedCharacter: Character = characters[87]
    const expected: Pool = {
      characters: [selectedCharacter, ...characters.slice(0, 1)],
      rest: characters.slice(1, Number(process.env.NEXT_PUBLIC_POOL)),
    }
    const result: Pool = generatePool(characters, selectedCharacter)
    spyRandom.mockRestore()
    expect(result).toEqual(expected)
  })

  test('generatePoolのテスト:selectedCharacter指定ありかつ、selectedCharacterがランダムに生成された配列に含まれている場合', () => {
    // シャッフルなし
    const spyRandom = jest.spyOn(Math, 'random').mockReturnValue(0.9999)
    const selectedCharacterIndex: number = 10
    const selectedCharacter: Character = characters[selectedCharacterIndex]
    const expected: Pool = {
      characters: [selectedCharacter, ...characters.slice(0, 1)],
      rest: [
        ...characters.slice(1, selectedCharacterIndex),
        ...characters.slice(selectedCharacterIndex + 1, Number(process.env.NEXT_PUBLIC_POOL)),
      ],
    }
    const result: Pool = generatePool(characters, selectedCharacter)
    spyRandom.mockRestore()
    expect(result).toEqual(expected)
  })
})
