'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg:        grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                options: {
                    debug: true,
                    transform: ['reactify'],
                    aliasMappings: [
                        {
                            cwd: 'app/views',
                            src: ['**/*.jsx'],
                            dest: 'app/views',
                            rename: function(cwd, src) {
                                // Little hack to ensure that file extension is preserved.
                                var ext = src.split('.').pop();
                                return cwd + '/' + src + '.' + ext;
                            }
                        }
                    ]
                },
                files: {
                    'public/min/scripts.js': './app.js'
                }
            }
        }
    });

    // Load the plugins
    var plugins = [
        'grunt-browserify',      //Compiles things for use in browser
        'grunt-concurrent',      //Run grunt tasks concurrently,
        'grunt-contrib-compass', //Compile SCSS into CSS
        'grunt-contrib-jshint',  //Validate with JSHint
        'grunt-contrib-uglify',  //Minify JS files
        'grunt-contrib-watch',   //Watch files for changes
        'grunt-nodemon',         //Run node server
        'grunt-react'            //compiles jsx to js
    ];

    plugins.forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['browserify']);
};
