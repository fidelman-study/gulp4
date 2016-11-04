'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');


gulp.task('styles', function() {
    return gulp.src('frontend/styles/main.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(sourcemaps.write()) // можно внутри указать каталог для отдельного файла
        .pipe(gulp.dest('public'));
});