import { Push, Pop } from "../instructions/stack.js";
import { Add, Sub, Mul, Div } from "../instructions/arithmetic.js";
import { Executable } from "./interface.js";
import { End } from "../instructions/process.js";
import { Input, Output } from "../instructions/io.js";

const syntax: { [key: string]: RegExp } = {
  addressable: /([a-zA-Z]+)\s+(\d+)/,
  op: /([a-zA-Z]+)/,
  transfer: /([a-zA-Z]+)\s+(\d+|[a-zA-Z_][a-zA-Z0-9_]*)/,
};

const instructionSet: {
  [key: string]: { code: number; type: string; executor: Executable | null };
} = {
  PUSH: {
    code: 0,
    type: "transfer",
    executor: new Push(),
  },
  POP: {
    code: 1,
    type: "transfer",
    executor: new Pop(),
  },
  ADD: {
    code: 2,
    type: "op",
    executor: new Add(),
  },
  SUB: {
    code: 3,
    type: "op",
    executor: new Sub(),
  },
  MUL: {
    code: 4,
    type: "op",
    executor: new Mul(),
  },
  DIV: {
    code: 5,
    type: "op",
    executor: new Div(),
  },
  END: {
    code: 6,
    type: "op",
    executor: new End(),
  },
  IN: {
    code: 7,
    type: "addressable",
    executor: new Input(),
  },
  OUT: {
    code: 8,
    type: "addressable",
    executor: new Output(),
  },
};

export { instructionSet, syntax };
