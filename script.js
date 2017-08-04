  var config = {
    apiKey: "AIzaSyCSq9dBaR6ju1j2kZYaj5PACNT4LB2VgAA",
    authDomain: "employees-tracker.firebaseapp.com",
    databaseURL: "https://employees-tracker.firebaseio.com",
    projectId: "employees-tracker",
    storageBucket: "employees-tracker.appspot.com",
    messagingSenderId: "34696539278"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  $("#ent").on("click", function(event) {
    event.preventDefault();
    var nameVal = $("#name").val().trim();
    var roleVal = $("#role").val().trim();
    var startDateVal = $("#start-date").val().trim();
    var monthlyRateVal = $("#monthly-rate").val().trim();

    var newHire = {
      name: nameVal,
      role: roleVal,
      startDate: startDateVal,
      monthlyRate: monthlyRateVal
    }

    console.log(newHire);

    $("#name").val("");
    $("#role").val("");
    $("#start-date").val("");
    $("#monthly-rate").val("");

    database.ref().push(newHire);

  });

  database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      // console.log(childSnapshot.val().name);
      // console.log(childSnapshot.val().role);
      // console.log(childSnapshot.val().startDate);
      // console.log(childSnapshot.val().monthlyRate);


      //Data used to calc difference in months
      var givenDate = childSnapshot.val().startDate;
      var format = "DD/MM/YY";
      var start = moment(givenDate, format);


      //Difference in Months
      console.log(moment().diff(moment(start), "months"));
      var months = moment().diff(moment(start), "months");
      var totalBilled = months * childSnapshot.val().monthlyRate;

      //Append info to the table
      $(".table").find('tbody')
      .append($('<tr>')
        .append($('<td>'+ childSnapshot.val().name + '</td><td>'+ childSnapshot.val().role + '</td><td>'+ childSnapshot.val().monthlyRate + '</td><td>' + months + '</td><td>$' + totalBilled + '</td>')
          )
        );





    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


