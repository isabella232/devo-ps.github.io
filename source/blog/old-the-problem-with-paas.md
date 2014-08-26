---
draft: true
collection: blog
title: The Problem With PaaS
tags:
  - PaaS
  - Heroku
  - dotCloud

author: ronan
date: 2013-07-05

template: post.html
---

Obviously biased point, but one of the reasons we've built devo.ps is because.


Black box
Cost



There are currently two options to solve your DevOps issues:

The black box: Heroku, DotCloud, AppFog and the likes. You settle for somebody else's DevOps approach and decide to forget about the problem.

The DIY approach: using various tools (Chef/Puppet, Capistrano, Jenkins...) and investing heavy resources into implementing parts of the DevOps tool chain (automation, orchestration, deployment...).

These do not answer the fundamental challenges:

The Heroku-likes are mainly solving the deployment and (horizontal) scaling problems, while obfuscating the infrastructure layer, effectively locking you out of your own infrastructure. There are many (hard) problems beyond these issues, and if you're going to invest in solving them, you'd better own the solutions.

Building things on your own is not only expensive, but time consuming and risky. DevOps profiles are a rare breed and hard to evaluate. Moreover, this approach lacks portability and visibility.

We want to provide users who outgrew the Heroku stage but don't have a dedicated DevOps team with a platform they can invest in building their strategy, from provisioning to automation. In our experience, this is the vast majority of the market.

Heroku and the likes may (wrongly) appear as competitors. They have their place in the ecosystem for teams who specifically don't want or can't worry about DevOps, however their very model is preventing them from addressing the scope we cover as the "secret sauce" is the product. devo.ps gives you a bunch of lego bricks to cook your own secret sauce (and a potentially stronger at that).

Development and Operations are two different beasts. The Heroku stand is an attempt at obfuscating Operations from developers. 

The bottom line:

The larger portion of the market are companies who don't have (yet) a large and/or dedicated DevOps team but are passed the scale for Heroku.

Companies need a better platform they can invest in freely: no lock-in, no technology limitations (or at least none they can't contribute to remove, that's why we propose an Open Source version), access to their infrastructure.

Development and Operations teams need tools with a better shared visibility for them to collaborate.

