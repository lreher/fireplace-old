# Classist

Manage classes on an element without reguard for external modification.

## why.

Sometimes you want to modify the classes on an element but in a somewhat encapsulated style.
Say you have a component that has a standard class like `"modal"`, and you want to be able to
define its list of classes that changes over time, without effecting the `"modal"` class..

## Usage

```javascript
var classis = require('classist');

// Make or aquire an element
var element = crel('div', {class: 'some thing'});

// Classist it.
var elementClasses = classist(element);

// Get classist classes (there are none so far)
elementClasses(); // -> ''

// set classist classes
elementClasses('foo bar');

// get element.className
element.className; // -> 'some thing foo bar'

// Get classist classes again.
elementClasses(); // -> 'foo bar'

```

See tests for more examples.