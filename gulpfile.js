'use strict';

const gulp = require('gulp');
const through2 = require('through2').obj;

gulp.task('assets', function() {
   return gulp.src('frontend/assets/**/*.*')
       .pipe(through2(function(file, enc, callback) {
          let file2 = file.clone(); // клонируем файл
          file2.path += '.bak'; // добавляем новое расширение
          this.push(file2); // добавляем его в поток
          callback(null, file);
       }))
       .pipe(gulp.dest('public'));
});
