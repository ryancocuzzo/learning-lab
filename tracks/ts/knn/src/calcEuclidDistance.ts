import type { IrisDataPoint } from './IrisData';

// Euclidian distance
export const calcEuclidDistance = (pointA: IrisDataPoint, pointB: IrisDataPoint): number => {
  const n = pointA.features.length;
  if (n !== pointB.features.length) throw new Error('Invalid iris data points');
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += (pointA.features[i]! - pointB.features[i]!) ** 2;
  }
  return Math.sqrt(sum);
};
