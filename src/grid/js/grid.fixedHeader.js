/**
 * @widget Grid
 * @plugin Fixed Header
 */
gj.grid.plugins.fixedHeader = {
    config: {
        base: {

            /** If set to true, add scroll to the table body
             * @type boolean
             * @default object
             * @example Material.Design.Without.Pager <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Material.Design.With.Pager <!-- grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.3.Without.Pager <!-- bootstrap, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         height: 200,
             *         columns: [ 
             *             { field: 'ID', width: 34 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.3.With.Pager <!-- bootstrap, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         height: 200,
             *         columns: [ 
             *             { field: 'ID', width: 34 }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     $('#grid').grid({
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ 
             *             { field: 'ID', width: 42 }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             */
            fixedHeader: false,

            height: 300
        }
    },

    private: {
        init: function ($grid) {
            var data = $grid.data(),
                $tbody = $grid.children('tbody'),
                $thead = $grid.children('thead'),
                bodyHeight = data.height - $thead.outerHeight() - ($grid.children('tfoot').outerHeight() || 0);
            $grid.addClass('gj-grid-scrollable');
            $tbody.css('width', $thead.outerWidth());
            $tbody.height(bodyHeight);
        },

        refresh: function ($grid) {
            var i, width,
                data = $grid.data(),
                $tbody = $grid.children('tbody'),
                $thead = $grid.children('thead'),
                $tbodyCells = $grid.find('tbody tr[data-role="row"] td'),
                $theadCells = $grid.find('thead tr[data-role="caption"] th');

            if ($grid.children('tbody').height() < gj.grid.plugins.fixedHeader.private.getRowsHeight($grid)) {
                $tbody.css('width', $thead.outerWidth() + gj.grid.plugins.fixedHeader.private.getScrollBarWidth() + (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 1 : 0));
            } else {
                $tbody.css('width', $thead.outerWidth());
            }

            for (i = 0; i < $theadCells.length; i++) {
                width = $($theadCells[i]).outerWidth();
                if (i === 0 && gj.core.isIE()) {
                    width = width - 1;
                }
                $($tbodyCells[i]).attr('width', width);
            }
        },

        getRowsHeight: function ($grid) {
            var total = 0;
            $grid.find('tbody tr').each(function () {
                total += $(this).height();
            });
            return total;
        },

        getScrollBarWidth: function () {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return (w1 - w2);
        }
    },

    public: {
    },

    events: {
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.fixedHeader.public);
        var data = $grid.data();
        if (clientConfig.fixedHeader) {
            $grid.on('initialized', function () {
                gj.grid.plugins.fixedHeader.private.init($grid);
            });
            $grid.on('dataBound', function () {
                gj.grid.plugins.fixedHeader.private.refresh($grid);
            });
            $grid.on('resize', function () {
                gj.grid.plugins.fixedHeader.private.refresh($grid);
            });
        }
    }
};
