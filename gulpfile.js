const gulp = require('gulp')
const resizer = require('gulp-images-resizer');
const debug = require('gulp-debug')

gulp.task('binaries', function () {
  return gulp
    .src([
      'img/**/*.jpg',
      '!img/thumbnail/**/*.jpg'
    ])
    .pipe(debug())
    .pipe(gulp.dest('binaries.txt'))
})

gulp.task('gen-thumbnails', function () {
  return gulp
    .src([
      'img/**/*.jpg',
      '!img/exec/**/*.jpg',
      '!img/thumbnail/**/*.jpg'
    ])
    .pipe(resizer({
      format: 'jpg',
      width: 300
    }))
    .pipe(gulp.dest('img/thumbnail/'))
})
