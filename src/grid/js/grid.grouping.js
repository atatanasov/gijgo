/** 
 * @widget Grid 
 * @plugin Grouping
 */
gj.grid.plugins.grouping = {
    config: {
        base: {
            paramNames: {
                /** The name of the parameter that is going to send the name of the column for grouping.
                 * The grouping should be enabled in order this parameter to be in use.
                 * @alias paramNames.groupBy
                 * @type string
                 * @default "groupBy"
                 */
                groupBy: 'groupBy',

                /** The name of the parameter that is going to send the direction for grouping.
                 * The grouping should be enabled in order this parameter to be in use.
                 * @alias paramNames.groupByDirection
                 * @type string
                 * @default "groupByDirection"
                 */
                groupByDirection: 'groupByDirection'
            },

            grouping: {
                /** The name of the field that needs to be in use for grouping.
                  * @type string
                  * @alias grouping.groupBy
                  * @default undefined
                  * @example Local.Data <!-- grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     let grid, data = [
                  *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', CountryName: 'Bulgaria' },
                  *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', CountryName: 'Brazil' },
                  *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', CountryName: 'England' },
                  *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', CountryName: 'Germany' },
                  *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', CountryName: 'Colombia' },
                  *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', CountryName: 'Bulgaria' }
                  *     ];
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: data,
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Remote.Data <!-- grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Bootstrap.3 <!-- bootstrap, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'DateOfBirth', type: 'date' } ],
                  *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>'
                  *     });
                  * </script>
                  * @example Bootstrap.4 <!-- bootstrap4, fontawesome, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap4',
                  *         iconsLibrary: 'fontawesome',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Bootstrap.5 <!-- bootstrap5, fontawesome, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap5',
                  *         iconsLibrary: 'fontawesome',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  */
                groupBy: undefined,

                direction: 'asc'
            },

            icons: {
                /** Expand row icon definition.
                 * @alias icons.expandGroup
                 * @type String
                 * @default '<i class="gj-icon plus" />'
                 * @example Right.Down.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                 *         grouping: { groupBy: 'CountryName' },
                 *         icons: {
                 *             expandGroup: '<i class="material-icons">keyboard_arrow_right</i>',
                 *             collapseGroup: '<i class="material-icons">keyboard_arrow_down</i>'
                 *         }
                 *     });
                 * </script>
                 */
                expandGroup: '<i class="gj-icon plus" />',

                /** Collapse row icon definition.
                 * @alias icons.collapseGroup
                 * @type String
                 * @default '<i class="gj-icon minus" />'
                 * @example Right.Down.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                 *         grouping: { groupBy: 'CountryName' },
                 *         icons: {
                 *             expandGroup: '<i class="material-icons">keyboard_arrow_right</i>',
                 *             collapseGroup: '<i class="material-icons">keyboard_arrow_down</i>'
                 *         }
                 *     });
                 * </script>
                 */
                collapseGroup: '<i class="gj-icon minus" />'
            }
        },

        fontawesome: {
            icons: {
                expandGroup: '<i class="fa fa-plus" aria-hidden="true"></i>',
                collapseGroup: '<i class="fa fa-minus" aria-hidden="true"></i>'
            }
        },

        glyphicons: {
            icons: {
                expandGroup: '<span class="glyphicon glyphicon-plus" />',
                collapseGroup: '<span class="glyphicon glyphicon-minus" />'
            }
        }
    },

    private: {
        init: function (grid) {
            let previousValue, data = grid.getConfig();

            previousValue = undefined;
            grid.on('rowDataBound', function (e) {
                if (previousValue !== e.detail.record[data.grouping.groupBy] || e.detail.row.rowIndex === 1) {
                    let colspan = gj.grid.methods.countVisibleColumns(grid) - 1,
                        groupRow = document.createElement('tr'),
                        expandCollapseCell = document.createElement('td'),
                        groupCell = document.createElement('td'),
                        icon = document.createElement('div'),
                        display = document.createElement('div'),
                        position = e.detail.row.getAttribute("data-gj-position");

                    groupRow.setAttribute('data-gj-role', 'group');
                    gj.core.addClasses(expandCollapseCell, 'gj-text-align-center gj-unselectable gj-cursor-pointer');

                    icon.setAttribute('data-gj-role', 'display');
                    icon.innerHTML = data.icons.collapseGroup;
                    gj.core.on(icon, 'click', gj.grid.plugins.grouping.private.createExpandCollapseHandler(grid, position));
                    expandCollapseCell.appendChild(icon);
                    groupRow.appendChild(expandCollapseCell);

                    groupCell.setAttribute('colspan', colspan);
                    display.setAttribute('data-gj-role', 'display');
                    display.innerHTML = data.grouping.groupBy + ': ' + e.detail.record[data.grouping.groupBy];
                    groupCell.appendChild(display);
                    groupRow.appendChild(groupCell);

                    e.detail.row.parentNode.insertBefore(groupRow, e.detail.row);
                    previousValue = e.detail.record[data.grouping.groupBy];
                }
                //TODO: row.show();
            });

            data.params[data.paramNames.groupBy] = data.grouping.groupBy;
            data.params[data.paramNames.groupByDirection] = data.grouping.direction;
        },

        grouping: function (grid, records) {
            let data = grid.getConfig();
            records.sort(gj.grid.methods.createDefaultSorter(data.grouping.direction, data.grouping.groupBy));
        },

        createExpandCollapseHandler: function (grid, position) {
            return function () {
                let methods = gj.grid.plugins.grouping.private,
                    row = this.parentNode.parentNode.nextSibling;
                if (row.style.display === 'none') {
                    methods.expandGroup(grid.getConfig().icons, this);
                } else {
                    methods.collapseGroup(grid.getConfig().icons, this);
                }
            };
        },

        collapseGroup: function (icons, icon) {
            let nextEl = icon.parentNode.parentNode.nextSibling;
            
            while (nextEl) {
                if (nextEl.getAttribute('data-gj-role') === 'group') {
                    break;
                } else {
                    nextEl.style.display = 'none';
                    nextEl = nextEl.nextSibling;
                }
            }
            icon.innerHTML = icons.expandGroup;
        },

        expandGroup: function (icons, icon) {
            let nextEl = icon.parentNode.parentNode.nextSibling;
            
            while (nextEl) {
                if (nextEl.getAttribute('data-gj-role') === 'group') {
                    break;
                } else {
                    nextEl.style.display = '';
                    nextEl = nextEl.nextSibling;
                }
            }
            icon.innerHTML = icons.collapseGroup;
        }
    },

    public: { },

    configure: function (grid) {
        let column, data = grid.getConfig();
        grid.extend(grid, gj.grid.plugins.grouping.public);
        if (data.grouping && data.grouping.groupBy) {
            column = {
                title: '',
                width: data.defaultIconColumnWidth,
                align: 'center',
                stopPropagation: true,
                cssClass: 'gj-cursor-pointer gj-unselectable'
            };
            data.columns = [column].concat(data.columns);

            grid.on('initialized', function () {
                gj.grid.plugins.grouping.private.init(grid);
            });

            grid.on('dataFiltered', function (e) {
                gj.grid.plugins.grouping.private.grouping(grid, e.detail.records);
            });
        }
    }
};
