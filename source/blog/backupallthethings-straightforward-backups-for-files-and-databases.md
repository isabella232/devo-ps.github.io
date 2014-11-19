---
collection: blog
title: BackupAllTheThings, Straightforward Backups For Files and Databases
tags:
  - backup

author: vincent
hn:
date: 2014-11-19

template: post.html
---

Like it or not, if you're running a service online, you will most likely need to deal with data persistency, may this be databases or file storage. Parts of your architecture may be stateless (the cool kids these days are all about [Docker](https://docker.com)), but you'll still need to worry about disaster recovery, crashes or corrupted data when dealing with production systems.

## tl;dr

Existing backup solutions mostly deal with files, which is why we came up with [BackupAllTheThings (or simply batt)](https://github.com/devo-ps/backupallthethings) to deal with backing up either folders or databases.

<p align='center'>![Backup All The Things](/images/posts/backup-all-the-things.jpg)</p>

## Existing backup solutions

There's a plethora of projects doing a great job at dealing with backups. They offer advanced features like encryption, remote storage, catalogs, file search, scheduling, etc. For example, [bacula](http://bacula.org) & [zmanda](http://zmanda.com) with their server/agent approach, or standalone alternatives like [bup](https://bup.github.io) or [duplicity](http://duplicity.nongnu.org).

They all focus on file storage, backing up entire boxes, folders, etc. They rarely care about services or databases, assuming these will be dumped as files. Problem is, it isn't always as simple as it looks like.

Sysadmins are familiar with copying raw MySQL files from a running MySQL server. They've also probably experienced getting inconsistent or corrupted data using that approach, unless they were extra careful (e.g. sync on commit, InnoDB tables, snapshot of the file system, ...). Even when dealing with commands like `mysqldump` it's hard to come up with the right set of parameters which may take up to 10 arguments such as `--single-transaction` or `--skip-lock-tables` depending on your database engine...

That's what led me to write `BackupAllTheThings`; it is by no mean intended to replace more complicated backup frameworks, but it does a decent job at handling files and more importantly provides simple methods to deal with databases (MySQL, PostgreSQL, MongoDB, CouchDB, Redis) following best-practices.

## Installing it

Just use [pypi](https://pypi.python.org/pypi/backupallthethings):

```
pip install backupallthethings
```

## Usage

`BackupAllTheThings` takes a similar concept with Web servers in Debian. Backup scripts are defined in a `scripts-available` folder that you enable (creating a symlink):

```
batt enable <service>
batt disable <service>
```

Backing up all enabled services is then as simple as running:

```
batt
```

There are a few options available:

- Define the destination of the backup (using the `--path` argument),
- Backup individual services only, or sub-set of a service (e.g. `batt mysql` or `batt --mysql-db my_database`)

The full list of options is available in the help (`batt -h`) or on [GitHub](https://github.com/devo-ps/backupallthethings).

## Next?

This is obviously very early; things are still pretty crude but it gets the job done. However, we felt like sharing it and inviting as many people as possible to suggest improvements to our [existing backup scripts](https://github.com/devo-ps/backupallthethings/tree/master/scripts-available).
