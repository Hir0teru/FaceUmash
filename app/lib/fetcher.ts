export const fetcher = async (url: string) => {
  const response: Response = await fetch(url)
  const { status }: { status: number } = response
  if (status !== 200) {
    const {
      error: { message },
    }: { error: { message: string } } = await response.json()
    throw new Error(`${status} ${message}`)
  }
  return response.json()
}
