export type Character = {
  id: string
  name: string
  url: string
}

export type Pool = {
  characters: Character[]
  rest: Character[]
}
