'use strict';

const gulp = require('gulp');

gulp.task('default', function() {
    return gulp.src('source/**/*.*')
        .on('data', function(file) { // event listener
            console.log({
                contents: file.contents,
                path: file.path,            // /Users/andrew/Web/gulp4/source/1/index.js
                cwd: file.cwd,              // /Users/andrew/Web/gulp4
                base: file.base,            // /Users/andrew/Web/gulp4/source
                // path component helpers
                relative: file.relative,    // 1/index.js
                basename: file.basename,    // index.js
                stem: file.stem,            // index
                extname: file.extname       // .js
            });
        })
        .pipe(gulp.dest(function(file) {
            return file.extname === '.js' ? 'js' :
                file.extname === '.html' ? 'html' : 'dest';
        }));
});