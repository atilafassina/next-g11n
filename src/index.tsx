import type { G10ProviderProps, G10nProps } from './type-utils'
import React, { createContext, useContext } from 'react'

const G10nContext = createContext<Partial<G10nProps<string, string>>>({})

export const G10nProvider: G10ProviderProps = ({
  children,
  dictionaryMap,
  locale,
  defaultLocale,
  useFallback = false
}) => {

  return (
    <G10nContext.Provider
      value={{
        dictionaryMap: dictionaryMap ?? {},
        locale: locale ?? defaultLocale,
        useFallback
      }}
    >
      {children}
    </G10nContext.Provider>
  )
}

export function useG10n() {
  const context = useContext(G10nContext)

  if (!context) {
    throw new Error('useG10n must be used inside a `G10nProvider`')
  }


  const {
    dictionaryMap,
    locale = '',
    useFallback
  } = context

  if (!dictionaryMap) {
    throw new Error('`dictionaryMap` cannot be `undefined`')
  }

  return {
    translate: (term:keyof typeof dictionaryMap) => {
      const translatedTerm = dictionaryMap[locale]?.[term] || undefined
      
      if (!useFallback && !translatedTerm)  {
        throw new Error(`key ${String(term)} was not found for locale ${locale}`)
      }

      return Boolean(translatedTerm) ? translatedTerm : term
    },
  }
}
