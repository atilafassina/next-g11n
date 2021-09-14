import { interpolate } from './interpolate'

export function translator<Language>(
  useFallback: boolean,
  language: Language,
  locale: string
) {
  return (term: keyof Language, params?: {}) => {
    const translatedTerm = language[term]

    if (!useFallback && !translatedTerm) {
      throw new Error(`key ${String(term)} was not found for locale ${locale}`)
    }

    const translation = Boolean(translatedTerm) ? translatedTerm : term

    // pluralization
    // { count: number }
    if (typeof params === 'object' && typeof translation === 'string') {
      return interpolate(translation, params)
    }

    return translation
  }
}
