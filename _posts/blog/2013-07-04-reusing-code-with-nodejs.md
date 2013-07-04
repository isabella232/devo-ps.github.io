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

- "function copy", in the syntax `this[key] = that[key]`.

*CONCRETE EXAMPLE W/ EXPLANATION + CODE SAMPLE*

- And sometimes I need it to be more accurate, like when I want to reuse some getters or setters. So I often use `Object.defineProperties()`.

*CONCRETE EXAMPLE W/ EXPLANATION + CODE SAMPLE*

* I use it so often and I use some libraries:

*CONCRETE EXAMPLE W/ EXPLANATION + CODE SAMPLE*

    * `es5-ext/lib/Object/extend-properties` (`npm install es5-ext`)
    * `carcass.mixin()` (`npm install carcass`)

## Conclusion

Close on how it helps us.
Do a parallel with something
Finally, open up on: going further from there and becoming useful, with
    * Prototype reuse
    * Object alter
