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
                  *     var grid, data = [
                  *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', Nationality: 'Bulgaria' },
                  *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', Nationality: 'Brazil' },
                  *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', Nationality: 'England' },
                  *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', Nationality: 'Germany' },
                  *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', Nationality: 'Colombia' },
                  *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', Nationality: 'Bulgaria' }
                  *     ];
                  *     $('#grid').grid({
                  *         dataSource: data,
                  *         grouping: { groupBy: 'Nationality' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Remote.Data <!-- grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     $('#grid').grid({
                  *         dataSource: '/Players/Get',
                  *         grouping: { groupBy: 'Nationality' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Bootstrap.3 <!-- bootstrap, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     $('#grid').grid({
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap',
                  *         grouping: { groupBy: 'Nationality' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'DateOfBirth', type: 'date' } ]
                  *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>'
                  *     });
                  * </script>
                  * @example Bootstrap.4 <!-- bootstrap4, fontawesome, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     $('#grid').grid({
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap4',
                  *         iconsLibrary: 'fontawesome',
                  *         grouping: { groupBy: 'Nationality' },
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
                 *     $('#grid').grid({
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                 *         grouping: { groupBy: 'Nationality' },
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
                 *     $('#grid').grid({
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                 *         grouping: { groupBy: 'Nationality' },
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
        init: function ($grid) {
            var previousValue, data = $grid.data();

            previousValue = undefined;
            $grid.on('rowDataBound', function (e, $row, id, record) {
                if (previousValue !== record[data.grouping.groupBy]) {
                    var colspan = gj.grid.methods.countVisibleColumns($grid) - 1,
                        $groupRow = $('<tr data-role="group" />'),
                        $expandCollapseCell = $('<td class="gj-text-align-center gj-unselectable gj-cursor-pointer" />');

                    $expandCollapseCell.append('<div data-role="display">' + data.icons.collapseGroup + '</div>');
                    $expandCollapseCell.on('click', gj.grid.plugins.grouping.private.createExpandCollapseHandler(data));
                    $groupRow.append($expandCollapseCell);
                    $groupRow.append('<td colspan="' + colspan + '"><div data-role="display">' + data.grouping.groupBy + ': ' + record[data.grouping.groupBy] + '</div></td>');
                    $groupRow.insertBefore($row);
                    previousValue = record[data.grouping.groupBy];
                }
                $row.show();
            });

            data.params[data.paramNames.groupBy] = data.grouping.groupBy;
            data.params[data.paramNames.groupByDirection] = data.grouping.direction;
        },

        grouping: function ($grid, records) {
            var data = $grid.data();
            records.sort(gj.grid.methods.createDefaultSorter(data.grouping.direction, data.grouping.groupBy));
        },

        createExpandCollapseHandler: function (data) {
            return function (e) {
                var $cell = $(this),
                    $display = $cell.children('div[data-role="display"]'),
                    $groupRow = $cell.closest('tr');
                if ($groupRow.next(':visible').data('role') === 'row') {
                    $groupRow.nextUntil('[data-role="group"]').hide();
                    $display.empty().append(data.icons.expandGroup);
                } else {
                    $groupRow.nextUntil('[data-role="group"]').show();
                    $display.empty().append(data.icons.collapseGroup);
                }
            };
        }
    },

    public: { },

    configure: function ($grid) {
        var column, data = $grid.data();
        $.extend(true, $grid, gj.grid.plugins.grouping.public);
        if (data.grouping && data.grouping.groupBy) {
            column = {
                title: '',
                width: data.defaultIconColumnWidth,
                align: 'center',
                stopPropagation: true,
                cssClass: 'gj-cursor-pointer gj-unselectable'
            };
            data.columns = [column].concat(data.columns);

            $grid.on('initialized', function () {
                gj.grid.plugins.grouping.private.init($grid);
            });

            $grid.on('dataFiltered', function (e, records) {
                gj.grid.plugins.grouping.private.grouping($grid, records);
            });
        }
    }
};
