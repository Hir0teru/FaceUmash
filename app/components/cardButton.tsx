import { CardActionArea, Card, CardMedia, CardContent, Box } from '@mui/material'
import Image from 'next/image'
import { Character } from '../interfaces'

interface CardButtonProps {
  myCharacter: Character
  opponentCharacter: Character
  onClick: (winner: string, loser: string) => void
  disabled: boolean
}

const CardButton = ({ myCharacter, opponentCharacter, onClick, disabled }: CardButtonProps) => {
  const image = `/${myCharacter?.name}.png`
  return (
    <Box textAlign={'center'} sx={{ height: 'auto', width: '97.5%', margin: 'auto' }}>
      <CardActionArea
        onClick={() => onClick(myCharacter?.id, opponentCharacter?.id)}
        disabled={disabled}
        data-testid={`button-${myCharacter?.id}`}
      >
        <Card>
          <CardMedia sx={{ mt: { xs: '2.5%', md: '1.5%' } }}>
            <Image src={image} height={150} width={150} alt={myCharacter?.name} priority={true} />
          </CardMedia>
          <CardContent>
            <Box
              sx={{ typography: { xs: 'body2', md: 'h5' } }}
              textAlign='center'
              data-testid='name'
            >
              {myCharacter?.name}
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
    </Box>
  )
}

export default CardButton
