import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Header = (): JSX.Element => {
  return (
    <>
      <Link href='/' style={{ textDecoration: 'none' }}>
        <AppBar position='static' sx={{ textAlign: 'center' }} data-testid='header'>
          <Toolbar variant='dense'>
            <Box sx={{ margin: 'auto' }}>
              <Box>
                <Typography variant='h4' data-testid='title'>
                  faceUmash
                </Typography>
              </Box>
              <Box>
                <Typography variant='subtitle1' data-testid='subtitle'>
                  みんなでつくるウマ娘ランキング
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Link>
    </>
  )
}

export default Header
