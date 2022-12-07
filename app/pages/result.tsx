import Image from 'next/image'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
} from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'

const Result: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const name = router.query.name as string
  const url = router.query.url as string
  return (
    <>
      <Box>
        <Typography>あなたへのおすすめのウマ娘は{name ? name : ''}です</Typography>
        <Card>
          <CardMedia>
            <Image
              src={`/${name}.png`}
              height={140}
              width={140}
              alt={name ? name : ''}
              priority={true}
              loading='eager'
            />
          </CardMedia>
          <CardContent>
            <Typography>{name ? name : ''}</Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label='share'>
              <TwitterIcon />
            </IconButton>
            <Button variant='text' target='_blank' href={url ? url : ''} rel='noopener noreferrer'>
              {name ? `${name}について` : ''}
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Box textAlign='center'>
        <Link href='/vote'>
          <Button variant='outlined' size='large'>
            最初から遊ぶ
          </Button>
        </Link>
      </Box>
      <Box textAlign='center'>
        <Link
          href={{
            pathname: '/vote',
            query: { selectedCharacter: id },
          }}
          as={'/vote'}
        >
          <Button variant='outlined' size='large'>
            続けて遊ぶ
          </Button>
        </Link>
      </Box>
      <Box textAlign='center'>
        <Link href='/'>
          <Button variant='outlined' size='large'>
            トップへ
          </Button>
        </Link>
      </Box>
    </>
  )
}

export default Result
