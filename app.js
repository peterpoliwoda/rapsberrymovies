// button is attaced to pin 17, led to 18
var GPIO = require('onoff').Gpio,
    led = new GPIO(18, 'out'),
    button = new GPIO(17, 'in', 'both'),
    Firebase = require('firebase'),
    colors = require('colors');

var myFirebaseRef = new Firebase('https://bikestand.firebaseio.com/');

myFirebaseRef.on("value", function(snapshot) {
  console.log(snapshot.val());
});

console.log("Let the Light show begin!");
 
// pass the callback function to the
// as the first argument to watch() and define
// it all in one step
button.watch(function(err, state) {
  // check the state of the button
  // 1 == pressed, 0 == not pressed
  if(state == 1) {
    // turn LED on
    myFirebaseRef.child('bay1').set(false);
    led.writeSync(1);
  } else {
    // turn LED off
    myFirebaseRef.child('bay1').set(true);
    led.writeSync(0);
  }
});

//var stream = button.pipe(led);
//stream.pipe(process.stdout);

//http.createServer(function (req, res) {
//  res.setHeader('Content-Type', 'text/html');
//  res.write('<pre>logging button presses:\n');
//  stream.pipe(res);
//}).listen(8080);