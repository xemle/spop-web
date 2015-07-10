var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    annotate = require('gulp-ng-annotate'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    templateCache = require('gulp-angular-templatecache'),
    inject = require('gulp-inject'),
    debug = require('gulp-debug'),
    less = require('gulp-less'),
    gutil = require('gulp-util');


gulp.task('ng-templates', function() {
  return gulp.src('public/scripts/**/*.html')
    .pipe(minifyHtml({empty: true}))
    .pipe(templateCache('templates.js', {module: 'app', root: 'scripts'}))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('copyFontsFromBower', function() {
  var bowerBase = 'public/bower_components/';

  return gulp.src([
    bowerBase + 'fontawesome/fonts/*',
    bowerBase + 'bootstrap/fonts/*'
  ])
    .pipe(gulp.dest('public/fonts'));
});

gulp.task('copyFontsToDist', ['copyFontsFromBower'], function() {
  return gulp.src('public/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copyImages', function() {
  return gulp.src('public/images/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('less', function() {
  gulp
    .src('public/styles/app.less') // This was the line that needed fixing
    .pipe(less({
      paths: ['public/styles']
    }).on('error', gutil.log))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('html', ['ng-templates'], function() {
  var assets = useref.assets(),
      sources = gulp.src('.tmp/templates.js');

  return gulp.src('public/*.html')
    .pipe(inject(sources, {addRootSlash: false}))
    .pipe(assets)
    .pipe(gulpif('*.js', annotate()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['copyFontsFromBower', 'less']);

gulp.task('watch', ['dev'], function() {
  gulp.watch('public/styles/*.less', ['less']);
});

gulp.task('dist', ['dev', 'html', 'copyFontsToDist', 'copyImages']);

gulp.task('default', ['dev']);
