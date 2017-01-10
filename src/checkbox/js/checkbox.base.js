/* global window alert jQuery */
/** 
 * @widget Checkbox 
 * @plugin Base
 */
if (typeof (gj.checkbox) === 'undefined') {
    gj.checkbox = {};
}

gj.checkbox.config = {
    base: {
        /** If specified, restricts dragging from starting unless the mousedown occurs on the specified element.
         * Only elements that descend from the checkbox element are permitted.
         * @type Number
         * @default undefined
         * @example sample <!-- checkbox.base -->
         * <style>
         * .element { border: 1px solid #999; width: 300px; height: 200px; }
         * .handle { background-color: #DDD; cursor: move; width: 200px; margin: 5px auto 0px auto; text-align: center; padding: 5px; }
         * </style>
         * <div id="element" class="element">
         *   <div id="handle" class="handle">Handle for dragging</div>
         * </div>
         * <script>
         *     $('#element').checkbox({
         *         handle: $('#handle')
         *     });
         * </script>
         */
        width: undefined
    }
};

gj.checkbox.methods = {
    init: function (jsConfig) {
        var $handleEl, $dragEl = this;

        gj.widget.prototype.init.call(this, jsConfig, 'checkbox');
        $dragEl.attr('data-checkbox', 'true');

        return $dragEl;
    },

    destroy: function ($checkboxEl) {
        if ($checkboxEl.attr('data-checkbox') === 'true') {
            $checkboxEl.removeData();
            $checkboxEl.removeAttr('data-guid');
            $checkboxEl.removeAttr('data-checkbox');
            $checkboxEl.off();
        }
        return $checkboxEl;
    }
};

gj.checkbox.events = {
    /**
     * Triggered while the mouse is moved during the dragging, immediately before the current move happens.
     *
     * @event drag
     * @param {object} e - event data
     * @param {object} offset - Current offset position as { top, left } object.
     * @example sample <!-- checkbox.base -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element">drag me</div>
     * <script>
     *     $('#element').checkbox({
     *         drag: function (e, offset) {
     *             $('body').append('<div>The drag event is fired. offset { top:' + offset.top + ', left: ' + offset.left + '}.</div>');
     *         }
     *     });
     * </script>
     */
    check: function () {
        return $dragEl.triggerHandler('check');
    }
};


gj.checkbox.widget = function ($element, arguments) {
    var self = this,
        methods = gj.checkbox.methods;

    /** Remove checkbox functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- checkbox.base -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <button onclick="dragEl.destroy()">Destroy</button>
     * <div id="element" class="element">Drag Me</div>
     * <script>
     *     var dragEl = $('#element').checkbox();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-checkbox')) {
        methods.init.apply($element, arguments);
    }

    return $element;
};

gj.checkbox.widget.prototype = new gj.widget();
gj.checkbox.widget.constructor = gj.checkbox.widget;

(function ($) {
    $.fn.checkbox = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.checkbox.widget(this, arguments);
            } else {
                $widget = new gj.checkbox.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);