/* global window alert jQuery gj */
/**
  * @widget DatePicker
  * @plugin Base
  */
if (typeof (gj.datepicker) === 'undefined') {
    gj.datepicker = {
        plugins: {}
    };
}

gj.datepicker.config = {
    base: {
        weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

        /** Whether to display dates in other months at the start or end of the current month.
         * @additionalinfo Set to true by default for Bootstrap.
         * @type Boolean
         * @default false
         * @example True <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var datepicker = $('#datepicker').datepicker({ 
         *        showOtherMonths: true
         *    });
         * </script>
         * @example False <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ 
         *         showOtherMonths: false
         *     });
         * </script>
         */
        showOtherMonths: false,

        /** Whether days in other months shown before or after the current month are selectable.
         * This only applies if the showOtherMonths option is set to true.
         * @type Boolean
         * @default true
         * @example True <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        showOtherMonths: true,
         *        selectOtherMonths: true
         *    });
         * </script>
         * @example False <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ 
         *        showOtherMonths: true,
         *        selectOtherMonths: false
         *     });
         * </script>
         */
        selectOtherMonths: true,

        /** The width of the datepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- materialicons, datepicker -->
         * <input id="datepicker" />
         * <script>
         *    $('#datepicker').datepicker({ width: 312 });
         * </script>
         * @example HTML.Config <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker();
         * </script>
         */
        width: undefined,

        /** The minimum selectable date. When not set, there is no minimum
         * @type Date|String|Function
         * @default undefined
         * @example Today <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var today, datepicker;
         *    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
         *    datepicker = $('#datepicker').datepicker({
         *        minDate: today
         *    });
         * </script>
         * @example Yesterday <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ 
         *        minDate: function() {
         *            var date = new Date();
         *            date.setDate(date.getDate()-1);
         *            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
         *        }
         *     });
         * </script>
         */
        minDate: undefined,

        /** The maximum selectable date. When not set, there is no maximum
         * @type Date|String|Function
         * @default undefined
         * @example Today <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var today, datepicker;
         *    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
         *    datepicker = $('#datepicker').datepicker({
         *        maxDate: today
         *    });
         * </script>
         * @example Tomorrow <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ 
         *        maxDate: function() {
         *            var date = new Date();
         *            date.setDate(date.getDate()+1);
         *            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
         *        }
         *     });
         * </script>
         */
        maxDate: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
         * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
         * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
         * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
         * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
         * <b>yyyy</b> - Year represented by four digits.<br/>
         * @type String
         * @default 'mm/dd/yyyy'
         * @example Sample <!-- materialicons, datepicker -->
         * <input id="datepicker" value="2017-25-07" />
         * <script>
         *     var datepicker = $('#datepicker').datepicker({
         *         format: 'yyyy-dd-mm'
         *     });
         * </script>
         * @example Short.Month.Format <!-- materialicons, datepicker -->
         * <input id="datepicker" value="10 Oct 2017" />
         * <script>
         *     var datepicker = $('#datepicker').datepicker({
         *         format: 'dd mmm yyyy'
         *     });
         * </script>
         * @example Long.Month.Format <!-- materialicons, datepicker -->
         * <input id="datepicker" value="10 October 2017" />
         * <script>
         *     var datepicker = $('#datepicker').datepicker({
         *         format: 'dd mmmm yyyy'
         *     });
         * </script>
         */
        format: 'mm/dd/yyyy',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var datepicker = $('#datepicker').datepicker({ 
         *        uiLibrary: 'materialdesign'
         *    });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="270" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4.Material.Icons <!-- materialicons, bootstrap4, datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap4' });
         * </script>
         * @example Bootstrap.4.FontAwesome <!-- fontawesome, bootstrap4, datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Bootstrap.Material.Icons <!-- bootstrap, materialicons, datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *     $('#datepicker').datepicker({
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'materialicons'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *     $('#datepicker').datepicker({
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        /** Day of the week start. 0 (Sunday) to 6 (Saturday)
         * @type Number
         * @default 0
         * @example Monday <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        weekStartDay: 1
         *    });
         * </script>
         * @example Saturday <!-- materialicons, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        weekStartDay: 6
         *    });
         * </script>
         */
        weekStartDay: 0,

        value: undefined,

        //TODO Config:
        disableDates: undefined, //array
        disableDaysOfWeek: undefined, //array

        calendarWeeks: false,
        keyboardNavigation: true,
        locale: 'en-us',

        icons: {
            /** datepicker icon definition.
             * @alias icons.rightIcon
             * @type String
             * @default '<i class="material-icons">arrow_drop_down</i>'
             * @example Custom.Material.Icon <!-- materialicons, datepicker -->
             * <input id="datepicker" />
             * <script>
             *     $('#datepicker').datepicker({
             *         icons: { 
             *             rightIcon: '<i class="material-icons">date_range</i>'
             *         }
             *     });
             * </script>
             * @example Custom.Glyphicon.Icon <!-- bootstrap, datepicker -->
             * <input id="datepicker" />
             * <script>
             *     $('#datepicker').datepicker({
             *         uiLibrary: 'bootstrap',
             *         icons: { 
             *             rightIcon: '<span class="glyphicon glyphicon-chevron-down" />'
             *         }
             *     });
             * </script>
             */
            rightIcon: '<i class="material-icons">event</i>',

            previousMonth: '<i class="material-icons">keyboard_arrow_left</i>',
            nextMonth: '<i class="material-icons">keyboard_arrow_right</i>'
        },

        fontSize: undefined,

        style: {
            wrapper: 'gj-datepicker gj-datepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            calendar: 'gj-calendar gj-calendar-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-calendar gj-calendar-bootstrap'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-calendar gj-calendar-bootstrap'
        },
        showOtherMonths: true
    },

    materialicons: {},

    fontawesome: {
        icons: {
            rightIcon: '<span class="input-group-addon"><i class="fa fa-calendar" aria-hidden="true"></i></span>',
            previousMonth: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            nextMonth: '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            rightIcon: '<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>',
            previousMonth: '<span class="glyphicon glyphicon-chevron-left"></span>',
            nextMonth: '<span class="glyphicon glyphicon-chevron-right"></span>'
        }
    }
};

gj.datepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'datepicker');
        this.attr('data-datepicker', 'true');
        gj.datepicker.methods.initialize(this);
        return this;
    },

    initialize: function ($datepicker) {
        var data = $datepicker.data(),
            $wrapper = $datepicker.parent('div[role="wrapper"]'),
            $rightIcon = data.uiLibrary !== 'materialdesign' && data.iconsLibrary === 'materialicons' ? $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>') : $(data.icons.rightIcon);

        $rightIcon.attr('role', 'right-icon');
        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $datepicker.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $datepicker.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $datepicker.addClass(data.style.input).attr('role', 'input');

        data.fontSize && $datepicker.css('font-size', data.fontSize);

        $rightIcon.on('click', function (e) {
            if ($('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]').is(':visible')) {
                gj.datepicker.methods.hide($datepicker);
            } else {
                gj.datepicker.methods.show($datepicker);
            }
        });

        $datepicker.on('blur', function () {
            $datepicker.timeout = setTimeout(function () {
                gj.datepicker.methods.hide($datepicker);
            }, 100);
        });

        $wrapper.append($rightIcon);

        gj.datepicker.methods.createCalendar($datepicker);

    },

    createCalendar: function ($datepicker) {
        var date, data = $datepicker.data(),
            value = $datepicker.val(),
            $calendar = $('<div role="calendar" />').addClass(data.style.calendar).attr('guid', $datepicker.attr('data-guid')),
            $table = $('<table/>'),
            $thead = $('<thead/>');
        
        data.fontSize && $calendar.css('font-size', data.fontSize);

        date = gj.core.parseDate(value, data.format);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $datepicker.attr('day', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
        }

        $datepicker.attr('month', date.getMonth());
        $datepicker.attr('year', date.getFullYear());

        $row = $('<tr role="month-manager" />');
        $row.append($('<th><div>' + data.icons.previousMonth + '</div></th>').on('click', gj.datepicker.methods.prevMonth($datepicker)));
        $row.append('<th colspan="5"><div role="month"></div></th>');
        $row.append($('<th><div>' + data.icons.nextMonth + '</div></th>').on('click', gj.datepicker.methods.nextMonth($datepicker)));
        $thead.append($row);

        $row = $('<tr role="week-days" />');
        for (i = data.weekStartDay; i < data.weekDays.length; i++) {
            $row.append('<th><div>' + data.weekDays[i] + '</div></th>');
        }
        for (i = 0; i < data.weekStartDay; i++) {
            $row.append('<th><div>' + data.weekDays[i] + '</div></th>');
        }
        $thead.append($row);

        $table.append($thead);
        $table.append('<tbody/>');
        $calendar.append($table);
        $calendar.hide();

        $('body').append($calendar);
        return $calendar;
    },

    renderCalendar: function ($datepicker) {
        var weekDay, selectedDay, day, month, year, daysInMonth, total, firstDayPosition, i, now, prevMonth, nextMonth, $cell, $day,
            data = $datepicker.data(),
            $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]'),
            $table = $calendar.children('table'),
            $tbody = $table.children('tbody'),
            minDate = gj.datepicker.methods.getMinDate(data),
            maxDate = gj.datepicker.methods.getMaxDate(data);

        clearTimeout($datepicker.timeout);
        if ($datepicker.attr('day'))
        {
            selectedDay = $datepicker.attr('day').split('-');
            selectedDay = new Date(selectedDay[0], selectedDay[1], selectedDay[2]);
        } else {
            selectedDay = new Date(undefined);
        }
        month = parseInt($datepicker.attr('month'), 10);
        year = parseInt($datepicker.attr('year'), 10);

        $table.find('thead [role="month"]').text(gj.core.monthNames[month] + ' ' + year);

        daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (year % 4 == 0 && year != 1900) {
            daysInMonth[1] = 29;
        }
        total = daysInMonth[month];

        firstDayPosition = (new Date(year, month, 1).getDay() + 7 - data.weekStartDay) % 7;

        $tbody.empty();

        weekDay = 0;
        $row = $('<tr />');
        prevMonth = gj.datepicker.methods.getPrevMonth(month, year);
        for (i = 1; i <= firstDayPosition; i++) {
            day = (daysInMonth[prevMonth.month] - firstDayPosition + i);
            if (prevMonth.year === selectedDay.getFullYear() && prevMonth.month === selectedDay.getMonth() && day === selectedDay.getDate()) {
                $cell = $('<td type="selected" />');
            } else {
                $cell = $('<td type="other-month" />');
            }
            $day = $('<div>' + day + '</div>');
            if (data.showOtherMonths) {
                $cell.append($day);
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(minDate, maxDate, prevMonth.year, prevMonth.month, day)) {
                    $cell.addClass('gj-cursor-pointer');
                    $day.on('click', gj.datepicker.methods.select($datepicker, $calendar, day, prevMonth.month, prevMonth.year));
                } else {
                    $cell.addClass('disabled');
                }
            }
            $row.append($cell);
            weekDay++;
        }
        $tbody.append($row);

        now = new Date();
        for (i = 1; i <= total; i++) {
            if (weekDay == 0) {
                $row = $('<tr>');
            }
            if (year === selectedDay.getFullYear() && month === selectedDay.getMonth() && i === selectedDay.getDate()) {
                $cell = $('<td type="selected" />');
            } else if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
                $cell = $('<td type="today" />');
            } else {
                $cell = $('<td type="current-month" />');
            }
            $day = $('<div>' + i + '</div>');
            if (gj.datepicker.methods.isSelectable(minDate, maxDate, year, month, i)) {
                $cell.addClass('gj-cursor-pointer');
                $day.on('click', gj.datepicker.methods.select($datepicker, $calendar, i, month, year));
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

        nextMonth = gj.datepicker.methods.getNextMonth(month, year);
        for (i = 1; weekDay != 0; i++) {
            if (nextMonth.year === selectedDay.getFullYear() && nextMonth.month === selectedDay.getMonth() && i === selectedDay.getDate()) {
                $cell = $('<td type="selected" />');
            } else {
                $cell = $('<td type="other-month" />');
            }
            if (data.showOtherMonths) {
                $day = $('<div>' + i + '</div>');
                $cell.append($day);
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(minDate, maxDate, nextMonth.year, nextMonth.month, i)) {
                    $cell.addClass('gj-cursor-pointer');
                    $day.on('click', gj.datepicker.methods.select($datepicker, $calendar, i, nextMonth.month, nextMonth.year));
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

    getMinDate: function (data) {
        var minDate;
        if (data.minDate) {
            if (typeof (data.minDate) === 'string') {
                minDate = new Date(data.minDate);
            } else if (typeof (data.minDate) === 'function') {
                minDate = data.minDate();
            } else if (typeof data.minDate.getMonth === 'function') {
                minDate = data.minDate;
            }
        }
        return minDate;
    },

    getMaxDate: function (data) {
        var maxDate;
        if (data.maxDate) {
            if (typeof data.maxDate === 'string') {
                maxDate = new Date(data.maxDate);
            } else if (typeof data.maxDate === 'function') {
                maxDate = data.maxDate();
            } else if (typeof data.maxDate.getMonth === 'function') {
                maxDate = data.maxDate;
            }
        }
        return maxDate;
    },

    isSelectable: function (minDate, maxDate, year, month, day) {
        var result = false,
            date = new Date(year, month, day);
        if ((!minDate || minDate <= date) && (!maxDate || maxDate >= date)) {
            result = true;
        }
        return result;
    },

    getPrevMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() - 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    getNextMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() + 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    prevMonth: function ($datepicker) {
        return function () {
            var date,
                month = parseInt($datepicker.attr('month'), 10),
                year = parseInt($datepicker.attr('year'), 10);

            date = gj.datepicker.methods.getPrevMonth(month, year);

            $datepicker.attr('month', date.month);
            $datepicker.attr('year', date.year);

            gj.datepicker.methods.renderCalendar($datepicker);
        }
    },

    nextMonth: function ($datepicker) {
        return function () {
            var date,
                month = parseInt($datepicker.attr('month'), 10),
                year = parseInt($datepicker.attr('year'), 10);

            date = gj.datepicker.methods.getNextMonth(month, year);

            $datepicker.attr('month', date.month);
            $datepicker.attr('year', date.year);

            gj.datepicker.methods.renderCalendar($datepicker);
        }
    },

    select: function ($datepicker, $calendar, day, month, year) {
        return function (e) {
            var date, value,
                data = $datepicker.data();
            date = new Date(year, month, day);
            value = gj.core.formatDate(date, data.format);
            $datepicker.val(value);
            gj.datepicker.events.change($datepicker);
            $datepicker.attr('day', year + '-' + month + '-' + day);
            $datepicker.attr('month', month);
            $datepicker.attr('year', year);
            return $datepicker;
        };
    },

    show: function ($datepicker) {
        var data = $datepicker.data(),
            offset = $datepicker.offset(),
            $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

        gj.datepicker.methods.renderCalendar($datepicker);
        $calendar.css('left', offset.left).css('top', offset.top + $datepicker.outerHeight(true) + 3);
        $calendar.show();
        $datepicker.focus();
        gj.datepicker.events.show($datepicker);
    },

    hide: function ($datepicker) {
        var $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
        $calendar.hide();
        gj.datepicker.events.hide($datepicker);
    },

    value: function ($datepicker, value) {
        var $calendar, date;
        if (typeof (value) === "undefined") {
            return $datepicker.val();
        } else {
            date = gj.core.parseDate(value, $datepicker.data().format);
            if (date) {
                $calendar = $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
                gj.datepicker.methods.select($datepicker, $calendar, date.getDate(), date.getMonth(), date.getFullYear())();
            } else {
                $datepicker.val('');
            }            
            return $datepicker;
        }
    },

    destroy: function ($datepicker) {
        var data = $datepicker.data(),
            $parent = $datepicker.parent();
        if (data) {
            $datepicker.off();
            $('body').children('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]').remove();
            $datepicker.removeData();
            $datepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-datepicker');
            $datepicker.removeClass();
            $parent.children('[role="right-icon"]').remove();
            $datepicker.unwrap();
        }
        return $datepicker;
    }
};

gj.datepicker.events = {
    /**
     * Triggered when the datepicker value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- datepicker, materialicons -->
     * <input id="datepicker" />
     * <script>
     *     $('#datepicker').datepicker({
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($datepicker) {
        return $datepicker.triggerHandler('change');
    },

    /**
     * Event fires when the datepicker is opened.
     * @event show
     * @param {object} e - event data
     * @example sample <!-- datepicker, materialicons -->
     * <input id="datepicker" />
     * <script>
     *     $('#datepicker').datepicker({
     *         show: function (e) {
     *             alert('show is fired.');
     *         }
     *     });
     * </script>
     */
    show: function ($datepicker) {
        return $datepicker.triggerHandler('show');
    },

    /**
     * Event fires when the datepicker is closed.
     * @event hide
     * @param {object} e - event data
     * @example sample <!-- datepicker, materialicons -->
     * <input id="datepicker" />
     * <script>
     *     $('#datepicker').datepicker({
     *         hide: function (e) {
     *             alert('hide is fired.');
     *         }
     *     });
     * </script>
     */
    hide: function ($datepicker) {
        return $datepicker.triggerHandler('hide');
    }
};

gj.datepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.datepicker.methods;

    /** Gets or sets the value of the datepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- datepicker, materialicons -->
     * <button class="gj-button-md" onclick="alert($datepicker.value())">Get Content</button>
     * <hr/>
     * <input id="datepicker" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     * @example Set <!-- datepicker, materialicons -->
     * <button class="gj-button-md" onclick="$datepicker.value('08/01/2017')">Set Value</button>
     * <hr/>
     * <input id="datepicker" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove datepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- datepicker, materialicons -->
     * <button class="gj-button-md" onclick="datepicker.destroy()">Destroy</button>
     * <input id="datepicker" />
     * <script>
     *     var datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Show the calendar.
     * @method
     * @return datepicker
     * @example Show.Hide <!-- datepicker, materialicons -->
     * <button class="gj-button-md" onclick="$datepicker.show()">Show</button>
     * <button class="gj-button-md" onclick="$datepicker.hide()">Hide</button>
     * <hr/>
     * <input id="datepicker" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.show = function () {
        gj.datepicker.methods.show(this);
    };

    /** Hide the calendar.
     * @method
     * @return datepicker
     * @example Show.Hide <!-- datepicker, materialicons -->
     * <button class="gj-button-md" onclick="$datepicker.show()">Show</button>
     * <button class="gj-button-md" onclick="$datepicker.hide()">Hide</button>
     * <hr/>
     * <input id="datepicker" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.hide = function () {
        gj.datepicker.methods.hide(this);
    };

    //TODO Methods:
    self.disableDates = function () { };
    self.disableWeekDay = function () { };
    self.setMinDate = function () { };
    self.setMaxDate = function () { };

    $.extend($element, self);
    if ('true' !== $element.attr('data-datepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.datepicker.widget.prototype = new gj.widget();
gj.datepicker.widget.constructor = gj.datepicker.widget;

(function ($) {
    $.fn.datepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.datepicker.widget(this, method);
            } else {
                $widget = new gj.datepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);