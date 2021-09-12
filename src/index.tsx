import { useRouter } from 'next/router'

export function useG11n<Dictionary>(
  dictionary: Dictionary,
  useFallback = false
) {
  type Locale = keyof Dictionary
  type Term = keyof Dictionary[Locale]

  const { locale: nextLocale, defaultLocale: nextDefaultLocale } = useRouter()
  const locale = (nextLocale || nextDefaultLocale) as Locale | undefined

  if (!locale) {
    throw new Error(
      'Define either `defaultLocale` or `locales` in your `next.config.js`'
    )
  }

  return {
    translate: (term: Term) => {
      const language = dictionary[locale]
      const translatedTerm = language[term]

      if (!useFallback && !translatedTerm) {
        throw new Error(
          `key ${String(term)} was not found for locale ${locale}`
        )
      }

      return Boolean(translatedTerm) ? translatedTerm : term
    },
  }
}
