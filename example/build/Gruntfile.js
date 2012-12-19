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
        options : {
          debugInfo : true,
          lineNumber : true
        },
        files : {'../css/all.css' : ['../css/main.scss']}
      }
    },
    mincss : {
      compress : {
        files : {'../css/all.min.css' : ['../css/all.css']}
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['sass', 'mincss', 'uglify']);

  // just example task for file access, better don't do this here
  // as this should got to a plugin instead to have only configs
  // in Gruntfile.js
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