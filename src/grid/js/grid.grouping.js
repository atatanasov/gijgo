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
                  * @example Local.Data <!-- grid.base, grid.grouping -->
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
                  *         columns: [ { field: 'ID', width: 30 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                  *         pager: { limit: 5 }
                  *     });
                  * </script>
                  * @example Remote.Data <!-- grid.base, grid.grouping -->
                  * <table id="grid"></table>
                  * <script>
                  *     $('#grid').grid({
                  *         dataSource: '/DataSources/GetPlayers',
                  *         grouping: { groupBy: 'Nationality' },
                  *         columns: [ { field: 'ID', width: 30 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                  *         pager: { limit: 5 }
                  *     });
                  * </script>
                  */
                groupBy: undefined,

                direction: 'asc'
            }
        }
    },

    private: {
        init: function ($grid) {
            var previousValue, data = $grid.data();
            if (data.grouping && data.grouping.groupBy) {
                previousValue = undefined;
                $grid.on('rowDataBound', function (e, $row, id, record) {
                    if (previousValue !== record[data.grouping.groupBy]) {
                        var colspan = gj.grid.methods.countVisibleColumns($grid),
                            $groupRow = $('<tr data-role="group" />');
                        $groupRow.append('<td colspan="' + colspan + '"><div data-role="display">' + data.grouping.groupBy + ': ' + record[data.grouping.groupBy] + '</div></td>');
                        $groupRow.insertBefore($row);
                        previousValue = record[data.grouping.groupBy];
                    }
                });

                data.params[data.paramNames.groupBy] = data.grouping.groupBy;
                data.params[data.paramNames.groupByDirection] = data.grouping.direction;
            }
        },

        grouping: function ($grid, records) {
            var data = $grid.data();
            if (data.grouping && data.grouping.groupBy) {
                records.sort(gj.grid.methods.createDefaultSorter(data.grouping.direction, data.grouping.groupBy));
            }
        }
    },

    configure: function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.grouping.public);
        $grid.on('initialized', function () {
            gj.grid.plugins.grouping.private.init($grid);
        });
        $grid.on('dataFiltered', function (e, records) {
            gj.grid.plugins.grouping.private.grouping($grid, records);
        });
    }
};
