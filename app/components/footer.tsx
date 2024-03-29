import TwitterIcon from '@mui/icons-material/Twitter'
import { Grid, Button, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { generateTweetURL } from '../lib/twitterUtil'

const Footer = (): JSX.Element => {
  return (
    <>
      <Grid container textAlign='center' sx={{ height: '100%' }} data-testid='footer'>
        <Grid item xs={12}>
          <Link
            href={generateTweetURL(
              'FaceUmash | 推しウマ娘が見つかるかも？',
              `${process.env.NEXT_PUBLIC_DOMAIN ?? ''}`,
            )}
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
              data-testid='tweetButton'
            >
              ツイート
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography data-testid='copyright'>© 2022 Hir0teru</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default Footer
