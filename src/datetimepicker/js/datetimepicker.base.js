/* global window alert jQuery gj */
/**
  * @widget DateTimePicker
  * @plugin Base
  */
gj.datetimepicker = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.datetimepicker.config = {
    base: {

        datepicker: gj.datepicker.config.base,

        timepicker: gj.timepicker.config.base,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- datetimepicker -->
         * <input id="datetimepicker" width="300" />
         * <script>
         *    $('#datetimepicker').datetimepicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datetimepicker -->
         * <input id="datetimepicker" width="300" />
         * <script>
         *     $('#datetimepicker').datetimepicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datetimepicker -->
         * <input id="datetimepicker" width="300" />
         * <script>
         *     $('#datetimepicker').datetimepicker({ uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial datetimepicker value.
         * @type number
         * @default undefined
         * @example Javascript <!-- datetimepicker -->
         * <input id="datetimepicker" width="300" />
         * <script>
         *    $('#datetimepicker').datetimepicker({ value: 3 });
         * </script>
         * @example HTML <!-- datetimepicker -->
         * <input id="datetimepicker" width="300" value="9" />
         * <script>
         *     $('#datetimepicker').datetimepicker();
         * </script>
         */
        value: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
         * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
         * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
         * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
         * <b>mmm</b> - Month as a three-letter abbreviation.<br/>
         * <b>mmmm</b> - Month as its full name.<br/>
         * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
         * <b>yyyy</b> - Year represented by four digits.<br/>
         * @type String
         * @default 'mm/dd/yyyy'
         * @example Sample <!-- datepicker -->
         * <input id="datepicker" value="2017-25-07" width="312" />
         * <script>
         *     var datepicker = $('#datepicker').datepicker({
         *         format: 'HH:MM yyyy-dd-mm'
         *     });
         * </script>
         * @example Short.Month.Format <!-- datepicker -->
         * <input id="datepicker" value="10 Oct 2017" width="312" />
         * <script>
         *     var datepicker = $('#datepicker').datepicker({
         *         format: 'HH:MM dd mmm yyyy'
         *     });
         * </script>
         * @example Long.Month.Format <!-- datepicker -->
         * <input id="datepicker" value="10 October 2017" width="312" />
         * <script>
         *     var datepicker = $('#datepicker').datepicker({
         *         format: 'dd mmmm yyyy HH:MM'
         *     });
         * </script>
         */
        format: 'HH:MM mm/dd/yyyy',
        
        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'de-de',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Bulgarian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'bg-bg',
         *        format: 'dd mmm yyyy',
         *        weekStartDay: 1
         *    });
         * </script>
         */
        locale: 'en-us',

        icons: {},

        style: {
            calendar: 'gj-picker gj-picker-md datetimepicker'
        }
    },

    bootstrap: {
        style: {},
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {}
    }
};

gj.datetimepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'datetimepicker');
        this.attr('data-datetimepicker', 'true');
        gj.datetimepicker.methods.initialize(this);
        return this;
    },

    initialize: function ($datetimepicker) {
        var $picker, $header, $time, $date,
            $switch, $calendarMode, $clockMode,
            data = $datetimepicker.data();

        // Init datepicker
        data.datepicker.uiLibrary = data.uiLibrary;
        data.datepicker.iconsLibrary = data.iconsLibrary;
        data.datepicker.width = data.width;
        data.datepicker.format = data.format;
        data.datepicker.locale = data.locale;
        data.datepicker.style.calendar = data.style.calendar;
        data.datepicker.autoClose = false;
        gj.datepicker.methods.initialize($datetimepicker, data.datepicker);
        $datetimepicker.on('change', function () {
            gj.timepicker.methods.initMouse($picker.children('[role="body"]'), $datetimepicker, $picker, data.timepicker);
            gj.timepicker.methods.renderHours($datetimepicker, $picker, data.timepicker);
        });

        // Init header
        $picker = $('body').find('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
        
        $header = $('<div role="header" />');
        $date = $('<div role="date" />');
        $date.html(gj.core.formatDate(new Date(), 'dd mmm yy', data.locale));
        $header.append($date);

        $switch = $('<div role="switch"></div>');

        $calendarMode = $('<i class="gj-icon selected" role="calendarMode">event</i>');
        $calendarMode.on('click', function () {
            this.classList.add("selected");
            $clockMode[0].classList.remove("selected");
            $picker.off();
            gj.datepicker.methods.renderMonth($datetimepicker, $picker, data.datepicker);
        });
        $switch.append($calendarMode);

        $time = $('<div role="time" />');
        $time.html(gj.core.formatDate(new Date(), 'HH:MM', data.locale));
        $switch.append($time);

        $clockMode = $('<i class="gj-icon" role="clockMode">clock</i>');
        $clockMode.on('click', function () {
            this.classList.add("selected");
            $calendarMode[0].classList.remove("selected");
            gj.timepicker.methods.initMouse($picker.children('[role="body"]'), $datetimepicker, $picker, data.timepicker);
            gj.timepicker.methods.renderHours($datetimepicker, $picker, data.timepicker);
        });
        $switch.append($clockMode);
        $header.append($switch);

        $picker.prepend($header);

        // Init timepicker
        data.timepicker.uiLibrary = data.uiLibrary;
        data.timepicker.iconsLibrary = data.iconsLibrary;
        data.timepicker.format = data.format;
        data.timepicker.locale = data.locale;
    },

    value: function ($datetimepicker, value) {
        var $calendar, date, data = $datetimepicker.data();
        if (typeof (value) === "undefined") {
            return $datetimepicker.val();
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date) {
                $calendar = $('body').find('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
                gj.datepicker.methods.select($datetimepicker, $calendar, data.datepicker, date)();
            } else {
                $datetimepicker.val('');
            }
            return $datetimepicker;
        }
    },

    destroy: function ($datetimepicker) {
        var data = $datetimepicker.data();
        if (data) {
            $datetimepicker.off();
            $datetimepicker.removeData();
            $datetimepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-datetimepicker');
            $datetimepicker.removeClass();
        }
        return $datetimepicker;
    }
};

gj.datetimepicker.events = {
    /**
     * Fires when the datetimepicker value changes as a result of selecting a new value.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- datetimepicker -->
     * <input id="datetimepicker" />
     * <script>
     *     $('#datetimepicker').datetimepicker({
     *         change: function (e) {
     *             console.log('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($datetimepicker) {
        return $datetimepicker.triggerHandler('change');
    }
};

gj.datetimepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.datetimepicker.methods;

    self.mouseMove = false;

    /** Gets or sets the value of the datetimepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="alert($datetimepicker.value())">Get Value</button>
     * <hr/>
     * <input id="datetimepicker" />
     * <script>
     *     var $datetimepicker = $('#datetimepicker').datetimepicker();
     * </script>
     * @example Set <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="$datetimepicker.value('13:40 08/01/2017')">Set Value</button>
     * <hr/>
     * <input id="datetimepicker" />
     * <script>
     *     var $datetimepicker = $('#datetimepicker').datetimepicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove datetimepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="datetimepicker.destroy()">Destroy</button>
     * <input id="datetimepicker" />
     * <script>
     *     var datetimepicker = $('#datetimepicker').datetimepicker();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-datetimepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.datetimepicker.widget.prototype = new gj.widget();
gj.datetimepicker.widget.constructor = gj.datetimepicker.widget;

(function ($) {
    $.fn.datetimepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.datetimepicker.widget(this, method);
            } else {
                $widget = new gj.datetimepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);