---
published: false
category: blog
title: "Vagrant, Docker and Ansible. WTF?"
author: xecodou
hn: 6366665

layout: post
---

Given that we're building a SaaS that helps our client managing their infrastructure, our team is pretty familiar with leveraging VMs and configuration management tools. We actually have been heavy users of Vagrant and [Ansible](http://devo.ps/blog/2013/07/03/ansible-simply-kicks-ass.html) for the past year, and it's helped us tremendously normalize our development process, making sure everybody is running .

As our platform grew in complexity, some additional needs emerged:

- **Containerization**; we needed to be able to safely execute custom, and potentially harmful, code.
- **Weight**; as we added more sub-systems to devo.ps, having full blown VMs proved to be hard to juggle with when testing and developing.

And that's why we ended up adding Docker to our development workflow. We were already familiar with it (as it powers some parts of the devo.ps infrastructure) and knew there would be obvious wins. In practice, we are shipping Docker containers in a main Vagrant image and drive some of the customization and upgrade with Ansible.

We'll probably write something about this approach in the coming weeks, but given the amount of confusion there is around what these technologies are, and how they're used, we thought we'd give you a quick tour on how to use them together.

Let's get started.

## Vagrant

[Vagrant](http://www.vagrantup.com/)

> GIVE AN INTRO TO VAGRANT:
> - WHY IT WAS CREATED AND BY WHOM?
> - WHAT IT DOES
> - WHAT ARE THE PROS

> SIMPLE FEW LINES TO INSTALL AND GET RUNNING WITH A BASIC VAGRANT MACHINE (UBUNTU)

## Docker

> GIVE AN INTRO TO DOCKER:
> - WHY IT WAS CREATED AND BY WHOM?
> - WHAT IT DOES
> - WHAT ARE THE PROS

> SIMPLE FEW LINES TO INSTALL AND GET RUNNING WITH A BASIC DOCKER IMAGE WITH NODE.JS SUPPORT RUNNING IN OUR VAGRANT IMAGE

## Ansible

> GIVE AN INTRO TO ANSIBLE:
> - WHY IT WAS CREATED AND BY WHOM?
> - WHAT IT DOES
> - WHAT ARE THE PROS

> SIMPLE FEW LINES TO DEPLOY A SIMPLE NODE.JS APP (HUBOT?) IN THE DOCKER CONTAINER

## Conclusion

> HOW THIS APPROACH HELPED US: AUTOMATION, INFRASTRUCTURE AS CODE AND CONTAINING COMPLEXITY 
> HOW EACH TOOL IS USEFUL
> SOME THINGS WE'RE ROOTING FOR