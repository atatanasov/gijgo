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
              * @example sample <!-- checkbox, tree.base -->
              * <div id="tree"></div>
              * <script>
              *     var tree = $('#tree').tree({
              *         dataSource: '/DataSources/GetCountries',
              *         checkboxes: true
              *     });
              * </script>
              */
            checkboxes: undefined,

            style: {}
        },

        jqueryui: {
            style: {}
        },

        bootstrap: {
            style: {}
        }
    },

    private: {
        nodeDataBound: function ($tree, $node) {
            var data = $tree.data(),
                $expander = $node.find('> [data-role="wrapper"] > [data-role="expander"]'),
                $checkbox = $('<input type="checkbox"/>').checkbox(),
                $wrapper = $('<span data-role="checkbox"></span>').append($checkbox);
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
    },

    configure: function ($tree) {
        $.extend(true, $tree, gj.tree.plugins.checkboxes.public);
        if ($tree.data('checkboxes')) {
            $tree.on('nodeDataBound', function (e, $node) {
                gj.tree.plugins.checkboxes.private.nodeDataBound($tree, $node);
            });
        }
    }
};
