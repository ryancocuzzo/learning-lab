import _ from 'lodash';
import type { IrisDataSet } from './IrisData';

export const splitIntoDatasets = (
  dataset: IrisDataSet,
  refSetPct: number
): { reference: IrisDataSet; test: IrisDataSet } => {
  const shuffled = _.shuffle(dataset);
  const refSetSize = Math.round(shuffled.length * refSetPct);
  return {
    reference: shuffled.slice(0, refSetSize),
    test: shuffled.slice(refSetSize),
  };
};
