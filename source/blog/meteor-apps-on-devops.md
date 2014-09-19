---
collection: blog
title: Deploy Your Meteor Apps on Digital Ocean in 5 Minutes
tags:
  - Meteor
  - MongoDB
  - Node.js
  - Telescope

author: vincent
hn:
date: 2014-09-19

template: post.html
---

Some of my colleagues and friends have been playing with Meteor for a few of their projects: so far they seem to love it, but when it came to hosting their app they didn't have a straight answer. They gave a quick try at the default Meteor hosting, Modulus.io and Heroku. But being the server nerd I am (and being massively in love with Digital Ocean), I thought I'd look into how to self host Metero apps.

## How to get it done

- Build your box on your prefered cloud provider (I use often use [Digital Ocean](http://digitalocean.com) for development and [Linode](http://Linode.com) for production), and [set up the basics](http://devo.ps/blog/basic-setup-for-a-new-linux-server/).
- Install Nginx: you may want to put several other apps on the same box and you don't want your node process to run as root (TCP80<1024).
- Install MongoDB, setup your admin user and create a dedicated user for your app.
- Install Node.js, add your favorite node app manager (e.g. forever, [pm2](http://devo.ps/blog/goodbye-node-forever-hello-pm2/), [supervisor](http://supervisord.org/)).
- Install Meteor: this is only needed to build your app. We're running in prod, we won't go the `mrt` way.
- Fetch your code from GitHub, and build your app  using the meteor command. Export it to its final location (`/var/www/example.com` for example).
- Tune your node manager to use the correct location and execute your app. Pass along the required ENV to let it connect to your Mongo database
- Setup your Nginx vhost, set the appropriate location so the requests get proxied over to your node process. Beware you need to do some custom tuning if you've enabled websocket in your app.
- Voila!

## The easy way

Obviously, we bundled all of this magic into a tiny repo you can fork [devops-community/meteor](https://github.com/devops-community/meteor)) and get done with. We're deploying the fantastic [Telescope](http://telesc.pe) app by defaut, but you can change the URL to that of your app in the setup wizard. Go ahead with the following [devo.ps button](http://devo.ps/blog/one-click-deploy-of-your-infrastructure/):

<a href='https://app.devo.ps/#/fork?git_url=https://github.com/devops-community/meteor' target='_blank'>![Fork on devo.ps](https://app.devo.ps/assets/images/fork.png)</a>

Once your node is synced and your build task is ran, you're good to go and can follow the Telescope instruction to [finalize the configuration](http://www.telesc.pe/docs/configuring-telescope/). I also recommend you point the Webhook of your GitHub repository to a Webhook that triggers the build task (simply uncomment the Webhook trigger in `tasks/build-meteor.yml`). This way, your app will be built and dpeloyed on every commit received by GitHub.

This also led us to add a couple new services to [devo.ps](http://devo.ps):

- [Meteor](http://docs.devo.ps/services/meteor/),
- [MongoDB](http://docs.devo.ps/services/mongodb/).

PS: we're started to add some setups at [devops-community](https://github.com/devops-community). Next on the list are Ruby on Rails and Django; [let us know](http://twitter.com/devo_ps) if you'd like to see something else.

