import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SWRConfig, Middleware, SWRResponse } from 'swr'
import Ranking from '../pages/ranking'

describe('Test for pages/ranking', () => {
  test('renders loading state initially', async () => {
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
        <Ranking />
      </SWRConfig>,
    )
    await waitFor(() => screen.getByTestId('loading'))
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  test('renders ranking after successful fetch', async () => {
    const mock: Middleware = () => {
      return (): SWRResponse<any, any> => {
        return {
          data: {
            result: {
              createdAt: '05/07 10:00',
              ranking: [
                { id: '1', name: 'test1', image: '/image1.png' },
                { id: '2', name: 'test2', image: '/image2.png' },
              ],
            },
          },
          error: undefined,
          mutate: (_) => Promise.resolve(),
          isValidating: false,
        }
      }
    }

    render(
      <SWRConfig value={{ use: [mock] }}>
        <Ranking />
      </SWRConfig>,
    )
    await waitFor(() => screen.getByTestId('updatedAt'))
    expect(screen.getByTestId('updatedAt')).toHaveTextContent('最終更新：05/07 10:00')
  })
})
