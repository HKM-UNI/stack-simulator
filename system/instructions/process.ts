import { Instruction, Executable } from "../cpu/interface.js";
import { processInfo } from "../memory/data.js";

export class End implements Executable {
  run(_: Instruction) {
    processInfo.endSignal = true;
  }
}
