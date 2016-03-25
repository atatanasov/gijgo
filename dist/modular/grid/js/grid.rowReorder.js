/**  */
if (typeof (gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.rowReorder = {
    config: {
        base: {
            /** If set to true, enable row reordering with drag and drop. */
            rowReorder: false,

            /**  */
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
                $dragEl.draggable({
                    stop: gj.grid.plugins.rowReorder.private.createDragStopHandler($trSource)
                });
                $dragEl.css({ 
                    position: 'absolute', top: $trSource.offset().top, left: $trSource.offset().left, width: $trSource.width()
                });
                $trSource.siblings('tr[data-role="row"]').each(function() {
                    $(this).droppable('destroy').droppable({
                        over: gj.grid.plugins.rowReorder.private.createDroppableOverHandler($trSource),
                        out: gj.grid.plugins.rowReorder.private.droppableOut,
                        drop: gj.grid.plugins.rowReorder.private.createDropHandler($trSource)
                    });
                });
                $dragEl.trigger('mousedown');
            };
        },

        createDragStopHandler: function ($trSource) {
            return function (e) {
                $('table[data-role="draggable-clone"]').remove();
            }
        },

        createDropHandler: function ($trSource) {
            return function (e) {
                var $trTarget = $(this),
                    targetPosition = $trTarget.data('position'),
                    sourcePosition = $trSource.data('position');
                if (targetPosition < sourcePosition) {
                    $trTarget.before($trSource);
                    targetPosition++;
                } else {
                    $trTarget.after($trSource);
                    targetPosition--;
                }
                $trSource.attr('data-position', sourcePosition);
                $trTarget.attr('data-position', targetPosition);
                $trSource.siblings('tr[data-role="row"]').each(function () {
                    $(this).removeClass('gj-grid-base-top-border');
                    $(this).removeClass('gj-grid-base-bottom-border');
                });

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

