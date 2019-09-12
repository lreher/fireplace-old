var test = require('tape'),
    functionEmitter = require('../');

test('?', function(t){
    t.plan(2);

    var doThing = function(a,b){
        return a + b;
    };

    Object.setPrototypeOf(doThing, functionEmitter);

    t.equal(doThing(2, 4), 6);

    doThing.on('foo', function(foo){
        t.equal(foo, 'bar');
    });

    doThing.emit('foo', 'bar');
});