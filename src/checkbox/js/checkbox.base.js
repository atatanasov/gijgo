/* global window alert jQuery */
/** 
 * @widget Checkbox 
 * @plugin Base
 */
if (typeof (gj.checkbox) === 'undefined') {
    gj.checkbox = {};
}

gj.checkbox.config = {
    base: {
        /** 
         * @type Number
         * @default undefined
         * @example sample <!-- checkbox -->
         * <div id="element"></div>
         * <script>
         *     $('#element').checkbox({
         *         width: 100
         *     });
         * </script>
         */
        width: undefined
    }
};

gj.checkbox.methods = {
    init: function (jsConfig) {
        var $chkb = this;

        gj.widget.prototype.init.call(this, jsConfig, 'checkbox');
        $chkb.attr('data-checkbox', 'true');

        gj.checkbox.methods.initialize($chkb);

        return $chkb;
    },

    initialize: function($chkb) {
        var $display = $('<span data-role="display"></span>');
        $chkb.addClass('gj-checkbox').append($display);
    },

    state: function ($chkb, value) {
        var $display = $chkb.find('span[data-role="display"]');
        if (value) {
            if ('checked' === value) {
                $display.text('✓');
                $chkb.data('state', 'checked');
            } else if ('unchecked' === value) {
                $display.text('');
                $chkb.data('state', 'unchecked');
            } else if ('indeterminate' === value) {
                $display.text('■');
                $chkb.data('state', 'indeterminate');
            }
            return $chkb;
        } else {
            return $chkb.data('state');
        }
    },

    toggle: function ($chkb) {
        if ($chkb.data('state') == 'checked') {
            $chkb.state('unchecked');
        } else {
            $chkb.state('checked');
        }
        return $chkb;
    },

    destroy: function ($chkb) {
        if ($chkb.attr('data-checkbox') === 'true') {
            $chkb.removeData();
            $chkb.removeAttr('data-guid');
            $chkb.removeAttr('data-checkbox');
            $chkb.off();
        }
        return $chkb;
    }
};

gj.checkbox.events = {
    /**
     * Triggered while the mouse is moved during the dragging, immediately before the current move happens.
     *
     * @event drag
     * @param {object} e - event data
     * @param {object} state - Current offset position as { top, left } object.
     * @example sample <!-- checkbox -->
     * <div id="element">drag me</div>
     * <script>
     *     $('#element').checkbox({
     *         drag: function (e, offset) {
     *             $('body').append('<div>The drag event is fired. offset { top:' + offset.top + ', left: ' + offset.left + '}.</div>');
     *         }
     *     });
     * </script>
     */
    change: function (state) {
        return $dragEl.triggerHandler('change', [state]);
    }
};


gj.checkbox.widget = function ($element, arguments) {
    var self = this,
        methods = gj.checkbox.methods;

    /** Toogle the state of the checkbox.
     * @method
     * @fires change
     * @return checked|unchecked|indeterminate|jquery
     * @example sample <!-- checkbox -->
     * <button onclick="$chkb.toggle()">toggle</button>
     * <hr/>
     * <div id="element"></div>
     * <script>
     *     var $chkb = $('#element').checkbox();
     * </script>
     */
    self.toggle = function () {
        return methods.toggle(this);
    };

    /** Return state or set state if you pass parameter.
     * @method
     * @fires change
     * @param {string} value - State of the checkbox. Accept only checked, unchecked or indeterminate as values.
     * @return checked|unchecked|indeterminate|jquery
     * @example sample <!-- checkbox -->
     * <button onclick="$chkb.state('checked')">Set to checked</button>
     * <button onclick="$chkb.state('unchecked')">Set to unchecked</button>
     * <button onclick="$chkb.state('indeterminate')">Set to indeterminate</button>
     * <button onclick="alert($chkb.state())">Get state</button>
     * <hr/>
     * <div id="element"></div>
     * <script>
     *     var $chkb = $('#element').checkbox();
     * </script>
     */
    self.state = function (value) {
        return methods.state(this, value);
    };

    /** Remove checkbox functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- checkbox -->
     * <button onclick="$chkb.destroy()">Destroy</button>
     * <div id="element"></div>
     * <script>
     *     var $chkb = $('#element').checkbox();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-checkbox')) {
        methods.init.apply($element, arguments);
    }

    return $element;
};

gj.checkbox.widget.prototype = new gj.widget();
gj.checkbox.widget.constructor = gj.checkbox.widget;

(function ($) {
    $.fn.checkbox = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.checkbox.widget(this, arguments);
            } else {
                $widget = new gj.checkbox.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);