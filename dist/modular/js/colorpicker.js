/*
 * Gijgo ColorPicker v1.9.6
 * http://gijgo.com/colorpicker
 *
 * Copyright 2014, 2018 gijgo.com
 * Released under the MIT license
 */
gj.picker = {
    messages: {
        'en-us': {
        }
    }
};

gj.picker.methods = {

    initialize: function ($input, data, methods) {
        var $calendar, $rightIcon,
            $picker = methods.createPicker($input, data),
            $wrapper = $input.parent('div[role="wrapper"]');

        if (data.uiLibrary === 'bootstrap') {
            $rightIcon = $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>');
        } else if (data.uiLibrary === 'bootstrap4') {
            $rightIcon = $('<span class="input-group-append"><button class="btn btn-outline-secondary border-left-0" type="button">' + data.icons.rightIcon + '</button></span>');
        } else {
            $rightIcon = $(data.icons.rightIcon);
        }
        $rightIcon.attr('role', 'right-icon');

        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $input.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $input.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $input.val(data.value).addClass(data.style.input).attr('role', 'input');

        data.fontSize && $input.css('font-size', data.fontSize);

        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4') {
            if (data.size === 'small') {
                $wrapper.addClass('input-group-sm');
                $input.addClass('form-control-sm');
            } else if (data.size === 'large') {
                $wrapper.addClass('input-group-lg');
                $input.addClass('form-control-lg');
            }
        } else {
            if (data.size === 'small') {
                $wrapper.addClass('small');
            } else if (data.size === 'large') {
                $wrapper.addClass('large');
            }
        }

        $rightIcon.on('click', function (e) {
            if ($picker.is(':visible')) {
                $input.close();
            } else {
                $input.open();
            }
        });
        $wrapper.append($rightIcon);

        if (data.footer !== true) {
            $input.on('blur', function () {
                $input.timeout = setTimeout(function () {
                    $input.close();
                }, 500);
            });
            $picker.mousedown(function () {
                clearTimeout($input.timeout);
                $input.focus();
                return false;
            });
            $picker.on('click', function () {
                clearTimeout($input.timeout);
                $input.focus();
            });
        }

        // Picker Specific
        //if (data.keyboardNavigation) {
        //    $(document).on('keydown', gj.datepicker.methods.createKeyDownHandler($input, $calendar, data));
        //}
    }
};


gj.picker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.picker.methods;

    self.destroy = function () {
        return methods.destroy(this);
    };

    return $element;
};

gj.picker.widget.prototype = new gj.widget();
gj.picker.widget.constructor = gj.picker.widget;

gj.picker.widget.prototype.init = function (jsConfig, type, methods) {
    gj.widget.prototype.init.call(this, jsConfig, type);
    this.attr('data-' + type, 'true');
    gj.picker.methods.initialize(this, this.data(), methods);
    return this;
};

/* global window alert jQuery gj */
/**  */gj.colorpicker = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.colorpicker.config = {
    base: {

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The initial colorpicker value.         */        value: undefined,

        icons: {
            rightIcon: '<i class="gj-icon">event</i>'
        },

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-colorpicker gj-colorpicker-md gj-unselectable',
            input: 'gj-textbox-md',
            picker: 'gj-picker gj-picker-md colorpicker gj-unselectable',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {}
    },

    bootstrap4: {
        style: {}
    }
};

gj.colorpicker.methods = {
    init: function (jsConfig) {
        gj.picker.widget.prototype.init.call(this, jsConfig, 'colorpicker', gj.colorpicker.methods);
        this.attr('data-colorpicker', 'true');
        gj.colorpicker.methods.initialize(this);
        return this;
    },

    initialize: function ($colorpicker) {
    },

    createPicker: function ($input, data) {
        var $picker = $('<div role="picker" />').addClass(data.style.picker).attr('guid', $input.attr('data-guid'));

        $picker.html('test');

        $picker.hide();
        $('body').append($picker);

        return $picker;
    },

    open: function ($widget) {
        var data = $widget.data(),
            $picker = $('body').find('[role="picker"][guid="' + $widget.attr('data-guid') + '"]');

        if ($widget.val()) {
            $widget.value($widget.val());
        }

        $picker.show();
        $picker.closest('div[role="modal"]').show();
        if (data.modal) {
            gj.core.center($picker);
        } else {
            gj.core.setChildPosition($widget[0], $picker[0]);
            $widget.focus();
        }
        clearTimeout($widget.timeout);
        gj.colorpicker.events.open($widget);
    },

    close: function ($widget) {
        var $picker = $('body').find('[role="picker"][guid="' + $widget.attr('data-guid') + '"]');
        $picker.hide();
        $picker.closest('div[role="modal"]').hide();
        gj.colorpicker.events.close($widget);
    },

    destroy: function ($colorpicker) {
        var data = $colorpicker.data();
        if (data) {
            $colorpicker.off();
            $colorpicker.removeData();
            $colorpicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-colorpicker');
            $colorpicker.removeClass();
        }
        return $colorpicker;
    }
};

gj.colorpicker.events = {
    /**
     * Fires when the colorpicker value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
     *     */    change: function ($colorpicker) {
        return $colorpicker.triggerHandler('change');
    },

    /**
     * Fires as a new color is displayed in the drop-down picker.     */    select: function ($colorpicker) {
        return $colorpicker.triggerHandler('select');
    },

    /**
     * Fires when the picker popup is opening.     */    open: function ($colorpicker) {
        return $colorpicker.triggerHandler('open');
    },

    /**
     * Fires when the picker popup is closing.     */    close: function ($colorpicker) {
        return $colorpicker.triggerHandler('close');
    }
};

gj.colorpicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.colorpicker.methods;

    /** Gets or sets the value of the colorpicker.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove colorpicker functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Opens the popup element with the color selector.     */    self.open = function () {
        return methods.open(this);
    };

    /** Close the popup element with the color selector.     */    self.close = function () {
        return methods.close(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-colorpicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.colorpicker.widget.prototype = new gj.picker.widget();
gj.colorpicker.widget.constructor = gj.colorpicker.widget;

(function ($) {
    $.fn.colorpicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.colorpicker.widget(this, method);
            } else {
                $widget = new gj.colorpicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
