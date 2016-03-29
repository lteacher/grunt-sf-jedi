'use strict'

var Force = require('sf-jedi');

/**
 * Module export for the grunt task setup
 * @param grunt - This is grunt as provided by the load[Npm]Tasks function
 */
module.exports = function(grunt) {
  grunt.registerMultiTask('force', 'A suite of grunt tasks for salesforce development', function() {
    // Set the task defaults here
    let defaults = {
      username: process.env.SF_USERNAME,
      password: process.env.SF_PASSWORD,
      token: process.env.SF_TOKEN,
      host: process.env.SF_HOST,
      apiVersion: 34.0,
      logLevel: 'info'
    }

    // Mixin any provided options
    defaults = this.options(defaults);

    // Create the force object
    try {
      let force = new Force(defaults);


      // All the force tasks are async
      let done = this.async();

      // Call the relevant method
      force[this.target]()
        .then(result => done())
        .catch(err => {
          grunt.log.writeln(err);
          done();
        });
    } catch (e) {
      grunt.log.error(e);
    }
  });
};
