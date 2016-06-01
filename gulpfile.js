var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync').create(),
    uglify       = require('gulp-uglify'),
    del          = require('del'),
    imagemin       = require('gulp-imagemin'),
    phpMinify    = require('gulp-php-minify'),
    runSequence  = require('run-sequence'),
    rename       = require('gulp-rename');
 
gulp.task('build', function(callback) {
  runSequence('clean',
              ['build-styles', 'build-scripts', 'build-php', 'build-php-index','imgmin'],
              callback);
  gulp.watch('src/sass/**/*.scss', ['build-styles']);
  gulp.watch('src/js/**/*.js', ['build-scripts']);
  gulp.watch('src/core/**/*.php', ['build-php']);
  gulp.watch('src/index.php', ['build-php-index']);
});

gulp.task('dev', function(callback) {
  runSequence('clean',
              ['dev-styles', 'dev-scripts', 'dev-php', 'dev-php-index','imgmin'],
              callback);
  gulp.watch('src/sass/**/*.scss', ['dev-styles']);
  gulp.watch('src/js/**/*.js', ['dev-scripts']);
  gulp.watch('src/core/**/*.php', ['dev-php']);
  gulp.watch('src/index.php', ['dev-php-index']);
});

gulp.task('clean', function () {
  return del([
    'dist/**/*',
    '!dist/.htaccess' // ignore the htaccess when building
  ]);
});

gulp.task('build-php', () => gulp.src('src/core/**/*.php', { read: false })
  .pipe(phpMinify({ binary: 'C:\\Program Files \(x86\)\\Ampps\\php\\php.exe' }))
  .pipe(gulp.dest('dist/core/'))
);

gulp.task('dev-php', () => gulp.src('src/core/**/*.php', { read: false })
  .pipe(gulp.dest('dist/core/'))
);

gulp.task('build-php-index', () => gulp.src('src/index.php', { read: false })
  .pipe(phpMinify({ binary: 'C:\\Program Files \(x86\)\\Ampps\\php\\php.exe' }))
  .pipe(gulp.dest('dist/'))
);

gulp.task('dev-php-index', () => gulp.src('src/index.php', { read: false })
  .pipe(gulp.dest('dist/'))
);

gulp.task('imgmin', () =>
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
);

gulp.task('build-scripts', function(){
  gulp.src('src/js/**/*.js')
  .pipe(concat('javascript.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('dev-scripts', function(){
  gulp.src('src/js/**/*.js')
  .pipe(concat('javascript.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('build-styles', function(){
  gulp.src('src/sass/stylesheet.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(rename('stylesheet.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('dev-styles', function(){
  gulp.src('src/sass/stylesheet.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dist/css'));
});
