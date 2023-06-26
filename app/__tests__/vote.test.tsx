import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { NextRouter } from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import '@testing-library/jest-dom'
import { SWRConfig, Middleware, SWRResponse } from 'swr'
import Vote from '../pages/vote'

describe('Test for pages/vote', () => {
  test('renders loading state initially', async () => {
    const mockRouter: Partial<NextRouter> = {
      query: {
        pathname: '/result',
      },
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
          <Vote />
        </RouterContext.Provider>
      </SWRConfig>,
    )
    await waitFor(() => screen.getByTestId('loading'))
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  test('renders ranking data after successful fetch', async () => {
    const mockRouter: Partial<NextRouter> = {
      query: {
        pathname: '/result',
      },
    }
    const mock: Middleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: [
            { id: '0000', name: 'test1', url: '' },
            { id: '0001', name: 'test2', url: '' },
          ],
          error: undefined,
          mutate: (_) => Promise.resolve(),
          isValidating: false,
        }
      }
    }
    render(
      <SWRConfig value={{ use: [mock] }}>
        <RouterContext.Provider value={mockRouter as NextRouter}>
          <Vote />
        </RouterContext.Provider>
      </SWRConfig>,
    )
    expect(screen.getByTestId('question')).toHaveTextContent('どっちが気になる？')
  })
})

describe('Test for pages/vote with error', () => {
  test('renders error when error occurs', async () => {
    const mockRouter: Partial<NextRouter> = {
      query: {
        pathname: '/result',
      },
    }
    const mock: Middleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: [
            { id: '0000', name: 'test1', url: '' },
            { id: '0001', name: 'test2', url: '' },
          ],
          error: { message: 'error' },
          mutate: (_) => Promise.resolve(),
          isValidating: false,
        }
      }
    }
    render(
      <SWRConfig value={{ use: [mock] }}>
        <RouterContext.Provider value={mockRouter as NextRouter}>
          <Vote />
        </RouterContext.Provider>
      </SWRConfig>,
    )
    const element = screen.getByTestId('error')
    expect(element).toBeInTheDocument()
  })
})
