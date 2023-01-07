import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { characters } from '../../__mocks__/db'
import type { Character } from '../../interfaces'
import CardButton from '../cardButton'

describe('Test for cardButton.tsx', () => {
  test('画像が存在し、altにcharacter.nameが指定されること', () => {
    const character: Character = characters[0]
    const { name }: { name: string } = character
    const onClick = (id: string): void => console.log('')
    render(<CardButton {...character} onClick={onClick} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByAltText(name)).toBeInTheDocument()
  })

  test('character.nameのテキストが存在し、中央寄せされていること', () => {
    const character: Character = characters[1]
    const { name }: { name: string } = character
    const onClick = (id: string): void => console.log('')
    render(<CardButton {...character} onClick={onClick} />)
    const element = screen.getByText(name)
    expect(element).toBeInTheDocument()
    expect(element).toHaveStyle('text-align: center')
  })
})
