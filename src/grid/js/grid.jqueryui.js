/** 
  * @widget Grid 
  * @plugin jQueryUI
  */
gj.grid.plugins.jqueryui = {
    config: {
        style: {
            //wrapper: 'gj-grid-wrapper',
            table: 'gj-grid-table ui-widget-content gj-grid-ui-table',
            //loadingCover: 'gj-grid-loading-cover',
            //loadingText: 'gj-grid-loading-text',
            header: {
                cell: 'ui-widget-header ui-state-default gj-grid-ui-thead-th',
                sortable: 'gj-grid-thead-sortable',
                sortAscIcon: 'gj-grid-ui-thead-th-sort-icon ui-icon ui-icon-arrowthick-1-s',
                sortDescIcon: 'gj-grid-ui-thead-th-sort-icon ui-icon ui-icon-arrowthick-1-n'
            },
            content: {
                rowHover: 'ui-state-hover',
                rowSelected: 'ui-state-active'
            },
            pager: {
                cell: 'ui-widget-header ui-state-default ui-grid-pager-cell',
                stateDisabled: 'ui-state-disabled'
            }//,
            ////TODO: move to expand/collapse plugin
            //expandIcon: 'ui-icon ui-icon-plus',
            //collapseIcon: 'ui-icon ui-icon-minus'
        },
    },

    'configure': function ($grid) {
        var data = $grid.data('grid');
        if (data.uiLibrary === 'jqueryui') {
            $.extend(true, data, gj.grid.plugins.jqueryui.config);
        }
    }
};