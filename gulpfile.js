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
    gutil = require('gulp-util'),
    liveServer = require('gulp-live-server');


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

gulp.task('copyDist', ['copyFontsFromBower'], function() {
  return gulp.src([
      'public/favicon.png',
      'public/images/*',
      'public/fonts/*'
    ], {base: 'public'})
    .pipe(gulp.dest('dist'));
});

gulp.task('less', function() {
  return gulp
    .src('public/styles/app.less') // This was the line that needed fixing
    .pipe(less({
      paths: ['public/styles']
    }).on('error', gutil.log))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('html', ['less', 'ng-templates'], function() {
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

gulp.task('serve', function() {
  var server = liveServer('index.js', {env: {NODE_ENV: 'development'}});
  server.start();
  gulp.watch(['public/scripts/**', 'public/styles/*.css'], function() {
    server.notify.apply(server, arguments);
  });
  gulp.watch(['index.js', 'lib/**'], function() {
    server.start.apply(server);
  });
  gulp.watch('public/styles/*.less', ['less']);
});

gulp.task('dev', ['copyFontsFromBower', 'less', 'serve']);

gulp.task('dist', ['html', 'copyDist']);

gulp.task('default', ['dist']);
