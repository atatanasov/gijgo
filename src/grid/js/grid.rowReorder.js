/** 
 * @widget Grid 
 * @plugin Row Reorder
 */
gj.grid.plugins.rowReorder = {
    config: {
        base: {
            /** If set to true, enable row reordering with drag and drop.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            rowReorder: false,

            /** If set, enable row reordering only when you try to drag cell from the configured column.
             * Accept only field names of columns.
             * @type string
             * @default undefined
             * @example sample <!-- grid, grid.rowReorder, draggable, droppable -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         rowReorderColumn: 'ID',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            rowReorderColumn: undefined,

            /** If set, update the value in the field for all records. Accept only field names of columns.
             * @type string
             * @default undefined
             * @example Visible.OrderNumber <!-- grid, grid.rowReorder, draggable, droppable -->
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'OrderNumber': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'OrderNumber': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'OrderNumber': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
             *     ];
             *     $('#grid').grid({
             *         dataSource: data,
             *         rowReorder: true,
             *         orderNumberField: 'OrderNumber',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'OrderNumber', width:120 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Hidden.OrderNumber <!-- grid, grid.rowReorder, draggable, droppable -->
             * <button onclick="alert(JSON.stringify(grid.getAll()))" class="gj-button-md">Show Data</button><br/><br/>
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'OrderNumber': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'OrderNumber': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'OrderNumber': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
             *     ],
             *     grid = $('#grid').grid({
             *         dataSource: data,
             *         rowReorder: true,
             *         orderNumberField: 'OrderNumber',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            orderNumberField: undefined,

            style: {
                targetRowIndicatorTop: 'gj-grid-row-reorder-indicator-top',
                targetRowIndicatorBottom: 'gj-grid-row-reorder-indicator-bottom'
            }
        }
    },

    private: {
        init: function ($grid) {
            var i, columnPosition, $row,
                $rows = $grid.find('tbody tr[data-role="row"]');
            if ($grid.data('rowReorderColumn')) {
                columnPosition = gj.grid.methods.getColumnPosition($grid.data('columns'), $grid.data('rowReorderColumn'));
            }
            for (i = 0; i < $rows.length; i++) {
                $row = $($rows[i]);
                if (typeof (columnPosition) !== 'undefined') {
                    $row.find('td:eq(' + columnPosition + ')').on('mousedown', gj.grid.plugins.rowReorder.private.createRowMouseDownHandler($grid, $row));
                } else {
                    $row.on('mousedown', gj.grid.plugins.rowReorder.private.createRowMouseDownHandler($grid, $row));
                }
            }
        },

        createRowMouseDownHandler: function ($grid, $trSource) {
            return function (e) {
                var $dragEl = $grid.clone(),
                    columns = $grid.data('columns'),
                    i, $cells;
                $grid.addClass('gj-unselectable');
                $('body').append($dragEl);
                $dragEl.attr('data-role', 'draggable-clone').css('cursor', 'move');
                $dragEl.children('thead').remove().children('tfoot').remove();
                $dragEl.find('tbody tr:not([data-position="' + $trSource.data('position') + '"])').remove();
                $cells = $dragEl.find('tbody tr td');
                for (i = 0; i < $cells.length; i++) {
                    if (columns[i].width) {
                        $cells[i].setAttribute('width', columns[i].width);
                    }
                }
                $dragEl.draggable({
                    stop: gj.grid.plugins.rowReorder.private.createDragStopHandler($grid, $trSource)
                });
                $dragEl.css({ 
                    position: 'absolute', top: $trSource.offset().top, left: $trSource.offset().left, width: $trSource.width(), zIndex: 1
                });
                if ($trSource.attr('data-droppable') === 'true') {
                    $trSource.droppable('destroy');
                }
                $trSource.siblings('tr[data-role="row"]').each(function () {
                    var $dropEl = $(this);
                    if ($dropEl.attr('data-droppable') === 'true') {
                        $dropEl.droppable('destroy');
                    }
                    $dropEl.droppable({
                        over: gj.grid.plugins.rowReorder.private.createDroppableOverHandler($trSource),
                        out: gj.grid.plugins.rowReorder.private.droppableOut
                    });
                });
                $dragEl.trigger('mousedown');
            };
        },

        createDragStopHandler: function ($grid, $trSource) {
            return function (e, mousePosition) {
                $('table[data-role="draggable-clone"]').draggable('destroy').remove();
                $grid.removeClass('gj-unselectable');
                $trSource.siblings('tr[data-role="row"]').each(function () {
                    var $trTarget = $(this),
                        targetPosition = $trTarget.data('position'),
                        sourcePosition = $trSource.data('position'),
                        data = $grid.data(),
                        $rows, $row, i, record, id;
                        
                    if ($trTarget.droppable('isOver', mousePosition)) {
                        if (targetPosition < sourcePosition) {
                            $trTarget.before($trSource);
                        } else {
                            $trTarget.after($trSource);
                        }
                        data.records.splice(targetPosition - 1, 0, data.records.splice(sourcePosition - 1, 1)[0]);
                        $rows = $trTarget.parent().find('tr[data-role="row"]');
                        for (i = 0; i < $rows.length; i++) {
                            $($rows[i]).attr('data-position', i + 1);
                        }
                        if (data.orderNumberField) {
                            for (i = 0; i < data.records.length; i++) {
                                data.records[i][data.orderNumberField] = i + 1;
                            }
                            for (i = 0; i < $rows.length; i++) {
                                $row = $($rows[i]);
                                id = gj.grid.methods.getId($row, data.primaryKey, $row.attr('data-position'));
                                record = gj.grid.methods.getByPosition($grid, $row.attr('data-position'));
                                $grid.setCellContent(id, data.orderNumberField, record[data.orderNumberField]);
                            }
                        }
                    }
                    $trTarget.removeClass('gj-grid-top-border');
                    $trTarget.removeClass('gj-grid-bottom-border');
                    $trTarget.droppable('destroy');
                });
            }
        },

        createDroppableOverHandler: function ($trSource) {
            return function (e) {
                var $trTarget = $(this),
                    targetPosition = $trTarget.data('position'),
                    sourcePosition = $trSource.data('position');
                if (targetPosition < sourcePosition) {
                    $trTarget.addClass('gj-grid-top-border');
                } else {
                    $trTarget.addClass('gj-grid-bottom-border');
                }
            };
        },

        droppableOut: function () {
            $(this).removeClass('gj-grid-top-border');
            $(this).removeClass('gj-grid-bottom-border');
        }
    },

    public: {
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.rowReorder.public);
        if (fullConfig.rowReorder && gj.draggable && gj.droppable) {
            $grid.on('dataBound', function () {
                gj.grid.plugins.rowReorder.private.init($grid);
            });
        }
    }
};
