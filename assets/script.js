
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
location.reload();

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
  
// Put on page
$("#all-display").append(
' <tr><td>' + newTrain +
' </td><td>' + newLocation +
' </td><td>' + newFreq +
' </td><td>' + catchTrain +
' </td><td>' + tMinutesTillTrain + ' </td></tr>');
  
  });
});
