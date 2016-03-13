/**
  * @widget Tree
  * @plugin Base
  */
function Grid($grid, arguments) {
    var self = this,
        methods = gj.tree.methods;

    self.xhr = null;
    
    self.reload = function (params) { };

    self.append = function (data, $node) { };

    self.prepend = function (data, $node) { };

    self.expand = function ($node) { };

    self.collapse = function ($node) { };

    self.expandAll = function () { };

    self.collapseAll = function () { };

    self.getById = function (id) { };

    self.getByText = function (text) { };

    //Removes a node from a TreeView, but keeps its jQuery.data() objects.
    self.detach = function ($node) { };
    self.remove = function ($node) { };

    self.destroy = function () { };

    self.select = function (id) { };
    self.unselect = function (id) { };
    self.selectAll = function (id) { };
    self.unselectAll = function (id) { };

    self.getSelection = function () { };
}