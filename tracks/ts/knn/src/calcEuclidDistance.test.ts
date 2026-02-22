import { describe, expect, it } from 'vitest';
import { IrisClassification, type IrisDataPoint } from './IrisData';
import { calcEuclidDistance } from './calcEuclidDistance';

describe('calculates euclidean distance', () => {
  it('computes correctly for two simple data points', () => {
    const pointA: IrisDataPoint = {
      features: [0, 0, 0, 1],
      classification: IrisClassification.Setosa,
    };
    const pointB: IrisDataPoint = {
      features: [0, 0, 1, 0],
      classification: IrisClassification.Setosa,
    };
    // diff = 1 at features[2] and 1 at features[3]. Sum is 2. Result should be sqrt(2).
    expect(calcEuclidDistance(pointA, pointB)).toBe(Math.sqrt(2));
  });

  it('throws when points have mismatched feature dimensions', () => {
    const pointA: IrisDataPoint = {
      features: [0, 0, 1],
      classification: IrisClassification.Setosa,
    };
    const pointB: IrisDataPoint = {
      features: [0, 0, 0, 1],
      classification: IrisClassification.Setosa,
    };
    expect(() => calcEuclidDistance(pointA, pointB)).toThrow('Invalid iris data points');
  });
});
