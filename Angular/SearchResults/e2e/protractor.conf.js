exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of this config.
  specs: ['tests/*_e2e_test.spec.js'],

  baseUrl: 'http://localhost:9011/', //default test port with Yeoman

  onPrepare: function () {
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'none',
      displayFailuresSummary: true,
      displaySuccessfulSpec: true,
      displayFailedSpec: true,
      displayPendingSpec: true,
      displaySpecDuration: true,
      displaySuiteNumber: true,
      colors: {
        success: 'green',
        failure: 'red',
        skipped: 'cyan'
      },
      prefixes: {
        success: '✓ ',
        failure: 'F ',
        pending: '-x '
      },
      customProcessors: []
    }));
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      filePrefix: 'e2e-test-results.xml',
      savePath: 'e2e/results/'
    }));
    by.addLocator('uisref', function (toState, opt_parentElement) {
      var using = opt_parentElement || document;

      var prefixes = ['ui-sref'];
      for (var p = 0; p < prefixes.length; ++p) {
        var selector = '*[' + prefixes[p] + '="' + toState + '"]';
        var inputs = using.querySelectorAll(selector);
        if (inputs.length) {
          return inputs;
        }
      }
    });
  },

  allScriptsTimeout: 11000,

  /*capabilities: {
   'browserName': 'firefox',
   'chromeOptions': {'args': ['--disable-extensions']}
   },*/

  multiCapabilities: [
    {
      browserName: 'firefox'
    }
    /*,
     {
     browserName: 'chrome'
     }
     ,
     {
     browserName: 'safari'
     }
     ,
     {
     browserName: 'internet explorer'
     }*/
  ],

  framework: 'jasmine2',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    print: function () {
    },
    defaultTimeoutInterval: 300000
  }
};
