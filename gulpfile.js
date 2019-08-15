const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const HTML_PATH = './app/**/*.html';
// const JS_PATH = './app/js/**/*.js';
const SASS_PATH = './app/**/*.scss';
const INDEX_SASS_PATH = './app/scss/style.scss';
const ASSETS_PATH = './app/assets/**/*.*';
const TS_PATH = './app/ts/**/*.ts';

gulp.task('sass', () => (
  gulp.src(INDEX_SASS_PATH)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
));

gulp.task('html', () => (
  gulp.src(HTML_PATH)
    .pipe(gulp.dest('./build'))
));

gulp.task('ts', () => (
  gulp.src(TS_PATH)
    .pipe(tsProject())
    .pipe(gulp.dest('./build/js'))
));

// gulp.task('js', () => (
//   gulp.src(JS_PATH)
//     .pipe(gulp.dest('./build/js'))
// ));

gulp.task('assets', () => (
  gulp.src(ASSETS_PATH)
    .pipe(gulp.dest('./build/assets'))
));

gulp.task('build', gulp.parallel('html', 'assets', 'sass', 'ts'));

gulp.task('serve', () => {
  browserSync.init({
    server: { baseDir: './build' },
    startPath: '/index.html',
  });
  watch('./build/**/*', browserSync.reload);
});

gulp.task('watch', () => {
  gulp.watch(SASS_PATH, gulp.series('sass'));
  gulp.watch(HTML_PATH, gulp.series('html'));
  gulp.watch(ASSETS_PATH, gulp.series('assets'));
  // gulp.watch(JS_PATH, gulp.series('js'));
  gulp.watch(TS_PATH, gulp.series('ts'));
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
