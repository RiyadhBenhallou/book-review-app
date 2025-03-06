export function truncateString(text: string) {
  const MAX_LENGTH = 200;
  return text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}...` : text;
}
