const ADDRESS_COLUMN = 0;
const VAR_COLUMN = 1;
class ProcessInfo {
    constructor() {
        this._objectCode = [];
        this._isRunning = false;
    }
    get objectCode() {
        return this._objectCode;
    }
    get isRunning() {
        return this._isRunning;
    }
    deallocate() {
        this._objectCode = [];
        this._isRunning = false;
    }
    init(code) {
        this._objectCode = code;
        this._isRunning = true;
    }
}
var processInfo = new ProcessInfo();
class DataCell {
    constructor(dataElements) {
        this._address = dataElements[0];
        this._variable = dataElements[1];
        this._value = dataElements[2];
    }
    get address() {
        return this._address.value;
    }
    set address(value) {
        this._address.value = value;
    }
    get variable() {
        return this._variable.value;
    }
    set variable(value) {
        this._variable.value = value;
    }
    get value() {
        return this._value.value;
    }
    set value(value) {
        this._value.value = value;
    }
}
function getDataCell(tbodyId, columnSearch, searchValue) {
    const tbody = document.getElementById(tbodyId);
    for (let row of tbody.rows) {
        const memoryCell = row.cells[columnSearch].getElementsByTagName("input")[0];
        if (memoryCell.value == searchValue) {
            const dataElements = row.getElementsByTagName("input");
            return new DataCell(dataElements);
        }
    }
    return null;
}
function getDataByAddress(tbodyId, address) {
    return getDataCell(tbodyId, ADDRESS_COLUMN, address);
}
function getDataByVariable(tbodyId, variable) {
    return getDataCell(tbodyId, VAR_COLUMN, variable);
}
function clearStackData() {
    const stackTbody = (document.getElementById("stack-data"));
    for (let row of stackTbody.rows) {
        const inputCells = row.getElementsByTagName("input");
        inputCells[1].value = ""; // Variable
        inputCells[2].value = ""; // Value
    }
}
function toggleMainDataReadonly() {
    const dataTbody = (document.getElementById("main-data"));
    for (let row of dataTbody.rows) {
        const inputCells = row.getElementsByTagName("input");
        inputCells[1].readOnly = !inputCells[1].readOnly;
        inputCells[2].readOnly = !inputCells[2].readOnly;
    }
}
export { getDataByAddress, getDataByVariable, clearStackData, toggleMainDataReadonly, processInfo, DataCell, };
