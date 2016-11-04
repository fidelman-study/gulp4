'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const remember = require('gulp-remember');
const path = require('path');
const cached = require('gulp-cached');

gulp.task('styles', function() {
   return gulp.src('frontend/styles/**/*.css')
       .pipe(cached('styles')) // разница с since в том, что он смотрит только на содержание
       .pipe(autoprefixer())
       .pipe(remember('styles')) // запоминает все прохожденные через него файлы, работает как связка с since
       .pipe(concat('all.css'))
       .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
   gulp.watch('frontend/styles/**/*.css', gulp.series('styles'))
       .on('unlink', function(filepath) {
           remember.forget('styles', path.resolve(filepath)); // удаляет из модуля remember
           delete cached.cashes.styles[path.resolve(filepath)]; // удаляет из модуля cached
       });
});

gulp.task('dev', gulp.series('styles', 'watch'));