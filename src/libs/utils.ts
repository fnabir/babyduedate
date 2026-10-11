export const parseToDate = (v: string) => {
  const [y, m, d] = v.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};

export const todayUTC = () => {
  const n = new Date();
  return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
};

export const isoDate = (t: number) => new Date(t).toISOString().slice(0, 10);

export const formattedDate = (t: number, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...o }).format(t);

export const plural = (n: number, w: string) =>
  `${n} ${w}${n === 1 ? "" : "s"}`;
