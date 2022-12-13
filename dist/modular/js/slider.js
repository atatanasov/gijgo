/*
 * Gijgo Slider v2.0.0-alpha-1
 * http://gijgo.com/slider
 *
 * Copyright 2014, 2018 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.slider = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.slider.config = {
    base: {

        /** The minimum value of the Slider.         */        min: 0,

        /** The maximum value of the Slider.         */        max: 100,

        /** The width of the slider.         */        width: undefined,

        /** The orientation of a Slider: "horizontal" or "vertical".         */        // TODO orientation

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The initial slider value.         */        value: undefined,

        icons: {},

        style: {
            wrapper: 'gj-slider gj-slider-md',
            progress: undefined,
            track: undefined
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-slider gj-slider-bootstrap gj-slider-bootstrap-3',
            progress: 'progress-bar',
            track: 'progress'
        }
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-slider gj-slider-bootstrap gj-slider-bootstrap-4',
            progress: 'progress-bar',
            track: 'progress'
        }
    }
};

gj.slider.methods = {
    init: function (jsConfig) {
        this.type = 'slider';
        gj.widget.prototype.initJS.call(this, jsConfig);
        this.element.setAttribute('data-slider', 'true');
        gj.slider.methods.initialize(this.element, gijgoStorage.get(this.element, this.type));
        return this;
    },

    initialize: function (el, data) {
        var wrapper, track, handle, progress;

        el.style.display = 'none';

        if (el.parentElement.attributes.role !== 'wrapper') {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'wrapper');
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
        } else {
            wrapper = el.parentElement;
        }

        if (data.width) {
            wrapper.style.width = data.width + 'px';
        }
        
        gj.core.addClasses(wrapper, data.style.wrapper);

        track = el.querySelector('[role="track"]');
        if (track == null) {
            track = document.createElement('div');
            track.setAttribute('role', 'track');
            wrapper.appendChild(track);
        }
        gj.core.addClasses(track, data.style.track);

        handle = el.querySelector('[role="handle"]');
        if (handle == null) {
            handle = document.createElement('div');
            handle.setAttribute('role', 'handle');
            wrapper.appendChild(handle);
        }

        progress = el.querySelector('[role="progress"]');
        if (progress == null) {
            progress = document.createElement('div');
            progress.setAttribute('role', 'progress');
            wrapper.appendChild(progress);
        }
        gj.core.addClasses(progress, data.style.progress);

        if (!data.value) {
            data.value = data.min;
        }
        gj.slider.methods.value(el, data, data.value);
        
        gj.documentManager.subscribeForEvent('mouseup', data.guid, gj.slider.methods.createMouseUpHandler(el, handle, data));
        handle.addEventListener('mousedown', gj.slider.methods.createMouseDownHandler(handle, data));
        gj.documentManager.subscribeForEvent('mousemove', data.guid, gj.slider.methods.createMouseMoveHandler(el, track, handle, progress, data));

        handle.addEventListener('click', function (e) { e.stopPropagation(); });
        wrapper.addEventListener('click', gj.slider.methods.createClickHandler(el, track, handle, data));
    },

    createClickHandler: function (el, track, handle, data) {
        return function (e) {
            var sliderPos, x, offset, stepSize, newValue;
            if (handle.getAttribute('drag') !== 'true') {
                sliderPos = gj.core.position(el.parentElement);
                x = new gj.widget().mouseX(e) - sliderPos.left;
                offset = gj.core.width(handle) / 2;
                stepSize = gj.core.width(track) / (data.max - data.min);
                newValue = Math.round((x - offset) / stepSize) + data.min;
                gj.slider.methods.value(el, data, newValue);
            }
        };
    },

    createMouseUpHandler: function (el, handle, data) {
        return function (e) {
            if (handle.getAttribute('drag') === 'true') {
                handle.setAttribute('drag', 'false');
                gj.slider.events.change(el);
            }
        }
    },

    createMouseDownHandler: function (handle, data) {
        return function (e) {
            handle.setAttribute('drag', 'true');
        }
    },

    createMouseMoveHandler: function (el, track, handle, progress, data) {
        return function (e) {
            var sliderPos, x, trackWidth, offset, stepSize, valuePos, newValue;
            if (handle.getAttribute('drag') === 'true') {
                sliderPos = gj.core.position(el.parentElement);
                x = new gj.widget().mouseX(e) - sliderPos.left;

                trackWidth = gj.core.width(track);
                offset = gj.core.width(handle) / 2;
                stepSize = trackWidth / (data.max - data.min);
                valuePos = (data.value - data.min) * stepSize;

                if (x >= offset && x <= (trackWidth + offset)) {
                    if (x > valuePos + (stepSize / 2) || x < valuePos - (stepSize / 2)) {
                        newValue = Math.round((x - offset) / stepSize) + data.min;
                        gj.slider.methods.value(el, data, newValue);
                    }
                }
            }
        }
    },

    value: function (el, data, value) {
        var stepSize, track, handle, progress;
        if (typeof (value) === "undefined") {
            return el.value;
        } else {
            el.setAttribute('value', value);
            data.value = value;
            track = el.parentElement.querySelector('[role="track"]')
            stepSize = gj.core.width(track) / (data.max - data.min);
            handle = el.parentElement.querySelector('[role="handle"]');
            handle.style.left = ((value - data.min) * stepSize) + 'px';
            progress = el.parentElement.querySelector('[role="progress"]');
            progress.style.width = ((value - data.min) * stepSize) + 'px';
            gj.slider.events.slide(el, value);
            return el;
        }
    },

    destroy: function (el) {
        var data = gijgoStorage.get(el, el.getAttribute('data-type')),
            wrapper = el.parentElement;
        if (data) {
            wrapper.removeChild(wrapper.querySelector('[role="track"]'));
            wrapper.removeChild(wrapper.querySelector('[role="handle"]'));
            wrapper.removeChild(wrapper.querySelector('[role="progress"]'));
            $(el).unwrap();
            $(el).off();
            gijgoStorage.remove(el, 'gijgo');
            el.removeAttribute('data-type');
            el.removeAttribute('data-guid')
            el.removeAttribute('data-slider');
            el.removeAttribute('class');
            el.style.display = 'block';
        }
        return $slider;
    }
};

gj.slider.events = {
    /**
     * Fires when the slider value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
     *     */    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Fires when the user drags the drag handle to a new position.     */    slide: function (el, value) {
        return el.dispatchEvent(new CustomEvent('slide', { 'value': value }));
    }
};

GijgoSlider = function (element, jsConfig) {
    var self = this,
        methods = gj.slider.methods;

    self.element = element;

    /** Gets or sets the value of the slider.     */    self.value = function (value) {
        return methods.value(this.element, gijgoStorage.get(this.element, this.type), value);
    };

    /** Remove slider functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this.element);
    };

    //$.extend(element, self);
    if ('true' !== element.getAttribute('data-slider')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoSlider.prototype = new gj.widget();
GijgoSlider.constructor = GijgoSlider;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.slider = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoSlider(this[0], method);
                } else {
                    $widget = new GijgoSlider(this[0], null);
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
