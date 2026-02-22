export enum IrisClassification {
  Setosa = 'Iris-setosa',
  Versicolor = 'Iris-versicolor',
  Virginica = 'Iris-virginica',
}

// e.g (5.1, 3.5, 1.4, 0.2, Iris - setosa)
export type IrisDataPoint = {
  features: number[];
  classification: IrisClassification;
};

export type IrisDataSet = IrisDataPoint[];
