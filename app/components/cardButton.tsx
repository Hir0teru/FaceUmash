import Image from 'next/image'
import { CardActionArea, Card, CardMedia, CardContent, Box } from '@mui/material'
import { Character } from '../interfaces'

const CardButton = ({
  id,
  name,
  onClick,
}: Character & {
  onClick: { (id: string): void }
}) => {
  const image = `/${name}.png`
  return (
    <Box textAlign={'center'} sx={{ height: 'auto', width: '97.5%', margin: 'auto' }}>
      <CardActionArea onClick={() => onClick(id)}>
        <Card>
          <CardMedia sx={{ mt: { xs: '2.5%', md: '1.5%' } }}>
            <Image src={image} height={150} width={150} priority={true} alt={name} />
          </CardMedia>
          <CardContent>
            <Box sx={{ typography: { xs: 'body2', md: 'h5' } }} textAlign='center'>
              {name}
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </Box>
  )
}

export default CardButton
