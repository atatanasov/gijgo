/* global window alert jQuery gj */
/**
  * @widget Slider
  * @plugin Base
  */
gj.slider = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.slider.config = {
    base: {

        /** The minimum value of the Slider.
         * @type number
         * @default 0
         * @example JS.Config <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        min: 5,
         *        max: 15,
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        min: 0,

        /** The maximum value of the Slider.
         * @type number
         * @default 10
         * @example JS.Config <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        max: 20,
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        max: 100,

        /** The width of the slider.
         * @type number
         * @default undefined
         * @example JS.Config <!-- slider -->
         * <input id="slider" />
         * <script>
         *    $('#slider').slider({ width: 400 });
         * </script>
         * @example HTML.Config <!-- slider -->
         * <input id="slider" width="400" />
         * <script>
         *    $('#slider').slider();
         * </script>
         */
        width: undefined,

        /** The orientation of a Slider: "horizontal" or "vertical".
         * @type (horizontal|vertical)
         * @default horizontal
         */
        // TODO orientation

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        uiLibrary: 'materialdesign',
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        uiLibrary: 'bootstrap',
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, slider -->
         * <div class="container" />
         *     <input id="slider" width="300" />
         *     Value: <span id="value"></span>
         * </div>
         * <script>
         *    $('#slider').slider({
         *        uiLibrary: 'bootstrap4',
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial slider value.
         * @type number
         * @default undefined
         * @example Javascript <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        value: 30,
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         * @example HTML <!-- slider -->
         * <input id="slider" width="300" value="44" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        value: undefined,

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
        gj.widget.prototype.init.call(this, jsConfig, 'slider');
        this.attr('data-slider', 'true');
        gj.slider.methods.initialize(this, this.data());
        return this;
    },

    initialize: function ($slider, data) {
        var wrapper, track, handle, progress;

        $slider[0].style.display = 'none';

        if ($slider[0].parentElement.attributes.role !== 'wrapper') {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'wrapper');
            $slider[0].parentNode.insertBefore(wrapper, $slider[0]);
            wrapper.appendChild($slider[0]);
        } else {
            wrapper = $slider[0].parentElement;
        }

        if (data.width) {
            wrapper.style.width = data.width + 'px';
        }
        
        gj.core.addClasses(wrapper, data.style.wrapper);

        track = $slider[0].querySelector('[role="track"]');
        if (track == null) {
            track = document.createElement('div');
            track.setAttribute('role', 'track');
            wrapper.appendChild(track);
        }
        gj.core.addClasses(track, data.style.track);

        handle = $slider[0].querySelector('[role="handle"]');
        if (handle == null) {
            handle = document.createElement('div');
            handle.setAttribute('role', 'handle');
            wrapper.appendChild(handle);
        }

        progress = $slider[0].querySelector('[role="progress"]');
        if (progress == null) {
            progress = document.createElement('div');
            progress.setAttribute('role', 'progress');
            wrapper.appendChild(progress);
        }
        gj.core.addClasses(progress, data.style.progress);

        if (!data.value) {
            data.value = data.min;
        }
        gj.slider.methods.value($slider, data, data.value);
        
        gj.documentManager.subscribeForEvent('mouseup', $slider.data('guid'), gj.slider.methods.createMouseUpHandler($slider, handle, data));
        handle.addEventListener('mousedown', gj.slider.methods.createMouseDownHandler(handle, data));
        gj.documentManager.subscribeForEvent('mousemove', $slider.data('guid'), gj.slider.methods.createMouseMoveHandler($slider, track, handle, progress, data));

        handle.addEventListener('click', function (e) { e.stopPropagation(); });
        wrapper.addEventListener('click', gj.slider.methods.createClickHandler($slider, track, handle, data));
    },

    createClickHandler: function ($slider, track, handle, data) {
        return function (e) {
            var sliderPos, x, offset, stepSize, newValue;
            if (handle.getAttribute('drag') !== 'true') {
                sliderPos = gj.core.position($slider[0].parentElement);
                x = new gj.widget().mouseX(e) - sliderPos.left;
                offset = gj.core.width(handle) / 2;
                stepSize = gj.core.width(track) / (data.max - data.min);
                newValue = Math.round((x - offset) / stepSize) + data.min;
                gj.slider.methods.value($slider, data, newValue);
            }
        };
    },

    createMouseUpHandler: function ($slider, handle, data) {
        return function (e) {
            if (handle.getAttribute('drag') === 'true') {
                handle.setAttribute('drag', 'false');
                gj.slider.events.change($slider);
            }
        }
    },

    createMouseDownHandler: function (handle, data) {
        return function (e) {
            handle.setAttribute('drag', 'true');
        }
    },

    createMouseMoveHandler: function ($slider, track, handle, progress, data) {
        return function (e) {
            var sliderPos, x, trackWidth, offset, stepSize, valuePos, newValue;
            if (handle.getAttribute('drag') === 'true') {
                sliderPos = gj.core.position($slider[0].parentElement);
                x = new gj.widget().mouseX(e) - sliderPos.left;

                trackWidth = gj.core.width(track);
                offset = gj.core.width(handle) / 2;
                stepSize = trackWidth / (data.max - data.min);
                valuePos = (data.value - data.min) * stepSize;

                if (x >= offset && x <= (trackWidth + offset)) {
                    if (x > valuePos + (stepSize / 2) || x < valuePos - (stepSize / 2)) {
                        newValue = Math.round((x - offset) / stepSize) + data.min;
                        gj.slider.methods.value($slider, data, newValue);
                    }
                }
            }
        }
    },

    value: function ($slider, data, value) {
        var stepSize, track, handle, progress;
        if (typeof (value) === "undefined") {
            return $slider[0].value;
        } else {
            $slider[0].setAttribute('value', value);
            data.value = value;
            track = $slider.parent().children('[role="track"]')[0]
            stepSize = gj.core.width(track) / (data.max - data.min);
            handle = $slider.parent().children('[role="handle"]')[0];
            handle.style.left = ((value - data.min) * stepSize) + 'px';
            progress = $slider.parent().children('[role="progress"]')[0];
            progress.style.width = ((value - data.min) * stepSize) + 'px';
            gj.slider.events.slide($slider, value);
            return $slider;
        }
    },

    destroy: function ($slider) {
        var data = $slider.data(),
            $wrapper = $slider.parent();
        if (data) {
            $wrapper.children('[role="track"]').remove();
            $wrapper.children('[role="handle"]').remove();
            $wrapper.children('[role="progress"]').remove();
            $slider.unwrap();
            $slider.off();
            $slider.removeData();
            $slider.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-slider');
            $slider.removeClass();
            $slider.show();
        }
        return $slider;
    }
};

gj.slider.events = {
    /**
     * Fires when the slider value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- slider -->
     * <input id="slider" width="300" />
     * <script>
     *     var slider = $('#slider').slider({
     *         change: function (e) {
     *             alert('Change is fired. The new value is ' + slider.value());
     *         }
     *     });
     * </script>
     */
    change: function ($slider) {
        return $slider.triggerHandler('change');
    },

    /**
     * Fires when the user drags the drag handle to a new position.
     * @event slide
     * @param {object} e - event data
     * @param {object} value - The value of the slider.
     * @example sample <!-- slider -->
     * <input id="slider" width="300" />
     * Value: <span id="value"></span>
     * <script>
     *    $('#slider').slider({
     *        value: 30,
     *        slide: function (e, value) {
     *            document.getElementById('value').innerText = value;
     *        }
     *    });
     * </script>
     */
    slide: function ($slider, value) {
        return $slider.triggerHandler('slide', [value]);
    }
};

gj.slider.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.slider.methods;

    /** Gets or sets the value of the slider.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- slider -->
     * <button class="gj-button-md" onclick="alert($slider.value())">Get Value</button>
     * <hr/>
     * <input id="slider" width="300" />
     * <script>
     *     var $slider = $('#slider').slider();
     * </script>
     * @example Set <!-- slider -->
     * <button class="gj-button-md" onclick="$slider.value(77)">Set Value</button>
     * <hr/>
     * <input id="slider" width="300"  />
     * <script>
     *     var $slider = $('#slider').slider();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, this.data(), value);
    };

    /** Remove slider functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- slider -->
     * <button class="gj-button-md" onclick="slider.destroy()">Destroy</button>
     * <input id="slider" width="300" />
     * <script>
     *     var slider = $('#slider').slider();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-slider')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.slider.widget.prototype = new gj.widget();
gj.slider.widget.constructor = gj.slider.widget;

(function ($) {
    $.fn.slider = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.slider.widget(this, method);
            } else {
                $widget = new gj.slider.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);