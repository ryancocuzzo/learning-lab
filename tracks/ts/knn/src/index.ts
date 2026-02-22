import { calcKNNClassification } from './calcKNNClassification';
import { parseIrisData } from './parseIrisData';
import { splitIntoDatasets } from './splitData';

const TRAIN_RATIO = 0.75;
const K = 5;

const data = await parseIrisData('data/iris.data');
const { reference, test } = splitIntoDatasets(data, TRAIN_RATIO);

if (test.length === 0) {
  console.log('No test samples to evaluate');
  process.exit(0);
}

const correctCount = test.filter(
  (point) => calcKNNClassification(point, reference, K) === point.classification
).length;
const accuracy = correctCount / test.length;
console.log(`Classified ${(accuracy * 100).toFixed(2)}% of ${test.length} test samples correctly`);
