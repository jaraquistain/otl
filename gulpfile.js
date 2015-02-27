// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
//var compass = require('gulp-compass');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var minifyCSS = require('gulp-minify-css');
//var sourceMaps = require('gulp-sourcemaps');
var vinylTransform = require('vinyl-transform');
//var path = require('path');
//var rename = require('gulp-rename');
var browserify = require('browserify');
var reactify = require('reactify');

var paths = {
    'js': './app/**/*.js'
};


//Lint Task
gulp.task('lint', function () {
    return gulp.src('**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
//gulp.task('compass', function () {
//    return gulp.src('scss/*.scss')
//        .pipe(compass({
//            'project': path.join(__dirname, 'public'),
//            'sourceMap': true
//        }))
//        .pipe(minifyCSS())
//        .pipe(gulp.dest('dist'));
//});

gulp.task('browserify', function () {
    var browserified = vinylTransform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });
    return gulp.src(['./app/**/*/js'])
        .pipe(browserified)
        .pipe(gulp.dest('./public/js'));
});

// Concatenate & Minify JS
//gulp.task('scripts', function () {
//    return gulp.src(['./app/**.*.js', './app/views/*.jsx'])
//        .pipe(sourceMaps.init())
//            .pipe(concat('scripts.js'))
//        .pipe(sourceMaps.write())
//        .pipe(gulp.dest('dist'))
//        .pipe(rename('scripts.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist'));
//});

// Watch Files For Changes
//gulp.task('watch', function () {
//    gulp.watch('js/*.js', ['lint', 'scripts']);
//    gulp.watch('scss/*.scss', ['sass']);
//});

// Default Task
gulp.task('default', ['browserify']);
