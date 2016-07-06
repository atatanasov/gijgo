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

        gj.widget.prototype.init.call(this, jsConfig, 'draggable');

        $clickEl = gj.draggable.methods.getClickElement($dragEl);

        $clickEl.on('mousedown', function (e) {
            $dragEl.isDragging = true;
            $dragEl.prevX = undefined;
            $dragEl.prevY = undefined;
            if ($dragEl.css('position') !== 'aboslute') {
                $dragEl.css('position', 'absolute');
            }
            gj.documentManager.subscribeForEvent('mousemove', $dragEl.data('guid'), gj.draggable.methods.createMouseMoveHandler($dragEl));
        });

        gj.documentManager.subscribeForEvent('mouseup', $dragEl.data('guid'), gj.draggable.methods.createMouseUpHandler($dragEl));

        return $dragEl;
    },

    getClickElement: function ($dragEl) {
        var $clickEl, $handle = $dragEl.data('handle')
        if ($handle && $handle.length) {
            $clickEl = $handle;
        } else {
            $clickEl = $dragEl;
        }
        return $clickEl;
    },

    createMouseUpHandler: function ($dragEl) {
        return function (e) {
            if ($dragEl.isDragging) {
                $dragEl.isDragging = false;
                gj.documentManager.unsubscribeForEvent('mousemove', $dragEl.data('guid'));
                gj.draggable.events.stop($dragEl, e);
            }
        }
    },

    createMouseMoveHandler: function ($dragEl) {
        return function (e) {
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
        if (e) {
            if (e.pageX) {
                return e.pageX;
            } else if (e.clientX) {
                return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            }
        }
        return null;
    },

    mouseY: function (e) {
        if (e) {
            if (e.pageY) {
                return e.pageY;
            } else if (e.clientY) {
                return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            }
        }
        return null;
    },

    destroy: function ($dragEl) {
        if ($dragEl.attr('data-type') === 'draggable') {
            gj.documentManager.unsubscribeForEvent('mouseup', $dragEl.data('guid'));
            $dragEl.removeData();
            $dragEl.removeAttr('data-guid');
            $dragEl.removeAttr('data-type');
            $dragEl.off('drag').off('start').off('stop');
            gj.draggable.methods.getClickElement($dragEl).off('mousedown');
        }
        return $dragEl;
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
    stop: function ($dragEl, mouseEvent) { //TODO: change mouseEvent to mousePosition and add it to the docs.
        $dragEl.trigger('stop', [mouseEvent]);
    }
};


gj.draggable.widget = function ($element, arguments) {
    var self = this,
        methods = gj.draggable.methods;

    self.isDragging = false;
    self.prevX = undefined;
    self.prevY = undefined;

    /** Removes the draggable functionality. */
    self.destroy = function () {
        return methods.destroy(this);
    }

    $.extend($element, self);
    if ('draggable' !== $element.attr('data-type')) {
        methods.init.apply($element, arguments);
    }

    return $element;
};

gj.draggable.widget.prototype = new gj.widget();
gj.draggable.widget.constructor = gj.draggable.widget;

(function ($) {
    $.fn.draggable = function (method) {
        var $draggable;
        if (typeof method === 'object' || !method) {
            return new gj.draggable.widget(this, arguments);
        } else {
            $draggable = new gj.draggable.widget(this, null);
            if ($draggable[method]) {
                return $draggable[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                throw 'Method ' + method + ' does not exist.';
            }
        }
    };
})(jQuery);
