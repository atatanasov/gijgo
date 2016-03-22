/* global window alert jQuery */
/*
 * Gijgo JavaScript Library v0.7.0
 * http://gijgo.com/
 *
 * Copyright 2014, 2016 gijgo.com
 * Released under the MIT license
 */
/** 
  * @widget Droppable 
  * @plugin Base
  */
if (typeof (gj) === 'undefined') {
    gj = {};
}
if (typeof (gj.droppable) === 'undefined') {
    gj.droppable = {};
}

gj.droppable.config = {
    /** If specified, the class will be added to the droppable while draggable is being hovered over the droppable.
     * @type string
     * @default undefined
     * @example sample <!-- droppable.base, draggable.base -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({ hoverClass: 'hover' });
     * </script>
     */
    hoverClass: undefined
};

gj.droppable.methods = {
    init: function (jsConfig) {
        var option, $body, $dropEl = this;
        if (!jsConfig) {
            jsConfig = {};
        }
        $dropEl.data(jsConfig);

        //Initialize events configured as options
        for (option in jsConfig) {
            if (gj.droppable.events.hasOwnProperty(option)) {
                $dropEl.on(option, jsConfig[option]);
                delete jsConfig[option];
            }
        }

        $body = $dropEl.closest('body');
        $body.on('mousedown', function () { $dropEl.trigger('mousedown.droppable'); });
        $body.on('mousemove', function (e) { $dropEl.trigger('mousemove.droppable', [e]); });
        $body.on('mouseup', function (e) { $dropEl.trigger('mouseup.droppable', [e]); });

        $dropEl.on('mousedown.droppable', function (e) {
            $dropEl.isDragging = true;
        });

        $dropEl.on('mousemove.droppable', function (e, mouseEvent) {
            if ($dropEl.isDragging) {
                gj.droppable.methods.mouseMove($dropEl, mouseEvent);
            }
        });

        $dropEl.on('mouseup.droppable', function (e, mouseEvent) {
            $dropEl.isDragging = false;
            if (gj.droppable.methods.isOver($dropEl, mouseEvent)) {
                gj.droppable.events.drop($dropEl);
            }
        });
        $dropEl.attr('data-initialized', true);

        return $dropEl;
    },

    mouseMove: function ($dropEl, e) {
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
        $dropEl.off('mousedown.droppable');
        $dropEl.off('mousemove.droppable');
        $dropEl.off('mouseup.droppable');
        $dropEl.data({});
        $dropEl.attr('data-initialized', false);
    }
};

gj.droppable.events = {
    /** Triggered when a draggable element is dropped.
     * @event drag
     * @param {object} e - event data
     * @example sample <!-- droppable.base, draggable.base -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .drop { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({ drop: function() { $(this).addClass('drop') } });
     * </script>
     */
    drop: function ($dropEl, offsetX, offsetY) {
        $dropEl.trigger('drop', [{ top: offsetY, left: offsetX }]);
    },

    /** Triggered when a draggable element is dragged over the droppable.
     * @event stop
     * @param {object} e - event data
     * @example sample <!-- droppable.base, draggable.base -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({
     *         over: function() { $(this).addClass('hover') },
     *         out: function() { $(this).removeClass('hover') }
     *     });
     * </script>
     */
    over: function ($dropEl) {
        $dropEl.trigger('over');
    },

    /** Triggered when a draggable element is dragged out of the droppable.
     * @event start
     * @param {object} e - event data
     * @example sample <!-- droppable.base, draggable.base -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({
     *         over: function() { $(this).addClass('hover') },
     *         out: function() { $(this).removeClass('hover') }
     *     });
     * </script>
     */
    out: function ($dropEl) {
        $dropEl.trigger('out');
    }
};


function Droppable($dropEl, arguments) {
    var self = this,
        methods = gj.droppable.methods;

    self.isOver = false;
    self.isDragging = false;

    /** Removes the droppable functionality.
     * @method
     * @return jquery element
     * @example sample <!-- draggable.base, droppable.base -->
     * <div id="dropElement" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dropEl.destroy()">Destroy</button>
     * <script>
     *     var dropEl = $('#dropElement').droppable({
     *         hoverClass: 'hover'
     *     });
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    }

    $.extend($dropEl, self);
    if (true !== $dropEl.data('initialized')) {
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