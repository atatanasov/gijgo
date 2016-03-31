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
if (typeof (gj.droppable) === 'undefined') {
    gj.droppable = {};
}

gj.droppable.config = {
    /** If specified, the class will be added to the droppable while draggable is being hovered over the droppable. */
    hoverClass: undefined
};

gj.droppable.methods = {
    init: function (jsConfig) {
        var option, $body, $dropEl = this;
        if (!jsConfig) {
            jsConfig = {};
        }
        if (!jsConfig.guid) {
            jsConfig.guid = gj.widget.generateGUID();
        }

        //Initialize events configured as options
        for (option in jsConfig) {
            if (gj.droppable.events.hasOwnProperty(option)) {
                $dropEl.on(option, jsConfig[option]);
                delete jsConfig[option];
            }
        }

        $dropEl.data(jsConfig);
        $dropEl.attr('data-guid', $dropEl.data('guid'));
        
        gj.documentManager.subscribeForEvent('mousedown', $dropEl.data('guid'), gj.droppable.methods.createMouseDownHandler($dropEl));
        gj.documentManager.subscribeForEvent('mousemove', $dropEl.data('guid'), gj.droppable.methods.createMouseMoveHandler($dropEl));
        gj.documentManager.subscribeForEvent('mouseup', $dropEl.data('guid'), gj.droppable.methods.createMouseUpHandler($dropEl));

        $dropEl.attr('data-droppable', true);

        return $dropEl;
    },

    createMouseDownHandler: function ($dropEl) {
        return function (e) {
            $dropEl.isDragging = true;
        }
    },

    createMouseMoveHandler: function ($dropEl) {
        return function (e) {
            if ($dropEl.isDragging) {
                var hoverClass = $dropEl.data('hoverClass'),
                    newIsOver = gj.droppable.methods.isOver($dropEl, e);
                if (newIsOver != $dropEl.isOver) {
                    if (newIsOver) {
                        if (hoverClass) {
                            $dropEl.addClass(hoverClass);
                        }
                        gj.droppable.events.over($dropEl);
                    } else {
                        if (hoverClass) {
                            $dropEl.removeClass(hoverClass);
                        }
                        gj.droppable.events.out($dropEl);
                    }
                }
                $dropEl.isOver = newIsOver;
            }
        }
    },

    createMouseUpHandler: function ($dropEl) {
        return function (e) {
            $dropEl.isDragging = false;
            if (gj.droppable.methods.isOver($dropEl, e)) {
                gj.droppable.events.drop($dropEl);
            }
        }
    },

    isOver: function ($dropEl, e) {
        var x = gj.droppable.methods.mouseX(e),
            y = gj.droppable.methods.mouseY(e),
            position = $dropEl.position();
        return x > position.left && x < (position.left + $dropEl.width()) && y > position.top && y < (position.top + $dropEl.height());
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

    destroy: function ($dropEl) {
        if ($dropEl.attr('data-droppable') === "true") {
            gj.documentManager.unsubscribeForEvent('mousedown', $dropEl.data('guid'));
            gj.documentManager.unsubscribeForEvent('mousemove', $dropEl.data('guid'));
            gj.documentManager.unsubscribeForEvent('mouseup', $dropEl.data('guid'));
            $dropEl.removeData();
            $dropEl.removeAttr('data-guid');
            $dropEl.removeAttr('data-droppable');
            $dropEl.off('drop').off('over').off('out');
        }
        return $dropEl;
    }
};

gj.droppable.events = {
    /** Triggered when a draggable element is dropped. */
    drop: function ($dropEl, offsetX, offsetY) {
        $dropEl.trigger('drop', [{ top: offsetY, left: offsetX }]);
    },

    /** Triggered when a draggable element is dragged over the droppable. */
    over: function ($dropEl) {
        $dropEl.trigger('over');
    },

    /** Triggered when a draggable element is dragged out of the droppable. */
    out: function ($dropEl) {
        $dropEl.trigger('out');
    }
};


function Droppable($dropEl, arguments) {
    var self = this,
        methods = gj.droppable.methods;

    self.isOver = false;
    self.isDragging = false;

    /** Removes the droppable functionality. */
    self.destroy = function () {
        return methods.destroy(this);
    }

    self.isOver = function (mouseEvent) {
        return methods.isOver(this, mouseEvent);
    }

    $.extend($dropEl, self);
    if ("true" !== $dropEl.attr('data-droppable')) {
        methods.init.apply($dropEl, arguments);
    }

    return $dropEl;
};

(function ($) {
    $.fn.droppable = function (method) {
        var $droppable;
        if (typeof method === 'object' || !method) {
            return new Droppable(this, arguments);
        } else {
            $droppable = new Droppable(this, null);
            if ($droppable[method]) {
                return $droppable[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                throw 'Method ' + method + ' does not exist.';
            }
        }
    };
})(jQuery);
