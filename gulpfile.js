var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    phpMinify    = require('gulp-php-minify'),
    runSequence  = require('run-sequence'),
    rename       = require('gulp-rename'),
    browserSync = require('browser-sync').create();
     
gulp.task('build', function(callback) {
  runSequence('clean',
              ['build-styles', 'build-scripts', 'build-php', 'data', 'build-html-index','imgmin'],
              callback);
  gulp.watch('src/sass/**/*.scss', ['build-styles']);
  gulp.watch('src/js/**/*.js', ['build-scripts']);
  gulp.watch('src/core/**/*.php', ['build-php']);
  gulp.watch('src/**/*.html', ['build-html-index']);
});

gulp.task('dev', function(callback) {
  runSequence('clean',
              ['dev:styles', 'dev:scripts', 'dev:php', 'data', 'dev:php-index', 'dev:html-index', 'dev:jquery', 'imgmin', 'icons'],
              callback);
  gulp.watch('src/sass/**/*.scss', ['dev:styles']);
  gulp.watch('src/js/**/*.js', ['dev:scripts']);
  gulp.watch('src/core/**/*.php', ['dev:php']);
  gulp.watch('src/**/*.html', ['dev:html-index']);
  gulp.watch('src/**/*.php', ['dev:php-index']);
  gulp.watch('src/**/*.png', ['imgmin']);
  gulp.watch('src/**/*.svg', ['icons']);
});

gulp.task('clean', function () {
  return del([
    'dist/**/*',
    '!dist/.htaccess',
    '!dist/core/.htaccess' // ignore the htaccess when building
  ]);
});

gulp.task('data', function() {
  gulp.src('src/data/txt/**/*.txt')
  .pipe(gulp.dest('dist/data/txt'));
});

gulp.task('icons', function() {
  gulp.src('src/icons/**/*.svg')
  .pipe(gulp.dest('dist/icons/'));
});

gulp.task('imgmin', () => gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img/'))
);

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "transport.dev"
    });
});

// Build
gulp.task('build-php', () => gulp.src('src/core/**/*.php', { read: false })
  .pipe(phpMinify({ binary: 'C:\\Program Files \(x86\)\\Ampps\\php\\php.exe' }))
  .pipe(gulp.dest('dist/core/'))
);

gulp.task('build-html-index', () => gulp.src('src/**/*.html', { read: false })
  .pipe(phpMinify({ binary: 'C:\\Program Files \(x86\)\\Ampps\\php\\php.exe' }))
  .pipe(gulp.dest('dist/'))
);

gulp.task('build-php-index', () => gulp.src('src/**/*.php', { read: false })
  .pipe(phpMinify({ binary: 'C:\\Program Files \(x86\)\\Ampps\\php\\php.exe' }))
  .pipe(gulp.dest('dist/'))
);

gulp.task('build-scripts', function(){
  gulp.src('src/js/**/*.js')
  .pipe(concat('javascript.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('build-styles', function(){
  gulp.src('src/sass/stylesheet.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(rename('stylesheet.min.css'))
    .pipe(gulp.dest('dist/css/'));
});

// ------------
// DEVELOPMENT
// ------------

// PHP: Core files
gulp.task('dev:php', function() {
  gulp.src('src/core/**/*.php')
  .pipe(gulp.dest('dist/core'));
});

gulp.task('dev:html-index', function() {
  gulp.src('src/**/*.html')
  .pipe(gulp.dest('dist/'));
});

gulp.task('dev:php-index', function() {
  gulp.src('src/**/*.php')
  .pipe(gulp.dest('dist/'));
});

gulp.task('dev:scripts', function(){
  gulp.src(['src/js/**/*.js', '!src/js/jquery-3.1.0.min.js'])
  .pipe(concat('javascript.min.js'))
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('dev:jquery', function(){
  gulp.src('src/js/jquery-3.1.0.min.js')
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('dev:styles', function(){
  gulp.src('src/sass/stylesheet.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(rename('stylesheet.css'))
    .pipe(gulp.dest('dist/css/'));
});
