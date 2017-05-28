/** 
 * @widget Grid 
 * @plugin Expand Collapse Rows
 */
gj.grid.plugins.expandCollapseRows = {
    config: {
        base: {
            /** Template for the content in the detail section of the row.
             * Automatically add expand collapse column as a first column in the grid during initialization.
             * @type string
             * @default undefined
             * @example Bootstrap.3 <!-- bootstrap, grid, grid.expandCollapseRows -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, grid, grid.expandCollapseRows -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         iconsLibrary: 'fontawesome',
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             * @example Material.Design <!-- materialicons, grid -->
             * <table id="grid"></table>
             * <script>
             *     $('#grid').grid({
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'materialdesign',
             *         detailTemplate: '<div style="text-align: left"><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             */
            detailTemplate: undefined,

            /** If set try to persist the state of expanded rows.
             * You need to specify primaryKey on the initialization of the grid in order to enable this feature.
             * @default true
             * @example True <!-- bootstrap, grid  -->
             * <div class="container">
             *     <div class="row">
             *         <div class="col-xs-12">
             *             <p>Expand row, then change the page and return back to the page with expanded row in order to see that the expansion is kept.</p>
             *             <table id="grid"></table>
             *         </div>
             *     </div>
             * </div>
             * <script>
             *     var grid = $('#grid').grid({
             *         uiLibrary: 'bootstrap',
             *         primaryKey: 'ID',
             *         dataSource: '/Players/Get',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' } ],
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         keepExpandedRows: true,
             *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
             *     });
             * </script>
             */
            keepExpandedRows: true
        }
    },

    'private': {
        detailExpand: function ($grid, $cell) {
            var $contentRow = $cell.closest('tr'),
                $detailsRow = $('<tr data-role="details" />'),
                $detailsCell = $('<td colspan="' + gj.grid.methods.countVisibleColumns($grid) + '" />'),
                $detailsWrapper = $('<div data-role="display" />'),
                data = $grid.data(),
                position = $contentRow.data('position'),
                record = $grid.get(position),
                id = gj.grid.methods.getId(record, data.primaryKey, record);

            $detailsRow.append($detailsCell.append($detailsWrapper.append($contentRow.data('details'))));
            $detailsRow.insertAfter($contentRow);
            $cell.children('div[data-role="display"]').empty().append(data.icons.collapse);
            $grid.updateDetails($contentRow);
            gj.grid.plugins.expandCollapseRows.events.detailExpand($grid, $detailsRow.find('td>div'), id);
        },

        detailCollapse: function ($grid, $cell) {
            var $contentRow = $cell.closest('tr'),
                $detailsRow = $contentRow.next('tr[data-role="details"]'),
                data = $grid.data(),
                id = gj.grid.methods.getId($contentRow, data.primaryKey, $contentRow.data('position'));
            $detailsRow.remove();
            $cell.children('div[data-role="display"]').empty().append(data.icons.expand);
            gj.grid.plugins.expandCollapseRows.events.detailCollapse($grid, $detailsRow.find('td>div'), id);
        },

        keepSelection: function($grid, id) {
            var data = $grid.data();
            if (data.keepExpandedRows) {
                if ($.isArray(data.expandedRows)) {
                    if (data.expandedRows.indexOf(id) == -1) {
                        data.expandedRows.push(id)
                    }
                } else {
                    data.expandedRows = [id];
                }
            }
        },

        removeSelection: function ($grid, id) {
            var data = $grid.data();
            if (data.keepExpandedRows && $.isArray(data.expandedRows) && data.expandedRows.indexOf(id) > -1) {
                data.expandedRows.splice(data.expandedRows.indexOf(id), 1);
            }
        },

        updateDetailsColSpan: function ($grid) {
            var $cells = $grid.find('tbody > tr[data-role="details"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }
        }        
    },

    'public': {
        //TODO: add documentation
        collapseAll: function () {
            var $grid = this;
            $grid.find('tbody tr[data-role="row"]').each(function () {
                gj.grid.plugins.expandCollapseRows.private.detailCollapse($grid, $(this).find('td').first());
            });
        },

        //TODO: add documentation
        expandAll: function () {
            var $grid = this;
            $grid.find('tbody tr[data-role="row"]').each(function () {
                gj.grid.plugins.expandCollapseRows.private.detailExpand($grid, $(this).find('td').first());
            });
        },

        //TODO: add documentation
        updateDetails: function ($contentRow) {
            var $grid = this,
                $detailWrapper = $contentRow.data('details'),
                content = $detailWrapper.html(),
                record = $grid.get($contentRow.data('position'));

            if (record) {
                $detailWrapper.html().replace(/\{(.+?)\}/g, function ($0, $1) {
                    var column = gj.grid.methods.getColumnInfo($grid, $1);
                    content = content.replace($0, gj.grid.methods.formatText(record[$1], column));
                });
                $detailWrapper.html(content);
            }
        }
    },

    'events': {
        /**
         * Event fires when detail row is showing
         *
         * @event detailExpand
         * @param {object} e - event data
         * @param {object} detailWrapper - the detail wrapper as jQuery object 
         * @param {string} id - the id of the record
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         primaryKey: 'ID',
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div></div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
         *     });
         *     grid.on('detailExpand', function (e, $detailWrapper, id) {
         *         var record = grid.getById(id);
         *         $detailWrapper.empty().append('<b>Place Of Birth:</b> ' + record.PlaceOfBirth);
         *     });
         * </script>
         */
        detailExpand: function ($grid, $detailWrapper, id) {
            $grid.triggerHandler('detailExpand', [$detailWrapper, id]);
        },

        /**
         * Event fires when detail row is hiding
         *
         * @event detailCollapse
         * @param {object} e - event data
         * @param {object} detailWrapper - the detail wrapper as jQuery object 
         * @param {string} id - the id of the record
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         primaryKey: 'ID',
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div></div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
         *     });
         *     grid.on('detailExpand', function (e, $detailWrapper, id) {
         *         var record = grid.getById(id);
         *         $detailWrapper.append('<b>Place Of Birth:</b>' + record.PlaceOfBirth);
         *     });
         *     grid.on('detailCollapse', function (e, $detailWrapper, id) {
         *         $detailWrapper.empty();
         *         alert('detailCollapse is fired.');
         *     });
         * </script>
         */
        detailCollapse: function ($grid, $detailWrapper, id) {
            $grid.triggerHandler('detailCollapse', [$detailWrapper, id]);
        }
    },

    'configure': function ($grid) {
        var column, data = $grid.data();

        $.extend(true, $grid, gj.grid.plugins.expandCollapseRows.public);

        if (typeof (data.detailTemplate) !== 'undefined') {
            column = {
                title: '',
                field: data.primaryKey,
                width: data.defaultIconColumnWidth,
                align: 'center',
                stopPropagation: true,
                cssClass: 'gj-cursor-pointer gj-unselectable',
                tmpl: data.icons.expand,
                events: {
                    'click': function (e) {
                        var $cell = $(this), methods = gj.grid.plugins.expandCollapseRows.private;
                        if ($cell.closest('tr').next().attr('data-role') === 'details') {
                            methods.detailCollapse($grid, $cell);
                            methods.removeSelection($grid, e.data.id);
                        } else {
                            methods.detailExpand($grid, $(this));
                            methods.keepSelection($grid, e.data.id);
                        }
                    }
                }
            };
            data.columns = [column].concat(data.columns);

            $grid.on('rowDataBound', function (e, $row, id, record) {
                $row.data('details', $(data.detailTemplate));
            });
            $grid.on('columnShow', function (e, column) {
                gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan($grid);
            });
            $grid.on('columnHide', function (e, column) {
                gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan($grid);
            });
            $grid.on('rowRemoving', function (e, $row, id, record) {
                gj.grid.plugins.expandCollapseRows.private.detailCollapse($grid, $row.children('td').first());
            });
            $grid.on('dataBinding', function () {
                $grid.collapseAll();
            });
            $grid.on('pageChanging', function () {
                $grid.collapseAll();
            });
            $grid.on('dataBound', function () {
                var i, $cell, $row, data = $grid.data();
                if (data.keepExpandedRows && $.isArray(data.expandedRows)) {
                    for (i = 0; i < data.expandedRows.length; i++) {
                        $row = gj.grid.methods.getRowById($grid, data.expandedRows[i]);
                        if ($row && $row.length) {
                            $cell = $row.children('td').first(); //TODO: use data-role for selection
                            if ($cell && $cell.length) {
                                gj.grid.plugins.expandCollapseRows.private.detailExpand($grid, $cell);
                            }
                        }
                    }
                }
            });
        }
    }
};