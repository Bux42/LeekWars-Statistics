export function getDateDelta(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function dateDeltaToRelativeString(days: number): string {
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export function getDateDeltaString(date1: Date, date2: Date): string {
  const days = getDateDelta(date1, date2);
  return dateDeltaToRelativeString(days);
}
