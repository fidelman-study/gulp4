'use strict';

const gulp = require('gulp');
const through2 = require('through2').obj;

gulp.task('default', function(callback) {
    return gulp.src('node_modules/**/*.*')
        .pipe(through2( // у pipe есть буфер в 16 элементов, при его заполнении, он останавливается
            // необходимо восстановить его после обработки .resume() либо всегда возвращать gulp.src
            function(file, enc, cb) {
                console.log(file.relative);
                cb(null, file);
            }
        ))
        // .resume()
        .on('end', callback);
});