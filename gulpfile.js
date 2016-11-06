
'use strict';
const gulp = require('gulp');

function lazyRequireTask(taskName, path, options) { // универсальная функция для вызова задач из файлов
    options = options || {};

    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
}

lazyRequireTask('styles', './tasks/styles.js', {
    src: 'frontend/styles/main.styl'
});