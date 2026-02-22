import type { ColumnarData } from './StandardScaler';

/** Prints columnar data as a table (first n rows). */
export function printHead(data: ColumnarData, n = 30): void {
  const cols = Object.keys(data);
  if (cols.length === 0) return;

  const lengths = cols.map((c) => Math.max(c.length, 12));
  const header = cols.map((c, i) => c.padEnd(lengths[i]!)).join(' ');
  console.log(header);
  console.log('-'.repeat(header.length));

  const rowCount = Math.min(n, data[cols[0]!]!.length);
  for (let r = 0; r < rowCount; r++) {
    const row = cols.map((c, i) => String(data[c]![r]).padEnd(lengths[i]!)).join(' ');
    console.log(row);
  }
}
