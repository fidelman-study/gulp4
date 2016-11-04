'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

gulp.task('styles', function() {
   return gulp.src('frontend/styles/**/*.css')
       .pipe(autoprefixer())
       .pipe(concat('all.css'))
       .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
   gulp.watch('frontend/styles/**/*.css', gulp.series('styles'));
});

gulp.task('dev', gulp.series('styles', 'watch'));