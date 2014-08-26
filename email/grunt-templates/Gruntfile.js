'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
          build: {
            options: {
              style: 'expanded'
            },
            files: {
              'src/css/style.css': 'src/scss/style.scss'
            }
          }
        },

        assemble: {
          options: {
            layoutdir: 'src/layouts',
            flatten: true
          },
          pages: {
            src: ['src/emails/*.hbs'],
            dest: 'build/'
          }
        },

        premailer: {
          simple: {
            options: {
              removeComments: true
            },
            files: [{
                expand: true,
                src: ['build/*.html'],
                dest: ''
            }]
          }
        },

        watch: {
          files: ['src/scss/*','src/emails/*','src/layouts/*'],
          tasks: ['default']
        },

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass','assemble','premailer']);

};

