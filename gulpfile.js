var gulp = require('gulp');
var react = require('gulp-react');

var paths = {
    'jsx': {
        'in':  './app/react/**/*.jsx',
        'out': './app/react/'
    }
};

gulp.task('jsx->js', function () {
    gulp.src(paths.jsx.in)
        .pipe(react())
        .pipe(gulp.dest(paths.jsx.out));
});

gulp.task('default', ['jsx->js']);