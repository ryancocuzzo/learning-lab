import * as fs from "fs/promises";
import { BSON } from "bson";

const file = await fs.open("data/data.bson", "w+");

// generate json data
const content: Record<string, any> = {
  foo: 1234,
  bar: true,
  pow: {
    gong: 5678,
  },
};
// convert to binary json data
const bin = BSON.serialize(content);

// write the bson data
await fs.writeFile(file, bin);

// close file
await file.close();
