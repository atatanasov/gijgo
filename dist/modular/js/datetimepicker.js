/*
 * Gijgo DateTimePicker v2.0.0-alpha-1
 * http://gijgo.com/datetimepicker
 *
 * Copyright 2014, 2018 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.datetimepicker = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.datetimepicker.config = {
    base: {

        /** The datepicker configuration options. Valid only for datepicker specific configuration options.         */        datepicker: gj.datepicker.config.base,

        timepicker: gj.timepicker.config.base,

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The initial datetimepicker value.         */        value: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.         */        format: 'HH:MM mm/dd/yyyy',

        /** The width of the datetimepicker.         */        width: undefined,

        /** If set to true, the datetimepicker will have modal behavior.         */        modal: false,

        /** If set to true, add footer with ok and cancel buttons to the datetimepicker.         */        footer: false,

        /** The size of the datetimepicker input.         */        size: 'default',
        
        /** The language that needs to be in use.         */        locale: 'en-us',

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
    },

    bootstrap5: {
        style: {
            calendar: 'gj-picker gj-picker-bootstrap datetimepicker gj-unselectable'
        }
    }
};

gj.datetimepicker.methods = {
    init: function (jsConfig) {
        this.type = 'datetimepicker';
        gj.widget.prototype.initJS.call(this, jsConfig);
        this.element.setAttribute('data-datetimepicker', 'true');
        gj.datetimepicker.methods.initialize(this, gijgoStorage.get(this.element, this.type));
        return this;
    },

    readConfig: function (clientConfig, type) {
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

        picker.element.addEventListener('select', function (e) {
            var selectedDay, date, value;
            if (e.detail.type === 'day') {
                gj.datetimepicker.methods.createShowHourHandler(picker, popup, data)();
            } else if (e.detail.type === 'minute') {
                if (popup.getAttribute('selectedDay') && data.footer !== true) {
                    selectedDay = popup.getAttribute('selectedDay').split('-');
                    date = new Date(selectedDay[0], selectedDay[1], selectedDay[2], popup.getAttribute('hour') || 0, popup.getAttribute('minute') || 0);
                    value = gj.core.formatDate(date, data.format, data.locale);
                    picker.element.value = value;
                    gj.datetimepicker.events.change(picker.element);
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
        gj.timepicker.methods.initMouse(picker, popup, data.timepicker);

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
        return function () {
            var header = clock.querySelector('[role="header"]');
            header.querySelector('[role="date"]').classList.add('selected');
            header.querySelector('[role="calendarMode"]').classList.add('selected');
            header.querySelector('[role="clockMode"]').classList.remove('selected');
            header.querySelector('[role="hour"]').classList.remove('selected');
            header.querySelector('[role="minute"]').classList.remove('selected');
            gj.datepicker.methods.renderMonth(picker, clock, data.datepicker);
        };
    },

    createShowHourHandler: function (picker, popup, data) {
        return function () {
            var header = popup.querySelector('[role="header"]');
            header.querySelector('[role="calendarMode"]').classList.remove('selected');
            header.querySelector('[role="date"]').classList.remove('selected');
            header.querySelector('[role="clockMode"]').classList.add('selected');
            header.querySelector('[role="hour"]').classList.add('selected');
            header.querySelector('[role="minute"]').classList.remove('selected');

            gj.timepicker.methods.renderHours(picker, popup, data.timepicker);
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

            gj.timepicker.methods.renderMinutes(picker, clock, data.timepicker);
        };
    },

    close: function (picker) {
        gj.datepicker.methods.close(picker);
    },

    value: function (picker, value) {
        var clock, date, hour,
            data = gijgoStorage.get(picker.element, picker.type);
        if (typeof value === "undefined") {
            return picker.element.value;
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date) {
                clock = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');                
                gj.datepicker.methods.selectDay(picker, clock, data.datepicker, date);
                gj.timepicker.methods.setAttributes(clock, data.timepicker, date);
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
     *     */    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    }
};

GijgoDateTimePicker = function (element, jsConfig) {
    var self = this,
        methods = gj.datetimepicker.methods;

    self.element = element;
    self.mouseMove = false;

    /** Gets or sets the value of the datetimepicker.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Open the calendar.     */    self.open = function () {
        gj.datepicker.methods.open(this, this.data().datepicker);
    };

    /** Close the calendar.     */    self.close = function () {
        gj.datepicker.methods.close(this);
    };

    /** Remove datetimepicker functionality from the element.     */    self.destroy = function () {
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
GijgoDateTimePicker.prototype.getConfigJS = gj.datetimepicker.methods.readConfig;

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

