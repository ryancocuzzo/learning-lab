import { parseCsvToColumnar } from './ColumnarCsvParser';
import { StandardScaler } from './StandardScaler';
import { printHead } from './printColumnar';

const filepath = 'data/mango_prices.csv';

const numericCols = [
  'AveragePrice',
  'Total Volume',
  'Mango_4046',
  'Mango_4225',
  'Mango_4770',
  'Small Bags',
  'Large Bags',
  'Total Bags',
];

const data = await parseCsvToColumnar(filepath, numericCols);
const scaler = new StandardScaler();
const scaledData = scaler.fitTransform(data);

printHead(scaledData, 30);
