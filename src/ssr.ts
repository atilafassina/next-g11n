import type { AbstractDictionary } from './modules/function-term'
import {
    clientSideTranslate,
    createFunctionTerm,
  } from './modules/function-term'

function createStaticTerm<TranslationKey extends string, Locale extends string>(
    key: TranslationKey,
    dictionary: AbstractDictionary
  ): Record<Locale, string> {
    const languages = Object.keys(dictionary)
  
    return languages.reduce<Record<string, string>>((keySet, locale) => {
      keySet[locale] = dictionary[locale][key]
  
      return keySet
    }, {})
  }

  export {
    createStaticTerm,
    createFunctionTerm,
    clientSideTranslate,
  }