/** 
 * @widget Grid 
 * @plugin Grouping
 */
gj.grid.plugins.grouping = {
    config: {
        base: {
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
                  */
                groupBy: undefined,

                direction: 'asc'
            }
        }
    },

    private: {
        init: function ($grid) {
            var data = $grid.data();
            if (data.grouping && data.grouping.groupBy) {
                data.previousValue = undefined;
                $grid.on('rowDataBound', function (e, $row, id, record) {
                    if (data.previousValue !== record[data.grouping.groupBy]) {
                        var colspan = gj.grid.methods.countVisibleColumns($grid),
                            $groupRow = $('<tr data-role="group"><td colspan="' + colspan + '">' + record[data.grouping.groupBy] + '</td></tr>');
                        $groupRow.insertBefore($row);
                    }
                });
            }
        }
    },

    public: {},

    configure: function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.grouping.public);
        $grid.on('initialized', function () {
            gj.grid.plugins.grouping.private.init($grid);
        });
    }
};
