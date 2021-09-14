export function interpolate(
  term: string,
  params: { [key: string]: string | number }
): string {
  return Object.keys(params).reduce((translation, key) => {
    const token = new RegExp(`{{ ${key} }}`)

    return translation.replace(token, String(params[key]))
  }, term)
}
