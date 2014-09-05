---
collection: blog
title: Metalsmith On GitHub pages
tags:
  - continuous integration
  - continuous delivery
  - continuous deployment
  - metalsmith
  - Node.js
  - GitHub
  - GitHub pages

author: ronan
hn:
date: 2014-09-05

template: post.html
---

We love GitHub pages and use it more than we probably should: our [main website (devo.ps)](http://devo.ps) and [documentation](http://docs.devo.ps) are actually GitHub pages. We use [SwiftType](https://swiftype.com/) to provide search on the documentation, but otherwise these are pretty regular static websites. However, we don't use Jekyll; our team is more at ease with nNde.js than Ruby, which is why we usually prefer it [Metalsmith](http://www.metalsmith.io/). And since we're pretty lazy, we automate building and pushing to the `gh-pages` using [devo.ps](http://devo.ps) (of course). Here's what it looks like.

## Prerequisites

You'll need to have a few things in place already:

- A repo with [GitHub pages](https://pages.github.com/) activated (duh). We'll assume you're using the `gh-pages` branch, though if it is your `*.github.io` repo it should be `master`.

    ![GitHub pages settings](http://devo.ps/images/posts/github-pages-settings.png)

- A [devo.ps account](http:/app.devo.ps/) (it's free) with (for the sake of this example) your Digital Ocean account tied up to it (though you could use AWS, Rackspace or Linode with minimum changes).

- A [Metalsmith](http://) site that has a Makefile along with a `make build` command (in our example we use it to install the npm dependencies as well as run bower and gulp).

## Let's get started

We'll be going through it step by step: I'll most likely prepare a repo very soon for you to fork, using our brand new [devo.ps button](http://devo.ps/blog/one-click-deploy-of-your-infrastructure/) feature.

1. [Add a server](http://docs.devo.ps/how-to/add-a-node/) (either to a new repo or an existing one) or use an existing node with the following services/configuration:

        id: build-server
        name: Build server
        type: server
        
        provider:
          name: digitalocean
          size: 66
        
        services:
          nodejs: *
          
        configuration:
          nodejs:
            packages:
              - bower
              - gulp

1. Once you've added your server, copy its public SSH key from the details section:

    ![GitHub pages settings](http://devo.ps/images/posts/devops-ssh-key.png)

1. Add that key as a deploy key in the settings of your site's repo on GitHub:

    ![GitHub deploy key](http://devo.ps/images/posts/github-deploy-keys.png)

1. We'll then add a task on devo.ps to do the bulk of the job:

        type: task
        id: gh-pages-build
        name: Build and deploy on gh-pages

        vars:
          # Feel free to edit the following values to match your use case
          dir: /opt/example.com
          build: _site
          temp: /tmp/build
          # You'll need to change that to match the Git URL of your site's repo
          repo: git@github.com:my-account/my-repo.git
          # We're here assuming we work out of the metalsmith branch
          ref: refs/heads/metalsmith
          dest: gh-pages
          
        targets:
          - build-server

        triggers:
          webhooks:
            - path: XkYw58l2d7rehq2Dkh4Nmd

        steps:
          # Hack to ensure we're building only when the right branch is updated
          - run: if [ "{{ trigger.payload.ref }}" != "{{ ref }}" ]; then echo "Wrong branch" >&2 ; exit 1 ; fi
          
          # Fetch our updates
          - run: devops git update
            options:
              repo: "{{ repo }}"
              dest: "{{ dir }}"
              version: metalsmith
          
          # Build the site
          - run: cd {{ dir }} && make build && git stash save
          
          # We copy the result of our build over to a temporary folder
          - run: rm -Rf {{ temp }} && cd {{ dir }} && cp -a {{ build }} {{ temp }}

          # We switch to `gh-pages` and trash its content
          - run: cd {{ dir }} && git checkout {{ dest }} && git rm -r --ignore-unmatch * 
          
          # We copy back the build in the Git repo
          - run: cd {{ dir }} && cp -a {{ temp }}/* .
          
          # We push our changes back
          - run: > 
              cd {{ dir }} && 
              git add . && 
              git commit -am "Build triggered by commit {{ trigger.payload.after }} from {{ trigger.payload.head_commit.author.username }}" && 
              git push origin {{ dest }}

1. Once that task is saved, we still need to point GitHub's webhook at it. You'll notice we added a `path: XkYw58l2d7rehq2Dkh4Nmd` in the `webhooks` section of the `triggers` attribute. It means that your task can be triggered by hitting the `https://wh.devo.ps/{USER}/{REPO}/XkYw58l2d7rehq2Dkh4Nmd` URL, where `{USER}` and `{REPO}` are your devo.ps username and repository name for this task. Go ahead and add this on GitHub in the "Webhooks & Services" settings page:

    ![GitHub webhook](http://devo.ps/images/posts/github-webhook.png)

1. Voilà!

Every time you'll be pushing a new commit on the `metalsmith` branch, devo.ps will fetch the changes, build the site and push it back in the `gh-pages` branch. Keep in mind that GitHub pages are public, wether or not the repo is.

There are obviously still a few rough edges: it'd be nice not to have to configure things manually on GitHub, it also would be nice to be able to not rely on a trick to prevent the task from running when the commit isn't related to the `metalsmith` branch.

In the next couple weeks, we'll be adding some of these features and starting to integrate more tightly with GitHub.
