/*
* Client side script for retrieving chosen user location with Error/Success handling
* @param {array} value - User chosen locations from Dropdown
*
*/
function getUserLocation(){
  google.script.run.withFailureHandler(function(error) {
      throw "Unable to get Location Record";
    })
  .withSuccessHandler(function(result) {
    //Reload datasource if successful
    app.datasources.AppSettingsPublic.load();
    throw "Location Record loaded";
  })
  .getUserLocationServer();
}

/*
* Server side script for retrieving current user's saved location
*/
function getUserLocationServer(){
 var currentUser = Session.getActiveUser().getEmail();
 var query = app.models.AppSettingsPublic.newQuery();
 query.filters.Email._equals = currentUser;
 var record = query.run();
 if (record.length !== 0) {
   console.log("Location Record Found");
   var location = record[0].Location;
   return location;
 } else {
   console.log("No location Record Found for User");
   return;

 }
}
