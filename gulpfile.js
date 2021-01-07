const gulp = require('gulp')
const resizer = require('gulp-images-resizer')
const gulpLess = require('gulp-less')
const path = require('path')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const gulpPug = require('gulp-pug')

gulp.task('build-thumbnails', function () {
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
})

function less () {
  return gulp.src('./less/**/*.less')
    .pipe(gulpLess({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./css'))
}

gulp.task('build-css', function () {
  return gulp.src('css/main.css')
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('css'))
})

function styles () {
  return gulp.series(['less', 'build-css'])
}

function pug () {
  return gulp.src('views/*.pug')
    .pipe(gulpPug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest('.'))
}

exports.styles = styles
exports.dev = function () {
  gulp.watch('./less/**/*.less', less)
  gulp.watch('./views/**/*.pug', pug)
}
