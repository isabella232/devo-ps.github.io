---
collection: blog
title: Releasing devo.ps 0.10.0
tags:
  - release

author: vincent
hn:
date: 2014-10-29

template: post.html
---

We're glad to introduce the new release of [devo.ps](http://devo.ps) 0.10.0 with the following improvements:

- [uWsgi](http://docs.devo.ps/services/uwsgi/) process management and [python tasks](http://docs.devo.ps/services/python/)
- MySQL fixes
- Architecture change with dedicated eventer to handle all events, webhooks, crons
- Added [cron](http://docs.devo.ps/manual/tasks/#cron) trigger support; documentation will be available shortly
- Added 2 new community repositories that you can fork immediately:
    - [django](https://github.com/devops-community/django); let you build and deploy a simple django application
    - [wordpress](https://github.com/devops-community/wordpress); the infamous blog platform, let you deploy a fresh wordpress setup in minutes

A lot of work occured under the hood this week, few changes are noticeable in the web interface. But don't fear! They'll be out at the next release with a nice revamp of the UI and a lot more changes and improvement!

Feel free to give us feedback or suggestion on our [twitter](http://twitter.com/devo_ps) channel, or jump on [chat with us](https://www.hipchat.com/gyHEHtsXZ). Enjoy !
