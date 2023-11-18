const MAR = <HTMLInputElement>document.getElementById("input-mar");
const MDR = <HTMLInputElement>document.getElementById("input-mdr");
const instructionRegister = <HTMLInputElement>(
  document.getElementById("input-ir")
);
const stackPointer = <HTMLInputElement>document.getElementById("input-sp");
const programCounter = <HTMLInputElement>document.getElementById("input-pc");
const aluFlags = <HTMLInputElement>document.getElementById("input-flags");
const aluX = <HTMLInputElement>document.getElementById("input-alu-x");
const aluY = <HTMLInputElement>document.getElementById("input-alu-y");
const aluZ = <HTMLInputElement>document.getElementById("input-alu-z");
const controlUnit = <HTMLTextAreaElement>(
  document.getElementById("txtarea-cunit")
);
const ioRegister = <HTMLTextAreaElement>document.getElementById("txtarea-io");

class CpuHardware {
  get MAR() {
    return MAR.value;
  }
  set MAR(value) {
    MAR.value = value;
  }
  get MDR() {
    return MDR.value;
  }
  set MDR(value) {
    MDR.value = value;
  }
  get instructionRegister() {
    return instructionRegister.value;
  }
  set instructionRegister(value) {
    instructionRegister.value = value;
  }
  get stackPointer() {
    return stackPointer.value;
  }
  set stackPointer(value) {
    stackPointer.value = value;
  }
  get programCounter() {
    return programCounter.value;
  }
  set programCounter(value) {
    programCounter.value = value;
  }
  get aluFlags() {
    return aluFlags.value;
  }
  set aluFlags(value) {
    aluFlags.value = value;
  }
  get aluX() {
    return aluX.value;
  }
  set aluX(value) {
    aluX.value = value;
  }
  get aluY() {
    return aluY.value;
  }
  set aluY(value) {
    aluY.value = value;
  }
  get aluZ() {
    return aluZ.value;
  }
  set aluZ(value) {
    aluZ.value = value;
  }
  get controlUnit() {
    return controlUnit.value;
  }
  set controlUnit(value) {
    controlUnit.value = value;
  }
  get ioRegister() {
    return ioRegister.value;
  }
  set ioRegister(value) {
    ioRegister.value = value;
  }
}

const cpu = new CpuHardware();

export default cpu;
