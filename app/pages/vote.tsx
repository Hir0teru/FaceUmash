import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import { useState } from 'react'
import useSWR from 'swr'
import { ClassNames } from '@emotion/react'
import type { Character, Pool } from '../interfaces'
import CardButton from '../components/cardButton'
import { generatePool } from '../lib/vote'

const Vote: NextPage = () => {
  const { data: baseCharacters, error } = useSWR('/api/db', (url: string) =>
    fetch(url).then((res) => res.json()),
  )
  // TODO:エラーハンドル時とリソース読み込み時の処理を実装する
  if (error) return <div></div>
  if (!baseCharacters) return <div></div>
  return (
    <>
      <Grid container spacing={4} wrap={'nowrap'}>
        <Buttons baseCharacters={baseCharacters}></Buttons>
      </Grid>
    </>
  )
}

const Buttons = ({ baseCharacters }: { baseCharacters: Character[] }) => {
  const [pool, setPool] = useState<Pool>(generatePool(baseCharacters))
  const router = useRouter()
  const handleCradButtonClicked = (winner: string): void => {
    const { characters, rest }: Pool = pool
    if (!rest.length) {
      router.push({
        pathname: '/result',
        query: characters[0].id === winner ? characters[0] : characters[1],
      })
      return
    }
    setPool({
      characters: characters.map((character: Character) => {
        const { id }: { id: string } = character
        return id === winner ? character : rest.splice(0, 1)[0]
      }),
      rest,
    })
  }

  const { characters } = pool
  return (
    <>
      {characters.map((character) => (
        <Grid item key={character.id}>
          <CardButton {...character} onClick={handleCradButtonClicked}></CardButton>
        </Grid>
      ))}
    </>
  )
}

export default Vote
