# Code Reuse in Node.js

## Context

* You want to reuse some code and you build functions.
* Then you want to reuse the functions so you use prototypes or classes (and inheritance etc.).
* But I prefer something simpler, because what I usually need are just the objects. So I often use "function copy", in the syntax `this[key] = that[key]`.
* And sometimes I need it to be more accurate, like when I want to reuse some getters or setters. So I often use `Object.defineProperties()`.
* I use it so often and I use some libraries:
    * `es5-ext/lib/Object/extend-properties` (`npm install es5-ext`)
    * `carcass.mixin()` (`npm install carcass`)

## ...

* Going further from there and becoming useful, with
    * Prototype reuse
    * Object alter
