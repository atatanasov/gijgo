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
