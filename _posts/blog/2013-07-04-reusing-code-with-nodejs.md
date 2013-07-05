---
published: false
category: blog
title: Reusing Code With Node.js
author: makara
hn: 

layout: post
---


## Context

Elegant code reuse and sharing is hard to do ; you want to reuse functions and would like to avoid multiple heavy refactorisation.

The most common way to do that, is to leverage prototypes or classes in JS to inherit functions/attributes. Problem is, prototype chain can be come fairly complex. People usually need just the objects, we adopt leaner/flater/simpler.

## Development

What we do is using:

- "Function copy", in the syntax `this[key] = that[key]`.

```js
var objectA = {
    lorem: 'lorem ipsum'
};
var objectB = {};

// A direct copy. Copying strings is not so useful but you get the idea.
objectB.lorem = objectA.lorem;
console.log(objectB);
// > { lorem: 'lorem ipsum' }
```

- And sometimes I need it to be more accurate, like when I want to reuse some getters or setters. So I often use `Object.defineProperties()`.

```js
var descriptor = Object.getOwnPropertyDescriptor;
var defineProp = Object.defineProperty;

var objectA = {};
var objectB = {};
var objectC = {};

objectA.__defineGetter__('lorem', function() {
    return 'lorem ipsum';
});
console.log(objectA);
// > { lorem: [Getter] }

// Direct copy, which copies the result of the getter.
objectB.lorem = objectA.lorem;
console.log(objectB);
// > { lorem: 'lorem ipsum' }

// Copying with Object.defineProperty(), and it copies the getter itself.
defineProp(objectC, 'lorem', descriptor(objectA, 'lorem'));
console.log(objectC);
// > { lorem: [Getter] }
```

- I use it so often and I use some libraries:

1. [es5-ext](https://github.com/medikoo/es5-ext)

```js
// > npm install es5-ext
var extend = require('es5-ext/lib/Object/extend-properties');

var objectA = {};
var objectC = {};

objectA.__defineGetter__('lorem', function() {
    return 'lorem ipsum';
});

extend(objectC, objectA);
console.log(objectC);
// > { lorem: [Getter] }
```

2. [Carcass](https://github.com/devo-ps/carcass)

```js
// > npm install carcass
var carcass = require('carcass');

var objectA = {};
var objectC = {};

objectA.__defineGetter__('lorem', function() {
    return 'lorem ipsum';
});

carcass.mixable(objectC);
objectC.mixin(objectA);
console.log(objectC);
// > { mixin: [Function: mixin], lorem: [Getter] }
```

These two libraries are essentially a same thing, but with different coding styles.

Going further from there and becoming useful, with

* Prototype reuse
* Object alter

## Prototype Reuse

### Idea

Prepare some functions, wrap into an object, and it becomes a "feature" that can be reused with whatever objects or prototypes when you need the "feature".

Example: [loaderSync](https://github.com/devo-ps/carcass/blob/master/lib/proto/loaderSync.js)

```js
module.exports = {
    source: source,
    parser: parser,
    reload: reload,
    get: get
};

function get() {
...
```

Once you copy the functions to an object, the object becomes a "loader", which can load a "source" synchronously with a "parser". For example a "source" can be a file path and the "parser" can be simply Node.js's `require` function.

Examples: [loaderSync](https://github.com/devo-ps/carcass/blob/master/benchmark/proto.loaderSync.js)

Here we build 2 builders. The first one generates a function and copies the methods from what we've prepared. The second one copies the methods to the prototype of a builder class.

```js
...

function LoaderA(_source) {
    function loader() {
        return loader.get();
    }
    loader.mixin = mixin;
    loader.mixin(loaderSync);
    loader.source(_source);
    return loader;
}

...

function LoaderC(_source) {
    if (!(this instanceof LoaderC)) return new LoaderC(_source);
    this.source(_source);
}
LoaderC.prototype.mixin = mixin;
LoaderC.prototype.mixin(loaderSync);

...
```

Here we see 2 ways / styles. Let's compare:

* Instantiating:
    * A: `var a = LoaderA(...)`
    * C: `var c = LoaderC(...)` or `var c = new LoaderC(...)`
* Appearance:
    * A generates a function.
    * C builds a typical instance which is an object.
* Invoking directly:
    * A: `a()` or `a.get()`
    * C: `c.get()`
* Invoking as a callback:
    * A: `ipsum(a)`
    * C: `ipsum(c.get.bind(c))`
* Performance (check it yourself by running the Carcass benchmarking with `make bm`; see [Makefile](https://github.com/devo-ps/carcass/blob/master/Makefile)):
    * Instantiating: C is about 100x faster
    * Invoking: they are the same

### Conclusion

I prepare functions for my object builders (I call them "proto"s BTW). I still use prototypes but that's only because it's usually faster. And sometimes instead of generating plain objects, I generate functions with the builders so I can invoke it directly. It's just a choose of syntax but keep in mind there's a performance trade-off.

## Object Alter

The idea: an "alter" function, which is designed to change a whatever given object, so that the object will have a certain ability or behavior. This is sometimes also called a "mixin".

Example: [configurable](https://github.com/visionmedia/configurable.js)

```js
...

module.exports = function(obj){

  obj.settings = {};

  obj.set = function(name, val){
    ...
  };

  ...

  return obj;
};
```

## Conclusion

Close on how it helps us.
Do a parallel with something
Finally, open up on: 
