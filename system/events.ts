import { makeObjectCode } from "./assembler.js";

const buttonMake = <HTMLButtonElement>document.getElementById("btn-make-obj");
buttonMake.addEventListener("click", makeObjectCode);
