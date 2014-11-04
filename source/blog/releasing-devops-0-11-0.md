---
collection: blog
title: Releasing devo.ps 0.11.0
tags:
  - release

author: vincent
hn:
date: 2014-11-04

template: post.html
---

We're glad to introduce the new release of [devo.ps](http://devo.ps) 0.11.0 with a lot of new features:

- **Stripe integration**; new users are subscribed to the free plan.
- **Events**; this is the exciting feature! We'll follow up with a more detailed blog post and documentation. Long story short, it allows to trigger tasks automatically at various time such as; server create complete, task start, server update successful (or failed), etc.
- **Update of the web interface**; long awaited, it offers the following:
  - new user page
  - repository's home aggregating tasks and servers on the same page
  - better display of the tasks' triggers
- **Better logs**; more details about what happened during the udpate of a server or the execution of a task.
- Update of the various forkable repositories to make use of the new events. You only need to activate your new repo and the server get provisioned and the application automatically deployed.

More technologies will be released in the next feature, as well as backup support, documentation about events and crons, full new onboarding and much more! Stay tuned.
