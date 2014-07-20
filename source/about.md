---
title: About
template: page.html
---

## What is devo.ps?

[devo.ps](http://devo.ps) is a service which facilitates the management of technical infrastructures and operations: provisioning new servers, managing services or automating your application deployment strategy can all be organized through very straightforward JSON files (not unlike [package.json](https://npmjs.org/doc/json.html)).

## Why devo.ps?

Ops are hard. While the Devops movement is gaining momentum, there are still a few things slowing down its adoption:

* **Tools have high barriers of entry**: configuration management tools such as Chef or Puppet are not trivial to install and maintain.
* **Lack of best practices**: good tools don't guarantee the value of an ops strategy. Ultimately you rely on the quality of best practices and technical decisions taken by the people implementing it. Without skilled engineers able to take informed and opinionated decisions, these tools are worthless.
* **Lack of visibility**: what ops teams end up implementing is too often left opaque to outsiders. Developer, product managers and other stakeholders are left locked out of it, leaving little room to collaboration and delegation.

That is what devo.ps addresses:

* **Best practices**: we try and offer our users with a service that already take care of the boilerplate in terms of best practices. For example, stable versions of packages, clean and safe ways of installing services, proper backup strategies...
* **Low barriers of entry**: partly because we take opinionated choices with regards to best practices, we can let you maintain your whole infrastructure in a simple, condensed way. Adding a new service to one of your servers is as easy as adding a line into a JSON file and committing it. Think ```package.json``` for ops.
* **Collaborative**: we make it easy for teams to expose what they build, in particular managing access to the automation bits. Letting for example developers run a database snapshot or project managers trigger a code update on the staging server, letting ops focus on investing more into the infrastructure.

## How does it work?

1. Users maintain their infrastructure through our JSON Restful API or our Git API (manipulating simple JSON files describing servers, apps and automation bits).
1. devo.ps act as a middle man to bring the infrastructure in the state described by the user, using Git, Chef and node.js.