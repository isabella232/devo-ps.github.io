---
collection: blog
title: Announcing devops-backup tool
tags:
  - backup

draft: true

author: vincent
hn:
date: 2014-11-19

template: post.html
---

We're glad to announce today the first public version of the `devops-backup` tool. A simple backup tool that can backup your running services' data when you need data consistency and when file backup is not enough.

Backup is a must have for most of the running boxes across the Internet when data persistency is required; web servers, databases, file storage servers, etc. Backup provide the safety net to disasters, mistakes, crashes, corruption, etc.
Some *lucky* boxes may not need backup, usually ephemeral servers, data computing, etc.

## Existing backup solutions

Lots of amazing projects do a great job at performing and managing the backups. They offer very advanced features like encryption, remote storage, catalogs, search, scheduling, etc. They come in many flavors; from full-fledged frameworks with server / agent approach (e.g. [bacula](http://bacula.org), [zmanda](http://zmanda.com)), to standalone tools (e.g. [bup](https://bup.github.io), [duplicity](http://duplicity.nongnu.org)).

Most of those tools heavily focus on file storage, backing up entire boxes, folders, etc. They do not (except a few) focus much on services backup and often rely on the administrator adding external scripts to do the job.  
Most of the sysops know that copying raw MySQL files from a running MySQL server may give very inconsistent data (and even corrupted databases), unless very careful choices have been made (e.g. sync on commit, InnoDB tables, snapshot of the file system, you-name-it).

`devops-backup` is by no mean expected to replace full-fledged backup system. In fact we still heavily recommend everyone to use those backup systems. `devops-backup` acts as a very lightweight backup tool that take care of those in-memory data and services. It comes bundled with methods to backup numerous services like MySQL, PostgreSQL, MongoDB, CouchDB, Redis out of the box. Backup files are then available locally on the servers.

## Installation

`devops-backup` is available on `pypi` and can be installed as simply as:

```
pip install devopsbackup
```

## Usage

`devops-backup` takes a similar concept with web servers in Debian; backup scripts are defined in a `scripts-available` folder and need to be *enabled* (via a simple symlink) to run by default. This allows the `devops-backup` tool to run without any parameter and backup all the services enabled by default.

To enable (and disable) services' backup:

```
devops-backup enable <service>
devops-backup disable <service>
```

To backup everything, simply run:

```
devops-backup
```

Many options are available, among which:
- define the destination of the backup (using the `--path` argument)
- backup individual services only, or sub-set of a service (e.g. `devops-backup mysql` or `devops-backup --mysql-db my_database`)

The full option list is available via `devops-backup -h` and more complete documentation on the [GitHub repository of the project](https://github.com/devo-ps/devops-backup).

The project is extremly young and the backup methods are somehow archaic, but it does the job and make backup easy. Feel free to look around the various available backup scripts, suggest improvement, add more technologies, and so on.

We're releasing this project under the MIT license, because we believe it is a need a lot of people have and at [devo.ps](http://devo.ps) we are not a backup company ... so, why not sharing it with everybody.



