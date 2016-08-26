/**
  * @widget Tree
  * @plugin Base
  */
gj.tree.events = {
    /**
     * Event fires when the tree is initialized
     * @event initialized
     * @param {object} e - event data
     * @example sample <!-- tree.base -->
     * <button id="reload">Reload</button>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
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
        $tree.trigger('initialized', []);
    },

    /**
     * Event fired before data binding takes place.
     * @event dataBinding
     * @param {object} e - event data
     * @example sample <!-- tree.base -->
     * <div id="tree"></div>
     * <script>
     *     $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *         dataBinding: function (e) {
     *             alert('dataBinding is fired.');
     *         }
     *     });
     * </script>
     */
    dataBinding: function ($tree) {
        $tree.trigger('dataBinding', []);
    },

    /**
     * Event fires after the loading of the data in the grid.
     * @event dataBound
     * @param {object} e - event data
     * @example sample <!-- tree.base -->
     * <div id="tree"></div>
     * <script>
     *     $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    dataBound: function ($tree) {
        $tree.trigger('dataBound', []);
    },

    /**
     * Event fires 
     * @event destroying
     */
    destroying: function ($tree) {
        $tree.trigger('destroying', []);
    },

    /**
     * Event fires 
     * @event select
     */
    select: function ($tree) {
        $tree.trigger('select', []);
    },

    /**
     * Event fires 
     * @event unselect
     */
    unselect: function ($tree) {
        $tree.trigger('unselect', []);
    },

    /**
     * Event fires 
     * @event collapsing
     */
    collapsing: function ($tree) {
        $tree.trigger('collapsing', []);
    },

    /**
     * Event fires 
     * @event collapsed
     */
    collapsed: function ($tree) {
        $tree.trigger('collapsed', []);
    },

    /**
     * Event fires 
     * @event expanding
     */
    expanding: function ($tree) {
        $tree.trigger('expanding', []);
    },

    /**
     * Event fires 
     * @event expanded
     */
    expanded: function ($tree) {
        $tree.trigger('expanded', []);
    }
}