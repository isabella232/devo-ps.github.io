---
collection: blog
title: Releasing devo.ps 0.5.0
tags:
  - release

author: vincent
hn:
date: 2014-09-02

template: post.html
---

We just released a new version of devo.ps (0.5.0). We are very excited to start rolling out the **devo.ps button** which allows our users to deploy entire infrastructures without leaving the browser with little or no configuration. more on this soon.

A quick list of the changes we made:

### New features

- **Remote fork support**; allows users to fork repository hosted on other platforms
- **1 click fork button**; add the button to your README file on GitHub, for example, and let users fork your architecture in 1 click.
- **devops.yml**; allowing you to define configurable variables for your repository (useful to let users modify settings on fork).
- **Variables overload**; allows to update variables directly in the inventory without changing your files.
- **Array lookup in configuration**; allows for more logic grouping of items in the configuration.

### Improvements & bug fixing

- Fixed codemirror size when the file is empty.
- Fixed the node details defaults.
- Improved the autocomplete widget for collaborators.
- Fixed links in notifications.
- Revamped the repository activation modal.
- Added task and sync `stderr` and `stdout` for improved user experience.
- Fixed conflicts in dependencies.
- Improved style of the console.
- Imrpoved file validation upon commit.
- Fixed error when no user/database is defined in a node configuration.
- Improved the task concurrency.

And as usual we are working on improving the [documentation](http://docs.devo.ps) and the [main website](http://devo.ps).
