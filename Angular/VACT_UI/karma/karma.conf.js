// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-10-07 using
// generator-karma 0.9.0

module.exports = function (config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-native-dragdrop/draganddrop.min.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-websocket/dist/angular-websocket.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/app/app.js',
      'src/app/config.js',
      'src/app/**/*.js',
      'src/app/**/*.html',
      'src/**/*.mock.js',
      'src/app/**/*.spec.js',
      'src/app/components/**/*.html'
    ],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage', 'junit'],

    preprocessors: {
      'src/app/**/*.html': 'ng-html2js',
      'src/app/**/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },

    coverageReporter: {
      type: 'html',
      dir: 'karma/coverage/'
    },

    junitReporter: {
      outputFile: '../karma/results/unit-test-results.xml'
    },

    // list of files / patterns to exclude
    exclude: [
      'src/app/app_e2e_test.spec.js'
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-coverage',
      'karma-junit-reporter'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    client: {
      captureConsole: true
    }

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
