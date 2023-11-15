const InitialRowsNumber = 10;

function addRow(tbodyId) {
  const tbody = document.getElementById(tbodyId);
  // based on the last row
  const newRow = tbody.rows[tbody.rows.length - 1].cloneNode(true);
  let hexAddr = parseInt(newRow.cells[0].firstChild.value, 16);

  if (tbody.decrease) {
    hexAddr -= 1;
  } else {
    hexAddr += 1;
  }

  newRow.cells[0].firstChild.value = hexAddr
    .toString(16)
    .toUpperCase()  
    .padStart(4, "0");
  newRow.cells[1].firstChild.value = "";
  newRow.cells[2].firstChild.value = "";
  tbody.appendChild(newRow);
}

for (let i = 0; i < InitialRowsNumber; i++) {
  addRow("main-data");
  addRow("stack-data");
}
