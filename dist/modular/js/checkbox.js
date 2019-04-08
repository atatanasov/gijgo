/*
 * Gijgo Checkbox v1.9.10
 * http://gijgo.com/checkbox
 *
 * Copyright 2014, 2018 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery */
/**  */gj.checkbox = {
    plugins: {}
};

gj.checkbox.config = {
    base: {
        /** The name of the UI library that is going to be in use. Currently we support only Material Design and Bootstrap.          */        uiLibrary: 'materialdesign',
        
        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.         */        iconsLibrary: 'materialicons',

        style: {
            wrapperCssClass: 'gj-checkbox-md',
            spanCssClass: undefined
        }
        
    },

    bootstrap: {
        style: {
            wrapperCssClass: 'gj-checkbox-bootstrap'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapperCssClass: 'gj-checkbox-bootstrap gj-checkbox-bootstrap-4'
        },
        iconsLibrary: 'materialicons'
    },

    materialicons: {
        style: {
            iconsCssClass: 'gj-checkbox-material-icons',
            spanCssClass: 'gj-icon'
        }
    },

    glyphicons: {
        style: {
            iconsCssClass: 'gj-checkbox-glyphicons',
            spanCssClass: ''
        }
    },

    fontawesome: {
        style: {
            iconsCssClass: 'gj-checkbox-fontawesome',
            spanCssClass: 'fa'
        }
    }
};

gj.checkbox.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.initJS.call(this, jsConfig, 'checkbox');
        this.element.setAttribute('data-checkbox', 'true');
        gj.checkbox.methods.initialize(this, gijgoStorage.get(this.element, 'gijgo'));
        return this;
    },

    initialize: function (chkb, data) {
        var wrapper, span;
        wrapper = document.createElement('label');
        wrapper.classList.add(data.style.wrapperCssClass);
        wrapper.classList.add(data.style.iconsCssClass);
        if (chkb.element.getAttribute('id')) {
            wrapper.setAttribute('for', chkb.element.getAttribute('id'));
        }
        chkb.element.parentNode.insertBefore(wrapper, chkb.element);
        wrapper.appendChild(chkb.element);
            
        span = document.createElement('span');
        if (data.style.spanCssClass) {
            span.classList.add(data.style.spanCssClass);
        }
    },

    state: function (chkb, value) {
        if (value) {
            if ('checked' === value) {
                chkb.prop('indeterminate', false);
                chkb.prop('checked', true);
            } else if ('unchecked' === value) {
                chkb.prop('indeterminate', false);
                chkb.prop('checked', false);
            } else if ('indeterminate' === value) {
                chkb.prop('checked', true);
                chkb.prop('indeterminate', true);
            }
            gj.checkbox.events.change(chkb, value);
            return chkb;
        } else {
            if (chkb.prop('indeterminate')) {
                value = 'indeterminate';
            } else if (chkb.prop('checked')) {
                value = 'checked';
            } else {
                value = 'unchecked';
            }
            return value;
        }
    },

    toggle: function (chkb) {
        if (chkb.state() === 'checked') {
            chkb.state('unchecked');
        } else {
            chkb.state('checked');
        }
        return chkb;
    },

    destroy: function (chkb) {
        var data = gijgoStorage.get(chkb.element, 'gijgo'),
            parent = picker.element.parentElement,
            calendar = document.body.querySelector('[role="picker"][guid="' + picker.element.getAttribute('data-guid') + '"]');
        if (data) {
            gijgoStorage.remove(chkb.element, 'gijgo');
            chkb.element.removeAttribute('data-type');
            chkb.element.removeAttribute('data-guid');
            chkb.element.removeAttribute('data-checkbox');
            chkb.element.removeAttribute('class');
            chkb.next('span').remove();
            chkb.unwrap();
        }
        return chkb;
    }
};

gj.checkbox.events = {
    /**
     * Triggered when the state of the checkbox is changed
     *     */    change: function (el, state) {
        return el.dispatchEvent(new CustomEvent('change', { 'state': state }));
    }
};


GijgoCheckBox = function (element, jsConfig) {
    var self = this,
        methods = gj.checkbox.methods;

    self.element = element;

    /** Toogle the state of the checkbox.     */    self.toggle = function () {
        return methods.toggle(this);
    };

    /** Return state or set state if you pass parameter.     */    self.state = function (value) {
        return methods.state(this, value);
    };

    /** Remove checkbox functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    if ('true' !== element.getAttribute('data-checkbox')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoCheckBox.prototype = new gj.widget();
GijgoCheckBox.constructor = GijgoCheckBox;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.checkbox = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoCheckBox(this, method);
                } else {
                    widget = new GijgoCheckBox(this, null);
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
