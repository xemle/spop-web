var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    templateCache = require('gulp-angular-templatecache'),
    inject = require('gulp-inject');


gulp.task('ng-templates', function() {
  return gulp.src('public/scripts/**/*.html')
    .pipe(minifyHtml({empty: true}))
    .pipe(templateCache('templates.js', {module: 'app', root: 'scripts'}))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('html', ['ng-templates'], function() {
  var assets = useref.assets(),
      sources = gulp.src('.tmp/templates.js');

  return gulp.src('public/*.html')
    .pipe(inject(sources, {addRootSlash: false}))
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});


gulp.task('default', ['html']);
