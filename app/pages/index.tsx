import type { NextPage } from 'next'
import Link from 'next/link'
import { Button, Grid, Box, Typography } from '@mui/material'

const Home: NextPage = () => {
  return (
    <>
      <Grid container spacing={6} sx={{ height: '80vh' }}>
        <Grid item xs={12} sx={{ height: '33%' }}>
          <Box textAlign='center'>
            <Button variant='outlined' size='large'>
              遊びかた
            </Button>
          </Box>
          <Box textAlign='center'>
            <Link href='/vote' passHref>
              <Button variant='outlined' size='large'>
                遊んでみる
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
