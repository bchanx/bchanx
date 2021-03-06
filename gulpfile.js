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
var cestlacremeConfig = require('./subdomains/cestlacreme/config');

var ENV = 'development';
const DIST_DIR = 'static/dist';
const JS_DIR = DIST_DIR + '/js';
const CSS_DIR = DIST_DIR + '/css';
const VENDOR_DEPS = [
  'classnames',
  'email-validator',
  'moment',
  'react',
  'react-credit-card',
  'react-dom',
  'react-localstorage',
  'react-router',
  'react-script-loader',
  'react-select',
  'react-timer-mixin',
  'superagent'
];

///// STYLESHEETS /////

var handleError = function(err) {
  gutil.log(gutil.colors.red(err.toString()));
  this.emit('end');
};

var normalize = function(str) {
  return str.replace(/\//g, '-');
};

var STYLUS = [
  'main',
  '9kmmr'
];

var CESTLACREME_STYLUS = [
  'splash',
  'main'
];

gulp.task('stylus', function() {
  var styls = STYLUS.map(function(s) {
    return gulp.src('stylesheets/stylus/' + s + '.styl')
      .pipe(stylus())
      .on('error', handleError)
      .pipe(rename(normalize(s) + '.css'))
      .pipe(gulp.dest('stylesheets/gulp'));
  });

  var cestlacreme = CESTLACREME_STYLUS.map(s => {
    return gulp.src(`subdomains/cestlacreme/stylesheets/stylus/${s}.styl`)
      .pipe(stylus())
      .on('error', handleError)
      .pipe(rename(normalize(s) + '.css'))
      .pipe(gulp.dest('subdomains/cestlacreme/stylesheets/gulp'));
  });

  return merge(styls, cestlacreme);
});

var LESS = [
  'animated-gameboy-in-css/demo',
  'animated-gameboy-in-css/blog',
  'logos-in-pure-css/demo',
  'logos-in-pure-css/blog',
  'slidr/demo'
];
gulp.task('less', function() {
  var lesses = LESS.map(function(l) {
    return gulp.src('stylesheets/less/' + l + '.less')
      .pipe(less())
      .on('error', handleError)
      .pipe(rename(normalize(l) + '.css'))
      .pipe(gulp.dest('stylesheets/gulp'));
  });
  return merge(lesses);
});

gulp.task('css', function() {
  var css = STYLUS.concat(LESS).map(function(c) {
    return gulp.src('stylesheets/gulp/' + normalize(c) + '.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .on('error', handleError)
      .pipe(gulp.dest(CSS_DIR))
      .pipe(cssmin())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(CSS_DIR));
  });

  var cestlacreme = CESTLACREME_STYLUS.map(c => {
    return gulp.src('subdomains/cestlacreme/stylesheets/gulp/' + normalize(c) + '.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .on('error', handleError)
      .pipe(gulp.dest(`subdomains/cestlacreme/${CSS_DIR}`))
      .pipe(cssmin())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(`subdomains/cestlacreme/${CSS_DIR}`));
  });

  return merge(css, cestlacreme);
});

gulp.task('others', function() {
  var fonts = gulp.src('bower_components/Ionicons/fonts/*')
    .pipe(gulp.dest(CSS_DIR + '/fonts'))
    .pipe(gulp.dest(`subdomains/cestlacreme/${CSS_DIR}/fonts`));

  var css = gulp.src('stylesheets/static/markdown.css')
    .pipe(cssmin())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(CSS_DIR + '/lib'));

  return merge(fonts, css);
});

gulp.task('lib.css', function() {
  // Copy css dependencies that need to be minified
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
      .pipe(gulp.dest(CSS_DIR + '/lib'));
  });

  // Copy other css dependencies
  var deps = [
    'bower_components/Ionicons/css/ionicons.min.css'
  ].map(function(css) {
    return gulp.src(css).pipe(gulp.dest(CSS_DIR + '/lib'));
  });

  return merge(minify.concat(deps));
});

gulp.task('deps.css', ['lib.css', 'others'], function() {
  var exclude = [
    'deps.css',
    'solarized-light.min.css',
    'github.min.css'
  ];

  let main = gulp.src([
    CSS_DIR + '/lib/*.css',
  ].concat(exclude.map(function(e) {
    return '!' + CSS_DIR + '/lib/' + e;
  })))
    .pipe(concat('deps.css'))
    .pipe(gulp.dest(CSS_DIR + '/lib'));

  let cestlacreme = gulp.src([
    'bower_components/normalize-css/normalize.css',
    'bower_components/Ionicons/css/ionicons.css',
    'node_modules/react-credit-card/source/card*.css',
    'node_modules/react-select/dist/react-select.css'
  ]).pipe(concat('deps.css'))
    .pipe(gulp.dest(`subdomains/cestlacreme/${CSS_DIR}/lib`))
    .pipe(cssmin())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(`subdomains/cestlacreme/${CSS_DIR}/lib`));

  return merge(main, cestlacreme);
});

gulp.task('stylus-less-css', ['stylus', 'less'], function() {
  gulp.start('css');
});

gulp.task('stylesheets', ['deps.css', 'stylus-less-css']);


///// SCRIPTS /////

gulp.task('deps.js', function() {
  // TODO: highlight.js, doesn't work in 9.7.0 so we're using 9.1.0 from cdn
  // Minify js dependencies
  var minify = [
    'node_modules/superagent/superagent.js',
    'node_modules/moment/moment.js'
  ].map(function(js) {
    return gulp.src(js)
      .pipe(uglify())
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest(JS_DIR + '/lib'));
  });

  // Copy other js dependencies
  var deps = [
    'node_modules/marked/marked.min.js',
    'node_modules/vue/dist/vue.js',
    'node_modules/vue/dist/vue.min.js',
    'node_modules/chart.js/dist/Chart.min.js',
    'node_modules/chartkick/dist/chartkick.min.js',
    'node_modules/vue-chartkick/dist/vue-chartkick.min.js',
    'scripts/static/vue-disqus.js',
    'bower_components/slidr/slidr.min.js',
    'bower_components/jquery/dist/jquery.min.js'
  ].map(function(dep) {
    return gulp.src(dep).pipe(gulp.dest(JS_DIR + '/lib'));
  });

  return merge(minify.concat(deps));
});

gulp.task('js', function() {
  var js = [
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

  // Browserify
  var jsBrowserify = [{
    filename: '9kmmr',
    deps: ['moment', 'superagent', 'vue', 'vue-disqus']
  }].map(function(br) {
    var envs = ['development', 'production'];
    envs = envs.map(function(env) {
      var browserified = browserify('scripts/' + br.filename + '.js', { debug: false })
        .external(br.deps)
        .transform(babelify, {
          presets: ['es2015']
        })
        .transform(envify, {
          NODE_ENV: env
        })
        .bundle()
        .on('error', handleError)
        .pipe(source(br.filename + '.js'));
      if (env === 'production') {
        browserified = browserified.pipe(streamify(uglify({ mangle: true })))
        .pipe(rename({
          extname: '.min.js'
        }));
      }
      browserified = browserified.pipe(gulp.dest(JS_DIR));
      return browserified;
    });
    return merge(envs);
  });

  // No minification, just copy
  var jsCopy = [
  ].map(function(s) {
    return gulp.src('scripts/' + s + '.js')
      .pipe(rename(normalize(s) + '.js'))
      .pipe(gulp.dest(JS_DIR));
  });

  return merge(js.concat(jsBrowserify).concat(jsCopy));
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
      .on('error', handleError)
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

gulp.task('bundle', function() {
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
      .transform(envify, {
        NODE_ENV: env
      });
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
        .on('error', handleError)
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

gulp.task('cestlacreme-bundle', function() {
  var envs = {
    development: null,
    production: null
  };
  Object.keys(envs).forEach(function(env) {
    var bundler = browserify('subdomains/cestlacreme/app/main.js', { debug: false });
    if (env === 'development') {
      bundler = watchify(bundler);
    }
    bundler = bundler.external(VENDOR_DEPS)
      .transform(babelify, {
        presets: ['es2015', 'react']
      })
      .transform(envify, cestlacremeConfig.all(env))
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
        .on('error', handleError)
        .on('end', function() {
          gutil.log(gutil.colors.green('Finished rebundling C\'est la Creme in', (Date.now() - start) + 'ms.'));
        })
        .pipe(source('bundle.js'));
      if (env === 'production') {
        vendor = vendor
          .pipe(streamify(uglify({ mangle: true })))
          .pipe(rename({
            extname: '.min.js'
          }));
      }
      vendor = vendor.pipe(gulp.dest(`subdomains/cestlacreme/${JS_DIR}`));
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

gulp.task('scripts', ['deps.js', 'js', 'vendor', 'bundle', 'cestlacreme-bundle', 'server']);

///// WATCH && RUN /////

gulp.task('watch', function() {
  ['', 'subdomains/cestlacreme/'].forEach(dir => {
    gulp.watch(`${dir}stylesheets/stylus/*.*`, ['stylus']);
    gulp.watch(`${dir}stylesheets/gulp/*.css`, ['css']);
    gulp.watch(`${dir}app.js`, ['server']);
    gulp.watch(`${dir}routes/**/*.js`, ['server']);
  });

  gulp.watch('stylesheets/less/*.*', ['less']);
  gulp.watch('scripts/**/*.js', ['js']);
});

gulp.task('start', ['stylesheets', 'scripts', 'watch'], function() {
  nodemon({
    script: 'server.js',
    env: {
      NODE_ENV: process.argv.indexOf('--production') >= 0 ? 'production' : 'development',
      LOCAL_HOST: true
    },
    watch: ['routes/', 'server.js', JS_DIR + '/bundle.js'],
  });
});

gulp.task('build', ['stylesheets', 'scripts'], function() {
  gutil.log(gutil.colors.green('Build finished!'));
  process.exit(0);
});

gulp.task('default', function() {
  var process;
  var restart = function() {
    if (process) {
       process.kill();
    }
    var flags = ['start'];
    if (ENV === 'production') {
      flags.push('--production');
    }
    process = spawn('gulp', flags, {
      stdio: 'inherit'
    });
  }

  gulp.watch('gulpfile.js', restart);
  restart();
});

gulp.task('prod', function() {
  ENV = 'production';
  gulp.start('default');
});
