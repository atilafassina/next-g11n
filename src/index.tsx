import { getLocale } from './modules/get-locale'
import { translator } from './modules/translator'
import { useRouter } from 'next/router'
import { ssrInterpolate } from './modules/interpolate'

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

type AbstractDictionary = {
  [LocaleAlternative: string]: {
    [TranslationKey: string]: string
  }
}

function createAllTranslators(
  languages: string[],
  dictionary: AbstractDictionary
) {
  return languages.reduce((translators, language) => {
    translators[language] = translator(false, dictionary[language], language)

    return translators
  }, {} as { [key: string]: any })
}

function ssrG11n<TranslationKey extends string, Locale extends string>(
  key: TranslationKey,
  dictionary: AbstractDictionary
): Record<Locale, string> {
  const languages = Object.keys(dictionary)

  return languages.reduce<Record<string, string>>((keySet, locale) => {
    keySet[locale] = dictionary[locale][key]

    return keySet
  }, {})
}

function callableTerm<TranslationKey extends string, Locale extends string>(
  key: TranslationKey,
  dictionary: AbstractDictionary
): Record<Locale, ReturnType<typeof ssrInterpolate>> {
  const languages = Object.keys(dictionary)
  const translators = createAllTranslators(languages, dictionary)

  return languages.reduce<Record<string, any>>((keySet, locale) => {
    keySet[locale] = translators[locale](key)

    return keySet
  }, {})
}

export { getLocale, ssrG11n, callableTerm, useG11n }
