import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'

describe('Test for pages/index.tsx', () => {
  beforeEach(() => {
    render(<Home />)
  })

  test('renders the subject text', () => {
    const subject = screen.getByTestId('subject')
    expect(subject).toBeInTheDocument()
    expect(subject.textContent).toBe('どっちが気になる？')
  })

  test('renders the description text', () => {
    const description = screen.getByTestId('description')
    expect(description).toBeInTheDocument()
    expect(description.textContent).toBe('あそびかた')
  })

  test('renders the description items', () => {
    const item1 = screen.getByTestId('description-0')
    expect(item1).toBeInTheDocument()
    expect(item1.textContent).toBe('２人のウマ娘から気になるウマ娘をクリック！')

    const item2 = screen.getByTestId('description-1')
    expect(item2).toBeInTheDocument()
    expect(item2.textContent).toBe('何度か繰り返してお気に入りのウマ娘を見つけましょう！')
  })

  test('play button has the correct href attribute and text content', () => {
    const element = screen.getByTestId('play')
    expect(element).toBeInTheDocument()
    expect(element.closest('a')).toHaveAttribute('href', '/vote')
    expect(element.textContent).toBe('あそんでみる')
  })

  test('ranking button has the correct href attribute and text content', () => {
    const element = screen.getByTestId('ranking')
    expect(element).toBeInTheDocument()
    expect(element.closest('a')).toHaveAttribute('href', '/ranking')
    expect(element.textContent).toBe('ランキング')
  })
})
