var gulp = require('gulp');
var path = require('path');
var browserify = require('browserify');
var babelify = require('babelify');
var envify = require('envify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var order = require('gulp-order');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var less = require('gulp-less');
var streamify = require('gulp-streamify');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var spawn = require('child_process').spawn;
var config = require('./config');

const ENV = 'development';
const FONTS_DIR = 'static/fonts';
const DIST_DIR = 'static/dist';
const CSS_DIR = DIST_DIR + '/css';
const JS_DIR = DIST_DIR + '/js';
const VENDOR_DEPS = [
  'react',
  'react-dom',
  'react-router',
  'react-select',
  'react-timer-mixin',
  'react-script-loader',
  'react-localstorage',
  'classnames',
  'superagent',
  'moment'
];

///// STYLESHEETS /////

var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

var normalize = function(str) {
  return str.replace(/\//g, '-');
};

var STYLUS = [
  'main'
];
gulp.task('stylus', function() {
  var stylusStream = STYLUS.map(function(s) {
    return gulp.src('stylesheets/stylus/' + s + '.styl')
      .pipe(stylus())
      .on('error', handleError)
      .pipe(rename(normalize(s) + '.css'))
      .pipe(gulp.dest('stylesheets/gulp'));
  });
  return merge(stylusStream);
});

var LESS = [
  'animated-gameboy-in-css/demo',
  'animated-gameboy-in-css/blog',
  'logos-in-pure-css/demo',
  'logos-in-pure-css/blog',
  'slidr/demo'
];
gulp.task('less', function() {
  var lessStream = LESS.map(function(l) {
    return gulp.src('stylesheets/less/' + l + '.less')
      .pipe(less())
      .pipe(rename(normalize(l) + '.css'))
      .pipe(gulp.dest('stylesheets/gulp'));
  });
  return merge(lessStream);
});

gulp.task('css', function() {
  var cssStream = STYLUS.concat(LESS).map(function(c) {
    return gulp.src('stylesheets/gulp/' + normalize(c) + '.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest(CSS_DIR))
      .pipe(cssmin())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(CSS_DIR));
  });
  return merge(cssStream);
});

gulp.task('fonts', function() {
  return gulp.src('bower_components/Ionicons/fonts/*')
    .pipe(gulp.dest(CSS_DIR + '/fonts'));
});

gulp.task('deps.css', ['fonts'], function() {
  var dir = CSS_DIR + '/lib';

  // Minify css dependencies
  var minify = [
    'bower_components/normalize-css/normalize.css',
    'node_modules/highlight.js/styles/solarized-light.css',
    'node_modules/highlight.js/styles/github.css'
  ].map(function(css) {
    return gulp.src(css)
      .pipe(cssmin())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(dir));
  });

  // Copy other css dependencies
  var cssStream = [
    'bower_components/Ionicons/css/ionicons.min.css'
  ].map(function(css) {
    return gulp.src(css).pipe(gulp.dest(dir));
  });

  return merge(cssStream.concat(minify));
});

gulp.task('stylesheets', ['deps.css', 'stylus', 'less', 'css']);


///// SCRIPTS /////

gulp.task('deps.js', function() {
  var dir = JS_DIR + '/lib';

  // Minify js dependencies
  var minify = [
  ].map(function(js) {
    return gulp.src(js)
      .pipe(uglify())
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest(dir));
  });

  // Copy other js dependencies
  var jsStream = [
    'node_modules/marked/marked.min.js',
    'bower_components/slidr/slidr.min.js',
    'bower_components/jquery/dist/jquery.min.js'
  ].map(function(js) {
    return gulp.src(js).pipe(gulp.dest(dir));
  });

  return merge(jsStream.concat(minify));
});

var SCRIPTS = [
  'main'
];
gulp.task('js', function() {
  var jsStream = [
    'main'
  ].map(function(s) {
    return gulp.src('scripts/' + s + '.js')
      .pipe(rename(normalize(s) + '.js'))
      .pipe(gulp.dest(JS_DIR))
      .pipe(uglify())
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest(JS_DIR));
  });
  return merge(jsStream);
});

gulp.task('vendor', function() {
  var envs = ['development', 'production'];
  envs = envs.map(function(env) {
    var vendor = browserify({ debug: false })
      .require(VENDOR_DEPS)
      .transform(envify, {
        NODE_ENV: env
      })
      .bundle()
      .pipe(source('vendor.js'));
    if (env === 'production') {
      vendor = vendor.pipe(streamify(uglify({ mangle: true })))
      .pipe(rename({
        extname: '.min.js'
      }));
    }
    vendor = vendor.pipe(gulp.dest(JS_DIR));
    return vendor;
  });
  return merge(envs);
});

gulp.task('browserify', function() {
  var envs = {
    development: null,
    production: null
  };
  Object.keys(envs).forEach(function(env) {
    var bundler = browserify('app/main.js', { debug: false });
    if (env === 'development') {
      bundler = watchify(bundler);
    }
    bundler = bundler.external(VENDOR_DEPS)
      .transform(babelify, {
        presets: ['es2015', 'react']
      })
      .transform(envify, config.all(env));
    if (env === 'development') {
      bundler = bundler.on('update', rebundle);
    }
    envs[env] = bundler;
  });
  return rebundle();

  function rebundle() {
    var start = Date.now();
    Object.keys(envs).forEach(function(env) {
      var vendor = envs[env]
        .bundle()
        .on('error', function(err) {
          gutil.log(gutil.colors.red(err.toString()));
        })
        .on('end', function() {
          gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
        })
        .pipe(source('bundle.js'));
      if (env === 'production') {
        vendor = vendor
          .pipe(streamify(uglify({ mangle: true })))
          .pipe(rename({
            extname: '.min.js'
          }));
      }
      vendor = vendor.pipe(gulp.dest(JS_DIR));
    });
    return envs.development;
  }
});

gulp.task('server', function() {
  gulp.src('app.js')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(rename('server.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('scripts', ['deps.js', 'js', 'vendor', 'browserify', 'server']);

///// WATCH && RUN /////

gulp.task('watch', function() {
  gulp.watch('stylesheets/stylus/**/*.styl', ['stylus']);
  gulp.watch('stylesheets/less/**/*.less', ['less']);
  gulp.watch('stylesheets/gulp/*.css', ['css']);
  gulp.watch('scripts/**/*.js', ['js']);
  gulp.watch('app.js', ['server']);
});

gulp.task('start', ['stylesheets', 'scripts', 'watch'], function() {
  nodemon({
    script: 'server.js',
    env: {
      NODE_ENV: ENV
    },
    watch: ['routes/', 'models/', 'server.js', JS_DIR + '/bundle.js'],
  });
});

gulp.task('default', function() {
  var process;
  var restart = function() {
    if (process) {
       process.kill();
    }
    process = spawn('gulp', ['start'], {
      stdio: 'inherit'
    });
  }

  gulp.watch('gulpfile.js', restart);
  restart();
});
