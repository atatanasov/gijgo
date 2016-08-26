var gj = {
    widget: function () {
        var self = this;

        self.xhr = null;

        self.generateGUID = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };
    }
};

gj.widget.prototype.init = function (jsConfig, type) {
    var option, config = this.getConfig(jsConfig, type);

    this.attr('data-guid', config.guid);

    this.attr('data-' + type, 'true');

    this.data(config);

    // Initialize events configured as options
    for (option in config) {
        if (gj[type].events.hasOwnProperty(option)) {
            this.on(option, config[option]);
            delete config[option];
        }
    }

    // Initialize all plugins
    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            gj[type].plugins[plugin].configure(this, config);
        }
    }

    return this;
};

gj.widget.prototype.getConfig = function (jsConfig, type) {
    var config, clientConfig, uiLibrary, plugin;

    config = $.extend(true, {}, gj[type].config.base);

    clientConfig = $.extend(true, {}, this.getHTMLConfig() || {});
    $.extend(true, clientConfig, jsConfig || {});

    uiLibrary = clientConfig.uiLibrary || config.uiLibrary;
    if (gj[type].config[uiLibrary]) {
        $.extend(true, config, gj[type].config[uiLibrary]);
    }

    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            if (gj[type].plugins[plugin].config.base) {
                $.extend(true, config, gj[type].plugins[plugin].config.base);
            }
            if (gj[type].plugins[plugin].config[uiLibrary]) {
                $.extend(true, config, gj[type].plugins[plugin].config[uiLibrary]);
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
    if (result && result.source) {
        result.dataSource = result.source;
        delete result.source;
    }
    return result;
};

gj.widget.prototype.render = function (response) {

};

gj.widget.prototype.createDoneHandler = function () {
    var $widget = this;
    return function (response) {
        $widget.render(response);
    };
};

gj.widget.prototype.reload = function (params) {
    var ajaxOptions, data = this.data();
    $.extend(data.params, params);
    if ($.isArray(data.dataSource)) {
        this.render(data.dataSource);
    } else if (typeof(data.dataSource) === 'string') {
        ajaxOptions = { url: data.dataSource, data: data.params, success: this.createDoneHandler() };
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions);
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
