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
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; position: relative; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; position: relative; text-align: center; }
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
        var option, $dropEl = this;
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

        $(document).on('mousedown', function (e) {
            $dropEl.isDropping = true;
            $(document).on('mousemove', function (e) {
                gj.droppable.methods.mouseMove($dropEl, e);
            });
        });

        $dropEl.on('mouseup', function (e) {
            if ($dropEl.isDropping) {
                $dropEl.isDropping = false;
                gj.droppable.events.drop($dropEl);
                $(document).off('mousemove');
            }
        });

        return $dropEl;
    },

    mouseMove: function ($dropEl, e) {
        var x, y, position;
        if ($dropEl.isDropping) {
            x = gj.droppable.methods.mouseX(e);
            y = gj.droppable.methods.mouseY(e);
            position = $dropEl.position();
            if (x > position.left && x < (position.left + $dropEl.width()) &&
                y > position.top && y < (position.top + $dropEl.height())) {
                $dropEl.addClass($dropEl.data('hoverClass'));
            } else {
                $dropEl.removeClass($dropEl.data('hoverClass'));
            }
        }
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

gj.droppable.events = {
    /** Triggered while the mouse is moved during the dragging.
     * @event drag
     * @param {object} e - event data
     * @param {object} offset - Current offset position as { top, left } object.
     * @example sample <!-- droppable.base, draggable.base -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; position: relative; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; position: relative; text-align: center; }
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

    /**
     * Triggered when dragging starts.
     *
     * @event start
     * @param {object} e - event data
     * @example sample <!-- droppable.base -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element">
     *   drag me
     * </div>
     * <script>
     *     $('#element').droppable({
     *         start: function (e, offset) {
     *             $('body').append('<div>The start event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    out: function ($dropEl) {
        $dropEl.trigger('out');
    },

    /**
     * Triggered when dragging stops.
     *
     * @event stop
     * @param {object} e - event data
     * @example sample <!-- droppable.base -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element">
     *   drag me
     * </div>
     * <script>
     *     $('#element').droppable({
     *         stop: function (e, offset) {
     *             $('body').append('<div>The stop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    over: function ($dropEl) {
        $dropEl.trigger('over');
    }
};


function Droppable($dropEl, arguments) {
    var self = this,
        methods = gj.droppable.methods;

    self.isDropping = false;

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
    methods.init.apply($dropEl, arguments);

    return $dropEl;
};

(function ($) {
    $.fn.droppable = function (method) {
        if (typeof method === 'object' || !method) {
            return new Droppable(this, arguments);
        } else if (gj.droppable.methods[method]) {
            return gj.droppable.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            throw 'Method ' + method + ' does not exist.';
        }
    };
})(jQuery);