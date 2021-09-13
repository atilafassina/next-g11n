import { useG11n } from '../src'

const dictionary = {
  en: {
    hello: 'Hello world',
  },
  gc: {
    hello: 'dale',
  },
}

jest.mock('next/router', () => ({
  useRouter: () => ({
    locale: 'en',
    defaultLocale: 'gc',
  }),
}))

describe('when router has locale', () => {
  it('should return the translated `string` if exists in dictionary', () => {
    const { translate: t } = useG11n(dictionary)
    expect(t('hello')).toMatch('Hello world')
  })

  it('should return the key if `string` does not exist in dictionary and `useFallback` is `true`', () => {
    const { translate: t } = useG11n(dictionary, true)

    // @ts-expect-error
    expect(t('helo')).toMatch('helo')
  })

  it('should throw error if the key does not exist in dictionary and `useFallback` is `false`', () => {
    const { translate: t } = useG11n(dictionary)

    // @ts-expect-error
    expect(() => t('helo')).toThrow('key helo was not found for locale en')
  })
})
