/*
 * Gijgo DateTimePicker v1.9.3
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

        datepicker: gj.datepicker.config.base,

        timepicker: gj.timepicker.config.base,

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The initial datetimepicker value.         */        value: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.         */        format: 'HH:MM mm/dd/yyyy',
        
        /** The language that needs to be in use.         */        locale: 'en-us',

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
        $picker = $('body').children('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
        
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
                $calendar = $('body').children('[role="calendar"][guid="' + $datetimepicker.attr('data-guid') + '"]');
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
     *     */    change: function ($datetimepicker) {
        return $datetimepicker.triggerHandler('change');
    }
};

gj.datetimepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.datetimepicker.methods;

    self.mouseMove = false;

    /** Gets or sets the value of the datetimepicker.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove datetimepicker functionality from the element.     */    self.destroy = function () {
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
