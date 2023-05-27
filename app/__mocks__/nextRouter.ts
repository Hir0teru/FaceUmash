export const useRouter = jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
      query: {},
    }
  },
}))
