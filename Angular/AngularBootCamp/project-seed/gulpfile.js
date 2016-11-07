var gulp = require('gulp'),
    clean = require('gulp-clean'),
    rimraf = require('gulp-rimraf'),
    less = require('gulp-less'),
    inject = require("gulp-inject"),
    runSequence = require('run-sequence'),
    rename = require("gulp-rename"),
    nodemon = require('gulp-nodemon'),
    concat = require('gulp-concat'),
    html2js = require("gulp-ng-html2js"),
    files = require('./gulp/gulp.config.js'),
    _ = require('lodash'),
    browserify = require('gulp-browserify'),
    ngmin = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    ngConstant = require('gulp-ng-constant'),
    sort = require('sort-stream'),
    pkg = require('./package.json');

gulp.task('build', function(callback) {
  runSequence('clean',
    'copy-build',
    //'config-build',
    'browserify-vendor',
    'html2js',
    'less',
    'index',
    'karmaconfig',
    callback);
});

gulp.task('default', function(callback) {
  runSequence('build',
              'watch',
              'serve',
              callback);
});

gulp.task('build-src', function(callback) {
  runSequence('copy-build', 'index', 'karmaconfig', callback)
})

gulp.task('clean', function() {
	return gulp.src('./build', {read: false})
        .pipe(rimraf({ force: true }));
})

gulp.task('clean-bin', function() {
	return gulp.src('./bin', {read: false})
        .pipe(rimraf({ force: true }));
});

gulp.task('copy-build', ['copy-assets', 'copy-app-js']);

gulp.task('copy-assets', function() {
	return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('copy-app-js', function() {
	return gulp.src(files.app_files.js)
    .pipe(gulp.dest('./build'));
});

gulp.task('html2js', function() {
  return gulp.src(files.app_files.atpl)
    .pipe(html2js({
        moduleName: "templates-app"
    }))
    .pipe(concat('templates-app.js'))
    .pipe(gulp.dest("./build/app"));
});

gulp.task('less', function () {
  return gulp.src('./src/less/main.less')
    .pipe(less({
          compile: true,
          compress: false,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }))
    .pipe(rename(pkg.name + '-' + pkg.version + '.css'))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('less-compile', function () {
  return gulp.src('./src/less/main.less')
    .pipe(less({
          compile: true,
          compress: true,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }))
    .pipe(rename(pkg.name + '-' + pkg.version + '.css'))
    .pipe(gulp.dest('./bin/assets/'));
});

gulp.task('browserify-vendor', function () {
  // Single entry point to browserify
  return gulp.src('./vendor/vendor.js')
    .pipe(browserify({
      insertGlobals: true,
      shim: files.browserify_shims
    }))
    .pipe(rename('vendor.js'))
    .pipe(gulp.dest('./build'))
});

/*
 Used to populate the index.html template with JS sources
 from the "build" dir.
*/
gulp.task('index', function() {
  return gulp.src('./src/index.html')
  .pipe(inject(
      gulp.src(files.app_files.tpl_src), {
      ignorePath: 'build'
    }))
  .pipe(gulp.dest("./build"));
});

/*
 Used to populate the index.html template with JS sources
 from the "bin" folder during compile task.
*/
gulp.task('index-compile', function () {
  return gulp.src('./src/index.html')
    .pipe(inject(gulp.src(['./bin/**/*.js', './bin/**/*.css'], {read: false}), {
      ignorePath: files.compile_dir + '/'
    }))
    .pipe(gulp.dest("./" + files.compile_dir));
});

gulp.task('ngmin', function () {
  return gulp.src(files.app_files.ngmin_js)
    .pipe(ngmin())
    .pipe(gulp.dest(files.compile_dir));
});

gulp.task('uglify', function () {
  return gulp.src(files.app_files.ngmin_js)
    .pipe(uglify());
});

gulp.task('concat', function () {

  return gulp.src(files.app_files.js_compile)
    .pipe(concat(pkg.name + '-' + pkg.version + '.min.js'))
    .pipe(gulp.dest('./bin/assets'))
});

gulp.task('serve', function () {
  nodemon({ script: files.server, watch: 'server/' })
    .on('restart', function () {
      console.log('restarted!')
    })
});

gulp.task('compile', function(callback) {
  runSequence('build',
    'clean-bin',
    'config-compile',
    'concat',
    'ngmin',
    'uglify',
    'less-compile',
    'index-compile',
    callback);
});

gulp.task('config-build', function () {
  return gulp.src('src/config/config-build.json')
    .pipe(ngConstant({
      name: 'project-seed.config.constants'
    }))
    // Writes config.js to dist/ folder
    .pipe(rename('config.js'))
    .pipe(gulp.dest('build/app'));
});

gulp.task('config-compile', function () {
  return gulp.src('src/config/config-compile.json')
    .pipe(ngConstant({
      name: 'workshop-seed.config.constants'
    }))
    .pipe(rename('config.js'))
    .pipe(gulp.dest('build/app/common'));
});

gulp.task('watch', function () {
  gulp.watch(files.app_files.js, ['build-src']);
  gulp.watch(files.app_files.atpl, ['html2js', 'index']);
  gulp.watch(files.app_files.html, ['index']);
  gulp.watch(files.app_files.styles, ['less', 'index']);
  gulp.watch(files.app_files.jsunit, ['karmaconfig']);
  gulp.watch(files.app_files.vendor, ['browserify-vendor']);
  //gulp.watch('./src/config/**/*.json', ['config-build']);
});

gulp.task('karmaconfig', function() {
  return gulp.src('./karma/karma.conf.tpl.js')
    .pipe(inject(gulp.src(_.flatten([  './build/vendor/**/*.js', files.test_files.js]), {read: false}),
        {
          addRootSlash: false,
          ignorePath: 'build',
          starttag: '//start',
          endtag: ',//end',
          transform: function (filepath, file, i, length)
          {
            return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
          }
        }
      )
    )
    .pipe(rename('karma.conf.js'))
    .pipe(gulp.dest('./build'));
});


