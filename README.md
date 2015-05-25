# ES6-Starter-Kit
exploring the new features of ES6

#####Instructions

1) Fork this repo

2) Clone repo onto your computer (``git clone [url]``)

3) Run ``npm install``

4) Start having fun!

#####Adding Modules
If you would like to import and export modules into your code in this repo, you will also need to make sure that your  those modules are compiled via the gulp build tool. You can do that by adding your new module to the "babel" task:

```javascript
gulp.task("babel", function(){
  return gulp.src(["main.js", "module.js", "path/to/your/new/module.js"])
    .pipe(babel())
    .pipe(gulp.dest("dist"));

})
```

#####Resources
http://www.es6fiddle.com/

https://google.github.io/traceur-compiler/demo/repl.html