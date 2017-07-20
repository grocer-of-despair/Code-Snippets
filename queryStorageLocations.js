function getLocations(){
  // Assign your Google Cloud Platform Project ID
  var projectId = 'google.com:example';
  var request = {
    //  Use BigQuery to find the name of the relevant database
    query: 'SELECT name FROM [google.com:database_example] WHERE type = "Storage"'
  };
  var queryResults = BigQuery.Jobs.query(request, projectId);
  var jobId = queryResults.jobReference.jobId;

  // Check on status of the Query Job.
  var sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }

  // Get all the rows of results.
  var rows = queryResults.rows;
  while (queryResults.pageToken) {
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
      pageToken: queryResults.pageToken
    });
    rows = rows.concat(queryResults.rows);
  }

  if (rows) {

    var n = null;
    var records = [];

    console.log('BQ query successful. Loading rows into data model. rows length is ' + rows.length);
    for (i = 0; i < rows.length; i++) {
      n = app.models.Locations.newRecord();
      n.Locations = rows[i].f[0].v;

      records.push(n);
    }
    return records.sort();
  } else {
    console.log("BigQuery returned no data");
  }
  return [];
 }
