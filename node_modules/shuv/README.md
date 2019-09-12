# Shuv

Partial application. Shuv args around the place.

# Usage

``` javascript
var shuv = require('shuv');
```

Partial application

``` javascript

function readFile(fileName, callback){
    ...
}

var readMyFile = shuv(readFile, 'myFile.txt');

readMyFile(callback);

```

Placeholder args

``` javascript

function something(a, b, c){
    return [a,b,c].join();
}

var withPlaceholders = shuv(something, shuv._, 2);

var result = withPlaceholders(1, 3); // -> 1,2,3

```

transform args

``` javascript

function something(a){
    return a;
}

var withTransforms = shuv(something, shuv._(x => x.a));

var result = withPlaceholders({a: 1}); // -> 1

```

ignore/undefindify args

``` javascript

function something(a){
    return a;
}

var withTransforms = shuv(something, shuv._());

var result = withPlaceholders({a: 1}); // -> undefined

```

get key off args

``` javascript

function something(a){
    return a;
}

var withTransforms = shuv(something, shuv._('a'));

var result = withPlaceholders({a: 1}); // -> 1

```

block extra args

``` javascript

function errbackFn(error, result){
    ...
}

var onlyHandlesErrors = shuv(errbackFn, shuv._, shuv.$);

onlyHandlesErrors('someError', 'someResult');

```