---
collection: blog
title: Releasing devo.ps 0.6.0
tags:
  - release

author: ronan
hn:
date: 2014-09-06

template: post.html
---

We just pushed another devo.ps release (0.6.0). We are nearing a stable build and will most likely spend the next week adding more trigger for events (cron, GitHub events, devo.ps events...) and add more technologies. We have a few large updates to the documentation that should go live by next Wedneday as well.

A quick list of some of the more visible things we've done in this release:

<!--more-->

- **Payload support for webhook triggers**; we just wrote a post using this feature to add [Metalsmith support on GitHub pages](http://devo.ps/blog/metalsmith-on-github-pages/). You can now use parsed JSON payloads in your tasks trigger by webhooks.
- **Delete repositories**; you can now remove repositories (long overdue).
- **devo.ps community**. We started what will be the devo.ps community on GitHub: https://github.com/devops-community. We'll be posting public repositories of infrastructures you can fork using the [devo.ps button](devo.ps/blog/one-click-deploy-of-your-infrastructure/).
- **Infrastructure improvements**; we made a few major changes in the way we manage and deploy the underlying devo.ps infrastructure. It now runs with the latest version of Docker, Ubuntu and uses [Consul](http://consul.io). This mostly mean faster deploy cycles and a much more robust service.

We started updating the [main website](http://devo.ps) and, as usual, are continuously improving the [documentation](http://docs.devo.ps).

Next week will be an important milestone as we aim at releasing an official stable version of devo.ps. See you all in a week.
