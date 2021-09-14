import { NextRouter } from 'next/router'

export const getLocale = (router: NextRouter) => {
  const { locale, defaultLocale } = router

  if (!locale && !defaultLocale) {
    throw new Error(
      'Define either `defaultLocale` or `locales` in your `next.config.js`'
    )
  }

  return locale || defaultLocale
}
