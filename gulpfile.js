const gulp = require('gulp')
const resizer = require('gulp-images-resizer')
const less = require('gulp-less')
const path = require('path')

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

function styles () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./css'))
}

exports.thumbnails = thumbnails
exports.styles = styles
