import { callableTerm, ssrG11n } from '../src'

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

describe('when `key` exists', () => {
  it('should return a dictionary for all translations of a `key`', () => {
    const hello = ssrG11n('hello', dictionary)

    expect(hello).toMatchObject({
      gc: 'dale',
      en: 'Hello world',
    })
  })
})

describe('interpolation', () => {
  it('can interpolate 1 key', () => {
    const complexHello = callableTerm('complex-hello', dictionary)
    expect(complexHello.en({ who: 'you' })).toBe('Hello, you')
    expect(complexHello.gc({ who: 'tu' })).toBe('Dale, tu')
  })

  it('can interpolate repeated keys', () => {
    const repeatingWords = callableTerm('repeating-words', dictionary)

    expect(repeatingWords.en({ prefix: 'ECMAScript' })).toMatch(
      'Learn ECMAScript 2017, ECMAScript 2018, ECMAScript 2019 for free!'
    )
    expect(repeatingWords.gc({ prefix: 'ECMAScript' })).toMatch(
      'Bah, bora aprender ECMAScript 2017, ECMAScript 2018, ECMAScript 2019 de graça!'
    )
  })

  it('can interpolate multiple keys', () => {
    const manyHello = callableTerm('many-hello', dictionary)

    expect(manyHello.en({ he: 'Bob', she: 'Bobba', they: 'Bobs' })).toMatch(
      'Hello, Bob, Bobba, Bobs'
    )
    expect(manyHello.gc({ he: 'Bob', she: 'Bobba', they: 'Bobs' })).toMatch(
      'Dale, Bob, Bobba, Bobs'
    )
  })
})
