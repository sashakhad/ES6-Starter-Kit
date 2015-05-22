var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require('browserify');
var fs = require("fs");
var babelify = require("babelify");
var source = require('vinyl-source-stream');

gulp.task("watch", function(){
    gulp.watch("./*.js", ["babel", "browserify"] )
})

gulp.task("babel", function(){
  return gulp.src(["main.js", "hi.js"])
    .pipe(babel())
    .pipe(gulp.dest("dist"));

})

gulp.task('browserify', function() {
    var b = browserify();
    b.add('dist/main.js')
    .add(require.resolve("6to5/browser-polyfill"))

    return b.bundle()
    .pipe(source('dist/main.js')) 
    .pipe(gulp.dest('bundle'))
});


gulp.task("default", ["babel", "browserify", "watch"]);