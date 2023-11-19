import { makeObjectCode } from "./assembler.js";
import { processInfo } from "./memory/data.js";
import { fetch, execute, resetRegisters } from "./cpu/execution_unit.js";

function run() {
  try {
    resetRegisters();
    processInfo.objectCode = makeObjectCode();
    while (!processInfo.endSignal) {
      const ins = fetch();
      if (ins) {
        execute(ins);
      }
    }
  } catch (e: any) {
    alert(e.message);
  }
}

const buttonRun = <HTMLButtonElement>document.getElementById("btn-run");
const buttonForward = <HTMLButtonElement>document.getElementById("btn-forward");
const buttonStop = <HTMLButtonElement>document.getElementById("btn-forward");
buttonRun.addEventListener("click", run);
