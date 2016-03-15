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
             * @example sample <!-- grid.base, draggable.base, grid.rowReorder -->
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
                $dragEl.draggable({ stop: gj.grid.plugins.rowReorder.private.createDragStopHandler($grid, $tr) });
                $dragEl.css({ 
                    position: 'absolute', top: $tr.offset().top, left: $tr.offset().left, width: $tr.width()
                });
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

        createDragStopHandler: function ($grid, $trSource) {
            return function (e) {
                var $trTarget = $grid.find('tbody tr[data-row-reorder-target="true"]'),
                    targetPosition = $trTarget.data('position'),
                    sourcePosition = $trSource.data('position');
                $trTarget.prepend($trSource);
                $(this).remove();
                
            };
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
