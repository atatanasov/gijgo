/*
 * Gijgo DropDown v2.0.0-alpha-1
 * http://gijgo.com/dropdown
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.dropdown = {
    plugins: {}
};

gj.dropdown.config = {
    base: {

        /** The data source of dropdown.         */        dataSource: undefined,

        /** Text field name.         */        textField: 'text',

        /** Value field name.         */        valueField: 'value',

        /** Selected field name.         */        selectedField: 'selected',

        /** The width of the dropdown.         */        width: undefined,

        /** The maximum height of the dropdown list. When set to auto adjust to the screen height.         */        maxHeight: 'auto',

        /** Placeholder. This label appear only if the value is not set yet.         */        placeholder: undefined,

        fontSize: undefined,

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.         */        iconsLibrary: 'materialicons',

        icons: {
            /** DropDown icon definition.             */            dropdown: '<i class="gj-icon arrow-dropdown" />',

            dropup: '<i class="gj-icon arrow-dropup" />'
        },

        style: {
            wrapper: 'gj-dropdown gj-dropdown-md gj-unselectable',
            list: 'gj-list gj-list-md gj-dropdown-list-md',
            active: 'gj-list-md-active'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-3 gj-unselectable',
            presenter: 'btn btn-default',
            list: 'gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-4 gj-unselectable',
            presenter: 'btn btn-outline-secondary',
            list: 'gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        }
    },

    bootstrap5: {
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-4 gj-unselectable',
            presenter: 'btn btn-outline-secondary',
            list: 'gj-list gj-list-bootstrap gj-dropdown-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        }
    },

    materialicons: {
        style: {
            expander: 'gj-dropdown-expander-mi'
        }
    },

    fontawesome: {
        icons: {
            dropdown: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
            dropup: '<i class="fa fa-caret-up" aria-hidden="true"></i>'
        },
        style: {
            expander: 'gj-dropdown-expander-fa'
        }
    },

    glyphicons: {
        icons: {
            dropdown: '<span class="caret"></span>',
            dropup: '<span class="dropup"><span class="caret" ></span></span>'
        },
        style: {
            expander: 'gj-dropdown-expander-glyphicons'
        }
    }
};

gj.dropdown.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);
        this.element.setAttribute('data-gj-dropdown', 'true');
        gj.dropdown.methods.initialize(this);
        return this;
    },

    initialize: function (dropdown) {
        let item,
            el = dropdown.element;
            data = dropdown.getConfig(),
            wrapper = dropdown.wrap('div'),
            display = document.createElement('span'),
            expander = document.createElement('span'),
            presenter = document.createElement('button'),
            list = document.createElement('ul');

        if (data.fontSize) {
            presenter.style.fontSize = data.fontSize;
        }

        presenter.setAttribute('type', 'button');
        presenter.setAttribute('data-gj-role', 'presenter');
        gj.core.addClasses(presenter, data.style.presenter);
        presenter.addEventListener('click', function (e) {
            if (list.style.display !== 'none') {
                gj.dropdown.methods.close(dropdown, list);
            } else {
                gj.dropdown.methods.open(dropdown, list);
            }
        });
        presenter.addEventListener('blur', function (e) {
            setTimeout(function () {
                gj.dropdown.methods.close(dropdown, list);
            }, 500);
        });

        display.setAttribute('data-gj-role', 'display');
        presenter.appendChild(display);

        expander.setAttribute('data-gj-role', 'expander');
        expander.innerHTML = data.icons.dropdown;
        gj.core.addClasses(expander, data.style.expander);
        presenter.appendChild(expander);

        dropdown.element.style.display = 'none';
        
        wrapper.appendChild(presenter); //dropdown.after($presenter);

        list.setAttribute('data-gj-role', 'list');
        gj.core.addClasses(list, data.style.list);
        list.setAttribute('data-gj-guid', el.getAttribute('data-gj-guid'));
        list.style.display = 'none';
        document.body.appendChild(list);

        dropdown.reload();
    },

    setListPosition: function (presenter, list, data) {
        let top, listHeight, presenterHeight, newHeight, listElRect,
            mainElRect = presenter.getBoundingClientRect(),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        // Reset list size
        list.style.overflow = '';
        list.style.overflowX = '';
        list.style.height = '';

        gj.core.setChildPosition(presenter, list);

        listHeight = gj.core.height(list, true);
        listElRect = list.getBoundingClientRect();
        presenterHeight = gj.core.height(presenter, true);
        if (data.maxHeight === 'auto') {
            if (mainElRect.top < listElRect.top) { // The list is located below the main element
                if (mainElRect.top + listHeight + presenterHeight > window.innerHeight) {
                    newHeight = window.innerHeight - mainElRect.top - presenterHeight - 3;
                }
            } else { // The list is located above the main element                
                if (mainElRect.top - listHeight - 3 > 0) {
                    list.style.top = Math.round(mainElRect.top + scrollY - listHeight - 3) + 'px';
                } else {
                    list.style.top = scrollY + 'px';
                    newHeight = mainElRect.top - 3;
                }
            }
        } else if (!isNaN(data.maxHeight) && data.maxHeight < listHeight) {
            newHeight = data.maxHeight;
        }

        if (newHeight) {
            list.style.overflow = 'scroll';
            list.style.overflowX = 'hidden';
            list.style.height = newHeight + 'px';
        }
    },

    useHtmlDataSource: function (dropdown, data) {
        let dataSource = [], i, record,
            options = dropdown.element.getElementsByTagName('option');
        for (i = 0; i < options.length; i++) {
            record = {};
            record[data.valueField] = options[i].value;
            record[data.textField] = options[i].innerHTML;
            record[data.selectedField] = dropdown.element[0].value === options[i].value;
            dataSource.push(record);
        }
        data.dataSource = dataSource;
    },

    filter: function (dropdown) {
        let i, record, data = dropdown.getConfig();
        if (!data.dataSource) {
            data.dataSource = [];
        } else if (typeof data.dataSource[0] === 'string') {
            for (i = 0; i < data.dataSource.length; i++) {
                record = {};
                record[data.valueField] = data.dataSource[i];
                record[data.textField] = data.dataSource[i];
                data.dataSource[i] = record;
            }
        }
        return data.dataSource;
    },

    createListItem: function (dropdown, list, value, text, css) {
        let li = document.createElement('li'),
            option = document.createElement('option');
        li.setAttribute('value', value);
        li.innerHTML = '<div data-gj-role="wrapper"><span data-gj-role="display">' + text + '</span></div>';
        gj.core.addClasses(li, css);
        li.addEventListener('click', function (e) {
            gj.dropdown.methods.select(dropdown, value);
        });
        list.appendChild(li);

        option.setAttribute('value', value);
        option.text = text;
        dropdown.element.appendChild(option);
    },

    render: function (dropdown, response) {
        let i, option, width, selections = [],
            data = dropdown.getConfig(),
            parent = dropdown.element.parentNode,
            list = document.body.querySelector('[data-gj-role="list"][data-gj-guid="' + dropdown.element.getAttribute('data-gj-guid') + '"]'),
            presenter = parent.querySelector('[data-gj-role="presenter"]'),
            expander = presenter.querySelector('[data-gj-role="expander"]'),
            display = presenter.querySelector('[data-gj-role="display"]');

        dropdown.setRecords(response);
        dropdown.element.innerHTML = '';
        list.innerHTML = '';

        if (response && response.length) {

            for (const record of response) {
                gj.dropdown.methods.createListItem(dropdown, list, record[data.valueField], record[data.textField], data.style.item);

                if (record[data.selectedField] && record[data.selectedField].toString().toLowerCase() === 'true') {
                    selections.push(record[data.valueField]);
                }
            };
            if (selections.length === 0) {
                option = document.createElement('option');
                option.setAttribute('value', '');
                dropdown.element.insertBefore(option, dropdown.element.firstChild);
                dropdown.element.selectedIndex = 0;
                if (data.placeholder) {
                    display.innerHTML = '<span class="placeholder">' + data.placeholder + '</span>';
                }
            } else {
                for (i = 0; i < selections.length; i++) {
                    gj.dropdown.methods.select(dropdown, selections[i]);
                }
            }
        }

        if (data.width) {
            gj.core.css(parent, 'width', data.width);
            gj.core.css(presenter, 'width', data.width);
        }

        if (data.fontSize) {
            list.style.fontSize = data.fontSize;
        }

        gj.dropdown.events.dataBound(dropdown.element);

        return dropdown;
    },

    open: function (dropdown, list) {
        let data = dropdown.getConfig(),
            expander = dropdown.element.parentNode.querySelector('[data-gj-role="expander"]'),
            presenter = dropdown.element.parentNode.querySelector('[data-gj-role="presenter"]'),
            scrollParentEl = gj.core.getScrollParent(dropdown.element);
        list.style.width = gj.core.width(presenter) + 'px';
        list.style.display = 'block';
        gj.dropdown.methods.setListPosition(presenter, list, data);
        expander.innerHTML = data.icons.dropup;
        if (scrollParentEl) {
            data.parentScrollHandler = function () {
                gj.dropdown.methods.setListPosition(presenter, list, data);
            };
            gj.dropdown.methods.addParentsScrollListener(scrollParentEl, data.parentScrollHandler);
        }
    },

    close: function (dropdown, list) {
        let data = dropdown.getConfig(),
            expander = dropdown.element.parentNode.querySelector('[data-gj-role="expander"]'),
            scrollParentEl = gj.core.getScrollParent(dropdown.element);
        expander.innerHTML = data.icons.dropdown;
        if (scrollParentEl && data.parentScrollHandler) {
            gj.dropdown.methods.removeParentsScrollListener(scrollParentEl, data.parentScrollHandler);
        }
        list.style.display = 'none';
    },

    addParentsScrollListener: function (el, handler) {
        let scrollParentEl = gj.core.getScrollParent(el.parentNode);
        el.addEventListener('scroll', handler);
        if (scrollParentEl) {
            gj.dropdown.methods.addParentsScrollListener(scrollParentEl, handler);
        }
    },
    removeParentsScrollListener: function (el, handler) {
        let scrollParentEl = gj.core.getScrollParent(el.parentNode);
        el.removeEventListener('scroll', handler);
        if (scrollParentEl) {
            gj.dropdown.methods.removeParentsScrollListener(scrollParentEl, handler);
        }
    },

    select: function (dropdown, value) {
        let data = dropdown.getConfig(),
            list = document.body.querySelector('[data-gj-role="list"][data-gj-guid="' + dropdown.element.getAttribute('data-gj-guid') + '"]'),
            item = list.querySelector('li[value="' + value + '"]'),
            display = dropdown.element.parentNode.querySelector('[data-gj-role="presenter"] [data-gj-role="display"]'),
            record = gj.dropdown.methods.getRecordByValue(dropdown, value);

        list.querySelectorAll('li').forEach(function(li) {
            li.classList.remove(data.style.active);
        });
        if (record) {
            item.classList.add(data.style.active);
            dropdown.element.value = value;
            display.innerHTML = record[data.textField];
        } else {
            if (data.placeholder) {
                display.innerHTML = '<span class="placeholder">' + data.placeholder + '</span>';
            }
            dropdown.element.value = '';
        }
        gj.dropdown.events.change(dropdown.element);
        gj.dropdown.methods.close(dropdown, list);
        return dropdown;
    },

    getRecordByValue: function (dropdown, value) {
        let records = dropdown.getRecords(),
            i, result = undefined;

        for (i = 0; i < records.length; i++) {
            if (records[i][data.valueField] === value) {
                result = records[i];
                break;
            }
        }

        return result;
    },

    value: function (dropdown, value) {
        if (typeof (value) === "undefined") {
            return dropdown.element.value;
        } else {
            gj.dropdown.methods.select(dropdown, value);
            return dropdown;
        }
    },

    destroy: function (dropdown) {
        let data = dropdown.getConfig(),
            el = dropdown.element,
            parent = dropdown.element.parentNode;
        if (data) {
            dropdown.xhr && dropdown.xhr.abort();
            dropdown.off();
            dropdown.removeConfig();
            dropdown.removeRecords();
            el.removeAttribute('data-gj-type')
            el.removeAttribute('data-gj-guid')
            el.removeAttribute('data-gj-dropdown');
            el.className = '';
            if (parent) {
                parent.querySelector('[data-gj-role="presenter"]').remove();
                document.body.querySelector('[data-gj-role="list"]').remove();
            }
            dropdown.unwrap();
            el.style.display = 'block';
        }
        return dropdown;
    }
};

gj.dropdown.events = {
    /**
     * Triggered when the dropdown value is changed.
     *     */    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Event fires after the loading of the data in the dropdown.     */    dataBound: function (el) {
        return el.dispatchEvent(new Event('dataBound'));;
    }
};

GijgoDropDown = function (element, jsConfig) {
    let self = this,
        methods = gj.dropdown.methods;

    self.type = 'dropdown';
    self.element = element;

    /** Gets or sets the value of the DropDown.     */    self.value = function (value) {
        return methods.value(this, value);
    };

    self.enable = function () {
        return methods.enable(this);
    };

    self.disable = function () {
        return methods.disable(this);
    };

    /** Remove dropdown functionality from the element.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    if ('true' !== element.getAttribute('data-gj-dropdown')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDropDown.prototype = new gj.widget();
GijgoDropDown.constructor = GijgoDropDown;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.dropdown = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDropDown(this, method);
                } else {
                    widget = new GijgoDropDown(this, null);
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
