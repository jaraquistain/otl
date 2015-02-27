var gulp = require('gulp');
var browserify = require('browserify');
var vinylTransform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var sourceMaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('browserify', function () {
    var browserified = vinylTransform(function (filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    return gulp.src(['./src/*.js'])
        .pipe(browserified)
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('scripts', ['browserify'], function () {
    return gulp.src(['./public/js/*.js'])
        .pipe(sourceMaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./public/dist'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('default', ['scripts']);