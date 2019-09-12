var test = require('tape'),
    shuv = require('../'),
    _ = shuv._;
    $ = shuv.$;

test('placeholder', function(t){
    t.plan(4);

    function foo(){
        t.equal(arguments.length, 3);
        t.equal(arguments[0], 4);
        t.equal(arguments[1], 1);
        t.equal(arguments[2], 2);
    }

    var shuvved = shuv(foo, _, 1, 2);

    shuvved(4);
});

test('placeholder 2', function(t){
    t.plan(4);

    function foo(){
        t.equal(arguments.length, 3);
        t.equal(arguments[0], 4);
        t.equal(arguments[1], 1);
        t.equal(arguments[2], 7);
    }

    var shuvved = shuv(foo, _, 1, _);

    shuvved(4, 7);
});

test('append', function(t){
    t.plan(6);

    function foo(){
        t.equal(arguments.length, 5);
        t.equal(arguments[0], 4);
        t.equal(arguments[1], 1);
        t.equal(arguments[2], 2);
        t.equal(arguments[3], 5);
        t.equal(arguments[4], 6);
    }

    var shuvved = shuv(foo, _, 1, 2);

    shuvved(4, 5, 6);
});

test('blocked', function(t){
    t.plan(2);

    function foo(x){
        t.equal(arguments.length, 1);
        t.equal(x, 4);
    }

    var shuvved = shuv(foo, _, $);

    shuvved(4, 5, 6);
});

test('context', function(t){
    t.plan(3);

    var context = {};

    function foo(x){
        t.equal(arguments.length, 1);
        t.equal(x, 5);
        t.equal(this, context);
    }

    var shuvved = shuv(foo, _, $);


    shuvved.call(context, 5, 6);
});

test('get key', function(t){
    t.plan(1);

    function foo(a){
        t.equal(a, 1);
    }

    var shuvved = shuv(foo, _('a'));

    shuvved({a: 1});
});

test('transform', function(t){
    t.plan(1);

    function foo(a){
        t.equal(a, 1);
    }

    var shuvved = shuv(foo, _(x => x.a));

    shuvved({a: 1});
});

test('ignore', function(t){
    t.plan(2);

    function foo(error, result){
        t.equal(error, undefined);
        t.equal(result, 5);
    }

    var shuvved = shuv(foo, _());

    shuvved(new Error(), 5);
});