/** 
  * @widget Dialog 
  * @plugin Base
  */
function Dialog($dialog, arguments) {
    var self = this,
        methods = gj.dialog.methods;

    /**
     * Opens the dialog.
     * @method
     * @fires opening, opened
     * @return dialog
     * @example sample <!-- draggable.base, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()">Open Dialog</button>
     * <script>
     *     var dialog = $('#dialog').dialog({
     *         autoOpen: false
     *     });
     * </script>
     */
    self.open = function () {
        return methods.open(this);
    },

    /**
     * Close the dialog.
     * @method
     * @fires closinging, closed
     * @return dialog
     * @example sample <!-- draggable.base, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()">Open Dialog</button>
     * <button onclick="dialog.close()">Close Dialog</button>
     * <script>
     *     var dialog = $('#dialog').dialog();
     * </script>
     */
    self.close = function () {
        return methods.close(this);
    },

    /**
     * Check if the dialog is currently open.
     * @method
     * @return boolean
     * @example sample <!-- draggable.base, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()">Open Dialog</button>
     * <button onclick="dialog.close()">Close Dialog</button>
     * <button onclick="alert($('#dialog').dialog('isOpen'))">isOpen</button>
     * <script>
     *     var dialog = $('#dialog').dialog();
     * </script>
     */
    self.isOpen = function () {
        return methods.isOpen(this);
    }

    $.extend($dialog, self);
    methods.init.apply($dialog, arguments);

    return $dialog;
};

(function ($) {
    $.fn.dialog = function (method) {
        if (typeof method === 'object' || !method) {
            return new Dialog(this, arguments);
        } else if (gj.dialog.methods[method]) {
            return gj.dialog.methods[method].apply(this, [this].concat(Array.prototype.slice.call(arguments, 1)));
        } else {
            throw 'Method ' + method + ' does not exist.';
        }
    };
})(jQuery);