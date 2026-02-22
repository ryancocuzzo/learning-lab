import _ from 'lodash';
import { calcEuclidDistance } from './calcEuclidDistance';
import type { IrisDataPoint, IrisDataSet, IrisClassification } from './IrisData';

export const calcKNNClassification = (
  point: IrisDataPoint,
  dataset: IrisDataSet,
  k: number
): IrisClassification => {
  // calculate top k
  const topK = dataset
    .map((dp) => ({ dp: dp, dist: calcEuclidDistance(dp, point) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, k); // note: if k > n, defaults to K=N (all points).

  // bucket their classifications and take most frequent
  const classifications = topK.map((dp) => dp.dp.classification);
  const counts = _.countBy(classifications);
  const max = Object.keys(counts).reduce((maxKey, key) =>
    counts[key]! > counts[maxKey]! ? key : maxKey
  ) as IrisClassification;
  return max;
};
