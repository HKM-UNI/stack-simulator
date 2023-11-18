const InitialRowsNumber = 10;

function addRow(tbodyId: string) {
  const tbody = <HTMLTableSectionElement>document.getElementById(tbodyId);
  // based on the last row
  const newRow = <HTMLTableRowElement>(
    tbody.rows[tbody.rows.length - 1].cloneNode(true)
  );

  const addressInput = <HTMLInputElement>newRow.cells[0].firstChild;
  const varInput = <HTMLInputElement>newRow.cells[1].firstChild;
  const valueInput = <HTMLInputElement>newRow.cells[2].firstChild;

  const nexHexAddr = parseInt(addressInput.value, 16) + 1;
  addressInput.value = nexHexAddr.toString(16).toUpperCase().padStart(4, "0");
  varInput.value = "";
  valueInput.value = "";

  tbody.appendChild(newRow);
}

for (let i = 0; i < InitialRowsNumber; i++) {
  addRow("main-data");
  addRow("stack-data");
}
