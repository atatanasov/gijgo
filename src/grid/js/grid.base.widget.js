/** 
  * @widget Grid 
  * @plugin Base
  */
gj.grid.public = {
    xhr: null,

    /**
     * Reload the data in the grid from a data source.
     * @method
     * @param {object} params - An object that contains a list with parameters that are going to be send to the server.
     * @fires beforeEmptyRowInsert, dataBinding, dataBound, cellDataBound
     * @return void
     * @example <input type="text" id="txtSearch">
     * <button id="btnSearch">Search</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnSearch").on("click", function () {
     *         grid.reload({ searchString: $("#txtSearch").val() });
     *     });
     * </script>
     */
    reload: function (params) {
        var data, ajaxOptions, records;
        data = this.data('grid');
        $.extend(data.params, params);
        gj.grid.private.StartLoading(this);
        if ($.isArray(data.dataSource)) {
            records = gj.grid.private.GetRecords(data, data.dataSource);
            gj.grid.private.loadData(this, records, records.length);
        } else if (typeof (data.dataSource) === "string") {
            ajaxOptions = { url: data.dataSource, data: data.params, success: gj.grid.private.LoaderSuccessHandler(this) };
            if (this.xhr) {
                this.xhr.abort();
            }
            this.xhr = $.ajax(ajaxOptions);
        } else if (typeof (data.dataSource) === "object") {
            if (!data.dataSource.data) {
                data.dataSource.data = {};
            }
            $.extend(data.dataSource.data, data.params);
            ajaxOptions = $.extend(true, {}, data.dataSource); //clone dataSource object
            if (ajaxOptions.dataType === "json" && typeof (ajaxOptions.data) === "object") {
                ajaxOptions.data = JSON.stringify(ajaxOptions.data);
            }
            if (!ajaxOptions.success) {
                ajaxOptions.success = gj.grid.private.LoaderSuccessHandler(this);
            }
            if (this.xhr) {
                this.xhr.abort();
            }
            this.xhr = $.ajax(ajaxOptions);
        }
        return this;
    },

    /**
     * Clear the content in the grid.
     * @method
     * @return void
     * @example <button id="btnClear">Clear</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnClear").on("click", function () {
     *         grid.clear();
     *     });
     * </script>
     */
    clear: function () {
        var data = this.data('grid');
        this.xhr && this.xhr.abort();
        if ("checkbox" === data.selectionMethod) {
            this.find("input#checkAllBoxes").hide();
        }
        this.children("tbody").empty();
        gj.grid.private.StopLoading(this);
        gj.grid.private.AppendEmptyRow(this, "&nbsp;");
        gj.grid.events.dataBound(this, [], 0);
        return this;
    },

    /**
     * Return the number of records presented on the screen.
     * @method
     * @return int
     * @example <button id="btnShowCount">Show Count</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnShowCount").on("click", function () {
     *         alert(grid.count());
     *     });
     * </script>
     */
    count: function () {
        return $(this).find('tbody tr[data-role="row"]').length;
    },

    /**
     * Render data in the grid
     * @method
     * @param {object} response - An object that contains the data that needs to be loaded in the grid.
     * @fires beforeEmptyRowInsert, dataBinding, dataBound, cellDataBound
     * @return void
     * @example <table id="grid"></table>
     * <script>
     *     var grid, onSuccessFunc; 
     *     onSuccessFunc = function (response) { 
     *         //you can modify the response here if needed
     *         grid.render(response);
     *     };
     *     grid = $("#grid").grid({
     *         dataSource: { url: "/Grid/GetPlayers", success: onSuccessFunc },
     *         columns: [ { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     * </script>
     */
    render: function (response) {
        var data, records, totalRecords;
        if (response) {
            data = this.data('grid');
            if (data) {
                records = gj.grid.private.GetRecords(data, response);
                totalRecords = response[data.mapping.totalRecordsField];
                if (!totalRecords || isNaN(totalRecords)) {
                    totalRecords = 0;
                }
                gj.grid.private.loadData(this, records, totalRecords);
            }
        }
    },

    /**
     * Destroy the grid. This method remove all data from the grid and all events attached to the grid.
     * @additionalinfo The grid table tag and wrapper tag are kept by default after the execution of destroy method,
     * but you can remove them if you pass false to the keepTableTag and keepWrapperTag parameters.
     * @method
     * @param {bool} keepTableTag - If this flag is set to false, then the table tag will be removed from the HTML dom tree.
     * @param {bool} keepWrapperTag - If this flag is set to false, then the table wrapper tag will be removed from the HTML dom tree.
     * @fires destroying
     * @return void
     * @example <button id="btnDestroy">Destroy</button>
     * <button id="btnCreate">Create</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid, createFunc;
     *     createFunc = function() {
     *         grid = $("#grid").grid({
     *             dataSource: "/version_0_4/Demos/GetPlayers",
     *             columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *         });
     *     };
     *     createFunc();
     *     $("#btnDestroy").on("click", function () {
     *         grid.destroy(true, true);
     *     });
     *     $("#btnCreate").on("click", function () {
     *         createFunc();
     *     });
     * </script>
     * @example <button id="btnRemove">Remove</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnRemove").on("click", function () {
     *         grid.destroy();
     *     });
     * </script>
     */
    destroy: function (keepTableTag, keepWrapperTag) {
        var data = this.data('grid');
        if (data) {
            gj.grid.events.destroying(this);
            gj.grid.private.StopLoading(this);
            this.xhr && this.xhr.abort();
            this.off();
            if (keepWrapperTag === false && this.parent('div[data-role="wrapper"]').length > 0) {
                this.unwrap();
            }
            this.removeData();
            if (keepTableTag === false) {
                this.remove();
            } else {
                this.removeClass().empty();
            }
        }
    },

    /**
     * Select a row from the grid based on id parameter.
     * @method
     * @param {string} id - The id of the row that needs to be selected
     * @return void
     * @example <input type="text" id="txtNumber" value="1" />
     * <button id="btnSelect">Select</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         selectionMethod: "checkbox"
     *     });
     *     $("#btnSelect").on("click", function () {
     *         grid.setSelected(parseInt($("#txtNumber").val(), 10));
     *     });
     * </script>
     */
    setSelected: function (id) {
        var $row = gj.grid.private.getRowById(this, id);
        if ($row) {
            gj.grid.private.setSelected(this, $row, id);
        }
    },

    /**
     * Return the id of the selected record.
     * If the multiple selection method is one this method is going to return only the id of the first selected record.
     * @method
     * @return string
     * @example <button id="btnShowSelection">Show Selection</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         selectionMethod: "checkbox"
     *     });
     *     $("#btnShowSelection").on("click", function () {
     *         alert(grid.getSelected());
     *     });
     * </script>
     */
    getSelected: function () {
        return gj.grid.private._GetSelected(this);
    },

    /**
     * Return an array with the ids of the selected record.
     * @method
     * @return array
     * @example <button id="btnShowSelection">Show Selections</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         selectionMethod: "checkbox",
     *         selectionType: "multiple"
     *     });
     *     $("#btnShowSelection").on("click", function () {
     *         var selections = grid.getSelections();
     *         $.each(selections, function() {
     *             alert(this);
     *         });
     *     });
     * </script>
     */
    getSelections: function () {
        return gj.grid.private._GetSelections(this);
    },

    /**
     * Select all records from the grid.
     * @method
     * @return void
     * @example <button id="btnSelectAll">Select All</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         selectionMethod: "checkbox",
     *         selectionType: "multiple"
     *     });
     *     $("#btnSelectAll").on("click", function () {
     *         grid.selectAll();
     *     });
     * </script>
     */
    selectAll: function () {
        var $grid = this,
            data = this.data('grid');
        $grid.find("thead input#checkAllBoxes").prop("checked", true);
        $grid.find("tbody tr").each(function () {
            gj.grid.private.SelectRow($grid, data, $(this));
        });
    },

    /**
     * Unselect all records from the grid.
     * @method
     * @return void
     * @example <button id="btnSelectAll">Select All</button>
     * <button id="btnUnSelectAll">UnSelect All</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         selectionMethod: "checkbox",
     *         selectionType: "multiple"
     *     });
     *     $("#btnSelectAll").on("click", function () {
     *         grid.selectAll();
     *     });
     *     $("#btnUnSelectAll").on("click", function () {
     *         grid.unSelectAll();
     *     });
     * </script>
     */
    unSelectAll: function () {
        var $grid = $(this),
            data = this.data('grid');
        this.find("thead input#checkAllBoxes").prop("checked", false);
        this.find("tbody tr").each(function () {
            gj.grid.private.UnselectRow($grid, data, $(this));
        });
    },

    /**
     * Return record by id of the record.
     * @method
     * @param {string} id - The id of the row that needs to be returned.
     * @return object
     * @example <button id="btnGetData">Get Data</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         dataKey: "ID" //define the name of the column that you want to use as ID here.
     *     });
     *     $("#btnGetData").on("click", function () {
     *         var data = grid.getById("2");
     *         alert(data.Name + " born in " + data.PlaceOfBirth);
     *     });
     * </script>
     */
    getById: function (id) {
        return gj.grid.private.getRecordById(this, id);
    },

    /**
     * Return record from the grid based on position.
     * @method
     * @param {int} position - The position of the row that needs to be return.
     * @return object
     * @example <button id="btnGetData">Get Data</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnGetData").on("click", function () {
     *         var data = grid.get(3);
     *         alert(data.Name + " born in " + data.PlaceOfBirth);
     *     });
     * </script>
     */
    get: function (position) {
        return gj.grid.private.getByPosition(this, position);
    },

    /**
     * Return an array with all records presented in the grid.
     * @method
     * @return array
     * @example <button id="btnGetAllName">Get All Names</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnGetAllName").on("click", function () {
     *         var records = grid.getAll(), names = "";
     *         $.each(records, function () { 
     *             names += this.record.Name + "(id=" + this.id + "),";
     *         });
     *         alert(names);
     *     });
     * </script>
     */
    getAll: function () {
        return gj.grid.private.GetAll(this);
    },

    /**
     * Show hidden column.
     * @method
     * @param {string} field - The name of the field bound to the column.
     * @return grid
     * @example <button id="btnShowColumn">Show Column</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth", hidden: true } ]
     *     });
     *     $("#btnShowColumn").on("click", function () {
     *         grid.showColumn("PlaceOfBirth");
     *     });
     * </script>
     */
    showColumn: function (field) {
        var data = this.data('grid'),
            position = gj.grid.private.GetColumnPosition(data.columns, field),
            $cells;

        if (position > -1) {
            this.find("thead>tr>th:eq(" + position + ")").show();
            $.each(this.find("tbody>tr"), function () {
                $(this).find("td:eq(" + position + ")").show();
            });
            data.columns[position].hidden = false;

            $cells = this.find('tbody > tr[data-role="empty"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.private.countVisibleColumns(this));
            }

            gj.grid.events.columnShow(this, data.columns[position]);
        }

        return this;
    },

    /**
     * Hide column from the grid.
     * @method
     * @param {string} field - The name of the field bound to the column.
     * @return grid
     * @example <button id="btnHideColumn">Hide Column</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnHideColumn").on("click", function () {
     *         grid.hideColumn("PlaceOfBirth");
     *     });
     * </script>
     */
    hideColumn: function (field) {
        var data = this.data('grid'),
            position = gj.grid.private.GetColumnPosition(data.columns, field),
            $cells;

        if (position > -1) {
            this.find("thead>tr>th:eq(" + position + ")").hide();
            $.each(this.find("tbody>tr"), function () {
                $(this).find("td:eq(" + position + ")").hide();
            });
            data.columns[position].hidden = true;

            $cells = this.find('tbody > tr[data-role="empty"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.private.countVisibleColumns(this));
            }

            gj.grid.events.columnHide(this, data.columns[position]);
        }

        return this;
    },

    /**
     * Add new row to the grid.
     * @method
     * @param {object} record - Object with data for the new record.
     * @return grid
     * @example <button id="btnAdd">Add Row</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnAdd").on("click", function () {
     *         grid.addRow({ "ID": grid.count() + 1, "Name": "Test Player", "PlaceOfBirth": "Test City, Test Country" });
     *     });
     * </script>
     */
    addRow: function (record) {
        var position, $rows = this.find('tbody > tr');
        //clear empty row if exists
        if ($rows.length === 1 && $rows.data('role') === 'empty') {
            $rows.remove();
        }
        position = this.count();
        gj.grid.private.RowRenderer(this, null, record, position);
        return this;
    },

    /**
     * Update row data.
     * @method
     * @param {string} id - The id of the row that needs to be updated
     * @param {object} record - Object with data for the new record.
     * @return grid
     * @example <table id="grid"></table>
     * <script>
     *     var grid, data;
     *     function Edit(e) {
     *         grid.updateRow(e.data.id, { "ID": e.data.id, "Name": "Ronaldo", "PlaceOfBirth": "Rio, Brazil" });
     *     }
     *     grid = $("#grid").grid({
     *         dataSource: [
     *             { "ID": 1, "Name": "Hristo Stoichkov", "PlaceOfBirth": "Plovdiv, Bulgaria" },
     *             { "ID": 2, "Name": "Ronaldo Luis Nazario de Lima", "PlaceOfBirth": "Rio de Janeiro, Brazil" },
     *             { "ID": 3, "Name": "David Platt", "PlaceOfBirth": "Chadderton, Lancashire, England" }
     *         ],
     *         columns: [ 
     *             { field: "ID" },
     *             { field: "Name" },
     *             { field: "PlaceOfBirth" },
     *             { title: "", width: 20, type: "icon", icon: "ui-icon-pencil", events: { "click": Edit } }
     *         ]
     *     });
     * </script>
     */
    updateRow: function (id, record) {
        var $row = gj.grid.private.getRowById(this, id);
        gj.grid.private.RowRenderer(this, $row, record, $row.index());
        return this;
    },

    //TODO: needs to be removed
    setCellContent: function (id, index, value) {
        gj.grid.private.SetCellContent(this, id, index, value);
    },

    /**
     * Remove row from the grid
     * @method
     * @param {string} id - Id of the record that needs to be removed.
     * @return grid
     * @example <table id="grid"></table>
     * <script>
     *     var grid;
     *     function Delete(e) {
     *         if (confirm('Are you sure?')) {
     *             grid.removeRow(e.data.id);
     *         }
     *     }
     *     grid = $('#grid').grid({
     *         dataKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [ 
     *             { field: 'ID' },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { title: '', width: 20, type: 'icon', icon: 'ui-icon-close', events: { 'click': Delete } }
     *         ]
     *     });
     * </script>
     */
    removeRow: function (id) {
        var $row = gj.grid.private.getRowById(this, id);
        if ($row) {
            gj.grid.events.rowRemoving(this, $row, id, $row.data('row'));
            $row.remove();
            if (this.count() == 0) {
                gj.grid.private.AppendEmptyRow(this);
            }
        }
        return this;
    }
};

(function ($) {
    $.fn.grid = function (method) {
        if (typeof method === 'object' || !method) {
            function Grid() {
                var self = this;
                $.extend(self, gj.grid.public);
            };
            var grid = new Grid();
            $.extend(this, grid);
            return gj.grid.private.init.apply(this, arguments);
        } else if (gj.grid.public[method]) {
            return gj.grid.public[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            throw 'Method ' + method + ' does not exist.';
        }
    };
})(jQuery);
