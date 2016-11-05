'use strict';

const gulp = require('gulp');
const through2 = require('through2').obh;

gulp.task('assets', function() {
   return gulp.src('frontend/assets/**/*.*')
       .pipe(throught2(function(file, enc, callback) {

       }))
       .pipe(gulp.dest('public'));
});
