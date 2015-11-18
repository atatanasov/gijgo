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
        extractExamples: {
            files: {
                src: ['dialog/src/*.js'],
                dest: 'dialog/examples/'
            }
        },
        replace: {
            minifyComments: {
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
                                result = result.replace(/\n$/, "") + ' */\n';
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

    grunt.registerMultiTask('extractExamples', 'Extract examples from js files', function () {
        var fs = require('fs'),
            self = this;

        grunt.log.write('Loaded dependencies...').ok();

        //make grunt know this task is async.
        var done = this.async();

        this.files.forEach(function (file) {
            grunt.log.writeln('Processing ' + file.src.length + ' files.');
            //file.src is the list of all matching file names.
            file.src.forEach(function (f) {
                fs.readFile(f, 'utf8', function (err, data) {
                    var i, j, isExampleMode, isExampleStart, result, lines, buffer, widget, plugin, field;
                    if (err) {
                        return console.log(err);
                    }
                    
                    isExampleMode = false;
                    lines = data.split('\n');
                    result = { text: '', name: '', libs: '' };
                    buffer = [];
                    for (i = 0; i < lines.length; i++) {
                        if (/\*.?\@widget/g.test(lines[i])) {
                            widget = lines[i].replace(/\*.?\@widget/g, '').trim();
                        } else if (/\*.?\@plugin/g.test(lines[i])) {
                            plugin = lines[i].replace(/\*.?\@plugin/g, '').trim();
                        }
                        
                        if (/\*.?\@example/g.test(lines[i])) {
                            isExampleMode = true;
                            isExampleStart = true;
                            if (result) {
                                buffer.push(result);
                                result = { text: '', name: '', libs: lines[i].replace(/\*.?\@example/g, '') };
                            }
                        } else if (isExampleMode && /\*\//g.test(lines[i])) {
                            isExampleMode = false;
                            isExampleStart = false;
                        }

                        if (isExampleMode) {
                            if (isExampleStart) {
                                //TODO: parse references
                                isExampleStart = false;
                            } else {
                                result.text += lines[i].trim().replace('*', '') + '\r\n';
                            }
                        } else if (/^\s+[A-Za-z]+\:\s/g.test(lines[i])) {
                            field = lines[i].substr(0, lines[i].indexOf(':')).trim();
                            for (j = 0; j < buffer.length; j++) {
                                if (!buffer[j].name) {
                                    buffer[j].name = widget + '.' + plugin + '.' + field;
                                }
                            }
                        }
                    }
                    for (i = 0; i < buffer.length; i++) {                        
                        fs.writeFile(file.dest + buffer[i].name + ".html", buffer[i].libs + '\r\n' + buffer[i].text, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                        });
                    }                    
                    return null;
                });
            });
        });
    });

    // Default task(s).
    grunt.registerTask('default', ['concat', 'extractExamples', 'replace', 'uglify']);

};