import type { Character, Pool } from '../interfaces'

export const generatePool = (characters: Character[], selectedCharacter?: Character): Pool => {
  const poolLength: number = Number(process.env.NEXT_PUBLIC_POOL)
  const selectedCharacters: Character[] = generateRandomNumbers(characters.length, poolLength)
    .map((randomNumber) => characters[randomNumber])
    .filter((characters) => characters !== selectedCharacter)

  if (selectedCharacter) selectedCharacters.splice(0, 0, selectedCharacter)

  return {
    characters: selectedCharacters.splice(0, 2),
    rest: selectedCharacters,
  }
}

// 被りなしの整数の乱数の配列を返す
const generateRandomNumbers = (max: number, quantity: number): number[] => {
  const numbers: number[] = generateNumbers(max)
  while (numbers.length >= quantity) {
    numbers.splice(Math.floor(Math.random() * numbers.length), 1)
  }
  // ランダムな順番でソートして返す
  return numbers.sort(() => Math.random() - 0.5)
}

// 0始まりの整数の配列を返す
const generateNumbers = (len: number): number[] => {
  const numbers: number[] = []
  for (let i: number = 0; i < len; i++) {
    numbers.push(i)
  }
  return numbers
}
