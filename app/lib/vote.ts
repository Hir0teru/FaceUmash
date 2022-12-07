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
export const generateRandomNumbers = (max: number, len: number): number[] => {
  return shuffle(generateNumbers(max)).slice(0, len)
}

// 0始まりの整数の配列を返す
export const generateNumbers = (len: number): number[] => {
  const numbers: number[] = []
  for (let i: number = 0; i < len; i++) {
    numbers.push(i)
  }
  return numbers
}

// 配列をシャッフルする
export const shuffle = ([...array]: number[]): number[] => {
  let i: number = array.length
  while (--i > 0) {
    const randomIndex: number = Math.floor(Math.random() * (i + 1))
    ;[array[randomIndex], array[i]] = [array[i], array[randomIndex]]
  }
  return array
}
