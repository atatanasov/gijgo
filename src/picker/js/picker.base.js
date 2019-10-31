gj.picker = {
    messages: {
        'en-us': {
        }
    }
};

gj.picker.methods = {

    initialize: function (picker, data, methods) {
        var rightIcon, wrapper, input = picker.element,
            popup = methods.createPopup(picker, data);

        if (input.parentElement.attributes.role !== 'wrapper') {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'wrapper');
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
        } else {
            wrapper = input.parentElement;
        }

        gj.core.addClasses(wrapper, data.style.wrapper);

        if (data.width) {
            wrapper.style.width = data.width + 'px';
        }

        input.value = data.value || '';
        gj.core.addClasses(input, data.style.input);
        input.setAttribute('role', 'input');

        if (data.fontSize) {
            input.style.fontSize = data.fontSize;
        }

        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4') {
            if (data.size === 'small') {
                wrapper.classList.add('input-group-sm');
                input.classList.add('form-control-sm');
            } else if (data.size === 'large') {
                wrapper.classList.add('input-group-lg');
                input.classList.add('form-control-lg');
            }
        } else {
            if (data.size === 'small') {
                wrapper.classList.add('small');
            } else if (data.size === 'large') {
                wrapper.classList.add('large');
            }
        }

        if (data.showRightIcon) {
            if (data.uiLibrary === 'bootstrap') {
                rightIcon = document.createElement('span');
                rightIcon.classList.add('input-group-addon');
                rightIcon.innerHTML = data.icons.rightIcon;
            } else if (data.uiLibrary === 'bootstrap4') {
                rightIcon = document.createElement('span');
                rightIcon.classList.add('input-group-append');
                rightIcon.innerHTML = '<button class="btn btn-outline-secondary border-left-0" type="button">' + data.icons.rightIcon + '</button>';
            } else {
                rightIcon = gj.core.createElement(data.icons.rightIcon);
            }
            rightIcon.setAttribute('role', 'right-icon');
            rightIcon.addEventListener('click', function (e) {
                if (window.getComputedStyle(popup).display === 'none') {
                    picker.open();
                } else {
                    picker.close();
                }
            });
            wrapper.appendChild(rightIcon);
        }

        if (data.showOnFocus) {
            input.addEventListener('focus', function () {
                methods.open(picker, data);
            });
        }

        if (data.footer !== true) {
            input.addEventListener('blur', function () {
                picker.timeout = setTimeout(function () {
                    picker.close();
                }, 500);
            });
            popup.addEventListener('mousedown', function () {
                clearTimeout(picker.timeout);
                document.activeElement !== input && input.focus();
                return false;
            });
            popup.addEventListener('click', function () {
                clearTimeout(picker.timeout);
                document.activeElement !== input && input.focus();
            });
        }
    }
};


gj.picker.widget = function (element, jsConfig) {
    var self = this,
        methods = gj.picker.methods;

    self.destroy = function () {
        return methods.destroy(this);
    };

    return element;
};

gj.picker.widget.prototype = new gj.widget();
gj.picker.widget.constructor = gj.picker.widget;

gj.picker.widget.prototype.init = function (jsConfig, type, methods) {
    gj.widget.prototype.initJS.call(this, jsConfig, type);
    this.element.setAttribute('data-' + type, 'true');
    gj.picker.methods.initialize(this, gijgoStorage.get(this.element, 'gijgo'), gj[type].methods);
    return this;
};

gj.picker.widget.prototype.open = function (type) {
    var data = gijgoStorage.get(this.element, 'gijgo'),
        picker = document.body.querySelector('[role="picker"][guid="' + this.element.getAttribute('data-guid') + '"]');

    picker.style.display = 'block';
    if (data.modal) {
        picker.parentElement.style.display = 'block';
        gj.core.center(picker);
    } else {
        gj.core.setChildPosition(this.element, picker);
        document.activeElement !== this.element && this.element.focus();
    }
    clearTimeout(this.timeout);

    gj[type].events.open(this.element);

    return this;
};

gj.picker.widget.prototype.close = function (type) {
    var data = gijgoStorage.get(this.element, 'gijgo'),
        picker = document.body.querySelector('[role="picker"][guid="' + this.element.getAttribute('data-guid') + '"]');
    picker.style.display = 'none';
    if (data.modal) {
        picker.parentElement.style.display = 'none';
    }
    gj[type].events.close(this.element);
    return this;
};

gj.picker.widget.prototype.destroy = function (type) {
    var data = gijgoStorage.get(this.element, 'gijgo'),
        parent = this.element.parentElement,
        picker = document.body.querySelector('[role="picker"][guid="' + this.element.getAttribute('data-guid') + '"]'),
        rightIcon = this.element.parentElement.querySelector('[role="right-icon"]');
    if (data) {
        //this.off();
        if (parent.getAttribute('role') === 'modal') {
            this.element.outerHTML = this.element.innerHTML;
        }
        gijgoStorage.remove(this.element, 'gijgo');
        this.element.removeAttribute('data-type');
        this.element.removeAttribute('data-guid');
        this.element.removeAttribute('data-datepicker');
        this.element.removeAttribute('class');
        if (rightIcon) {
            this.element.parentElement.removeChild(rightIcon);
        }
        this.element.removeEventListener('focus');
        this.element.removeEventListener('blur');
        picker.parentNode.removeChild(picker);
    }
    return this;
};