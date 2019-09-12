var test = require('grape'),
    merge = require('../');

test('standard', function(t){
    t.plan(1);

    var a = {a:1};
    var b = {b:2};

    t.deepEqual(merge(a,b), {a:1,b:2});
});

test('override', function(t){
    t.plan(1);

    var a = {a:1};
    var b = {a:2};

    t.deepEqual(merge(a,b), {a:2});
});

test('falsy overrides', function(t){
    t.plan(1);

    var a = {a:1};
    var b = {a:null};

    t.deepEqual(merge(a,b), {a:null});
});

test('null target', function(t){
    t.plan(1);

    var a = null;
    var b = {b:2};

    t.deepEqual(merge(a,b), {b:2});
});

test('null source', function(t){
    t.plan(1);

    var a = {a:1};
    var b = null;

    t.deepEqual(merge(a,b), {a:1});
});

test('null everything', function(t){
    t.plan(1);

    var a = null;
    var b = null;

    t.deepEqual(merge(a,b), {});
});

test('only own properties', function(t){
    t.plan(1);

    var a = {
        a:1,
        __proto__:{
            c:3
        }
    };
    var b = {
        b:2
    };

    t.deepEqual(merge(a,b), {a:1,b:2});
});