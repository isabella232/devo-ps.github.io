---
draft: true
collection: blog
title: "Docker Do's And Don'ts"
tags:
  - Docker
  - best-practices

author: vincent
hn: 
date: 2014-08-26

template: post.html
---

<script async class='speakerdeck-embed' data-id='9b9300600cbe01326b873a4a8db3af3a' data-ratio='1.33333333333333' src='//speakerdeck.com/assets/embed.js'></script>

I gave a short (last minute) presentation at the [Shanghai Docker meetup last Saturday](http://www.meetup.com/Docker-Shanghai/events/197476672/). We talked about how experience using Docker while building [devo.ps](http://devo.ps) and gave some basic advices as to what to do (and what not to).

## Why we chose Docker?

- **Separation of concerns and Scalability**: devo.ps is a complex system. We want to isolate features as micr-services and be able, down the road, to scale easily these with horizontal scaling.
- **Deployment cycles**: since we're dealing with a complex stack, the ability to update parts of the systems independently was a huge plus.

## How we use Docker?

- **Bus-centric architecture**: we basically have RabitMQ tying up a lot of micro-services.
- **Non-ephemeral containers**: we actually treat containers more VMs with fairly long life-cycles. We actually built some interesting approaches to handle our use case.

XXXX EXAMPLES OF THIS???? XXXX

## The don'ts

- **Don't rush into building your own tools**: if you hit a wall, others probably have. GitHub and #docker on IRC (@freenode) are your friends; ask around and make sure you're not building something already solved. For example, [we used our DIY DNS management approach](http://wiredcraft.com/posts/2014/07/30/dns-and-docker- containers.html) until the recent etcd update.
- **If you do write your own tools, don't go crazy**: keep if light and simple. Docker is moving extremely fast, your work may become obsolete next week. It happened to us with container orchestration; we wrote our own tool which became useless 2 weeks later.
- **Don't think Docker will solve all your (DevOps) problems**: Docker is just another tool, it adds a layer of complexity. Use containers for what it's good at, not because it's the new hot thing.

## The do's

- **Use caching writing for your Dockerfiles **: ADD & VOLUMES are cache invalidators. Group your RUN commands together per type (e.g. ssh related). Speed up your container build.  See https://docs.docker.com/reference/builder/#usage
- **Maintain your containers in a registry **: it lets you deploy quickly, revert quickly and have matching versions of your containers. Same thing apply for your Dockerfiles: use a VCS.  See  http://blog.docker.com/2013/07/how-to-use-your-own-registry/, 
[]Docker registry](https://github.com/docker/docker-registry) &  [Docker hub](https://hub.docker.com/).
 - **Plan your containers life-cycles **: define what's persistent vs. ephemeral vs. shared? Named volumes vs. devices vs. anonymous . See for example [our take on data migration of named docker containers](http://wiredcraft.com/posts/2014/06/25/ data_migration_of_named_docker_containers.html).
- **Log all the things **: this seems easy with stdout/err on a few containers, but quickly become complex) once you start adding up containers. We use a combination of syslog, [log.io](logio.org), [logstash](http://logstash.net/) and [Kibana](https://rashidkpc.github.io/Kibana/).
- **Define a proper start logic**: containers are not servers, the start workflow is different:
    - there are no init scripts on containers.
    - 1 container = 1 exec on start, if the command exit, the container stops, use `run` scripts when needed,
    - supervisord lets you manage your services *ala* init (hurray!).

## A few more things

- [Flocker](https://github.com/ClusterHQ/flocker) : lets you manage a fleet of containers and handle data migration.
- [Maestro-ng](https://github.com/signalfuse/maestro-ng): containers management.
- **Using docker for safe or multi-tenancy  execution**: safely executing arbitrary code or multiple applications on the same machine. That's actually what we're doing with [one of our side projects](http://chato.ps).