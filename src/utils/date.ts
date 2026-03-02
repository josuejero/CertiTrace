const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function formatRelativeDate(timestamp: string): string {
  const then = new Date(timestamp).getTime();
  const now = Date.now();
  const diff = now - then;
  if (diff < 0) {
    return 'Verified recently';
  }
  const days = Math.floor(diff / MS_PER_DAY);
  if (days === 0) {
    return 'Verified today';
  }
  if (days === 1) {
    return 'Verified yesterday';
  }
  return `Verified ${days} days ago`;
}

export function formatTooltipDate(timestamp: string): string {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}

export function generateFakeRequestNumber(): string {
  const suffix = Math.floor(100000 + Math.random() * 900000);
  return `CT-${suffix}`;
}
