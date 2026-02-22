/**
 * Z-score standardization: (x - mean) / std per column.
 * Replaces danfojs StandardScaler to avoid @tensorflow/tfjs-node (Node 25 incompatible).
 */

export type ColumnarData = Record<string, number[]>;

export class StandardScaler {
  private means: Record<string, number> = {};
  private stds: Record<string, number> = {};

  fit(data: ColumnarData): this {
    for (const [col, values] of Object.entries(data)) {
      const n = values.length;
      if (n === 0) continue;
      const mean = values.reduce((a, b) => a + b, 0) / n;
      const variance = values.reduce((sum, x) => sum + (x - mean) ** 2, 0) / n;
      const std = Math.sqrt(variance) || 1; // avoid division by zero
      this.means[col] = mean;
      this.stds[col] = std;
    }
    return this;
  }

  transform(data: ColumnarData): ColumnarData {
    const scaled: ColumnarData = {};
    for (const [col, values] of Object.entries(data)) {
      const mean = this.means[col];
      const std = this.stds[col];
      if (mean === undefined || std === undefined) {
        scaled[col] = [...values];
        continue;
      }
      scaled[col] = values.map((x) => (x - mean) / std);
    }
    return scaled;
  }

  fitTransform(data: ColumnarData): ColumnarData {
    return this.fit(data).transform(data);
  }
}
