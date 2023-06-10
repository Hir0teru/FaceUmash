import { Grid, Box } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { useSWRConfig } from 'swr'
import CardButton from '../components/cardButton'
import Loading from '../components/loading'
import type { Character, Pool } from '../interfaces'
import { generatePool } from '../lib/vote'

const Vote: NextPage = () => {
  const router = useRouter()
  const { selectedCharacter } = router.query
  const uri: string = selectedCharacter
    ? `/api/db?selected=${selectedCharacter}`
    : '/api/db?selected'

  const { data: baseCharacters, error } = useSWR(
    uri,
    (url: string) => fetch(url).then((res) => res.json()),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  // TODO:Implement error handling and resource loading processes
  if (error) return <div></div>
  if (!baseCharacters) return <Loading />
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{ typography: { xs: 'h4', md: 'h2' } }}
            textAlign='center'
            data-testid='question'
          >
            どっちが気になる？
          </Box>
        </Grid>
        <Buttons baseCharacters={baseCharacters} seletctedCharacter={undefined} uri={uri}></Buttons>
      </Grid>
    </>
  )
}

const Buttons = ({
  baseCharacters,
  seletctedCharacter,
  uri,
}: {
  baseCharacters: Character[]
  seletctedCharacter?: Character
  uri: string
}) => {
  const [pool, setPool] = useState<Pool>(generatePool(baseCharacters, seletctedCharacter))
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const handleCradButtonClicked = async (winner: string, loser: string): Promise<void> => {
    setIsLoading(true)
    fetch(`api/rating?winnerid=${winner}&loserid=${loser}`)
    const { characters, rest }: Pool = pool
    if (!rest.length) {
      const copy = [...characters]
      router.push(
        {
          pathname: '/result',
          query: copy[0]?.id === winner ? copy[0] : copy[1],
        },
        undefined,
        { shallow: true },
      )
      // Clear the cache and move to retrieve character data randomly
      mutate(uri, undefined, { revalidate: false })
      return
    }
    setPool({
      characters: characters.map((character: Character) => {
        const { id }: { id: string } = character
        return id === winner ? character : rest.splice(0, 1)[0]
      }),
      rest,
    })
    setIsLoading(false)
  }

  const { characters } = pool
  return (
    <>
      <Grid
        item
        xs={6}
        key={characters[0]?.id}
        sx={{ margin: 'auto', mt: { xs: '5%', md: '2.5%' } }}
        data-testid='button-left'
      >
        <CardButton
          myCharacter={characters[0]}
          opponentCharacter={characters[1]}
          onClick={handleCradButtonClicked}
          disabled={isLoading}
        />
      </Grid>
      <Grid
        item
        xs={6}
        key={characters[1]?.id}
        sx={{ margin: 'auto', mt: { xs: '5%', md: '2.5%' } }}
        data-testid='button-right'
      >
        <CardButton
          myCharacter={characters[1]}
          opponentCharacter={characters[0]}
          onClick={handleCradButtonClicked}
          disabled={isLoading}
        />
      </Grid>
    </>
  )
}

export default Vote
