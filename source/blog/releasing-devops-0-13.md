---
collection: blog
title: Releasing devo.ps 0.13
tags:
  - release

author: vincent
hn:
date: 2014-12-10

template: post.html
---

The new release of [devo.ps](http://devo.ps) 0.13 is out! Lots of new features and bug fixes among which:

- New services:
  - **Ruby**; add support of [Ruby](http://docs.devo.ps/services/ruby/) and various versions of Ruby via rbenv.
- Bug fixes:
  - **Supervisord**; fix bug that was preventing new application to automatically start.
  - **Node.js**; fix issues with forever applications and environment variables.
  - **Nginx**; fix issues when remove virtual hosts.
  - **PostgreSQL**; fix permissions of the users associated with a database.
  - **Backup**; fix issue with the cron jobs.
  - **PHP**; drop entirely APC support, rely on native opscode instead.
  - **ElasticSearch**; fix issue where ES was not starting properly after reboot, fix configuration issue about the listening ports.
  - **Repository activation**; fix bug where the servers started creation before having the parameters from the activation made available.
- New public repository:
  - **[Discourse](http://www.discourse.org/)**; the infamous disussion platform based on Ruby on Rails. You can now fork it directly from the [devops-community GitHub repository](https://github.com/devops-community/discourse)
