---
collection: blog
title: Announcing dopy with Digital Ocean API v2 support
tags:
  - dopy

author: vincent
hn:
date: 2014-10-11

template: post.html
---

![Good news everyone!](/images/posts/good-news-everyone.jpg)

A few month back Digital Ocean announced the support of [its API v2](https://www.digitalocean.com/company/blog/api-v2-enters-public-beta/).

Not many tools or library supports it, but thanks to [Igor](https://github.com/fizban79), [dopy](https://github.com/devo-ps/dopy) now supports version 2 of the API! You can proceed to the install via regular `pip install dopy`

Looking forward to future integration of the V2 in other similar libraries, like [libcloud](https://libcloud.apache.org), or projects that rely on dopy like Ansible and its digital ocean support.

In the mean time I updated a personal project to perform simple cleanup of your test instances, and autoremove droplets older than x hours. Have a look at [digitalocean_cleaner](https://github.com/zbal/digitalocean_cleaner) - nothing fancy, just a conveniency tool to avoid forgetting your test droplets and stop being charged.

Now preparing the support for V2 in [devo.ps](http://devo.ps), most likely released in the near future. Stay tuned!