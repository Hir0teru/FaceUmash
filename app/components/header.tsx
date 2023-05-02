import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Header = (): JSX.Element => {
  return (
    <>
      <Link href='/' style={{ textDecoration: 'none' }}>
        <AppBar position='static' sx={{ height: '100%' }}>
          <Box sx={{ margin: 'auto' }}>
            <Toolbar variant='dense'>
              <Typography variant='h4' component='h2'>
                FaceUmash
              </Typography>
            </Toolbar>
          </Box>
        </AppBar>
      </Link>
    </>
  )
}

export default Header
