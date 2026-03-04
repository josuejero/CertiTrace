export function generateUniqueId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  const randomChunk = Math.floor(Math.random() * 1000000);
  return `ct-${Date.now()}-${randomChunk}`;
}
