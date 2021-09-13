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
    locale: undefined,
    defaultLocale: 'gc',
  }),
}))

describe('when router does not have locale but has `defaultLocale`', () => {
  it('should return the translated `string` if exists in dictionary', () => {
    const { translate: t } = useG11n(dictionary)
    expect(t('hello')).toMatch('dale')
  })

  it('should return the key if `string` does not exist in dictionary and `useFallback` is `true`', () => {
    const { translate: t } = useG11n(dictionary, true)

    // @ts-expect-error
    expect(t('helo')).toMatch('helo')
  })

  it('should throw error if the key does not exist in dictionary and `useFallback` is `false`', () => {
    const { translate: t } = useG11n(dictionary)

    // @ts-expect-error
    expect(() => t('helo')).toThrow('key helo was not found for locale gc')
  })
})
