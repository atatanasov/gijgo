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
     * .element { border: 1px solid #999; width: 300px; height: 200px; }
     * .handle { background-color: #DDD; cursor: move; width: 200px; margin: 5px auto 0px auto; text-align: center; padding: 5px; }
     * </style>
     * <div id="element" class="element">
     *   <div id="handle" class="handle">Handle for dragging</div>
     * </div>
     * <script>
     *     $('#element').droppable({
     *         handle: $('#handle')
     *     });
     * </script>
     */
    hoverClass: undefined
};

gj.droppable.methods = {
    init: function (jsConfig) {
        var $dropEl = this;

        return $dropEl;
    },

    mouseMove: function ($dragEl, e) {
    }
};

gj.droppable.events = {
    /** Triggered while the mouse is moved during the dragging.
     * @event drag
     * @param {object} e - event data
     * @param {object} offset - Current offset position as { top, left } object.
     * @example sample <!-- droppable.base -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element">
     *   drag me
     * </div>
     * <script>
     *     $('#element').droppable({
     *         drag: function (e, offset) {
     *             $('body').append('<div>The drag event is fired. offset { top:' + offset.top + ', left: ' + offset.left + '}.</div>');
     *         }
     *     });
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


function Droppable($dragEl, arguments) {
    var self = this,
        methods = gj.droppable.methods;

    self.isDragging = false;
    self.prevX = undefined;
    self.prevY = undefined;

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

    $.extend($dragEl, self);
    methods.init.apply($dragEl, arguments);

    return $dragEl;
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