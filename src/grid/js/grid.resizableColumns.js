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
