import { Instruction, instructionSet, syntax } from "./cpu/arch.js";
import { getDataAddress, getDataValue } from "./memory/data.js";
// Palabra de 16 bits
const OPCODE_LENGTH = 4;
const ADRESSING_MODE_LENGTH = 1;
const PARAM_LENGTH = 11;
function parseInstruction(text) {
    let mnemonic = text.split(" ")[0].toUpperCase();
    const operation = instructionSet[mnemonic];
    if (!operation) {
        return null;
    }
    let syntaxChecker = new RegExp(syntax[operation.type], "g");
    const instructionItems = syntaxChecker.exec(text);
    if (!instructionItems) {
        return null;
    }
    const operationCode = instructionSet[mnemonic].code;
    let addressingMode = 0;
    let operandData = 0;
    if (instructionItems.length < 3) {
        // Doesn't have operands
        return new Instruction(operationCode, addressingMode, operandData);
    }
    const operand = instructionItems[2];
    const dataAdress = getDataAddress("main-data", operand);
    if (dataAdress) {
        addressingMode = 1;
        operandData = parseInt(dataAdress, 16);
    }
    else {
        operandData = +operand;
        if (isNaN(operandData)) {
            return null;
        }
    }
    return new Instruction(operationCode, addressingMode, operandData);
}
function encodeInstruction(content) {
    const ins = parseInstruction(content);
    if (!ins) {
        throw new SyntaxError("Syntax Error");
    }
    const code = ins.code.toString(2).padStart(OPCODE_LENGTH, "0");
    const addressMode = ins.addressingMode.toString(2);
    const operand = ins.operand.toString(2).padStart(PARAM_LENGTH, "0");
    return code + addressMode + operand;
}
function decodeInstruction(content) {
    const operationCode = parseInt(content.substring(0, 4), 2);
    const addressingMode = parseInt(content.substring(4, 5), 2);
    let operandBin = content.substring(5);
    let operand = parseInt(operandBin, 2);
    if (addressingMode) {
        const operandHexAddr = operand.toString(16).padStart(4, "0");
        const operandHexValue = getDataValue("main-data", operandHexAddr, "address");
        if (!operandHexValue) {
            throw new SyntaxError("The operand is an address, but currently points to none.");
        }
        // TODO: Check the base of the operand automatically
        // For now it will be a normal integer
        operand = parseInt(operandHexValue);
    }
    return new Instruction(operationCode, addressingMode, operand);
}
// Use for development only
function revParseInstruction(binaryIns) {
    const ins = decodeInstruction(binaryIns);
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
const textInstruction = "PUSH 107";
const binInstruction = encodeInstruction(textInstruction);
console.log(`${textInstruction} => ${binInstruction} (base 2)`);
console.log(`${binInstruction} => ${revParseInstruction(binInstruction)} (text)`);