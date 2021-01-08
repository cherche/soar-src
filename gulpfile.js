const gulp = require('gulp')

const gulpPug = require('gulp-pug')
const gulpLess = require('gulp-less')
const path = require('path')
const resizer = require('gulp-images-resizer')

const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

gulp.task('views-dev', function () {
  return gulp.src('src/views/*.pug')
    .pipe(gulpPug({
      doctype: 'html'
    }))
    .pipe(gulp.dest('./dev'))
})

gulp.task('styles-dev', function () {
  return gulp.src([
    './src/less/**/*.less',
    '!./src/less/main.less'
  ])
    .pipe(gulpLess({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./dev/css'))
})

gulp.task('scripts-dev', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./dev/js'))
})

gulp.task('lib-dev', function () {
  return gulp.src('lib/**/*')
    .pipe(gulp.dest('dev/'))
})

gulp.task('assets-dev', function () {
  return gulp.src([
    'assets/**/*',
    '!assets.img/thumbnail/**/*.jpg'
  ])
    .pipe(gulp.dest('dev/'))
})

gulp.task('thumbnails-dev', function () {
  return gulp.src([
      'dev/img/**/*.jpg',
      '!dev/img/exec/**/*.jpg',
      '!dev.img/thumbnail/**/*.jpg'
    ])
    .pipe(resizer({
      format: 'jpg',
      width: 300
    }))
    .pipe(gulp.dest('dev/img/thumbnail/'))
})

// One-time gulp task to get the entire dev environment set up
gulp.task('dev-build', gulp.parallel(
  'views-dev',
  'styles-dev',
  'scripts-dev',
  'lib-dev',
  gulp.series('assets-dev', 'thumbnails-dev')
))

// Continuous gulp task to make development easier
gulp.task('dev-mode', function () {
  gulp.watch('./src/views/**/*.pug', gulp.series('views-dev'))
  gulp.watch('./src/less/**/*.less', gulp.series('styles-dev'))
  gulp.watch('./src/js/**/*.js', gulp.series('scripts-dev'))
})

// START OF BUILD TASKS

gulp.task('styles-build', function () {
  return gulp.src('css/main.css')
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('css'))
})
