---
collection: blog
title: Basic Setup For A New Linux Server
tags:
  - sysadmin
  - Linux
  - Ubuntu
  - configuration
  - packages
  - install

author: vincent
hn:
date: 2014-09-04

template: post.html
---

You just provisioned a new machine on AWS or Digital Ocean. It almost has that new car smell: great. Now what? You want to go from a vanilla install to a box that you'll be able to easily manage and has the [basic tools for troubleshootint it](http://devo.ps/blog/troubleshooting-5minutes-on-a-yet-unknown-box/). Let me share a few of the best practices we stick to when creating servers with [devo.ps](http://devo.ps). You should [sign up for a free account](https://app.devo.ps) by the way: you'll get all of what I'm about to list set up on your own Rackspace, Digital Ocean, Linode or AWS servers in a few minutes.

First, a couple things:

- **This setup isn't intended to be the lightest or smallest possible**. We're not dealing with containers here, we can afford installing a few useful tools.

- **This setup is very much opinionate**d, though based off of our experience working with a lot of teams of various sizes. We're open to suggestions.

Let's get started:

- **OS**: pick **Ubuntu 14.04.1 LTS**. It's a popular choice, with lots of relatively fresh packages, and the [Long Term Support](https://wiki.ubuntu.com/LTS) guarantee from Ubuntu.

- **Settings**:

    - **Set locales to UTF-8** to avoid receiving annoying messages about "no locale found".
    
        locale-gen en_US.UTF-8 && echo 'LC_ALL="en_US.UTF-8"' >> /etc/default/locale
    
    - **Set swappiness to 0** to limit swap usage as much as possible.
    
        echo 'vm.swappiness = 0' >> /etc/sysctl.conf && sysctl -p
    
- **Create a 2GB swap file at the root of the filesystem** to prevent OOM (Out of Memory) errors. Often times, cloud instances don't come with a swap partition, which leads to error when the RAM starts to fill up.

        dd if=/dev/zero of=/swapfile bs=1M count=2048
        mkswap /swapfile
        chmod 600 /swapfile
        echo '/swapfile swap swap defaults 0 0' >> /etc/fstab
        swapon -a
        
- **Set nofile limit to 64K** to avoid running in the 1024 open files limitation when, for example, you have a lot of databases and tables open.

        cat >> /etc/security/limits.d/nofile.conf << EOF
        # limits for number of open file for root and default users.
        root    hard    nofile  65536
        root    soft    nofile  65536
        *   hard    nofile  65536
        *   soft    nofile  65536
        EOF
        
- **Linux users**:

    - **root** should only be used for provisioning and configuration. After that, disable SSH access and use `sudo` instead.
    
    - For devo.ps, we also create a **devops** user which we use to access the box. You should probably add your own user and grant it `sudo`access.
    
- **Packages**:

    - For **troubleshooting**:
    
        - **[htop](http://hisham.hm/htop/)** is a great alternative to top.
        - **[iftop](http://www.ex-parrot.com/pdw/iftop/)** provides realtime bandwidth investigation capabilities.
        - **sysstat** gives you the ultimate troubslehooting tools; iostat, mpstat, sar, etc.
        - **[dstat](http://dag.wiee.rs/home-made/dstat/)** is a great collection of stat tools.
        
    - **Git & Subversion** since they're the more commonly used VCS.
    
    - **make, gcc & g++** (we know it's controversial) are often required when building extensions (PECL, npm, pip...).
    
    - **postfix** running standalone, listening only to localhost, allows you to send email and notifications.

Feedback is welcome. And if you don't feel like setting up all of this by yourself, **[create a free devo.ps account](http://app.devo.ps) and get your own Digital Ocean, AWS, Rackspace or Linode servers ready in a few minutes**.
