var gulp = require('gulp');
var react = require('gulp-react');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watchify = require('watchify');
var transform = require('vinyl-transform');
var watch = require('gulp-watch');
var server = require('gulp-express');
var path = require('path');

var paths = {
    'jsx': {
        'in':  './node_modules/app/react/**/*.jsx',
        'out': './node_modules/app/react/js/'
    },
    'client': {
        'in':  './bin/client',
        'out': './www/js',
        'filename': 'bundle.js'
    },
    'app': {
        'in': './bin/server'
    }
};

gulp.task('default', ['server']);

gulp.task('server', ['minify'], function () {
    server.run([paths.app.in]);
    gulp.watch(paths.jsx.in, ['jsx']);
    gulp.watch(['./node_modules/app/**/*','!' + paths.jsx.in], function(){
        server.run([paths.app.in]);
    });
});

gulp.task('minify',['minify:bundle']);

gulp.task('minify:bundle', ['browserify'], function(){
    gulp.src(path.join(paths.client.out, paths.client.filename))
        .pipe(uglify())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(paths.client.out))
        .pipe(server.notify());
});

gulp.task('browserify', ['jsx'], function () {
    var filename = paths.client.in,
        bundler = watchify(browserify(filename, watchify.args)).on('update', bundle);

    function bundle() {
        var bundle = transform(function() {
            console.log('re-bundling...');
            return bundler.bundle();
        });

        return gulp.src(paths.client.in)
            .pipe(bundle)
            .pipe(rename(paths.client.filename))
            .pipe(gulp.dest(paths.client.out))
    }

    return bundle();
});

gulp.task('jsx', function () {
    gulp.src(paths.jsx.in)
        .pipe(watch(paths.jsx.in))
        .pipe(react())
        .pipe(gulp.dest(paths.jsx.out))
        .pipe(server.notify());
});
