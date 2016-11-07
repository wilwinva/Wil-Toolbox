// Generated on 2015-10-30 using generator-angular 0.14.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    ngconstant: 'grunt-ng-constant',
    protractor: 'grunt-protractor-runner',
    protractor_webdriver: 'grunt-protractor-webdriver',
    jsdoc: 'grunt-jsdoc',
    replace: 'grunt-replace'

  });

  // Configurable paths for the application
  var appConfig = {
    src: require('./bower.json').appPath || 'src',
    app: 'src/app',
    dist: 'dist'
  };

  var sassFiles = {
    '.tmp/styles/main.css': '<%= config.src %>/styles/sass/main.scss'
  };

  var buildTasks = [
    'ngtemplates',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'sass',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'replace:dist',
    'jsdoc'
  ];

  var serveTasks = [
    'wiredep',
    'concurrent:server',
    'sass',
    'ngtemplates',
    'replace:serve',
    'connect:livereload',
    'watch'
  ];

  var testTasks = [
    'clean:dist',
    'ngconstant:prod',
    'wiredep',
    'replace:serve',
    'concurrent:test',
    'sass',
    'connect:test'
  ];

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: appConfig,

    //Constants
    ngconstant: {
      options: {
        name: 'angularApp.config.constants',
        dest: '<%= config.app %>/config.js',
        constants: {
          'VERSIONINFO': {
            'versionNumber': '1',
            'releaseNumber': '0',
            'buildNumber': '0',
            'releaseNotesUrl': 'TODO:'
          },
          ENV: {
          }
        }
      },

      // Environment targets
      static: {
        constants: {
          ENV: {

          }
        }
      },
      local: {
        constants: {
          ENV: {

          }
        }
      },
      dev: {
        constants: {
          ENV: {

          }
        }
      },
      qual: {
        constants: {
          ENV: {

          }
        }
      },
      prod: {} // No overrides
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.src %>/**/**.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*spec.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      index: {
        files: ['<%= config.src %>/**/index.html'],
        tasks: ['replace:serve']
      },
      styles: {
        files: ['<%= config.src %>/styles/sass/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.src %>/**/*.html',
          '<%= config.src %>/**/*.tpl.html',
          '.tmp/index.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                  '/bower_components',
                  connect.static('./bower_components')
              ),
              connect().use(
                  '<%= config.src %>/styles',
                  connect.static('<%= config.src %>/styles')
              ),
              connect.static(appConfig.src)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                  '/bower_components',
                  connect.static('./bower_components')
              ),
              connect().use(
                  '/test',
                  connect.static('./test')
              ),
              connect.static(appConfig.src)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= config.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= config.src %>/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.spec.js']
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= config.src %>/**/*.js'
        ]
      },
      test: {
        src: ['test/spec/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/**/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= config.src %>/index.html'],
        ignorePath: /\.\.\//
      },
      //TODO: this isn't in the ASK file
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath: /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      dist: {
        files: sassFiles,
        options: {
          //includePaths: [
          //   './bower_components/bootstrap-sass/assets/stylesheets'
          //],
          outputStyle: 'compressed'
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= config.dist %>/scripts/{,*!/}*.js',
          '<%= config.dist %>/styles/**/*.css',
          '<%= config.dist %>/images/*.{png,jpg,jpeg,gif,webp,svg}',
          '!<%= config.dist %>/images/comment_icon.png',
          '<%= config.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= config.src %>/index.html',
      options: {
        dest: '<%= config.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglify'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= config.dist %>/**/*.html'],
      css: ['<%= config.dist %>/styles/{,*!/}*.css'],
      js: ['<%= config.dist %>/{,*!/}*.js'],
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/scripts',
          '<%= config.dist %>/styles'
        ],
        patterns: {
          js:   [[/(images\/[^'"]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']],
          css:  [[/(images\/[^'"]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']],
          html: [[/(images\/[^'"]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        }
      }
    },

    //Grunt build task to concatenate & register your AngularJS templates in the $templateCache
    ngtemplates: {
      vactApp: {
        options: {
          prefix: 'app/components/'
        },
        cwd: 'src/app/components',
        src:      '**/**.tpl.html',
        dest:     'src/app/templates.js'
      }
    },

    // tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // useminPrepare and replace both want to modify index.html.  Care must be taken that they don't overwrite each other.
    // Replace is set-up to be the final task run on index.html.  It runs out of the dist folder.
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'PATTERN-LIBRARY',
              replacement: function () {
                return target === 'prod' ? 'pl' : 'pl-' + target;
              }
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['<%= config.dist %>/index.html'], dest: '<%= config.dist %>'}
        ]
      },
      unSecureCookie: {
        options: {
          patterns: [
            {
              match: 'SECURE-COOKIES',
              replacement: 'placeHolder1 \', secureCookies: false, placeHolder2: \'placeHolder2'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['<%= config.app %>/config.js'], dest: '<%= config.app %>'}
        ]
      },
      secureCookie: {
        options: {
          patterns: [
            {
              match: 'SECURE-COOKIES', //TODO: find a better way to handle this, for local dev cookies can't be secure
              replacement: 'placeHolder1 \', secureCookies: true, placeHolder2: \'placeHolder2'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['<%= config.app %>/config.js'], dest: '<%= config.app %>'}
        ]
      },
      serve: {
        options: {
          patterns: [
            {
              match: 'PATTERN-LIBRARY',
              replacement: function () {
                return (target === 'prod' || target === 'static' || target === 'local') ? 'pl' : 'pl-' + target;
              }
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['<%= config.src %>/index.html'], dest: '.tmp/'}
        ]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.src %>',
            dest: '<%= config.dist %>',
            src: [
              '*.{ico,png,txt}',
              '**/*.html',
              'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
              'fonts/*',
              'styles/fonts/{,*/}*.*',
              '.htaccess'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= config.dist %>/images',
            src: ['generated/*']
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist',
            src: 'styles/fonts/*',
            dest: '<%= config.dist %>'
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '.tmp/styles',
        dest: 'dist/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        //'compass:server'
        'copy:styles'
      ],
      test: [
        //  'compass'
        'copy:styles'
      ],
      dist: [
        //  'compass:dist',
        'copy:styles',
        // 'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma/karma.conf.js',
        singleRun: true
      }
    },

    protractor_webdriver: {
      start: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        }
      }
    },

    protractor: {
      options: {
        keepAlive: true,
        configFile: 'e2e/protractor.conf.js'
      },
      run: {}
    },

    // Generate Documentation
    jsdoc : {
      dist : {
        src: ['src/app/**/*.js', 'src/common/**/*.js'],
        options: {
          destination: 'docs'
        }
      }
    }

  });

  var target = grunt.option('target');

  /**
   * Compiles and starts a connect web server.
   */
  grunt.registerTask('serve', 'Compile then start a connect web server', function () {
    if (target) {
      grunt.task.run('clean:server');
      grunt.task.run('ngconstant:' + target);
      grunt.task.run('replace:unSecureCookie');
      grunt.task.run(serveTasks);
    }
    else {
      grunt.log.writeln('"serve" tasks compile then start a connect web server. Please try one of the following:');
      grunt.log.writeln('  grunt serve-static  -->  Serves static content without a backend connection');
      grunt.log.writeln('  grunt serve-local   -->  Serves from local backend at http://inside-api');
      grunt.log.writeln('  grunt serve-dev     -->  Serves backend connection to inside-api-d.sandia.gov.');
      grunt.log.writeln('  grunt serve-qual    -->  Serves backend connection to inside-api-q.sandia.gov.');
      grunt.log.writeln('  grunt serve-prod    -->  Serves backend connection to inside-api.sandia.gov.');
      grunt.fail.fatal('Task requires a target');
    }
  });

  /**
   * Serves content without a backend connection. The data used is stored
   * locally in this project.
   */
  grunt.registerTask('serve-static', '', function () {
    target = 'static';
    grunt.task.run('serve');
  });

  /**
   * Serves data from a local backend. Requires backend to be served from
   * http://inside-api
   */
  grunt.registerTask('serve-local', function () {
    target = 'local';
    grunt.task.run('serve');
  });

  /**
   * Uses inside-api-d.sandia.gov as the backend. The cors on this is set up
   * to allow all origins, including localhost.
   */
  grunt.registerTask('serve-dev', function () {
    target = 'dev';
    grunt.task.run('serve');
  });

  /**
   * Uses inside-api-q.sandia.gov as the backend. The cors only allows
   * sandia.gov domain names, so this should give cors errors when served
   * from localhost. Used primarily to test this fact.
   */
  grunt.registerTask('serve-qual', function () {
    target = 'qual';
    grunt.task.run('serve');
  });

  /**
   * Uses inside-api.sandia.gov as the backend. The cors only allows
   * sandia.gov domain names, so this should give cors errors when served
   * from localhost. Used primarily to test this fact.
   */
  grunt.registerTask('serve-prod', function () {
    target = 'prod';
    grunt.task.run('serve');
  });

  //run e2e and unit tests
  grunt.registerTask('test', function () {
    target = 'prod';
    grunt.task.run(testTasks);
    grunt.task.run('karma');
    grunt.task.run('protractor_webdriver:start');
    grunt.task.run('protractor:run');
  });

  grunt.registerTask('test:e2e', function () {
    target = 'prod';
    grunt.task.run(testTasks);
    grunt.task.run('protractor_webdriver:start');
    grunt.task.run('protractor:run');
  });

  grunt.registerTask('test:unit', function () {
    target = 'prod';
    grunt.task.run(testTasks);
    grunt.task.run('karma:unit');
  });

  grunt.registerTask('build', function () {
    if (target) {
      grunt.task.run('clean:dist');
      grunt.task.run('ngconstant:' + target);
      grunt.task.run('replace:secureCookie');
      grunt.task.run(buildTasks);
    }
    else {
      grunt.log.writeln('"build" tasks compile the project into the dist folder. Please try one of the following:');
      grunt.log.writeln('  grunt build-dev     -->  Builds a backend connection to inside-api-d.sandia.gov.');
      grunt.log.writeln('  grunt build-qual    -->  Builds a backend connection to inside-api-q.sandia.gov.');
      grunt.log.writeln('  grunt build-prod    -->  Builds a backend connection to inside-api.sandia.gov.');
      grunt.fail.fatal('Task requires a target');
    }
  });

  grunt.registerTask('build-dev', function () {
    target = 'dev';
    grunt.task.run('build');
  });

  grunt.registerTask('build-qual', function () {
    target = 'qual';
    grunt.task.run('build');
  });

  grunt.registerTask('build-prod', function () {
    target = 'prod';
    grunt.task.run('build');
  });

};
