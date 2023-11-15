class Instruction {
  code: number;
  addressingMode: number;
  operand: number;

  constructor(code: number, addressMode: number, operand: number) {
    this.code = code;
    this.addressingMode = addressMode;
    this.operand = operand;
  }
}

const syntax: { [key: string]: RegExp } = {
  addressable: /\s*([a-zA-Z]+)\s+(\d+)\s*/,
  op: /\s*([a-zA-Z]+)\s*/,
  transfer: /\s*([a-zA-Z]+)\s+(\d+|[a-zA-Z_][a-zA-Z0-9_]*)\s*/,
};

const instructionSet: { [key: string]: { code: number; type: string } } = {
  PUSH: {
    code: 0,
    type: "transfer",
  },
  POP: {
    code: 1,
    type: "transfer",
  },
  ADD: {
    code: 2,
    type: "op",
  },
  SUB: {
    code: 3,
    type: "op",
  },
  MUL: {
    code: 4,
    type: "op",
  },
  DIV: {
    code: 5,
    type: "op",
  },
  HALT: {
    code: 6,
    type: "op",
  },
  IN: {
    code: 7,
    type: "addressable",
  },
  OUT: {
    code: 8,
    type: "addressable",
  }
};

export { Instruction, instructionSet, syntax };
