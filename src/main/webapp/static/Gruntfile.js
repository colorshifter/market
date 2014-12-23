// Generated on 2014-09-19 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        mavenPrepare: {
            options: {
                resources: ['**']
            },
            prepare: {}
        },

        mavenDist: {
            options: {
                warName: '<%= gruntMavenProperties.warName %>',
                deliverables: ['**', '!non-deliverable.js'],
                gruntDistDir: 'dist'
            },
            dist: {}
        },

        gruntMavenProperties: grunt.file.readJSON('grunt-maven.json'),

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/**/*.js'],
                //tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            less: {
                files: ['<%= yeoman.app %>/styles/less/{,*/}*.less'],
                tasks: ['less']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            maven: {
                files: ['<%= gruntMavenProperties.filesToWatch %>'],
                tasks: 'default'
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                protocol: 'https',
                key: grunt.file.read('server.key').toString(),
                cert: grunt.file.read('server.crt').toString(),
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    protocol: 'https',
                    key: grunt.file.read('server.key').toString(),
                    cert: grunt.file.read('server.crt').toString(),
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
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
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
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
                    '<%= yeoman.app %>/{,*/}*.js',
                    '!<%= yeoman.app %>/scripts/sb-admin-2.js',
                    '!<%= yeoman.app %>/scripts/keycloak.js',
                    '!<%= yeoman.app %>/scripts/keycloak.min.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                options: {
                    exclude: [
                        'bower_components/highlightjs/styles/default.css',
                        'bower_components/bootstrap/dist/css/bootstrap.css'
                    ],
                    ignorePath:  /\.\.\//
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/assets/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
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
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['{,*/}*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: ['*.js', '!oldieshim.js'],
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '**/*.html',
                            'assets/**/*'
                        ]
                    }, {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/assets/images',
                        src: ['generated/*']
                    }, {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: 'fonts/*',
                        dest: '<%= yeoman.dist %>'
                    }, {
                        expand: true,
                        cwd: 'bower_components/components-font-awesome',
                        src: 'fonts/*',
                        dest: '<%= yeoman.dist %>'
                    }, {
                        expand: true,
                        cwd: 'bower_components/octicons/octicons',
                        src: [
                            '*',
                            '!*.{css,scss,md}'
                        ],
                        dest: '<%= yeoman.dist %>/fonts'
                    }, {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            'scripts/keycloak.js',
                            'keycloak.json'
                        ]
                    }, {
                        expand: true,
                        cwd: 'bower_components/zeroclipboard/dist',
                        src: [
                            '*.swf'
                        ],
                        dest: '<%= yeoman.dist %>/vendor'
                    }
                ]
            },
            devDist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '**/*.js'
                    ]
                }, {
                    expand: true,
                    cwd: '.',
                    src: [
                        'bower_components/**/*.js',
                        'bower_components/**/*.css',
                        'bower_components/**/*.map',
                        'bower_components/bootstrap/dist/fonts/*',
                        'bower_components/components-font-awesome/fonts/*',
                        'bower_components/octicons/octicons/*',
                        'bower_components/zeroclipboard/dist/*.swf',
                        '!bower_components/*/{src,src/**,test,test/**}'
                    ],
                    dest: '<%= yeoman.dist %>'
                }, {
                    expand: true,
                    cwd: '.',
                    src: [
                        'bower_components/angular-bootstrap-show-errors/**/*.js'
                    ],
                    dest: '<%= yeoman.dist %>'
                }, {
                    expand: true,
                    cwd: '.',
                    src: [
                        'bower_components/angular-zeroclipboard/src/angular-zeroclipboard.js'
                    ],
                    dest: '<%= yeoman.dist %>'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: [
                    '{,*/}*.css',
                    '{,*/}*.less'
                ]
            },
            swf: {
                expand: true,
                cwd: 'bower_components/zeroclipboard/dist',
                src: 'ZeroClipboard.swf',
                dest: '<%= yeoman.app %>/vendor/'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles',
                'copy:swf'
            ],
            test: [
                'copy:styles',
                'copy:swf'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },

        // LESS settings
        less: {
            development: {
                options: {
                    compress: false,
                    sourceMap: true,
                    outputSourceFiles: true,
                    modifyVars: {
                        'octicons-font-path': '"/bower_components/octicons/octicons"'
                    }
                },
                files: {
                    '<%= yeoman.app %>/styles/custom-bootstrap.css': '<%= yeoman.app %>/styles/less/custom-bootstrap.less',
                    '<%= yeoman.app %>/styles/app.css': '<%= yeoman.app %>/styles/less/app.less',
                    'bower_components/octicons/octicons/octicons.css': 'bower_components/octicons/octicons/octicons.less'
                }
            },
            production: {
                options: {
                    compress: false,
                    sourceMap: false,
                    modifyVars: {
                        'icon-font-path': '"../fonts/"',
                        'octicons-font-path': '"../fonts"'
                    }
                },
                files: {
                    '<%= yeoman.dist %>/styles/custom-bootstrap.css': '<%= yeoman.app %>/styles/less/custom-bootstrap.less',
                    '<%= yeoman.dist %>/styles/app.css': '<%= yeoman.app %>/styles/less/app.less',
                    'bower_components/octicons/octicons/octicons.css': 'bower_components/octicons/octicons/octicons.less'
                }
            },
            'dev-production': {
                options: {
                    compress: false,
                    sourceMap: false,
                    modifyVars: {
                        'icon-font-path': '"../fonts/"'
                    }
                },
                files: {
                    '<%= yeoman.dist %>/styles/custom-bootstrap.css': '<%= yeoman.app %>/styles/less/custom-bootstrap.less',
                    '<%= yeoman.dist %>/styles/app.css': '<%= yeoman.app %>/styles/less/app.less',
                    'bower_components/octicons/octicons/octicons.css': 'bower_components/octicons/octicons/octicons.less'
                }
            }
        },

        sonarRunner: {
            analysis: {
                options: {
                    debug: true,
                    separator: '\n',
                    sonar: {
                        host: {
                            url: 'http://localhost:9000'
                        },
                        jdbc: {
                            url: 'jdbc:postgresql://localhost:5432/sonar',
                            username: 'sonar',
                            password: 'sonar'
                        },

                        projectKey: 'ortolang:market:0.2.0',
                        projectName: 'Ortolang Market',
                        projectVersion: '0.2.0-SNAPSHOT',
                        sources: ['app', 'test/spec'].join(','),
                        language: 'js',
                        sourceEncoding: 'UTF-8'
                    }
                }
            }
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'less:development',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'less:development',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'less:production',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('dev-build', [
        'clean:dist',
        'less:dev-production',
        'wiredep',
        'concurrent:dist',
        'copy:dist',
        'copy:devDist'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    grunt.loadNpmTasks('grunt-maven');

    grunt.registerTask('default', ['mavenPrepare', 'jshint', 'karma', 'less', 'uglify', 'mavenDist']);
};