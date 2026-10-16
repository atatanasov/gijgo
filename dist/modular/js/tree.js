/*
 * Gijgo Tree v2.0.0-alpha-1
 * http://gijgo.com/tree
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**
  * @widget Tree
  * @plugin Base
  */
gj.tree = {
    plugins: {}
};

gj.tree.config = {
    base: {

        params: {},

        /** When this setting is enabled the content of the tree will be loaded automatically after the creation of the tree.
         * @type boolean
         * @default true
         * @example disabled <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         autoLoad: false
         *     });
         *     tree.reload(); //call .reload() explicitly in order to load the data in the tree
         * </script>
         * @example enabled <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         autoLoad: true
         *     });
         * </script>
         */
        autoLoad: true,

        /** The type of the node selection.<br/>
         * If the type is set to multiple the user will be able to select more then one node in the tree.
         * @type (single|multiple)
         * @default single
         * @example Single.Selection <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'single'
         *     });
         * </script>
         * @example Multiple.Selection <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple'
         *     });
         * </script>
         */
        selectionType: 'single',

        /** This setting enable cascade selection and unselection of children
         * @type boolean
         * @default false
         * @example Material.Design <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple',
         *         cascadeSelection: true
         *     });
         * </script>
         * @example Bootstrap.3 <!-- tree, bootstrap -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple',
         *         cascadeSelection: true,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- tree, bootstrap4 -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple',
         *         cascadeSelection: true,
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         * @example Bootstrap.5 <!-- tree, bootstrap5 -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple',
         *         cascadeSelection: true,
         *         uiLibrary: 'bootstrap5'
         *     });
         * </script>
         */
        cascadeSelection: false,

        /** The data source of tree.
         * @additionalinfo If set to string, then the tree is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the tree is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the tree is going to use the array as data for tree nodes.
         * @type (string|object|array)
         * @default undefined
         * @example Local.DataSource <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ]
         *     });
         * </script>
         * @example Remote.DataSource <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get'
         *     });
         * </script>
         */
        dataSource: undefined,

        /** Primary key field name.
         * @type string
         * @default undefined
         * @example defined <!-- tree -->
         * <p>Select a node to see the key.</p>
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         primaryKey: 'id',
         *         dataSource: [ { id: 101, text: 'foo', children: [ { id: 202, text: 'bar' } ] } ],
         *         select: function (e) {
         *             alert('Your key is ' + e.detail.id);
         *         }
         *     });
         * </script>
         * @example undefined <!-- tree -->
         * <p>Select a node to see the key.</p>
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: [ { id: 101, text: 'foo', children: [ { id: 202, text: 'bar' } ] } ],
         *         select: function (e) {
         *             alert('Your key is ' + e.detail.id);
         *         }
         *     });
         * </script>
         */
        primaryKey: undefined,

        /** Text field name.
         * @type string
         * @default 'text'
         * @example sample <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         textField: 'newTextName',
         *         dataSource: [ { newTextName: 'foo', children: [ { newTextName: 'bar' } ] } ]
         *     });
         * </script>
         */
        textField: 'text',

        /** Children field name.
         * @type string
         * @default 'children'
         * @example Custom.FieldName <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         childrenField: 'myChildrenNode',
         *         dataSource: [ { text: 'foo', myChildrenNode: [ { text: 'bar' } ] } ]
         *     });
         * </script>
         */
        childrenField: 'children',

        /** The name of the field that indicates if the node has children. Shows expand icon if the node has children.
         * @type string
         * @default 'hasChildren'
         * @example Custom.FieldName <!-- jquery, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var continents, countries, states, tree;
         *     continents = [
         *         { id: 1, anyChildren: true, text: 'Asia', type: 'continent' },
         *         { id: 2, anyChildren: true, text: 'North America', type: 'continent' },
         *         { id: 3, anyChildren: false, text: 'South America', type: 'continent' }
         *     ];
         *     countries = [
         *         { id: 1, anyChildren: false, continent: 'Asia', text: 'China', type: 'country' },
         *         { id: 2, anyChildren: false, continent: 'Asia', text: 'Japan', type: 'country' },
         *         { id: 3, anyChildren: true, continent: 'North America', text: 'USA', type: 'country' },
         *         { id: 4, anyChildren: false, continent: 'North America', text: 'Canada', type: 'country' }
         *     ];
         *     states = [
         *         { id: 1, country: 'USA', text: 'California', type: 'state' },
         *         { id: 2, country: 'USA', text: 'Florida', type: 'state' }
         *     ];
         *     tree = new GijgoTree(document.getElementById('tree'), {
         *         hasChildrenField: 'anyChildren',
         *         dataSource: continents
         *     });
         *     tree.on('expand', function (e) {
         *         var i, children, record = tree.getDataById(e.detail.id);
         *         if (tree.getChildren(e.detail.node).length === 0) {
         *             if (record.type === 'continent') {
         *                 children = $.grep(countries, function (i) { return i.continent === record.text; });
         *                 for (i = 0; i < children.length; i++) {
         *                     tree.addNode(children[i], e.detail.node);
         *                 }
         *             } else if (record.type === 'country') {
         *                 children = $.grep(states, function (i) { return i.country === record.text; });
         *                 for (i = 0; i < children.length; i++) {
         *                     tree.addNode(children[i], e.detail.node);
         *                 }
         *             }
         *         }
         *     });
         * </script>
         */
        hasChildrenField: 'hasChildren',

        /** Image css class field name.
         * @type string
         * @default 'imageCssClass'
         * @example Default.Name <!-- bootstrap, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         uiLibrary: 'bootstrap',
         *         dataSource: [ { text: 'folder', imageCssClass: 'glyphicon glyphicon-folder-close', children: [ { text: 'file', imageCssClass: 'glyphicon glyphicon-file' } ] } ]
         *     });
         * </script>
         * @example Custom.Name <!-- tree  -->
         * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         imageCssClassField: 'faCssClass',
         *         dataSource: [ { text: 'folder', faCssClass: 'fa fa-folder', children: [ { text: 'file', faCssClass: 'fa fa-file' } ] } ]
         *     });
         * </script>
         */
        imageCssClassField: 'imageCssClass',

        /** Image url field name.
         * @type string
         * @default 'imageUrl'
         * @example Default.HTML.Field.Name <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: [ { text: 'World', imageUrl: 'http://gijgo.com/content/icons/world-icon.png', children: [ { text: 'USA', imageUrl: 'http://gijgo.com/content/icons/usa-oval-icon.png' } ] } ]
         *     });
         * </script>
         * @example Custom.HTML.Field.Name <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         imageUrlField: 'icon',
         *         dataSource: [ { text: 'World', icon: 'http://gijgo.com/content/icons/world-icon.png', children: [ { text: 'USA', icon: 'http://gijgo.com/content/icons/usa-oval-icon.png' } ] } ]
         *     });
         * </script>
         */
        imageUrlField: 'imageUrl',

        /** Image html field name.
         * @type string
         * @default 'imageHtml'
         * @example Default.HTML.Field.Name <!-- materialicons, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: [ { text: 'folder', imageHtml: '<i class="material-icons">folder</i>', children: [ { text: 'file', imageHtml: '<i class="material-icons">insert_drive_file</i>' } ] } ]
         *     });
         * </script>
         * @example Custom.HTML.Field.Name <!-- materialicons, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         imageHtmlField: 'icon',
         *         dataSource: [ { text: 'folder', icon: '<i class="material-icons">folder</i>', children: [ { text: 'file', icon: '<i class="material-icons">insert_drive_file</i>' } ] } ]
         *     });
         * </script>
         */
        imageHtmlField: 'imageHtml',

        /** Disabled field name. Assume that the item is not disabled if not set.
         * @type string
         * @default 'disabled'
         * @example Default.Value <!-- checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Custom.Value <!-- checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true,
         *         disabledField: 'disabledState',
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabledState: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabledState: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Bootstrap <!-- bootstrap, checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         uiLibrary: 'bootstrap',
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         uiLibrary: 'bootstrap4',
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         uiLibrary: 'bootstrap5',
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         */
        disabledField: 'disabled',

        /** Width of the tree.
         * @type number
         * @default undefined
         * @example JS.Config <!-- bootstrap, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         border: true
         *     });
         * </script>
         * @example HTML.Config <!-- bootstrap, tree -->
         * <ul id="tree" width="500" data-gj-source="/Locations/Get" data-gj-ui-library="bootstrap" data-gj-border="true"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), );
         * </script>
         */
        width: undefined,

        /** When this setting is enabled the content of the tree will be wrapped by borders.
         * @type boolean
         * @default false
         * @example Material.Design.True <!-- checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         border: true,
         *         checkboxes: true
         *     });
         * </script>
         * @example Material.Design.False <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         border: false
         *     });
         * </script>
         * @example Bootstrap.3.True <!-- bootstrap, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         border: true
         *     });
         * </script>
         * @example Bootstrap.3.False <!-- bootstrap, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         border: false
         *     });
         * </script>
         * @example Bootstrap.4.True <!-- bootstrap4, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         border: true
         *     });
         * </script>
         * @example Bootstrap.4.False <!-- bootstrap4, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         border: false
         *     });
         * </script>
         */
        border: false,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4|bootstrap5|shadcn)
         * @default materialdesign
         * @example MaterialDesign <!-- tree, checkbox -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'materialdesign',
         *         checkboxes: true
         *     });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, tree, checkbox -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         checkboxes: true
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, tree, checkbox -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         checkboxes: true
         *     });
         * </script>
         * @example Shadcn <!-- checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'shadcn',
         *         checkboxes: true
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
         * @example Base.Theme.Material.Icons <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         iconsLibrary: 'materialicons'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, tree, checkbox -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         checkboxes: true
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        autoGenId: 1,

        autoGenFieldName: 'autoId_b5497cc5-7ef3-49f5-a7dc-4a932e1aee4a',

        indentation: 24,

        style: {
            wrapper: 'gj-unselectable',
            list: 'gj-list gj-list-md',
            item: undefined,
            active: 'gj-list-md-active',
            inactive: 'gj-list-md-inactive',
            leafIcon: undefined,
            border: 'gj-tree-md-border'
        },

        icons: {
            /** Expand icon definition.
             * @alias icons.expand
             * @type String
             * @default '<i class="gj-icon chevron-right" />'
             * @example Plus.Minus.Icons <!-- materialicons, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     var tree = new GijgoTree(document.getElementById('tree'), {
             *         dataSource: '/Locations/Get',
             *         icons: { 
             *             expand: '<i class="material-icons">add</i>',
             *             collapse: '<i class="material-icons">remove</i>'
             *         }
             *     });
             * </script>
             */
            expand: '<i class="gj-icon chevron-right" />',

            /** Collapse icon definition.
             * @alias icons.collapse
             * @type String
             * @default '<i class="gj-icon chevron-down" />'
             * @example Plus.Minus.Icons <!-- materialicons, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     var tree = new GijgoTree(document.getElementById('tree'), {
             *         dataSource: '/Locations/Get',
             *         icons: { 
             *             expand: '<i class="material-icons">add</i>',
             *             collapse: '<i class="material-icons">remove</i>'
             *         }
             *     });
             * </script>
             */
            collapse: '<i class="gj-icon chevron-down" />'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-3',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active',
            inactive: '',
            border: 'gj-tree-bootstrap-border'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-4',
            list: 'gj-list gj-list-bootstrap',
            item: 'list-group-item',
            active: 'active',
            inactive: '',
            border: 'gj-tree-bootstrap-border'
        },
        icons: {
            expand: '<i class="gj-icon plus" />',
            collapse: '<i class="gj-icon minus" />'
        }
    },

    bootstrap5: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-5',
            list: 'gj-list gj-list-bootstrap',
            item: 'list-group-item',
            active: 'active',
            inactive: 'inactive',
            border: 'gj-tree-bootstrap-border'
        },
        icons: {
            expand: '<i class="gj-icon plus" />',
            collapse: '<i class="gj-icon minus" />'
        }
    },

    shadcn: {
        style: {
            wrapper: 'gj-unselectable gj-tree-shadcn',
            list: 'gj-list gj-list-shadcn',
            item: '',
            active: 'gj-list-shadcn-active',
            inactive: '',
            border: 'gj-tree-shadcn-border'
        }
    },

    materialicons: {
        style: {
            expander: 'gj-tree-material-icons-expander'
        }
    },

    fontawesome: {
        style: {
            expander: 'gj-tree-font-awesome-expander'
        },
        icons: {
            expand: '<i class="fa fa-plus" aria-hidden="true"></i>',
            collapse: '<i class="fa fa-minus" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        style: {
            expander: 'gj-tree-glyphicons-expander'
        },
        icons: {
            expand: '<span class="glyphicon glyphicon-plus" />',
            collapse: '<span class="glyphicon glyphicon-minus" />'
        }
    }
};
/**
  * @widget Tree
  * @plugin Base
  */
gj.tree.events = {

    /**
     * Event fires when the tree is initialized
     * @event initialized
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <button id="reload" class="gj-button-md">Reload</button>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         initialized: function (e) {
     *             alert('initialized is fired.');
     *         }
     *     });
     *     document.getElementById('reload').addEventListener('click', function() { 
     *         tree.reload();
     *     });
     * </script>
     */
    initialized: function (el) {
        el.dispatchEvent(new Event('initialized'));
    },

    /**
     * Event fired before data binding takes place.
     * @event dataBinding
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         dataBinding: function (e) {
     *             alert('dataBinding is fired.');
     *         }
     *     });
     * </script>
     */
    dataBinding: function (el) {
        el.dispatchEvent(new Event('dataBinding'));
    },

    /**
     * Event fires after the loading of the data in the tree.
     * @event dataBound
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    dataBound: function (el) {
        el.dispatchEvent(new Event('dataBound'));
    },

    /**
     * Event fires after selection of tree node.
     * @event select
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <p>Select tree node in order to fire the event.</p>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('select', function (e) {
     *         alert('select is fired for node with id=' + e.detail.id);
     *     });
     * </script>
     */
    select: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('select', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires on un selection of tree node
     * @event unselect
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <p>Select/Unselect tree node in order to fire the event.</p>
     * <ul id="tree" data-gj-source="/Locations/Get" data-gj-selection-type="multiple"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('unselect', function (e) {
     *         alert('unselect is fired for node with id=' + e.detail.id);
     *     });
     * </script>
     */
    unselect: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('unselect', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires before node expand.
     * @event expand
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('expand', function (e, node, id) {
     *         alert('expand is fired.');
     *     });
     * </script>
     */
    expand: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('expand', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires before node collapse.
     * @event collapse
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('collapse', function (e, node, id) {
     *         alert('collapse is fired.');
     *     });
     * </script>
     */
    collapse: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('collapse', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires on enable of tree node.
     * @event enable
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America</button>
     * <br/><br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     *     tree.on('enable', function (e) {
     *         alert(e.detail.node.innerText + ' is enabled.');
     *     });
     * </script>
     */
    enable: function (el, node) {
        return el.dispatchEvent(new CustomEvent('enable', { detail: { node: node } }));
    },

    /**
     * Event fires on disable of tree node.
     * @event disable
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America</button>
     * <br/><br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     *     tree.on('disable', function (e) {
     *         alert(e.detail.node.innerText + ' is disabled.');
     *     });
     * </script>
     */
    disable: function (el, node) {
        return el.dispatchEvent(new CustomEvent('disable', { detail: { node: node } }));
    },

    /**
     * Event fires before tree destroy
     * @event destroying
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.destroy()" class="gj-button-md">Destroy</button>
     * <br/><br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('destroying', function (e) {
     *         alert('destroying is fired.');
     *     });
     * </script>
     */
    destroying: function (el) {
        return el.dispatchEvent(new Event('destroying'));
    },

    /**
     * Event fires when the data is bound to node.
     * @event nodeDataBound
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @param {string} id - the id of the record
     * @param {object} record - the data of the node record
     * @example Event.Sample <!-- tree -->
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('nodeDataBound', function (e) {
     *         if ((parseInt(e.detail.id, 10) % 2) === 0) {
     *             e.detail.node.style.backgroundColor = 'red';
     *         }
     *     });
     * </script>
     */
    nodeDataBound: function (el, node, id, record) {
        return el.dispatchEvent(new CustomEvent('nodeDataBound', { detail: { node: node, id: id, record: record } }));
    }
}
/*global gj $*/
gj.tree.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);

        gj.tree.methods.initialize.call(this);

        if (this.getConfig().autoLoad) {
            this.reload();
        }
        return this;
    },

    initialize: function () {
        let data = this.getConfig(),
            wrapper = this.wrap('div');

        gj.core.addClasses(this.element, data.style.list);
        gj.core.addClasses(wrapper, data.style.wrapper);
        this.element.setAttribute('data-gj-type', this.type);
        if (data.width) {
            gj.core.css(wrapper, 'width', data.width);
        }
        if (data.border) {
            gj.core.addClasses(wrapper, data.style.border);
        }
        gj.tree.events.initialized(this.element);
    },

    useHtmlDataSource: function (tree, data) {
        data.dataSource = [];
    },

    render: function (tree, response) {
        let data;
        if (response) {
            if (typeof (response) === 'string' && JSON) {
                response = JSON.parse(response);
            }
            data = tree.getConfig();
            tree.setRecords(response);
            if (!data.primaryKey) {
                gj.tree.methods.genAutoId(data, response);
            }
            gj.tree.methods.loadData(tree);
        }
        return tree;
    },

    filter: function (tree) {
        return tree.getConfig().dataSource;
    },

    genAutoId: function (data, records) {
        let i;
        for (i = 0; i < records.length; i++) {
            records[i][data.autoGenFieldName] = data.autoGenId++;
            if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                gj.tree.methods.genAutoId(data, records[i][data.childrenField]);
            }
        }
    },

    loadData: function (tree) {
        let i, records = tree.getRecords();

        gj.tree.events.dataBinding(tree.element);
        tree.off();
        tree.element.innerHTML = '';
        for (i = 0; i < records.length; i++) {
            gj.tree.methods.appendNode(tree, tree.element, records[i], 1);
        }
        gj.tree.events.dataBound(tree.element);
    },

    appendNode: function (tree, parent, nodeData, level, position) {
        let i, node, wrapper, expander, display, spacer, newParent, span, img,
            data = tree.getConfig(),
            id = data.primaryKey ? nodeData[data.primaryKey] : nodeData[data.autoGenFieldName],
            hasChildren = typeof (nodeData[data.hasChildrenField]) !== 'undefined' && nodeData[data.hasChildrenField].toString().toLowerCase() === 'true',
            disabled = typeof (nodeData[data.disabledField]) !== 'undefined' && nodeData[data.disabledField].toString().toLowerCase() === 'true';
            
        node = document.createElement('li');
        node.setAttribute('data-gj-id', id);
        node.setAttribute('data-gj-role', 'node');
        gj.core.addClasses(node, data.style.item);
            
        wrapper = document.createElement('div');   
        wrapper.setAttribute('data-gj-role', 'wrapper');

        expander =  document.createElement('span');
        expander.setAttribute('data-gj-role', 'expander');
        expander.setAttribute('data-gj-mode', 'close');
        gj.core.addClasses(expander, data.style.expander);

        display =  document.createElement('span');
        display.setAttribute('data-gj-role', 'display');
        display.innerHTML = nodeData[data.textField];

        if (data.indentation) {
            spacer = document.createElement('span');
            spacer.setAttribute('data-gj-role', 'spacer');
            spacer.style.width = ((data.indentation * (level - 1)) / 16) + 'rem';
            wrapper.appendChild(spacer);
        }

        if (disabled) {
            gj.tree.methods.disableNode(tree, node);
        } else {
            gj.core.on(expander, 'click', gj.tree.methods.expanderClickHandler(tree));
            gj.core.on(display, 'click', gj.tree.methods.displayClickHandler(tree));
        }
        wrapper.appendChild(expander);
        wrapper.appendChild(display);
        node.appendChild(wrapper);

        if (position) {
            parent.insertBefore(node, parent.children[position - 1]);
        } else {
            parent.appendChild(node);
        }

        if (data.imageCssClassField && nodeData[data.imageCssClassField]) {
            span = document.createElement('span');
            span.setAttribute('data-gj-role', 'image');
            span.innerHTML = '<span class="' + nodeData[data.imageCssClassField] + '"></span>';
            wrapper.insertBefore(span, display);
        } else if (data.imageUrlField && nodeData[data.imageUrlField]) {
            span = document.createElement('span');
            span.setAttribute('data-gj-role', 'image');
            wrapper.insertBefore(span, display);
            img = document.createElement('img');
            img.setAttribute('src', nodeData[data.imageUrlField]);
            img.setAttribute('width', gj.core.width(span));
            img.setAttribute('height', gj.core.height(span));
            span.appendChild(img);
        } else if (data.imageHtmlField && nodeData[data.imageHtmlField]) {
            span = document.createElement('span');
            span.setAttribute('data-gj-role', 'image');
            span.innerHTML = nodeData[data.imageHtmlField];
            wrapper.insertBefore(span, display);
        }

        if ((nodeData[data.childrenField] && nodeData[data.childrenField].length) || hasChildren) {
            expander.innerHTML = data.icons.expand;
            newParent = document.createElement('ul');
            gj.core.addClasses(newParent, data.style.list + ' gj-hidden');
            node.appendChild(newParent);

            if (nodeData[data.childrenField] && nodeData[data.childrenField].length) {
                for (i = 0; i < nodeData[data.childrenField].length; i++) {
                    gj.tree.methods.appendNode(tree, newParent, nodeData[data.childrenField][i], level + 1);
                }
            }
        } else {
            data.style.leafIcon ? gj.core.addClasses(expander, data.style.leafIcon) : expander.innerHTML = '&nbsp;';
        }

        gj.tree.events.nodeDataBound(tree.element, node, nodeData.id, nodeData);
    },

    expanderClickHandler: function (tree) {
        return function (e) {
            let node = this.closest('li');
            if (this.getAttribute('data-gj-mode') === 'close') {
                tree.expand(node);
            } else {
                tree.collapse(node);
            }
        }
    },

    expand: function (tree, node, cascade) {
        let children, i,
            expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            data = tree.getConfig(),
            id = node.getAttribute('data-gj-id'),
            list = node.querySelector('ul');

        if (gj.tree.events.expand(tree.element, node, id) !== false && list) {
            list.style.display = 'block';
            expander.setAttribute('data-gj-mode', 'open');
            expander.innerHTML = data.icons.collapse;
            if (cascade) {
                children = node.querySelectorAll('ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.expand(tree, children[i], cascade);
                }
            }
        }
        return tree;
    },

    collapse: function (tree, node, cascade) {
        let children, i,
            expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            data = tree.getConfig(),
            id = node.getAttribute('data-gj-id'),
            list = node.querySelector('ul');

        if (gj.tree.events.collapse(tree.element, node, id) !== false && list) {
            list.style.display = 'none';
            expander.setAttribute('data-gj-mode', 'close');
            expander.innerHTML = data.icons.expand;
            if (cascade) {
                children = node.querySelectorAll('ul>li>[data-gj-role="wrapper"]>span[data-gj-mode="open"]');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.collapse(tree, children[i], cascade);
                }
            }
        }
        return tree;
    },

    expandAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.expand(tree, nodes[i], true);
        }
        return tree;
    },

    collapseAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.collapse(tree, nodes[i], true);
        }
        return tree;
    },

    displayClickHandler: function (tree) {
        return function () {
            let display = this,
                node = display.closest('li'),
                data = tree.getConfig()
                cascade = data.cascadeSelection;
            if (node.getAttribute('data-gj-selected') === 'true') {
                gj.tree.methods.unselect(tree, node, cascade);
            } else {
                if (data.selectionType === 'single') {
                    gj.tree.methods.unselectAll(tree);
                }
                gj.tree.methods.select(tree, node, cascade);
            }
        }
    },

    selectAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.select(tree, nodes[i], true);
        }
        return tree;
    },

    select: function (tree, node, cascade) {
        let data = tree.getConfig(),
            allowEvent = gj.tree.events.select(tree.element, node, node.getAttribute('data-gj-id')) !== false && !node.classList.contains('disabled');
        if (node.getAttribute('data-gj-selected') !== 'true' && allowEvent) {
            gj.core.removeClasses(node, data.style.inactive);
            gj.core.addClasses(node, data.style.active);
            node.setAttribute('data-gj-selected', 'true');
        }
        if (cascade && allowEvent) {
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].tagName.toUpperCase() === 'UL') {
                    for (let j = 0; j < node.children[i].children.length; j++) {
                        if (node.children[i].children[j].tagName.toUpperCase() === 'LI') {
                            gj.tree.methods.select(tree, node.children[i].children[j], cascade);
                        }
                    }
                }
            }
        }
    },
    
    unselectAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.unselect(tree, nodes[i], true);
        }
        return tree;
    },

    unselect: function (tree, node, cascade) {
        let data = tree.getConfig(),
            allowEvent = gj.tree.events.unselect(tree.element, node, node.getAttribute('data-gj-id')) !== false && !node.classList.contains('disabled');
        if (node.getAttribute('data-gj-selected') === 'true' && allowEvent) {
            gj.core.removeClasses(node, data.style.active);
            gj.core.addClasses(node, data.style.inactive);
            node.removeAttribute('data-gj-selected');
        }
        if (cascade && allowEvent) {
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].tagName.toUpperCase() === 'UL') {
                    for (let j = 0; j < node.children[i].children.length; j++) {
                        if (node.children[i].children[j].tagName.toUpperCase() === 'LI') {
                            gj.tree.methods.unselect(tree, node.children[i].children[j], cascade);
                        }
                    }
                }
            }
        }
    },

    getSelections: function (list) {
        let result = [],
            nodes = list.querySelectorAll('li');
        if (nodes && nodes.length) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].getAttribute('data-gj-selected') === 'true') {
                    result.push(nodes[i].getAttribute('data-gj-id'));
                }
            }
        }

        return result;
    },

    getDataById: function (tree, id, records) {
        let i, data = tree.getConfig(), result = undefined;
        for (i = 0; i < records.length; i++) {
            if (data.primaryKey && records[i][data.primaryKey] == id) {
                result = records[i];
                break;
            } else if (records[i][data.autoGenFieldName] == id) {
                result = records[i];
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                result = gj.tree.methods.getDataById(tree, id, records[i][data.childrenField]);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getDataByText: function (tree, text, records) {
        let i, id,
            result = undefined,
            data = tree.getConfig();
        for (i = 0; i < records.length; i++) {
            if (text === records[i][data.textField]) {
                result = records[i];
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                result = gj.tree.methods.getDataByText(tree, text, records[i][data.childrenField]);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getNodeById: function (list, id) {
        let i, node,
            result = undefined,
            nodes = list.querySelectorAll('li');
        if (nodes && nodes.length) {
            for (i = 0; i < nodes.length; i++) {
                node = nodes[i];
                if (id == node.getAttribute('data-gj-id')) {
                    result = node;
                    break;
                }
            }
        }
        return result;
    },

    getNodeByText: function (list, text) {
        let i, node,
            result = undefined,
            nodes = list.querySelectorAll('li');
        if (nodes && nodes.length) {
            for (i = 0; i < nodes.length; i++) {
                node = nodes[i];
                if (text === gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="display"]').innerText) {
                    result = node;
                    break;
                }
            }
        }
        return result;
    },

    addNode: function (tree, nodeData, parent, position) {
        let level, record, records, data = tree.getConfig();

        if (!parent) {
            parent = tree.element;
            records = tree.getRecords();
            records.push(nodeData)
            tree.setRecords(records);
        } else {
            if (parent.tagName.toUpperCase() === 'LI') {
                if (!parent.querySelector('ul')) {
                    parent.querySelector('[data-gj-role="expander"]').innerHTML = data.icons.collapse;
                    parent.appendChild(gj.core.addClasses(document.createElement('ul'), data.style.list));
                }
                parent = parent.querySelector('ul');
            }
            record = tree.getDataById(parent.parentNode.getAttribute('data-gj-id'));
            if (!record[data.childrenField]) {
                record[data.childrenField] = [];
            }
            record[data.childrenField].push(nodeData);
        }
        level = gj.tree.methods.getLevel(parent);
        if (!data.primaryKey) {
            gj.tree.methods.genAutoId(data, [nodeData]);
        }

        gj.tree.methods.appendNode(tree, parent, nodeData, level, position);

        return tree;
    },

    getLevel: function(node) {
        let count = 1, el = node.parentNode;
        while (el && (el.getAttribute('data-gj-type') !== 'tree') && (node.getAttribute('data-gj-type') !== 'tree')) {
            count++;
            el = el.parentNode;
        }
        return count;
    },

    remove: function (tree, node) {
        gj.tree.methods.removeDataById(tree, node.getAttribute('data-gj-id'), tree.getRecords());
        node.remove();
        return tree;
    },

    removeDataById: function (tree, id, records) {
        let i, data = tree.getConfig();
        for (i = 0; i < records.length; i++) {
            if (data.primaryKey && records[i][data.primaryKey] == id) {
                records.splice(i, 1);
                break;
            } else if (records[i][data.autoGenFieldName] == id) {
                records.splice(i, 1);
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                gj.tree.methods.removeDataById(tree, id, records[i][data.childrenField]);
            }
        }
    },

    update: function (tree, id, newRecord) {
        let data = tree.getConfig(),
            node = tree.getNodeById(id),
            oldRecord = tree.getDataById(id);
        oldRecord = newRecord;
        node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="display"]').innerHTML = newRecord[data.textField];
        gj.tree.events.nodeDataBound(tree.element, node, id, newRecord);
        return tree;
    },

    getChildren: function (node, cascade) {
        let result = [], i, children;
        
        cascade = typeof (cascade) === 'undefined' ? true : cascade;
        if (cascade) {
            children = node.querySelectorAll('ul>li');
        } else {
            children = gj.core.selectAll(node, 'ul>li');
        }

        for (i = 0; i < children.length; i++) {
            result.push(children[i].getAttribute('data-gj-id'));
        }

        return result;
    },

    enableAll: function (tree) {
        let i, children = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < children.length; i++) {
            gj.tree.methods.enableNode(tree, children[i], true);
        }
        return tree;
    },

    enableNode: function (tree, node, cascade) {
        let i, children,
            expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            display = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="display"]');
        
        if (expander && display) {
            cascade = typeof (cascade) === 'undefined' ? true : cascade;
            node.classList.remove('disabled');
            gj.core.on(expander, 'click', gj.tree.methods.expanderClickHandler(tree));
            gj.core.on(display, 'click', gj.tree.methods.displayClickHandler(tree));
            gj.tree.events.enable(tree.element, node);
            if (cascade) {
                children = gj.core.selectAll(node, 'ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.enableNode(tree, children[i], cascade);
                }
            }
        }
    },

    disableAll: function (tree) {
        let i, children = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < children.length; i++) {
            gj.tree.methods.disableNode(tree, children[i], true);
        }
        return tree;
    },

    disableNode: function (tree, node, cascade) {
        let i, children,
            expander = node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            display = node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="display"]');
        
        if (expander && display) {
            cascade = typeof (cascade) === 'undefined' ? true : cascade;
            node.classList.add('disabled');
            gj.core.off(expander, 'click');
            gj.core.off(display, 'click');
            gj.tree.events.disable(tree.element, node);
            if (cascade) {
                children = gj.core.selectAll(node, 'ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.disableNode(tree, children[i], cascade);
                }
            }
        }
    },

    destroy: function (tree) {
        let data = tree.getConfig();
        if (data) {
            gj.tree.events.destroying(tree.element);
            tree.xhr && tree.xhr.abort();
            tree.off();
            tree.removeConfig();
            grid.removeRecords();
            grid.removeTotalRecords();
            tree.element.removeAttribute('data-gj-guid');
            tree.element.removeAttribute('data-gj-type');
            tree.element.setAttribute('class', '');
            tree.element.innerHTML = '';
        }
        return tree;
    },

    pathFinder: function (data, list, id, parents) {
        let i, result = false;

        for (i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                result = true;
                break;
            } else if (list[i][data.childrenField] && gj.tree.methods.pathFinder(data, list[i][data.childrenField], id, parents)) {
                parents.push(list[i][data.textField]);
                result = true;
                break;
            }
        }

        return result;
    }
}
/**
  * @widget Tree
  * @plugin Base
  */
GijgoTree = function (element, jsConfig) {
    var self = this,
        methods = gj.tree.methods;

    self.type = 'tree';
    self.element = element;

    /**
     * Reload the tree.
     * @method
     * @param {object} params - Params that needs to be send to the server. Only in use for remote data sources.
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <button onclick="tree.reload()" class="gj-button-md">Click to load</button>
     * <br/><br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         autoLoad: false
     *     });
     * </script>
     * @example Search <!-- tree -->
     * <input type="text" id="query" /> <button onclick="Search()">Search</button>
     * <br/><br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function Search() {
     *         tree.reload({ query: document.getElementById('query').value });
     *     }
     * </script>
     */
    self.reload = function (params) {
        return gj.widget.prototype.reload.call(this, params);
    };

    /**
     * Render data in the tree
     * @method
     * @param {object} response - An object that contains the data that needs to be loaded in the tree.
     * @fires dataBinding, dataBound
     * @return tree
     * @example sample <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     var tree, onSuccessFunc;
     *     onSuccessFunc = function () {
     *         //you can modify the response here if needed
     *         tree.render(this.response);
     *     };
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: { url: '/Locations/Get', success: onSuccessFunc }
     *     });
     * </script>
     */
    self.render = function (response) {
        return methods.render(this, response);
    };

    /**
     * Add node to the tree.
     * @method
     * @param {object} data - The node data.
     * @param {object} parentNode - Parent node as html element object.
     * @param {Number} position - Position where the new node need to be added. 
     * @return html element object
     * @example Append.ToRoot <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Append To Root</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     function append() {
     *         tree.addNode({ text: 'New Node' });
     *     }
     * </script>
     * @example Append.Parent <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Append To Asia</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var parent, tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent);
     *     }
     * </script>
     * @example Bootstrap <!-- bootstrap, tree -->
     * <button onclick="append()" class="btn btn-default">Append To Asia</button>
     * <br/><br/>
     * <div id="tree" data-gj-source="/Locations/Get" data-gj-ui-library="bootstrap"></div>
     * <script>
     *     var parent, tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent);
     *     }
     * </script>
     * @example Prepend <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Prepend in Asia</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var parent, tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent, 1);
     *     }
     * </script>
     * @example Position <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Append to Asia as second</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var parent, tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent, 2);
     *     }
     * </script>
     */
    self.addNode = function (data, parentNode, position) {
        return methods.addNode(this, data, parentNode, position);
    };

    /**
     * Remove node from the tree.
     * @method
     * @param {object} node - The node as html element object
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <button onclick="remove()" class="gj-button-md">Remove USA</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function remove() {
     *         var node = tree.getNodeByText('USA');
     *         tree.removeNode(node);
     *     }
     * </script>
     */
    self.removeNode = function (node) {
        return methods.remove(this, node);
    };

    /**
     * Update node from the tree.
     * @method
     * @param {string} id - The id of the node that needs to be updated
     * @param {object} record - The node as html element object
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <input type="text" id="nodeName" />
     * <button onclick="save()" class="gj-button-md">Save</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         primaryKey: 'id',
     *         dataSource: '/Locations/Get'
     *     });
     *     tree.on('select', function (e) {
     *         document.getElementById('nodeName').value = tree.getDataById(e.detail.id).text;
     *     });
     *     function save() {
     *         var id = tree.getSelections()[0],
     *             record = tree.getDataById(id);
     *         record.text = document.getElementById('nodeName').value;
     *         tree.updateNode(id, record);
     *     }
     * </script>
     */
    self.updateNode = function (id, record) {
        return methods.update(this, id, record);
    };

    /**
     * Destroy the tree.
     * @method
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <button onclick="tree.destroy()" class="gj-button-md">Destroy</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /**
     * Expand node from the tree.
     * @method
     * @param {object} node - The node as html element object
     * @param {boolean} cascade - Expand all children
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <button onclick="expand()" class="gj-button-md">Expand Asia</button>
     * <button onclick="collapse()" class="gj-button-md">Collapse Asia</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.expand(node);
     *     }
     *     function collapse() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.collapse(node);
     *     }
     * </script>
     * @example Cascade <!-- tree -->
     * <button onclick="expand()" class="gj-button-md">Expand North America</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('North America');
     *         tree.expand(node, true);
     *     }
     * </script>
     */
    self.expand = function (node, cascade) {
        return methods.expand(this, node, cascade);
    };

    /**
     * Collapse node from the tree.
     * @method
     * @param {object} node - The node as html element object
     * @param {boolean} cascade - Collapse all children
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <button onclick="expand()" class="gj-button-md">Expand Asia</button>
     * <button onclick="collapse()" class="gj-button-md">Collapse Asia</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.expand(node);
     *     }
     *     function collapse() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.collapse(node);
     *     }
     * </script>
     * @example Cascade <!-- tree -->
     * <button onclick="collapse()" class="gj-button-md">Collapse North America</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function collapse() {
     *         var node = tree.getNodeByText('North America');
     *         tree.collapse(node, true);
     *     }
     * </script>
     */
    self.collapse = function (node, cascade) {
        return methods.collapse(this, node, cascade);
    };

    /**
     * Expand all tree nodes
     * @method
     * @return html element object
     * @example Sample <!-- tree -->
     * <button onclick="tree.expandAll()" class="gj-button-md">Expand All</button>
     * <button onclick="tree.collapseAll()" class="gj-button-md">Collapse All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     * </script>
     */
    self.expandAll = function () {
        return methods.expandAll(this);
    };

    /**
     * Collapse all tree nodes
     * @method
     * @return html element object
     * @example Sample <!-- tree -->
     * <button onclick="tree.expandAll()" class="gj-button-md">Expand All</button>
     * <button onclick="tree.collapseAll()" class="gj-button-md">Collapse All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     * </script>
     */
    self.collapseAll = function () {
        return methods.collapseAll(this);
    };

    /**
     * Return node data by id of the record.
     * @method
     * @param {string|number} id - The id of the record that needs to be returned
     * @return object
     * @example sample <!-- tree -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         primaryKey: 'id' //define the name of the column that you want to use as ID here.
     *     });
     *     document.getElementById('btnGetData').addEventListener('click', function () {
     *         var data = tree.getDataById(9);
     *         alert('The population of ' + data.text + ' is ' + data.population);
     *     });
     * </script>
     */
    self.getDataById = function (id) {
        return methods.getDataById(this, id, this.getRecords());
    };

    /**
     * Return node data by text.
     * @method
     * @param {string} text - The text of the record that needs to be returned
     * @return object
     * @example sample <!-- tree -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *     });
     *     document.getElementById('btnGetData').addEventListener('click', function () {
     *         var data = tree.getDataByText('California');
     *         alert('The population of California is ' + data.population);
     *     });
     * </script>
     */
    self.getDataByText = function (text) {
        return methods.getDataByText(this, text, this.getRecords());
    };

    /**
     * Return node by id of the record.
     * @method
     * @param {string} id - The id of the node that needs to be returned
     * @return html element object
     * @example sample <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         primaryKey: 'id' //define the name of the column that you want to use as ID here.
     *     });
     *     tree.on('dataBound', function() {
     *         var node = tree.getNodeById('1');
     *         node.style.backgroundColor = 'red';
     *     });
     * </script>
     */
    self.getNodeById = function (id) {
        return methods.getNodeById(this.element, id);
    };

    /**
     * Return node by text.
     * @method
     * @param {string} text - The text in the node that needs to be returned
     * @return html element object
     * @example sample <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     tree.on('dataBound', function() {
     *         var node = tree.getNodeByText('Asia');
     *         node.style.backgroundColor = 'red';
     *     });
     * </script>
     */
    self.getNodeByText = function (text) {
        return methods.getNodeByText(this.element, text);
    };

    /**
     * Return an array with all records presented in the tree.
     * @method
     * @return Array
     * @example sample <!-- tree -->
     * <button onclick="alert(JSON.stringify(tree.getAll()))" class="gj-button-md">Get All Data</button>
     * <button onclick="tree.addNode({ text: 'New Node' });" class="gj-button-md">Add New Node</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ]
     *     });
     * </script>
     */
    self.getAll = function () {
        return this.getRecords();
    };

    /**
     * Select node from the tree.
     * @method
     * @param {Object} node - The node as html element object.
     * @return html element object
     * @example Select.Method <!-- tree -->
     * <button onclick="tree.select(northAmerica)" class="gj-button-md">Select North America</button>
     * <button onclick="tree.unselect(northAmerica)" class="gj-button-md">Unselect North America</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         primaryKey: 'id',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         },
     *         select: function (e) {
     *             alert('select is fired for node with id=' + e.detail.id);
     *         }
     *     });
     * </script>
     */
    self.select = function (node) {
        return methods.select(this, node);
    };

    /**
     * Unselect node from the tree.
     * @method
     * @param {Object} node - The node as html element object.
     * @return html element object
     * @example UnSelect.Method <!-- tree -->
     * <button onclick="tree.select(northAmerica)" class="gj-button-md">Select North America</button>
     * <button onclick="tree.unselect(northAmerica)" class="gj-button-md">Unselect North America</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         primaryKey: 'id',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');  
     *         },
     *         unselect: function (e) {
     *             alert('unselect is fired for node with id=' + e.detail.id);
     *         }
     *     });
     * </script>
     */
    self.unselect = function (node) {
        return methods.unselect(this, node);
    };

    /**
     * Select all tree nodes
     * @method
     * @return html element object
     * @example Sample <!-- tree -->
     * <button onclick="tree.selectAll()" class="gj-button-md">Select All</button>
     * <button onclick="tree.unselectAll()" class="gj-button-md">Unselect All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         selectionType: 'multiple'
     *     });
     *     tree.on('dataBound', function() {
     *         tree.expandAll();
     *     });
     * </script>
     */
    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all tree nodes
     * @method
     * @return html element object
     * @example Sample <!-- tree -->
     * <button onclick="tree.selectAll()" class="gj-button-md">Select All</button>
     * <button onclick="tree.unselectAll()" class="gj-button-md">Unselect All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         selectionType: 'multiple'
     *     });
     *     tree.on('dataBound', function() {
     *         tree.expandAll();
     *     });
     * </script>
     */
    self.unselectAll = function () {
        return methods.unselectAll(this);
    };

    /**
     * Return an array with the ids of the selected nodes.
     * @method
     * @return array
     * @example Sample <!-- tree -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selections</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         selectionType: 'multiple'
     *     });
     *     document.getElementById('btnShowSelection').addEventListener('click', function () {
     *         var selections = tree.getSelections();
     *         selections && selections.length && alert(selections.join());
     *     });
     * </script>
     */
    self.getSelections = function () {
        return methods.getSelections(this.element);
    };

    /**
     * Return an array with the ids of all children.
     * @method
     * @param {Object} node - The node as html element object.
     * @param {Boolean} cascade - Include all nested children. Set to true by default.
     * @return array
     * @example Cascade.True <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         dataBound: function () {
     *             var node = tree.getNodeByText('North America'),
     *                 children = tree.getChildren(node);
     *             alert(children.join());
     *         }
     *     });
     * </script>
     * @example Cascade.False <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         dataBound: function () {
     *             var node = tree.getNodeByText('North America'),
     *                 children = tree.getChildren(node, false);
     *             alert(children.join());
     *         }
     *     });
     * </script>
     */
    self.getChildren = function (node, cascade) {
        return methods.getChildren(node, cascade);
    };

    /**
     * Return an array with the names of all parents.
     * @method
     * @param {String} id - The id of the target node
     * @return array
     * @example sample <!-- tree -->
     * Location: <div id="location" style="display: inline-block;"></div>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         primaryKey: 'id',
     *         select: function (e) {
     *             var parents = tree.parents(e.detail.id);
     *             document.getElementById('location').innerHTML = parents.join(' / ') + ' / ' + tree.getDataById(e.detail.id).text;
     *         }
     *     });
     * </script>
     */
    self.parents = function (id) {
        var parents = [];
        methods.pathFinder(this.getConfig(), this.getRecords(), id, parents);
        return parents.reverse();
    };

    /**
     * Enable node from the tree.
     * @method
     * @param {Object} node - The node as html element object.
     * @param {Boolean} cascade - Enable all children. Set to true by default.
     * @return html element object
     * @example Material.Design <!-- checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="gj-button-md">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="gj-button-md">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America (Non-Cascade)</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     * @example Bootstrap <!-- bootstrap, checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="btn btn-default">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="btn btn-default">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="btn btn-default">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="btn btn-default">Disable North America (Non-Cascade)</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         uiLibrary: 'bootstrap',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     * @example Bootstrap.4 <!-- bootstrap4, fontawesome, checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="btn btn-default">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="btn btn-default">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="btn btn-default">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="btn btn-default">Disable North America (Non-Cascade)</button>
     * <br/><br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         uiLibrary: 'bootstrap4',
     *         iconsLibrary: 'fontawesome',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     * @example Bootstrap.5 <!-- bootstrap5, fontawesome, checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="btn btn-default">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="btn btn-default">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="btn btn-default">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="btn btn-default">Disable North America (Non-Cascade)</button>
     * <br/><br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         uiLibrary: 'bootstrap5',
     *         iconsLibrary: 'fontawesome',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     */
    self.enable = function (node, cascade) {
        return methods.enableNode(this, node, cascade);
    };

    /**
     * Enable all nodes from the tree.
     * @method
     * @return html element object
     * @example Sample <!-- checkbox, tree -->
     * <button onclick="tree.enableAll()" class="gj-button-md">Enable All</button>
     * <button onclick="tree.disableAll()" class="gj-button-md">Disable All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true
     *     });
     * </script>
     */
    self.enableAll = function () {
        return methods.enableAll(this);
    };

    /**
     * Disable node from the tree.
     * @method
     * @param {Object} node - The node as html element object.
     * @param {Boolean} cascade - Disable all children. Set to true by default.
     * @return html element object
     * @example Sample <!-- checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="gj-button-md">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="gj-button-md">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America (Non-Cascade)</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     */
    self.disable = function (node, cascade) {
        return methods.disableNode(this, node, cascade);
    };

    /**
     * Disable all nodes from the tree.
     * @method
     * @return html element object
     * @example Sample <!-- checkbox, tree -->
     * <button onclick="tree.enableAll()" class="gj-button-md">Enable All</button>
     * <button onclick="tree.disableAll()" class="gj-button-md">Disable All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true
     *     });
     * </script>
     */
    self.disableAll = function () {
        return methods.disableAll(this);
    };

    if ('tree' !== element.getAttribute('data-gj-type')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoTree.prototype = new gj.widget();
GijgoTree.constructor = GijgoTree;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.tree = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoTree(this, method);
                } else {
                    widget = new GijgoTree(this, null);
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
 * @widget Tree 
 * @plugin Checkboxes
 */
gj.tree.plugins.checkboxes = {
    config: {
        base: {
            /** Add checkbox for each node, if set to true.
              * @type Boolean
              * @default undefined
              * @example Material.Design <!-- checkbox, tree -->
              * <ul id="tree"></ul>
              * <script>
              *     let tree = new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         checkboxes: true
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, checkbox, tree -->
              * <ul id="tree"></ul>
              * <script>
              *     let tree = new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap'
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, checkbox, tree -->
              * <ul id="tree"></ul>
              * <script>
              *     let tree = new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap4'
              *     });
              * </script>
              * @example Bootstrap.5 <!-- bootstrap5, checkbox, tree -->
              * <ul id="tree"></ul>
              * <script>
              *     let tree = new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap5'
              *     });
              * </script>
              */
            checkboxes: undefined,

            /** Name of the source field, that indicates if the checkbox is checked.
             * @type string
             * @default 'checked'
             * @example Custom.Name <!-- checkbox, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     let tree = new GijgoTree(document.getElementById('tree'), {
             *         checkboxes: true,
             *         checkedField: 'checkedFieldName',
             *         dataSource: [ { text: 'foo', checkedFieldName: false, children: [ { text: 'bar', checkedFieldName: true }, { text: 'bar2', checkedFieldName: false } ] }, { text: 'foo2', children: [ { text: 'bar2' } ] } ]
             *     });
             * </script>
             */
            checkedField: 'checked',

            /** This setting enable cascade check and uncheck of children
             * @type boolean
             * @default true
             * @example False.Remote.DataSource <!-- checkbox, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     let tree = new GijgoTree(document.getElementById('tree'), {
             *         checkboxes: true,
             *         dataSource: '/Locations/Get',
             *         cascadeCheck: false
             *     });
             *     tree.on('dataBound', function() {
             *         tree.expandAll();
             *     });
             * </script>
             * @example False.Local.DataSource <!-- checkbox, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     let tree = new GijgoTree(document.getElementById('tree'), {
             *         checkboxes: true,
             *         dataSource: [ { text: 'foo', checked: true, children: [ { text: 'bar', checked: true }, { text: 'bar2', checked: false } ] }, { text: 'foo2', checked: true, children: [ { text: 'bar2', checked: false } ] } ],
             *         cascadeCheck: false
             *     });
             * </script>
             * @example True <!-- checkbox, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     let tree = new GijgoTree(document.getElementById('tree'), {
             *         checkboxes: true,
             *         dataSource: '/Locations/Get',
             *         cascadeCheck: true
             *     });
             *     tree.on('dataBound', function() {
             *         tree.expandAll();
             *     });
             * </script>
             */
            cascadeCheck: true,
        }
    },

    private: {
        dataBound: function (tree) {
            let nodes, chkb, state;
            if (tree.getConfig().cascadeCheck) {
                nodes = tree.element.querySelectorAll('li[data-gj-role="node"]');
                for (const node of nodes) {
                    chkb = node.querySelector('[data-gj-role="checkbox"] input[type="checkbox"]');
                    if (chkb) {
                        state = gj.checkbox.methods.state(chkb);
                        if (state === 'checked') {
                            gj.tree.plugins.checkboxes.private.updateChildrenState(node, state);
                            gj.tree.plugins.checkboxes.private.updateParentState(node, state);
                        }
                    }
                }
            }
        },

        nodeDataBound: function (tree, node, id, record) {
            let data, expander, checkbox, wrapper, disabled;
            
            if (!gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="checkbox"]'))
            {
                data = tree.getConfig();
                expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="display"]');
                checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                wrapper = document.createElement('span');
                wrapper.setAttribute('data-gj-role', 'checkbox');
                wrapper.appendChild(checkbox);
                expander.parentNode.insertBefore(wrapper, expander);
                disabled = typeof (record[data.disabledField]) !== 'undefined' && record[data.disabledField].toString().toLowerCase() === 'true';

                checkbox = new GijgoCheckBox(checkbox, {
                    uiLibrary: data.uiLibrary,
                    iconsLibrary: data.iconsLibrary,
                    change: function (e) {
                        let state = gj.checkbox.methods.state(e.target);
                        gj.tree.plugins.checkboxes.events.checkboxChange(tree.element, node, record, state);
                    }
                });
                if (disabled) {
                    checkbox.element.disabled = true;
                }
                record[data.checkedField] && checkbox.state('checked');
                checkbox.on('click', function (e) {
                    let node = this.closest('li'),
                        state = gj.checkbox.methods.state(this);
                    if (data.cascadeCheck) {
                        gj.tree.plugins.checkboxes.private.updateChildrenState(node, state);
                        gj.tree.plugins.checkboxes.private.updateParentState(node, state);
                    }
                });
            }
        },

        updateParentState: function (node, state) {
            let parentNode, parentCheckbox, siblingCheckboxes, allChecked, allUnchecked, parentState;

            parentNode = node.parentNode.parentNode;
            if (parentNode && parentNode.getAttribute('data-gj-role') === 'node') {
                parentCheckbox = parentNode.querySelector('[data-gj-role="wrapper"] > [data-gj-role="checkbox"] input[type="checkbox"]');
                siblingCheckboxes = node.parentNode.querySelectorAll('[data-gj-role="wrapper"] > span[data-gj-role="checkbox"] input[type="checkbox"]');
                allChecked = (state === 'checked');
                allUnchecked = (state === 'unchecked');
                parentState = 'indeterminate';
                for (const chkb of siblingCheckboxes) {
                    let state = gj.checkbox.methods.state(chkb);
                    if (allChecked && state !== 'checked') {
                        allChecked = false;
                    }
                    if (allUnchecked && state !== 'unchecked') {
                        allUnchecked = false;
                    }
                };
                if (allChecked && !allUnchecked) {
                    parentState = 'checked';
                }
                if (!allChecked && allUnchecked) {
                    parentState = 'unchecked';
                }
                gj.checkbox.methods.state(parentCheckbox, parentState);
                gj.tree.plugins.checkboxes.private.updateParentState(parentNode, parentState);
            }
        },

        updateChildrenState: function (node, state) {
            let childrenCheckboxes = node.querySelectorAll('ul li [data-gj-role="wrapper"] [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const chkb of childrenCheckboxes) {
                gj.checkbox.methods.state(chkb, state);
            }
        },

        update: function (tree, node, state) {
            let checkbox = node.querySelector('[data-gj-role="checkbox"] input[type="checkbox"]');
            gj.checkbox.methods.state(checkbox, state);
            if (tree.getConfig().cascadeCheck) {
                gj.tree.plugins.checkboxes.private.updateChildrenState(node, state);
                gj.tree.plugins.checkboxes.private.updateParentState(node, state);
            }
        }
    },

    public: {

        /** Get ids of all checked nodes
         * @method
         * @return Array
         * @example Base.Theme <!-- checkbox, tree -->
         * <button id="btnGet" class="gj-button-md">Get Checked Nodes</button>
         * <ul id="tree"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         checkboxes: true
         *     });
         *     document.getElementById('btnGet').addEventListener('click', function() {
         *         let result = tree.getCheckedNodes();
         *         alert(result.join());
         *     });
         * </script>
         */
        getCheckedNodes: function () {
            let result = [],
                checkboxes = this.element.querySelectorAll('li [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const checkbox of checkboxes) {
                if (gj.checkbox.methods.state(checkbox) === 'checked') {
                    result.push(checkbox.closest('li').getAttribute('data-gj-id'));
                }
            };
            return result;
        },

        /**
         * Check all tree nodes
         * @method
         * @return tree as html element object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.checkAll()" class="gj-button-md">Check All</button>
         * <button onclick="tree.uncheckAll()" class="gj-button-md">Uncheck All</button>
         * <br/><br/>
         * <ul id="tree" data-gj-source="/Locations/Get"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        checkAll: function () {
            let checkboxes = this.element.querySelectorAll('li [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const checkbox of checkboxes) {
                gj.checkbox.methods.state(checkbox, 'checked');
            };
            return this;
        },

        /**
         * Uncheck all tree nodes
         * @method
         * @return tree as html element object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.checkAll()" class="gj-button-md">Check All</button>
         * <button onclick="tree.uncheckAll()" class="gj-button-md">Uncheck All</button>
         * <br/><br/>
         * <ul id="tree" data-gj-source="/Locations/Get"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        uncheckAll: function () {
            let checkboxes = this.element.querySelectorAll('li [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const checkbox of checkboxes) {
                gj.checkbox.methods.state(checkbox, 'unchecked');
            };
            return this;
        },

        /**
         * Check tree node.
         * @method
         * @param {object} node - The node as html element object
         * @return tree as html element object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.check(tree.getNodeByText('China'))" class="gj-button-md">Check China</button>
         * <br/>
         * <ul id="tree" data-gj-source="/Locations/Get"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        check: function (node) {
            gj.tree.plugins.checkboxes.private.update(this, node, 'checked');
            return this;
        },

        /**
         * Uncheck tree node.
         * @method
         * @param {object} node - The node as html element object
         * @return tree as html element object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.uncheck(tree.getNodeByText('China'))" class="gj-button-md">UnCheck China</button>
         * <br/>
         * <ul id="tree" data-gj-source="/Locations/Get"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *         tree.check(tree.getNodeByText('China'));
         *     });
         * </script>
         */
        uncheck: function (node) {
            gj.tree.plugins.checkboxes.private.update(this, node, 'unchecked');
            return this;
        }
    },

    events: {
        /**
         * Event fires when the checkbox state is changed.
         * @event checkboxChange
         * @param {object} e - event data
         * @param {object} e.detail.node - the node object as html element
         * @param {object} e.detail.record - the record data
         * @param {string} e.detail.state - the new state of the checkbox
         * @example Event.Sample <!-- checkbox, tree -->
         * <ul id="tree" data-gj-source="/Locations/Get" data-gj-checkboxes="true"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'));
         *     tree.on('checkboxChange', function (e) {
         *         alert('The new state of record ' + e.detail.record.text + ' is ' + e.detail.state);
         *     });
         * </script>
         */
        checkboxChange: function (el, node, record, state) {
            return el.dispatchEvent(new CustomEvent('checkboxChange', { detail: { node: node, record: record, state: state } }));
        }
    },

    configure: function (tree) {
        if (tree.getConfig().checkboxes && gj.checkbox) {
            tree.extend(tree, gj.tree.plugins.checkboxes.public);
            tree.on('nodeDataBound', function (e) {
                gj.tree.plugins.checkboxes.private.nodeDataBound(tree, e.detail.node, e.detail.id, e.detail.record);
            });
            tree.on('dataBound', function () {
                gj.tree.plugins.checkboxes.private.dataBound(tree);
            });
            tree.on('enable', function (e) {
                let checkbox = e.detail.node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="checkbox"] input[type="checkbox"]');
                if (checkbox) {
                    checkbox.disabled = false;
                }
            });
            tree.on('disable', function (e) {
                let checkbox = e.detail.node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="checkbox"] input[type="checkbox"]');
                if (checkbox) {
                    checkbox.disabled = true;
                }
            });
        }
    }
};

/**
 * @widget Tree
 * @plugin DragAndDrop
 */
gj.tree.plugins.dragAndDrop = {
	config: {
		base: {
			/** Enables drag and drop functionality for each node.
              * @type Boolean
              * @default undefined
              * @example Material.Design <!-- draggable, droppable, tree -->
              * <h3>Drag and Drop Tree Nodes</h3>
              * <ul id="tree"></ul>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, draggable, droppable, tree -->
              * <div class="container">
              *     <h3>Drag and Drop Tree Nodes</h3>
              *     <ul id="tree"></ul>
              * </div>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true,
              *         uiLibrary: 'bootstrap'
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, draggable, droppable, tree -->
              * <div class="container">
              *     <h3>Drag and Drop Tree Nodes</h3>
              *     <ul id="tree"></ul>
              * </div>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true,
              *         uiLibrary: 'bootstrap4'
              *     });
              * </script>
              */
			dragAndDrop: undefined,

			style: {
			    dragEl: 'gj-tree-drag-el gj-tree-md-drag-el',
                dropAsChildIcon: 'gj-cursor-pointer gj-icon plus',
			    dropAbove: 'gj-tree-drop-above',
			    dropBelow: 'gj-tree-drop-below'
			}
        },

        bootstrap: {
            style: {
                dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
                dropAsChildIcon: 'glyphicon glyphicon-plus',
                dropAbove: 'drop-above',
                dropBelow: 'drop-below'
            }
        },

        bootstrap4: {
            style: {
                dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
                dropAsChildIcon: 'gj-cursor-pointer gj-icon plus',
                dropAbove: 'drop-above',
                dropBelow: 'drop-below'
            }
        }
	},

	private: {
	    nodeDataBound: function (tree, node) {
	        let wrapper = node.querySelector('>[data-gj-role="wrapper"]'),
    	        display = node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="display"]');
            if (wrapper && display) {
                display.addEventListener('mousedown', gj.tree.plugins.dragAndDrop.private.createNodeMouseDownHandler(tree));
                display.addEventListener('mousemove', gj.tree.plugins.dragAndDrop.private.createNodeMouseMoveHandler(tree, node, display));
                display.addEventListener('mouseup', gj.tree.plugins.dragAndDrop.private.createNodeMouseUpHandler(tree));
		    }
        },

        createNodeMouseDownHandler: function (tree) {
            return function (e) {
                tree.element.setAttribute('data-gj-drag-ready', true);
            }
        },

        createNodeMouseUpHandler: function (tree) {
            return function (e) {
                tree.element.setAttribute('data-gj-drag-ready', false);
            }
        },

	    createNodeMouseMoveHandler: function (tree, node, display) {
            return function (e) {
                if (tree.element.getAttribute('data-gj-drag-ready') === 'true') {
                    let data = tree.getConfig(), dragEl, wrapper, ul, li, indicator, offsetTop, offsetLeft;

                    tree.element.setAttribute('data-gj-drag-ready', false);
                    dragEl = display.cloneNode();
                    dragEl.setAttribute('data-gj-role', 'draggable-clone');
                    dragEl.classList.add('gj-unselectable');
                    gj.core.addClasses(dragEl, data.style.dragEl);
                    wrapper = gj.core.wrap(dragEl, 'div');

                    ul = document.createElement('ul');
                    gj.core.addClasses(ul, data.style.list);
                    wrapper.appendChild(ul);

                    li = document.createElement('li');
                    gj.core.addClasses(li, data.style.item);
                    ul.appendChild(li);
                    document.body.appendChild(dragEl);

                    indicator = document.createElement('span');
                    indicator.setAttribute('data-gj-role', 'indicator');
                    wrapper.parentNode.insertBefore(indicator, wrapper);
                    
                    new GijgoDraggable(dragEl, {
                        drag: gj.tree.plugins.dragAndDrop.private.createDragHandler(tree, node, display),
                        stop: gj.tree.plugins.dragAndDrop.private.createDragStopHandler(tree, node, display)
                    });
                    wrapper = display.parent();
                    offsetTop = display.offset().top;
                    offsetTop -= parseInt(wrapper.css("border-top-width")) + parseInt(wrapper.css("margin-top")) + parseInt(wrapper.css("padding-top"));
                    offsetLeft = display.offset().left;
                    offsetLeft -= parseInt(wrapper.css("border-left-width")) + parseInt(wrapper.css("margin-left")) + parseInt(wrapper.css("padding-left"));
                    offsetLeft -= dragEl.find('[data-gj-role="indicator"]').outerWidth(true);
                    dragEl.css({
                        position: 'absolute', top: offsetTop, left: offsetLeft, width: display.outerWidth(true)
                    });
                    if (display.attr('data-droppable') === 'true') {
                        display.droppable('destroy');
                    }
                    gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, node, display).each(function () {
                        let dropEl = (this);
                        if (dropEl.attr('data-droppable') === 'true') {
                            dropEl.droppable('destroy');
                        }
                        dropEl.droppable();
                    });
                    gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, node).each(function () {
                        let dropEl = (this);
                        if (dropEl.attr('data-droppable') === 'true') {
                            dropEl.droppable('destroy');
                        }
                        dropEl.droppable();
                    });
                    dragEl.trigger('mousedown');
                }
		    };
	    },

	    getTargetDisplays: function (tree, node, display) {
	        return tree.find('[data-gj-role="display"]').not(display).not(node.find('[data-gj-role="display"]'));
	    },

	    getTargetWrappers: function (tree, node) {
	        return tree.find('[data-gj-role="wrapper"]').not(node.find('[data-gj-role="wrapper"]'));
	    },

	    createDragHandler: function (tree, node, display) {
	        let displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, node, display),
                wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers(tree, node),
	            data = tree.getConfig();
	        return function (e, offset, mousePosition) {
	            let dragEl = (this), success = false;
	            displays.each(function () {
	                let targetDisplay = (this),
	                    indicator;
	                if (targetDisplay.droppable('isOver', mousePosition)) {
	                    indicator = dragEl.find('[data-gj-role="indicator"]');
	                    data.style.dropAsChildIcon ? indicator.addClass(data.style.dropAsChildIcon) : indicator.text('+');
	                    success = true;
	                    return false;
	                } else {
	                    dragEl.find('[data-gj-role="indicator"]').removeClass(data.style.dropAsChildIcon).empty();
                    }
	            });
	            wrappers.each(function () {
	                let wrapper = (this),
                        indicator, middle;
	                if (!success && wrapper.droppable('isOver', mousePosition)) {
	                    middle = wrapper.position().top + (wrapper.outerHeight() / 2);
	                    if (mousePosition.y < middle) {
	                        wrapper.addClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                    } else {
	                        wrapper.addClass(data.style.dropBelow).removeClass(data.style.dropAbove);
	                    }
	                } else {
	                    wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                }
	            });
	        };
        },

	    createDragStopHandler: function (tree, sourceNode, sourceDisplay) {
	        let displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, sourceNode, sourceDisplay),
                wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers(tree, sourceNode),
	            data = tree.getConfig();
	        return function (e, mousePosition) {
                let success = false, record, targetNode, sourceParentNode, parent;
	            (this).draggable('destroy').remove();
	            displays.each(function () {
	                let targetDisplay = (this), ul;
	                if (targetDisplay.droppable('isOver', mousePosition)) {
	                    targetNode = targetDisplay.closest('li');
	                    sourceParentNode = sourceNode.parent('ul').parent('li');
	                    ul = targetNode.children('ul');
	                    if (ul.length === 0) {
	                        ul = ('<ul />').addClass(data.style.list);
	                        targetNode.append(ul);
	                    }
	                    if (gj.tree.plugins.dragAndDrop.events.nodeDrop(tree, sourceNode.data('id'), targetNode.data('id'), ul.children('li').length + 1) !== false) {
                            ul.append(sourceNode);

                            //BEGIN: Change node position inside the backend data
                            record = tree.getDataById(sourceNode.data('id'));
                            gj.tree.methods.removeDataById(tree, sourceNode.data('id'), data.records);
                            parent = tree.getDataById(ul.parent().data('id'));
                            if (parent[data.childrenField] === undefined) {
                                parent[data.childrenField] = [];
                            }
                            parent[data.childrenField].push(record);
                            //END

	                        gj.tree.plugins.dragAndDrop.private.refresh(tree, sourceNode, targetNode, sourceParentNode);
	                    }
	                    success = true;
	                    return false;
	                }
	                targetDisplay.droppable('destroy');
	            });
	            if (!success) {
	                wrappers.each(function () {
	                    let targetWrapper = (this), prepend, orderNumber, sourceNodeId;
	                    if (targetWrapper.droppable('isOver', mousePosition)) {
	                        targetNode = targetWrapper.closest('li');
	                        sourceParentNode = sourceNode.parent('ul').parent('li');
	                        prepend = mousePosition.y < (targetWrapper.position().top + (targetWrapper.outerHeight() / 2));
	                        sourceNodeId = sourceNode.data('id');
	                        orderNumber = targetNode.prevAll('li:not([data-id="' + sourceNodeId + '"])').length + (prepend ? 1 : 2);
                            if (gj.tree.plugins.dragAndDrop.events.nodeDrop(tree, sourceNodeId, targetNode.parent('ul').parent('li').data('id'), orderNumber) !== false) {
                                //BEGIN: Change node position inside the backend data
                                record = tree.getDataById(sourceNode.data('id'));
                                gj.tree.methods.removeDataById(tree, sourceNode.data('id'), data.records);
                                tree.getDataById(targetNode.parent().data('id'))[data.childrenField].splice(targetNode.index() + (prepend ? 0 : 1), 0, record);
                                //END

	                            if (prepend) {
                                    sourceNode.insertBefore(targetNode);
	                            } else {
	                                sourceNode.insertAfter(targetNode);
                                }

                                gj.tree.plugins.dragAndDrop.private.refresh(tree, sourceNode, targetNode, sourceParentNode);
	                        }
	                        return false;
	                    }
	                    targetWrapper.droppable('destroy');
	                });
                }
	        }
	    },

	    refresh: function (tree, sourceNode, targetNode, sourceParentNode) {
	        let data = tree.getConfig();
	        gj.tree.plugins.dragAndDrop.private.refreshNode(tree, targetNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode(tree, sourceParentNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode(tree, sourceNode);
	        sourceNode.find('li[data-gj-role="node"]').each(function () {
	            gj.tree.plugins.dragAndDrop.private.refreshNode(tree, (this));
	        });
	        targetNode.children('[data-gj-role="wrapper"]').removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
        },

	    refreshNode: function (tree, node) {
	        let wrapper = node.children('[data-gj-role="wrapper"]'),
	            expander = wrapper.children('[data-gj-role="expander"]'),
	            spacer = wrapper.children('[data-gj-role="spacer"]'),
	            list = node.children('ul'),
                data = tree.getConfig(),
	            level = node.parentsUntil('[data-type="tree"]', 'ul').length;

	        if (list.length && list.children().length) {
	            if (list.is(':visible')) {
	                expander.empty().append(data.icons.collapse);
	            } else {
	                expander.empty().append(data.icons.expand);
	            }
	        } else {
	            expander.empty();
	        }
	        wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);

	        spacer.css('width', (data.indentation * (level - 1)));
	    }
	},

	public: {
	},

	events: {
	    /**
         * Event fires when the node is dropped.
         * @event nodeDrop
         * @param {object} e - event data
         * @param {string} id - the id of the record
         * @param {object} parentId - the id of the new parend node
         * @param {object} orderNumber - the new order number
         * @example Event.Sample <!-- draggable, droppable, tree -->
         * <div id="tree" data-source="/Locations/Get" data-drag-and-drop="true"></div>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), );
         *     tree.on('nodeDrop', function (e, id, parentId, orderNumber) {
         *         let node = tree.getDataById(id),
         *             parent = parentId ? tree.getDataById(parentId) : {};
         *         if (parent.text === 'North America') {
         *             alert('Can\'t add children to North America.');
         *             return false;
         *         } else {
         *             alert(node.text + ' is added to ' + parent.text + ' as ' + orderNumber);
         *             return true;
         *         }
         *     });
         * </script>
         */
	    nodeDrop: function (tree, id, parentId, orderNumber) {
	        return tree.triggerHandler('nodeDrop', [id, parentId, orderNumber]);
        }
    },

	configure: function (tree) {
		tree.extend(tree, gj.tree.plugins.dragAndDrop.public);
		if (tree.getConfig().dragAndDrop && gj.draggable && gj.droppable) {
			tree.on('nodeDataBound', function (e, node) {
				gj.tree.plugins.dragAndDrop.private.nodeDataBound(tree, node);
			});
		}
	}
};

/** 
 * @widget Tree 
 * @plugin Lazy Loading
 */
gj.tree.plugins.lazyLoading = {
    config: {
        base: {

            paramNames: {

                /** The name of the parameter that is going to send the parent identificator.
                 * Lazy Loading needs to be enabled in order this parameter to be in use.
                 * @alias paramNames.parentId
                 * @type string
                 * @default "parentId"
                 */
                parentId: 'parentId'
            },

            /** Enables lazy loading
              * @type Boolean
              * @default false
              * @example Material.Design <!-- tree -->
              * <ul id="tree"></ul>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/LazyGet',
              *         primaryKey: 'id',
              *         lazyLoading: true
              *     });
              * </script>
              */
            lazyLoading: false
        }
    },

    private: {
        nodeDataBound: function (tree, node, id, record) {
            let data = tree.getConfig(),
                expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]');

            if (record.hasChildren) {
                expander.innerHTML = data.icons.expand;
            }
        },

        createDoneHandler: function (tree, node) {
            return function () {
                let i, expander, list, data = tree.getConfig(), response = this.response;
                if (typeof (response) === 'string' && JSON) {
                    response = JSON.parse(response);
                }
                if (response && response.length) {
                    list = gj.core.select(node, 'ul');
                    if (list.length === 0) {
                        list = document.createElement('ul');
                        gj.core.addClasses(list, data.style.list);
                        node.appendChild(list);
                    }
                    for (i = 0; i < response.length; i++) {
                        tree.addNode(response[i], list);
                    }
                    expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
                    expander.setAttribute('data-gj-mode', 'open');
                    expander.innerHTML = data.icons.collapse;
                    gj.tree.events.dataBound(tree.element);
                }
            };
        },

        expand: function (tree, node, id) {
            let url, data = tree.getConfig(), params = {},
                children = gj.core.selectAll(node, 'ul>li');

            if (!children || !children.length) {
                if (typeof (data.dataSource) === 'string') {
                    params[data.paramNames.parentId] = id;
                    url = data.dataSource + '?' + new URLSearchParams(params).toString();                    
                    if (tree.xhr) {
                        tree.xhr.abort();
                    }
                    tree.xhr = new XMLHttpRequest();
                    tree.xhr.open('GET', url , true);
                    tree.xhr.onload = gj.tree.plugins.lazyLoading.private.createDoneHandler(tree, node);
                    tree.xhr.onerror = tree.createErrorHandler();
                    tree.xhr.send();
                }
            }
        }
    },

    public: {},

    events: {},

    configure: function (tree, fullConfig, clientConfig) {
        if (clientConfig.lazyLoading) {
            tree.on('nodeDataBound', function (e) {
                gj.tree.plugins.lazyLoading.private.nodeDataBound(tree, e.detail.node, e.detail.id, e.detail.record);
            });
            tree.on('expand', function (e) {
                gj.tree.plugins.lazyLoading.private.expand(tree, e.detail.node, e.detail.id);
            });
        }
    }
};
