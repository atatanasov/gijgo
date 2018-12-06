/*
 * Gijgo Draggable v1.9.10
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
        var handleEl, data, dragEl = this.element;

        gj.widget.prototype.initJS.call(this, jsConfig, 'draggable');
        data = gijgoStorage.get(dragEl, 'gijgo');
        dragEl.setAttribute('data-draggable', 'true');

        handleEl = gj.draggable.methods.getHandleElement(dragEl, data);

        handleEl.addEventListener('mousedown', gj.draggable.methods.createDownHandle(this, dragEl, data));
        handleEl.addEventListener('touchstart', gj.draggable.methods.createDownHandle(this, dragEl, data));

        gj.documentManager.subscribeForEvent('mouseup', data.guid, gj.draggable.methods.createUpHandler(this, dragEl, data));
        gj.documentManager.subscribeForEvent('touchend', data.guid, gj.draggable.methods.createUpHandler(this, dragEl, data));
        gj.documentManager.subscribeForEvent('touchcancel', data.guid, gj.draggable.methods.createUpHandler(this, dragEl, data));

        return this;
    },

    createDownHandle: function (widget, dragEl, data) {
        return function (e) {
            var position = gj.core.position(dragEl);
            dragEl.style.top = position.top + 'px';
            dragEl.style.left = position.left + 'px';
            dragEl.style.position = 'fixed';

            dragEl.setAttribute('draggable-dragging', true);
            dragEl.removeAttribute('draggable-x');
            dragEl.removeAttribute('draggable-y');
            gj.documentManager.subscribeForEvent('touchmove', data.guid, gj.draggable.methods.createMoveHandler(widget, dragEl, data));
            gj.documentManager.subscribeForEvent('mousemove', data.guid, gj.draggable.methods.createMoveHandler(widget, dragEl, data));
        }
    },

    getHandleElement: function (dragEl, data) {
        return data.handle ? data.handle : dragEl;
    },

    createUpHandler: function (widget, dragEl, data) {
        return function (e) {
            if (dragEl.getAttribute('draggable-dragging') === 'true') {
                dragEl.setAttribute('draggable-dragging', false);
                gj.documentManager.unsubscribeForEvent('mousemove', data.guid);
                gj.documentManager.unsubscribeForEvent('touchmove', data.guid);
                gj.draggable.events.stop(dragEl, { x: widget.mouseX(e), y: widget.mouseY(e) });
            }
        };
    },

    createMoveHandler: function (widget, dragEl, data) {
        return function (e) {
            var mouseX, mouseY, offsetX, offsetY, prevX, prevY;
            if (dragEl.getAttribute('draggable-dragging') === 'true') {
                mouseX = Math.round(widget.mouseX(e));
                mouseY = Math.round(widget.mouseY(e));
                prevX = dragEl.getAttribute('draggable-x');
                prevY = dragEl.getAttribute('draggable-y');
                if (prevX && prevY) {
                    offsetX = data.horizontal ? mouseX - parseInt(prevX, 10) : 0;
                    offsetY = data.vertical ? mouseY - parseInt(prevY, 10) : 0;
                    gj.draggable.methods.move(dragEl, data, offsetX, offsetY, mouseX, mouseY);
                } else {
                    gj.draggable.events.start(dragEl, mouseX, mouseY);
                }
                dragEl.setAttribute('draggable-x', mouseX);
                dragEl.setAttribute('draggable-y', mouseY);
            }
        }
    },

    move: function (dragEl, data, offsetX, offsetY, mouseX, mouseY) {
        var contPosition, maxTop, maxLeft,
            position = gj.core.position(dragEl),
            newTop = position.top + offsetY,
            newLeft = position.left + offsetX;

        if (data.containment) {
            contPosition = gj.core.position(data.containment);
            maxTop = contPosition.top + gj.core.height(data.containment) - gj.core.height(dragEl);
            maxLeft = contPosition.left + gj.core.width(data.containment) - gj.core.width(dragEl);
            if (newTop > contPosition.top && newTop < maxTop) {
                if (contPosition.top >= mouseY || contPosition.bottom <= mouseY) {
                    newTop = position.top;
                }
            } else {
                if (newTop <= contPosition.top) {
                    newTop = contPosition.top + 1;
                } else {
                    newTop = maxTop - 1;
                }
            }
            if (newLeft > contPosition.left && newLeft < maxLeft) {
                if (contPosition.left >= mouseX || contPosition.right <= mouseX) {
                    newLeft = position.left;
                }
            } else {
                if (newLeft <= contPosition.left) {
                    newLeft = contPosition.left + 1;
                } else {
                    newLeft = maxLeft - 1;
                }
            }
        }

        if (false !== gj.draggable.events.drag(dragEl, newLeft, newTop, mouseX, mouseY)) {
            dragEl.style.top = newTop + 'px';
            dragEl.style.left = newLeft + 'px';
        }
    },

    destroy: function (dragEl) {
        if (dragEl.getAttribute('data-draggable') === 'true') {
            gj.documentManager.unsubscribeForEvent('mouseup', data.guid);
            gijgoStorage.remove(dragEl, 'gijgo');
            dragEl.removeAttribute('data-guid');
            dragEl.removeAttribute('data-type');
            dragEl.removeAttribute('data-draggable');
            dragEl.removeAttribute('draggable-x');
            dragEl.removeAttribute('draggable-y');
            dragEl.removeAttribute('draggable-dragging');
            dragEl.style.top = '';
            dragEl.style.left = '';
            dragEl.style.position = '';
            dragEl.removeEventListener('drag');
            dragEl.removeEventListener('start');
            dragEl.removeEventListener('stop');
            var handle = gj.draggable.methods.getHandleElement(dragEl, data);
            handle.removeEventListener('mousedown');
            handle.removeEventListener('touchstart');
        }
        return dragEl;
    }
};

gj.draggable.events = {
    /**
     * Triggered while the mouse is moved during the dragging, immediately before the current move happens.
     *     */    drag: function (el, newLeft, newTop, mouseX, mouseY) {
        var event = new Event('drag');
        event.newPosition = { left: newLeft, top: newTop };
        event.mousePosition = { x: mouseX, y: mouseY };
        return el.dispatchEvent(event);
    },

    /**
     * Triggered when dragging starts.
     *     */    start: function (el, mouseX, mouseY) {
        return el.dispatchEvent(new CustomEvent('start', { x: mouseX, y: mouseY }));
    },

    /**
     * Triggered when dragging stops.
     *     */    stop: function (el, mousePosition) {
        return el.dispatchEvent(new CustomEvent('stop', mousePosition));
    }
};

GijgoDraggable = function (element, jsConfig) {
    var self = this,
        methods = gj.draggable.methods;

    self.element = element;
    
    /** Remove draggable functionality from the element.        */    self.destroy = function () {
        return methods.destroy(this);
    };

    //$.extend($element, self);
    if ('true' !== element.getAttribute('data-draggable')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDraggable.prototype = new gj.widget();
GijgoDraggable.constructor = GijgoDraggable;


if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.draggable = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDraggable(this[0], method);
                } else {
                    $widget = new GijgoDraggable(this[0], null);
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
