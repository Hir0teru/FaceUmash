import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import type { Character } from '../../interfaces'
import CardButton from '../cardButton'

describe('test for components/cardButton', () => {
  const mockOnClick = jest.fn()
  const myCharacter: Character = {
    id: '0000',
    name: 'test1',
    url: 'test1.com',
  }
  const opponentCharacter: Character = {
    id: '0001',
    name: 'test2',
    url: 'test2.com',
  }

  test('should render correctly', () => {
    const { getByText, getByAltText } = render(
      <CardButton
        myCharacter={myCharacter}
        opponentCharacter={opponentCharacter}
        onClick={mockOnClick}
        disabled={false}
      />,
    )

    expect(getByText(myCharacter.name)).toBeInTheDocument()
    expect(getByAltText(myCharacter.name)).toBeInTheDocument()
  })

  test('should disable the button when disabled prop is true', () => {
    const { getByTestId } = render(
      <CardButton
        myCharacter={myCharacter}
        opponentCharacter={opponentCharacter}
        onClick={mockOnClick}
        disabled={true}
      />,
    )

    expect(getByTestId(`button-${myCharacter.id}`)).toBeDisabled()
  })

  test('should enable the button when disabled prop is false', () => {
    const { getByTestId } = render(
      <CardButton
        myCharacter={myCharacter}
        opponentCharacter={opponentCharacter}
        onClick={mockOnClick}
        disabled={false}
      />,
    )

    expect(getByTestId(`button-${myCharacter.id}`)).not.toBeDisabled()
  })

  test('should call onClick when button is clicked', () => {
    const { getByTestId } = render(
      <CardButton
        myCharacter={myCharacter}
        opponentCharacter={opponentCharacter}
        onClick={mockOnClick}
        disabled={false}
      />,
    )

    fireEvent.click(getByTestId(`button-${myCharacter.id}`))
    expect(mockOnClick).toHaveBeenCalledWith(myCharacter.id, opponentCharacter.id)
  })

  test('should not call onClick when button is disabled', () => {
    mockOnClick.mockClear()
    const { getByTestId } = render(
      <CardButton
        myCharacter={myCharacter}
        opponentCharacter={opponentCharacter}
        onClick={mockOnClick}
        disabled={true}
      />,
    )

    fireEvent.click(getByTestId(`button-${myCharacter.id}`))
    expect(mockOnClick).not.toHaveBeenCalled()
  })
})
