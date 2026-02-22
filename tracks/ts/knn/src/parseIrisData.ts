import { open } from 'fs/promises';

import type { IrisClassification, IrisDataSet } from './IrisData';

export const parseIrisData = async (filepath: string): Promise<IrisDataSet> => {
  const set: IrisDataSet = [];

  const file = await open(filepath);

  // go line-by-line
  for await (const line of file.readLines()) {
    const data = line.split(',');
    if (data.length < 5) {
      continue;
    }
    const features = data.slice(0, 4).map((dataPointStr) => Number.parseFloat(dataPointStr));
    set.push({ features, classification: data[4]! as IrisClassification });
  }

  await file.close();
  return set;
};
