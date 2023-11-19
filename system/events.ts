import { makeObjectCode } from "./assembler.js";
import { processInfo } from "./memory/data.js";
import { fetch, execute, resetRegisters } from "./cpu/execution_unit.js";

const buttonRun = <HTMLButtonElement>document.getElementById("btn-run");
const buttonForward = <HTMLButtonElement>document.getElementById("btn-forward");
const buttonStop = <HTMLButtonElement>document.getElementById("btn-stop");

function prepare() {
  try {
    resetRegisters();
    processInfo.init(makeObjectCode());
  } catch (e: any) {
    alert(e.message);
  }
}

function tryRun() {
  try {
    const ins = fetch();
    if (ins) {
      execute(ins);
    }
  } catch (e: any) {
    alert(e.message);
  }
}

function run() {
  prepare();
  while (processInfo.isRunning) {
    tryRun();
  }
}

function step() {
  if (!processInfo.isRunning) {
    buttonStop.classList.toggle("invisible");
    prepare();
  }
  tryRun();
  if (!processInfo.isRunning) {
    buttonStop.classList.toggle("invisible");
  }
}

function stop() {
  processInfo.deallocate();
  resetRegisters();
  buttonStop.classList.toggle("invisible");
}

buttonRun.addEventListener("click", run);
buttonForward.addEventListener("click", step);
buttonStop.addEventListener("click", stop);
