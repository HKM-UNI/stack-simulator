"use strict";
const InitialRowsNumber = 10;
function addRow(tbodyId) {
    const tbody = document.getElementById(tbodyId);
    // based on the last row
    const newRow = (tbody.rows[tbody.rows.length - 1].cloneNode(true));
    const inputElements = newRow.getElementsByTagName("input");
    const addressInput = inputElements[0];
    const varInput = inputElements[1];
    const valueInput = inputElements[2];
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
