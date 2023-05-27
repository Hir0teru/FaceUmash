import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Button, Grid, Box, Card, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  const itemTexts: string[] = [
    '２人のウマ娘から気になるウマ娘をクリック！',
    '何度か繰り返してお気に入りのウマ娘を見つけましょう！',
  ]
  return (
    <>
      <Grid container sx={{ height: 'auto', margin: 'auto' }}>
        <Grid item xs={12}>
          <Box sx={{ typography: { xs: 'h4', md: 'h2' } }} textAlign='center' data-testid='subject'>
            どっちが気になる？
          </Box>
        </Grid>
        <Grid item xs={10} sm={8} sx={{ margin: 'auto', mt: { xs: '5%', md: '2.5%' } }}>
          <Card>
            <Box sx={{ typography: 'h5' }} data-testid='description'>
              あそびかた
            </Box>
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
                    data-testid={`description-${index}`}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid
          item
          xs={10}
          sm={8}
          sx={{ margin: 'auto', mt: { xs: '5%', md: '2.5%' } }}
          textAlign='center'
        >
          <Link href='/vote' style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              sx={{ width: '100%', height: '6.25vh', fontSize: 20 }}
              data-testid='play'
            >
              あそんでみる
            </Button>
          </Link>
          <Link href='/ranking' style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              sx={{ width: '100%', height: '6.25vh', fontSize: 20, mt: '2.5%' }}
              data-testid='ranking'
            >
              ランキング
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
