const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const gifsicle = require('imagemin-gifsicle');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
       files: [{
           expand: true,
           cwd: "app",
           src: '**',
           dest: 'dist/'
       }]
     }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['style.css', '!*.min.css'],
          dest: 'dist/',
          ext: '.css'
        }]
      }
    },
    imagemin: {
      target: {
        options: {
          optimizationLevel: 3,
          progressive: true,
          use: [pngquant(), mozjpeg(), gifsicle()]
        }, // options
              files: [{
                  expand: true,
                  cwd: 'app/images/',
                  src: ['**/*.{png,jpg,gif}'],
                  dest: 'dist/images/'
              }]
      }
    },
    browserSync: {
      dev:  {
        bsFiles: {
          src: [
            'dist/style.css',
            'dist/*.html'
          ]
        },
        options:  {
          watchTask: true,
          server: 'dist/'
        }
      }
    },

    watch: {
      css: {
          files: 'app/style.css',
          tasks: ['cssmin']
      },
      imageopti: {
          files: ['app/images/*.*'],
          tasks: ['imagemin']
     }
    }
  });

  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.registerTask('default', ['browserSync', 'watch']);

}
