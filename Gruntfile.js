module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                files : {
                    'dialog/build/dialog.base.js': ['dialog/src/dialog.base.config.js', 'dialog/src/dialog.base.events.js', 'dialog/src/dialog.base.private.js', 'dialog/src/dialog.base.methods.js']
                }
            }
        },
        copy: {
            options: {},
            files: {
                'dialog/build/': ['dialog/src/dialog.jqueryui.js', 'dialog/src/dialog.foundation.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'copy']);

};