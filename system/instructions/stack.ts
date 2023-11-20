import cpu from "../cpu/components.js";
import { Instruction, Executable } from "../cpu/interface.js";
import { getDataByAddress, DataCell } from "../memory/data.js";

var spOffset = 0;

export function resetSpOffset() {
  spOffset = 0;
}

export class Push implements Executable {
  run(instruction: Instruction) {
    let nextStackPointer = cpu.stackPointer.parseHex() + spOffset;
    // Workaround when starting at "0000".
    if (!spOffset) {
      spOffset = 1;
    }
    cpu.stackPointer = nextStackPointer.asHex16();
    const stackData = getDataByAddress("stack-data", cpu.stackPointer)!;

    const operandValue = instruction.operand;
    if (!instruction.addressingMode) {
      stackData.value = operandValue.toString();
    } else {
      const hexOperand = operandValue.asHex16();
      cpu.MAR = hexOperand;

      const actualData = getDataByAddress("main-data", hexOperand)!;
      stackData.variable = actualData.variable;
      stackData.value = actualData.value;
    }
  }
}

export function deStack(): DataCell {
  const topOfStack = getDataByAddress("stack-data", cpu.stackPointer)!;

  if (!topOfStack.value) {
    throw new ReferenceError(
      "There is no data at the address of the stack pointer.",
    );
  }

  let nextStackPointer = cpu.stackPointer.parseHex();
  // Avoids going negative
  if (nextStackPointer == 0) {
    resetSpOffset();
  } else {
    nextStackPointer -= 1;
  }
  cpu.stackPointer = nextStackPointer.asHex16();

  return topOfStack;
}

export class Pop implements Executable {
  run(instruction: Instruction) {
    if (!instruction.addressingMode) {
      throw new ReferenceError("You must 'POP' to a variable in main memory");
    }

    const topOfStack = deStack();

    const hexOperand = instruction.operand.asHex16();
    cpu.MAR = hexOperand;
    const actualData = getDataByAddress("main-data", hexOperand)!;
    // cpu.controlUnit = "IR(5-16)out, MARin, READ";

    cpu.MDR = (+topOfStack.value).asHex16();
    cpu.controlUnit = "SPout, MDRin, WRITE";
    actualData.value = topOfStack.value;

    topOfStack.variable = "";
    topOfStack.value = "";
  }
}
