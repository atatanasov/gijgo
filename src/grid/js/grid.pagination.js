/**
 * @widget Grid
 * @plugin Pagination
 */
gj.grid.plugins.pagination = {
    config: {
        base: {
            style: {
                pager: {
                    panel: '',
                    stateDisabled: '',
                    activeButton: ''
                }
            },

            paramNames: {
                /** The name of the parameter that is going to send the number of the page.
                 * The pager should be enabled in order this parameter to be in use.
                 * @alias paramNames.page
                 * @type string
                 * @default "page"
                 */
                page: 'page',

                /** The name of the parameter that is going to send the maximum number of records per page.
                 * The pager should be enabled in order this parameter to be in use.
                 * @alias paramNames.limit
                 * @type string
                 * @default "limit"
                 */
                limit: 'limit'
            },

            pager: {
                /** The maximum number of records that can be show by page.
                 * @alias pager.limit
                 * @type number
                 * @default 10
                 * @example local.data <!-- grid, dropdown -->
                 * <table id="grid"></table>
                 * <script>
                 *     let data, grid;
                 *     data = [
                 *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
                 *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
                 *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
                 *     ];
                 *     grid = ('#grid').grid({
                 *         dataSource: data,
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 100] }
                 *     });
                 * </script>
                 * @example remote.data <!-- grid, dropdown -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = ('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 100] }
                 *     });
                 * </script>
                 */
                limit: 10,

                /** Array that contains the possible page sizes of the grid.
                 * When this setting is set, then a drop down with the options for each page size is visualized in the pager.
                 * @alias pager.sizes
                 * @type array
                 * @default [5, 10, 20, 100]
                 * @example Bootstrap.3 <!-- bootstrap, grid, grid.pagination, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = ('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Bootstrap.4.FontAwesome <!-- bootstrap4, fontawesome, grid, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = ('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap4',
                 *         iconsLibrary: 'fontawesome',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Bootstrap.4.Material.Icons <!-- bootstrap4, grid, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = ('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap4',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Material.Design <!-- grid, grid.pagination, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = ('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'materialdesign',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                sizes: [5, 10, 20, 100],

                /** Array that contains a list with jquery objects that are going to be used on the left side of the pager.
                 * @alias pager.leftControls
                 * @type array
                 * @default array
                 * @example Font.Awesome <!-- fontawesome, grid  -->
                 * <style>
                 * .icon-disabled { color: #ccc; }
                 * table.gj-grid div[data-gj-role="display"] div.custom-item { display: table; margin-right: 5px; }
                 * </style>
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = ('#grid').grid({
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         style: {
                 *             pager: {
                 *                 stateDisabled: 'icon-disabled'
                 *             }
                 *         },
                 *         pager: { 
                 *             limit: 2, 
                 *             sizes: [2, 5, 10, 20],
                 *             leftControls: [
                 *                 ('<div title="First" data-gj-role="page-first" class="custom-item"><i class="fa fa-fast-backward" aria-hidden="true" /></div>'),
                 *                 ('<div title="Previous" data-gj-role="page-previous" class="custom-item"><i class="fa fa-backward" aria-hidden="true" /></div>'),
                 *                 ('<div> Page </div>'),
                 *                 ('<div class="custom-item"></div>').appendChild(('<input type="text" data-gj-role="page-number" style="margin: 0 5px; width: 34px; height: 16px; text-align: right;" value="0">')),
                 *                 ('<div>of&nbsp;</div>'),
                 *                 ('<div data-gj-role="page-label-last" style="margin-right: 5px;">0</div>'),
                 *                 ('<div title="Next" data-gj-role="page-next" class="custom-item"><i class="fa fa-forward" aria-hidden="true" /></div>'),
                 *                 ('<div title="Last" data-gj-role="page-last" class="custom-item"><i class="fa fa-fast-forward" aria-hidden="true" /></div>'),
                 *                 ('<div title="Reload" data-gj-role="page-refresh" class="custom-item"><i class="fa fa-refresh" aria-hidden="true" /></div>'),
                 *                 ('<div class="custom-item"></div>').appendChild(('<select data-gj-role="page-size" style="margin: 0 5px; width: 50px;"></select>'))
                 *             ],
                 *             rightControls: [
                 *                 ('<div>Displaying records&nbsp;</div>'),
                 *                 ('<div data-gj-role="record-first">0</div>'),
                 *                 ('<div>&nbsp;-&nbsp;</div>'),
                 *                 ('<div data-gj-role="record-last">0</div>'),
                 *                 ('<div>&nbsp;of&nbsp;</div>'),
                 *                 ('<div data-gj-role="record-total">0</div>').css({ "margin-right": "5px" })
                 *             ]
                 *         }
                 *     });
                 * </script>
                 */
                leftControls: undefined,

                /** Array that contains a list with jquery objects that are going to be used on the right side of the pager.
                 * @alias pager.rightControls
                 * @type array
                 * @default array
                 */
                rightControls: undefined
            }
        },

        bootstrap: {
            style: {
                pager: {
                    panel: '',
                    stateDisabled: ''
                }
            }
        },

        bootstrap4: {
            style: {
                pager: {
                    panel: 'btn-toolbar',
                    stateDisabled: ''
                }
            }
        },

        glyphicons: {
            icons: {
                first: '<span class="glyphicon glyphicon-step-backward"></span>',
                previous: '<span class="glyphicon glyphicon-backward"></span>',
                next: '<span class="glyphicon glyphicon-forward"></span>',
                last: '<span class="glyphicon glyphicon-step-forward"></span>',
                refresh: '<span class="glyphicon glyphicon-refresh"></span>'
            }
        },

        materialicons: {
            icons: {
                first: '<i class="gj-icon first-page" />',
                previous: '<i class="gj-icon chevron-left" />',
                next: '<i class="gj-icon chevron-right" />',
                last: '<i class="gj-icon last-page" />',
                refresh: '<i class="gj-icon refresh" />'
            }
        },

        fontawesome: {
            icons: {
                first: '<i class="fa fa-fast-backward" aria-hidden="true"></i>',
                previous: '<i class="fa fa-backward" aria-hidden="true"></i>',
                next: '<i class="fa fa-forward" aria-hidden="true"></i>',
                last: '<i class="fa fa-fast-forward" aria-hidden="true"></i>',
                refresh: '<i class="fa fa-refresh" aria-hidden="true"></i>'
            }
        }
    },

    private: {
        init: function (grid) {
            let row, cell, data, controls, leftPanel, rightPanel, tfoot, leftControls, rightControls;

            data = grid.getConfig();

            if (data.pager) {
                if (!data.params[data.paramNames.page]) {
                    data.params[data.paramNames.page] = 1;
                }
                if (!data.params[data.paramNames.limit]) {
                    data.params[data.paramNames.limit] = data.pager.limit;
                }

                gj.grid.plugins.pagination.private.localization(data);

                row = document.createElement('tr');
                row.setAttribute('data-gj-role', 'pager');
                cell = document.createElement('th');
                row.appendChild(cell);

                leftPanel = document.createElement('div');
                leftPanel.setAttribute('data-gj-role', 'display');
                gj.core.addClasses(leftPanel, data.style.pager.panel);
                leftPanel.style.float = 'left';
                rightPanel = document.createElement('div');
                rightPanel.setAttribute('data-gj-role', 'display');
                gj.core.addClasses(rightPanel, data.style.pager.panel);
                rightPanel.style.float = 'right';

                cell.appendChild(leftPanel)
                cell.appendChild(rightPanel);

                tfoot = document.createElement('tfoot');
                tfoot.appendChild(row);
                grid.element.appendChild(tfoot);
                gj.grid.plugins.pagination.private.updatePagerColSpan(grid);

                leftControls = gj.grid.methods.clone(data.pager.leftControls); //clone array
                for (let i = 0; i < leftControls.length; i++) {
                    leftPanel.appendChild(leftControls[i]);
                };

                rightControls = gj.grid.methods.clone(data.pager.rightControls); //clone array
                for (let i = 0; i < rightControls.length; i++) {
                    rightPanel.appendChild(rightControls[i]);
                };

                controls = grid.querySelector('tfoot [data-gj-role]');
                for (let i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.initPagerControl((controls[i]), grid);
                }
            }
        },

        localization: function (data) {
            if (data.uiLibrary === 'bootstrap') {
                gj.grid.plugins.pagination.private.localizationBootstrap(data);
            } else if (data.uiLibrary === 'bootstrap4' || data.uiLibrary === 'bootstrap5') {
                gj.grid.plugins.pagination.private.localizationBootstrap4(data);
            } else {
                gj.grid.plugins.pagination.private.localizationMaterialDesign(data);
            }
        },

        localizationBootstrap: function (data) {
            let msg = gj.grid.messages[data.locale];
            if (typeof (data.pager.leftControls) === 'undefined') {
                data.pager.leftControls = [
                    ('<button type="button" class="btn btn-default btn-sm">' + (data.icons.first || msg.First) + '</button>').attr('title', msg.FirstPageTooltip).attr('data-gj-role', 'page-first'),
                    ('<button type="button" class="btn btn-default btn-sm">' + (data.icons.previous || msg.Previous) + '</button>').attr('title', msg.PreviousPageTooltip).attr('data-gj-role', 'page-previous'),
                    ('<div>' + msg.Page + '</div>'),
                    ('<input data-gj-role="page-number" class="form-control input-sm" type="text" value="0">'),
                    ('<div>' + msg.Of + '</div>'),
                    ('<div data-gj-role="page-label-last">0</div>'),
                    ('<button type="button" class="btn btn-default btn-sm">' + (data.icons.next || msg.Next) + '</button>').attr('title', msg.NextPageTooltip).attr('data-gj-role', 'page-next'),
                    ('<button type="button" class="btn btn-default btn-sm">' + (data.icons.last || msg.Last) + '</button>').attr('title', msg.LastPageTooltip).attr('data-gj-role', 'page-last'),
                    ('<button type="button" class="btn btn-default btn-sm">' + (data.icons.refresh || msg.Refresh) + '</button>').attr('title', msg.Refresh).attr('data-gj-role', 'page-refresh'),
                    ('<select data-gj-role="page-size" class="form-control input-sm" width="60"></select>')
                ];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    ('<div>' + msg.DisplayingRecords + '</div>'),
                    ('<div data-gj-role="record-first">0</div>'),
                    ('<div>-</div>'),
                    ('<div data-gj-role="record-last">0</div>'),
                    ('<div>' + msg.Of + '</div>'),
                    ('<div data-gj-role="record-total">0</div>')
                ];
            }
        },

        localizationBootstrap4: function (data) {
            let msg = gj.grid.messages[data.locale];
            if (typeof (data.pager.leftControls) === 'undefined') {
                data.pager.leftControls = [
                    ('<button class="btn btn-default btn-sm gj-cursor-pointer">' + (data.icons.first || msg.First) + '</button>').attr('title', msg.FirstPageTooltip).attr('data-gj-role', 'page-first'),
                    ('<button class="btn btn-default btn-sm gj-cursor-pointer">' + (data.icons.previous || msg.Previous) + '</button>').attr('title', msg.PreviousPageTooltip).attr('data-gj-role', 'page-previous'),
                    ('<div>' + msg.Page + '</div>'),
                    ('<div class="input-group"><input data-gj-role="page-number" class="form-control form-control-sm" type="text" value="0"></div>'),
                    ('<div>' + msg.Of + '</div>'),
                    ('<div data-gj-role="page-label-last">0</div>'),
                    ('<button class="btn btn-default btn-sm gj-cursor-pointer">' + (data.icons.next || msg.Next) + '</button>').attr('title', msg.NextPageTooltip).attr('data-gj-role', 'page-next'),
                    ('<button class="btn btn-default btn-sm gj-cursor-pointer">' + (data.icons.last || msg.Last) + '</button>').attr('title', msg.LastPageTooltip).attr('data-gj-role', 'page-last'),
                    ('<button class="btn btn-default btn-sm gj-cursor-pointer">' + (data.icons.refresh || msg.Refresh) + '</button>').attr('title', msg.Refresh).attr('data-gj-role', 'page-refresh'),
                    ('<select data-gj-role="page-size" class="form-control input-sm" width="60"></select>')
                ];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    ('<div>' + msg.DisplayingRecords + '&nbsp;</div>'),
                    ('<div data-gj-role="record-first">0</div>'),
                    ('<div>-</div>'),
                    ('<div data-gj-role="record-last">0</div>'),
                    ('<div>' + msg.Of + '</div>'),
                    ('<div data-gj-role="record-total">0</div>')
                ];
            }
        },

        localizationMaterialDesign: function (data) {
            let msg = gj.grid.messages[data.locale], parser = new DOMParser();
            if (typeof (data.pager.leftControls) === 'undefined') {
                data.pager.leftControls = [];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    parser.parseFromString('<span class="">' + msg.RowsPerPage + '</span>', 'text/xml').firstChild,
                    parser.parseFromString('<select data-gj-role="page-size" class="gj-grid-md-limit-select" width="52"></select></div>', 'text/xml').firstChild,
                    parser.parseFromString('<span class="gj-md-spacer-32">&nbsp;</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span data-gj-role="record-first" class="">0</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span class="">-</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span data-gj-role="record-last" class="">0</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span class="gj-grid-mdl-pager-label">' + msg.Of + '</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span data-gj-role="record-total" class="">0</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span class="gj-md-spacer-32">&nbsp;</span>', 'text/xml').firstChild,
                    gj.core.addClasses(parser.parseFromString('<button class="gj-button-md" title="' + msg.PreviousPageTooltip + '" data-gj-role="page-previous">' + (data.icons.previous || msg.Previous) + '</button>', 'text/xml').firstChild, data.icons.first ? 'gj-button-md-icon' : ''),
                    parser.parseFromString('<span class="gj-md-spacer-24">&nbsp;</span>', 'text/xml').firstChild,
                    gj.core.addClasses(parser.parseFromString('<button class="gj-button-md" title="' + msg.NextPageTooltip + '" data-gj-role="page-next">' + (data.icons.next || msg.Next) + '</button>', 'text/xml').firstChild, data.icons.first ? 'gj-button-md-icon' : '')
                ];
            }
        },

        initPagerControl: function (control, grid) {
            let data = grid.getConfig();
            switch (control.data('role')) {
                case 'page-size':
                    if (data.pager.sizes && 0 < data.pager.sizes.length) {
                        control.show();
                        for (let i = 0; i < data.pager.sizes.length; i++) {
                            let option = document.createElement('option'),
                                value = data.pager.sizes[i].toString();
                            option.setAttribute('value', value);
                            option.innerText = value
                            control.appendChild(option);
                        };
                        control.change(function () {
                            let newSize = parseInt(this.value, 10);
                            data.params[data.paramNames.limit] = newSize;
                            gj.grid.plugins.pagination.private.changePage(grid, 1);
                            gj.grid.plugins.pagination.events.pageSizeChange(grid, newSize);
                        });
                        control.val(data.params[data.paramNames.limit]);
                        if (gj.dropdown) {
                            control.dropdown({
                                uiLibrary: data.uiLibrary,
                                iconsLibrary: data.iconsLibrary,
                                fontSize: control.style.fontSize,
                                style: {
                                    presenter: 'btn btn-default btn-sm'
                                }
                            });
                        }
                    } else {
                        control.hide();
                    }
                    break;
                case 'page-refresh':
                    control.on('click', function () { grid.reload(); });
                    break;
            }

        },

        reloadPager: function (grid, totalRecords) {
            let page, limit, lastPage, firstRecord, lastRecord, data, controls, i;

            data = grid.getConfig();

            if (data.pager) {
                page = (0 === totalRecords) ? 0 : parseInt(data.params[data.paramNames.page], 10);
                limit = parseInt(data.params[data.paramNames.limit], 10);
                lastPage = Math.ceil(totalRecords / limit);
                firstRecord = (0 === page) ? 0 : (limit * (page - 1)) + 1;
                lastRecord = (firstRecord + limit) > totalRecords ? totalRecords : (firstRecord + limit) - 1;

                controls = grid.querySelector('TFOOT [data-gj-role]');
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.reloadPagerControl((controls[i]), grid, page, lastPage, firstRecord, lastRecord, totalRecords);
                }

                gj.grid.plugins.pagination.private.updatePagerColSpan(grid);
            }
        },

        reloadPagerControl: function (control, grid, page, lastPage, firstRecord, lastRecord, totalRecords) {
            let newPage;
            switch (control.data('role')) {
                case 'page-first':
                    gj.grid.plugins.pagination.private.assignPageHandler(grid, control, 1, page < 2);
                    break;
                case 'page-previous':
                    gj.grid.plugins.pagination.private.assignPageHandler(grid, control, page - 1, page < 2);
                    break;
                case 'page-number':
                    control.val(page).off('change').on('change', gj.grid.plugins.pagination.private.createChangePageHandler(grid, page));
                    break;
                case 'page-label-last':
                    control.text(lastPage);
                    break;
                case 'page-next':
                    gj.grid.plugins.pagination.private.assignPageHandler(grid, control, page + 1, lastPage === page);
                    break;
                case 'page-last':
                    gj.grid.plugins.pagination.private.assignPageHandler(grid, control, lastPage, lastPage === page);
                    break;
                case 'page-button-one':
                    newPage = (page === 1) ? 1 : ((page == lastPage) ? (page - 2) : (page - 1));
                    gj.grid.plugins.pagination.private.assignButtonHandler(grid, control, page, newPage, lastPage);
                    break;
                case 'page-button-two':
                    newPage = (page === 1) ? 2 : ((page == lastPage) ? lastPage - 1 : page);
                    gj.grid.plugins.pagination.private.assignButtonHandler(grid, control, page, newPage, lastPage);
                    break;
                case 'page-button-three':
                    newPage = (page === 1) ? page + 2 : ((page == lastPage) ? page : (page + 1));
                    gj.grid.plugins.pagination.private.assignButtonHandler(grid, control, page, newPage, lastPage);
                    break;
                case 'record-first':
                    control.text(firstRecord);
                    break;
                case 'record-last':
                    control.text(lastRecord);
                    break;
                case 'record-total':
                    control.text(totalRecords);
                    break;
            }
        },

        assignPageHandler: function (grid, control, newPage, disabled) {
            let style = grid.getConfig().style.pager;
            if (disabled) {
                control.addClass(style.stateDisabled).prop('disabled', true).off('click');
            } else {
                control.removeClass(style.stateDisabled).prop('disabled', false).off('click').on('click', function () {
                    gj.grid.plugins.pagination.private.changePage(grid, newPage);
                });
            }
        },

        assignButtonHandler: function (grid, control, page, newPage, lastPage) {
            let style = grid.getConfig().style.pager;
            if (newPage < 1 || newPage > lastPage) {
                control.hide();
            } else {
                control.show().off('click').text(newPage);
                if (newPage === page) {
                    control.addClass(style.activeButton);
                } else {
                    control.removeClass(style.activeButton).on('click', function () {
                        gj.grid.plugins.pagination.private.changePage(grid, newPage);
                    });
                }
            }
        },

        createChangePageHandler: function (grid, currentPage) {
            return function () {
                let data = grid.getConfig(),
                    newPage = parseInt(this.value, 10);
                gj.grid.plugins.pagination.private.changePage(grid, newPage);
            };
        },

        changePage: function (grid, newPage) {
            let data = grid.getConfig();
            if (gj.grid.plugins.pagination.events.pageChanging(grid, newPage) !== false && !isNaN(newPage)) {
                grid.element.querySelector('TFOOT [data-gj-role="page-number"]').innerText = newPage;
                data.params[data.paramNames.page] = newPage;
            }
            grid.reload();
        },

        updatePagerColSpan: function (grid) {
            let cell = grid.element.querySelector('tfoot > tr[data-gj-role="pager"] > th');
            if (cell && cell.length) {
                cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
            }
        },
        
        isLastRecordVisible: function (grid) {
            let result = true,
                data = grid.getConfig(),
                limit = parseInt(data.params[data.paramNames.limit], 10),
                page = parseInt(data.params[data.paramNames.page], 10),
                count = grid.count();
            if (limit && page) {
                result = ((page - 1) * limit) + count === data.totalRecords;
            }
            return result;
        }
    },

    public: {
        getAll: function (includeAllRecords) {
            let limit, page, start,
                data = this.getConfig(),
                records = this.getRecords();
            if (Array.isArray(data.dataSource)) {
                if (includeAllRecords) {
                    return data.dataSource;
                } else if (data.params[data.paramNames.limit] && data.params[data.paramNames.page]) {                    
                    limit = parseInt(data.params[data.paramNames.limit], 10);
                    page = parseInt(data.params[data.paramNames.page], 10);
                    start = (page - 1) * limit;
                    return records.slice(start, start + limit);
                } else {
                    return records;
                }
            } else {
                return this.getRecords();
            }
        }
    },

    events: {
        /**
         * Triggered when the page size is changed.
         *
         * @event pageSizeChange
         * @param {object} e - event data
         * @param {number} newSize - The new page size
         * @example sample <!-- bootstrap, grid, grid.pagination -->
         * <table id="grid"></table>
         * <script>
         *     let grid = ('#grid').grid({
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap',
         *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         *     grid.on('pageSizeChange', function (e, newSize) {
         *         alert('The new page size is ' + newSize + '.');
         *     });
         * </script>
         */
        pageSizeChange: function (grid, newSize) {
            grid.triggerHandler('pageSizeChange', [newSize]);
        },

        /**
         * Triggered before the change of the page.
         *
         * @event pageChanging
         * @param {object} e - event data
         * @param {number} newPage - The new page
         * @example sample <!-- bootstrap4, fontawesome, dropdown, grid, grid.pagination -->
         * <table id="grid"></table>
         * <script>
         *     let grid = ('#grid').grid({
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         *     grid.on('pageChanging', function (e, newPage) {
         *         if (isNaN(newPage)) {
         *             alert('Invalid page number');
         *             return false;
         *         } else {
         *             alert(newPage + ' is valid page number.');
         *         }
         *     });
         * </script>
         */
        pageChanging: function (grid, newSize) {
            grid.triggerHandler('pageChanging', [newSize]);
        }
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.pagination.public);
        let data = grid.getConfig();
        if (clientConfig.pager) {
            gj.grid.methods.isLastRecordVisible = gj.grid.plugins.pagination.private.isLastRecordVisible;

            grid.on('initialized', function () {
                gj.grid.plugins.pagination.private.init(grid);
            });
            grid.on('dataBound', function (e, records, totalRecords) {
                gj.grid.plugins.pagination.private.reloadPager(grid, totalRecords);
            });
            grid.on('columnShow', function () {
                gj.grid.plugins.pagination.private.updatePagerColSpan(grid);
            });
            grid.on('columnHide', function () {
                gj.grid.plugins.pagination.private.updatePagerColSpan(grid);
            });
        }
    }
};
