module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dialog: {
                files : {
                    'dialog/build/dialog.base.js': ['dialog/src/dialog.base.config.js', 'dialog/src/dialog.base.events.js', 'dialog/src/dialog.base.private.js', 'dialog/src/dialog.base.methods.js'],
                    'dialog/build/dialog.jqueryui.js': ['dialog/src/dialog.jqueryui.js'],
                    'dialog/build/dialog.foundation.js': ['dialog/src/dialog.foundation.js'],
                    'dialog/build/dialog.all.js': ['dialog/build/dialog.base.js', 'dialog/build/dialog.jqueryui.js', 'dialog/build/dialog.foundation.js']
                }
            }
        },
        replace: {
            dialog: {
                src: ['dialog/build/*.js'],      // source files array (supports minimatch) 
                overwrite: true,                 // overwrite matched source files 
                replacements: [{
                    from: /(.|\n|\r)+/g,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        var i,
                            isCommentMode = false,
                            isExtraCommentMode = false,
                            result = '',
                            lines = fullText.split('\n');
                        for (i = 0; i < lines.length; i++) {
                            if (/\/\*\*/g.test(lines[i])) {
                                isCommentMode = true;
                            } else if (/\*.?@/g.test(lines[i])) {
                                isExtraCommentMode = true;
                            }
                            if (isExtraCommentMode === false) {
                                result += lines[i] + '\n';
                            }
                            if (isCommentMode && /\*\//g.test(lines[i])) {
                                isCommentMode = false;
                                isExtraCommentMode = false;
                                result = result.replace(/\n$/, "") + ' */\n'
                            }
                        }
                        return result;
                    }
                }]
            }
        },
        uglify: {
            options: {},
            dialog: {
                files: {
                    'dialog/build/dialog.all.min.js': ['dialog/build/dialog.all.js'],
                    'dialog/build/dialog.base.min.js': ['dialog/build/dialog.base.js'],
                    'dialog/build/dialog.jqueryui.min.js': ['dialog/build/dialog.jqueryui.js'],
                    'dialog/build/dialog.foundation.min.js': ['dialog/build/dialog.foundation.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'replace', 'uglify']);

};