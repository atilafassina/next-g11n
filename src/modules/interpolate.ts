export function interpolate(
  term: string,
  params: { [key: string]: string | number }
): string {
  return Object.keys(params).reduce((translation, key) => {
    const token = new RegExp(`{{ ${key} }}`, 'g')

    return translation.replace(token, String(params[key]))
  }, term)
}

export function ssrInterpolate<ParamKeys extends string>(
  translationKey: string
) {
  type Params = Record<ParamKeys, string | number>

  return (params: Params) => {
    let paramsList = Object.keys(params)

    return paramsList.reduce<string>((translation, key) => {
      const token = new RegExp(`{{ ${key} }}`, 'g')
      const translatedTerm = params[key as keyof Params]

      return translation.replace(token, String(translatedTerm))
    }, translationKey)
  }
}
