/** 
  * @widget Grid 
  * @plugin Inline Editing
  */
if (typeof (gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.inlineEditing = {
    'configuration': {
        defaultColumnSettings: {
            /** Provides a way to specify a custom editing UI for the column.
              * @alias column.editor
              * @type function|boolean
              * @default undefined
              * @example <table id="grid"></table>
              * <script>
              *     function edit($container, currentValue) {
              *         $container.append('<input type="text" value="' + currentValue + '"/>');
              *     }
              *     $('#grid').grid({
              *         dataSource: '/Grid/GetPlayers',
              *         columns: [
              *             { field: 'ID' },
              *             { field: 'Name', editor: edit },
              *             { field: 'PlaceOfBirth', editor: true }
              *         ]
              *     });
              * </script>
              */
            editor: undefined
        }
    },

    'private': {
        OnCellEdit: function ($grid, $cell, column, record) {
            var $editorContainer, $editorField;
            if ($cell.attr('data-mode') !== 'edit' && column.editor) {
                $cell.find('div[data-role="display"]').hide();
                $editorContainer = $cell.find('div[data-role="edit"]');
                if ($editorContainer && $editorContainer.length) {
                    $editorContainer.show();
                    $editorField = $editorContainer.find('input, select').first();
                    $editorField.val(record[column.field]);
                } else {
                    $editorContainer = $('<div data-role="edit" />');
                    $cell.append($editorContainer);
                    if (typeof (column.editor) === 'function') {
                        column.editor($editorContainer, record[column.field]);
                    } else if (typeof (column.editor) === 'boolean') {
                        $editorContainer.append('<input type="text" value="' + record[column.field] + '"/>');
                    }
                    $editorField = $editorContainer.find('input, select').first();
                    $editorField.on('blur', function (e) {
                        gj.grid.plugins.inlineEditing.private.OnCellDisplay($grid, $cell, column);
                    });
                    $editorField.on('keypress', function (e) {
                        if (e.which === 13) {
                            gj.grid.plugins.inlineEditing.private.OnCellDisplay($grid, $cell, column);
                        }
                    });
                }
                $editorField.focus().select();
                $cell.attr('data-mode', 'edit');
            }
        },

        OnCellDisplay: function ($grid, $cell, column) {
            var newValue, oldValue, record, style = '';
            if ($cell.attr('data-mode') === 'edit') {
                $editorContainer = $cell.find('div[data-role="edit"]');
                newValue = $editorContainer.find('input, select').first().val();
                record = $cell.parent().data('row').record;
                oldValue = record[column.field];
                $displayContainer = $cell.find('div[data-role="display"]');
                if (newValue !== oldValue) {
                    gj.grid.private.setCellText($displayContainer, column, newValue);
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
                    $cell.attr('data-mode', 'display');
                    gj.grid.plugins.inlineEditing.events.cellDataChanged($grid, $cell, column, record, oldValue, newValue);
                    gj.grid.plugins.inlineEditing.private.updateChanges($grid, column, record, newValue);
                }
                $editorContainer.hide();
                $displayContainer.show();
            }
        },

        updateChanges: function ($grid, column, sourceRecord, newValue) {
            var targetRecords, filterResult, newRecord, data = $grid.data('grid');
            if (!data.guid) {
                data.guid = gj.grid.plugins.inlineEditing.private.generateGUID();
            }
            if (data.dataKey) {
                targetRecords = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
                if (targetRecords) {
                    filterResult = targetRecords.filter(function (record) {
                        return record[data.dataKey] === sourceRecord[data.dataKey];
                    });
                } else {
                    targetRecords = [];
                }
                if (filterResult && filterResult.length === 1) {
                    filterResult[0][column.field] = newValue;
                } else {
                    newRecord = {};
                    newRecord[data.dataKey] = sourceRecord[data.dataKey];
                    if (data.dataKey !== column.field) {
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

    'public': {
        /**
         * Return array with all changes
         * @method
         * @return array
         * @example <button id="btnGetChanges">Get Changes</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataKey: 'ID',
         *         dataSource: '/Grid/GetPlayers',
         *         columns: [ { field: 'ID' }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
         *     });
         *     $('#btnGetChanges').on('click', function () {
         *         alert(JSON.stringify(grid.getChanges()));
         *     });
         * </script>
         */
        getChanges: function () {
            return JSON.parse(sessionStorage.getItem('gj.grid.' + this.data('grid').guid));
        }
    },

    'events': {
        cellDataChanged: function ($grid, $cell, column, record, oldValue, newValue) {
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
             * @example <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Grid/GetPlayers',
             *         columns: [ { field: 'ID' }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
             *     });
             *     grid.on('cellDataChanged', function (e, $cell, column, record, oldValue, newValue) {
             *         alert('"' + oldValue + '" is changed to "' + newValue + '"');
             *     });
             * </script>
             */
            $grid.trigger('cellDataChanged', [$cell, column, record, oldValue, newValue]);
        }
    },

    'init': function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.inlineEditing.public);
        $grid.on('cellDataBound', function (e, $wrapper, id, column, record) {
            if (column.editor) {
                $wrapper.parent().on('click', function () {
                    gj.grid.plugins.inlineEditing.private.OnCellEdit($grid, $wrapper.parent(), column, record);
                });
            }
        });
        //TODO: remove. looks like we not need that.
        //$grid.on('rowSelect', function (e, $row, id, record) {
        //    $row.siblings().find("td[data-mode='edit']").each(function () {
        //        var $cell = $(this),
        //            column = $grid.data('grid').columns[$cell.parent().children().index(this)];
        //        gj.grid.plugins.inlineEditing.private.OnCellDisplay($cell, column);
        //    });
        //});
    }
};

$.extend(true, gj.grid.configuration.base, gj.grid.plugins.inlineEditing.configuration);
