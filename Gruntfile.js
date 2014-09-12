/**
 * @file Gruntfile.js
 * @author Will Steinmetz
 * This file runs the grunt tasks for the jQuery notific8 plug-in.
 */

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: 'package.json',

    // sass
    sass: {
      src: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: {
          'src/css/jquery.notific8.css': 'src/sass/jquery.notific8.scss'
        }
      }
    },

    // autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
      },
      no_dest: {
        src: 'src/css/jquery.notific8.css'
      }
    },

    // cssmin
    cssmin: {
      minify: {
        expand: true,
        files: {
          'dist/jquery.notific8.min.css': ['src/css/jquery.notific8.css']
        }
      },
      add_banner: {
        options: {
          banner: '/**\n\
* @author Will Steinmetz\n\
* jQuery notification plug-in inspired by the notification style of Windows 8\n\
* Copyright (c)2014, Will Steinmetz\n\
* Licensed under the BSD license.\n\
* http://opensource.org/licenses/BSD-3-Clause\n\
*/'
        },
        files: {
          'dist/jquery.notific8.min.css': ['dist/jquery.notific8.min.css']
        }
      }
    },

    // concat task
    uglify: {
      options: {
        mangle: true,
        sourceMap: true,
        banner: '/**\n\
* @author Will Steinmetz\n\
* jQuery notification plug-in inspired by the notification style of Windows 8\n\
* Copyright (c)2013, Will Steinmetz\n\
* Licensed under the BSD license.\n\
* http://opensource.org/licenses/BSD-3-Clause\n\
*/'
      },
      my_target: {
        files: {
          'dist/jquery.notific8.min.js': ['src/js/jquery.notific8.js']
        }
      }
    },

    // watch
    watch: {
      css: {
        files: ['src/sass/**/*.scss'],
        tasks: ['styles'],
        options: {
            spawn: false
        }
      },
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['scripts'],
        options: {
            spawn: false
        }
      }
    },

    // clean
    clean: [
      'dist/',
      'src/css/**/*.css'
    ],

    // copy
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/css/fonts/',
          src: ['**'],
          dest: 'dist/fonts/'
        }]
      }
    }
  });

  // load NPM modules
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // register tasks
  grunt.registerTask('styles', ['sass', 'autoprefixer', 'cssmin', 'copy']);
  grunt.registerTask('scripts', ['uglify']);
  grunt.registerTask('default', ['clean', 'styles', 'scripts']);
}
