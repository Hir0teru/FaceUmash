import TwitterIcon from '@mui/icons-material/Twitter'
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Grid,
  Button,
  IconButton,
  Box,
} from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loading from '../components/loading'
import Error from '../components/error'
import { generateTweetURL } from '../lib/twitterUtil'
import { fetcher } from '../lib/fetcher'

const Result: NextPage = () => {
  const router = useRouter()
  if (!router.isReady) return <Loading />
  const id = router.query.id as string
  const { data, error } = useSWR(`api/result?id=${id}`, fetcher)

  if (error) return <Error message={error?.message} />
  if (!data) return <Loading />

  const {
    result: { name, url },
  }: {
    result: { name: string; url: string }
  } = data

  return (
    <>
      <Grid container sx={{ height: '100%', width: 'auto' }} textAlign='center'>
        <Grid
          item
          xs={12}
          sx={{
            height: '10%',
            mt: { xs: '1%', sm: '1.75%', md: '2.5%' },
            mb: { xs: '0.5%', sm: '0.875%', md: '1.25%' },
          }}
        >
          <Box
            sx={{ typography: { xs: 'h6', sm: 'h4', md: 'h4' } }}
            textAlign='center'
            data-testid='subject'
          >
            あなたへのおすすめのウマ娘は
          </Box>
          <Box
            sx={{ typography: { xs: 'h6', sm: 'h4', md: 'h4' } }}
            textAlign='center'
            data-testid='result'
          >
            {name ? name : ''}です
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          sm={10}
          lg={12}
          sx={{
            height: '60%',
            margin: 'auto',
            mt: { xs: '1%', sm: '1.75%', md: '2.5%' },
            mb: { xs: '0.5%', sm: '0.875%', md: '1.25%' },
          }}
        >
          <Card>
            <CardMedia
              sx={{
                mt: { xs: '1%', sm: '1.75%', md: '2.5%' },
                mb: { xs: '0.5%', sm: '0.875%', md: '1.25%' },
              }}
            >
              <Image
                src={`/${name}.png`}
                height={240}
                width={240}
                alt={name ? name : ''}
                loading='lazy'
              />
            </CardMedia>
            <CardContent>
              <Box
                sx={{ typography: { xs: 'h6', sm: 'h5', md: 'h5' } }}
                textAlign='center'
                data-testid='name'
              >
                {name ? name : ''}
              </Box>
            </CardContent>
            <CardActions>
              <Link
                href={generateTweetURL(
                  name && `あなたへのおすすめのウマ娘は${name}です`,
                  `${process.env.NEXT_PUBLIC_DOMAIN ?? ''}${router.asPath}`,
                )}
                target='_blank'
                rel='noopener noreferrer'
                passHref
              >
                <IconButton aria-label='share'>
                  <TwitterIcon sx={{ color: '#1DA1F2' }} />
                </IconButton>
              </Link>
              <Box sx={{ ml: 'auto' }}>
                <Button
                  variant='text'
                  target='_blank'
                  href={url ? url : ''}
                  rel='noopener noreferrer'
                  data-testid='about'
                >
                  {url ? 'このウマ娘について' : ''}
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      {/* TODO: Buttonを共通化する */}

      <Box
        display='flex'
        justifyContent='space-between'
        sx={{ width: { xs: '82.5%', sm: '67.5%', md: '52.5%' } }}
      >
        <Grid
          item
          xs={12}
          sx={{
            height: '10%',
            margin: 'auto',
            mt: { xs: '1.5%', sm: '1.75%', md: '2%' },
          }}
          textAlign='center'
        >
          <Link href='/vote' style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              sx={{ width: { xs: '90%' } }}
              size='medium'
              data-testid='restart'
            >
              最初から遊ぶ
            </Button>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            height: '10%',
            margin: 'auto',
            mt: { xs: '1.5%', sm: '1.75%', md: '2%' },
          }}
          textAlign='center'
        >
          <Link
            href={{
              pathname: '/vote',
              query: { selectedCharacter: id },
            }}
            as={'/vote'}
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant='contained'
              sx={{ width: { xs: '90%' } }}
              size='medium'
              data-testid='continue'
            >
              続けて遊ぶ
            </Button>
          </Link>
        </Grid>
      </Box>

      <Box
        display='flex'
        justifyContent='space-between'
        width='50%'
        sx={{ width: { xs: '82.5%', sm: '67.5%', md: '52.5%' } }}
      >
        <Grid
          item
          xs={6}
          md={12}
          sx={{
            height: '10%',
            margin: 'auto',
            mt: { xs: '1.5%', sm: '1.75%', md: '2%' },
          }}
          textAlign='center'
        >
          <Link href='/' style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              sx={{ width: { xs: '90%' } }}
              size='medium'
              data-testid='home'
            >
              トップ
            </Button>
          </Link>
        </Grid>

        <Grid
          item
          xs={6}
          md={12}
          sx={{
            height: '10%',
            margin: 'auto',
            mt: { xs: '1.5%', sm: '1.75%', md: '2%' },
          }}
          textAlign='center'
        >
          <Link href='/ranking' style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              sx={{ width: { xs: '90%' } }}
              size='medium'
              data-testid='ranking'
            >
              ランキング
            </Button>
          </Link>
        </Grid>
      </Box>
    </>
  )
}

export default Result
