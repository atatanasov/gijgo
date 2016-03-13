/**
  * @widget Tree
  * @plugin Base
  */
gj.tree.events = {
    /**
     * Event fires 
     * @event dataBinding
     */
    dataBinding: function ($tree) {
        $tree.trigger('dataBinding', []);
    },

    /**
     * Event fires 
     * @event dataBound
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
     * @event initialized
     */
    initialized: function ($tree) {
        $tree.trigger('initialized', []);
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