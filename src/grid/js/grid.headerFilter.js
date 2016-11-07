/**
 * @widget Grid
 * @plugin Header Filter
 */
gj.grid.plugins.headerFilter = {
    config: {
        base: {
            /** If set to true, add filters for each column
             * @type boolean
             * @default object
             * @example sample <!-- grid.base -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/DataSources/GetPlayers',
             *         headerFilter: true,
             *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            headerFilter: {
                /** If set to true, add filters for each column
                 * @alias headerFilter.reload
                 * @type (onenterkeypress|onchange)
                 * @default 'onenterkeypress'
                 * @example Reload.OnEnterKeyPress <!-- grid.base -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         dataSource: '/DataSources/GetPlayers',
                 *         headerFilter: {
                 *             reload: 'onenterkeypress'
                 *         },
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
                 *     });
                 * </script>
                 * @example Reload.OnChange <!-- grid.base -->
                 * <table id="grid"></table>
                 * <script>
                 *     $('#grid').grid({
                 *         dataSource: '/DataSources/GetPlayers',
                 *         headerFilter: {
                 *             reload: 'onchange'
                 *         },
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
                 *     });
                 * </script>
                 */
                reload: 'onenterkeypress',

                delay: 300
            }
        },
        jqueryui: {
        },
        bootstrap: {
        }
    },

    private: {
        init: function ($grid) {
            var i, $th, $ctrl, data = $grid.data(),
                $filterTr = $('<tr data-role="filter"/>');

            for (i = 0; i < data.columns.length; i++) {
                $th = $('<td/>');
                $ctrl = $('<input data-field="'+ data.columns[i].field +'" style="width: 100%" />');
                if ('onchange' === data.headerFilter.reload) {
                    $crtl.on('change', function (e) {
                        gj.grid.plugins.headerFilter.private.reload($grid, $(this));
                    });
                } else {
                    $ctrl.on('keypress', function (e) {
                        if (e.which == 13) {
                            gj.grid.plugins.headerFilter.private.reload($grid, $(this));
                        }
                    });
                    $ctrl.on('blur', function (e) {
                        gj.grid.plugins.headerFilter.private.reload($grid, $(this));
                    });
                }
                $th.append($ctrl);
                $filterTr.append($th);
            }

            $grid.children('thead').append($filterTr);
        },

        reload: function ($grid, $ctrl) {
            var params = {};
            params[$ctrl.data('field')] = $ctrl.val();
            $grid.reload(params);
        }
    },

    public: {
    },

    events: {
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.headerFilter.public);
        var data = $grid.data();
        if (clientConfig.headerFilter) {
            $grid.on('initialized', function () {
                gj.grid.plugins.headerFilter.private.init($grid);
            });
        }
    }
};
