const gulp = require('gulp')
const resizer = require('gulp-images-resizer')
const less = require('gulp-less')
const path = require('path')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

function thumbnails () {
  return gulp.src([
      'img/**/*.jpg',
      '!img/exec/**/*.jpg',
      '!img/thumbnail/**/*.jpg'
    ])
    .pipe(resizer({
      format: 'jpg',
      width: 300
    }))
    .pipe(gulp.dest('img/thumbnail/'))
}

function transpileLESS () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./css'))
}

function minifyCSS () {
  return gulp.src('css/main.css')
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('css'))
}

function styles () {
  return gulp.series([transpileLESS, minifyCSS])
}

exports.thumbnails = thumbnails
exports.minifyCSS = minifyCSS
exports.transpileLESS = transpileLESS
exports.styles = styles
exports.default = function () {
  gulp.watch('./less/**/*.less', transpileLESS)
}
