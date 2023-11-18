import { addMemoryRow } from "./memory/memset.js";
const initialMemoryRows = 20;
const initialStackRows = 10;
for (let i = 0; i < initialMemoryRows; i++) {
    addMemoryRow("main-data");
}
for (let i = 0; i < initialStackRows; i++) {
    addMemoryRow("stack-data");
}
