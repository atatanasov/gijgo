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
                    { cwd: 'src/fonts', src: '**/*', dest: 'dist/modular/fonts', expand: true },
                    { cwd: 'src/fonts', src: '**/*', dest: 'dist/combined/fonts', expand: true }
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
                    { src: ['src/checkbox/js/*.js'], dest: 'examples/checkbox/' },
                    { src: ['src/editor/js/*.js'], dest: 'examples/editor/' },
                    { src: ['src/dropdown/js/*.js'], dest: 'examples/dropdown/' },
                    { src: ['src/datepicker/js/*.js'], dest: 'examples/datepicker/' },
                    { src: ['src/timepicker/js/*.js'], dest: 'examples/timepicker/' },
                    { src: ['src/datetimepicker/js/*.js'], dest: 'examples/datetimepicker/' },
                    { src: ['src/slider/js/*.js'], dest: 'examples/slider/' },
                    { src: ['src/colorpicker/js/*.js'], dest: 'examples/colorpicker/' },
                    { src: ['src/core/js/*.js'], dest: 'examples/core/' }
                ]
            }
        },
        concat: {
            dialog: {
                files : {
                    'dist/modular/js/dialog.code.js': ['src/dialog/js/dialog.base.config.js', 'src/dialog/js/dialog.base.events.js', 'src/dialog/js/dialog.base.methods.js', 'src/dialog/js/dialog.base.widget.js', 'src/dialog/js/messages/messages.en-us.js'],
                    'dist/modular/css/dialog.code.css': ['src/dialog/css/dialog.base.css']
                }
            },
            draggable: {
                files: {
                    'dist/modular/js/draggable.code.js': ['src/draggable/js/draggable.base.js']
                }
            },
            droppable: {
                files: {
                    'dist/modular/js/droppable.code.js': ['src/droppable/js/droppable.base.js']
                }
            },
            grid: {
                files: {
                    'dist/modular/js/grid.code.js': ['src/grid/js/grid.base.config.js', 'src/grid/js/grid.base.events.js', 'src/grid/js/grid.base.methods.js', 'src/grid/js/grid.base.widget.js',
                        'src/grid/js/grid.fixedHeader.js', 'src/grid/js/grid.expandCollapseRows.js', 'src/grid/js/grid.inlineEditing.js', 'src/grid/js/grid.optimisticPersistence.js', 'src/grid/js/grid.pagination.js',
                        'src/grid/js/grid.responsiveDesign.js', 'src/grid/js/grid.toolbar.js', 'src/grid/js/grid.resizableColumns.js', 'src/grid/js/grid.rowReorder.js', 'src/grid/js/grid.export.js',
                        'src/grid/js/grid.columnReorder.js', 'src/grid/js/grid.headerFilter.js', 'src/grid/js/grid.grouping.js', 'src/grid/js/messages/messages.en-us.js'],

                    'dist/modular/css/grid.code.css': ['src/grid/css/grid.base.css', 'src/grid/css/grid.responsiveDesign.css', 'src/grid/css/grid.pagination.css',
                        'src/grid/css/grid.resizableColumns.css', 'src/grid/css/grid.rowReorder.css', 'src/grid/css/grid.columnReorder.css', 'src/grid/css/grid.inlineEditing.css',
                        'src/grid/css/grid.headerFilter.css', 'src/grid/css/grid.toolbar.css', 'src/grid/css/grid.fixedHeader.css']
                }
            },
            tree: {
                files: {
                    'dist/modular/js/tree.code.js': ['src/tree/js/tree.base.config.js', 'src/tree/js/tree.base.events.js', 'src/tree/js/tree.base.methods.js', 'src/tree/js/tree.base.widget.js', 'src/tree/js/tree.checkboxes.js', 'src/tree/js/tree.dragAndDrop.js', 'src/tree/js/tree.lazyLoading.js'],
                    'dist/modular/css/tree.code.css': ['src/tree/css/tree.base.css', 'src/tree/css/tree.dragAndDrop.css']
                }
            },
            checkbox: {
                files: {
                    'dist/modular/js/checkbox.code.js': ['src/checkbox/js/checkbox.base.js'],
                    'dist/modular/css/checkbox.code.css': ['src/checkbox/css/checkbox.base.css']
                }
            },
            editor: {
                files: {
                    'dist/modular/js/editor.code.js': ['src/editor/js/editor.base.js', 'src/editor/js/messages/messages.en-us.js'],
                    'dist/modular/css/editor.code.css': ['src/editor/css/editor.base.css']
                }
            },
            dropdown: {
                files: {
                    'dist/modular/js/dropdown.code.js': ['src/dropdown/js/dropdown.base.js'],
                    'dist/modular/css/dropdown.code.css': ['src/dropdown/css/dropdown.base.css']
                }
            },
            datepicker: {
                files: {
                    'dist/modular/js/datepicker.code.js': ['src/datepicker/js/datepicker.base.js'],
                    'dist/modular/css/datepicker.code.css': ['src/datepicker/css/datepicker.base.css']
                }
            },
            timepicker: {
                files: {
                    'dist/modular/js/timepicker.code.js': ['src/timepicker/js/timepicker.base.js'],
                    'dist/modular/css/timepicker.code.css': ['src/timepicker/css/timepicker.base.css']
                }
            },
            datetimepicker: {
                files: {
                    'dist/modular/js/datetimepicker.code.js': ['src/datetimepicker/js/datetimepicker.base.js'],
                    'dist/modular/css/datetimepicker.code.css': ['src/datetimepicker/css/datetimepicker.base.css']
                }
            },
            slider: {
                files: {
                    'dist/modular/js/slider.code.js': ['src/slider/js/slider.base.js'],
                    'dist/modular/css/slider.code.css': ['src/slider/css/slider.base.css']
                }
            },
            colorpicker: {
                files: {
                    'dist/modular/js/colorpicker.code.js': ['src/colorpicker/js/colorpicker.base.js'],
                    'dist/modular/css/colorpicker.code.css': ['src/colorpicker/css/colorpicker.base.css']
                }
            },
            final: {
                files: {
                    'dist/modular/js/core.js': ['src/header.txt', 'src/core/js/core.js', 'src/picker/js/picker.base.js', 'src/core/js/messages/messages.bg-bg.js', 'src/core/js/messages/messages.fr-fr.js', 'src/core/js/messages/messages.de-de.js', 'src/core/js/messages/messages.pt-br.js', 'src/core/js/messages/messages.ru-ru.js', 'src/core/js/messages/messages.es-es.js', 'src/core/js/messages/messages.it-it.js', 'src/core/js/messages/messages.tr-tr.js', 'src/core/js/messages/messages.ja-jp.js', 'src/core/js/messages/messages.zh-cn.js', 'src/core/js/messages/messages.zh-tw.js'],
                    'dist/modular/css/core.css': ['src/core/css/core.css', 'src/icons/icons.css'],
                    'dist/modular/js/draggable.js': ['src/draggable/js/header.txt', 'dist/modular/js/draggable.code.js'],
                    'dist/modular/js/droppable.js': ['src/droppable/js/header.txt', 'dist/modular/js/droppable.code.js'],
                    'dist/modular/js/dialog.js': ['src/dialog/js/header.txt', 'dist/modular/js/dialog.code.js', 'src/dialog/js/messages/messages.bg-bg.js', 'src/dialog/js/messages/messages.fr-fr.js', 'src/dialog/js/messages/messages.de-de.js', 'src/dialog/js/messages/messages.pt-br.js', 'src/dialog/js/messages/messages.ru-ru.js', 'src/dialog/js/messages/messages.es-es.js', 'src/dialog/js/messages/messages.it-it.js', 'src/dialog/js/messages/messages.tr-tr.js', 'src/dialog/js/messages/messages.ja-jp.js', 'src/dialog/js/messages/messages.zh-cn.js', 'src/dialog/js/messages/messages.zh-tw.js'],
                    'dist/modular/css/dialog.css': ['dist/modular/css/dialog.code.css'],
                    'dist/modular/js/grid.js': ['src/grid/js/header.txt', 'dist/modular/js/grid.code.js', 'src/grid/js/messages/messages.bg-bg.js', 'src/grid/js/messages/messages.fr-fr.js', 'src/grid/js/messages/messages.de-de.js', 'src/grid/js/messages/messages.pt-br.js', 'src/grid/js/messages/messages.ru-ru.js', 'src/grid/js/messages/messages.es-es.js', 'src/grid/js/messages/messages.it-it.js', 'src/grid/js/messages/messages.tr-tr.js', 'src/grid/js/messages/messages.ja-jp.js', 'src/grid/js/messages/messages.zh-cn.js', 'src/grid/js/messages/messages.zh-tw.js'],
                    'dist/modular/css/grid.css': ['dist/modular/css/grid.code.css'],
                    'dist/modular/js/tree.js': ['src/tree/js/header.txt', 'dist/modular/js/tree.code.js'],
                    'dist/modular/css/tree.css': ['dist/modular/css/tree.code.css'],
                    'dist/modular/js/checkbox.js': ['src/checkbox/js/header.txt', 'dist/modular/js/checkbox.code.js'],
                    'dist/modular/css/checkbox.css': ['dist/modular/css/checkbox.code.css'],
                    'dist/modular/js/editor.js': ['src/editor/js/header.txt', 'dist/modular/js/editor.code.js', 'src/editor/js/messages/messages.bg-bg.js', 'src/editor/js/messages/messages.fr-fr.js', 'src/editor/js/messages/messages.de-de.js', 'src/editor/js/messages/messages.pt-br.js', 'src/editor/js/messages/messages.ru-ru.js', 'src/editor/js/messages/messages.es-es.js', 'src/editor/js/messages/messages.it-it.js', 'src/editor/js/messages/messages.tr-tr.js', 'src/editor/js/messages/messages.ja-jp.js', 'src/editor/js/messages/messages.zh-cn.js', 'src/editor/js/messages/messages.zh-tw.js'],
                    'dist/modular/css/editor.css': ['dist/modular/css/editor.code.css'],
                    'dist/modular/js/dropdown.js': ['src/dropdown/js/header.txt', 'dist/modular/js/dropdown.code.js'],
                    'dist/modular/css/dropdown.css': ['dist/modular/css/dropdown.code.css'],
                    'dist/modular/js/datepicker.js': ['src/datepicker/js/header.txt', 'dist/modular/js/datepicker.code.js'],
                    'dist/modular/css/datepicker.css': ['dist/modular/css/datepicker.code.css'],
                    'dist/modular/js/timepicker.js': ['src/timepicker/js/header.txt', 'dist/modular/js/timepicker.code.js'],
                    'dist/modular/css/timepicker.css': ['dist/modular/css/timepicker.code.css'],
                    'dist/modular/js/datetimepicker.js': ['src/datetimepicker/js/header.txt', 'dist/modular/js/datetimepicker.code.js'],
                    'dist/modular/css/datetimepicker.css': ['dist/modular/css/datetimepicker.code.css'],
                    'dist/modular/js/slider.js': ['src/slider/js/header.txt', 'dist/modular/js/slider.code.js'],
                    'dist/modular/css/slider.css': ['dist/modular/css/slider.code.css'],
                    'dist/modular/js/colorpicker.js': ['src/colorpicker/js/header.txt', 'dist/modular/js/colorpicker.code.js'],
                    'dist/modular/css/colorpicker.css': ['dist/modular/css/colorpicker.code.css'],
                    
                    'dist/combined/js/gijgo.js': ['src/header.txt', 'src/core/js/core.js', 'src/picker/js/picker.base.js', 'dist/modular/js/dialog.code.js', 'dist/modular/js/draggable.code.js', 'dist/modular/js/droppable.code.js', 'dist/modular/js/grid.code.js', 'dist/modular/js/tree.code.js', 'dist/modular/js/checkbox.code.js', 'dist/modular/js/editor.code.js', 'dist/modular/js/dropdown.code.js', 'dist/modular/js/datepicker.code.js', 'dist/modular/js/timepicker.code.js', 'dist/modular/js/datetimepicker.code.js', 'dist/modular/js/slider.code.js', 'dist/modular/js/colorpicker.code.js'],
                    'dist/combined/css/gijgo.css': ['src/core/css/core.css', 'src/icons/icons.css', 'dist/modular/css/dialog.code.css', 'dist/modular/css/grid.code.css', 'dist/modular/css/tree.code.css', 'dist/modular/css/checkbox.code.css', 'dist/modular/css/editor.code.css', 'dist/modular/css/dropdown.code.css', 'dist/modular/css/datepicker.code.css', 'dist/modular/css/timepicker.code.css', 'dist/modular/css/datetimepicker.code.css', 'dist/modular/css/slider.code.css', 'dist/modular/css/colorpicker.code.css'],
                    'dist/combined/js/messages/messages.bg-bg.js': ['src/dialog/js/messages/messages.bg-bg.js', 'src/grid/js/messages/messages.bg-bg.js', 'src/editor/js/messages/messages.bg-bg.js', 'src/core/js/messages/messages.bg-bg.js'],
                    'dist/combined/js/messages/messages.fr-fr.js': ['src/dialog/js/messages/messages.fr-fr.js', 'src/grid/js/messages/messages.fr-fr.js', 'src/editor/js/messages/messages.fr-fr.js', 'src/core/js/messages/messages.fr-fr.js'],
                    'dist/combined/js/messages/messages.de-de.js': ['src/dialog/js/messages/messages.de-de.js', 'src/grid/js/messages/messages.de-de.js', 'src/editor/js/messages/messages.de-de.js', 'src/core/js/messages/messages.de-de.js'],
                    'dist/combined/js/messages/messages.pt-br.js': ['src/dialog/js/messages/messages.pt-br.js', 'src/grid/js/messages/messages.pt-br.js', 'src/editor/js/messages/messages.pt-br.js', 'src/core/js/messages/messages.pt-br.js'],
                    'dist/combined/js/messages/messages.ru-ru.js': ['src/dialog/js/messages/messages.ru-ru.js', 'src/grid/js/messages/messages.ru-ru.js', 'src/editor/js/messages/messages.ru-ru.js', 'src/core/js/messages/messages.ru-ru.js'],
                    'dist/combined/js/messages/messages.es-es.js': ['src/dialog/js/messages/messages.es-es.js', 'src/grid/js/messages/messages.es-es.js', 'src/editor/js/messages/messages.es-es.js', 'src/core/js/messages/messages.es-es.js'],
                    'dist/combined/js/messages/messages.it-it.js': ['src/dialog/js/messages/messages.it-it.js', 'src/grid/js/messages/messages.it-it.js', 'src/editor/js/messages/messages.it-it.js', 'src/core/js/messages/messages.it-it.js'],
                    'dist/combined/js/messages/messages.tr-tr.js': ['src/dialog/js/messages/messages.tr-tr.js', 'src/grid/js/messages/messages.tr-tr.js', 'src/editor/js/messages/messages.tr-tr.js', 'src/core/js/messages/messages.tr-tr.js'],
                    'dist/combined/js/messages/messages.ja-jp.js': ['src/dialog/js/messages/messages.ja-jp.js', 'src/grid/js/messages/messages.ja-jp.js', 'src/editor/js/messages/messages.ja-jp.js', 'src/core/js/messages/messages.ja-jp.js'],
                    'dist/combined/js/messages/messages.zh-cn.js': ['src/dialog/js/messages/messages.zh-cn.js', 'src/grid/js/messages/messages.zh-cn.js', 'src/editor/js/messages/messages.zh-cn.js', 'src/core/js/messages/messages.zh-cn.js'],
                    'dist/combined/js/messages/messages.zh-tw.js': ['src/dialog/js/messages/messages.zh-tw.js', 'src/grid/js/messages/messages.zh-tw.js', 'src/editor/js/messages/messages.zh-tw.js', 'src/core/js/messages/messages.zh-tw.js']
                }
            }
        },
        clean: ['dist/modular/js/*.code.js', 'dist/modular/css/*.code.css'],
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
                files: [
                    { 'dist/combined/js/gijgo.min.js': ['dist/combined/js/gijgo.js'] },
                    { 'dist/combined/js/messages/messages.bg-bg.min.js': ['dist/combined/js/messages/messages.bg-bg.js'] },
                    { 'dist/combined/js/messages/messages.de-de.min.js': ['dist/combined/js/messages/messages.de-de.js'] },
                    { 'dist/combined/js/messages/messages.fr-fr.min.js': ['dist/combined/js/messages/messages.fr-fr.js'] },
                    { 'dist/combined/js/messages/messages.pt-br.min.js': ['dist/combined/js/messages/messages.pt-br.js'] },
                    { 'dist/combined/js/messages/messages.ru-ru.min.js': ['dist/combined/js/messages/messages.ru-ru.js'] },
                    { 'dist/combined/js/messages/messages.es-es.min.js': ['dist/combined/js/messages/messages.es-es.js'] },
                    { 'dist/combined/js/messages/messages.it-it.min.js': ['dist/combined/js/messages/messages.it-it.js'] },
                    { 'dist/combined/js/messages/messages.tr-tr.min.js': ['dist/combined/js/messages/messages.tr-tr.js'] },
                    { 'dist/combined/js/messages/messages.ja-jp.min.js': ['dist/combined/js/messages/messages.ja-jp.js'] },
                    { 'dist/combined/js/messages/messages.zh-cn.min.js': ['dist/combined/js/messages/messages.zh-cn.js'] },
                    { 'dist/combined/js/messages/messages.zh-tw.min.js': ['dist/combined/js/messages/messages.zh-tw.js'] }
                ]
            },
            modular: {
                files: {
                    'dist/modular/js/core.min.js': ['dist/modular/js/core.js'],
                    'dist/modular/js/draggable.min.js': ['dist/modular/js/draggable.js'],
                    'dist/modular/js/droppable.min.js': ['dist/modular/js/droppable.js'],
                    'dist/modular/js/dialog.min.js': ['dist/modular/js/dialog.js'],
                    'dist/modular/js/checkbox.min.js': ['dist/modular/js/checkbox.js'],
                    'dist/modular/js/editor.min.js': ['dist/modular/js/editor.js'],
                    'dist/modular/js/grid.min.js': ['dist/modular/js/grid.js'],
                    'dist/modular/js/tree.min.js': ['dist/modular/js/tree.js'],
                    'dist/modular/js/dropdown.min.js': ['dist/modular/js/dropdown.js'],
                    'dist/modular/js/datepicker.min.js': ['dist/modular/js/datepicker.js'],
                    'dist/modular/js/timepicker.min.js': ['dist/modular/js/timepicker.js'],
                    'dist/modular/js/datetimepicker.min.js': ['dist/modular/js/datetimepicker.js'],
                    'dist/modular/js/slider.min.js': ['dist/modular/js/slider.js'],
                    'dist/modular/js/colorpicker.min.js': ['dist/modular/js/colorpicker.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [
                    { expand: true, cwd: 'dist/combined/css', src: ['*.css', '!*.min.css'], dest: 'dist/combined/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['core.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['dialog.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['editor.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['checkbox.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['tree.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['grid.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['dropdown.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['datepicker.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['timepicker.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['datetimepicker.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['slider.css'], dest: 'dist/modular/css', ext: '.min.css' },
                    { expand: true, cwd: 'dist/modular/css', src: ['colorpicker.css'], dest: 'dist/modular/css', ext: '.min.css' }
                ]
            }
        },
        watch: {
            files: ['src/**/*.js', 'src/**/*.css', 'src/**/*.txt'],
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
        return '<!DOCTYPE html>\r\n<html>\r\n' +
            writer.analyzeLibs(record.libs) +
            '<body style="padding: 8px;">\r\n' +
            record.text +
            '</body>\r\n</html>';
    },

    analyzeLibs: function (libs) {
        var i, libs, local = true, result = '<head>\r\n';
        result += '  <meta charset="utf-8">\r\n';
        result += '  <meta name="viewport" content="width=device-width, initial-scale=1">\r\n';
        if (libs) {
            names = libs.replace('<!--', '').replace('-->', '').trim().split(',');
            result += '  <title>Example</title>\r\n';
            result += '  <script src="../../dist/modular/js/core.js" type="text/javascript"></script>\r\n';
            result += '  <link href="../../dist/modular/css/core.css" rel="stylesheet" type="text/css">\r\n';
            for (i = 0; i < names.length; i++) {
                //include css files
                switch (names[i].trim()) {
                    case 'jquery':
                        if (local) {
                            result += '  <script src="../../dist/libraries/jquery/jquery.js"></script>\r\n';
                        } else {
                            result += '  <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous" ></script >\r\n';
                        }
                        break;
                    case 'bootstrap':
                        if (local) {
                            result += '  <link href="../../dist/libraries/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">\r\n';
                        } else {
                            result += '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">\r\n';
                        }
                        break;
                    case 'bootstrap4':
                        result += '  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">\r\n';
                        break;
                    case 'fontawesome':
                        result += '  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">\r\n';
                        break;
                    case 'materialicons':
                        result += '  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'dialog.base':
                        result += '  <link href="../../dist/modular/css/dialog.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'grid':
                        result += '  <link href="../../dist/modular/css/grid.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'tree':
                        result += '  <link href="../../dist/modular/css/tree.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'checkbox':
                        result += '  <link href="../../dist/modular/css/checkbox.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'editor':
                        result += '  <link href="../../dist/modular/css/editor.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'dropdown':
                        result += '  <link href="../../dist/modular/css/dropdown.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'datepicker':
                        result += '  <link href="../../dist/modular/css/datepicker.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'timepicker':
                        result += '  <link href="../../dist/modular/css/timepicker.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'datetimepicker':
                        result += '  <link href="../../dist/modular/css/datepicker.css" rel="stylesheet" type="text/css">\r\n';
                        result += '  <link href="../../dist/modular/css/timepicker.css" rel="stylesheet" type="text/css">\r\n';
                        result += '  <link href="../../dist/modular/css/datetimepicker.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'slider':
                        result += '  <link href="../../dist/modular/css/slider.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                    case 'colorpicker':
                        result += '  <link href="../../dist/modular/css/colorpicker.css" rel="stylesheet" type="text/css">\r\n';
                        break;
                }
            }
            for (i = 0; i < names.length; i++) {
                //include js files
                switch (names[i].trim()) {
                    case 'dialog.base':
                        result += '  <script src="../../dist/modular/js/dialog.js"></script>\r\n';
                        break;
                    case 'draggable':
                        result += '  <script src="../../dist/modular/js/draggable.js"></script>\r\n';
                        break;
                    case 'droppable':
                        result += '  <script src="../../dist/modular/js/droppable.js"></script>\r\n';
                        break;
                    case 'grid':
                        result += '  <script src="../../dist/modular/js/grid.js"></script>\r\n';
                        break;
                    case 'tree':
                        result += '  <script src="../../dist/modular/js/tree.js"></script>\r\n';
                        break;
                    case 'checkbox':
                        result += '  <script src="../../dist/modular/js/checkbox.js"></script>\r\n';
                        break;
                    case 'editor':
                        result += '  <script src="../../dist/modular/js/editor.js"></script>\r\n';
                        break;
                    case 'dropdown':
                        result += '  <script src="../../dist/modular/js/dropdown.js"></script>\r\n';
                        break;
                    case 'datepicker':
                        result += '  <script src="../../dist/modular/js/datepicker.js"></script>\r\n';
                        break;
                    case 'timepicker':
                        result += '  <script src="../../dist/modular/js/timepicker.js"></script>\r\n';
                        break;
                    case 'datetimepicker':
                        result += '  <script src="../../dist/modular/js/datepicker.js"></script>\r\n';
                        result += '  <script src="../../dist/modular/js/timepicker.js"></script>\r\n';
                        result += '  <script src="../../dist/modular/js/datetimepicker.js"></script>\r\n';
                        break;
                    case 'slider':
                        result += '  <script src="../../dist/modular/js/draggable.js"></script>\r\n';
                        result += '  <script src="../../dist/modular/js/slider.js"></script>\r\n';
                        break;
                    case 'colorpicker':
                        result += '  <script src="../../dist/modular/js/colorpicker.js"></script>\r\n';
                        break;
                }
            }
        }
        result += '</head>\r\n';
        return result;
    }
};