import type { FC } from 'react'

export type DictionaryMap<LOCALES extends string, TERMS extends string> = {
  [key in LOCALES]: {
    [key in TERMS]: string
  }
}

export type G10nProps<Locales extends string, Terms extends string> = {
  dictionaryMap: DictionaryMap<Locales, Terms>
  defaultLocale: string
  locale?: string
  useFallback?: boolean
}

// Term and Locale cannot be `symbol` nor `number`
export type G10ProviderProps<Term = string, Locale = string> = FC<
  G10nProps<Extract<keyof Term, string>, Extract<keyof Locale, string>>
>
