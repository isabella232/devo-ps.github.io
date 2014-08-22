---
collection: blog
title: The Problem With PaaS
tags:
  - PaaS
  - DevOps

author: ronan
hn: 5181480
date: 2014-08-22

template: post.html
---

Our team spent the past decade building, deploying and scaling online applications, sometimes to millions of users, using anything from Perl to Go. We've worked with the largest organizations in the world, from Fortune 500 to the UN, governments as well as small, scrappy startups. And we had our fair share of servers crashing and burning. 

Through this, we tried pretty much every option out there to deal with servers, from custom shell scripts to fully automated infrastructures using things like Jenkins, Chef, Ansible or Fabric. So far, nothing really stuck.

We have opinions on why configuration management and orchestration tools are hard to make work, but for now I'd like to talk about the [NoOps](https://blog.appfog.com/what-is-noops-anyhow/) promise of PaaS like [Heroku](http://heroku.com), [Google App Engine](https://developers.google.com/appengine/) and the likes.

## What PaaS does really well

There are many small features we learned to like on specific platforms, but overall their main value comes from being **low barriers of entries and developer-friendly**. 

Getting started is very easy: sign up, fill in a few forms and you can start deploying your app using a couple terminal commands. Need to scale your application? Add more compute (dynos, instances, servos or whatever your PaaS labeled it). Want something not supported out-of-the-box (SSL or a database)? Buy an add-on.

And all of this is obviously geared towards developers: the UX and terminology is much closer to an "app mindset" than the reality of operations, even command lines mimic what folks use when pushing their code on say GitHub.

All great; focus on developers and abstract everything they may not be comfortable with.

## Where PaaS falls short

The problem is this abstraction comes at a price:

- **Fragmentation**: your application is now running on a swarm of micro-services. One for your code, another for your database and probably a bunch of other for caching, load balancing etc. You now have multiple points of failures and need to keep it in mind when designing your code. It also means your main performance leverage is horizontal scaling.

- **Price**: while it may seem cheap at first (especially since providers usually have a free plan for hobbyists), it's been our experience that PaaS become expensive... quickly. As soon as your start scaling to a more serious setup, price goes up by combination of both raw compute and add-ons. It's also a lot more moving parts to deal with.

- **Lock-in**: once you've started building your application around a specific PaaS, it becomes non-trivial to migrate to another platform. Moving over to a standard stack for example, say on AWS or Digital Ocean, requires a significant amount of resources, starting with finding somebody who knows their way around servers. Forget everything your learned about the abstractions your PaaS was giving you; you're back to square one.

- **Limitations**: Heroku was especially successful at building a marketplace for add-ons. But even they can't rival the flexibility and power that a "regular" server offers. Buildpacks, for example, helps with some of that, at least from the dependencies point of view, but there's no comparison with what is possible once you can configure technologies on a server. Moreover, add-ons aren't free (or even very cheap), which leads me to my next point;

- **Black-box**: you have a very limited range of options when it comes to understanding what really goes on with the infrastructure your app is running on. [Rap-genius' "Routergate"](http://genius.com/albums/Heroku/Routergate) is a good illustration of this problem. You are more or less locked out of your infrastructure. You can't simply SSH in and figure things out. If you have to deal with things like HIPAA or PCI compliance as well, things get a lot more complicated really fast.

## In a nutshell

We have used and recommended using PaaS solutions for building MVPs, especially in cases where the UX was more heavily reliant on the UI than the backend (which is often the case with mobile applications). But what we've seen time and again is people struggling with its aftermath when they start scaling; either they stick with it and see their costs increasing (sometimes drastically), continuously dealing with a fragmented and constrained setup, or they take on the significant investment of building (and maintaining) their own  infrastructure.

This is partly why we came to work on [devo.ps](http://devo.ps); we're trying to close the gap between the low barrier-of-entry of PaaS and the flexibility of the DIY approach.
