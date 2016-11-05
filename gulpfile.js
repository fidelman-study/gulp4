'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', function() {
    return gulp.src('frontend/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
});