import { makeObjectCode } from "./assembler";

const buttonMake = <HTMLButtonElement>document.getElementById("btn-make-obj");
buttonMake.addEventListener("click", makeObjectCode);
