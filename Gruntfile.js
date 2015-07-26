module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        files: {
          "css/app.css": "css/app.less"
        }
      }
    },
    //Minify css
    cssmin: {
      css: {
        src: 'css/app.css',
        dest:'css/app.min.css'
      }
    },


    /**
     * Compresses Image files
     * Compresses all jpg, png images
     */
    imagemin: {
      build: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: '*.{jpg,jpeg,png}',
          dest: 'images/'
        }]
      }
    },   


    // Simple config to run sass, jshint and uglify any time a js or sass file is added, modified or deleted
    watch: {
      less:{
        files:'css/app.less',
        tasks:['less']
      },
      cssmin: {
        files : ['<%= cssmin.css.src %>'],
        tasks: ['cssmin']
      },
      imagemin: {
        files: 'images/*.{jpg,jpeg,png}',
        tasks: ['imagemin']
      }
    }
  });

  // Load the plug-ins
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default tasks
  grunt.registerTask('default', 
    [ 'less',
      'cssmin',
      'imagemin'
    ]
  );
};
