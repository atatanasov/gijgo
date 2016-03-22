/** 
  * @widget Grid 
  * @plugin Row Reorder
  */
if (typeof (gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.rowReorder = {
    config: {
        base: {
            /** If set to true, enable row reordering with drag and drop.
             * @type boolean
             * @default false
             * @example sample <!-- grid.base, grid.rowReorder, draggable.base, droppable.base -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/DataSources/GetPlayers',
             *         rowReorder: true,
             *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            rowReorder: false,

            /** 
             * @type string
             * @default undefined
             */
            rowReorderColumn: undefined,

            orderNumberField: undefined,

            style: {
                targetRowIndicatorTop: 'gj-grid-row-reorder-indicator-top',
                targetRowIndicatorBottom: 'gj-grid-row-reorder-indicator-bottom'
            }
        }
    },

    private: {
        init: function ($grid) {
            var i, $rows = $grid.find('tbody tr[data-role="row"]');
            for (i = 0; i < $rows.length; i++) {
                $($rows[i]).on('mousedown', gj.grid.plugins.rowReorder.private.createRowMouseDownHandler($grid));
            }
        },

        createRowMouseDownHandler: function ($grid) {
            return function (e) {
                var $trSource = $(this),
                    $dragEl = $grid.clone();
                $('body').append($dragEl);
                $dragEl.attr('data-role', 'draggable-clone');
                $dragEl.children('thead').remove().children('tfoot').remove();
                $dragEl.find('tbody tr:not([data-position="' + $trSource.data('position') + '"])').remove();
                $dragEl.draggable({});
                $dragEl.css({ 
                    position: 'absolute', top: $trSource.offset().top, left: $trSource.offset().left, width: $trSource.width()
                });
                $trSource.siblings('tr[data-role="row"]').each(function() {
                    $(this).droppable({
                        over: gj.grid.plugins.rowReorder.private.createDroppableOverHandler($trSource),
                        out: gj.grid.plugins.rowReorder.private.droppableOut,
                        drop: gj.grid.plugins.rowReorder.private.createDropHandler($trSource)
                    });
                });
                $dragEl.trigger('mousedown');
            };
        },

        createDropHandler: function ($trSource) {
            return function (e) {
                var $trTarget = $(this),
                    targetPosition = $trTarget.data('position'),
                    sourcePosition = $trSource.data('position');
                if (targetPosition < sourcePosition) {
                    $trTarget.before($trSource);
                } else {
                    $trTarget.after($trSource);
                }
                $trSource.attr('data-position', targetPosition);
                $trTarget.attr('data-position', targetPosition - 1);

                $trTarget.removeClass('gj-grid-base-top-border');
                $trTarget.removeClass('gj-grid-base-bottom-border');
                $trSource.siblings('tr[data-role="row"]').each(function () {
                    $(this).droppable('destroy');
                });
                $('table[data-role="draggable-clone"]').remove();
            };
        },

        createDroppableOverHandler: function ($trSource) {
            return function (e) {
                var $trTarget = $(this),
                    targetPosition = $trTarget.data('position'),
                    sourcePosition = $trSource.data('position');
                if (targetPosition < sourcePosition) {
                    $trTarget.addClass('gj-grid-base-top-border');
                } else {
                    $trTarget.addClass('gj-grid-base-bottom-border');
                }
            };
        },

        droppableOut: function () {
            $(this).removeClass('gj-grid-base-top-border');
            $(this).removeClass('gj-grid-base-bottom-border');
        }
    },

    public: {
    },

    configure: function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.rowReorder.public);
        if ($grid.data('rowReorder')) {
            $grid.on('dataBound', function () {
                gj.grid.plugins.rowReorder.private.init($grid);
            });
        }
    }
};
