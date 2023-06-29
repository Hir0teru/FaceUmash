import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Error from '../error'

test('Test for error.tsx', () => {
  render(<Error message={'test message'} />)
  expect(screen.getByTestId('error')).toHaveTextContent('Error: test message')
})
