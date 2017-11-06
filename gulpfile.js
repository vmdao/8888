const gulp = require('gulp'),
    less = require('gulp-less'),
    twig = require('gulp-twig'),
    babel = require('gulp-babel'),
    runSequence = require('run-sequence'),
    sync = require('browser-sync').create();


gulp.task('less', function () {
    return gulp.src('./src/assets/styles/build.less')
        .pipe(less())
        .pipe(gulp.dest('./build/assets/styles'))
        .pipe(sync.reload({
            stream: true
        }))
})

gulp.task('script', function () {
    return gulp.src('./src/assets/scripts/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./build/assets/scripts'))
        .pipe(sync.reload({
            stream: true
        }))
})

gulp.task('html', function buildHTML() {
    return gulp.src('./src/views/pages/*.htm')
        .pipe(twig({
            data: {
                title: '8GB Technologies',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        .pipe(gulp.dest('./build'))
        .pipe(sync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function () {
    sync.init({
        server: {
            baseDir: './build'
        },
    })
})

gulp.task('watch', function () {
    gulp.watch('./src/assets/styles/*.less', ['less']);
    gulp.watch('./src/assets/styles/pages/*.less', ['less']);
    gulp.watch('./src/assets/scripts/*.js', ['script']);
    gulp.watch('./src/views/*/*.htm', ['html']);
    gulp.watch('./src/views/layouts/*.htm',sync.reload);
    gulp.watch('./src/views/partials/*.htm',sync.reload);
    
})


gulp.task('default', function (callback) {
    runSequence(['html', 'less', 'script', 'browserSync', 'watch'],
        callback
    )
})

