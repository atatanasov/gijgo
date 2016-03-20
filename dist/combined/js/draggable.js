/* global window alert jQuery */
/*
 * Gijgo JavaScript Library v0.7.0
 * http://gijgo.com/
 *
 * Copyright 2014, 2016 gijgo.com
 * Released under the MIT license
 */
/**  */
if (typeof (gj) === 'undefined') {
    gj = {};
}
if (typeof (gj.draggable) === 'undefined') {
    gj.draggable = {};
}

gj.draggable.config = {
    /** If specified, restricts dragging from starting unless the mousedown occurs on the specified element.
     * Only elements that descend from the draggable element are permitted. */
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

        $clickEl.on('mousedown', function (e) {
            $dragEl.isDragging = true;
            $dragEl.prevX = undefined;
            $dragEl.prevY = undefined;
            if ($dragEl.css('position') !== 'aboslute') {
                $dragEl.css('position', 'absolute');
            }
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
        var x, y, offsetX, offsetY;
        if ($dragEl.isDragging) {
            x = gj.draggable.methods.mouseX(e);
            y = gj.draggable.methods.mouseY(e);
            if ($dragEl.prevX && $dragEl.prevY) {                
                offsetX = x - $dragEl.prevX;
                offsetY = y - $dragEl.prevY;
                gj.draggable.methods.move($dragEl, offsetX, offsetY);
                gj.draggable.events.drag($dragEl, offsetX, offsetY);
            } else {
                gj.draggable.events.start($dragEl);
            }
            $dragEl.prevX = x;
            $dragEl.prevY = y;
        }
    },

    move: function ($dragEl, offsetX, offsetY) {
        var target = $dragEl.get(0),
            top = target.style.top ? parseInt(target.style.top) : $dragEl.position().top,
            left = target.style.left ? parseInt(target.style.left) : $dragEl.position().left;
        target.style.top = (top + offsetY) + 'px';
        target.style.left = (left + offsetX) + 'px';
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
     * */
    drag: function ($dragEl, offsetX, offsetY) {
        $dragEl.trigger('drag', [{ top: offsetY, left: offsetX }]);
    },

    /**
     * Triggered when dragging starts.
     * */
    start: function ($dragEl) {
        $dragEl.trigger('start');
    },

    /**
     * Triggered when dragging stops.
     * */
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
