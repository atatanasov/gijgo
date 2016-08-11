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

    initialize: function () {
        var style = this.data('style'),
            $root = $('<ul class="' + style.list + '"/>');
        this.empty().addClass(style.wrapper).append($root);
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

        $root.off().empty();
        for (i = 0; i < config.dataSource.length; i++) {
            gj.tree.methods.appendNode($tree, $root, config.dataSource[i], config);
        }
    },

    appendNode: function ($tree, $parent, nodeData, config) {
        var i, $node, $newParent,
            style = $tree.data().style,
            $node = $('<li/>').addClass(style.item),
            $expander = $('<span data-role="expander" data-mode="close">&nbsp;</span>'),
            $display = $('<span data-role="display">' + nodeData[config.textField] + '</span>');

        $expander.on('click', gj.tree.methods.expanderClickHandler($tree));
        $node.append($expander);

        $display.on('click', gj.tree.methods.displayClickHandler($tree));
        $node.append($display);

        if (nodeData[config.childrenField] && nodeData[config.childrenField].length) {
            $expander.text('+');
            $newParent = $('<ul />').addClass(style.list).addClass('gj-hidden');
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
                $node = $display.parent('li');
            if ($display.attr('data-selected') === 'true') {
                gj.tree.methods.unselect($tree, $node);
            } else {
                if ($tree.data('selectionType') === 'single') {
                    gj.tree.methods.unselectAll($tree);
                }
                gj.tree.methods.select($tree, $node);
            }
        }
    },

    selectAll: function ($tree) {
        var i, $nodes = $tree.find('ul li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.select($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    select: function ($tree, $node, cascade) {
        var $display = $node.children('span[data-role="display"]');
        $display.addClass($tree.data().style.active).attr('data-selected', 'true');
        if (cascade) {
            $children = $node.find('ul li');
            for (i = 0; i < $children.length; i++) {
                gj.tree.methods.select($tree, $($children[i]), cascade);
            }
        }
        gj.tree.events.select($tree, $node);
    },
    
    unselectAll: function ($tree) {
        var i, $nodes = $tree.find('ul li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.unselect($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    unselect: function ($tree, $node, cascade) {
        var i, $children, $display = $node.children('span[data-role="display"]');
        $display.removeClass($tree.data().style.active).removeAttr('data-selected');
        if (cascade) {
            $children = $node.find('ul li');
            for (i = 0; i < $children.length; i++) {
                gj.tree.methods.unselect($tree, $($children[i]), cascade);
            }
        }
        gj.tree.events.unselect($tree, $node);
    }
}