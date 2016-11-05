
'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const debug = require('gulp-debug');
const notify = require('gulp-notify');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('styles', function() {
    return gulp.src('frontend/styles/main.styl')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(stylus())
        .on('error', function(err) { // необходимо указать обработчик ошибок после pipe где может произойти ошибка
            console.log(err.message);
            this.end();
        })
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('public'));
});

gulp.task('assets', function() {
    return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')}) // работать с файлами которые изменились с последнего запуска
        .pipe(debug())
        .pipe(gulp.dest('public'));
});

gulp.task('clean', function() {
    return del('public');
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'assets')));

gulp.task('watch', function() {
    gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('dev', gulp.series('build', 'watch'));