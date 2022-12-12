export const generateTweetURL = (text: string, url: string): URL => {
  const baseUrl = new URL('https://twitter.com/intent/tweet')
  if (!text || !url) return baseUrl
  baseUrl.searchParams.set('text', text)
  baseUrl.searchParams.set('url', url)
  baseUrl.searchParams.set('hashtags', ['ウマ娘', 'FaceUmash'].join(','))
  return baseUrl
}
