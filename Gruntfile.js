/*
 * grunt-easy-rpm
 * https://github.com/panitw/easy-rpm
 *
 * Copyright (c) 2013 Panit Wechasil
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    easy_rpm: {
      default_options: {
        options: {
          version: "v1.0.0",
          release: 5,
          buildArch: "x86_64",
          tempDir: "tmp"
        },
        files: [
          {cwd:'test', src:['**'], dest:'/tmp/rpmtest5', mode: '755', owner: "rpmbuilder", group: "rpmbuilder"},
          {config:'true', cwd:'test', src:['**'], dest:'/tmp/rpmtest6', mode: '755', owner: "rpmbuilder", group: "rpmbuilder"},
          {doc:'true', cwd:'test', src:['**'], dest:'/tmp/rpmtest7', mode: '755', owner: "rpmbuilder", group: "rpmbuilder"}
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'easy_rpm', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
