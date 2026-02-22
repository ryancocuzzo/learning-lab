import Papa from 'papaparse';
import { readFile } from 'fs/promises';
import type { ColumnarData } from './StandardScaler';

/**
 * Parses CSV to columnar numeric data.
 * Avoids danfojs/tfjs for Node 25 compatibility.
 */
export async function parseCsvToColumnar(
  filepath: string,
  numericColumns: string[]
): Promise<ColumnarData> {
  const content = await readFile(filepath, 'utf-8');
  const result = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true,
  });

  const data: ColumnarData = {};
  for (const col of numericColumns) {
    data[col] = result.data.map((row) => Number(row[col]) || 0);
  }
  return data;
}
