var GpioStream = require('gpio-stream'),
    button = GpioStream.readable(17);
    led = GpioStream.writable(18),
    http = require('http');

// pipe the button presses to stdout
//button.pipe(process.stdout);

console.log("Let the Light show begin!");

var stream = button.pipe(led);
stream.pipe(process.stdout);

//http.createServer(function (req, res) {
//  res.setHeader('Content-Type', 'text/html');
//  res.write('<pre>logging button presses:\n');
//  stream.pipe(res);
//}).listen(8080);