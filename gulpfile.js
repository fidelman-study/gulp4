'use strict';

const gulp = require('gulp');

gulp.task('hello', function(callback) {
    console.log('hi');
    callback(); // the task has finished
});