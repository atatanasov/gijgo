/* global window alert jQuery */
/*
 * Gijgo JavaScript Library v1.0.0
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
    base: {
        /** If specified, restricts dragging from starting unless the mousedown occurs on the specified element.
         * Only elements that descend from the draggable element are permitted. */
        handle: undefined,

        /** If set to false, restricts dragging on vertical direction. */
        vertical: true,

        /** If set to false, restricts dragging on horizontal direction. */
        horizontal: true
    }
};

gj.draggable.methods = {
    init: function (jsConfig) {
        var $handleEl, $dragEl = this;

        gj.widget.prototype.init.call(this, jsConfig, 'draggable');

        $handleEl = gj.draggable.methods.getHandleElement($dragEl);

        $handleEl.on('mousedown', function (e) {
            $dragEl.attr('data-draggable-dragging', true);
            $dragEl.removeAttr('data-draggable-x');
            $dragEl.removeAttr('data-draggable-y');
            if ($dragEl.css('position') !== 'aboslute') {
                $dragEl.css('position', 'absolute');
            }
            gj.documentManager.subscribeForEvent('mousemove', $dragEl.data('guid'), gj.draggable.methods.createMouseMoveHandler($dragEl));
        });

        gj.documentManager.subscribeForEvent('mouseup', $dragEl.data('guid'), gj.draggable.methods.createMouseUpHandler($dragEl));

        return $dragEl;
    },

    getHandleElement: function ($dragEl) {
        var $handle = $dragEl.data('handle');
        return ($handle && $handle.length) ? $handle : $dragEl;
    },

    createMouseUpHandler: function ($dragEl) {
        return function () {
            if ($dragEl.attr('data-draggable-dragging') === 'true') {
                $dragEl.attr('data-draggable-dragging', false);
                gj.documentManager.unsubscribeForEvent('mousemove', $dragEl.data('guid'));
                gj.draggable.events.stop($dragEl);
            }
        };
    },

    createMouseMoveHandler: function ($dragEl) {
        return function (e) {
            var x, y, offsetX, offsetY, prevX, prevY;
            if ($dragEl.attr('data-draggable-dragging') === 'true') {
                x = gj.draggable.methods.mouseX(e);
                y = gj.draggable.methods.mouseY(e);
                prevX = $dragEl.attr('data-draggable-x');
                prevY = $dragEl.attr('data-draggable-y');
                if (prevX && prevY) {                
                    offsetX = $dragEl.data('horizontal') ? x - parseInt(prevX, 10) : 0;
                    offsetY = $dragEl.data('vertical') ? y - parseInt(prevY, 10) : 0;
                    if (false !== gj.draggable.events.drag($dragEl, offsetX, offsetY)) {
                        gj.draggable.methods.move($dragEl, offsetX, offsetY);
                    }
                } else {
                    gj.draggable.events.start($dragEl);
                }
                $dragEl.attr('data-draggable-x', x);
                $dragEl.attr('data-draggable-y', y);
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
        if ($dragEl.attr('data-draggable') === 'true') {
            gj.documentManager.unsubscribeForEvent('mouseup', $dragEl.data('guid'));
            $dragEl.removeData();
            $dragEl.removeAttr('data-guid');
            $dragEl.removeAttr('data-draggable');
            $dragEl.off('drag').off('start').off('stop');
            gj.draggable.methods.getClickElement($dragEl).off('mousedown');
        }
        return $dragEl;
    }
};

gj.draggable.events = {
    /**
     * Triggered while the mouse is moved during the dragging, immediately before the current move happens.
     * */
    drag: function ($dragEl, offsetX, offsetY) {
        return $dragEl.triggerHandler('drag', [{ top: offsetY, left: offsetX }]);
    },

    /**
     * Triggered when dragging starts.
     * */
    start: function ($dragEl) {
        $dragEl.triggerHandler('start');
    },

    /**
     * Triggered when dragging stops.
     * */
    stop: function ($dragEl) {
        $dragEl.triggerHandler('stop');
    }
};


gj.draggable.widget = function ($element, arguments) {
    var self = this,
        methods = gj.draggable.methods;

    /** Remove draggable functionality from the element. */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-draggable')) {
        methods.init.apply($element, arguments);
    }

    return $element;
};

gj.draggable.widget.prototype = new gj.widget();
gj.draggable.widget.constructor = gj.draggable.widget;

(function ($) {
    $.fn.draggable = function (method) {
        var $widget;
        if (typeof method === 'object' || !method) {
            return new gj.draggable.widget(this, arguments);
        } else {
            $widget = new gj.draggable.widget(this, null);
            if ($widget[method]) {
                return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                throw 'Method ' + method + ' does not exist.';
            }
        }
    };
})(jQuery);
