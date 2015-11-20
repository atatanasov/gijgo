/** 
  * @widget Dialog 
  * @plugin Base
  */
gj.dialog.public = {
    /**
     * Opens the dialog.
     * @method
     * @fires opening, opened
     * @return dialog
     * @example <!-- draggable, dialog, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()">Open Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog({
     *         autoOpen: false
     *     });
     * </script>
     */
    open: function () {
        return gj.dialog.private.open(this);
    },

    /**
     * Close the dialog.
     * @method
     * @fires closinging, closed
     * @return dialog
     * @example <!-- draggable, dialog, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()">Open Dialog</button>
     * <button onclick="dialog.close()">Close Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog();
     * </script>
     */
    close: function () {
        return gj.dialog.private.close(this);
    },

    /**
     * Check if the dialog is currently open.
     * @method
     * @return boolean
     * @example <!-- draggable, dialog, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()">Open Dialog</button>
     * <button onclick="dialog.close()">Close Dialog</button>
     * <button onclick="alert(dialog.isOpen())">isOpen</button>
     * <script>
     *     var dialog = $("#dialog").dialog();
     * </script>
     */
    isOpen: function () {
        return this.is(':visible');
    }
};

(function ($) {
    $.fn.dialog = function (method) {
        if (typeof method === 'object' || !method) {
            function Dialog() {
                var self = this;
                $.extend(self, gj.dialog.public);
            };
            var dialog = new Dialog();
            $.extend(this, dialog);
            return gj.dialog.private.init.apply(this, arguments);
        } else if (gj.dialog.public[method]) {
            return gj.dialog.public[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            throw "Method " + method + " does not exist.";
        }
    };
})(jQuery);