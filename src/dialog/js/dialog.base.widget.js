/** 
  * @widget Dialog 
  * @plugin Base
  */
GijgoDialog = function (element, jsConfig) {
    var self = this,
        methods = gj.datepicker.methods;

    self.element = element;

    /**
     * Opens the dialog.
     * @method
     * @param {String} title - The dialog title.
     * @fires opening, opened
     * @return dialog
     * @example Sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $('#dialog').dialog({
     *         autoOpen: false
     *     });
     * </script>
     * @example Title <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open('Custom Text')" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $('#dialog').dialog({
     *         autoOpen: false
     *     });
     * </script>
     */
    self.open = function (title) {
        return methods.open(this, title);
    };

    /**
     * Close the dialog.
     * @method
     * @fires closing, closed
     * @return dialog
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <button onclick="dialog.close()" class="gj-button-md">Close Dialog</button>
     * <script>
     *     var dialog = $('#dialog').dialog();
     * </script>
     */
    self.close = function () {
        return methods.close(this);
    };

    /**
     * Check if the dialog is currently open.
     * @method
     * @return boolean
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <button onclick="dialog.close()" class="gj-button-md">Close Dialog</button>
     * <button onclick="alert($('#dialog').dialog('isOpen'))" class="gj-button-md">isOpen</button>
     * <script>
     *     var dialog = $('#dialog').dialog();
     * </script>
     */
    self.isOpen = function () {
        return methods.isOpen(this);
    };

    /**
     * Gets or set the content of a dialog. Supports chaining when used as a setter.
     * @method
     * @param {String} content - The content of the Dialog.
     * @return String|Dialog
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="alert(dialog.content())" class="btn btn-default">Get Content</button>
     * <button onclick="dialog.content('New Test Content Value')" class="btn btn-default">Set Content</button>
     * <script>
     *     var dialog = $('#dialog').dialog({ uiLibrary: 'bootstrap' });
     * </script>
     */
    self.content = function (content) {
        return methods.content(this, content);
    };

    /**
     * Destroy the dialog.
     * @method
     * @param {boolean} keepHtml - If this flag is set to false, the dialog html markup will be removed from the HTML dom tree.
     * @return void
     * @example Keep.HTML.Markup <!-- draggable, dialog.base -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="create()" class="gj-button-md">Create</button>
     * <button onclick="dialog.destroy()" class="gj-button-md">Destroy</button>
     * <script>
     *     var dialog;
     *     function create() { 
     *         dialog = $('#dialog').dialog();
     *     }
     * </script>
     * @example Remove.HTML.Markup <!-- draggable, dialog.base -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="create()" class="gj-button-md">Create</button>
     * <button onclick="dialog.destroy(false)" class="gj-button-md">Destroy</button>
     * <script>
     *     var dialog;
     *     function create() {
     *         if ($('#dialog').length === 0) {
     *             alert('The dialog can not be created.');
     *         } else {
     *             dialog = $('#dialog').dialog();
     *         }
     *     }
     * </script>
     */
    self.destroy = function (keepHtml) {
        return methods.destroy(this, keepHtml);
    };

    if ('dialog' !== element.getAttribute('data-type')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDialog.prototype = new gj.widget();
GijgoDialog.constructor = gj.dialog.widget;

GijgoDialog.prototype.getHTMLConfig = gj.dialog.methods.getHTMLConfig;


if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.dialog = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDialog(this, method);
                } else {
                    widget = new GijgoDialog(this, null);
                    if (widget[method]) {
                        return widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}