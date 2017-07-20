/*
* Delete all records from a Model
*/
function deleteModelRecords(){
  var records = app.models.upc.newQuery().run();
  app.deleteRecords(records);
  return "All Records Deleted";
}
/*
* Upload to the database from a spreadsheet using Drive
* @param {id} The id of the user chosen Document
*/
function uploadDatabase(id){
  var sheet = SpreadsheetApp.openById(id);
  var data = sheet.getDataRange().getValues();
  var userLocation = getUserLocationServer();

  for (var i = 0; i < data.length; i++){
    var newRecord = app.models.upc.newRecord();

    newRecord.UPC = String(data[i][0]);
    newRecord.Manufacturer = String(data[i][1]);
    newRecord.Product = String(data[i][2]);
    newRecord.Country = String(data[i][3]);

    app.saveRecords([newRecord]);

    }

    return "Uploaded";
}
