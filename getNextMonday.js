/*
* A function for getting the next Monday closest to today's date
*
*/

function getNextMonday() {

    var date = new Date();
    var day = date.getDay();
    var normalizedDay = (day + 6) % 7;
    var daysForward = 7 - normalizedDay;
    var nextMonday = new Date(+date + (daysForward * 24 * 60 * 60 * 1000));
    var newDate = nextMonday.getDate();
    var month = "January,February,March,April,May,June,July,August,September,October,November,December"
    .split(",")[nextMonday.getMonth()];

    function nth(d) {
       if(d>3 && d<21) return 'th'; // thanks kennebec
       switch (d % 10) {
         case 1:  return "st";
         case 2:  return "nd";
         case 3:  return "rd";
         default: return "th";
     }
     }

    var finalDate = newDate+nth(newDate) +" "+month+" "+nextMonday.getFullYear()
    console.log(nextMonday);
}
