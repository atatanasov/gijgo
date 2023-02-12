/**
  * @widget Grid
  * @plugin Base
  */
gj.grid.events = {
    /**
     * Event fires before addition of an empty row to the grid.
     * @event beforeEmptyRowInsert
     * @param {object} e - event data
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: {
     *             url: '/Players/Get',
     *             data: { name: 'not existing data' } //search for not existing data in order to fire the event
     *         },
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('beforeEmptyRowInsert', function (e) {
     *         alert('beforeEmptyRowInsert is fired.');
     *     });
     * </script>
     */
    beforeEmptyRowInsert: function (el) {
        return el.dispatchEvent(new Event('beforeEmptyRowInsert'));
    },

    /**
     * Event fired before data binding takes place.
     *
     * @event dataBinding
     * @param {object} e - event data
     * @param {array} e.detail.records - the list of records
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         dataBinding: function (e) {
     *             alert('dataBinding is fired. ' + e.detail.records.length + ' records will be loaded in the grid.');
     *         }
     *     });
     * </script>
     */
    dataBinding: function (el, records) {
        return el.dispatchEvent(new CustomEvent('dataBinding', { detail: { records: records } }));
    },

    /**
     * Event fires after the loading of the data in the grid.
     *
     * @event dataBound
     * @param {object} e - event data
     * @param {array} e.detail.records - the list of records
     * @param {number} e.detail.totalRecords - the number of the all records that can be presented in the grid
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('dataBound', function (e) {
     *         alert('dataBound is fired. ' + e.detail.records.length + ' records are bound to the grid.');
     *     });
     * </script>
     */
    dataBound: function (el, records, totalRecords) {
        return el.dispatchEvent(new CustomEvent('dataBound', { detail: { records: records, totalRecords: totalRecords } }));
    },

    /**
     * Event fires after insert of a row in the grid during the loading of the data.
     * @event rowDataBound
     * @param {object} e - event data
     * @param {object} e.detail.row - the row element
     * @param {string} e.detail.id - the id of the record
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('rowDataBound', function (e) {
     *         alert('rowDataBound is fired for row with id=' + e.detail.id + '.');
     *     });
     * </script>
     */
    rowDataBound: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowDataBound', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires after insert of a cell in the grid during the loading of the data
     *
     * @event cellDataBound
     * @param {object} e - event data
     * @param {object} e.detail.displayEl - inner div element for display of the cell value presented as jquery object
     * @param {string} e.detail.id - the id of the record
     * @param {object} e.detail.column - the column configuration data
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' }, { field: 'Bulgarian', title: 'Is Bulgarian?' } ]
     *     });
     *     grid.on('cellDataBound', function (e) {
     *         if ('Bulgarian' === e.detail.column.field) {
     *             e.detail.displayEl.innerHTML = e.detail.record.PlaceOfBirth.indexOf('Bulgaria') > -1 ? 'Yes' : 'No';
     *         }
     *     });
     * </script>
     */
    cellDataBound: function (el, displayEl, id, column, record) {
        return el.dispatchEvent(new CustomEvent('cellDataBound', { detail: { 
                displayEl: displayEl, id: id, column: column, record: record
            } 
        }));
    },

    /**
     * Event fires on selection of row
     *
     * @event rowSelect
     * @param {object} e - event data
     * @param {object} e.detail.row - the row element
     * @param {string} e.detail.id - the id of the record
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- checkbox, grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     grid.on('rowSelect', function (e) {
     *         alert('Row with id=' + e.detail.id + ' is selected.');
     *     });
     * </script>
     */
    rowSelect: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowSelect', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires on un selection of row
     *
     * @event rowUnselect
     * @param {object} e - event data
     * @param {object} e.detail.row - the row element
     * @param {string} e.detail.id - the id of the record
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- checkbox, grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     grid.on('rowUnselect', function (e) {
     *         alert('Row with id=' + e.detail.id + ' is unselected.');
     *     });
     * </script>
     */
    rowUnselect: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowUnselect', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires before deletion of row in the grid.
     * @event rowRemoving
     * @param {object} e - event data
     * @param {object} e.detail.row - the row element
     * @param {string} e.detail.id - the id of the record
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- grid -->
     * <button onclick="grid.removeRow('1')" class="gj-button-md">Remove Row</button><br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('rowRemoving', function (e) {
     *         alert('rowRemoving is fired for row with id=' + e.detail.id + '.');
     *     });
     * </script>
     */
    rowRemoving: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowRemoving', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires when the grid.destroy method is called.
     *
     * @event destroying
     * @param {object} e - event data
     * @example sample <!-- grid -->
     * <button id="btnDestroy" class="gj-button-md">Destroy</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('destroying', function (e) {
     *         alert('destroying is fired.');
     *     });
     *     $('#btnDestroy').on('click', function() {
     *         grid.destroy();
     *     });
     * </script>
     */
    destroying: function (el) {
        return el.dispatchEvent(new Event('destroying'));
    },

    /**
     * Event fires when column is hidding
     *
     * @event columnHide
     * @param {object} e - event data
     * @param {object} e.detail.column - The data about the column that is hidding
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('columnHide', function (e) {
     *         alert('The ' + e.detail.column.field + ' column is hidden.');
     *     });
     *     grid.hideColumn('PlaceOfBirth');
     * </script>
     */
    columnHide: function (el, column) {
        return el.dispatchEvent(new CustomEvent('columnHide', { detail: { column: column } }));
    },

    /**
     * Event fires when column is showing
     *
     * @event columnShow
     * @param {object} e - event data
     * @param {object} e.detail.column - The data about the column that is showing
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', hidden: true } ]
     *     });
     *     grid.on('columnShow', function (e) {
     *         alert('The ' + e.detail.column.field + ' column is shown.');
     *     });
     *     grid.showColumn('PlaceOfBirth');
     * </script>
     */
    columnShow: function (el, column) {
        return el.dispatchEvent(new CustomEvent('columnShow', { detail: { column: column } }));
    },

    /**
     * Event fires when grid is initialized.
     *
     * @event initialized
     * @param {object} e - event data
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', hidden: true } ],
     *         initialized: function (e) {
     *             alert('The grid is initialized.');
     *         }
     *     });
     * </script>
     */
    initialized: function (el) {
        return el.dispatchEvent(new Event('initialized'));
    },

    /**
     * Event fires when the grid data is filtered.
     *
     * @additionalinfo This event is firing only when you use local dataSource, because the filtering with remote dataSource needs to be done on the server side.
     * @event dataFiltered
     * @param {object} e - event data
     * @param {object} records - The records after the filtering.
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid, data = [
     *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', CountryName: 'Bulgaria' },
     *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', CountryName: 'Brazil' },
     *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', CountryName: 'England' },
     *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', CountryName: 'Germany' },
     *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', CountryName: 'Colombia' },
     *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', CountryName: 'Bulgaria' }
     *     ];
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         dataFiltered: function (e) {
     *             e.detail.records.reverse(); // reverse the data
     *             e.detail.records.splice(3, 2); // remove 2 elements after the 3rd record
     *         }
     *     });
     * </script>
     */
    dataFiltered: function (el, records) {
        return el.dispatchEvent(new CustomEvent('dataFiltered', { detail: { records: records } }));
    }
};
