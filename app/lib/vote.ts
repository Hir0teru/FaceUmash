import type { Character, Pool } from '../interfaces'

export const generatePool = (characters: Character[], selectedCharacter?: Character): Pool => {
  const base = [...characters]
  if (selectedCharacter) base.splice(0, 0, selectedCharacter)

  return {
    characters: base.splice(0, 2),
    rest: base,
  }
}
