import { getLocale } from './modules/get-locale'
import { translator } from './modules/translator'
import type { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

export function useG11n<Dictionary>(
  dictionary: Dictionary,
  useFallback = false
) {
  type Locale = keyof Dictionary

  const nextRouter = useRouter()

  const locale = getLocale(nextRouter) as Extract<Locale, string>
  const language = dictionary[locale]

  return {
    translate: translator<typeof dictionary[Locale]>(
      useFallback,
      language,
      locale
    ),
  }
}


export function ssrG11n<TranslationKey extends string, Locale extends string>(
  key: TranslationKey,
  dictionary: Record<keyof Omit<GetStaticPropsContext['locales'], 'undefined'>, string>,
): Record<Locale, string> {
  
  return Object.keys(dictionary).reduce<Record<string, string>>((keySet, locale) => {
    keySet[locale] = (dictionary[locale as keyof typeof dictionary][key])

    return keySet
  }, {})
}

export { getLocale }
