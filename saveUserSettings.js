/*
* Client side script for saving chosen user location with Error/Success handling
* @param {array} value - User chosen locations from Dropdown
*
*/
function saveLocation(value){
  //value = value.toString();
  google.script.run.withFailureHandler(function(error) {
      throw "Unable to save Location Record";
    })
  .withSuccessHandler(function(result) {
    app.datasources.AppSettingsPublic.load();
    throw "Location Record Saved";
  })
  .saveLocation(value);
}

/*
* Server side script for saving chosen user location
* @param {array} value - User chosen locations from Dropdown
*
*/
function saveLocation(value){
  var currentUser = Session.getActiveUser().getEmail();
  var query = app.models.AppSettingsPublic.newQuery();
  query.filters.Email._equals = currentUser;
  var records = query.run();

  if (records.length === 0){
   var newRecord = app.models.AppSettingsPublic.newRecord();
   newRecord.Email = currentUser;
   newRecord.Location = value;
   app.saveRecords([newRecord]);
  } else {
    var editRecord = records[0];
    editRecord.Location = value;
    app.saveRecords([editRecord]);
  }
}
