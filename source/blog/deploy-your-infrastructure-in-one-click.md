---
collection: blog
title: One-Click Deploy Of Your Infrastructure
tags:
  - Digital Ocean
  - DevOps
  - devo.ps button
  - Laravel
  - one-click

author: ronan
hn:
date: 2014-09-02

template: post.html
---

We just released [devo.ps 0.5.0](http://devo.ps/blog/releasing-devops-0.5.0/) and are pretty excited about one feature in particular.

### Introducing: the devo.ps button

Not unlike the Heroku button, we wanted to make the process of provisioning and setting up a complete infrastructure of your own, from server to continuous integration tasks, as easy as possible. The devo.ps button allows you to do all of that in one click.

Want to give it a try? Click on the link below to create in a few minutes a server and associated build task to deploy and run a Laravel app (see the [devo-ps/laravel repo](https://github.com/devo-ps/laravel) for more information):

<a href='https://app.devo.ps/#/fork?git_url=https://github.com/devo-ps/laravel' target='_blank'>![Fork on devo.ps](https://app.devo.ps/assets/images/fork.png)</a>

### How does it work?

If you see the devo.ps button in the README page of a repository (for example on the [devo-ps/laravel repo](https://github.com/devo-ps/laravel)) it probably means it is designed to work with devo.ps.

![devo.ps button](http://devo.ps/images/posts/github-laravel-repo.png)

These repositories may include a `devops.yml` file at their root, allowing them to define a few things like a name, description and logo. Once you've clicked on the devo.ps button, you will be redirected to our app and prompted with this information for you to review before confirming the fork.

![devo.ps fork confirm](http://devo.ps/images/posts/devops-fork-confirm.png)

This will effectively fork the repository in your account. Once the repo is ready, you can click on it. You will then be asked to ["activate" your branch](http://docs.devo.ps/manual/git-repositories/#branches), allowing it to provision actual servers and run tasks. At the same time, you will be asked to review and potentially modify a few variables that were defined in the `devops.yml` file. These are usually things like the Git URL of the repo for your app, or some of the details related to the cloud provider you want to use (Digital Ocean, Rackspace, AWS, Linode...).

![devo.ps fork confirm](http://devo.ps/images/posts/devops-activate-confirm.png)

Once you confirmed this last step, your branch is activated and devo.ps will start provisioning and configuring your servers, along with the tasks which may allow you to build and deploy your app. In this specific case, you can go to the tasks section and run the build task that will fetch your app's code, build it and deploy it on your server, database configuration included.

### What's next

We're just getting started with it and will be adding more details on how to use the devo.ps button on the [documentation website](http://docs.devo.ps) in the next few days.

There's a lot more where that came from, including branching your infrastructures (think of doing performance and tuning on a "branch" of your production servers, with actual machines), provisioning of Vagrant machines replicating your servers and third party integrations (custom events coming from TravisCI or GitHub allowing you to trigger tasks).

If you have questions, comments or suggestions, swing by the [devo.ps chat](https://www.hipchat.com/gyHEHtsXZ): there's always somebody up.
