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
              * @example Bootstrap <!-- bootstrap, checkbox, tree.base -->
              * <div class="container-fluid">
              *     <h3>Bootstrap Treeview With Checkboxes</h3>
              *     <div id="tree"></div>
              * </div>
              * <script>
              *     var tree = $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap'
              *     });
              * </script>
              * @example Material.Design <!-- materialicons, checkbox, tree.base -->
              * <div class="container-fluid">
              *     <h3>Material Design Treeview With Checkboxes</h3>
              *     <div id="tree"></div>
              * </div>
              * <script>
              *     var tree = $('#tree').tree({
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'materialdesign'
              *     });
              * </script>
              */
            checkboxes: undefined,

            /** Name of the source field, that indicates if the checkbox is checked.
             * @type string
             * @default 'checked'
             * @example Custom.Name <!-- materialicons, checkbox, tree.base -->
             * <div id="tree"></div>
             * <script>
             *     var tree = $('#tree').tree({
             *         checkboxes: true,
             *         checkedField: 'checkedFieldName',
             *         dataSource: [ { text: 'foo', checkedFieldName: false, children: [ { text: 'bar', checkedFieldName: true }, { text: 'bar2', checkedFieldName: false } ] }, { text: 'foo2'} ]
             *     });
             * </script>
             */
            checkedField: 'checked',
        }
    },

    private: {
        nodeDataBound: function ($tree, $node, id, record) {
            var data = $tree.data(),
                $expander = $node.find('> [data-role="wrapper"] > [data-role="expander"]'),
                $checkbox = $('<input type="checkbox"/>'),
                $wrapper = $('<span data-role="checkbox"></span>').append($checkbox);
            $checkbox = $checkbox.checkbox({ uiLibrary: data.uiLibrary, iconsLibrary: data.iconsLibrary });
            if (record[data.checkedField]) {
                $checkbox.state('checked');
            }
            $checkbox.on('click', function (e) {
                var $node = $checkbox.closest('li'),
                    state = $checkbox.state();
                gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                gj.tree.plugins.checkboxes.private.updateParentState($node, state);
            });
            $expander.after($wrapper);
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
            if ($childrenCheckboxes.length > 1) {
                $.each($childrenCheckboxes, function () {
                    $(this).checkbox('state', state);
                });
            }
        }
    },

    public: {

        /** Get ids of all checked nodes
         * @method
         * @return Array
         * @example Base.Theme <!-- materialicons, checkbox, tree.base -->
         * <button id="btnGet">Get Checked Nodes</button>
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
        }
    },

    configure: function ($tree) {
        $.extend(true, $tree, gj.tree.plugins.checkboxes.public);
        if ($tree.data('checkboxes')) {
            $tree.on('nodeDataBound', function (e, $node, id, record) {
                gj.tree.plugins.checkboxes.private.nodeDataBound($tree, $node, id, record);
            });
            $tree.on('dataBound', function () {
                $nodes = $tree.find('li[data-role="node"]');
                $.each($nodes, function () {
                    var $node = $(this),
                        state = $node.find('[data-role="checkbox"] input[type="checkbox"]').checkbox('state');
                    if (state === 'checked') {
                        gj.tree.plugins.checkboxes.private.updateChildrenState($node, state);
                        gj.tree.plugins.checkboxes.private.updateParentState($node, state);
                    }
                });
            });
        }
    }
};
