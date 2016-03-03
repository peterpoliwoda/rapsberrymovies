var GPIO = require('onoff').Gpio,
led = new GPIO(27,'out');

console.log('Flashing in a loop');
//while(1){
console.log('Flashing');
led.writeSync(1);
//}
