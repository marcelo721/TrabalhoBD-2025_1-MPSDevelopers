export function getFirstLetter(name: string): string {
  if (!name) return ''
  return name.charAt(0).toUpperCase()
}
