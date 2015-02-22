/*jshint strict:false */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg:        grunt.file.readJSON('package.json'),
        watch:      {
            react: {
                files: 'react/**/*.jsx',
                tasks: ['browserify']
            }
        },
        browserify: {
            options: {
                transform: [require('grunt-react').browserify]
            },
            client:  {
                src:  ['react/**/*.jsx'],
                dest: 'public/scripts/react/bundle.js'
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

    grunt.registerTask('default', ['browserify', 'watch']);
};
