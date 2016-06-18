/**
 * Created by Saif Ghachem on 12/02/2016.
 */

module.exports = function (grunt) {

// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Make a copy of your image to the prod folder
        copy: {
            images: {
                expand: true,
                cwd: '../dev/assets/img/',
                src: ['**'],
                dest: '../prod/assets/img/',
            },
            fonts: {
                expand: true,
                cwd: '../dev/assets/fonts/',
                src: ['**'],
                dest: '../prod/assets/fonts/',
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dest: {
                // Set All your js files
                src: [ '../dev/assets/js/wow.min.js',  '../dev/assets/js/modernizr.js'],
                // Set the dest of js css min file
                dest: '../prod/assets/js/all.min.js',
            },
        },
        concat_css: {
            options: {},
            all: {
                // Set All your css files
                src: ['../dev/assets/css/bootstrap.css', '../dev/assets/css/animation.css','../dev/assets/css/font-awesome.min.css'],
                // Set the dest of your css min file
                dest: '../prod/assets/css/all.min.css'
            }
        },
        uglify: {
            js_minifed: {
                files: {
                    '../prod/assets/js/all.min.js': ['../prod/assets/js/all.min.js']
                }
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/* All minified css file */'
                },
                files: {
                    '../prod/assets/css/all.min.css': ['../prod/assets/css/all.min.css']
                }
            }
        },

        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }
                ]
            },
            dist: {
                files: {
                    '../prod/assets/fonts/Gotham-Bold.svg': '../dev/assets/fonts/Gotham-Bold.svg',
                    '../prod/assets/fonts/Gotham-Medium.svg': '../dev/assets/fonts/Gotham-Medium.svg',
                    '../prod/assets/fonts/ProximaNova-Bold.svg': '../dev/assets/fonts/ProximaNova-Bold.svg',
                    '../prod/assets/fonts/ProximaNova-Regular.svg': '../dev/assets/fonts/ProximaNova-Regular.svg',
                    '../prod/assets/fonts/ProximaNova-RegularIt.svg': '../dev/assets/fonts/ProximaNova-RegularIt.svg',
                    '../prod/assets/img/comexplorer_logo.svg': '../dev/assets/img/comexplorer_logo.svg',
                }
            }
        },
        preprocess: {
            options: {
                context: {
                    DEBUG: true
                }
            },
            /*** Home page ***/
                // We have two conditions ! two laguages and two dev environment
            html_dev_en: {
                options: {
                    context: {
                        NODE_ENV: "dev",
                        NODE_LANG: "en",
                        VERSION: Number(new Date()),
                    }
                },
                src: '../index.html',
                dest: '../dev/index.html'
            },
            html_prod_en: {
                options: {
                    context: {
                        NODE_ENV: "prod",
                        NODE_LANG: "en",
                        VERSION: Number(new Date()),
                    }
                },
                src: '../index.html',
                dest: '../prod/index.html'
            },
            html_dev_fr: {
                options: {
                    context: {
                        NODE_ENV: "dev",
                        NODE_LANG: "fr",
                        VERSION: Number(new Date()),
                    }
                },
                src: '../index.html',
                dest: '../dev/index_fr.html'
            },
            html_prod_fr: {
                options: {
                    context: {
                        NODE_ENV: "prod",
                        NODE_LANG: "fr",
                        VERSION: Number(new Date()),
                    }
                },
                src: '../index.html',
                dest: '../prod/index_fr.html'
            },
            /*** End Home page ***/


        },
        htmlmin: {// Task
            prod: {// Target
                options: {// Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {// Dictionary of files
                      '../prod/index.html': '../prod/index.html'
                }
            }

        },
        watch: {
            js: {
                files: ['../dev/assets/js/*.js', ],
                tasks: ['js'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['../dev/assets/css/*.css', ],
                tasks: ['css'],
                options: {
                    spawn: false,
                },
            },
            html: {
                files: ['../*.html', ],
                tasks: ['html'],
                options: {
                    spawn: false,
                },
            },
            images: {
                files: ['../*.jpg', '../*.png'],
                tasks: ['copy:images'],
                options: {
                    spawn: false,
                },
            }
        },
        jshint: {
            all: ['../dev/assets/js/*.js']
        }
    })
// Load the plugin that provides the "uglify" task.

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('css', ['concat_css', 'cssmin']);
    grunt.registerTask('html', ['preprocess']);
    grunt.registerTask('default', ['copy', 'concat', 'concat_css', 'uglify', 'cssmin', 'preprocess', 'watch']);
    };