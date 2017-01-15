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

    initialize: function ($chkb) {
        $chkb.on('change', function (e) {
            $chkb.state(this.checked ? 'checked' : 'unchecked');
        });
    },

    state: function ($chkb, value) {
        if (value) {
            if ('checked' === value) {
                $chkb.prop('indeterminate', false);
                $chkb.prop('checked', true);
            } else if ('unchecked' === value) {
                $chkb.prop('indeterminate', false);
                $chkb.prop('checked', false);
            } else if ('indeterminate' === value) {
                $chkb.prop('checked', true);
                $chkb.prop('indeterminate', true);
            }
            gj.checkbox.events.stateChange($chkb, value);
            return $chkb;
        } else {
            if ($chkb.prop('indeterminate')) {
                value = 'indeterminate';
            } else if ($chkb.prop('checked')) {
                value = 'checked';
            } else {
                value = 'unchecked';
            }
            return value;
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
     * Triggered when the state of the checkbox is changed
     *
     * @event drag
     * @param {object} e - event data
     * @param {object} state - The new state of the checkbox.
     * @example sample <!-- checkbox -->
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     $('#checkbox').checkbox({
     *         stateChange: function (e, state) {
     *             alert(state);
     *         }
     *     });
     * </script>
     */
    stateChange: function ($chkb, state) {
        return $chkb.triggerHandler('stateChange', [state]);
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
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var $chkb = $('#checkbox').checkbox();
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
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var $chkb = $('#checkbox').checkbox();
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
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var $chkb = $('#checkbox').checkbox();
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