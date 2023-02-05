/*
 * Gijgo Droppable v2.0.0-alpha-1
 * http://gijgo.com/droppable
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery */
/**  */gj.droppable = {
    plugins: {}
};

gj.droppable.config = {
    /** If specified, the class will be added to the droppable while draggable is being hovered over the droppable.     */    hoverClass: undefined
};

gj.droppable.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);
        this.element.setAttribute('data-gj-droppable', 'true');
        
        gj.documentManager.subscribeForEvent('mousedown', 'droppable' + this.element.getAttribute('data-gj-guid'), gj.droppable.methods.createMouseDownHandler(this));
        gj.documentManager.subscribeForEvent('mousemove', 'droppable' + this.element.getAttribute('data-gj-guid'), gj.droppable.methods.createMouseMoveHandler(this));
        gj.documentManager.subscribeForEvent('mouseup', 'droppable' + this.element.getAttribute('data-gj-guid'), gj.droppable.methods.createMouseUpHandler(this));
        
        return this;
    },

    createMouseDownHandler: function (dropEl) {
        return function (e) {
            dropEl.isDragging = true;
        }
    },

    createMouseMoveHandler: function (droppable) {
        return function (e) {
            if (droppable.isDragging) {
                let hoverClass = droppable.getConfig().hoverClass,
                    mousePosition = { x: droppable.mouseX(e), y: droppable.mouseY(e) },
                    newIsOver = gj.droppable.methods.isOver(droppable, mousePosition);
                if (newIsOver != droppable.isOver) {
                    if (newIsOver) {
                        if (hoverClass) {
                            droppable.element.classList.add(hoverClass);
                        }
                        gj.droppable.events.over(droppable.element, mousePosition);
                    } else {
                        if (hoverClass) {
                            droppable.element.classList.remove(hoverClass);
                        }
                        gj.droppable.events.out(droppable.element);
                    }
                }
                droppable.isOver = newIsOver;
            }
        }
    },

    createMouseUpHandler: function (droppable) {
        return function (e) {
            let mousePosition = {
                x: droppable.mouseX(e),
                y: droppable.mouseY(e)
            };
            droppable.isDragging = false;
            if (gj.droppable.methods.isOver(droppable, mousePosition)) {
                gj.droppable.events.drop(droppable.element);
            }
        }
    },

    isOver: function (droppable, mousePosition) {
        let result, elementPosition = gj.core.position(droppable.element);
        result = mousePosition.x > elementPosition.left && mousePosition.x < elementPosition.right
              && mousePosition.y > elementPosition.top && mousePosition.y < elementPosition.bottom;
        return result;
    },

    destroy: function (droppable) {
        let el = droppable.element;
        if (el.getAttribute('data-gj-droppable') === 'true') {
            gj.documentManager.unsubscribeForEvent('mousedown', 'droppable' + el.getAttribute('data-gj-guid'));
            gj.documentManager.unsubscribeForEvent('mousemove', 'droppable' + el.getAttribute('data-gj-guid'));
            gj.documentManager.unsubscribeForEvent('mouseup', 'droppable' + el.getAttribute('data-gj-guid'));
            droppable.removeConfig();
            el.removeAttribute('data-gj-guid');
            el.removeAttribute('data-gj-droppable');
        }
        return droppable;
    }
};

gj.droppable.events = {
    /** Triggered when a draggable element is dropped.     */    drop: function (el, offsetX, offsetY) {
        return el.dispatchEvent(new CustomEvent('drop', { detail: { 'top': offsetY, 'left': offsetX } }));
    },

    /** Triggered when a draggable element is dragged over the droppable.     */    over: function (el, mousePosition) {
        return el.dispatchEvent(new CustomEvent('over', { detail: { 'mousePosition': mousePosition } }));
    },

    /** Triggered when a draggable element is dragged out of the droppable.     */    out: function (el) {
        return el.dispatchEvent(new Event('out'));
    }
};

GijgoDroppable = function (element, jsConfig) {
    let self = this,
        methods = gj.droppable.methods;
    
    self.type = 'droppable';
    self.element = element;
    self.isOver = false;
    self.isDragging = false;

    /** Removes the droppable functionality.     */    self.destroy = function () {
        return methods.destroy(this);
    }

    self.isOver = function (mousePosition) {
        return methods.isOver(this, mousePosition);
    }

    if ('true' !== element.getAttribute('data-gj-droppable')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDroppable.prototype = new gj.widget();
GijgoDroppable.constructor = GijgoDroppable;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.droppable = function (method) {
            let $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDroppable(this, method);
                } else {
                    $widget = new GijgoDroppable(this, null);
                    if ($widget[method]) {
                        return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}
