const MAR = document.getElementById("input-mar");
const MDR = document.getElementById("input-mdr");
const instructionRegister = (document.getElementById("input-ir"));
const stackPointer = document.getElementById("input-sp");
const programCounter = document.getElementById("input-pc");
const aluFlags = document.getElementById("input-flags");
const aluX = document.getElementById("input-alu-x");
const aluY = document.getElementById("input-alu-y");
const aluZ = document.getElementById("input-alu-z");
const controlUnit = (document.getElementById("txtarea-cunit"));
const port0 = document.getElementById("input-port0");
const inputSwitch = document.getElementById("input-switch");
const port1 = document.getElementById("input-port1");
const led = document.getElementById("img-led");
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
    readPort(n) {
        if (n == 0) {
            return +port0.value;
        }
        else {
            return +port1.value;
        }
    }
    writePort(n, value) {
        if (n == 0) {
            port0.value = value.asBin8();
        }
        else {
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
    }
    else {
        led.src = "img/led-off.png";
    }
});
export default cpu;
