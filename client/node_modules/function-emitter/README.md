# function-emitter

A tiny prototype to set on a funciton to make it work as an event emitter.

## Usage

```javascript
var functionEmitter = require('function-emitter');

var doThing = function(a,b){
    return a + b;
};

Object.setPrototypeOf(doThing, functionEmitter);

doThing(2, 4); // -> 6

doThing.on('foo', function(foo){

});

doThing.emit('foo', 'bar'); // Handled above.
```