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
