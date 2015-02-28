var gulp = require('gulp');
var browserify = require('browserify');
var vinylTransform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var sourceMaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var through2 = require('through2');

gulp.task('browserify', function () {
    var browserified = vinylTransform(function (filename) {
        console.log('browserifying:', filename);
        var b = browserify(filename, {
            debug: true,
            transform: [reactify]
        });
        return b.bundle();
    });

    //return gulp.src(['./app/client/**/*.js', './app/common/**/*.js'])
    //    .pipe(browserified)
    //    .pipe(uglify())
    //    .pipe(gulp.dest('./public/js'));

    return gulp.src(['./app/client/**/*.js', './app/common/**/*.js', './app/**/*.jsx'])
        .pipe(through2.obj(function (file, enc, next){
            browserify(file.path)
                .transform('reactify')
                .bundle(function(err, res){
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('scripts', ['browserify'], function () {
    return gulp.src(['./public/js/**/*.js'])
        .pipe(sourceMaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./public/dist'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('default', ['scripts']);