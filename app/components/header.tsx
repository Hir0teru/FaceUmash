import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import React from 'react'

const Header = (): JSX.Element => {
  return (
    <>
      <AppBar position='static' sx={{ height: '100%' }}>
        <Box sx={{ margin: 'auto' }}>
          <Toolbar variant='dense'>
            <Typography variant='h4' component='div'>
              FaceUmash
            </Typography>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  )
}

export default Header
