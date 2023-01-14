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
                expander = node.querySelector('> [data-gj-role="wrapper"] > [data-gj-role="expander"]');

            if (record.hasChildren) {
                expander.innerHTML = data.icons.expand;
            }
        },

        createDoneHandler: function (tree, node) {
            return function (response) {
                let i, expander, list, data = tree.getConfig();
                if (typeof (response) === 'string' && JSON) {
                    response = JSON.parse(response);
                }
                if (response && response.length) {
                    list = node.children('ul');
                    if (list.length === 0) {
                        list = document.createElement('ul');
                        gj.core.addClasses(list, data.style.list);
                        node.appendChild(list);
                    }
                    for (i = 0; i < response.length; i++) {
                        tree.addNode(response[i], list);
                    }
                    expander = node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
                    expander.setAttribute('data-gj-mode', 'open');
                    expander.innerHTML = data.icons.collapse;
                    gj.tree.events.dataBound(tree.element);
                }
            };
        },

        expand: function (tree, node, id) {
            let ajaxOptions, data = tree.getConfig(), params = {},
                children = node.querySelectorAll('>ul>li');

            if (!children || !children.length) {
                if (typeof (data.dataSource) === 'string') {
                    params[data.paramNames.parentId] = id;
                    ajaxOptions = { url: data.dataSource, data: params };
                    if (tree.xhr) {
                        tree.xhr.abort();
                    }
                    tree.xhr = $.ajax(ajaxOptions).done(gj.tree.plugins.lazyLoading.private.createDoneHandler(tree, node)).fail(tree.createErrorHandler());
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
