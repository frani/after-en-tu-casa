export default function isBlank(str: string): boolean {
  return str.replace(/\s/g, '') === '';
}
