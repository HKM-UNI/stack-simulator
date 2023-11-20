import { makeObjectCode } from "./assembler.js";
import { processInfo, toggleMainDataReadonly } from "./memory/data.js";
import { fetch, execute, resetRegisters } from "./cpu/execution_unit.js";
import * as editor from "./editor.js";
const buttonRun = document.getElementById("btn-run");
const buttonForward = document.getElementById("btn-forward");
const buttonStop = document.getElementById("btn-stop");
function prepare() {
    try {
        resetRegisters();
        editor.resetMarker();
        processInfo.init(makeObjectCode());
    }
    catch (e) {
        alert(e.message);
    }
}
function tryRun() {
    try {
        const ins = fetch();
        if (ins) {
            execute(ins);
        }
    }
    catch (e) {
        alert(e.message);
    }
}
function run() {
    prepare();
    while (processInfo.isRunning) {
        tryRun();
    }
}
function toggleDebugMode(extraSetup = () => { }) {
    editor.toggleReadonly();
    toggleMainDataReadonly();
    extraSetup();
}
function step() {
    if (!processInfo.isRunning) {
        toggleDebugMode(() => {
            prepare();
            buttonStop.classList.remove("invisible");
        });
    }
    editor.highlightNextLine();
    tryRun();
    if (!processInfo.isRunning) {
        toggleDebugMode(() => {
            buttonStop.classList.add("invisible");
        });
    }
}
function stop() {
    buttonStop.classList.add("invisible");
    processInfo.deallocate();
    resetRegisters();
    // This is necessary because stop can always be called while debugging.
    toggleDebugMode(editor.resetMarker);
}
buttonRun.addEventListener("click", run);
buttonForward.addEventListener("click", step);
buttonStop.addEventListener("click", stop);
