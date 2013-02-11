---
published: false

category: blog
title: 'Best Practices: It's Always Or Never ( And Preferably Always)'
author: vincent

layout: post
---

So there you are: the development team needs a box and you're already contemplating the gazillion other urgent tasks that need to be done on the existing infrastructure. *Just that one time*<sup>TM</sup>, you're going to skip your own rules. You're just gonna spawn an instance, set up the few services needed and be done with it. You'll drop some of the usual time suckers: backup strategy, access rules, init scripts, documentation... One will have to give because you can't just do the whole of it AND handle the rest of your day-to-day responsibilities. After all, it's just a development server and you'll probably fold it in a couple weeks, or you'll clean it up once your plate is a tad less full.

A few weeks in, the box is still there and your backlog is far from looking less crowded. The development team just rolled out their application on the same box. **And things start crashing... badly.**

After receiving a couple of not so courteous emails from the dev team about repetitive crashes, you log in the box and the fun starts. You can't figure out what services have been deployed, or how exactly they were installed. You can't find where the backups are to restore the database. You waste time to find out that CouchDB wasn't started at boot. And all the way through you receive emails of "encouragement" from your colleagues.

All of that because of that "one time". Except that it's never "just" that one time. 

## Best practices are not freaking optional

I hear you: coming up with these best practices and sticking to it **systematically** is hard work. Actually it's high investment. But based on our common experience, it's one you can't afford not making. The "quick and dirty that one time" approach will ultimately fail you.

A few things you should never skip:

- **Document the hell out of everything as you go**. You probably won't have time to get it done once you shipped it, and you probably won't remember what you did or why you did it in a few weeks from now. Your colleagues will probably even more clueless.
- **Off-site backups for everything**. Don't even think of keeping your backups on the same physical box. Disk fails (a lot) and storage like S3/Glacier is dirt cheap. Find out a way to backup your code and data and stick to it.
- Reliable providers; don't pickup that random AWS AMI from XYZ, or that RPM from Bob's awesome repo
- **See your setup from end-to-end, and use reliable sources**. Avoid random AWS AMIs or RPM repositories. And when settings things up, go through the whole shebang: init script, dedicated running user, environment variables and such are not optional. <small>Some people in the office specifically asked that you don't start your java Please don't start from rc.local your java from your home folder????</small>

## Infrastructure As Code And Automation

Obviously, given what we're working on at [devo.ps](http://devo.ps), we're pretty strong adopters of infrastructure as code and automation. There are awesome tools to help you with this approach. Actually, [the new version of Chef was just announced](http://news.ycombinator.com/item?id=5197389), you can get a great deal of insights as to what people use and what they use it for by just reading the comments.

These things are the natural evolution of a

Automation; be consistent with you setup, deployment, automate as much as you can
Many of the best practices can be automated and become much less of a burden. Rely on a team of experts to build and maintain the best practices; devo.ps help you with that. Get your practices easy to manage, painless to apply and simple to understand.
