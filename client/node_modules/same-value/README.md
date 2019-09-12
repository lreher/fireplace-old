# same-value

Check if two values have the same value.

Returns true for NaNs and Invalid dates. Returns false for different instances.

# Usage

```javascript

var same = require('same-value');

same('a','a'); -> true
same('a','b'); -> false

etc...

```