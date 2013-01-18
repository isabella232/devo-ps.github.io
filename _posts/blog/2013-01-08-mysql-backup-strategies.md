---
published: false

category: blog
title: 'Backup strategies - MySQL'
author: vincent

layout: post
---

Backup is hard and the right strategy is highly dependent on the platform, the need for accuracy, the allowed time to recovery, etc.

Common issues:

- application stuck (table lock) during backup; caused by MyISAM engine; switch to InnoDB
- non consistent backup; backup takes time and 1 table get updated during backup; use --single-transaction
- restoration takes ages; rely on LVM based snapshot backup; no need 
- critical data (ex. e-commerce), need restore of every transaction, the last day backup is not good enough; rely on binlog replay

Recommendations:

- use InnoDB as much as possible, however full-text indexing is only available for MyISAM tables
- use dedicated FS for MySQL data and noatime mount option
- use snapshot enabled FS (LVM or ..)
- backup FS + SQL whenever possible;
- enable master log
- capture master log position on backup (to know where to replay from if need to restore)
- slave are not always good; better rely on master for 100% accuracy
- use Percona Server whenever possible (perf)
- use Percona XtraDbBackup whenever possible
- if want to speed up SQL import & server is in highly consistent mode (sync-binlog 1), increase sync-binlog for the time of the import

Links:

Provide a bunch of links to various resources, including some opinion about either the source or the article perse.
I don't have (there is no) best answer anyway, just a list of possible best practices that are highly dependent on the business, etc.