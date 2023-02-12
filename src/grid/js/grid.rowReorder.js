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
