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
import { generateTweetURL } from '../lib/twitterUtil'

const Result: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const name = router.query.name as string
  const url = router.query.url as string
  return (
    <>
      <Grid container sx={{ height: '100%', width: 'auto' }} textAlign='center'>
        <Grid item xs={12} sx={{ height: '10%', mt: { xs: '2.5%', md: '1%' } }}>
          <Box sx={{ typography: { xs: 'h5', md: 'h4' } }} textAlign='center'>
            あなたへのおすすめのウマ娘は{name ? name : ''}です
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ height: '60%', margin: 'auto', mt: { xs: '2.5%', md: '1%' } }}>
          <Card>
            <CardMedia sx={{ mt: { xs: '2.5%', md: '1%' } }}>
              <Image
                src={`/${name}.png`}
                height={240}
                width={240}
                alt={name ? name : ''}
                loading='lazy'
              />
            </CardMedia>
            <CardContent>
              <Box sx={{ typography: { xs: 'h6', md: 'h4' } }} textAlign='center'>
                {name ? name : ''}
              </Box>
            </CardContent>
            <CardActions>
              <Link
                href={generateTweetURL(
                  name && `あなたへのおすすめのウマ娘は${name}です`,
                  `${router.asPath}`,
                )} // TODO:ドメインは環境変数化する
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
                >
                  {url ? 'このウマ娘について' : ''}
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      {/* TODO: Buttonを共通化する */}
      <Grid
        item
        xs={8}
        sx={{ height: '10%', margin: 'auto', mt: { xs: '2.5%', md: '1%' } }}
        textAlign='center'
      >
        <Link href='/vote' style={{ textDecoration: 'none' }}>
          <Button variant='contained' sx={{ width: '100%' }} size='large'>
            最初から遊ぶ
          </Button>
        </Link>
      </Grid>
      <Grid
        item
        xs={8}
        sx={{ height: '10%', margin: 'auto', mt: { xs: '2.5%', md: '1%' } }}
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
          <Button variant='contained' sx={{ width: '100%' }} size='large'>
            続けて遊ぶ
          </Button>
        </Link>
      </Grid>
      <Grid
        item
        xs={8}
        sx={{ height: '10%', margin: 'auto', mt: { xs: '2.5%', md: '1%' } }}
        textAlign='center'
      >
        <Link href='/' style={{ textDecoration: 'none' }}>
          <Button variant='contained' sx={{ width: '100%' }} size='large'>
            トップへ
          </Button>
        </Link>
      </Grid>
    </>
  )
}

export default Result
