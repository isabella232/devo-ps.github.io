---
published: false
category: blog
title: Reduce Friction, Automate All The Things
author: ronan
hn: 

layout: post
---

I'll admit the devo.ps team is a lazy bunch; we're just constantly looking for an opportunity to forget about things, especially the hard stuff. Dealing with a complex process more than once is almost certain to get one of us to decide that "we should automate that stuff". That's kind of what our team works on day and night:

1. Dumb things down, lower barriers of entry, and then...
1. **Automate all of the things!**

## More interfaces mean more friction

There's been a strong push on UI and UX in the past few years; good teams see the value in investing in aesthetics and the user experience as much as engineering. Actually, good teams tend to even engineer that part too, relying heavily on data to drive their decisions. This went as far as reaching areas of software that were historically less enclined to be enjoyable; developer tools and enterprise are quickly picking up on that trend. We now have Github, Dropbox and XXXX. Great.

That being said, there's also been a strong trend of multiplying specialized SaaS offers. Don't get me wrong, it's great in many ways; you get a dedicated team crafting a fantastic experience and underlying technology that answer best a specific challenge. It is standard to also offer a proper API, and it is possible to easily integrate services with each others. Our [CRM platform][1] for example plays great with Dropbox and Gmail. That being said, as individual users, we still end up interacting more often than not with Web (or mobile) interfaces. And the more you rely on SaaS, the more interfaces you end up dealing with.

We're constantly stretching the surface of interfaces we deal with, and that means we're seriously increasing friction. It may not seem at first as bad of a thing as poor UI design, but we've observed first hand it can have worse results. How many times have you seen a few team members struggling to spread adoption of a new product across a team: it may well be more efficient and helpful to the bottom line, but until you get adoption across the team, it's useless.

## A chat bot to rule them all...

The way we deal with that is by automating tasks and integrating this with our chat bot; chat is for us the single point of access for most of our commonly used tools. Borat (our instance of hubot](http://hubot.github.com)) knows how to interpret simple requests to check on the status of our builds, the latest commits in a repository, searches for past quotes... We are constantly adding more things, with the wish-list growing fast;

- Arduino plus
- Push values over to our dashboard
- Time tracking
- Call for SCRUMs

We invite you to do the same. Benefits...

[1]: http://base.com