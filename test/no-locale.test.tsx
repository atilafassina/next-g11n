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
    defaultLocale: undefined,
  }),
}))

describe('when router does not have `locale` neither `defaultLocale`', () => {
  it('should throw error when locale information can be found', () => {
    expect(() => {
      const { translate: _translate } = useG11n(dictionary)
    }).toThrow(
      'Define either `defaultLocale` or `locales` in your `next.config.js`'
    )
  })
})
