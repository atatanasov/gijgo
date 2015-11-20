/* global window alert jQuery */
/*
 * Gijgo JavaScript Library v0.6.0
 * http://gijgo.com/
 *
 * Copyright 2014, 2015 gijgo.com
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

gj.draggable.configuration = {
    base: {
        /** If specified, restricts dragging from starting unless the mousedown occurs on the specified element.
          * Only elements that descend from the draggable element are permitted.
          * @type jquery element
          */
        handle: undefined,
        style: {}
    }
};

gj.draggable.public = {

    isDragging: false,
    prevX: undefined,
    prevY: undefined,

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

        $clickEl.on('mousedown', function (e) {
            $dragEl.isDragging = true;
            $dragEl.prevX = undefined;
            $dragEl.prevY = undefined;
            $(document).on('mousemove', function (e) {
                gj.draggable.private.mouseMove($dragEl, e);
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
    }
};

gj.draggable.private = {
    mouseMove: function ($dragEl, e) {
        var t, x, y, offsetX, offsetY;
        if ($dragEl.isDragging) {
            x = gj.draggable.private.mouseX(e);
            y = gj.draggable.private.mouseY(e);
            if ($dragEl.prevX && $dragEl.prevY) {
                t = $dragEl.get(0);
                offsetX = x - $dragEl.prevX;
                offsetY = y - $dragEl.prevY;
                gj.draggable.private.move(t, offsetX, offsetY);
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

    drag: function ($dragEl, offsetX, offsetY) {
        /**
         * Triggered while the mouse is moved during the dragging.
         *
         * @event drag
         * @param {object} e - event data
         * @param {object} offset - Current offset position as { top, left } object.
         */
        $dragEl.trigger('drag', [{ top: offsetY, left: offsetX }]);
    },

    start: function ($dragEl) {
        /**
         * Triggered when dragging starts.
         *
         * @event start
         * @param {object} e - event data
         */
        $dragEl.trigger('start');
    },

    stop: function ($dragEl) {
        /**
         * Triggered when dragging stops.
         *
         * @event stop
         * @param {object} e - event data
         */
        $dragEl.trigger('stop');
    }
};

(function ($) {
    $.fn.draggable = function (method) {
        if (typeof method === 'object' || !method) {
            function Draggable() {
                var self = this;
                $.extend(self, gj.draggable.public);
            };
            var draggable = new Draggable();
            $.extend(this, draggable);
            return gj.draggable.public.init.apply(this, arguments);
        } else if (gj.draggable.public[method]) {
            return gj.draggable.public[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            throw 'Method ' + method + ' does not exist.';
        }
    };
})(jQuery);