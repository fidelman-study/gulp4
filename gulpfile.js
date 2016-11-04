'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const remember = require('gulp-remember');
const path = require('path');

gulp.task('styles', function() {
   return gulp.src('frontend/styles/**/*.css', {since: gulp.lastRun('styles')})
       .pipe(autoprefixer())
       .pipe(remember('styles')) // запоминает все прохожденные через него файлы, работает как связка с since
       .pipe(concat('all.css'))
       .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
   gulp.watch('frontend/styles/**/*.css', gulp.series('styles'))
       .on('unlink', function(filepath) { // обработчик при удалении файла
          remember.forget('styles', path.resolve(filepath)); //Нужен абсолютный путь, поэтому нужен модуль path
       });
});

gulp.task('dev', gulp.series('styles', 'watch'));