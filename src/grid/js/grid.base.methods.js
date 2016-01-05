gj.grid.methods = {

    init: function (jsConfig) {
        var plugin, option, data;
        gj.grid.methods.configure(this, jsConfig || {});
        //Initialize all plugins
        for (plugin in gj.grid.plugins) {
            if (gj.grid.plugins.hasOwnProperty(plugin)) {
                gj.grid.plugins[plugin].configure(this);
            }
        }
        data = this.data();
        //Initialize events configured as options
        for (option in data) {
            if (gj.grid.events.hasOwnProperty(option)) {
                this.on(option, data[option]);
                delete data[option];
            }
        }
        gj.grid.methods.initialize(this);
        if (data.autoLoad) {
            this.reload();
        }
        return this;
    },

    configure: function ($grid, jsConfig) {
        var options = $.extend(true, {}, gj.grid.config),
            htmlConfig = gj.grid.methods.getHTMLConfiguration($grid);
        if ((jsConfig.uiLibrary && jsConfig.uiLibrary === 'bootstrap') || (htmlConfig.uiLibrary && htmlConfig.uiLibrary === 'bootstrap')) {
            $.extend(true, options, gj.grid.config.bootstrap);
        }
        $.extend(true, options, htmlConfig);
        $.extend(true, options, jsConfig);
        gj.grid.methods.setDefaultColumnConfig(options.columns, options.defaultColumnSettings);
        $grid.data(options);
    },

    setDefaultColumnConfig: function (columns, defaultColumnSettings) {
        var column;
        if (columns && columns.length) {
            for (i = 0; i < columns.length; i++) {
                column = $.extend(true, {}, defaultColumnSettings);
                $.extend(true, column, columns[i]);
                columns[i] = column;
            }
        }
    },

    getHTMLConfiguration: function ($grid) {
        var result = gj.grid.methods.getAttributes($grid);
        if (result && result.source) {
            result.dataSource = result.source;
            delete result.source;
        }
        result.columns = [];
        $grid.find('thead > tr > th').each(function () {
            var $el = $(this),
                title = $el.text(),
                config = gj.grid.methods.getAttributes($el);
            config.title = title;
            if (!config.field) {
                config.field = title;
            }
            if (config.events) {
                config.events = gj.grid.methods.eventsParser(config.events);
            }
            result.columns.push(config);
        });
        return result;
    },

    getAttributes: function ($el) {
        var result = $el.data(),
            width = $el.attr('width');
        if (width) {
            result.width = width;
        }
        return result;
    },

    eventsParser: function (events) {
        var result = {}, list, i, key, func, position;
        list = events.split(',');
        for (i = 0; i < list.length; i++) {
            position = list[i].indexOf(':');
            if (position > 0) {
                key = $.trim(list[i].substr(0, position));
                func = $.trim(list[i].substr(position + 1, list[i].length));
                result[key] = eval('window.' + func); //window[func]; //TODO: eveluate functions from string
            }
        }
        return result;
    },

    defaultSuccessHandler: function ($grid) {
        return function (response) {
            $grid.render(response);
        };
    },

    initialize: function ($grid) {
        var data = $grid.data(),
            $wrapper = $grid.parent('div[data-role="wrapper"]');

        if ($wrapper.length === 0) {
            $wrapper = $('<div data-role="wrapper" />').addClass(data.style.wrapper); //The css class needs to be added before the wrapping, otherwise doesn't work.
            $grid.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }

        if (data.width) {
            $grid.parent().css('width', data.width);
        }
        if (data.minWidth) {
            $grid.css('min-width', data.minWidth);
        }
        if (data.fontSize) {
            $grid.css('font-size', data.fontSize);
        }
        $grid.addClass(data.style.table);
        if ('checkbox' === data.selectionMethod) {
            data.columns = [{ title: '', field: data.dataKey, width: (data.uiLibrary === 'jqueryui' ? 24 : 30), align: 'center', type: 'checkbox' }].concat(data.columns);
        }
        $grid.append($('<tbody/>'));

        gj.grid.methods.renderHeader($grid);
        gj.grid.methods.appendEmptyRow($grid, '&nbsp;');
        gj.grid.events.initialized($grid);
    },

    renderHeader: function ($grid) {
        var data, columns, style, sortBy, direction, $thead, $row, $cell, i, $checkAllBoxes;

        data = $grid.data();
        columns = data.columns;
        style = data.style.header;
        sortBy = data.params[data.defaultParams.sortBy];
        direction = data.params[data.defaultParams.direction];

        $thead = $grid.children('thead');
        if ($thead.length === 0) {
            $thead = $('<thead />');
            $grid.prepend($thead);
        }

        $row = $('<tr/>');
        for (i = 0; i < columns.length; i += 1) {
            $cell = $('<th/>');
            if (columns[i].width) {
                $cell.attr('width', columns[i].width);
            }
            $cell.addClass(style.cell);
            if (columns[i].headerCssClass) {
                $cell.addClass(columns[i].headerCssClass);
            }
            $cell.css('text-align', columns[i].align || 'left');
            if (columns[i].sortable) {
                $cell.addClass(style.sortable);
                $cell.on('click', gj.grid.methods.createSortHandler($grid, $cell));
            }
            if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType && 'checkbox' === columns[i].type) {
                $checkAllBoxes = $cell.find('input[id="checkAllBoxes"]'); //TODO: use data-role instead of id. this is going to cause some other bugs.
                if ($checkAllBoxes.length === 0) {
                    $checkAllBoxes = $('<input type="checkbox" id="checkAllBoxes" />');
                    $cell.append($checkAllBoxes);
                }
                $checkAllBoxes.hide().off('click').on('click', function () {
                    if (this.checked) {
                        $grid.selectAll();
                    } else {
                        $grid.unSelectAll();
                    }
                });
            } else {
                $cell.append($('<div style="float: left"/>').text(typeof (columns[i].title) === 'undefined' ? columns[i].field : columns[i].title));
            }
            if (columns[i].hidden) {
                $cell.hide();
            }

            $cell.data('cell', columns[i]);
            $row.append($cell);
        }

        $thead.empty().append($row);
    },

    createSortHandler: function ($grid, $cell) {
        return function () {
            var $sortIcon, data, cellData, style, params = {};
            if ($grid.count() > 0) {
                data = $grid.data();
                cellData = $cell.data('cell');
                cellData.direction = (cellData.direction === 'asc' ? 'desc' : 'asc');
                params[data.defaultParams.sortBy] = cellData.field;
                params[data.defaultParams.direction] = cellData.direction;

                style = data.style.header;
                $cell.siblings().find('span[data-role="sorticon"]').remove();
                $sortIcon = $cell.children('span[data-role="sorticon"]');
                if ($sortIcon.length === 0) {
                    $sortIcon = $('<span data-role="sorticon" style="float: left; margin-left:5px;"/>');
                    $cell.append($sortIcon);
                } else {
                    $sortIcon.removeClass('asc' === cellData.direction ? style.sortDescIcon : style.sortAscIcon);
                }
                $sortIcon.addClass('asc' === cellData.direction ? style.sortAscIcon : style.sortDescIcon);

                $grid.reload(params);
            }
        };
    },

    startLoading: function ($grid) {
        var $tbody, $cover, $loading, width, height, top, data;
        gj.grid.methods.stopLoading($grid);
        data = $grid.data();
        if (0 === $grid.outerHeight()) {
            return;
        }
        $tbody = $grid.children('tbody');
        width = $tbody.outerWidth(false);
        height = $tbody.outerHeight(false);
        top = $tbody.prev().outerHeight(false) + $grid.prevAll().outerHeight(false) + parseInt($grid.parent().css('padding-top').replace('px', ''), 10);
        $cover = $('<div data-role="loading-cover" />').addClass(data.style.loadingCover).css({
            width: width,
            height: height,
            top: top
        });
        $loading = $('<div data-role="loading-text">Loading...</div>').addClass(data.style.loadingText);
        $loading.insertAfter($grid);
        $cover.insertAfter($grid);
        $loading.css({
            top: top + (height / 2) - ($loading.outerHeight(false) / 2),
            left: (width / 2) - ($loading.outerWidth(false) / 2)
        });
    },

    stopLoading: function ($grid) {
        $grid.parent().find('div[data-role="loading-cover"]').remove();
        $grid.parent().find('div[data-role="loading-text"]').remove();
    },

    createAddRowHoverHandler: function ($row, cssClass) {
        return function () {
            $row.addClass(cssClass);
        };
    },

    createRemoveRowHoverHandler: function ($row, cssClass) {
        return function () {
            $row.removeClass(cssClass);
        };
    },

    appendEmptyRow: function ($grid, caption) {
        var data, $row, $cell, $wrapper;
        data = $grid.data();
        $row = $('<tr data-role="empty"/>');
        $cell = $('<td/>').css({ width: '100%', 'text-align': 'center' });
        $cell.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
        $wrapper = $('<div />').html(caption || data.notFoundText);
        $cell.append($wrapper);
        $row.append($cell);

        gj.grid.events.beforeEmptyRowInsert($grid, $row);

        $grid.append($row);
    },

    autoGenerateColumns: function ($grid, records) {
        var names, value, type,
            data = $grid.data();
        data.columns = [];
        if (records.length > 0) {
            names = Object.getOwnPropertyNames(records[0]);
            for (i = 0; i < names.length; i++) {
                value = records[0][names[i]];
                type = 'text';
                if (value) {
                    if (value.indexOf('/Date(') > -1) {
                        type = 'date';
                    } else if (typeof value === 'number') {
                        type = 'number';
                    }
                }
                data.columns.push({ field: names[i], type: type });
            }
            gj.grid.methods.setDefaultColumnConfig(data.columns, data.defaultColumnSettings);
        }
        gj.grid.methods.renderHeader($grid);
    },

    loadData: function ($grid) {
        var data, i, j, recLen, rowCount,
            $tbody, $rows, $row, $checkAllBoxes;

        data = $grid.data();
        gj.grid.events.dataBinding($grid, data.records);
        recLen = data.records.length;
        gj.grid.methods.stopLoading($grid);

        if (data.autoGenerateColumns) {
            gj.grid.methods.autoGenerateColumns($grid, data.records);
        }

        $tbody = $grid.find('tbody');
        if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType) {
            $checkAllBoxes = $grid.find('input#checkAllBoxes');
            $checkAllBoxes.prop('checked', false);
            if (0 === recLen) {
                $checkAllBoxes.hide();
            } else {
                $checkAllBoxes.show();
            }
        }
        $tbody.find('tr[data-role="empty"]').remove();
        if (0 === recLen) {
            $tbody.empty();
            gj.grid.methods.appendEmptyRow($grid);
        }

        $rows = $tbody.children('tr');
        rowCount = $rows.length;

        for (i = 0; i < rowCount; i++) {
            if (i < recLen) {
                $row = $rows.eq(i);
                gj.grid.methods.renderRow($grid, $row, data.records[i], i);
            } else {
                $tbody.find('tr:gt(' + (i - 1) + ')').remove();
                break;
            }
        }

        for (i = rowCount; i < recLen; i++) {
            gj.grid.methods.renderRow($grid, null, data.records[i], i);
        }
        gj.grid.events.dataBound($grid, data.records, data.totalRecords);
    },

    renderRow: function ($grid, $row, record, position) {
        var id, $cell, i, data, mode;
        data = $grid.data();
        if (!$row || $row.length === 0) {
            mode = 'create';
            $row = $($grid.find('tbody')[0].insertRow(position));
            $row.attr('data-role', 'row');
            $row.on('mouseenter', gj.grid.methods.createAddRowHoverHandler($row, data.style.content.rowHover));
            $row.on('mouseleave', gj.grid.methods.createRemoveRowHoverHandler($row, data.style.content.rowHover));
        } else {
            mode = 'update';
            $row.removeClass(data.style.content.rowSelected).off('click');
        }
        id = (data.dataKey && record[data.dataKey]) ? record[data.dataKey] : (position + 1);
        $row.data('row', { id: id, record: record });
        $row.on('click', gj.grid.methods.createRowClickHandler($grid, id, record));
        for (i = 0; i < data.columns.length; i++) {
            if (mode === 'update') {
                $cell = $row.find('td:eq(' + i + ')');
                gj.grid.methods.renderCell($grid, $cell, data.columns[i], record, id);
            } else {
                $cell = gj.grid.methods.renderCell($grid, null, data.columns[i], record, id);
                $row.append($cell);
            }
        }
        gj.grid.events.rowDataBound($grid, $row, id, record);
    },

    renderCell: function ($grid, $cell, column, record, id, mode) {
        var text, $wrapper, $icon, data;

        data = $grid.data();

        if (!$cell || $cell.length === 0) {
            $cell = $('<td/>').css('text-align', column.align || 'left');
            $wrapper = $('<div data-role="display" />');
            if (column.cssClass) {
                $cell.addClass(column.cssClass);
            }
            $cell.append($wrapper);
            mode = 'create';
        } else {
            $wrapper = $cell.find('div[data-role="display"]');
            mode = 'update';
        }

        if ('checkbox' === column.type) {
            if ('create' === mode) {
                $wrapper.append($('<input />').attr('type', 'checkbox').val(id));
            } else {
                $wrapper.find('input[type="checkbox"]').val(id).prop('checked', false);
            }
        } else if ('icon' === column.type) {
            if ('create' === mode) {
                $wrapper.append($('<span/>')
                    .addClass(data.uiLibrary === 'bootstrap' ? 'glyphicon' : 'ui-icon')
                    .addClass(column.icon).css({ cursor: 'pointer' }));
            }
        } else if (column.tmpl) {
            text = column.tmpl;
            column.tmpl.replace(/\{(.+?)\}/g, function ($0, $1) {
                text = text.replace($0, gj.grid.methods.formatText(record[$1], column));
            });
            $wrapper.text(text);
        } else {
            gj.grid.methods.setCellText($wrapper, column, record[column.field]);
        }
        if (column.tooltip && 'create' === mode) {
            $wrapper.attr('title', column.tooltip);
        }
        //remove all event handlers
        if ('update' === mode) {
            $cell.off();
            $wrapper.off();
        }
        if (column.events) {
            for (var key in column.events) {
                if (column.events.hasOwnProperty(key)) {
                    $cell.on(key, { id: id, field: column.field, record: record }, column.events[key]);
                }
            }
        }
        if (column.hidden) {
            $cell.hide();
        }

        gj.grid.events.cellDataBound($grid, $wrapper, id, column, record);

        return $cell;
    },

    setCellText: function ($wrapper, column, value) {
        var text = gj.grid.methods.formatText(value, column);
        if (!column.tooltip) {
            $wrapper.attr('title', text);
        }
        $wrapper.text(text);
    },

    formatText: function (text, column) {
        var dt, day, month;
        if (text && column.type) {
            switch (column.type) {
                case 'date':
                    if (text.indexOf('/Date(') > -1) {
                        dt = new Date(parseInt(text.substr(6), 10));
                    } else {
                        var parts = text.match(/(\d+)/g);
                        // new Date(year, month, date, hours, minutes, seconds);
                        dt = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]); // months are 0-based
                    }

                    if (dt.format && column.format) {
                        text = dt.format(column.format); //using 3rd party plugin "Date Format 1.2.3 by (c) 2007-2009 Steven Levithan <stevenlevithan.com>"
                    } else {
                        day = dt.getDate().toString().length === 2 ? dt.getDate() : '0' + dt.getDate();
                        month = (dt.getMonth() + 1).toString();
                        month = month.length === 2 ? month : '0' + month;
                        text = month + '/' + day + '/' + dt.getFullYear();
                    }
                    break;
            }
        } else {
            text = (typeof (text) === 'undefined' || text === null) ? '' : text.toString();
        }
        if (column.decimalDigits && text) {
            text = parseFloat(text).toFixed(column.decimalDigits);
        }
        return text;
    },

    setRecordsData: function ($grid, response) {
        var records = [],
            totalRecords = 0,
            data = $grid.data();
        if ($.isArray(response)) {
            records = response;
            totalRecords = response.length;
        } else if (data && data.mapping && $.isArray(response[data.mapping.dataField])) {
            records = response[data.mapping.dataField];
            totalRecords = response[data.mapping.totalRecordsField];
            if (!totalRecords || isNaN(totalRecords)) {
                totalRecords = 0;
            }
        }
        $grid.data('records', records);
        $grid.data('totalRecords', totalRecords);
        return records;
    },

    createRowClickHandler: function ($grid, id, record) {
        return function (e) {
            gj.grid.methods.setSelected($grid, id, $(this));
        };
    },

    selectRow: function ($grid, data, $row) {
        $row.addClass(data.style.content.rowSelected);

        gj.grid.events.rowSelect($grid, $row, $row.data('row').id, $row.data('row').record);

        if ('checkbox' === data.selectionMethod) {
            $row.find('td:nth-child(1) input[type="checkbox"]').prop('checked', true);
        }
    },

    unselectRow: function ($grid, data, $row) {
        if ($row.hasClass(data.style.content.rowSelected)) {
            $row.removeClass(data.style.content.rowSelected);

            gj.grid.events.rowUnselect($grid, $row, $row.data('row').id, $row.data('row').record)

            if ('checkbox' === data.selectionMethod) {
                $row.find('td:nth-child(1) input[type="checkbox"]').prop('checked', false);
            }
        }
    },

    setSelected: function ($grid, id, $row) {
        var data = $grid.data();
        if (!$row || !$row.length) {
            $row = gj.grid.methods.getRowById($grid, id);
        }
        if ($row) {
            if ($row.hasClass(data.style.content.rowSelected)) {
                gj.grid.methods.unselectRow($grid, data, $row);
            } else {
                if ('single' === data.selectionType) {
                    $row.siblings().each(function () {
                        gj.grid.methods.unselectRow($grid, data, $(this));
                    });
                }
                gj.grid.methods.selectRow($grid, data, $row);
            }
        }
        return $grid;
    },

    selectAll: function ($grid) {
        var data = $grid.data();
        $grid.find('thead input#checkAllBoxes').prop('checked', true);
        $grid.find('tbody tr').each(function () {
            gj.grid.methods.selectRow($grid, data, $(this));
        });
        return $grid;
    },

    unSelectAll: function ($grid) {
        var data = $grid.data();
        $grid.find('thead input#checkAllBoxes').prop('checked', false);
        $grid.find('tbody tr').each(function () {
            gj.grid.methods.unselectRow($grid, data, $(this));
        });
        return $grid;
    },

    getSelected: function ($grid) {
        var result, data, selections;
        data = $grid.data();
        selections = $grid.find('tbody > tr.' + data.style.content.rowSelected);
        if (selections.length > 0) {
            result = $(selections[0]).data('row').id;
        }
        return result;
    },

    getSelectedRows: function ($grid) {
        var data = $grid.data();
        return $grid.find('tbody > tr.' + data.style.content.rowSelected);
    },

    getSelections: function ($grid) {
        var result = [],
            $selections = gj.grid.methods.getSelectedRows($grid);
        if (0 < $selections.length) {
            $selections.each(function () {
                result.push($(this).data('row').id);
            });
        }
        return result;
    },

    getRecordById: function ($grid, id) {
        var result = null, i,
            primaryKey = $grid.data('dataKey'),
            records = $grid.data('records');
        if (primaryKey) {
            for (i = 0; i < records.length; i++) {
                if (records[i][primaryKey] === id) {
                    result = records[i];
                    break;
                }
            }
        } else {
            if (records[id - 1]) {
                result = records[id - 1];
            }
        }
        return result;
    },

    getRowById: function ($grid, id) {
        var result = null, rows, i, rowData;
        rows = $grid.find('tbody > tr');
        for (i = 0; i < rows.length; i++) {
            rowData = $(rows[i]).data('row');
            if (rowData.id === id) {
                result = $(rows[i]);
                break;
            }
        }
        return result;
    },

    getByPosition: function ($grid, position) {
        var result = {}, $rows, data;
        $rows = $grid.find('tbody > tr[data-role="row"]');
        if ($rows.length >= position) {
            data = $rows.eq(position - 1).data('row');
            if (data && data.record) {
                result = data.record;
            }
        }
        return result;
    },

    getColumnPosition: function (columns, field) {
        var position = -1, i;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].field === field) {
                position = i;
                break;
            }
        }
        return position;
    },

    getColumnInfo: function ($grid, field) {
        var i, result = {}, data = $grid.data();
        for (i = 0; i < data.columns.length; i += 1) {
            if (data.columns[i].field === field) {
                result = data.columns[i];
                break;
            }
        }
        return result;
    },

    getCell: function ($grid, id, index) {
        var result = {}, rows, i, rowData, position;
        position = gj.grid.methods.getColumnPosition($grid, index);
        rows = $grid.find('tbody > tr[data-role="row"]');
        for (i = 0; i < rows.length; i += 1) {
            rowData = $(rows[i]).data('row');
            if (rowData.id === id) {
                result = $(rows[i].cells[position]).find('div');
                break;
            }
        }
        return result;
    },

    setCellContent: function ($grid, id, index, value) {
        var column, $cellWrapper = gj.grid.methods.getCell($grid, id, index);
        $cellWrapper.empty();
        if (typeof (value) === 'object') {
            $cellWrapper.append(value);
        } else {
            column = gj.grid.methods.getColumnInfo($grid, index);
            gj.grid.methods.setCellText($cellWrapper, column, value);
        }
    },

    clone: function (source) {
        var target = [];
        $.each(source, function () {
            target.push(this.clone());
        });
        return target;
    },

    getAll: function ($grid) {
        var result = [],
                rows = $grid.find('tbody > tr[data-role="row"]'),
                i, record;

        for (i = 0; i < rows.length; i++) {
            record = $(rows[i]).data('row');
            if (record) {
                result.push(record);
            }
        }
        return result;
    },

    countVisibleColumns: function ($grid) {
        var columns, count, i;
        columns = $grid.data().columns;
        count = 0;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].hidden !== true) {
                count++;
            }
        }
        return count;
    },

    reload: function ($grid, params) {
        var data, ajaxOptions, records;
        data = $grid.data();
        $.extend(data.params, params);
        gj.grid.methods.startLoading($grid);
        if ($.isArray(data.dataSource)) {
            gj.grid.methods.setRecordsData($grid, data.dataSource);
            gj.grid.methods.loadData($grid);
        } else if (typeof (data.dataSource) === 'string') {
            ajaxOptions = { url: data.dataSource, data: data.params, success: gj.grid.methods.defaultSuccessHandler($grid) };
            if ($grid.xhr) {
                $grid.xhr.abort();
            }
            $grid.xhr = $.ajax(ajaxOptions);
        } else if (typeof (data.dataSource) === 'object') {
            if (!data.dataSource.data) {
                data.dataSource.data = {};
            }
            $.extend(data.dataSource.data, data.params);
            ajaxOptions = $.extend(true, {}, data.dataSource); //clone dataSource object
            if (ajaxOptions.dataType === 'json' && typeof (ajaxOptions.data) === 'object') {
                ajaxOptions.data = JSON.stringify(ajaxOptions.data);
            }
            if (!ajaxOptions.success) {
                ajaxOptions.success = gj.grid.methods.defaultSuccessHandler($grid);
            }
            if ($grid.xhr) {
                $grid.xhr.abort();
            }
            $grid.xhr = $.ajax(ajaxOptions);
        }
        return $grid;
    },

    clear: function ($grid, showNotFoundText) {
        var data = $grid.data();
        $grid.xhr && $grid.xhr.abort();
        if ('checkbox' === data.selectionMethod) {
            $grid.find('input#checkAllBoxes').hide();
        }
        $grid.children('tbody').empty();
        gj.grid.methods.stopLoading($grid);
        gj.grid.methods.appendEmptyRow($grid, showNotFoundText ? data.notFoundText : '&nbsp;');
        gj.grid.events.dataBound($grid, [], 0);
        return $grid;
    },

    render: function ($grid, response) {
        var data, records, totalRecords;
        if (response) {
            if (typeof (response) === 'string' && JSON) {
                response = JSON.parse(response);
            }
            records = gj.grid.methods.setRecordsData($grid, response);
            gj.grid.methods.loadData($grid);
        }
    },

    destroy: function ($grid, keepTableTag, keepWrapperTag) {
        var data = $grid.data();
        if (data) {
            gj.grid.events.destroying($grid);
            gj.grid.methods.stopLoading($grid);
            $grid.xhr && $grid.xhr.abort();
            $grid.off();
            if (keepWrapperTag === false && $grid.parent('div[data-role="wrapper"]').length > 0) {
                $grid.unwrap();
            }
            $grid.removeData();
            if (keepTableTag === false) {
                $grid.remove();
            } else {
                $grid.removeClass().empty();
            }
        }
        return $grid;
    },

    showColumn: function ($grid, field) {
        var data = $grid.data(),
            position = gj.grid.methods.getColumnPosition(data.columns, field),
            $cells;

        if (position > -1) {
            $grid.find('thead>tr>th:eq(' + position + ')').show();
            $.each($grid.find('tbody>tr'), function () {
                $(this).find('td:eq(' + position + ')').show();
            });
            data.columns[position].hidden = false;

            $cells = $grid.find('tbody > tr[data-role="empty"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }

            gj.grid.events.columnShow($grid, data.columns[position]);
        }

        return $grid;
    },

    hideColumn: function ($grid, field) {
        var data = $grid.data(),
            position = gj.grid.methods.getColumnPosition(data.columns, field),
            $cells;

        if (position > -1) {
            $grid.find('thead>tr>th:eq(' + position + ')').hide();
            $.each($grid.find('tbody>tr'), function () {
                $(this).find('td:eq(' + position + ')').hide();
            });
            data.columns[position].hidden = true;

            $cells = $grid.find('tbody > tr[data-role="empty"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }

            gj.grid.events.columnHide($grid, data.columns[position]);
        }

        return $grid;
    },

    addRow: function ($grid, record) {
        var position, $rows = $grid.find('tbody > tr');
        //clear empty row if exists
        if ($rows.length === 1 && $rows.data('role') === 'empty') {
            $rows.remove();
        }
        position = $grid.count();
        gj.grid.methods.renderRow($grid, null, record, position);
        return $grid;
    }
};
