function insertRows(idSpreedSheet, sheetName, newValuesRows, columnMapping = []) {
  // columnMapping = is used as an interface to relate field names in a data structure to column names in a file format. 

  var ss= SpreadsheetApp.openById(idSpreedSheet);
  var sheet = ss.getSheetByName(sheetName)
  const headers = getColumnOrder(sheet);

  if (!newValuesRows || newValuesRows.length === 0) {
    throw new Error('List rows is empty');
  }

  const newValues = [];

  for (const valuesRows of newValuesRows) {
    const newRow = [];

    for (const header of headers) {
      const fieldName = columnMapping[header] || header;
      const value = valuesRows[fieldName] || '';
      newRow.push(value);
    }

    newValues.push(newRow);
  }
  sheet.getRange(sheet.getLastRow() + 1, 1, newValues.length, headers.length).setValues(newValues);
  return newValues.length;
}
