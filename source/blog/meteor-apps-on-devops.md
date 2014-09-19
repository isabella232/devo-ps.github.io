---
collection: blog
title: Meteor Apps on devo.ps
tags:
  - Meteor
  - MongoDB
  - Node.js
  - Telescope

author: vincent
hn:
date: 2014-09-19

template: post.html
draft: false
---

At [devo.ps](http://devo.ps) we're always keen on simplifying our users' life. Converting technologies and adapting well known OSS projects to make them devo.ps compatible is one of the way we found.

Today we're glad to introduce you and add to the [devops-community](https://github.com/devops-community) Github organization the new [Meteor repository](https://github.com/devops-community/meteor). It can be used as a boilerplate to build your meteor app and get it hosted on your favorite cloud provider.

We've selected a neat Meteor app for you to play with named [Telescope](http://telesc.pe). Once your node is synced and your build task is ran, you're good to go and can follow the Telescope instruction to [finalyze the configuration](http://www.telesc.pe/docs/configuring-telescope/).

No more complex setup, no more hassle setting up any of the services. Give it a shot using with our [devo.ps button](http://devo.ps/blog/one-click-deploy-of-your-infrastructure/) feature.

## Under the hood

The provided node will setup for you:
- [Meteor](http://docs.devo.ps/services/meteor/); obviously 
- [Nginx](http://docs.devo.ps/services/nginx/); to proxy the request to the Meteor app (including websocket support ;)
- [MongoDB](http://docs.devo.ps/services/mongodb/); with its admin user and a dedicated admin user for your app
- [Node.js](http://docs.devo.ps/services/nodejs/); to effectively power your app


A task is provided as well to build and deploy your app, long story short it fetches your app from its git url, builds it and starts it via foreverd.

## Customization

Feel free to hack in and customize the task to match your own app. 

A couple of customization would be:
- converting the task to listen to webhooks and automatically build and deploy any of your apps (see the [Trigger section](http://docs.devo.ps/manual/tasks/#triggers) for more information about webhooks).
- implementing an update workflow along with its webhook and get your meteor app udpated automatically on commit. Our previous [gh-pages builder repo](/blog/metalsmith-on-github-pages) is a great way to get started.
- fetching a bundled version of your app instead of bundling it "on site"
- using the task as a builder of meteor apps and simply push builds elsewhere
- ...

Feel free to give us feedback and suggestion, pull requests are welcome! Let us know what is the next repo you want to see being added to devops-community.

