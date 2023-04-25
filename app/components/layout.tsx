import { Grid, Box, Container } from '@mui/material'
import React from 'react'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box sx={{ height: '100vh', width: '100vw' }}>
        <Grid container spacing={0} sx={{ height: '100%' }}>
          <Grid item xs={12} sx={{ height: '10%' }}>
            <Header />
          </Grid>
          <Grid item xs={12} sx={{ height: '80%', position: 'relative' }}>
            <Container
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid container alignItems='center' justifyContent='center'>
                {children}
              </Grid>
            </Container>
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
