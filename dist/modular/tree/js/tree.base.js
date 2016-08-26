/* global window alert jQuery gj */
/*
 * Gijgo JavaScript Library v1.0.0
 * http://gijgo.com/
 *
 * Copyright 2014, 2016 gijgo.com
 * Released under the MIT license
 */
/**  */if (typeof(gj) === 'undefined') {
    gj = {};
}
if (typeof(gj.tree) === 'undefined') {
    gj.tree = {
        plugins: {}
    };
}

gj.tree.config = {
    base: {

        /** When this setting is enabled the content of the tree will be loaded automatically after the creation of the tree.         */        autoLoad: true,

        /** The type of the node selection.<br/>
         * If the type is set to multiple the user will be able to select more then one node in the tree.         */        selectionType: 'single',

        /** This setting enable cascade selection and unselection of children         */        cascadeSelection: false,

        /** The data source of tree.         */        dataSource: undefined,

        primaryKey: undefined,
        textField: 'text',
        valueField: undefined,
        childrenField: 'children',

        /** Width of the tree.         */        width: undefined,

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'base',

        style: {
            wrapper: 'gj-tree-unselectable',
            list: 'gj-tree-list',
            item: 'gj-tree-item',
            active: 'gj-tree-base-active',
            leftSpacer: undefined,
            expander: 'gj-tree-expander',
            display: 'gj-tree-display',
            expandIcon: undefined,
            collapseIcon: undefined,
            leafIcon: undefined
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-tree-unselectable',
            list: 'gj-bootstrap-tree-list list-group',
            item: 'gj-bootstrap-tree-item list-group-item',
            active: 'active',
            leftSpacer: 'gj-tree-bootstrap-left-spacer',
            expander: 'gj-tree-bootstrap-expander glyphicon',
            display: 'gj-tree-bootstrap-display',
            expandIcon: 'glyphicon-plus',
            collapseIcon: 'glyphicon-minus',
            leafIcon: undefined
        }
    },

    jqueryui: {}
};
/**  */gj.tree.events = {
    /**
     * Event fires when the tree is initialized     */    initialized: function ($tree) {
        $tree.trigger('initialized', []);
    },

    /**
     * Event fired before data binding takes place.     */    dataBinding: function ($tree) {
        $tree.trigger('dataBinding', []);
    },

    /**
     * Event fires after the loading of the data in the grid.     */    dataBound: function ($tree) {
        $tree.trigger('dataBound', []);
    },

    /**
     * Event fires      */    destroying: function ($tree) {
        $tree.trigger('destroying', []);
    },

    /**
     * Event fires      */    select: function ($tree) {
        $tree.trigger('select', []);
    },

    /**
     * Event fires      */    unselect: function ($tree) {
        $tree.trigger('unselect', []);
    },

    /**
     * Event fires      */    collapsing: function ($tree) {
        $tree.trigger('collapsing', []);
    },

    /**
     * Event fires      */    collapsed: function ($tree) {
        $tree.trigger('collapsed', []);
    },

    /**
     * Event fires      */    expanding: function ($tree) {
        $tree.trigger('expanding', []);
    },

    /**
     * Event fires      */    expanded: function ($tree) {
        $tree.trigger('expanded', []);
    }
}
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
        var data = this.data(),
            $root = $('<ul class="' + data.style.list + '"/>');
        this.empty().addClass(data.style.wrapper).append($root);
        if (data.width) {
            this.width(data.width);
        }
        gj.tree.events.initialized(this);
    },

    render: function ($tree, response) {
        var i, $root = $tree.children('ul');

        gj.tree.events.dataBinding($tree);
        $root.off().empty();
        for (i = 0; i < response.length; i++) {
            gj.tree.methods.appendNode($tree, $root, response[i], 1);
        }
        gj.tree.events.dataBound($tree);

        return $tree;
    },

    appendNode: function ($tree, $parent, nodeData, level) {
        var i, $node, $newParent,
            data = $tree.data(),
            $node = $('<li/>').addClass(data.style.item),
            $expander = $('<span data-role="expander" data-mode="close"></span>'),
            $display = $('<span data-role="display">' + nodeData[data.textField] + '</span>');

        if (data.style.leftSpacer) {
            for (i = 1; i < level; i++) {
                $node.append('<span data-role="spacer" class="' + data.style.leftSpacer + '"></span>');
            }
        }

        $expander.addClass(data.style.expander).on('click', gj.tree.methods.expanderClickHandler($tree));
        $node.append($expander);

        $display.addClass(data.style.display).on('click', gj.tree.methods.displayClickHandler($tree));
        $node.append($display);

        if (nodeData[data.childrenField] && nodeData[data.childrenField].length) {
            data.style.expandIcon ? $expander.addClass(data.style.expandIcon) : $expander.text('+');
            $newParent = $('<ul />').addClass(data.style.list).addClass('gj-hidden');
            $node.append($newParent);
            
            for (i = 0; i < nodeData[data.childrenField].length; i++) {
                gj.tree.methods.appendNode($tree, $newParent, nodeData[data.childrenField][i], level + 1);
            }  
        } else {
            data.style.leafIcon ? $expander.addClass(data.style.leafIcon) : $expander.html('&nbsp;');
        }

        $parent.append($node);
    },

    expanderClickHandler: function ($tree) {
        return function (e) {
            var $expander = $(this),
                $children = $expander.siblings('ul'),
                data = $tree.data(),
                events = gj.tree.events;
            if ($expander.attr('data-mode') === 'close') {
                events.expanding($tree);
                $children.show();
                $expander.attr('data-mode', 'open');
                data.style.collapseIcon ? $expander.removeClass(data.style.expandIcon).addClass(data.style.collapseIcon) : $expander.text('-');
                events.expanded($tree);
            } else {
                events.collapsing($tree);
                $children.hide();
                $expander.attr('data-mode', 'close');
                data.style.expandIcon ? $expander.removeClass(data.style.collapseIcon).addClass(data.style.expandIcon) : $expander.text('+');
                events.collapsed($tree);
            }
        }
    },

    displayClickHandler: function ($tree) {
        return function (e) {
            var $display = $(this),
                $node = $display.parent('li'),
                cascade = $tree.data().cascadeSelection;
            if ($node.attr('data-selected') === 'true') {
                gj.tree.methods.unselect($tree, $node, cascade);
            } else {
                if ($tree.data('selectionType') === 'single') {
                    gj.tree.methods.unselectAll($tree);
                }
                gj.tree.methods.select($tree, $node, cascade);
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
        var i, $children, data = $tree.data();
        $node.addClass(data.style.active).attr('data-selected', 'true');
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
        var i, $children, data = $tree.data();
        $node.removeClass($tree.data().style.active).removeAttr('data-selected');
        if (cascade) {
            $children = $node.find('ul li');
            for (i = 0; i < $children.length; i++) {
                gj.tree.methods.unselect($tree, $($children[i]), cascade);
            }
        }
        gj.tree.events.unselect($tree, $node);
    }
}
/**  */gj.tree.widget = function ($element, arguments) {
    var self = this,
        methods = gj.tree.methods;

    self.reload = function (params) {
        return gj.widget.prototype.reload.call(this, params);
    };

    self.render = function (response) {
        return methods.render(this, response);
    };

    self.appendNode = function (data, $node) { };

    self.prependNode = function (data, $node) { };

    self.expand = function ($node) { };

    self.collapse = function ($node) { };

    self.expandAll = function () { };

    self.collapseAll = function () { };

    self.getById = function (id) { };

    self.getByText = function (text) { };

    self.remove = function ($node) { };

    self.destroy = function () { };

    self.select = function (id) { };
    self.unselect = function (id) { };

    self.selectAll = function () {
        return methods.selectAll(this);
    };

    self.unselectAll = function () {
        return methods.unselectAll(this);
    };

    self.getSelection = function () { };

    $.extend($element, self);
    if ('true' !== $element.attr('data-tree')) {
        methods.init.apply($element, arguments);
    }

    return $element;
};

gj.tree.widget.prototype = new gj.widget();
gj.tree.widget.constructor = gj.tree.widget;

(function ($) {
    $.fn.tree = function (method) {
        var $widget;
        if (typeof method === 'object' || !method) {
            return new gj.tree.widget(this, arguments);
        } else {
            $widget = new gj.tree.widget(this, null);
            if ($widget[method]) {
                return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                throw 'Method ' + method + ' does not exist.';
            }
        }
    };
})(jQuery);
