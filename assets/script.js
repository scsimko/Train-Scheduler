
$(document).ready(function () {

var database = firebase.database();
  
// Click event 
$("#addTrain").on("click", function (event) {
event.preventDefault();
  
// Text box values
var trainName = $("#trainName").val().trim();
var destination = $("#destination").val().trim();
var firstTrain = $("#firstTrain").val().trim();
var freq = $("#interval").val().trim();


//console.log(trainName)
//console.log(destination)
//console.log(firstTrain)
//console.log(freq)

  
  
// Push
database.ref().push({
trainName: trainName,
destination: destination,
firstTrain: firstTrain,
frequency: freq

  });

//clear
document.getElementById("form").reset();

});
  
// Firebase 
database.ref().on("child_added", function (childSnapshot) {
  
var newTrain = childSnapshot.val().trainName;
var newLocation = childSnapshot.val().destination;
var newFirstTrain = childSnapshot.val().firstTrain;
var newFreq = childSnapshot.val().frequency;
  
// Start Time 
var startTimeConverted = moment(newFirstTrain, "hh:mm");
  
// Current Time
var currentTime = moment();
  
//console.log(currentTime)

// Difference 
var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  
// Time apart
var tRemainder = diffTime % newFreq;
  
// Min to next train
var tMinutesTillTrain = newFreq - tRemainder;
  
// Next Train 
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
var catchTrain = moment(nextTrain).format("HH:mm");

//convert to standard time ***Got from StackOverflow ** I am shocked that it worked :)
function toStandardTime(militaryTime) {
militaryTime = militaryTime.split(':');
return (militaryTime[0].charAt(0) == 1 && militaryTime[0].charAt(1) > 2) ? (militaryTime[0] - 12) + ':' + militaryTime[1] + ':' + ' P.M.' : militaryTime.join(':') + ' A.M.'
}

var timeCon = toStandardTime(catchTrain);

  
// Put on page
$("#all-display").append(
' <tr><td>' + newTrain +
' </td><td>' + newLocation +
' </td><td>' + newFreq +
' </td><td>' + timeCon +
' </td><td>' + tMinutesTillTrain + ' </td></tr>');
  
  });
});
