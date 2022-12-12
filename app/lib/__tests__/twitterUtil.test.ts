import { generateTweetURL } from '../twitterUtil'

describe('Test for result.ts', () => {
  test('generateTweetURLのテスト', () => {
    const text: string = 'test'
    const url: string = 'https://example.com'
    const expected: URL = new URL('https://twitter.com/intent/tweet')
    expected.searchParams.set('text', text)
    expected.searchParams.set('url', url)
    expected.searchParams.set('hashtags', ['ウマ娘', 'FaceUmash'].join(','))
    expect(generateTweetURL(text, url)).toEqual(expected)
  })

  test('generateTweetURLのテスト:引数がfalsyな値の場合', () => {
    const expected: URL = new URL('https://twitter.com/intent/tweet')
    expect(generateTweetURL('', '')).toEqual(expected)
    expect(generateTweetURL('test', '')).toEqual(expected)
    expect(generateTweetURL('', 'https://example.com')).toEqual(expected)
  })
})
