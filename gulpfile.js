var gulp = require('gulp');
var react = require('gulp-react');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watchify = require('watchify');
var transform = require('vinyl-transform');
var watch = require('gulp-watch');
var server = require('gulp-express');

var paths = {
    'jsx': {
        'in':  './node_modules/app/react/**/*.jsx',
        'out': './node_modules/app/react/js'
    },
    'client': {
        'in':  './bin/client',
        'out': './www/js'
    },
    'app': {
        'in': './bin/server'
    }
};

gulp.task('server', ['browserify'], function () {
    server.run([paths.app.in]);
    gulp.watch(paths.jsx.in, ['jsx->js']);
});

gulp.task('jsx->js', function () {
    gulp.src(paths.jsx.in)
        .pipe(watch(paths.jsx.in))
        .pipe(react())
        .pipe(gulp.dest(paths.jsx.out))
        .pipe(server.notify());
});

gulp.task('browserify', ['jsx->js'], function () {
    var filename = paths.client.in,
        bundler = watchify(browserify(filename, watchify.args)).on('update', bundle);

    function bundle() {
        var bundle = transform(function() {
            console.log('re-bundling...');
            return bundler.bundle();
        });

        return gulp.src(paths.client.in)
            .pipe(bundle)
            .pipe(rename('bundle.js'))
            .pipe(gulp.dest(paths.client.out))
            .pipe(uglify())
            .pipe(rename({'suffix': '.min'}))
            .pipe(gulp.dest(paths.client.out))
            .pipe(server.notify());
    }

    return bundle();
});

gulp.task('default', ['server']);