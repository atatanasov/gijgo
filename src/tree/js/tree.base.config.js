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
         *         dataSource: [ { text: "foo", children: [ { text: "bar" } ] } ],
         *         autoLoad: false
         *     });
         *     tree.reload(); //call .reload() explicitly in order to load the data in the tree
         * </script>
         * @example enabled <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [ { text: "foo", children: [ { text: "bar" } ] } ],
         *         autoLoad: true
         *     });
         * </script>
         */
        autoLoad: true,


        /** When this setting is enabled the content of the tree will be loaded automatically after the creation of the tree.
         * @type (single|multiple)
         * @default single
         * @example Single.Selection <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [ { text: "foo", children: [ { text: "bar" } ] } ],
         *         selectionType: 'single'
         *     });
         *     tree.reload(); //call .reload() explicitly in order to load the data in the tree
         * </script>
         * @example Multiple.Selection <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [ { text: "foo", children: [ { text: "bar" } ] } ],
         *         selectionType: 'multiple'
         *     });
         * </script>
         */
        selectionType: 'single',

        checkChildren: false,
        dataSource: undefined,
        primaryKey: undefined,
        textField: 'text',
        valueField: undefined,
        childrenField: 'children',
        lazyLoading: false,
        tmpl: undefined,
        style: {
            active: 'gj-tree-base-active'
        }
    },

    bootstrap: {},

    jqueryui: {}
};