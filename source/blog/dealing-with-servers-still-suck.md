---
collection: blog
title: Dealing With Servers Still Suck
tags:
  - DevOps
  - server
  - sysadmin
  - cloud
  - configuration management
  - orchestration
  - continuous delivery
  - continuous deployment
  - continuous integration

author: ronan
hn: 8262534
date: 2014-09-03

template: post.html
---

The idea of dealing with servers is almost invariably cringe-inducing for developers. Sure, I know a few folks (me and my colleagues at [devo.ps](http://devo.ps) included) who actually get a kick out of it. But by and large, setting up infrastructure isn't the developer's favorite. There's definitely been a lot of awesome innovation in the past few years that made the whole thing manageable, especially with services like Heroku or TravisCI. But they are no silver bullets. At the end of the day, the whole experience sucks less, but it isn't near being enjoyable.

<img src="http://devo.ps/images/posts/firestorm.gif" width="100%"/>

## What exactly am I babbling about?

I've already shared my thoughts about the [NoOps/PaaS approach](http://devo.ps/blog/the-problem-with-paas/) as well as what I see is the problem with [more traditional approaches to infrastructure management](http://devo.ps/blog/managing-infrastructure-is-effin-hard/).

Let me summarize it for you. Technical teams currently have essentially two options when dealing with infrastructure:

- **NoOps**: think PaaS (Heroku, dotCloud), Continuous Integration and Delivery SaaS (TravisCI, CodeShip.io, Wercker)... This is more or less the developer's answer to things; abstract away all infrastructure concerns. It's low barriers of entry and user-friendly but is also fragmented (lots of specialized services), limited (you're stuck with the workflow and tech supported) and is overall more or less a black-box. You're effectively logged out of your machines.

- **Tools**: things like configuration management (Chef, Puppet, Ansible), Continuous Integration and Delivery (Capistrano, Fabric, Jenkins)... These are more an answer to the needs of the ops community: better tools to help them scale themselves. It's usually extremely powerful, flexible and transparent (OSS). Problem is, they're usually pretty high barriers of entry, not very user-friendly and still suffer from some level of fragmentation.

## How things usually play out

With the first option (NoOps), you can decide to not care (for now) about these problems. But you may have to deal with the consequences of your investment down the line (increasing costs and constraints when you start to scale). The alternative isn't necessarily sexier: lots of work to get things running, a steep learning curve and the ongoing cost of maintenance.

Moreover, the transition between these two polarized ways of doing (which many successful business hit at some point) is often very painful.

<p align='center'>![Transition](http://devo.ps/images/posts/gap.png)<br/><small>Very scientific view of the market</small></p>

Our end goal is pretty much aligned with the [DevOps movement](http://en.wikipedia.org/wiki/DevOps) in that we intend to bridge the gap between the way developers and ops people look at infrastructure:

- **Low-barriers of entry**: we're trying to make things simple and understandable for "regular" folks. You provision a new server by writing a simple, declarative list of what it supports and pushing it to a Git repository. You can also quickly script complex jobs to automate your deployment or database backup with a bit of YAML and Git magic.

- **Collaboration**: since everything is organized around Git repositories, you can bring all the good habits of collaboration you have with software. Deploying the SSH keys of a user to your entire infrastructure can be as easy as adding him as a collaborator to a repository. Users have visibility of what others do and can contribute as easily as on GitHub. We're actually storing our public infrastructures blueprints on GitHub and [letting you fork them from there](http://devo.ps/blog/one-click-deploy-of-your-infrastructure/).

- **Flexibility**: you deploy your own servers on Digital Ocean, AWS, Rackspace or Linode, and you're still able to SSH in and run whatever you want to run on it. There's nothing that you would be able to do on a regular Linux box that we would prevent you from doing. We do not install any agent, we merely enforce by default best-practices that we've learnt over the past decade of working with other teams.

![Preview](http://devo.ps/images/posts/devops-preview.png)

We think we can do that while preserving the interest of your business, keeping costs low while ensuring that you have a solution that will grow with you all the way.

But more importantly, we want to see the approach of true infrastructure as code succeed; we believe that it most likely the stronger force behind the DevOps movement, helping dev and ops folks get along.
