export const MIN_TRACK_ITEMS = 40;

export function buildMarqueeTrack<T>(
  items: T[],
  minItems: number = MIN_TRACK_ITEMS,
): T[] {
  if (items.length === 0) return [];

  const copies = Math.ceil(minItems / items.length);
  const half = Array.from({ length: copies }, () => items).flat();

  return [...half, ...half];
}
