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
         * @example Sample <!-- nojquery, datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), {
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
         * @example MaterialDesign <!-- nojquery, datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'materialdesign' });
         * </script>
         * @example MaterialDesign.Modal <!-- nojquery, datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'materialdesign', modal: true, footer: true });
         * </script>
         * @example Bootstrap.3 <!-- nojquery, bootstrap, datetimepicker -->
         * <input id="picker" width="220" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- nojquery, bootstrap4, datetimepicker -->
         * <input id="picker" width="234" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'bootstrap4', modal: true, footer: true });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial datetimepicker value.
         * @type number
         * @default undefined
         * @example Javascript <!-- nojquery, datetimepicker -->
         * <input id="picker" width="300" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { value: '22:10 03/27/2018' });
         * </script>
         * @example HTML <!-- nojquery, datetimepicker -->
         * <input id="picker" width="300" value="22:10 03/27/2018" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'));
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
         * @example Sample <!-- nojquery, datetimepicker -->
         * <input id="input" value="05:50 2018-27-03" width="312" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'), { format: 'HH:MM yyyy-dd-mm' });
         * </script>
         * @example Long.Month.Format <!-- nojquery, datetimepicker -->
         * <input id="input" value="10 October 2017 05:50" width="312" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'), { format: 'dd mmmm yyyy HH:MM' });
         * </script>
         */
        format: 'HH:MM mm/dd/yyyy',

        /** The width of the datetimepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- nojquery, datetimepicker -->
         * <input id="input" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { width: 312 });
         * </script>
         * @example HTML.Config <!-- nojquery, datetimepicker -->
         * <input id="input" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'));
         * </script>
         */
        width: undefined,

        /** If set to true, the datetimepicker will have modal behavior.
         * @type Boolean
         * @default false
         * @example Material.Design <!-- nojquery, datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { modal: true });
         * </script>
         * @example Bootstrap <!-- nojquery, bootstrap, datetimepicker -->
         * <input id="picker" width="220" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'bootstrap', modal: true, footer: true });
         * </script>
         * @example Bootstrap.4 <!-- nojquery, bootstrap4, datetimepicker -->
         * <input id="picker" width="234" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'bootstrap4', modal: true, footer: true });
         * </script>
         */
        modal: false,

        /** If set to true, add footer with ok and cancel buttons to the datetimepicker.
         * @type Boolean
         * @default false
         * @example True <!-- nojquery, datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { footer: true, modal: true, header: true });
         * </script>
         * @example False <!-- nojquery, datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { footer: false });
         * </script>
         */
        footer: false,

        /** The size of the datetimepicker input.
         * @type 'small'|'default'|'large'
         * @default 'default'
         * @example Bootstrap.4 <!-- nojquery, bootstrap4, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="234" value="10:20 03/20/2018" /></p>
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('small'), { uiLibrary: 'bootstrap4', size: 'small' });
         *     new GijgoDateTimePicker(document.getElementById('default'), { uiLibrary: 'bootstrap4', size: 'default' });
         *     new GijgoDateTimePicker(document.getElementById('large'), { uiLibrary: 'bootstrap4', size: 'large' });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- nojquery, bootstrap4, fontawesome, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="234" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="234" value="10:20 03/20/2018" /></p>
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('small'), { uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'small' });
         *     new GijgoDateTimePicker(document.getElementById('default'), { uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'default' });
         *     new GijgoDateTimePicker(document.getElementById('large'), { uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'large' });
         * </script>
         * @example Bootstrap.3 <!-- nojquery, bootstrap, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="220" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="220" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="220" value="10:20 03/20/2018" /></p>
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('small'), { uiLibrary: 'bootstrap', size: 'small' });
         *     new GijgoDateTimePicker(document.getElementById('default'), { uiLibrary: 'bootstrap', size: 'default' });
         *     new GijgoDateTimePicker(document.getElementById('large'), { uiLibrary: 'bootstrap', size: 'large' });
         * </script>
         * @example Material.Design <!-- nojquery, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="276" value="10:20 03/20/2018" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="276" value="10:20 03/20/2018" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="276" value="10:20 03/20/2018" /></p>
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('small'), { size: 'small' });
         *     new GijgoDateTimePicker(document.getElementById('default'), { size: 'default' });
         *     new GijgoDateTimePicker(document.getElementById('large'), { size: 'large' });
         * </script>
         */
        size: 'default',
        
        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- nojquery, datetimepicker -->
         * <input id="picker" width="276" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), {
         *        locale: 'de-de',
         *        format: 'HH:MM dd mmm yyyy'
         *    });
         * </script>
         * @example Bulgarian <!-- nojquery, datetimepicker -->
         * <input id="picker" width="276" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), {
         *        locale: 'bg-bg',
         *        format: 'HH:MM dd mmm yyyy',
         *        datepicker: { weekStartDay: 1 }
         *    });
         * </script>
         * @example Chinise_Simplified <!-- nojquery, datetimepicker -->
         * <input id="picker" width="276" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), {
         *        locale: 'zh-cn',
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
        gj.widget.prototype.initJS.call(this, jsConfig, 'datetimepicker');
        this.element.setAttribute('data-datetimepicker', 'true');
        gj.datetimepicker.methods.initialize(this, gijgoStorage.get(this.element, 'gijgo'));
        return this;
    },

    getConfig: function (clientConfig, type) {
        var config = gj.widget.prototype.getConfigJS.call(this, clientConfig, type);

        uiLibrary = clientConfig.hasOwnProperty('uiLibrary') ? clientConfig.uiLibrary : config.uiLibrary;
        if (gj.datepicker.config[uiLibrary]) {
            this.extend(config.datepicker, gj.datepicker.config[uiLibrary]);
        }
        if (gj.timepicker.config[uiLibrary]) {
            this.extend(config.timepicker, gj.timepicker.config[uiLibrary]);
        }

        iconsLibrary = clientConfig.hasOwnProperty('iconsLibrary') ? clientConfig.iconsLibrary : config.iconsLibrary;
        if (gj.datepicker.config[iconsLibrary]) {
            this.extend(config.datepicker, gj.datepicker.config[iconsLibrary]);
        }
        if (gj.timepicker.config[iconsLibrary]) {
            this.extend(config.timepicker, gj.timepicker.config[iconsLibrary]);
        }

        return config;
    },

    initialize: function (picker, data) {
        var date, headerEl, dateEl, switchEl, timeEl, hourEl, separatorEl, minuteEl, calendarMode, clockMode, popup;

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
        gj.datepicker.methods.initialize(picker, data.datepicker);

        popup = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');

        picker.element.addEventListener('select', function (e, type) {
            var selectedDay, value;
            if (type === 'day') {
                gj.datetimepicker.methods.createShowHourHandler($datetimepicker, $picker, data)();
            } else if (type === 'minute') {
                if (picker.element.getAttribute('selectedDay') && data.footer !== true) {
                    selectedDay = picker.element.getAttribute('selectedDay').split('-');
                    date = new Date(selectedDay[0], selectedDay[1], selectedDay[2], picker.element.getAttribute('hour') || 0, picker.element.getAttribute('minute') || 0);
                    value = gj.core.formatDate(date, data.format, data.locale);
                    picker.element.value = value;
                    gj.datetimepicker.events.change(picker);
                    gj.datetimepicker.methods.close(picker);
                }
            }
        });
        picker.element.addEventListener('open', function () {
            var headerEl = popup.querySelector('[role="header"]');
            headerEl.querySelector('[role="calendarMode"]').classList.add('selected');
            headerEl.querySelector('[role="clockMode"]').classList.remove('selected');
        });
        
        date = data.value ? gj.core.parseDate(data.value, data.format, data.locale) : new Date();
        popup.setAttribute('hour', date.getHours());
        popup.setAttribute('minute', date.getMinutes());

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
        headerEl = document.createElement('div');
        headerEl.setAttribute('role', 'header');

        dateEl = document.createElement('div');
        dateEl.setAttribute('role', 'date');
        dateEl.classList.add('selected');
        dateEl.addEventListener('click', gj.datetimepicker.methods.createShowDateHandler(picker, popup, data));
        dateEl.innerHTML = gj.core.formatDate(new Date(), 'ddd, mmm dd', data.locale);
        headerEl.appendChild(dateEl);

        switchEl = document.createElement('div');
        switchEl.setAttribute('role', 'switch');

        calendarMode = document.createElement('i');
        calendarMode.classList.add('gj-icon');
        calendarMode.classList.add('selected');
        calendarMode.setAttribute('role', 'calendarMode');
        calendarMode.innerHTML = 'event';
        calendarMode.addEventListener('click', gj.datetimepicker.methods.createShowDateHandler(picker, popup, data));
        switchEl.appendChild(calendarMode);

        timeEl = document.createElement('div');
        timeEl.setAttribute('role', 'time');
        hourEl = document.createElement('div');
        hourEl.setAttribute('role', 'hour');
        hourEl.addEventListener('click', gj.datetimepicker.methods.createShowHourHandler(picker, popup, data));
        hourEl.innerHTML = gj.core.formatDate(new Date(), 'HH', data.locale);
        separatorEl = document.createElement('div');
        separatorEl.innerText = ':';
        minuteEl = document.createElement('div');
        minuteEl.setAttribute('role', 'minute');
        minuteEl.addEventListener('click', gj.datetimepicker.methods.createShowMinuteHandler(picker, popup, data));
        minuteEl.innerHTML = gj.core.formatDate(new Date(), 'MM', data.locale);
        timeEl.appendChild(hourEl);
        timeEl.appendChild(separatorEl);
        timeEl.appendChild(minuteEl);
        switchEl.appendChild(timeEl);
        

        clockMode = document.createElement('i');
        clockMode.classList.add('gj-icon');
        clockMode.setAttribute('role', 'clockMode');
        clockMode.innerHTML = 'clock';
        clockMode.addEventListener('click', gj.datetimepicker.methods.createShowHourHandler(picker, popup, data));
        switchEl.appendChild(clockMode);

        headerEl.appendChild(switchEl);

        popup.prepend(headerEl);
    },

    createShowDateHandler: function (picker, clock, data) {
        return function (e) {
            var header = clock.querySelector('[role="header"]');
            header.querySelector('[role="calendarMode"]').classList.add('selected');
            header.querySelector('[role="date"]').classList.add('selected');
            header.querySelector('[role="clockMode"]').classList.remove('selected');
            header.querySelector('[role="hour"]').classList.remove('selected');
            header.querySelector('[role="minute"]').classList.remove('selected');
            gj.datepicker.methods.renderMonth(picker, clock, data.datepicker);
        };
    },

    createShowHourHandler: function (picker, clock, data) {
        return function () {
            var header = clock.querySelector('[role="header"]');
            header.querySelector('[role="calendarMode"]').classList.remove('selected');
            header.querySelector('[role="date"]').classList.remove('selected');
            header.querySelector('[role="clockMode"]').classList.add('selected');
            header.querySelector('[role="hour"]').classList.add('selected');
            header.querySelector('[role="minute"]').classList.remove('selected');

            gj.timepicker.methods.initMouse(clock.querySelector('[role="body"]'), picker, clock, data.timepicker);
            gj.timepicker.methods.renderHours(picker, clock, data.timepicker);
        };
    },

    createShowMinuteHandler: function (picker, clock, data) {
        return function () {
            var header = clock.querySelector('[role="header"]');
            header.querySelector('[role="calendarMode"]').classList.remove('selected');
            header.querySelector('[role="date"]').classList.remove('selected');
            header.querySelector('[role="clockMode"]').classList.add('selected');
            header.querySelector('[role="hour"]').classList.remove('selected');
            header.querySelector('[role="minute"]').classList.add('selected');
            gj.timepicker.methods.initMouse(clock.querySelector('[role="body"]'), picker, clock, data.timepicker);
            gj.timepicker.methods.renderMinutes(picker, clock, data.timepicker);
        };
    },

    close: function (picker) {
        gj.datepicker.methods.close(picker);
    },

    value: function (picker, value) {
        var $calendar, date, hour,
            data = gijgoStorage.get(picker.element, 'gijgo');
        if (typeof value === "undefined") {
            return picker.element.value;
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date) {
                clock = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');
                gj.datepicker.methods.dayClickHandler(picker, clock, data, date)();
                // Set Time
                hour = date.getHours();
                if (data.mode === 'ampm') {
                    clock.setAttribute('mode', hour > 12 ? 'pm' : 'am');
                }
                clock.setAttribute('hour', hour);
                clock.setAttribute('minute', date.getMinutes());
                picker.element.value = value;
            } else {
                picker.element.value = '';
            }
            return picker;
        }
    },

    destroy: function (picker) {
        gj.datepicker.methods.destroy(picker);
    }
};

gj.datetimepicker.events = {
    /**
     * Fires when the datetimepicker value changes as a result of selecting a new value.
     *
     * @event change
     * @param {object} e - event data
    * @example sample <!--nojquery, datetimepicker -->
     * <input id="input" width="312" />
     * <script>
     *     new GijgoDateTimePicker(document.getElementById('picker'), {
     *         footer: true,
     *         modal: true,
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    }
};

GijgoDateTimePicker = function (element, jsConfig) {
    var self = this,
        methods = gj.datetimepicker.methods;

    self.element = element;
    self.mouseMove = false;

    /** Gets or sets the value of the datetimepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- nojquery, datetimepicker -->
     * <button class="gj-button-md" onclick="alert(datetimepicker.value())">Get Value</button>
     * <hr/>
     * <input id="picker" width="312" value="17:50 03/27/2018" />
     * <script>
     *     var datetimepicker = new GijgoDateTimePicker(document.getElementById('picker'));
     * </script>
     * @example Set <!-- nojquery, datetimepicker -->
     * <button class="gj-button-md" onclick="datetimepicker.value('13:40 08/01/2017')">Set Value</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var datetimepicker = new GijgoDateTimePicker(document.getElementById('picker'));
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Open the calendar.
     * @method
     * @return datetimepicker
     * @example Open.Close <!-- nojquery, datetimepicker -->
     * <button class="gj-button-md" onclick="picker.open()">Open</button>
     * <button class="gj-button-md" onclick="picker.close()">Close</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoDateTimePicker(document.getElementById('picker'));
     * </script>
     */
    self.open = function () {
        gj.datepicker.methods.open(this, this.data().datepicker);
    };

    /** Close the calendar.
     * @method
     * @return datetimepicker
     * @example Open.Close <!-- nojquery, datetimepicker -->
     * <button class="gj-button-md" onclick="picker.open()">Open</button>
     * <button class="gj-button-md" onclick="picker.close()">Close</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoDateTimePicker(document.getElementById('picker'));
     * </script>
     */
    self.close = function () {
        gj.datepicker.methods.close(this);
    };

    /** Remove datetimepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- nojquery, datetimepicker -->
     * <button class="gj-button-md" onclick="picker.destroy()">Destroy</button>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoDateTimePicker(document.getElementById('picker'));
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    //$.extend($element, self);
    if ('true' !== element.getAttribute('data-datetimepicker')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDateTimePicker.prototype = new gj.widget();
GijgoDateTimePicker.constructor = GijgoDatePicker;
GijgoDateTimePicker.prototype.getConfigJS = gj.datetimepicker.methods.getConfig;

if (typeof jQuery !== "undefined") {
    (function ($) {
        $.fn.datetimepicker = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDateTimePicker(this[0], method);
                } else {
                    $widget = new GijgoDateTimePicker(this[0], null);
                    if ($widget[method]) {
                        return $widget[method].apply(this[0], Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}
