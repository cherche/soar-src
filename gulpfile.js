const gulp = require('gulp')
const resizer = require('gulp-images-resizer');

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

exports.thumbnails = thumbnails
