import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../footer'

describe('Test for footer.tsx', () => {
  test('「ツイート」ボタンが存在すること', () => {
    render(<Footer />)
    const element = screen.getByRole('button', { name: 'ツイート' })
    expect(element).toBeInTheDocument()
  })

  test('「ツイート」ボタンのテキストが中央寄せされていること', () => {
    render(<Footer />)
    const element = screen.getByRole('button', { name: 'ツイート' })
    expect(element).toHaveStyle('text-align: center')
  })

  test('「「ツイート」ボタンの色がTwitterの利用規約に基づくこと', () => {
    render(<Footer />)
    const element = screen.getByRole('button', { name: 'ツイート' })
    expect(element).toHaveStyle('backgroundColor: #1DA1F2')
    expect(element).toHaveStyle('color: #FFF')
  })
})
