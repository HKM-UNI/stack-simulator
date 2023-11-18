import { addMemoryRow } from "./memory/memset.js";

const initialMemoryRows = 20;
const initialStackRows = 10;

for (let i = 0; i < initialMemoryRows; i++) {
  addMemoryRow("main-data");
}
for (let i = 0; i < initialStackRows; i++) {
  addMemoryRow("stack-data");
}

declare global {
  export interface Number {
    asHex16(): string;
  }
  export interface String {
    parseBin(): number;
    parseHex(): number;
  }
}

Number.prototype.asHex16 = function (this: number) {
  return this.toString(16).padStart(4, "0");
};

String.prototype.parseBin = function (this: string) {
  return parseInt(this, 2);
};

String.prototype.parseHex = function (this: string) {
  return parseInt(this, 16);
};
