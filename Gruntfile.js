module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dialog: {
                files : {
                    'build/modular/dialog/js/dialog.base.js': ['src/dialog/js/dialog.base.config.js', 'src/dialog/js/dialog.base.events.js', 'src/dialog/js/dialog.base.private.js', 'src/dialog/js/dialog.base.methods.js'],
                    'build/modular/dialog/js/dialog.jqueryui.js': ['src/dialog/js/dialog.jqueryui.js'],
                    'build/modular/dialog/js/dialog.foundation.js': ['src/dialog/js/dialog.foundation.js'],

                    'build/combined/js/dialog.js': ['build/modular/dialog/js/dialog.base.js', 'build/modular/dialog/js/dialog.jqueryui.js', 'build/modular/dialog/js/dialog.foundation.js'],

                    'build/modular/dialog/css/dialog.base.css': ['src/dialog/css/dialog.base.css'],
                    'build/modular/dialog/css/dialog.jqueryui.css': ['src/dialog/css/dialog.jqueryui.css'],
                    'build/modular/dialog/css/dialog.foundation.css': ['src/dialog/css/dialog.foundation.css'],

                    'build/combined/css/dialog.base.css': ['build/modular/dialog/css/dialog.base.css', 'build/modular/dialog/css/dialog.jqueryui.css', 'build/modular/dialog/css/dialog.foundation.css'],
                }
            },
            draggable: {
                files: {
                    'build/modular/draggable/js/draggable.base.js': ['src/draggable/js/draggable.base.js'],
                    'build/combined/js/draggable.js': ['src/draggable/js/draggable.base.js']
                }
            }
        },
        extractExamples: {
            files: {
                src: ['build/modular/dialog/js/*.js'],
                dest: 'examples/dialog/'
            }
        },
        replace: {
            minifyComments: {
                src: ['build/*.js'],      // source files array (supports minimatch)
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
                    'build/combined/js/dialog.min.js': ['build/combined/js/dialog.js'],
                    'build/modular/dialog/js/dialog.base.min.js': ['build/modular/dialog/js/dialog.base.js'],
                    'build/modular/dialog/js/dialog.jqueryui.min.js': ['build/modular/dialog/js/dialog.jqueryui.js'],
                    'build/modular/dialog/js/dialog.foundation.min.js': ['build/modular/dialog/js/dialog.foundation.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerMultiTask('extractExamples', 'Extract examples from js files', function () {
        var fs = require('fs'),
            dest = this.files[0].dest;

        if (fs.existsSync(dest + '../../index.html')) {
            fs.unlinkSync(dest + '../../index.html');
        }

        //make grunt know this task is async.
        var done = this.async();

        this.files.forEach(function (file) {
            //fs.readdirSync(file.dest).forEach(function (filename) {
            //    var filepath = file.dest + filename;
            //    fs.unlinkSync(filepath);
            //});
            grunt.log.writeln('Processing ' + file.src.length + ' files.');
            //file.src is the list of all matching file names.
            file.src.forEach(function (f) {
                fs.readFile(f, 'utf8', function (err, data) {
                    var i, j, k, isExampleMode, isExampleStart, result, lines, buffer, widget, plugin, field, filepath;
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
                            }
                            result = { text: '', name: '', libs: lines[i].replace(/\*.?\@example/g, '') };
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
                            if (result) {
                                buffer.push(result);
                            }
                            field = lines[i].substr(0, lines[i].indexOf(':')).trim();
                            k = 1;
                            for (j = 0; j < buffer.length; j++) {
                                if (buffer[j].name == '') {
                                    buffer[j].name = widget + '.' + plugin + '.' + field + '.' + k++;
                                }
                            }
                        }
                    }
                    writer.createHtmlFiles(fs, buffer, file.dest);                 
                    return null;
                });
            });
        });
    });

    // Default task(s).
    grunt.registerTask('default', ['concat', 'extractExamples', 'replace', 'uglify']);

};


var writer = {
    createHtmlFiles: function (fs, buffer, dest) {
        var i, filepath, libs, index = '';
        for (i = 0; i < buffer.length; i++) {
            if (buffer[i].text) {
                filepath = dest + buffer[i].name + ".html";
                fs.writeFileSync(filepath, writer.buildHtmlFile(buffer[i]));
                index += '<li><a href="' + filepath + '">' + buffer[i].name + '</a></li>\r\n';
            }
        }
        if (index) {
            fs.appendFileSync(dest + '../index.html', '<ul>\r\n' + index + '</ul>\r\n');
        }
    },

    buildHtmlFile: function (record) {
        return '<html>\r\n' +
            writer.analyzeLibs(record.libs) +
            '<body>\r\n' +
            record.text +
            '</body\r\n</html>';
    },

    analyzeLibs: function (libs) {
        var i, libs, result = '<head>\r\n';
        result += '  <script src="../../node_modules/jquery/dist/jquery.min.js"></script>\r\n';
        if (libs) {
            names = libs.replace('<!--', '').replace('-->', '').trim().split(',');
            for (i = 0; i < names.length; i++) {
                switch (names[i].trim())
                {
                    case 'bootstrap':
                        result += '  <link href="../../node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">\r\n';
                        result += '  <link href="../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'dialog.base':
                        result += '  <script src="../../build/modular/dialog/js/dialog.base.js"></script>\r\n';
                        result += '  <link href="../../build/modular/dialog/css/dialog.base.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'draggable.base':
                        result += '  <script src="../../build/modular/draggable/js/draggable.base.js"></script>\r\n';
                        break;
                }
            }
        }
        result += '</head>\r\n';
        return result;
    }
};