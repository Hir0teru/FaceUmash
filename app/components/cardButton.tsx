import Image from 'next/image'
import { CardActionArea, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material'
import { Character } from '../interfaces'

const CardButton = ({
  id,
  name,
  onClick,
}: Character & {
  onClick: { (id: string): void }
}) => {
  const image = name ? `/${name}.png` : '/ミホノブルボン.png'
  return (
    <CardActionArea onClick={() => onClick(id)}>
      <Card>
        <CardMedia>
          <Image src={image} height={140} width={140} priority={true} alt={name} loading='eager' />
        </CardMedia>
        <CardContent>
          <Typography>{name}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default CardButton
