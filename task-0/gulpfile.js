// gulp methods
const { src, dest, parallel, series, watch } = require('gulp');

// plugins
var sourcemaps    = require('gulp-sourcemaps');
var sass          = require('gulp-sass');
    sass.compiler = require('node-sass');
var autoprefixer  = require('gulp-autoprefixer');
// var csso          = require('gulp-csso');
// var rename        = require('gulp-rename');

var browserSync   = require('browser-sync').create();

var stylelint     = require('gulp-stylelint');
var prettier      = require('gulp-prettier');



// project files
var src_dir     = './src/';
var src_files   = './src/**/*';

var dist_dir    = './dist/';
var dist_files  = './dist/**/*';

var html_src    = './src/index.html';
var html_watch  = './src/**/*.html';
var html_dist   = './dist/';

var css_src     = './src/scss/main.scss';
var css_watch   = './src/scss/**/*.scss';
var css_dist    = './dist/css/';

var js_src      = './src/js/**/*.js';
var js_watch    = './src/js/**/*.js';
var js_dist     = './dist/js';

var font_src    = './src/fonts/**/*';
var font_watch  = './src/fonts/**/*';
var font_dist   = './dist/fonts';

var img_src     = './src/img/**/*';
var img_watch   = './src/img/**/*';
var img_dist    = './dist/img';

// task functions
function html() {
  return src(html_src)
        .pipe( dest(html_dist) );
}

function css() {
  return src(css_src)
        .pipe( sourcemaps.init() )
        .pipe( sass({
          errorLogToConsole: true,
          outputStyle: 'expanded'
        }) )
        .on( 'error', console.error.bind(console) )
        .pipe( autoprefixer({
          cascade: false
        }) )
        // .pipe( stylelint({
        //   configFile: '.stylelintrc-recommended',
        //   failAfterError: false,
        //   reportOutputDir: 'reports',
        //   reporters: [{
        //     // "string", "verbose", "json"
        //     formatter: 'verbose',
        //     save: 'stylelint.txt',
        //     console: true
        //   }],
        //   fix: false
        // }) )
        .pipe( sourcemaps.write('./') )
        .pipe( dest(css_dist) );
}

function js() {
  return src(js_src)
        .pipe( dest(js_dist) );
}

function font() {
  return src(font_src)
        .pipe( dest(font_dist) );
}

function img() {
  return src(img_src)
        .pipe( dest(img_dist) );
}

// watch files and trigger tasks
function watch_files() {
  watch(html_watch, { events: 'all' }, html);
  watch(css_watch,  { events: 'all' }, css);
  watch(js_watch,   { events: 'all' }, js);
  watch(font_watch, { events: 'all' }, font);
  watch(img_watch,  { events: 'all' }, img);
}

// browser reloader
function browser_sync() {
  browserSync.init({
    server: {
        baseDir: dist_dir
    },
    // files to watch
    files: dist_files
  });
}

function css_lint() {
  return src('src/scss/main.scss')
        .pipe( stylelint({
          configFile: '.stylelintrc-extended',
          failAfterError: true,
          reportOutputDir: 'reports/lint',
          reporters: [
            {
              formatter: 'verbose',
              save: 'stylelint-report.txt',
              console: true
            }
          ],
          fix: true
        }) )
        .pipe( dest('src/scss/'));
}

// tasks
exports.default = parallel(html, css, js, font, img);
exports.has      = parallel(html, css);

exports.html    = html;
exports.css     = css;
exports.js      = js;
exports.font    = font;
exports.img     = img;

exports.watch   = watch_files;
exports.bs      = browser_sync;
exports.ws      = series(parallel(html, css, js, font, img), parallel(watch_files, browser_sync));

exports.lint    = css_lint;
