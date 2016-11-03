'use strict';

const gulp = require('gulp');

gulp.task('hello', function(callback) {
    console.log('hi');
    callback(); // the task has finished
});

gulp.task('deals', function(callback) {
    console.log('how are you?');
    callback();
});

// call task async

gulp.task('greeting', gulp.parallel('hello', 'deals'));

// gulp does not pass data among tasks