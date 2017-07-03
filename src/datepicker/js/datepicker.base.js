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
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

        weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

        showOtherMonths: false,

        selectOtherMonths: true,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- materialicons, datepicker -->
         * <input id="datepicker" width="350" />
         * <script>
        *     var datepicker = $('#datepicker').datepicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="250" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- materialicons, bootstrap4, datepicker -->
         * <input id="datepicker" width="250" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap4' });
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
         * <select id="datepicker"></select>
         * <script>
         *     var datepicker = $('#datepicker').datepicker({
         *         dataSource: '/Locations/Get',
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'materialicons',
         *         dataValueField: 'id'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datepicker -->
         * <select id="datepicker"></select>
         * <script>
         *     var datepicker = $('#datepicker').datepicker({
         *         dataSource: '/Locations/Get',
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         dataValueField: 'id'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        icons: {
            /** datepicker icon definition.
             * @alias icons.calendar
             * @type String
             * @default '<i class="material-icons">arrow_drop_down</i>'
             * @example Custom.Material.Icon <!-- materialicons, datepicker -->
             * <select id="datepicker"></select>
             * <script>
             *     var datepicker = $('#datepicker').datepicker({
             *         dataSource: '/Locations/Get',
             *         dataValueField: 'id',
             *         icons: { 
             *             calendar: '<i class="material-icons">date_range</i>'
             *         }
             *     });
             * </script>
             * @example Custom.Glyphicon.Icon <!-- bootstrap, datepicker -->
             * <select id="datepicker"></select>
             * <script>
             *     var datepicker = $('#datepicker').datepicker({
             *         dataSource: '/Locations/Get',
             *         dataValueField: 'id',
             *         uiLibrary: 'bootstrap',
             *         icons: { 
             *             calendar: '<span class="glyphicon glyphicon-chevron-down" />'
             *         }
             *     });
             * </script>
             */
            calendar: '<i class="material-icons">event</i>',

            previousMonth: '<i class="material-icons">keyboard_arrow_left</i>',
            nextMonth: '<i class="material-icons">keyboard_arrow_right</i>'
        },

        indentation: 24,

        style: {
            wrapper: 'gj-datepicker gj-datepicker-md gj-unselectable',
            input: 'gj-textbox-md'
        }
    },

    bootstrap: {
        indentation: 24,
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-datepicker-bootstrap-3 gj-unselectable',
            presenter: 'btn btn-default',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        },
        iconsLibrary: 'glyphicons',
        optionsDisplay: 'standard'
    },

    bootstrap4: {
        indentation: 24,
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-datepicker-bootstrap-4 gj-unselectable',
            presenter: 'btn btn-secondary',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        },
        optionsDisplay: 'standard'
    },

    materialicons: {
        indentation: 24,
        style: {
            expander: 'gj-datepicker-expander-mi'
        }
    },

    fontawesome: {
        icons: {
            datepicker: '<i class="fa fa-calendar" aria-hidden="true"></i>'
        },
        style: {
            expander: 'gj-datepicker-expander-fa'
        }
    },

    glyphicons: {
        icons: {
            datepicker: '<span class="glyphicon glyphicon-calendar"></span>'
        },
        style: {
            expander: 'gj-datepicker-expander-glyphicons'
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
            $calendar;

        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $datepicker.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $datepicker.parent('div[role="wrapper"]');

        if (data.width) {
            $wrapper.css('width', data.width);
        }

        $datepicker.addClass(data.style.input);

        $wrapper.append($(data.icons.calendar).attr('role', 'calendar-icon'));

        $calendar = gj.datepicker.methods.createCalendar($datepicker);
        $wrapper.append($calendar);

        gj.datepicker.methods.renderCalendar($datepicker);
    },

    createCalendar: function ($datepicker) {
        var date = new Date(),
            data = $datepicker.data(),
            $calendar = $('<div role="calendar" />'),
            $table = $('<table/>'),
            $thead = $('<thead/>');

        $datepicker.attr('month', date.getMonth());
        $datepicker.attr('year', date.getYear());

        $row = $('<tr role="month-manager" />');
        $row.append($('<th><div>' + data.icons.previousMonth + '</div></th>').on('click', gj.datepicker.methods.prevMonth($datepicker)));
        $row.append('<th colspan="5"><div role="month"></div></th>');
        $row.append($('<th><div>' + data.icons.nextMonth + '</div></th>').on('click', gj.datepicker.methods.nextMonth($datepicker)));
        $thead.append($row);

        $row = $('<tr role="week-days" />');
        for (i = 0; i < data.weekDays.length; i++) {
            $row.append('<th><div>' + data.weekDays[i] + '</div></th>');
        }
        $thead.append($row);

        $table.append($thead);
        $table.append('<tbody/>');
        $calendar.append($table);

        return $calendar;
    },

    renderCalendar: function ($datepicker) {
        var weekDay, month, year, daysInMonth, total, firstDayPosition, i, now, prevMonth, $cell, $day,
            data = $datepicker.data(),
            $calendar = $datepicker.parent().children('[role="calendar"]'),
            $table = $calendar.children('table'),
            $tbody = $table.children('tbody');

        month = parseInt($datepicker.attr('month'), 10);
        year = parseInt($datepicker.attr('year'), 10);

        if (year <= 200) {
            year += 1900;
        }

        $table.find('thead [role="month"]').text(data.months[month] + ' ' + year);

        daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (year % 4 == 0 && year != 1900) {
            daysInMonth[1] = 29;
        }
        total = daysInMonth[month];

        firstDayPosition = new Date(year + '-' + (month + 1) + '-01').getDay();

        $tbody.empty();

        weekDay = 0;
        $row = $('<tr />');
        prevMonth = gj.datepicker.methods.getPrevMonth(month, year).month;
        for (i = 1; i <= firstDayPosition; i++) {
            $cell = $('<td type="other-month" />');
            $day = $('<div>' + (daysInMonth[prevMonth] - firstDayPosition + i) + '</div>');
            if (data.showOtherMonths) {
                $cell.append($day);
                if (selectOtherMonths) {
                    $day.on('click', gj.datepicker.methods.select(i));
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
            $day = $('<div>' + i + '</div>');
            $day.on('click', gj.datepicker.methods.select(i));
            if (year = now.getYear() && month == now.getMonth() && i == now.getDate()) {
                $cell = $('<td type="today" />');
            } else {
                $cell = $('<td type="current-month" />');
            }
            $cell.append($day);
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }
        for (i = 1; weekDay != 0; i++) {
            $row.append('<td type="other-month"><div>' + i + '</div></td>');
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }
    },

    getPrevMonth: function (month, year) {
        if (year <= 200) {
            year += 1900;
        }
        date = new Date(year + '-' + (month + 1) + '-01');
        date.setMonth(date.getMonth() - 1);
        return { month: date.getMonth(), year: date.getYear() };
    },

    getNextMonth: function (month, year) {
        if (year <= 200) {
            year += 1900;
        }
        date = new Date(year + '-' + (month + 1) + '-01');
        date.setMonth(date.getMonth() + 1);
        return { month: date.getMonth(), year: date.getYear() };
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

    destroy: function ($datepicker) {
        var data = $datepicker.data();
        if (data) {
            $datepicker.off();
            $datepicker.removeData();
            $datepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-datepicker');
            $datepicker.removeClass();
        }
        return $tree;
    }
};

gj.datepicker.events = {
    /**
     * Triggered when the datepicker value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- datepicker, materialicons -->
     * <select id="datepicker">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
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
     * Event fires after the loading of the data in the datepicker.
     * @event dataBound
     * @param {object} e - event data
     * @example sample <!-- datepicker, materialicons -->
     * <select id="datepicker">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     $('#datepicker').datepicker({
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    open: function ($datepicker) {
        return $datepicker.triggerHandler('dataBound');
    },

    close: function ($datepicker) {
        return $datepicker.triggerHandler('dataBound');
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
     * <select id="datepicker">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     * @example Set <!-- datepicker, materialicons -->
     * <button class="gj-button-md" onclick="$datepicker.value('3')">Set Value</button>
     * <hr/>
     * <select id="datepicker">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.open = function (value) {
        return methods.value(this, value);
    };

    self.close = function () {
        return methods.enable(this);
    };

    /** Remove datepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- datepicker, materialicons -->
     * <button class="gj-button-md" onclick="datepicker.destroy()">Destroy</button>
     * <select id="datepicker">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

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