---
published: false
category: blog
title: Goodbye node-forever, hello PM2
author: alex
hn: 

layout: post
---

## INTRO

We love JS BUT
Putting node.js in prod > still very hard on many levels: monitoring  + logging can be ainful, traces impossible etc.
Forever > Pretty awesome, works well, but:
limited in its monitoring/loggin abilities
doesn't leverage clustered infrastructures (that's where the industry is going)
codebase is aging (breaks often)
IDEA This is why we came up with PM2 (w00t) which aims at solving these issues, and especially focused on clusteraization right off the bat

## DEVELOPMENT

### What's in the box?

How to install it and where to find it


```
npm install -g pm2
```

[https://github.com/Unitech/pm2](https://github.com/Unitech/pm2)


| Tool        | Keep Alive | Coffeescript | Log aggregation | API | Terminal monitoring | Clustering | JSON configuration |
| ------------|:----------:|:------------:|:---------------:|:---:|:-------------------:|:----------:|:-----------------------:|
| Forever     | **V** | **V** | X | X | X | X | X |
| PM2         | **V** | X | **V** | **V** | **V** | **V** | **V** |


Let me describe the main features

### Native clusterization

Since Node v0.6, the cluster feature permits to easily share the same socket accross multiple networked Node applications.
The problem is that you need to change the code in your main file, in order to have one master process and multiple children.
So here we are, with PM2 you can now clusterize application natively, without adding one line of code ! PM2 act as the
master process and wrap your code into a special clustered process, as Nodejs do to add some global variables to your files.

To start a clustered app using all the CPUs you just need to type this :

```
$ pm2 start app.js -i max
```

Then

```
$ pm2 list
```

![List](https://github.com/unitech/pm2/raw/master/pres/pm2-list.png)

And as you can see your app is now forked into X processes depending on the number of CPUs you have.

context > problem > current solution

### Monitoring ala termcaps-HTOP

It's nice to manage all these Node processes with one tool and to track their state with commands like `pm2 list`.
But what about tracking their resources consumption ? 
Here we are with :

```
$ pm2 monit
```

You can now monitor the CPU usage and memory consumption of every processes (also clusters) managed by PM2. 
![Monit](https://github.com/unitech/pm2/raw/master/pres/pm2-monit.png)

/!\

Sorry mac user, the [node-usage](https://github.com/arunoda/node-usage) module doesn't support Mac systems for now (feel free to pull-req).
But it works very well on all Linux distributions.

#### Want to see all clusters dancing and the GC cleaning the memory stack ?

Let's consider you have already a HTTP benchmark tool (if not you should definetely use [WRK](https://github.com/wg/wrk))

```
$ express bufallo     // Create an express app
$ cd bufallo
$ npm install
$ pm2 start app.js -i max
$ wrk -c 100 -d 100 http://localhost:3000/
```

In another terminal, launch the monitoring option :

```
$ pm2 monit
```

WOOT all requests are shared between the X processes !


### Feature 3

description feature 3

## CONCLUSION

- Come help us + reminder about Github repo
- What you can expect coming in the future
- Lead >> more on MB centric apps + distributed applications + more on PM2 design (next week)
