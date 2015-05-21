var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("watch", function(){
    gulp.watch("./*.js", ["babel"] )
})

gulp.task("babel", function(){
  return gulp.src(["main.js", "hi.js"])
    .pipe(babel())
    .pipe(gulp.dest("dist"));
})

gulp.task("default", ["babel", "watch"]);