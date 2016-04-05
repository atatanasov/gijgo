/** 
  * @widget Grid 
  * @plugin Column Reorder
  */
if (typeof (gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.columnReorder = {
    config: {
        base: {
            /** If set to true, enable column reordering with drag and drop.
             * @type boolean
             * @default false
             * @example sample <!-- widget, grid.base, grid.columnReorder, draggable.base, droppable.base -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/DataSources/GetPlayers',
             *         columnReorder: true,
             *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            columnReorder: false,

            style: {
                targetRowIndicatorTop: 'gj-grid-row-reorder-indicator-top',
                targetRowIndicatorBottom: 'gj-grid-row-reorder-indicator-bottom'
            }
        }
    },

    private: {
        init: function ($grid) {
            var i, $cell,
                $cells = $grid.find('thead tr th');
            for (i = 0; i < $cells.length; i++) {
                $cell = $($cells[i]);
                $cell.on('mousedown', gj.grid.plugins.columnReorder.private.createMouseDownHandler($grid, $cell));
            }
        },

        createMouseDownHandler: function ($grid, $thSource) {
            return function (e) {
                var $dragEl = $grid.clone();
                $('body').append($dragEl);
                $dragEl.attr('data-role', 'draggable-clone').css('cursor', 'move');
                $dragEl.children('tbody').remove().children('tfoot').remove();
                $dragEl.find('thead tr th:eq(' + $thSource.index() + ')').siblings().remove();
                $dragEl.draggable({
                    stop: gj.grid.plugins.columnReorder.private.createDragStopHandler($grid, $thSource)
                });
                $dragEl.css({
                    position: 'absolute', top: $thSource.offset().top, left: $thSource.offset().left, width: $thSource.width()
                });
                if ($thSource.attr('data-droppable') === "true") {
                    $thSource.droppable('destroy');
                }
                $thSource.siblings('th').each(function () {
                    var $dropEl = $(this);
                    if ($dropEl.attr('data-droppable') === "true") {
                        $dropEl.droppable('destroy');
                    }
                    $dropEl.droppable({
                        over: gj.grid.plugins.columnReorder.private.createDroppableOverHandler($thSource),
                        out: gj.grid.plugins.columnReorder.private.droppableOut
                    });
                });
                $dragEl.trigger('mousedown');
            };
        },

        createDragStopHandler: function ($grid, $thSource) {
            return function (e, mouseEvent) {
                $('table[data-role="draggable-clone"]').draggable('destroy').remove();
                $thSource.siblings('th').each(function () {
                    var $thTarget = $(this),
                        data = $grid.data(),
                        targetPosition = gj.grid.methods.getColumnPosition(data.columns, $thTarget.data('field')),
                        sourcePosition = gj.grid.methods.getColumnPosition(data.columns, $thSource.data('field'));

                    $thTarget.removeClass('gj-grid-base-left-border');
                    $thTarget.removeClass('gj-grid-base-right-border');
                    if ($thTarget.droppable('isOver', mouseEvent)) {
                        if (targetPosition < sourcePosition) {
                            $thTarget.before($thSource);
                        } else {
                            $thTarget.after($thSource);
                        }
                        gj.grid.plugins.columnReorder.private.moveRowCells($grid, sourcePosition, targetPosition);
                        data.columns.splice(targetPosition, 0, data.columns.splice(sourcePosition, 1)[0]);
                    }
                    $thTarget.droppable('destroy');
                });
            }
        },

        moveRowCells: function ($grid, sourcePosition, targetPosition) {
            var i, $row, $rows = $grid.find('tbody tr[data-role="row"]');
            for (i = 0; i < $rows.length; i++) {
                $row = $($rows[i]);
                if (targetPosition < sourcePosition) {
                    $row.find('td:eq(' + targetPosition + ')').before($row.find('td:eq(' + sourcePosition + ')'));
                } else {
                    $row.find('td:eq(' + targetPosition + ')').after($row.find('td:eq(' + sourcePosition + ')'));
                }                
            }
        },

        createDroppableOverHandler: function ($thTarget) {
            return function (e) {
                var $thTarget = $(this),
                    targetPosition = $thTarget.data('position'),
                    sourcePosition = $thTarget.data('position');
                if (targetPosition < sourcePosition) {
                    $thTarget.addClass('gj-grid-base-left-border');
                } else {
                    $thTarget.addClass('gj-grid-base-right-border');
                }
            };
        },

        droppableOut: function () {
            $(this).removeClass('gj-grid-base-left-border');
            $(this).removeClass('gj-grid-base-right-border');
        }
    },

    public: {
    },

    configure: function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.columnReorder.public);
        if ($grid.data('columnReorder')) {
            $grid.on('initialized', function () {
                gj.grid.plugins.columnReorder.private.init($grid);
            });
        }
    }
};
