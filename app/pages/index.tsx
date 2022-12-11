import type { NextPage } from 'next'
import Link from 'next/link'
import { Button, Grid, Box, Card, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const Home: NextPage = () => {
  const itemTexts: string[] = [
    '２人のウマ娘から気になるウマ娘をクリック！',
    '何度か繰り返してお気に入りのウマ娘を見つけましょう！',
  ]
  return (
    <>
      <Grid container sx={{ height: 'auto', margin: 'auto' }}>
        <Grid item xs={12} sx={{ mt: { xs: '15%', md: '7.5%' } }}>
          <Box sx={{ typography: { xs: 'h4', md: 'h2' } }} textAlign='center'>
            どっちが気になる？
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ margin: 'auto', mt: { xs: '5%', md: '2.5%' } }}>
          <Card>
            <Box sx={{ typography: 'h5' }}>あそびかた</Box>
            <List>
              {itemTexts.map((text: string, index: number) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ArrowForwardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontWeight: 'medium',
                      variant: 'body1',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={8} sx={{ margin: 'auto', mt: { xs: '5%', md: '2.5%' } }} textAlign='center'>
          <Link href='/vote' style={{ textDecoration: 'none' }}>
            <Button variant='contained' sx={{ width: '100%', height: '7.5vh', fontSize: 20 }}>
              あそんでみる
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
