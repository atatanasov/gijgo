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
              * <div id="tree"></div>
              * <script>
              *     var tree = $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         checkboxes: true
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, checkbox, tree -->
              * <div id="tree"></div>
              * <script>
              *     var tree = $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap'
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, checkbox, tree -->
              * <div id="tree"></div>
              * <script>
              *     var tree = $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap4'
              *     });
              * </script>
              */
            checkboxes: undefined,

            /** Name of the source field, that indicates if the checkbox is checked.
             * @type string
             * @default 'checked'
             * @example Custom.Name <!-- checkbox, tree -->
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
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
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
             *         checkboxes: true,
             *         dataSource: '/Locations/Get',
             *         cascadeCheck: false
             *     });
             *     tree.on('dataBound', function() {
             *         tree.expandAll();
             *     });
             * </script>
             * @example False.Local.DataSource <!-- checkbox, tree -->
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
             *         checkboxes: true,
             *         dataSource: [ { text: 'foo', checked: true, children: [ { text: 'bar', checked: true }, { text: 'bar2', checked: false } ] }, { text: 'foo2', checked: true, children: [ { text: 'bar2', checked: false } ] } ],
             *         cascadeCheck: false
             *     });
             * </script>
             * @example True <!-- checkbox, tree -->
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
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
        dataBound: function ($tree) {
            var $nodes;
            if ($tree.data('cascadeCheck')) {
                $nodes = $tree.find('li[data-role="node"]');
                $.each($nodes, function () {
                    var $node = $(this),
                        state = $node.find('[data-role="checkbox"] input[type="checkbox"]').checkbox('state');
                    if (state === 'checked') {
                        gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                        gj.tree.plugins.checkboxes.private.updateParentState($node, state);
                    }
                });
            }
        },

        nodeDataBound: function ($tree, $node, id, record) {
            var data, $expander, $checkbox, $wrapper, disabled;
            
            if ($node.find('> [data-role="wrapper"] > [data-role="checkbox"]').length === 0)
            {
                data = $tree.data();
                $expander = $node.find('> [data-role="wrapper"] > [data-role="expander"]');
                $checkbox = $('<input type="checkbox"/>');
                $wrapper = $('<span data-role="checkbox"></span>').append($checkbox);
                disabled = typeof (record[data.disabledField]) !== 'undefined' && record[data.disabledField].toString().toLowerCase() === 'true';

                $checkbox = $checkbox.checkbox({
                    uiLibrary: data.uiLibrary,
                    iconsLibrary: data.iconsLibrary,
                    change: function (e, state) {
                        gj.tree.plugins.checkboxes.events.checkboxChange($tree, $node, record, $checkbox.state());
                    }
                });
                disabled && $checkbox.prop('disabled', true);
                record[data.checkedField] && $checkbox.state('checked');
                $checkbox.on('click', function (e) {
                    var $node = $checkbox.closest('li'),
                        state = $checkbox.state();
                    if (data.cascadeCheck) {
                        gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                        gj.tree.plugins.checkboxes.private.updateParentState($node, state);
                    }
                });
                $expander.after($wrapper);
            }
        },

        updateParentState: function ($node, state) {
            var $parentNode, $parentCheckbox, $siblingCheckboxes, allChecked, allUnchecked, parentState;

            $parentNode = $node.parent('ul').parent('li');
            if ($parentNode.length === 1) {
                $parentCheckbox = $node.parent('ul').parent('li').find('> [data-role="wrapper"] > [data-role="checkbox"] input[type="checkbox"]');
                $siblingCheckboxes = $node.siblings().find('> [data-role="wrapper"] > span[data-role="checkbox"] input[type="checkbox"]');
                allChecked = (state === 'checked');
                allUnchecked = (state === 'unchecked');
                parentState = 'indeterminate';
                $.each($siblingCheckboxes, function () {
                    var state = $(this).checkbox('state');
                    if (allChecked && state !== 'checked') {
                        allChecked = false;
                    }
                    if (allUnchecked && state !== 'unchecked') {
                        allUnchecked = false;
                    }
                });
                if (allChecked && !allUnchecked) {
                    parentState = 'checked';
                }
                if (!allChecked && allUnchecked) {
                    parentState = 'unchecked';
                }
                $parentCheckbox.checkbox('state', parentState);
                gj.tree.plugins.checkboxes.private.updateParentState($parentNode, $parentCheckbox.checkbox('state'));
            }
        },

        updateChildrenState: function ($node, state) {
            var $childrenCheckboxes = $node.find('ul li [data-role="wrapper"] [data-role="checkbox"] input[type="checkbox"]');
            if ($childrenCheckboxes.length > 0) {
                $.each($childrenCheckboxes, function () {
                    $(this).checkbox('state', state);
                });
            }
        },

        update: function ($tree, $node, state) {
            var checkbox = $node.find('[data-role="checkbox"] input[type="checkbox"]').first();
            $(checkbox).checkbox('state', state);
            if ($tree.data().cascadeCheck) {
                gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                gj.tree.plugins.checkboxes.private.updateParentState($node, state);
            }
        }
    },

    public: {

        /** Get ids of all checked nodes
         * @method
         * @return Array
         * @example Base.Theme <!-- checkbox, tree -->
         * <button id="btnGet" class="gj-button-md">Get Checked Nodes</button>
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/Locations/Get',
         *         checkboxes: true
         *     });
         *     $('#btnGet').on('click', function() {
         *         var result = tree.getCheckedNodes();
         *         alert(result.join());
         *     });
         * </script>
         */
        getCheckedNodes: function () {
            var result = [],
                checkboxes = this.find('li [data-role="checkbox"] input[type="checkbox"]');
            $.each(checkboxes, function () {
                var checkbox = $(this);
                if (checkbox.checkbox('state') === 'checked') {
                    result.push(checkbox.closest('li').data('id'));
                }
            });
            return result;
        },

        /**
         * Check all tree nodes
         * @method
         * @return tree as jQuery object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.checkAll()" class="gj-button-md">Check All</button>
         * <button onclick="tree.uncheckAll()" class="gj-button-md">Uncheck All</button>
         * <br/><br/>
         * <div id="tree" data-source="/Locations/Get"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        checkAll: function () {
            var $checkboxes = this.find('li [data-role="checkbox"] input[type="checkbox"]');
            $.each($checkboxes, function () {
                $(this).checkbox('state', 'checked');
            });
            return this;
        },

        /**
         * Uncheck all tree nodes
         * @method
         * @return tree as jQuery object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.checkAll()" class="gj-button-md">Check All</button>
         * <button onclick="tree.uncheckAll()" class="gj-button-md">Uncheck All</button>
         * <br/><br/>
         * <div id="tree" data-source="/Locations/Get"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        uncheckAll: function () {
            var $checkboxes = this.find('li [data-role="checkbox"] input[type="checkbox"]');
            $.each($checkboxes, function () {
                $(this).checkbox('state', 'unchecked');
            });
            return this;
        },

        /**
         * Check tree node.
         * @method
         * @param {object} node - The node as jQuery object
         * @return tree as jQuery object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.check(tree.getNodeByText('China'))" class="gj-button-md">Check China</button>
         * <br/>
         * <div id="tree" data-source="/Locations/Get"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        check: function ($node) {
            gj.tree.plugins.checkboxes.private.update(this, $node, 'checked');
            return this;
        },

        /**
         * Uncheck tree node.
         * @method
         * @param {object} node - The node as jQuery object
         * @return tree as jQuery object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.uncheck(tree.getNodeByText('China'))" class="gj-button-md">UnCheck China</button>
         * <br/>
         * <div id="tree" data-source="/Locations/Get"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *         tree.check(tree.getNodeByText('China'));
         *     });
         * </script>
         */
        uncheck: function ($node) {
            gj.tree.plugins.checkboxes.private.update(this, $node, 'unchecked');
            return this;
        }
    },

    events: {
        /**
         * Event fires when the checkbox state is changed.
         * @event checkboxChange
         * @param {object} e - event data
         * @param {object} $node - the node object as jQuery element
         * @param {object} record - the record data
         * @param {string} state - the new state of the checkbox
         * @example Event.Sample <!-- checkbox, tree -->
         * <div id="tree" data-source="/Locations/Get" data-checkboxes="true"></div>
         * <script>
         *     var tree = $('#tree').tree();
         *     tree.on('checkboxChange', function (e, $node, record, state) {
         *         alert('The new state of record ' + record.text + ' is ' + state);
         *     });
         * </script>
         */
        checkboxChange: function ($tree, $node, record, state) {
            return $tree.triggerHandler('checkboxChange', [$node, record, state]);
        }
    },

    configure: function ($tree) {
        if ($tree.data('checkboxes') && gj.checkbox) {
            $.extend(true, $tree, gj.tree.plugins.checkboxes.public);
            $tree.on('nodeDataBound', function (e, $node, id, record) {
                gj.tree.plugins.checkboxes.private.nodeDataBound($tree, $node, id, record);
            });
            $tree.on('dataBound', function () {
                gj.tree.plugins.checkboxes.private.dataBound($tree);
            });
            $tree.on('enable', function (e, $node) {
                $node.find('>[data-role="wrapper"]>[data-role="checkbox"] input[type="checkbox"]').prop('disabled', false);
            });
            $tree.on('disable', function (e, $node) {
                $node.find('>[data-role="wrapper"]>[data-role="checkbox"] input[type="checkbox"]').prop('disabled', true);
            });
        }
    }
};
