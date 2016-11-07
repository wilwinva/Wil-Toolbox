var dirname = Date.now();

module.exports = function(grunt) {
    
    var sassFiles = {
        'css/snl-common.css': 'css/sass/style.scss'
    };
    // Configurable paths for the application

    grunt.config('env', grunt.option('env') || process.env.GRUNT_ENV || 'dev');

    var env = grunt.config('env');
    var file_to_load = env + "_env.json";

    var env_path = 'sshconfig.path';
    var env_base_path = 'sshconfig.base_path';
    var env_releases = 'sshconfig.releases_to_keep';

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
        * SSH Config
        */
        configuration:  grunt.file.readJSON(file_to_load),
        sshconfig: {
            "host": "<%= configuration.host %>",
            "username": "<%= configuration.username %>",
            "port": "<%= configuration.port %>",
            "base_path": "<%= configuration.base_path %>",
            "path": "<%= configuration.base_path %>/releases/"+dirname+"",
            "showProgress": "<%= configuration.showProgress %>",
            "releases_to_keep": "<%= configuration.releases_to_keep %>",
            "password": "<%= configuration.password %>",
            "createDirectories": true,
            "directoryPermissions": parseInt(775, 8),
            "agent": process.env.SSH_AUTH_SOCK,
            "srcBasePath": "dist/"
        },
        sshexec: {
            'make-release-dir': {
                command: "mkdir -m 775 -p <%= "+env_path+" %>",
                options: "<%= sshconfig %>",
            },
            'update-symlinks': {
                command: "rm -rf <%= "+env_base_path+" %>/current && ln -s <%= "+env_path+" %> <%= "+env_base_path+" %>/current",
                options: "<%= sshconfig %>",
            },
            'releases-to-keep': {
                command: "cd <%= "+env_base_path+" %>/releases && rm -rfv `ls -r <%= "+env_base_path+" %>/releases | awk 'NR><%= "+env_releases+" %>'`",
                options: "<%= sshconfig %>",
            },
            'rollback': {
                command: "cd <%= "+env_base_path+" %>/releases && rm -rf <%= "+env_base_path+" %>/current && t=`ls -t1 <%= "+env_base_path+" %>/releases | sed -n 2p` && ln -s <%= "+env_base_path+" %>/releases/$t <%= "+env_base_path+" %>/current && s=`ls -t1 <%= "+env_base_path+" %>/releases/ | sed -n 1p` && rm -rf <%= "+env_base_path+" %>/releases/$s/",
                options: "<%= sshconfig %>",
            }
        },
        sftp: {
          deploy: {
            files: {
              "./" : [
                "dist/**"
              ],
            },
            options: "<%= sshconfig %>",
          },
        },
        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
                ],
                dest: 'js/build/production.js'
            },
            snl_common: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                    'js/sticky-button.js'
                ],
                dest: 'js/build/snl-common.js'
            }
        },
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest:'js/production.min.js'
            },
            snl_common: {
                src: 'js/build/snl-common.js',
                dest:'js/snl-common.min.js'
            }


        },
        cssmin: {
            combine: {
                files: [
                    {
                        'css/production.min.css': [
                            'bower_components/bootstrap/dist/css/bootstrap.min.css',
                            'bower_components/source-sans-pro/source-sans-pro.css'
                        ]
                    },
                    {
                        'css/snl-common.min.css': [
                            'bower_components/source-sans-pro/source-sans-pro.css',
                            'css/snl-common.css'
                        ]
                    }

                ]
            }
        },
        sass: {
            dev: {
                files: sassFiles,
                options: {
                    includePaths: [
                        'node_modules/bootstrap-sass/assets/stylesheets'
                    ],
                    outputStyle: 'compressed'
                }
            },
            dist: {
                files: sassFiles,
                options: {
                    includePaths: [
                        'node_modules/bootstrap-sass/assets/stylesheets'
                    ],
                    outputStyle: 'compressed'
                }
            }
        },
        svgstore: {
          options: {
            prefix : 'snl-icon-',
          },
          default : {
              files: {
                'images/svg-icons.svg': ['images/svg-icons/*.svg'],
              }
          }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: ['dist/**/*']
                    }
                ]
            },
            build: {
                files: [
                    {
                        dot:true,
                        src: ['css/snl-common.*','css/production.*','js/*.min.js','js/build']
                    }
                ]
            },
            server: '.tmp'
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/source-sans-pro/',
                        src: ['EOT/*','OTF/*','TTF/*','WOFF/**','WOFF2/**'],
                        dest: 'dist/styles/'
                    },
                    {
                        expand: true,
                        cwd: 'assets/',
                        src: '**',
                        dest: 'dist/styles/images/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/',
                        src: '**',
                        dest: 'dist/fonts/bootstrap/'
                    },
                    {
                        expand: true,
                        cwd: 'css/',
                        src: ['snl-patternLibrary.css','snl-common.min.css','production.min.css','base.css','fonts.css'],
                        dest: 'dist/styles/'
                    },
                    {
                        expand: true,
                        cwd: 'css/',
                        src: ['snl-common.min.css'],
                        dest: 'dist/styles/',
                        rename: function(dest, src){
                            return dest + 'snl-common.css'
                        }
                    },
                    {
                        expand: true,
                        cwd: 'js/',
/*                        src: ['snl-common.min.js','production.min.js','sticky-button.js'],*/
                        src: ['snl-common.min.js','production.min.js'],
                        dest: 'dist/lib/'
                    },
                    {
                        expand: true,
                        cwd: '',
                        src: ['DIST_README.md'],
                        dest: 'dist/',
                        rename: function(dest, src){
                            return dest + 'README.md'
                        }
                    },
                    {
                        expand: true,
                        cwd: '',
                        src: ['DEV_CHANGELOG.md'],
                        dest: 'dist/',
                        rename: function(dest, src){
                            return dest + 'CHANGELOG.md'
                        }
                    }
                ]
            }
        },

        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            styles: {
                files: ['css/*.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false,
                },
            },

            source: {
                files: ['css/sass/*.scss'],
                tasks: ['sass:dev'],
                options: {
                    livereload: true, // needed to run LiveReload
                }
            }
        },

        compress: {
          main: {
            options: {
              archive: 'dist/pl-css-js.zip'
            },
            files: [
              {src: ['dist/lib/*']},
              {src: ['dist/styles/**']}
            ]
          }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-ssh');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    // grunt.registerTask('default', ['concat']);
    // grunt.registerTask('default', ['concat' , 'uglify', 'cssmin']);
    grunt.registerTask('default', [ 'sass:dev' , 'concat' , 'uglify', 'cssmin', 'clean:dist', 'copy:dist', 'compress', 'clean:build']);
    grunt.registerTask('deploy', ['sass:dev' , 'concat' , 'uglify', 'cssmin', 'clean:dist', 'copy:dist', 'compress', 'clean:build', 'sshexec:make-release-dir', "sftp:deploy", 'sshexec:update-symlinks', 'sshexec:releases-to-keep']);
    grunt.registerTask('rollback', ['sshexec:rollback']);
};
