module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    { cwd: 'node_modules/jquery/dist', src: '**/*', dest: 'dist/libraries/jquery', expand: true },
                    { cwd: 'node_modules/bootstrap/dist', src: '**/*', dest: 'dist/libraries/bootstrap', expand: true },
                    { cwd: 'node_modules/jquery-ui/themes/base', src: '**/*', dest: 'dist/libraries/jquery-ui', expand: true },
                    { cwd: 'src/dialog/js/messages', src: '**/*', dest: 'dist/modular/dialog/js/messages', expand: true },
                    { cwd: 'src/grid/js/messages', src: '**/*', dest: 'dist/modular/grid/js/messages', expand: true }
                ]
            }
        },
        extractExamples: {
            generate: {
                files: [
                    { src: ['src/dialog/js/*.js'], dest: 'examples/dialog/' },
                    { src: ['src/draggable/js/*.js'], dest: 'examples/draggable/' },
                    { src: ['src/droppable/js/*.js'], dest: 'examples/droppable/' },
                    { src: ['src/grid/js/*.js'], dest: 'examples/grid/' },
                    { src: ['src/tree/js/*.js'], dest: 'examples/tree/' },
                    { src: ['src/checkbox/js/*.js'], dest: 'examples/checkbox/' }
                ]
            }
        },
        concat: {
            dialog: {
                files : {
                    'dist/modular/dialog/js/dialog.code.js': ['src/dialog/js/messages/messages.en-us.js', 'src/dialog/js/dialog.base.config.js', 'src/dialog/js/dialog.base.events.js', 'src/dialog/js/dialog.base.methods.js', 'src/dialog/js/dialog.base.widget.js'],
                    'dist/modular/dialog/css/dialog.code.css': ['src/dialog/css/dialog.base.css']
                }
            },
            draggable: {
                files: {
                    'dist/modular/draggable/js/draggable.code.js': ['src/draggable/js/draggable.base.js']
                }
            },
            droppable: {
                files: {
                    'dist/modular/droppable/js/droppable.code.js': ['src/droppable/js/droppable.base.js']
                }
            },
            grid: {
                files: {
                    'dist/modular/grid/js/grid.code.js': ['src/grid/js/messages/messages.en-us.js', 'src/grid/js/grid.base.config.js', 'src/grid/js/grid.base.events.js', 'src/grid/js/grid.base.methods.js', 'src/grid/js/grid.base.widget.js',
                        'src/grid/js/grid.expandCollapseRows.js', 'src/grid/js/grid.inlineEditing.js', 'src/grid/js/grid.optimisticPersistence.js', 'src/grid/js/grid.pagination.js',
                        'src/grid/js/grid.responsiveDesign.js', 'src/grid/js/grid.toolbar.js', 'src/grid/js/grid.resizableColumns.js', 'src/grid/js/grid.rowReorder.js',
                        'src/grid/js/grid.columnReorder.js', 'src/grid/js/grid.headerFilter.js'],

                    'dist/modular/grid/css/grid.code.css': ['src/grid/css/grid.base.css', 'src/grid/css/grid.responsiveDesign.css', 'src/grid/css/grid.pagination.css',
                        'src/grid/css/grid.resizableColumns.css', 'src/grid/css/grid.rowReorder.css', 'src/grid/css/grid.columnReorder.css']
                }
            },
            tree: {
                files: {
                    'dist/modular/tree/js/tree.code.js': ['src/tree/js/tree.base.config.js', 'src/tree/js/tree.base.events.js', 'src/tree/js/tree.base.methods.js', 'src/tree/js/tree.base.widget.js', 'src/tree/js/tree.checkboxes.js', 'src/tree/js/tree.dragAndDrop.js'],
                    'dist/modular/tree/css/tree.code.css': ['src/tree/css/tree.base.css', 'src/tree/css/tree.dragAndDrop.css']
                }
            },
            checkbox: {
                files: {
                    'dist/modular/checkbox/js/checkbox.code.js': ['src/checkbox/js/checkbox.base.js'],
                    'dist/modular/checkbox/css/checkbox.code.css': ['src/checkbox/css/checkbox.base.css']
                }
            },
            final: {
                files: {
                    'dist/modular/draggable/js/draggable.js': ['src/draggable/js/header.txt', 'src/widget.js', 'dist/modular/draggable/js/draggable.code.js'],
                    'dist/modular/droppable/js/droppable.js': ['src/droppable/js/header.txt', 'src/widget.js', 'dist/modular/droppable/js/droppable.code.js'],
                    'dist/modular/dialog/js/dialog.js': ['src/dialog/js/header.txt', 'src/widget.js', 'dist/modular/dialog/js/dialog.code.js'],
                    'dist/modular/dialog/css/dialog.css': ['src/widget.css', 'dist/modular/dialog/css/dialog.code.css'],
                    'dist/modular/grid/js/grid.js': ['src/grid/js/header.txt', 'src/widget.js', 'dist/modular/grid/js/grid.code.js'],
                    'dist/modular/grid/css/grid.css': ['src/widget.css', 'dist/modular/grid/css/grid.code.css'],
                    'dist/modular/tree/js/tree.js': ['src/tree/js/header.txt', 'src/widget.js', 'dist/modular/tree/js/tree.code.js'],
                    'dist/modular/tree/css/tree.css': ['src/widget.css', 'dist/modular/tree/css/tree.code.css'],
                    'dist/modular/checkbox/js/checkbox.js': ['src/checkbox/js/header.txt', 'src/widget.js', 'dist/modular/checkbox/js/checkbox.code.js'],
                    'dist/modular/checkbox/css/checkbox.css': ['src/widget.css', 'dist/modular/checkbox/css/checkbox.code.css'],
                    
                    'dist/combined/js/gijgo.js': ['src/header.txt', 'src/widget.js', 'dist/modular/dialog/js/dialog.code.js', 'dist/modular/draggable/js/draggable.code.js', 'dist/modular/droppable/js/droppable.code.js', 'dist/modular/grid/js/grid.code.js', 'dist/modular/tree/js/tree.code.js', 'dist/modular/checkbox/js/checkbox.code.js'],
                    'dist/combined/css/gijgo.css': ['src/widget.css', 'dist/modular/dialog/css/dialog.code.css', 'dist/modular/grid/css/grid.code.css', 'dist/modular/tree/css/tree.code.css', 'dist/modular/checkbox/css/checkbox.code.css'],
                    'dist/combined/js/messages/messages.bg-bg.js': ['src/dialog/js/messages/messages.bg-bg.js', 'src/grid/js/messages/messages.bg-bg.js'],
                    'dist/combined/js/messages/messages.fr-fr.js': ['src/dialog/js/messages/messages.fr-fr.js', 'src/grid/js/messages/messages.fr-fr.js'],
                    'dist/combined/js/messages/messages.de-de.js': ['src/dialog/js/messages/messages.de-de.js', 'src/grid/js/messages/messages.de-de.js']
                }
            }
        },
        clean: ['dist/modular/**/js/*.code.js', 'dist/modular/**/css/*.code.css'],
        replace: {
            minifyComments: {
                src: ['dist/modular/*/*.js', 'dist/combined/*.js'], // source files array (supports minimatch)
                overwrite: true, // overwrite matched source files 
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
                                result = result.replace(/\n$/, "") + lines[i];
                            }
                        }
                        return result;
                    }
                }]
            }
        },
        uglify: {
            options: {},
            combined: {
                files: {
                    'dist/combined/js/gijgo.min.js': ['dist/combined/js/gijgo.js']
                }
            },
            modular: {
                files: {
                    'dist/modular/draggable/js/draggable.min.js': ['dist/modular/draggable/js/draggable.js'],
                    'dist/modular/droppable/js/droppable.min.js': ['dist/modular/droppable/js/droppable.js'],
                    'dist/modular/dialog/js/dialog.min.js': ['dist/modular/dialog/js/dialog.js'],
                    'dist/modular/grid/js/grid.min.js': ['dist/modular/grid/js/grid.js'],
                    'dist/modular/tree/js/tree.min.js': ['dist/modular/tree/js/tree.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [
                    { expand: true, cwd: 'dist/combined/css', src: ['*.css', '!*.min.css'], dest: 'dist/combined/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/dialog/css', src: ['dialog.css'], dest: 'dist/modular/dialog/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/tree/css', src: ['tree.css'], dest: 'dist/modular/tree/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/grid/css', src: ['grid.css'], dest: 'dist/modular/grid/css', ext: '.min.css' }
                ]
            }
        },
        watch: {
            files: ['src/**/*.js', 'src/**/*.css'],
            tasks: ['copy', 'extractExamples', 'concat', 'clean', 'replace', 'uglify', 'cssmin']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerMultiTask('extractExamples', 'Extract examples from js files', function () {
        var fs = require('fs');

        this.files.forEach(function (file) {
            fs.readdirSync(file.dest).forEach(function (filename) {
                var filepath = file.dest + filename;
                fs.unlinkSync(filepath);
            });
            grunt.log.writeln('Processing ' + file.src.length + ' files.');
            //file.src is the list of all matching file names.
            file.src.forEach(function (f) {
                var i, isExampleMode, isExampleStart, result, lines, buffer, widget, plugin, alias, field, data, exampleInfo;
                data = fs.readFileSync(f, 'utf8');
                    
                isExampleMode = false;
                lines = data.split('\n');
                result = { text: '', name: '', libs: '' };
                buffer = [];
                for (i = 0; i < lines.length; i++) {
                    if (/\*.?\@widget/g.test(lines[i])) {
                        widget = lines[i].replace(/\*.?\@widget/g, '').trim();
                    } else if (/\*.?\@plugin/g.test(lines[i])) {
                        plugin = lines[i].replace(/\*.?\@plugin/g, '').trim();
                    } else if (/\*.?\@alias/g.test(lines[i])) {
                        alias = lines[i].replace(/\*.?\@alias/g, '').trim();
                    }
                        
                    if (/\*.?\@example/g.test(lines[i])) {
                        isExampleMode = true;
                        isExampleStart = true;
                        if (result) {
                            buffer.push(result);
                        }
                        exampleInfo = lines[i].replace(/\*.?\@example/g, '').trim();
                        result = {
                            text: '',
                            name: '',
                            libs: exampleInfo.indexOf('<') === 0 ? exampleInfo : exampleInfo.substring(exampleInfo.indexOf(' ') + 1),
                            exampleName: exampleInfo.indexOf('<') === 0 ? undefined : exampleInfo.substring(0, exampleInfo.indexOf(' '))
                        };
                    } else if (isExampleMode && /\*\//g.test(lines[i])) {
                        isExampleMode = false;
                        if (result) {
                            buffer.push(result);
                            result = undefined;
                        }
                    }

                    if (isExampleMode) {
                        if (isExampleStart) {
                            isExampleStart = false;
                        } else {
                            result.text += lines[i].trim().replace('*', '') + '\r\n';
                        }
                    } else if (/^\s+[A-Za-z]+\:\s/g.test(lines[i])) {
                        field = alias || lines[i].substr(0, lines[i].indexOf(':')).trim();
                        alias = undefined;
                        writer.updateMissingNames(buffer, widget, plugin, field);
                    } else if (/^\s+self\..+=[ ]function/g.test(lines[i])) {
                        field = alias || lines[i].substring(lines[i].indexOf('.') + 1, lines[i].indexOf('=')).trim();
                        alias = undefined;
                        writer.updateMissingNames(buffer, widget, plugin, field);
                    }
                }
                writer.createHtmlFiles(fs, buffer, file.dest);                 
                return null;
            });
        });
    });

    // Default task(s).
    grunt.registerTask('default', ['copy', 'extractExamples', 'concat', 'clean', 'replace', 'uglify', 'cssmin', 'watch']);
};


var writer = {
    createHtmlFiles: function (fs, buffer, dest) {
        var i, filename, libs, index = '';
        for (i = 0; i < buffer.length; i++) {
            if (buffer[i].text) {
                filename = buffer[i].name + ".html";
                fs.writeFileSync(dest + filename, writer.buildHtmlFile(buffer[i]));
                index += '<li><a href="' + filename + '">' + buffer[i].name + '</a></li>\r\n';
            }
        }
        if (index) {
            fs.appendFileSync(dest + 'index.html', '<ul>\r\n' + index + '</ul>\r\n');
        }
    },

    updateMissingNames: function (buffer, widget, plugin, field) {
        var j, k = 1;
        for (j = 0; j < buffer.length; j++) {
            if (buffer[j].name === '' && buffer[j].text) {
                buffer[j].name = widget + '.' + plugin.split(' ').join('') + '.' + field + '.' + (buffer[j].exampleName || k);
                k++;
            }
        }
    },

    buildHtmlFile: function (record) {
        return '<html>\r\n' +
            writer.analyzeLibs(record.libs) +
            '<body>\r\n' +
            record.text +
            '</body>\r\n</html>';
    },

    analyzeLibs: function (libs) {
        var i, libs, local = false, result = '<head>\r\n';
        result += '  <meta charset="utf-8">\r\n';
        result += '  <meta name="viewport" content="width=device-width, initial-scale=1">\r\n';
        result += '  <title>Example</title>\r\n';
        if (local) {
            result += '  <script src="../../dist/libraries/jquery/jquery.min.js"></script>\r\n';
        } else {
            result += '  <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>\r\n';
        }
        if (libs) {
            names = libs.replace('<!--', '').replace('-->', '').trim().split(',');
            for (i = 0; i < names.length; i++) {
                //include css files
                switch (names[i].trim()) {
                    case 'bootstrap':
                        if (local) {
                            result += '  <link href="../../dist/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">\r\n';
                            result += '  <link href="../../dist/libraries/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">\r\n';
                        } else {
                            result += '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">\r\n';
                            result += '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">\r\n';
                        }
                        break;
                    case 'foundation':
                        result += '  <link href="http://cdn.foundation5.zurb.com/foundation.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'materialdesign':
                        //result += '  <script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>\r\n';
                        result += '  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">\r\n';
                        result += '  <link href="https://code.getmdl.io/1.2.1/material.indigo-pink.min.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'jqueryui':
                        if (local) {
                            result += '  <link href="../../dist/libraries/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css">\r\n';
                            result += '  <link href="../../dist/libraries/jquery-ui/jquery-ui.theme.min.css" rel="stylesheet" type="text/css">\r\n';
                        } else {
                            result += '  <link href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css">\r\n';
                        }
                        break;
                    case 'dialog.base':
                        result += '  <link href="../../dist/modular/dialog/css/dialog.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'grid.base':
                        result += '  <link href="../../dist/modular/grid/css/grid.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'tree.base':
                        result += '  <link href="../../dist/modular/tree/css/tree.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'checkbox':
                        result += '  <link href="../../dist/modular/checkbox/css/checkbox.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                }
            }
            for (i = 0; i < names.length; i++) {
                //include js files
                switch (names[i].trim()) {
                    case 'dialog.base':
                        result += '  <script src="../../dist/modular/dialog/js/dialog.js"></script>\r\n';
                        break;
                    case 'draggable.base':
                        result += '  <script src="../../dist/modular/draggable/js/draggable.js"></script>\r\n';
                        break;
                    case 'droppable.base':
                        result += '  <script src="../../dist/modular/droppable/js/droppable.js"></script>\r\n';
                        break;
                    case 'grid.base':
                        result += '  <script src="../../dist/modular/grid/js/grid.js"></script>\r\n';
                        break;
                    case 'tree.base':
                        result += '  <script src="../../dist/modular/tree/js/tree.js"></script>\r\n';
                        break;
                    case 'checkbox':
                        result += '  <script src="../../dist/modular/checkbox/js/checkbox.js"></script>\r\n';
                        break;
                }
            }
        }
        result += '</head>\r\n';
        return result;
    }
};