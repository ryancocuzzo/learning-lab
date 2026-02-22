/**
 * Domain type for mango price records.
 * Maps to CSV columns: ID, Date, AveragePrice, Total Volume,
 * Mango_4046, Mango_4225, Mango_4770, Small Bags, Large Bags, Total Bags.
 */
export type MangoRecord = {
  id: number;
  date: Date;
  averagePrice: number;
  totalVolume: number;
  plu4046: number;
  plu4225: number;
  plu4770: number;
  smallBags: number;
  largeBags: number;
  totalBags: number;
};

/** Convert parsed CSV rows to MangoRecord[]. */
export function toMangoRecords(rows: Record<string, string>[]): MangoRecord[] {
  return rows.map((row) => ({
    id: Number(row['ID']),
    date: new Date(row['Date'] ?? ''),
    averagePrice: Number(row['AveragePrice']),
    totalVolume: Number(row['Total Volume']),
    plu4046: Number(row['Mango_4046']),
    plu4225: Number(row['Mango_4225']),
    plu4770: Number(row['Mango_4770']),
    smallBags: Number(row['Small Bags']),
    largeBags: Number(row['Large Bags']),
    totalBags: Number(row['Total Bags']),
  }));
}
