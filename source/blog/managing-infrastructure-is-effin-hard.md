---
collection: blog
title: Managing Infrastructure Is Effin Hard
tags:
  - PaaS
  - DevOps
  - infrastructure

author: ronan
hn:
date: 2014-08-27

template: post.html
---

I already said [what I think of the NoOps/PaaS approach](http://devo.ps/blog/the-problem-with-paas/): in my eyes, it basically means outsourcing your operations over to a team that will impose you the technologies you can work with and won't give you access to your own infrastructure. More or less a black-box. That approach obviously doesn't work well for a lot of people out there; the problem 

## Look at all the tools!

The good news is that there are a plethora of really great Open Source tools to help you get stuff done. On top of my head:

- **Configuration management**; Ansible, Salt Stack, Puppet...
- **Monitoring & Reporting**: [Zabbix](http://www.zabbix.com/), [Munin](http://munin-monitoring.org), [Sensu](sensuapp.org), [Cacti](www.cacti.net), [Nagios](http://www.nagios.org), [Cabot](cabotapp.com)... 
- **Continuous integration & Continuous delivery**: [Jenkins](http://jenkins-ci.org), [Buildbot](http://buildbot.net/), [Go](www.thoughtworks.com/products/go-continuous-delivery), [Gitlab CI](https://about.gitlab.com/gitlab-ci/)...

The list is growing every day. I recommend you check the [Awesome Sysadmin list](https://github.com/devo-ps/awesome-sysadmin) on GitHub.

But these are just tools. You still need a qualified sysadmin/ops colleague to come in, install and, more importantly, maintain them over time. There is a pretty high barrier of entry to operate infrastructure properly; it takes a long time for somebody to accumulate the skills and knowledge required to build, automate and scale things, all while preventing the whole thing from crashing and burning.

## Wait, what about Docker?

Right. First, let me say that we love Docker at [devo.ps](http://devo.ps). [My other company](http://wiredcraft.com) is even an official Docker SI partner. Heck, devo.ps itself is built on the damn thing.

But, [as my colleague Vincent would put it](http://devo.ps/blog/docker-dos-and-donts/), Docker is no pixie dust: it isn't going to make your infrastructure issues magically disappear. It merely provide you with yet another tool which requires an additional set of skills and knowledge to maintain. It won't magically heal itself or scale. It requires security patches and updates.

## So what do people do?

Mostly, what I observed is one of these scenarios:

- **NoOps**: Startups or medium-sized business often don't have the resources or workload to hire a sysadmin/SRE/ops full time. They often resort to the PaaS approach for that reason, choosing to outsource their operations and deal with the consequences later.

- **DIY**: we've seen this one at a few startups. Somebody on the team gets to deal with the servers; the outcome is rarely great and the architecture almost invariably end up being reworked multiple times. Moreover it puts a developer in the very tough spot of being responsible for something he doesn't necessarily feel qualified for (or even enjoy doing).

- **Full ops**: for the companies which "made it", there comes a point at which they hire a proper ops team. They usually end up cleaning up and rebuilding a substantial part of the infrastructure. And even then, we've worked with very resourceful and "hot" companies which still struggle to recruit: their developer to ops ratio is often way larger than it should.

Ops are hard and hiring people who can build, scale and maintain your infrastructure isn't that easy. We love working with servers, but most developers we meet don't fancy dealing with struggling yet again with packages to get NGINX, Redis and Node.js running on their box. A lot of what a knowledgeable sysadmin is more or less "black magic" to them.

That's what we're set to fix with [devo.ps](http://devo.ps): lowering the barriers of entries to operations so that developers feel comfortable contributing on building things the right way.
