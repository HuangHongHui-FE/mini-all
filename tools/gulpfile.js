const gulp = require('gulp');
const cleanwxss = require('gulp-cleanwxss');


gulp.task("default", (done) => {
  gulp.src("../miniprogram/pages/index/*.wxss")
  .pipe(cleanwxss({
    log: true
  }))
  .pipe(gulp.dest('./dist'));

  done();
})


gulp.task('wxs', (done) => {
  gulp.src("../miniprogram/pages/wxs/pages/*/*.wxss").pipe(cleanwxss({
    log: true
  }))
  .pipe(gulp.dest("./dist"));
  done();
})