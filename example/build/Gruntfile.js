module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    lint : {
      files : [ 'grunt.js', '../js/**/*.js' ]
    },
    watch : {
      css : {
        files : ['../css/**/*.scss'],
        tasks : ['sass', 'mincss']
      },
      js : {
        files : ['../js/**/*.js'],
        tasks : 'min'
      }

    },
    uglify : {
      js : {
        files : {'../js/app.min.js' : ['../js/app.min.js']}
      }
    },
    sass : {
      scss : {
        src : '../css/main.scss',
        dest : '../css/main.css'
      }
    },
    mincss : {
      compress : {
        files : {'../css/main.min.css' : ['../css/main.css']}
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', 'sass cssmin min');

  // example task for file access
  grunt.registerTask('touchindex', 'Touches Index', function() {
    var fs = require('fs');

    var source = fs.readFileSync('../index.html', 'utf-8');

    output = source.replace(
        /<span class="invisible">.*<\/span>/g,
        '<span class="invisible">'+ new Date() +'<\/span>'
        );

    fs.writeFileSync('../index.html', output, 'utf-8');

  });

};