// button is attaced to pin 17, led to 27
var GPIO = require('onoff').Gpio,
    led = new GPIO(27, 'out'),
    button = new GPIO(17, 'in', 'both'),
    Firebase = require('firebase'),
    colors = require('colors'),
    ledOn = true;

var myFirebaseRef = new Firebase('https://raspberrymovies.firebaseio.com/');

myFirebaseRef.child('raspberry').on('value', function(snapshot) {
  console.log(snapshot.val());
  console.log('Flash the LED: ' + snapshot.val().flashled);
  ledOn = snapshot.val().flashled;
  if(ledOn)
    led.writeSync(1);
  else
    led.writeSync(0);
});

console.log('Let the Light show begin!');

// pass the callback function to the
// as the first argument to watch() and define
// it all in one step
button.watch(function(err, state) {
  console.log('[i]led is: ' + ledOn);
  // check the state of the button
  // 1 == pressed, 0 == not pressed
  //led.writeSync(ledOn);
  
  if(state == 1) {
    // turn LED on
    myFirebaseRef.child('bikes/bay1').set(false);
    myFirebaseRef.child('raspberry/flashled').set(false);
//
  } else {
    // turn LED off
//    myFirebaseRef.child('bikes/bay1').set(true);
//    myFirebaseRef.child('raspberry/flashled').set(false);
//    led.writeSync(0);
  }
});
