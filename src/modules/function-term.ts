import { ssrInterpolate } from './interpolate'

type AbstractDictionary = {
  [LocaleAlternative: string]: {
    [TranslationKey: string]: string
  }
}

function createFunctionTerm<
  TranslationKey extends string,
  Locale extends string
>(key: TranslationKey, dictionary: AbstractDictionary): Record<Locale, string> {
  const languages = Object.keys(dictionary)

  return languages.reduce<Record<string, any>>((keySet, locale) => {
    keySet[locale] = dictionary[locale][key]

    return keySet
  }, {})
}

function clientSideTranslate<Locale extends string, Params extends string>(
  term: ReturnType<typeof createFunctionTerm>
): Record<Locale, (params: Record<Params, string>) => string> {
  return Object.keys(term).reduce<Record<string, any>>((callTerm, locale) => {
    callTerm[locale] = ssrInterpolate<Params>(term[locale])

    return callTerm
  }, {})
}

export { AbstractDictionary, clientSideTranslate, createFunctionTerm }
