/** 
 * @widget Grid 
 * @plugin Inline Editing
 */
gj.grid.plugins.inlineEditing = {
    renderers: {
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
};

gj.grid.plugins.inlineEditing.config = {
    base: {
        defaultColumnSettings: {
            /** Provides a way to specify a custom editing UI for the column.
             * @alias column.editor
             * @type function|boolean
             * @default undefined
             * @example sample <!-- grid.base -->
             * <table id="grid"></table>
             * <script>
             *     function edit($container, currentValue, record) {
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
             * @example Double.Click <!-- grid.base -->
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/DataSources/GetPlayers',
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'dblclick' },
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ]
             *     });
             * </script>
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
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3 }
             *     });
             * </script>
             */
            mode: 'click',
                
            /** If set to true, add column with buttons for edit, delete, update and cancel at the end of the grid.
             * @alias inlineEditing.managementColumn
             * @type Boolean
             * @default true
             * @example True <!-- grid.base -->
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
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command', managementColumn: true },
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ]
             *     });
             * </script>
             * @example False <!-- grid.base -->
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
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command', managementColumn: false },
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true },
             *             { width: 100, align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager }
             *         ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid.base -->
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
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3 }
             *     });
             * </script>
             * @example jQueryUI <!-- grid.base, jqueryui -->
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
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'jqueryui',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3 }
             *     });
             * </script>
             * @example Material.Design <!-- materialdesign, grid.base -->
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
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'materialdesign',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3 }
             *     });
             * </script>
            */
            managementColumn: true,

            editButton: '<u class="gj-cursor-pointer">edit</u>',
            deleteButton: '<u class="gj-cursor-pointer gj-margin-left-5">delete</u>',
            updateButton: '<u class="gj-cursor-pointer">update</u>',
            cancelButton: '<u class="gj-cursor-pointer gj-margin-left-5">cancel</u>',
            managementColumnConfig: { width: 100, align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager }
        }
    },

    bootstrap: {
        inlineEditing: {
            editButton: '<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button>',
            deleteButton: '<button type="button" class="btn btn-default btn-sm gj-margin-left-10"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete</button>',
            updateButton: '<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Update</button>',
            cancelButton: '<button type="button" class="btn btn-default btn-sm gj-margin-left-10"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> Cancel</button>',
            managementColumnConfig: { width: 190, align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager }
        }
    },

    jqueryui: {
        inlineEditing: {
            editButton: '<button type="button" class="ui-button ui-widget ui-corner-all"><span class="ui-icon ui-icon-pencil" aria-hidden="true"></span> Edit</button>',
            deleteButton: '<button type="button" class="ui-button ui-widget ui-corner-all gj-margin-left-10"><span class="ui-icon ui-icon-close" aria-hidden="true"></span> Delete</button>',
            updateButton: '<button type="button" class="ui-button ui-widget ui-corner-all"><span class="ui-icon ui-icon-check" aria-hidden="true"></span> Update</button>',
            cancelButton: '<button type="button" class="ui-button ui-widget ui-corner-all gj-margin-left-10"><span class="ui-icon ui-icon-cancel" aria-hidden="true"></span> Cancel</button>',
            managementColumnConfig: { width: 200, align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager }
        }
    },

    materialdesign: {
        inlineEditing: {
            editButton: '<button class="mdl-button mdl-js-button"><i class="material-icons">mode_edit</i> EDIT</button>',
            deleteButton: '<button class="mdl-button mdl-js-button"><i class="material-icons">delete</i> DELETE</button>',
            updateButton: '<button class="mdl-button mdl-js-button"><i class="material-icons">check_circle</i> UPDATE</button>',
            cancelButton: '<button class="mdl-button mdl-js-button"><i class="material-icons">cancel</i> CANCEL</button>',
            managementColumnConfig: { width: 300, align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager }
        }
    }
};

gj.grid.plugins.inlineEditing.private = {
    editMode: function ($grid, $cell, column, record) {
        var $displayContainer, $editorContainer, $editorField, value, data = $grid.data();
        if ($cell.attr('data-mode') !== 'edit' && column.editor) {
            if (data.inlineEditing.mode !== 'command') {
                $('div[data-role="edit"]:visible').parent('td').each(function () {
                    $(this).find('input, select, textarea').triggerHandler('blur');
                });
            }
            $displayContainer = $cell.find('div[data-role="display"]').hide();
            $editorContainer = $cell.find('div[data-role="edit"]').show();
            if ($editorContainer.length === 0) {
                $editorContainer = $('<div data-role="edit" />');
                $cell.append($editorContainer);
            }
            value = record[column.field] || $displayContainer.html();
            $editorField = $editorContainer.find('input, select, textarea').first();
            if ($editorField.length) {
                $editorField.val(value);
            } else {
                if (typeof (column.editor) === 'function') {
                    column.editor($editorContainer, value, record);
                } else if (typeof (column.editor) === 'boolean') {
                    $editorContainer.append('<input type="text" value="' + value + '" class="gj-width-full"/>');
                }
                $editorField = $editorContainer.find('input, select, textarea').first();
                if (data.inlineEditing.mode !== 'command') {
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
            if ($editorField.prop('tagName').toUpperCase() === "INPUT" && $editorField.prop('type').toUpperCase() === 'TEXT') {
                gj.grid.plugins.inlineEditing.private.setCaretAtEnd($editorField[0]);
            } else {
                $editorField.focus();
            }
            $cell.attr('data-mode', 'edit');
        }
    },

    setCaretAtEnd: function (elem) {
        var elemLen;
        if (elem) {
            elemLen = elem.value.length;
            if (document.selection) { // For IE Only
                elem.focus();
                var oSel = document.selection.createRange();
                oSel.moveStart('character', -elemLen);
                oSel.moveStart('character', elemLen);
                oSel.moveEnd('character', 0);
                oSel.select();
            } else if (elem.selectionStart || elem.selectionStart == '0') { // Firefox/Chrome                
                elem.selectionStart = elemLen;
                elem.selectionEnd = elemLen;
                elem.focus();
            }
        }
    },

    displayMode: function ($grid, $cell, column, cancel) {
        var $editorContainer, $displayContainer, newValue, oldValue, record, position, style = '';
        if ($cell.attr('data-mode') === 'edit') {
            $editorContainer = $cell.find('div[data-role="edit"]');
            $displayContainer = $cell.find('div[data-role="display"]');
            newValue = $editorContainer.find('input, select, textarea').first().val();
            position = $cell.parent().data('position');
            record = $grid.get(position);
            oldValue = record[column.field];
            if (cancel !== true && newValue !== oldValue) {
                record[column.field] = newValue;
                gj.grid.methods.renderDisplayElement($grid, $displayContainer, column, record, gj.grid.methods.getId(record, $grid.data('primaryKey'), position), 'update');
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
};

gj.grid.plugins.inlineEditing.public = {
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
     *         inlineEditing: { mode: 'command', managementColumn: false },
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
     *         inlineEditing: { mode: 'command', managementColumn: false },
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
     *         inlineEditing: { mode: 'command', managementColumn: false },
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
};

gj.grid.plugins.inlineEditing.events = {
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
};

gj.grid.plugins.inlineEditing.configure = function ($grid, fullConfig, clientConfig) {
    var data = $grid.data();
    $.extend(true, $grid, gj.grid.plugins.inlineEditing.public);
    if (clientConfig.inlineEditing) {
        $grid.on('dataBound', function () {
            $grid.find('span.gj-dirty').remove();
        });
    }
    if (data.inlineEditing.mode === 'command') {
        if (fullConfig.inlineEditing.managementColumn) {
            data.columns.push(fullConfig.inlineEditing.managementColumnConfig);
        }
    } else {
        $grid.on('cellDataBound', function (e, $displayEl, id, column, record) {
            if (column.editor) {
                $displayEl.parent('td').on(data.inlineEditing.mode === 'dblclick' ? 'dblclick' : 'click', function () {
                    gj.grid.plugins.inlineEditing.private.editMode($grid, $displayEl.parent(), column, record);
                });
            }
        });
    }
};
