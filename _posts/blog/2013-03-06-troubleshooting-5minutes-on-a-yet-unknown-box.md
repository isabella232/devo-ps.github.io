---
published: false
category: blog
title: "Troubleshooting; 5 minutes on an yet-unknown box"
author: vincent
hn: 

layout: post
---

At [our previous company](http://wiredcraft.com), our team often dealt with clients who needed us to troubleshoot poorly performing applications and infrastructures of various sizes. Tight deadlines, "exotic" technical stacks and lack of information usually make for a fun time. Some of us grew a tough skin; let me share what we usually went through (while receiving a constant stream of emails or, lucky us, phone calls).

## Get the context right

Don't rush on the servers just yet; you need to assess what info you can get and how much is known about the specifics of the issue. Failing to do so often result in time wasted exploring useless theories.

A few must have:

- What exactly are the symptoms of the issue? Unresponsiveness:? Errors?
- When did the problem started being noticed?
- Is it reproducible?
- Any pattern (e.g. happens every hour)?
- What were the latest changes on the platform (code, servers, stack)?
- Is it specific to specific user segments (logged in, logged out, geographically limited...)?
- Is there any documentation of the architecture (physical and logical)?
- Is there a monitoring platform?
- Centralized logs?

These last two ones are usually pretty informative, but, despite being best practices, we've seen 

## Who's there?

```
> w
```
```
> last
```

Not necessarily critical, but you'd rather not be troubleshooting a platform that others are playing with. One cook in the kitchen is enough.

## What is running?

```
> pstree -a
```
```
> ps aux
```

Always good to know, while ```ps aux``` tend to be very verbose, ```pstree -a``` gives you a nice condensed view of what is running and who called what.

## Listening services

```
> netstat -ntlp
```
```
> netstat -nulp
```
```
> netstat -nxlp
```

I tend to prefer running them separately just because I don't like the services to be all mixed together, but this is just my point of view. You can always go for a faster ```netstat -nalp```. You may want to omit the ```numeric``` option but IPs are more talkative to me.

Identify there the running services, whether they are expected to be running or not. Look for the various listening ports. You can always match the PID of the process with the output of ```ps aux```; it tend to be quite useful especially when you end up with 2 or 3 java or erlang processes.

Preferring to deal with properly structured platform where services are separated I tend to make a note when I see 3 dozens of listening ports on a single box.

## CPU and RAM

```
> free -m
```
```
> uptime
```
```
> top / htop
```

We're trying to answer a few questions here:

- Any free RAM? Is it swapping? 
- Is there still some CPU left? How many CPU cores are available on the server? Is one of the cores overloaded?
- What is sucking the most on the box? RAM and CPU wise?
- What is the load on the box?

## Hardware

```
> lspci
```
```
> dmidecode
```
```
> ethtool
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
- Is there dedicated filesystem for some services? (not to name - mysql?)
- What are the filesystem mount options? (noatime? default?) have some FS be re-mounted read-only?
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
less /var/log/secure
less /var/log/auth
```

- Look for any error or warning messages; is it spitting issues about number of connections in your conntrack being too high?
- Do you see any hardware error, or filesystem error?
- Can you correlate the time from those events with the information provided beforehand?

## Cronjobs
```
ls /etc/cron* + cat
for user in $(cat /etc/passwd | cut -f1 -d:); do crontab -l -u $user; done
```

- Is there any cron job that is running too often?
- Is there some users' cron that are "hidden" from the common eyes?
- Is there a backup of some sort running at the time of the known issue?

## Application logs
There is a wide list of logs that can be analyzed there, but it's unlikely you can do all of it within the first 5 minutes!

Just to name a few;

- __Apache__ / __Nginx__; chase down access and error logs, look for 5xx errors, look for possible limit_zone errors,
- __MySQL__; look for error in the mysql.log; trace of corrupted tables; innodb repair process in progress; chase down slow logs and define if there is disk / index / query issues
- __PHP-FPM__; if you have the php-slow logs it's a good time to dig inside and identify possible errors (php, mysql, memcache, etc.)
- __Varnish__; in varnishlog and varnishstat - check your hit/miss ratio, are you missing some rules in your config that let end-users hit your backend instead?
- __HA-Proxy__; what are your backend status, are your health-check successful? Do you hit your max queue size on the frontend or your backends?

## Conclusion 

After those first 5 minutes (give or take 10 min!) you will have a better view of:

- what is running
- does the issue seem physical related (IO / hardware / networking) or configuration related (bad code, kernel tuning)?
- is there any pattern with some previously faced issue (either on that server, or some others); for example a bad use of the DB indexes, or too many apache workers, or. 

You may even have found the exact root cause and remedy to your issue, if not, you should now be ready to analyze more in depth one or few of the components of your stack and avoid chasing ghosts.

## Useful links

- [Linux TCP tuning](http://www.lognormal.com/blog/2012/09/27/linux-tcpip-tuning/): worth having a look at if the issue appear to be linked with the network stack
