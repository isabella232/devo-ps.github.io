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

### Forever VS PM2

| Tool        | Keep Alive | Coffeescript | Log aggregation | API | Terminal monitoring | Clustering | JSON configuration |
| ------------|:----------:|:------------:|:---------------:|:---:|:-------------------:|:----------:|:-----------------------:|
| Forever     | **V** | **V** | X | X | X | X | X |
| PM2         | **V** | X | **V** | **V** | **V** | **V** | **V** |


### So what's in the box?

Installing it as a binary :

```
npm install -g pm2
```

Github repos (we love stars) :

[https://github.com/Unitech/pm2](https://github.com/Unitech/pm2)

### Native clusterization

Since Node v0.6, the cluster feature permits to easily share the same socket accross multiple networked Node applications.
The problem is that you need to change the code in your main file, in order to have one master process and multiple children.
So here we are, with PM2 you can now clusterize application natively, without adding one line of code ! PM2 acts as the
master process and wrap your code into a special clustered process, as Nodejs do, to add some global variables to your files.

To start a clustered app using all the CPUs you just need to type this :

```
$ pm2 start app.js -i max
```

Then

```
$ pm2 list
```

![List](https://github.com/unitech/pm2/raw/master/pres/pm2-list.png)

(UX in terminal, yes it's possible)

And as you can see your app is now forked into X processes depending on the number of CPUs you have.

### Monitoring ala termcaps-HTOP

It's nice to manage all these Node processes with one tool and track their status with commands like `pm2 list`.
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

Let's consider you have already a HTTP benchmark tool (if not, you should definetely use [WRK](https://github.com/wg/wrk))

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


### Realtime log aggregation

Damn, so now I have to manage X processes clustered, one other who is crawling data, one who process the data, one who XXXX.
So many logs !

Yes BTW you still can do :

```
$ tail -f /path/to/log1 /path/to/log2 ...
```

But we are so nice that we wrotte a special feature :

```
$ pm2 logs
```

That's... all !

![Monit](https://github.com/unitech/pm2/raw/master/pres/pm2-logs.png)


### Dig up your grand'ma

Ok I took some time to pop all my Node processes and now it looks like a nice orchestrion.
But what happen if your server get restarted ? 
```A : shit```

So here we are :

```
$ pm2 dump
```

Your processes are now dumped into a file.

```
$ pm2 kill     // let's simulate a pm2 stop
$ pm2 resurect // All my processes are now up and running 
```

### API Health point

Let's say you want to monitor all processes managed by PM2, and also the health status of your computer. 
(and making a nice Angular app to consume this API :)

There is no solution.

With PM2 just do :

```
$ pm2 web
```

Done. Open your browser, and go to http://localhost:9615.

/!\ If you store password into your env, you should protect this API (pm2/lib/HttpInterface)

### Damn there is more

- Fully tested
- Generation of update-rc.d (pm2 startup) -> still in development
- Development mode with auto restart on file change (pm2 dev) -> beta
- Log flushing
- Manage your applications fleet via JSON file
- Log uncaught exceptions in error logs
- Track restarted time, display latest restart time
- Auto stop processes who exit too fast
- Dump current processes and resurect (upstart)

## CONCLUSION

We developed PM2 to offer an advanced and complete solution for process management to the Node community. 

We are open to issues reporting and pull requests [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2)

Once we will have a battle hardened PM2 core we plan to implement features like :

- Remote administration/status checking
- Builtin Inter process communication channel (message bus)
- V8 GC memory leak detection
- Web interface
- Tracking monitoring data
- Notification via email when something is going wrong
- Integrated wrk utils endpoint benchmark

Thanks to [Makara Wang](https://github.com/makara) for concepts/tools and [Alex Kocharin](https://github.com/rlidwka) for advices and pull requests :)



- Come help us + reminder about Github repo
- What you can expect coming in the future
- Lead >> more on MB centric apps + distributed applications + more on PM2 design (next week)
