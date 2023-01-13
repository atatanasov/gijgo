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
             * @example Material.Design <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'materialdesign',
             *         detailTemplate: '<div style="text-align: left"><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         iconsLibrary: 'fontawesome',
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             * @example Bootstrap.5.Font.Awesome <!-- bootstrap5, fontawesome, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap5',
             *         iconsLibrary: 'fontawesome',
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
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
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
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
            keepExpandedRows: true,

            expandedRows: [],

            icons: {
                /** Expand row icon definition.
                 * @alias icons.expandRow
                 * @type String
                 * @default '<i class="gj-icon chevron-right" />'
                 * @example Plus.Minus.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' } ],
                 *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
                 *         icons: {
                 *             expandRow: '<i class="material-icons">add</i>',
                 *             collapseRow: '<i class="material-icons">remove</i>'
                 *         }
                 *     });
                 * </script>
                 */
                expandRow: '<i class="gj-icon chevron-right" />',

                /** Collapse row icon definition.
                 * @alias icons.collapseRow
                 * @type String
                 * @default '<i class="gj-icon chevron-down" />'
                 * @example Plus.Minus.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' } ],
                 *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
                 *         icons: {
                 *             expandRow: '<i class="material-icons">add</i>',
                 *             collapseRow: '<i class="material-icons">remove</i>'
                 *         }
                 *     });
                 * </script>
                 */
                collapseRow: '<i class="gj-icon chevron-down" />'
            }
        },

        fontawesome: {
            icons: {
                expandRow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
                collapseRow: '<i class="fa fa-angle-down" aria-hidden="true"></i>'
            }
        },

        glyphicons: {
            icons: {
                expandRow: '<span class="glyphicon glyphicon-chevron-right" />',
                collapseRow: '<span class="glyphicon glyphicon-chevron-down" />'
            }
        }
    },

    'private': {
        expandDetail: function (grid, cell, id) {
            let contentRow = cell.closest('tr'),
                contentRowIcon = cell.querySelector('div[data-gj-role="display"]'),
                detailsRow = document.createElement('tr'),
                detailsCell = document.createElement('td'), 
                detailsWrapper = document.createElement('div'), 
                data = grid.getConfig(),
                position = contentRow.getAttribute('data-gj-position'),
                record = grid.get(position),
                plugin = gj.grid.plugins.expandCollapseRows;

            detailsRow.setAttribute('data-gj-role', 'details');
            detailsCell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
            detailsWrapper.setAttribute('data-gj-role', 'display');
            detailsRow.appendChild(detailsCell);
            detailsCell.appendChild(detailsWrapper);
            detailsWrapper.innerHTML = window.gijgoStorage.get(contentRow, 'details');

            if (typeof (id) === undefined) {
                id = gj.grid.methods.getId(record, data.primaryKey, record);
            }
            contentRow.parentNode.insertBefore(detailsRow, contentRow.nextSibling);
            contentRowIcon.innerHTML = '';
            contentRowIcon.innerHTML = data.icons.collapseRow;
            grid.updateDetails(position);
            plugin.private.keepSelection(grid, id);
            plugin.events.detailExpand(grid.element, detailsWrapper, id);
        },

        collapseDetail: function (grid, cell, id) {
            let contentRow = cell.closest('tr'),
                detailsRow = contentRow.nextSibling,
                contentRowIcon = cell.querySelector('div[data-gj-role="display"]'),
                data = grid.getConfig(),
                plugin = gj.grid.plugins.expandCollapseRows;

            if (typeof (id) === undefined) {
                id = gj.grid.methods.getId(record, data.primaryKey, record);
            }
            if (detailsRow) {
                detailsRow.remove();
                contentRowIcon.innerHTML = '';
                contentRowIcon.innerHTML = data.icons.expandRow;
                plugin.private.removeSelection(grid, id);
                plugin.events.detailCollapse(grid.element, detailsRow.querySelector('td>div'), id);
            }
        },

        keepSelection: function(grid, id) {
            let data = grid.getConfig();
            if (data.keepExpandedRows) {
                if (Array.isArray(data.expandedRows)) {
                    if (data.expandedRows.indexOf(id) == -1) {
                        data.expandedRows.push(id);
                    }
                } else {
                    data.expandedRows = [id];
                }
            }
        },

        removeSelection: function (grid, id) {
            let data = grid.getConfig();
            if (data.keepExpandedRows && Array.isArray(data.expandedRows) && data.expandedRows.indexOf(id) > -1) {
                data.expandedRows.splice(data.expandedRows.indexOf(id), 1);
            }
        },

        updateDetailsColSpan: function (grid) {
            let cell = grid.element.querySelector('tbody > tr[data-role="details"] > td');
            if (cell) {
                cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
            }
        }        
    },

    'public': {

        /**
         * Collapse all grid rows.
         * @method
         * @return jQuery object
         * @example Sample <!-- grid -->
         * <button onclick="grid.expandAll()" class="gj-button-md">Expand All</button>
         * <button onclick="grid.collapseAll()" class="gj-button-md">Collapse All</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div style="text-align: left"><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ],
         *         grouping: { groupBy: 'CountryName' },
         *     });
         * </script>
         */
        collapseAll: function () {
            let grid = this, data = grid.getConfig(), position, rows;
                

            if (typeof (data.detailTemplate) !== 'undefined') {
                position = gj.grid.methods.getColumnPositionByRole(grid, 'expander');
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
                for (const row of rows) {
                    gj.grid.plugins.expandCollapseRows.private.collapseDetail(grid, row.children[position]);
                };
            }

            if (typeof (data.grouping) !== 'undefined') {
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="group"]');
                for (const row of rows) {
                    gj.grid.plugins.grouping.private.collapseGroup(data, row.children[0]);
                };
            }
            return grid;
        },

        /**
         * Expand all grid rows.
         * @method
         * @return jQuery object
         * @example Sample <!-- grid -->
         * <button onclick="grid.expandAll()" class="gj-button-md">Expand All</button>
         * <button onclick="grid.collapseAll()" class="gj-button-md">Collapse All</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div style="text-align: left"><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ],
         *         grouping: { groupBy: 'CountryName' },
         *     });
         * </script>
         */
        expandAll: function () {
            let grid = this, data = grid.getConfig(), position, rows;

            if (typeof (data.detailTemplate) !== 'undefined') {
                position = gj.grid.methods.getColumnPositionByRole(grid, 'expander');
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
                for (const row of rows) {
                    gj.grid.plugins.expandCollapseRows.private.expandDetail(grid, row.children[position]);
                };
            }

            if (typeof (data.grouping) !== 'undefined') {
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="group"]');
                for (const row of rows) {
                    gj.grid.plugins.grouping.private.expandGroup(data, row.children[0]);
                };
            }
            return grid;
        },

        //TODO: add documentation
        updateDetails: function (position) {
            let grid = this,
                detailWrapper = grid.element.querySelector('tbody tr[data-gj-position="' + position + '"]').nextSibling.querySelector('div[data-gj-role="display"]'),
                content = detailWrapper.innerHTML,
                record = grid.get(position);

            if (record && content) {
                detailWrapper.innerHTML.replace(/\{(.+?)\}/g, function ($0, $1) {
                    let column = gj.grid.methods.getColumnInfo(grid, $1);
                    content = content.replace($0, gj.grid.methods.formatText(record[$1], column));
                });
                detailWrapper.innerHTML = content;
            }
            return grid;
        }
    },

    'events': {
        /**
         * Event fires when detail row is showing
         *
         * @event detailExpand
         * @param {object} e - event data
         * @param {object} e.detail.detailWrapper - the detail wrapper as jQuery object 
         * @param {string} e.detail.id - the id of the record
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         primaryKey: 'ID',
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div></div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
         *     });
         *     grid.on('detailExpand', function (e) {
         *         let record = grid.getById(e.detail.id);
         *         e.detail.detailWrapper.innerHTML = '';
         *         e.detail.detailWrapper.innerHTML = '<b>Place Of Birth:</b> ' + record.PlaceOfBirth;
         *     });
         * </script>
         */
        detailExpand: function (el, detailWrapper, id) {
            el.dispatchEvent(new CustomEvent('detailExpand', { detail: { detailWrapper: detailWrapper, id: id } }));
        },

        /**
         * Event fires when detail row is hiding
         *
         * @event detailCollapse
         * @param {object} e - event data
         * @param {object} e.detail.detailWrapper - the detail wrapper as jQuery object 
         * @param {string} e.detail.id - the id of the record
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         primaryKey: 'ID',
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div></div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
         *     });
         *     grid.on('detailExpand', function (e) {
         *         let record = grid.getById(e.detail.id);
         *         e.detail.detailWrapper.innerHTML = '<b>Place Of Birth:</b>' + record.PlaceOfBirth;
         *     });
         *     grid.on('detailCollapse', function (e) {
         *         e.detail.detailWrapper.innerHTML = '';
         *         alert('detailCollapse is fired.');
         *     });
         * </script>
         */
        detailCollapse: function (el, detailWrapper, id) {
            el.dispatchEvent(new CustomEvent('detailCollapse', { detail: { detailWrapper: detailWrapper, id: id } }));
        }
    },

    'configure': function (grid) {
        let column, data = grid.getConfig();

        grid.extend(grid, gj.grid.plugins.expandCollapseRows.public);

        if (typeof (data.detailTemplate) !== 'undefined') {
            column = {
                title: '',
                width: data.defaultIconColumnWidth,
                align: 'center',
                stopPropagation: true,
                cssClass: 'gj-cursor-pointer gj-unselectable',
                tmpl: data.icons.expandRow,
                role: 'expander',
                events: {
                    'click': function (e, id, field, record) {
                        let methods = gj.grid.plugins.expandCollapseRows.private,
                            nextRow = this.closest('tr').nextElementSibling;
                        if (nextRow && nextRow.getAttribute('data-gj-role') === 'details') {
                            methods.collapseDetail(grid, this, id);
                        } else {
                            methods.expandDetail(grid, this, id);
                        }
                    }
                }
            };
            data.columns = [column].concat(data.columns);

            grid.on('rowDataBound', function (e) {
                window.gijgoStorage.put(e.detail.row, 'details', data.detailTemplate);
            });
            grid.on('columnShow', function (e, column) {
                gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan(grid);
            });
            grid.on('columnHide', function (e, column) {
                gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan(grid);
            });
            grid.on('rowRemoving', function (e) {
                gj.grid.plugins.expandCollapseRows.private.collapseDetail(grid, e.detail.row.children[0], e.detail.id);
            });
            grid.on('dataBinding', function () {
                grid.collapseAll();
            });
            grid.on('pageChanging', function () {
                grid.collapseAll();
            });
            grid.on('dataBound', function () {
                let i, cell, row, position, data = grid.getConfig();
                if (data.keepExpandedRows && Array.isArray(data.expandedRows)) {
                    for (i = 0; i < data.expandedRows.length; i++) {
                        row = gj.grid.methods.getRowById(grid, data.expandedRows[i]);
                        if (row) {
                            position = gj.grid.methods.getColumnPositionByRole(grid, 'expander');
                            cell = row.children[position];
                            if (cell) {
                                gj.grid.plugins.expandCollapseRows.private.expandDetail(grid, cell);
                            }
                        }
                    }
                }
            });
        }
    }
};