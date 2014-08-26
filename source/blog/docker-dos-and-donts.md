---
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

I gave a short (last minute) presentation at the [Shanghai Docker meetup last Saturday](http://www.meetup.com/Docker-Shanghai/events/197476672/) at VMware's office. We talked about how experience using Docker while building [devo.ps](http://devo.ps) and gave some basic advices as to what to do (and what not to).

## Why we chose Docker?

- **Separation of concerns and Scalability**: devo.ps is a complex system. We want to isolate features as micro-services and be able, down the road, to easily scale horizontally.
- **Deployment cycles**: since we're dealing with a complex stack, the ability to update parts of the systems independently was a huge plus.

## How we use Docker?

- **Bus-centric architecture**: we basically have RabbitMQ tying up a lot of micro-services.
- **Non-ephemeral containers**: we actually treat containers more like VMs with fairly long life-cycles.

## The don'ts

- **Don't rush into building your own tools**: if you hit a wall, others probably have. GitHub and #docker on IRC (@freenode) are your friends; ask around and make sure you're not building something already solved. For example, [we used our DIY DNS management approach](http://wiredcraft.com/posts/2014/07/30/dns-and-docker- containers.html) until the recent etcd update.
- **If you do write your own tools, don't go crazy**: keep if light and simple. Docker is moving extremely fast, your work may become obsolete next week. It happened to us with containers orchestration; we wrote our own tool which became useless 2 weeks later.
- **Don't think Docker will solve all your (DevOps) problems**: Docker is just another tool, it adds a layer of complexity, it isn't pixie dust. Use containers for what it's good at, not because it's the new hot thing.

## The do's

- **Use caching properly for your Dockerfiles**: docker containers are built very quickly as long as you make use of the caching capability. A quick set of gotchas and advices:
    - `ADD` & `VOLUMES` are cache invalidators. 
    - `RUN` commands are cached while unchanged. 
    - Dockerfile execution is sequential, hence: order matters and a changed step deprecate the next caches. 
    - Group your `RUN` commands (shell sequences) together per type (e.g. ssh related). This allows you to tune and forget a "feature" of your container and focus on the next one without ever blowing up your cache.
    - Maintain common command orders in between your various Dockerfiles. This allow to use "common" caching from one container to another for as long as they share common features
- **Maintain your containers in a registry**: it lets you deploy quickly, revert quickly and have matching versions of your containers. Same thing apply for your Dockerfiles: use a VCS. See  http://blog.docker.com/2013/07/how-to-use-your-own-registry/,
[Docker registry](https://github.com/docker/docker-registry) & [Docker hub](https://hub.docker.com/).
- **Plan your containers life-cycles**: if you are using Docker for computing purpose this may not be critical, but if you intend on having long-running containers it is absolutely required. Among other things:
    - Define what data are persistent, ephemeral or shared.
    - Define the best fit between named or anonymous volumes or devices (LVM / disks). See for example [our take on data migration of named docker containers](http://wiredcraft.com/posts/2014/06/25/ data_migration_of_named_docker_containers.html).
    - How will your data be loaded? Does it need to be prepared at run time? Does it have proper permissions/ownership?
- **Log all the things**: this seems easy with stdout/err on a few containers, but quickly become complex once you start adding up containers or when you start running services that do not puke their logs on the console. We use a combination of syslog, [log.io](logio.org), [logstash](http://logstash.net/) and [Kibana](https://rashidkpc.github.io/Kibana/).
- **Define a proper start logic**: containers are not servers, the start workflow is different:
    - there are no init scripts on containers.
    - 1 container = 1 exec on start, if the command exit, the container stops, use `run` scripts when needed,
    - supervisord lets you manage your services *ala* init (hurray!).

## A few more things

- [Flocker](https://github.com/ClusterHQ/flocker): lets you manage a fleet of containers and handle data migration.
- [Maestro-ng](https://github.com/signalfuse/maestro-ng): containers management.
- **Using docker for safe or multi-tenancy execution**: safely executing arbitrary code or multiple applications on the same machine. That's actually what we're doing with [one of our side projects](http://chato.ps).
