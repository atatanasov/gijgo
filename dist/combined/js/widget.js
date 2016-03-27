var gj = {
    widget: {
        generateGUID: function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    },
    documentManager: {
        events: [],

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
            var events = gj.documentManager.events[eventName];
            if (events) {
                for (var i = 0; i < events.length; i++) {
                    if (events[i].widgetId === widgetId) {
                        events.splice(i, 1);
                        if (events.length === 0) {
                            $(document).off(eventName);
                            delete gj.documentManager.events[eventName];
                        }
                    }
                }
            }
        }
    }
};
