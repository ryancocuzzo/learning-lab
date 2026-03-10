import * as fs from "fs/promises";

type BsonType = string;
interface BsonDocument {
  [key: string]: number | boolean | BsonDocument;
}
type BsonValue = number | boolean | BsonDocument;

const BsonTypeInverseMap: Record<string, string> = {
  "16": "Integer", // 0x10 = int32
  "8": "Bool", // 0x08 = boolean
  "3": "Document", // 0x03 = embedded document
};

class BsonParser {
  constructor(
    private readonly buffer: Buffer,
    private position = 0,
  ) {}

  private readForward(): number[] {
    const numbers: number[] = [];
    while (this.position < this.buffer.length) {
      // get next byte
      const next = this.buffer.at(this.position)!;
      // increment position
      this.position++;
      // if character code == 0, that means end of this logical unit. exit.
      if (next === 0) break;
      // add the number
      numbers.push(next);
    }
    return numbers;
  }

  private readName(): string {
    const next = this.readForward();
    return next.map((dig) => String.fromCharCode(dig)).join("");
  }

  private readType(): BsonType {
    if (this.position >= this.buffer.length) return "";
    const next = this.buffer.at(this.position)!;
    this.position++;
    return BsonParser.mapNumberToJsonType(next);
  }

  private static mapNumberToJsonType(n: number): BsonType {
    return BsonTypeInverseMap[`${n}`] || "";
  }

  private readValue(type: BsonType): BsonValue {
    if (type === "Document") {
      const start = this.position;
      const size = this.buffer.readInt32LE(start);
      this.position = start + size;
      const slice = this.buffer.subarray(start, start + size);
      const subParser = new BsonParser(slice, 4);
      return subParser.parse();
    }

    if (type === "Bool") {
      const byte = this.buffer.at(this.position)!;
      this.position++;
      return byte === 1;
    }

    if (type === "Integer") {
      const value = this.buffer.readInt32LE(this.position);
      this.position += 4;
      return value;
    }

    throw new Error("unexpected bson value");
  }

  private readNextEntry(): Record<string, BsonValue> {
    const type = this.readType();
    const name = this.readName();
    const value = this.readValue(type);
    return {
      [name]: value,
    };
  }

  parse(): Record<string, BsonValue> {
    let record = {};
    while (this.position < this.buffer.length) {
      try {
        const nextEntry = this.readNextEntry();
        record = { ...record, ...nextEntry };
      } catch {
        break;
      }
    }
    return record;
  }
}

// grab file content
const file = await fs.open("data/data.bson", "r");
const { buffer } = await file.read();

// BSON documents start with a 4-byte int32 (little-endian) for total document size
const parser = new BsonParser(buffer, 4);
console.log(parser.parse());

file.close();
