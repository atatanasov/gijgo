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
        this.append('<ul class="gj-tree-list"/>');
        gj.tree.events.initialized(this);
    },

    reload: function (params) {
        var data = this.data();
        if ($.isArray(data.dataSource)) {
            gj.tree.methods.loadData(this);
        } else {

        }
        return this;
    },

    loadData: function ($tree) {
        var i, node, config = $tree.data(),
            $root = $tree.children('ul');

        for (i = 0; i < config.dataSource.length; i++) {
            gj.tree.methods.appendNode($tree, $root, config.dataSource[i], config);
        }
    },

    appendNode: function ($tree, $parent, nodeData, config) {
        var i, $node, $newParent,
            $node = $('<li/>'),
            $expander = $('<span data-role="expander" data-mode="close">+</span>'),
            $display = $('<span data-role="display">' + nodeData[config.textField] + '</span>');

        $expander.on('click', gj.tree.methods.expanderClickHandler($tree));
        $display.on('click', gj.tree.methods.displayClickHandler($tree))
        $node.append($expander);
        $node.append($display);

        if (nodeData[config.childrenField] && nodeData[config.childrenField].length) {
            $newParent = $('<ul class="gj-tree-list hidden"/>');
            $node.append($newParent);
            
            for (i = 0; i < nodeData[config.childrenField].length; i++) {
                gj.tree.methods.appendNode($tree, $newParent, nodeData[config.childrenField][i], config);
            }  
        }

        $parent.append($node);
    },

    expanderClickHandler: function ($tree) {
        return function (e) {
            var $expander = $(this),
                $children = $expander.siblings('ul'),
                events = gj.tree.events;
            if ($expander.attr('data-mode') === 'close') {
                events.expanding($tree);
                $children.show();
                $expander.attr('data-mode', 'open').text('-');
                events.expanded($tree);
            } else {
                events.collapsing($tree);
                $children.hide();
                $expander.attr('data-mode', 'close').text('+');
                events.collapsed($tree);
            }
        }
    },

    displayClickHandler: function ($tree) {
        return function (e) {
            var $display = $(this),
                $node = $display.parent('li'),
                events = gj.tree.events;
            if ($display.attr('data-selected') === 'true') {
                $display.removeClass($tree.data().style.active).removeAttr('data-selected');
                events.unselect($tree, $node);
            } else {
                $display.addClass($tree.data().style.active).attr('data-selected', 'true');
                events.select($tree, $node);
            }
        }
    },

    selectAll: function () {

    },

    select: function ($tree, $node) {

    },
    
    unselectAll: function ($tree) {
        var i, $nodes = this.find('ul li');
        for (i = 0; i < $nodes.length; i++) {

        }
    },

    unselect: function ($tree, $node) {

    }
}