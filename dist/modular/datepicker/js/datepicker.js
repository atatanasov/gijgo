/*
 * Gijgo DatePicker v1.5.0
 * http://gijgo.com/datepicker
 *
 * Copyright 2014, 2017 gijgo.com
 * Released under the MIT license
 */
if (typeof (gj) === 'undefined') {
    gj = {};
}

gj.widget = function () {
    var self = this;

    self.xhr = null;

    self.generateGUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    self.mouseX = function (e) {
        if (e) {
            if (e.pageX) {
                return e.pageX;
            } else if (e.clientX) {
                return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            } else if (e.touches && e.touches.length) {
                return e.touches[0].pageX;
            } else if (e.changedTouches && e.changedTouches.length) {
                return e.changedTouches[0].pageX;
            } else if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
                return e.originalEvent.touches[0].pageX;
            } else if (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                return e.originalEvent.touches[0].pageX;
            }
        }
        return null;
    };

    self.mouseY = function (e) {
        if (e) {
            if (e.pageY) {
                return e.pageY;
            } else if (e.clientY) {
                return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            } else if (e.touches && e.touches.length) {
                return e.touches[0].pageY;
            } else if (e.changedTouches && e.changedTouches.length) {
                return e.changedTouches[0].pageY;
            } else if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
                return e.originalEvent.touches[0].pageY;
            } else if (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                return e.originalEvent.touches[0].pageY;
            }
        }
        return null;
    };
};

gj.widget.prototype.init = function (jsConfig, type) {
    var option, clientConfig, fullConfig;

    this.attr('data-type', type);
    clientConfig = $.extend(true, {}, this.getHTMLConfig() || {});
    $.extend(true, clientConfig, jsConfig || {});
    fullConfig = this.getConfig(clientConfig, type);
    this.attr('data-guid', fullConfig.guid);
    this.data(fullConfig);

    // Initialize events configured as options
    for (option in fullConfig) {
        if (gj[type].events.hasOwnProperty(option)) {
            this.on(option, fullConfig[option]);
            delete fullConfig[option];
        }
    }

    // Initialize all plugins
    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            gj[type].plugins[plugin].configure(this, fullConfig, clientConfig);
        }
    }

    return this;
};

gj.widget.prototype.getConfig = function (clientConfig, type) {
    var config, uiLibrary, iconsLibrary, plugin;

    config = $.extend(true, {}, gj[type].config.base);

    uiLibrary = clientConfig.hasOwnProperty('uiLibrary') ? clientConfig.uiLibrary : config.uiLibrary;
    if (gj[type].config[uiLibrary]) {
        $.extend(true, config, gj[type].config[uiLibrary]);
    }

    iconsLibrary = clientConfig.hasOwnProperty('iconsLibrary') ? clientConfig.iconsLibrary : config.iconsLibrary;
    if (gj[type].config[iconsLibrary]) {
        $.extend(true, config, gj[type].config[iconsLibrary]);
    }

    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            $.extend(true, config, gj[type].plugins[plugin].config.base);
            if (gj[type].plugins[plugin].config[uiLibrary]) {
                $.extend(true, config, gj[type].plugins[plugin].config[uiLibrary]);
            }
            if (gj[type].plugins[plugin].config[iconsLibrary]) {
                $.extend(true, config, gj[type].plugins[plugin].config[iconsLibrary]);
            }
        }
    }

    $.extend(true, config, clientConfig);

    if (!config.guid) {
        config.guid = this.generateGUID();
    }

    return config;
}

gj.widget.prototype.getHTMLConfig = function () {
    var result = this.data(),
        attrs = this[0].attributes;
    if (attrs['width']) {
        result.width = attrs['width'].nodeValue;
    }
    if (attrs['height']) {
        result.height = attrs['height'].nodeValue;
    }
    if (attrs['align']) {
        result.align = attrs['align'].nodeValue;
    }
    if (result && result.source) {
        result.dataSource = result.source;
        delete result.source;
    }
    return result;
};

gj.widget.prototype.createDoneHandler = function () {
    var $widget = this;
    return function (response) {
        if (typeof (response) === 'string' && JSON) {
            response = JSON.parse(response);
        }
        gj[$widget.data('type')].methods.render($widget, response);
    };
};

gj.widget.prototype.createErrorHandler = function () {
    var $widget = this;
    return function (response) {
        if (response && response.statusText && response.statusText !== 'abort') {
            alert(response.statusText);
        }
    };
};

gj.widget.prototype.reload = function (params) {
    var ajaxOptions, result, data = this.data(), type = this.data('type');
    if (data.dataSource === undefined) {
        gj[type].methods.useHtmlDataSource(this, data);
    }
    $.extend(data.params, params);
    if ($.isArray(data.dataSource)) {
        result = gj[type].methods.filter(this);
        gj[type].methods.render(this, result);
    } else if (typeof(data.dataSource) === 'string') {
        ajaxOptions = { url: data.dataSource, data: data.params };
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions).done(this.createDoneHandler()).fail(this.createErrorHandler());
    } else if (typeof (data.dataSource) === 'object') {
        if (!data.dataSource.data) {
            data.dataSource.data = {};
        }
        $.extend(data.dataSource.data, data.params);
        ajaxOptions = $.extend(true, {}, data.dataSource); //clone dataSource object
        if (ajaxOptions.dataType === 'json' && typeof(ajaxOptions.data) === 'object') {
            ajaxOptions.data = JSON.stringify(ajaxOptions.data);
        }
        if (!ajaxOptions.success) {
            ajaxOptions.success = this.createDoneHandler();
        }
        if (!ajaxOptions.error) {
            ajaxOptions.error = this.createErrorHandler();
        }
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions);
    }
    return this;
}

gj.documentManager = {
    events: {},

    subscribeForEvent: function (eventName, widgetId, callback) {
        if (!gj.documentManager.events[eventName] || gj.documentManager.events[eventName].length === 0) {
            gj.documentManager.events[eventName] = [{ widgetId: widgetId, callback: callback }];
            $(document).on(eventName, gj.documentManager.executeCallbacks);
        } else if (!gj.documentManager.events[eventName][widgetId]) {
            gj.documentManager.events[eventName].push({ widgetId: widgetId, callback: callback });
        } else {
            throw "Event " + eventName + " for widget with guid='" + widgetId + "' is already attached.";
        }
    },

    executeCallbacks: function (e) {
        var callbacks = gj.documentManager.events[e.type];
        if (callbacks) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].callback(e);
            }
        }
    },

    unsubscribeForEvent: function (eventName, widgetId) {
        var success = false,
            events = gj.documentManager.events[eventName];
        if (events) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].widgetId === widgetId) {
                    events.splice(i, 1);
                    success = true;
                    if (events.length === 0) {
                        $(document).off(eventName);
                        delete gj.documentManager.events[eventName];
                    }
                }
            }
        }
        if (!success) {
            throw 'The "' + eventName + '" for widget with guid="' + widgetId + '" can\'t be removed.';
        }
    }
};
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

        min: undefined,

        max: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo If the format is not define we use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString" target="_blank">Date.prototype.toLocaleDateString()</a> in order to format the date.
         * @type Function
         * @default undefined
         * @example Moment.JS <!-- materialicons, datepicker -->
         * <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js" integrity="sha256-1hjUhpc44NwiNg8OwMu2QzJXhD8kcj+sJA3aCQZoUjg=" crossorigin="anonymous"></script>
         * <input id="datepicker" />
         * <script>
         *     var datepicker = $('#datepicker').datepicker({
         *         format: function(date) {
         *             return moment(date).format('YYYY-MM-DD');
         *         }
         *     });
         * </script>
         * @example Custom <!-- materialicons, datepicker -->
         * <input id="datepicker" />
         * <script>
         *     var datepicker = $('#datepicker').datepicker({
         *         format: function(date) {
         *             return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
         *         }
         *     });
         * </script>
         */
        format: undefined,

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
         * @example Bootstrap.4 <!-- fontawesome, bootstrap4, datepicker -->
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

        icons: {
            /** datepicker icon definition.
             * @alias icons.calendar
             * @type String
             * @default '<i class="material-icons">arrow_drop_down</i>'
             * @example Custom.Material.Icon <!-- materialicons, datepicker -->
             * <input id="datepicker" />
             * <script>
             *     $('#datepicker').datepicker({
             *         icons: { 
             *             calendar: '<i class="material-icons">date_range</i>'
             *         }
             *     });
             * </script>
             * @example Custom.Glyphicon.Icon <!-- bootstrap, datepicker -->
             * <input id="datepicker" />
             * <script>
             *     $('#datepicker').datepicker({
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
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control'
        },
        showOtherMonths: true
    },

    materialicons: {},

    fontawesome: {
        icons: {
            calendar: '<span class="input-group-addon"><i class="fa fa-calendar" aria-hidden="true"></i></span>',
            previousMonth: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            nextMonth: '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            calendar: '<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>',
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
            $rightIcon = $(data.icons.calendar).attr('role', 'right-icon'),
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

        $datepicker.addClass(data.style.input).attr('role', 'input');

        $rightIcon.on('click', function () {
            if ($datepicker.parent().children('[role="calendar"]').is(':visible')) {
                gj.datepicker.methods.hide($datepicker);
            } else {
                gj.datepicker.methods.renderCalendar($datepicker);
                gj.datepicker.methods.show($datepicker);
            }
        });

        $wrapper.append($rightIcon);

        $calendar = gj.datepicker.methods.createCalendar($datepicker);
        $wrapper.append($calendar);

    },

    createCalendar: function ($datepicker) {
        var date = new Date(),
            data = $datepicker.data(),
            $calendar = $('<div role="calendar" />'),
            $table = $('<table/>'),
            $thead = $('<thead/>');

        $datepicker.attr('month', date.getMonth());
        $datepicker.attr('year', date.getFullYear());

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
        $calendar.hide();

        return $calendar;
    },

    renderCalendar: function ($datepicker) {
        var weekDay, selectedDay, day, month, year, daysInMonth, total, firstDayPosition, i, now, prevMonth, nextMonth, $cell, $day,
            data = $datepicker.data(),
            $calendar = $datepicker.parent().children('[role="calendar"]'),
            $table = $calendar.children('table'),
            $tbody = $table.children('tbody');
        
        selectedDay = new Date($datepicker.attr('day'));
        month = parseInt($datepicker.attr('month'), 10);
        year = parseInt($datepicker.attr('year'), 10);

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
                if (data.selectOtherMonths) {
                    $day.on('click', gj.datepicker.methods.select($datepicker, $calendar, day, prevMonth.month, prevMonth.year));
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
            $day.on('click', gj.datepicker.methods.select($datepicker, $calendar, i, month, year));
            if (year === selectedDay.getFullYear() && month === selectedDay.getMonth() && i === selectedDay.getDate()) {
                $cell = $('<td type="selected" />');
            } else if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
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
                if (data.selectOtherMonths) {
                    $day.on('click', gj.datepicker.methods.select($datepicker, $calendar, i, nextMonth.month, nextMonth.year));
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

    getPrevMonth: function (month, year) {
        date = new Date(year + '-' + (month + 1) + '-01');
        date.setMonth(date.getMonth() - 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    getNextMonth: function (month, year) {
        date = new Date(year + '-' + (month + 1) + '-01');
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
            date = new Date(year + '-' + (month + 1) + '-' + day);
            value = data.format ? data.format(date) : date.toLocaleDateString();
            $datepicker.val(value);
            gj.datepicker.events.change($datepicker);
            $datepicker.attr('day', year + '-' + (month + 1) + '-' + day);
            $datepicker.attr('month', month);
            $datepicker.attr('year', year);
            gj.datepicker.methods.hide($datepicker);
            return $datepicker;
        };
    },

    show: function ($datepicker) {
        var data = $datepicker.data(),
            $calendar = $datepicker.parent().children('[role="calendar"]');

        $calendar.css('left', '0px').css('top', $datepicker.outerHeight(true) + 3);
        $calendar.show();
        gj.datepicker.events.show($datepicker);
    },

    hide: function ($datepicker) {
        var $calendar = $datepicker.parent().children('[role="calendar"]');
        $calendar.hide();
        gj.datepicker.events.hide($datepicker);
    },

    value: function ($datepicker, value) {
        var $calendar, date;
        if (typeof (value) === "undefined") {
            return $datepicker.val();
        } else {
            date = new Date(value);
            $calendar = $datepicker.parent().children('[role="calendar"]');
            return gj.datepicker.methods.select($datepicker, $calendar, date.getDate(), date.getMonth(), date.getFullYear())();
        }
    },

    destroy: function ($datepicker) {
        var data = $datepicker.data(),
            $parent = $datepicker.parent();
        if (data) {
            $datepicker.off();
            $datepicker.removeData();
            $datepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-datepicker');
            $datepicker.removeClass();
            $parent.children('[role="calendar"]').remove();
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
     * <button class="gj-button-md" onclick="$datepicker.value('2017-08-01')">Set Value</button>
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