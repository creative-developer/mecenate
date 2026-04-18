export const trimTextPlaceholder = (value: string) => value.trim();

export const toSafeString = (value: string | null | undefined, fallback = ''): string => {
  return typeof value === 'string' ? value : fallback;
};

export const toNullableString = (value: string | null | undefined): string | null => {
  return typeof value === 'string' && value.length ? value : null;
};
