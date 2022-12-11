import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Grid, Box } from '@mui/material'
import { useState } from 'react'
import useSWR from 'swr'
import type { Character, Pool } from '../interfaces'
import CardButton from '../components/cardButton'
import { generatePool } from '../lib/vote'

const Vote: NextPage = () => {
  const { data: baseCharacters, error } = useSWR('/api/db', (url: string) =>
    fetch(url).then((res) => res.json()),
  )
  const router = useRouter()
  // TODO:エラーハンドル時とリソース読み込み時の処理を実装する
  if (error) return <div></div>
  if (!baseCharacters) return <div></div>
  const { selectedCharacter } = router.query
  return (
    <>
      <Grid container sx={{ height: 'auto', width: 'auto' }}>
        <Grid item xs={12} sx={{ mt: { xs: '15%', md: '7.5%' } }}>
          <Box sx={{ typography: { xs: 'h4', md: 'h2' } }} textAlign='center'>
            どっちが気になる？
          </Box>
        </Grid>
        <Buttons
          baseCharacters={baseCharacters}
          seletctedCharacter={
            selectedCharacter
              ? baseCharacters.find(
                  (baseCharacter: Character) => baseCharacter.id === selectedCharacter,
                )
              : undefined
          }
        ></Buttons>
      </Grid>
    </>
  )
}

const Buttons = ({
  baseCharacters,
  seletctedCharacter,
}: {
  baseCharacters: Character[]
  seletctedCharacter?: Character
}) => {
  const [pool, setPool] = useState<Pool>(generatePool(baseCharacters, seletctedCharacter))
  const router = useRouter()
  const handleCradButtonClicked = (winner: string): void => {
    const { characters, rest }: Pool = pool
    if (!rest.length) {
      router.push(
        {
          pathname: '/result',
          query: characters[0].id === winner ? characters[0] : characters[1],
        },
        undefined,
        { shallow: true },
      )
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
        <Grid item xs={6} key={character.id} sx={{ margin: 'auto', mt: { xs: '5%', md: '2.5%' } }}>
          <CardButton {...character} onClick={handleCradButtonClicked}></CardButton>
        </Grid>
      ))}
    </>
  )
}

export default Vote
