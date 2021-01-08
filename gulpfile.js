const gulp = require('gulp')

const gulpPug = require('gulp-pug')
const gulpLess = require('gulp-less')
const path = require('path')
const resizer = require('gulp-images-resizer')

gulp.task('views-dev', function () {
  return gulp.src('src/views/dev/*.pug')
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

gulp.task('assets-copy-dev', function () {
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
      '!dev/img/thumbnail/**/*.jpg'
    ])
    .pipe(resizer({
      format: 'jpg',
      width: 300
    }))
    .pipe(gulp.dest('dev/img/thumbnail/'))
})

gulp.task('assets-dev', gulp.series('assets-copy-dev', 'thumbnails-dev'))

// Continuous gulp task to make development easier
gulp.task('dev-mode', function () {
  gulp.watch('./src/views/**/*.pug', gulp.series('views-dev'))
  gulp.watch('./src/less/**/*.less', gulp.series('styles-dev'))
  gulp.watch('./src/js/**/*.js', gulp.series('scripts-dev'))
})

gulp.task('default', gulp.series('dev-mode'))

// START OF BUILD TASKS
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

gulp.task('views-build', function () {
  return gulp.src('src/views/build/*.pug')
    .pipe(gulpPug({
      doctype: 'html'
    }))
    .pipe(gulp.dest('./build'))
})

gulp.task('less-build', function () {
  return gulp.src('src/less/main.less')
    .pipe(gulpLess({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('build/css'))
})

gulp.task('css-build', function () {
  return gulp.src('build/css/main.css')
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'))
})

gulp.task('styles-build', gulp.series('less-build', 'css-build'))

gulp.task('scripts-build', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('build/js'))
})

gulp.task('lib-build', function () {
  return gulp.src('lib/**/*')
    .pipe(gulp.dest('build'))
})

gulp.task('assets-build', function () {
  return gulp.src([
    'assets/**/*',
    '!assets.img/thumbnail/**/*.jpg'
  ])
    .pipe(gulp.dest('build'))
})

gulp.task('thumbnails-build', function () {
  return gulp.src([
      'build/img/**/*.jpg',
      '!build/img/exec/**/*.jpg',
      '!build/img/thumbnail/**/*.jpg'
    ])
    .pipe(resizer({
      format: 'jpg',
      width: 300
    }))
    .pipe(gulp.dest('build/img/thumbnail'))
})

gulp.task('dev-ish', gulp.parallel(
  'views-dev',
  'styles-dev',
  'scripts-dev',
  'lib-dev'
))

gulp.task('dev', gulp.parallel(
  'dev-ish',
  'assets-dev'
))

gulp.task('build-ish', gulp.parallel(
  'views-build',
  'styles-build',
  'scripts-build',
  'lib-build'
))

gulp.task('build', gulp.parallel(
  'build-ish',
  gulp.series('assets-build', 'thumbnails-build')
))
