import { useRouter } from 'next/router'
import { getLocale } from './modules/get-locale'
import { translator } from './modules/translator'

function useG11n<Dictionary>(dictionary: Dictionary, useFallback = false) {
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

export { getLocale, useG11n }
