/*
 * Gijgo DatePicker v1.9.10
 * http://gijgo.com/datepicker
 *
 * Copyright 2014, 2018 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.datepicker = {
    plugins: {}
};

gj.datepicker.config = {
    base: {
        /** Whether to display dates in other months at the start or end of the current month.         */        showOtherMonths: false,

        /** Whether days in other months shown before or after the current month are selectable.
         * This only applies if the showOtherMonths option is set to true.         */        selectOtherMonths: true,

        /** The width of the datepicker.         */        width: undefined,

        /** The minimum selectable date. When not set, there is no minimum.         */        minDate: undefined,

        /** The maximum selectable date. When not set, there is no maximum         */        maxDate: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.         */        format: 'mm/dd/yyyy',

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.         */        iconsLibrary: 'materialicons',

        /** The initial datepicker value.         */        value: undefined,

        /** Day of the week start. 0 (Sunday) to 6 (Saturday)         */        weekStartDay: 0,

        /** An array or function that will be used to determine which dates to be disabled for selection by the widget.         */        disableDates: undefined,

        /** An array that will be used to determine which days of week to be disabled for selection by the widget.
         * The array needs to contains only numbers where 0 is Sunday, 1 is Monday and etc.         */        disableDaysOfWeek: undefined,

        /** Whether to display week number in year on the left side of the calendar.         */        calendarWeeks: false,

        /** Whether to enable keyboard navigation.         */        keyboardNavigation: true,

        /** The language that needs to be in use.         */        locale: 'en-us',

        icons: {
            /** datepicker icon definition.             */            rightIcon: '<i class="gj-icon">event</i>',

            previousMonth: '<i class="gj-icon chevron-left"></i>',
            nextMonth: '<i class="gj-icon chevron-right"></i>'
        },

        fontSize: undefined,

        /** The size of the datepicker input.         */        size: 'default',

        /** If set to true, the datepicker will have modal behavior.         */        modal: false,

        /** If set to true, add header to the datepicker.         */        header: false,

        /** If set to true, add footer with ok and cancel buttons to the datepicker.         */        footer: false,

        /** If set to true, show datepicker on input focus.         */        showOnFocus: true,

        /** If set to true, show datepicker icon on the right side of the input.         */        showRightIcon: true,

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-datepicker gj-datepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            calendar: 'gj-picker gj-picker-md datepicker gj-unselectable',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        showOtherMonths: true
    },

    fontawesome: {
        icons: {
            rightIcon: '<i class="fa fa-calendar" aria-hidden="true"></i>',
            previousMonth: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            nextMonth: '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            rightIcon: '<span class="glyphicon glyphicon-calendar"></span>',
            previousMonth: '<span class="glyphicon glyphicon-chevron-left"></span>',
            nextMonth: '<span class="glyphicon glyphicon-chevron-right"></span>'
        }
    }
};

gj.datepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.initJS.call(this, jsConfig, 'datepicker');
        this.element.setAttribute('data-datepicker', 'true');
        gj.datepicker.methods.initialize(this, gijgoStorage.get(this.element, 'gijgo'));
        return this;
    },

    initialize: function (picker, data) {
        var wrapper, rightIcon, calendar;

        if (picker.element.parentElement.attributes.role !== 'wrapper') {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'wrapper');
            picker.element.parentNode.insertBefore(wrapper, picker.element);
            wrapper.appendChild(picker.element);
        } else {
            wrapper = picker.element.parentElement;
        }

        gj.core.addClasses(wrapper, data.style.wrapper);

        if (data.width) {
            wrapper.style.width = data.width + 'px';
        }

        picker.element.value = data.value || '';
        gj.core.addClasses(picker.element, data.style.input);
        wrapper.setAttribute('role', 'input');

        if (data.fontSize) {
            picker.element.style.fontSize = data.fontSize;
        }
        
        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4') {
            if (data.size === 'small') {
                wrapper.classList.add('input-group-sm');
                picker.element.classList.add('form-control-sm');
            } else if (data.size === 'large') {
                wrapper.classList.add('input-group-lg');
                picker.element.classList.add('form-control-lg');
            }
        } else {
            if (data.size === 'small') {
                wrapper.classList.add('small');
            } else if (data.size === 'large') {
                wrapper.classList.add('large');
            }
        }

        if (data.showRightIcon) {
            if (data.uiLibrary === 'bootstrap') {
                rightIcon = document.createElement('span');
                rightIcon.classList.add('input-group-addon');
                rightIcon.innerHTML = data.icons.rightIcon;
            } else if (data.uiLibrary === 'bootstrap4') {
                rightIcon = document.createElement('span');
                rightIcon.classList.add('input-group-append');
                rightIcon.innerHTML = '<button class="btn btn-outline-secondary border-left-0" type="button">' + data.icons.rightIcon + '</button>';                
            } else {
                rightIcon = gj.core.createElement(data.icons.rightIcon);
            }
            rightIcon.setAttribute('role', 'right-icon');
            rightIcon.addEventListener('click', function (e) {
                var calendar = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');
                if (window.getComputedStyle(calendar).display === 'none') {
                    gj.datepicker.methods.open(picker, data);
                } else {
                    gj.datepicker.methods.close(picker);
                }
            });
            wrapper.appendChild(rightIcon);
        }

        if (data.showOnFocus) {
            picker.element.addEventListener('focus', function () {
                gj.datepicker.methods.open(picker, data);
            });
        }

        calendar = gj.datepicker.methods.createCalendar(picker, data);

        if (data.footer !== true) {
            picker.element.addEventListener('blur', function () {
                picker.timeout = setTimeout(function () {
                    gj.datepicker.methods.close(picker);
                }, 500);
            });
            calendar.addEventListener('mousedown', function () {
                clearTimeout(picker.timeout);
                document.activeElement !== picker.element && picker.element.focus();
                return false;
            });
            calendar.addEventListener('click', function () {
                clearTimeout(picker.timeout);
                document.activeElement !== picker.element && picker.element.focus();
            });
        }

        if (data.keyboardNavigation) {
            document.addEventListener('keydown', gj.datepicker.methods.createKeyDownHandler(picker, calendar, data));
        }
    },

    createCalendar: function (picker, data) {
        var date, body, footer, btnCancel, btnOk, calendar, wrapper;

        calendar = document.createElement('div');
        calendar.setAttribute('role', 'picker');
        calendar.setAttribute('type', 'month');
        gj.core.addClasses(calendar, data.style.calendar);
        calendar.setAttribute('guid', picker.element.getAttribute('data-guid'));
        
        if (data.fontSize) {
            calendar.style.fontSize = data.fontSize;
        }

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            picker.element.setAttribute('day', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
        }

        calendar.setAttribute('month', date.getMonth());
        calendar.setAttribute('year', date.getFullYear());

        gj.datepicker.methods.renderHeader(picker, calendar, data, date);

        body = document.createElement('div');
        body.setAttribute('role', 'body');
        calendar.appendChild(body);

        if (data.footer) {
            footer = document.createElement('div');
            footer.setAttribute('role', 'footer');
            gj.core.addClasses(footer, data.style.footer);

            btnCancel = gj.core.createElement('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].cancel + '</button>');
            btnCancel.addEventListener('click', function () { picker.close(); });
            footer.appendChild(btnCancel);

            btnOk = gj.core.createElement('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].ok + '</button>');
            btnOk.addEventListener('click', function () {
                var date, dayArr, dayStr = calendar.getAttribute('selectedDay');
                if (dayStr) {
                    dayArr = dayStr.split('-');
                    date = new Date(dayArr[0], dayArr[1], dayArr[2], calendar.getAttribute('hour') || 0, calendar.getAttribute('minute') || 0);
                    gj.datepicker.methods.change(picker, calendar, data, date);
                } else {
                    picker.close();
                }
            });
            footer.appendChild(btnOk);

            calendar.appendChild(footer);
        }

        calendar.style.display = 'none';
        document.body.appendChild(calendar);

        if (data.modal) {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'modal');
            gj.core.addClasses(wrapper, data.style.modal);
            calendar.parentNode.insertBefore(wrapper, calendar);
            wrapper.appendChild(calendar);
            gj.core.center(calendar);
        }

        return calendar;
    },

    renderHeader: function (picker, calendar, data, date) {
        var header, dateEl, yearEl;

        if (data.header) {
            header = document.createElement('div');
            header.setAttribute('role', 'header');

            yearEl = document.createElement('div');
            yearEl.setAttribute('role', 'year');

            yearEl.addEventListener('click', function () {
                gj.datepicker.methods.renderDecade(picker, calendar, data);
                yearEl.classList.add('selected');
                dateEl.classList.remove('selected');
            });
            yearEl.innerHTML = gj.core.formatDate(date, 'yyyy', data.locale);
            header.appendChild(yearEl);

            dateEl = document.createElement('div');
            dateEl.setAttribute('role', 'date');
            dateEl.classList.add('selected');
            dateEl.addEventListener('click', function () {
                gj.datepicker.methods.renderMonth(picker, calendar, data);
                dateEl.classList.add('selected');
                yearEl.classList.remove('selected');
            });
            dateEl.innerHTML = gj.core.formatDate(date, 'ddd, mmm dd', data.locale);
            header.appendChild(dateEl);
            calendar.appendChild(header);
        }
    },

    updateHeader: function (calendar, data, date) {
        var yearEl, dateEl, hour, minute;

        if (data.header) {
            yearEl = calendar.querySelector('[role="header"] [role="year"]');
            yearEl.classList.remove('selected');
            yearEl.innerHTML = gj.core.formatDate(date, 'yyyy', data.locale);

            dateEl = calendar.querySelector('[role="header"] [role="date"]');
            dateEl.classList.add('selected');
            dateEl.innerHTML = gj.core.formatDate(date, 'ddd, mmm dd', data.locale);

            hour = calendar.querySelector('[role="header"] [role="hour"]');
            if (hour) {
                hour.classList.remove('selected');
                hour.innerHTML = gj.core.formatDate(date, 'HH', data.locale);
            }

            minute = calendar.querySelector('[role="header"] [role="minute"]');
            if (minute) {
                minute.classList.remove('selected');
                minute.innerHTML = gj.core.formatDate(date, 'MM', data.locale);
            }
        }
    },

    createNavigation: function (picker, body, table, data) {
        var navigator, row, prevIcon, period, nextIcon, th, thead = document.createElement('thead');

        navigator = document.createElement('div');
        navigator.setAttribute('role', 'navigator');

        prevIcon = document.createElement('div');
        prevIcon.innerHTML = data.icons.previousMonth;
        prevIcon.addEventListener('click', gj.datepicker.methods.prev(picker, data));
        navigator.appendChild(prevIcon);

        period = document.createElement('div');
        period.setAttribute('role', 'period');
        period.addEventListener('click', gj.datepicker.methods.changePeriod(picker, data));
        navigator.appendChild(period);

        nextIcon = document.createElement('div');
        nextIcon.innerHTML = data.icons.nextMonth;
        nextIcon.addEventListener('click', gj.datepicker.methods.next(picker, data));
        navigator.appendChild(nextIcon);

        body.append(navigator);

        row = document.createElement('tr');
        row.setAttribute('role', 'week-days');
        
        if (data.calendarWeeks) {
            th = document.createElement('th');
            th.innerHTML = '<div>&nbsp;</div>';
            row.appendChild(th);
        }
        for (i = data.weekStartDay; i < gj.core.messages[data.locale].weekDaysMin.length; i++) {
            th = document.createElement('th');
            th.innerHTML = '<div>' + gj.core.messages[data.locale].weekDaysMin[i] + '</div>';
            row.appendChild(th);
        }
        for (i = 0; i < data.weekStartDay; i++) {
            th = document.createElement('th');
            th.innerHTML = '<div>' + gj.core.messages[data.locale].weekDaysMin[i] + '</div>';
            row.appendChild(th);
        }
        thead.appendChild(row);

        table.appendChild(thead);
    },

    getDaysInMonth: function (year) {
        var result = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (year % 4 == 0 && year != 1900) {
            result[1] = 29;
        }
        return result;
    },

    renderMonth: function (picker, calendar, data) {
        var weekDay, selectedDay, day, month, year, total, daysInMonth, firstDayPosition, i, now, prevMonth, nextMonth, cell, dayEl, date,
            body = calendar.querySelector('[role="body"]'),
            table = document.createElement('table'),
            tbody = document.createElement('tbody'),
            period = gj.core.messages[data.locale].titleFormat;
        
        body.innerHTML = '';
        gj.datepicker.methods.createNavigation(picker, body, table, data);
        
        month = parseInt(calendar.getAttribute('month'), 10);
        year = parseInt(calendar.getAttribute('year'), 10);

        calendar.setAttribute('type', 'month');
        period = period.replace('mmmm', gj.core.messages[data.locale].monthNames[month]).replace('yyyy', year);
        calendar.querySelector('div[role="period"]').innerText = period;
        daysInMonth = gj.datepicker.methods.getDaysInMonth(year);
        total = daysInMonth[month];

        firstDayPosition = (new Date(year, month, 1).getDay() + 7 - data.weekStartDay) % 7;

        weekDay = 0;
        row = document.createElement('tr');
        prevMonth = gj.datepicker.methods.getPrevMonth(month, year);
        for (i = 1; i <= firstDayPosition; i++) {
            day = (daysInMonth[prevMonth.month] - firstDayPosition + i);
            date = new Date(prevMonth.year, prevMonth.month, day);
            if (data.calendarWeeks && i === 1) {
                cell = document.createElement('td');
                cell.classList.add('calendar-week');
                cell.innerHTML = '<div>' + gj.datepicker.methods.getWeekNumber(date) + '</div>';
                row.appendChild(cell);
            }
            cell = document.createElement('td');
            cell.classList.add('other-month');
            if (data.showOtherMonths) {
                dayEl = document.createElement('div');
                dayEl.innerHTML = day;
                cell.appendChild(dayEl);
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    cell.classList.add('gj-cursor-pointer');
                    cell.setAttribute('day', day);
                    cell.setAttribute('month', prevMonth.month);
                    cell.setAttribute('year', prevMonth.year);
                    dayEl.addEventListener('click', gj.datepicker.methods.dayClickHandler(picker, calendar, data, date));
                    dayEl.addEventListener('mousedown', function (e) { e.stopPropagation() });
                } else {
                    cell.classList.add('disabled');
                }
            }
            row.appendChild(cell);
            weekDay++;
        }
        if (i > 1) {
            tbody.appendChild(row);
        }

        now = new Date();
        for (i = 1; i <= total; i++) {
            date = new Date(year, month, i);
            if (weekDay == 0) {
                row = document.createElement('tr');
                if (data.calendarWeeks) {
                    cell = document.createElement('td');
                    cell.classList.add('calendar-week');
                    cell.innerHTML = '<div>' + gj.datepicker.methods.getWeekNumber(date) + '</div>';
                    row.appendChild(cell);
                }
            }
            cell = document.createElement('td');
            cell.setAttribute('day', i);
            cell.setAttribute('month', month);
            cell.setAttribute('year', year);
            if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
                cell.classList.add('today');
            } else {
                cell.classList.add('current-month');
            }
            dayEl = document.createElement('div');
            dayEl.innerText = i;
            if (gj.datepicker.methods.isSelectable(data, date)) {
                cell.classList.add('gj-cursor-pointer');
                dayEl.addEventListener('click', gj.datepicker.methods.dayClickHandler(picker, calendar, data, date));
                dayEl.addEventListener('mousedown', function (e) { e.stopPropagation() });
            } else {
                cell.classList.add('disabled');
            }
            cell.appendChild(dayEl);
            row.appendChild(cell);
            weekDay++;
            if (weekDay == 7) {
                tbody.appendChild(row);
                weekDay = 0;
            }
        }

        nextMonth = gj.datepicker.methods.getNextMonth(month, year);
        for (i = 1; weekDay != 0; i++) {
            date = new Date(nextMonth.year, nextMonth.month, i);
            cell = document.createElement('td');
            cell.classList.add('other-month');
            if (data.showOtherMonths) {
                dayEl = document.createElement('div');
                dayEl.innerText = i;
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    cell.classList.add('gj-cursor-pointer');
                    cell.setAttribute('day', i);
                    cell.setAttribute('month', nextMonth.month);
                    cell.setAttribute('year', nextMonth.year);                    
                    dayEl.addEventListener('click', gj.datepicker.methods.dayClickHandler(picker, calendar, data, date));
                    dayEl.addEventListener('mousedown', function (e) { e.stopPropagation() });
                } else {
                    cell.classList.add('disabled');
                }
                cell.appendChild(dayEl);
            }
            row.appendChild(cell);
            weekDay++;
            if (weekDay == 7) {
                tbody.appendChild(row);
                weekDay = 0;
            }
        }

        table.appendChild(tbody);
        body.appendChild(table);

        if (calendar.getAttribute('selectedDay')) {
            selectedDay = calendar.getAttribute('selectedDay').split('-');
            date = new Date(selectedDay[0], selectedDay[1], selectedDay[2], calendar.getAttribute('hour') || 0, calendar.getAttribute('minute') || 0);
            cell = calendar.querySelector('tbody td[day="' + selectedDay[2] + '"][month="' + selectedDay[1] + '"]');
            if (cell) {
                cell.classList.add('selected');
            }
            gj.datepicker.methods.updateHeader(calendar, data, date);
        }
    },

    renderYear: function (picker, calendar, data) {
        var year, i, m, row, month,
            table = calendar.querySelector('[role="body"] table'),
            tbody = table.querySelector('tbody');
        
        table.querySelector('thead').style.display = 'none';

        year = parseInt(calendar.getAttribute('year'), 10);

        calendar.setAttribute('type', 'year');
        calendar.querySelector('div[role="period"]').innerText = year;

        tbody.innerHTML = '';

        for (i = 0; i < 3; i++) {
            row = document.createElement('tr');
            for (m = (i * 4); m <= (i * 4) + 3; m++) {
                month = document.createElement('div');
                month.innerHTML = gj.core.messages[data.locale].monthShortNames[m];
                month.addEventListener('click', gj.datepicker.methods.selectMonth(picker, calendar, data, m));
                cell = document.createElement('td');
                cell.appendChild(month);
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    },

    renderDecade: function (picker, calendar, data) {
        var year, decade, i, y, year,
            table = calendar.querySelector('[role="body"] table'),
            tbody = table.querySelector('tbody');
        
        table.querySelector('thead').display.style = 'none';

        year = parseInt(calendar.getAttribute('year'), 10);
        decade = year - (year % 10);

        calendar.setAttribute('type', 'decade');
        calendar.querySelector('div[role="period"]').innerText = decade + ' - ' + (decade + 9);

        tbody.innerHTML = '';

        for (i = decade - 1; i <= decade + 10 ; i += 4) {
            row = document.createElement('tr');
            for (y = i; y <= i + 3; y++) {
                year = document.createElement('div');
                year.innerText = y;
                year.addEventListener('click', gj.datepicker.methods.selectYear(picker, calendar, data, y));
                cell = document.createElement('td')
                cell.appendChild(year);
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    },

    renderCentury: function (picker, calendar, data) {
        var year, century, i, d, decade,
            table = calendar.querySelector('[role="body"] table'),
            tbody = $table.querySelector('tbody');
        
        table.querySelector('thead').style.display = 'none';

        year = parseInt(calendar.getAttribute('year'), 10);
        century = year - (year % 100);

        calendar.setAttribute('type', 'century');
        calendar.querySelector('div[role="period"]').innerText = century + ' - ' + (century + 99);

        tbody.innerHTML = '';

        for (i = (century - 10); i < century + 100; i += 40) {
            row = document.createElement('tr');
            for (d = i; d <= i + 30; d += 10) {
                decade = document.createElement('div');
                decade.innerText = d;
                decade.addEventListener('click', gj.datepicker.methods.selectDecade(picker, calendar, data, d));
                cell = document.createElement('td')
                cell.appendChild(decade);
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    },

    getWeekNumber: function (date) {
        var d = new Date(date.valueOf());
        d.setDate(d.getDate() + 6);
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    },

    getMinDate: function (data) {
        var minDate;
        if (data.minDate) {
            if (typeof (data.minDate) === 'string') {
                minDate = gj.core.parseDate(data.minDate, data.format, data.locale);
            } else if (typeof (data.minDate) === 'function') {
                minDate = data.minDate();
                if (typeof minDate === 'string') {
                    minDate = gj.core.parseDate(minDate, data.format, data.locale);
                }
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
                maxDate = gj.core.parseDate(data.maxDate, data.format, data.locale);
            } else if (typeof data.maxDate === 'function') {
                maxDate = data.maxDate();
                if (typeof maxDate === 'string') {
                    maxDate = gj.core.parseDate(maxDate, data.format, data.locale);
                }
            } else if (typeof data.maxDate.getMonth === 'function') {
                maxDate = data.maxDate;
            }
        }
        return maxDate;
    },

    isSelectable: function (data, date) {
        var result = true,
            minDate = gj.datepicker.methods.getMinDate(data),
            maxDate = gj.datepicker.methods.getMaxDate(data),
            i;

        if (minDate && date < minDate) {
            result = false;
        } else if (maxDate && date > maxDate) {
            result = false;
        }

        if (result) {
            if (data.disableDates) {
                if (Array.isArray(data.disableDates)) {
                    for (i = 0; i < data.disableDates.length; i++) {
                        if (data.disableDates[i] instanceof Date && data.disableDates[i].getTime() === date.getTime()) {
                            result = false;
                        } else if (typeof data.disableDates[i] === 'string' && gj.core.parseDate(data.disableDates[i], data.format, data.locale).getTime() === date.getTime()) {
                            result = false;
                        }
                    }
                } else if (data.disableDates instanceof Function) {
                    result = data.disableDates(date);
                }
            }
            if (Array.isArray(data.disableDaysOfWeek) && data.disableDaysOfWeek.indexOf(date.getDay()) > -1) {
                result = false;
            }
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

    prev: function (picker, data) {
        return function () {
            var date, month, year, decade, century,
                calendar = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');

            year = parseInt(calendar.getAttribute('year'), 10);
            switch (calendar.getAttribute('type')) {
                case 'month':
                    month = parseInt(calendar.getAttribute('month'), 10);
                    date = gj.datepicker.methods.getPrevMonth(month, year);
                    calendar.setAttribute('month', date.month);
                    calendar.setAttribute('year', date.year);
                    gj.datepicker.methods.renderMonth(picker, calendar, data);
                    break;
                case 'year':
                    calendar.setAttribute('year', year - 1);
                    gj.datepicker.methods.renderYear(picker, calendar, data);
                    break;
                case 'decade':
                    decade = year - (year % 10);
                    calendar.setAttribute('year', decade - 10);
                    gj.datepicker.methods.renderDecade(picker, calendar, data);
                    break;
                case 'century':
                    century = year - (year % 100);
                    calendar.setAttribute('year', century - 100);
                    gj.datepicker.methods.renderCentury(picker, calendar, data);
                    break;
            }
            
            return false;
        }
    },

    next: function (picker, data) {
        return function (e) {
            var date, month, year, decade, century,
                calendar = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');

            year = parseInt(calendar.getAttribute('year'), 10);
            switch (calendar.getAttribute('type')) {
                case 'month':
                    month = parseInt(calendar.getAttribute('month'), 10);
                    date = gj.datepicker.methods.getNextMonth(month, year);
                    calendar.setAttribute('month', date.month);
                    calendar.setAttribute('year', date.year);
                    gj.datepicker.methods.renderMonth(picker, calendar, data);
                    break;
                case 'year':
                    calendar.setAttribute('year', year + 1);
                    gj.datepicker.methods.renderYear(picker, calendar, data);
                    break;
                case 'decade':
                    decade = year - (year % 10);
                    calendar.setAttribute('year', decade + 10);
                    gj.datepicker.methods.renderDecade(picker, calendar, data);
                    break;
                case 'century':
                    century = year - (year % 100);
                    calendar.setAttribute('year', century + 100);
                    gj.datepicker.methods.renderCentury(picker, calendar, data);
                    break;
            }

            return false;
        };
    },

    changePeriod: function (picker, data) {
        return function (e) {
            var calendar = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');

            switch (calendar.getAttribute('type')) {
                case 'month':
                    gj.datepicker.methods.renderYear(picker, calendar, data);
                    break;
                case 'year':
                    gj.datepicker.methods.renderDecade(picker, calendar, data);
                    break;
                case 'decade':
                    gj.datepicker.methods.renderCentury(picker, calendar, data);
                    break;
            }
        };
    },

    dayClickHandler: function (picker, calendar, data, date) {
        return function (e) {
            e && e.stopPropagation();
            gj.datepicker.methods.selectDay(picker, calendar, data, date);
            if (data.footer !== true && data.autoClose !== false) {
                gj.datepicker.methods.change(picker, calendar, data, date);
            }
            return picker;
        };
    },

    change: function (picker, calendar, data, date) {
        var day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear(),
            value = gj.core.formatDate(date, data.format, data.locale);
        calendar.setAttribute('month', month);
        calendar.setAttribute('year', year);
        picker.element.value = value;
        gj.datepicker.events.change(picker.element);
        if (window.getComputedStyle(calendar).display !== 'none') {
            gj.datepicker.methods.close(picker);
        }
    },

    selectDay: function (picker, calendar, data, date) {
        var cell, day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();
        calendar.setAttribute('selectedDay', year + '-' + month + '-' + day);
        [].forEach.call(calendar.querySelectorAll('tbody td'), function (el) {
            el.classList.remove('selected');
        });
        cell = calendar.querySelector('tbody td[day="' + day + '"][month="' + month + '"]');
        if (cell) {
            cell.classList.add('selected');
        }
        gj.datepicker.methods.updateHeader(calendar, data, date);
        gj.datepicker.events.select(picker.element, 'day');
    },

    selectMonth: function (picker, calendar, data, month) {
        return function (e) {
            calendar.setAttribute('month', month);
            gj.datepicker.methods.renderMonth(picker, calendar, data);
            gj.datepicker.events.select(picker.element, 'month');
        };
    },

    selectYear: function (picker, calendar, data, year) {
        return function (e) {
            calendar.setAttribute('year', year);
            gj.datepicker.methods.renderYear(picker, calendar, data);
            gj.datepicker.events.select(picker.element, 'year');
        };
    },

    selectDecade: function (picker, calendar, data, year) {
        return function (e) {
            calendar.setAttribute('year', year);
            gj.datepicker.methods.renderDecade(picker, calendar, data);
            gj.datepicker.events.select(picker.element, 'decade');
        };
    },

    open: function (picker, data) {
        var date,
            calendar = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');

        if (window.getComputedStyle(calendar).display === 'none') {
            if (picker.element.value) {
                picker.value(picker.element.value);
            } else {
                date = new Date();
                calendar.setAttribute('month', date.getMonth());
                calendar.setAttribute('year', date.getFullYear());
            }

            switch (calendar.getAttribute('type')) {
                case 'month':
                    gj.datepicker.methods.renderMonth(picker, calendar, data);
                    break;
                case 'year':
                    gj.datepicker.methods.renderYear(picker, calendar, data);
                    break;
                case 'decade':
                    gj.datepicker.methods.renderDecade(picker, calendar, data);
                    break;
                case 'century':
                    gj.datepicker.methods.renderCentury(picker, calendar, data);
                    break;
            }

            calendar.style.display = 'block';
            if (data.modal) {
                calendar.parentElement.style.display = 'block';
                gj.core.center(calendar);
            } else {
                gj.core.setChildPosition(picker.element, calendar);
                document.activeElement !== picker.element && picker.element.focus();
            }
            clearTimeout(picker.timeout);
            gj.datepicker.events.open(picker.element);
        }
    },

    close: function (picker) {
        var calendar = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');
        if (window.getComputedStyle(calendar).display !== 'none') {
            calendar.style.display = 'none';
            if (calendar.parentElement.getAttribute('role') === 'modal') {
                calendar.parentElement.style.display = 'none';
            }
            gj.datepicker.events.close(picker.element);
        }
    },

    createKeyDownHandler: function (picker, calendar, data) {
        return function (e) {
            var activeCell;
            e = e || window.event;
            if (window.getComputedStyle(calendar).display !== 'none') {
                activeCell = gj.datepicker.methods.getActiveCell(calendar);
                gj.datepicker.methods.activateNextElement(picker, calendar, data, e.keyCode, activeCell);
            }
        };
    },

    activateNextElement: function (picker, calendar, data, keyCode, cell) {
        var day, month, year, index, newEl;

        if (keyCode == '38') { // up
            index = Array.prototype.slice.call(cell.parentElement.children).indexOf(cell);
            if (cell.parentElement.previousSibling) {
                newEl = cell.parentElement.previousSibling.children[index];
            }
            if (!newEl || !newEl.hasAttribute('day')) {
                gj.datepicker.methods.prev(picker, data)();
                nodes = calendar.querySelectorAll('tbody tr');
                newEl = nodes[nodes.length - 1].querySelectorAll('td')[index];
            }
            gj.datepicker.methods.selectElement(picker, calendar, data, keyCode, cell, newEl);
        } else if (keyCode == '40') { // down
            index = Array.prototype.slice.call(cell.parentElement.children).indexOf(cell);
            if (cell.parentElement.nextSibling) {
                newEl = cell.parentElement.nextSibling.children[index];
            }
            if (!newEl || !newEl.hasAttribute('day')) {
                gj.datepicker.methods.next(picker, data)();
                newEl = calendar.querySelector('tbody tr').querySelectorAll('td')[index];
            }
            gj.datepicker.methods.selectElement(picker, calendar, data, keyCode, cell, newEl);
        } else if (keyCode == '37') { // left
            newEl = cell.previousSibling;
            if (!newEl && cell.parentElement.previousSibling && cell.parentElement.previousSibling.children[6].hasAttribute('day')) { // Go To the previous row/week
                newEl = cell.parentElement.previousSibling.children[6];
            }
            if (!newEl) {
                gj.datepicker.methods.prev(picker, data)();
                month = parseInt(calendar.getAttribute('month'), 10);
                year = parseInt(calendar.getAttribute('year'), 10);
                day = data.showOtherMonths ? parseInt(cell.getAttribute('day'), 10) - 1 : gj.datepicker.methods.getDaysInMonth(year)[month];
                newEl = calendar.querySelector('tbody tr td[day="' + day + '"]');
            }
            gj.datepicker.methods.selectElement(picker, calendar, data, keyCode, cell, newEl);
        } else if (keyCode == '39') { // right
            newEl = cell.nextSibling;
            if (!newEl && cell.parentElement.nextSibling && cell.parentElement.nextSibling.children[0].hasAttribute('day')) { // Go To the next row/week
                newEl = cell.parentElement.nextSibling.children[0];
            }
            if (!newEl) { // Go To the next month
                gj.datepicker.methods.next(picker, data)();
                day = data.showOtherMonths ? parseInt(cell.getAttribute('day'), 10) + 1 : 1;
                newEl = calendar.querySelector('tbody tr td[day="' + day + '"]');
            }
            gj.datepicker.methods.selectElement(picker, calendar, data, keyCode, cell, newEl);
        } else if (keyCode == '13') { // enter
            day = parseInt(cell.getAttribute('day'), 10);
            month = parseInt(cell.getAttribute('month'), 10);
            year = parseInt(cell.getAttribute('year'), 10);
            gj.datepicker.methods.dayClickHandler(picker, calendar, data, new Date(year, month, day))();
        } else if (keyCode == '27') { // esc
            picker.close();
        }
    },

    selectElement: function (picker, calendar, data, keyCode, cell, newEl) {
        if (newEl) {
            if (newEl.classList.contains('disabled') || !newEl.hasAttribute('day')) {
                cell.classList.remove('focused');
                gj.datepicker.methods.activateNextElement(picker, calendar, data, keyCode, newEl);
            } else {
                newEl.classList.add('focused');
                cell.classList.remove('focused');
            }
        }
    },

    getActiveCell: function (calendar) {
        var cell = calendar.querySelector('td[day].focused');
        if (!cell) {
            cell = calendar.querySelector('td[day].selected');
            if (!cell) {
                cell = calendar.querySelector('td[day].today');
                if (!cell) {
                    cell = calendar.querySelector('td[day]:not(.disabled)');
                }
            }
        }
        return cell;
    },

    value: function (picker, value) {
        var calendar, date, data = gijgoStorage.get(picker.element, 'gijgo');
        if (typeof (value) === "undefined") {
            return picker.element.value;
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date && date.getTime()) {
                calendar = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');
                gj.datepicker.methods.dayClickHandler(picker, calendar, data, date)();
            } else {
                picker.element.value = '';
            }
            return picker;
        }
    },

    destroy: function (picker) {
        var data = gijgoStorage.get(picker.element, 'gijgo'),
            parent = picker.element.parentElement,
            calendar = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');
        if (data) {
            //$datepicker.off();
            if (picker.element.parentElement.getAttribute('role') === 'modal') {
                picker.element.outerHTML = picker.element.innerHTML;
            }
            //$picker.remove();
            gijgoStorage.remove(picker.element, 'gijgo');
            picker.element.removeAttribute('data-type');
            picker.element.removeAttribute('data-guid');
            picker.element.removeAttribute('data-datepicker');
            picker.element.removeAttribute('class');
            picker.element.removeChild(picker.element.querySelector('[role="right-icon"]'));
        }
        return picker;
    }
};

gj.datepicker.events = {
    /**
     * Triggered when the datepicker value is changed.
     *     */    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Triggered when new value is selected inside the picker.
     *     */    select: function (el, type) {
        return el.dispatchEvent(new CustomEvent('select', { 'type': type }));
    },

    /**
     * Event fires when the calendar is opened.     */    open: function (el) {
        return el.dispatchEvent(new Event('open'));
    },

    /**
     * Event fires when the calendar is closed.     */    close: function (el) {
        return el.dispatchEvent(new Event('close'));
    }
};

GijgoDatePicker = function (element, jsConfig) {
    var self = this,
        methods = gj.datepicker.methods;

    self.element = element;

    /** Gets or sets the value of the datepicker.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove datepicker functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Open the calendar.     */    self.open = function () {
        return methods.open(this, this.data());
    };

    /** Close the calendar.     */    self.close = function () {
        return methods.close(this);
    };
    
    if ('true' !== element.getAttribute('data-datepicker')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDatePicker.prototype = new gj.widget();
GijgoDatePicker.constructor = GijgoDatePicker;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.datepicker = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDatePicker(this[0], method);
                } else {
                    $widget = new GijgoDatePicker(this[0], null);
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

