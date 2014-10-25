'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

var lr = require('tiny-lr');
var livereload = require('gulp-livereload');
var reloadServer = lr();


// Server testing
gulp.task('mocha', function () {
  return gulp.src('./test/test.js', {
      read: false
    }).pipe(mocha())
    .once('end', function () {
      process.exit();
    });
});

// Client testing with karma runner
var testFiles = ['test/specs/**/*.js'];
gulp.task('karma', function () {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    })
    .once('end', function () {
      process.exit();
    });
});


// Jshint look for js errors
gulp.task('jshint', function () {
  gulp.src(['./src/client/**/*.js', '!src/client/assets/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(livereload({
      auto: false
    }));
});

// Sass
gulp.task('sass', function () {
  gulp.src('./src/client/assets/stylesheets/scss/main.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./src/client/assets/stylesheets/css/'))
    .pipe(livereload({
      auto: false
    }));
});

// index.html live reload
gulp.task('html', function () {
  gulp.src('./src/client/index.html')
    .pipe(livereload({
      auto: false
    }));
});


// Watch files and run some tasks
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['./test/test.js', './src/server/**/*.js'], ['mocha']);
  gulp.watch(['./src/client/**/*.js'], ['jshint']);
  gulp.watch(['./src/client/assets/stylesheets/scss/**/*.scss'], ['sass']);
  gulp.watch(['./src/client/**/*.html'], ['html']);
});

gulp.task('default', ['watch', 'jshint', 'sass']);
gulp.task('test', ['karma', 'mocha']);

