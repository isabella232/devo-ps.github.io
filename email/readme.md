devo.ps transactional email templates
=====================================

## Manual generate
- templates/

Use [premailer](https://github.com/premailer/premailer) to convert css into html inline-css.

```
$ cd templates
$ premailer action.html > out-action.html
```

## Auto generate
- grunt-templates/

```
$ cd grunt-templates
$ npm install
$ grunt
```

