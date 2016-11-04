'use strict';

const gulp = require('gulp');

gulp.task('default', function() {
    /* minimatch syntax
     * **//*.* - all files includes directories
     *.{js,css} - js AND css
     * not places
     * {source, includes}/**//*.*  - some the same directories
     * ['source/**//*.css', 'includes/*.js'] - some directories by order
     * ['source/**//*.css', '!node_modules/**'] - exclude node_modules directory BAD WAY!
     */
    return gulp.src('source/**/*.*', {read: false}) // don't read files, e.g. video
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