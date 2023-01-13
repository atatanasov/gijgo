/**
 * @widget Grid
 * @plugin Header Filter
 */
gj.grid.plugins.headerFilter = {
    config: {
        base: {
            defaultColumnSettings: {
                /** Indicates if the column is sortable. If set to false the header filter is hidden.
                 * @alias column.filterable
                 * @type boolean
                 * @default true
                 * @example Material.Design <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: true,
                 *         columns: [
                 *             { field: 'ID', width: 56, filterable: false },
                 *             { field: 'Name', filterable: true },
                 *             { field: 'PlaceOfBirth' }
                 *         ]
                 *     });
                 * </script>
                 * @example Bootstrap.3 <!-- bootstrap, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: true,
                 *         uiLibrary: 'bootstrap',
                 *         columns: [
                 *             { field: 'ID', width: 56, filterable: false },
                 *             { field: 'Name', filterable: true },
                 *             { field: 'PlaceOfBirth' }
                 *         ]
                 *     });
                 * </script>
                 */
                filterable: true
            },

            /** If set to true, add filters for each column
             * @type boolean
             * @default object
             * @example Remote.DataSource <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         headerFilter: true,
             *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Local.DataSource <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         headerFilter: true,
             *         columns: [ 
             *             { field: 'ID', width: 56, filterable: false }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             */
            headerFilter: {
                /** Type of the header filter
                 * @alias headerFilter.type
                 * @type (onenterkeypress|onchange)
                 * @default 'onenterkeypress'
                 * @example OnEnterKeyPress <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: {
                 *             type: 'onenterkeypress'
                 *         },
                 *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
                 *     });
                 * </script>
                 * @example OnChange <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: {
                 *             type: 'onchange'
                 *         },
                 *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
                 *     });
                 * </script>
                 */
                type: 'onenterkeypress'
            }
        }
    },

    private: {
        init: function (grid) {
            var i, th, ctrl, data = grid.getConfig(),
                filterTr = document.createElement('tr');

            filterTr.setAttribute('data-gj-role', 'filter');
            for (i = 0; i < data.columns.length; i++) {
                th = document.createElement('th');
                if (data.columns[i].filterable) {
                    ctrl = document.createElement('input');
                    ctrl.setAttribute('data-gj-field', data.columns[i].field);
                    ctrl.classList.add('gj-width-full');
                    if ('onchange' === data.headerFilter.type) {
                        ctrl.addEventListener('keyup', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                        ctrl.addEventListener('change', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                        ctrl.addEventListener('paste', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                    } else {
                        ctrl.addEventListener('keypress', function (e) {
                            if (e.key === 'Enter') {
                                gj.grid.plugins.headerFilter.private.reload(grid, this);
                            }
                        });
                        ctrl.addEventListener('blur', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                    }
                    th.appendChild(ctrl);
                }
                if (data.columns[i].hidden) {
                    th.style.display = 'none';
                }
                filterTr.appendChild(th);
            }

            grid.element.querySelector('thead').appendChild(filterTr);
        },

        reload: function (grid, ctrl) {
            var params = {};
            params[ctrl.getAttribute('data-gj-field')] = ctrl.value;
            grid.reload(params);
        }
    },

    public: {
    },

    events: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.headerFilter.public);
        var data = grid.getConfig();
        if (clientConfig.headerFilter) {
            grid.on('initialized', function () {
                gj.grid.plugins.headerFilter.private.init(grid);
            });
        }
    }
};
