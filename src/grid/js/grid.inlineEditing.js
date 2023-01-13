/** 
 * @widget Grid 
 * @plugin Inline Editing
 */
gj.grid.plugins.inlineEditing = {
    renderers: {
        editManager: function (value, record, cell, displayEl, id, grid) {
            // let data = grid.getConfig(),
            //     edit = data.inlineEditing.editButton.attr('key', id),
            //     delete = data.inlineEditing.deleteButton.attr('key', id),
            //     update = data.inlineEditing.updateButton.attr('key', id).hide(),
            //     cancel = data.inlineEditing.cancelButton.attr('key', id).hide();
            // edit.on('click', function (e) {
            //     grid.edit((this).attr('key'));
            // });
            // delete.on('click', function (e) {
            //     grid.removeRow((this).attr('key'));
            // });
            // update.on('click', function (e) {
            //     grid.update((this).attr('key'));
            // });
            // cancel.on('click', function (e) {
            //     grid.cancel((this).attr('key'));
            // });
            // displayEl.empty().append(edit).append(delete).append(update).append(cancel);
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
             * <script>
             *     let grid, editManager, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     editManager = function (value, record, cell, displayEl, id, grid) {
             *         let data = grid.getConfig(),
             *             edit = ('<button class="gj-button-md"><i class="material-icons">mode_edit</i> Edit</button>').attr('data-gj-key', id),
             *             delete = ('<button class="gj-button-md"><i class="material-icons">delete</i> Delete</button>').attr('data-gj-key', id),
             *             update = ('<button class="gj-button-md"><i class="material-icons">check_circle</i> Update</button>').attr('data-gj-key', id).hide(),
             *             cancel = ('<button class="gj-button-md"><i class="material-icons">cancel</i> Cancel</button>').attr('data-gj-key', id).hide();
             *         edit.on('click', function (e) {
             *             grid.edit((this).data('key'));
             *             edit.hide();
             *             delete.hide();
             *             update.show();
             *             cancel.show();
             *         });
             *         delete.on('click', function (e) {
             *             grid.removeRow((this).data('key'));
             *         });
             *         update.on('click', function (e) {
             *             grid.update((this).data('key'));
             *             edit.show();
             *             delete.show();
             *             update.hide();
             *             cancel.hide();
             *         });
             *         cancel.on('click', function (e) {
             *             grid.cancel((this).data('key'));
             *             edit.show();
             *             delete.show();
             *             update.hide();
             *             cancel.hide();
             *         });
             *         displayEl.empty().append(edit).append(delete).append(update).append(cancel);
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
    }
};

gj.grid.plugins.inlineEditing.private = {
    localization: function (data) {
        if (data.uiLibrary === 'bootstrap') {
            data.inlineEditing.editButton = '<button role="edit" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> ' + gj.grid.messages[data.locale].Edit + '</button>';
            data.inlineEditing.deleteButton = '<button role="delete" class="btn btn-default btn-sm gj-margin-left-10"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> ' + gj.grid.messages[data.locale].Delete + '</button>';
            data.inlineEditing.updateButton = '<button role="update" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> ' + gj.grid.messages[data.locale].Update + '</button>';
            data.inlineEditing.cancelButton = '<button role="cancel" class="btn btn-default btn-sm gj-margin-left-10"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> ' + gj.grid.messages[data.locale].Cancel + '</button>';
        } else {
            data.inlineEditing.editButton = '<button role="edit" class="gj-button-md"><i class="gj-icon pencil" /> ' + gj.grid.messages[data.locale].Edit.toUpperCase() + '</button>';
            data.inlineEditing.deleteButton = '<button role="delete" class="gj-button-md"><i class="gj-icon delete" /> ' + gj.grid.messages[data.locale].Delete.toUpperCase() + '</button>';
            data.inlineEditing.updateButton = '<button role="update" class="gj-button-md"><i class="gj-icon check-circle" /> ' + gj.grid.messages[data.locale].Update.toUpperCase() + '</button>';
            data.inlineEditing.cancelButton = '<button role="cancel" class="gj-button-md"><i class="gj-icon cancel" /> ' +gj.grid.messages[data.locale].Cancel.toUpperCase() + '</button>';
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
                        config.fontSize = grid.element.style.fontSize;
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
                        } else if ('dropdown' === column.type && gj.dropdown) {
                            editorField = document.createElement('select');
                            editorField.setAttribute('width', '100%');
                            editorContainer.appendChild(editorField);
                            config.dataBound = function (e) {
                                let dropdown = (this).dropdown();
                                if (column.editField) {
                                    dropdown.value(record[column.editField]);
                                } else {
                                    dropdown.value(record[column.field]);
                                }
                            };
                            editorField = editorField.dropdown(config);
                        } else {
                            editorField = ('<input type="text" value="' + value + '" class="gj-width-full"/>');
                            if (data.uiLibrary === 'materialdesign') {
                                editorField.addClass('gj-textbox-md').css('font-size', grid.css('font-size'));
                            }
                            editorContainer.append(editorField);
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
                cell.querySelector('[role="edit"]').style.display = 'none';
                cell.querySelector('[role="delete"]').style.display = 'none';
                cell.querySelector('[role="update"]').style.display = 'block';
                cell.querySelector('[role="cancel"]').style.display = 'block';
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
                cell.querySelector('[role="update"]').style.display = 'none';
                cell.querySelector('[role="cancel"]').style.display = 'none';
                cell.querySelector('[role="edit"]').style.display = 'block';
                cell.querySelector('[role="delete"]').style.display = 'block';
            }
        }
    },

    updateOtherCells: function(grid, mode) {
        let data = grid.getConfig(), editors, cell;
        if (data.inlineEditing.mode !== 'command' && mode !== 'editOnly') {
            editors = grid.element.querySelectorAll('div[data-gj-role="edit"]');
            for (const editor of editors) {
                if (editor.style.display === 'block') {
                    cell = editor.parentNode;
                    column = data.columns[Array.from(cell.parentNode.children).indexOf(cell)];
                    gj.grid.plugins.inlineEditing.private.displayMode(grid, cell, column);
                }
            }
        }
    },

    updateChanges: function (grid, column, sourceRecord, newValue) {
        let targetRecords, filterResult, newRecord, data = grid.getConfig();
        if (!data.guid) {
            data.guid = gj.grid.plugins.inlineEditing.private.generateGUID();
        }
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
    },

    generateGUID: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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
     *         let editBtn = ('<i class="fa fa-pencil gj-cursor-pointer" data-gj-key="' + id + '"></i>'),
     *             updateBtn = ('<i class="fa fa-save gj-cursor-pointer" data-gj-key="' + id + '"></i>').hide();
     *         editBtn.on('click', function (e) {
     *             grid.edit((this).data('key'));
     *             editBtn.hide();
     *             updateBtn.show();
     *         });
     *         updateBtn.on('click', function (e) {
     *             grid.update((this).data('key'));
     *             editBtn.show();
     *             updateBtn.hide();
     *         });
     *         displayEl.append(editBtn).append(updateBtn);
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
            cells = gj.grid.methods.getRowById(this, id).children('td'),
            columns = this.data('columns');

        for (i = 0; i < cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.editMode(this, (cells[i]), columns[i], record);
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
     *         let editBtn = ('<i class="fa fa-pencil gj-cursor-pointer" data-gj-key="' + id + '"></i>'),
     *             updateBtn = ('<i class="fa fa-save gj-cursor-pointer" data-gj-key="' + id + '"></i>').hide();
     *         editBtn.on('click', function (e) {
     *             grid.edit((this).data('key'));
     *             editBtn.hide();
     *             updateBtn.show();
     *         });
     *         updateBtn.on('click', function (e) {
     *             grid.update((this).data('key'));
     *             editBtn.show();
     *             updateBtn.hide();
     *         });
     *         displayEl.append(editBtn).append(updateBtn);
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
            cells = gj.grid.methods.getRowById(this, id).children('td'),
            columns = this.data('columns');

        for (i = 0; i < cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.displayMode(this, (cells[i]), columns[i], false);
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
     *         let editBtn = ('<i class="fa fa-pencil gj-cursor-pointer" data-gj-key="' + id + '"></i>'),
     *             cancelBtn = ('<i class="fa fa-undo gj-cursor-pointer" data-gj-key="' + id + '"></i>').hide();
     *         editBtn.on('click', function (e) {
     *             grid.edit((this).data('key'));
     *             editBtn.hide();
     *             cancelBtn.show();
     *         });
     *         cancelBtn.on('click', function (e) {
     *             grid.cancel((this).data('key'));
     *             editBtn.show();
     *             cancelBtn.hide();
     *         });
     *         displayEl.append(editBtn).append(cancelBtn);
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
            cells = gj.grid.methods.getRowById(this, id).children('td'),
            columns = this.data('columns');

        for (i = 0; i < cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.displayMode(this, (cells[i]), columns[i], true);
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
    cellDataChanged: function (el, cell, column, record, oldValue, newValue) {
        el.dispatchEvent(new CustomEvent('cellDataChanged', { detail: { cell: cell, column: column, record: record, oldValue: oldValue, newValue: newValue } }));
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
            grid.element.querySelector('span.gj-dirty').remove();
        });
        grid.on('rowDataBound', function (e, row, id, record) {
            grid.cancel(id);
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
