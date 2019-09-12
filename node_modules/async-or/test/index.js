var test = require('tape'),
    asyncOr = require('../');

test('first success', function(t){
    t.plan(2);

    function works1(done){
        setTimeout(function(){
            done(null, 1);
        }, 100);
    }

    function works2(done){
        setTimeout(function(){
            done(null, 2);
        }, 200);
    }

    asyncOr([works1, works2], function(error, result){
        t.notOk(error);
        t.equal(result, 1);
    });
});

test('second success', function(t){
    t.plan(2);

    function fails1(done){
        setTimeout(function(){
            done('error');
        }, 100);
    }

    function works2(done){
        setTimeout(function(){
            done(null, 2);
        }, 200);
    }

    asyncOr([fails1, works2], function(error, result){
        t.notOk(error);
        t.equal(result, 2);
    });
});

test('second fail ignored', function(t){
    t.plan(2);

    function works1(done){
        setTimeout(function(){
            done(null, 1);
        }, 100);
    }

    function fails2(done){
        setTimeout(function(){
            done('error');
        }, 200);
    }

    asyncOr([works1, fails2], function(error, result){
        t.notOk(error);
        t.equal(result, 1);
    });
});

test('first success AFTER second', function(t){
    t.plan(2);

    function works1(done){
        setTimeout(function(){
            done(null, 1);
        }, 200);
    }

    function works2(done){
        setTimeout(function(){
            done(null, 2);
        }, 100);
    }

    asyncOr([works1, works2], function(error, result){
        t.notOk(error);
        t.equal(result, 1);
    });
});

test('second success BEFORE first', function(t){
    t.plan(2);

    function fails1(done){
        setTimeout(function(){
            done('error');
        }, 200);
    }

    function works2(done){
        setTimeout(function(){
            done(null, 2);
        }, 100);
    }

    asyncOr([fails1, works2], function(error, result){
        t.notOk(error);
        t.equal(result, 2);
    });
});

test('first fail BEFORE second fail', function(t){
    t.plan(2);

    function fails1(done){
        setTimeout(function(){
            done('error1');
        }, 100);
    }

    function fails2(done){
        setTimeout(function(){
            done('error2');
        }, 200);
    }

    asyncOr([fails1, fails2], function(error, result){
        t.notOk(result);
        t.equal(error, 'error2');
    });
});

test('first fail AFTER second fail', function(t){
    t.plan(2);

    function fails1(done){
        setTimeout(function(){
            done('error1');
        }, 200);
    }

    function fails2(done){
        setTimeout(function(){
            done('error2');
        }, 100);
    }

    asyncOr([fails1, fails2], function(error, result){
        t.notOk(result);
        t.equal(error, 'error2');
    });
});