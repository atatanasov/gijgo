/* global window alert jQuery gj */
/**
  * @widget ColorPicker
  * @plugin Base
  */
gj.colorpicker = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.colorpicker.config = {
    base: {

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *    $('#colorpicker').colorpicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *     $('#colorpicker').colorpicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *     $('#colorpicker').colorpicker({ uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial colorpicker value.
         * @type number
         * @default undefined
         * @example Javascript <!-- colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *    $('#colorpicker').colorpicker({ value: '#FF0000' });
         * </script>
         * @example HTML <!-- colorpicker -->
         * <input id="colorpicker" width="300" value="#FF0000" />
         * <script>
         *     $('#colorpicker').colorpicker();
         * </script>
         */
        value: undefined,

        icons: {
            rightIcon: '<i class="gj-icon">event</i>'
        },

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-colorpicker gj-colorpicker-md gj-unselectable',
            input: 'gj-textbox-md',
            picker: 'gj-picker gj-picker-md colorpicker gj-unselectable',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {}
    },

    bootstrap4: {
        style: {}
    }
};

gj.colorpicker.methods = {
    init: function (jsConfig) {
        gj.picker.widget.prototype.init.call(this, jsConfig, 'colorpicker', gj.colorpicker.methods);
        this.attr('data-colorpicker', 'true');
        gj.colorpicker.methods.initialize(this);
        return this;
    },

    initialize: function ($colorpicker) {
    },

    createPicker: function ($input, data) {
        var $picker = $('<div role="picker" />').addClass(data.style.picker).attr('guid', $input.attr('data-guid'));

        $picker.html('test');

        $picker.hide();
        $('body').append($picker);

        return $picker;
    },

    open: function ($widget) {
        var data = $widget.data(),
            $picker = $('body').find('[role="picker"][guid="' + $widget.attr('data-guid') + '"]');

        if ($widget.val()) {
            $widget.value($widget.val());
        }

        $picker.show();
        $picker.closest('div[role="modal"]').show();
        if (data.modal) {
            gj.core.center($picker);
        } else {
            gj.core.setChildPosition($widget[0], $picker[0]);
            $widget.focus();
        }
        clearTimeout($widget.timeout);
        gj.colorpicker.events.open($widget);
    },

    close: function ($widget) {
        var $picker = $('body').find('[role="picker"][guid="' + $widget.attr('data-guid') + '"]');
        $picker.hide();
        $picker.closest('div[role="modal"]').hide();
        gj.colorpicker.events.close($widget);
    },

    destroy: function ($colorpicker) {
        var data = $colorpicker.data();
        if (data) {
            $colorpicker.off();
            $colorpicker.removeData();
            $colorpicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-colorpicker');
            $colorpicker.removeClass();
        }
        return $colorpicker;
    }
};

gj.colorpicker.events = {
    /**
     * Fires when the colorpicker value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="colorpicker" />
     * <script>
     *     $('#colorpicker').colorpicker({
     *         change: function (e) {
     *             console.log('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($colorpicker) {
        return $colorpicker.triggerHandler('change');
    },

    /**
     * Fires as a new color is displayed in the drop-down picker.
     * @additionalinfo This is not necessarily the "final" value; for example this event triggers when the sliders in the HSV selector are dragged, but then pressing ESC would cancel the selection and the color will revert to the original value.
     * @event select
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="colorpicker" />
     * <script>
     *     $('#colorpicker').colorpicker({
     *         select: function (e) {
     *             console.log('select is fired');
     *         }
     *     });
     * </script>
     */
    select: function ($colorpicker) {
        return $colorpicker.triggerHandler('select');
    },

    /**
     * Fires when the picker popup is opening.
     * @event open
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="colorpicker" />
     * <script>
     *     $('#colorpicker').colorpicker({
     *         open: function (e) {
     *             console.log('open is fired');
     *         }
     *     });
     * </script>
     */
    open: function ($colorpicker) {
        return $colorpicker.triggerHandler('open');
    },

    /**
     * Fires when the picker popup is closing.
     * @event close
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="colorpicker" />
     * <script>
     *     $('#colorpicker').colorpicker({
     *         close: function (e) {
     *             console.log('close is fired');
     *         }
     *     });
     * </script>
     */
    close: function ($colorpicker) {
        return $colorpicker.triggerHandler('close');
    }
};

gj.colorpicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.colorpicker.methods;

    /** Gets or sets the value of the colorpicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- colorpicker -->
     * <button class="gj-button-md" onclick="alert($colorpicker.value())">Get Value</button>
     * <hr/>
     * <input id="colorpicker" />
     * <script>
     *     var $colorpicker = $('#colorpicker').colorpicker();
     * </script>
     * @example Set <!-- colorpicker -->
     * <button class="gj-button-md" onclick="$colorpicker.value('#FF0000')">Set Value</button>
     * <hr/>
     * <input id="colorpicker" />
     * <script>
     *     var $colorpicker = $('#colorpicker').colorpicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove colorpicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- colorpicker -->
     * <button class="gj-button-md" onclick="colorpicker.destroy()">Destroy</button>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = $('#colorpicker').colorpicker();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Opens the popup element with the color selector.
     * @method
     * @return jquery element
     * @example sample <!-- colorpicker -->
     * <button class="gj-button-md" onclick="colorpicker.open()">Open</button>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = $('#colorpicker').colorpicker();
     * </script>
     */
    self.open = function () {
        return methods.open(this);
    };

    /** Close the popup element with the color selector.
     * @method
     * @return jquery element
     * @example sample <!-- colorpicker -->
     * <button class="gj-button-md" onclick="colorpicker.close()">Close</button>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = $('#colorpicker').colorpicker();
     * </script>
     */
    self.close = function () {
        return methods.close(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-colorpicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.colorpicker.widget.prototype = new gj.picker.widget();
gj.colorpicker.widget.constructor = gj.colorpicker.widget;

(function ($) {
    $.fn.colorpicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.colorpicker.widget(this, method);
            } else {
                $widget = new gj.colorpicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);