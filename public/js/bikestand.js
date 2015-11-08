// Get a database reference to our posts
var ref = new Firebase("https://bikestand.firebaseio.com/");

// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {

  var standStatus = snapshot.val(); 
  console.log(standStatus);

    jQuery.each(standStatus, function(index,element) {
        console.log(index);
        console.log(element);
       
       if(element){
          $('#'+ index).removeClass('btn-default');
          $('#'+ index).addClass('btn-success');
          $('#'+ index).removeClass('btn-danger');
        } 
        else {
          $('#'+ index).removeClass('btn-default');
          $('#'+ index).removeClass('btn-success');
          $('#'+ index).addClass('btn-danger');
        }
    });

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});