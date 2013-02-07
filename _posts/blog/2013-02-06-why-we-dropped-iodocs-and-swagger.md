---
published: false
category: blog
title: 'Why We Dropped Swagger And I/O Docs'
author: ronan
hn: 

layout: post
---

As we started investing in [our new strategy](/blog/2013/01/31/farewell-to-regular-web-development-approaches.html) at [my previous company](http://wiredcraft.com), we looked around for proper solutions to help us document the APIs we were building. Now I hear you; it may not sound like the most exciting part of the project. The problem is, especially with API design, it is crucial you get it right from the beginning.

We originally went with a simple Wiki page on Github, which served just fine in the past. But it became brutally clear after our first release that it wasn't going to cut it. We started thinking about what we thought were good documentations. We're fans of the single page approach that [Backbone.js' documentation](http://backbonejs.com) illustrates well and clearly remembered [Github](http://developer.github.com/) or [Stripe](https://stripe.com/docs) as easy and well organized resources.

We quickly ended up stumbling on two projects in particular: Wordnik's [Swagger](http://developers.helloreverb.com/swagger/)
 and Mashery's [I/O Docs](http://www.mashery.com/product/io-docs) looked like great ways of building a nice, organized and user-friendly API reference. We favored I/O Docs as it is built on node.js and was more straightforward to set up. It became clear however that there were serious limitations to the approach these tools are taking:

1. No support for JSON parameters in the request body,
1. Rely on querying the actual API,

The first point is really a painful one; our APIs usually don't do much in terms of parameters and heavily rely on sending JSON objects in the body of the request. We're mostly interacting with model on the API side and it happens to work great with our underlying technical stack. Swagger and I/O Docs are more or less designed for stacking up a bunch of individual parameters. Wanna add JSON? Well here is a textfield you can paste your JSON in. Not really ideal.

The second point is much more subjective. Some people may find it interesting that you are building your reference against your actual API, allowing you to querying the real thing. That's what [Flickr does with their API explorer](http://www.flickr.com/services/api/explore/flickr.activity.userComments), and I used to think it was a pretty neat feature. That is until we started using it for devo.ps and realized it was great if your API was mostly for read, but it got very tricky when it impacts production systems. It is a tad too easy to casually test a call and fuck things up, without necessarily realizing it's actually impacting production. Sure, you could set up a testing APIs for that very purpose, but then you're left with dealing with the added complexity.

So what did we do? We simply put together a very lightweight Jekyll based solution: drop a new post with a new API call, following some loose format and specifying a few bits of meta data in the YAML header (type of the method, URL...) and you're good to go.

We're real suckers for Jekyll and already use it to build our static clients that serve as Web and mobile interfaces for our APIs, but in that specific case it is even more relevant. We are able to ship our documentation along with the code of our APIs by simply creating a gh-pages branch and dumping a copy of our Jekyll site. Check it out: it's called Carte and is available for forking. The README should be enough to get started, but send us a shout at @devo_ps if you need help or want to suggest a feature.

Carte is intentionally light on features: just hack to fit your needs.