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
            },
            pager: {
                cell: 'gj-grid-bootstrap-tfoot-cell',
                stateDisabled: 'ui-state-disabled'
            },
            expandIcon: 'glyphicon glyphicon-plus',
            collapseIcon: 'glyphicon glyphicon-minus'
        },
        pager: {
            leftControls: [
                $('<button type="button" data-role="page-first" title="First Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-step-backward"></span></button>'),
                $('<div>&nbsp;</div>'),
                $('<button type="button" data-role="page-previous" title="Previous Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-backward"></span></button>'),
                $('<div>&nbsp;</div>'),
                $('<div>Page</div>'),
                $('<div>&nbsp;</div>'),
                $('<div></div>').append($('<input data-role="page-number" class="form-control input-sm" style="width: 40px; text-align: right;" type="text" value="0">')),
                $('<div>&nbsp;</div>'),
                $('<div>of&nbsp;</div>'),
                $('<div data-role="page-label-last">0</div>'),
                $('<div>&nbsp;</div>'),
                $('<button type="button" data-role="page-next" title="Next Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-forward"></span></button>'),
                $('<div>&nbsp;</div>'),
                $('<button type="button" data-role="page-last" title="Last Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-step-forward"></span></button>'),
                $('<div>&nbsp;</div>'),
                $('<button type="button" data-role="page-refresh" title="Reload" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-refresh"></span></button>'),
                $('<div>&nbsp;</div>'),
                $('<div></div>').append($('<select data-role="page-size" class="form-control input-sm"></select></div>'))
            ],
            rightControls: [
                $('<div>Displaying records&nbsp;</div>'),
                $('<div data-role="record-first">0</div>'),
                $('<div>&nbsp;-&nbsp;</div>'),
                $('<div data-role="record-last">0</div>'),
                $('<div>&nbsp;of&nbsp;</div>'),
                $('<div data-role="record-total">0</div>').css({ "margin-right": "5px" })
            ]
        }
    },

    'configure': function ($grid) {
        var data = $grid.data('grid');
        if (data.uiLibrary === 'bootstrap') {
            $.extend(true, data, gj.grid.plugins.bootstrap.config);
        }
    }
};