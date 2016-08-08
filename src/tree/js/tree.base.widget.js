/**
  * @widget Tree
  * @plugin Base
  */
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