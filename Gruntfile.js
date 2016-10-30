const webpackConfig = require('./webpack.config');

/*!
 *  Grunt Configurations
 */
module.exports = function (grunt) {
    'use strict';

    // ----------------------------
    //  GRUNT CONFIG
    // ----------------------------

    grunt.initConfig({
        // for node tests
        'jasmine_nodejs': {
            options: {
                specNameSuffix: 'spec.js',
                helperNameSuffix: 'helper.js',
                useHelpers: false,
                random: false,
                seed: null,
                defaultTimeout: 10000, // defaults to 5000
                stopOnFailure: false,
                traceFatal: true,
                reporters: {
                    console: {
                        colors: true,
                        cleanStack: 3,
                        verbosity: 4,
                        listStyle: 'indent',
                        activity: false
                    }
                },
                customReporters: []
            },
            test: {
                specs: ['test/**']
            }
        },

        // for browser tests
        'jasmine': {
            test: {
                src: './dist/tasktimer.min.js',
                options: {
                    // Prevents the auto-generated specfile used to run your
                    // tests from being automatically deleted.
                    keepRunner: true,
                    specs: './test/**'
                }
            }
        },

        'webpack': webpackConfig,

        'docma': {
            traceFatal: true,
            options: {
                config: './docma.config.json'
            }
        },

        'watch': {
            all: {
                files: [
                    './src/*.js',
                    './test/**/*.spec.js'
                ],
                tasks: ['build']
            }
        }
    });

    // ----------------------------
    //  LOAD GRUNT PLUGINS
    // ----------------------------

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // ----------------------------
    //  REGISTER TASKS
    // ----------------------------

    grunt.registerTask('node-test', ['jasmine_nodejs']);
    grunt.registerTask('browser-test', ['jasmine']);
    grunt.registerTask('test', ['node-test', 'browser-test']);
    grunt.registerTask('build', ['webpack:full', 'webpack:min']);
    grunt.registerTask('release', ['build', 'test', 'docma']);
    grunt.registerTask('default', ['webpack:full', 'test']);

};
