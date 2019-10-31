/*
 * Gijgo TimePicker v1.9.10
 * http://gijgo.com/timepicker
 *
 * Copyright 2014, 2018 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.timepicker = {
    plugins: {}
};

gj.timepicker.config = {
    base: {

        /** The width of the timepicker.         */        width: undefined,

        /** If set to true, the timepicker will have modal behavior.         */        modal: true,

        /** If set to true, add header to the timepicker.         */        header: true,

        /** If set to true, add footer with ok and cancel buttons to the timepicker.         */        footer: true,

        /** Specifies the format, which is used to format the value of the timepicker displayed in the input.         */        format: 'HH:MM',

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The initial timepicker value.         */        value: undefined,

        /** The timepicker mode. Tells the component to display the picker in ampm (12hr) format or 24hr format.         */        mode: '24hr',

        /** The language that needs to be in use.         */        locale: 'en-us',

        /** The size of the timepicker input.         */        size: 'default',

        /** If set to true, show timepicker on input focus.         */        showOnFocus: true,

        /** If set to true, show timepicker icon on the right side of the input.         */        showRightIcon: true,

        icons: {
            rightIcon: '<i class="gj-icon clock" />'
        },

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-timepicker gj-timepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            clock: 'gj-picker gj-picker-md timepicker',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            clock: 'gj-picker gj-picker-bootstrap timepicker',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control border',
            clock: 'gj-picker gj-picker-bootstrap timepicker',
            footer: 'modal-footer',
            button: 'btn btn-default'
        }
    }
};

gj.timepicker.methods = {
    init: function (jsConfig) {
        gj.picker.widget.prototype.init.call(this, jsConfig, 'timepicker');
        return this;
    },

    initialize: function () {

    },

    initMouse: function (body, input, picker, data) {
        //body = body.parentNode.replaceChild(body.cloneNode(true), body); // remove all event listeners
        body.addEventListener('mousedown', gj.timepicker.methods.mouseDownHandler(picker));
        body.addEventListener('mousemove', gj.timepicker.methods.mouseMoveHandler(input, picker));
        body.addEventListener('mouseup', gj.timepicker.methods.mouseUpHandler(input, picker));
    },

    createPopup: function (picker) {
        var date, amEl, pmEl, wrapper,
            data = gijgoStorage.get(picker.element, 'gijgo'),
            clock = document.createElement('div'),
            hour = document.createElement('div'),
            separator = document.createElement('span'),
            minute = document.createElement('div'),
            header = document.createElement('div'),
            mode = document.createElement('div'),
            body = document.createElement('div'),
            btnOk = document.createElement('button'),
            btnCancel = document.createElement('button'),
            footer = document.createElement('div');

        gj.core.addClasses(clock, data.style.clock);
        clock.setAttribute('role', 'picker');
        clock.setAttribute('guid', picker.element.getAttribute('data-guid'));

        hour.setAttribute('role', 'hour');
        minute.setAttribute('role', 'minute');
        header.setAttribute('role', 'header');
        mode.setAttribute('role', 'mode');
        body.setAttribute('role', 'body');

        gj.core.addClasses(btnOk, data.style.button);
        btnOk.innerText = gj.core.messages[data.locale].ok;

        gj.core.addClasses(btnCancel, data.style.button);
        btnCancel.innerText = gj.core.messages[data.locale].cancel;

        footer.setAttribute('role', 'footer');
        gj.core.addClasses(footer, data.style.footer);

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            picker.element.setAttribute('hours', date.getHours());
        }

        if (data.header) {
            hour.addEventListener('click', function () {
                gj.timepicker.methods.renderHours(picker.element, clock, data);
            });
            minute.addEventListener('click', function () {
                gj.timepicker.methods.renderMinutes(picker.element, clock, data);
            });
            header.appendChild(hour);
            separator.innerText = ':';
            header.appendChild(separator);
            header.appendChild(minute);

            if (data.mode === 'ampm') {
                amEl = document.createElement('span');
                amEl.setAttribute('role', 'am');
                amEl.innerText = gj.core.messages[data.locale].am;
                mode.appendChild(amEl);
                amEl.addEventListener('click', function () {
                    var hour = gj.timepicker.methods.getHour(clock);
                    clock.setAttribute('mode', 'am');
                    this.classList.add('selected');
                    this.parentElement.querySelector('[role="pm"]').classList.remove('selected');
                    if (hour >= 12) {
                        clock.setAttribute('hour', hour - 12);
                    }
                    if (!data.modal) {
                        clearTimeout(picker.timeout);
                        picker.element.focus();
                    }
                });
                mode.appendChild(document.createElement('br'));

                pmEl = document.createElement('span');
                pmEl.setAttribute('role', 'pm');
                pmEl.innerText = gj.core.messages[data.locale].pm;
                mode.appendChild(pmEl);
                pmEl.addEventListener('click', function () {
                    var hour = gj.timepicker.methods.getHour(clock);
                    clock.setAttribute('mode', 'pm');
                    this.classList.add('selected');
                    this.parentElement.querySelector('[role="am"]').classList.remove('selected');
                    if (hour < 12) {
                        clock.setAttribute('hour', hour + 12);
                    }
                    if (!data.modal) {
                        clearTimeout(picker.timeout);
                        picker.element.focus();
                    }
                });
                header.appendChild(mode);
            }
            clock.appendChild(header);
        }
        
        clock.appendChild(body);

        if (data.footer) {
            btnCancel.addEventListener('click', function () { picker.close(); });
            footer.appendChild(btnCancel);
            btnOk.addEventListener('click', gj.timepicker.methods.setTime(picker, clock));
            footer.appendChild(btnOk);
            clock.appendChild(footer);
        }

        clock.style.display = 'none';

        document.body.appendChild(clock);

        if (data.modal) {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'modal');
            gj.core.addClasses(wrapper, data.style.modal);
            clock.parentNode.insertBefore(wrapper, clock);
            wrapper.appendChild(clock);
            gj.core.center(clock);
        }

        gj.timepicker.methods.initMouse(body, picker, clock, data);

        return clock;
    },

    getHour: function (clock) {
        return parseInt(clock.getAttribute('hour'), 10) || 0;
    },

    getMinute: function (clock) {
        return parseInt(clock.getAttribute('minute'), 10) || 0;
    },

    setTime: function (picker, clock) {
        return function () {
            var hour = gj.timepicker.methods.getHour(clock),
                minute = gj.timepicker.methods.getMinute(clock),
                mode = clock.getAttribute('mode'),
                date = new Date(0, 0, 0, (hour === 12 && mode === 'am' ? 0 : hour), minute),
                data = gijgoStorage.get(picker.element, 'gijgo'),
                value = gj.core.formatDate(date, data.format, data.locale);
            picker.value(value);
            picker.close();
        };
    },

    getPointerValue: function (x, y, mode) {
        var value, radius, size = 256,
            angle = Math.atan2(size / 2 - x, size / 2 - y) / Math.PI * 180;

        if (angle < 0) {
            angle = 360 + angle;
        }

        switch (mode) {
            case 'ampm': {
                value = 12 - Math.round(angle * 12 / 360);
                return value === 0 ? 12 : value;
            }
            case '24hr': {
                radius = Math.sqrt(Math.pow(size / 2 - x, 2) + Math.pow(size / 2 - y, 2));
                value = 12 - Math.round(angle * 12 / 360);
                if (value === 0) {
                    value = 12;
                }
                if (radius < size / 2 - 32) {
                    value = value === 12 ? 0 : value + 12;
                }
                return value;
            }
            case 'minutes': {
                value = Math.round(60 - 60 * angle / 360);
                return value === 60 ? 0 : value;
            }
        }
    },

    updateArrow: function(e, picker, clock, data) {
        var rect, value,
            mouseX = picker.mouseX(e),
            mouseY = picker.mouseY(e),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        rect = e.target.getBoundingClientRect();
        if (data.dialMode == 'hours') {
            value = gj.timepicker.methods.getPointerValue(mouseX - scrollX - rect.left, mouseY - scrollY - rect.top, data.mode);
            clock.setAttribute('hour', data.mode === 'ampm' && clock.getAttribute('mode') === 'pm' && value < 12 ? value + 12 : value);
        } else if (data.dialMode == 'minutes') {
            value = gj.timepicker.methods.getPointerValue(mouseX - scrollX - rect.left, mouseY - scrollY - rect.top, 'minutes');
            clock.setAttribute('minute', value);
        }

        gj.timepicker.methods.update(picker, clock, data);
    },

    update: function (picker, clock, data) {
        var hour, minute, arrow, visualHour, header, numbers, i, number;

        // update the arrow
        hour = gj.timepicker.methods.getHour(clock);
        minute = gj.timepicker.methods.getMinute(clock);
        arrow = clock.querySelector('[role="arrow"]');
        if (data.dialMode == 'hours' && (hour == 0 || hour > 12) && data.mode === '24hr') {
            arrow.style.width = 'calc(50% - 52px)';
        } else {
            arrow.style.width = 'calc(50% - 20px)';
        }

        if (data.dialMode == 'hours') {
            arrow.style.transform = 'rotate(' + ((hour * 30) - 90).toString() + 'deg)';
        } else {
            arrow.style.transform = 'rotate(' + ((minute * 6) - 90).toString() + 'deg)';
        }
        arrow.style.display = 'block';

        // update the numbers
        visualHour = (data.mode === 'ampm' && hour > 12 ? hour - 12 : (hour == 0 ? 12 : hour));
        numbers = clock.querySelectorAll('[role="body"] span');
        for (i = 0; i < numbers.length; i++) {
            number = parseInt(numbers[i].innerText, 10);
            if (data.dialMode === 'hours' && number === visualHour) {
                numbers[i].classList.add('selected');
            } else if (data.dialMode === 'minutes' && number === minute) {
                numbers[i].classList.add('selected');
            } else {
                numbers[i].classList.remove('selected');
            }
        }

        // update the header
        if (data.header) {
            header = clock.querySelector('[role="header"]');
            header.querySelector('[role="hour"]').innerText = visualHour;
            header.querySelector('[role="minute"]').innerText = gj.core.pad(minute);
            if (data.mode === 'ampm') {
                if (hour >= 12) {
                    header.querySelector('[role="pm"]').classList.add('selected');
                    header.querySelector('[role="am"]').classList.remove('selected');
                } else {
                    header.querySelector('[role="am"]').classList.add('selected');
                    header.querySelector('[role="pm"]').classList.remove('selected');
                }
            }
        }
    },

    mouseDownHandler: function (picker) {
        return function (e) {
            picker.mouseMove = true;
        };
    },

    mouseMoveHandler: function (picker, clock) {
        return function (e) {
            var data = gijgoStorage.get(picker.element, 'gijgo');
            if (picker.mouseMove) {
                gj.timepicker.methods.updateArrow(e, picker, clock, data);
            }
        };
    },

    mouseUpHandler: function (picker, clock) {
        return function (e) {
            var data = gijgoStorage.get(picker.element, 'gijgo');
            gj.timepicker.methods.updateArrow(e, picker, clock, data);
            picker.mouseMove = false;
            if (!data.modal) {
                clearTimeout(picker.timeout);
                picker.element.focus();
            }
            if (data.dialMode === 'hours') {
                setTimeout(function () {
                    gj.timepicker.events.select(picker.element, 'hour');
                    gj.timepicker.methods.renderMinutes(picker, clock, data);
                }, 1000);
            } else if (data.dialMode === 'minutes') {
                if (data.footer !== true && data.autoClose !== false) {
                    gj.timepicker.methods.setTime(picker, clock)();
                }
                gj.timepicker.events.select(picker.element, 'minute');
            }
        }
    },

    renderHours: function (picker, clock, data) {
        var dial, arrow, body = clock.querySelector('[role="body"]');

        clearTimeout(picker.timeout);
        body.innerHTML = '';
        dial = document.createElement('div');
        dial.setAttribute('role', 'dial');

        arrow = gj.core.createElement('<div role="arrow" style="display: none; transform: rotate(-90deg);" />');
        arrow.appendChild(gj.core.createElement('<div class="arrow-begin"></div>'));
        arrow.appendChild(gj.core.createElement('<div class="arrow-end"></div>'));
        dial.appendChild(arrow);

        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(54px, -93.5307px)">1</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(93.5307px, -54px)">2</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(108px, 0px)">3</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(93.5307px, 54px)">4</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(54px, 93.5307px)">5</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(6.61309e-15px, 108px)">6</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-54px, 93.5307px)">7</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-93.5307px, 54px)">8</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-108px, 1.32262e-14px)">9</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-93.5307px, -54px)">10</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-54px, -93.5307px)">11</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-1.98393e-14px, -108px)">12</span>'));
        if (data.mode === '24hr') {
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(38px, -65.8179px)">13</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(65.8179px, -38px)">14</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(76px, 0px)">15</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(65.8179px, 38px)">16</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(38px, 65.8179px)">17</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(4.65366e-15px, 76px)">18</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-38px, 65.8179px)">19</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-65.8179px, 38px)">20</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-76px, 9.30732e-15px)">21</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-65.8179px, -38px)">22</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-38px, -65.8179px)">23</span>'));
            dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-1.3961e-14px, -76px)">00</span>'));
        }
        body.appendChild(dial);

        if (data.header) {
            clock.querySelector('[role="header"] [role="hour"]').classList.add('selected');
            clock.querySelector('[role="header"] [role="minute"]').classList.remove('selected');
        }

        data.dialMode = 'hours';

        gj.timepicker.methods.update(picker, clock, data);
    },

    renderMinutes: function (picker, clock, data) {
        var arrow, body = clock.querySelector('[role="body"]');

        clearTimeout(picker.timeout);
        body.innerHTML = '';
        dial = document.createElement('div');
        dial.setAttribute('role', 'dial');

        arrow = document.createElement('div');
        arrow.setAttribute('role', 'arrow');
        arrow.style.display = 'none';
        arrow.style.transform = 'rotate(-90deg)';
        arrow.appendChild(gj.core.createElement('<div class="arrow-begin"></div>'));
        arrow.appendChild(gj.core.createElement('<div class="arrow-end"></div>'));
        dial.appendChild(arrow);

        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(54px, -93.5307px)">5</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(93.5307px, -54px)">10</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(108px, 0px)">15</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(93.5307px, 54px)">20</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(54px, 93.5307px)">25</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(6.61309e-15px, 108px)">30</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-54px, 93.5307px)">35</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-93.5307px, 54px)">40</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-108px, 1.32262e-14px)">45</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-93.5307px, -54px)">50</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-54px, -93.5307px)">55</span>'));
        dial.appendChild(gj.core.createElement('<span role="hour" style="transform: translate(-1.98393e-14px, -108px)">00</span>'));
        body.appendChild(dial);

        if (data.header) {
            clock.querySelector('[role="header"] [role="hour"]').classList.remove('selected');
            clock.querySelector('[role="header"] [role="minute"]').classList.add('selected');
        }
        
        data.dialMode = 'minutes';

        gj.timepicker.methods.update(picker, clock, data);
    },

    open: function (picker) {
        var time, hour, data = gijgoStorage.get(picker.element, 'gijgo'),
            clock = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');

        if (picker.value()) {
            time = gj.core.parseDate(picker.value(), data.format, data.locale);
        } else {
            time = new Date();
        }
        hour = time.getHours();
        if (data.mode === 'ampm') {
            clock.setAttribute('mode', hour > 12 ? 'pm' : 'am');
        }
        clock.setAttribute('hour', hour);
        clock.setAttribute('minute', time.getMinutes());

        gj.timepicker.methods.renderHours(picker, clock, data);

        gj.picker.widget.prototype.open.call(picker, 'timepicker');
        return picker;
    },

    value: function (picker, value) {
        var clock, time, data = gijgoStorage.get(picker.element, 'gijgo');
        if (typeof (value) === "undefined") {
            return picker.element.value;
        } else {
            picker.element.value = value;
            gj.timepicker.events.change(picker.element);
            return picker;
        }
    }
};

gj.timepicker.events = {
    /**
     * Triggered when the timepicker value is changed.
     *     */    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Triggered when new value is selected inside the picker.
     *     */    select: function (el, type) {
        return el.dispatchEvent(new CustomEvent('select', { 'type': type }));
    },

    /**
     * Event fires when the timepicker is opened.     */    open: function (el) {
        return el.dispatchEvent(new Event('open'));
    },

    /**
     * Event fires when the timepicker is closed.     */    close: function (el) {
        return el.dispatchEvent(new Event('close'));
    }
};

GijgoTimePicker = function (element, jsConfig) {
    var self = this,
        methods = gj.timepicker.methods;

    self.element = element;

    self.mouseMove = false;

    /** Gets or sets the value of the timepicker.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove timepicker functionality from the element.     */    self.destroy = function () {
        return gj.picker.widget.prototype.destroy.call(this, 'timepicker');
    };

    /** Open the clock.     */    self.open = function () {
        return gj.timepicker.methods.open(this);
    };

    /** Close the clock.     */    self.close = function () {
        return gj.picker.widget.prototype.close.call(this, 'timepicker');
    };

    //$.extend($element, self);
    if ('true' !== element.getAttribute('data-timepicker')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoTimePicker.prototype = new gj.picker.widget();
GijgoTimePicker.constructor = GijgoTimePicker;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.timepicker = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoTimePicker(this[0], method);
                } else {
                    $widget = new GijgoTimePicker(this[0], null);
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

