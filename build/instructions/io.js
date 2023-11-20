import cpu from "../cpu/components.js";
import { Push, deStack } from "./stack.js";
const internalPush = new Push();
const OVERFLOW_8BIT_DELTA = Math.pow(2, 8);
export class Input {
    run(instruction) {
        const portNumber = instruction.operand;
        if (portNumber != 0) {
            throw new ReferenceError(`Port number ${portNumber} is not an input port.`);
        }
        cpu.controlUnit = "Port0out, SPin";
        instruction.operand = cpu.readPort(portNumber);
        internalPush.run(instruction);
    }
}
export class Output {
    run(instruction) {
        const portNumber = instruction.operand;
        if (portNumber != 1) {
            throw new ReferenceError(`Port number ${portNumber} is not an output port.`);
        }
        cpu.MAR = cpu.stackPointer;
        const topOfStack = deStack();
        const tosValue = +topOfStack.value;
        if (tosValue < 0) {
            throw new ReferenceError(`The value "${tosValue}" is not suitable for the output port.`);
        }
        cpu.MDR = tosValue.asHex16();
        cpu.controlUnit = "SPout, Port1in";
        cpu.writePort(portNumber, tosValue % OVERFLOW_8BIT_DELTA);
        topOfStack.variable = "";
        topOfStack.value = "";
    }
}
