import { NextRouter } from 'next/router'

export const getLocale = (router: NextRouter) => {
  const { locale = '', defaultLocale, locales = [] } = router

  if (!locale && !defaultLocale) {
    throw new Error(
      'Define either `defaultLocale` or `locales` in your `next.config.js`'
    )
  }

  return locales.includes(locale) ? locale : defaultLocale
}
