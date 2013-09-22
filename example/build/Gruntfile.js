module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    lint : {
      files : [ 'grunt.js', '../js/**/*.js' ]
    },
    watch : {
      options : {
        livereload : true,
        spawn: false
      },
      css : {
        files : ['../css/**/*.scss'],
        tasks : ['sass', 'cssmin'],
      },
      js : {
        files : ['../js/**/*.js', '!../js/**/*.min.js'],
        tasks : 'uglify',
      }

    },
    uglify : {
      js : {
        files : {'../js/app.min.js' : ['../js/app.js']}
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
    cssmin : {
      compress : {
        files : {'../css/all.min.css' : ['../css/all.css']}
      }
    }
  });

  // tasks that are pulled form npm repo
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // local defined taks
  grunt.loadTasks('example-local-plugin/tasks');

  // Default task.
  grunt.registerTask('default', ['sass', 'cssmin', 'uglify']);

  // just example task for file access. Better don't do this here
  // as this should got to a plugin instead to have only configs
  // in Gruntfile.js. Shows how to declare simple tasks inline anyway
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