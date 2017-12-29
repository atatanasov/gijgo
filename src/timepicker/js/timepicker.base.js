/* global window alert jQuery gj */
/**
  * @widget TimePicker
  * @plugin Base
  */
gj.timepicker = {
    plugins: {},
    messages: {
        'en-us': {
            am: 'AM',
            pm: 'PM'
        }
    }
};

gj.timepicker.config = {
    base: {

        /** The width of the timepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- timepicker -->
         * <input id="timepicker" />
         * <script>
         *    $('#timepicker').timepicker({ width: 312 });
         * </script>
         * @example HTML.Config <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    $('#timepicker').timepicker();
         * </script>
         */
        width: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
         * <b>M</b> - Minutes; no leading zero for single-digit minutes.<br/>
         * <b>MM</b> - Minutes; leading zero for single-digit minutes.<br/>
         * <b>H</b> - The hour, using a 24-hour clock from 0 to 23; no leading zero for single-digit hours.<br/>
         * <b>HH</b> - The hour, using a 24-hour clock from 0 to 23; leading zero for single-digit hours.<br/>
         * <b>h</b> - The hour, using a 12-hour clock from 1 to 12; no leading zero for single-digit hours.<br/>
         * <b>hh</b> - The hour, using a 12-hour clock from 1 to 12; leading zero for single-digit hours<br/>
         * <b>tt</b> - The AM/PM designator; lowercase.<br/>
         * <b>TT</b> - The AM/PM designator; upercase.<br/>
         * @type String
         * @default 'MM:HH'
         * @example Sample <!-- timepicker -->
         * <input id="timepicker" value="13 - 42" />
         * <script>
         *     var timepicker = $('#timepicker').timepicker({
         *         format: 'HH - MM'
         *     });
         * </script>
         */
        format: 'MM:HH',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    $('#timepicker').timepicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, timepicker -->
         * <input id="timepicker" width="270" />
         * <script>
         *     $('#timepicker').timepicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *     $('#timepicker').timepicker({ uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial timepicker value.
         * @type String
         * @default undefined
         * @example Javascript <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    $('#timepicker').timepicker({
         *        value: '13:42'
         *    });
         * </script>
         * @example HTML <!-- timepicker -->
         * <input id="timepicker" width="312" value="13:42" />
         * <script>
         *     $('#timepicker').timepicker();
         * </script>
         */
        value: undefined,

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'de-de'
         *    });
         * </script>
         * @example Bulgarian <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'bg-bg'
         *    });
         * </script>
         * @example French <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'fr-fr'
         *    });
         * </script>
         * @example Brazil <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'pt-br'
         *    });
         * </script>
         * @example Russian <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    $('#timepicker').timepicker({
         *        locale: 'ru-ru'
         *    });
         * </script>
         */
        locale: 'en-us',

        style: {
            wrapper: 'gj-timepicker gj-timepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            calendar: 'gj-calendar gj-calendar-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-calendar gj-calendar-bootstrap'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-calendar gj-calendar-bootstrap'
        },
        showOtherMonths: true
    }
};

gj.timepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'timepicker');
        this.attr('data-timepicker', 'true');
        gj.timepicker.methods.initialize(this);
        return this;
    },

    initialize: function ($timepicker) {
        var data = $timepicker.data(), $calendar,
            $wrapper = $timepicker.parent('div[role="wrapper"]'),
            $rightIcon = data.uiLibrary !== 'materialdesign' && data.iconsLibrary === 'materialicons' ? $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>') : $(data.icons.rightIcon);

        $rightIcon.attr('role', 'right-icon');
        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $timepicker.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $timepicker.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $timepicker.val(data.value).addClass(data.style.input).attr('role', 'input');

        data.fontSize && $timepicker.css('font-size', data.fontSize);

        $rightIcon.on('click', function (e) {
            var $calendar = $('body').children('[role="calendar"][guid="' + $timepicker.attr('data-guid') + '"]');
            if ($calendar.is(':visible')) {
                gj.timepicker.methods.hide($timepicker);
            } else {
                gj.timepicker.methods.show($timepicker);
            }
        });

        $timepicker.on('blur', function () {
            $timepicker.timeout = setTimeout(function () {
                gj.timepicker.methods.hide($timepicker);
            }, 500);
        });

        $wrapper.append($rightIcon);

        $calendar = gj.timepicker.methods.createCalendar($timepicker);

        if (data.keyboardNavigation) {
            $timepicker.on('keydown', gj.timepicker.methods.createKeyDownHandler($timepicker, $calendar));
        }
    },

    createCalendar: function ($timepicker) {
        var date, data = $timepicker.data(),
            $calendar = $('<div role="calendar" />').addClass(data.style.calendar).attr('guid', $timepicker.attr('data-guid')),
            $table = $('<table/>'),
            $thead = $('<thead/>');

        data.fontSize && $calendar.css('font-size', data.fontSize);

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $timepicker.attr('day', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
        }

        $timepicker.attr('month', date.getMonth());
        $timepicker.attr('year', date.getFullYear());

        $row = $('<tr role="month-manager" />');
        $row.append($('<th><div>' + data.icons.previousMonth + '</div></th>').on('click', gj.timepicker.methods.prevMonth($timepicker)));
        $row.append('<th colspan="' + (data.calendarWeeks ? 6 : 5) + '"><div role="month"></div></th>');
        $row.append($('<th><div>' + data.icons.nextMonth + '</div></th>').on('click', gj.timepicker.methods.nextMonth($timepicker)));
        $thead.append($row);

        $row = $('<tr role="week-days" />');
        if (data.calendarWeeks) {
            $row.append('<th><div>&nbsp;</div></th>');
        }
        for (i = data.weekStartDay; i < gj.timepicker.messages[data.locale].weekDays.length; i++) {
            $row.append('<th><div>' + gj.timepicker.messages[data.locale].weekDays[i] + '</div></th>');
        }
        for (i = 0; i < data.weekStartDay; i++) {
            $row.append('<th><div>' + gj.timepicker.messages[data.locale].weekDays[i] + '</div></th>');
        }
        $thead.append($row);

        $table.append($thead);
        $table.append('<tbody/>');
        $calendar.append($table);
        $calendar.hide();

        $('body').append($calendar);
        return $calendar;
    },

    renderCalendar: function ($timepicker) {
        var weekDay, selectedDay, day, month, year, daysInMonth, total, firstDayPosition, i, now, prevMonth, nextMonth, $cell, $day, date,
            data = $timepicker.data(),
            $calendar = $('body').children('[role="calendar"][guid="' + $timepicker.attr('data-guid') + '"]'),
            $table = $calendar.children('table'),
            $tbody = $table.children('tbody');

        clearTimeout($timepicker.timeout);
        if ($timepicker.attr('day')) {
            selectedDay = $timepicker.attr('day').split('-');
            selectedDay = new Date(selectedDay[0], selectedDay[1], selectedDay[2]);
        } else {
            selectedDay = new Date(undefined);
        }
        month = parseInt($timepicker.attr('month'), 10);
        year = parseInt($timepicker.attr('year'), 10);

        $table.find('thead [role="month"]').text(gj.core.messages[data.locale].monthNames[month] + ' ' + year);

        daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (year % 4 == 0 && year != 1900) {
            daysInMonth[1] = 29;
        }
        total = daysInMonth[month];

        firstDayPosition = (new Date(year, month, 1).getDay() + 7 - data.weekStartDay) % 7;

        $tbody.empty();

        weekDay = 0;
        $row = $('<tr />');
        prevMonth = gj.timepicker.methods.getPrevMonth(month, year);
        for (i = 1; i <= firstDayPosition; i++) {
            day = (daysInMonth[prevMonth.month] - firstDayPosition + i);
            date = new Date(prevMonth.year, prevMonth.month, day);
            if (data.calendarWeeks && i === 1) {
                $row.append('<td><div>' + gj.timepicker.methods.getWeekNumber(date) + '</div></td>');
            }
            if (prevMonth.year === selectedDay.getFullYear() && prevMonth.month === selectedDay.getMonth() && day === selectedDay.getDate()) {
                $cell = $('<td class="selected" />');
            } else {
                $cell = $('<td class="other-month" />');
            }
            if (data.showOtherMonths) {
                $day = $('<div>' + day + '</div>');
                $cell.append($day);
                if (data.selectOtherMonths && gj.timepicker.methods.isSelectable(data, date)) {
                    $cell.addClass('gj-cursor-pointer');
                    $day.on('click', gj.timepicker.methods.select($timepicker, $calendar, date));
                } else {
                    $cell.addClass('disabled');
                }
            }
            $row.append($cell);
            weekDay++;
        }
        if (i > 1) {
            $tbody.append($row);
        }

        now = new Date();
        for (i = 1; i <= total; i++) {
            date = new Date(year, month, i);
            if (weekDay == 0) {
                $row = $('<tr>');
                if (data.calendarWeeks) {
                    $row.append('<td><div>' + gj.timepicker.methods.getWeekNumber(date) + '</div></td>');
                }
            }
            $cell = $('<td day="' + i + '" />');
            if (year === selectedDay.getFullYear() && month === selectedDay.getMonth() && i === selectedDay.getDate()) {
                $cell.addClass('selected');
            } else if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
                $cell.addClass('today');
            } else {
                $cell.addClass('current-month');
            }
            $day = $('<div>' + i + '</div>');
            if (gj.timepicker.methods.isSelectable(data, date)) {
                $cell.addClass('gj-cursor-pointer');
                $day.on('click', gj.timepicker.methods.select($timepicker, $calendar, date));
            } else {
                $cell.addClass('disabled');
            }
            $cell.append($day);
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }

        nextMonth = gj.timepicker.methods.getNextMonth(month, year);
        for (i = 1; weekDay != 0; i++) {
            date = new Date(nextMonth.year, nextMonth.month, i);
            if (nextMonth.year === selectedDay.getFullYear() && nextMonth.month === selectedDay.getMonth() && i === selectedDay.getDate()) {
                $cell = $('<td class="selected" />');
            } else {
                $cell = $('<td class="other-month" />');
            }
            if (data.showOtherMonths) {
                $day = $('<div>' + i + '</div>');
                $cell.append($day);
                if (data.selectOtherMonths && gj.timepicker.methods.isSelectable(data, date)) {
                    $cell.addClass('gj-cursor-pointer');
                    $day.on('click', gj.timepicker.methods.select($timepicker, $calendar, date));
                } else {
                    $cell.addClass('disabled');
                }
            }
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }
    },

    select: function ($timepicker, $calendar, date) {
        return function (e) {
            var value,
                month = date.getMonth(),
                year = date.getFullYear(),
                data = $timepicker.data();
            value = gj.core.formatDate(date, data.format, data.locale);
            $timepicker.val(value);
            gj.timepicker.events.change($timepicker);
            $timepicker.attr('day', year + '-' + month + '-' + date.getDate());
            $timepicker.attr('month', month);
            $timepicker.attr('year', year);
            gj.timepicker.methods.hide($timepicker);
            return $timepicker;
        };
    },

    show: function ($timepicker) {
        var data = $timepicker.data(),
            offset = $timepicker.offset(),
            $calendar = $('body').children('[role="calendar"][guid="' + $timepicker.attr('data-guid') + '"]');

        gj.timepicker.methods.renderCalendar($timepicker);
        $calendar.css('left', offset.left).css('top', offset.top + $timepicker.outerHeight(true) + 3);
        $calendar.show();
        $timepicker.focus();
        gj.timepicker.events.show($timepicker);
    },

    hide: function ($timepicker) {
        var $calendar = $('body').children('[role="calendar"][guid="' + $timepicker.attr('data-guid') + '"]');
        $calendar.hide();
        gj.timepicker.events.hide($timepicker);
    },

    value: function ($timepicker, value) {
        var $calendar, date, data = $timepicker.data();
        if (typeof (value) === "undefined") {
            return $timepicker.val();
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date) {
                $calendar = $('body').children('[role="calendar"][guid="' + $timepicker.attr('data-guid') + '"]');
                gj.timepicker.methods.select($timepicker, $calendar, date)();
            } else {
                $timepicker.val('');
            }
            return $timepicker;
        }
    },

    destroy: function ($timepicker) {
        var data = $timepicker.data(),
            $parent = $timepicker.parent();
        if (data) {
            $timepicker.off();
            $('body').children('[role="calendar"][guid="' + $timepicker.attr('data-guid') + '"]').remove();
            $timepicker.removeData();
            $timepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-timepicker');
            $timepicker.removeClass();
            $parent.children('[role="right-icon"]').remove();
            $timepicker.unwrap();
        }
        return $timepicker;
    }
};

gj.timepicker.events = {
    /**
     * Triggered when the timepicker value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="timepicker" />
     * <script>
     *     $('#timepicker').timepicker({
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($timepicker) {
        return $timepicker.triggerHandler('change');
    },

    /**
     * Event fires when the timepicker is opened.
     * @event show
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="timepicker" />
     * <script>
     *     $('#timepicker').timepicker({
     *         show: function (e) {
     *             alert('show is fired.');
     *         }
     *     });
     * </script>
     */
    show: function ($timepicker) {
        return $timepicker.triggerHandler('show');
    },

    /**
     * Event fires when the timepicker is closed.
     * @event hide
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="timepicker" />
     * <script>
     *     $('#timepicker').timepicker({
     *         hide: function (e) {
     *             alert('hide is fired.');
     *         }
     *     });
     * </script>
     */
    hide: function ($timepicker) {
        return $timepicker.triggerHandler('hide');
    }
};

gj.timepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.timepicker.methods;

    /** Gets or sets the value of the timepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- timepicker -->
     * <button class="gj-button-md" onclick="alert($timepicker.value())">Get Content</button>
     * <hr/>
     * <input id="timepicker" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker();
     * </script>
     * @example Set <!-- timepicker -->
     * <button class="gj-button-md" onclick="$timepicker.value('08/01/2017')">Set Value</button>
     * <hr/>
     * <input id="timepicker" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove timepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- timepicker -->
     * <button class="gj-button-md" onclick="timepicker.destroy()">Destroy</button>
     * <input id="timepicker" />
     * <script>
     *     var timepicker = $('#timepicker').timepicker();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Show the calendar.
     * @method
     * @return timepicker
     * @example Show.Hide <!-- timepicker -->
     * <button class="gj-button-md" onclick="$timepicker.show()">Show</button>
     * <button class="gj-button-md" onclick="$timepicker.hide()">Hide</button>
     * <hr/>
     * <input id="timepicker" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker();
     * </script>
     */
    self.show = function () {
        gj.timepicker.methods.show(this);
    };

    /** Hide the calendar.
     * @method
     * @return timepicker
     * @example Show.Hide <!-- timepicker -->
     * <button class="gj-button-md" onclick="$timepicker.show()">Show</button>
     * <button class="gj-button-md" onclick="$timepicker.hide()">Hide</button>
     * <hr/>
     * <input id="timepicker" />
     * <script>
     *     var $timepicker = $('#timepicker').timepicker();
     * </script>
     */
    self.hide = function () {
        gj.timepicker.methods.hide(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-timepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.timepicker.widget.prototype = new gj.widget();
gj.timepicker.widget.constructor = gj.timepicker.widget;

(function ($) {
    $.fn.timepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.timepicker.widget(this, method);
            } else {
                $widget = new gj.timepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);