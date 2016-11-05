'use strict';

const gulp = require('gulp');
const through2 = require('through2').obj;
const File = require('vinyl');

gulp.task('assets', function() {

    const mtimes = {}; // keep modification date

    return gulp.src('frontend/assets/**/*.*')
        .pipe(through2( // работа с файлами
            function(file, enc, callback) {
                mtimes[file.relative] = file.stat.mtime;
                callback(null, file);
            },
            function(callback) { // генерация
                let manifest = new File({ // создаем новый файл, который хранит в себе даты модификаций каждого файла
                    contents: new Buffer(JSON.stringify(mtimes)),
                    base: process.cwd(), // текущая директория
                    path: process.cwd() + '/manifest.json'
                });
                manifest.isManifest = true;
                this.push(manifest);
                callback();
            }
        ))
        .pipe(gulp.dest(function(file) {
            if(file.isManifest) {
                return process.cwd();
            } else {
                return 'public';
            }
        }));
});