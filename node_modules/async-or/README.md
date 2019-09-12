# async-or

Run tasks in parallel, and take the result from either
the first (by list-order) task that succeeds, or, if none succeed,
the last tasks error.

## Usage

pass an array of tasks that take a callback as their first parameter,
and a callback:

```javascript

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
    error; // -> null
    result; // -> 1
});

```

Tasks are run in parallel, and the first task in the
task list that succeeds will resolve the callback.

eg:

given tasks: `[a, b, c]`

 - if a succeeds, it will resolve the callback.

 - if a fails, and b succeeds, b will resolve the callback.

 - if a, b, and c fail, the callback will be resolved with c's error.

* The chronological order in which tasks complete has no impact on which task will resolve the callback. *

See the tests for a more in-depth explaination of cases.