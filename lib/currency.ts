const KZT_PER_USD = 500;

export function formatUsdFromKzt(value: number): string {
  const dollars = Math.max(1, Math.round(value / KZT_PER_USD));

  return `$${dollars.toLocaleString("en-US")}`;
}
