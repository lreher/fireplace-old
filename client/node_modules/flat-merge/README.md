# flat-merge

A simple shallow merge utility. Takes two values, returns the merged result. 

- Does not modify the original values.
- Only merges own properties.
- Does not clone values.
- Always returns an object.

# Usage

```javascript
var merge = require('flat-merge');

var a = {
        foo: 'stuff',
        bar: 2,
        baz: true
    };

var b = {
        whatsits: 'majigger',
        baz: false
    };

var result = merge(a,b);
->
result == {
    foo: 'stuff',
    bar: 2,
    baz: false,
    whatsits: 'majigger'
}
```