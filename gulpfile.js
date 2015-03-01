var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var through2 = require('through2');
var react = require('gulp-react');
var reactify = require('reactify');

var paths = {
    'jsx': {
        'in':  './app/react/**/*.jsx',
        'out': './app/react/'
    },
    'app':  {
        'in':  ['./app/**/*.js', './app/react/**/*.jsx'],
        'out': './public/js'
    },
    'js': {
        'in': './public/js/**/*.js',
        'out': './public/dist'
    }
};

gulp.task('jsx->js', function () {
    gulp.src(paths.jsx.in)
        .pipe(react())
        .pipe(gulp.dest(paths.jsx.out));
});

gulp.task('browserify', [], function () {
    return gulp.src(paths.app.in)
        .pipe(through2.obj(function (file, enc, next) {
            console.log('browserify:', file.path);
            browserify(file.path)
                .transform(reactify)
                .bundle(function (err, res) {
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(gulp.dest(paths.app.out));
});

gulp.task('scripts', ['browserify'], function () {
    return gulp.src(paths.js.in)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.js.out))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.out));
});

gulp.task('default', ['scripts']);