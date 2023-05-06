import { render, screen } from '@testing-library/react'
import { NextRouter } from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import '@testing-library/jest-dom'
import Result from '../result'

describe('Test for pages/result', () => {
  const mockRouter: Partial<NextRouter> = {
    query: {
      id: '0001',
      name: 'name',
      url: 'test@example.com',
    },
  }
  beforeEach(() => {
    render(
      <RouterContext.Provider value={mockRouter as NextRouter}>
        <Result />
      </RouterContext.Provider>,
    )
  })

  test('renders subject', () => {
    const element = screen.getByTestId('subject')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toBe('あなたへのおすすめのウマ娘は')
  })

  test('renders result', () => {
    const element = screen.getByTestId('result')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toBe('nameです')
  })

  test('renders name', () => {
    const element = screen.getByTestId('name')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toBe('name')
  })

  test('renders Image', () => {
    const element = screen.getByRole('img')
    expect(element).toBeInTheDocument()
    expect(element.getAttribute('alt')).toBe('name')
  })

  test('renders about button with correct href attribute and text content', () => {
    const element = screen.getByTestId('about')
    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('href', 'test@example.com')
    expect(element.textContent).toBe('このウマ娘について')
  })

  test('restart button has the correct href attribute and text content', () => {
    const element = screen.getByTestId('restart')
    expect(element).toBeInTheDocument()
    expect(element.closest('a')).toHaveAttribute('href', '/vote')
    expect(element.textContent).toBe('最初から遊ぶ')
  })

  test('continue button has the correct href attribute and text content', () => {
    const element = screen.getByTestId('continue')
    expect(element).toBeInTheDocument()
    expect(element.closest('a')).toHaveAttribute('href', '/vote')
    expect(element.textContent).toBe('続けて遊ぶ')
  })

  test('home button has the correct href attribute and text content', () => {
    const element = screen.getByTestId('home')
    expect(element).toBeInTheDocument()
    expect(element.closest('a')).toHaveAttribute('href', '/')
    expect(element.textContent).toBe('トップ')
  })

  test('ranking button has the correct href attribute and text content', () => {
    const element = screen.getByTestId('ranking')
    expect(element).toBeInTheDocument()
    expect(element.closest('a')).toHaveAttribute('href', '/ranking')
    expect(element.textContent).toBe('ランキング')
  })
})

describe('Test for pages/result with invalid values in the query', () => {
  const mockRouter: Partial<NextRouter> = {
    query: {
      id: undefined,
      name: undefined,
      url: undefined,
    },
  }
  beforeEach(() => {
    render(
      <RouterContext.Provider value={mockRouter as NextRouter}>
        <Result />
      </RouterContext.Provider>,
    )
  })

  test('renders subject with invalid value', () => {
    const element = screen.getByTestId('subject')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toBe('あなたへのおすすめのウマ娘は')
  })

  test('renders result with invalid value', () => {
    const element = screen.getByTestId('result')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toBe('です')
  })

  test('renders name with invalid value', () => {
    const element = screen.getByTestId('name')
    expect(element).toBeInTheDocument()
    expect(element.textContent).toBe('')
  })

  test('renders Image with invalid value', () => {
    const element = screen.getByRole('img')
    expect(element).toBeInTheDocument()
    expect(element.getAttribute('alt')).toBe('')
  })

  test('renders about button with invalid href attribute and invalid text content', () => {
    const element = screen.getByTestId('about')
    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('href', '')
    expect(element.textContent).toBe('')
  })

  test('restart button has the correct href attribute and text content', () => {
    const element = screen.getByTestId('restart')
    expect(element).toBeInTheDocument()
    expect(element.closest('a')).toHaveAttribute('href', '/vote')
    expect(element.textContent).toBe('最初から遊ぶ')
  })

  test('continue button has the correct href attribute and text content', () => {
    const element = screen.getByTestId('continue')
    expect(element).toBeInTheDocument()
    expect(element.closest('a')).toHaveAttribute('href', '/vote')
    expect(element.textContent).toBe('続けて遊ぶ')
  })

  test('home button has the correct href attribute and text content', () => {
    const element = screen.getByTestId('home')
    expect(element).toBeInTheDocument()
    expect(element.closest('a')).toHaveAttribute('href', '/')
    expect(element.textContent).toBe('トップ')
  })

  test('ranking button has the correct href attribute and text content', () => {
    const element = screen.getByTestId('ranking')
    expect(element).toBeInTheDocument()
    expect(element.closest('a')).toHaveAttribute('href', '/ranking')
    expect(element.textContent).toBe('ランキング')
  })
})
