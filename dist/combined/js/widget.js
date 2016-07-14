var gj = {
    widget: function () {
        var self = this;

        self.getHTMLConfiguration = function () {
            var result = this.data(),
                width = this.attr('width');
            if (width) {
                result.width = width;
            }
            if (result && result.source) {
                result.dataSource = result.source;
                delete result.source;
            }
            return result;
        };

        self.generateGUID = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };
    }
};

gj.widget.prototype.init = function (jsConfig, type) {
    var clientConfig, plugin, option, data;

    clientConfig = $.extend(true, {}, this.getHTMLConfiguration() || {});
    $.extend(true, clientConfig, jsConfig || {});

    if (!clientConfig.guid) {
        clientConfig.guid = this.generateGUID();
    }
    this.attr('data-guid', clientConfig.guid);

    clientConfig.type = type;
    this.attr('data-type', type);

    //Initialize events configured as options
    for (option in clientConfig) {
        if (gj[type].events.hasOwnProperty(option)) {
            this.on(option, clientConfig[option]);
            delete clientConfig[option];
        }
    }

    //gj.grid.methods.configure(this, clientConfig);
    ////Initialize all plugins
    //for (plugin in gj.grid.plugins) {
    //    if (gj.grid.plugins.hasOwnProperty(plugin)) {
    //        gj.grid.plugins[plugin].configure(this, clientConfig);
    //    }
    //}

    this.data(clientConfig);
    //gj.grid.methods.initialize(this);
    return this;
};

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
