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
