/*
 * Gijgo Draggable v1.9.4
 * http://gijgo.com/draggable
 *
 * Copyright 2014, 2018 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery */
/**  */gj.draggable = {
    plugins: {}
};

gj.draggable.config = {
    base: {
        /** If specified, restricts dragging from starting unless the mousedown occurs on the specified element.
         * Only elements that descend from the draggable element are permitted.         */        handle: undefined,

        /** If set to false, restricts dragging on vertical direction.         */        vertical: true,

        /** If set to false, restricts dragging on horizontal direction.         */        horizontal: true,

        /** Constrains dragging to within the bounds of the specified element.         */        containment: undefined
    }
};

gj.draggable.methods = {
    init: function (jsConfig) {
        var $handleEl, data, $dragEl = this;

        gj.widget.prototype.init.call(this, jsConfig, 'draggable');
        data = this.data();
        $dragEl.attr('data-draggable', 'true');

        $handleEl = gj.draggable.methods.getHandleElement($dragEl);

        $handleEl.on('touchstart mousedown', function (e) {
            var position = gj.core.position($dragEl[0]);
            $dragEl[0].style.top = position.top + 'px';
            $dragEl[0].style.left = position.left + 'px';
            $dragEl[0].style.position = 'fixed';

            $dragEl.attr('draggable-dragging', true);
            $dragEl.removeAttr('draggable-x').removeAttr('draggable-y');
            gj.documentManager.subscribeForEvent('touchmove', $dragEl.data('guid'), gj.draggable.methods.createMoveHandler($dragEl, data));
            gj.documentManager.subscribeForEvent('mousemove', $dragEl.data('guid'), gj.draggable.methods.createMoveHandler($dragEl, data));
        });

        gj.documentManager.subscribeForEvent('mouseup', $dragEl.data('guid'), gj.draggable.methods.createUpHandler($dragEl));
        gj.documentManager.subscribeForEvent('touchend', $dragEl.data('guid'), gj.draggable.methods.createUpHandler($dragEl));
        gj.documentManager.subscribeForEvent('touchcancel', $dragEl.data('guid'), gj.draggable.methods.createUpHandler($dragEl));

        return $dragEl;
    },

    getHandleElement: function ($dragEl) {
        var $handle = $dragEl.data('handle');
        return ($handle && $handle.length) ? $handle : $dragEl;
    },

    createUpHandler: function ($dragEl) {
        return function (e) {
            if ($dragEl.attr('draggable-dragging') === 'true') {
                $dragEl.attr('draggable-dragging', false);
                gj.documentManager.unsubscribeForEvent('mousemove', $dragEl.data('guid'));
                gj.documentManager.unsubscribeForEvent('touchmove', $dragEl.data('guid'));
                gj.draggable.events.stop($dragEl, { left: $dragEl.mouseX(e), top: $dragEl.mouseY(e) });
            }
        };
    },

    createMoveHandler: function ($dragEl, data) {
        return function (e) {
            var x, y, offsetX, offsetY, prevX, prevY;
            if ($dragEl.attr('draggable-dragging') === 'true') {
                x = Math.round($dragEl.mouseX(e));
                y = Math.round($dragEl.mouseY(e));
                prevX = $dragEl.attr('draggable-x');
                prevY = $dragEl.attr('draggable-y');
                if (prevX && prevY) {
                    offsetX = data.horizontal ? x - parseInt(prevX, 10) : 0;
                    offsetY = data.vertical ? y - parseInt(prevY, 10) : 0;
                    if (false !== gj.draggable.events.drag($dragEl, offsetX, offsetY, x, y)) {
                        gj.draggable.methods.move($dragEl[0], data, offsetX, offsetY);
                    }
                } else {
                    gj.draggable.events.start($dragEl, x, y);
                }
                $dragEl.attr('draggable-x', x);
                $dragEl.attr('draggable-y', y);
            }
        }
    },

    move: function (dragEl, data, offsetX, offsetY) {
        var contPosition, maxTop, maxLeft,
            position = gj.core.position(dragEl),
            top = position.top + offsetY,
            left = position.left + offsetX;

        if (data.containment) {
            contPosition = gj.core.position(data.containment);
            maxTop = contPosition.top + gj.core.height(data.containment) - gj.core.height(dragEl);
            maxLeft = contPosition.left + gj.core.width(data.containment) - gj.core.width(dragEl);
            if (top > contPosition.top && top < maxTop) {
                dragEl.style.top = top + 'px';
            } else {
                if (top <= contPosition.top) {
                    dragEl.style.top = (contPosition.top + 1) + 'px';
                } else {
                    dragEl.style.top = (maxTop - 1) + 'px';
                }
            }
            if (left > contPosition.left && left < maxLeft) {
                dragEl.style.left = left + 'px';
            } else {
                if (left <= contPosition.left) {
                    dragEl.style.left = (contPosition.left + 1) + 'px';
                } else {
                    dragEl.style.left = (maxLeft - 1) + 'px';
                }
            }
        } else {
            dragEl.style.top = top + 'px';
            dragEl.style.left = left + 'px';
        }
    },

    destroy: function ($dragEl) {
        if ($dragEl.attr('data-draggable') === 'true') {
            gj.documentManager.unsubscribeForEvent('mouseup', $dragEl.data('guid'));
            $dragEl.removeData();
            $dragEl.removeAttr('data-guid');
            $dragEl.removeAttr('data-draggable');
            $dragEl.off('drag').off('start').off('stop');
            gj.draggable.methods.getHandleElement($dragEl).off('mousedown');
        }
        return $dragEl;
    }
};

gj.draggable.events = {
    /**
     * Triggered while the mouse is moved during the dragging, immediately before the current move happens.
     *     */    drag: function ($dragEl, offsetX, offsetY, mouseX, mouseY) {
        return $dragEl.triggerHandler('drag', [{ top: offsetY, left: offsetX }, { top: mouseY, left: mouseX }]);
    },

    /**
     * Triggered when dragging starts.
     *     */    start: function ($dragEl, mouseX, mouseY) {
        $dragEl.triggerHandler('start', [{ top: mouseY, left: mouseX }]);
    },

    /**
     * Triggered when dragging stops.
     *     */    stop: function ($dragEl, mousePosition) {
        $dragEl.triggerHandler('stop', [mousePosition]);
    }
};

gj.draggable.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.draggable.methods;

    if (!$element.destroy) {
        /** Remove draggable functionality from the element.         */        self.destroy = function () {
            return methods.destroy(this);
        };
    }

    $.extend($element, self);
    if ('true' !== $element.attr('data-draggable')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.draggable.widget.prototype = new gj.widget();
gj.draggable.widget.constructor = gj.draggable.widget;

(function ($) {
    $.fn.draggable = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.draggable.widget(this, method);
            } else {
                $widget = new gj.draggable.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
