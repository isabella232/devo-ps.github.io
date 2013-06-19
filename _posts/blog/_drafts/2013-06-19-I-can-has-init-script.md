---
published: false

category: blog
title: 'I can has init script'
author: vincent

layout: post
---

Sysadmins heavily rely on init scripts for their day to day operations, from starting to stopping a service going through all the steps of .. restarting and reloading. It is a bit cynical and reducing but it is a [best practice](/blog/2013/02/11/best-practices-it-s-always-or-never.html) you can not cope with.  
Remember that power outage that let your server down without X, Y or Z up and running when the juice flew again?

The thing is that init scripts are usually only dealt with once and are then forgotten for the life time of the box; there is little affection provided to them. Most of the packaged init script are designed for common use case and cover only simple architectures. But it quickly breaks when scaling in production; clusters, lack of optimization, etc.
So far, their is limited resources available to help on that matter, a couple of tools to help on the management of processes (mmonit, supervisord, etc.), but not addressing the core issues.

# Where are the init scripts ?

## Packages

Many services come packaged with their own init script, good or bad they often do the job and cover 80% of the needs.  
You want ```nginx```? Type your ```apt-get``` / ```yum``` and you'll end up with (hopefully) a properly installed nginx with the init script enabled and ready to go. Same thing for many others.

You have a more complex architecture and you need several instances of that same service running? Just to name a few, a couple of memcache or redis servers listening on various ports?  
You are good to start hacking your way through the init scripts;

- redefine your start logic, 
- load one or multiple config file from ```/etc/defaults``` or ```/etc/sysconfig```, 
- deal with the pids 
- and eventually implement conditional logic to start / stop / restart one or more of the services. 

What a pain.

## Installed from source

I'm gonna make it short here; unless you have need for highly customized packages, **don't do it!** Even if a couple of programs include sample init scripts it is too simple to forget to add it or completely skip that step.

In a previous post we were discussing the [discovery phase of a server](/blog/2013/03/06/troubleshooting-5minutes-on-a-yet-unknown-box.html). You just ran onto that unknown box and you figured out mysql is running from ```/home/user/src/mysql```. As a sysadmin you do what? 

- You check if there is an init script - no luck this time... 
- You try to figure out what launched mysqld_safe, 
- dig into the bash history, 
- find out an awkward run.sh script in the home directory that along with mysql starts custom build nginx and php-fpm processes. Because you know … *I needed that neat feature and ... I was bored …* 

Now go restart your DB

# Where is my init script ?

## Services

So you are good to hack your way through the init script? And you start looking for existing init scripts on the Internet. Internet is full of shit and has no central location for good init scripts.

You walk through the forum pages, issue queues, gists and if you are lucky you'll find a perfect one - or more likely 10 sucky ones. Kuddos to all of those who shared them online, they can't be blamed for sharing something that works in their use case. Sadly they most of the time can only be considered as a starting base and you end-up inspiring yourself from it and re-write your own...

And then yet you build your near perfect script and your IT department make the move from outdated CentOS to new shinny Ubuntu / Fedora. Welcome to the conversion cycle from your SysV to Upstart / Systemd.

## Applications

The issue is somehow similar to the regular services problem but sometime even more exacerbated in case of custom apps. 
A couple technologies provide convenient daemonification tools, node.js has a few; [forever](https://github.com/nodejitsu/forever), [nodemon](http://remy.github.io/nodemon/), [pm2](https://github.com/Unitech/pm2) (fresh and shinny - check it out, more in a later post).

# Init script repository

Init script can be made better, smarter and more scalable. Having a central location also greatly helps the community.

Nothing new in the improvements list, from experience and digging through various books and online resources give a good idea of the best practices that could be implemented in such scripts;

- **scalability**; allow multi services to be started at the same time from different config file (the memcache / redis examples)
- **security**; ensure configtest is ran before running restart / reload, do not ever end up with a faulty config file that prevent your service from being restarted...
- **smart**; ensure the cache is aggressively flushed before restarting your database, do not end-up waiting for 50 min for the DB to cleanly shutdown

We are starting a simple repo to dump various init scripts that hopefully will help others; do not hesitate to drop your thoughts in the issue queue.
