---
published: true
category: blog
title: Vagrant, Docker and Ansible. WTF?
author: xeodou
hn:

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

You've probably heard about [Vagrant](http://www.vagrantup.com/); a healthy number of people have been writing about it in the past 6 months. For those of you who haven't, think of it as a VM without the GUI. At its core, Vagrant is a simple wrapper around Virtualbox/VMware.

A few interesting features:

- **Boatloads of existing images**, just check [Vagrantbox.es](http://www.vagrantbox.es/) for example.
- **Snapshot and package your current machine** to a Vagrant box file (and, consequently, share it back).
- **Ability to fine tune settings of the VM**, including things like RAM, CPU, APIC...
- **Vagrantfiles**. This allows you to setup your box on init: installing packages, modifying configuration, moving code around...
- **Integration with CM tools** like Puppet, Chef and Ansible.

Let's get it running on your machine:

1. First, [download Vagrant](http://downloads.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/wiki/Downloads).
1. Second, let's download an image, spin it up and SSH in:

        $ vagrant init precise32 http://files.vagrantup.com/precise32.box
        $ vagrant up
        $ vagrant ssh

1. There's no 3.

## Docker

[Docker](http://docker.io) is a Linux container, written in [Go](http://golang.org) (yay!) and based on [lxc](http://en.wikipedia.org/wiki/LXC) (self-described as "chroot on steroids") and [AUFS](http://en.wikipedia.org/wiki/Aufs). Instead of providing a full virtual machine, like you get with Vagrant, Docker provides you lightweight containers, that share the same kernel and allow to safely execute independant processes.

Docker is attractive for many reasons:

- **Lightweight**; images are much lighter than full VMs, and spinning off a new instance is lightning fast (in the range of seconds instead of minutes).
- **Version control of the images**, which makes it much more convenient to handle builds.
- **Lots of images** (again), just have a look at XXX.

Let's set up a Docker container on your Vagrant machine:


1. SSH in Vagrant if you're not in already
   
        $ vagrant ssh

1. Install Docker, [as explained on the offical website](http://docs.docker.io/en/latest/installation/ubuntulinux/#id2):

        $ sudo apt-get update
        $ sudo apt-get install linux-image-extra-`uname -r`
        $ sudo sh -c "curl https://get.docker.io/gpg | apt-key add -"
        $ sudo sh -c "echo deb http://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"
        $ sudo apt-get update
        $ sudo apt-get install lxc-docker

1. Verify it worked by trying to build your first container:

        $ sudo docker run -i -t ubuntu /bin/bash

1. STEP 3 >> Build an actual node.js box

You now have a Docker container, inside a Vagrant box (*Inception* style), ready to run a Node.js app.

## Ansible

[Ansible](http://ansible.cc) is an orchestration and configuration management tool written in Python.

is a radically simple IT orchestration engine that makes your applications and systems easier to deploy. Avoid writing scripts or custom code to deploy and update your applications— automate in a language that approaches plain English, using SSH, with no agents to install on remote systems.

Write an nginx yml file like this 

    ---
    - name: Ensure nginx is installed
        apt: pkg=nginx state=present
        notify: enable nginx

    - name: Backup origin nginx config
        command: mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig
                 creates=/etc/nginx/nginx.conf.orig
                 removes=/etc/nginx/nginx.conf

    - name: Add new nginx conf
        copy: src=./nginx.conf dest=/etc/nginx/nginx.conf

    - name: Start nginx

`nginx.conf` is our custom nginx configure file, proxy the node js application to 80 port.
You can also install git with ansible, it's simple to clone git from git repository,just add 

    -name: Ensure git installed 
       apt: pkg=git stare=present

     in a task.
    
    Use `ansible-playbook yourplaybook.yml` run all playbooks and start the container with nodejs application. You can open `your custome url` in the browser
    , you will get what you want.

## Let's wrap it up

* As a small team, we need rise our level of automation as high as possible.

* It save a lot of time, a lot of enegy.

* Learn to use right tools in right places.

* Try combine all things together as whole.


> HOW THIS APPROACH HELPED US: AUTOMATION, INFRASTRUCTURE AS CODE AND CONTAINING COMPLEXITY 
> HOW EACH TOOL IS USEFUL
> SOME THINGS WE'RE ROOTING FOR
