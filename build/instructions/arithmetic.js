import cpu from "../cpu/components.js";
import { getDataByAddress } from "../memory/data.js";
const MAX_WORD_VALUE = Math.pow(2, 16) - 1;
function performOp(operation) {
    const topOfStackAddress = cpu.stackPointer.parseHex();
    if (topOfStackAddress == 0) {
        throw new ReferenceError("There is not enough data in the stack to perform the operation.");
    }
    const topOfStack = getDataByAddress("stack-data", cpu.stackPointer);
    // cpu.MAR = cpu.stackPointer;
    // cpu.MDR = (+topOfStack.value).asHex16();
    const nextOfStackAddress = (topOfStackAddress - 1).asHex16();
    const nextOfStack = getDataByAddress("stack-data", nextOfStackAddress);
    cpu.MAR = nextOfStackAddress;
    cpu.MDR = (+nextOfStack.value).asHex16();
    cpu.aluX = (+nextOfStack.value).asHex16();
    cpu.aluY = (+topOfStack.value).asHex16();
    cpu.aluFlags = "";
    const result = operation(+nextOfStack.value, +topOfStack.value);
    cpu.aluZ = result.asHex16();
    cpu.aluFlags += `Z=${+(result == 0)}`;
    cpu.aluFlags += `,O=${+(result > MAX_WORD_VALUE)}`;
    cpu.stackPointer = nextOfStackAddress;
    nextOfStack.value = result.toString();
    nextOfStack.variable = "";
    topOfStack.variable = "";
    topOfStack.value = "";
}
export class Add {
    run(_) {
        cpu.controlUnit = "ADD";
        performOp((x, y) => x + y);
    }
}
export class Sub {
    run(_) {
        cpu.controlUnit = "SUB";
        performOp((x, y) => x - y);
    }
}
export class Mul {
    run(_) {
        cpu.controlUnit = "MUL";
        performOp((x, y) => x * y);
    }
}
export class Div {
    run(_) {
        cpu.controlUnit = "DIV";
        performOp((x, y) => x / y);
    }
}
