const gulp = require('gulp')
const resizer = require('gulp-images-resizer')
const gulpLess = require('gulp-less')
const path = require('path')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const gulpPug = require('gulp-pug')

gulp.task('dev-thumbnails', function () {
  return gulp.src([
      'assets/img/**/*.jpg',
      '!assets/img/exec/**/*.jpg'
    ])
    .pipe(resizer({
      format: 'jpg',
      width: 300
    }))
    .pipe(gulp.dest('dev/img/thumbnail/'))
})

gulp.task('dev-less', function () {
  return gulp.src('./src/less/**/*.less')
    .pipe(gulpLess({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./dev/css'))
})

gulp.task('build-css', function () {
  return gulp.src('css/main.css')
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('css'))
})

function styles () {
  return gulp.series(['less', 'build-css'])
}

gulp.task('dev-pug', function () {
  return gulp.src('src/views/*.pug')
    .pipe(gulpPug({
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest('./dev'))
})

exports.styles = styles
gulp.task('dev', function () {
  gulp.watch('./src/less/**/*.less', gulp.series('dev-less'))
  gulp.watch('./src/views/**/*.pug', gulp.series('dev-pug'))
})
