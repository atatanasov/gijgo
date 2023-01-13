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
            for (i = 0; i < cells.length; i++) {
                cells[i].addEventListener('mousedown', gj.grid.plugins.columnReorder.private.createMouseDownHandler(grid, cells[i]));
                cells[i].addEventListener('mousemove', gj.grid.plugins.columnReorder.private.createMouseMoveHandler(grid, cells[i]));
                cells[i].addEventListener('mouseup', gj.grid.plugins.columnReorder.private.createMouseUpHandler(grid, cells[i]));
            }
        },

        createMouseDownHandler: function (grid) {
            return function (e) {
                grid.timeout = setTimeout(function () {
                    grid.element.setAttribute('data-gj-drag-ready', true);
                }, 100);
            }
        },

        createMouseUpHandler: function (grid) {
            return function (e) {
                clearTimeout(grid.timeout);
                grid.element.setAttribute('data-gj-drag-ready', false);
            }
        },

        createMouseMoveHandler: function (grid, thSource) {
            return function (e) {
                if (grid.element.getAttribute('data-gj-drag-ready') === 'true') {
                    let dragEl, srcIndex, elements, srcEl;

                    grid.element.setAttribute('data-gj-drag-ready', false);
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
                        srcEl = elements[i].children[srcIndex];
                        for (const element of elements[i].children) {
                            if (srcEl !== element) {
                                elements[i].removeChild(element)
                            }
                        }
                    }
                    elements = dragEl.querySelector('tfoot');
                    elements && elements.remove();

                    new GijgoDraggable(dragEl, {
                        stop: gj.grid.plugins.columnReorder.private.createDragStopHandler(grid, thSource)
                    });
                    dragEl.style.position = 'absolute';
                    dragEl.style.top = thSource.getBoundingClientRect().top + 'px';
                    dragEl.style.left = thSource.getBoundingClientRect().left + 'px';
                    dragEl.style.width = gj.core.width(thSource) + 'px';
                    dragEl.style.zIndex = 1;
                    
                    if (thSource.getAttribute('data-droppable') === 'true') {
                        thSource.droppable('destroy');
                    }

                    for (const dropEl of thSource.parentNode.children) {
                        if (thSource !== dropEl) {
                            if (dropEl.getAttribute('data-gj-droppable') === 'true') {
                                new GijgoDroppable(dropEl).destroy();
                            }
                            new GijgoDroppable(dropEl, {
                                over: gj.grid.plugins.columnReorder.private.createDroppableOverHandler(grid, thSource),
                                out: gj.grid.plugins.columnReorder.private.droppableOut
                            });
                        }
                    }
                    dragEl.dispatchEvent(new Event('mousedown'));
                }
            };
        },

        createDragStopHandler: function (grid, thSource) {
            return function (e) {
                let elements = thSource.parentNode.children;
                document.body.querySelector('table[data-gj-role="draggable-clone"]').remove();
                grid.element.classList.remove('gj-unselectable');
                for (const thTarget of elements) {
                    let data = grid.getConfig(),
                        targetPosition = gj.grid.methods.getColumnPosition(data.columns, thTarget.getAttribute('data-gj-field')),
                        sourcePosition = gj.grid.methods.getColumnPosition(data.columns, thSource.getAttribute('data-gj-field'))
                        droppable = new GijgoDroppable(thTarget);

                    gj.core.removeClasses(thTarget, 'gj-grid-left-border gj-grid-right-border');
                    if (thTarget.nextElementSibling) {
                        gj.core.removeClasses(thTarget.nextElementSibling, 'gj-grid-left-border gj-grid-right-border');
                    }
                    
                    if (droppable.isOver(e.detail)) {
                        if (targetPosition < sourcePosition) {
                            thTarget.parentNode.insertBefore(thSource, thTarget);
                        } else {
                            thTarget.parentNode.insertBefore(thSource, thTarget.nextSibling);
                        }
                        gj.grid.plugins.columnReorder.private.moveRowCells(grid, sourcePosition, targetPosition);
                        data.columns.splice(targetPosition, 0, data.columns.splice(sourcePosition, 1)[0]);
                    }
                    droppable.destroy();
                };
            }
        },

        moveRowCells: function (grid, sourcePosition, targetPosition) {
            let i, row, rows = grid.find('tbody tr[data-gj-role="row"]');
            for (i = 0; i < rows.length; i++) {
                row = (rows[i]);
                if (targetPosition < sourcePosition) {
                    row.find('td:eq(' + targetPosition + ')').before(row.find('td:eq(' + sourcePosition + ')'));
                } else {
                    row.find('td:eq(' + targetPosition + ')').after(row.find('td:eq(' + sourcePosition + ')'));
                }                
            }
        },

        createDroppableOverHandler: function (grid, thSource) {
            return function (e) {
                let thTarget = (this),
                    data = grid.getConfig(),
                    targetPosition = gj.grid.methods.getColumnPosition(data.columns, thTarget.data('field')),
                    sourcePosition = gj.grid.methods.getColumnPosition(data.columns, thSource.data('field'));
                if (targetPosition < sourcePosition) {
                    thTarget.addClass('gj-grid-left-border');
                    grid.find('tbody tr[data-gj-role="row"] td:nth-child(' + (thTarget.index() + 1) + ')').addClass('gj-grid-left-border');
                } else {
                    thTarget.addClass('gj-grid-right-border');
                    grid.find('tbody tr[data-gj-role="row"] td:nth-child(' + (thTarget.index() + 1) + ')').addClass('gj-grid-right-border');
                }
            };
        },

        droppableOut: function () {
            let thTarget = (this);
            thTarget.removeClass('gj-grid-left-border').removeClass('gj-grid-right-border');
            thTarget.closest('table').find('tbody tr[data-gj-role="row"] td:nth-child(' + (thTarget.index() + 1) + ')').removeClass('gj-grid-left-border').removeClass('gj-grid-right-border');
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
