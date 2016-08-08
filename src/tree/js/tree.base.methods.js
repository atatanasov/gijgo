/*global gj $*/
gj.tree.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'tree');

        gj.tree.methods.initialize.call(this);

        if (this.data('autoLoad')) {
            this.reload();
        }
        return this;
    },

    initialize: function ($element) {
        this.empty();
        this.append('<ul/>');
        gj.tree.events.initialized(this);
    },

    reload: function (params) {
        var data = this.data();
        if ($.isArray(data.dataSource)) {
            gj.tree.methods.loadData(this);
        } else {

        }
    },

    loadData: function ($tree) {
        var i, node, config = $tree.data(),
            $root = $tree.children('ul');

        for (i = 0; i < config.dataSource.length; i++) {
            gj.tree.methods.appendNode($root, config.dataSource[i], config);
        }
    },

    appendNode: function ($parent, nodeData, config) {
        var i, $node, $newParent;
        $node = $('<li/>');
        $parent.append($node);
        $node.append('<div>' + nodeData[config.textField] + '</div>');

        if (nodeData[config.childrenField] && nodeData[config.childrenField].length) {
            $newParent = $('<ul></ul>');
            $node.append($newParent);
            
            for (i = 0; i < nodeData[config.childrenField].length; i++) {
                gj.tree.methods.appendNode($newParent, nodeData[config.childrenField][i], config);
            }           
        }
    }
}