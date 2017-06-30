/*
 * Gijgo DropDown v1.5.0
 * http://gijgo.com/dropdown
 *
 * Copyright 2014, 2017 gijgo.com
 * Released under the MIT license
 */
if (typeof (gj) === 'undefined') {
    gj = {};
}

gj.widget = function () {
    var self = this;

    self.xhr = null;

    self.generateGUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    self.mouseX = function (e) {
        if (e) {
            if (e.pageX) {
                return e.pageX;
            } else if (e.clientX) {
                return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            } else if (e.touches && e.touches.length) {
                return e.touches[0].pageX;
            } else if (e.changedTouches && e.changedTouches.length) {
                return e.changedTouches[0].pageX;
            } else if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
                return e.originalEvent.touches[0].pageX;
            } else if (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                return e.originalEvent.touches[0].pageX;
            }
        }
        return null;
    };

    self.mouseY = function (e) {
        if (e) {
            if (e.pageY) {
                return e.pageY;
            } else if (e.clientY) {
                return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            } else if (e.touches && e.touches.length) {
                return e.touches[0].pageY;
            } else if (e.changedTouches && e.changedTouches.length) {
                return e.changedTouches[0].pageY;
            } else if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
                return e.originalEvent.touches[0].pageY;
            } else if (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                return e.originalEvent.touches[0].pageY;
            }
        }
        return null;
    };
};

gj.widget.prototype.init = function (jsConfig, type) {
    var option, clientConfig, fullConfig;

    this.attr('data-type', type);
    clientConfig = $.extend(true, {}, this.getHTMLConfig() || {});
    $.extend(true, clientConfig, jsConfig || {});
    fullConfig = this.getConfig(clientConfig, type);
    this.attr('data-guid', fullConfig.guid);
    this.data(fullConfig);

    // Initialize events configured as options
    for (option in fullConfig) {
        if (gj[type].events.hasOwnProperty(option)) {
            this.on(option, fullConfig[option]);
            delete fullConfig[option];
        }
    }

    // Initialize all plugins
    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            gj[type].plugins[plugin].configure(this, fullConfig, clientConfig);
        }
    }

    return this;
};

gj.widget.prototype.getConfig = function (clientConfig, type) {
    var config, uiLibrary, iconsLibrary, plugin;

    config = $.extend(true, {}, gj[type].config.base);

    uiLibrary = clientConfig.hasOwnProperty('uiLibrary') ? clientConfig.uiLibrary : config.uiLibrary;
    if (gj[type].config[uiLibrary]) {
        $.extend(true, config, gj[type].config[uiLibrary]);
    }

    iconsLibrary = clientConfig.hasOwnProperty('iconsLibrary') ? clientConfig.iconsLibrary : config.iconsLibrary;
    if (gj[type].config[iconsLibrary]) {
        $.extend(true, config, gj[type].config[iconsLibrary]);
    }

    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            $.extend(true, config, gj[type].plugins[plugin].config.base);
            if (gj[type].plugins[plugin].config[uiLibrary]) {
                $.extend(true, config, gj[type].plugins[plugin].config[uiLibrary]);
            }
            if (gj[type].plugins[plugin].config[iconsLibrary]) {
                $.extend(true, config, gj[type].plugins[plugin].config[iconsLibrary]);
            }
        }
    }

    $.extend(true, config, clientConfig);

    if (!config.guid) {
        config.guid = this.generateGUID();
    }

    return config;
}

gj.widget.prototype.getHTMLConfig = function () {
    var result = this.data(),
        attrs = this[0].attributes;
    if (attrs['width']) {
        result.width = attrs['width'].nodeValue;
    }
    if (attrs['height']) {
        result.height = attrs['height'].nodeValue;
    }
    if (attrs['align']) {
        result.align = attrs['align'].nodeValue;
    }
    if (result && result.source) {
        result.dataSource = result.source;
        delete result.source;
    }
    return result;
};

gj.widget.prototype.createDoneHandler = function () {
    var $widget = this;
    return function (response) {
        if (typeof (response) === 'string' && JSON) {
            response = JSON.parse(response);
        }
        gj[$widget.data('type')].methods.render($widget, response);
    };
};

gj.widget.prototype.createErrorHandler = function () {
    var $widget = this;
    return function (response) {
        if (response && response.statusText && response.statusText !== 'abort') {
            alert(response.statusText);
        }
    };
};

gj.widget.prototype.reload = function (params) {
    var ajaxOptions, result, data = this.data(), type = this.data('type');
    if (data.dataSource === undefined) {
        gj[type].methods.useHtmlDataSource(this, data);
    }
    $.extend(data.params, params);
    if ($.isArray(data.dataSource)) {
        result = gj[type].methods.filter(this);
        gj[type].methods.render(this, result);
    } else if (typeof(data.dataSource) === 'string') {
        ajaxOptions = { url: data.dataSource, data: data.params };
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions).done(this.createDoneHandler()).fail(this.createErrorHandler());
    } else if (typeof (data.dataSource) === 'object') {
        if (!data.dataSource.data) {
            data.dataSource.data = {};
        }
        $.extend(data.dataSource.data, data.params);
        ajaxOptions = $.extend(true, {}, data.dataSource); //clone dataSource object
        if (ajaxOptions.dataType === 'json' && typeof(ajaxOptions.data) === 'object') {
            ajaxOptions.data = JSON.stringify(ajaxOptions.data);
        }
        if (!ajaxOptions.success) {
            ajaxOptions.success = this.createDoneHandler();
        }
        if (!ajaxOptions.error) {
            ajaxOptions.error = this.createErrorHandler();
        }
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions);
    }
    return this;
}

gj.documentManager = {
    events: {},

    subscribeForEvent: function (eventName, widgetId, callback) {
        if (!gj.documentManager.events[eventName] || gj.documentManager.events[eventName].length === 0) {
            gj.documentManager.events[eventName] = [{ widgetId: widgetId, callback: callback }];
            $(document).on(eventName, gj.documentManager.executeCallbacks);
        } else if (!gj.documentManager.events[eventName][widgetId]) {
            gj.documentManager.events[eventName].push({ widgetId: widgetId, callback: callback });
        } else {
            throw "Event " + eventName + " for widget with guid='" + widgetId + "' is already attached.";
        }
    },

    executeCallbacks: function (e) {
        var callbacks = gj.documentManager.events[e.type];
        if (callbacks) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].callback(e);
            }
        }
    },

    unsubscribeForEvent: function (eventName, widgetId) {
        var success = false,
            events = gj.documentManager.events[eventName];
        if (events) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].widgetId === widgetId) {
                    events.splice(i, 1);
                    success = true;
                    if (events.length === 0) {
                        $(document).off(eventName);
                        delete gj.documentManager.events[eventName];
                    }
                }
            }
        }
        if (!success) {
            throw 'The "' + eventName + '" for widget with guid="' + widgetId + '" can\'t be removed.';
        }
    }
};
/* global window alert jQuery gj */
/**
  * @widget DropDown
  * @plugin Base
  */
if (typeof (gj.dropdown) === 'undefined') {
    gj.dropdown = {
        plugins: {}
    };
}

gj.dropdown.config = {
    base: {

        /** The data source of dropdown.
         * @additionalinfo If set to string, then the dropdown is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the dropdown is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the dropdown is going to use the array as data for dropdown nodes.
         * @type (string|object|array)
         * @default undefined
         * @example Local.DataSource <!-- materialicons, dropdown -->
         * <select id="dropdown"></select>
         * <script>
         *     $('#dropdown').dropdown({
         *         dataSource: [ { value: 1, text: 'One' }, { value: 2, text: 'Two' }, { value: 3, text: 'Three' } ]
         *     });
         * </script>
         * @example Remote.DataSource <!-- materialicons, dropdown -->
         * <select id="dropdown"></select>
         * <script>
         *     $('#dropdown').dropdown({
         *         dataSource: '/Locations/Get',
         *         dataValueField: 'id'
         *     });
         * </script>
         */
        dataSource: undefined,

        dataTextField: 'text',

        dataValueField: 'value',

        dataSelectedField: 'selected',

        optionsDisplay: 'materialDesign',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css files for Bootstrap or Material Design Lite should be manually included if you use those as UI Library.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- materialicons, dropdown -->
         * <select id="dropdown">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     var dropdown = $('#dropdown').dropdown({
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, dropdown -->
         * <select id="dropdown">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     $('#dropdown').dropdown({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- materialicons, bootstrap4, dropdown -->
         * <select id="dropdown">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     $('#dropdown').dropdown({ uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Bootstrap.Material.Icons <!-- bootstrap, materialicons, dropdown -->
         * <select id="dropdown"></select>
         * <script>
         *     var dropdown = $('#dropdown').dropdown({
         *         dataSource: '/Locations/Get',
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'materialicons',
         *         dataValueField: 'id'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, dropdown -->
         * <select id="dropdown"></select>
         * <script>
         *     var dropdown = $('#dropdown').dropdown({
         *         dataSource: '/Locations/Get',
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         dataValueField: 'id'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        icons: {
            /** DropDown icon definition.
             * @alias icons.dropdown
             * @type String
             * @default '<i class="material-icons">arrow_drop_down</i>'
             * @example Custom.Material.Icon <!-- materialicons, dropdown -->
             * <select id="dropdown"></select>
             * <script>
             *     var dropdown = $('#dropdown').dropdown({
             *         dataSource: '/Locations/Get',
             *         dataValueField: 'id',
             *         icons: { 
             *             dropdown: '<i class="material-icons">keyboard_arrow_down</i>'
             *         }
             *     });
             * </script>
             * @example Custom.Glyphicon.Icon <!-- bootstrap, dropdown -->
             * <select id="dropdown"></select>
             * <script>
             *     var dropdown = $('#dropdown').dropdown({
             *         dataSource: '/Locations/Get',
             *         dataValueField: 'id',
             *         uiLibrary: 'bootstrap',
             *         icons: { 
             *             dropdown: '<span class="glyphicon glyphicon-triangle-bottom" />'
             *         }
             *     });
             * </script>
             */
            dropdown: '<i class="material-icons">arrow_drop_down</i>'
        },

        indentation: 24,

        style: {
            wrapper: 'gj-dropdown gj-dropdown-md gj-unselectable',
            list: 'gj-list gj-list-md',
            active: 'gj-list-md-active'
        }
    },

    bootstrap: {
        indentation: 24,
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-3 gj-unselectable',
            presenter: 'btn btn-default',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        },
        iconsLibrary: 'glyphicons',
        optionsDisplay: 'standard'
    },

    bootstrap4: {
        indentation: 24,
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-4 gj-unselectable',
            presenter: 'btn btn-secondary',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        },
        optionsDisplay: 'standard'
    },

    materialicons: {
        indentation: 24,
        style: {
            expander: 'gj-dropdown-expander-mi'
        }
    },

    fontawesome: {
        icons: {
            dropdown: '<i class="fa fa-caret-down" aria-hidden="true"></i>'
        },
        style: {
            expander: 'gj-dropdown-expander-fa'
        }
    },

    glyphicons: {
        icons: {
            dropdown: '<span class="caret"></span>'
        },
        style: {
            expander: 'gj-dropdown-expander-glyphicons'
        }
    }
};

gj.dropdown.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'dropdown');
        this.attr('data-dropdown', 'true');
        gj.dropdown.methods.initialize(this);
        return this;
    },

    initialize: function ($dropdown) {
        var self = this, $item,
            data = $dropdown.data(),
            $wrapper = $dropdown.parent('div[role="wrapper"]'),
            $display = $('<span role="display"></span>'),
            $expander = $('<span role="expander">' + data.icons.dropdown + '</span>').addClass(data.style.expander),
            $presenter = $('<button role="presenter"></button>').addClass(data.style.presenter),
            $list = $('<ul role="list" class="' + data.style.list + '"></ul>');

        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $dropdown.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }

        $presenter.on('click', function (e) {
            if ($list.is(':visible')) {
                $list.hide();
            } else {
                if (data.optionsDisplay === 'standard') {
                    $list.css('top', $presenter.outerHeight() + 2);
                }
                $list.show();
            }
        });
        $presenter.on('blur', function (e) {
            setTimeout(function () {
                $list.hide();
            }, 100);
        });
        $presenter.append($display).append($expander);

        $dropdown.hide();
        $dropdown.after($presenter);
        $presenter.after($list);
        $list.hide();

        $dropdown.reload();
    },

    useHtmlDataSource: function ($dropdown, data) {
        var dataSource = [], i, $option, record,
            $options = $dropdown.find('option');
        for (i = 0; i < $options.length; i++) {
            $option = $($options[i]);
            record = {};
            record[data.dataValueField] = $option.val();
            record[data.dataTextField] = $option.html();
            record[data.dataSelectedField] = $option.prop('selected');
            dataSource.push(record);
        }
        data.dataSource = dataSource;
    },

    filter: function ($dropdown) {
        return $dropdown.data().dataSource;
    },

    render: function ($dropdown, response) {
        var width,
            selected = false,
            data = $dropdown.data(),
            $parent = $dropdown.parent(),
            $list = $parent.children('[role="list"]'),
            $presenter = $parent.children('[role="presenter"]'),
            $expander = $parent.find('[role="expander"]');

        $dropdown.data('records', response);
        $dropdown.empty();
        $list.empty();

        if (response && response.length) {
            $.each(response, function () {
                var record = this, $item, $option;

                $item = $('<li value="' + record[data.dataValueField] + '"><div data-role="wrapper"><span data-role="display">' + record[data.dataTextField] + '</span></div></li>');
                $item.addClass(data.style.item);
                $item.on('click', function (e) {
                    gj.dropdown.methods.select($dropdown, record[data.dataValueField]);
                });
                $list.append($item);

                $option = $('<option value="' + record[data.dataValueField] + '">' + record[data.dataTextField] + '</option>');
                $dropdown.append($option);

                if (record[data.dataSelectedField]) {
                    gj.dropdown.methods.select($dropdown, record[data.dataValueField]);
                    selected = true;
                }
            });
            if (selected === false) {
                gj.dropdown.methods.select($dropdown, response[0][data.dataValueField]);
            }
        }

        width = data.width ? data.width : ($list.width() + $expander.outerWidth() + 10);
        $parent.css('width', width);
        $list.css('width', width);

        gj.dropdown.events.dataBound($dropdown);

        return $dropdown;
    },

    select: function ($dropdown, value) {
        var data = $dropdown.data(),
            $list = $dropdown.parent().children('ul[role="list"]'),
            $item = $list.children('li[value="' + value + '"]'),
            record = gj.dropdown.methods.getRecordByValue($dropdown, value);
        $list.children('li').removeClass(data.style.active);
        $item.addClass(data.style.active);
        $dropdown.val(value);
        $dropdown.next('[role="presenter"]').find('[role="display"]').html(record[data.dataTextField]);
        gj.dropdown.events.change($dropdown);
        $list.hide();
        return $dropdown;
    },

    getRecordByValue: function ($dropdown, value) {
        var data = $dropdown.data(),
            i, result = undefined;

        for (i = 0; i < data.records.length; i++) {
            if (data.records[i][data.dataValueField] === value) {
                result = data.records[i];
                break;
            }
        }

        return result;
    },

    value: function ($dropdown, value) {
        if (typeof (value) === "undefined") {
            return $dropdown.val();
        } else {
            return gj.dropdown.methods.select($dropdown, value);
        }
    },

    destroy: function ($dropdown) {
        var data = $dropdown.data(),
            $parent = $dropdown.parent('div[role="wrapper"]');
        if (data) {
            $dropdown.xhr && $dropdown.xhr.abort();
            $dropdown.off();
            $dropdown.removeData();
            $dropdown.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-dropdown');
            $dropdown.removeClass();
            if ($parent.length > 0) {
                $parent.children('[role="presenter"]').remove();
                $parent.children('[role="list"]').remove();
                $dropdown.unwrap();
            }
            $dropdown.show();
        }
        return $tree;
    }
};

gj.dropdown.events = {
    /**
     * Triggered when the dropdown value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- dropdown, materialicons -->
     * <select id="dropdown">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     $('#dropdown').dropdown({
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($dropdown) {
        return $dropdown.triggerHandler('change');
    },

    /**
     * Event fires after the loading of the data in the dropdown.
     * @event dataBound
     * @param {object} e - event data
     * @example sample <!-- dropdown, materialicons -->
     * <select id="dropdown">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     $('#dropdown').dropdown({
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    dataBound: function ($dropdown) {
        return $dropdown.triggerHandler('dataBound');
    }
};

gj.dropdown.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.dropdown.methods;

    /** Gets or sets the value of the DropDown.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="alert($dropdown.value())">Get Content</button>
     * <hr/>
     * <select id="dropdown">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var $dropdown = $('#dropdown').dropdown();
     * </script>
     * @example Set <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="$dropdown.value('3')">Set Value</button>
     * <hr/>
     * <select id="dropdown">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var $dropdown = $('#dropdown').dropdown();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    self.enable = function () {
        return methods.enable(this);
    };

    self.disable = function () {
        return methods.disable(this);
    };

    /** Remove dropdown functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="dropdown.destroy()">Destroy</button>
     * <select id="dropdown">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var dropdown = $('#dropdown').dropdown();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-dropdown')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.dropdown.widget.prototype = new gj.widget();
gj.dropdown.widget.constructor = gj.dropdown.widget;

(function ($) {
    $.fn.dropdown = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.dropdown.widget(this, method);
            } else {
                $widget = new gj.dropdown.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);