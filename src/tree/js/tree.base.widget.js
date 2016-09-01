/**
  * @widget Tree
  * @plugin Base
  */
gj.tree.widget = function ($element, arguments) {
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

    /**
     * Return node data by id of the record.
     * @method
     * @param {string|number} id - The id of the record that needs to be returned
     * @return object
     * @example sample <!-- tree.base -->
     * <button id="btnGetData">Get Data</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *         primaryKey: 'id' //define the name of the column that you want to use as ID here.
     *     });
     *     $('#btnGetData').on('click', function () {
     *         var data = tree.getById(9);
     *         alert('The population of ' + data.text + ' is ' + data.population);
     *     });
     * </script>
     */
    self.getById = function (id) {
        return methods.getById(this, id, this.data('records'));
    };

    /**
     * Return node data by text.
     * @method
     * @param {string} text - The text of the record that needs to be returned
     * @return object
     * @example sample <!-- tree.base -->
     * <button id="btnGetData">Get Data</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *     });
     *     $('#btnGetData').on('click', function () {
     *         var data = tree.getByText('California');
     *         alert('The population of California is ' + data.population);
     *     });
     * </script>
     */
    self.getByText = function (text) {
        return methods.getByText(this, text, this.data('records'));
    };

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