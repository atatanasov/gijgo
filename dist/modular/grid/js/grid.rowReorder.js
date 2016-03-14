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
                $($rows[i]).on('mousedown', gj.grid.plugins.rowReorder.private.createRowMouseUpHandler($grid));
                $($rows[i]).on('mouseover', gj.grid.plugins.rowReorder.private.createRowMouseOverHandler($grid));
                $($rows[i]).on('mouseout', gj.grid.plugins.rowReorder.private.createRowMouseOutHandler($grid));
            }
        },

        createRowMouseDownHandler: function ($grid) {
            return function (e) {
                var $tr = $(this),
                    $dragEl = $grid.clone();
                $('body').append($dragEl);
                $dragEl.attr('data-role', 'draggable-clone');
                $dragEl.children('thead').remove().children('tfoot').remove();
                $dragEl.find('tbody tr:not([data-position="' + $tr.data('position') + '"])').remove();
                $dragEl.draggable({ stop: function () { $(this).remove(); } });
                $dragEl.css({ position: 'absolute', top: $tr.offset().top, left: $tr.offset().left, width: $tr.width() });
                $dragEl.trigger('mousedown');
                $grid.attr('data-row-reorder-position', $tr.data('position'));
            };
        },

        createRowMouseOverHandler: function ($grid) {
            return function (e) {
                var $tr = $(this);
                $tr.addClass('gj-grid-base-bottom-border');
                $tr.attr('data-row-reorder-target', true);
            };
        },

        createRowMouseOutHandler: function ($grid) {
            return function (e) {
                var $tr = $(this);
                $tr.removeClass('gj-grid-base-bottom-border');
                $tr.attr('data-row-reorder-target', false);
            };
        },

        createRowMouseUpHandler: function ($grid) {
            return function (e) {
                var $tr = $(this);
                if ($tr.attr('data-row-reorder-target')) {
                    alert('move');
                }
            };
        }
    },

    public: {
    },

    configure: function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.rowReorder.public);
        $grid.on('dataBound', function () {
            gj.grid.plugins.rowReorder.private.init($grid);
        });
    }
};

