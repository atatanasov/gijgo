/* global window alert jQuery gj */
/*
 * Gijgo JavaScript Library v1.0.0
 * http://gijgo.com/
 *
 * Copyright 2014, 2016 gijgo.com
 * Released under the MIT license
 */
/** */
if (typeof(gj) === 'undefined') {
    gj = {};
}
if (typeof(gj.tree) === 'undefined') {
    gj.tree = {
        plugins: {}
    };
}

gj.tree.config = {
    base: {

        /** When this setting is enabled the content of the tree will be loaded automatically after the creation of the tree. */
        autoLoad: true,
        selectionType: 'single',
        selectionMethod: 'basic',
        checkChildren: false,
        dataSource: undefined,
        primaryKey: undefined,
        textField: 'text',
        childrenField: 'children',
        lazyLoading: false,
        tmpl: undefined
    },

    bootstrap: {},

    jqueryui: {}
};
/** */
gj.tree.events = {
    /**
     * Event fires  */
    dataBinding: function ($tree) {
        $tree.trigger('dataBinding', []);
    },

    /**
     * Event fires  */
    dataBound: function ($tree) {
        $tree.trigger('dataBound', []);
    },

    /**
     * Event fires  */
    destroying: function ($tree) {
        $tree.trigger('destroying', []);
    },

    /**
     * Event fires  */
    initialized: function ($tree) {
        $tree.trigger('initialized', []);
    },

    /**
     * Event fires  */
    select: function ($tree) {
        $tree.trigger('select', []);
    },

    /**
     * Event fires  */
    unselect: function ($tree) {
        $tree.trigger('unselect', []);
    },

    /**
     * Event fires  */
    collapsing: function ($tree) {
        $tree.trigger('collapsing', []);
    },

    /**
     * Event fires  */
    collapsed: function ($tree) {
        $tree.trigger('collapsed', []);
    },

    /**
     * Event fires  */
    expanding: function ($tree) {
        $tree.trigger('expanding', []);
    },

    /**
     * Event fires  */
    expanded: function ($tree) {
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
/** */
gj.tree.widget = function ($element, arguments) {
    var self = this,
        methods = gj.tree.methods;

    self.xhr = null;

    self.reload = function (params) {
        methods.reload.call(this, params);
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
    self.selectAll = function (id) { };
    self.unselectAll = function (id) { };

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
