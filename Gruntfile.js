var util = require('./lib/grunt');
module.exports = function(grunt) {
  grunt.initConfig({
    root: __dirname,


    bower_copy: {
      bower: {
        files: [{
          expand: true,
          cwd: 'bower_components/Ink',
          src: ['css/ink.css', 'css/ink-ie7.css', 'js/ink-all.js'],
          dest: 'build'
        }, {
          expand: true,
          cwd: 'bower_components/Ink',
          src: ['font/*'],
          dest: 'build'
        }, {
          expand: true,
          cwd: 'bower_components/angular',
          src: ['angular.js'],
          dest: 'build/js'
        }, {
          expand: true,
          cwd: 'bower_components/angular-ui-router/release',
          src: ['angular-ui-router.js'],
          dest: 'build/js'
        }, {
          expand: true,
          cwd: 'bower_components/underscore.string/lib',
          src: ['underscore.string.js'],
          dest: 'build/js'
        }]
      },
      example: {
        files: [{
          expand: true,
          cwd: 'example',
          src: ['**/*.html', '**/*.tpl'],
          dest: 'build'
        }]
      },
      example_css: {
        files: [{
          expand: true,
          cwd: 'example',
          src: ['css/*.css'],
          dest: 'build'
        }]
      },
      example_img: {
        files: [{
          expand: true,
          cwd: 'example',
          src: ['img/**/*'],
          dest: 'build'
        }]
      }
    },


    concat: {
      example_js: {
        src: ['example/js/app.js', 'example/js/**/*.js'],
        dest: 'build/js/app.js'
      }
    },


    connect: {
      server: {
        options: {
          livereload: true,
          keepalive: true,
          base: 'build',
          port: process.env.PORT || 8000
        },
      }
    },


    "ghPages": {
      options: {
        base: "build",
        branch: "gh-pages",
        repo: "https://github.com/caitp/ng-ink.git"
      },
      src: ["**/*"]
    },


    parallel: {
      server: {
        tasks: [{
          grunt: true,
          args: ['watch']
        }, {
          grunt: true,
          args: ['connect:server']
        }]
      }
    },


    watch: {
      example_html: {
        files: ['example/**/*.html', 'example/**/*.tpl'],
        tasks: ['bower_copy:example'],
        options: {
          livereload: true
        }
      },
      example_css: {
        files: ['example/**/*.css'],
        tasks: ['bower_copy:example_css'],
        options: {
          livereload: true
        }
      },
      example_js: {
        files: ['example/**/*.js'],
        tasks: ['concat:example_js'],
        options: {
          livereload: true
        }
      },
      example_img: {
        files: ['example/img/**/*'],
        tasks: ['copy:example_img'],
        options: {
          livereload: true
        }
      },
      src: {
        files: ['src/**/*.js'],
        tasks: ['build'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadTasks('lib/grunt');

  grunt.renameTask('gh-pages', 'ghPages');
  grunt.registerTask('example', 'Build example files', ['build', 'bower_copy', 'concat']);
  grunt.registerTask('gh-pages', 'Push gh-pages site', ['example', 'ghPages']);
  grunt.registerTask('server', 'Run development server', ['example', 'parallel:server']);
};
