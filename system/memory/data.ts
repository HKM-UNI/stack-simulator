const ADDRESS_COLUMN = 0;
const VAR_COLUMN = 1;
const VALUE_COLUMN = 2;

class ProcessInfo {
  objectCode: string[] = [];
}

var processInfo = new ProcessInfo();

function getData(
  columnGet: number,
  tbodyId: string,
  columnSearch: number,
  searchValue: string
) {
  const tbody = <HTMLTableSectionElement>document.getElementById(tbodyId);

  for (let row of tbody.rows) {
    const memoryCell = <HTMLInputElement>row.cells[columnSearch].firstChild;
    const memoryData = <HTMLInputElement>row.cells[columnGet].firstChild;

    if (memoryCell.value == searchValue) {
      return memoryData.value;
    }
  }
  return null;
}

function getDataValue(
  tbodyId: string,
  searchValue: string,
  searchMode = "var"
) {
  const columnIndex = searchMode == "var" ? VAR_COLUMN : ADDRESS_COLUMN;
  return getData(VALUE_COLUMN, tbodyId, columnIndex, searchValue);
}

function getDataAddress(tbodyId: string, variable: string) {
  return getData(ADDRESS_COLUMN, tbodyId, VAR_COLUMN, variable);
}

export { getDataValue, getDataAddress, processInfo };
