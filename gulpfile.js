var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');

gulp.task('default', ['styles', 'scripts'], function() {
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('build', function(){
  
});

gulp.task('scripts', function(){
  gulp.src('src/js/**/*.js')
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/public/js'));
});

gulp.task('styles', function(){
  gulp.src('src/sass/stylesheet.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/public/css'));
});
 
// TODO: Add imagemin later
