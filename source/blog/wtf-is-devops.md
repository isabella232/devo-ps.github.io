---
collection: blog
title: WTF Is DevOps?
tags:
  - Devops
  - best-practices
  - agile
  - ops

author: ronan
hn: 
date: 2014-09-08

template: post.html
---

I recently stumbled on an article by Jeff Knupp in my (ever growing) list of "to read later" bookmarks: [How 'DevOps' is Killing the Developer](http://jeffknupp.com/blog/2014/04/15/how-devops-is-killing-the-developer/). In a nutshell, he makes the point that the DevOps movement, and its reliance on cross-functional profiles (aka "full stack" engineers) is fair in a startup environment where resource attrition favors Jack-of-all-trades, but is a poor strategy for larger and more resourceful established businesses. I think it misses the point entirely. More importantly, it goes along the lines of a lot of criticism and misunderstanding many other voiced with regards to DevOps.

First, if you have no idea of what DevOps is, I suggest you check out the [Wikipedia page](http://en.wikipedia.org/wiki/DevOps) as well a the more digestible [definition from NewRelic]( http://newrelic.com/devops/what-is-devops). I'll wait here.

I think the main issue with the DevOps movement is that it is usually pretty poorly outlined: there are a lot of fuzzy or twisted definitions out there, with some people attributing it more to automation and configuration management, and others to fostering the practice of ops by developers and development by sysadmins.

And this pisses off a pretty large amount of folks (somehow). More often than not because not everybody is a jack-of-all-trades; good developers are usually busy developers and have enough to deal with without having to start chasing errors in the deployment pipeline. Same goes for ops folks: they're usually kept busy enough with keeping their whole infrastructure running without piling up learning Ruby or writing tests for provisioning.

Well, it seems to me this isn't what DevOps is about. These are concrete manifestations of how some teams implement a DevOps approach for their specific problems, with the resources they have access to, not a mandatory to-do list. I clearly see 3 aspects that are thrown together in a confusing mix:

- **At its core, DevOps is about collaboration and communication**. It isn't about Puppet, or automation, or full-stack developers, or monitoring. It is about breaking down walls between ops and developers.

- **The usual outcome of this effort** is often measured in shorter development cycles, more frequent deployments and higher reliability or quality of the produced software.

- **To get there, people recommend a wide range of methods and best-pratices encouraging both sides to meet half-way**. This means understanding each other's roles, tools and yes, sometimes, cross-functional profiles. But in that sense, it isn't much different from what you'll expect from a team lead or an entrepreneur: having at least some level of understanding of what each of your team members does is tremendously helpful in bridging the gap between them.

DevOps is about culture. Agile methodologies aim at improving communication and collaboration between development teams and their clients. The DevOps movement applies similar ideas at the intersection of development and ops teams.

It is at this intersection [that me and my team are working](http://devo.ps/blog/dealing-with-servers-still-suck/): building a platform that helps both sides meeting half-way, by [lowering the barriers of entries to managing infrastructure for developers](http://devo.ps/blog/one-click-deploy-of-your-infrastructure/) while keeping things transparent and familiar for ops people (as opposed to offering some kind of [black-box NoOps solution](http://devo.ps/blog/managing-infrastructure-is-effin-hard/)).
