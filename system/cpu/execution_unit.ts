import cpu from "./components.js";
import { processInfo } from "../memory/data.js";
import { decodeInstruction } from "../assembler.js";
import { instructionSet } from "./arch.js";
import { Instruction, Executable } from "./interface.js";
import { resetSpOffset } from "../instructions/stack.js";

function fetch(): Instruction | null {
  cpu.MAR = cpu.programCounter;
  const counter = cpu.programCounter.parseHex();

  if (counter == processInfo.objectCode.length) {
    return null;
  }

  const nextCounterHex = (counter + 1).asHex16();
  cpu.aluFlags = "Z=0,Of=0";
  cpu.controlUnit = "PCout,MARin,ClrY,SetCin,ADD,Zin";
  cpu.programCounter = cpu.aluZ = nextCounterHex;

  const binInstruction = processInfo.objectCode[counter];
  const hexInstruction = binInstruction.parseBin().asHex16();
  cpu.instructionRegister = cpu.MDR = hexInstruction;

  cpu.programCounter = (counter + 1).asHex16();
  return decodeInstruction(binInstruction);
}

function getExecutor(opCode: number): Executable {
  for (const operation in instructionSet) {
    const builtinInstruction = instructionSet[operation];
    if (builtinInstruction.code == opCode) {
      if (!builtinInstruction.executor) {
        throw new ReferenceError(
          `The operation "${operation}" is not yet implemented.`,
        );
      }
      return builtinInstruction.executor;
    }
  }
  throw new ReferenceError(`The operation "${opCode}" doesn't exists.`);
}

function resetRegisters(): void {
  const hexRegisters = <HTMLCollectionOf<HTMLInputElement>>(
    document.getElementsByClassName("hex-reg")
  );
  for (const reg of hexRegisters) {
    reg.value = "0000";
  }

  const textRegisters = <HTMLCollectionOf<HTMLInputElement>>(
    document.getElementsByClassName("text-reg")
  );
  for (const reg of textRegisters) {
    reg.value = "";
  }

  resetSpOffset();
}

function execute(instruction: Instruction): void {
  const runner = getExecutor(instruction.code);
  runner.run(instruction);
}

export { fetch, execute, resetRegisters };
