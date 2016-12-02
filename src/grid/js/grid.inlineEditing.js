/** 
 * @widget Grid 
 * @plugin Inline Editing
 */
gj.grid.plugins.inlineEditing = {
    config: {
        base: {
            defaultColumnSettings: {
                /** Provides a way to specify a custom editing UI for the column.
                 * @alias column.editor
                 * @type function|boolean
                 * @default undefined
                 * @example sample <!-- grid.base, grid.inlineEditing -->
                 * <table id="grid"></table>
                 * <script>
                 *     function edit($container, currentValue) {
                 *         $container.append('<input type="text" value="' + currentValue + '"/>');
                 *     }
                 *     $('#grid').grid({
                 *         dataSource: '/DataSources/GetPlayers',
                 *         columns: [
                 *             { field: 'ID' },
                 *             { field: 'Name', editor: edit },
                 *             { field: 'PlaceOfBirth', editor: true }
                 *         ]
                 *     });
                 * </script>
                 */
                editor: undefined
            },
            inlineEditing: {

                /** Inline editing mode.
                 * @alias inlineEditing.mode
                 * @type click|dblclick|command
                 * @default 'click'
                 * @example Command <!-- grid.base -->
                 * <table id="grid"></table>
                 * <script>
                 *     var grid, data = [
                 *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
                 *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
                 *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
                 *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
                 *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
                 *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
                 *     ];
                 *     grid = $('#grid').grid({
                 *         dataSource: data,
                 *         inlineEditing: { mode: 'command' },
                 *         columns: [
                 *             { field: 'ID', width: 34 },
                 *             { field: 'Name', editor: true },
                 *             { field: 'PlaceOfBirth', editor: true }, 
                 *             { width: 100, align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.base.editManager }
                 *         ],
                 *         pager: { limit: 3 }
                 *     });
                 * </script>
                 * @example Double.Click <!-- grid.base -->
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/DataSources/GetPlayers',
                 *         inlineEditing: { mode: 'dblclick' },
                 *         columns: [
                 *             { field: 'ID', width: 34 },
                 *             { field: 'Name', editor: true },
                 *             { field: 'PlaceOfBirth', editor: true }
                 *         ]
                 *     });
                 * </script>
                 */
                mode: 'click',

                editButton: '<u class="gj-cursor-pointer">edit</u>',
                deleteButton: '<u class="gj-cursor-pointer gj-margin-left-5">delete</u>',
                updateButton: '<u class="gj-cursor-pointer">update</u>',
                cancelButton: '<u class="gj-cursor-pointer gj-margin-left-5">cancel</u>'
            }
        }
    },

    renderers: {
        base: {
            editManager: function (value, record, $cell, $displayEl, id, $grid) {
                var data = $grid.data(),
                    $edit = $(data.inlineEditing.editButton).attr('data-key', id),
                    $delete = $(data.inlineEditing.deleteButton).attr('data-key', id),
                    $update = $(data.inlineEditing.updateButton).attr('data-key', id).hide(),
                    $cancel = $(data.inlineEditing.cancelButton).attr('data-key', id).hide();
                $edit.on('click', function (e) {
                    $grid.edit($(this).data('key'));
                    $edit.hide();
                    $delete.hide();
                    $update.show();
                    $cancel.show();
                });
                $delete.on('click', function (e) {
                    $grid.removeRow($(this).data('key'));
                });
                $update.on('click', function (e) {
                    $grid.update($(this).data('key'));
                    $edit.show();
                    $delete.show();
                    $update.hide();
                    $cancel.hide();
                });
                $cancel.on('click', function (e) {
                    $grid.cancel($(this).data('key'));
                    $edit.show();
                    $delete.show();
                    $update.hide();
                    $cancel.hide();
                });
                $displayEl.empty().append($edit).append($delete).append($update).append($cancel);
            }
        }
    },

    private: {
        editMode: function ($grid, $cell, column, record) {
            var $displayContainer, $editorContainer, $editorField, value;
            if ($cell.attr('data-mode') !== 'edit' && column.editor) {
                $displayContainer = $cell.find('div[data-role="display"]').hide();
                $editorContainer = $cell.find('div[data-role="edit"]');
                value = record[column.field] || $displayContainer.html();
                if ($editorContainer && $editorContainer.length) {
                    $editorContainer.show();
                    $editorField = $editorContainer.find('input, select').first();
                    $editorField.val(value);
                } else {
                    $editorContainer = $('<div data-role="edit" />');
                    $cell.append($editorContainer);
                    if (typeof (column.editor) === 'function') {
                        column.editor($editorContainer, value);
                    } else if (typeof (column.editor) === 'boolean') {
                        $editorContainer.append('<input type="text" value="' + value + '" class="gj-width-full"/>');
                    }
                    $editorField = $editorContainer.find('input, select').first();
                    if ($grid.data().inlineEditing.mode !== 'command') {
                        $editorField.on('blur', function (e) {
                            gj.grid.plugins.inlineEditing.private.displayMode($grid, $cell, column);
                        });
                        $editorField.on('keypress', function (e) {
                            if (e.which === 13) {
                                gj.grid.plugins.inlineEditing.private.displayMode($grid, $cell, column);
                            }
                        });
                    }
                }
                $editorField.focus().select();
                $cell.attr('data-mode', 'edit');
            }
        },

        displayMode: function ($grid, $cell, column, cancel) {
            var $editorContainer, $displayContainer, newValue, oldValue, record, style = '';
            if ($cell.attr('data-mode') === 'edit') {
                $editorContainer = $cell.find('div[data-role="edit"]');
                $displayContainer = $cell.find('div[data-role="display"]');
                newValue = $editorContainer.find('input, select').first().val();
                record = $grid.get($cell.parent().data('position'));
                oldValue = record[column.field];
                if (cancel !== true && newValue !== oldValue) {
                    gj.grid.methods.setCellText($displayContainer, column, newValue);
                    record[column.field] = newValue;
                    if ($cell.find('span.gj-dirty').length === 0) {
                        if ($cell.css('padding-top') !== '0px') {
                            style += 'margin-top: -' + $cell.css('padding-top') + ';';
                        }
                        if ($cell.css('padding-left') !== '0px') {
                            style += 'margin-left: -' + $cell.css('padding-left') + ';';
                        }
                        style = style ? ' style="' + style + '"' : '';
                        $cell.prepend($('<span class="gj-dirty"' + style + '></span>'));
                    }
                    gj.grid.plugins.inlineEditing.events.cellDataChanged($grid, $cell, column, record, oldValue, newValue);
                    gj.grid.plugins.inlineEditing.private.updateChanges($grid, column, record, newValue);
                }
                $editorContainer.hide();
                $displayContainer.show();
                $cell.attr('data-mode', 'display');
            }
        },

        updateChanges: function ($grid, column, sourceRecord, newValue) {
            var targetRecords, filterResult, newRecord, data = $grid.data();
            if (!data.guid) {
                data.guid = gj.grid.plugins.inlineEditing.private.generateGUID();
            }
            if (data.primaryKey) {
                targetRecords = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
                if (targetRecords) {
                    filterResult = targetRecords.filter(function (record) {
                        return record[data.primaryKey] === sourceRecord[data.primaryKey];
                    });
                } else {
                    targetRecords = [];
                }
                if (filterResult && filterResult.length === 1) {
                    filterResult[0][column.field] = newValue;
                } else {
                    newRecord = {};
                    newRecord[data.primaryKey] = sourceRecord[data.primaryKey];
                    if (data.primaryKey !== column.field) {
                        newRecord[column.field] = newValue;
                    }
                    targetRecords.push(newRecord);
                }
                sessionStorage.setItem('gj.grid.' + data.guid, JSON.stringify(targetRecords));
            }
        },

        generateGUID: function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    },

    public: {
        /**
         * Return array with all changes
         * @method
         * @return array
         * @example sample <!-- grid.base, grid.inlineEditing -->
         * <button id="btnGetChanges">Get Changes</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         primaryKey: 'ID',
         *         dataSource: '/DataSources/GetPlayers',
         *         columns: [ { field: 'ID' }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
         *     });
         *     $('#btnGetChanges').on('click', function () {
         *         alert(JSON.stringify(grid.getChanges()));
         *     });
         * </script>
         */
        getChanges: function () {
            return JSON.parse(sessionStorage.getItem('gj.grid.' + this.data().guid));
        },

        /**
         * Enable edit mode for all editable cells within a row.
         * @method
         * @param {string} id - The id of the row that needs to be edited
         * @return grid
         * @example Edit.Row <!-- grid.base -->
         * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
         * <table id="grid"></table>
         * <script>
         *     var grid, renderer;
         *     renderer = function (value, record, $cell, $displayEl, id) {
         *         var $editBtn = $('<i class="fa fa-pencil gj-cursor-pointer" data-key="' + id + '"></i>'),
         *             $updateBtn = $('<i class="fa fa-save gj-cursor-pointer" data-key="' + id + '"></i>').hide();
         *         $editBtn.on('click', function (e) {
         *             grid.edit($(this).data('key'));
         *             $editBtn.hide();
         *             $updateBtn.show();
         *         });
         *         $updateBtn.on('click', function (e) {
         *             grid.update($(this).data('key'));
         *             $editBtn.show();
         *             $updateBtn.hide();
         *         });
         *         $displayEl.append($editBtn).append($updateBtn);
         *     }
         *     grid = $('#grid').grid({
         *         primaryKey: 'ID',
         *         dataSource: '/DataSources/GetPlayers',
         *         inlineEditing: { mode: 'command' },
         *         columns: [ 
         *             { field: 'ID', width: 24 },
         *             { field: 'Name', editor: true }, 
         *             { field: 'PlaceOfBirth', editor: true },
         *             { width: 32, align: 'center', renderer: renderer }
         *         ]
         *     });
         * </script>
         */
        edit: function (id) {
            var i, record = this.getById(id),
                $cells = gj.grid.methods.getRowById(this, id).find('td'),
                columns = this.data('columns');

            for (i = 0; i < $cells.length; i++) {
                gj.grid.plugins.inlineEditing.private.editMode(this, $($cells[i]), columns[i], record);
            }
            
            return this;
        },

        /**
         * Update all editable cells within a row, when the row is in edit mode.
         * @method
         * @param {string} id - The id of the row that needs to be updated
         * @return grid
         * @example Update.Row <!-- grid.base -->
         * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
         * <table id="grid"></table>
         * <script>
         *     var grid, renderer;
         *     renderer = function (value, record, $cell, $displayEl, id) {
         *         var $editBtn = $('<i class="fa fa-pencil gj-cursor-pointer" data-key="' + id + '"></i>'),
         *             $updateBtn = $('<i class="fa fa-save gj-cursor-pointer" data-key="' + id + '"></i>').hide();
         *         $editBtn.on('click', function (e) {
         *             grid.edit($(this).data('key'));
         *             $editBtn.hide();
         *             $updateBtn.show();
         *         });
         *         $updateBtn.on('click', function (e) {
         *             grid.update($(this).data('key'));
         *             $editBtn.show();
         *             $updateBtn.hide();
         *         });
         *         $displayEl.append($editBtn).append($updateBtn);
         *     }
         *     grid = $('#grid').grid({
         *         primaryKey: 'ID',
         *         dataSource: '/DataSources/GetPlayers',
         *         inlineEditing: { mode: 'command' },
         *         columns: [ 
         *             { field: 'ID', width: 24 },
         *             { field: 'Name', editor: true }, 
         *             { field: 'PlaceOfBirth', editor: true },
         *             { width: 32, align: 'center', renderer: renderer }
         *         ]
         *     });
         * </script>
         */
        update: function (id) {
            var i, record = this.getById(id),
                $cells = gj.grid.methods.getRowById(this, id).find('td'),
                columns = this.data('columns');

            for (i = 0; i < $cells.length; i++) {
                gj.grid.plugins.inlineEditing.private.displayMode(this, $($cells[i]), columns[i], false);
            }

            return this;
        },


        /**
         * Cancel the edition of all editable cells, when the row is in edit mode.
         * @method
         * @param {string} id - The id of the row where you need to undo all changes
         * @return grid
         * @example Cancel.Row <!-- grid.base -->
         * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
         * <table id="grid"></table>
         * <script>
         *     var grid, renderer;
         *     renderer = function (value, record, $cell, $displayEl, id) {
         *         var $editBtn = $('<i class="fa fa-pencil gj-cursor-pointer" data-key="' + id + '"></i>'),
         *             $cancelBtn = $('<i class="fa fa-undo gj-cursor-pointer" data-key="' + id + '"></i>').hide();
         *         $editBtn.on('click', function (e) {
         *             grid.edit($(this).data('key'));
         *             $editBtn.hide();
         *             $cancelBtn.show();
         *         });
         *         $cancelBtn.on('click', function (e) {
         *             grid.cancel($(this).data('key'));
         *             $editBtn.show();
         *             $cancelBtn.hide();
         *         });
         *         $displayEl.append($editBtn).append($cancelBtn);
         *     }
         *     grid = $('#grid').grid({
         *         primaryKey: 'ID',
         *         dataSource: '/DataSources/GetPlayers',
         *         inlineEditing: { mode: 'command' },
         *         columns: [ 
         *             { field: 'ID', width: 24 },
         *             { field: 'Name', editor: true }, 
         *             { field: 'PlaceOfBirth', editor: true },
         *             { width: 32, align: 'center', renderer: renderer }
         *         ]
         *     });
         * </script>
         */
        cancel: function (id) {
            var i, record = this.getById(id),
                $cells = gj.grid.methods.getRowById(this, id).find('td'),
                columns = this.data('columns');

            for (i = 0; i < $cells.length; i++) {
                gj.grid.plugins.inlineEditing.private.displayMode(this, $($cells[i]), columns[i], true);
            }

            return this;
        }
    },

    events: {
        /**
         * Event fires after inline edit of a cell in the grid.
         *
         * @event cellDataChanged
         * @param {object} e - event data
         * @param {object} $cell - the cell presented as jquery object 
         * @param {object} column - the column configuration data
         * @param {object} record - the data of the row record
         * @param {object} oldValue - the old cell value
         * @param {object} newValue - the new cell value
         * @example sample <!-- grid.base, grid.inlineEditing -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/DataSources/GetPlayers',
         *         columns: [ { field: 'ID' }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
         *     });
         *     grid.on('cellDataChanged', function (e, $cell, column, record, oldValue, newValue) {
         *         alert('"' + oldValue + '" is changed to "' + newValue + '"');
         *     });
         * </script>
         */
        cellDataChanged: function ($grid, $cell, column, record, oldValue, newValue) {
            $grid.triggerHandler('cellDataChanged', [$cell, column, record, oldValue, newValue]);
        }
    },

    configure: function ($grid) {
        var data = $grid.data();
        $.extend(true, $grid, gj.grid.plugins.inlineEditing.public);
        if (data.inlineEditing.mode !== 'command') {
            $grid.on('cellDataBound', function (e, $displayEl, id, column, record) {
                if (column.editor) {
                    $displayEl.parent().on(data.inlineEditing.mode === 'dblclick' ? 'dblclick' : 'click', function () {
                        gj.grid.plugins.inlineEditing.private.editMode($grid, $displayEl.parent(), column, record);
                    });
                }
            });
        }
    }
};
