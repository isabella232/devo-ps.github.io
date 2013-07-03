---
published: false
category: blog
title: Ansible Kicks Asses
author: vincent
hn: 

layout: post
---

The devo.ps team has been putting quite a few tools to the test over the years when it comes to managing infrastructures. We've developed some ourselves and have adopted others. While the choice to use one over another is not always as clean cut as we'd like (I'd love to rant about monitoring but will leave that for a later post), we've definitely developed kind of a crush for Ansible in the past 6 months. We went through years of using Puppet, then Chef and then later on Salt Stack, but Ansible has definitely gained unanimous adoption of the whole team.

What makes it awesome? Well, let's be specific:

- It's **agent-less** and works by default in **push mode**.
- It's **easy to pick up** (honestly, try and explain Chef or Puppet to a developer and see how long that takes you compared to Ansible).
- It's **just python**. It makes both easier for people like me to contribute (Ruby is not necessarily that mainstream among ops) and also means no dependency on install (Python is shipped by default with Linux).
- It's **picking up steam** at an impressive pace,
- And it has all of the good stuff: idempotence, roles, playbooks, tasks, handlers, lookups, callback plugins...

Now, Ansible is still very much in its infancy and some technologies may not yet be supported. But there are a great deal of  teams pushing hard on contributions, including us. In the past few weeks for example, we've contributed both Digital Ocean and Linode modules. And we have a lot more coming, including some dabbling with Vagrant (largely misunderstood IMHO).

MORE DETAILS ABOUT HOW TO USE BOTH MODULES (LINODE, DO) WITH LINKS TO REPOS

NOT SURE THE FOLLOWING IS USEFUL

The support is yet imcomplete, but is improving, each cloud provider has his own methods and features; to name a few
ec2: instance, size, region, security groups, keys, and more advanced options like kernel, optimized IO disks, EBS based images, etc.

can create, start, stop, restart, terminate instances

rackspace: instance, size, region, ...

Linode....

Idempotence is not easy to reach due to the available methods to identify instances; sometime the name, sometime an ID, sometime ...

Ec2 has a highly complex API that lets you query and filter pretty much based on any criteria; their spec is offering hundreds of possible methods. Other cloud providers have much simpler API but less features as well.

With the Linode, we tried to achieve the idempotence and let you start / stop / delete servers. 

```
example of ansible calls
```

We are applying the same approach now with DO and are looking forward to update other stuff.
