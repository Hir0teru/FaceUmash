import { characters } from '../../__mocks__/db'
import type { Character, Pool } from '../../interfaces'
import { generatePool } from '../vote'
process.env.NEXT_PUBLIC_POOL = '15'

describe('Test for vote.ts', () => {
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
