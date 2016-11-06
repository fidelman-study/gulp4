'use strict';

const gulp = require('gulp');
const path = require('path');
const del = require('del');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const rev = require('gulp-rev');
const combine = require('stream-combiner2').obj;
const revReplace = require('gulp-rev-replace');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {
    return gulp.src('frontend/styles/index.styl')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(stylus())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulpIf(!isDevelopment, combine( cssnano(), rev() )))
        .pipe(gulp.dest('public/styles'))
        .pipe(gulpIf(!isDevelopment, combine( rev.manifest('css.json'), gulp.dest('manifest'))));
});

gulp.task('clean', function() {
    return del('public');
});

gulp.task('assets', function() {
    return gulp.src('frontend/assets/**/*.*', {since: gulp.lastRun('assets')})
        .pipe(gulpIf(!isDevelopment(revReplace({ // условие при revReplace не работает
            manifest: gulp.src('manifest/css.json', { allowEmpty: true }) // не ругаться если нету
        })))
        .pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series('clean', 'styles', 'assets'));

gulp.task('watch', function() {
    gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('server', function() {
   browserSync.init({
      server: 'public'
   });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));