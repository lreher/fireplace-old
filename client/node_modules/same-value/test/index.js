var test = require('tape'),
    same = require('../');

test('strings', function(t){
    t.plan(5);

    t.ok(same('a','a'));
    t.notOk(same('a','b'));
    t.ok(same('1','1'));
    t.notOk(same('1',1));
    t.notOk(same(1, '1'));
});

test('numbers', function(t){
    t.plan(5);

    t.ok(same(1,1));
    t.notOk(same(1,2));
    t.ok(same(NaN, NaN));
    t.ok(same(Infinity, Infinity));
    t.ok(same(0,-0));
});

test('objects', function(t){
    t.plan(2);

    var a = {},
        b = {};

    t.ok(same(a,a));
    t.notOk(same(a,b));
});

test('dates', function(t){
    t.plan(5);

    var a = new Date('2000-1-1'),
        b = new Date('2000-1-2'),
        c = new Date('2000-1-1'),
        invalid1 = new Date('foo'),
        invalid2 = new Date('bar');

    t.ok(same(a,a));
    t.notOk(same(a,b));
    t.ok(same(a,c));
    t.ok(same(invalid1,invalid1));
    t.ok(same(invalid1,invalid2));
});

test('null', function(t){
    t.plan(6);

    t.ok(same(null,null));
    t.notOk(same(null,undefined));
    t.notOk(same(null,'foo'));
    t.notOk(same(null,''));
    t.notOk(same(null,1));
    t.notOk(same(null,0));
});

test('undefined', function(t){
    t.plan(6);

    t.ok(same(undefined,undefined));
    t.notOk(same(undefined,null));
    t.notOk(same(undefined,'foo'));
    t.notOk(same(undefined,''));
    t.notOk(same(undefined,1));
    t.notOk(same(undefined,0));
});