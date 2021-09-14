import { getLocale } from './modules/get-locale'
import { translator } from './modules/translator'
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
