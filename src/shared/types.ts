export type DateModel = {
  formatted: { date: string | null; time: string | null } | null;
  date: Date | null;
  raw: string | number | null;
};
