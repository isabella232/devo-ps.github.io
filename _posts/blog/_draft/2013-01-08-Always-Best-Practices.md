---
published: false

category: blog
title: 'Best Practices: It's Always Or Never ( And Preferably Always)'
author: vincent

layout: post
---

Always means always. Many developers, sys-admins, you-name-it like to brag about how best practices are important in one's work; and how they are able to apply them to their work, most of the time... 

So here you are: the development team needs a box and you're already contemplating the gazillion other urgent tasks that need to be done on the existing infrastructure. *Just that one time*<sup>TM</sup>, you're going to skip your self imposed rules. You're just gonna spawn an instance, set up the few services needed and be done with it. You'll drop some of the usual time suckers: backup strategy, access rules, init scripts, documentation... One will have to give because you can't just do the whole of it AND handle the rest of your day-to-day responsibilities. After all, it's just a development server and you'll probably fold it in a couple weeks, or you'll clean it up once your plate is a tad less full.

A few weeks in, the box is still there and your plate is far from being less full. The development team just rolled out their application on the same box. **Things start crashing... badly.**

After receiving a couple not-so-courteous emails from the dev team about repetitive crashes, you log in the box and that's when the fun starts. You can't figure out what services you deployed, or how exactly you installed them. You can't figure out where the backups are to restore the app. You waste time to realize CouchDB wasn't started at boot. And all the way through you receive emails of "encouragement" from your colleagues.

All of that because of that "one time"

## Best practices are not freaking optional

I hear you: coming up with best practices and sticking to it **systematically** is hard work. Actually it's high investment. But based on our common experience, it's a worthwhile one. The "quick and dirty that one time" approach will ultimately fail you.

A few tips on what to do, and what to avoid:

- **Document the hell out of everything**, which includes:
    - **In your code**: you already know you won't come back to review your code later when you reach the 10k lines in 20 files.
    - **As you go**: don't wait until after you wrote the whole thing to get started on documentation, that won't happen. Something is shipped once it's deployed in production AND documented.
    - When performing the setup! If you don't, you know you'll miss that one tiny single step and you'll bang your head against the wall later
- **Back everything up**;
    - Off-site; don't end up storing your backup on the same physical box, disk fails, S3 / Glacier are really good at storing data
    - DB + code; simple backup but backup!
- Setup;
  - Reliable providers; don't pickup that random AWS AMI from XYZ, or that RPM from Bob's awesome repo
  - end-to-end; full setup! including init script, dedicated running user, env. variables, etc. Please don't start from rc.local your java from your home folder

## Automation is key
  - Automation; be consistent with you setup, deployment, automate as much as you can
Many of the best practices can be automated and become much less of a burden. Rely on a team of experts to build and maintain the best practices; devo.ps help you with that. Get your practices easy to manage, painless to apply and simple to understand.
