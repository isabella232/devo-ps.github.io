---
collection: blog
title: Releasing devo.ps 0.7.0
tags:
  - release

author: ronan
hn:
date: 2014-09-14

template: post.html
---

Another week, another release. We've pushed devo.ps 0.7.0 out. A few things we fixed and added:

- Collaborators are now synced; adding or removing a collaborator on a repo will add or remove their keys from the repo's servers.
- Improve the support for Nginx and MySQL (more commands, support for remote hosts).
- Added more settings for servers: fail2ban, swap, sysctl, packages, repositories management.
- Revamped the docs.devo.ps; we've added examples and a more accurate list of attributes for all services.
- Miscellaneous: 
  - Editing files doesn'trequire to fill in the filename anymore,
  - Switch to the latest task run in the console on trigger,
  - Fixed node status notifications.
  
We're fast approaching our public release which will include more triggers (servers & tasks events, cron, ...) and full support for LAMP and JS stacks.
