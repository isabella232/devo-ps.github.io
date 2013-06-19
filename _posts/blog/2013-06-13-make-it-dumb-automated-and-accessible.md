---
published: false
category: blog
title: Automate, Sure But Make It Accessible
author: ronan
hn: 

layout: post
---

I'll admit the devo.ps team is a lazy bunch; we like to forget about things, especially the hard stuff. Dealing with a complex process invariably leads one of us to vent about how "we should automate that stuff". That's what our team does day and night:

1. Dumb things down, lower barriers of entry, and then...
1. **Automate all of the things!**

This has transpired through every layer of our company, from engineering to operations. Recently we've started pushing on a third point, but first let me rant a bit...

### The ever increasing surface of friction

The past few years have seen a healthy push on UI and UX. Even developer tools and enterprise software, historically less user-friendly, have started adopting that trend. We now have things like Github. Great.

This trend grew in parallel with the adoption of SaaS. A SaaS gets you the results of a team focused on a specific problem, with the user experience often being at least as important as the underlying technology (not to undervalue good engineering). It's pretty standard for these service to offer a proper API, making for easy integration. [Our CRM](https://getbase.com/‎) plays nicely with Dropbox, GMail and a gazillion other services. Again, great.

**However, the success of SaaS means the surface of interfaces we're interacting with is constantly stretching. This is far more difficult to overcome than poor UI or UX.** Many of us have witnessed teams struggling to get adoption on a great tool that happen to be one too many.

### A bot to rule them all...

We've tried a lot of different approaches, kicked the tires on a lot of products and ended up doing the same thing we do everywhere else:

1. **Simplify**. For example, we use Github to manage most tasks and discussions, including operations (HR, admin, ...), and marketing. We used [Trello](http://trello.com/) alongside Github for a while and we loved it. But it silo-ed the discussions. Everything from our employee handbook to tasks for buying snacks for the office are now on Github.

1. **Automate**. We automate pretty much everything we can. When you apply to one of our job by email for example, we push the attachments in Dropbox (likely your resume) and create a ticket with the relevant information on Github. [Zapier](http://zapier.com) is great for this kind of stuff by the way.

1. **Make it accessible**. That's the most important point for us at this stage. Borat, our [Hubot](http://hubot.github.com) chat bot, is hooked up with most of our infrastructure and is able to pass on requests to the services we use as well as our automation layer. Our team is constantly logged in our the chat, that means accessing most of the
  - Need to deploy some code on production? Ask Borat.
  - Somebody is at the door? Ask the bot to open it for you (you gotta love hacking on Raspberry PI).
  - Need to time track a task? Just drop a message to the bot when you're started and let him know when you're done.
  - Need to call for a SCRUM? Just mention the Github team you want to chat with and Borat will create a separate channel and invite the right people to join.