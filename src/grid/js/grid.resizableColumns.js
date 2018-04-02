/** 
 * @widget Grid 
 * @plugin Resizable Columns
 */
gj.grid.plugins.resizableColumns = {
    config: {
        base: {
            /** If set to true, users can resize columns by dragging the edges (resize handles) of their header cells.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4.FixedHeader <!-- bootstrap4, grid, draggable -->
             * <table id="grid" width="900"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         fixedHeader: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            resizableColumns: false
        }
    },

    private: {
        init: function ($grid, config) {
            var $columns, $column, i, $wrapper, $resizer, marginRight;
            $columns = $grid.find('thead tr[data-role="caption"] th');
            if ($columns.length) {
                for (i = 0; i < $columns.length - 1; i++) {
                    $column = $($columns[i]);
                    $wrapper = $('<div class="gj-grid-column-resizer-wrapper" />');
                    marginRight = parseInt($column.css('padding-right'), 10) + 3;
                    $resizer = $('<span class="gj-grid-column-resizer" />').css('margin-right', '-' + marginRight + 'px');
                    $resizer.draggable({
                        start: function () {
                            $grid.addClass('gj-unselectable');
                            $grid.addClass('gj-grid-resize-cursor');
                        },
                        stop: function () {
                            $grid.removeClass('gj-unselectable');
                            $grid.removeClass('gj-grid-resize-cursor');
                            this.style.removeProperty('top');
                            this.style.removeProperty('left');
                            this.style.removeProperty('position');
                        },
                        drag: gj.grid.plugins.resizableColumns.private.createResizeHandle($grid, $column, config.columns[i])
                    });
                    $column.append($wrapper.append($resizer));
                }
                for (i = 0; i < $columns.length; i++) {
                    $column = $($columns[i]);
                    if (!$column.attr('width')) {
                        $column.attr('width', $column.outerWidth());
                    }
                }
            }
        },

        createResizeHandle: function ($grid, $column, column) {
            var data = $grid.data();
            return function (e, newPosition) {
                var i, index, rows, cell, newWidth, nextWidth,
                    currentWidth = parseInt($column.attr('width'), 10),
                    position = gj.core.position(this),
                    offset = { top: newPosition.top - position.top, left: newPosition.left - position.left };
                if (!currentWidth) {
                    currentWidth = $column.outerWidth();
                }
                if (offset.left) {
                    newWidth = currentWidth + offset.left;
                    column.width = newWidth;
                    $column.attr('width', newWidth);
                    index = $column[0].cellIndex;
                    cell = $column[0].parentElement.children[index + 1];
                    nextWidth = parseInt($(cell).attr('width'), 10) - offset.left;
                    cell.setAttribute('width', nextWidth);
                    if (data.resizableColumns) {
                        rows = $grid[0].tBodies[0].children;
                        for (i = 0; i < rows.length; i++) {
                            rows[i].cells[index].setAttribute('width', newWidth);
                            cell = rows[i].cells[index + 1];
                            cell.setAttribute('width', nextWidth);
                        }
                    }
                }
            };
        }
    },

    public: {
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.resizableColumns.public);
        if (fullConfig.resizableColumns && gj.draggable) {
            $grid.on('initialized', function () {
                gj.grid.plugins.resizableColumns.private.init($grid, fullConfig);
            });
        }
    }
};
