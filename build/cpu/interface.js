export class Instruction {
    constructor(code, addressMode, operand) {
        this.code = code;
        this.addressingMode = addressMode;
        this.operand = operand;
    }
}
