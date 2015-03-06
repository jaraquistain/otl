var gulp = require('gulp');
var react = require('gulp-react');
var browserify = require('browserify');
//var uglify = require('gulp-uglify');
//var concat = require('gulp-concat');
//var rename = require('gulp-rename');
var through2 = require('through2');

var paths = {
    'jsx': {
        'in':  './node_modules/app/react/**/*.jsx',
        'out': './node_modules/app/react/'
    },
    'app': {
        'in':  './bin/client',
        'out': './www/js/dist/bundle.js'
    }
};

gulp.task('jsx->js', function () {
    gulp.src(paths.jsx.in)
        .pipe(react())
        .pipe(gulp.dest(paths.jsx.out));
});

gulp.task('browserify', ['jsx->js'], function () {
    return gulp.src(['./bin/client'])
        .pipe(through2.obj(function (file, enc, next){
            browserify(file)
                .bundle(function(err, res){
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(gulp.dest(paths.app.out));
});

gulp.task('default', ['jsx->js']);