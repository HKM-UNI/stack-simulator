import cpu from "../cpu/components.js";
import { Instruction, Executable } from "../cpu/interface.js";
import { getDataByAddress } from "../memory/data.js";

export class Push implements Executable {
  run(instruction: Instruction) {
    var operandValue = instruction.operand;

    const stackData = getDataByAddress("stack-data", cpu.stackPointer)!;
    const stackPointer = cpu.stackPointer.parseHex();
    cpu.stackPointer = (stackPointer + 1).asHex16();

    if (!instruction.addressingMode) {
      stackData.value = operandValue.toString();
    } else {
      const hexOperand = instruction.operand.asHex16();
      cpu.MAR = hexOperand;

      const actualData = getDataByAddress("main-data", hexOperand)!;
      stackData.variable = actualData.variable;
      stackData.value = actualData.value;
    }
  }
}
