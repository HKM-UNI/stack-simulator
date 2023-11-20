export class Instruction {
  code: number;
  addressingMode: number;
  operand: number;

  constructor(code: number, addressMode: number, operand: number) {
    this.code = code;
    this.addressingMode = addressMode;
    this.operand = operand;
  }
}

export interface Executable {
  run(instruction: Instruction): void;
}
