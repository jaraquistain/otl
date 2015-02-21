"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    // Load the plugins
    var plugins = [
        'grunt-concurrent',      //Run grunt tasks concurrently
        'grunt-contrib-compass', //Compile SCSS into CSS
        'grunt-contrib-jshint',  //Validate with JSHint
        'grunt-contrib-uglify',  //Minify JS files
        'grunt-contrib-watch',   //Watch files for changes
        'grunt-nodemon'          //Run node server
    ];

    plugins.forEach(grunt.loadNpmTasks);
};
