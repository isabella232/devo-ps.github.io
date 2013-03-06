---
published: false
category: blog
title: "Troubleshooting; 5 minutes on an yet-unknown box"
author: vincent
hn: 

layout: post
---

# 5 minutes to discovery

At devo.ps and in our previous ventures, we have often been asked by customers to perform performance review, troubleshooting of slow websites, and basically come back with a quick set of ideas to what may (or may not) be the root cause of the described behavior.

We work with many different customers and we rarely end-up with clones. While the technologies in their stack is rather common (nginx, php, mysql, mongo, you name it), there is always a first few steps of analyze to identify;
1. the exact running stack
1. the possible bottlenecks
1. the ...

Let me walk you through the first 5 minutes of the discovery phase.

## Info gathering from the owner
Before rushing on the server(s) it is always good to get proper information about what we are to analyze. Without this phase we often may end up shooting in the dark and my eventually come with suggestions to problems that weren't  noticed ... yet.

Non exhaustive list;

- what is the type of the issue, slowness? errors? non-responsive?
- since when?
- reproducible?
- time sensitive? at 8am everyday?
- latest changes on the platform (code, servers, stack)
- affecting everyone? or subset of users? anonymous? logged users? geographically limited?
- architecture diagram, physical and logical
- monitoring platform, if any,
- centralized log,
- etc.

Now while all of this is useful and may even already give you "the" answer (especially the monitoring/logging part), let's get back to business and jump on the box.

## Who is there
```
w
last
```

Figure out who's in already. Not that it is highly important, but you don't want to end up troubleshooting on a platform that is under maintenance, or which behavior has been impaired by someone else work.

## What is running
```
pstree -a
ps aux
```

Always good to know, while ```ps aux``` tend to be very verbose, ```pstree -a``` gives you a nice condensed view of what is running and who called what.

## Listening services
```
netstat -ntlp
netstat -nulp
netstat -nxlp
```

I tend to prefer running them separately just because I don't like the services to be all mixed together, but this is just my pov. You can always go for a faster ```netstat -nalp```. You may want to omit the ```numeric``` option but IPs are more talkative to me.

Identify there the running services, whether they are expected to be running or not. Look for the various listening ports. You can always match the PID of the process with the output of ```ps aux```; it tend to be quite useful especially when you end up with 2 or 3 java or erlang processes.

Preferring to deal with properly structured platform where services are separated I tend to make a note when I see 3 dozens of listening ports on a single box.

## CPU and RAM
```
free -m
uptime
top / htop
```

A couple of things to figure out there;

- Any free RAM? Is it swapping? 
- Is there still some CPU left? How many CPU cores are available on the server? Is 1 CPU core overloaded?
- What is sucking the most on the box? RAM and CPU wise?
- What is the load on the box?

## Hardware
```
lspci
dmidecode
ethtool
```

While many now get their platform on the cloud, there is still a huge amount of servers running bare-metal; 

- identifying the RAID card (with BBU?), the CPU, the available memory slots may give you some hints on potential issues or performance improvement. 
- Is you NIC properly set? Are you running in half-duplex? in 10MBps? any TX/RX errors?

## IO Performances
```
iostat -kx 2
vmstat 2 10
mpstat 2 10
dstat --top-io --top-bio
```

Very useful tools to analyze the overall performance of your backend;

- Checking the disk usage, has the box a filesystem / disk with 100% disk usage?
- Is the swap currently in use? (si/so)
- What is using the CPU, system? user? stolen (VM)?
- (my all-time-favorite dstat) What is using the IO? is MySQL sucking the resources? or is it your PHP processes?

## Mount points and filesystem
```
mount
cat /etc/fstab
vgs / pvs / lvs
df -h
lsof +D / (beware not to kill your box)
```

- How many filesystem are being mounted?
- Is there dedicated filesystem for some services? (not to name mysql?)
- What are the filesystem mount options? (noatime? default?) have some FS be remounted RO?
- Do you have any disk space left?
- Is there any big (deleted) files that have not been flushed out?
- Do you have room to extend a partition if disk space is an issue?

## Kernel, interrupts and network usage
```
sysctl -a | grep ...
cat /proc/interrupts
cat /proc/net/ip_conntrack (may take some time on busy servers)
netstat
ss -s
```

- Are your IRQ properly balanced across the CPU? or is one of the core overloaded because of ... network interrupts, raid card, etc.
- How much is swappinness set to? 60 is good enough for workstations, but when it come to servers this is generally a bad idea, you do not want your server to swap .. ever; or your swapping process will be locked while data are read / written to the disk.
- Is ```conntrack_max``` set to a high enough number to handle your traffic?
- How long do you maintain TCP connections in the various states? (TIME_WAIT, etc.)
- ```netstat``` can be a bit slow to display all the existing connections, you may want to use ```ss``` instead to get a broad summary

## System logs and kernel messages
```
dmesg
less /var/log/messages
less /var/log/secure / auth
```

- Look for any error or warning messages; is it spitting issues about number of connections in your conntrack being too high?
- Do you see any hardware error, or filesystem error?
- Can you correlate the time from those events with the information provided beforehand?

## Application logs
There is a wide list of logs that can be analyzed there, but it's unlikely you can do all of it within the first 5 minutes!

Just to name a few;

- Apache / Nginx; chase down access and error logs, look for 5xx errors, look for possible limit_zone errors,
- MySQL; look for error in the mysql.log; trace of corrupted tables; innodb repair process in progress; chase down slow logs and define if there is disk / index / query issues
- PHP-FPM; if you have the php-slow logs it's a good time to dig inside and identify possible errors (php, mysql, memcache, etc.)
- Varnish; in varnishlog and varnishstat - check your hit/miss ratio, are you missing some rules in your config that let end-users hit your backend instead?
- HA-Proxy; what are your backend status, are your health-check successful? Do you hit your max queue size on the frontend or your backends?

## Conclusion 

After those first 5 minutes (give or take 10 min!) you will have a better view of:

- what is running
- does the issue seem physical related (IO / hardware / networking) or configuration related (bad code, kernel tuning)?
- is there any pattern with some previously faced issue (either on that server, or some others); for example a bad use of the DB indexes, or too many apache workers, or. 

You may even have found the exact root cause and remedy to your issue, if not, you should now be ready to analyze more in depth one or few of the components of your stack and avoid chasing ghosts.
