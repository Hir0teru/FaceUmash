import { render, screen } from '@testing-library/react'
import { NextRouter } from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import '@testing-library/jest-dom'
import Result from '../pages/result'
import { SWRConfig, Middleware, SWRResponse } from 'swr'

describe('Test for pages/result', () => {
  beforeEach(() => {
    const mockRouter: Partial<NextRouter> = {
      query: { id: '0001' },
      isReady: true,
    }

    const mock: Middleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: { result: { name: 'name', url: 'test@example.com' } },
          error: undefined,
          mutate: (_) => Promise.resolve(),
          isValidating: false,
        }
      }
    }
    render(
      <SWRConfig value={{ use: [mock] }}>
        <RouterContext.Provider value={mockRouter as NextRouter}>
          <Result />
        </RouterContext.Provider>
      </SWRConfig>,
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

describe('Test for pages/result with router is not ready', () => {
  beforeEach(() => {
    const mockRouter: Partial<NextRouter> = {
      query: { id: '0001' },
      isReady: false,
    }

    const mock: Middleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: { result: { name: 'name', url: 'test@example.com' } },
          error: undefined,
          mutate: (_) => Promise.resolve(),
          isValidating: false,
        }
      }
    }
    render(
      <SWRConfig value={{ use: [mock] }}>
        <RouterContext.Provider value={mockRouter as NextRouter}>
          <Result />
        </RouterContext.Provider>
      </SWRConfig>,
    )
  })

  test('renders loading when router is not ready', () => {
    const element = screen.getByTestId('loading')
    expect(element).toBeInTheDocument()
  })
})

describe('Test for pages/result with swr response is falsy', () => {
  beforeEach(() => {
    const mockRouter: Partial<NextRouter> = {
      query: { id: '0001' },
      isReady: true,
    }

    const mock: Middleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: undefined,
          error: undefined,
          mutate: (_) => Promise.resolve(),
          isValidating: false,
        }
      }
    }
    render(
      <SWRConfig value={{ use: [mock] }}>
        <RouterContext.Provider value={mockRouter as NextRouter}>
          <Result />
        </RouterContext.Provider>
      </SWRConfig>,
    )
  })

  test('renders loading when swr response is falsy', () => {
    const element = screen.getByTestId('loading')
    expect(element).toBeInTheDocument()
  })
})

describe('Test for pages/result with error', () => {
  beforeEach(() => {
    const mockRouter: Partial<NextRouter> = {
      query: { id: '0001' },
      isReady: true,
    }

    const mock: Middleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: undefined,
          error: { message: 'error' },
          mutate: (_) => Promise.resolve(),
          isValidating: false,
        }
      }
    }
    render(
      <SWRConfig value={{ use: [mock] }}>
        <RouterContext.Provider value={mockRouter as NextRouter}>
          <Result />
        </RouterContext.Provider>
      </SWRConfig>,
    )
  })

  test('renders error when error occurs', () => {
    const element = screen.getByTestId('error')
    expect(element).toBeInTheDocument()
  })
})
