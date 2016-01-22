/** 
  * @widget Grid 
  * @plugin Bootstrap
  */
gj.grid.plugins.bootstrap = {
    config: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid-table table table-bordered table-hover',
            header: {
                cell: 'gj-grid-bootstrap-thead-cell',
                sortable: 'gj-cursor-pointer',
                sortAscIcon: 'glyphicon glyphicon-sort-by-alphabet',
                sortDescIcon: 'glyphicon glyphicon-sort-by-alphabet-alt'
            },
            content: {
                rowHover: '',
                rowSelected: 'active'
            }
        }
    },

    'configure': function ($grid) {
        var data = $grid.data();
        if (data.uiLibrary === 'bootstrap') {
            $.extend(true, data, gj.grid.plugins.bootstrap.config);
        }
    }
};