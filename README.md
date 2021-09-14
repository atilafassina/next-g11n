<div align="center">
  <img src="light-logo.png" alt="next-g11n logo" />

## next-g11n 🌐

![npm badge](https://img.shields.io/npm/v/next-g11n?color=%23df0000&style=flat-square)
![typescript badge](https://img.shields.io/npm/types/next-g11n?style=flat-square)

</div>

🪡 tailor-made for [Next.js i18n Routing](https://nextjs.org/docs/advanced-features/i18n-routing)

📦 ~300b (minified and gzipped)

👮 Type-safe dictionaries

<div align="center">
  <img src="screenshot-vscode.png" alt="vscode screenshot of missing translation yielding warning" />
</div>

## Getting started 🏗

1. Install the dependency
   `yarn add next-g11n` or `npm i next-g11n`

2. Create your `dictionary.ts` (or any other name, actually)

```ts
// example dictionary.ts
const dictionary = {
  // top level are locales (de) or (de-at), for example
  en: {
    // these are the translation keys
    hello: 'Hi',
  },
  'de-de': {
    hello: 'Hallo',
  },
  'de-at': {
    hello: 'Grüß Gott',
  },
}
```

3. When you call your hook, establish the types for the dictionary

```tsx
import type { NextPage } from 'next'
import { useG11n } from 'next-g11n'
import { DICTIONARY } from '../dictionary'

const Home: NextPage = () => {
  const { translate: t } = useG11n<typeof DICTIONARY>(DICTIONARY)

  return (
    <h1>{t('hello')}</h1>
  )
}

```

## API 🧠

### dictionary

| type     | default |
| -------- | ------- |
| `object` | -       |

The translation object/map. It can either carry one locale, or all. The object format is as follows:

```ts
{
  'locale-key': {
    'translation-key': 'value - number or string'
  }
}
```

### useFallback

When `true`, if the translation does not exist in dictionary, the `key` will show. When set to false, it will throw an error.

| type      | default |
| --------- | ------- |
| `boolean` | `false` |

† recomended for apps without TypeScript

## Examples 🍱

| directory                                  | description                         |
| ------------------------------------------ | ----------------------------------- |
| [bare-bones](tree/main/example/bare-bones) | the minimal possible implementation |

## Additional info ❓

- Support starts with Next.js i18n Routing, so `v10+`
- Next.js is a `peerDependency`
- React is a `peerDependency`

## Glossary 📖

| abbreviation | full word            | meaning                                              |
| ------------ | -------------------- | ---------------------------------------------------- |
| i18n         | internationalization | enable adaptation of a product to multiple languages |
| L10n         | localization         | translating and customizing to a specific place      |
| g11n         | globalization        | addressing requirements to launch globally           |
