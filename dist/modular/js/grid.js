/*
 * Gijgo Grid v2.0.0-alpha-1
 * http://gijgo.com/grid
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.grid = {
    plugins: {},
    messages: {}
};

gj.grid.config = {
    base: {
        /** The data source for the grid.         */        dataSource: undefined,

        /** An array that holds the configurations of each column from the grid.         */        columns: [],

        /** Auto generate column for each field in the datasource when set to true.         */        autoGenerateColumns: false,

        /** An object that holds the default configuration settings of each column from the grid.         */        defaultColumnSettings: {

            /** If set to true the column will not be displayed in the grid. By default all columns are displayed.             */            hidden: false,

            /** The width of the column. Numeric values are treated as pixels.
             * If the width is undefined the width of the column is not set and depends on the with of the table(grid).             */            width: undefined,

            /** Indicates if the column is sortable.
             * If set to true the user can click the column header and sort the grid by the column source field.             */            sortable: false,

            /** Indicates the type of the column.             */            type: 'text',

            /** The caption that is going to be displayed in the header of the grid.             */            title: undefined,

            /** The field name to which the column is bound.
             * If the column.title is not defined this value is used as column.title.             */            field: undefined,

            /** This setting control the alignment of the text in the cell.             */            align: undefined,

            /** The name(s) of css class(es) that are going to be applied to all cells inside that column, except the header cell.             */            cssClass: undefined,

            /** The name(s) of css class(es) that are going to be applied to the header cell of that column.             */            headerCssClass: undefined,

            /** The text for the cell tooltip.             */            tooltip: undefined,

            /** Css class for icon that is going to be in use for the cell.
             * This setting can be in use only with combination of type icon.             */            icon: undefined,

            /** Configuration object with event names as keys and functions as values that are going to be bind to each cell from the column.
             * Each function is going to receive event information as a parameter with info in the 'data' field for id, field name and record data.             */            events: undefined,

            /** Format the date when the type of the column is date.             */            format: 'mm/dd/yyyy',

            /** Number of decimal digits after the decimal point.             */            decimalDigits: undefined,

            /** Template for the content in the column.
             * Use curly brackets '{}' to wrap the names of data source columns from server response.             */            tmpl: undefined,

            /** If set to true stop event propagation when event occur.             */            stopPropagation: false,

            /** A renderer is an 'interceptor' function which can be used to transform data (value, appearance, etc.) before it is rendered.             */            renderer: undefined,

            /** Function which can be used to customize filtering with local data (javascript sourced data).             */            filter: undefined
        },

        mapping: {
            /** The name of the object in the server response, that contains array with records, that needs to be display in the grid.             */            dataField: 'records',

            /** The name of the object in the server response, that contains the number of all records on the server.             */            totalRecordsField: 'total'
        },

        params: {},

        paramNames: {

            /** The name of the parameter that is going to send the name of the column for sorting.
             * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.             */            sortBy: 'sortBy',

            /** The name of the parameter that is going to send the direction for sorting.
             * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.             */            direction: 'direction'
        },

        /** The name of the UI library that is going to be in use. Currently we support Bootstrap 3, Bootstrap 4 and Material Design.         */        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.         */        iconsLibrary: 'materialicons',

        /** The type of the row selection.<br/>
         * If the type is set to multiple the user will be able to select more then one row from the grid.         */        selectionType: 'single',

        /** The type of the row selection mechanism.         */        selectionMethod: 'basic',

        /** When this setting is enabled the content of the grid will be loaded automatically after the creation of the grid.         */        autoLoad: true,

        /** The text that is going to be displayed if the grid is empty.         */        notFoundText: undefined,

        /** Width of the grid.         */        width: undefined,

        /** Minimum width of the grid.         */        minWidth: undefined,

        /** This configuration option manage the behaviour of the header row height.
         * Auto scale if set to to 'autogrow'. All body rows are with the same height if set to 'fixed'.         */        headerRowHeight: 'fixed',

        /** This configuration option manage the behaviour of the body row height.
         * Auto scale if set to to 'autogrow'. All body rows are with the same height if set to 'fixed'.         */        bodyRowHeight: 'autogrow',

        /** The size of the font in the grid.         */        fontSize: undefined,

        /** Name of column that contains the record id.          */        primaryKey: undefined,

        /** The language that needs to be in use.         */        locale: 'en-us',

        defaultIconColumnWidth: 70,
        defaultCheckBoxColumnWidth: 70,

        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-md',
            loadingCover: 'gj-grid-loading-cover',
            loadingText: 'gj-grid-loading-text',
            header: {
                cell: undefined,
                sortable: 'gj-cursor-pointer gj-unselectable'
            },
            content: {
                rowSelected: 'gj-grid-md-select'
            }
        },

        icons: {
            asc: '▲',
            desc: '▼'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-bootstrap gj-grid-bootstrap-3 table table-bordered table-hover',
            content: {
                rowSelected: 'active'
            }
        },

        iconsLibrary: 'glyphicons',

        defaultIconColumnWidth: 34,
        defaultCheckBoxColumnWidth: 36
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-bootstrap gj-grid-bootstrap-4 table table-bordered table-hover',
            content: {
                rowSelected: 'active'
            }
        },

        defaultIconColumnWidth: 42,
        defaultCheckBoxColumnWidth: 44
    },

    bootstrap5: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-bootstrap gj-grid-bootstrap-5 table table-bordered table-hover',
            content: {
                rowSelected: 'active'
            }
        },

        defaultIconColumnWidth: 42,
        defaultCheckBoxColumnWidth: 44
    },

    materialicons: {
        icons: {
            asc: '<i class="gj-icon arrow-upward" />',
            desc: '<i class="gj-icon arrow-downward" />'
        }
    },

    fontawesome: {
        icons: {
            asc: '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>',
            desc: '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            asc: '<span class="glyphicon glyphicon-sort-by-alphabet" />',
            desc: '<span class="glyphicon glyphicon-sort-by-alphabet-alt" />'
        }
    }
};

/**  */gj.grid.events = {
    /**
     * Event fires before addition of an empty row to the grid.     */    beforeEmptyRowInsert: function (el) {
        return el.dispatchEvent(new Event('beforeEmptyRowInsert'));
    },

    /**
     * Event fired before data binding takes place.
     *     */    dataBinding: function (el, records) {
        return el.dispatchEvent(new CustomEvent('dataBinding', { detail: { records: records } }));
    },

    /**
     * Event fires after the loading of the data in the grid.
     *     */    dataBound: function (el, records, totalRecords) {
        return el.dispatchEvent(new CustomEvent('dataBound', { detail: { records: records, totalRecords: totalRecords } }));
    },

    /**
     * Event fires after insert of a row in the grid during the loading of the data.     */    rowDataBound: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowDataBound', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires after insert of a cell in the grid during the loading of the data
     *     */    cellDataBound: function (el, displayEl, id, column, record) {
        return el.dispatchEvent(new CustomEvent('cellDataBound', { detail: { 
                displayEl: displayEl, id: id, column: column, record: record
            } 
        }));
    },

    /**
     * Event fires on selection of row
     *     */    rowSelect: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowSelect', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires on un selection of row
     *     */    rowUnselect: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowUnselect', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires before deletion of row in the grid.     */    rowRemoving: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowRemoving', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires when the grid.destroy method is called.
     *     */    destroying: function (el) {
        return el.dispatchEvent(new Event('destroying'));
    },

    /**
     * Event fires when column is hidding
     *     */    columnHide: function (el, column) {
        return el.dispatchEvent(new CustomEvent('columnHide', { detail: { column: column } }));
    },

    /**
     * Event fires when column is showing
     *     */    columnShow: function (el, column) {
        return el.dispatchEvent(new CustomEvent('columnShow', { detail: { column: column } }));
    },

    /**
     * Event fires when grid is initialized.
     *     */    initialized: function (el) {
        return el.dispatchEvent(new Event('initialized'));
    },

    /**
     * Event fires when the grid data is filtered.
     *     */    dataFiltered: function (el, records) {
        return el.dispatchEvent(new CustomEvent('dataFiltered', { detail: { records: records } }));
    }
};

/*global gj $*/
gj.grid.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);

        gj.grid.methods.initialize(this);

        if (this.getConfig().autoLoad) {
            this.reload();
        }
        return this;
    },

    readConfig: function (jsConfig) {
        let config = gj.widget.prototype.readConfig.call(this, jsConfig);
        gj.grid.methods.setDefaultColumnConfig(config.columns, config.defaultColumnSettings);
        return config;
    },

    setDefaultColumnConfig: function (columns, defaultColumnSettings) {
        let column, i;
        if (columns && columns.length) {
            for (i = 0; i < columns.length; i++) {
                column = gj.core.extend({}, defaultColumnSettings);
                column = gj.core.extend(column, columns[i]);
                columns[i] = column;
            }
        }
    },

    readHTMLConfig: function () {
        let result = gj.widget.prototype.readHTMLConfig.call(this),
            columns = this.element.querySelectorAll('thead > tr > th');
        result.columns = [];
        for (const el of columns) {
            let title = el.innerText,
                config = gj.widget.prototype.readHTMLConfig.call({ element: el });
            config.title = title;
            if (!config.field) {
                config.field = title;
            }
            if (config.events) {
                config.events = gj.grid.methods.eventsParser(config.events);
            }
            result.columns.push(config);
        }
        return result;
    },

    eventsParser: function (events) {
        let result = {}, list, i, key, func, position;
        list = events.split(',');
        for (i = 0; i < list.length; i++) {
            position = list[i].indexOf(':');
            if (position > 0) {
                key = list[i].substr(0, position).trim();
                func = list[i].substr(position + 1, list[i].length).trim();
                result[key] = eval('window.' + func); //window[func]; //TODO: eveluate functions from string
            }
        }
        return result;
    },
    
    initialize: function (grid) {
        let wrapper, data = grid.getConfig();

        gj.grid.methods.localization(data);

        wrapper = grid.wrap('div');

        if (data.width) {
            gj.core.css(wrapper, 'width', data.width);
        }
        if (data.minWidth) {
            grid.element.style.minWidth = data.minWidth;
        }
        if (data.fontSize) {
            gj.core.css(grid.element, 'fontSize', data.fontSize);
        }
        if (data.headerRowHeight === 'autogrow') {
            grid.element.classList.add('autogrow-header-row');
        }
        if (data.bodyRowHeight === 'fixed') {
            grid.element.classList.add('fixed-body-rows');
        }
        gj.core.addClasses(grid.element, data.style.table);
        if ('checkbox' === data.selectionMethod) {
            data.columns.splice(gj.grid.methods.getColumnPositionNotInRole(grid), 0, {
                title: '',
                width: data.defaultCheckBoxColumnWidth,
                align: 'center',
                type: 'checkbox',
                role: 'selectRow',
                events: {
                    change: function (e) {
                        gj.grid.methods.setSelected(grid, e.detail.id, this.closest('tr'));
                    }
                },
                headerCssClass: 'gj-grid-select-all',
                stopPropagation: true
            });
        }
        
        if (!grid.element.querySelector('tbody')) {
            grid.element.appendChild(document.createElement('tbody'));
        }

        gj.grid.methods.renderHeader(grid);
        gj.grid.methods.appendEmptyRow(grid, '&nbsp;');
        gj.grid.events.initialized(grid.element);
    },

    localization: function (data) {
        if (!data.notFoundText) {
            data.notFoundText = gj.grid.messages[data.locale].NoRecordsFound;
        }
    },

    renderHeader: function (grid) {
        let data, columns, style, thead, row, cell, title, i, checkAllBoxes;

        data = grid.getConfig();
        columns = data.columns;
        style = data.style.header;

        thead = grid.element.querySelector('thead');
        if (!thead) {
            thead = document.createElement('thead');
            grid.element.insertBefore(thead, grid.element.firstChild);
        }

        row = document.createElement('tr');
        row.setAttribute('data-gj-role', 'caption');
        for (i = 0; i < columns.length; i += 1) {
            cell = document.createElement('th');
            cell.setAttribute('data-gj-field', columns[i].field || '');
            if (columns[i].width) {
                cell.setAttribute('width', columns[i].width);
            } else if (columns[i].type === 'checkbox') {
                cell.setAttribute('width', data.defaultIconColumnWidth);
            }
            gj.core.addClasses(cell, style.cell);
            if (columns[i].headerCssClass) {
                gj.core.addClasses(cell, columns[i].headerCssClass);
            }
            cell.style.textAlign = columns[i].align || 'left';
            if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType &&
                'checkbox' === columns[i].type && 'selectRow' === columns[i].role) {
                checkAllBoxes = cell.querySelector('input[data-gj-role="selectAll"]');
                if (!checkAllBoxes) {
                    checkAllBoxes = document.createElement('input');
                    checkAllBoxes.setAttribute('type', 'checkbox');
                    checkAllBoxes.setAttribute('data-gj-role', 'selectAll');
                    cell.appendChild(checkAllBoxes);
                    new GijgoCheckBox(checkAllBoxes, { uiLibrary: data.uiLibrary });
                }
                checkAllBoxes.addEventListener('click', function () {
                    if (this.checked) {
                        grid.selectAll();
                    } else {
                        grid.unSelectAll();
                    }
                });
            } else {
                title = document.createElement('div');
                title.setAttribute('data-gj-role', 'title');
                title.innerHTML = typeof (columns[i].title) === 'undefined' ? (columns[i].field || '') : columns[i].title;
                cell.appendChild(title);
                if (columns[i].sortable) {
                    gj.core.addClasses(title, style.sortable);
                    title.addEventListener('click', gj.grid.methods.createSortHandler(grid, columns[i]));
                }
            }
            if (columns[i].hidden) {
                cell.style.display = 'none';
            }
            row.appendChild(cell);
        }

        thead.innerHTML = '';
        thead.appendChild(row);
    },

    createSortHandler: function (grid, column) {
        return function () {
            let data, params = {};
            if (grid.count() > 0) {
                data = grid.getConfig();
                params[data.paramNames.sortBy] = column.field;
                column.direction = (column.direction === 'asc' ? 'desc' : 'asc');
                params[data.paramNames.direction] = column.direction;
                grid.reload(params);
            }
        };
    },

    updateHeader: function (grid) {
        let cellTitle, columns,
            data = grid.getConfig(),
            sortBy = data.params[data.paramNames.sortBy],
            direction = data.params[data.paramNames.direction],
            softIcon = grid.element.querySelector('thead tr th [data-gj-role="sorticon"]');

        softIcon && softIcon.remove();

        if (sortBy) {
            position = gj.grid.methods.getColumnPosition(grid.getConfig().columns, sortBy);
            if (position > -1) {
                columns = grid.element.querySelectorAll('thead tr th div[data-gj-role="title"]');
                cellTitle = columns[position];
                sortIcon = document.createElement('div');
                sortIcon.setAttribute('data-gj-role', 'sorticon');
                sortIcon.classList.add('gj-unselectable');
                sortIcon.innerHTML = ('desc' === direction) ? data.icons.desc : data.icons.asc;
                cellTitle.parentNode.appendChild(sortIcon);
            }
        }
    },

    useHtmlDataSource: function (grid, data) {
        let dataSource = [], i, j, cells, record,
            rows = grid.element.querySelectorAll('tbody tr:not([data-gj-role="empty"])');
        for (i = 0; i < rows.length; i++) {
            cells = rows[i].querySelectorAll('td');
            record = {};
            for (j = 0; j < cells.length; j++) {
                record[data.columns[j].field] = cells[j].innerHTML;
            }
            dataSource.push(record);
        }
        data.dataSource = dataSource;
    },

    startLoading: function (grid) {
        let tbody, cover, loading, width, height, top, data;
        gj.grid.methods.stopLoading(grid);
        data = grid.getConfig();
        if (0 === gj.core.height(grid.element)) {
            return;
        }
        tbody = grid.element.querySelector('tbody');
        width = gj.core.width(tbody);
        height = gj.core.height(tbody);
        top = gj.core.height(grid.element.querySelector('thead'));
        cover = document.createElement('div');
        cover.setAttribute('data-gj-role','loading-cover');
        gj.core.addClasses(cover, data.style.loadingCover);
        cover.style.width = width + 'px';
        cover.style.height = height + 'px';
        cover.style.top = top + 'px';
        loading = document.createElement('div');
        loading.setAttribute('data-gj-role','loading-text');
        gj.core.addClasses(loading, data.style.loadingText);
        loading.innerHTML = gj.grid.messages[data.locale].Loading;
        grid.element.parentNode.appendChild(loading);
        grid.element.parentNode.appendChild(cover);
        loading.style.top = (top + (height / 2) - (gj.core.height(loading) / 2)) + 'px';
        loading.style.left = ((width / 2) - (gj.core.width(loading) / 2)) + 'px';
    },

    stopLoading: function (grid) {
        let cover = grid.element.parentNode.querySelector('div[data-gj-role="loading-cover"]'),
            text = grid.element.parentNode.querySelector('div[data-gj-role="loading-text"]');
        cover && cover.remove();
        text && text.remove();
    },

    appendEmptyRow: function (grid, caption) {
        let data, row, cell, text;
        data = grid.getConfig();
        row = document.createElement('tr');
        row.setAttribute('data-gj-role', 'empty');
        cell = document.createElement('td');
        cell.style.width = '100%';
        cell.style.textAlign = 'center';
        cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
        text = document.createElement('div');
        text.innerHTML = caption || data.notFoundText;
        cell.appendChild(text);
        row.appendChild(cell);

        gj.grid.events.beforeEmptyRowInsert(grid.element);

        grid.element.querySelector('tbody').appendChild(row);
    },

    autoGenerateColumns: function (grid, records) {
        let names, value, type, i, data = grid.getConfig();
        data.columns = [];
        if (records.length > 0) {
            names = Object.getOwnPropertyNames(records[0]);
            for (i = 0; i < names.length; i++) {
                value = records[0][names[i]];
                type = 'text';
                if (value) {
                    if (typeof value === 'number') {
                        type = 'number';
                    } else if (value.indexOf('/Date(') > -1) {
                        type = 'date';
                    }
                }
                data.columns.push({ field: names[i], type: type });
            }
            gj.grid.methods.setDefaultColumnConfig(data.columns, data.defaultColumnSettings);
        }
        gj.grid.methods.renderHeader(grid);
    },

    loadData: function (grid) {
        let data, records, i, recLen, rowCount, tbody, rows;

        data = grid.getConfig();
        records = grid.getAll();
        gj.grid.events.dataBinding(grid.element, records);
        recLen = records.length;
        gj.grid.methods.stopLoading(grid);

        if (data.autoGenerateColumns) {
            gj.grid.methods.autoGenerateColumns(grid, records);
        }

        tbody = grid.element.querySelector('tbody');
        if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType) {
            grid.element.querySelector('thead input[data-gj-role="selectAll"]').checked = false;
        }
        rows = tbody.querySelectorAll('tr:not([data-gj-role="row"])')
        rows && rows.forEach(row => row.remove());
        if (0 === recLen) {
            tbody.innerHTML = '';
            gj.grid.methods.appendEmptyRow(grid);
        }

        rows = tbody.querySelectorAll('tr[data-gj-role="row"]');

        rowCount = rows.length;

        for (i = 0; i < rowCount; i++) {
            if (i < recLen) {
                gj.grid.methods.renderRow(grid, rows[i], records[i], i);
            } else {
                rows[i].remove();
            }
        }

        for (i = rowCount; i < recLen; i++) {
            gj.grid.methods.renderRow(grid, null, records[i], i);
        }
        gj.grid.events.dataBound(grid.element, records, grid.getTotalRecords());
    },

    getId: function (record, primaryKey, position) {
        return (primaryKey && record[primaryKey]) ? record[primaryKey] : position;
    },

    renderRow: function (grid, row, record, position) {
        let id, cell, i, data, mode;
        data = grid.getConfig();
        if (!row) {
            mode = 'create';
            row = document.createElement('tr');
            row.setAttribute('data-gj-role', 'row');
            grid.element.querySelector('tbody').appendChild(row);
        } else {
            mode = 'update';
            row.classList.remove(data.style.content.rowSelected)
            row.removeAttribute('data-gj-selected')
            gj.core.off(row, 'click');
        }
        id = gj.grid.methods.getId(record, data.primaryKey, (position + 1));
        row.setAttribute('data-gj-position', position + 1);
        if (data.selectionMethod !== 'checkbox') {
            row.addEventListener('click', gj.grid.methods.createRowClickHandler(grid, id));
        }
        for (i = 0; i < data.columns.length; i++) {
            if (mode === 'update') {
                cell = row.children[i];
                gj.grid.methods.renderCell(grid, cell, data.columns[i], record, id);
            } else {
                cell = gj.grid.methods.renderCell(grid, null, data.columns[i], record, id);
                row.appendChild(cell);
            }
        }
        gj.grid.events.rowDataBound(grid.element, row, id, record);
    },

    renderCell: function (grid, cell, column, record, id, mode) {
        let displayEl, key;

        if (!cell) {
            cell = document.createElement('td');
            displayEl = document.createElement('div');
            displayEl.setAttribute('data-gj-role', 'display');
            if (column.align) {
                cell.style.textAlign = column.align;
            }
            if (column.cssClass) {
                gj.core.addClasses(cell, column.cssClass);
            }
            cell.appendChild(displayEl);
            mode = 'create';
        } else {
            displayEl = cell.querySelector('div[data-gj-role="display"]');
            mode = 'update';
        }

        gj.grid.methods.renderDisplayElement(grid, displayEl, column, record, id, mode);

        //remove all event handlers
        if ('update' === mode) {
            gj.core.off(cell);
            gj.core.off(displayEl);
        }
        if (column.events) {
            for (key in column.events) {
                if (column.events.hasOwnProperty(key)) {
                    gj.core.on(cell, key, gj.grid.methods.createCellEventHandler(column, column.events[key], { id: id, field: column.field, record: record }));
                }
            }
        }
        if (column.hidden) {
            cell.style.display = 'none';
        }

        gj.grid.events.cellDataBound(grid.element, displayEl, id, column, record);

        return cell;
    },

    createCellEventHandler: function (column, func, detail) {
        return function (e) {
            if (column.stopPropagation) {
                e.stopPropagation();
            }
            e.detail = detail;
            func.call(this, e, detail.id, detail.field, detail.record);
        };
    },

    renderDisplayElement: function (grid, displayEl, column, record, id, mode) {
        let text, checkbox, icon;

        if ('checkbox' === column.type && gj.checkbox) {
            if ('create' === mode) {
                checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = id;
                checkbox.checked = record[column.field] ? true : false;
                column.role && checkbox.setAttribute('data-gj-role', column.role);
                displayEl.appendChild(checkbox);
                new GijgoCheckBox(checkbox, { uiLibrary: grid.getConfig().uiLibrary });
                if (column.role === 'selectRow') {
                    checkbox.addEventListener('click', function () { return false; });
                } else {
                    checkbox.disabled = true;
                }
            } else {
                checkbox = displayEl.querySelector('input[type="checkbox"]');
                checkbox.value = id;
                checkbox.checked = record[column.field] ? true : false;
            }
        } else if ('icon' === column.type) {
            if ('create' === mode) {
                icon = document.createElement('span');
                gj.core.addClasses(icon, column.icon);
                icon.style.cursor = 'pointer';
                displayEl.appendChild(icon);
                grid.getConfig().uiLibrary === 'bootstrap' && displayEl.querySelector('span').classList.add('glyphicon');
                column.stopPropagation = true;
            }
        } else if (column.tmpl) {
            text = column.tmpl;
            column.tmpl.replace(/\{(.+?)\}/g, function ($0, $1) {
                text = text.replace($0, gj.grid.methods.formatText(record[$1], column));
            });
            displayEl.innerHTML = text;
        } else if (column.renderer && typeof (column.renderer) === 'function') {
            text = column.renderer(record[column.field], record, displayEl.parentNode, displayEl, id, grid);
            if (text) {
                displayEl.innerHTML = text;
            }
        } else {
            record[column.field] = gj.grid.methods.formatText(record[column.field], column);
            if (!column.tooltip && record[column.field]) {
                displayEl.setAttribute('title', record[column.field]);
            }
            displayEl.innerHTML = record[column.field];
        }
        if (column.tooltip && 'create' === mode) {
            displayEl.setAttribute('title', column.tooltip);
        }
    },

    formatText: function (text, column) {
        if (text && ['date', 'time', 'datetime'].indexOf(column.type) > -1) {
            text = gj.core.formatDate(gj.core.parseDate(text, column.format), column.format);
        } else {
            text = (typeof (text) === 'undefined' || text === null) ? '' : text.toString();
        }
        if (column.decimalDigits && text) {
            text = parseFloat(text).toFixed(column.decimalDigits);
        }
        return text;
    },

    setRecordsData: function (grid, response) {
        let records = [],
            totalRecords = 0,
            data = grid.getConfig();
        if (Array.isArray(response)) {
            records = response;
            totalRecords = response.length;
        } else if (data && data.mapping && Array.isArray(response[data.mapping.dataField])) {
            records = response[data.mapping.dataField];
            totalRecords = response[data.mapping.totalRecordsField];
            if (!totalRecords || isNaN(totalRecords)) {
                totalRecords = 0;
            }
        }
        grid.setRecords(records);
        grid.setTotalRecords(totalRecords);
        return records;
    },

    createRowClickHandler: function (grid, id) {
        return function () {
            gj.grid.methods.setSelected(grid, id, this);
        };
    },

    selectRow: function (grid, data, row, id) {
        let checkbox;
        gj.core.addClasses(row, data.style.content.rowSelected);
        row.setAttribute('data-gj-selected', 'true');
        if ('checkbox' === data.selectionMethod) {
            checkbox = row.querySelector('input[type="checkbox"][data-gj-role="selectRow"]');
            if (checkbox && !checkbox.checked) {
                checkbox.checked = true;
            }
            if ('multiple' === data.selectionType && grid.getSelections().length === grid.count(false)) {
                checkbox = grid.element.querySelector('thead input[data-gj-role="selectAll"]');
                if (checkbox && !checkbox.checked) {
                    checkbox.checked = true;
                }
            }
        }
        return gj.grid.events.rowSelect(grid.element, row, id, grid.getById(id));
    },

    unselectRow: function (grid, data, row, id) {
        let checkbox;
        if (row.getAttribute('data-gj-selected') === 'true') {
            gj.core.removeClasses(row, data.style.content.rowSelected);
            if ('checkbox' === data.selectionMethod) {
                checkbox = row.querySelector('td input[type="checkbox"][data-gj-role="selectRow"]');
                if (checkbox && checkbox.checked) {
                    checkbox.checked = false;
                }
                if ('multiple' === data.selectionType) {
                    checkbox = grid.element.querySelector('thead input[data-gj-role="selectAll"]');
                    if (checkbox && checkbox.checked) {
                        checkbox.checked = false;
                    }
                }
            }
            row.removeAttribute('data-gj-selected');
            return gj.grid.events.rowUnselect(grid.element, row, id, grid.getById(id));
        }
    },

    setSelected: function (grid, id, row) {
        let data = grid.getConfig(), rows;
        if (!row) {
            row = gj.grid.methods.getRowById(grid, id);
        }
        if (row) {
            if (row.getAttribute('data-gj-selected') === 'true') {
                gj.grid.methods.unselectRow(grid, data, row, id);
            } else {
                if ('single' === data.selectionType) {
                    rows = row.parentNode.querySelectorAll('[data-gj-selected="true"]');
                    for (let i = 0; i < rows.length; i++)
                    {
                        gj.grid.methods.unselectRow(grid, data, rows[i], gj.grid.methods.getId(rows[i], data.primaryKey, rows[i].getAttribute('data-gj-position')));
                    }
                }
                gj.grid.methods.selectRow(grid, data, row, id);
            }
        }
        return grid;
    },

    selectAll: function (grid) {
        let data = grid.getConfig(), row, position, record, id,
            rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
        
        for (let i = 0; i < rows.length; i++)
        {
            position = rows[i].getAttribute('data-gj-position'),
            record = grid.get(position),
            id = gj.grid.methods.getId(record, data.primaryKey, position);
            gj.grid.methods.selectRow(grid, data, rows[i], id);
        };
        grid.element.querySelector('thead input[data-gj-role="selectAll"]').checked = true;
        return grid;
    },

    unSelectAll: function (grid) {
        let data = grid.getConfig(), row, position, record, id,
            rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
        
        for (let i = 0; i < rows.length; i++)
        {
            position = rows[i].getAttribute('data-gj-position'),
            record = grid.get(position),
            id = gj.grid.methods.getId(record, data.primaryKey, position);
            gj.grid.methods.unselectRow(grid, data, rows[i], id);
        };
        grid.element.querySelector('thead input[data-gj-role="selectAll"]').checked = false;
        return grid;
    },

    getSelected: function (grid) {
        let result = null, selection, record, position;
        selection = grid.element.querySelector('tbody>tr[data-gj-selected="true"]');
        if (selection) {
            position = selection.getAttribute('data-gj-position');
            record = grid.get(position);
            result = gj.grid.methods.getId(record, grid.getConfig().primaryKey, position);
        }
        return result;
    },

    getSelectedRows: function (grid) {
        return grid.element.querySelectorAll('tbody>tr[data-gj-selected="true"]');
    },

    getSelections: function (grid) {
        let result = [], position, record,
            data = grid.getConfig(),
            selections = gj.grid.methods.getSelectedRows(grid);
        if (0 < selections.length) {
            for (let i = 0; i < selections.length; i++) {
                position = selections[i].getAttribute('data-gj-position');
                record = grid.get(position);
                result.push(gj.grid.methods.getId(record, data.primaryKey, position));
            }
        }
        return result;
    },

    getById: function (grid, id) {
        let result = null, i, primaryKey = grid.getConfig().primaryKey, records = grid.getRecords();
        if (primaryKey) {
            for (i = 0; i < records.length; i++) {
                if (records[i][primaryKey] == id) {
                    result = records[i];
                    break;
                }
            }
        } else {
            result = grid.get(id);
        }
        return result;
    },

    getRecVPosById: function (grid, id) {
        let result = id, i, data = grid.getConfig();
        if (data.primaryKey) {
            for (i = 0; i < data.dataSource.length; i++) {
                if (data.dataSource[i][data.primaryKey] == id) {
                    result = i;
                    break;
                }
            }
        }
        return result;
    },

    getRowById: function (grid, id) {
        let records = grid.getAll(false),
            primaryKey = grid.getConfig().primaryKey,
            result = undefined,
            position,
            i;
        if (primaryKey) {
            for (i = 0; i < records.length; i++) {
                if (records[i][primaryKey] == id) {
                    position = i + 1;
                    break;
                }
            }
        } else {
            position = id;
        }
        if (position) {
            result = grid.element.querySelector('tbody tr[data-gj-position="' + position + '"]');
        }
        return result;
    },

    getByPosition: function (grid, position) {
        return grid.getAll(false)[position - 1];
    },

    getColumnPosition: function (columns, field) {
        let position = -1, i;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].field === field) {
                position = i;
                break;
            }
        }
        return position;
    },

    getColumnInfo: function (grid, field) {
        let i, result = {}, data = grid.getConfig();
        for (i = 0; i < data.columns.length; i += 1) {
            if (data.columns[i].field === field) {
                result = data.columns[i];
                break;
            }
        }
        return result;
    },

    getCell: function (grid, id, field) {
        let position, row, result = null;
        position = gj.grid.methods.getColumnPosition(grid.getConfig().columns, field);
        if (position > -1) {
            row = gj.grid.methods.getRowById(grid, id);
            result = row.children[position].querySelector('div[data-gj-role="display"]');
        }
        return result;
    },

    setCellContent: function (grid, id, field, value) {
        let column, displayEl = gj.grid.methods.getCell(grid, id, field);
        if (displayEl) {
            displayEl.innerHTML = '';
            if (typeof (value) === 'object') {
                displayEl.appendChild(value);
            } else {
                column = gj.grid.methods.getColumnInfo(grid, field);
                gj.grid.methods.renderDisplayElement(grid, displayEl, column, grid.getById(id), id, 'update');
            }
        }
    },

    clone: function (source) {
        let target = [];
        for(let i = 0; i < source.length; i++) {
            target.push(source[i].cloneNode(true));
        };
        return target;
    },

    getAll: function (grid) {
        return grid.getRecords();
    },

    countVisibleColumns: function (grid) {
        let columns, count, i;
        columns = grid.getConfig().columns;
        count = 0;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].hidden !== true) {
                count++;
            }
        }
        return count;
    },

    clear: function (grid, showNotFoundText) {
        let data = grid.getConfig();
        grid.xhr && grid.xhr.abort();
        grid.element.querySelector('tbody').innerHTML = '';
        grid.setRecords([]);
        gj.grid.methods.stopLoading(grid);
        gj.grid.methods.appendEmptyRow(grid, showNotFoundText ? data.notFoundText : '&nbsp;');
        gj.grid.events.dataBound(grid.element, [], 0);
        return grid;
    },

    render: function (grid, response) {
        if (response) {
            gj.grid.methods.setRecordsData(grid, response);
            gj.grid.methods.updateHeader(grid);
            gj.grid.methods.loadData(grid);
        }
        return grid;
    },

    filter: function (grid) {
        let field, column,
            data = grid.getConfig(),
            records = data.dataSource.slice();

        if (data.params[data.paramNames.sortBy]) {
            column = gj.grid.methods.getColumnInfo(grid, data.params[data.paramNames.sortBy]);
            records.sort(column.sortable.sorter ? column.sortable.sorter(column.direction, column) : gj.grid.methods.createDefaultSorter(column.direction, column.field));
        }

        for (field in data.params) {
            if (data.params[field] && !data.paramNames[field]) {
                column = gj.grid.methods.getColumnInfo(grid, field);
                records = records.filter(function (record) {
                    let value = record[field] || '',
                        searchStr = data.params[field] || '';
                    return column && typeof (column.filter) === 'function' ? column.filter(value, searchStr) : (value.toUpperCase().indexOf(searchStr.toUpperCase()) > -1);
                });
            }
        }

        gj.grid.events.dataFiltered(grid.element, records);

        return records;
    },

    createDefaultSorter: function (direction, field) {
        return function (recordA, recordB) {
            let a = (recordA[field] || '').toString(),
                b = (recordB[field] || '').toString();
            return (direction === 'asc') ? a.localeCompare(b) : b.localeCompare(a);
        };
    },

    destroy: function (grid, keepTableTag, keepWrapperTag) {
        let data = grid.getConfig();
        if (data) {
            gj.grid.events.destroying(grid.element);
            gj.grid.methods.stopLoading(grid);
            grid.xhr && grid.xhr.abort();
            grid.off();
            if (!keepWrapperTag && grid.element.parentNode.getAttribute('data-gj-role') === 'wrapper') {
                grid.unwrap();
            }
            grid.removeConfig();
            grid.removeRecords();
            grid.removeTotalRecords();
            if (keepTableTag === false) {
                grid.element.remove();
            } else {
                grid.element.className = '';
            }
            grid.element.removeAttribute('data-gj-type');
            grid.element.removeAttribute('data-gj-guid');
        }
        return grid;
    },

    showColumn: function (grid, field) {
        let data = grid.getConfig(),
            position = gj.grid.methods.getColumnPosition(data.columns, field),
            rows, cell;

        if (position > -1) {
            rows = grid.element.querySelectorAll('thead > tr');
            for (let i = 0; i < rows.length; i++) {
                rows[i].children[position].style.display = 'block';
            }
            rows = grid.element.querySelectorAll('tbody > tr[data-gj-role="row"]');
            for (let i = 0; i < rows.length; i++) {
                rows[i].children[position].style.display = 'block';
            }
            data.columns[position].hidden = false;

            cell = grid.element.querySelector('tbody > tr[data-gj-role="empty"] > td');
            if (cell) {
                cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
            }

            gj.grid.events.columnShow(grid.element, data.columns[position]);
        }

        return grid;
    },

    hideColumn: function (grid, field) {
        let data = grid.getConfig(),
            position = gj.grid.methods.getColumnPosition(data.columns, field),
            rows, cell;

        if (position > -1) {
            rows = grid.element.querySelectorAll('thead > tr');
            for (let i = 0; i < rows.length; i++) {
                rows[i].children[position].style.display = 'none';
            }
            rows = grid.element.querySelectorAll('tbody > tr[data-gj-role="row"]');
            for (let i = 0; i < rows.length; i++) {
                rows[i].children[position].style.display = 'none';
            }
            data.columns[position].hidden = true;

            cell = grid.element.querySelector('tbody > tr[data-gj-role="empty"] > td');
            if (cell) {
                cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
            }

            gj.grid.events.columnHide(grid.element, data.columns[position]);
        }

        return grid;
    },

    isLastRecordVisible: function () {
        return true;
    },

    addRow: function (grid, record) {
        let data = grid.getConfig(),
            records = grid.getRecords();
        data.totalRecords = grid.getTotalRecords() + 1;
        gj.grid.events.dataBinding(grid.element, [record]);
        records.push(record);
        grid.setRecords(records);
        if (Array.isArray(data.dataSource)) {
            data.dataSource.push(record);
        }
        if (grid.getTotalRecords() === 0) {
            grid.element.querySelector('tbody').innerHTML = '';
        }
        if (gj.grid.methods.isLastRecordVisible(grid)) {
            gj.grid.methods.renderRow(grid, null, record, grid.count() - 1);
        }
        gj.grid.events.dataBound(grid.element, [record], data.totalRecords);
        return grid;
    },

    updateRow: function (grid, id, record) {
        let row = gj.grid.methods.getRowById(grid, id),
            data = grid.getConfig(), records = grid.getRecords(), position;
        records[row.getAttribute('data-gj-position') - 1] = record;
        grid.setRecords(records);
        if (Array.isArray(data.dataSource)) {
            position = gj.grid.methods.getRecVPosById(grid, id);
            data.dataSource[position] = record;
        }
        gj.grid.methods.renderRow(grid, row, record, Array.from(row.parentNode.children).indexOf(row));
        return grid;
    },

    removeRow: function (grid, id) {
        let position,
            data = grid.getConfig(),
            row = gj.grid.methods.getRowById(grid, id);

        gj.grid.events.rowRemoving(grid.element, row, id, grid.getById(id));
        if (Array.isArray(data.dataSource)) {
            position = gj.grid.methods.getRecVPosById(grid, id);
            data.dataSource.splice(position, 1);
        }
        grid.reload();
        return grid;
    },

    count: function (grid, includeAllRecords) {
        return includeAllRecords ? grid.getTotalRecords(): grid.getAll().length;
    },

    getColumnPositionByRole: function (grid, role) {
        let i, result, columns = grid.getConfig().columns;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].role === role) {
                result = i;
                break;
            }
        }
        return result;
    },

    getColumnPositionNotInRole: function (grid) {
        let i, result = 0, columns = grid.getConfig().columns;
        for (i = 0; i < columns.length; i++) {
            if (!columns[i].role) {
                result = i;
                break;
            }
        }
        return result;
    }
};

/**  */GijgoGrid = function (element, jsConfig) {
    var self = this,
        methods = gj.grid.methods;

    self.type = 'grid';
    self.element = element;

    /**
     * Reload the data in the grid from a data source.     */    self.reload = function (params) {
        methods.startLoading(this);
        return gj.widget.prototype.reload.call(this, params);
    };

    /**
     * Clear the content in the grid.     */    self.clear = function (showNotFoundText) {
        return methods.clear(this, showNotFoundText);
    };

    /**
     * Return the number of records in the grid. By default return only the records that are visible in the grid.     */    self.count = function (includeAllRecords) {
        return methods.count(this, includeAllRecords);
    };

    /**
     * Render data in the grid     */    self.render = function (response) {
        return methods.render(this, response);
    };

    /**
     * Destroy the grid. This method remove all data from the grid and all events attached to the grid.     */    self.destroy = function (keepTableTag, keepWrapperTag) {
        return methods.destroy(this, keepTableTag, keepWrapperTag);
    };

    /**
     * Select a row from the grid based on id parameter.     */    self.setSelected = function (id) {
        return methods.setSelected(this, id);
    };

    /**
     * Return the id of the selected record.
     * If the multiple selection method is one this method is going to return only the id of the first selected record.     */    self.getSelected = function () {
        return methods.getSelected(this);
    };

    /**
     * Return an array with the ids of the selected record.     */    self.getSelections = function () {
        return methods.getSelections(this);
    };

    /**
     * Select all records from the grid.     */    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all records from the grid.     */    self.unSelectAll = function () {
        return methods.unSelectAll(this);
    };

    /**
     * Return record by id of the record.     */    self.getById = function (id) {
        return methods.getById(this, id);
    };

    /**
     * Return record from the grid based on position.     */    self.get = function (position) {
        return methods.getByPosition(this, position);
    };

    /**
     * Return an array with all records presented in the grid.     */    self.getAll = function (includeAllRecords) {
        return methods.getAll(this, includeAllRecords);
    };

    /**
     * Show hidden column.     */    self.showColumn = function (field) {
        return methods.showColumn(this, field);
    };

    /**
     * Hide column from the grid.     */    self.hideColumn = function (field) {
        return methods.hideColumn(this, field);
    };

    /**
     * Add new row to the grid.     */    self.addRow = function (record) {
        return methods.addRow(this, record);
    };

    /**
     * Update row data.     */    self.updateRow = function (id, record) {
        return methods.updateRow(this, id, record);
    };

    //TODO: needs to be removed
    self.setCellContent = function (id, index, value) {
        methods.setCellContent(this, id, index, value);
    };

    /**
     * Remove row from the grid     */    self.removeRow = function (id) {
        return methods.removeRow(this, id);
    };

    if ('grid' !== element.getAttribute('data-gj-type')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoGrid.prototype = new gj.widget();
GijgoGrid.constructor = GijgoGrid;

GijgoGrid.prototype.readConfig = gj.grid.methods.readConfig;
GijgoGrid.prototype.readHTMLConfig = gj.grid.methods.readHTMLConfig;


if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.grid = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoGrid(this, method);
                } else {
                    widget = new GijgoGrid(this, null);
                    if (widget[method]) {
                        return widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}

/** */gj.grid.plugins.fixedHeader = {
    config: {
        base: {

            /** If set to true, add scroll to the table body             */            fixedHeader: false,

            height: 300
        }
    },

    private: {
        init: function (grid) {
            let data = grid.getConfig(),
                tbody = grid.element.querySelector('tbody'),
                thead = grid.element.querySelector('thead'),
                tfoot = grid.element.querySelector('tfoot'),
                bodyHeight = data.height - gj.core.height(thead, true) - (tfoot ? gj.core.height(tfoot, true) : 0);
            grid.element.classList.add('gj-grid-scrollable');
            tbody.setAttribute('width', gj.core.height(thead, true));
            tbody.style.height = bodyHeight + 'px';
        },

        refresh: function (grid) {
            let i, width,
                data = grid.getConfig(),
                tbody = grid.element.querySelector('tbody'),
                thead = grid.element.querySelector('thead'),
                tbodyCells = grid.element.querySelectorAll('tbody tr[data-gj-role="row"] td'),
                theadCells = grid.element.querySelectorAll('thead tr[data-gj-role="caption"] th');

            if (gj.core.height(tbody) < gj.grid.plugins.fixedHeader.private.getRowsHeight(grid)) {
                tbody.style.width = (gj.core.width(thead, true) + gj.grid.plugins.fixedHeader.private.getScrollBarWidth() + (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 1 : 0)) + 'px';
            } else {
                tbody.style.width = gj.core.width(thead, true) + 'px';
            }

            for (i = 0; i < theadCells.length; i++) {
                width = gj.core.width(theadCells[i], true);
                if (i === 0 && gj.core.isIE()) {
                    width = width - 1;
                }
                tbodyCells[i].setAttribute('width', width);
            }
        },

        getRowsHeight: function (grid) {
            let total = 0, rows = grid.element.querySelectorAll('tbody tr');
            for (const row of rows) {
                total += gj.core.height(row);
            };
            return total;
        },

        getScrollBarWidth: function () {
            let inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            let outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            let w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            let w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return (w1 - w2);
        }
    },

    public: {
    },

    events: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.fixedHeader.public);
        let data = grid.getConfig();
        if (clientConfig.fixedHeader) {
            grid.on('initialized', function () {
                gj.grid.plugins.fixedHeader.private.init(grid);
            });
            grid.on('dataBound', function () {
                gj.grid.plugins.fixedHeader.private.refresh(grid);
            });
            grid.on('resize', function () {
                gj.grid.plugins.fixedHeader.private.refresh(grid);
            });
        }
    }
};

/**  */gj.grid.plugins.expandCollapseRows = {
    config: {
        base: {
            /** Template for the content in the detail section of the row.
             * Automatically add expand collapse column as a first column in the grid during initialization.             */            detailTemplate: undefined,

            /** If set try to persist the state of expanded rows.
             * You need to specify primaryKey on the initialization of the grid in order to enable this feature.             */            keepExpandedRows: true,

            expandedRows: [],

            icons: {
                /** Expand row icon definition.                 */                expandRow: '<i class="gj-icon chevron-right" />',

                /** Collapse row icon definition.                 */                collapseRow: '<i class="gj-icon chevron-down" />'
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
         * Collapse all grid rows.         */        collapseAll: function () {
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
         * Expand all grid rows.         */        expandAll: function () {
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
         *         */        detailExpand: function (el, detailWrapper, id) {
            el.dispatchEvent(new CustomEvent('detailExpand', { detail: { detailWrapper: detailWrapper, id: id } }));
        },

        /**
         * Event fires when detail row is hiding
         *         */        detailCollapse: function (el, detailWrapper, id) {
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
/**  */gj.grid.plugins.inlineEditing = {
    renderers: {
        editManager: function (value, record, cell, displayEl, id, grid) {
            let data = grid.getConfig(),
                edit = data.inlineEditing.editButton.cloneNode(true),
                del = data.inlineEditing.deleteButton.cloneNode(true),
                update = data.inlineEditing.updateButton.cloneNode(true),
                cancel = data.inlineEditing.cancelButton.cloneNode(true);

            edit.setAttribute('data-gj-key', id);
            del.setAttribute('data-gj-key', id);
            update.setAttribute('data-gj-key', id);
            cancel.setAttribute('data-gj-key', id);
            update.style.display = 'none';
            cancel.style.display = 'none';
            edit.addEventListener('click', function (e) {
                grid.edit(this.getAttribute('data-gj-key'));
            });
            del.addEventListener('click', function (e) {
                grid.removeRow(this.getAttribute('data-gj-key'));
            });
            update.addEventListener('click', function (e) {
                grid.update(this.getAttribute('data-gj-key'));
            });
            cancel.addEventListener('click', function (e) {
                grid.cancel(this.getAttribute('data-gj-key'));
            });
            displayEl.innerHTML = '';
            displayEl.appendChild(edit);
            displayEl.appendChild(del);
            displayEl.appendChild(update);
            displayEl.appendChild(cancel);
        }
    }
};

gj.grid.plugins.inlineEditing.config = {
    base: {
        defaultColumnSettings: {
            /** Provides a way to set an editing UI for the column.             */            editor: undefined,

            /** The name of the field in the grid data where the grid is going to set the new value.             */            editField: undefined,

            /** Provides a way to specify a display mode for the column.             */            mode: 'readEdit'
        },
        inlineEditing: {

            /** Inline editing mode.             */            mode: 'click',
                
            /** If set to true, add column with buttons for edit, delete, update and cancel at the end of the grid.            */            managementColumn: true,

            managementColumnConfig: { width: 300, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    },

    bootstrap: {
        inlineEditing: {
            managementColumnConfig: { width: 200, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    },

    bootstrap4: {
        inlineEditing: {
            managementColumnConfig: { width: 280, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    },

    bootstrap5: {
        inlineEditing: {
            managementColumnConfig: { width: 280, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    }
};

gj.grid.plugins.inlineEditing.private = {
    createMdButton: function(role, icon, text) {
        let btn = document.createElement('button');
        btn.setAttribute('data-gj-role', role);
        btn.classList.add('gj-button-md');
        btn.innerHTML = '<i class="gj-icon ' + icon + '"></i> ' + text.toUpperCase();
        return btn;
    },

    createBtButton: function(role, icon, text, leftMargin) {
        let btn = document.createElement('button');
        btn.setAttribute('data-gj-role', role);
        gj.core.addClasses(btn, 'btn btn-default btn-sm');
        leftMargin && btn.classList.add('gj-button-md');
        btn.innerHTML = '<span class="glyphicon glyphicon-' + icon + '" aria-hidden="true"></span> ' + text;
        return btn;
    },

    localization: function (data) {
        let methods = gj.grid.plugins.inlineEditing.private;
        if (data.uiLibrary === 'bootstrap') {
            data.inlineEditing.editButton = methods.createBtButton('edit', 'pencil', gj.grid.messages[data.locale].Edit);
            data.inlineEditing.deleteButton = methods.createBtButton('delete', 'remove', gj.grid.messages[data.locale].Delete);
            data.inlineEditing.updateButton = methods.createBtButton('update', 'ok', gj.grid.messages[data.locale].Update);
            data.inlineEditing.cancelButton = methods.createBtButton('cancel', 'ban-circle', gj.grid.messages[data.locale].Cancel);
        } else {
            data.inlineEditing.editButton = methods.createMdButton('edit', 'pencil', gj.grid.messages[data.locale].Edit);
            data.inlineEditing.deleteButton = methods.createMdButton('delete', 'delete', gj.grid.messages[data.locale].Delete);
            data.inlineEditing.updateButton = methods.createMdButton('update', 'check-circle', gj.grid.messages[data.locale].Update);
            data.inlineEditing.cancelButton = methods.createMdButton('cancel', 'cancel', gj.grid.messages[data.locale].Cancel);
        }
    },

    editMode: function (grid, cell, column, record) {
        let displayContainer, editorContainer, editorField, value, config, data = grid.getConfig();
        if (cell.getAttribute('data-gj-mode') !== 'edit') {
            if (column.editor) {
                gj.grid.plugins.inlineEditing.private.updateOtherCells(grid, column.mode);
                displayContainer = cell.querySelector('div[data-gj-role="display"]');
                displayContainer.style.display = 'none';
                editorContainer = cell.querySelector('div[data-gj-role="edit"]');
                if (!editorContainer) {
                    editorContainer = document.createElement('div');
                    editorContainer.setAttribute('data-gj-role', 'edit');
                    cell.appendChild(editorContainer);
                }
                editorContainer.style.display = 'block';
                value = record[column.editField || column.field];
                editorField = editorContainer.querySelector('input, select, textarea');
                if (editorField) {
                    switch (column.type) {
                        case 'checkbox':
                            editorField.checked = value;
                            break;
                        case 'dropdown':
                            editorField = editorField.value;
                            break;
                        default:
                            editorField.value = value;
                    }
                } else {
                    if (typeof (column.editor) === 'function') {
                        column.editor(editorContainer, value, record);
                        editorField = editorContainer.querySelector('input, select, textarea');
                    } else {
                        config = typeof column.editor === "object" ? column.editor : {};
                        config.uiLibrary = data.uiLibrary;
                        config.iconsLibrary = data.iconsLibrary;
                        config.fontSize = window.getComputedStyle(grid.element, null).getPropertyValue('font-size');
                        config.showOnFocus = false;
                        if ('checkbox' === column.type && gj.checkbox) {
                            editorField = document.createElement('input');
                            editorField.setAttribute('type', 'checkbox');
                            editorField.checked = value;
                            editorContainer.appendChild(editorField);
                            new GijgoCheckBox(editorField, config);
                        } else if (('date' === column.type && gj.datepicker) || ('time' === column.type && gj.timepicker) || ('datetime' === column.type && gj.datetimepicker)) {
                            editorField = document.createElement('input');
                            editorField.setAttribute('type', 'text');
                            editorField.setAttribute('width', '100%');
                            editorContainer.appendChild(editorField);
                            if (column.format) {
                                config.format = column.format;
                            }
                            switch (column.type) {
                                case 'date':
                                    editorField = new GijgoDatePicker(editorField, config);
                                    break;
                                case 'time':
                                    editorField = new GijgoTimePicker(editorField, config);
                                    break;
                                case 'datetime':
                                    editorField = new GijgoDateTimePicker(editorField, config);
                                    break;
                            }
                            if (editorField.value) {
                                editorField.value(value);
                            }
                            editorField = editorField.element;
                        } else if ('dropdown' === column.type && gj.dropdown) {
                            editorField = document.createElement('select');
                            editorField.setAttribute('width', '100%');
                            editorContainer.appendChild(editorField);
                            config.dataBound = function (e) {
                                let dropdown = new GijgoDropDown(this);
                                if (column.editField) {
                                    dropdown.value(record[column.editField]);
                                } else {
                                    dropdown.value(record[column.field]);
                                }
                            };
                            editorField = new GijgoDropDown(editorField, config);
                        } else {
                            editorField = document.createElement('input');
                            editorField.setAttribute('type', 'text');
                            editorField.classList.add('gj-width-full');
                            editorField.value = value;
                            if (data.uiLibrary === 'materialdesign') {
                                editorField.classList.add('gj-textbox-md');
                                editorField.style.fontSize = window.getComputedStyle(grid.element, null).getPropertyValue('font-size');
                            }
                            editorContainer.appendChild(editorField);
                        }
                    }
                    if (data.inlineEditing.mode !== 'command' && column.mode !== 'editOnly') {
                        editorField = editorContainer.querySelectorAll('input, select, textarea')[0];
                        editorField.addEventListener('keyup', function (e) {
                            if (e.keyCode === 13 || e.keyCode === 27) {
                                gj.grid.plugins.inlineEditing.private.displayMode(grid, cell, column);
                            }
                        });
                    }
                }
                if (editorField.tagName.toUpperCase() === "INPUT" && editorField.getAttribute('type').toUpperCase() === 'TEXT') {
                    gj.core.setCaretAtEnd(editorField[0]);
                } else {
                    editorField.focus();
                }
                cell.setAttribute('data-gj-mode', 'edit');
            } else if (column.role === 'managementColumn') {
                cell.querySelector('[data-gj-role="edit"]').style.display = 'none';
                cell.querySelector('[data-gj-role="delete"]').style.display = 'none';
                cell.querySelector('[data-gj-role="update"]').style.display = 'inline-block';
                cell.querySelector('[data-gj-role="cancel"]').style.display = 'inline-block';
            }
        }
    },

    displayMode: function (grid, cell, column, cancel) {
        let editorContainer, displayContainer, ele, newValue, newEditFieldValue, record, position, style = '';
        if (column.mode !== 'editOnly') {
            if (cell.getAttribute('data-gj-mode') === 'edit') {
                editorContainer = cell.querySelector('div[data-gj-role="edit"]');
                displayContainer = cell.querySelector('div[data-gj-role="display"]');
                ele = editorContainer.querySelectorAll('input, select, textarea');
                if (ele[0].tagName.toUpperCase() === "SELECT" && ele[0].selectedIndex > -1) {
                    newValue = ele[0].options[ele[0].selectedIndex].innerHTML;
                    newEditFieldValue = ele[0].value;
                } else if (ele[0].tagName.toUpperCase() === "INPUT" && ele[0].type.toUpperCase() === "CHECKBOX") {
                    newValue = ele[0].checked;
                } else {
                    newValue = ele[0].value;
                }
                position = cell.parentNode.getAttribute('data-gj-position');
                record = grid.get(position);
                if (cancel !== true && newValue !== record[column.field]) {
                    record[column.field] = column.type === 'date' ? gj.core.parseDate(newValue, column.format) : newValue;
                    if (column.editField) {
                        record[column.editField] = newEditFieldValue || newValue;
                    }
                    if (column.mode !== 'editOnly') {
                        gj.grid.methods.renderDisplayElement(grid, displayContainer, column, record, gj.grid.methods.getId(record, grid.getConfig().primaryKey, position), 'update');
                        if (cell.querySelector('span.gj-dirty')) {
                            cell.insertBefore('<span class="gj-dirty" />', cell.firstChild);
                        }
                    }
                    gj.grid.plugins.inlineEditing.events.cellDataChanged(grid.element, cell, column, record, newValue);
                    gj.grid.plugins.inlineEditing.private.updateChanges(grid, column, record, newValue);
                }
                editorContainer.style.display = 'none';
                displayContainer.style.display = 'block';
                cell.setAttribute('data-gj-mode', 'display');
            }
            if (column.role === 'managementColumn') {
                cell.querySelector('[data-gj-role="update"]').style.display = 'none';
                cell.querySelector('[data-gj-role="cancel"]').style.display = 'none';
                cell.querySelector('[data-gj-role="edit"]').style.display = 'inline-block';
                cell.querySelector('[data-gj-role="delete"]').style.display = 'inline-block';
            }
        }
    },

    updateOtherCells: function(grid, mode) {
        let data = grid.getConfig(), editors, cell;
        if (data.inlineEditing.mode !== 'command' && mode !== 'editOnly') {
            editors = grid.element.querySelectorAll('div[data-gj-role="edit"]');
            for (const editor of editors) {
                if (editor.style.display === 'inline-block') {
                    cell = editor.parentNode;
                    column = data.columns[Array.from(cell.parentNode.children).indexOf(cell)];
                    gj.grid.plugins.inlineEditing.private.displayMode(grid, cell, column);
                }
            }
        }
    },

    updateChanges: function (grid, column, sourceRecord, newValue) {
        let targetRecords, filterResult, newRecord, data = grid.getConfig();
        if (data.primaryKey) {
            targetRecords = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
            if (targetRecords) {
                filterResult = targetRecords.filter(function (record) {
                    return record[data.primaryKey] === sourceRecord[data.primaryKey];
                });
            } else {
                targetRecords = [];
            }
            if (filterResult && filterResult.length === 1) {
                filterResult[0][column.field] = newValue;
            } else {
                newRecord = {};
                newRecord[data.primaryKey] = sourceRecord[data.primaryKey];
                if (data.primaryKey !== column.field) {
                    newRecord[column.field] = newValue;
                }
                targetRecords.push(newRecord);
            }
            sessionStorage.setItem('gj.grid.' + data.guid, JSON.stringify(targetRecords));
        }
    }
};

gj.grid.plugins.inlineEditing.public = {
    /**
     * Return array with all changes     */    getChanges: function () {
        return JSON.parse(sessionStorage.getItem('gj.grid.' + this.getConfig().guid));
    },

    /**
     * Enable edit mode for all editable cells within a row.     */    edit: function (id) {
        let i, record = this.getById(id),
            cells = gj.grid.methods.getRowById(this, id).children,
            columns = this.getConfig().columns;

        for (i = 0; i < cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.editMode(this, cells[i], columns[i], record);
        }
            
        return this;
    },

    /**
     * Update all editable cells within a row, when the row is in edit mode.     */    update: function (id) {
        let i, record = this.getById(id),
            cells = gj.grid.methods.getRowById(this, id).children,
            columns = this.getConfig().columns;

        for (i = 0; i < cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.displayMode(this, cells[i], columns[i], false);
        }

        gj.grid.plugins.inlineEditing.events.rowDataChanged(this.element, id, record);

        return this;
    },

    /**
     * Cancel the edition of all editable cells, when the row is in edit mode.     */    cancel: function (id) {
        let i, record = this.getById(id),
            cells = gj.grid.methods.getRowById(this, id).children,
            columns = this.getConfig().columns;

        for (i = 0; i < cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.displayMode(this, cells[i], columns[i], true);
        }

        return this;
    }
};

gj.grid.plugins.inlineEditing.events = {
    /**
     * Event fires after inline edit of a cell in the grid.
     *     */    cellDataChanged: function (el, cell, column, record, newValue) {
        el.dispatchEvent(new CustomEvent('cellDataChanged', { detail: { cell: cell, column: column, record: record, newValue: newValue } }));
    },

    /**
     * Event fires after inline edit of a row in the grid.
     *     */    rowDataChanged: function (el, id, record) {
        el.dispatchEvent(new CustomEvent('rowDataChanged', { detail: { id: id, record: record } }));
    }
};

gj.grid.plugins.inlineEditing.configure = function (grid, fullConfig, clientConfig) {
    let data = grid.getConfig();
    grid.extend(grid, gj.grid.plugins.inlineEditing.public);
    if (clientConfig.inlineEditing) {
        grid.on('dataBound', function () {
            grid.element.querySelectorAll('span.gj-dirty').forEach(function(el) { el.remove(); }); 
        });
        grid.on('rowDataBound', function (e) {
            grid.cancel(e.detail.id);
        });
    }
    if (data.inlineEditing.mode === 'command') {
        gj.grid.plugins.inlineEditing.private.localization(data);
        if (fullConfig.inlineEditing.managementColumn) {
            data.columns.push(fullConfig.inlineEditing.managementColumnConfig);
        }
    } else {
        grid.element.addEventListener('cellDataBound', function (e) {
            if (e.detail.column.editor) {
                if (e.detail.column.mode === 'editOnly') {
                    gj.grid.plugins.inlineEditing.private.editMode(grid, e.detail.displayEl.parentNode, e.detail.column, e.detail.record);
                } else {
                    e.detail.displayEl.closest('td').addEventListener(data.inlineEditing.mode === 'dblclick' ? 'dblclick' : 'click', function () {
                        gj.grid.plugins.inlineEditing.private.editMode(grid, e.detail.displayEl.parentNode, e.detail.column, e.detail.record);
                    });
                }
            }
        });
    }
};

/**  */gj.grid.plugins.optimisticPersistence = {

    config: {
        base: {
            optimisticPersistence: {
                /** Array that contains a list with param names that needs to be saved in the localStorage. You need to specify guid on the initialization of the grid in order to enable this feature.                 */                localStorage: undefined,

                /** Array that contains a list with param names that needs to be saved in the sessionStorage. You need to specify guid on the initialization of the grid in order to enable this feature.                 */                sessionStorage: undefined
            }
        }
    },

    private: {
        applyParams: function (grid) {
            var data = grid.getConfig(),
                params = {}, storage;
            storage = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
            if (storage && storage.optimisticPersistence) {
                grid.extend(params, storage.optimisticPersistence);
            }
            storage = JSON.parse(localStorage.getItem('gj.grid.' + data.guid));
            if (storage && storage.optimisticPersistence) {
                grid.extend(params, storage.optimisticPersistence);
            }
            grid.extend(data.params, params);
        },

        saveParams: function (grid) {
            var i, param,
                data = grid.getConfig(),
                storage = { optimisticPersistence: {} };

            if (data.optimisticPersistence.sessionStorage) {
                for (i = 0; i < data.optimisticPersistence.sessionStorage.length; i++) {
                    param = data.optimisticPersistence.sessionStorage[i];
                    storage.optimisticPersistence[param] = data.params[param];
                }
                storage = grid.extend(JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid)) || {}, storage);
                sessionStorage.setItem('gj.grid.' + data.guid, JSON.stringify(storage));
            }

            if (data.optimisticPersistence.localStorage) {
                storage = { optimisticPersistence: {} };
                for (i = 0; i < data.optimisticPersistence.localStorage.length; i++) {
                    param = data.optimisticPersistence.localStorage[i];
                    storage.optimisticPersistence[param] = data.params[param];
                }
                storage = grid.extend(JSON.parse(localStorage.getItem('gj.grid.' + data.guid)) || {}, storage);
                localStorage.setItem('gj.grid.' + data.guid, JSON.stringify(storage));
            }
        }
    },

    configure: function (grid, fullConfig) {
        if (fullConfig.guid) {
            if (fullConfig.optimisticPersistence.localStorage || fullConfig.optimisticPersistence.sessionStorage) {
                gj.grid.plugins.optimisticPersistence.private.applyParams(grid);
                grid.on('dataBound', function (e) {
                    gj.grid.plugins.optimisticPersistence.private.saveParams(grid);
                });
            }
        }
    }
};
/** */gj.grid.plugins.pagination = {
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
                 * The pager should be enabled in order this parameter to be in use.                 */                page: 'page',

                /** The name of the parameter that is going to send the maximum number of records per page.
                 * The pager should be enabled in order this parameter to be in use.                 */                limit: 'limit'
            },

            pager: {
                /** The maximum number of records that can be show by page.                 */                limit: 10,

                /** Array that contains the possible page sizes of the grid.
                 * When this setting is set, then a drop down with the options for each page size is visualized in the pager.                 */                sizes: [5, 10, 20, 100],

                /** Array that contains a list with html element objects that are going to be used on the left side of the pager.                 */                leftControls: undefined,

                /** Array that contains a list with html element objects that are going to be used on the right side of the pager.                 */                rightControls: undefined
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

                controls = grid.element.querySelectorAll('tfoot [data-gj-role]');
                for (let i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.initPagerControl((controls[i]), grid);
                }
            }
        },

        localization: function (data) {
            if (data.uiLibrary === 'bootstrap') {
                gj.grid.plugins.pagination.private.localizationBootstrap(data);
            } else if (data.uiLibrary === 'bootstrap4') {
                gj.grid.plugins.pagination.private.localizationBootstrap4(data);
            } else if (data.uiLibrary === 'bootstrap5') {
                gj.grid.plugins.pagination.private.localizationBootstrap5(data);
            } else {
                gj.grid.plugins.pagination.private.localizationMaterialDesign(data);
            }
        },

        createButton: function(classes, role, title, text) {
            let result = document.createElement('button');
            gj.core.addClasses(result, classes);
            result.setAttribute('data-gj-role', role);
            result.setAttribute('title', title);
            result.innerHTML = text;
            return result;
        },

        localizationBootstrap: function (data) {
            let msg = gj.grid.messages[data.locale],
                methods = gj.grid.plugins.pagination.private,
                parser = new DOMParser(),
                labelLast = document.createElement('div'),
                labelPage = document.createElement('div'),
                labelOf = document.createElement('div'),
                pageNumber = document.createElement('input'),
                pager = document.createElement('select');

            if (typeof (data.pager.leftControls) === 'undefined') {
                labelLast.setAttribute('data-gj-role', 'page-label-last');
                labelLast.innerHTML = '0';

                labelPage.innerHTML = msg.Page;

                labelOf.innerHTML = msg.Of;

                pageNumber.setAttribute('data-gj-role', 'page-number');
                pageNumber.setAttribute('type', 'text');
                pageNumber.setAttribute('value', '0');
                gj.core.addClasses(pageNumber, 'form-control input-sm');

                gj.core.addClasses(pager, 'form-control input-sm');
                pager.style.width = '3.75rem';
                pager.setAttribute('data-gj-role', 'page-size');

                data.pager.leftControls = [
                    methods.createButton('btn btn-default btn-sm', 'page-first', msg.FirstPageTooltip, data.icons.first || msg.First),
                    methods.createButton('btn btn-default btn-sm', 'page-previous', msg.PreviousPageTooltip, data.icons.previous || msg.Previous),
                    labelPage,
                    pageNumber,
                    labelOf,
                    labelLast,
                    methods.createButton('btn btn-default btn-sm', 'page-next', msg.NextPageTooltip, data.icons.next || msg.Next),
                    methods.createButton('btn btn-default btn-sm', 'page-last', msg.LastPageTooltip, data.icons.last || msg.Last),
                    methods.createButton('btn btn-default btn-sm', 'page-refresh', msg.Refresh, data.icons.refresh || msg.Refresh),
                    pager
                ];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    parser.parseFromString('<div>' + msg.DisplayingRecords + '</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-first">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>-</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-last">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>' + msg.Of + '</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-total">0</div>', 'text/xml').firstChild
                ];
            }
        },

        localizationBootstrap4: function (data) {
            let msg = gj.grid.messages[data.locale],
                methods = gj.grid.plugins.pagination.private,
                parser = new DOMParser(),
                labelLast = document.createElement('div'),
                labelPage = document.createElement('div'),
                labelOf = document.createElement('div'),
                pageNumber = document.createElement('div'),
                input = document.createElement('input'),
                pager = document.createElement('select');
            if (typeof (data.pager.leftControls) === 'undefined') {
                labelLast.setAttribute('data-gj-role', 'page-label-last');
                labelLast.innerHTML = '0';

                labelPage.innerHTML = msg.Page;

                labelOf.innerHTML = msg.Of;

                pageNumber.classList.add('input-group');
                input.setAttribute('data-gj-role', 'page-number');
                input.setAttribute('type', 'text');
                input.setAttribute('value', '0');
                gj.core.addClasses(input, 'form-control form-control-sm');
                pageNumber.appendChild(input);

                gj.core.addClasses(pager, 'form-control input-sm');
                pager.style.width = '3.75rem';
                pager.setAttribute('data-gj-role', 'page-size');

                data.pager.leftControls = [
                    methods.createButton('btn btn-default btn-sm gj-cursor-pointer', 'page-first', msg.FirstPageTooltip, data.icons.first || msg.First),
                    methods.createButton('btn btn-default btn-sm gj-cursor-pointer', 'page-previous', msg.PreviousPageTooltip, data.icons.previous || msg.Previous),
                    labelPage,
                    pageNumber,
                    labelOf,
                    labelLast,
                    methods.createButton('btn btn-default btn-sm gj-cursor-pointer', 'page-next', msg.NextPageTooltip, data.icons.next || msg.Next),
                    methods.createButton('btn btn-default btn-sm gj-cursor-pointer', 'page-last', msg.LastPageTooltip, data.icons.last || msg.Last),
                    methods.createButton('btn btn-default btn-sm gj-cursor-pointer', 'page-refresh', msg.Refresh, data.icons.refresh || msg.Refresh),
                    pager
                ];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    parser.parseFromString('<div>' + msg.DisplayingRecords + ' </div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-first">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>-</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-last">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>' + msg.Of + '</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-total">0</div>', 'text/xml').firstChild
                ];
            }
        },

        localizationBootstrap5: function (data) {
            let msg = gj.grid.messages[data.locale],
                methods = gj.grid.plugins.pagination.private,
                parser = new DOMParser(),
                labelLast = document.createElement('div'),
                labelPage = document.createElement('div'),
                labelOf = document.createElement('div'),
                pageNumber = document.createElement('div'),
                input = document.createElement('input'),
                pager = document.createElement('select');

            if (typeof (data.pager.leftControls) === 'undefined') {

                labelLast.setAttribute('data-gj-role', 'page-label-last');
                labelLast.innerHTML = '0';

                labelPage.innerHTML = msg.Page;

                labelOf.innerHTML = msg.Of;

                pageNumber.classList.add('input-group');
                input.setAttribute('data-gj-role', 'page-number');
                input.setAttribute('type', 'text');
                input.setAttribute('value', '0');
                gj.core.addClasses(input, 'form-control form-control-sm');
                pageNumber.appendChild(input);

                gj.core.addClasses(pager, 'form-control input-sm');
                pager.style.width = '3.75rem';
                pager.setAttribute('data-gj-role', 'page-size');

                data.pager.leftControls = [
                    methods.createButton('btn btn-secondary btn-sm gj-cursor-pointer', 'page-first', msg.FirstPageTooltip, data.icons.first || msg.First),
                    methods.createButton('btn btn-secondary btn-sm gj-cursor-pointer', 'page-previous', msg.PreviousPageTooltip, data.icons.previous || msg.Previous),
                    labelPage,
                    pageNumber,
                    labelOf,
                    labelLast,
                    methods.createButton('btn btn-secondary btn-sm gj-cursor-pointer', 'page-next', msg.NextPageTooltip, data.icons.next || msg.Next),
                    methods.createButton('btn btn-secondary btn-sm gj-cursor-pointer', 'page-last', msg.LastPageTooltip, data.icons.last || msg.Last),
                    methods.createButton('btn btn-secondary btn-sm gj-cursor-pointer', 'page-refresh', msg.Refresh, data.icons.refresh || msg.Refresh),
                    pager
                ];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    parser.parseFromString('<div>' + msg.DisplayingRecords + ' </div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-first">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>-</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-last">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>' + msg.Of + '</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-total">0</div>', 'text/xml').firstChild
                ];
            }
        },

        localizationMaterialDesign: function (data) {
            let msg = gj.grid.messages[data.locale],
                methods = gj.grid.plugins.pagination.private,
                parser = new DOMParser(),
                pager = document.createElement('select');
            if (typeof (data.pager.leftControls) === 'undefined') {
                data.pager.leftControls = [];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                pager.classList.add('gj-grid-md-limit-select');
                pager.style.width = '3.25rem';
                pager.setAttribute('data-gj-role', 'page-size');
                data.pager.rightControls = [
                    parser.parseFromString('<span class="">' + msg.RowsPerPage + '</span>', 'text/xml').firstChild,
                    pager,
                    parser.parseFromString('<span class="gj-md-spacer-32"> </span>', 'text/xml').firstChild,
                    parser.parseFromString('<span data-gj-role="record-first" class="">0</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span class="">-</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span data-gj-role="record-last" class="">0</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span class="gj-grid-mdl-pager-label">' + msg.Of + '</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span data-gj-role="record-total" class="">0</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span class="gj-md-spacer-32"> </span>', 'text/xml').firstChild,
                    methods.createButton('gj-button-md' + (data.icons.next ? ' gj-button-md-icon' : ''), 'page-previous', msg.PreviousPageTooltip, data.icons.previous || msg.Previous),
                    parser.parseFromString('<span class="gj-md-spacer-24"> </span>', 'text/xml').firstChild,
                    methods.createButton('gj-button-md' + (data.icons.next ? ' gj-button-md-icon' : ''), 'page-next', msg.NextPageTooltip, data.icons.next || msg.Next)
                ];
            }
        },

        initPagerControl: function (control, grid) {
            let data = grid.getConfig();
            switch (control.getAttribute('data-gj-role')) {
                case 'page-size':
                    if (data.pager.sizes && 0 < data.pager.sizes.length) {
                        control.style.display = 'block';
                        for (let i = 0; i < data.pager.sizes.length; i++) {
                            let option = document.createElement('option'),
                                value = data.pager.sizes[i].toString();
                            option.setAttribute('value', value);
                            option.innerText = value
                            control.appendChild(option);
                        };
                        control.value = data.params[data.paramNames.limit];
                        if (gj.dropdown) {
                            new GijgoDropDown(control, {
                                uiLibrary: data.uiLibrary,
                                iconsLibrary: data.iconsLibrary,
                                fontSize: window.getComputedStyle(control, null).getPropertyValue('font-size'),
                                style: {
                                    presenter: 'btn btn-default btn-sm'
                                }
                            });
                        }
                        control.addEventListener('change', function () {
                            let newSize = parseInt(this.value, 10);
                            data.params[data.paramNames.limit] = newSize;
                            gj.grid.plugins.pagination.private.changePage(grid, 1);
                            gj.grid.plugins.pagination.events.pageSizeChange(grid.element, newSize);
                        });
                    } else {
                        control.style.display = 'none';
                    }
                    break;
                case 'page-refresh':
                    control.addEventListener('click', function () { grid.reload(); });
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

                controls = grid.element.querySelectorAll('TFOOT [data-gj-role]');
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.reloadPagerControl((controls[i]), grid, page, lastPage, firstRecord, lastRecord, totalRecords);
                }

                gj.grid.plugins.pagination.private.updatePagerColSpan(grid);
            }
        },

        reloadPagerControl: function (control, grid, page, lastPage, firstRecord, lastRecord, totalRecords) {
            let newPage;
            switch (control.getAttribute('data-gj-role')) {
                case 'page-first':
                    gj.grid.plugins.pagination.private.assignPageHandler(grid, control, 1, page < 2);
                    break;
                case 'page-previous':
                    gj.grid.plugins.pagination.private.assignPageHandler(grid, control, page - 1, page < 2);
                    break;
                case 'page-number':
                    control.value = page;
                    //control.off('change').on('change', gj.grid.plugins.pagination.private.createChangePageHandler(grid, page));
                    break;
                case 'page-label-last':
                    control.innerHTML = lastPage;
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
                    control.innerHTML = firstRecord;
                    break;
                case 'record-last':
                    control.innerHTML = lastRecord;
                    break;
                case 'record-total':
                    control.innerHTML = totalRecords;
                    break;
            }
        },

        assignPageHandler: function (grid, control, newPage, disabled) {
            let style = grid.getConfig().style.pager;
            if (disabled) {
                gj.core.addClasses(control, style.stateDisabled);
                control.disabled = true;
                gj.core.off(control, 'click');
            } else {
                gj.core.removeClasses(control, style.stateDisabled);
                control.disabled = false;
                gj.core.off(control, 'click');
                gj.core.on(control, 'click', function () {
                    gj.grid.plugins.pagination.private.changePage(grid, newPage);
                });
            }
        },

        assignButtonHandler: function (grid, control, page, newPage, lastPage) {
            let style = grid.getConfig().style.pager;
            if (newPage < 1 || newPage > lastPage) {
                control.style.display = 'none';
            } else {
                control.style.display = 'block';
                gj.core.off(control, 'click');
                control.innerHTML = newPage;
                if (newPage === page) {
                    gj.core.addClasses(control, style.activeButton);
                } else {
                    gj.core.removeClasses(control, style.activeButton);
                    gj.core.on(control, 'click', function () {
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
            let data = grid.getConfig(), pageNumber;
            if (gj.grid.plugins.pagination.events.pageChanging(grid.element, newPage) !== false && !isNaN(newPage)) {
                pageNumber = grid.element.querySelector('TFOOT [data-gj-role="page-number"]');
                if (pageNumber) {
                    pageNumber.innerText = newPage;
                }
                data.params[data.paramNames.page] = newPage;
            }
            grid.reload();
        },

        updatePagerColSpan: function (grid) {
            let cell = grid.element.querySelector('tfoot tr[data-gj-role="pager"] th');
            cell && cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
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
         *         */        pageSizeChange: function (el, newSize) {
            return el.dispatchEvent(new CustomEvent('pageSizeChange', { detail: { newSize: newSize } }));
        },

        /**
         * Triggered before the change of the page.
         *         */        pageChanging: function (el, newPage) {
            return el.dispatchEvent(new CustomEvent('pageChanging', { detail: { newPage: newPage } }));
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
            grid.on('dataBound', function (e) {
                gj.grid.plugins.pagination.private.reloadPager(grid, e.detail.totalRecords);
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

/**  */gj.grid.plugins.responsiveDesign = {
    config: {
        base: {
            /** The interval in milliseconds for checking if the grid is resizing.
             * This setting is in use only if the resizeMonitoring setting is set to true.             */            resizeCheckInterval: 500,

            /** This setting enables responsive behaviour of the grid where some column are invisible when there is not enough space on the screen for them.
             * The visibility of the columns in this mode is driven by the column minWidth and priority settings.
             * The columns without priority setting are always visible and can't hide in small screen resolutions.             */            responsive: false,

            /** Automatically adds hidden columns to the details section of the row.
             * This setting works only if the responsive setting is set to true and the detailTemplate is set.
             * You need to set priority and minWidth on the colums, that needs to be hidden in smaller screens.             */            showHiddenColumnsAsDetails: false,

            defaultColumn: {
                /** The priority of the column compared to other columns in the grid.
                 * The columns are hiding based on the priorities.
                 * This setting is working only when the responsive setting is set to true.                 */                priority: undefined,

                /** The minimum width of the column.
                 * The column is getting invisible when there is not enough space in the grid for this minimum width.
                 * This setting is working only when the responsive setting is set to true and the column priority setting is set.                 */                minWidth: 250
            },
            style: {
                rowDetailItem: ''
            }
        },

        bootstrap: {
            style: {
                rowDetailItem: 'col-lg-4'
            }
        }
    },

    'private': {

        orderColumns: function (config) {
            var result = [];
            if (config.columns && config.columns.length) {
                for (i = 0; i < config.columns.length; i++) {
                    result.push({
                        position: i,
                        field: config.columns[i].field,
                        minWidth: config.columns[i].width || config.columns[i].minWidth || config.defaultColumn.minWidth,
                        priority: config.columns[i].priority || 0
                    });
                }
                result.sort(function (a, b) {
                    var result = 0;
                    if (a.priority < b.priority) {
                        result = -1;
                    } else if (a.priority > b.priority) {
                        result = 1;
                    }
                    return result;
                });
            }
            return result;
        },
        
        updateDetails: function (grid) {      
            var rows, data, i, j, $row, details, $placeholder, column, tmp;
            rows = grid.find('tbody > tr[data-role="row"]');
            data = grid.getConfig();
            for (i = 0; i < rows.length; i++) {
                $row = $(rows[i]);
                details = $row.data('details');
                for (j = 0; j < data.columns.length; j++) {
                    column = data.columns[j];
                    $placeholder = details && details.find('div[data-id="' + column.field + '"]');
                    if (data.columns[j].hidden) {
                        tmp = '<b>' + (column.title || column.field) + '</b>: {' + column.field + '}';
                        if (!$placeholder || !$placeholder.length) {
                            $placeholder = $('<div data-id="' + column.field + '"/>').html(tmp);
                            $placeholder.addClass(data.style.rowDetailItem);
                            if (!details || !details.length) {
                                details = $('<div class="row"/>');
                            }
                            details.append($placeholder);
                        } else {
                            $placeholder.empty().html(tmp);
                        }
                    } else if ($placeholder && $placeholder.length) {
                        $placeholder.remove();
                    }
                }
                grid.updateDetails($row);
            }
        }
    },

    'public': {

        oldWidth: undefined,

        resizeCheckIntervalId: undefined,

        /**
         * Make the grid responsive based on the available space.
         * Show column if the space for the grid is expanding and hide columns when the space for the grid is decreasing.         */        makeResponsive: function () {
            var i, $column,
                extraWidth = 0,
                config = this.getConfig(),
                columns = gj.grid.plugins.responsiveDesign.private.orderColumns(config);
            //calculate extra width
            for (i = 0; i < columns.length; i++) {
                $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                if ($column.is(':visible') && columns[i].minWidth < $column.width()) {
                    extraWidth += $column.width() - columns[i].minWidth;
                }
            }
            //show columns
            if (extraWidth) {
                for (i = 0; i < columns.length; i++) {
                    $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                    if (!$column.is(':visible') && columns[i].minWidth <= extraWidth) {
                        this.showColumn(columns[i].field);
                        extraWidth -= $column.width();
                    }
                }
            }
            //hide columns
            for (i = (columns.length - 1); i >= 0; i--) {
                $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                if ($column.is(':visible') && columns[i].priority && columns[i].minWidth > $column.outerWidth()) {
                    this.hideColumn(columns[i].field);
                }
            }

            return this;
        },
    },

    'events': {
        /**
         * Event fires when the grid width is changed. The "responsive" configuration setting should be set to true in order this event to fire.
         *         */        resize: function (grid, newWidth, oldWidth) {
            grid.triggerHandler('resize', [newWidth, oldWidth]);
        }
    },

    'configure': function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.responsiveDesign.public);
        if (fullConfig.responsive) {
            grid.on('initialized', function () {
                grid.makeResponsive();
                grid.oldWidth = grid.width();
                grid.resizeCheckIntervalId = setInterval(function () {
                    var newWidth = grid.width();
                    if (newWidth !== grid.oldWidth) {
                        gj.grid.plugins.responsiveDesign.events.resize(grid, newWidth, grid.oldWidth);
                    }
                    grid.oldWidth = newWidth;
                }, fullConfig.resizeCheckInterval);
            });
            grid.on('destroy', function () {
                if (grid.resizeCheckIntervalId) {
                    clearInterval(grid.resizeCheckIntervalId);
                }
            });
            grid.on('resize', function () {
                grid.makeResponsive();
            });
        }
        if (fullConfig.showHiddenColumnsAsDetails && gj.grid.plugins.expandCollapseRows) {
            grid.on('dataBound', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails(grid);
            });
            grid.on('columnHide', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails(grid);
            });
            grid.on('columnShow', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails(grid);
            });
            grid.on('rowDataBound', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails(grid);
            });
        }
    }
};

/**  */gj.grid.plugins.toolbar = {
    config: {
        base: {
            /** Template for the content in the toolbar. Appears in a separate row on top of the grid.              */            toolbarTemplate: undefined,

            /** The title of the grid. Appears in a separate row on top of the grid.              */            title: undefined,

            style: {
                toolbar: 'gj-grid-md-toolbar'
            }
        },

        bootstrap: {
            style: {
                toolbar: 'gj-grid-bootstrap-toolbar'
            }
        },

        bootstrap4: {
            style: {
                toolbar: 'gj-grid-bootstrap-4-toolbar'
            }
        },

        bootstrap5: {
            style: {
                toolbar: 'gj-grid-bootstrap-5-toolbar'
            }
        }
    },

    private: {
        init: function (grid) {
            var data, toolbar, $title;
            data = grid.getConfig();
            toolbar = grid.element.parentNode.querySelector('div[data-gj-role="toolbar"]');
            if (typeof (data.toolbarTemplate) !== 'undefined' || typeof (data.title) !== 'undefined' || toolbar) {
                if (!toolbar) {
                    toolbar = document.createElement('div');
                    toolbar.setAttribute('data-gj-role', 'toolbar');
                    grid.element.parentNode.insertBefore(toolbar, grid.element);
                }
                gj.core.addClasses(toolbar, data.style.toolbar);

                if (!toolbar.firstChild && data.toolbarTemplate) {
                    toolbar.innerHTML = data.toolbarTemplate;
                }

                title = toolbar.querySelector('[data-gj-role="title"]');
                if (!title) {
                    title = document.createElement('div');
                    title.setAttribute('data-gj-role', 'title');
                    toolbar.appendChild(title);
                }
                if (data.title) {
                    title.innerHTML = data.title;
                }

                if (data.minWidth) {
                    gj.core.css(toolbar, 'minWidth', data.minWidth);
                }
            }
        }
    },

    public: {        
        /**
         * Get or set grid title.         */        title: function (text) {
            var titleEl = this.element.parentNode.querySelector('div[data-gj-role="toolbar"] [data-gj-role="title"]');
            if (typeof (text) !== 'undefined') {
                titleEl.innerHTML = text;
                return this;
            } else {
                return titleEl.innerText;
            }
        }
    },

    configure: function (grid) {
        grid.extend(grid, gj.grid.plugins.toolbar.public);
        grid.on('initialized', function () {
            gj.grid.plugins.toolbar.private.init(grid);
        });
        grid.on('destroying', function () {
            let el = grid.element.parentNode.querySelector('[data-gj-role="toolbar"]');
            el && el.remove();
        });
    }
};

/**  */gj.grid.plugins.resizableColumns = {
    config: {
        base: {
            /** If set to true, users can resize columns by dragging the edges (resize handles) of their header cells.             */            resizableColumns: false
        }
    },

    private: {
        init: function (grid, config) {
            let columns, wrapper, resizer, marginRight;
            columns = grid.element.querySelectorAll('thead tr[data-gj-role="caption"] th');
            if (columns.length) {
                for (let i = 0; i < columns.length - 1; i++) {
                    wrapper = document.createElement('div');
                    wrapper.classList.add('gj-grid-column-resizer-wrapper');
                    marginRight = parseInt(getComputedStyle(columns[i]).paddingRight, 10) + 3;
                    resizer =  document.createElement('span');
                    resizer.classList.add('gj-grid-column-resizer');
                    resizer.style.marginRight = '-' + marginRight + 'px';
                    new GijgoDraggable(resizer, {
                        start: function () {
                            grid.element.classList.add('gj-unselectable');
                            grid.element.classList.add('gj-grid-resize-cursor');
                        },
                        stop: function () {
                            grid.element.classList.remove('gj-unselectable');
                            grid.element.classList.remove('gj-grid-resize-cursor');
                            this.style.removeProperty('top');
                            this.style.removeProperty('left');
                            this.style.removeProperty('position');
                        },
                        drag: gj.grid.plugins.resizableColumns.private.createResizeHandle(grid, columns[i], config.columns, i)
                    });
                    wrapper.appendChild(resizer)
                    columns[i].appendChild(wrapper);
                }
                for (let i = 0; i < columns.length; i++) {
                    if (!columns[i].getAttribute('width')) {
                        columns[i].setAttribute('width', gj.core.width(columns[i], true));
                    }
                }
            }
        },

        createResizeHandle: function (grid, column, columnsConfig, index) {
            let data = grid.getConfig();
            return function (e) {
                let i, rows, newWidth, nextWidth,
                    currentWidth = parseInt(column.getAttribute('width'), 10),
                    position = gj.core.position(this),
                    offset = { top: e.detail.newPosition.top - position.top, left: e.detail.newPosition.left - position.left };
                if (!currentWidth) {
                    currentWidth = gj.core.width(column);
                }
                if (offset.left) {
                    newWidth = currentWidth + offset.left;
                    nextWidth = parseInt(column.nextSibling.getAttribute('width'), 10) - offset.left;
                    columnsConfig[index].width = newWidth;
                    columnsConfig[index].width = newWidth;
                    column.setAttribute('width', newWidth);
                    column.nextSibling.setAttribute('width', nextWidth);
                    if (data.resizableColumns) {
                        rows = grid.element.querySelectorAll('tbody tr');
                        for (i = 0; i < rows.length; i++) {
                            rows[i].children[index].setAttribute('width', newWidth);
                            rows[i].children[index + 1].setAttribute('width', nextWidth);
                        }
                    }
                }
            };
        }
    },

    public: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.resizableColumns.public);
        if (fullConfig.resizableColumns && gj.draggable) {
            grid.on('initialized', function () {
                gj.grid.plugins.resizableColumns.private.init(grid, fullConfig);
            });
        }
    }
};

/**  */gj.grid.plugins.rowReorder = {
    config: {
        base: {
            /** If set to true, enable row reordering with drag and drop.             */            rowReorder: false,

            /** If set, enable row reordering only when you try to drag cell from the configured column.
             * Accept only field names of columns.             */            rowReorderColumn: undefined,

            /** If set, update the value in the field for all records. Accept only field names of columns.             */            orderNumberField: undefined,

            style: {
                targetRowIndicatorTop: 'gj-grid-row-reorder-indicator-top',
                targetRowIndicatorBottom: 'gj-grid-row-reorder-indicator-bottom'
            }
        }
    },

    private: {
        init: function (grid) {
            let i, columnPosition,
                config = grid.getConfig(),
                methods = gj.grid.plugins.rowReorder.private,
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
            if (config.rowReorderColumn) {
                columnPosition = gj.grid.methods.getColumnPosition(config.columns, config.rowReorderColumn);
            }
            gj.core.on(document, 'mousemove', methods.createMouseMoveHandler(grid));
            gj.core.on(document, 'mouseup', methods.createMouseUpHandler(grid));
            for (i = 0; i < rows.length; i++) {
                if (typeof (columnPosition) !== 'undefined') {
                    gj.core.on(rows[i].children[columnPosition], 'mousedown', methods.createRowMouseDownHandler(grid, rows[i]));
                } else {
                    gj.core.on(rows[i], 'mousedown', methods.createRowMouseDownHandler(grid, rows[i]));
                }
            }
        },

        createRowMouseDownHandler: function (grid, trSource) {
            return function (e) {
                let dragEl, elements, cells,
                columns = grid.getConfig().columns,
                position = trSource.getAttribute('data-gj-position');
                
                grid.element.classList.add('gj-unselectable');

                dragEl = grid.element.cloneNode(true);
                dragEl.setAttribute('data-gj-role', 'draggable-clone');
                dragEl.classList.add('gj-unselectable');
                dragEl.style.cursor = 'move';
                dragEl.querySelector('thead').remove();
                elements = dragEl.querySelector('tfoot');
                elements && elements.remove();
                document.body.appendChild(dragEl);

                elements = dragEl.querySelectorAll('tbody tr:not([data-gj-position="' + position + '"])');                
                for (let i = 0; i < elements.length; i++) {
                    elements[i].remove();
                }

                cells = dragEl.querySelectorAll('tbody tr td');
                for (let i = 0; i < cells.length; i++) {
                    if (columns[i].width) {
                        cells[i].setAttribute('width', columns[i].width);
                    }
                }

                dragEl.style.position = 'absolute';
                dragEl.style.top = trSource.getBoundingClientRect().top + 'px';
                dragEl.style.left = trSource.getBoundingClientRect().left + 'px';
                dragEl.style.width = gj.core.width(trSource) + 'px';
                dragEl.style.zIndex = 1;
                new GijgoDraggable(dragEl, {
                    stop: gj.grid.plugins.rowReorder.private.createDragStopHandler(grid, trSource, position - 1)
                });
                dragEl.dispatchEvent(new Event('mousedown'));

                grid.element.setAttribute('data-gj-drag-row', position);
            };
        },

        createMouseUpHandler: function (grid) {
            return function (e) {
                if (grid.element.hasAttribute('data-gj-drag-row')) {
                    grid.element.removeAttribute('data-gj-drag-row');
                }
            }
        },

        createMouseMoveHandler: function (grid) {
            let body = grid.element.querySelector('tbody'),
                bodyPos = gj.core.position(body);
            return function (e) {
                if (grid.element.hasAttribute('data-gj-drag-row')) {
                    let mouse = { x: grid.mouseX(e), y: grid.mouseY(e) };
                    if (mouse.x > bodyPos.left && mouse.x < bodyPos.right && mouse.y > bodyPos.top && mouse.y < bodyPos.bottom) {
                        for (let i = 0; i < body.children.length; i++) {
                            let trPos = gj.core.position(body.children[i]) ;
                            if (mouse.x > trPos.left && mouse.x < trPos.right && mouse.y > trPos.top && mouse.y < trPos.bottom) {       
                                let trIndex = Array.from(body.children).indexOf(body.children[i]),
                                    srcIndex = parseInt(grid.element.getAttribute('data-gj-drag-row')) - 1,
                                    isTop = mouse.y < ((trPos.top + trPos.bottom) / 2);

                                grid.element.querySelectorAll('.gj-grid-top-border').forEach((element) => {  element.classList.remove('gj-grid-top-border'); });
                                grid.element.querySelectorAll('.gj-grid-bottom-border').forEach((element) => {  element.classList.remove('gj-grid-bottom-border'); });
                                if (srcIndex < trIndex) {
                                    if (!isTop || srcIndex + 1 < trIndex) {
                                        body.children[i].classList.add(isTop ? 'gj-grid-top-border' : 'gj-grid-bottom-border');
                                        break;
                                    }
                                }
                                if (srcIndex > trIndex) {
                                    if (isTop || trIndex + 1 < srcIndex) {
                                        body.children[i].classList.add(isTop ? 'gj-grid-top-border' : 'gj-grid-bottom-border');
                                        break;
                                    }
                                }
                            }
                        }                        
                    }
                }
            };
        },

        createDragStopHandler: function (grid, trSource, srcIndex) {
            let body = grid.element.querySelector('tbody'),
                bodyPos = gj.core.position(body),
                methods = gj.grid.plugins.rowReorder.private;
            return function (e) {
                let records = grid.getRecords();
                document.body.querySelector('table[data-gj-role="draggable-clone"]').remove();
                grid.element.classList.remove('gj-unselectable');
                grid.element.querySelectorAll('.gj-grid-top-border').forEach((element) => {  element.classList.remove('gj-grid-top-border'); });
                grid.element.querySelectorAll('.gj-grid-bottom-border').forEach((element) => {  element.classList.remove('gj-grid-bottom-border'); });
                
                if (e.detail.x > bodyPos.left && e.detail.x < bodyPos.right && e.detail.y > bodyPos.top && e.detail.y < bodyPos.bottom) {
                    for (let i = 0; i < body.children.length; i++) {
                        let trPos = gj.core.position(body.children[i]) ;
                        if (e.detail.x > trPos.left && e.detail.x < trPos.right && e.detail.y > trPos.top && e.detail.y < trPos.bottom) {       
                            let trIndex = Array.from(body.children).indexOf(body.children[i]),
                                isTop = e.detail.y < ((trPos.top + trPos.bottom) / 2);

                            grid.element.querySelectorAll('.gj-grid-top-border').forEach((element) => {  element.classList.remove('gj-grid-top-border'); });
                            grid.element.querySelectorAll('.gj-grid-bottom-border').forEach((element) => {  element.classList.remove('gj-grid-bottom-border'); });
                            if (srcIndex < trIndex) {
                                if (!isTop || srcIndex + 1 < trIndex) {
                                    body.insertBefore(trSource, isTop ? body.children[i] : body.children[i].nextSibling);
                                    records.splice(isTop ? trIndex - 1 : trIndex, 0, records.splice(srcIndex, 1)[0]);
                                    methods.updatePositions(grid, records);
                                    break;
                                }
                            }
                            if (srcIndex > trIndex) {
                                if (isTop || trIndex + 1 < srcIndex) {
                                    body.insertBefore(trSource, isTop ? body.children[i] : body.children[i].nextSibling);
                                    records.splice(isTop ? trIndex : trIndex + 1, 0, records.splice(srcIndex, 1)[0]);
                                    methods.updatePositions(grid, records);
                                    break;
                                }
                            }
                        }
                    }                        
                }
            }
        },

        updatePositions: function (grid, records) {
            let rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]'),
                config = grid.getConfig();
            if (config.orderNumberField) {
                for (i = 0; i < records.length; i++) {
                    records[i][config.orderNumberField] = i + 1;
                }
            }
            for (let i = 0; i < rows.length; i++) {
                rows[i].setAttribute('data-gj-position', i + 1);
                if (config.orderNumberField) {
                    let id = gj.grid.methods.getId(rows[i], config.primaryKey, i + 1),
                        record = gj.grid.methods.getByPosition(grid, i + 1);
                    grid.setCellContent(id, config.orderNumberField, record[data.orderNumberField]);
                }
            }
        }
    },

    public: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.rowReorder.public);
        if (fullConfig.rowReorder && gj.draggable && gj.droppable) {
            grid.on('dataBound', function () {
                gj.grid.plugins.rowReorder.private.init(grid);
            });
        }
    }
};

/**  */gj.grid.plugins.export = {
    config: { base: {} },

    public: {
        /**
         * Get grid data in Comma Separated Values (CSV) format.         */        getCSV: function (includeAllRecords) {
            var i, j, line = '', str = '',
                columns = this.getConfig().columns,
                records = this.getAll(includeAllRecords);

            if (records.length) {

                for (i = 0; i < columns.length; i++) {
                    if (gj.grid.plugins.export.public.isColumnApplicable(columns[i])) {
                        line += '"' + (columns[i].title || columns[i].field).replace(/<[^>]+>/g, ' ') + '",';
                    }
                }
                str += line.slice(0, line.length - 1) + '\r\n';

                for (i = 0; i < records.length; i++) {
                    line = '';

                    for (j = 0; j < columns.length; j++) {
                        if (gj.grid.plugins.export.public.isColumnApplicable(columns[j])) {
                            line += '"' + records[i][columns[j].field] + '",';
                        }
                    }                    
                    str += line.slice(0, line.length - 1) + '\r\n';
                }
            }

            return str;
        },

        /**
         * Download grid data in Comma Separated Values (CSV) format.         */        downloadCSV: function (filename, includeAllRecords) {
            var link = document.createElement('a');
            document.body.appendChild(link);
            link.download = filename || 'griddata.csv'; 
            if (window.navigator.userAgent.indexOf("Edge") > -1) {
                link.href = URL.createObjectURL(new Blob([this.getCSV(includeAllRecords)], { type: 'text/csv;charset=utf-8;' }));
            } else {
                link.href = 'data:text/csv;charset=utf-8,' + escape(this.getCSV(includeAllRecords));
            }
            link.click();
            document.body.removeChild(link);
            return this;
        },

        isColumnApplicable: function (column) {
            return column.hidden !== true && !column.role;
        }
    },

    configure: function (grid) {
        grid.extend(grid, gj.grid.plugins.export.public);
    }
};

/**  */gj.grid.plugins.columnReorder = {
    config: {
        base: {
            /** If set to true, enable column reordering with drag and drop.             */            columnReorder: false,

            dragReady: false,

            style: {
                targetRowIndicatorTop: 'gj-grid-row-reorder-indicator-top',
                targetRowIndicatorBottom: 'gj-grid-row-reorder-indicator-bottom'
            }
        }
    },

    private: {
        init: function (grid) {
            let i, cells = grid.element.querySelectorAll('thead tr th');
            gj.core.on(document, 'mousemove', gj.grid.plugins.columnReorder.private.createMouseMoveHandler(grid));
            gj.core.on(document, 'mouseup', gj.grid.plugins.columnReorder.private.createMouseUpHandler(grid));
            for (i = 0; i < cells.length; i++) {
                gj.core.on(cells[i], 'mousedown', gj.grid.plugins.columnReorder.private.createMouseDownHandler(grid, cells[i]));
                new GijgoDroppable(cells[i]);
            }
        },

        createMouseDownHandler: function (grid, thSource) {
            return function (e) {
                let dragEl, srcIndex, elements;

                dragEl = grid.element.cloneNode(true);
                grid.element.classList.add('gj-unselectable');
                dragEl.classList.add('gj-unselectable');
                document.body.appendChild(dragEl);
                dragEl.setAttribute('data-gj-role', 'draggable-clone')
                dragEl.style.cursor = 'move';
                srcIndex = Array.from(thSource.parentNode.children).indexOf(thSource);
                
                elements = dragEl.querySelectorAll('thead tr th');
                for (let i = 0; i < elements.length; i++) {
                    if (i !== srcIndex) {
                        elements[i].remove();
                    }
                }
                elements = dragEl.querySelectorAll('tbody tr:not([data-gj-role="row"])');
                for (let i = 0; i < elements.length; i++) {
                    elements[i].remove();
                }
                
                elements = dragEl.querySelectorAll('tbody tr');
                for (let i = 0; i < elements.length; i++) {
                    for (let index = srcIndex, j = 0; j < elements[i].children.length; j++) {
                        if (j !== index) {
                            elements[i].removeChild(elements[i].children[j]);
                            j--;
                            index--;
                        }
                    }
                }

                elements = dragEl.querySelector('tfoot');
                elements && elements.remove();

                dragEl.style.position = 'absolute';
                dragEl.style.top = thSource.getBoundingClientRect().top + 'px';
                dragEl.style.left = thSource.getBoundingClientRect().left + 'px';
                dragEl.style.width = gj.core.width(thSource) + 'px';
                dragEl.style.zIndex = 1;

                new GijgoDraggable(dragEl, {
                    stop: gj.grid.plugins.columnReorder.private.createDragStopHandler(grid, thSource, srcIndex)
                });
                dragEl.dispatchEvent(new Event('mousedown'));

                grid.element.setAttribute('data-gj-drag-column', srcIndex);
            }
        },

        createMouseUpHandler: function (grid) {
            return function (e) {
                if (grid.element.hasAttribute('data-gj-drag-column')) {
                    grid.element.removeAttribute('data-gj-drag-column');
                }
            }
        },

        createMouseMoveHandler: function (grid) {
            let header = grid.element.querySelector('thead tr'),
                body = grid.element.querySelector('tbody'),
                headerPos = gj.core.position(header);
            return function (e) {
                if (grid.element.hasAttribute('data-gj-drag-column')) {
                    let mouse = { x: grid.mouseX(e), y: grid.mouseY(e) };
                    if (mouse.x > headerPos.left && mouse.x < headerPos.right && mouse.y > headerPos.top && mouse.y < headerPos.bottom) {
                        for (let i = 0; i < header.children.length; i++) {
                            let thPos = gj.core.position(header.children[i]) ;
                            if (mouse.x > thPos.left && mouse.x < thPos.right && mouse.y > thPos.top && mouse.y < thPos.bottom) {       
                                let thIndex = Array.from(header.children).indexOf(header.children[i]),
                                    srcIndex = parseInt(grid.element.getAttribute('data-gj-drag-column')),
                                    isLeft = mouse.x < ((thPos.left + thPos.right) / 2);

                                grid.element.querySelectorAll('.gj-grid-left-border').forEach((element) => {  element.classList.remove('gj-grid-left-border'); });
                                grid.element.querySelectorAll('.gj-grid-right-border').forEach((element) => {  element.classList.remove('gj-grid-right-border'); });
                                if (srcIndex < thIndex) {
                                    if (!isLeft || srcIndex + 1 < thIndex) {
                                        gj.grid.plugins.columnReorder.private.addBorder(isLeft, header, body, i);
                                        break;
                                    }
                                }
                                if (srcIndex > thIndex) {
                                    if (isLeft || thIndex + 1 < srcIndex) {
                                        gj.grid.plugins.columnReorder.private.addBorder(isLeft, header, body, i);
                                        break;
                                    }
                                }
                            }
                        }                        
                    }
                }
            };
        },

        addBorder: function (isLeft, header, body, column) {
            header.children[column].classList.add(isLeft ? 'gj-grid-left-border' : 'gj-grid-right-border');
            for (let i = 0; i < body.children.length; i++) {
                body.children[i].children[column].classList.add(isLeft ? 'gj-grid-left-border' : 'gj-grid-right-border');
            }
        },

        createDragStopHandler: function (grid, thSource, srcIndex) {            
            let header = grid.element.querySelector('thead tr'),
                headerPos = gj.core.position(header),
                config = grid.getConfig();

            return function (e) {
                document.body.querySelector('table[data-gj-role="draggable-clone"]').remove();
                grid.element.classList.remove('gj-unselectable');
                grid.element.querySelectorAll('.gj-grid-left-border').forEach((element) => {  element.classList.remove('gj-grid-left-border'); });
                grid.element.querySelectorAll('.gj-grid-right-border').forEach((element) => {  element.classList.remove('gj-grid-right-border'); });
                if (e.detail.x > headerPos.left && e.detail.x < headerPos.right && e.detail.y > headerPos.top && e.detail.y < headerPos.bottom) {
                    for (let i = 0; i < header.children.length; i++) {
                        let thPos = gj.core.position(header.children[i]);
                        if (e.detail.x > thPos.left && e.detail.x < thPos.right && e.detail.y > thPos.top && e.detail.y < thPos.bottom) {  
                            let thIndex = Array.from(header.children).indexOf(header.children[i]),
                                isLeft = e.detail.x < ((thPos.left + thPos.right) / 2);
                            if (srcIndex < thIndex) {
                                if (!isLeft || srcIndex + 1 < thIndex) {
                                    header.insertBefore(thSource, isLeft ? header.children[i] : header.children[i].nextSibling);
                                    gj.grid.plugins.columnReorder.private.moveRowCells(grid, srcIndex, isLeft ? thIndex - 1 : thIndex);
                                    config.columns.splice(srcIndex, isLeft ? thIndex - 1 : thIndex, 0, config.columns.splice(srcIndex, 1)[0]);
                                    break;
                                }
                            }
                            if (srcIndex > thIndex) {
                                if (isLeft || thIndex + 1 < srcIndex) {
                                    header.insertBefore(thSource, isLeft ? header.children[i] : header.children[i].nextSibling);
                                    gj.grid.plugins.columnReorder.private.moveRowCells(grid, srcIndex, isLeft ? thIndex : thIndex + 1);
                                    config.columns.splice(srcIndex, isLeft ? thIndex : thIndex + 1, 0, config.columns.splice(srcIndex, 1)[0]);
                                    break; 
                                }
                            }
                            break;
                        }
                    }                        
                }
            }
        },

        moveRowCells: function (grid, sourcePosition, targetPosition) {
            let i, rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
            for (i = 0; i < rows.length; i++) {
                if (targetPosition < sourcePosition) {
                    rows[i].insertBefore(rows[i].children[sourcePosition], rows[i].children[targetPosition]);
                } else {
                    rows[i].insertBefore(rows[i].children[sourcePosition], rows[i].children[targetPosition].nextSibling);
                }                
            }
        }
    },

    public: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.columnReorder.public);
        if (fullConfig.columnReorder) {
            grid.on('initialized', function () {
                gj.grid.plugins.columnReorder.private.init(grid);
            });
        }
    }
};

/** */gj.grid.plugins.headerFilter = {
    config: {
        base: {
            defaultColumnSettings: {
                /** Indicates if the column is sortable. If set to false the header filter is hidden.                 */                filterable: true
            },

            /** If set to true, add filters for each column             */            headerFilter: {
                /** Type of the header filter                 */                type: 'onenterkeypress'
            }
        }
    },

    private: {
        init: function (grid) {
            var i, th, ctrl, data = grid.getConfig(),
                filterTr = document.createElement('tr');

            filterTr.setAttribute('data-gj-role', 'filter');
            for (i = 0; i < data.columns.length; i++) {
                th = document.createElement('th');
                if (data.columns[i].filterable) {
                    ctrl = document.createElement('input');
                    ctrl.setAttribute('data-gj-field', data.columns[i].field);
                    ctrl.classList.add('gj-width-full');
                    if ('onchange' === data.headerFilter.type) {
                        ctrl.addEventListener('keyup', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                        ctrl.addEventListener('change', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                        ctrl.addEventListener('paste', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                    } else {
                        ctrl.addEventListener('keypress', function (e) {
                            if (e.key === 'Enter') {
                                gj.grid.plugins.headerFilter.private.reload(grid, this);
                            }
                        });
                        ctrl.addEventListener('blur', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                    }
                    th.appendChild(ctrl);
                }
                if (data.columns[i].hidden) {
                    th.style.display = 'none';
                }
                filterTr.appendChild(th);
            }

            grid.element.querySelector('thead').appendChild(filterTr);
        },

        reload: function (grid, ctrl) {
            var params = {};
            params[ctrl.getAttribute('data-gj-field')] = ctrl.value;
            grid.reload(params);
        }
    },

    public: {
    },

    events: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.headerFilter.public);
        var data = grid.getConfig();
        if (clientConfig.headerFilter) {
            grid.on('initialized', function () {
                gj.grid.plugins.headerFilter.private.init(grid);
            });
        }
    }
};

/**  */gj.grid.plugins.grouping = {
    config: {
        base: {
            paramNames: {
                /** The name of the parameter that is going to send the name of the column for grouping.
                 * The grouping should be enabled in order this parameter to be in use.                 */                groupBy: 'groupBy',

                /** The name of the parameter that is going to send the direction for grouping.
                 * The grouping should be enabled in order this parameter to be in use.                 */                groupByDirection: 'groupByDirection'
            },

            grouping: {
                /** The name of the field that needs to be in use for grouping.                  */                groupBy: undefined,

                direction: 'asc'
            },

            icons: {
                /** Expand row icon definition.                 */                expandGroup: '<i class="gj-icon plus" />',

                /** Collapse row icon definition.                 */                collapseGroup: '<i class="gj-icon minus" />'
            }
        },

        fontawesome: {
            icons: {
                expandGroup: '<i class="fa fa-plus" aria-hidden="true"></i>',
                collapseGroup: '<i class="fa fa-minus" aria-hidden="true"></i>'
            }
        },

        glyphicons: {
            icons: {
                expandGroup: '<span class="glyphicon glyphicon-plus" />',
                collapseGroup: '<span class="glyphicon glyphicon-minus" />'
            }
        }
    },

    private: {
        init: function (grid) {
            let previousValue, data = grid.getConfig();

            previousValue = undefined;
            grid.on('rowDataBound', function (e) {
                if (previousValue !== e.detail.record[data.grouping.groupBy] || e.detail.row.rowIndex === 1) {
                    let colspan = gj.grid.methods.countVisibleColumns(grid) - 1,
                        groupRow = document.createElement('tr'),
                        expandCollapseCell = document.createElement('td'),
                        groupCell = document.createElement('td'),
                        icon = document.createElement('div'),
                        display = document.createElement('div'),
                        position = e.detail.row.getAttribute("data-gj-position");

                    groupRow.setAttribute('data-gj-role', 'group');
                    gj.core.addClasses(expandCollapseCell, 'gj-text-align-center gj-unselectable gj-cursor-pointer');

                    icon.setAttribute('data-gj-role', 'display');
                    icon.innerHTML = data.icons.collapseGroup;
                    gj.core.on(icon, 'click', gj.grid.plugins.grouping.private.createExpandCollapseHandler(grid, position));
                    expandCollapseCell.appendChild(icon);
                    groupRow.appendChild(expandCollapseCell);

                    groupCell.setAttribute('colspan', colspan);
                    display.setAttribute('data-gj-role', 'display');
                    display.innerHTML = data.grouping.groupBy + ': ' + e.detail.record[data.grouping.groupBy];
                    groupCell.appendChild(display);
                    groupRow.appendChild(groupCell);

                    e.detail.row.parentNode.insertBefore(groupRow, e.detail.row);
                    previousValue = e.detail.record[data.grouping.groupBy];
                }
                //TODO: row.show();
            });

            data.params[data.paramNames.groupBy] = data.grouping.groupBy;
            data.params[data.paramNames.groupByDirection] = data.grouping.direction;
        },

        grouping: function (grid, records) {
            let data = grid.getConfig();
            records.sort(gj.grid.methods.createDefaultSorter(data.grouping.direction, data.grouping.groupBy));
        },

        createExpandCollapseHandler: function (grid, position) {
            return function () {
                let methods = gj.grid.plugins.grouping.private,
                    row = this.parentNode.parentNode.nextSibling;
                if (row.style.display === 'none') {
                    methods.expandGroup(grid.getConfig().icons, this);
                } else {
                    methods.collapseGroup(grid.getConfig().icons, this);
                }
            };
        },

        collapseGroup: function (icons, icon) {
            let nextEl = icon.parentNode.parentNode.nextSibling;
            
            while (nextEl) {
                if (nextEl.getAttribute('data-gj-role') === 'group') {
                    break;
                } else {
                    nextEl.style.display = 'none';
                    nextEl = nextEl.nextSibling;
                }
            }
            icon.innerHTML = icons.expandGroup;
        },

        expandGroup: function (icons, icon) {
            let nextEl = icon.parentNode.parentNode.nextSibling;
            
            while (nextEl) {
                if (nextEl.getAttribute('data-gj-role') === 'group') {
                    break;
                } else {
                    nextEl.style.display = '';
                    nextEl = nextEl.nextSibling;
                }
            }
            icon.innerHTML = icons.collapseGroup;
        }
    },

    public: { },

    configure: function (grid) {
        let column, data = grid.getConfig();
        grid.extend(grid, gj.grid.plugins.grouping.public);
        if (data.grouping && data.grouping.groupBy) {
            column = {
                title: '',
                width: data.defaultIconColumnWidth,
                align: 'center',
                stopPropagation: true,
                cssClass: 'gj-cursor-pointer gj-unselectable'
            };
            data.columns = [column].concat(data.columns);

            grid.on('initialized', function () {
                gj.grid.plugins.grouping.private.init(grid);
            });

            grid.on('dataFiltered', function (e) {
                gj.grid.plugins.grouping.private.grouping(grid, e.detail.records);
            });
        }
    }
};

gj.grid.messages['en-us'] = {
    First: 'First',
    Previous: 'Previous',
    Next: 'Next',
    Last: 'Last',
    Page: 'Page',
    FirstPageTooltip: 'First Page',
    PreviousPageTooltip: 'Previous Page',
    NextPageTooltip: 'Next Page',
    LastPageTooltip: 'Last Page',
    Refresh: 'Refresh',
    Of: 'of',
    DisplayingRecords: 'Displaying records',
    RowsPerPage: 'Rows per page:',
    Edit: 'Edit',
    Delete: 'Delete',
    Update: 'Update',
    Cancel: 'Cancel',
    NoRecordsFound: 'No records found.',
    Loading: 'Loading...'
};
gj.grid.messages['bg-bg'] = {
    First: 'Първа',
    Previous: 'Предишна',
    Next: 'Следваща',
    Last: 'Последна',
    Page: 'Страница',
    FirstPageTooltip: 'Първа Страница',
    PreviousPageTooltip: 'Предишна Страница',
    NextPageTooltip: 'Следваща Страница',
    LastPageTooltip: 'Последна Страница',
    Refresh: 'Презареждане',
    Of: 'от',
    DisplayingRecords: 'Паказани записи',
    RowsPerPage: 'Редове на страница:',
    Edit: 'Редактиране',
    Delete: 'Изтриване',
    Update: 'Актуализация',
    Cancel: 'Отказ',
    NoRecordsFound: 'Няма намерени записи.',
    Loading: 'Зареждане...'
};
gj.grid.messages['fr-fr'] = {
    First: 'Premier',
    Previous: 'Précédent',
    Next: 'Prochain',
    Last: 'Dernier',
    Page: 'Page',
    FirstPageTooltip: 'Première page',
    PreviousPageTooltip: 'Page précédente',
    NextPageTooltip: 'Page suivante',
    LastPageTooltip: 'Dernière page',
    Refresh: 'Rafraîchir',
    Of: 'de',
    DisplayingRecords: 'Résultats',
    RowsPerPage: 'Lignes par page:',
    Edit: 'Modifier',
    Delete: 'Effacer',
    Update: 'Mettre à jour',
    Cancel: 'Annuler',
    NoRecordsFound: 'Aucun enregistrement trouvé.',
    Loading: 'Chargement...'
};
gj.grid.messages['de-de'] = {
    First: 'Erste',
    Previous: 'Vorherige',
    Next: 'N\u00e4chste',
    Last: 'Letzte',
    Page: 'Seite',
    FirstPageTooltip: 'Erste Seite',
    PreviousPageTooltip: 'Vorherige Seite',
    NextPageTooltip: 'N\u00e4chste Seite',
    LastPageTooltip: 'Letzte Seite',
    Refresh: 'Aktualisieren',
    Of: 'von',
    DisplayingRecords: 'Zeige Datens\u00e4tze',
    RowsPerPage: 'Zeilen pro Seite:',
    Edit: 'Editieren',
    Delete: 'L\u00f6schen',
    Update: 'Aktualisieren',
    Cancel: 'Abbrechen',
    NoRecordsFound: 'Es wurden keine Datens\u00e4tze gefunden.',
    Loading: 'Laden...'
};
gj.grid.messages['pt-br'] = {
    First: 'Primeiro',
    Previous: 'Anterior',
    Next: 'Próximo',
    Last: 'Último',
    Page: 'Página',
    FirstPageTooltip: 'Primeira página',
    PreviousPageTooltip: 'Página anterior',
    NextPageTooltip: 'Próxima página',
    LastPageTooltip: 'Última Página',
    Refresh: 'Atualizar',
    Of: 'de',
    DisplayingRecords: 'Mostrando registros',
    RowsPerPage: 'Linhas por página:',
    Edit: 'Editar',
    Delete: 'Excluir',
    Update: 'Alterar',
    Cancel: 'Cancelar',
    NoRecordsFound: 'Nenhum registro encontrado.',
    Loading: 'Carregando...'
};
gj.grid.messages['ru-ru'] = {
    First: 'Первый',
    Previous: 'Предыдущий',
    Next: 'Следующий',
    Last: 'Последний',
    Page: 'Страница',
    FirstPageTooltip: 'Первая страница',
    PreviousPageTooltip: 'Предыдущая страница',
    NextPageTooltip: 'Следущая страница',
    LastPageTooltip: 'Последняя страница',
    Refresh: 'Обновить',
    Of: 'от',
    DisplayingRecords: 'Показать записи',
    RowsPerPage: 'Записей на странице:',
    Edit: 'Изменить',
    Delete: 'Удалить',
    Update: 'Обновить',
    Cancel: 'Отмена',
    NoRecordsFound: 'Нет ни одной записи.',
    Loading: 'Загрузка...'
};
gj.grid.messages['es-es'] = {
    First: 'Primero',
    Previous: 'Anterior',
    Next: 'Siguiente',
    Last: 'Último',
    Page: 'Página',
    FirstPageTooltip: 'Primera página',
    PreviousPageTooltip: 'Página anterior',
    NextPageTooltip: 'Página siguiente',
    LastPageTooltip: 'Última página',
    Refresh: 'Refrescar',
    Of: 'de',
    DisplayingRecords: 'Resultados',
    RowsPerPage: 'Lineas por página:',
    Edit: 'Modificar',
    Delete: 'Eliminar',
    Update: 'Actualizar',
    Cancel: 'Cancelar',
    NoRecordsFound: 'No se encontraron registros.',
    Loading: 'Cargando...'
};
gj.grid.messages['it-it'] = {
    First: 'Primo',
    Previous: 'Precedente',
    Next: 'Successivo',
    Last: 'Ultimo',
    Page: 'Pagina',
    FirstPageTooltip: 'Prima pagina',
    PreviousPageTooltip: 'Pagina precedente',
    NextPageTooltip: 'Pagina successiva',
    LastPageTooltip: 'Ultima pagina',
    Refresh: 'Aggiorna',
    Of: 'di',
    DisplayingRecords: 'Risultati',
    RowsPerPage: 'Righe per pagina:',
    Edit: 'Modifica',
    Delete: 'Cancella',
    Update: 'Aggiorna',
    Cancel: 'Annulla',
    NoRecordsFound: 'Nessun record trovato.',
    Loading: 'Caricamento...'
};
gj.grid.messages['tr-tr'] = {
    First: 'İlk',
    Previous: 'Önceki',
    Next: 'Sonraki',
    Last: 'Son',
    Page: 'Sayfa',
    FirstPageTooltip: 'İlk sayfa',
    PreviousPageTooltip: 'Önceki sayfa',
    NextPageTooltip: 'Sonraki sayfa',
    LastPageTooltip: 'Son sayfa',
    Refresh: 'Yenile',
    Of: 'üzerinden',
    DisplayingRecords: 'Sonuçlar',
    RowsPerPage: 'Lignes par page:',
    Edit: 'Düzenle',
    Delete: 'Sil',
    Update: 'Güncelle',
    Cancel: 'İptal',
    NoRecordsFound: 'Kayıt Yok.',
    Loading: 'Yükleniyor...'
};
gj.grid.messages['ja-jp'] = {
    First: '最初',
    Previous: '前',
    Next: '次',
    Last: '最後',
    Page: 'ページ',
    FirstPageTooltip: '最初のページ',
    PreviousPageTooltip: '前のページ',
    NextPageTooltip: '次のページ',
    LastPageTooltip: '最後のページ',
    Refresh: 'リフレッシュ',
    Of: 'の',
    DisplayingRecords: '結果',
    RowsPerPage: 'ページあたり行数:',
    Edit: '編集',
    Delete: '削除',
    Update: '更新',
    Cancel: 'キャンセル',
    NoRecordsFound: 'レコードが見つかりません',
    Loading: '読み込み中...'
};
gj.grid.messages['zh-cn'] = {
    First: '首',
    Previous: '上一个',
    Next: '下一个',
    Last: '尾',
    Page: '页',
    FirstPageTooltip: '首页',
    PreviousPageTooltip: '上一页',
    NextPageTooltip: '下一页',
    LastPageTooltip: '尾页',
    Refresh: '刷新',
    Of: '的',
    DisplayingRecords: '正在显示记录',
    RowsPerPage: '行每页',
    Edit: '编辑',
    Delete: '删除',
    Update: '更新',
    Cancel: '取消',
    NoRecordsFound: '找不到记录。',
    Loading: '正在加载……'
};
gj.grid.messages['zh-tw'] = {
    First: '首',
    Previous: '上一個',
    Next: '下一個',
    Last: '尾',
    Page: '頁',
    FirstPageTooltip: '首頁',
    PreviousPageTooltip: '上一頁',
    NextPageTooltip: '下一頁',
    LastPageTooltip: '尾頁',
    Refresh: '刷新',
    Of: '的',
    DisplayingRecords: '正在顯示記錄',
    RowsPerPage: '行每頁',
    Edit: '編輯',
    Delete: '刪除',
    Update: '更新',
    Cancel: '取消',
    NoRecordsFound: '找不到記錄。',
    Loading: '正在加載……'
};
gj.grid.messages['lv-lv'] = {
    First: 'Pirmais',
    Previous: 'Iepriekšējais',
    Next: 'Nākošais',
    Last: 'Pēdējais',
    Page: 'Lapa',
    FirstPageTooltip: 'Pirmā lapa',
    PreviousPageTooltip: 'Iepriekšējā lapa',
    NextPageTooltip: 'Nākamā lapa',
    LastPageTooltip: 'Pēdējā lapa',
    Refresh: 'Atjaunot',
    Of: 'no',
    DisplayingRecords: 'Rādīt ierakstus',
    RowsPerPage: 'Ieraksti vienā lappusē:',
    Edit: 'Rediģēt',
    Delete: 'Dzēst',
    Update: 'Atjaunot',
    Cancel: 'Atcelt',
    NoRecordsFound: 'Nav neviena ieraksta.',
    Loading: 'Notiek ielāde...'
};
gj.grid.messages['cs-cz'] = {
    First: 'První',
    Previous: 'Předchozí',
    Next: 'Další',
    Last: 'Poslední',
    Page: 'Stránka',
    FirstPageTooltip: 'První stránka',
    PreviousPageTooltip: 'Předchozí stránka',
    NextPageTooltip: 'Další stránka',
    LastPageTooltip: 'Poslední stránka',
    Refresh: 'Obnovit',
    Of: 'z',
    DisplayingRecords: 'Zobrazit záznamy',
    RowsPerPage: 'Řádků na stránce:',
    Edit: 'Upravit',
    Delete: 'Smazat',
    Update: 'Aktualizovat',
    Cancel: 'Zrušit',
    NoRecordsFound: 'Nebyly nalezeny žádné záznamy.',
    Loading: 'Načítání...'
};
gj.grid.messages['az-az'] = {
    First: 'İlk',
    Previous: 'Öncəki',
    Next: 'Sonrakı',
    Last: 'Son',
    Page: 'Səhifə',
    FirstPageTooltip: 'İlk səhifə',
    PreviousPageTooltip: 'Öncəki səhifə',
    NextPageTooltip: 'Sonrakı səhifə',
    LastPageTooltip: 'Son səhifə',
    Refresh: 'Yenilə',
    Of: 'üzərindən',
    DisplayingRecords: 'Nəticələr',
    RowsPerPage: 'Səhifədəki sətr sayı:',
    Edit: 'Dəyişdir',
    Delete: 'Sil',
    Update: 'Redaktə et',
    Cancel: 'İmtina',
    NoRecordsFound: 'Nəticə yoxdur.',
    Loading: 'Yüklənir...'
};
gj.grid.messages['el-gr'] = {
    First: 'Αρχή',
    Previous: 'Προηγούμενο',
    Next: 'Επόμενο',
    Last: 'Τέλος',
    Page: 'Σελίδα',
    FirstPageTooltip: 'Πρώτη Σελίδα',
    PreviousPageTooltip: 'Προηγούμενη Σελίδα',
    NextPageTooltip: 'Επόμενη Σελίδα',
    LastPageTooltip: 'Τελευταία Σελίδα',
    Refresh: 'Ανανέωση',
    Of: 'Από',
    DisplayingRecords: 'Αποτελέσματα',
    RowsPerPage: 'Γραμμές ανά σελίδα:',
    Edit: 'Επεξεργασία',
    Delete: 'Διαγραφή',
    Update: 'Ενημέρωση',
    Cancel: 'Άκυρο',
    NoRecordsFound: 'Δε βρέθηκαν εγγραφές.',
    Loading: 'Φόρτωση...'
};
gj.grid.messages['hu-hu'] = {
    First: 'Első',
    Previous: 'Előző',
    Next: 'Következő',
    Last: 'Utolsó',
    Page: 'Oldal',
    FirstPageTooltip: 'Első oldal',
    PreviousPageTooltip: 'Előző oldal',
    NextPageTooltip: 'Következő oldal',
    LastPageTooltip: 'Utolsó oldal',
    Refresh: 'Frissítés',
    Of: '/',
    DisplayingRecords: 'Rekordok megjelenítése',
    RowsPerPage: 'Sorok oldalanként:',
    Edit: 'Szerkesztés',
    Delete: 'Törlés',
    Update: 'Módosítás',
    Cancel: 'Mégsem',
    NoRecordsFound: 'Nincs találat.',
    Loading: 'Betöltés...'
};
gj.grid.messages['nl-nl'] = {
    First: 'Eerste',
    Previous: 'Vorige',
    Next: 'Volgende',
    Last: 'Laatste',
    Page: 'Pagina',
    FirstPageTooltip: 'Eerste pagina',
    PreviousPageTooltip: 'Vorige pagina',
    NextPageTooltip: 'Volgende pagina',
    LastPageTooltip: 'Laatste pagina',
    Refresh: 'Vernieuwen',
    Of: 'van',
    DisplayingRecords: 'Weergeef datums',
    RowsPerPage: 'Rijen per pagina:',
    Edit: 'Bewerk',
    Delete: 'Verwijder',
    Update: 'Bijwerken',
    Cancel: 'Annuleren',
    NoRecordsFound: 'Geen resultaten gevonden.',
    Loading: 'Laden...'
};

gj.grid.messages['ro-ro'] = {
    First: 'Prima',
    Previous: 'Anterioara',
    Next: 'Următoarea',
    Last: 'Ultima',
    Page: 'Pagină',
    FirstPageTooltip: 'Prima Pagină',
    PreviousPageTooltip: 'Pagina Anterioară',
    NextPageTooltip: 'Următoarea Pagină',
    LastPageTooltip: 'Ultima Pagină',
    Refresh: 'Împrospătare',
    Of: 'din',
    DisplayingRecords: 'Afișare înregistrări',
    RowsPerPage: 'Rânduri per pagină:',
    Edit: 'Editează',
    Delete: 'Sterge',
    Update: 'Modifică',
    Cancel: 'Anulează',
    NoRecordsFound: 'Nu s-au găsit înregistrări.',
    Loading: 'Încărcare...'
};

