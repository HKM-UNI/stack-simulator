const ADDRESS_COLUMN = 0;
const VAR_COLUMN = 1;
const VALUE_COLUMN = 2;
class ProcessInfo {
    constructor() {
        this.objectCode = [];
    }
}
var processInfo = new ProcessInfo();
function getData(columnGet, tbodyId, columnSearch, searchValue) {
    const tbody = document.getElementById(tbodyId);
    for (let row of tbody.rows) {
        const memoryCell = row.cells[columnSearch].firstChild;
        const memoryData = row.cells[columnGet].firstChild;
        if (memoryCell.value == searchValue) {
            return memoryData.value;
        }
    }
    return null;
}
function getDataValue(tbodyId, searchValue, searchMode = "var") {
    const columnIndex = searchMode == "var" ? VAR_COLUMN : ADDRESS_COLUMN;
    return getData(VALUE_COLUMN, tbodyId, columnIndex, searchValue);
}
function getDataAddress(tbodyId, variable) {
    return getData(ADDRESS_COLUMN, tbodyId, VAR_COLUMN, variable);
}
export { getDataValue, getDataAddress, processInfo };
