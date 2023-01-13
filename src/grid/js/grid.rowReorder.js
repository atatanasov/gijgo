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
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
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
             *     new GijgoGrid(document.getElementById('grid'), {
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
             *     new GijgoGrid(document.getElementById('grid'), {
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
             *     new GijgoGrid(document.getElementById('grid'), {
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
             *     grid = new GijgoGrid(document.getElementById('grid'), {
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
        init: function (grid) {
            let i, columnPosition,
                config = grid.getConfig(),
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
            if (config.rowReorderColumn) {
                columnPosition = gj.grid.methods.getColumnPosition(config.columns, config.rowReorderColumn);
            }
            for (i = 0; i < rows.length; i++) {
                if (typeof (columnPosition) !== 'undefined') {
                    rows[i].children[columnPosition].addEventListener('mousedown', gj.grid.plugins.rowReorder.private.createRowMouseDownHandler(grid, rows[i]));
                } else {
                    rows[i].addEventListener('mousedown', gj.grid.plugins.rowReorder.private.createRowMouseDownHandler(grid, $row));
                }
            }
        },

        createRowMouseDownHandler: function (grid, trSource) {
            return function (e) {
                var dragEl = grid.element.cloneNode(true),
                    columns = grid.getConfig().columns,
                    i, cells;
                grid.element.classList.add('gj-unselectable');
                document.body.appendChild(dragEl);
                dragEl.setAttribute('data-gj-role', 'draggable-clone');
                dragEl.classList.add('gj-unselectable');
                dragEl.style.cursor = 'move';
                dragEl.querySelector('thead').remove();
                dragEl.querySelector('tfoot').remove();
                dragEl.querySelector('tbody tr:not([data-gj-position="' + trSource.getAttribute('data-gj-position') + '"])').remove();
                cells = dragEl.querySelectorAll('tbody tr td');
                for (i = 0; i < cells.length; i++) {
                    if (columns[i].width) {
                        cells[i].setAttribute('width', columns[i].width);
                    }
                }
                new GijgoDraggable(dragEl, {
                    stop: gj.grid.plugins.rowReorder.private.createDragStopHandler(grid, $trSource)
                });
                dragEl.style.position = 'absolute';
                dragEl.style.top = thSource.getBoundingClientRect().top + 'px';
                dragEl.style.left = thSource.getBoundingClientRect().left + 'px';
                dragEl.style.width = gj.core.width(thSource) + 'px';
                dragEl.style.zIndex = 1;
                if (trSource.getAttribute('data-gj-droppable') === 'true') {
                    new GijgoDroppable(trSource).destroy();
                }
                $trSource.siblings('tr[data-gj-role="row"]').each(function () {
                    var $dropEl = $(this);
                    if ($dropEl.attr('data-gj-droppable') === 'true') {
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

        createDragStopHandler: function (grid, $trSource) {
            return function (e, mousePosition) {
                $('table[data-gj-role="draggable-clone"]').draggable('destroy').remove();
                grid.removeClass('gj-unselectable');
                $trSource.siblings('tr[data-gj-role="row"]').each(function () {
                    var $trTarget = $(this),
                        targetPosition = $trTarget.data('position'),
                        sourcePosition = $trSource.data('position'),
                        data = grid.getConfig(),
                        $rows, $row, i, record, id;
                        
                    if ($trTarget.droppable('isOver', mousePosition)) {
                        if (targetPosition < sourcePosition) {
                            $trTarget.before($trSource);
                        } else {
                            $trTarget.after($trSource);
                        }
                        data.records.splice(targetPosition - 1, 0, data.records.splice(sourcePosition - 1, 1)[0]);
                        $rows = $trTarget.parent().find('tr[data-gj-role="row"]');
                        for (i = 0; i < $rows.length; i++) {
                            $($rows[i]).attr('data-gj-position', i + 1);
                        }
                        if (data.orderNumberField) {
                            for (i = 0; i < data.records.length; i++) {
                                data.records[i][data.orderNumberField] = i + 1;
                            }
                            for (i = 0; i < $rows.length; i++) {
                                $row = $($rows[i]);
                                id = gj.grid.methods.getId($row, data.primaryKey, $row.attr('data-gj-position'));
                                record = gj.grid.methods.getByPosition(grid, $row.attr('data-gj-position'));
                                grid.setCellContent(id, data.orderNumberField, record[data.orderNumberField]);
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

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.rowReorder.public);
        if (fullConfig.rowReorder && gj.draggable && gj.droppable) {
            grid.on('dataBound', function () {
                gj.grid.plugins.rowReorder.private.init(grid);
            });
        }
    }
};
