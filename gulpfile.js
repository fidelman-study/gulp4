'use strict';

const gulp = require('gulp');

gulp.task('default', function() {
    return gulp.src('source/**/*.*')
        .pipe(gulp.dest('dest'));
});