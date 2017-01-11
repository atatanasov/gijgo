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
             * @example Base.Theme <!-- grid.base, draggable.base -->
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/DataSources/GetPlayers',
             *         resizableColumns: true,
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid.base, draggable.base -->
             * <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/DataSources/GetPlayers',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
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
                    if ($.fn.draggable) {
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
                    }
                    $column.append($wrapper.append($resizer));
                }
            }
        },

        createResizeHandle: function ($grid, $column, column) {
            return function (e, offset) {
                var newWidth;
                if (offset && offset.left) {
                    newWidth = parseInt($column.attr('width'), 10) + offset.left;
                    column.width = newWidth;
                    $column.attr('width', newWidth);
                }
            };
        }
    },

    public: {
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.resizableColumns.public);
        if (fullConfig.resizableColumns) {
            $grid.on('initialized', function () {
                gj.grid.plugins.resizableColumns.private.init($grid, fullConfig);
            });
        }
    }
};
