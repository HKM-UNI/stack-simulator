import cpu from "./components.js";
import { clearStackData, processInfo } from "../memory/data.js";
import { decodeInstruction } from "../assembler.js";
import { instructionSet } from "./arch.js";
import { resetSpOffset } from "../instructions/stack.js";
function fetch() {
    cpu.MAR = cpu.programCounter;
    const counter = cpu.programCounter.parseHex();
    if (counter == processInfo.objectCode.length) {
        processInfo.deallocate();
        return null;
    }
    cpu.aluX = cpu.programCounter;
    cpu.aluY = "0000";
    cpu.aluFlags = "Z=0,O=0";
    cpu.controlUnit = "PCout,MARin,ClrY,SetCin,ADD,Zin";
    const nextCounterHex = (counter + 1).asHex16();
    cpu.programCounter = cpu.aluZ = nextCounterHex;
    const binInstruction = processInfo.objectCode[counter];
    if (!binInstruction) {
        return null;
    }
    const hexInstruction = binInstruction.parseBin().asHex16();
    cpu.instructionRegister = cpu.MDR = hexInstruction;
    cpu.programCounter = (counter + 1).asHex16();
    return decodeInstruction(binInstruction);
}
function getExecutor(opCode) {
    for (const operation in instructionSet) {
        const builtinInstruction = instructionSet[operation];
        if (builtinInstruction.code == opCode) {
            if (!builtinInstruction.executor) {
                throw new ReferenceError(`The operation "${operation}" is not yet implemented.`);
            }
            return builtinInstruction.executor;
        }
    }
    throw new ReferenceError(`The operation "${opCode}" doesn't exists.`);
}
function resetRegisters() {
    const hexRegisters = (document.getElementsByClassName("hex-reg"));
    for (const reg of hexRegisters) {
        reg.value = "0000";
    }
    const textRegisters = (document.getElementsByClassName("text-reg"));
    for (const reg of textRegisters) {
        reg.value = "";
    }
    resetSpOffset();
    clearStackData();
}
function execute(instruction) {
    const runner = getExecutor(instruction.code);
    runner.run(instruction);
}
export { fetch, execute, resetRegisters };
