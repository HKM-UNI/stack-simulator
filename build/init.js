import { addMemoryRow } from "./memory/memset.js";
const initialMemoryRows = 20;
const initialStackRows = 10;
for (let i = 0; i < initialMemoryRows; i++) {
    addMemoryRow("main-data");
}
for (let i = 0; i < initialStackRows; i++) {
    addMemoryRow("stack-data");
}
Number.prototype.asHex16 = function () {
    return this.toString(16).padStart(4, "0");
};
Number.prototype.asBin8 = function () {
    return this.toString(2).padStart(8, "0");
};
String.prototype.parseBin = function () {
    return parseInt(this, 2);
};
String.prototype.parseHex = function () {
    return parseInt(this, 16);
};
