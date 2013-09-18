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


Docker or [docker.io](http://docker.io) is a new technology that can isolate/distribute hardware resources for softwares.
It is based on some open source technologies, including [lxc](http://en.wikipedia.org/wiki/LXC) and [AUFS](http://en.wikipedia.org/wiki/Aufs) in linux kernel, and writing in [go](http://golang.org). Created by [dotcloud](http://www.dotcloud.com/).

What docker dose is running different software stacks on a same host machine at same time, but isolated them from each others completely.

The best part of docker is that it allow you package complete software stack into a single images, and running them an a more economic manner, compares to traditional virtual machine.
And it also ships with a nice api that make it can easily be integrated into other application.

> SIMPLE FEW LINES TO INSTALL AND GET RUNNING WITH A BASIC DOCKER IMAGE WITH NODE.JS SUPPORT RUNNING IN OUR VAGRANT IMAGE


```
# install the backported kernel
sudo apt-get update
sudo apt-get install linux-image-generic-lts-raring linux-headers-generic-lts-raring

# reboot
sudo reboot

# Add the Docker repository key to your local keychain
# using apt-key finger you can check the fingerprint matches 36A1 D786 9245 C895 0F96 6E92 D857 6A8B A88D 21E9
sudo sh -c "curl https://get.docker.io/gpg | apt-key add -"

# Add the Docker repository to your apt sources list.
sudo sh -c "echo deb http://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"

# Update your sources
sudo apt-get update

# Install, you will see another warning that the package cannot be authenticated. Confirm install.
sudo apt-get install lxc-docker

# Add the docker group
sudo groupadd docker

# Add the current user, in my case, ubuntu, to the docker group
# You may have to logout and log back in again for
# this to take effect
sudo gpasswd -a ubuntu docker

# Restart the docker daemon
sudo service docker restart

# Search is there nodejs images in public registry?
docker search nodejs

# Pull down the image from docker.io public registry, this might take sometimes
docker pull howareyou/nodejs_0.10.18

# Run it, now you have a complete nodejs evnironment running inside a container
docker run -t -i howareyou/nodejs_0.10.18 /bin/bash 
```


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