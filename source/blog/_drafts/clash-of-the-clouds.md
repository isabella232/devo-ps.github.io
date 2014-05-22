---

collection: blog
title: Class Of The Clouds
author: vincent
hn: 

draft: true
date: 2013-07-11

template: post.html
---

# Overview
Cloud providers are the organizations that will power and run the servers. Currently devops supports the following providers:
- [AWS](http://aws.amazon.com); Amazon EC2
- [Rackspace](http://www.rackspace.com/cloud/); Rackspace Cloud
- [Linode](http://linode.com)

# Comparison

## Billing

Glossary:
- Initial cost; when spawning a new box, what is the initial cost
- Billing; how is the billing performed, what is taken under account
- Stopped; impact on the billing when we stop the server
- Deleted; impact on the billing when we delete the server
- Snapshot; Can a server disk be snapshot'ed, re-used later for server spawn and impact on the billing

 \ | AWS | Rackspace | Linode
---- | ---- | ---- | ----
Initial cost | 0 USD | 0 USD | Monthly cost of server (from account credit + credit card)
Billing | By minute of computation time + storage + BW | By hour of server defined | By hour of server defined
Stopped | Charged for storage only | Can NOT stop, only delete | Charged regular hourly price
Deleted | Charged for storage only (if any) | 0 | prorata of unused monthly hours re-credited to Linode account
Snapshot | Charged for storage | Charged for storage | NO

## Features

### AWS
Most complex approach;
- API keys; several can be defined and expired independently, it includes an Access ID key + Secret ID key,
- API calls; rely on Access ID + Secret ID (2 long keys),
- management by region: regions are 100% separated and need to be set independently (including SG, KeyPair, AMI, etc.) - 7 regions available (and growing)
- Security Group: defined by an ID, and got set of FW rules associated (by default all is blocked)
- KeyPair: the SSH key that will be pushed to a server when spawned and used for root (or ubuntu) access
- AMI: defined by an ID, is the image of the OS to install
- Flavor: defined by an ID, is the size of the box

Recommendation:
- Use for dev / short life span instances as you get charged ony for you used

### Rackspace
- API keys; only 1 key available - can be regenerated and the previous one will be expired
- API calls; rely on username + API key
- Cloud type; new and old generation, we'll only use the latest one.
- Regions; not interconnected (Chicago, Dallas, London) - seems that London doesn't offer latest cloud generation yet.
- Flavor / Image; Ids are common to the various regions
- API end-point; define where the servers get created. Not sure if querying a specific end point will perform filtering on the instance location .. (TODO)

Special notes:
- can not stop a server, only delete it to avoid billing
- can snapshot server, delete box, spawn new server based on the snapshot -- it provides a similar thing to AWS stopped service with the complexity of having to perform a few more operation other than stop / start...

Recommendation: 
- ... don't use it? seem very low in terms of features compared to AWS / Linode...

### Linode
- API keys; only 1 key available - can be regenerated and the previous one will be expired
- API calls; API key only
- Ids; IDs are very simple integer (1..100), hard to guess - either need to hardcode, or query API for proper match
- Flavor / Image; Ids seem common between the regions
- API end-point; Common across the various datacenters

Special notes:
- can stop a server, but still get charged if resources are allocated
- can not snapshot / save data without running box, suggestions are lame: use SSH + dd + micro box to store...
- Lots of BW allocated by default

Recommendation:
- use for prod server or BW consuming application
