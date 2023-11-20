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

const port0 = <HTMLInputElement>document.getElementById("input-port0");
const inputSwitch = <HTMLInputElement>document.getElementById("input-switch");
const port1 = <HTMLInputElement>document.getElementById("input-port1");
const led = <HTMLImageElement>document.getElementById("img-led");

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
  readPort(n: number) {
    if (n == 0) {
      return +port0.value;
    } else {
      return +port1.value;
    }
  }
  writePort(n: number, value: number) {
    if (n == 0) {
      port0.value = value.asBin8();
    } else {
      port1.value = value.asBin8();
      port1.dispatchEvent(new Event("change"));
    }
  }
}

const cpu = new CpuHardware();

inputSwitch.addEventListener("change", () => {
  // Port 0 toggler
  cpu.writePort(0, +!cpu.readPort(0));
});

port1.addEventListener("change", () => {
  const port1Value = cpu.readPort(1);

  if (port1Value % 2) {
    // LSB=1
    led.src = "img/led-on.png";
  } else {
    led.src = "img/led-off.png";
  }
});

export default cpu;
