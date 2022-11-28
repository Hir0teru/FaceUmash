import Image from 'next/image'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Link,
  Box,
  Button,
  IconButton,
} from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'

const Result: NextPage = () => {
  const router = useRouter()
  const { id, name, url } = router.query
  const image = name ? `/${name}.png` : ''
  return (
    <>
      <Box>
        <Typography>あなたへのおすすめのウマ娘は{name ? name : ''}です</Typography>
        <Card>
          <CardMedia>
            <Image
              src={image}
              height={140}
              width={140}
              alt={typeof name === 'string' ? name : ''}
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
            <Button variant='text' target='_blank' href={typeof url === 'string' ? url : ''}>
              {name ? `${name}について` : ''}
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Box textAlign='center'>
        <Button variant='outlined' size='large' onClick={() => router.back()}>
          最初から遊ぶ
        </Button>
      </Box>
      <Box textAlign='center'>
        {/* TODO:ボタン押下時の処理を追加 */}
        <Button variant='outlined' size='large' onClick={() => null}>
          続けて遊ぶ
        </Button>
      </Box>
    </>
  )
}

export default Result
