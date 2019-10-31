/* global window alert jQuery gj */
/**
  * @widget Switch
  * @plugin Base
  */
gj.switch = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.switch.config = {
    base: {

        /** The ON label.
         * @type String
         * @default 'ON'
         * @example JS.Config <!-- switch -->
         * <input id="switch" />
         * <script>
         *    $('#switch').switch({ onLabel: 'Yes', offLabel: 'No' });
         * </script>
         */
        onLabel: 'ON',

        /** The OFF label.
         * @type String
         * @default 'OFF'
         * @example JS.Config <!-- switch -->
         * <input id="switch" />
         * <script>
         *    $('#switch').switch({ onLabel: 'Yes', offLabel: 'No' });
         * </script>
         */
        offLabel: 'OFF',

        /** If set to true the widget will be disabled and will not allow the user to change its checked state.
         * @type Boolean
         * @default false
         * @example disabled <!-- switch -->
         * <input id="switch" width="280" />
         * <script>
         *    $('#switch').switch({ disabled: true });
         * </script>
         */
        disabled: false,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- switch -->
         * <input id="switch" width="300" />
         * <script>
         *    $('#switch').switch({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, switch -->
         * <input id="switch" width="300" />
         * <script>
         *     $('#switch').switch({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, switch -->
         * <input id="switch" width="300" />
         * <script>
         *     $('#switch').switch({ uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial switch value.
         * @type Boolean
         * @default false
         * @example Javascript <!-- switch -->
         * <input id="switch" width="300" />
         * <script>
         *    $('#switch').switch({ value: false });
         * </script>
         */
        value: false,

        icons: {},

        style: {}
    },

    bootstrap: {
        style: {}
    },

    bootstrap4: {
        style: {}
    }
};

gj.switch.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'switch');
        this.attr('data-switch', 'true');
        gj.switch.methods.initialize(this);
        return this;
    },

    initialize: function ($switch) {
    },

    destroy: function ($switch) {
        var data = $switch.data();
        if (data) {
            $switch.off();
            $switch.removeData();
            $switch.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-switch');
            $switch.removeClass();
        }
        return $switch;
    }
};

gj.switch.events = {
    /**
     * Fires when the switch value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- switch -->
     * <input id="switch" />
     * <script>
     *     $('#switch').switch({
     *         change: function (e) {
     *             console.log('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($switch) {
        return $switch.triggerHandler('change');
    }
};

GijgoSwitch = function (element, jsConfig) {
    var self = this,
        methods = gj.datepicker.methods;

    self.element = element;

    /** Gets or sets the value of the switch.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- switch -->
     * <button class="gj-button-md" onclick="alert($switch.value())">Get Value</button>
     * <hr/>
     * <input id="switch" />
     * <script>
     *     var $switch = $('#switch').switch();
     * </script>
     * @example Set <!-- switch -->
     * <button class="gj-button-md" onclick="$switch.value(3)">Set Value</button>
     * <hr/>
     * <input id="switch" />
     * <script>
     *     var $switch = $('#switch').switch();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove switch functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- switch -->
     * <button class="gj-button-md" onclick="switch.destroy()">Destroy</button>
     * <input id="switch" />
     * <script>
     *     var switch = $('#switch').switch();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    if ('true' !== element.attr('data-switch')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoSwitch.prototype = new gj.widget();
GijgoSwitch.constructor = gj.switch.widget;

(function ($) {
    $.fn.switch = function (method) {
        var widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new GijgoSwitch(this, method);
            } else {
                widget = new GijgoSwitch(this, null);
                if (widget[method]) {
                    return widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
