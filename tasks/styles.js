

const gulp = require('gulp');
const $ = require('gulp-load-plugins')(); // смотрит что есть в package.json и вызывает то, что удовлетворяет паттерну

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe($.if(isDevelopment, $.sourcemaps.init())) // вызывать как называется в package.json удовлетворяя паттерну
            .pipe($.stylus())
            .pipe($.if(isDevelopment, $.sourcemaps.write()))
            .pipe(gulp.dest('public'));
    };
};