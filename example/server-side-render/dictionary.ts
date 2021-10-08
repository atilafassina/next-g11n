export const DICTIONARY = {
  en: {
    hello: 'hello world',
  },
  gc: {
    hello: 'Dale, tchê',
  },
}

export type Locales = keyof typeof DICTIONARY
export type Keys = keyof typeof DICTIONARY[Locales]
