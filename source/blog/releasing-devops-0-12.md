---
collection: blog
title: Releasing devo.ps 0.12
tags:
  - release

author: vincent
hn:
date: 2014-11-19

template: post.html
---

The new release of [devo.ps](http://devo.ps) 0.12 is out! Among the new features, you can now enjoy:

- **[Backup service](http://docs.devo.ps/services/backup/)**; that's an exciting one! Relying on the brand new [BackupAllTheThings](http://devo.ps/blog/backupallthethings-straightforward-backups-for-files-and-databases/)
  - New servers will have it installed by default; existing boxes need to perform a full sync of the server
  - Support MySQL / PostgreSQL / CouchDB / MongoDB / Redis / Files backup
  - Updated [public repositories](https://github.com/devops-community) to include backup tasks
- **Logging**; better logging in the tasks, inline or script commands can now have a description showing in the logs
- **UI**; fix various links in the profile page
- **Bug fixes**:
  - No more "locked" repositories when a fork operation fails, 
  - Fix folder check in git that was preventing some files to be created
- **PHP-APC**; support has been fully dropped

 