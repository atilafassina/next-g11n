import { interpolate, ssrInterpolate } from './interpolate'
const FIND_VARIABLES_REGEX = /\{\{\s(\S+)\s\}\}/g

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
    if (typeof translation === 'string') {
      if (typeof params === 'object') {
        // client-side hook
        return interpolate(translation, params)
      } else if (translation.match(FIND_VARIABLES_REGEX) !== null) {
        // server-side translation
        return ssrInterpolate(translation)
      }
    }

    return translation
  }
}
