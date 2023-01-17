/*
 * Gijgo ColorPicker v2.0.0-alpha-1
 * http://gijgo.com/colorpicker
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
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
        gj.picker.widget.prototype.init.call(this, jsConfig);
        gj.colorpicker.methods.initialize(this);
        return this;
    },

    initialize: function (colorpicker) {
    },

    createPopup: function (ctrl, data) {
        var popup = document.createElement('div');
        popup.setAttribute('role', 'popup');
        gj.core.addClasses(popup, data.style.picker);
        popup.setAttribute('data-gj-guid', ctrl.element.getAttribute('data-gj-guid'));

        popup.innerHTML = 'test';

        popup.style.display = 'none';
        document.body.appendChild(popup);

        return ctrl;
    },

    open: function (picker) {
        if (picker.value()) {
            //$input.value($input.val());
        }
        return gj.picker.widget.prototype.open.call(picker, 'colorpicker');
    }
};

gj.colorpicker.events = {
    /**
     * Fires when the colorpicker value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
     *     */    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Fires as a new color is displayed in the drop-down picker.     */    select: function (el) {
        return el.dispatchEvent(new Event('select'));
    },

    /**
     * Fires when the picker popup is opening.     */    open: function (el) {
        return el.dispatchEvent(new Event('open'));
    },

    /**
     * Fires when the picker popup is closing.     */    close: function (el) {
        return el.dispatchEvent(new Event('close'));
    }
};

GijgoColorPicker = function (element, jsConfig) {
    var self = this,
        methods = gj.colorpicker.methods;

    self.type = 'colorpicker';
    self.element = element;

    /** Gets or sets the value of the colorpicker.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove colorpicker functionality from the element.     */    self.destroy = function () {
        return gj.picker.widget.prototype.destroy.call(this, 'colorpicker');
    };

    /** Opens the popup element with the color selector.     */    self.open = function () {
        return methods.open(this);
    };

    /** Close the popup element with the color selector.     */    self.close = function () {
        return gj.picker.widget.prototype.close.call(this, 'colorpicker');
    };
    
    if ('true' !== element.getAttribute('data-gj-colorpicker')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoColorPicker.prototype = new gj.picker.widget();
GijgoColorPicker.constructor = GijgoColorPicker;


if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.colorpicker = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoColorPicker(this, method);
                } else {
                    widget = new GijgoColorPicker(this, null);
                    if (widget[method]) {
                        return widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}
