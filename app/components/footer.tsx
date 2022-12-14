import React from 'react'
import { Grid, Button, Typography } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import Link from 'next/link'
import { generateTweetURL } from '../lib/twitterUtil'

const Footer = (): JSX.Element => {
  return (
    <>
      <Grid container textAlign='center' sx={{ height: '100%' }}>
        <Grid item xs={12}>
          <Link
            href={generateTweetURL('FaceUmash | 推しウマ娘が見つかるかも？', 'temp')} // TODO:ドメインは環境変数化する
            target='_blank'
            rel='noopener noreferrer'
            passHref
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant='contained'
              sx={{
                fontWeight: 'bold',
                /* twitterアイコン利用規約に基づいて色を指定 */
                backgroundColor: '#1DA1F2',
                color: '#FFF',
                '&:hover': {
                  backgroundColor: '#1882c4',
                },
              }}
              startIcon={<TwitterIcon />}
            >
              ツイート
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography>© 2022 Hir0teru</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default Footer
