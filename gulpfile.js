'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const remember = require('gulp-remember');
const path = require('path');
const cached = require('gulp-cached');
const browserSync = require('browser-sync').create();

gulp.task('styles', function() {
   return gulp.src('frontend/styles/**/*.css')
       .pipe(cached('styles'))
       .pipe(autoprefixer())
       .pipe(remember('styles'))
       .pipe(concat('all.css'))
       .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
   gulp.watch('frontend/styles/**/*.css', gulp.series('styles'))
       .on('unlink', function(filepath) {
           remember.forget('styles', path.resolve(filepath));
           delete cached.cashes.styles[path.resolve(filepath)];
       });
});


gulp.task('serve', function() {
    browserSync.init({ // создали статический сервер
        server: 'public'
    });

    browserSync.watch('public/**/*.*').on('change', browserSync.reload); // watcher на изменения

});

gulp.task('dev', gulp.series('styles', gulp.parallel('watch', 'serve')));