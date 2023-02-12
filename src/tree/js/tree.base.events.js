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