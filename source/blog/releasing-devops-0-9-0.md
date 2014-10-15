---
collection: blog
title: Releasing devo.ps 0.9.0
tags:
  - release

author: vincent
hn:
date: 2014-10-15

template: post.html
---

Deciding when to release vs. pushing an update is always a tradeoff; we're always `almost there`! Nonetheless we're glad to introduce the new release of [devo.ps](http://devo.ps) 0.9.0 with the following improvements:

- Added[PostgreSQL](http://docs.devo.ps/services/postgresql/); includes user management, still in beta support, more tuning available soon.
- Added [Rackspace provider](http://docs.devo.ps/providers/rackspace/); new generation of cloud instances only; including regular and performance versions.
- Better variable management; fixing some issues with database passwords, arrays merge, etc.
- Updated documentation:
    - Added details for PostgreSQL and Rackspace (obviously),
    - Added howtos on how to create those infamous cloud providers API keys
- Fixed bugs where some servers where not deleted as expected.

Soon to be released; Stripe integration, regular login / password on top of Github authentication, backup tasks, and overall more technologies and public repositories.

Stay tuned !
