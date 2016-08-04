/*global gj $*/
gj.tree.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'tree');

        gj.tree.methods.initialize(this);

        if (this.data('autoLoad')) {
            this.reload();
        }
        return this;
    },

    initialize: function ($tree) {
        this.attr('data-initialized', true);
        gj.tree.events.initialized($grid);
    },

    reload: function () {

    }
}