import React from 'react'
import { Grid, Box, Container } from '@mui/material'
import Header from './header'
import Footer from './footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box sx={{ height: '100vh', width: '100vw' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}>
          <Grid item xs={12} sx={{ height: '10%' }}>
            <Header />
          </Grid>
          <Grid item xs={12} sx={{ height: '80%' }}>
            <Container>{children}</Container>
          </Grid>
          <Grid item xs={12} sx={{ height: '10%' }}>
            <Footer />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Layout
