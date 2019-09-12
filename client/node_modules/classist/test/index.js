var test = require('tape'),
    classist = require('../');


test('no base classes', function(t){
    t.plan(5);

    var element = {className: ''};

    var classes = classist(element);

    t.equal(classes(), '');

    classes('foo');

    t.equal(classes(), 'foo');
    t.equal(element.className, 'foo');

    classes('bar');

    t.equal(classes(), 'bar');
    t.equal(element.className, 'bar');
});

test('with base class', function(t){
    t.plan(5);

    var element = {className: 'base'};

    var classes = classist(element);

    t.equal(classes(), '');

    classes('foo');

    t.equal(classes(), 'foo');
    t.equal(element.className, 'base foo');

    classes('bar');

    t.equal(classes(), 'bar');
    t.equal(element.className, 'base bar');
});

test('with base classes', function(t){
    t.plan(5);

    var element = {className: 'base base2'};

    var classes = classist(element);

    t.equal(classes(), '');

    classes('foo');

    t.equal(classes(), 'foo');
    t.equal(element.className, 'base base2 foo');

    classes('bar');

    t.equal(classes(), 'bar');
    t.equal(element.className, 'base base2 bar');
});

test('with late modification', function(t){
    t.plan(5);

    var element = {className: ''};

    var classes = classist(element);

    t.equal(classes(), '');

    classes('foo');

    t.equal(classes(), 'foo');
    t.equal(element.className, 'foo');

    element.className += ' whatevs'

    classes('bar');

    t.equal(classes(), 'bar');
    t.equal(element.className, 'whatevs bar');
});

test('class overlap', function(t){
    t.plan(5);

    var element = {className: 'base'};

    var classes = classist(element);

    t.equal(classes(), '');

    classes('base');

    t.equal(classes(), 'base');
    t.equal(element.className, 'base base');

    classes('');

    t.equal(classes(), '');
    t.equal(element.className, 'base');
});

test('overoverlap', function(t){
    t.plan(5);

    var element = {className: 'base'};

    var classes = classist(element);

    t.equal(classes(), '');

    classes('all your base base base');

    t.equal(classes(), 'all your base base base');
    t.equal(element.className, 'base all your base base base');

    classes('');

    t.equal(classes(), '');
    t.equal(element.className, 'base');
});

test('0 class', function(t){
    t.plan(5);

    var element = {className: ''};

    var classes = classist(element);

    t.equal(classes(), '');

    classes('0');

    t.equal(classes(), '0');
    t.equal(element.className, '0');

    classes(' ');

    t.equal(classes(), '');
    t.equal(element.className, '');
});

test('number class', function(t){
    t.plan(3);

    var element = {className: ''};

    var classes = classist(element);

    t.equal(classes(), '');

    classes(1);

    t.equal(classes(), '1');
    t.equal(element.className, '1');
});

test('undefined class', function(t){
    t.plan(5);

    var element = {className: ''};

    var classes = classist(element);

    t.equal(classes(), '');

    classes(undefined);

    t.equal(classes(), '');
    t.equal(element.className, '');

    classes([undefined]);

    t.equal(classes(), '');
    t.equal(element.className, '');
});

test('class needs trim', function(t){
    t.plan(3);

    var element = {className: ''};

    var classes = classist(element);

    t.equal(classes(), '');

    classes('foo  ');

    t.equal(classes(), 'foo');
    t.equal(element.className, 'foo');
});

test('true value class', function(t){
    t.plan(5);

    var element = {className: ''};

    var classes = classist(element);

    t.equal(classes(), '');

    classes(true);

    t.equal(classes(), '');
    t.equal(element.className, '');

    classes([true]);

    t.equal(classes(), '');
    t.equal(element.className, '');
});

test('false value class', function(t){
    t.plan(5);

    var element = {className: ''};

    var classes = classist(element);

    t.equal(classes(), '');

    classes(false);

    t.equal(classes(), '');
    t.equal(element.className, '');

    classes([false]);

    t.equal(classes(), '');
    t.equal(element.className, '');
});

test('no pointless updates', function(t){
    t.plan(5);

    var element = {};
    var elementClasses = 'bar';

    Object.defineProperty(element, 'className', {
        get: function(){
            return elementClasses;
        },
        set: function(value){
            t.pass('Class updated');
            return elementClasses = value;
        }
    });

    var classes = classist(element);

    classes('foo');

    t.equal(classes(), 'foo');
    t.equal(element.className, 'bar foo');

    classes(['foo']);

    t.equal(classes(), 'foo');
    t.equal(element.className, 'bar foo');
});
