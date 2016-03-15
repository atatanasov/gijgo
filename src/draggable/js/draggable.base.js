/* global window alert jQuery */
/*
 * Gijgo JavaScript Library v0.6.2
 * http://gijgo.com/
 *
 * Copyright 2014, 2016 gijgo.com
 * Released under the MIT license
 */
/** 
  * @widget Draggable 
  * @plugin Base
  */
if (typeof (gj) === 'undefined') {
    gj = {};
}
if (typeof (gj.draggable) === 'undefined') {
    gj.draggable = {};
}

gj.draggable.config = {
    /** If specified, restricts dragging from starting unless the mousedown occurs on the specified element.
     * Only elements that descend from the draggable element are permitted.
     * @type jquery element
     * @default undefined
     * @example sample <!-- draggable.base -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; }
     * .handle { background-color: #DDD; cursor: move; width: 200px; margin: 5px auto 0px auto; text-align: center; padding: 5px; }
     * </style>
     * <div id="element" class="element">
     *   <div id="handle" class="handle">Handle for dragging</div>
     * </div>
     * <script>
     *     $('#element').draggable({
     *         handle: $('#handle')
     *     });
     * </script>
     */
    handle: undefined
};

gj.draggable.methods = {
    init: function (jsConfig) {
        var $clickEl, $dragEl = this;
        if (!jsConfig) {
            jsConfig = {};
        }
        if (jsConfig.handle && jsConfig.handle.length) {
            $clickEl = jsConfig.handle;
        } else {
            $clickEl = $dragEl;
        }

        //Initialize events configured as options
        for (option in jsConfig) {
            if (gj.draggable.events.hasOwnProperty(option)) {
                $dragEl.on(option, jsConfig[option]);
                delete jsConfig[option];
            }
        }

        $dragEl.css('position', 'absolute');
        if ($dragEl.css('top')) {
            $dragEl.css('top', '0px');
        }
        if ($dragEl.css('left')) {
            $dragEl.css('left', '0px');
        }

        $clickEl.on('mousedown', function (e) {
            $dragEl.isDragging = true;
            $dragEl.prevX = undefined;
            $dragEl.prevY = undefined;
            $(document).on('mousemove', function (e) {
                gj.draggable.methods.mouseMove($dragEl, e);
            });
        });
        $(document).on('mouseup', function (e) {
            if ($dragEl.isDragging) {
                $dragEl.isDragging = false;
                gj.draggable.events.stop($dragEl);
                $(document).off('mousemove');
            }
        });

        return $dragEl;
    },

    mouseMove: function ($dragEl, e) {
        var t, x, y, offsetX, offsetY;
        if ($dragEl.isDragging) {
            x = gj.draggable.methods.mouseX(e);
            y = gj.draggable.methods.mouseY(e);
            if ($dragEl.prevX && $dragEl.prevY) {
                t = $dragEl.get(0);
                offsetX = x - $dragEl.prevX;
                offsetY = y - $dragEl.prevY;
                gj.draggable.methods.move(t, offsetX, offsetY);
                gj.draggable.events.drag($dragEl, offsetX, offsetY);
            } else {
                gj.draggable.events.start($dragEl);
            }
            $dragEl.prevX = x;
            $dragEl.prevY = y;
        }
    },

    move: function (t, offsetX, offsetY) {
        t.style.left = (parseInt(t.style.left) + offsetX) + 'px';
        t.style.top = (parseInt(t.style.top) + offsetY) + 'px';
    },

    mouseX: function (e) {
        if (e.pageX) {
            return e.pageX;
        } else if (e.clientX) {
            return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        }
        return null;
    },

    mouseY: function (e) {
        if (e.pageY) {
            return e.pageY;
        } else if (e.clientY) {
            return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        }
        return null;
    }
};

gj.draggable.events = {
    /**
     * Triggered while the mouse is moved during the dragging.
     *
     * @event drag
     * @param {object} e - event data
     * @param {object} offset - Current offset position as { top, left } object.
     * @example sample <!-- draggable.base -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element">
     *   drag me
     * </div>
     * <script>
     *     $('#element').draggable({
     *         drag: function (e, offset) {
     *             $('body').append('<div>The drag event is fired. offset { top:' + offset.top + ', left: ' + offset.left + '}.</div>');
     *         }
     *     });
     * </script>
     */
    drag: function ($dragEl, offsetX, offsetY) {
        $dragEl.trigger('drag', [{ top: offsetY, left: offsetX }]);
    },

    /**
     * Triggered when dragging starts.
     *
     * @event start
     * @param {object} e - event data
     * @example sample <!-- draggable.base -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element">
     *   drag me
     * </div>
     * <script>
     *     $('#element').draggable({
     *         start: function (e, offset) {
     *             $('body').append('<div>The start event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    start: function ($dragEl) {
        $dragEl.trigger('start');
    },

    /**
     * Triggered when dragging stops.
     *
     * @event stop
     * @param {object} e - event data
     * @example sample <!-- draggable.base -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element">
     *   drag me
     * </div>
     * <script>
     *     $('#element').draggable({
     *         stop: function (e, offset) {
     *             $('body').append('<div>The stop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    stop: function ($dragEl) {
        $dragEl.trigger('stop');
    }
};


function Draggable($dragEl, arguments) {
    var self = this,
        methods = gj.draggable.methods;

    self.isDragging = false;
    self.prevX = undefined;
    self.prevY = undefined;

    $.extend($dragEl, self);
    methods.init.apply($dragEl, arguments);

    return $dragEl;
};

(function ($) {
    $.fn.draggable = function (method) {
        if (typeof method === 'object' || !method) {
            return new Draggable(this, arguments);
        } else if (gj.draggable.methods[method]) {
            return gj.draggable.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            throw 'Method ' + method + ' does not exist.';
        }
    };
})(jQuery);