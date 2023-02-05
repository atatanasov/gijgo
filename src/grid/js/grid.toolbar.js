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
