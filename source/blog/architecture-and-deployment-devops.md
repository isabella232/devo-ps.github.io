---
collection: blog
title: Architecture and deployment of devo.ps
tags:
  - devo.ps
  - workflow
  - architecture
  - docker
  - deploy

author: vincent
hn:
date: 2014-10-21

template: post.html
draft: true
---

devo.ps is a complex system with lots of pieces and parts both at the code and infrastruture levels. We're performing major releases at least once a week, and several dozens of micro-releases every week for minor improvements. Having a simple yet reliable deployment workflow is essential as we can't spend half a day deploying code on the either of our work enviromment.

Infrastructure
==============

The devo.ps infrastructure is composed of 8 different components (API, git, registry, bus, etc.), each of them sitting in their respective docker container. This allows us to update each individual service in a granular way, pushing security updates on a per-case basis, very easily revert changes and more generally scale horizontally.

To orchestrate those containers, we opted for [maestro-ng](https://github.com/signalfuse/maestro-ng) over [fig](http://www.fig.sh/). This allows us to manage the containers across several hosts, ensure the start order, the various mounted volumes for data persistency, easily fetch and upgrade containers when new versions are available in our docker registry.

Host discovery and DNS are handled by [Consul](http://www.consul.io/), with a cluster of consul hosts powered by [Progrium's awesome build](https://registry.hub.docker.com/u/progrium/consul/) and agents running in the various containers. We expose the DNS on the docker bridge (172.17.42.1) allowing containers to reference this "permanently available" IP address in their config. One slight problem remains though, referencing that IP address in the `resolv.conf` of an underlying docker hosts makes docker change the IP address of the bridge on start...

Each of the container then evolve as micro-services, performing separate tasks independently. This allows along with the code split to release pieces and parts of the infrastructure on a per-need basis.

Code
====

We use heavily git and GitHub for developing each of the features of devo.ps, relying on angular, node.js, python and various other scripts to glue things together. The code base is split across multiple repo to allow devs to work independently and get things moving fast and in parallel.

Development cycle
=================

To avoid conflicts and merge nightmares, features are developed independently on dedicated branches. New code is pushed and heavily tested by CI/CD on dev environments before making their way back to the main branch. The main branches are then tested on a staging platform prior any production release, going through all the steps of the QA.

Upon deployment, each repo is tagged to the new version of the release, and finally pushed on the production environment.

Code deployment workflow
===================

Our containers are running as micro-services and do not have to be brought down on new release. Only the running code need to be "refreshed" and the various inner-services updated.

The deployment workflow is almost the same on either dev / staging or production platform and rely heavily on [supervisord](http://supervisord.org/). 

The code repositories are usually mounted in each of the containers as read-only volumes, making the latest code available at all time. A deployment script is then defined as a command in supervisord configuration file and can be fired at any time to release the code.

We're then taking the exact logic described in a previous post about using [supervisor for deployment pipelines](/blog/supervisord-for-deploy-pipelines) and can deploy in no time any release on either of our platforms.

This allows us to build, push and release as frequently as needed with minimal manual intervention and yet the senerity of a reproductible deployment on any platform. This also allows us to reduce downtime to a manner of seconds.

Oh and by the way, we're using devo.ps to deploy devo.ps !