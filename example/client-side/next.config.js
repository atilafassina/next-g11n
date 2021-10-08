/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'gc'],
    defaultLocale: 'en',
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // workaround to get this example to play together with
      // developing the package locally with `yarn link`
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }

    return config
  },
}
