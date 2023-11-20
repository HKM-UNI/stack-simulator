import { instructionSet, syntax } from "./cpu/arch.js";
import { getDataByVariable } from "./memory/data.js";
import { getSourceCode } from "./editor.js";
import { Instruction } from "./cpu/interface.js";
// Palabra de 16 bits
const OPCODE_LENGTH = 4;
// const ADRESSING_MODE_LENGTH = 1;
const PARAM_LENGTH = 11;
function parseInstruction(text) {
    if (!text) {
        return null;
    }
    let mnemonic = text.split(" ")[0].toUpperCase();
    const operation = instructionSet[mnemonic];
    if (!operation) {
        throw new ReferenceError(`The operation "${mnemonic}" doesn't exists.`);
    }
    let syntaxChecker = new RegExp(syntax[operation.type], "g");
    const instructionItems = syntaxChecker.exec(text);
    if (!instructionItems) {
        throw new SyntaxError(`Couldn't parse "${text}". Check the syntax.`);
    }
    const operationCode = instructionSet[mnemonic].code;
    let addressingMode = 0;
    let operandValue = 0;
    if (instructionItems.length < 3) {
        // Doesn't have operands
        return new Instruction(operationCode, addressingMode, operandValue);
    }
    const operand = instructionItems[2];
    const operandData = getDataByVariable("main-data", operand);
    if (operandData) {
        addressingMode = 1;
        if (!operandData.value) {
            throw new ReferenceError(`The symbol "${operand}" is not initialized.`);
        }
        operandValue = operandData.address.parseHex();
    }
    else {
        operandValue = +operand;
        if (isNaN(operandValue)) {
            throw new ReferenceError(`The symbol "${operand}" is not defined.`);
        }
    }
    return new Instruction(operationCode, addressingMode, operandValue);
}
function encodeInstruction(content) {
    const ins = parseInstruction(content);
    if (!ins) {
        return "";
    }
    const code = ins.code.toString(2).padStart(OPCODE_LENGTH, "0");
    const addressMode = ins.addressingMode.toString(2);
    const operand = ins.operand.toString(2).padStart(PARAM_LENGTH, "0");
    return code + addressMode + operand;
}
function decodeInstruction(content) {
    const operationCode = content.substring(0, 4).parseBin();
    const addressingMode = content.substring(4, 5).parseBin();
    const operand = content.substring(5).parseBin();
    return new Instruction(operationCode, addressingMode, operand);
}
// Use for development only
function decodeText(binaryInstruction) {
    const ins = decodeInstruction(binaryInstruction);
    let opName = "";
    for (const operation in instructionSet) {
        const defaultInstruction = instructionSet[operation];
        if (defaultInstruction.code == ins.code) {
            opName = operation;
        }
    }
    if (!opName) {
        throw new SyntaxError("Couldn't parse Operation Code");
    }
    return `${opName} ${ins.operand}`;
}
function makeObjectCode() {
    const objCode = [];
    const sourceCode = getSourceCode();
    // Check that "END" is present and at the beginning of a line
    //   with or without additional spaces.
    if (!/\n\s*end/.test(sourceCode.toLocaleLowerCase())) {
        throw new SyntaxError('Missing "END" instruction.');
    }
    for (const line of sourceCode.split("\n")) {
        const trimmedLine = line.trim();
        // Ignore entire comment lines
        if (trimmedLine.startsWith(";")) {
            objCode.push("");
        }
        else {
            const objSrc = encodeInstruction(trimmedLine);
            objCode.push(objSrc);
        }
    }
    return objCode;
}
export { makeObjectCode, decodeInstruction };
