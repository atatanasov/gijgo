/*
 * Gijgo Grid v2.0.0-alpha-1
 * http://gijgo.com/grid
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**
  * @widget Grid
  * @plugin Base
  */
gj.grid = {
    plugins: {},
    messages: {}
};

gj.grid.config = {
    base: {
        /** The data source for the grid.
         * @additionalinfo If set to string, then the grid is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the grid is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the grid is going to use the array as data for rows.
         * @type (string|object|array)
         * @default undefined
         * @example Remote.JS.Configuration <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Remote.Html.Configuration <!-- grid -->
         * <table id="grid" data-gj-source="/Players/Get">
         *     <thead>
         *         <tr>
         *             <th width="56" data-gj-field="ID">#</th>
         *             <th>Name</th>
         *             <th>PlaceOfBirth</th>
         *         </tr>
         *     </thead>
         * </table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'));
         * </script>
         * @example Local.DataSource <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: data,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Html.DataSource <!-- grid, dropdown -->
         * <table id="grid">
         *     <thead>
         *         <tr>
         *             <th width="56" data-gj-field="ID">#</th>
         *             <th data-gj-sortable="true">Name</th>
         *             <th data-gj-field="PlaceOfBirth" data-gj-sortable="true">Place Of Birth</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td>1</td>
         *             <td>Hristo Stoichkov</td>
         *             <td>Plovdiv, Bulgaria</td>
         *         </tr>
         *         <tr>
         *             <td>2</td>
         *             <td>Ronaldo Luis Nazario de Lima</td>
         *             <td>Rio de Janeiro, Brazil</td>
         *         </tr>
         *         <tr>
         *             <td>3</td>
         *             <td>David Platt</td>
         *             <td>Chadderton, Lancashire, England</td>
         *         </tr>
         *     </tbody>
         * </table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), { pager: { limit: 2, sizes: [2, 5, 10, 20] }});
         * </script>
         * @example Remote.Custom.Render <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid, onSuccessFunc = function (response) {
         *         alert('The result contains ' + response.records.length + ' records.');
         *         grid.render(response);
         *     };
         *     grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: { url: '/Players/Get', data: {}, success: onSuccessFunc },
         *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Remote.Custom.Error <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid, onErrorFunc = function (response) {
         *         alert('Server error.');
         *     };
         *     grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: { url: '/DataSources/InvalidUrl', error: onErrorFunc },
         *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        dataSource: undefined,

        /** An array that holds the configurations of each column from the grid.
         * @type array
         * @example JS.Configuration <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', name: 'Birth Place' } ]
         *     });
         * </script>
         */
        columns: [],

        /** Auto generate column for each field in the datasource when set to true.
         * @type array
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         autoGenerateColumns: true
         *     });
         * </script>
         */
        autoGenerateColumns: false,

        /** An object that holds the default configuration settings of each column from the grid.
         * @type object
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         defaultColumnSettings: { align: 'right' },
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', name: 'Birth Place' } ]
         *     });
         * </script>
         */
        defaultColumnSettings: {

            /** If set to true the column will not be displayed in the grid. By default all columns are displayed.
             * @alias column.hidden
             * @type boolean
             * @default false
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *            { field: 'ID', width: 56 },
             *            { field: 'Name' },
             *            { field: 'PlaceOfBirth', hidden: true }
             *        ]
             *     });
             * </script>
             */
            hidden: false,

            /** The width of the column. Numeric values are treated as pixels.
             * If the width is undefined the width of the column is not set and depends on the with of the table(grid).
             * @alias column.width
             * @type number|string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', width: 120 },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             */
            width: undefined,

            /** Indicates if the column is sortable.
             * If set to true the user can click the column header and sort the grid by the column source field.
             * @alias column.sortable
             * @type boolean|object
             * @default false
             * @example Remote <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Local.Custom <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'Value1': 'Foo', 'Value2': 'Foo' },
             *         { 'ID': 2, 'Value1': 'bar', 'Value2': 'bar' },
             *         { 'ID': 3, 'Value1': 'moo', 'Value2': 'moo' },
             *         { 'ID': 4, 'Value1': null, 'Value2': undefined }
             *     ];
             *     var caseSensitiveSort = function (direction, column) { 
             *         return function (recordA, recordB) {
             *             var a = recordA[column.field] || '',
             *                 b = recordB[column.field] || '';
             *             return (direction === 'asc') ? a < b : b < a;
             *         };
             *     };
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         columns: [
             *             { field: 'ID' },
             *             { field: 'Value1', sortable: true },
             *             { field: 'Value2', sortable: { sorter: caseSensitiveSort } }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.3 <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.4.Material.Icons <!-- bootstrap4, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.4.FontAwesome <!-- bootstrap4, fontawesome, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap4',
             *         iconsLibrary: 'fontawesome',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.5.FontAwesome <!-- bootstrap5, fontawesome, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap5',
             *         iconsLibrary: 'fontawesome',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Remote.Shadcn <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'shadcn',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 64 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             */
            sortable: false,

            /** Indicates the type of the column.
             * @alias column.type
             * @type text|checkbox|icon|date|time|datetime
             * @default 'text'
             * @example Bootstrap.3.Icon <!-- grid, bootstrap -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             {
             *               title: '', field: 'Info', width: 32, type: 'icon', icon: 'glyphicon-info-sign',
             *               events: {
             *                 'click': function (e) {
             *                     alert('record with id=' + e.data.id + ' is clicked.');
             *                 }
             *               }
             *             }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.4.Icon <!-- grid, bootstrap4, fontawesome -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             {
             *               title: '', field: 'Info', width: 42, type: 'icon', icon: 'fa fa-pencil',
             *               events: {
             *                 'click': function (e) {
             *                     alert('record with id=' + e.data.id + ' is clicked.');
             *                 }
             *               }
             *             }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.3.Checkbox <!-- grid, checkbox, bootstrap -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             { title: 'Active?', field: 'IsActive', width: 80, type: 'checkbox', align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.4.Checkbox <!-- grid, checkbox, bootstrap4 -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             { title: 'Active?', field: 'IsActive', width: 80, type: 'checkbox', align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.5.Checkbox <!-- grid, checkbox, bootstrap5 -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap5',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             { title: 'Active?', field: 'IsActive', width: 80, type: 'checkbox', align: 'center' }
             *         ]
             *     });
             * </script>
             */
            type: 'text',

            /** The caption that is going to be displayed in the header of the grid.
             * @alias column.title
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' }
             *         ]
             *     });
             * </script>
             */
            title: undefined,

            /** The field name to which the column is bound.
             * If the column.title is not defined this value is used as column.title.
             * @alias column.field
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' }
             *         ]
             *     });
             * </script>
             */
            field: undefined,

            /** This setting control the alignment of the text in the cell.
             * @alias column.align
             * @type left|right|center|justify|initial|inherit
             * @default undefined
             * @example Material.Design <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 100, align: 'center' },
             *             { field: 'Name', align: 'right' },
             *             { field: 'PlaceOfBirth', align: 'left' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.5 <!-- grid, bootstrap5 -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap5',
             *         columns: [
             *             { field: 'ID', width: 56, align: 'center' },
             *             { field: 'Name', align: 'right' },
             *             { field: 'PlaceOfBirth', align: 'left' }
             *         ]
             *     });
             * </script>
             */
            align: undefined,

            /** The name(s) of css class(es) that are going to be applied to all cells inside that column, except the header cell.
             * @alias column.cssClass
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <style>
             * .nowrap { white-space: nowrap }
             * .bold { font-weight: bold }
             * </style>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', width: 100, cssClass: 'nowrap bold' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             */
            cssClass: undefined,

            /** The name(s) of css class(es) that are going to be applied to the header cell of that column.
             * @alias column.headerCssClass
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <style>
             * .italic { font-style: italic }
             * </style>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', headerCssClass: 'italic' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             */
            headerCssClass: undefined,

            /** The text for the cell tooltip.
             * @alias column.tooltip
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56, tooltip: 'This is my tooltip 1.' },
             *             { field: 'Name', tooltip: 'This is my tooltip 2.' },
             *             { field: 'PlaceOfBirth', tooltip: 'This is my tooltip 3.' }
             *         ]
             *     });
             * </script>
             */
            tooltip: undefined,

            /** Css class for icon that is going to be in use for the cell.
             * This setting can be in use only with combination of type icon.
             * @alias column.icon
             * @type string
             * @default undefined
             * @example sample <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' },
             *             { 
             *                 title: '', field: 'Edit', width: 32, type: 'icon', icon: 'glyphicon-pencil',
             *                 events: 
             *                 { 'click': function (e, id, field, record) { 
             *                        alert('name=' + record.Name); 
             *                    }
             *                 }
             *             }
             *         ]
             *     });
             * </script>
             */
            icon: undefined,

            /** Configuration object with event names as keys and functions as values that are going to be bind to each cell from the column.
             * Each function is going to receive event information as a parameter with info in the 'data' field for id, field name and record data.
             * @alias column.events
             * @type object
             * @default undefined
             * @example javascript.configuration <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             {
             *               field: 'Name',
             *               events: {
             *                 'mouseenter': function (e) {
             *                     e.currentTarget.style.backgroundColor = 'red';
             *                 },
             *                 'mouseleave': function (e) {
             *                     e.currentTarget.style.backgroundColor = '';
             *                 }
             *               }
             *             },
             *             { field: 'PlaceOfBirth' },
             *             {
             *               title: '', field: 'Info', width: 34, type: 'icon', icon: 'glyphicon-info-sign',
             *               events: {
             *                 'click': function (e, id, field, record) {
             *                     alert('record with id=' + id + ' is clicked.'); }
             *                 }
             *             }
             *         ]
             *     });
             * </script>
             * @example html.configuration <!-- bootstrap, grid -->
             * <table id="grid" data-gj-source="/Players/Get" data-gj-ui-library="bootstrap">
             *     <thead>
             *         <tr>
             *             <th data-gj-field="ID" width="34">ID</th>
             *             <th data-gj-events="mouseenter: onMouseEnter, mouseleave: onMouseLeave">Name</th>
             *             <th data-gj-field="PlaceOfBirth">Place Of Birth</th>
             *             <th data-gj-events="click: onClick" data-gj-type="icon" data-gj-icon="glyphicon-info-sign" width="32"></th>
             *         </tr>
             *     </thead>
             * </table>
             * <script>
             *     function onMouseEnter (e) {
*                     e.currentTarget.style.backgroundColor = 'red';
             *     }
             *     function onMouseLeave (e) {
             *        e.currentTarget.style.backgroundColor = '';
             *     }
             *     function onClick(e, id, field, record) {
             *         alert('record with id=' + id + ' is clicked.');
             *     }
             *     new GijgoGrid(document.getElementById('grid'), );
             * </script>
             */
            events: undefined,

            /** Format the date when the type of the column is date.
             * @additionalinfo <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
             * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
             * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
             * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
             * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
             * <b>yyyy</b> - Year represented by four digits.<br/>
             * <b>s</b> - Seconds; no leading zero for single-digit seconds.<br/>
             * <b>ss</b> - Seconds; leading zero for single-digit seconds.<br/>
             * <b>M</b> - Minutes; no leading zero for single-digit minutes. Uppercase MM to avoid conflict with months.<br/>
             * <b>MM</b> - Minutes; leading zero for single-digit minutes. Uppercase MM to avoid conflict with months.<br/>
             * <b>H</b> - Hours; no leading zero for single-digit hours (24-hour clock).<br/>
             * <b>HH</b> - Hours; leading zero for single-digit hours (24-hour clock).<br/>
             * <b>h</b> - Hours; no leading zero for single-digit hours (12-hour clock).<br/>
             * <b>hh</b> - Hours; leading zero for single-digit hours (12-hour clock).<br/>
             * <b>tt</b> - Lowercase, two-character time marker string: am or pm.<br/>
             * <b>TT</b> - Uppercase, two-character time marker string: AM or PM.<br/>
             * @alias column.format
             * @type string
             * @default 'mm/dd/yyyy'
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name' },
             *             { field: 'DateOfBirth', title: 'Date 1', type: 'date', format: 'HH:MM:ss mm/dd/yyyy' },
             *             { field: 'DateOfBirth', title: 'Date 2', type: 'date' }
             *         ]
             *     });
             * </script>
             */
            format: 'mm/dd/yyyy',

            /** Number of decimal digits after the decimal point.
             * @alias column.decimalDigits
             * @type number
             * @default undefined
             */
            decimalDigits: undefined,

            /** Template for the content in the column.
             * Use curly brackets '{}' to wrap the names of data source columns from server response.
             * @alias column.tmpl
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name' },
             *             { title: 'Info', tmpl: '{Name} is born in {PlaceOfBirth}.' }
             *         ]
             *     });
             * </script>
             */
            tmpl: undefined,

            /** If set to true stop event propagation when event occur.
             * @alias column.stopPropagation
             * @type boolean
             * @default false
             * @example sample <!-- bootstrap, grid -->
             * <table id="grid" data-gj-source="/Players/Get"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', events: { 'click': function (e, id, field, record) { alert('name=' + record.Name); } }  },
             *             { field: 'PlaceOfBirth', stopPropagation: true, events: { 'click': function (e, id, field, record) { alert('name=' + record.Name); } }   },
             *             { title: '', field: 'Edit', width: 32, type: 'icon', icon: 'glyphicon-pencil', events: { 'click': function (e, id, field, record) { alert('name=' + record.Name); } } }
             *         ]
             *     });
             * </script>
             */
            stopPropagation: false,

            /** A renderer is an 'interceptor' function which can be used to transform data (value, appearance, etc.) before it is rendered.
             * @additionalinfo If the renderer function return a value, then this value is going to be automatically set as value of the cell.<br/>
             * If the renderer function doesn't return a value, then you have to set the content of the cell manually.
             * @alias column.renderer
             * @type function
             * @default undefined
             * @param {string} value - the record field value
             * @param {object} record - the data of the row record
             * @param {object} cell - the current table cell presented as html object
             * @param {object} displayEl - inner div element for display of the cell value presented as html object
             * @param {string} id - the id of the record
             * @example sample <!-- grid -->
             * <table id="grid" data-gj-source="/Players/Get"></table>
             * <script>
             *     var nameRenderer = function (value, record, cell, displayEl) { 
             *         cell.style.fontStyle = 'italic'; 
             *         displayEl.style.backgroundColor = '#EEE';
             *         displayEl.innerHTML = value;
             *     };
             *     new GijgoGrid(document.getElementById('grid'), {
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', renderer: nameRenderer },
             *             { field: 'PlaceOfBirth', renderer: function (value, record) { return record.ID % 2 ? '<b>' + value + '</b>' : '<i>' + value + '</i>'; }  }
             *         ]
             *     });
             * </script>
             */
            renderer: undefined,

            /** Function which can be used to customize filtering with local data (javascript sourced data).
             * @additionalinfo The default filtering is not case sensitive. The filtering with remote data sources needs to be handled on the server.
             * @alias column.filter
             * @type function
             * @default undefined
             * @param {string} value - the record field value
             * @param {string} searchStr - the search string
             * @example example <!-- grid -->
             * <input type="text" id="txtValue1" placeholder="Value 1" /> &nbsp;
             * <input type="text" id="txtValue2" placeholder="Value 2" /> &nbsp;
             * <button id="btnSearch">Search</button> <br/><br/>
             * <table id="grid"></table>
             * <script>
             *     var grid, data = [
             *             { 'ID': 1, 'Value1': 'Foo', 'Value2': 'Foo' },
             *             { 'ID': 2, 'Value1': 'bar', 'Value2': 'bar' },
             *             { 'ID': 3, 'Value1': 'moo', 'Value2': 'moo' },
             *             { 'ID': 4, 'Value1': null, 'Value2': undefined }
             *         ],
             *         caseSensitiveFilter = function (value, searchStr) { 
             *             return value.indexOf(searchStr) > -1;
             *         };
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Value1' },
             *             { field: 'Value2', filter: caseSensitiveFilter }
             *         ]
             *     });
             *     document.getElementById('btnSearch').addEventListener('click', function () {
             *         grid.reload({ Value1: document.getElementById('txtValue1').value, Value2: document.getElementById('txtValue2').value });
             *     });
             * </script>
             */
            filter: undefined
        },

        mapping: {
            /** The name of the object in the server response, that contains array with records, that needs to be display in the grid.
             * @alias mapping.dataField
             * @type string
             * @default "records"
             */
            dataField: 'records',

            /** The name of the object in the server response, that contains the number of all records on the server.
             * @alias mapping.totalRecordsField
             * @type string
             * @default "total"
             */
            totalRecordsField: 'total'
        },

        params: {},

        paramNames: {

            /** The name of the parameter that is going to send the name of the column for sorting.
             * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.
             * @alias paramNames.sortBy
             * @type string
             * @default "sortBy"
             */
            sortBy: 'sortBy',

            /** The name of the parameter that is going to send the direction for sorting.
             * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.
             * @alias paramNames.direction
             * @type string
             * @default "direction"
             */
            direction: 'direction'
        },

        /** The name of the UI library that is going to be in use. Currently we support Material Design, Bootstrap and shadcn/ui.
         * @additionalinfo The css files for Bootstrap or Material Design should be manually included to the page where the grid is in use.
         * @type (materialdesign|bootstrap|bootstrap4|shadcn)
         * @default 'materialdesign'
         * @example Material.Design.With.Icons <!-- dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Material.Design.Without.Icons <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'materialdesign',
         *         iconsLibrary: '',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Bootstrap.3 <!-- grid, dropdown, bootstrap -->
         * <div class="container"><table id="grid"></table></div>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap',
         *         columns: [
         *             { field: 'ID' },
         *             { field: 'Name', sortable: true },
         *             { field: 'PlaceOfBirth' }
         *         ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap4',
         *         columns: [ { field: 'ID', width: 38 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         columns: [ { field: 'ID', width: 38 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap5',
         *         columns: [ { field: 'ID', width: 64 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Shadcn <!-- dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'shadcn',
         *         columns: [ { field: 'ID', width: 64 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Font.Awesome <!-- fontawesome, grid, dropdown -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         iconsLibrary: 'fontawesome',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        /** The type of the row selection.<br/>
         * If the type is set to multiple the user will be able to select more then one row from the grid.
         * @type (single|multiple)
         * @default 'single'
         * @example Multiple.Material.Design.Checkbox <!-- checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Multiple.Bootstrap.3.Checkbox <!-- bootstrap, checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         primaryKey: 'ID',
         *         uiLibrary: 'bootstrap',
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 32 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Multiple.Bootstrap.4.Checkbox <!-- bootstrap4, checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         uiLibrary: 'bootstrap4',
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Multiple.Bootstrap.5.Checkbox <!-- bootstrap5, checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         uiLibrary: 'bootstrap5',
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Single.Checkbox <!-- checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         selectionType: 'single',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        selectionType: 'single',

        /** The type of the row selection mechanism.
         * @additionalinfo If this setting is set to "basic" when the user select a row, then this row will be highlighted.<br/>
         * If this setting is set to "checkbox" a column with checkboxes will appear as first row of the grid and when the user select a row, then this row will be highlighted and the checkbox selected.
         * @type (basic|checkbox)
         * @default "basic"
         * @example sample <!-- checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         selectionType: 'single',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        selectionMethod: 'basic',

        /** When this setting is enabled the content of the grid will be loaded automatically after the creation of the grid.
         * @type boolean
         * @default true
         * @example disabled <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         autoLoad: false,
         *         columns: [ { field: 'ID' }, { field: 'Name' } ]
         *     });
         *     grid.reload(); //call .reload() explicitly in order to load the data in the grid
         * </script>
         * @example enabled <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         autoLoad: true,
         *         columns: [ { field: 'ID' }, { field: 'Name' } ]
         *     });
         * </script>
         */
        autoLoad: true,

        /** The text that is going to be displayed if the grid is empty.
         * @type string
         * @default "No records found."
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: { url: '/Players/Get', data: { name: 'not existing name' } },
         *         notFoundText: 'No records found custom message',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example localization <!-- grid -->
         * <table id="grid"></table>
         * <script src="../../dist/modular/grid/js/messages/messages.de-de.js"></script>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: { url: '/Players/Get', data: { name: 'not existing name' } },
         *         locale: 'de-de',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        notFoundText: undefined,

        /** Width of the grid.
         * @type number
         * @default undefined
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         width: 400,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        width: undefined,

        /** Minimum width of the grid.
         * @type number
         * @default undefined
         */
        minWidth: undefined,

        /** This configuration option manage the behaviour of the header row height.
         * Auto scale if set to to 'autogrow'. All body rows are with the same height if set to 'fixed'.
         * @type ('autogrow'|'fixed')
         * @default "fixed"
         * @example AutoGrow <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         headerRowHeight: 'autogrow',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         * @example Fixed <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         headerRowHeight: 'fixed',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         */
        headerRowHeight: 'fixed',

        /** This configuration option manage the behaviour of the body row height.
         * Auto scale if set to to 'autogrow'. All body rows are with the same height if set to 'fixed'.
         * @type ('autogrow'|'fixed')
         * @default "autogrow"
         * @example AutoGrow <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         bodyRowHeight: 'autogrow',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         * @example Fixed <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         bodyRowHeight: 'fixed',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         */
        bodyRowHeight: 'autogrow',

        /** The size of the font in the grid.
         * @type string
         * @default undefined
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         fontSize: '16px',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        fontSize: undefined,

        /** Name of column that contains the record id. 
         * @additionalinfo If you set primary key, we assume that this number is unique for each records presented in the grid.<br/>
         * For example this should contains the column with primary key from your relation db table.<br/>
         * If the primaryKey is undefined, we autogenerate id for each record in the table by starting from 1.
         * @type string
         * @default undefined
         * @example defined <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: data,
         *         primaryKey: 'ID',
         *         columns: [ 
         *             { field: 'ID', width: 70 },
         *             { field: 'Name' },
         *             { field: 'PlaceOfBirth' } ,
         *             { 
         *                 tmpl: '<a href="#">click me</a>', 
         *                 events: { 
         *                    click: function(e) { 
         *                      alert('Your id is ' + e.data.id);
         *                    }
         *                 }, 
         *                 width: 100,
         *                 stopPropagation: true
         *             } 
         *         ]
         *     });
         * </script>
         * @example undefined <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: data,
         *         columns: [ 
         *             { field: 'ID', width: 70 },
         *             { field: 'Name' },
         *             { field: 'PlaceOfBirth' } ,
         *             { tmpl: '<a href="#">click me</a>', events: { click: function(e) { alert('Your id is ' + e.data.id); } }, width: 100, stopPropagation: true } 
         *         ]
         *     });
         * </script>
         */
        primaryKey: undefined,

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German.Bootstrap.Default <!-- bootstrap, grid, dropdown -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap',
         *         locale: 'de-de',
         *         columns: [ 
         *             { field: 'ID', width: 34 },
         *             { field: 'Name', title: 'Name' },
         *             { field: 'PlaceOfBirth', title: 'Geburtsort' }
         *         ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         * @example French.MaterialDesign.Custom <!-- grid, dropdown -->
         * <table id="grid"></table>
         * <script>
         *     gj.grid.messages['fr-fr'].DisplayingRecords = 'Mes résultats';
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'materialdesign',
         *         locale: 'fr-fr',
         *         columns: [ 
         *             { field: 'ID', width: 56 },
         *             { field: 'Name', title: 'Prénom' },
         *             { field: 'PlaceOfBirth', title: 'Lieu de naissance' }
         *         ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        locale: 'en-us',

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

    shadcn: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-shadcn',
            content: {
                rowSelected: 'gj-grid-shadcn-select'
            }
        }
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

/**
  * @widget Grid
  * @plugin Base
  */
GijgoGrid = function (element, jsConfig) {
    var self = this,
        methods = gj.grid.methods;

    self.type = 'grid';
    self.element = element;

    /**
     * Reload the data in the grid from a data source.
     * @method
     * @param {object} params - An object that contains a list with parameters that are going to be send to the server.
     * @fires beforeEmptyRowInsert, dataBinding, dataBound, cellDataBound
     * @return grid
     * @example sample <!-- grid -->
     * <input type="text" id="txtSearch">
     * <button id="btnSearch">Search</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     document.getElementById('btnSearch').addEventListener('click', function () {
     *         grid.reload({ name: document.getElementById('txtSearch').value });
     *     });
     * </script>
     */
    self.reload = function (params) {
        methods.startLoading(this);
        return gj.widget.prototype.reload.call(this, params);
    };

    /**
     * Clear the content in the grid.
     * @method
     * @param {boolean} showNotFoundText - Indicates if the "Not Found" text is going to show after the clearing of the grid.
     * @return grid
     * @example sample <!-- grid, dropdown -->
     * <button id="btnClear" class="gj-button-md">Clear</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         pager: { limit: 5 }
     *     });
     *     document.getElementById('btnClear').addEventListener('click', function () {
     *         grid.clear();
     *     });
     * </script>
     */
    self.clear = function (showNotFoundText) {
        return methods.clear(this, showNotFoundText);
    };

    /**
     * Return the number of records in the grid. By default return only the records that are visible in the grid.
     * @method
     * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
     * @return number
     * @example Local.DataSource <!-- grid, dropdown, bootstrap5 -->
     * <button class="btn btn-primary" onclick="alert(grid.count())">Count Visible Records</button>
     * <button class="btn btn-primary" onclick="alert(grid.count(true))">Count All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var data, grid;
     *     data = [
     *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *     ];
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap5',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     * @example Remote.DataSource <!-- grid, dropdown, bootstrap5 -->
     * <button class="btn btn-primary" onclick="alert(grid.count())">Count Visible Records</button>
     * <button class="btn btn-primary" onclick="alert(grid.count(true))">Count All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap5',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     */
    self.count = function (includeAllRecords) {
        return methods.count(this, includeAllRecords);
    };

    /**
     * Render data in the grid
     * @method
     * @param {object} response - An object that contains the data that needs to be loaded in the grid.
     * @fires beforeEmptyRowInsert, dataBinding, dataBound, cellDataBound
     * @return grid
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid, onSuccessFunc;
     *     onSuccessFunc = function (e) {
     *         //you can modify the response here if needed
     *         grid.render(JSON.parse(this.response));
     *     };
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: { url: '/Players/Get', success: onSuccessFunc },
     *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     * </script>
     */
    self.render = function (response) {
        return methods.render(this, response);
    };

    /**
     * Destroy the grid. This method remove all data from the grid and all events attached to the grid.
     * @additionalinfo The grid table tag and wrapper tag are kept by default after the execution of destroy method,
     * but you can remove them if you pass false to the keepTableTag and keepWrapperTag parameters.
     * @method
     * @param {boolean} keepTableTag - If this flag is set to false, the table tag will be removed from the HTML dom tree.
     * @param {boolean} keepWrapperTag - If this flag is set to false, the table wrapper tag will be removed from the HTML dom tree.
     * @fires destroying
     * @return void
     * @example keep.wrapper.and.table <!-- grid -->
     * <button class="gj-button-md" id="btnDestroy">Destroy</button>
     * <button class="gj-button-md" id="btnCreate">Create</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     let grid, createFunc = function() {
     *         grid = new GijgoGrid(document.getElementById('grid'), {
     *             dataSource: '/Players/Get',
     *             columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *         });
     *     };
     *     createFunc();
     *     document.getElementById('btnDestroy').addEventListener('click', function () {
     *         grid.destroy(true, true);
     *     });
     *     document.getElementById('btnCreate').addEventListener('click', function () {
     *         createFunc();
     *     });
     * </script>
     * @example remove.wrapper.and.table <!-- grid -->
     * <button class="gj-button-md" id="btnRemove">Remove</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     document.getElementById('btnRemove').addEventListener('click', function () {
     *         grid.destroy();
     *     });
     * </script>
     */
    self.destroy = function (keepTableTag, keepWrapperTag) {
        return methods.destroy(this, keepTableTag, keepWrapperTag);
    };

    /**
     * Select a row from the grid based on id parameter.
     * @method
     * @param {string} id - The id of the row that needs to be selected
     * @return grid
     * @example sample <!-- checkbox, grid -->
     * <input type="text" id="txtNumber" value="1" />
     * <button id="btnSelect" class="gj-button-md">Select</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     document.getElementById('btnSelect').addEventListener('click', function () {
     *         grid.setSelected(parseInt(document.getElementById('txtNumber').value, 10));
     *     });
     * </script>
     */
    self.setSelected = function (id) {
        return methods.setSelected(this, id);
    };

    /**
     * Return the id of the selected record.
     * If the multiple selection method is one this method is going to return only the id of the first selected record.
     * @method
     * @return string
     * @example sample <!-- checkbox, grid -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selection</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     document.getElementById('btnShowSelection').addEventListener('click', function () {
     *         alert(grid.getSelected());
     *     });
     * </script>
     */
    self.getSelected = function () {
        return methods.getSelected(this);
    };

    /**
     * Return an array with the ids of the selected record.
     * @additionalinfo Specify primaryKey if you want to use field from the dataSource as identificator for selection.
     * @method
     * @return array
     * @example With.Primary.Ket <!-- checkbox, grid, dropdown -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selections</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid, data = [
     *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
     *         { 'ID': 104, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' }
     *     ];
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: data,
     *         primaryKey: 'ID',
     *         columns: [ { field: 'ID', width: 70 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     document.getElementById('btnShowSelection').addEventListener('click', function () {
     *         var selections = grid.getSelections();
     *         alert(selections.join());
     *     });
     * </script>
     * @example Without.Primary.Ket <!-- checkbox, grid, dropdown -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selections</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid, data = [
     *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
     *         { 'ID': 104, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' }
     *     ];
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 70 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     document.getElementById('btnShowSelection').addEventListener('click', function () {
     *         var selections = grid.getSelections();
     *         alert(selections.join());
     *     });
     * </script>
     */
    self.getSelections = function () {
        return methods.getSelections(this);
    };

    /**
     * Select all records from the grid.
     * @method
     * @return grid
     * @example sample <!-- checkbox, grid -->
     * <button id="btnSelectAll" class="gj-button-md">Select All</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple'
     *     });
     *     document.getElementById('btnSelectAll').addEventListener('click', function () {
     *         grid.selectAll();
     *     });
     * </script>
     */
    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all records from the grid.
     * @method
     * @return void
     * @example sample <!-- checkbox, grid -->
     * <button id="btnSelectAll" class="gj-button-md">Select All</button>
     * <button id="btnUnSelectAll" class="gj-button-md">UnSelect All</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple'
     *     });
     *     document.getElementById('btnSelectAll').addEventListener('click', function () {
     *         grid.selectAll();
     *     });
     *     document.getElementById('btnUnSelectAll').addEventListener('click', function () {
     *         grid.unSelectAll();
     *     });
     * </script>
     */
    self.unSelectAll = function () {
        return methods.unSelectAll(this);
    };

    /**
     * Return record by id of the record.
     * @method
     * @param {string} id - The id of the row that needs to be returned.
     * @return object
     * @example sample <!-- grid -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         primaryKey: 'ID' //define the name of the column that you want to use as ID here.
     *     });
     *     document.getElementById('btnGetData').addEventListener('click', function () {
     *         var data = grid.getById('2');
     *         alert(data.Name + ' born in ' + data.PlaceOfBirth);
     *     });
     * </script>
     */
    self.getById = function (id) {
        return methods.getById(this, id);
    };

    /**
     * Return record from the grid based on position.
     * @method
     * @param {number} position - The position of the row that needs to be return.
     * @return object
     * @example sample <!-- grid -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     document.getElementById('btnGetData').addEventListener('click', function () {
     *         var data = grid.get(3);
     *         alert(data.Name + ' born in ' + data.PlaceOfBirth);
     *     });
     * </script>
     */
    self.get = function (position) {
        return methods.getByPosition(this, position);
    };

    /**
     * Return an array with all records presented in the grid.
     * @method
     * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
     * @return number
     * @example Local.DataSource <!-- grid, bootstrap5 -->
     * <button onclick="alert(JSON.stringify(grid.getAll()))" class="btn btn-default">Get All Visible Records</button>
     * <button onclick="alert(JSON.stringify(grid.getAll(true)))" class="btn btn-default">Get All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var data, grid;
     *     data = [
     *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *     ];
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap5',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     * @example Remote.DataSource <!-- grid, bootstrap5 -->
     * <button onclick="alert(JSON.stringify(grid.getAll()))" class="btn btn-default">Get All Visible Records</button>
     * <button onclick="alert(JSON.stringify(grid.getAll(true)))" class="btn btn-default">Get All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap5',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     */
    self.getAll = function (includeAllRecords) {
        return methods.getAll(this, includeAllRecords);
    };

    /**
     * Show hidden column.
     * @method
     * @param {string} field - The name of the field bound to the column.
     * @return grid
     * @example sample <!-- grid -->
     * <button id="btnShowColumn" class="gj-button-md">Show Column</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', hidden: true } ]
     *     });
     *     document.getElementById('btnShowColumn').addEventListener('click', function () {
     *         grid.showColumn('PlaceOfBirth');
     *     });
     * </script>
     */
    self.showColumn = function (field) {
        return methods.showColumn(this, field);
    };

    /**
     * Hide column from the grid.
     * @method
     * @param {string} field - The name of the field bound to the column.
     * @return grid
     * @example sample <!-- grid -->
     * <button id="btnHideColumn" class="gj-button-md">Hide Column</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     document.getElementById('btnHideColumn').addEventListener('click', function () {
     *         grid.hideColumn('PlaceOfBirth');
     *     });
     * </script>
     */
    self.hideColumn = function (field) {
        return methods.hideColumn(this, field);
    };

    /**
     * Add new row to the grid.
     * @method
     * @param {object} record - Object with data for the new record.
     * @return grid
     * @example without.pagination <!-- grid -->
     * <button id="btnAdd" class="gj-button-md">Add Row</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     document.getElementById('btnAdd').addEventListener('click', function () {
     *         grid.addRow({ 'ID': grid.count(true) + 1, 'Name': 'Test Player', 'PlaceOfBirth': 'Test City, Test Country' });
     *     });
     * </script>
     * @example with.pagination <!-- grid, dropdown -->
     * <button id="btnAdd" class="gj-button-md">Add Row</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             {
     *                 title: '',
     *                 width: 100,
     *                 align: 'center',
     *                 tmpl: '<i class="material-icons">delete</i>',
     *                 events: { 
     *                     'click': function(e) {
     *                          grid.removeRow(e.detail.id);
     *                     }
     *                 }
     *             }
     *         ],
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     document.getElementById('btnAdd').addEventListener('click', function () {
     *         grid.addRow({ 'ID': grid.count(true) + 1, 'Name': 'Test Player', 'PlaceOfBirth': 'Test City, Test Country' });
     *     });
     * </script>
     */
    self.addRow = function (record) {
        return methods.addRow(this, record);
    };

    /**
     * Update row data.
     * @method
     * @param {string} id - The id of the row that needs to be updated
     * @param {object} record - Object with data for the new record.
     * @return grid
     * @example sample <!-- grid, dropdown -->
     * <table id="grid"></table>
     * <script>
     *     var grid;
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { title: '', width: 90, align: 'center', tmpl: '<u>Edit</u>', events: { 'click': Edit } }
     *         ],
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     function Edit(e, id, field, record) {
     *         grid.updateRow(id, { 'ID': id, 'Name': 'Ronaldo', 'PlaceOfBirth': 'Rio, Brazil' });
     *     }
     * </script>
     */
    self.updateRow = function (id, record) {
        return methods.updateRow(this, id, record);
    };

    //TODO: needs to be removed
    self.setCellContent = function (id, index, value) {
        methods.setCellContent(this, id, index, value);
    };

    /**
     * Remove row from the grid
     * @additionalinfo This method is design to work only with local datasources. If you use remote datasource, you need to send a request to the server to remove the row and then reload the data in the grid.
     * @method
     * @param {string} id - Id of the record that needs to be removed.
     * @return grid
     * @example Without.Pagination <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid;
     *     function Delete(e, id, field, record) {
     *         if (confirm('Are you sure?')) {
     *             grid.removeRow(id);
     *         }
     *     }
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { title: '', width: 100, align: 'center', tmpl: '<u class="gj-cursor-pointer">Delete</u>', events: { 'click': Delete } }
     *         ]
     *     });
     * </script>
     * @example With.Pagination <!-- grid, dropdown -->
     * <table id="grid"></table>
     * <script>
     *     var grid;
     *     function Delete(e, id, field, record) {
     *         if (confirm('Are you sure?')) {
     *             grid.removeRow(id);
     *         }
     *     }
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { width: 100, align: 'center', tmpl: '<u class="gj-cursor-pointer">Delete</u>', events: { 'click': Delete } }
     *         ],
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     */
    self.removeRow = function (id) {
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

/**
 * @widget Grid
 * @plugin Fixed Header
 */
gj.grid.plugins.fixedHeader = {
    config: {
        base: {

            /** If set to true, add scroll to the table body
             * @type boolean
             * @default object
             * @example Material.Design.Without.Pager <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Material.Design.With.Pager <!-- grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.3.Without.Pager <!-- bootstrap, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         height: 200,
             *         columns: [ 
             *             { field: 'ID', width: 34 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.3.With.Pager <!-- bootstrap, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         height: 200,
             *         columns: [ 
             *             { field: 'ID', width: 34 }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ 
             *             { field: 'ID', width: 42 }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.5.Without.Pager <!-- bootstrap5, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap5',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         height: 200,
             *         columns: [ 
             *             { field: 'ID', width: 34 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.5.With.Pager <!-- bootstrap5, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap5',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ 
             *             { field: 'ID', width: 42 }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             */
            fixedHeader: false,

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
/** 
 * @widget Grid 
 * @plugin Inline Editing
 */
gj.grid.plugins.inlineEditing = {
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
            /** Provides a way to set an editing UI for the column.
             * @alias column.editor
             * @type function|boolean
             * @default undefined
             * @example Material.Design <!-- grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     let countries = [ 'Bulgaria', 'Brazil', 'England', 'Germany', 'Colombia', 'Poland' ];
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: countries } },
             *             { field: 'DateOfBirth', type: 'date', editor: true, format: 'dd.mm.yyyy' },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Custom.With.Select2 <!-- jquery, grid, datepicker, checkbox -->
             * <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
             * <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
             * <table id="grid"></table>
             * <script>
             *     function select2editor(editorContainer, value, record) {
             *         let select = document.createElement('select');
             *         select.innerHTML = '<option value="Bulgaria">Bulgaria</option><option value="Brazil">Brazil</option><option value="England">England</option><option value="Germany">Germany</option><option value="Colombia">Colombia</option><option value="Poland">Poland</option>';
             *         select.value = value;
             *         editorContainer.appendChild(select);
             *         $(select).select2();
             *     }
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: select2editor },
             *             { field: 'DateOfBirth', type: 'date', editor: true, format: 'dd.mm.yyyy' },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     let countries = [ 'Bulgaria', 'Brazil', 'England', 'Germany', 'Colombia', 'Poland' ];
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: countries } },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: '/Locations/GetCountries', valueField: 'id' }, editField: 'CountryID'  },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap5',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: '/Locations/GetCountries', valueField: 'id' }, editField: 'CountryID'  },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             */
            editor: undefined,

            /** The name of the field in the grid data where the grid is going to set the new value.
             * @additionalinfo This is usable when the editor is interface with key/value pairs like dropdowns where the key needs to be updated in a different field..
             * @alias column.editField
             * @type String
             * @default undefined
             * @example Bootstrap.4 <!-- bootstrap4, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: '/Locations/GetCountries', valueField: 'id' }, editField: 'CountryID' },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             */
            editField: undefined,

            /** Provides a way to specify a display mode for the column.
             * @alias column.mode
             * @type readEdit|editOnly|readOnly
             * @default readEdit
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true, mode: 'editOnly' },
             *             { field: 'PlaceOfBirth', editor: true, mode: 'readOnly' }
             *         ]
             *     });
             * </script>
             */
            mode: 'readEdit'
        },
        inlineEditing: {

            /** Inline editing mode.
             * @alias inlineEditing.mode
             * @type click|dblclick|command
             * @default 'click'
             * @example Double.Click <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'dblclick' },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ]
             *     });
             * </script>
             * @example Command <!-- dropdown, grid -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3 }
             *     });
             * </script>
             * @example DateTime <!-- datetimepicker, grid -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Date': '05/15/2018', 'Time': '21:12', 'DateTime': '21:12 05/15/2018' },
             *         { 'ID': 2, 'Date': '05/16/2018', 'Time': '22:12', 'DateTime': '22:12 05/16/2018' },
             *         { 'ID': 3, 'Date': '05/17/2018', 'Time': '23:12', 'DateTime': '23:12 05/17/2018' }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Date', type: 'date', format: 'mm/dd/yyyy', editor: true },
             *             { field: 'Time', type: 'time', format: 'HH:MM', editor: true },
             *             { field: 'DateTime', type: 'datetime', format: 'HH:MM mm/dd/yyyy', editor: true }
             *         ]
             *     });
             * </script>
             */
            mode: 'click',
                
            /** If set to true, add column with buttons for edit, delete, update and cancel at the end of the grid.
             * @alias inlineEditing.managementColumn
             * @type Boolean
             * @default true
             * @example True <!-- grid, checkbox, datepicker -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', 'DateOfBirth': '\/Date(-122954400000)\/', IsActive: false },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', 'DateOfBirth': '\/Date(211842000000)\/', IsActive: false },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', 'DateOfBirth': '\/Date(-112417200000)\/', IsActive: false },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', 'DateOfBirth': '\/Date(512258400000)\/', IsActive: true },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', 'DateOfBirth': '\/Date(679266000000)\/', IsActive: true },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', 'DateOfBirth': '\/Date(349653600000)\/', IsActive: false }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command', managementColumn: true },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type: 'checkbox', editor: true, width: 100, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example False <!-- materialicons, grid -->
             * <table id="grid"></table>
             * <script>;
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ],
             *     createButton = function (icon, text, id) {
             *         let button = document.createElement('button');
             *         button.classList.add('gj-button-md');
             *         button.innerHTML = '<i class="material-icons">' + icon + '</i> ' + text;
             *         button.setAttribute('data-gj-key', id);
             *         return button;
             *     },
             *     editManager = function (value, record, cell, displayEl, id, grid) {
             *         let data = grid.getConfig(),
             *             edit =  createButton('mode_edit', 'Edit', id),
             *             del = createButton('delete', 'Delete', id),
             *             update = createButton('check_circle', 'Update', id),
             *             cancel = createButton('cancel', 'Cancel', id);
             *         
             *         update.style.display = 'none';
             *         cancel.style.display = 'none';
             *         edit.addEventListener('click', function (e) {
             *             grid.edit(this.getAttribute('data-gj-key'));
             *             edit.style.display = 'none';
             *             del.style.display = 'none';
             *             update.style.display = 'inline-block';
             *             cancel.style.display = 'inline-block';
             *         });
             *         del.addEventListener('click', function (e) {
             *             grid.removeRow(this.getAttribute('data-gj-key'));
             *         });
             *         update.addEventListener('click', function (e) {
             *             grid.update(this.getAttribute('data-gj-key'));
             *             edit.style.display = 'inline-block';
             *             del.style.display = 'inline-block';
             *             update.style.display = 'none';
             *             cancel.style.display = 'none';
             *         });
             *         cancel.addEventListener('click', function (e) {
             *             grid.cancel(this.getAttribute('data-gj-key'));
             *             edit.style.display = 'inline-block';
             *             del.style.display = 'inline-block';
             *             update.style.display = 'none';
             *             cancel.style.display = 'none';
             *         });
             *         displayEl.innerHTML = '';
             *         displayEl.appendChild(edit);
             *         displayEl.appendChild(del);
             *         displayEl.appendChild(update);
             *         displayEl.appendChild(cancel);
             *     }
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command', managementColumn: false },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true },
             *             { width: 300, align: 'center', renderer: editManager }
             *         ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3, sizes: [3, 5, 10, 20] }
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'bootstrap4',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3, sizes: [3, 5, 10, 20] }
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'bootstrap5',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3, sizes: [3, 5, 10, 20] }
             *     });
             * </script>
            */
            managementColumn: true,

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
     * Return array with all changes
     * @method
     * @return array
     * @example sample <!-- grid, grid.inlineEditing -->
     * <button id="btnGetChanges" class="gj-button-md">Get Changes</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     let grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID' }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
     *     });
     *     document.getElementById('btnGetChanges').addEventListener('click', function () {
     *         alert(JSON.stringify(grid.getChanges()));
     *     });
     * </script>
     */
    getChanges: function () {
        return JSON.parse(sessionStorage.getItem('gj.grid.' + this.getConfig().guid));
    },

    /**
     * Enable edit mode for all editable cells within a row.
     * @method
     * @param {string} id - The id of the row that needs to be edited
     * @return grid
     * @example Edit.Row <!-- grid -->
     * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
     * <table id="grid"></table>
     * <script>
     *     let grid, renderer;
     *     renderer = function (value, record, cell, displayEl, id) {
     *         let editBtn = document.createElement('i'),
     *             updateBtn = document.createElement('i');
     *         
     *         gj.core.addClasses(editBtn, 'fa fa-pencil gj-cursor-pointer');
     *         gj.core.addClasses(updateBtn, 'fa fa-save gj-cursor-pointer');
     *         editBtn.setAttribute('data-gj-key', id);
     *         updateBtn.setAttribute('data-gj-key', id);
     *         editBtn.style.display = 'inline-block';
     *         updateBtn.style.display = 'none';
     * 
     *         editBtn.addEventListener('click', function (e) {
     *             grid.edit(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'none';
     *             updateBtn.style.display = 'inline-block';
     *         });
     *         updateBtn.addEventListener('click', function (e) {
     *             grid.update(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'inline-block';
     *             updateBtn.style.display = 'none';
     *         });
     *         displayEl.appendChild(editBtn)
     *         displayEl.appendChild(updateBtn);
     *     }
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command', managementColumn: false },
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name', editor: true }, 
     *             { field: 'PlaceOfBirth', editor: true },
     *             { width: 56, align: 'center', renderer: renderer }
     *         ]
     *     });
     * </script>
     */
    edit: function (id) {
        let i, record = this.getById(id),
            cells = gj.grid.methods.getRowById(this, id).children,
            columns = this.getConfig().columns;

        for (i = 0; i < cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.editMode(this, cells[i], columns[i], record);
        }
            
        return this;
    },

    /**
     * Update all editable cells within a row, when the row is in edit mode.
     * @method
     * @param {string} id - The id of the row that needs to be updated
     * @return grid
     * @fires rowDataChanged
     * @example Update.Row <!-- grid -->
     * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
     * <table id="grid"></table>
     * <script>
     *     let grid, renderer;
     *     renderer = function (value, record, cell, displayEl, id) {
     *         let editBtn = document.createElement('i'),
     *             updateBtn = document.createElement('i');
     *         
     *         gj.core.addClasses(editBtn, 'fa fa-pencil gj-cursor-pointer');
     *         gj.core.addClasses(updateBtn, 'fa fa-save gj-cursor-pointer');
     *         editBtn.setAttribute('data-gj-key', id);
     *         updateBtn.setAttribute('data-gj-key', id);
     *         editBtn.style.display = 'inline-block';
     *         updateBtn.style.display = 'none';
     * 
     *         editBtn.addEventListener('click', function (e) {
     *             grid.edit(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'none';
     *             updateBtn.style.display = 'inline-block';
     *         });
     *         updateBtn.addEventListener('click', function (e) {
     *             grid.update(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'inline-block';
     *             updateBtn.style.display = 'none';
     *         });
     *         displayEl.appendChild(editBtn)
     *         displayEl.appendChild(updateBtn);
     *     }
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command', managementColumn: false },
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name', editor: true }, 
     *             { field: 'PlaceOfBirth', editor: true },
     *             { width: 56, align: 'center', renderer: renderer }
     *         ]
     *     });
     * </script>
     */
    update: function (id) {
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
     * Cancel the edition of all editable cells, when the row is in edit mode.
     * @method
     * @param {string} id - The id of the row where you need to undo all changes
     * @return grid
     * @example Cancel.Row <!-- grid -->
     * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
     * <table id="grid"></table>
     * <script>
     *     let grid, renderer;
     *     renderer = function (value, record, cell, displayEl, id) {
     *         let editBtn = document.createElement('i'),
     *             cancelBtn = document.createElement('i');
     *         
     *         gj.core.addClasses(editBtn, 'fa fa-pencil gj-cursor-pointer');
     *         gj.core.addClasses(cancelBtn, 'fa fa-undo gj-cursor-pointer');
     *         editBtn.setAttribute('data-gj-key', id);
     *         cancelBtn.setAttribute('data-gj-key', id);
     *         editBtn.style.display = 'inline-block';
     *         cancelBtn.style.display = 'none';
     * 
     *         editBtn.addEventListener('click', function (e) {
     *             grid.edit(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'none';
     *             cancelBtn.style.display = 'inline-block';
     *         });
     *         cancelBtn.addEventListener('click', function (e) {
     *             grid.cancel(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'inline-block';
     *             cancelBtn.style.display = 'none';
     *         });
     *         displayEl.appendChild(editBtn)
     *         displayEl.appendChild(cancelBtn);
     *     }
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command', managementColumn: false },
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name', editor: true }, 
     *             { field: 'PlaceOfBirth', editor: true },
     *             { width: 56, align: 'center', renderer: renderer }
     *         ]
     *     });
     * </script>
     */
    cancel: function (id) {
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
     *
     * @event cellDataChanged
     * @param {object} e - event data
     * @param {object} e.detail.cell - the cell presented as jquery object 
     * @param {object} e.detail.column - the column configuration data
     * @param {object} e.detail.record - the data of the row record
     * @param {object} e.detail.oldValue - the old cell value
     * @param {object} e.detail.newValue - the new cell value
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     let grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
     *     });
     *     grid.on('cellDataChanged', function (e) {
     *         alert('The value for "' + e.detail.column.field + '" is changed to "' + e.detail.newValue + '"');
     *     });
     * </script>
     */
    cellDataChanged: function (el, cell, column, record, newValue) {
        el.dispatchEvent(new CustomEvent('cellDataChanged', { detail: { cell: cell, column: column, record: record, newValue: newValue } }));
    },

    /**
     * Event fires after inline edit of a row in the grid.
     *
     * @event rowDataChanged
     * @param {object} e - event data
     * @param {object} e.detail.id - the id of the record
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     let grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command' },
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
     *     });
     *     grid.on('rowDataChanged', function (e) {
     *         alert('Record with id="' + e.detail.id + '" is changed to "' + JSON.stringify(e.detail.record) + '"');
     *     });
     * </script>
     */
    rowDataChanged: function (el, id, record) {
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

/** 
 * @widget Grid 
 * @plugin Optimistic Persistence
 */
gj.grid.plugins.optimisticPersistence = {

    config: {
        base: {
            optimisticPersistence: {
                /** Array that contains a list with param names that needs to be saved in the localStorage. You need to specify guid on the initialization of the grid in order to enable this feature.
                 * @additionalinfo This feature is using <a href="https://developer.mozilla.org/en/docs/Web/API/Window/localStorage" target="_blank">HTML5 localStorage</a> to store params and values.
                 * You can clear the data saved in localStorage when you clear your browser cache.
                 * @alias optimisticPersistence.localStorage
                 * @type array
                 * @default undefined
                 * @example sample <!-- bootstrap, grid  -->
                 * <p>Change the page and/or page size and then refresh the grid.</p>
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = new GijgoGrid(document.getElementById('grid'), {
                 *         guid: '58d47231-ac7b-e6d2-ddba-5e0195b31f2e',
                 *         uiLibrary: 'bootstrap',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         optimisticPersistence: { localStorage: ["page", "limit"] },
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                localStorage: undefined,

                /** Array that contains a list with param names that needs to be saved in the sessionStorage. You need to specify guid on the initialization of the grid in order to enable this feature.
                 * @additionalinfo This feature is using <a href="https://developer.mozilla.org/en/docs/Web/API/Window/sessionStorage" target="_blank">HTML5 sessionStorage</a> to store params and values.
                 * You can clear the data saved in sessionStorage when you open and close the browser.
                 * @alias optimisticPersistence.sessionStorage
                 * @type array
                 * @default undefined
                 * @example sample <!-- bootstrap, grid  -->
                 * <p>Change the page and/or page size and then refresh the grid. </p>
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = new GijgoGrid(document.getElementById('grid'), {
                 *         guid: '58d47231-ac7b-e6d2-ddba-5e0195b31f2f',
                 *         uiLibrary: 'bootstrap',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         optimisticPersistence: { sessionStorage: ["page", "limit"] },
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                sessionStorage: undefined
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
                 *     grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: data,
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 100] }
                 *     });
                 * </script>
                 * @example remote.data <!-- grid, dropdown -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
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
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Bootstrap.4.FontAwesome <!-- bootstrap4, fontawesome, grid, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
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
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap4',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Bootstrap.5.Material.Icons <!-- bootstrap5, grid, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap5',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Material.Design <!-- grid, grid.pagination, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'materialdesign',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                sizes: [5, 10, 20, 100],

                /** Array that contains a list with html element objects that are going to be used on the left side of the pager.
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
                 * 
                 *     function createButton(title, role, icon) {
                 *         let button = document.createElement('div');
                 *         button.setAttribute('title', title);
                 *         button.setAttribute('data-gj-role', role);
                 *         button.classList.add('custom-item');
                 *         button.innerHTML = '<i class="fa ' + icon + '" aria-hidden="true"></i>';
                 *         return button;
                 *     };
                 * 
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
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
                 *                 createButton('First', 'page-first', 'fa-fast-backward'),
                 *                 createButton('Previous', 'page-previous', 'fa-backward'),
                 *                 ('<div> Page </div>'),
                 *                 ('<div class="custom-item"></div>').appendChild(('<input type="text" data-gj-role="page-number" style="margin: 0 5px; width: 34px; height: 16px; text-align: right;" value="0">')),
                 *                 ('<div>of&nbsp;</div>'),
                 *                 ('<div data-gj-role="page-label-last" style="margin-right: 5px;">0</div>'),
                 *                 createButton('Next', 'page-next', 'fa-forward'),
                 *                 createButton('Last', 'page-last', 'fa-fast-forward'),
                 *                 createButton('Reload', 'page-refresh', 'fa-refresh'),
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

                /** Array that contains a list with html element objects that are going to be used on the right side of the pager.
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

        shadcn: {
            style: {
                pager: {
                    panel: 'gj-grid-shadcn-pager',
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
            } else if (data.uiLibrary === 'shadcn') {
                gj.grid.plugins.pagination.private.localizationShadcn(data);
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

        localizationShadcn: function (data) {
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

                pageNumber.classList.add('gj-grid-shadcn-page');
                input.setAttribute('data-gj-role', 'page-number');
                input.setAttribute('type', 'text');
                input.setAttribute('value', '0');
                gj.core.addClasses(input, 'gj-input-shadcn');
                pageNumber.appendChild(input);

                pager.style.width = '4.75rem';
                pager.setAttribute('data-gj-role', 'page-size');

                data.pager.leftControls = [
                    methods.createButton('gj-button-shadcn gj-cursor-pointer', 'page-first', msg.FirstPageTooltip, data.icons.first || msg.First),
                    methods.createButton('gj-button-shadcn gj-cursor-pointer', 'page-previous', msg.PreviousPageTooltip, data.icons.previous || msg.Previous),
                    labelPage,
                    pageNumber,
                    labelOf,
                    labelLast,
                    methods.createButton('gj-button-shadcn gj-cursor-pointer', 'page-next', msg.NextPageTooltip, data.icons.next || msg.Next),
                    methods.createButton('gj-button-shadcn gj-cursor-pointer', 'page-last', msg.LastPageTooltip, data.icons.last || msg.Last),
                    methods.createButton('gj-button-shadcn gj-cursor-pointer', 'page-refresh', msg.Refresh, data.icons.refresh || msg.Refresh),
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
                            let dropdownOptions = {
                                uiLibrary: data.uiLibrary,
                                iconsLibrary: data.iconsLibrary,
                                fontSize: window.getComputedStyle(control, null).getPropertyValue('font-size')
                            };
                            if (data.uiLibrary !== 'shadcn') {
                                dropdownOptions.style = {
                                    presenter: 'btn btn-default btn-sm'
                                };
                            }
                            new GijgoDropDown(control, dropdownOptions);
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
         *
         * @event pageSizeChange
         * @param {object} e - event data
         * @param {number} e.detail.newSize - The new page size
         * @example sample <!-- bootstrap, grid, grid.pagination -->
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap',
         *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         *     grid.on('pageSizeChange', function (e) {
         *         alert('The new page size is ' + e.detail.newSize + '.');
         *     });
         * </script>
         */
        pageSizeChange: function (el, newSize) {
            return el.dispatchEvent(new CustomEvent('pageSizeChange', { detail: { newSize: newSize } }));
        },

        /**
         * Triggered before the change of the page.
         *
         * @event pageChanging
         * @param {object} e - event data
         * @param {number} e.detail.newPage - The new page
         * @example sample <!-- bootstrap5, fontawesome, dropdown, grid, grid.pagination -->
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap5',
         *         iconsLibrary: 'fontawesome',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         *     grid.on('pageChanging', function (e) {
         *         if (isNaN(e.detail.newPage)) {
         *             alert('Invalid page number');
         *             return false;
         *         } else {
         *             alert(e.detail.newPage + ' is valid page number.');
         *         }
         *     });
         * </script>
         */
        pageChanging: function (el, newPage) {
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

/** 
 * @widget Grid 
 * @plugin Toolbar
 */
gj.grid.plugins.toolbar = {
    config: {
        base: {
            /** Template for the content in the toolbar. Appears in a separate row on top of the grid.
              * @type string
              * @default undefined
              * @example sample <!-- bootstrap, grid, grid.toolbar, grid.pagination -->
              * <table id="grid"></table>
              * <script>
              *     var grid = new GijgoGrid(document.getElementById('grid'), {
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap',
              *         toolbarTemplate: '<div class="row"><div class="col-xs-8" style="line-height:34px"><span data-gj-role="title">Grid Title</span></div><div class="col-xs-4 text-right"><button onclick="grid.reload()" class="btn btn-default">click here to refresh</button></div></div>',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
              *         pager: { limit: 5 }
              *     });
              * </script>
              */
            toolbarTemplate: undefined,

            /** The title of the grid. Appears in a separate row on top of the grid.
              * @type string
              * @default undefined
              * @example Material.Design <!-- grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     new GijgoGrid(document.getElementById('grid'), {
              *         dataSource: '/Players/Get',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     new GijgoGrid(document.getElementById('grid'), {
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     new GijgoGrid(document.getElementById('grid'), {
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap4',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              * @example Bootstrap.5 <!-- bootstrap5, grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     new GijgoGrid(document.getElementById('grid'), {
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap5',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              */
            title: undefined,

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
         * Get or set grid title.
         * @additionalinfo When you pass value in the text parameter this value with be in use for the new title of the grid and the method will return grid object.<br/>
         * When you don't pass value in the text parameter, then the method will return the text of the current grid title.<br/>
         * You can use this method in a combination with toolbarTemplate only if the title is wrapped in element with data-gj-role attribute that equals to "title".<br/>
         * @method
         * @param {object} text - The text of the new grid title.
         * @return string or grid object
         * @example text <!-- grid, grid.toolbar -->
         * <button onclick="grid.title('New Title')" class="gj-button-md">Set New Title</button>
         * <button onclick="alert(grid.title())" class="gj-button-md">Get Title</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         title: 'Initial Grid Title',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example html.template <!-- grid, grid.toolbar -->
         * <button onclick="grid.title('New Title')" class="gj-button-md">Set New Title</button>
         * <button onclick="alert(grid.title())" class="gj-button-md">Get Title</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         toolbarTemplate: '<div data-gj-role="title">Initial Grid Title</div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        title: function (text) {
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

/** 
 * @widget Grid 
 * @plugin Resizable Columns
 */
gj.grid.plugins.resizableColumns = {
    config: {
        base: {
            /** If set to true, users can resize columns by dragging the edges (resize handles) of their header cells.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap5',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4.FixedHeader <!-- bootstrap4, grid, draggable -->
             * <table id="grid" width="900"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         fixedHeader: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.5.FixedHeader <!-- bootstrap5, grid, draggable -->
             * <table id="grid" width="900"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         fixedHeader: true,
             *         uiLibrary: 'bootstrap5',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            resizableColumns: false
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

/** 
 * @widget Grid 
 * @plugin Row Reorder
 */
gj.grid.plugins.rowReorder = {
    config: {
        base: {
            /** If set to true, enable row reordering with drag and drop.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         uiLibrary: 'bootstrap5',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            rowReorder: false,

            /** If set, enable row reordering only when you try to drag cell from the configured column.
             * Accept only field names of columns.
             * @type string
             * @default undefined
             * @example sample <!-- grid, grid.rowReorder, draggable, droppable -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         rowReorderColumn: 'ID',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            rowReorderColumn: undefined,

            /** If set, update the value in the field for all records. Accept only field names of columns.
             * @type string
             * @default undefined
             * @example Visible.OrderNumber <!-- grid, grid.rowReorder, draggable, droppable -->
             * <table id="grid"></table>
             * <script>
             *     let data = [
             *         { 'ID': 1, 'OrderNumber': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'OrderNumber': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'OrderNumber': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
             *     ];
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         rowReorder: true,
             *         orderNumberField: 'OrderNumber',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'OrderNumber', width:120 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Hidden.OrderNumber <!-- grid, grid.rowReorder, draggable, droppable -->
             * <button onclick="alert(JSON.stringify(grid.getAll()))" class="gj-button-md">Show Data</button><br/><br/>
             * <table id="grid"></table>
             * <script>
             *     let data = [
             *         { 'ID': 1, 'OrderNumber': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'OrderNumber': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'OrderNumber': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
             *     ],
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         rowReorder: true,
             *         orderNumberField: 'OrderNumber',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            orderNumberField: undefined,

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

/** 
 * @widget Grid 
 * @plugin Export
 */
gj.grid.plugins.export = {
    config: { base: {} },

    public: {
        /**
         * Get grid data in Comma Separated Values (CSV) format.
         * @method
         * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
         * @return string
         * @example Local.Data <!-- grid, dropdown -->
         * <button onclick="alert(grid.getCSV(true))" class="gj-button-md">Get All</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var data, grid;
         *     data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: data,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Remote.Data <!-- grid, dropdown -->
         * <button onclick="alert(grid.getCSV())" class="gj-button-md">Get CSV</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        getCSV: function (includeAllRecords) {
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
         * Download grid data in Comma Separated Values (CSV) format.
         * @method
         * @param {string} filename - name of the generated file.
         * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
         * @return grid object
         * @example Local.Data <!-- grid, dropdown -->
         * <button onclick="grid.downloadCSV()" class="gj-button-md">Download Only First Page</button>
         * <button onclick="grid.downloadCSV('myfilename.csv', true)" class="gj-button-md">Download All Data</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var data, grid;
         *     data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: data,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Remote.Data <!-- grid, dropdown -->
         * <button onclick="grid.downloadCSV('myfilename.csv')" class="gj-button-md">Download CSV</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        downloadCSV: function (filename, includeAllRecords) {
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

/** 
 * @widget Grid 
 * @plugin Column Reorder
 */
gj.grid.plugins.columnReorder = {
    config: {
        base: {
            /** If set to true, enable column reordering with drag and drop.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 48 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth', sortable: true } ]
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap5',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 48 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth', sortable: true } ]
             *     });
             * </script>
             */
            columnReorder: false,

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

/**
 * @widget Grid
 * @plugin Header Filter
 */
gj.grid.plugins.headerFilter = {
    config: {
        base: {
            defaultColumnSettings: {
                /** Indicates if the column is sortable. If set to false the header filter is hidden.
                 * @alias column.filterable
                 * @type boolean
                 * @default true
                 * @example Material.Design <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: true,
                 *         columns: [
                 *             { field: 'ID', width: 56, filterable: false },
                 *             { field: 'Name', filterable: true },
                 *             { field: 'PlaceOfBirth' }
                 *         ]
                 *     });
                 * </script>
                 * @example Bootstrap.3 <!-- bootstrap, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: true,
                 *         uiLibrary: 'bootstrap',
                 *         columns: [
                 *             { field: 'ID', width: 56, filterable: false },
                 *             { field: 'Name', filterable: true },
                 *             { field: 'PlaceOfBirth' }
                 *         ]
                 *     });
                 * </script>
                 */
                filterable: true
            },

            /** If set to true, add filters for each column
             * @type boolean
             * @default object
             * @example Remote.DataSource <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         headerFilter: true,
             *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Local.DataSource <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         headerFilter: true,
             *         columns: [ 
             *             { field: 'ID', width: 56, filterable: false }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             */
            headerFilter: {
                /** Type of the header filter
                 * @alias headerFilter.type
                 * @type (onenterkeypress|onchange)
                 * @default 'onenterkeypress'
                 * @example OnEnterKeyPress <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: {
                 *             type: 'onenterkeypress'
                 *         },
                 *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
                 *     });
                 * </script>
                 * @example OnChange <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: {
                 *             type: 'onchange'
                 *         },
                 *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
                 *     });
                 * </script>
                 */
                type: 'onenterkeypress'
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

/** 
 * @widget Grid 
 * @plugin Grouping
 */
gj.grid.plugins.grouping = {
    config: {
        base: {
            paramNames: {
                /** The name of the parameter that is going to send the name of the column for grouping.
                 * The grouping should be enabled in order this parameter to be in use.
                 * @alias paramNames.groupBy
                 * @type string
                 * @default "groupBy"
                 */
                groupBy: 'groupBy',

                /** The name of the parameter that is going to send the direction for grouping.
                 * The grouping should be enabled in order this parameter to be in use.
                 * @alias paramNames.groupByDirection
                 * @type string
                 * @default "groupByDirection"
                 */
                groupByDirection: 'groupByDirection'
            },

            grouping: {
                /** The name of the field that needs to be in use for grouping.
                  * @type string
                  * @alias grouping.groupBy
                  * @default undefined
                  * @example Local.Data <!-- grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     let grid, data = [
                  *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', CountryName: 'Bulgaria' },
                  *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', CountryName: 'Brazil' },
                  *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', CountryName: 'England' },
                  *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', CountryName: 'Germany' },
                  *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', CountryName: 'Colombia' },
                  *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', CountryName: 'Bulgaria' }
                  *     ];
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: data,
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Remote.Data <!-- grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Bootstrap.3 <!-- bootstrap, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'DateOfBirth', type: 'date' } ],
                  *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>'
                  *     });
                  * </script>
                  * @example Bootstrap.4 <!-- bootstrap4, fontawesome, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap4',
                  *         iconsLibrary: 'fontawesome',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Bootstrap.5 <!-- bootstrap5, fontawesome, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap5',
                  *         iconsLibrary: 'fontawesome',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  */
                groupBy: undefined,

                direction: 'asc'
            },

            icons: {
                /** Expand row icon definition.
                 * @alias icons.expandGroup
                 * @type String
                 * @default '<i class="gj-icon plus" />'
                 * @example Right.Down.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                 *         grouping: { groupBy: 'CountryName' },
                 *         icons: {
                 *             expandGroup: '<i class="material-icons">keyboard_arrow_right</i>',
                 *             collapseGroup: '<i class="material-icons">keyboard_arrow_down</i>'
                 *         }
                 *     });
                 * </script>
                 */
                expandGroup: '<i class="gj-icon plus" />',

                /** Collapse row icon definition.
                 * @alias icons.collapseGroup
                 * @type String
                 * @default '<i class="gj-icon minus" />'
                 * @example Right.Down.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                 *         grouping: { groupBy: 'CountryName' },
                 *         icons: {
                 *             expandGroup: '<i class="material-icons">keyboard_arrow_right</i>',
                 *             collapseGroup: '<i class="material-icons">keyboard_arrow_down</i>'
                 *         }
                 *     });
                 * </script>
                 */
                collapseGroup: '<i class="gj-icon minus" />'
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
