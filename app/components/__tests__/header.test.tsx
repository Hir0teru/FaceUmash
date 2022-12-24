import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../header'

test('Test for footer.tsx', () => {
  render(<Header />)
  const element = screen.getByText('FaceUmash')
  expect(element).toBeInTheDocument()
})
