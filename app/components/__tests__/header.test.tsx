import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../header'

test('Test for header.tsx', () => {
  render(<Header />)
  const element = screen.getByText('faceUmash')
  expect(element).toBeInTheDocument()
})
