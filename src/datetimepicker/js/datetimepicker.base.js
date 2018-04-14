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

        /** The datepicker configuration options. Valid only for datepicker specific configuration options.
         * @additionalinfo All configuration options that exists on the datetimepicker level are going to override the options at datepicker level.
         * @type object
         * @default undefined
         * @example Sample <!-- datetimepicker -->
         * <input id="datetimepicker" width="312" />
         * <script>
         *    $('#datetimepicker').datetimepicker({
         *        datepicker: { showOtherMonths: true, calendarWeeks: true }
         *    });
         * </script>
         */
        datepicker: gj.datepicker.config.base,

        timepicker: gj.timepicker.config.base,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- datetimepicker -->
         * <input id="datetimepicker" width="312" />
         * <script>
         *    $('#datetimepicker').datetimepicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example MaterialDesign.Modal <!-- datetimepicker -->
         * <input id="datetimepicker" width="312" />
         * <script>
         *    $('#datetimepicker').datetimepicker({ uiLibrary: 'materialdesign', modal: true, footer: true });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datetimepicker -->
         * <input id="datetimepicker" width="220" />
         * <script>
         *     $('#datetimepicker').datetimepicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datetimepicker -->
         * <input id="datetimepicker" width="234" />
         * <script>
         *     $('#datetimepicker').datetimepicker({ uiLibrary: 'bootstrap4', modal: true, footer: true });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial datetimepicker value.
         * @type number
         * @default undefined
         * @example Javascript <!-- datetimepicker -->
         * <input id="datetimepicker" width="300" />
         * <script>
         *    $('#datetimepicker').datetimepicker({ value: '22:10 03/27/2018' });
         * </script>
         * @example HTML <!-- datetimepicker -->
         * <input id="datetimepicker" width="300" value="22:10 03/27/2018" />
         * <script>
         *     $('#datetimepicker').datetimepicker();
         * </script>
         */
        value: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo <b>M</b> - Minutes; no leading zero for single-digit minutes.<br/>
         * <b>MM</b> - Minutes; leading zero for single-digit minutes.<br/>
         * <b>H</b> - The hour, using a 24-hour clock from 0 to 23; no leading zero for single-digit hours.<br/>
         * <b>HH</b> - The hour, using a 24-hour clock from 0 to 23; leading zero for single-digit hours.<br/>
         * <b>h</b> - The hour, using a 12-hour clock from 1 to 12; no leading zero for single-digit hours.<br/>
         * <b>hh</b> - The hour, using a 12-hour clock from 1 to 12; leading zero for single-digit hours<br/>
         * <b>tt</b> - The AM/PM designator; lowercase.<br/>
         * <b>TT</b> - The AM/PM designator; upercase.<br/>
         * <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
         * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
         * <b>ddd</b> - Day of the week as a three-letter abbreviation.<br/>
         * <b>dddd</b> - Day of the week as its full name.<br/>
         * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
         * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
         * <b>mmm</b> - Month as a three-letter abbreviation.<br/>
         * <b>mmmm</b> - Month as its full name.<br/>
         * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
         * <b>yyyy</b> - Year represented by four digits.<br/>
         * @type String
         * @default 'HH:MM mm/dd/yyyy'
         * @example Sample <!-- datetimepicker -->
         * <input id="input" value="05:50 2018-27-03" width="312" />
         * <script>
         *     $('#input').datetimepicker({ format: 'HH:MM yyyy-dd-mm' });
         * </script>
         * @example Long.Month.Format <!-- datetimepicker -->
         * <input id="input" value="10 October 2017 05:50" width="312" />
         * <script>
         *     $('#input').datetimepicker({ format: 'dd mmmm yyyy HH:MM' });
         * </script>
         */
        format: 'HH:MM mm/dd/yyyy',

        /** The width of the datetimepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- datetimepicker -->
         * <input id="input" />
         * <script>
         *    $('#input').datetimepicker({ width: 312 });
         * </script>
         * @example HTML.Config <!-- datetimepicker -->
         * <input id="input" width="312" />
         * <script>
         *    $('#input').datetimepicker();
         * </script>
         */
        width: undefined,

        /** If set to true, the datetimepicker will have modal behavior.
         * @type Boolean
         * @default false
         * @example Material.Design <!-- datetimepicker -->
         * <input id="input" width="312" />
         * <script>
         *    $('#input').datetimepicker({ modal: true });
         * </script>
         * @example Bootstrap <!-- bootstrap, datetimepicker -->
         * <input id="input" width="220" />
         * <script>
         *    $('#input').datetimepicker({ uiLibrary: 'bootstrap', modal: true, footer: true });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datetimepicker -->
         * <input id="input" width="234" />
         * <script>
         *    $('#input').datetimepicker({ uiLibrary: 'bootstrap4', modal: true, footer: true });
         * </script>
         */
        modal: false,

        /** If set to true, add footer with ok and cancel buttons to the datetimepicker.
         * @type Boolean
         * @default false
         * @example True <!-- datetimepicker -->
         * <input id="input" width="312" />
         * <script>
         *    $('#input').datetimepicker({ footer: true, modal: true, header: true });
         * </script>
         * @example False <!-- datetimepicker -->
         * <input id="input" width="312" />
         * <script>
         *    $('#input').datetimepicker({ footer: false });
         * </script>
         */
        footer: false,

        /** The size of the datetimepicker input.
         * @type 'small'|'default'|'large'
         * @default 'default'
         * @example Bootstrap.4 <!-- bootstrap4, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="234" value="10:20 03/20/2018" /></p>
         * <script>
         *     $('#small').datetimepicker({ uiLibrary: 'bootstrap4', size: 'small' });
         *     $('#default').datetimepicker({ uiLibrary: 'bootstrap4', size: 'default' });
         *     $('#large').datetimepicker({ uiLibrary: 'bootstrap4', size: 'large' });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="234" value="10:20 03/20/2018" /></p>
         * <script>
         *     $('#small').datetimepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'small' });
         *     $('#default').datetimepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'default' });
         *     $('#large').datetimepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'large' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="220" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="220" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="220" value="10:20 03/20/2018" /></p>
         * <script>
         *     $('#small').datetimepicker({ uiLibrary: 'bootstrap', size: 'small' });
         *     $('#default').datetimepicker({ uiLibrary: 'bootstrap', size: 'default' });
         *     $('#large').datetimepicker({ uiLibrary: 'bootstrap', size: 'large' });
         * </script>
         * @example Material.Design <!-- datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="276" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="276" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="276" value="10:20 03/20/2018" /></p>
         * <script>
         *     $('#small').datetimepicker({ size: 'small' });
         *     $('#default').datetimepicker({ size: 'default' });
         *     $('#large').datetimepicker({ size: 'large' });
         * </script>
         */
        size: 'default',
        
        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- datetimepicker -->
         * <input id="input" width="276" />
         * <script>
         *    $('#input').datetimepicker({
         *        locale: 'de-de',
         *        format: 'HH:MM dd mmm yyyy'
         *    });
         * </script>
         * @example Bulgarian <!-- datetimepicker -->
         * <input id="input" width="276" />
         * <script>
         *    $('#input').datetimepicker({
         *        locale: 'bg-bg',
         *        format: 'HH:MM dd mmm yyyy',
         *        datepicker: { weekStartDay: 1 }
         *    });
         * </script>
         */
        locale: 'en-us',

        icons: {},

        style: {
            calendar: 'gj-picker gj-picker-md datetimepicker gj-unselectable'
        }
    },

    bootstrap: {
        style: {
            calendar: 'gj-picker gj-picker-bootstrap datetimepicker gj-unselectable'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            calendar: 'gj-picker gj-picker-bootstrap datetimepicker gj-unselectable'
        }
    }
};

gj.datetimepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'datetimepicker');
        this.attr('data-datetimepicker', 'true');
        gj.datetimepicker.methods.initialize(this);
        return this;
    },

    getConfig: function (clientConfig, type) {
        var config = gj.widget.prototype.getConfig.call(this, clientConfig, type);

        uiLibrary = clientConfig.hasOwnProperty('uiLibrary') ? clientConfig.uiLibrary : config.uiLibrary;
        if (gj.datepicker.config[uiLibrary]) {
            $.extend(true, config.datepicker, gj.datepicker.config[uiLibrary]);
        }
        if (gj.timepicker.config[uiLibrary]) {
            $.extend(true, config.timepicker, gj.timepicker.config[uiLibrary]);
        }

        iconsLibrary = clientConfig.hasOwnProperty('iconsLibrary') ? clientConfig.iconsLibrary : config.iconsLibrary;
        if (gj.datepicker.config[iconsLibrary]) {
            $.extend(true, config.datepicker, gj.datepicker.config[iconsLibrary]);
        }
        if (gj.timepicker.config[iconsLibrary]) {
            $.extend(true, config.timepicker, gj.timepicker.config[iconsLibrary]);
        }

        return config;
    },

    initialize: function ($datetimepicker) {
        var $picker, $header, $date, $time, date,
            $switch, $calendarMode, $clockMode,
            data = $datetimepicker.data();

        // Init datepicker
        data.datepicker.uiLibrary = data.uiLibrary;
        data.datepicker.iconsLibrary = data.iconsLibrary;
        data.datepicker.width = data.width;
        data.datepicker.format = data.format;
        data.datepicker.locale = data.locale;
        data.datepicker.modal = data.modal;
        data.datepicker.footer = data.footer;
        data.datepicker.style.calendar = data.style.calendar;
        data.datepicker.value = data.value;
        data.datepicker.size = data.size;
        data.datepicker.autoClose = false;
        gj.datepicker.methods.initialize($datetimepicker, data.datepicker);
        $datetimepicker.on('select', function (e, type) {
            var date, value;
            if (type === 'day') {
                gj.datetimepicker.methods.createShowHourHandler($datetimepicker, $picker, data)();
            } else if (type === 'minute') {
                if ($picker.attr('selectedDay') && data.footer !== true) {
                    selectedDay = $picker.attr('selectedDay').split('-');
                    date = new Date(selectedDay[0], selectedDay[1], selectedDay[2], $picker.attr('hour') || 0, $picker.attr('minute') || 0);
                    value = gj.core.formatDate(date, data.format, data.locale);
                    $datetimepicker.val(value);
                    gj.datetimepicker.events.change($datetimepicker);
                    gj.datetimepicker.methods.close($datetimepicker);
                }
            }
        });
        $datetimepicker.on('open', function () {
            var $header = $picker.children('[role="header"]');
            $header.find('[role="calendarMode"]').addClass("selected");
            $header.find('[role="clockMode"]').removeClass("selected");
        });

        $picker = $('body').find('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
        date = data.value ? gj.core.parseDate(data.value, data.format, data.locale) : new Date();
        $picker.attr('hour', date.getHours());
        $picker.attr('minute', date.getMinutes());

        // Init timepicker
        data.timepicker.uiLibrary = data.uiLibrary;
        data.timepicker.iconsLibrary = data.iconsLibrary;
        data.timepicker.format = data.format;
        data.timepicker.locale = data.locale;
        data.timepicker.header = true;
        data.timepicker.footer = data.footer;
        data.timepicker.size = data.size;
        data.timepicker.mode = '24hr';
        data.timepicker.autoClose = false;

        // Init header        
        $header = $('<div role="header" />');
        $date = $('<div role="date" class="selected" />');
        $date.on('click', gj.datetimepicker.methods.createShowDateHandler($datetimepicker, $picker, data));
        $date.html(gj.core.formatDate(new Date(), 'ddd, mmm dd', data.locale));
        $header.append($date);

        $switch = $('<div role="switch"></div>');

        $calendarMode = $('<i class="gj-icon selected" role="calendarMode">event</i>');
        $calendarMode.on('click', gj.datetimepicker.methods.createShowDateHandler($datetimepicker, $picker, data));
        $switch.append($calendarMode);

        $time = $('<div role="time" />');
        $time.append($('<div role="hour" />').on('click', gj.datetimepicker.methods.createShowHourHandler($datetimepicker, $picker, data)).html(gj.core.formatDate(new Date(), 'HH', data.locale)));
        $time.append(':');
        $time.append($('<div role="minute" />').on('click', gj.datetimepicker.methods.createShowMinuteHandler($datetimepicker, $picker, data)).html(gj.core.formatDate(new Date(), 'MM', data.locale)));
        $switch.append($time);

        $clockMode = $('<i class="gj-icon" role="clockMode">clock</i>');
        $clockMode.on('click', gj.datetimepicker.methods.createShowHourHandler($datetimepicker, $picker, data));
        $switch.append($clockMode);
        $header.append($switch);

        $picker.prepend($header);
    },

    createShowDateHandler: function ($datetimepicker, $picker, data) {
        return function (e) {
            var $header = $picker.children('[role="header"]');
            $header.find('[role="calendarMode"]').addClass("selected");
            $header.find('[role="date"]').addClass("selected");
            $header.find('[role="clockMode"]').removeClass("selected");
            $header.find('[role="hour"]').removeClass("selected");
            $header.find('[role="minute"]').removeClass("selected");
            gj.datepicker.methods.renderMonth($datetimepicker, $picker, data.datepicker);
        };
    },

    createShowHourHandler: function ($datetimepicker, $picker, data) {
        return function () {
            var $header = $picker.children('[role="header"]');
            $header.find('[role="calendarMode"]').removeClass("selected");
            $header.find('[role="date"]').removeClass("selected");
            $header.find('[role="clockMode"]').addClass("selected");
            $header.find('[role="hour"]').addClass("selected");
            $header.find('[role="minute"]').removeClass("selected");

            gj.timepicker.methods.initMouse($picker.children('[role="body"]'), $datetimepicker, $picker, data.timepicker);
            gj.timepicker.methods.renderHours($datetimepicker, $picker, data.timepicker);
        };
    },

    createShowMinuteHandler: function ($datetimepicker, $picker, data) {
        return function () {
            var $header = $picker.children('[role="header"]');
            $header.find('[role="calendarMode"]').removeClass("selected");
            $header.find('[role="date"]').removeClass("selected");
            $header.find('[role="clockMode"]').addClass("selected");
            $header.find('[role="hour"]').removeClass("selected");
            $header.find('[role="minute"]').addClass("selected");
            gj.timepicker.methods.initMouse($picker.children('[role="body"]'), $datetimepicker, $picker, data.timepicker);
            gj.timepicker.methods.renderMinutes($datetimepicker, $picker, data.timepicker);
        };
    },

    close: function ($datetimepicker) {
        var $calendar = $('body').find('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
        $calendar.hide();
        $calendar.closest('div[role="modal"]').hide();
        //gj.datepicker.events.close($datepicker);
    },

    value: function ($datetimepicker, value) {
        var $calendar, date, hour, data = $datetimepicker.data();
        if (typeof (value) === "undefined") {
            return $datetimepicker.val();
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date) {
                $calendar = $('body').find('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
                gj.datepicker.methods.dayClickHandler($datetimepicker, $calendar, data, date)();
                // Set Time
                hour = date.getHours();
                if (data.mode === 'ampm') {
                    $calendar.attr('mode', hour > 12 ? 'pm' : 'am');
                }
                $calendar.attr('hour', hour);
                $calendar.attr('minute', date.getMinutes());
            } else {
                $datetimepicker.val('');
            }
            return $datetimepicker;
        }
    },

    destroy: function ($datetimepicker) {
        var data = $datetimepicker.data(),
            $parent = $datetimepicker.parent(),
            $picker = $('body').find('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
        if (data) {
            $datetimepicker.off();
            if ($picker.parent('[role="modal"]').length > 0) {
                $picker.unwrap();
            }
            $picker.remove();
            $datetimepicker.removeData();
            $datetimepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-datetimepicker');
            $datetimepicker.removeClass();
            $parent.children('[role="right-icon"]').remove();
            $datetimepicker.unwrap();
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
     * <input id="input" width="312" />
     * <script>
     *     $('#input').datetimepicker({
     *         footer: true,
     *         modal: true,
     *         change: function (e) {
     *             alert('Change is fired');
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
     * <input id="datetimepicker" width="312" value="17:50 03/27/2018" />
     * <script>
     *     var $datetimepicker = $('#datetimepicker').datetimepicker();
     * </script>
     * @example Set <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="$datetimepicker.value('13:40 08/01/2017')">Set Value</button>
     * <hr/>
     * <input id="datetimepicker" width="312" />
     * <script>
     *     var $datetimepicker = $('#datetimepicker').datetimepicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Open the calendar.
     * @method
     * @return datetimepicker
     * @example Open.Close <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="$picker.open()">Open</button>
     * <button class="gj-button-md" onclick="$picker.close()">Close</button>
     * <hr/>
     * <input id="input" width="312" />
     * <script>
     *     var $picker = $('#input').datetimepicker();
     * </script>
     */
    self.open = function () {
        gj.datepicker.methods.open(this, this.data().datepicker);
    };

    /** Close the calendar.
     * @method
     * @return datetimepicker
     * @example Open.Close <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="$picker.open()">Open</button>
     * <button class="gj-button-md" onclick="$picker.close()">Close</button>
     * <hr/>
     * <input id="input" width="312" />
     * <script>
     *     var $picker = $('#input').datetimepicker();
     * </script>
     */
    self.close = function () {
        gj.datepicker.methods.close(this);
    };

    /** Remove datetimepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="datetimepicker.destroy()">Destroy</button>
     * <input id="datetimepicker" width="312" />
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

gj.datetimepicker.widget.prototype.getConfig = gj.datetimepicker.methods.getConfig;

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