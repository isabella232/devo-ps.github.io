---
collection: blog
title: Using Supervisord for Your Deploy Pipelines
tags:
  - supervisord
  - supervisor
  - deploy

author: vincent
hn:
date: 2014-10-21

template: post.html
---

Running programs automatically as service is not always an easy task. Some well known applications come with their own managers (e.g. unicorn, forever, pm2) but there is no unified approach across technologies.Custom build code often tend to come as a simple executable that runs in the foreground. And eventually init scripts simply ensure the services start but usually does not handle respawn.

Supervisord offers a solution to all the issues above and allows you to monitor and control processes. It lets you:

- starts / stop / manage processes (long or short running) via unix or http xml/rpc requests
- automatically or manually start processes
- easily restart crashed programs
- manages log files and file rotation (conveniency)
- easily manages running user
- perfect for custom processes that are not managed as services
- side benefit: play very well with docker containers

<p align='center'>![Supervisord](/images/posts/supervisord.png)</p>

## Using Supervisord to manage deployments

We're taking the mixed approach of running standalone commands and executing custom code as a service. Our example will be a deployement process.

A deployment may involve more that simply restart a service, but require to install dependency, etc.

When dealing with multiple servers, the deployment workflow may be different due to the various services involved; having supervisord doing some unified interface is extremely convenient.

## Supervisord setup

Supervisord is often available within the package manager of your distrib (`apt-get install supervisor`), if not you should be able to install it via `pip` as well (`pip install supervisor`)

We're creating here a simple config file that will define 2 programs:
- `deploy` that will not start automatically and will require to be executed manually (`autostart` option), 
- `app` that is a random node.js application that will start automatically 

One can simply run `supervisorctl start deploy` and get the deploy process starting. Within the `deploy.sh`script, one can put any of the required logic needed to deploy the code

e.g. supervisord config in `/etc/supervisor/conf.d/my_app.conf`

    [program:deploy]
    command=/usr/local/bin/deploy.sh
    autostart=false
    
    [program:app]
    command=/usr/bin/node main.js
    directory=/opt/app
    environment="NODE_ENV=prod"
    user=nobody
    autostart=true

## Deployment script

We're now preparing a simple script in `/usr/local/bin/deploy.sh` that will perform the operations required to deploy a new version of the code. Obviously this is only a sample! Be sure to set the execute flag or supervisord won't be able to execute it. (`chmod +x /usr/local/bin/deploy.sh`)

    #!/bin/bash
    ##################
    # Simple deploy script for a node app
    ##################
    WORKDIR=/opt/app
    cd $WORKDIR
    
    updated=$(git pull 2>/dev/null)
    if [ "$updated" == 'Already up-to-date.' ]; then
        # Nothing to do, exit cleanly
        exit 0
    else
        # Code has been updated, rebuild the app
        npm install
        ... other commands ...
        # And eventually restart the app
        supervisorctl restart app
    fi

## Enhancing the workflow with HTTP support for supervisord

The 2 code snippets above let you simply run the deployment operations and get the app restarted if necessary. But supervisord does not allow (yet) remote control.

This can then be very easily extended and triggered remotely by making use of the HTTP xml-rpc interface.

## Enabling HTTP xml-rpc

Add the following to your supervisord config (`/etc/supervisor/conf.d/inet.conf`)

    [inet_http_server]
    port=*:9001
    username=secret_user
    password={SHA}secret_hash

Where the secret_hash is calculated as such `echo -n 'secret_pass' | sha1sum | cut -f1 -d' '`. You need then to prefix this hash with `{SHA}` as explained http://supervisord.org/configuration.html#inet-http-server-section-values

Best practices still recommend that:

1. you don't set the password in clear in the config
2. you protect your host via iptables and only allow selected hosts to reach the HTTP interface of supervisord

## Multi host support

Now that Supervisord allows remote connections, you can orchestrate several boxes at once very simply. Obviously more logic is needed to play nice with the sequence, but you get the point...

    for host in host1 host2 host3; do
        supervisorctl -s http://$host:9001 -u secret_user -p secret_pass start deploy
    done
    
And supervisor is now available in [devo.ps](http://devo.ps)! Hurray
