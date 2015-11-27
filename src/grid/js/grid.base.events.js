/** 
  * @widget Grid 
  * @plugin Base
  */
gj.grid.events = {
    beforeEmptyRowInsert: function ($grid, $row) {
        /**
         * Event fires before addition of an empty row to the grid.
         * @event beforeEmptyRowInsert
         * @param {object} e - event data
         * @param {object} $row - The empty row as jquery object
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: { 
         *             url: "/Grid/GetPlayers",
         *             data: { searchString: "not existing data" } //search for not existing data in order to fire the event
         *         },
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("beforeEmptyRowInsert", function (e, $row) {
         *         alert("beforeEmptyRowInsert is fired.");
         *     });
         * </script>
         */
        $grid.trigger("beforeEmptyRowInsert", [$row]);
    },
    dataBinding: function ($grid, records) {
        /**
         * Event fired before data binding takes place.
         *
         * @event dataBinding
         * @param {object} e - event data
         * @param {array} records - the list of records received from the server
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("dataBinding", function (e, records) {
         *         alert("dataBinding is fired. " + records.length + " records will be loaded in the grid.");
         *     });
         * </script>
         */
        $grid.trigger("dataBinding", [records]);
    },
    dataBound: function ($grid, records, totalRecords) {
        /**
         * Event fires after the loading of the data in the grid.
         *
         * @event dataBound
         * @param {object} e - event data
         * @param {array} records - the list of records received from the server
         * @param {int} totalRecords - the number of the all records that can be presented in the grid
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("dataBound", function (e, records, totalRecords) {
         *         alert("dataBound is fired. " + records.length + " records are bound to the grid.");
         *     });
         * </script>
         */
        $grid.trigger("dataBound", [records, totalRecords]);
    },
    rowDataBound: function ($grid, $row, id, record) {
        /**
         * Event fires after insert of a row in the grid during the loading of the data.
         * @event rowDataBound
         * @param {object} e - event data
         * @param {object} $row - the row presented as jquery object
         * @param {object} id - the id of the record
         * @param {object} record - the data of the row record
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("rowDataBound", function (e, $row, id, record) {
         *         alert("rowDataBound is fired for row with id=" + id + ".");
         *     });
         * </script>
         */
        $grid.trigger("rowDataBound", [$row, id, record]);
    },
    cellDataBound: function ($grid, $wrapper, id, column, record) {
        /**
         * Event fires after insert of a cell in the grid during the loading of the data
         *
         * @event cellDataBound
         * @param {object} e - event data
         * @param {object} $wrapper - the cell wrapper presented as jquery object 
         * @param {string} id - the id of the record
         * @param {object} column - the column configuration data
         * @param {object} record - the data of the row record
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" }, { field: "IsBulgarian", title: "Is Bulgarian" } ]
         *     });
         *     grid.on("cellDataBound", function (e, $wrapper, id, column, record) {
         *         if ("IsBulgarian" === column.field) {
         *             $wrapper.text(record.PlaceOfBirth.indexOf("Bulgaria") > -1 ? "Bulgarian" : "");
         *         }
         *     });
         * </script>
         */
        $grid.trigger("cellDataBound", [$wrapper, id, column, record]);
    },
    rowSelect: function ($grid, $row, id, record) {
        /**
         * Event fires on selection of row
         *
         * @event rowSelect
         * @param {object} e - event data
         * @param {object} $row - the row presented as jquery object 
         * @param {string} id - the id of the record
         * @param {object} record - the data of the row record
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
         *         selectionMethod: "checkbox"
         *     });
         *     grid.on("rowSelect", function (e, $row, id, record) {
         *         alert('Row with id=' + id + ' is selected.');
         *     });
         * </script>
         */
        $grid.trigger("rowSelect", [$row, id, record]);
    },
    rowUnselect: function ($grid, $row, id, record) {

        /**
         * Event fires on un selection of row
         *
         * @event rowUnselect
         * @param {object} e - event data
         * @param {object} $row - the row presented as jquery object 
         * @param {string} id - the id of the record
         * @param {object} record - the data of the row record
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
         *         selectionMethod: "checkbox"
         *     });
         *     grid.on("rowUnselect", function (e, $row, id, record) {
         *         alert('Row with id=' + id + ' is unselected.');
         *     });
         * </script>
         */
        $grid.trigger("rowUnselect", [$row, id, record]);

    },
    rowRemoving: function ($grid, $row, id, record) {
        /**
         * Event fires before deletion of row in the grid.
         * @event rowRemoving
         * @param {object} e - event data
         * @param {object} $row - the row presented as jquery object
         * @param {object} id - the id of the record
         * @param {object} record - the data of the row record
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataKey: 'ID',
         *         dataSource: '/Grid/GetPlayers',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         *     grid.on('rowRemoving', function (e, $row, id, record) {
         *         alert('rowRemoving is fired for row with id=' + id + '.');
         *     });
         *     grid.on('dataBound', function (e, records, totalRecords) {
         *         grid.removeRow('1');
         *     });
         * </script>
         */
        $grid.trigger("rowRemoving", [$row, id, record]);
    },
    destroying: function ($grid) {
        /**
         * Event fires when the grid.destroy method is called.
         *
         * @event destroying
         * @param {object} e - event data
         * @example <button id="btnDestroy">Destroy</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("destroying", function (e) {
         *         alert('destroying is fired.');
         *     });
         *     $('#btnDestroy').on('click', function() {
         *         grid.destroy();
         *     });
         * </script>
         */
        $grid.trigger("destroying");
    },
    columnHide: function ($grid, column) {
        /**
         * Event fires when column is hidding
         *
         * @event columnHide
         * @param {object} e - event data
         * @param {object} column - The data about the column that is hidding
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("columnHide", function (e, column) {
         *         alert('The ' + column.field + ' column is hidden.');
         *     });
         *     grid.hideColumn("PlaceOfBirth");
         * </script>
         */
        $grid.trigger("columnHide", [column]);
    },
    columnShow: function ($grid, column) {
        /**
         * Event fires when column is showing
         *
         * @event columnShow
         * @param {object} e - event data
         * @param {object} column - The data about the column that is showing
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth", hidden: true } ]
         *     });
         *     grid.on("columnShow", function (e, column) {
         *         alert('The ' + column.field + ' column is shown.');
         *     });
         *     grid.showColumn("PlaceOfBirth");
         * </script>
         */
        $grid.trigger("columnShow", [column]);
    },
    initialized: function ($grid) {
        /**
         * Event fires when grid is initialized
         *
         * @event initialized
         * @param {object} e - event data
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth", hidden: true } ],
         *         initialized: function (e) {
         *             alert('The grid is initialized.');
         *         }
         *     });
         * </script>
         */
        $grid.trigger("initialized");
    }
};
