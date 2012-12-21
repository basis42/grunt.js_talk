
'use strict';

module.exports = function(grunt) {

  grunt.registerTask('hello', 'Writes greeting to console.', function() {
    console.log('Hello! This is the hello task!');
  });
};
