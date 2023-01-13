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
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Material.Design.With.Pager <!-- grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.3.Without.Pager <!-- bootstrap, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
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
             *     new GijgoGrid(document.getElementById('grid'), {
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
             *     new GijgoGrid(document.getElementById('grid'), {
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
             * @example Bootstrap.5.Without.Pager <!-- bootstrap5, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap5',
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
             * @example Bootstrap.5.With.Pager <!-- bootstrap5, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap5',
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
        init: function (grid) {
            let data = grid.getConfig(),
                tbody = grid.element.querySelector('tbody'),
                thead = grid.element.querySelector('thead'),
                tfoot = grid.element.querySelector('tfoot'),
                bodyHeight = data.height - gj.core.height(thead, true) - (tfoot ? gj.core.height(tfoot, true) : 0);
            grid.element.classList.add('gj-grid-scrollable');
            tbody.setAttribute('width', gj.core.height(thead, true));
            tbody.style.height = bodyHeight + 'px';
        },

        refresh: function (grid) {
            let i, width,
                data = grid.getConfig(),
                tbody = grid.element.querySelector('tbody'),
                thead = grid.element.querySelector('thead'),
                tbodyCells = grid.element.querySelectorAll('tbody tr[data-gj-role="row"] td'),
                theadCells = grid.element.querySelectorAll('thead tr[data-gj-role="caption"] th');

            if (gj.core.height(tbody) < gj.grid.plugins.fixedHeader.private.getRowsHeight(grid)) {
                tbody.style.width = (gj.core.width(thead, true) + gj.grid.plugins.fixedHeader.private.getScrollBarWidth() + (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 1 : 0)) + 'px';
            } else {
                tbody.style.width = gj.core.width(thead, true) + 'px';
            }

            for (i = 0; i < theadCells.length; i++) {
                width = gj.core.width(theadCells[i], true);
                if (i === 0 && gj.core.isIE()) {
                    width = width - 1;
                }
                tbodyCells[i].setAttribute('width', width);
            }
        },

        getRowsHeight: function (grid) {
            let total = 0, rows = grid.element.querySelectorAll('tbody tr');
            for (const row of rows) {
                total += gj.core.height(row);
            };
            return total;
        },

        getScrollBarWidth: function () {
            let inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            let outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            let w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            let w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return (w1 - w2);
        }
    },

    public: {
    },

    events: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.fixedHeader.public);
        let data = grid.getConfig();
        if (clientConfig.fixedHeader) {
            grid.on('initialized', function () {
                gj.grid.plugins.fixedHeader.private.init(grid);
            });
            grid.on('dataBound', function () {
                gj.grid.plugins.fixedHeader.private.refresh(grid);
            });
            grid.on('resize', function () {
                gj.grid.plugins.fixedHeader.private.refresh(grid);
            });
        }
    }
};
