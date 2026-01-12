const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');
const uglify = require('gulp-uglify');
const fileInclude = require('gulp-file-include');

const paths = {
  html: 'assets/src/*.html',
  scss: 'assets/src/scss/main.scss',
  js: 'assets/src/js/main.js',
  images: 'assets/src/img/**/*.{jpg,jpeg,png,svg}',
  svg: 'assets/src/img/svg/*.svg',
  build: 'dist/'
};

// clean
const clean = () => del(['dist']);

// html
const html = () =>
  src(paths.html)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: 'assets/src/template/'
    }))
    .pipe(dest(paths.build))
    .pipe(browserSync.stream());

// styles
const styles = () =>
  src(paths.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.build + 'css'))
    .pipe(browserSync.stream());

// js
const scripts = () =>
  src(paths.js)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.build + 'js'))
    .pipe(browserSync.stream());

// images
const images = () =>
  src(paths.images)
    .pipe(imagemin())
    .pipe(dest(paths.build + 'img'))
    .pipe(webp())
    .pipe(dest(paths.build + 'img'));

// svg sprite
const sprite = () =>
  src(paths.svg)
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest(paths.build + 'img'));

// server
const serve = () => {
  browserSync.init({
    server: {
      baseDir: paths.build
    },
    notify: false
  });

  watch('assets/src/**/*.html', html);
  watch('assets/src/scss/**/*.scss', styles);
  watch('assets/src/js/**/*.js', scripts);
  watch(paths.images, images);
};

exports.default = series(
  clean,
  parallel(html, styles, scripts, images, sprite),
  serve
);

exports.build = series(
  clean,
  parallel(html, styles, scripts, images, sprite)
);
