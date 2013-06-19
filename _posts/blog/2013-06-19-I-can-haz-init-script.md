---
published: false
category: blog
title: I Can Haz Init Script
author: vincent
hn: 

layout: post
---

Something went awfully wrong, and a rogue process is eating up all of the resources on one of your servers. You have no other choice but to restart it. No big deal, really; this is the age of disposable infrastructure after all. Except when it comes back up, everything starts going awry. Half the stuff supposed to be running is down and it's screwing with the rest of your setup.

You don't get to think about them very often, but init scripts are a key piece of a sound, scalable strategy for your infrastructure. It's a [mandatory best practice](). Period. And there are quite a few things in the way of getting them to work properly at scale in production environments. It's a tough world out there.

## What we're dealing with...

### Packages

Often enough, you're gonna end up installing a service using the package manager of your distro: `yum`, `apt-get`, you name it. These packages usually come with an init script that should get you started.

Sadly, as your architecture grows in complexity, you'll probably run into some walls. Wanna have multiple memcache buckets, or several instances of redis running on the same box? You're out of luck buddy. Time to hack your way through:

- Redefine your start logic, 
- Load one or multiple config files from `/etc/defaults` or `/etc/sysconfig`,
- Deal with the PIDs, log and lock files,
- Implement conditional logic to start/stop/restart one or more of the services,
- Realize you've messed something up,
- Same player shoot again.

Honestly: PITA.

### Built from source

First things first: **you shouldn't be building from source** (unless you really, really need to).

Now if you do, you'll have to be thorough: there may be samples of init scripts in there, but you'll have to dig them out. `/contrib`, `/addons`, ... it's never in the same place.

And that makes things "fun" when you're [trying to unfuck things on a box](http://devo.ps/blog/2013/03/06/troubleshooting-5minutes-on-a-yet-unknown-box.html):

- You figured out that MySQL is running from `/home/user/src/mysql`,
- You check if there's an init script: no luck this time...
- You try to understand what exactly launched `mysqld_safe`,
- You spend a while digging into the bash history smiling at typos,
- You stumble on a `run.sh` script (uncommented, of course) in the home directory. Funny enough, it seems to be starting everything from mysql, nginx and php-fpm to the coffee maker.
- You make a mental note to try and track down the "genius" who did that mess of a job, and get busy with converting everything to a proper init script.

Great.

## Existing solutions (what people use) suck



## Services

So you are good to hack your way through the init script? And you start looking for existing init scripts on the Internet. Internet is full of shit and has no central location for good init scripts.

You walk through the forum pages, issue queues, gists and if you are lucky you'll find a perfect one - or more likely 10 sucky ones. Kuddos to all of those who shared them online, they can't be blamed for sharing something that works in their use case. Sadly they most of the time can only be considered as a starting base and you end-up inspiring yourself from it and re-write your own...

And then yet you build your near perfect script and your IT department make the move from outdated CentOS to new shinny Ubuntu / Fedora. Welcome to the conversion cycle from your SysV to Upstart / Systemd.



# Init script repository

Init script can be made better, smarter and more scalable. Having a central location also greatly helps the community.

Nothing new in the improvements list, from experience and digging through various books and online resources give a good idea of the best practices that could be implemented in such scripts;

- **scalability**; allow multi services to be started at the same time from different config file (the memcache / redis examples)
- **security**; ensure configtest is ran before running restart / reload, do not ever end up with a faulty config file that prevent your service from being restarted...
- **smart**; ensure the cache is aggressively flushed before restarting your database, do not end-up waiting for 50 min for the DB to cleanly shutdown

We are starting a [simple repo](https://github.com/devo-ps/init-scripts) to dump various init scripts that hopefully will help others; do not hesitate to drop your thoughts in the issue queue.


SIDE NOT MENTIONING OUR WORK ON APPS IN SIMILAR FIELD

The issue is somehow similar to the regular services problem but sometime even more exacerbated in case of custom apps. 
A couple technologies provide convenient daemonification tools, node.js has a few; [forever](https://github.com/nodejitsu/forever), [nodemon](http://remy.github.io/nodemon/), [pm2](https://github.com/Unitech/pm2) (fresh and shinny - check it out, more in a later post).