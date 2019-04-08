/* global window alert jQuery */
/** 
 * @widget Checkbox 
 * @plugin Base
 */
gj.checkbox = {
    plugins: {}
};

gj.checkbox.config = {
    base: {
        /** The name of the UI library that is going to be in use. Currently we support only Material Design and Bootstrap. 
         * @additionalinfo The css files for Bootstrap should be manually included to the page if you use bootstrap as uiLibrary.
         * @type string (materialdesign|bootstrap|bootstrap4)
         * @default 'materialdesign'
         * @example Material.Design <!-- checkbox  -->
         * <input type="checkbox" id="checkbox"/><br/><br/>
         * <button onclick="chkb.state('checked')" class="gj-button-md">Checked</button>
         * <button onclick="chkb.state('unchecked')" class="gj-button-md">Unchecked</button>
         * <button onclick="chkb.state('indeterminate')" class="gj-button-md">Indeterminate</button>
         * <button onclick="chkb.prop('disabled', false)" class="gj-button-md">Enable</button>
         * <button onclick="chkb.prop('disabled', true)" class="gj-button-md">Disable</button>
         * <script>
         *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'), {
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, checkbox -->
         * <div class="container-fluid" style="margin-top:10px">
         *     <input type="checkbox" id="checkbox"/><br/><br/>
         *     <button onclick="chkb.state('checked')" class="btn btn-default">Checked</button>
         *     <button onclick="chkb.state('unchecked')" class="btn btn-default">Unchecked</button>
         *     <button onclick="chkb.state('indeterminate')" class="btn btn-default">Indeterminate</button>
         *     <button onclick="chkb.prop('disabled', false)" class="btn btn-default">Enable</button>
         *     <button onclick="chkb.prop('disabled', true)" class="btn btn-default">Disable</button>
         * </div>
         * <script>
         *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'), {
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, checkbox -->
         * <div class="container-fluid" style="margin-top:10px">
         *     <input type="checkbox" id="checkbox"/><br/><br/>
         *     <button onclick="chkb.state('checked')" class="btn btn-default">Checked</button>
         *     <button onclick="chkb.state('unchecked')" class="btn btn-default">Unchecked</button>
         *     <button onclick="chkb.state('indeterminate')" class="btn btn-default">Indeterminate</button>
         *     <button onclick="chkb.prop('disabled', false)" class="btn btn-default">Enable</button>
         *     <button onclick="chkb.prop('disabled', true)" class="btn btn-default">Disable</button>
         * </div>
         * <script>
         *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'), {
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         */
        uiLibrary: 'materialdesign',
        
        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Bootstrap.4.FontAwesome <!-- bootstrap4, checkbox, fontawesome -->
         * <div class="container-fluid" style="margin-top:10px">
         *     <input type="checkbox" id="checkbox"/><br/><br/>
         *     <button onclick="chkb.state('checked')" class="btn btn-default">Checked</button>
         *     <button onclick="chkb.state('unchecked')" class="btn btn-default">Unchecked</button>
         *     <button onclick="chkb.state('indeterminate')" class="btn btn-default">Indeterminate</button>
         *     <button onclick="chkb.prop('disabled', false)" class="btn btn-default">Enable</button>
         *     <button onclick="chkb.prop('disabled', true)" class="btn btn-default">Disable</button>
         * </div>
         * <script>
         *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'), {
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

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
     *
     * @event change
     * @param {object} e - event data
     * @param {string} state - the data of the checkbox
     * @return {GijgoCheckBox} GijgoCheckBox
     * @example sample <!-- checkbox -->
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'), {
     *         change: function (e) {
     *             alert('State: ' + chkb.state());
     *         }
     *     });
     * </script>
     */
    change: function (el, state) {
        return el.dispatchEvent(new CustomEvent('change', { 'state': state }));
    }
};


GijgoCheckBox = function (element, jsConfig) {
    var self = this,
        methods = gj.checkbox.methods;

    self.element = element;

    /** Toogle the state of the checkbox.
     * @method
     * @fires change
     * @return {GijgoCheckBox} GijgoCheckBox
     * @example sample <!-- checkbox -->
     * <button onclick="chkb.toggle()" class="gj-button-md">toggle</button>
     * <hr/>
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'));
     * </script>
     */
    self.toggle = function () {
        return methods.toggle(this);
    };

    /** Return state or set state if you pass parameter.
     * @method
     * @fires change
     * @param {string} value - State of the checkbox. Accept only checked, unchecked or indeterminate as values.
     * @return {string} checked|unchecked|indeterminate|checkbox
     * @example sample <!-- checkbox -->
     * <button onclick="chkb.state('checked')" class="gj-button-md">Set to checked</button>
     * <button onclick="chkb.state('unchecked')" class="gj-button-md">Set to unchecked</button>
     * <button onclick="chkb.state('indeterminate')" class="gj-button-md">Set to indeterminate</button>
     * <button onclick="alert(chkb.state())" class="gj-button-md">Get state</button>
     * <hr/>
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'));
     * </script>
     */
    self.state = function (value) {
        return methods.state(this, value);
    };

    /** Remove checkbox functionality from the element.
     * @method
     * @return {GijgoCheckBox} GijgoCheckBox
     * @example sample <!-- checkbox -->
     * <button onclick="chkb.destroy()" class="gj-button-md">Destroy</button>
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'));
     * </script>
     */
    self.destroy = function () {
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