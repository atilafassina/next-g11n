import { useG11n } from '../src'

const dictionary = {
  en: {
    hello: 'Hello world',
    'complex-hello': 'Hello, {{ who }}',
    'repeating-words':
      'Learn {{ prefix }} 2017, {{ prefix }} 2018, {{ prefix }} 2019 for free!',
    'many-hello': 'Hello, {{ he }}, {{ she }}, {{ they }}',
    'and-you': ', and you',
  },
  gc: {
    hello: 'dale',
    'complex-hello': 'Dale, {{ who }}',
    'repeating-words':
      'Bah, bora aprender {{ prefix }} 2017, {{ prefix }} 2018, {{ prefix }} 2019 de graça!',
    'many-hello': 'Dale, {{ he }}, {{ she }}, {{ they }}',
    'and-you': ', e tu',
  },
}

jest.mock('next/router', () => ({
  useRouter: () => ({
    locale: 'en',
    locales: ['en', 'gc'],
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

describe('interpolation', () => {
  it('can interpolate 1 key', () => {
    const { translate: t } = useG11n(dictionary)

    expect(t('complex-hello', { who: 'person' })).toMatch('Hello, person')
  })

  it('can interpolate repeated keys', () => {
    const { translate: t } = useG11n(dictionary)

    expect(t('repeating-words', { prefix: 'ECMAScript' })).toMatch(
      'Learn ECMAScript 2017, ECMAScript 2018, ECMAScript 2019 for free!'
    )
  })

  it('can interpolate multiple keys', () => {
    const { translate: t } = useG11n(dictionary)

    expect(t('many-hello', { he: 'Bob', she: 'Bobba', they: 'Bobs' })).toMatch(
      'Hello, Bob, Bobba, Bobs'
    )
  })

  /**
   * @TODO
   * this feature is not yet implemented
   */
  it.skip('can interpolate translations', () => {
    const { translate: t } = useG11n(dictionary)

    expect(
      t('many-hello', {
        he: 'Bob',
        she: 'Bobba',
        they: 'Bobs',
        you: t('and-you'),
      })
    ).toMatch('Hello, Bob, Bobba, Bobs, and you')
  })
})
