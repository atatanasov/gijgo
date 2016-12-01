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
                 * @type click|command
                 * @default 'click'
                 * @example sample <!-- grid.base -->
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/DataSources/GetPlayers',
                 *         inlineEditing: { mode: 'command' },
                 *         columns: [
                 *             { field: 'ID', width: 34 },
                 *             { field: 'Name', editor: true },
                 *             { field: 'PlaceOfBirth', editor: true }, 
                 *             { width: 100, align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.base.editManager }
                 *         ]
                 *     });
                 * </script>
                 */
                mode: 'click'
            }
        }
    },

    renderers: {
        base: {
            editManager: function (value, record, $cell, $displayEl, $grid) {
                var $edit = $('<u class="gj-cursor-pointer">edit</u>'),
                    $save = $('<u class="gj-cursor-pointer">save</u>').hide(),
                    $cancel = $('<u class="gj-cursor-pointer">cancel</u>').hide(),
                    data = $grid.data();
                $edit.on('click', function (e) {
                    var position = $(e.target).closest('tr').data('position'),
                        record = gj.grid.methods.getByPosition($grid, position),
                        id = gj.grid.methods.getId(record, data.primaryKey, position);
                    $grid.edit(id);
                    $edit.hide();
                    $save.show();
                    $cancel.show();
                });
                $save.on('click', function (e) {
                    var position = $(e.target).closest('tr').data('position'),
                        record = gj.grid.methods.getByPosition($grid, position),
                        id = gj.grid.methods.getId(record, data.primaryKey, position);
                    $grid.save(id);
                    $edit.show();
                    $save.hide();
                    $cancel.hide();
                });
                $cancel.on('click', function (e) {
                    var position = $(e.target).closest('tr').data('position'),
                        record = gj.grid.methods.getByPosition($grid, position),
                        id = gj.grid.methods.getId(record, data.primaryKey, position);
                    $grid.cancel(id);
                    $edit.show();
                    $save.hide();
                    $cancel.hide();
                });
                $displayEl.append($edit).append($save).append(' &nbsp;').append($cancel);
            }
        }
    },

    private: {
        OnCellEdit: function ($grid, $cell, column, record) {
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
                        $editorContainer.append('<input type="text" value="' + value + '"/>');
                    }
                    $editorField = $editorContainer.find('input, select').first();
                    if ($grid.data().inlineEditing.mode === 'click') {
                        $editorField.on('blur', function (e) {
                            gj.grid.plugins.inlineEditing.private.OnCellDisplay($grid, $cell, column);
                        });
                        $editorField.on('keypress', function (e) {
                            if (e.which === 13) {
                                gj.grid.plugins.inlineEditing.private.OnCellDisplay($grid, $cell, column);
                            }
                        });
                    }
                }
                $editorField.focus().select();
                $cell.attr('data-mode', 'edit');
            }
        },

        OnCellDisplay: function ($grid, $cell, column, cancel) {
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
         * Enable edit mode for particular row
         * @method
         * @return void
         * @example sample <!-- grid.base -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         primaryKey: 'ID',
         *         dataSource: '/DataSources/GetPlayers',
         *         inlineEditing: { mode: 'command' },
         *         columns: [ 
         *             { field: 'ID', width: 24 },
         *             { field: 'Name', editor: true }, 
         *             { field: 'PlaceOfBirth', editor: true }, 
         *             { tmpl: '<u class="gj-cursor-pointer">edit</u>', width: 60, events: { 'click': function (e) { grid.edit(e.data.id); } } }
         *         ]
         *     });
         * </script>
         */
        edit: function (id) {
            var i, record = this.getById(id),
                $cells = gj.grid.methods.getRowById(this, id).find('td'),
                columns = this.data('columns');

            for (i = 0; i < $cells.length; i++) {
                gj.grid.plugins.inlineEditing.private.OnCellEdit(this, $($cells[i]), columns[i], record);
            }
        },

        save: function (id) {
            var i, record = this.getById(id),
                $cells = gj.grid.methods.getRowById(this, id).find('td'),
                columns = this.data('columns');

            for (i = 0; i < $cells.length; i++) {
                gj.grid.plugins.inlineEditing.private.OnCellDisplay(this, $($cells[i]), columns[i]);
            }
        },

        cancel: function (id) {
            var i, record = this.getById(id),
                $cells = gj.grid.methods.getRowById(this, id).find('td'),
                columns = this.data('columns');

            for (i = 0; i < $cells.length; i++) {
                gj.grid.plugins.inlineEditing.private.OnCellDisplay(this, $($cells[i]), columns[i], true);
            }
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
        $.extend(true, $grid, gj.grid.plugins.inlineEditing.public);
        if ($grid.data().inlineEditing.mode === 'click') {
            $grid.on('cellDataBound', function (e, $displayEl, id, column, record) {
                if (column.editor) {
                    $displayEl.parent().on('click', function () {
                        gj.grid.plugins.inlineEditing.private.OnCellEdit($grid, $displayEl.parent(), column, record);
                    });
                }
            });
        }
    }
};
