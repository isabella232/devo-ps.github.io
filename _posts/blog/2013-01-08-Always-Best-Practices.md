---
published: false

category: blog
title: 'Always best practices!'
author: vincent

layout: post
---

Always means always. Many developers, sys-admins, you-name-it like to brag about how best practices are important in one's work; and how they are able to apply them to their work, most of the time... 

Remember that time where you were asked to quickly spawn that box, quick and dirty, setup some random service and get access to your dev team? Yes, that one time... That one time where you didn't want to bother setting up 1) init script, 2) backup, 3) proper access, 4) adding the SSH to your github and simply copy paste some script, 5) document your work? Choose whichever case you fall into. And after a couple of weeks, the quick and dirty box become a critical component to your team's infrastructure. And it dies/restart/crash! And you don't remember what was on it, you don't remember how you built it, which wiki page you found on the internet from where you did your copy/paste, you can't restore the backup, you don't get why the app doesn't work because mongo / couch / ES didn't start at boot, etc.

# Best practices is not optional

Best practices may be painful, it takes time to be apply them systematically. Worst even, you may know how to apply them and do it most of the time, but this is that 'most of the time' that will fail you that specific day.

There is no time where best practices should not be applied. Such guideline need to be done right at the beginning and all along the life of the project;

- Documentation; 
  - in your code! You know already you won't come back review your code later when you reach the 10k lines in 20 files...
  - when you write your code! Nothing is worse than relying on an API doc that is outdated...
  - when performing the setup! If you don't, you know you'll miss that one tiny single step and you'll bang your head against the wall later
- Backup;
  - Off-site; don't end up storing your backup on the same physical box, disk fails, S3 / Glacier are really good at storing data
  - DB + code; simple backup but backup!
- Setup;
  - reliable providers; don't pickup that random AWS AMI from XYZ, or that RPM from Bob's awesome repo
  - end-to-end; full setup! including init script, dedicated running user, env. variables, etc. Please don't start from rc.local your java from your home folder
  - automation; be consistent with you setup, deployment, automate as much as you can

# Automate Best practice

Many of the best practices can be automated and become much less of a burden. Rely on a team of experts to build and maintain the best practices; devo.ps help you with that. Get your practices easy to manage, painless to apply and simple to understand.