/* global window alert jQuery gj */
/*
 * Gijgo JavaScript Library v1.0.0
 * http://gijgo.com/
 *
 * Copyright 2014, 2016 gijgo.com
 * Released under the MIT license
 */
/**
  * @widget Tree
  * @plugin Base
  */
if (typeof(gj) === 'undefined') {
    gj = {};
}
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

        primaryKey: undefined,
        textField: 'text',
        valueField: undefined,
        childrenField: 'children',
        width: undefined,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css files for Bootstrap should be manually included if you use bootstrap as UI Library.
         * @type (base|bootstrap)
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
         */
        uiLibrary: 'base',

        style: {
            wrapper: 'gj-tree-unselectable',
            list: 'gj-tree-list',
            item: 'gj-tree-item',
            active: 'gj-tree-base-active',
            leftSpacer: undefined,
            expander: 'gj-tree-expander',
            display: 'gj-tree-display',
            expandIcon: undefined,
            collapseIcon: undefined,
            leafIcon: undefined
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-tree-unselectable',
            list: 'gj-bootstrap-tree-list list-group',
            item: 'gj-bootstrap-tree-item list-group-item',
            active: 'active',
            leftSpacer: 'gj-tree-bootstrap-left-spacer',
            expander: 'gj-tree-bootstrap-expander glyphicon',
            display: 'gj-tree-bootstrap-display',
            expandIcon: 'glyphicon-plus',
            collapseIcon: 'glyphicon-minus',
            leafIcon: undefined
        }
    },

    jqueryui: {}
};