/**
 * @widget Grid
 * @plugin Pagination
 */
gj.grid.plugins.pagination = {
    config: {
        base: {
            style: {
                pager: {
                    cell: '',
                    stateDisabled: '',
                    activeButton: 'gj-grid-base-active'
                }
            },

            defaultParams: {
                /** The name of the parameter that is going to send the number of the page.
                 * The pager should be enabled in order this parameter to be in use.
                 * @alias defaultParams.page
                 * @type string
                 * @default "page"
                 */
                page: 'page',

                /** The name of the parameter that is going to send the maximum number of records per page.
                 * The pager should be enabled in order this parameter to be in use.
                 * @alias defaultParams.limit
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
                 * @example local.data <!-- grid.base, grid.pagination -->
                 * <table id="grid"></table>
                 * <script>
                 *     var data, grid;
                 *     data = [
                 *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
                 *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
                 *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
                 *     ];
                 *     grid = $('#grid').grid({
                 *         dataSource: data,
                 *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2 }
                 *     });
                 * </script>
                 * @example remote.data <!-- grid.base, grid.pagination -->
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/DataSources/GetPlayers',
                 *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2 }
                 *     });
                 * </script>
                 */
                limit: 10,

                /** Array that contains the possible page sizes of the grid.
                 * When this setting is set, then a drop down with the options for each page size is visualized in the pager.
                 * @alias pager.sizes
                 * @type array
                 * @default undefined
                 * @example bootstrap <!-- bootstrap, grid.base, grid.pagination  -->
                 * <div class="container">
                 *     <table id="grid"></table>
                 * </div>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/DataSources/GetPlayers',
                 *         uiLibrary: 'bootstrap',
                 *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example jqueryui <!-- jqueryui, grid.base, grid.pagination  -->
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/DataSources/GetPlayers',
                 *         uiLibrary: 'jqueryui',
                 *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                sizes: undefined,

                /** Array that contains a list with jquery objects that are going to be used on the left side of the pager.
                 * @alias pager.leftControls
                 * @type array
                 * @default array
                 * @example Font.Awesome <!-- grid.base, grid.pagination  -->
                 * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
                 * <style>
                 * .icon-disabled { color: #ccc; }
                 * </style>
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         dataSource: '/DataSources/GetPlayers',
                 *         columns: [ { field: 'ID', width: 24 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         style: {
                 *             pager: {
                 *                 stateDisabled: 'icon-disabled'
                 *             }
                 *         },
                 *         pager: { 
                 *             limit: 2, 
                 *             sizes: [2, 5, 10, 20],
                 *             leftControls: [
                 *                 $('<div title="First" data-role="page-first" class="gj-grid-icon fa fa-fast-backward" aria-hidden="true"></div>'),
                 *                 $('<div title="Previous" data-role="page-previous" class="gj-grid-icon fa fa-backward" aria-hidden="true"></div>'),
                 *                 $('<div> Page </div>'),
                 *                 $('<div></div>').append($('<input type="text" data-role="page-number" style="margin: 0 5px;" value="0">')),
                 *                 $('<div>of&nbsp;</div>'),
                 *                 $('<div data-role="page-label-last" style="margin-right: 5px;">0</div>'),
                 *                 $('<div title="Next" data-role="page-next" class="gj-grid-icon fa fa-forward" aria-hidden="true"></div>'),
                 *                 $('<div title="Last" data-role="page-last" class="gj-grid-icon fa fa-fast-forward" aria-hidden="true"></div>'),
                 *                 $('<div title="Reload" data-role="page-refresh" class="gj-grid-icon fa fa-refresh" aria-hidden="true"></div>'),
                 *                 $('<div></div>').append($('<select data-role="page-size" style="margin: 0 5px; width: 50px;"></select>'))
                 *             ],
                 *             rightControls: [
                 *                 $('<div>Displaying records&nbsp;</div>'),
                 *                 $('<div data-role="record-first">0</div>'),
                 *                 $('<div>&nbsp;-&nbsp;</div>'),
                 *                 $('<div data-role="record-last">0</div>'),
                 *                 $('<div>&nbsp;of&nbsp;</div>'),
                 *                 $('<div data-role="record-total">0</div>').css({ "margin-right": "5px" })
                 *             ]
                 *         }
                 *     });
                 * </script>
                 */
                leftControls: [
                    $('<button title="Previous" data-role="page-previous" class="gj-cursor-pointer"><span>«</span></button>'),
                    $('<button data-role="page-button-one" class="gj-cursor-pointer">1</button>'),
                    $('<button data-role="page-button-two" class="gj-cursor-pointer">2</button>'),
                    $('<button data-role="page-button-three" class="gj-cursor-pointer">3</button>'),
                    $('<button title="Next" data-role="page-next" class="gj-cursor-pointer"><span>»</span></button> &nbsp;')
                ],

                /** Array that contains a list with jquery objects that are going to be used on the right side of the pager.
                 * @alias pager.rightControls
                 * @type array
                 * @default array
                 */
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
        jqueryui: {
            style: {
                pager: {
                    cell: 'ui-widget-header ui-state-default ui-grid-pager-cell',
                    stateDisabled: 'ui-state-disabled'
                }
            },
            pager: {
                leftControls: [
                    $('<div title="First" data-role="page-first" class="ui-icon ui-icon-seek-first gj-grid-icon"></div>'),
                    $('<div title="Previous" data-role="page-previous" class="ui-icon ui-icon-seek-prev gj-grid-icon"></div>'),
                    $('<div>Page</div>'),
                    $('<div></div>').append($('<input type="text" data-role="page-number" class="ui-grid-pager" value="0">')),
                    $('<div>of&nbsp;</div>'),
                    $('<div data-role="page-label-last">0</div>'),
                    $('<div title="Next" data-role="page-next" class="ui-icon ui-icon-seek-next gj-grid-icon"></div>'),
                    $('<div title="Last" data-role="page-last" class="ui-icon ui-icon-seek-end gj-grid-icon"></div>'),
                    $('<div title="Reload" data-role="page-refresh" class="ui-icon ui-icon-refresh gj-grid-icon"></div>'),
                    $('<div></div>').append($('<select data-role="page-size" class="ui-grid-page-sizer"></select>'))
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
        bootstrap: {
            style: {
                pager: {
                    cell: 'gj-grid-bootstrap-tfoot-cell',
                    stateDisabled: ''
                }
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
        materialdesign: {
            style: {
                pager: {
                    cell: '',
                    stateDisabled: ''
                }
            },
            pager: {
                leftControls: [
                    $('<button data-role="page-first" title="First Page" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">first_page</i></button>'),
                    $('<button data-role="page-previous" title="Previous Page" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">chevron_left</i></button>'),
                    $('<span class="gj-grid-mdl-pager-label">Page</span>'),
                    $('<input data-role="page-number" class="mdl-textfield__input gj-grid-mdl-page" type="text" value="0">'),
                    $('<span class="gj-grid-mdl-pager-label">of</span>'),
                    $('<span data-role="page-label-last" class="gj-grid-mdl-pager-label">0</span>'),
                    $('<button data-role="page-next" title="Next Page" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">chevron_right</i>'),
                    $('<button data-role="page-last" title="Last Page" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">last_page</i>'),
                    $('<button data-role="page-refresh" title="Reload" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">refresh</i>'),
                    $('<select data-role="page-size" class="mdl-textfield__input gj-grid-mdl-limit-select"></select></div>')
                ],
                rightControls: [
                    $('<span class="gj-grid-mdl-pager-label">Displaying records</span>'),
                    $('<span data-role="record-first" class="gj-grid-mdl-pager-label">0</span>'),
                    $('<span class="gj-grid-mdl-pager-label">-</span>'),
                    $('<span data-role="record-last" class="gj-grid-mdl-pager-label">0</span>'),
                    $('<span class="gj-grid-mdl-pager-label">of</span>'),
                    $('<span data-role="record-total" class="gj-grid-mdl-pager-label">0</span>')
                ]
            }
        }
    },

    private: {
        init: function ($grid) {
            var $row, $cell, data, controls, $leftPanel, $rightPanel, $tfoot, leftControls, rightControls, i;

            data = $grid.data();

            if (data.pager) {
                if (!data.params[data.defaultParams.page]) {
                    data.params[data.defaultParams.page] = 1;
                }
                if (!data.params[data.defaultParams.limit]) {
                    data.params[data.defaultParams.limit] = data.pager.limit;
                }

                $row = $('<tr data-role="pager"/>');
                $cell = $('<th/>').addClass(data.style.pager.cell);
                $row.append($cell);

                $leftPanel = $('<div data-role="display" />').css({ 'float': 'left' });
                $rightPanel = $('<div data-role="display" />').css({ 'float': 'right' });
                if (/msie/.test(navigator.userAgent.toLowerCase())) {
                    $rightPanel.css({ 'padding-top': '3px' });
                }

                $cell.append($leftPanel).append($rightPanel);

                $tfoot = $('<tfoot />').append($row);
                $grid.append($tfoot);
                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);

                leftControls = gj.grid.methods.clone(data.pager.leftControls); //clone array
                $.each(leftControls, function () {
                    $leftPanel.append(this);
                });

                rightControls = gj.grid.methods.clone(data.pager.rightControls); //clone array
                $.each(rightControls, function () {
                    $rightPanel.append(this);
                });

                controls = $grid.find('tfoot [data-role]');
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.initPagerControl($(controls[i]), $grid);
                }
            }
        },

        initPagerControl: function ($control, $grid) {
            var data = $grid.data();
            switch ($control.data('role')) {
                case 'page-size':
                    if (data.pager.sizes && 0 < data.pager.sizes.length) {
                        $control.show();
                        $.each(data.pager.sizes, function () {
                            $control.append($('<option/>').attr('value', this.toString()).text(this.toString()));
                        });
                        $control.change(function () {
                            var newSize = parseInt(this.value, 10);
                            data.params[data.defaultParams.limit] = newSize;
                            gj.grid.plugins.pagination.private.changePage($grid, 1);
                            gj.grid.plugins.pagination.events.pageSizeChange($grid, newSize);
                        });
                        $control.val(data.params[data.defaultParams.limit]);
                    } else {
                        $control.hide();
                    }
                    break;
                case 'page-refresh':
                    $control.on('click', function () { $grid.reload(); });
                    break;
            }

        },

        reloadPager: function ($grid, totalRecords) {
            var page, limit, lastPage, firstRecord, lastRecord, data, controls, i;

            data = $grid.data();

            if (data.pager) {
                page = (0 === totalRecords) ? 0 : data.params[data.defaultParams.page];
                limit = parseInt(data.params[data.defaultParams.limit], 10);
                lastPage = Math.ceil(totalRecords / limit);
                firstRecord = (0 === page) ? 0 : (limit * (page - 1)) + 1;
                lastRecord = (firstRecord + limit) > totalRecords ? totalRecords : (firstRecord + limit) - 1;

                controls = $grid.find('TFOOT [data-role]');
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.reloadPagerControl($(controls[i]), $grid, page, lastPage, firstRecord, lastRecord, totalRecords);
                }

                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
            }
        },

        reloadPagerControl: function ($control, $grid, page, lastPage, firstRecord, lastRecord, totalRecords) {
            var newPage;
            switch ($control.data('role')) {
                case 'page-first':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, 1, page < 2);
                    break;
                case 'page-previous':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, page - 1, page < 2);
                    break;
                case 'page-number':
                    $control.val(page).off('change').on('change', gj.grid.plugins.pagination.private.createChangePageHandler($grid, page, lastPage));
                    break;
                case 'page-label-last':
                    $control.text(lastPage);
                    break;
                case 'page-next':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, page + 1, lastPage === page);
                    break;
                case 'page-last':
                    gj.grid.plugins.pagination.private.assignPageHandler($grid, $control, lastPage, lastPage === page);
                    break;
                case 'page-button-one':
                    newPage = (page === 1) ? 1 : ((page == lastPage) ? (page - 2) : (page - 1));
                    gj.grid.plugins.pagination.private.assignButtonHandler($grid, $control, page, newPage, lastPage);
                    break;
                case 'page-button-two':
                    newPage = (page === 1) ? 2 : ((page == lastPage) ? lastPage - 1 : page);
                    gj.grid.plugins.pagination.private.assignButtonHandler($grid, $control, page, newPage, lastPage);
                    break;
                case 'page-button-three':
                    newPage = (page === 1) ? page + 2 : ((page == lastPage) ? page : (page + 1));
                    gj.grid.plugins.pagination.private.assignButtonHandler($grid, $control, page, newPage, lastPage);
                    break;
                case 'record-first':
                    $control.text(firstRecord);
                    break;
                case 'record-last':
                    $control.text(lastRecord);
                    break;
                case 'record-total':
                    $control.text(totalRecords);
                    break;
            }
        },

        assignPageHandler: function ($grid, $control, newPage, disabled) {
            var style = $grid.data().style.pager;
            if (disabled) {
                $control.addClass(style.stateDisabled).prop('disabled', true).off('click');
            } else {
                $control.removeClass(style.stateDisabled).prop('disabled', false).off('click').on('click', function () {
                    gj.grid.plugins.pagination.private.changePage($grid, newPage);
                });
            }
        },

        assignButtonHandler: function ($grid, $control, page, newPage, lastPage) {
            var style = $grid.data().style.pager;
            if (newPage < 1 || newPage > lastPage) {
                $control.hide();
            } else {
                $control.show().off('click').text(newPage);
                if (newPage === page) {
                    $control.addClass(style.activeButton);
                } else {
                    $control.removeClass(style.activeButton).on('click', function () {
                        gj.grid.plugins.pagination.private.changePage($grid, newPage);
                    });
                }
            }
        },

        createChangePageHandler: function ($grid, currentPage, lastPage) {
            return function () {
                var data = $grid.data(),
                    newPage = parseInt(this.value, 10);
                if (newPage && !isNaN(newPage) && newPage <= lastPage) {
                    gj.grid.plugins.pagination.private.changePage($grid, newPage);
                } else {
                    this.value = currentPage;
                    alert('Please enter a valid number.');
                }
            };
        },

        changePage: function ($grid, newPage) {
            var data = $grid.data();
            $grid.find('TFOOT [data-role="page-number"]').val(newPage);
            data.params[data.defaultParams.page] = newPage;
            gj.grid.plugins.pagination.events.pageChanging($grid, newPage);
            $grid.reload();
        },

        updatePagerColSpan: function ($grid) {
            var $cell = $grid.find('tfoot > tr[data-role="pager"] > th');
            if ($cell && $cell.length) {
                $cell.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }
        },
        
        isLastRecordVisible: function ($grid) {
            var result = true,
                data = $grid.data(),
                limit = parseInt(data.params[data.defaultParams.limit], 10),
                page = parseInt(data.params[data.defaultParams.page], 10),
                count = $grid.count();
            if (limit && page) {
                result = ((page - 1) * limit) + count === data.totalRecords;
            }
            return result;
        }
    },

    public: {
        getAll: function (includeAllRecords) {
            var limit, page, start, data = this.data();
            if (!includeAllRecords && $.isArray(data.dataSource) && data.params[data.defaultParams.limit] && data.params[data.defaultParams.page]) {
                limit = parseInt(data.params[data.defaultParams.limit], 10);
                page = parseInt(data.params[data.defaultParams.page], 10);
                start = (page - 1) * limit;
                return data.records.slice(start, start + limit);
            } else {
                return data.records;
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
         * @example sample <!-- bootstrap, grid.base, grid.pagination -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/DataSources/GetPlayers',
         *         uiLibrary: 'bootstrap',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         *     grid.on('pageSizeChange', function (e, newSize) {
         *         alert('The new page size is ' + newSize + '.');
         *     });
         * </script>
         */
        pageSizeChange: function ($grid, newSize) {
            $grid.triggerHandler('pageSizeChange', [newSize]);
        },

        /**
         * Triggered before the change of the page.
         *
         * @event pageChanging
         * @param {object} e - event data
         * @param {number} newPage - The new page
         * @example sample <!-- jqueryui, grid.base, grid.pagination -->
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/DataSources/GetPlayers',
         *         uiLibrary: 'jqueryui',
         *         columns: [ { field: 'ID' }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         *     grid.on('pageChanging', function (e, newPage) {
         *         alert('The new page is ' + newPage + '.');
         *     });
         * </script>
         */
        pageChanging: function ($grid, newSize) {
            $grid.triggerHandler('pageChanging', [newSize]);
        }
    },

    configure: function ($grid, fullConfig, clientConfig) {
        $.extend(true, $grid, gj.grid.plugins.pagination.public);
        var data = $grid.data();
        if (clientConfig.pager) {
            gj.grid.methods.isLastRecordVisible = gj.grid.plugins.pagination.private.isLastRecordVisible;

            $grid.on('initialized', function () {
                gj.grid.plugins.pagination.private.init($grid);
            });
            $grid.on('dataBound', function (e, records, totalRecords) {
                gj.grid.plugins.pagination.private.reloadPager($grid, totalRecords);
            });
            $grid.on('columnShow', function () {
                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
            });
            $grid.on('columnHide', function () {
                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
            });
        }
    }
};
