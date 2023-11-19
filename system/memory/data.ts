const ADDRESS_COLUMN = 0;
const VAR_COLUMN = 1;

class ProcessInfo {
  objectCode: string[] = [];
  endSignal: boolean = false;
}

var processInfo = new ProcessInfo();

class DataCell {
  private _address: HTMLInputElement;
  private _variable: HTMLInputElement;
  private _value: HTMLInputElement;

  constructor(dataElements: HTMLCollectionOf<HTMLInputElement>) {
    this._address = dataElements[0];
    this._variable = dataElements[1];
    this._value = dataElements[2];
  }

  get address() {
    return this._address.value;
  }

  set address(value: string) {
    this._address.value = value;
  }

  get variable() {
    return this._variable.value;
  }

  set variable(value: string) {
    this._variable.value = value;
  }

  get value() {
    return this._value.value;
  }

  set value(value: string) {
    this._value.value = value;
  }
}

function getDataCell(
  tbodyId: string,
  columnSearch: number,
  searchValue: string,
) {
  const tbody = <HTMLTableSectionElement>document.getElementById(tbodyId);

  for (let row of tbody.rows) {
    const memoryCell = row.cells[columnSearch].getElementsByTagName("input")[0];

    if (memoryCell.value == searchValue) {
      const dataElements = row.getElementsByTagName("input");

      return new DataCell(dataElements);
    }
  }
  return null;
}

function getDataByAddress(tbodyId: string, address: string) {
  return getDataCell(tbodyId, ADDRESS_COLUMN, address);
}

function getDataByVariable(tbodyId: string, variable: string) {
  return getDataCell(tbodyId, VAR_COLUMN, variable);
}

function clearStackData() {
  const stackTbody = <HTMLTableSectionElement>(
    document.getElementById("stack-data")
  );

  for (let row of stackTbody.rows) {
    const inputCells = row.getElementsByTagName("input");
    inputCells[1].value = ""; // Variable
    inputCells[2].value = ""; // Value
  }
}

export { getDataByAddress, getDataByVariable, clearStackData, processInfo };
