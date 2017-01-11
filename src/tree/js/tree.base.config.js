/* global window alert jQuery gj */
/**
  * @widget Tree
  * @plugin Base
  */
if (typeof(gj.tree) === 'undefined') {
    gj.tree = {
        plugins: {}
    };
}

gj.tree.config = {
    base: {

        /** When this setting is enabled the content of the tree will be loaded automatically after the creation of the tree.
         * @type boolean
         * @default true
         * @example disabled <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ],
         *         autoLoad: false
         *     });
         *     tree.reload(); //call .reload() explicitly in order to load the data in the tree
         * </script>
         * @example enabled <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ],
         *         autoLoad: true
         *     });
         * </script>
         */
        autoLoad: true,

        /** The type of the node selection.<br/>
         * If the type is set to multiple the user will be able to select more then one node in the tree.
         * @type (single|multiple)
         * @default single
         * @example Single.Selection <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [
         *             { text: 'North America', children: [ { text: 'USA', children: [ { text: 'California' }, { text: 'Miami' } ] }, { text: 'Canada' },  { text: 'Mexico' } ] },
         *             { text: 'Europe', children: [ { text: 'France' },  { text: 'Spain' },  { text: 'Italy' } ] },
         *             { text: 'South America', children: [ { text: 'Brazil' },  { text: 'Argentina' },  { text: 'Columbia' } ] }
         *         ],
         *         selectionType: 'single'
         *     });
         * </script>
         * @example Multiple.Selection <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [
         *             { text: 'North America', children: [ { text: 'USA', children: [ { text: 'California' }, { text: 'Miami' } ] }, { text: 'Canada' },  { text: 'Mexico' } ] },
         *             { text: 'Europe', children: [ { text: 'France' },  { text: 'Spain' },  { text: 'Italy' } ] },
         *             { text: 'South America', children: [ { text: 'Brazil' },  { text: 'Argentina' },  { text: 'Columbia' } ] }
         *         ],
         *         selectionType: 'multiple'
         *     });
         * </script>
         */
        selectionType: 'single',

        /** This setting enable cascade selection and unselection of children
         * @type boolean
         * @default false
         * @example Sample <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [
         *             { text: 'North America', children: [ { text: 'USA', children: [ { text: 'California' }, { text: 'Miami' } ] }, { text: 'Canada' },  { text: 'Mexico' } ] },
         *             { text: 'Europe', children: [ { text: 'France' },  { text: 'Spain' },  { text: 'Italy' } ] },
         *             { text: 'South America', children: [ { text: 'Brazil' },  { text: 'Argentina' },  { text: 'Columbia' } ] }
         *         ],
         *         cascadeSelection: true
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
         * @example Local.DataSource <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ]
         *     });
         * </script>
         * @example Remote.DataSource <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/DataSources/GetCountries'
         *     });
         * </script>
         */
        dataSource: undefined,

        /** Primary key field name.
         * @type string
         * @default undefined
         * @example sample <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         primaryKey: 'id',
         *         dataSource: [ { id: 101, text: 'foo', children: [ { id: 202, text: 'bar' } ] } ]
         *     });
         *     alert(tree.getDataById(101).text);
         * </script>
         */
        primaryKey: undefined,

        /** Text field name.
         * @type string
         * @default 'text'
         * @example sample <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         textField: 'newTextName',
         *         dataSource: [ { newTextName: 'foo', children: [ { newTextName: 'bar' } ] } ]
         *     });
         * </script>
         */
        textField: 'text',

        /** Children field name.
         * @type string
         * @default 'children'
         * @example sample <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         childrenField: 'myChildrenNode',
         *         dataSource: [ { text: 'foo', myChildrenNode: [ { text: 'bar' } ] } ]
         *     });
         * </script>
         */
        childrenField: 'children',

        /** Icon field name.
         * @type string
         * @default undefined
         * @example Bootstrap <!-- bootstrap, tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         iconField: 'icon',
         *         uiLibrary: 'bootstrap',
         *         dataSource: [ { text: 'folder', icon: 'glyphicon glyphicon-folder-close', children: [ { text: 'file', icon: 'glyphicon glyphicon-file' } ] } ]
         *     });
         * </script>
         * @example Font.Awesome <!-- tree.base  -->
         * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         iconField: 'icon',
         *         dataSource: [ { text: 'folder', icon: 'fa fa-folder', children: [ { text: 'file', icon: 'fa fa-file' } ] } ]
         *     });
         * </script>
         * @example Material.Design <!-- materialdesign, tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         iconField: 'icon',
         *         uiLibrary: 'materialdesign',
         *         dataSource: [ { text: 'folder', icon: '<i class="material-icons">folder</i>', children: [ { text: 'file', icon: '<i class="material-icons">insert_drive_file</i>' } ] } ]
         *     });
         * </script>
         */
        iconField: undefined,

        /** Width of the tree.
         * @type number
         * @default undefined
         * @example JS.Config <!-- bootstrap, tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/DataSources/GetCountries',
         *         width: 500,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example HTML.Config <!-- bootstrap, tree.base -->
         * <div id="tree" width="500" data-source="/DataSources/GetCountries" data-ui-library="bootstrap"></div>
         * <script>
         *     $('#tree').tree();
         * </script>
         */
        width: undefined,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css files for Bootstrap should be manually included if you use bootstrap as UI Library.
         * @type (base|bootstrap|materialdesign)
         * @default single
         * @example Bootstrap <!-- bootstrap, tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [
         *             { text: 'North America', children: [ { text: 'USA', children: [ { text: 'California' }, { text: 'Miami' } ] }, { text: 'Canada' },  { text: 'Mexico' } ] },
         *             { text: 'Europe', children: [ { text: 'France' },  { text: 'Spain' },  { text: 'Italy' } ] },
         *             { text: 'South America', children: [ { text: 'Brazil' },  { text: 'Argentina' },  { text: 'Columbia' } ] }
         *         ],
         *         width: 500,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example MaterialDesign <!-- materialdesign, tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [
         *             { text: 'North America', children: [ { text: 'USA', children: [ { text: 'California' }, { text: 'Miami' } ] }, { text: 'Canada' },  { text: 'Mexico' } ] },
         *             { text: 'Europe', children: [ { text: 'France' },  { text: 'Spain' },  { text: 'Italy' } ] },
         *             { text: 'South America', children: [ { text: 'Brazil' },  { text: 'Argentina' },  { text: 'Columbia' } ] }
         *         ],
         *         width: 500,
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         */
        uiLibrary: 'base',

        autoGenId: 1,

        style: {
            wrapper: 'gj-unselectable',
            list: 'gj-tree-list',
            item: 'gj-tree-item',
            active: 'gj-tree-base-active',
            leftSpacer: undefined,
            display: 'gj-tree-display',
            expandIcon: undefined,
            collapseIcon: undefined,
            leafIcon: undefined
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-unselectable',
            list: 'gj-tree-bootstrap-list list-group',
            item: 'gj-tree-bootstrap-item list-group-item',
            active: 'active',
            leftSpacer: 'gj-tree-bootstrap-left-spacer',
            display: 'gj-tree-bootstrap-display',
            expandIcon: 'glyphicon glyphicon-plus',
            collapseIcon: 'glyphicon glyphicon-minus',
            leafIcon: undefined
        }
    },

    jqueryui: {},

    materialdesign: {
        style: {
            wrapper: 'gj-unselectable',
            list: 'gj-tree-mdl-list mdl-list',
            item: 'gj-tree-mdl-item mdl-list__item',
            active: 'gj-tree-mdl-active',
            leftSpacer: '',
            display: 'mdl-list__item-primary-content',
            expandIcon: 'material-icons mdl-list__item-icon gj-cursor-pointer gj-tree-mdl-icon-plus',
            collapseIcon: 'material-icons mdl-list__item-icon gj-cursor-pointer gj-tree-mdl-icon-minus',
            leafIcon: undefined
        }
    }
};