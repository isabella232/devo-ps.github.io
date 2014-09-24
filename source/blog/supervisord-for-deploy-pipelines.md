---
collection: blog
title: Supervisord for deploy pipelines
tags:
  - supervisord
  - supervisor
  - deploy

author: vincent
hn:
date: 2014-09-24

template: post.html
draft: true
---

INTRO

Frame the problem: in what case do you use that tool? Anecdote? Support in devo.ps

DEVELOPEMENT

Gist of it and how you set it up (for what use case)

Announcement about support in devo.ps



Supervisor is a daemon allowing you to monitor and control processes. It lets you:

- starts / stop / manage processes (long or short running) via unix or http xml/rpc requests
- automatically or manually start processes
- easily restart crashed programs
- manages log files and file rotation (conveniency)
- easily manages running user
- perfect for custom processes that are not managed as services
- side benefit: play very well with docker containers

A deployment may involve more that simply restart a service, but require to install dependency, etc.

When dealing with multiple servers, the deployment workflow may be different due to the various services involved; having supervisord doing some unified interface is extremely convenient.

e.g. supervisord config

    [program:deploy]
    command=/usr/local/bin/deploy.sh
    autostart=false
    
    [program:app]
    command=/usr/bin/node main.js
    directory=/opt/app
    environment="NODE_ENV=prod"
    user=nobody
    autostart=true

With the above config, one can simply run `supervisorctl start deploy` and get the deploy process starting. Within the `deploy.sh`script, one can put any of the required logic needed to deploy the code

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

This can then be very easily extended and triggered remotely by making use of the HTTP xml-rpc interface.

Add the following to your supervisord config

    [inet_http_server]
    port=*:9001
    username=secret_user
    password={SHA}secret_hash

Where the secret_hash is calculated as such `echo -n 'secret_pass' | sha1sum | cut -f1 -d' '`. You need then to prefix this hash with `{SHA}` as explained http://supervisord.org/configuration.html#inet-http-server-section-values

And you are now able to orchestrate several boxes at once very simply. Obviously more logic is needed to play nice with the sequence, but you get the point...

    for host in host1 host2 host3; do
        supervisorctl -s http://$host:9001 -u secret_user -p secret_pass start deploy
    done
    
And supervisor is now available in [devo.ps](http://devo.ps)! Hurray
