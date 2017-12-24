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
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         initialized: function (e) {
     *             alert('initialized is fired.');
     *         }
     *     });
     *     $('#reload').on('click', function() { 
     *         tree.reload(); 
     *     });
     * </script>
     */
    initialized: function ($tree) {
        $tree.triggerHandler('initialized');
    },

    /**
     * Event fired before data binding takes place.
     * @event dataBinding
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <div id="tree"></div>
     * <script>
     *     $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         dataBinding: function (e) {
     *             alert('dataBinding is fired.');
     *         }
     *     });
     * </script>
     */
    dataBinding: function ($tree) {
        $tree.triggerHandler('dataBinding');
    },

    /**
     * Event fires after the loading of the data in the tree.
     * @event dataBound
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <div id="tree"></div>
     * <script>
     *     $('#tree').tree({
     *         dataSource: '/Locations/Get',
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    dataBound: function ($tree) {
        $tree.triggerHandler('dataBound');
    },

    /**
     * Event fires after selection of tree node.
     * @event select
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <p>Select tree node in order to fire the event.</p>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('select', function (e, node, id) {
     *         alert('select is fired for node with id=' + id);
     *     });
     * </script>
     */
    select: function ($tree, $node, id) {
        return $tree.triggerHandler('select', [$node, id]);
    },

    /**
     * Event fires on un selection of tree node
     * @event unselect
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <p>Select/Unselect tree node in order to fire the event.</p>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('unselect', function (e, node, id) {
     *         alert('unselect is fired for node with id=' + id);
     *     });
     * </script>
     */
    unselect: function ($tree, $node, id) {
        return $tree.triggerHandler('unselect', [$node, id]);
    },

    /**
     * Event fires before node expand.
     * @event expand
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('expand', function (e, node, id) {
     *         alert('expand is fired.');
     *     });
     * </script>
     */
    expand: function ($tree, $node, id) {
        return $tree.triggerHandler('expand', [$node, id]);
    },

    /**
     * Event fires before node collapse.
     * @event collapse
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('collapse', function (e, node, id) {
     *         alert('collapse is fired.');
     *     });
     * </script>
     */
    collapse: function ($tree, $node, id) {
        return $tree.triggerHandler('collapse', [$node, id]);
    },

    /**
     * Event fires on enable of tree node.
     * @event enable
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America</button>
     * <br/><br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree, northAmerica;
     *     tree = $('#tree').tree({
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     *     tree.on('enable', function (e, node) {
     *         alert(node.text() + ' is enabled.');
     *     });
     * </script>
     */
    enable: function ($tree, $node) {
        return $tree.triggerHandler('enable', [$node]);
    },

    /**
     * Event fires on disable of tree node.
     * @event disable
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America</button>
     * <br/><br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree, northAmerica;
     *     tree = $('#tree').tree({
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     *     tree.on('disable', function (e, node) {
     *         alert(node.text() + ' is disabled.');
     *     });
     * </script>
     */
    disable: function ($tree, $node) {
        return $tree.triggerHandler('disable', [$node]);
    },

    /**
     * Event fires before tree destroy
     * @event destroying
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.destroy()" class="gj-button-md">Destroy</button>
     * <br/><br/>
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('destroying', function (e) {
     *         alert('destroying is fired.');
     *     });
     * </script>
     */
    destroying: function ($tree) {
        return $tree.triggerHandler('destroying');
    },

    /**
     * Event fires when the data is bound to node.
     * @event nodeDataBound
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @param {object} record - the data of the node record
     * @example Event.Sample <!-- tree -->
     * <div id="tree" data-source="/Locations/Get"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('nodeDataBound', function (e, node, id, record) {
     *         if ((parseInt(id, 10) % 2) === 0) {
     *             node.css('background-color', 'red');
     *         }
     *     });
     * </script>
     */
    nodeDataBound: function ($tree, $node, id, record) {
        return $tree.triggerHandler('nodeDataBound', [$node, id, record]);
    }
}