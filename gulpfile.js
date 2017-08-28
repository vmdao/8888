const gulp = require('gulp'),
    less = require('gulp-less'),
    sync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    pug = require('pug');
gulp.task('less', function () {
    return gulp.src('assets/styles/less/build.less') // Get source files with gulp.src
        .pipe(less()) // Sends it through a gulp plugin
        .pipe(gulp.dest('assets/styles'))
        .pipe(sync.reload({
            stream: true
        }))
})

gulp.task('watch', ['browserSync', 'less'], function () {
    gulp.watch('assets/styles/less', ['less']);
    gulp.watch('./*.html', sync.reload);

    // Other watchers
})

gulp.task('browserSync', function () {
    sync.init({
        server: {
            baseDir: './'
        },
    })
})

gulp.task('default', function (callback) {
    runSequence(['views', 'less', 'browserSync', 'watch'],
        callback
    )
})

gulp.task('views', function buildHTML() {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src('./views/index.twig')
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        .pipe(gulp.dest('./views'));
});