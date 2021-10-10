export const DICTIONARY = {
  en: {
    hello: 'hello world',
    bye: 'bye, {{ person }}',
  },
  gc: {
    hello: 'Dale, tchê',
    bye: 'tchau, {{ person }}',
  },
}

export type Locales = keyof typeof DICTIONARY
export type Keys = keyof typeof DICTIONARY[Locales]
