import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'

const Header = (): JSX.Element => {
  return (
    <>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Box sx={{ margin: 'auto' }}>FaceUmash</Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
