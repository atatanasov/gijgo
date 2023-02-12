/*
 * Gijgo JavaScript Library v2.0.0-alpha-1
 * http://gijgo.com/
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
let gj = {};

/**
  * @widget Core
  * @plugin Base
  */
 gj.core = {
    messages: {
        'en-us': {
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],            
            weekDaysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            weekDaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            am: 'AM',
            pm: 'PM',
            ok: 'Ok',
            cancel: 'Cancel',
            titleFormat: 'mmmm yyyy'
        }
    },

    /** 
     * @method
     * @example String.1
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.parseDate('02/03/23', 'mm/dd/yy');
     * </script>
     * @example String.2
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.parseDate('2023 2.3', 'yyyy m.d');
     * </script>
     * @example String.dd.mmm.yyyy
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.parseDate('05 Feb 2023', 'dd mmm yyyy');
     * </script>
     * @example String.dd.mmmm.yyyy
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.parseDate('05 February 2023', 'dd mmmm yyyy');
     * </script>
     * @example String.HH:MM
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.parseDate('10:57', 'HH:MM');
     * </script>
     * @example ASP.NET.JSON.Date
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.parseDate("\/Date(349653600000)\/");
     * </script>
     * @example UNIX.Timestamp
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.parseDate(349653600000);
     * </script>
     */
    parseDate: function (value, format, locale) {
        let i, year = 0, month = 0, date = 1, hour = 0, minute = 0, mode = null, dateParts, formatParts, result;

        if (value && typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                result = new Date(value);
            } else if (value.indexOf('/Date(') > -1) {
                result = new Date(parseInt(value.substr(6), 10));
            } else if (value) {
                formatParts = format.split(/[\s,-\.//\:]+/);
                // Split only by spaces
                dateParts = value.split(/[\s]+/);
                // Split by other chars if the split by spaces doesn't work
                if (dateParts.length != formatParts.length) {
                    dateParts = value.split(/[\s,-\.//\:]+/);
                }
                for (i = 0; i < formatParts.length; i++) {
                    if (['d', 'dd'].indexOf(formatParts[i]) > -1) {
                        date = parseInt(dateParts[i], 10);
                    } else if (['m', 'mm'].indexOf(formatParts[i]) > -1) {
                        month = parseInt(dateParts[i], 10) - 1;
                    } else if ('mmm' === formatParts[i]) {
                        month = gj.core.messages[locale || 'en-us'].monthShortNames.indexOf(dateParts[i]);
                    } else if ('mmmm' === formatParts[i]) {
                        month = gj.core.messages[locale || 'en-us'].monthNames.indexOf(dateParts[i]);
                    } else if (['yy', 'yyyy'].indexOf(formatParts[i]) > -1) {
                        year = parseInt(dateParts[i], 10);
                        if (formatParts[i] === 'yy') {
                            year += 2000;
                        }
                    } else if (['h', 'hh', 'H', 'HH'].indexOf(formatParts[i]) > -1) {
                        hour = parseInt(dateParts[i], 10);
                    } else if (['M', 'MM'].indexOf(formatParts[i]) > -1) {
                        minute = parseInt(dateParts[i], 10);
                    }
					else if (['tt', 'TT'].indexOf(formatParts[i]) > -1) {
                        mode = dateParts[i];
                    }
                }

				if (hour == 12 && (mode === "am" || mode === "AM")) {
					hour = 0;
				}
				if (hour < 12 && (mode === "pm" || mode === "PM")) {
					hour += 12;
				}
                result = new Date(year, month, date, hour, minute);
            }
        } else if (typeof value === 'number') {
            result = new Date(value);
        } else if (value instanceof Date) {
            result = value;
        }

        return result;
    },

    /** 
     * @method
     * @example Sample.1
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.formatDate(new Date(2023, 1, 3), 'mm/dd/yy');
     * </script>
     * @example Sample.2
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.formatDate(new Date(2023, 1, 3), 'yyyy m.d');
     * </script>
     * @example Sample.dd.mmm.yyyy
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.formatDate(new Date(2023, 1, 3), 'dd mmm yyyy');
     * </script>
     * @example Sample.dd.mmmm.yyyy
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.formatDate(new Date(2023, 1, 3), 'dd mmmm yyyy');
     * </script>
     * @example Sample.5
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.formatDate(new Date(2023, 1, 3, 20, 43, 53), 'hh:MM:ss tt mm/dd/yyyy');
     * </script>
     * @example Sample.6
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.formatDate(new Date(2023, 1, 3, 20, 43, 53), 'hh:MM TT');
     * </script>
     * @example Short.WeekDay
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.formatDate(new Date(2023, 1, 3), 'ddd, mmm dd');
     * </script>
     * @example Full.WeekDay
     * <div id="date"></div>
     * <script>
     *     document.getElementById('date').innerText = gj.core.formatDate(new Date(2023, 1, 3), 'dddd, mmm dd');
     * </script>
     */
    formatDate: function (date, format, locale) {
        let result = '', separator, tmp,
            formatParts = format.split(/[\s,-\.//\:]+/),
            separators = format.split(/s+|M+|H+|h+|t+|T+|d+|m+|y+/);

        separators = separators.splice(1, separators.length - 2);

        for (i = 0; i < formatParts.length; i++) {
            separator = (separators[i] || '');
            switch (formatParts[i]) {
                case 's':
                    result += date.getSeconds() + separator;
                    break;
                case 'ss':
                    result += gj.core.pad(date.getSeconds()) + separator;
                    break;
                case 'M':
                    result += date.getMinutes() + separator;
                    break;
                case 'MM':
                    result += gj.core.pad(date.getMinutes()) + separator;
                    break;
                case 'H':
                    result += date.getHours() + separator;
                    break;
                case 'HH':
                    result += gj.core.pad(date.getHours()) + separator;
                    break;
                case 'h':					
					tmp = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
					tmp = tmp == 0 ? 12 : tmp;
                    result += tmp + separator;
                    break;
                case 'hh':
                    tmp = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
					tmp = tmp == 0 ? 12 : tmp;
					result += gj.core.pad(tmp) + separator;
                    break;
                case 'tt':
                    result += (date.getHours() >= 12 ? 'pm' : 'am') + separator;
                    break;
                case 'TT':
                    result += (date.getHours() >= 12 ? 'PM' : 'AM') + separator;
                    break;
                case 'd':
                    result += date.getDate() + separator;
                    break;
                case 'dd':
                    result += gj.core.pad(date.getDate()) + separator;
                    break;
                case 'ddd':
                    result += gj.core.messages[locale || 'en-us'].weekDaysShort[date.getDay()] + separator;
                    break;
                case 'dddd':
                    result += gj.core.messages[locale || 'en-us'].weekDays[date.getDay()] + separator;
                    break;
                case 'm' :
                    result += (date.getMonth() + 1) + separator;
                    break;
                case 'mm':
                    result += gj.core.pad(date.getMonth() + 1) + separator;
                    break;
                case 'mmm':
                    result += gj.core.messages[locale || 'en-us'].monthShortNames[date.getMonth()] + separator;
                    break;
                case 'mmmm':
                    result += gj.core.messages[locale || 'en-us'].monthNames[date.getMonth()] + separator;
                    break;
                case 'yy' :
                    result += date.getFullYear().toString().substr(2) + separator;
                    break;
                case 'yyyy':
                    result += date.getFullYear() + separator;
                    break;
            }
        }

        return result;
    },

    pad: function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
            val = '0' + val;
        }
        return val;
    },

    center: function (element) {
        let left, top;
        element.style.position = 'absolute';
        left = (window.innerWidth / 2) - (gj.core.width(element, true) / 2),
        top = (window.innerHeight / 2) - (gj.core.height(element, true) / 2);
        element.style.left = (left > 0 ? left : 0) + 'px';
        element.style.top = (top > 0 ? top : 0) + 'px';
    },

    isIE: function () {
        return !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
    },

    setChildPosition: function (mainEl, childEl) {
        let mainElRect = mainEl.getBoundingClientRect(),
            mainElHeight = gj.core.height(mainEl, true),
            childElHeight = gj.core.height(childEl, true),
            mainElWidth = gj.core.width(mainEl, true),
            childElWidth = gj.core.width(childEl, true),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        if ((mainElRect.top + mainElHeight + childElHeight) > window.innerHeight && mainElRect.top > childElHeight) {
            childEl.style.top = Math.round(mainElRect.top + scrollY - childElHeight - 3) + 'px';
        } else {
            childEl.style.top = Math.round(mainElRect.top + scrollY + mainElHeight + 3) + 'px';
        }

        if (mainElRect.left + childElWidth > document.body.clientWidth) {
            childEl.style.left = Math.round(mainElRect.left + scrollX + mainElWidth - childElWidth) + 'px';
        } else {
            childEl.style.left = Math.round(mainElRect.left + scrollX) + 'px';
        }
    },

    height: function (el, margin) {
        let result, style = window.getComputedStyle(el);

        if (style.boxSizing === 'border-box') { // border-box include padding and border within the height
            result = parseInt(style.height, 10);
            if (gj.core.isIE()) {
                result += parseInt(style.paddingTop || 0, 10) + parseInt(style.paddingBottom || 0, 10);
                result += parseInt(style.borderTopWidth || 0, 10) + parseInt(style.borderBottomWidth || 0, 10);
            }
        } else {
            result = parseInt(style.height, 10);
            result += parseInt(style.paddingTop || 0, 10) + parseInt(style.paddingBottom || 0, 10);
            result += parseInt(style.borderTopWidth || 0, 10) + parseInt(style.borderBottomWidth || 0, 10);
        }

        if (margin) {
            result += parseInt(style.marginTop || 0, 10) + parseInt(style.marginBottom || 0, 10);
        }

        return result;
    },

    width: function (el, margin) {
        let result, style = window.getComputedStyle(el);

        if (style.boxSizing === 'border-box') { // border-box include padding and border within the width
            result = parseInt(style.width, 10);
        } else {
            result = parseInt(style.width, 10);
            result += parseInt(style.paddingLeft || 0, 10) + parseInt(style.paddingRight || 0, 10);
            result += parseInt(style.borderLeftWidth || 0, 10) + parseInt(style.borderRightWidth || 0, 10);
        }

        if (margin) {
            result += parseInt(style.marginLeft || 0, 10) + parseInt(style.marginRight || 0, 10);
        }

        return result;
    },

    addClasses: function (el, classes) {
        if (el && classes) {
            let i, arr = classes.split(' ');
            for (i = 0; i < arr.length; i++) {
                el.classList.add(arr[i]);
            }
        }
        return el;
    },

    removeClasses: function (el, classes) {
        if (el && classes) {
            let i, arr = classes.split(' ');
            for (i = 0; i < arr.length; i++) {
                el.classList.remove(arr[i]);
            }
        }
        return el;
    },

    createElement: function (htmlString) {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    },

    position: function (el) {
        let xScroll, yScroll, left = 0, top = 0,
            height = gj.core.height(el),
            width = gj.core.width(el);

        while (el) {
            if (el.tagName == "BODY") {
                xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                yScroll = el.scrollTop || document.documentElement.scrollTop;
                left += el.offsetLeft - xScroll; // + el.clientLeft);
                top += el.offsetTop - yScroll; // + el.clientTop);
            } else {
                left += el.offsetLeft - el.scrollLeft; // + el.clientLeft;
                top += el.offsetTop - el.scrollTop; // + el.clientTop;
            }

            el = el.offsetParent;
        }

        return { top: top, left: left, bottom: top + height, right: left + width };
    },

    setCaretAtEnd: function (elem) {
        let elemLen;
        if (elem) {
            elemLen = elem.value.length;
            if (document.selection) { // For IE Only
                elem.focus();
                let oSel = document.selection.createRange();
                oSel.moveStart('character', -elemLen);
                oSel.moveStart('character', elemLen);
                oSel.moveEnd('character', 0);
                oSel.select();
            } else if (elem.selectionStart || elem.selectionStart == '0') { // Firefox/Chrome                
                elem.selectionStart = elemLen;
                elem.selectionEnd = elemLen;
                elem.focus();
            }
        }
    },

    getScrollParent: function (node) {
        if (node == null) {
            return null;
        } else if (node.scrollHeight > node.clientHeight) {
            return node;
        } else {
            return gj.core.getScrollParent(node.parentNode);
        }
    },
    
    extend: function () {
        for (let i = 1; i < arguments.length; i++) {
            for (let key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    if (typeof arguments[0][key] === 'object') {
                        arguments[0][key] = gj.core.extend(arguments[0][key], arguments[i][key]);
                    } else {
                        arguments[0][key] = arguments[i][key];
                    }
                }
            }
        }
        return arguments[0];
    },

    css: function(el, prop, val) {
        val = isNaN(val) ? val : val + 'px';
        el.style[prop] = val;
    },

    wrap: function(el, tagName, config) {
        let wrapper = el.parentNode.getAttribute('data-gj-role') === 'wrapper' ? el.parentNode : null;
        if (!wrapper) {
            wrapper = document.createElement(tagName);
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
        }
        if (config) {
            gj.core.addClasses(wrapper, config.style.wrapper);
        }
        wrapper.setAttribute('data-gj-role', 'wrapper');
        return wrapper;
    },

    unwrap: function(el) {
        let wrapper = el.parentNode.getAttribute('data-gj-role') === 'wrapper' ? el.parentNode : null;
        if (wrapper) {
            wrapper.parentNode.insertBefore(el, wrapper);
            wrapper.remove();
        }
    },

    select: function(el, expression) {
        let result = null,
            tags = expression.split('>'),
            children = el.children,
            tagName, attr, attrVal;
        for (const tag of tags) {
            tagName = tag.indexOf('[') === -1 ? tag : tag.substring(0, tag.indexOf('['));
            attr = tag.indexOf('[') === -1 ? '' : tag.substring(tag.indexOf('[') + 1, tag.indexOf('='));
            attrVal = tag.indexOf('[') === -1 ? '' : tag.substring(tag.indexOf('=') + 2, tag.lastIndexOf('"'));
            for (const chld of children) {
                if ((!tagName || chld.tagName.toUpperCase() === tagName.toUpperCase())
                 && (!(attr && attrVal) || chld.getAttribute(attr) == attrVal)) {
                    result = chld;
                    children = chld.children;
                    break;
                } else {
                    result = null;
                }
            }
        }
        return result;
    },

    selectAll: function(el, expression) {
        let result = [],
            tags = expression.split('>'),
            children = el.children,
            tagName, attr, attrVal;
        for (const tag of tags) {
            tagName = tag.indexOf('[') === -1 ? tag : tag.substring(0, tag.indexOf('['));
            attr = tag.indexOf('[') === -1 ? '' : tag.substring(tag.indexOf('[') + 1, tag.indexOf('='));
            attrVal = tag.indexOf('[') === -1 ? '' : tag.substring(tag.indexOf('=') + 2, tag.lastIndexOf('"'));
            for (const chld of children) {
                if ((!tagName || chld.tagName.toUpperCase() === tagName.toUpperCase())
                 && (!(attr && attrVal) || chld.getAttribute(attr) == attrVal)) {
                    if (tag == tags[tags.length - 1]) {
                        result.push(chld);
                    }
                    children = chld.children;
                }
            }
        }
        return result;
    },

    on: function(el, event, func) {
        el.addEventListener(event, func);
        window.gijgoStorage.put(el, event, func);
        return el;
        
    },

    off: function(el, event) {
        if (event) {
            let func = window.gijgoStorage.get(el, event);
            if (func) {
                el.removeEventListener(event, func);
                window.gijgoStorage.remove(el, event);
            }
        } else {
            let funcs = window.gijgoStorage.getAll(el);
            if (funcs) {
                for (const [key, value] of funcs) {
                    if (typeof(value) === 'function') {
                        el.removeEventListener(key, value);
                        window.gijgoStorage.remove(el, key);
                    }
                }
            }
        }
        return el;
    }
};

window.gijgoStorage = {
    _storage: new WeakMap(),
    put: function (el, key, obj) {
        if (!this._storage.get(el)) {
            this._storage.set(el, new Map());
        }
        this._storage.get(el).set(key, obj);
    },
    get: function (el, key) {
        let result = undefined,
            store = this._storage.get(el);
        if (store) {
            result = store.get(key);
        }
        return result;
    },
    getAll: function (el) {
        return this._storage.get(el);
    },
    has: function (el, key) {
        return this._storage.get(el).has(key);
    },
    remove: function (el, key) {
        let ret = this._storage.get(el).delete(key);
        if (this._storage.get(key) && !this._storage.get(key).size === 0) {
            this._storage.delete(el);
        }
        return ret;
    }
};

gj.widget = function () {
    let self = this;

    self.xhr = null;

    self.type = null;

    self.getConfig = function() {
        return window.gijgoStorage.get(this.element, this.type);
    };

    self.setConfig = function(config) {
        window.gijgoStorage.put(this.element, this.type, config);
    };

    self.removeConfig = function() {
        window.gijgoStorage.remove(this.element, this.type);
    };

    self.getRecords = function() {
        return window.gijgoStorage.get(this.element, 'records');
    };

    self.setRecords = function(records) {
        window.gijgoStorage.put(this.element, 'records', records);
    };

    self.removeRecords = function() {
        return window.gijgoStorage.remove(this.element, 'records');
    };

    self.getTotalRecords = function() {
        return window.gijgoStorage.get(this.element, 'totalRecords');
    };

    self.setTotalRecords = function(records) {
        window.gijgoStorage.put(this.element, 'totalRecords', records);
    };

    self.removeTotalRecords = function() {
        return window.gijgoStorage.remove(this.element, 'totalRecords');
    };

    self.on = function(event, func) {
        return gj.core.on(this.element, event, func);
    }

    self.off = function(event) {
        return gj.core.off(this.element, event);
    }

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

    self.extend = function () {
        return gj.core.extend.apply(null, arguments);
    };

    self.wrap = function(tagName) {
        return gj.core.wrap(this.element, tagName, this.getConfig());
    };

    self.unwrap = function() {
        gj.core.unwrap(this.element);
    };
};

gj.widget.prototype.init = function (jsConfig) {
    let option, clientConfig, fullConfig, type = this.type;

    clientConfig = this.extend({}, this.readHTMLConfig() || {});
    this.extend(clientConfig, jsConfig || {});
    fullConfig = this.readConfig(clientConfig);
    this.element.setAttribute('data-gj-guid', fullConfig.guid);
    this.setConfig(fullConfig);

    // Initialize events configured as options
    for (option in fullConfig) {
        if (gj[type].events.hasOwnProperty(option)) {
            this.element.addEventListener(option, fullConfig[option]);
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

gj.widget.prototype.readConfig = function (clientConfig) {
    let config, uiLibrary, iconsLibrary, plugin, type = this.type;

    config = this.extend({}, gj[type].config.base);

    uiLibrary = clientConfig.hasOwnProperty('uiLibrary') ? clientConfig.uiLibrary : config.uiLibrary;
    if (gj[type].config[uiLibrary]) {
        this.extend(config, gj[type].config[uiLibrary]);
    }

    iconsLibrary = clientConfig.hasOwnProperty('iconsLibrary') ? clientConfig.iconsLibrary : config.iconsLibrary;
    if (gj[type].config[iconsLibrary]) {
        this.extend(config, gj[type].config[iconsLibrary]);
    }

    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            this.extend(config, gj[type].plugins[plugin].config.base);
            if (gj[type].plugins[plugin].config[uiLibrary]) {
                this.extend(config, gj[type].plugins[plugin].config[uiLibrary]);
            }
            if (gj[type].plugins[plugin].config[iconsLibrary]) {
                this.extend(config, gj[type].plugins[plugin].config[iconsLibrary]);
            }
        }
    }

    this.extend(config, clientConfig);

    if (!config.guid) {
        config.guid = this.generateGUID();
    }

    return config;
};

gj.widget.prototype.readHTMLConfig = function () {
    let result = {},
        attrs = this.element.attributes;
    if (attrs['width']) {
        result.width = attrs['width'].value;
    }
    if (attrs['height']) {
        result.height = attrs['height'].value;
    }
    if (attrs['value']) {
        result.value = attrs['value'].value;
    }
    if (attrs['align']) {
        result.align = attrs['align'].value;
    }
    if (attrs['placeholder']) {
        result.placeholder = attrs['placeholder'].value;
    }
    for (let dataEl in this.element.dataset) {
        if (dataEl.startsWith('gj')) {
            result[dataEl.charAt(2).toLowerCase() + dataEl.slice(3)] = this.element.dataset[dataEl];
        }
    }
    if (result && result.source) {
        result.dataSource = result.source;
        delete result.source;
    }
    return result;
};

gj.widget.prototype.createDoneHandler = function () {
    let widget = this;
    return function (e) {
        let response = this.response;
        if (typeof (response) === 'string' && JSON) {
            response = JSON.parse(response);
        }
        gj[widget.type].methods.render(widget, response);
    };
};

gj.widget.prototype.createErrorHandler = function () {
    return function (response) {
        if (response && response.statusText && response.statusText !== 'abort') {
            alert(response.statusText);
        }
    };
};

gj.widget.prototype.reload = function (params) {
    let url, ajaxOptions, result, data = this.getConfig();
    if (data.dataSource === undefined) {
        gj[this.type].methods.useHtmlDataSource(this, data);
    }
    this.extend(data.params, params);
    if (Array.isArray(data.dataSource)) {
        result = gj[this.type].methods.filter(this);
        gj[this.type].methods.render(this, result);
    } else if (typeof(data.dataSource) === 'string') {
        url = data.dataSource;
        if (data.params && Object.keys(data.params).length > 0) {
            url = url + '?' + new URLSearchParams(data.params).toString();
        }
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', url , true);
        this.xhr.onload = this.createDoneHandler();
        this.xhr.onerror = this.createErrorHandler();
        this.xhr.send();
    } else if (typeof (data.dataSource) === 'object') {
        if (!data.dataSource.data) {
            data.dataSource.data = {};
        }
        this.extend(data.dataSource.data, data.params);
        ajaxOptions = this.extend({}, data.dataSource); //clone dataSource object
        if (ajaxOptions.dataType === 'json' && typeof(ajaxOptions.data) === 'object') {
            ajaxOptions.data = JSON.stringify(ajaxOptions.data);
        }

        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', data.dataSource.url, true);
        this.xhr.onload = (ajaxOptions.success) ? ajaxOptions.success : this.createDoneHandler();
        this.xhr.onerror = (ajaxOptions.error) ? ajaxOptions.error : this.createErrorHandler();
        this.xhr.send();
    }
    return this;
}

gj.documentManager = {
    events: {},

    subscribeForEvent: function (eventName, widgetId, callback) {
        if (!gj.documentManager.events[eventName] || gj.documentManager.events[eventName].length === 0) {
            gj.documentManager.events[eventName] = [{ widgetId: widgetId, callback: callback }];
            document.addEventListener(eventName, gj.documentManager.executeCallbacks);
        } else if (!gj.documentManager.events[eventName][widgetId]) {
            gj.documentManager.events[eventName].push({ widgetId: widgetId, callback: callback });
        } else {
            throw 'Event ' + eventName + ' for widget with guid="' + widgetId + '" is already attached.';
        }
    },

    executeCallbacks: function (e) {
        let callbacks = gj.documentManager.events[e.type];
        if (callbacks) {
            for (let i = 0; i < callbacks.length; i++) {
                callbacks[i].callback(e);
            }
        }
    },

    unsubscribeForEvent: function (eventName, widgetId) {
        let success = false,
            events = gj.documentManager.events[eventName];
        if (events) {
            for (let i = 0; i < events.length; i++) {
                if (events[i].widgetId === widgetId) {
                    events.splice(i, 1);
                    success = true;
                    if (events.length === 0) {
                        document.removeEventListener(eventName, gj.documentManager.executeCallbacks);
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
            gj.core.css(wrapper, 'width', data.width);
        }

        input.value = data.value || '';
        gj.core.addClasses(input, data.style.input);
        input.setAttribute('role', 'input');

        if (data.fontSize) {
            input.style.fontSize = data.fontSize;
        }

        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4' || data.uiLibrary === 'bootstrap5') {
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
            } else if (data.uiLibrary === 'bootstrap5') {
                rightIcon = document.createElement('button');
                rightIcon.classList.add('btn', 'btn-outline-secondary', 'border-left-0');
                rightIcon.innerHTML = data.icons.rightIcon;
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
    this.type = type;
    gj.widget.prototype.init.call(this, jsConfig);
    this.element.setAttribute('data-' + type, 'true');
    gj.picker.methods.initialize(this, gijgoStorage.get(this.element, this.type), gj[type].methods);
    return this;
};

gj.picker.widget.prototype.open = function (type) {
    var data = gijgoStorage.get(this.element, this.type),
        picker = document.body.querySelector('[role="picker"][data-gj-guid="' + this.element.getAttribute('data-gj-guid') + '"]');

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
    var data = gijgoStorage.get(this.element, type),
        picker = document.body.querySelector('[role="picker"][data-gj-guid="' + this.element.getAttribute('data-gj-guid') + '"]');
    picker.style.display = 'none';
    if (data.modal) {
        picker.parentElement.style.display = 'none';
    }
    gj[type].events.close(this.element);
    return this;
};

gj.picker.widget.prototype.destroy = function (type) {
    var data = gijgoStorage.get(this.element, type),
        parent = this.element.parentElement,
        picker = document.body.querySelector('[role="picker"][data-gj-guid="' + this.element.getAttribute('data-gj-guid') + '"]'),
        rightIcon = this.element.parentElement.querySelector('[role="right-icon"]');
    if (data) {
        //this.off();
        if (parent.getAttribute('role') === 'modal') {
            this.element.outerHTML = this.element.innerHTML;
        }
        gijgoStorage.remove(this.element, type);
        this.element.removeAttribute('data-type');
        this.element.removeAttribute('data-gj-guid');
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
/* global window alert jQuery */
/** 
 * @widget Dialog 
 * @plugin Base
 */
gj.dialog = {
    plugins: {},
    messages: {}
};

gj.dialog.config = {
    base: {
        /** If set to true, the dialog will automatically open upon initialization.
         * If false, the dialog will stay hidden until the open() method is called.
         * @type boolean
         * @default true
         * @example True <!-- nojquery, dialog.base, draggable -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), { autoOpen: true });
         * </script>
         * @example False <!-- dialog.base, draggable, bootstrap4 -->
         * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <button onclick="dialog.open()" class="btn btn-default">Open Dialog</button>
         * <script>
         *     var dialog = new GijgoDialog(document.getElementById('dialog'), { uiLibrary: 'bootstrap4', autoOpen: false });
         * </script>
         */
        autoOpen: true,

        /** Specifies whether the dialog should have a close button in right part of dialog header.
         * @type boolean
         * @default true
         * @example True <!-- dialog.base, draggable -->
         * <div id="dialog">
         *     <div data-gj-role="header"><h4 data-gj-role="title">Dialog</h4></div>
         *     <div data-gj-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         *     <div data-gj-role="footer">
         *         <button data-gj-role="close" class="gj-button-md">Ok</button>
         *         <button data-gj-role="close" class="gj-button-md">Cancel</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
         *         closeButtonInHeader: true,
         *         height: 200
         *     });
         * </script>
         * @example False <!-- dialog.base, draggable -->
         * <div id="dialog">
         *     <div data-gj-role="header"><h4 data-gj-role="title">Dialog</h4></div>
         *     <div data-gj-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         *     <div data-gj-role="footer">
         *         <button data-gj-role="close" class="gj-button-md">Ok</button>
         *         <button data-gj-role="close" class="gj-button-md">Cancel</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
         *         closeButtonInHeader: false
         *     });
         * </script>
         */
        closeButtonInHeader: true,

        /** Specifies whether the dialog should close when it has focus and the user presses the escape (ESC) key.
         * @type boolean
         * @default true
         * @example True <!-- dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         closeOnEscape: true
         *     });
         * </script>
         * @example False <!-- dialog.base, draggable -->
         * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         closeOnEscape: false
         *     });
         * </script>
         */
        closeOnEscape: true,

        /** If set to true, the dialog will be draggable by the title bar.
         * @type boolean
         * @default true
         * @example True <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         draggable: true
         *     });
         * </script>
         * @example False <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         draggable: false
         *     });
         * </script>
         */
        draggable: true,

        /** The height of the dialog.
         * @additionalinfo Support string and number values. The number value sets the height in pixels.
         * The only supported string value is "auto" which will allow the dialog height to adjust based on its content.
         * @type (number|string)
         * @default "auto"
         * @example Short.Text <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         height: 200
         *     });
         * </script>
         * @example Long.Text.Material.Design <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         height: 350
         *     });
         * </script>
         * @example Long.Text.Bootstrap3 <!-- bootstrap, draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         height: 350,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Long.Text.Bootstrap4 <!-- bootstrap4, draggable, dialog.base -->
         * <div id="dialog" data-gj-ui-library="bootstrap4" height="350">
         *     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.
         * </div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'));
         * </script>
         */
        height: 'auto',

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example French.Default <!-- draggable, dialog.base-->
         * <!-- <script src="../../dist/combined/js/messages/messages.fr-fr.js"></script> -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         locale: 'fr-fr'
         *     });
         * </script>
         * @example French.Custom <!-- draggable, dialog.base -->
         * <!-- <script src="../../dist/combined/js/messages/messages.fr-fr.js"></script> -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     gj.dialog.messages['fr-fr'].DefaultTitle = 'Titre de la boîte de dialogue';
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         locale: 'fr-fr',
         *         width: 700
         *     });
         * </script>
         */
        locale: 'en-us',

        /** The maximum height in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable, dialog.base -->
         * <div id="dialog">The maximum height of this dialog is set to 300 px. Try to resize it for testing.</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         resizable: true,
         *         height: 200,
         *         maxHeight: 300
         *     });
         * </script>
         */
        maxHeight: undefined,

        /** The maximum width in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable, dialog.base -->
         * <div id="dialog">The maximum width of this dialog is set to 400 px. Try to resize it for testing.</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         resizable: true,
         *         maxWidth: 400
         *     });
         * </script>
         */
        maxWidth: undefined,

        /** The minimum height in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable, dialog.base -->
         * <div id="dialog">The minimum height of this dialog is set to 200 px. Try to resize it for testing.</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         resizable: true,
         *         height: 300,
         *         minHeight: 200
         *     });
         * </script>
         */
        minHeight: undefined,

        /** The minimum width in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable, dialog.base -->
         * <div id="dialog">The minimum width of this dialog is set to 200 px. Try to resize it for testing.</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         resizable: true,
         *         minWidth: 200
         *     });
         * </script>
         */
        minWidth: undefined,

        /** If set to true, the dialog will have modal behavior.
         * Modal dialogs create an overlay below the dialog, but above other page elements and you can't interact with them.
         * @type boolean
         * @default false
         * @example True.Material.Design <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         modal: true
         *     });
         * </script>
         * @example True.Bootstrap.4 <!-- bootstrap4, draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         modal: true,
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         * @example True.Bootstrap.5 <!-- bootstrap5, draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         modal: true,
         *         uiLibrary: 'bootstrap5',
         *         height: 300
         *     });
         * </script>
         * @example False <!-- draggable, dialog.base, bootstrap -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         modal: false
         *     });
         * </script>
         */
        modal: false,

        /** If set to true, the dialog will be resizable.
         * @type boolean
         * @default false
         * @example True <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         resizable: true
         *     });
         * </script>
         * @example True.Bootstrap5 <!-- bootstrap5, draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         resizable: true,
         *         uiLibrary: 'bootstrap5',
         *         maxHeight: 500
         *     });
         * </script>
         * @example False <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         resizable: false
         *     });
         * </script>
         */
        resizable: false,

        /** If set to true, add vertical scroller to the dialog body.
         * @type Boolean
         * @default false
         * @example Bootstrap.3 <!-- bootstrap, draggable, dialog.base -->
         * <div id="dialog">
         *     <div data-gj-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         *     <div data-gj-role="footer">
         *         <button class="btn btn-default" data-gj-role="close">Cancel</button>
         *         <button class="btn btn-default" data-gj-role="close">OK</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
         *         scrollable: true,
         *         height: 300,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         scrollable: true,
         *         height: 300,
         *         uiLibrary: 'bootstrap5'
         *     });
         * </script>
         * @example Material.Design <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor quam in magna vulputate, vitae laoreet odio ultrices. Phasellus at efficitur magna. Mauris purus dolor, egestas quis leo et, vulputate dictum mauris. Vivamus maximus lectus sollicitudin lorem blandit tempor. Maecenas eget posuere mi. Suspendisse id hendrerit nibh. Morbi eu odio euismod, venenatis ipsum in, egestas nunc. Mauris dignissim metus ac risus porta eleifend. Aliquam tempus libero orci, id placerat odio vehicula eu. Donec tincidunt justo dolor, sit amet tempus turpis varius sit amet. Suspendisse ut ex blandit, hendrerit enim tristique, iaculis ipsum. Vivamus venenatis dolor justo, eget scelerisque lacus dignissim quis. Duis imperdiet ex at aliquet cursus. Proin non ultricies leo. Fusce quam diam, laoreet quis fringilla vitae, viverra id magna. Nam laoreet sem in volutpat rhoncus.</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         scrollable: true,
         *         height: 300,
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         */
        scrollable: false,

        /** The title of the dialog. Can be also set through the title attribute of the html element.
         * @type String
         * @default "Dialog"
         * @example Js.Config <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         title: 'My Custom Title',
         *         width: 400
         *     });
         * </script>
         * @example Html.Config <!-- draggable, dialog.base -->
         * <div id="dialog" width="400" title="My Custom Title">
         *     Lorem ipsum dolor sit amet, consectetur adipiscing elit...
         * </div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'));
         * </script>
         * @example Html.Config.2 <!-- draggable, dialog.base -->
         * <div id="dialog" width="400">
         *     <div data-gj-role="header"><div data-gj-role="title">My Custom Title</div></div>
         *     Lorem ipsum dolor sit amet, consectetur adipiscing elit...
         * </div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'));
         * </script>
         */
        title: undefined,

        /** The name of the UI library that is going to be in use. Currently we support Material Design and Bootstrap.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type string (bootstrap|materialdesign)
         * @default undefined
         * @example Bootstrap.3 <!-- draggable, dialog.base, bootstrap -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- draggable, dialog.base, bootstrap4 -->
         * <div id="dialog">
         *     <div data-gj-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         *     <div data-gj-role="footer">
         *         <button class="btn btn-default" data-gj-role="close">Cancel</button>
         *         <button class="btn btn-default" data-gj-role="close">OK</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         * @example Bootstrap.5 <!-- draggable, dialog.base, bootstrap5 -->
         * <div id="dialog">
         *     <div data-gj-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         *     <div data-gj-role="footer">
         *         <button class="btn btn-secondary" data-gj-role="close">Cancel</button>
         *         <button class="btn btn-primary" data-gj-role="close">OK</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
         *         uiLibrary: 'bootstrap5'
         *     });
         * </script>
         * @example Material.Design <!-- draggable, dialog.base  -->
         * <div id="dialog">
         *   <div data-gj-role="body">
         *     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         *     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
         *   </div>
         *   <div data-gj-role="footer">
         *     <button class="gj-button-md" data-gj-role="close">OK</button>
         *     <button class="gj-button-md" data-gj-role="close">Cancel</button>
         *   </div>
         * </div>
         * <script>
         *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
         *         uiLibrary: 'materialdesign',
         *         resizable: true
         *     });
         * </script>
         */
        uiLibrary: undefined,

        /** The width of the dialog.
         * @type number
         * @default 300
         * @example Fixed.Width <!-- draggable, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         width: 400
         *     });
         * </script>
         * @example Auto.Width <!-- draggable, dialog.base -->
         * <div id="dialog" title="Wikipedia">
         *   <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png" width="420"/>
         * </div>
         * <script>
         *     new GijgoDialog(document.getElementById('dialog'), {
         *         width: 'auto'
         *     });
         * </script>
         */
        width: 300,

        style: {
            modal: 'gj-modal',
            content: 'gj-dialog-md',
            header: 'gj-dialog-md-header gj-unselectable',
            headerTitle: 'gj-dialog-md-title',
            headerCloseButton: 'gj-dialog-md-close',
            body: 'gj-dialog-md-body',
            footer: 'gj-dialog-footer gj-dialog-md-footer'
        }
    },

    bootstrap: {
        style: {
            modal: 'modal',
            content: 'modal-content gj-dialog-bootstrap',
            header: 'modal-header',
            headerTitle: 'modal-title',
            headerCloseButton: 'close',
            body: 'modal-body',
            footer: 'gj-dialog-footer modal-footer'
        }
    },

    bootstrap4: {
        style: {
            modal: 'modal',
            content: 'modal-content gj-dialog-bootstrap4',
            header: 'modal-header',
            headerTitle: 'modal-title',
            headerCloseButton: 'close',
            body: 'modal-body',
            footer: 'gj-dialog-footer modal-footer'
        }
    },

    bootstrap5: {
        style: {
            modal: 'gj-modal',
            content: 'modal modal-content gj-dialog-bootstrap5',
            header: 'modal-header',
            headerTitle: 'modal-title',
            headerCloseButton: 'btn-close',
            body: 'modal-body',
            footer: 'gj-dialog-footer modal-footer'
        }
    }
};
/** 
  * @widget Dialog 
  * @plugin Base
  */
gj.dialog.events = {
    /**
     * Triggered when the dialog is initialized.
     *
     * @event initialized
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
     *         autoOpen: false,
     *         initialized: function (e) {
     *             alert('The initialized event is fired.');
     *         }
     *     });
     * </script>
     */
    initialized: function (el) {
        return el.dispatchEvent(new Event('initialized'));
    },

    /**
     * Triggered before the dialog is opened.
     * @event opening
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
     *         autoOpen: false,
     *         opening: function (e) {
     *             alert('The opening event is fired.');
     *         },
     *         opened: function (e) {
     *             alert('The opened event is fired.');
     *         }
     *     });
     * </script>
     */
    opening: function (el) {
        return el.dispatchEvent(new Event('opening'));
    },

    /**
     * Triggered when the dialog is opened.
     * @event opened
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
     *         autoOpen: false,
     *         opening: function (e) {
     *             alert('The opening event is fired.');
     *         },
     *         opened: function (e) {
     *             alert('The opened event is fired.');
     *         }
     *     });
     * </script>
     */
    opened: function (el) {
        return el.dispatchEvent(new Event('opened'));
    },

    /**
     * Triggered before the dialog is closed.
     * @event closing
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Close the dialog in order to fire closing event.</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
     *         autoOpen: false,
     *         closing: function (e) {
     *             alert('The closing event is fired.');
     *         },
     *         closed: function (e) {
     *             alert('The closed event is fired.');
     *         }
     *     });
     * </script>
     */
    closing: function (el) {
        return el.dispatchEvent(new Event('closing'));
    },

    /**
     * Triggered when the dialog is closed.
     * @event closed
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Close the dialog in order to fire closed event.</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
     *         autoOpen: false,
     *         closing: function (e) {
     *             alert('The closing event is fired.');
     *         },
     *         closed: function (e) {
     *             alert('The closed event is fired.');
     *         }
     *     });
     * </script>
     */
    closed: function (el) {
        return el.dispatchEvent(new Event('closed'));
    },

    /**
     * Triggered while the dialog is being dragged.
     * @event drag
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = document.getElementById('logPanel');
     *     new GijgoDialog(document.getElementById('dialog'), {
     *         drag: function (e) {
     *             log.innerHTML += '<div class="row">The drag event is fired.</div>';
     *         },
     *         dragStart: function (e) {
     *             log.innerHTML += '<div class="row">The dragStart event is fired.</div>';
     *         },
     *         dragStop: function (e) {
     *             log.innerHTML += '<div class="row">The dragStop event is fired.</div>';
     *         }
     *     });
     * </script>
     */
    drag: function (el) {
        return el.dispatchEvent(new Event('drag'));
    },

    /**
     * Triggered when the user starts dragging the dialog.
     * @event dragStart
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = document.getElementById('logPanel');
     *     new GijgoDialog(document.getElementById('dialog'), {
     *         drag: function (e) {
     *             log.innerHTML += '<div class="row">The drag event is fired.</div>';
     *         },
     *         dragStart: function (e) {
     *             log.innerHTML += '<div class="row">The dragStart event is fired.</div>';
     *         },
     *         dragStop: function (e) {
     *             log.innerHTML += '<div class="row">The dragStop event is fired.</div>';
     *         }
     *     });
     * </script>
     */
    dragStart: function (el) {
        return el.dispatchEvent(new Event('dragStart'));
    },

    /**
     * Triggered after the dialog has been dragged.
     * @event dragStop
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = document.getElementById('logPanel');
     *     new GijgoDialog(document.getElementById('dialog'), {
     *         drag: function (e) {
     *             log.innerHTML += '<div class="row">The drag event is fired.</div>';
     *         },
     *         dragStart: function (e) {
     *             log.innerHTML += '<div class="row">The dragStart event is fired.</div>';
     *         },
     *         dragStop: function (e) {
     *             log.innerHTML += '<div class="row">The dragStop event is fired.</div>';
     *         }
     *     });
     * </script>
     */
    dragStop: function (el) {
        return el.dispatchEvent(new Event('dragStop'));
    },

    /**
     * Triggered while the dialog is being resized.
     * @event resize
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = document.getElementById('logPanel');
     *     new GijgoDialog(document.getElementById('dialog'), {
     *         resizable: true,
     *         resize: function (e) {
     *             log.innerHTML += '<div class="row">The resize event is fired.</div>';
     *         },
     *         resizeStart: function (e) {
     *             log.innerHTML += '<div class="row">The resizeStart event is fired.</div>';
     *         },
     *         resizeStop: function (e) {
     *             log.innerHTML += '<div class="row">The resizeStop event is fired.</div>';
     *         }
     *     });
     * </script>
     */
    resize: function (el) {
        return el.dispatchEvent(new Event('resize'));
    },

    /**
     * Triggered when the user starts resizing the dialog.
     * @event resizeStart
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = document.getElementById('logPanel');
     *     new GijgoDialog(document.getElementById('dialog'), {
     *         resizable: true,
     *         resize: function (e) {
     *             log.innerHTML += '<div class="row">The resize event is fired.</div>';
     *         },
     *         resizeStart: function (e) {
     *             log.innerHTML += '<div class="row">The resizeStart event is fired.</div>';
     *         },
     *         resizeStop: function (e) {
     *             log.innerHTML += '<div class="row">The resizeStop event is fired.</div>';
     *         }
     *     });
     * </script>
     */
    resizeStart: function (el) {
        return el.dispatchEvent(new Event('resizeStart'));
    },

    /**
     * Triggered after the dialog has been resized.
     * @event resizeStop
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = document.getElementById('logPanel');
     *     new GijgoDialog(document.getElementById('dialog'), {
     *         resizable: true,
     *         resize: function (e) {
     *             log.innerHTML += '<div class="row">The resize event is fired.</div>';
     *         },
     *         resizeStart: function (e) {
     *             log.innerHTML += '<div class="row">The resizeStart event is fired.</div>';
     *         },
     *         resizeStop: function (e) {
     *             log.innerHTML += '<div class="row">The resizeStop event is fired.</div>';
     *         }
     *     });
     * </script>
     */
    resizeStop: function (el) {
        return el.dispatchEvent(new Event('resizeStop'));
    }
};

gj.dialog.methods = {

    init: function (jsConfig) {
        var config;
        gj.widget.prototype.init.call(this, jsConfig);

        config = this.getConfig();
        gj.dialog.methods.localization(config);
        gj.dialog.methods.initialize(this, config);
        gj.dialog.methods.accessibility(this.element, config);
        gj.dialog.events.initialized(this.element);
        return this;
    },

    readHTMLConfig: function () {
        var result = gj.widget.prototype.readHTMLConfig.call(this),
            attrs = this.element.attributes;
        if (attrs['title']) {
            result.title = attrs['title'].value;
        }
        return result;
    },

    localization: function(config) {
        if (typeof config.title === 'undefined') {
            config.title = gj.dialog.messages[config.locale].DefaultTitle;
        }
    },

    initialize: function (dialog, data) {
        var data, header, body, footer, wrapper;

        gj.core.addClasses(dialog.element, data.style.content);

        gj.dialog.methods.setSize(dialog.element, data);

        if (data.closeOnEscape) {
            gj.core.on(document, 'keyup', function (e) {
                if (e.key === 'Escape') {
                    dialog.close();
                }
            });
        }

        body = dialog.element.querySelector('div[data-gj-role="body"]');
        if (!body) {
            body = document.createElement('div');
            body.setAttribute('data-gj-role', 'body');
            for(var i = 0; i < dialog.element.childNodes.length; i++)
            {
                body.appendChild(dialog.element.childNodes[i]);
            }
            dialog.element.appendChild(body);
        }
        gj.core.addClasses(body, data.style.body);

        header = gj.dialog.methods.renderHeader(dialog, data);

        footer = dialog.element.querySelector('div[data-gj-role="footer"]');
        if (footer) {
            gj.core.addClasses(footer, data.style.footer);
        }

        if (gj.draggable) {
            if (data.draggable) {
                gj.dialog.methods.draggable(dialog, header);
            }
            if (data.resizable) {
                gj.dialog.methods.resizable(dialog);
            }
        }

        if (data.scrollable && data.height) {
            dialog.element.classList.add('gj-dialog-scrollable');
            dialog.element.addEventListener('opened', function () {
                var body = dialog.element.querySelector('div[data-gj-role="body"]');
                body.style.height = (data.height - gj.core.height(header) - (footer ? gj.core.height(footer) : 0)) + 'px';
            });            
        }

        if (data.modal) {
            wrapper = document.createElement('div');
            gj.core.addClasses(wrapper, data.style.modal);
            wrapper.setAttribute('data-gj-role', 'modal');
            dialog.element.parentNode.insertBefore(wrapper, dialog.element);
            wrapper.appendChild(dialog.element);
        }

        if (data.autoOpen) {
            dialog.open();
        }
    },

    accessibility: function(el, config) {
        var id, title, titleId;

        id = el.id;
        if (!id) {
            id = el.getAttribute('data-gj-type') + Math.random().toString(16).slice(2);
            el.setAttribute('id', id);
        }

        if (!el.getAttribute('aria-labelledby')) {
            title = el.querySelector('[data-gj-role="title"]');
            titleId = title.id;
            if (!titleId) {
                titleId = id + '-title';
                title.setAttribute('id', titleId);
            }
            el.setAttribute('aria-labelledby', titleId);
        }

        if (config.modal) {
            el.setAttribute('aria-modal', 'true');
        } else {
            el.removeAttribute('aria-modal');
        }

        el.querySelectorAll('[data-gj-role="close"]').forEach(function (el) {
            el.setAttribute('aria-label', 'Close');
        });
    },

    setSize: function (el, data) {
        if (data.width) {
            gj.core.css(el, 'width', data.width);
        }
        if (data.height) {
            gj.core.css(el, 'height', data.height);
        }
    },

    renderHeader: function (dialog, data) {
        var header, title, closeButton;

        header = dialog.element.querySelector('div[data-gj-role="header"]');
        if (!header) {
            header = document.createElement('div');
            header.setAttribute('data-gj-role', 'header');
            dialog.element.insertBefore(header, dialog.element.children[0]);
        }
        gj.core.addClasses(header, data.style.header);

        title = header.querySelector('[data-gj-role="title"]');
        if (!title) {
            title = document.createElement('h4');
            title.setAttribute('data-gj-role', 'title');
            title.innerHTML = data.title;
            header.appendChild(title);
        }
        gj.core.addClasses(title, data.style.headerTitle);

        closeButton = header.querySelector('[data-gj-role="close"]');
        if (!closeButton && data.closeButtonInHeader) {
            closeButton = document.createElement('button');
            closeButton.setAttribute('type', 'button');
            closeButton.setAttribute('data-gj-role', 'close');
            closeButton.setAttribute('title', gj.dialog.messages[data.locale].Close);
            if (data.uiLibrary !== 'bootstrap5') {
                closeButton.innerHTML = '<span>×</span>';
            }
            header.appendChild(closeButton);
        } else if (closeButton && !data.closeButtonInHeader) {
            closeButton.style.display = 'node';
        } 
        if (closeButton) {
            closeButton.classList.add(data.style.headerCloseButton);            
        }

        dialog.element.querySelectorAll('[data-gj-role="close"]').forEach(function (el) {
            gj.core.on(el, 'click', function () {
                dialog.close();
            });
        });

        return header;
    },

    draggable: function (dialog, header) {
        document.body.appendChild(dialog.element);
        gj.core.addClasses(header, 'gj-draggable');
        new GijgoDraggable(dialog.element, {
            handle: header,
            start: function () {
                dialog.element.classList.add('gj-unselectable');
                gj.dialog.events.dragStart(dialog.element);
            },
            stop: function () {
                dialog.element.classList.remove('gj-unselectable');
                gj.dialog.events.dragStop(dialog.element);
            }
        });
    },

    resizable: function (dialog) {
        var config, n, e, s, w, ne, nw, sw, se,
            el = dialog.element;
        
        config = {
            'drag': gj.dialog.methods.resize(dialog.getConfig()),
            'start': function () {
                dialog.element.classList.add('gj-unselectable');
                gj.dialog.events.resizeStart(dialog.element);
            },
            'stop': function () {
                this.removeAttribute('style');
                dialog.element.classList.remove('gj-unselectable');
                gj.dialog.events.resizeStop(dialog.element);
            }
        };
        
        n = document.createElement('div');
        gj.core.addClasses(n, 'gj-resizable-handle gj-resizable-n');
        el.appendChild(n);
        new GijgoDraggable(n, gj.core.extend({ horizontal: false }, config));

        e = document.createElement('div');
        gj.core.addClasses(e, 'gj-resizable-handle gj-resizable-e');
        el.appendChild(e);
        new GijgoDraggable(e, gj.core.extend({ vertical: false }, config));

        s = document.createElement('div');
        gj.core.addClasses(s, 'gj-resizable-handle gj-resizable-s');
        el.appendChild(s);
        new GijgoDraggable(s, gj.core.extend({ horizontal: false }, config));

        w = document.createElement('div');
        gj.core.addClasses(w, 'gj-resizable-handle gj-resizable-w');
        el.appendChild(w);
        new GijgoDraggable(w, gj.core.extend({ vertical: false }, config));

        ne = document.createElement('div');
        gj.core.addClasses(ne, 'gj-resizable-handle gj-resizable-ne');
        el.appendChild(ne);
        new GijgoDraggable(ne, gj.core.extend({}, config));

        nw = document.createElement('div');
        gj.core.addClasses(nw, 'gj-resizable-handle gj-resizable-nw');
        el.appendChild(nw);
        new GijgoDraggable(nw, gj.core.extend({}, config));

        sw = document.createElement('div');
        gj.core.addClasses(sw, 'gj-resizable-handle gj-resizable-sw');
        el.appendChild(sw);
        new GijgoDraggable(sw, gj.core.extend({}, config));

        se = document.createElement('div');
        gj.core.addClasses(se, 'gj-resizable-handle gj-resizable-se');
        el.appendChild(se);
        new GijgoDraggable(se, gj.core.extend({}, config));
    },

    resize: function (dialogConfig)
    {
        return function (e) {
            var el, dialog, position, height, width, top, left, result = false;
    
            el = this;
            dialog = this.parentNode;
            position = gj.core.position(this);
            offset = { top: e.detail.newPosition.top - position.top, left: e.detail.newPosition.left - position.left };
    
            // TODO: Include margins in the calculations
            if (el.classList.contains('gj-resizable-n')) {
                height = gj.core.height(dialog) - offset.top;
                top = dialog.offsetTop + offset.top;
            } else if (el.classList.contains('gj-resizable-e')) {
                width = gj.core.width(dialog) + offset.left;
            } else if (el.classList.contains('gj-resizable-s')) {
                height = gj.core.height(dialog) + offset.top;
            } else if (el.classList.contains('gj-resizable-w')) {
                width = gj.core.width(dialog) - offset.left;
                left = dialog.offsetLeft + offset.left;
            } else if (el.classList.contains('gj-resizable-ne')) {
                height = gj.core.height(dialog) - offset.top;
                top = dialog.offsetTop + offset.top;
                width = gj.core.width(dialog) + offset.left;
            } else if (el.classList.contains('gj-resizable-nw')) {
                height = gj.core.height(dialog) - offset.top;
                top = dialog.offsetTop + offset.top;
                width = gj.core.width(dialog) - offset.left;
                left = dialog.offsetLeft + offset.left;
            } else if (el.classList.contains('gj-resizable-se')) {
                height = gj.core.height(dialog) + offset.top;
                width = gj.core.width(dialog) + offset.left;
            } else if (el.classList.contains('gj-resizable-sw')) {
                height = gj.core.height(dialog) + offset.top;
                width = gj.core.width(dialog) - offset.left;
                left = dialog.offsetLeft + offset.left;
            }
    
            if (height && (!dialogConfig.minHeight || height >= dialogConfig.minHeight) && (!dialogConfig.maxHeight || height <= dialogConfig.maxHeight)) {
                dialog.style.height = height + 'px';
                if (top) {
                    dialog.style.top = top + 'px';
                }
                result = true;
            }
    
            if (width && (!dialogConfig.minWidth || width >= dialogConfig.minWidth) && (!dialogConfig.maxWidth || width <= dialogConfig.maxWidth)) {
                dialog.style.width = width + 'px';
                if (left) {
                    dialog.style.left = left + 'px';
                }
                result = true;
            }
    
            if (result) {
                gj.dialog.events.resize(dialog);
            }
            
            return result;
        }
    },
    
    open: function (dialog, title) {
        var footer, modal, el = dialog.element;
        gj.dialog.events.opening(el);
        if (title !== undefined) {
            el.querySelector('[data-gj-role="title"]').innerHTML = title;
        }
        el.style.display = 'block';
        modal = el.closest('div[data-gj-role="modal"]');
        if (modal) {
            modal.style.display = 'block';
        }
        footer = el.querySelector('div[data-gj-role="footer"]');
        if (footer) {
            el.querySelector('div[data-gj-role="body"]').style.marginBottom = gj.core.height(footer) + 'px';
        }
        gj.core.center(el);
        gj.dialog.events.opened(el);
        return dialog;
    },

    close: function (dialog) {
        var modal, el = dialog.element;
        if (el.style.display != 'none') {
            gj.dialog.events.closing(el);
            el.style.display = 'none';
            modal = el.closest('div[data-gj-role="modal"]');
            if (modal) {
                modal.style.display = 'none';
            }
            gj.dialog.events.closed(el);
        }
        return dialog;
    },

    isOpen: function (el) {
        return el.style.display != 'none';
    },

    content: function (dialog, html) {
        var body = dialog.element.querySelector('div[data-gj-role="body"]');
        if (typeof (html) === "undefined") {
            return body.innerHTML;
        } else {
            body.innerHTML = html;
            return dialog;
        }
    },

    destroy: function (dialog, keepHtml) {
        var subEl, data = dialog.getConfig(), el = dialog.element;
        if (data) {
            dialog.off();
            dialog.removeConfig();
            if (keepHtml === false) {
                dialog.element.remove();
            } else {
                el.removeAttribute('data-gj-type');
                gj.core.removeClasses(el, data.style.content);
                gj.core.removeClasses(el.querySelector('[data-gj-role="header"]'), data.style.header);
                gj.core.removeClasses(el.querySelector('[data-gj-role="title"]'), data.style.headerTitle);
                el.querySelector('[data-gj-role="close"]').remove();
                gj.core.removeClasses(el.querySelector('[data-gj-role="body"]'), data.style.body);
                subEl = el.querySelector('[data-gj-role="footer"]');
                if (subEl) {
                    gj.core.removeClasses(subEl, data.style.footer);
                }
            }            
        }
    }
};
/** 
  * @widget Dialog 
  * @plugin Base
  */
GijgoDialog = function (element, jsConfig) {
    var self = this,
        methods = gj.dialog.methods;

    self.type = 'dialog';
    self.element = element;

    /**
     * Opens the dialog.
     * @method
     * @param {String} title - The dialog title.
     * @fires opening, opened
     * @return dialog
     * @example Sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
     *         autoOpen: false
     *     });
     * </script>
     * @example Title <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open('Custom Text')" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
     *         autoOpen: false
     *     });
     * </script>
     */
    self.open = function (title) {
        return methods.open(this, title);
    };

    /**
     * Close the dialog.
     * @method
     * @fires closing, closed
     * @return dialog
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <button onclick="dialog.close()" class="gj-button-md">Close Dialog</button>
     * <script>
     *     var dialog = new GijgoDialog(document.getElementById('dialog'));
     * </script>
     */
    self.close = function () {
        return methods.close(this);
    };

    /**
     * Check if the dialog is currently open.
     * @method
     * @return boolean
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <button onclick="dialog.close()" class="gj-button-md">Close Dialog</button>
     * <button onclick="alert(dialog.isOpen())" class="gj-button-md">isOpen</button>
     * <script>
     *     var dialog = new GijgoDialog(document.getElementById('dialog'));
     * </script>
     */
    self.isOpen = function () {
        return methods.isOpen(this.element);
    };

    /**
     * Gets or set the content of a dialog. Supports chaining when used as a setter.
     * @method
     * @param {String} content - The content of the Dialog.
     * @return String|Dialog
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="alert(dialog.content())" class="btn btn-default">Get Content</button>
     * <button onclick="dialog.content('New Test Content Value')" class="btn btn-default">Set Content</button>
     * <script>
     *     var dialog = new GijgoDialog(document.getElementById('dialog'), { uiLibrary: 'bootstrap' });
     * </script>
     */
    self.content = function (content) {
        return methods.content(this, content);
    };

    /**
     * Destroy the dialog.
     * @method
     * @param {boolean} keepHtml - If this flag is set to false, the dialog html markup will be removed from the HTML dom tree.
     * @return void
     * @example Keep.HTML.Markup <!-- draggable, dialog.base -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="create()" class="gj-button-md">Create</button>
     * <button onclick="dialog.destroy()" class="gj-button-md">Destroy</button>
     * <script>
     *     var dialog;
     *     function create() { 
     *         dialog = new GijgoDialog(document.getElementById('dialog'));
     *     }
     * </script>
     * @example Remove.HTML.Markup <!-- draggable, dialog.base -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="create()" class="gj-button-md">Create</button>
     * <button onclick="dialog.destroy(false)" class="gj-button-md">Destroy</button>
     * <script>
     *     var dialog;
     *     function create() {
     *         if (!document.getElementById('dialog')) {
     *             alert('The dialog can not be created.');
     *         } else {
     *             dialog = new GijgoDialog(document.getElementById('dialog'));
     *         }
     *     }
     * </script>
     */
    self.destroy = function (keepHtml) {
        return methods.destroy(this, keepHtml);
    };

    if ('dialog' !== element.getAttribute('data-gj-type')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDialog.prototype = new gj.widget();
GijgoDialog.constructor = GijgoDialog;

GijgoDialog.prototype.readHTMLConfig = gj.dialog.methods.readHTMLConfig;


if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.dialog = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDialog(this, method);
                } else {
                    widget = new GijgoDialog(this, null);
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
gj.dialog.messages['en-us'] = {
    Close: 'Close',
    DefaultTitle: 'Dialog'
};
/* global window alert jQuery */
/** 
 * @widget Draggable 
 * @plugin Base
 */
gj.draggable = {
    plugins: {}
};

gj.draggable.config = {
    base: {
        /** If specified, restricts dragging from starting unless the mousedown occurs on the specified element.
         * Only elements that descend from the draggable element are permitted.
         * @type jquery element
         * @default undefined
         * @example sample <!-- draggable -->
         * <style>
         * .element { border: 1px solid #999; width: 300px; height: 200px; }
         * .handle { background-color: #DDD; cursor: move; width: 200px; margin: 5px auto 0px auto; text-align: center; padding: 5px; }
         * </style>
         * <div id="element" class="element">
         *   <div id="handle" class="handle">Handle for dragging</div>
         * </div>
         * <script>
         *     new GijgoDraggable(document.getElementById('element'), {
         *         handle: document.getElementById('handle')
         *     });
         * </script>
         */
        handle: undefined,

        /** If set to false, restricts dragging on vertical direction.
         * @type Boolean
         * @default true
         * @example sample <!-- draggable -->
         * <style>
         * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
         * </style>
         * <div id="element" class="element">
         *     drag me<br/>
         *     <i>(dragging on vertical direction is disabled)</i>
         * </div>
         * <script>
         *     new GijgoDraggable(document.getElementById('element'), {
         *         vertical: false
         *     });
         * </script>
         */
        vertical: true,

        /** If set to false, restricts dragging on horizontal direction.
         * @type Boolean
         * @default true
         * @example sample <!-- draggable -->
         * <style>
         * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
         * </style>
         * <div id="element" class="element">
         *     drag me<br/>
         *     <i>(dragging on horizontal direction is disabled)</i>
         * </div>
         * <script>
         *     new GijgoDraggable(document.getElementById('element'), {
         *         horizontal: false
         *     });
         * </script>
         */
        horizontal: true,

        /** Constrains dragging to within the bounds of the specified element.
         * @type Element
         * @default undefined
         * @example sample <!-- draggable -->
         * <style>
         * .container { border: 1px solid #999; width: 600px; height: 600px; }
         * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
         * </style>
         * <div id="container" class="container">
         *     <div id="element" class="element">drag me</div>
         * </div>
         * <script>
         *     new GijgoDraggable(document.getElementById('element'), {
         *         containment: document.getElementById('container')
         *     });
         * </script>
         */
        containment: undefined
    }
};

gj.draggable.methods = {
    init: function (jsConfig) {
        var handleEl, data, dragEl = this.element;

        gj.widget.prototype.init.call(this, jsConfig);
        data = this.getConfig();
        dragEl.setAttribute('data-gj-draggable', 'true');

        handleEl = gj.draggable.methods.getHandleElement(dragEl, data);

        handleEl.addEventListener('mousedown', gj.draggable.methods.createDownHandle(this, dragEl, data));
        handleEl.addEventListener('touchstart', gj.draggable.methods.createDownHandle(this, dragEl, data));

        gj.documentManager.subscribeForEvent('mouseup', data.guid, gj.draggable.methods.createUpHandler(this, dragEl, data));
        gj.documentManager.subscribeForEvent('touchend', data.guid, gj.draggable.methods.createUpHandler(this, dragEl, data));
        gj.documentManager.subscribeForEvent('touchcancel', data.guid, gj.draggable.methods.createUpHandler(this, dragEl, data));

        return this;
    },

    createDownHandle: function (widget, dragEl, data) {
        return function (e) {
            var position = gj.core.position(dragEl);
            dragEl.style.top = position.top + 'px';
            dragEl.style.left = position.left + 'px';
            dragEl.style.position = 'fixed';

            dragEl.setAttribute('data-gj-draggable-dragging', true);
            dragEl.removeAttribute('data-gj-draggable-x');
            dragEl.removeAttribute('data-gj-draggable-y');
            gj.documentManager.subscribeForEvent('touchmove', data.guid, gj.draggable.methods.createMoveHandler(widget, dragEl, data));
            gj.documentManager.subscribeForEvent('mousemove', data.guid, gj.draggable.methods.createMoveHandler(widget, dragEl, data));
        }
    },

    getHandleElement: function (dragEl, data) {
        return data.handle ? data.handle : dragEl;
    },

    createUpHandler: function (widget, dragEl, data) {
        return function (e) {
            if (dragEl.getAttribute('data-gj-draggable-dragging') === 'true') {
                dragEl.setAttribute('data-gj-draggable-dragging', false);
                gj.documentManager.unsubscribeForEvent('mousemove', data.guid);
                gj.documentManager.unsubscribeForEvent('touchmove', data.guid);
                gj.draggable.events.stop(dragEl, { x: widget.mouseX(e), y: widget.mouseY(e) });
            }
        };
    },

    createMoveHandler: function (widget, dragEl, data) {
        return function (e) {
            var mouseX, mouseY, offsetX, offsetY, prevX, prevY;
            if (dragEl.getAttribute('data-gj-draggable-dragging') === 'true') {
                mouseX = Math.round(widget.mouseX(e));
                mouseY = Math.round(widget.mouseY(e));
                prevX = dragEl.getAttribute('data-gj-draggable-x');
                prevY = dragEl.getAttribute('data-gj-draggable-y');
                if (prevX && prevY) {
                    offsetX = data.horizontal ? mouseX - parseInt(prevX, 10) : 0;
                    offsetY = data.vertical ? mouseY - parseInt(prevY, 10) : 0;
                    gj.draggable.methods.move(dragEl, data, offsetX, offsetY, mouseX, mouseY);
                } else {
                    gj.draggable.events.start(dragEl, mouseX, mouseY);
                }
                dragEl.setAttribute('data-gj-draggable-x', mouseX);
                dragEl.setAttribute('data-gj-draggable-y', mouseY);
            }
        }
    },

    move: function (dragEl, data, offsetX, offsetY, mouseX, mouseY) {
        var contPosition, maxTop, maxLeft,
            position = gj.core.position(dragEl),
            newTop = position.top + offsetY,
            newLeft = position.left + offsetX;

        if (data.containment) {
            contPosition = gj.core.position(data.containment);
            maxTop = contPosition.top + gj.core.height(data.containment) - gj.core.height(dragEl);
            maxLeft = contPosition.left + gj.core.width(data.containment) - gj.core.width(dragEl);
            if (newTop > contPosition.top && newTop < maxTop) {
                if (contPosition.top >= mouseY || contPosition.bottom <= mouseY) {
                    newTop = position.top;
                }
            } else {
                if (newTop <= contPosition.top) {
                    newTop = contPosition.top + 1;
                } else {
                    newTop = maxTop - 1;
                }
            }
            if (newLeft > contPosition.left && newLeft < maxLeft) {
                if (contPosition.left >= mouseX || contPosition.right <= mouseX) {
                    newLeft = position.left;
                }
            } else {
                if (newLeft <= contPosition.left) {
                    newLeft = contPosition.left + 1;
                } else {
                    newLeft = maxLeft - 1;
                }
            }
        }

        if (false !== gj.draggable.events.drag(dragEl, newLeft, newTop, mouseX, mouseY)) {
            dragEl.style.top = newTop + 'px';
            dragEl.style.left = newLeft + 'px';
        }
    },

    destroy: function (dragEl) {
        if (dragEl.getAttribute('data-gj-draggable') === 'true') {
            gj.documentManager.unsubscribeForEvent('mouseup', data.guid);
            //TODO: 
            gijgoStorage.remove(dragEl, dragEl.getAttribute('data-type'));
            dragEl.removeAttribute('data-gj-guid');
            dragEl.removeAttribute('data-gj-type');
            dragEl.removeAttribute('data-gj-draggable');
            dragEl.removeAttribute('data-gj-draggable-x');
            dragEl.removeAttribute('data-gj-draggable-y');
            dragEl.removeAttribute('data-gj-draggable-dragging');
            dragEl.style.top = '';
            dragEl.style.left = '';
            dragEl.style.position = '';
            dragEl.removeEventListener('drag');
            dragEl.removeEventListener('start');
            dragEl.removeEventListener('stop');
            var handle = gj.draggable.methods.getHandleElement(dragEl, data);
            handle.removeEventListener('mousedown');
            handle.removeEventListener('touchstart');
        }
        return dragEl;
    }
};

gj.draggable.events = {
    /**
     * Triggered while the mouse is moved during the dragging, immediately before the current move happens.
     *
     * @event drag
     * @param {object} e - event data
     * @param {object} e.detail.newPosition - New position of the draggable element as { top, left } object.
     * @param {object} e.detail.mousePosition - Current mouse position as { x, y } object.
     * @example sample <!-- draggable -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element gj-unselectable">drag me</div>
     * <script>
     *     var obj = new GijgoDraggable(document.getElementById('element'), {
     *         drag: function (e) {
     *             document.body.innerHTML += '<div>The drag event is fired. New Element Position = { top:' + e.detail.newPosition.top + ', left: ' + e.detail.newPosition.left + '}.</div>';
     *         }
     *     });
     * </script>
     */
    drag: function (el, newLeft, newTop, mouseX, mouseY) {
        var event = new CustomEvent('drag', {
            detail: {
                newPosition: { left: newLeft, top: newTop },
                mousePosition: { x: mouseX, y: mouseY }
            }
        });
        return el.dispatchEvent(event);
    },

    /**
     * Triggered when dragging starts.
     *
     * @event start
     * @param {object} e - event data
     * @param {object} e.detail  - Current mouse position as { x, y } object.
     * @example sample <!-- draggable -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element gj-unselectable">
     *   drag me
     * </div>
     * <script>
     *     new GijgoDraggable(document.getElementById('element'), {
     *         start: function (e, mousePosition) {
     *             document.body.innerHTML += '<div>The start event is fired. mousePosition { x:' + mousePosition.x + ', y: ' + mousePosition.y + '}.</div>';
     *         }
     *     });
     * </script>
     */
    start: function (el, mouseX, mouseY) {
        return el.dispatchEvent(new CustomEvent('start', { detail: { x: mouseX, y: mouseY } }));
    },

    /**
     * Triggered when dragging stops.
     *
     * @event stop
     * @param {object} e - event data
     * @param {object} e.detail - Current mouse position as { x, y } object.
     * @example sample <!-- draggable -->
     * <style>
     * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
     * </style>
     * <div id="element" class="element gj-unselectable">
     *   drag me
     * </div>
     * <script>
     *     var obj = new GijgoDraggable(document.getElementById('element'));
     *     obj.addEventListener('stop', function (e) {
     *         document.body.innerHTML += '<div>The stop event is fired.</div>';
     *     });
     * </script>
     */
    stop: function (el, mousePosition) {
        return el.dispatchEvent(new CustomEvent('stop', { detail: mousePosition }));
    }
};

GijgoDraggable = function (element, jsConfig) {
    var self = this,
        methods = gj.draggable.methods;

    self.type = 'draggable';
    self.element = element;
    
    /** Remove draggable functionality from the element.
        * @method
        * @return jquery element
        * @example sample <!-- draggable -->
        * <style>
        * .element { border: 1px solid #999; width: 300px; height: 200px; cursor: move; text-align: center; background-color: #DDD; }
        * </style>
        * <button onclick="dragEl.destroy()" class="gj-button-md">Destroy</button>
        * <div id="element" class="element">Drag Me</div>
        * <script>
        *     var dragEl = new GijgoDraggable(document.getElementById('element'));
        * </script>
        */
    self.destroy = function () {
        return methods.destroy(this);
    };

    //$.extend($element, self);
    if ('true' !== element.getAttribute('data-gj-draggable')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDraggable.prototype = new gj.widget();
GijgoDraggable.constructor = GijgoDraggable;


if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.draggable = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDraggable(this[0], method);
                } else {
                    $widget = new GijgoDraggable(this[0], null);
                    if ($widget[method]) {
                        return $widget[method].apply(this[0], Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}
/* global window alert jQuery */
/** 
 * @widget Droppable 
 * @plugin Base
 */
gj.droppable = {
    plugins: {}
};

gj.droppable.config = {
    /** If specified, the class will be added to the droppable while draggable is being hovered over the droppable.
     * @type string
     * @default undefined
     * @example sample <!-- droppable, draggable -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     new GijgoDraggable(document.getElementById('draggable'));
     *     new GijgoDroppable(document.getElementById('droppable'), { hoverClass: 'hover' });
     * </script>
     */
    hoverClass: undefined
};

gj.droppable.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);
        this.element.setAttribute('data-gj-droppable', 'true');
        
        gj.documentManager.subscribeForEvent('mousedown', 'droppable' + this.element.getAttribute('data-gj-guid'), gj.droppable.methods.createMouseDownHandler(this));
        gj.documentManager.subscribeForEvent('mousemove', 'droppable' + this.element.getAttribute('data-gj-guid'), gj.droppable.methods.createMouseMoveHandler(this));
        gj.documentManager.subscribeForEvent('mouseup', 'droppable' + this.element.getAttribute('data-gj-guid'), gj.droppable.methods.createMouseUpHandler(this));
        
        return this;
    },

    createMouseDownHandler: function (dropEl) {
        return function (e) {
            dropEl.isDragging = true;
        }
    },

    createMouseMoveHandler: function (droppable) {
        return function (e) {
            if (droppable.isDragging) {
                let hoverClass = droppable.getConfig().hoverClass,
                    mousePosition = { x: droppable.mouseX(e), y: droppable.mouseY(e) },
                    newIsOver = gj.droppable.methods.isOver(droppable, mousePosition);
                if (newIsOver != droppable.isOver) {
                    if (newIsOver) {
                        if (hoverClass) {
                            droppable.element.classList.add(hoverClass);
                        }
                        gj.droppable.events.over(droppable.element, mousePosition);
                    } else {
                        if (hoverClass) {
                            droppable.element.classList.remove(hoverClass);
                        }
                        gj.droppable.events.out(droppable.element);
                    }
                }
                droppable.isOver = newIsOver;
            }
        }
    },

    createMouseUpHandler: function (droppable) {
        return function (e) {
            let mousePosition = {
                x: droppable.mouseX(e),
                y: droppable.mouseY(e)
            };
            droppable.isDragging = false;
            if (gj.droppable.methods.isOver(droppable, mousePosition)) {
                gj.droppable.events.drop(droppable.element);
            }
        }
    },

    isOver: function (droppable, mousePosition) {
        let result, elementPosition = gj.core.position(droppable.element);
        result = mousePosition.x > elementPosition.left && mousePosition.x < elementPosition.right
              && mousePosition.y > elementPosition.top && mousePosition.y < elementPosition.bottom;
        return result;
    },

    destroy: function (droppable) {
        let el = droppable.element;
        if (el.getAttribute('data-gj-droppable') === 'true') {
            gj.documentManager.unsubscribeForEvent('mousedown', 'droppable' + el.getAttribute('data-gj-guid'));
            gj.documentManager.unsubscribeForEvent('mousemove', 'droppable' + el.getAttribute('data-gj-guid'));
            gj.documentManager.unsubscribeForEvent('mouseup', 'droppable' + el.getAttribute('data-gj-guid'));
            droppable.removeConfig();
            el.removeAttribute('data-gj-guid');
            el.removeAttribute('data-gj-droppable');
        }
        return droppable;
    }
};

gj.droppable.events = {
    /** Triggered when a draggable element is dropped.
     * @event drop
     * @param {object} e - event data
     * @example sample <!-- droppable, draggable -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .drop { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     new GijgoDraggable(document.getElementById('draggable'));
     *     new GijgoDroppable(document.getElementById('droppable'), { 
     *         drop: function() { 
     *             this.classList.add('drop');
     *         } 
     *     });
     * </script>
     */
    drop: function (el, offsetX, offsetY) {
        return el.dispatchEvent(new CustomEvent('drop', { detail: { 'top': offsetY, 'left': offsetX } }));
    },

    /** Triggered when a draggable element is dragged over the droppable.
     * @event over
     * @param {object} e - event data
     * @param {object} mousePosition - Current mouse position as { top, left } object.
     * @example sample <!-- droppable, draggable -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     new GijgoDraggable(document.getElementById('draggable'));
     *     new GijgoDroppable(document.getElementById('droppable'), {
     *         over: function() { 
     *             this.classList.add('hover')
     *         },
     *         out: function() {
     *             this.classList.remove('hover')
     *         }
     *     });
     * </script>
     */
    over: function (el, mousePosition) {
        return el.dispatchEvent(new CustomEvent('over', { detail: { 'mousePosition': mousePosition } }));
    },

    /** Triggered when a draggable element is dragged out of the droppable.
     * @event out
     * @param {object} e - event data
     * @example sample <!-- droppable, draggable -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     new GijgoDraggable(document.getElementById('draggable'));
     *     new GijgoDroppable(document.getElementById('droppable'), {
     *         over: function() { this.classList.add('hover') },
     *         out: function() { this.classList.remove('hover') }
     *     });
     * </script>
     */
    out: function (el) {
        return el.dispatchEvent(new Event('out'));
    }
};

GijgoDroppable = function (element, jsConfig) {
    let self = this,
        methods = gj.droppable.methods;
    
    self.type = 'droppable';
    self.element = element;
    self.isOver = false;
    self.isDragging = false;

    /** Removes the droppable functionality.
     * @method
     * @return jquery element
     * @example sample <!-- draggable, droppable -->
     * <button onclick="create()" class="gj-button-md">Create</button>
     * <button onclick="dropEl.destroy()" class="gj-button-md">Destroy</button>
     * <br/><br/>
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     var dropEl;
     *     new GijgoDraggable(document.getElementById('draggable'));
     *     function create() {
     *         dropEl = new GijgoDroppable(document.getElementById('droppable'), {
     *             hoverClass: 'hover'
     *         });
     *     }
     *     create();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    }

    self.isOver = function (mousePosition) {
        return methods.isOver(this, mousePosition);
    }

    if ('true' !== element.getAttribute('data-gj-droppable')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDroppable.prototype = new gj.widget();
GijgoDroppable.constructor = GijgoDroppable;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.droppable = function (method) {
            let $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDroppable(this, method);
                } else {
                    $widget = new GijgoDroppable(this, null);
                    if ($widget[method]) {
                        return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}
/* global window alert jQuery gj */
/**
  * @widget Grid
  * @plugin Base
  */
gj.grid = {
    plugins: {},
    messages: {}
};

gj.grid.config = {
    base: {
        /** The data source for the grid.
         * @additionalinfo If set to string, then the grid is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the grid is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the grid is going to use the array as data for rows.
         * @type (string|object|array)
         * @default undefined
         * @example Remote.JS.Configuration <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Remote.Html.Configuration <!-- grid -->
         * <table id="grid" data-gj-source="/Players/Get">
         *     <thead>
         *         <tr>
         *             <th width="56" data-gj-field="ID">#</th>
         *             <th>Name</th>
         *             <th>PlaceOfBirth</th>
         *         </tr>
         *     </thead>
         * </table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'));
         * </script>
         * @example Local.DataSource <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: data,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Html.DataSource <!-- grid, dropdown -->
         * <table id="grid">
         *     <thead>
         *         <tr>
         *             <th width="56" data-gj-field="ID">#</th>
         *             <th data-gj-sortable="true">Name</th>
         *             <th data-gj-field="PlaceOfBirth" data-gj-sortable="true">Place Of Birth</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td>1</td>
         *             <td>Hristo Stoichkov</td>
         *             <td>Plovdiv, Bulgaria</td>
         *         </tr>
         *         <tr>
         *             <td>2</td>
         *             <td>Ronaldo Luis Nazario de Lima</td>
         *             <td>Rio de Janeiro, Brazil</td>
         *         </tr>
         *         <tr>
         *             <td>3</td>
         *             <td>David Platt</td>
         *             <td>Chadderton, Lancashire, England</td>
         *         </tr>
         *     </tbody>
         * </table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), { pager: { limit: 2, sizes: [2, 5, 10, 20] }});
         * </script>
         * @example Remote.Custom.Render <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid, onSuccessFunc = function (response) {
         *         alert('The result contains ' + response.records.length + ' records.');
         *         grid.render(response);
         *     };
         *     grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: { url: '/Players/Get', data: {}, success: onSuccessFunc },
         *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Remote.Custom.Error <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid, onErrorFunc = function (response) {
         *         alert('Server error.');
         *     };
         *     grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: { url: '/DataSources/InvalidUrl', error: onErrorFunc },
         *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        dataSource: undefined,

        /** An array that holds the configurations of each column from the grid.
         * @type array
         * @example JS.Configuration <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', name: 'Birth Place' } ]
         *     });
         * </script>
         */
        columns: [],

        /** Auto generate column for each field in the datasource when set to true.
         * @type array
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         autoGenerateColumns: true
         *     });
         * </script>
         */
        autoGenerateColumns: false,

        /** An object that holds the default configuration settings of each column from the grid.
         * @type object
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         defaultColumnSettings: { align: 'right' },
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', name: 'Birth Place' } ]
         *     });
         * </script>
         */
        defaultColumnSettings: {

            /** If set to true the column will not be displayed in the grid. By default all columns are displayed.
             * @alias column.hidden
             * @type boolean
             * @default false
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *            { field: 'ID', width: 56 },
             *            { field: 'Name' },
             *            { field: 'PlaceOfBirth', hidden: true }
             *        ]
             *     });
             * </script>
             */
            hidden: false,

            /** The width of the column. Numeric values are treated as pixels.
             * If the width is undefined the width of the column is not set and depends on the with of the table(grid).
             * @alias column.width
             * @type number|string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', width: 120 },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             */
            width: undefined,

            /** Indicates if the column is sortable.
             * If set to true the user can click the column header and sort the grid by the column source field.
             * @alias column.sortable
             * @type boolean|object
             * @default false
             * @example Remote <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Local.Custom <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'Value1': 'Foo', 'Value2': 'Foo' },
             *         { 'ID': 2, 'Value1': 'bar', 'Value2': 'bar' },
             *         { 'ID': 3, 'Value1': 'moo', 'Value2': 'moo' },
             *         { 'ID': 4, 'Value1': null, 'Value2': undefined }
             *     ];
             *     var caseSensitiveSort = function (direction, column) { 
             *         return function (recordA, recordB) {
             *             var a = recordA[column.field] || '',
             *                 b = recordB[column.field] || '';
             *             return (direction === 'asc') ? a < b : b < a;
             *         };
             *     };
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         columns: [
             *             { field: 'ID' },
             *             { field: 'Value1', sortable: true },
             *             { field: 'Value2', sortable: { sorter: caseSensitiveSort } }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.3 <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.4.Material.Icons <!-- bootstrap4, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.4.FontAwesome <!-- bootstrap4, fontawesome, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap4',
             *         iconsLibrary: 'fontawesome',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             * @example Remote.Bootstrap.5.FontAwesome <!-- bootstrap5, fontawesome, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap5',
             *         iconsLibrary: 'fontawesome',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', sortable: true },
             *             { field: 'PlaceOfBirth', sortable: false }
             *         ]
             *     });
             * </script>
             */
            sortable: false,

            /** Indicates the type of the column.
             * @alias column.type
             * @type text|checkbox|icon|date|time|datetime
             * @default 'text'
             * @example Bootstrap.3.Icon <!-- grid, bootstrap -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             {
             *               title: '', field: 'Info', width: 32, type: 'icon', icon: 'glyphicon-info-sign',
             *               events: {
             *                 'click': function (e) {
             *                     alert('record with id=' + e.data.id + ' is clicked.');
             *                 }
             *               }
             *             }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.4.Icon <!-- grid, bootstrap4, fontawesome -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             {
             *               title: '', field: 'Info', width: 42, type: 'icon', icon: 'fa fa-pencil',
             *               events: {
             *                 'click': function (e) {
             *                     alert('record with id=' + e.data.id + ' is clicked.');
             *                 }
             *               }
             *             }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.3.Checkbox <!-- grid, checkbox, bootstrap -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             { title: 'Active?', field: 'IsActive', width: 80, type: 'checkbox', align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.4.Checkbox <!-- grid, checkbox, bootstrap4 -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             { title: 'Active?', field: 'IsActive', width: 80, type: 'checkbox', align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.5.Checkbox <!-- grid, checkbox, bootstrap5 -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap5',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' },
             *             { title: 'Active?', field: 'IsActive', width: 80, type: 'checkbox', align: 'center' }
             *         ]
             *     });
             * </script>
             */
            type: 'text',

            /** The caption that is going to be displayed in the header of the grid.
             * @alias column.title
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', title: 'Player' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' }
             *         ]
             *     });
             * </script>
             */
            title: undefined,

            /** The field name to which the column is bound.
             * If the column.title is not defined this value is used as column.title.
             * @alias column.field
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth', title: 'Place of Birth' }
             *         ]
             *     });
             * </script>
             */
            field: undefined,

            /** This setting control the alignment of the text in the cell.
             * @alias column.align
             * @type left|right|center|justify|initial|inherit
             * @default undefined
             * @example Material.Design <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 100, align: 'center' },
             *             { field: 'Name', align: 'right' },
             *             { field: 'PlaceOfBirth', align: 'left' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.5 <!-- grid, bootstrap5 -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap5',
             *         columns: [
             *             { field: 'ID', width: 56, align: 'center' },
             *             { field: 'Name', align: 'right' },
             *             { field: 'PlaceOfBirth', align: 'left' }
             *         ]
             *     });
             * </script>
             */
            align: undefined,

            /** The name(s) of css class(es) that are going to be applied to all cells inside that column, except the header cell.
             * @alias column.cssClass
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <style>
             * .nowrap { white-space: nowrap }
             * .bold { font-weight: bold }
             * </style>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', width: 100, cssClass: 'nowrap bold' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             */
            cssClass: undefined,

            /** The name(s) of css class(es) that are going to be applied to the header cell of that column.
             * @alias column.headerCssClass
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <style>
             * .italic { font-style: italic }
             * </style>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', headerCssClass: 'italic' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             */
            headerCssClass: undefined,

            /** The text for the cell tooltip.
             * @alias column.tooltip
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56, tooltip: 'This is my tooltip 1.' },
             *             { field: 'Name', tooltip: 'This is my tooltip 2.' },
             *             { field: 'PlaceOfBirth', tooltip: 'This is my tooltip 3.' }
             *         ]
             *     });
             * </script>
             */
            tooltip: undefined,

            /** Css class for icon that is going to be in use for the cell.
             * This setting can be in use only with combination of type icon.
             * @alias column.icon
             * @type string
             * @default undefined
             * @example sample <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' },
             *             { 
             *                 title: '', field: 'Edit', width: 32, type: 'icon', icon: 'glyphicon-pencil',
             *                 events: 
             *                 { 'click': function (e, id, field, record) { 
             *                        alert('name=' + record.Name); 
             *                    }
             *                 }
             *             }
             *         ]
             *     });
             * </script>
             */
            icon: undefined,

            /** Configuration object with event names as keys and functions as values that are going to be bind to each cell from the column.
             * Each function is going to receive event information as a parameter with info in the 'data' field for id, field name and record data.
             * @alias column.events
             * @type object
             * @default undefined
             * @example javascript.configuration <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             {
             *               field: 'Name',
             *               events: {
             *                 'mouseenter': function (e) {
             *                     e.currentTarget.style.backgroundColor = 'red';
             *                 },
             *                 'mouseleave': function (e) {
             *                     e.currentTarget.style.backgroundColor = '';
             *                 }
             *               }
             *             },
             *             { field: 'PlaceOfBirth' },
             *             {
             *               title: '', field: 'Info', width: 34, type: 'icon', icon: 'glyphicon-info-sign',
             *               events: {
             *                 'click': function (e, id, field, record) {
             *                     alert('record with id=' + id + ' is clicked.'); }
             *                 }
             *             }
             *         ]
             *     });
             * </script>
             * @example html.configuration <!-- bootstrap, grid -->
             * <table id="grid" data-gj-source="/Players/Get" data-gj-ui-library="bootstrap">
             *     <thead>
             *         <tr>
             *             <th data-gj-field="ID" width="34">ID</th>
             *             <th data-gj-events="mouseenter: onMouseEnter, mouseleave: onMouseLeave">Name</th>
             *             <th data-gj-field="PlaceOfBirth">Place Of Birth</th>
             *             <th data-gj-events="click: onClick" data-gj-type="icon" data-gj-icon="glyphicon-info-sign" width="32"></th>
             *         </tr>
             *     </thead>
             * </table>
             * <script>
             *     function onMouseEnter (e) {
*                     e.currentTarget.style.backgroundColor = 'red';
             *     }
             *     function onMouseLeave (e) {
             *        e.currentTarget.style.backgroundColor = '';
             *     }
             *     function onClick(e, id, field, record) {
             *         alert('record with id=' + id + ' is clicked.');
             *     }
             *     new GijgoGrid(document.getElementById('grid'), );
             * </script>
             */
            events: undefined,

            /** Format the date when the type of the column is date.
             * @additionalinfo <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
             * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
             * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
             * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
             * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
             * <b>yyyy</b> - Year represented by four digits.<br/>
             * <b>s</b> - Seconds; no leading zero for single-digit seconds.<br/>
             * <b>ss</b> - Seconds; leading zero for single-digit seconds.<br/>
             * <b>M</b> - Minutes; no leading zero for single-digit minutes. Uppercase MM to avoid conflict with months.<br/>
             * <b>MM</b> - Minutes; leading zero for single-digit minutes. Uppercase MM to avoid conflict with months.<br/>
             * <b>H</b> - Hours; no leading zero for single-digit hours (24-hour clock).<br/>
             * <b>HH</b> - Hours; leading zero for single-digit hours (24-hour clock).<br/>
             * <b>h</b> - Hours; no leading zero for single-digit hours (12-hour clock).<br/>
             * <b>hh</b> - Hours; leading zero for single-digit hours (12-hour clock).<br/>
             * <b>tt</b> - Lowercase, two-character time marker string: am or pm.<br/>
             * <b>TT</b> - Uppercase, two-character time marker string: AM or PM.<br/>
             * @alias column.format
             * @type string
             * @default 'mm/dd/yyyy'
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name' },
             *             { field: 'DateOfBirth', title: 'Date 1', type: 'date', format: 'HH:MM:ss mm/dd/yyyy' },
             *             { field: 'DateOfBirth', title: 'Date 2', type: 'date' }
             *         ]
             *     });
             * </script>
             */
            format: 'mm/dd/yyyy',

            /** Number of decimal digits after the decimal point.
             * @alias column.decimalDigits
             * @type number
             * @default undefined
             */
            decimalDigits: undefined,

            /** Template for the content in the column.
             * Use curly brackets '{}' to wrap the names of data source columns from server response.
             * @alias column.tmpl
             * @type string
             * @default undefined
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name' },
             *             { title: 'Info', tmpl: '{Name} is born in {PlaceOfBirth}.' }
             *         ]
             *     });
             * </script>
             */
            tmpl: undefined,

            /** If set to true stop event propagation when event occur.
             * @alias column.stopPropagation
             * @type boolean
             * @default false
             * @example sample <!-- bootstrap, grid -->
             * <table id="grid" data-gj-source="/Players/Get"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', events: { 'click': function (e, id, field, record) { alert('name=' + record.Name); } }  },
             *             { field: 'PlaceOfBirth', stopPropagation: true, events: { 'click': function (e, id, field, record) { alert('name=' + record.Name); } }   },
             *             { title: '', field: 'Edit', width: 32, type: 'icon', icon: 'glyphicon-pencil', events: { 'click': function (e, id, field, record) { alert('name=' + record.Name); } } }
             *         ]
             *     });
             * </script>
             */
            stopPropagation: false,

            /** A renderer is an 'interceptor' function which can be used to transform data (value, appearance, etc.) before it is rendered.
             * @additionalinfo If the renderer function return a value, then this value is going to be automatically set as value of the cell.<br/>
             * If the renderer function doesn't return a value, then you have to set the content of the cell manually.
             * @alias column.renderer
             * @type function
             * @default undefined
             * @param {string} value - the record field value
             * @param {object} record - the data of the row record
             * @param {object} cell - the current table cell presented as html object
             * @param {object} displayEl - inner div element for display of the cell value presented as html object
             * @param {string} id - the id of the record
             * @example sample <!-- grid -->
             * <table id="grid" data-gj-source="/Players/Get"></table>
             * <script>
             *     var nameRenderer = function (value, record, cell, displayEl) { 
             *         cell.style.fontStyle = 'italic'; 
             *         displayEl.style.backgroundColor = '#EEE';
             *         displayEl.innerHTML = value;
             *     };
             *     new GijgoGrid(document.getElementById('grid'), {
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', renderer: nameRenderer },
             *             { field: 'PlaceOfBirth', renderer: function (value, record) { return record.ID % 2 ? '<b>' + value + '</b>' : '<i>' + value + '</i>'; }  }
             *         ]
             *     });
             * </script>
             */
            renderer: undefined,

            /** Function which can be used to customize filtering with local data (javascript sourced data).
             * @additionalinfo The default filtering is not case sensitive. The filtering with remote data sources needs to be handled on the server.
             * @alias column.filter
             * @type function
             * @default undefined
             * @param {string} value - the record field value
             * @param {string} searchStr - the search string
             * @example example <!-- grid -->
             * <input type="text" id="txtValue1" placeholder="Value 1" /> &nbsp;
             * <input type="text" id="txtValue2" placeholder="Value 2" /> &nbsp;
             * <button id="btnSearch">Search</button> <br/><br/>
             * <table id="grid"></table>
             * <script>
             *     var grid, data = [
             *             { 'ID': 1, 'Value1': 'Foo', 'Value2': 'Foo' },
             *             { 'ID': 2, 'Value1': 'bar', 'Value2': 'bar' },
             *             { 'ID': 3, 'Value1': 'moo', 'Value2': 'moo' },
             *             { 'ID': 4, 'Value1': null, 'Value2': undefined }
             *         ],
             *         caseSensitiveFilter = function (value, searchStr) { 
             *             return value.indexOf(searchStr) > -1;
             *         };
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Value1' },
             *             { field: 'Value2', filter: caseSensitiveFilter }
             *         ]
             *     });
             *     document.getElementById('btnSearch').addEventListener('click', function () {
             *         grid.reload({ Value1: document.getElementById('txtValue1').value, Value2: document.getElementById('txtValue2').value });
             *     });
             * </script>
             */
            filter: undefined
        },

        mapping: {
            /** The name of the object in the server response, that contains array with records, that needs to be display in the grid.
             * @alias mapping.dataField
             * @type string
             * @default "records"
             */
            dataField: 'records',

            /** The name of the object in the server response, that contains the number of all records on the server.
             * @alias mapping.totalRecordsField
             * @type string
             * @default "total"
             */
            totalRecordsField: 'total'
        },

        params: {},

        paramNames: {

            /** The name of the parameter that is going to send the name of the column for sorting.
             * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.
             * @alias paramNames.sortBy
             * @type string
             * @default "sortBy"
             */
            sortBy: 'sortBy',

            /** The name of the parameter that is going to send the direction for sorting.
             * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.
             * @alias paramNames.direction
             * @type string
             * @default "direction"
             */
            direction: 'direction'
        },

        /** The name of the UI library that is going to be in use. Currently we support Bootstrap 3, Bootstrap 4 and Material Design.
         * @additionalinfo The css files for Bootstrap or Material Design should be manually included to the page where the grid is in use.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default 'materialdesign'
         * @example Material.Design.With.Icons <!-- dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Material.Design.Without.Icons <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'materialdesign',
         *         iconsLibrary: '',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Bootstrap.3 <!-- grid, dropdown, bootstrap -->
         * <div class="container"><table id="grid"></table></div>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap',
         *         columns: [
         *             { field: 'ID' },
         *             { field: 'Name', sortable: true },
         *             { field: 'PlaceOfBirth' }
         *         ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap4',
         *         columns: [ { field: 'ID', width: 38 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         columns: [ { field: 'ID', width: 38 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, dropdown, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap5',
         *         columns: [ { field: 'ID', width: 64 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
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
         * @example Font.Awesome <!-- fontawesome, grid, dropdown -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         iconsLibrary: 'fontawesome',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        /** The type of the row selection.<br/>
         * If the type is set to multiple the user will be able to select more then one row from the grid.
         * @type (single|multiple)
         * @default 'single'
         * @example Multiple.Material.Design.Checkbox <!-- checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Multiple.Bootstrap.3.Checkbox <!-- bootstrap, checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         primaryKey: 'ID',
         *         uiLibrary: 'bootstrap',
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 32 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Multiple.Bootstrap.4.Checkbox <!-- bootstrap4, checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         uiLibrary: 'bootstrap4',
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Multiple.Bootstrap.5.Checkbox <!-- bootstrap5, checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         uiLibrary: 'bootstrap5',
         *         dataSource: '/Players/Get',
         *         selectionType: 'multiple',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example Single.Checkbox <!-- checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         selectionType: 'single',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        selectionType: 'single',

        /** The type of the row selection mechanism.
         * @additionalinfo If this setting is set to "basic" when the user select a row, then this row will be highlighted.<br/>
         * If this setting is set to "checkbox" a column with checkboxes will appear as first row of the grid and when the user select a row, then this row will be highlighted and the checkbox selected.
         * @type (basic|checkbox)
         * @default "basic"
         * @example sample <!-- checkbox, grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         selectionType: 'single',
         *         selectionMethod: 'checkbox',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        selectionMethod: 'basic',

        /** When this setting is enabled the content of the grid will be loaded automatically after the creation of the grid.
         * @type boolean
         * @default true
         * @example disabled <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         autoLoad: false,
         *         columns: [ { field: 'ID' }, { field: 'Name' } ]
         *     });
         *     grid.reload(); //call .reload() explicitly in order to load the data in the grid
         * </script>
         * @example enabled <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         autoLoad: true,
         *         columns: [ { field: 'ID' }, { field: 'Name' } ]
         *     });
         * </script>
         */
        autoLoad: true,

        /** The text that is going to be displayed if the grid is empty.
         * @type string
         * @default "No records found."
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: { url: '/Players/Get', data: { name: 'not existing name' } },
         *         notFoundText: 'No records found custom message',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example localization <!-- grid -->
         * <table id="grid"></table>
         * <script src="../../dist/modular/grid/js/messages/messages.de-de.js"></script>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: { url: '/Players/Get', data: { name: 'not existing name' } },
         *         locale: 'de-de',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        notFoundText: undefined,

        /** Width of the grid.
         * @type number
         * @default undefined
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         width: 400,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        width: undefined,

        /** Minimum width of the grid.
         * @type number
         * @default undefined
         */
        minWidth: undefined,

        /** This configuration option manage the behaviour of the header row height.
         * Auto scale if set to to 'autogrow'. All body rows are with the same height if set to 'fixed'.
         * @type ('autogrow'|'fixed')
         * @default "fixed"
         * @example AutoGrow <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         headerRowHeight: 'autogrow',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         * @example Fixed <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         headerRowHeight: 'fixed',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         */
        headerRowHeight: 'fixed',

        /** This configuration option manage the behaviour of the body row height.
         * Auto scale if set to to 'autogrow'. All body rows are with the same height if set to 'fixed'.
         * @type ('autogrow'|'fixed')
         * @default "autogrow"
         * @example AutoGrow <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         bodyRowHeight: 'autogrow',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         * @example Fixed <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         width: 500,
         *         bodyRowHeight: 'fixed',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth', title: 'Very very very very long column title', width: 200 } ]
         *     });
         * </script>
         */
        bodyRowHeight: 'autogrow',

        /** The size of the font in the grid.
         * @type string
         * @default undefined
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         fontSize: '16px',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        fontSize: undefined,

        /** Name of column that contains the record id. 
         * @additionalinfo If you set primary key, we assume that this number is unique for each records presented in the grid.<br/>
         * For example this should contains the column with primary key from your relation db table.<br/>
         * If the primaryKey is undefined, we autogenerate id for each record in the table by starting from 1.
         * @type string
         * @default undefined
         * @example defined <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: data,
         *         primaryKey: 'ID',
         *         columns: [ 
         *             { field: 'ID', width: 70 },
         *             { field: 'Name' },
         *             { field: 'PlaceOfBirth' } ,
         *             { 
         *                 tmpl: '<a href="#">click me</a>', 
         *                 events: { 
         *                    click: function(e) { 
         *                      alert('Your id is ' + e.data.id);
         *                    }
         *                 }, 
         *                 width: 100,
         *                 stopPropagation: true
         *             } 
         *         ]
         *     });
         * </script>
         * @example undefined <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     var data = [
         *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: data,
         *         columns: [ 
         *             { field: 'ID', width: 70 },
         *             { field: 'Name' },
         *             { field: 'PlaceOfBirth' } ,
         *             { tmpl: '<a href="#">click me</a>', events: { click: function(e) { alert('Your id is ' + e.data.id); } }, width: 100, stopPropagation: true } 
         *         ]
         *     });
         * </script>
         */
        primaryKey: undefined,

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German.Bootstrap.Default <!-- bootstrap, grid, dropdown -->
         * <table id="grid"></table>
         * <script>
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap',
         *         locale: 'de-de',
         *         columns: [ 
         *             { field: 'ID', width: 34 },
         *             { field: 'Name', title: 'Name' },
         *             { field: 'PlaceOfBirth', title: 'Geburtsort' }
         *         ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         * @example French.MaterialDesign.Custom <!-- grid, dropdown -->
         * <table id="grid"></table>
         * <script>
         *     gj.grid.messages['fr-fr'].DisplayingRecords = 'Mes résultats';
         *     new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'materialdesign',
         *         locale: 'fr-fr',
         *         columns: [ 
         *             { field: 'ID', width: 56 },
         *             { field: 'Name', title: 'Prénom' },
         *             { field: 'PlaceOfBirth', title: 'Lieu de naissance' }
         *         ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        locale: 'en-us',

        defaultIconColumnWidth: 70,
        defaultCheckBoxColumnWidth: 70,

        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-md',
            loadingCover: 'gj-grid-loading-cover',
            loadingText: 'gj-grid-loading-text',
            header: {
                cell: undefined,
                sortable: 'gj-cursor-pointer gj-unselectable'
            },
            content: {
                rowSelected: 'gj-grid-md-select'
            }
        },

        icons: {
            asc: '▲',
            desc: '▼'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-bootstrap gj-grid-bootstrap-3 table table-bordered table-hover',
            content: {
                rowSelected: 'active'
            }
        },

        iconsLibrary: 'glyphicons',

        defaultIconColumnWidth: 34,
        defaultCheckBoxColumnWidth: 36
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-bootstrap gj-grid-bootstrap-4 table table-bordered table-hover',
            content: {
                rowSelected: 'active'
            }
        },

        defaultIconColumnWidth: 42,
        defaultCheckBoxColumnWidth: 44
    },

    bootstrap5: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid gj-grid-bootstrap gj-grid-bootstrap-5 table table-bordered table-hover',
            content: {
                rowSelected: 'active'
            }
        },

        defaultIconColumnWidth: 42,
        defaultCheckBoxColumnWidth: 44
    },

    materialicons: {
        icons: {
            asc: '<i class="gj-icon arrow-upward" />',
            desc: '<i class="gj-icon arrow-downward" />'
        }
    },

    fontawesome: {
        icons: {
            asc: '<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>',
            desc: '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            asc: '<span class="glyphicon glyphicon-sort-by-alphabet" />',
            desc: '<span class="glyphicon glyphicon-sort-by-alphabet-alt" />'
        }
    }
};

/**
  * @widget Grid
  * @plugin Base
  */
gj.grid.events = {
    /**
     * Event fires before addition of an empty row to the grid.
     * @event beforeEmptyRowInsert
     * @param {object} e - event data
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: {
     *             url: '/Players/Get',
     *             data: { name: 'not existing data' } //search for not existing data in order to fire the event
     *         },
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('beforeEmptyRowInsert', function (e) {
     *         alert('beforeEmptyRowInsert is fired.');
     *     });
     * </script>
     */
    beforeEmptyRowInsert: function (el) {
        return el.dispatchEvent(new Event('beforeEmptyRowInsert'));
    },

    /**
     * Event fired before data binding takes place.
     *
     * @event dataBinding
     * @param {object} e - event data
     * @param {array} e.detail.records - the list of records
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         dataBinding: function (e) {
     *             alert('dataBinding is fired. ' + e.detail.records.length + ' records will be loaded in the grid.');
     *         }
     *     });
     * </script>
     */
    dataBinding: function (el, records) {
        return el.dispatchEvent(new CustomEvent('dataBinding', { detail: { records: records } }));
    },

    /**
     * Event fires after the loading of the data in the grid.
     *
     * @event dataBound
     * @param {object} e - event data
     * @param {array} e.detail.records - the list of records
     * @param {number} e.detail.totalRecords - the number of the all records that can be presented in the grid
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('dataBound', function (e) {
     *         alert('dataBound is fired. ' + e.detail.records.length + ' records are bound to the grid.');
     *     });
     * </script>
     */
    dataBound: function (el, records, totalRecords) {
        return el.dispatchEvent(new CustomEvent('dataBound', { detail: { records: records, totalRecords: totalRecords } }));
    },

    /**
     * Event fires after insert of a row in the grid during the loading of the data.
     * @event rowDataBound
     * @param {object} e - event data
     * @param {object} e.detail.row - the row element
     * @param {string} e.detail.id - the id of the record
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('rowDataBound', function (e) {
     *         alert('rowDataBound is fired for row with id=' + e.detail.id + '.');
     *     });
     * </script>
     */
    rowDataBound: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowDataBound', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires after insert of a cell in the grid during the loading of the data
     *
     * @event cellDataBound
     * @param {object} e - event data
     * @param {object} e.detail.displayEl - inner div element for display of the cell value presented as jquery object
     * @param {string} e.detail.id - the id of the record
     * @param {object} e.detail.column - the column configuration data
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' }, { field: 'Bulgarian', title: 'Is Bulgarian?' } ]
     *     });
     *     grid.on('cellDataBound', function (e) {
     *         if ('Bulgarian' === e.detail.column.field) {
     *             e.detail.displayEl.innerHTML = e.detail.record.PlaceOfBirth.indexOf('Bulgaria') > -1 ? 'Yes' : 'No';
     *         }
     *     });
     * </script>
     */
    cellDataBound: function (el, displayEl, id, column, record) {
        return el.dispatchEvent(new CustomEvent('cellDataBound', { detail: { 
                displayEl: displayEl, id: id, column: column, record: record
            } 
        }));
    },

    /**
     * Event fires on selection of row
     *
     * @event rowSelect
     * @param {object} e - event data
     * @param {object} e.detail.row - the row element
     * @param {string} e.detail.id - the id of the record
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- checkbox, grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     grid.on('rowSelect', function (e) {
     *         alert('Row with id=' + e.detail.id + ' is selected.');
     *     });
     * </script>
     */
    rowSelect: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowSelect', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires on un selection of row
     *
     * @event rowUnselect
     * @param {object} e - event data
     * @param {object} e.detail.row - the row element
     * @param {string} e.detail.id - the id of the record
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- checkbox, grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     grid.on('rowUnselect', function (e) {
     *         alert('Row with id=' + e.detail.id + ' is unselected.');
     *     });
     * </script>
     */
    rowUnselect: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowUnselect', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires before deletion of row in the grid.
     * @event rowRemoving
     * @param {object} e - event data
     * @param {object} e.detail.row - the row element
     * @param {string} e.detail.id - the id of the record
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- grid -->
     * <button onclick="grid.removeRow('1')" class="gj-button-md">Remove Row</button><br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('rowRemoving', function (e) {
     *         alert('rowRemoving is fired for row with id=' + e.detail.id + '.');
     *     });
     * </script>
     */
    rowRemoving: function (el, row, id, record) {
        return el.dispatchEvent(new CustomEvent('rowRemoving', { detail: { row: row, id: id, record: record } }));
    },

    /**
     * Event fires when the grid.destroy method is called.
     *
     * @event destroying
     * @param {object} e - event data
     * @example sample <!-- grid -->
     * <button id="btnDestroy" class="gj-button-md">Destroy</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('destroying', function (e) {
     *         alert('destroying is fired.');
     *     });
     *     $('#btnDestroy').on('click', function() {
     *         grid.destroy();
     *     });
     * </script>
     */
    destroying: function (el) {
        return el.dispatchEvent(new Event('destroying'));
    },

    /**
     * Event fires when column is hidding
     *
     * @event columnHide
     * @param {object} e - event data
     * @param {object} e.detail.column - The data about the column that is hidding
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     grid.on('columnHide', function (e) {
     *         alert('The ' + e.detail.column.field + ' column is hidden.');
     *     });
     *     grid.hideColumn('PlaceOfBirth');
     * </script>
     */
    columnHide: function (el, column) {
        return el.dispatchEvent(new CustomEvent('columnHide', { detail: { column: column } }));
    },

    /**
     * Event fires when column is showing
     *
     * @event columnShow
     * @param {object} e - event data
     * @param {object} e.detail.column - The data about the column that is showing
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', hidden: true } ]
     *     });
     *     grid.on('columnShow', function (e) {
     *         alert('The ' + e.detail.column.field + ' column is shown.');
     *     });
     *     grid.showColumn('PlaceOfBirth');
     * </script>
     */
    columnShow: function (el, column) {
        return el.dispatchEvent(new CustomEvent('columnShow', { detail: { column: column } }));
    },

    /**
     * Event fires when grid is initialized.
     *
     * @event initialized
     * @param {object} e - event data
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', hidden: true } ],
     *         initialized: function (e) {
     *             alert('The grid is initialized.');
     *         }
     *     });
     * </script>
     */
    initialized: function (el) {
        return el.dispatchEvent(new Event('initialized'));
    },

    /**
     * Event fires when the grid data is filtered.
     *
     * @additionalinfo This event is firing only when you use local dataSource, because the filtering with remote dataSource needs to be done on the server side.
     * @event dataFiltered
     * @param {object} e - event data
     * @param {object} records - The records after the filtering.
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid, data = [
     *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', CountryName: 'Bulgaria' },
     *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', CountryName: 'Brazil' },
     *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', CountryName: 'England' },
     *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', CountryName: 'Germany' },
     *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', CountryName: 'Colombia' },
     *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', CountryName: 'Bulgaria' }
     *     ];
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         dataFiltered: function (e) {
     *             e.detail.records.reverse(); // reverse the data
     *             e.detail.records.splice(3, 2); // remove 2 elements after the 3rd record
     *         }
     *     });
     * </script>
     */
    dataFiltered: function (el, records) {
        return el.dispatchEvent(new CustomEvent('dataFiltered', { detail: { records: records } }));
    }
};

/*global gj $*/
gj.grid.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);

        gj.grid.methods.initialize(this);

        if (this.getConfig().autoLoad) {
            this.reload();
        }
        return this;
    },

    readConfig: function (jsConfig) {
        let config = gj.widget.prototype.readConfig.call(this, jsConfig);
        gj.grid.methods.setDefaultColumnConfig(config.columns, config.defaultColumnSettings);
        return config;
    },

    setDefaultColumnConfig: function (columns, defaultColumnSettings) {
        let column, i;
        if (columns && columns.length) {
            for (i = 0; i < columns.length; i++) {
                column = gj.core.extend({}, defaultColumnSettings);
                column = gj.core.extend(column, columns[i]);
                columns[i] = column;
            }
        }
    },

    readHTMLConfig: function () {
        let result = gj.widget.prototype.readHTMLConfig.call(this),
            columns = this.element.querySelectorAll('thead > tr > th');
        result.columns = [];
        for (const el of columns) {
            let title = el.innerText,
                config = gj.widget.prototype.readHTMLConfig.call({ element: el });
            config.title = title;
            if (!config.field) {
                config.field = title;
            }
            if (config.events) {
                config.events = gj.grid.methods.eventsParser(config.events);
            }
            result.columns.push(config);
        }
        return result;
    },

    eventsParser: function (events) {
        let result = {}, list, i, key, func, position;
        list = events.split(',');
        for (i = 0; i < list.length; i++) {
            position = list[i].indexOf(':');
            if (position > 0) {
                key = list[i].substr(0, position).trim();
                func = list[i].substr(position + 1, list[i].length).trim();
                result[key] = eval('window.' + func); //window[func]; //TODO: eveluate functions from string
            }
        }
        return result;
    },
    
    initialize: function (grid) {
        let wrapper, data = grid.getConfig();

        gj.grid.methods.localization(data);

        wrapper = grid.wrap('div');

        if (data.width) {
            gj.core.css(wrapper, 'width', data.width);
        }
        if (data.minWidth) {
            grid.element.style.minWidth = data.minWidth;
        }
        if (data.fontSize) {
            gj.core.css(grid.element, 'fontSize', data.fontSize);
        }
        if (data.headerRowHeight === 'autogrow') {
            grid.element.classList.add('autogrow-header-row');
        }
        if (data.bodyRowHeight === 'fixed') {
            grid.element.classList.add('fixed-body-rows');
        }
        gj.core.addClasses(grid.element, data.style.table);
        if ('checkbox' === data.selectionMethod) {
            data.columns.splice(gj.grid.methods.getColumnPositionNotInRole(grid), 0, {
                title: '',
                width: data.defaultCheckBoxColumnWidth,
                align: 'center',
                type: 'checkbox',
                role: 'selectRow',
                events: {
                    change: function (e) {
                        gj.grid.methods.setSelected(grid, e.detail.id, this.closest('tr'));
                    }
                },
                headerCssClass: 'gj-grid-select-all',
                stopPropagation: true
            });
        }
        
        if (!grid.element.querySelector('tbody')) {
            grid.element.appendChild(document.createElement('tbody'));
        }

        gj.grid.methods.renderHeader(grid);
        gj.grid.methods.appendEmptyRow(grid, '&nbsp;');
        gj.grid.events.initialized(grid.element);
    },

    localization: function (data) {
        if (!data.notFoundText) {
            data.notFoundText = gj.grid.messages[data.locale].NoRecordsFound;
        }
    },

    renderHeader: function (grid) {
        let data, columns, style, thead, row, cell, title, i, checkAllBoxes;

        data = grid.getConfig();
        columns = data.columns;
        style = data.style.header;

        thead = grid.element.querySelector('thead');
        if (!thead) {
            thead = document.createElement('thead');
            grid.element.insertBefore(thead, grid.element.firstChild);
        }

        row = document.createElement('tr');
        row.setAttribute('data-gj-role', 'caption');
        for (i = 0; i < columns.length; i += 1) {
            cell = document.createElement('th');
            cell.setAttribute('data-gj-field', columns[i].field || '');
            if (columns[i].width) {
                cell.setAttribute('width', columns[i].width);
            } else if (columns[i].type === 'checkbox') {
                cell.setAttribute('width', data.defaultIconColumnWidth);
            }
            gj.core.addClasses(cell, style.cell);
            if (columns[i].headerCssClass) {
                gj.core.addClasses(cell, columns[i].headerCssClass);
            }
            cell.style.textAlign = columns[i].align || 'left';
            if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType &&
                'checkbox' === columns[i].type && 'selectRow' === columns[i].role) {
                checkAllBoxes = cell.querySelector('input[data-gj-role="selectAll"]');
                if (!checkAllBoxes) {
                    checkAllBoxes = document.createElement('input');
                    checkAllBoxes.setAttribute('type', 'checkbox');
                    checkAllBoxes.setAttribute('data-gj-role', 'selectAll');
                    cell.appendChild(checkAllBoxes);
                    new GijgoCheckBox(checkAllBoxes, { uiLibrary: data.uiLibrary });
                }
                checkAllBoxes.addEventListener('click', function () {
                    if (this.checked) {
                        grid.selectAll();
                    } else {
                        grid.unSelectAll();
                    }
                });
            } else {
                title = document.createElement('div');
                title.setAttribute('data-gj-role', 'title');
                title.innerHTML = typeof (columns[i].title) === 'undefined' ? (columns[i].field || '') : columns[i].title;
                cell.appendChild(title);
                if (columns[i].sortable) {
                    gj.core.addClasses(title, style.sortable);
                    title.addEventListener('click', gj.grid.methods.createSortHandler(grid, columns[i]));
                }
            }
            if (columns[i].hidden) {
                cell.style.display = 'none';
            }
            row.appendChild(cell);
        }

        thead.innerHTML = '';
        thead.appendChild(row);
    },

    createSortHandler: function (grid, column) {
        return function () {
            let data, params = {};
            if (grid.count() > 0) {
                data = grid.getConfig();
                params[data.paramNames.sortBy] = column.field;
                column.direction = (column.direction === 'asc' ? 'desc' : 'asc');
                params[data.paramNames.direction] = column.direction;
                grid.reload(params);
            }
        };
    },

    updateHeader: function (grid) {
        let cellTitle, columns,
            data = grid.getConfig(),
            sortBy = data.params[data.paramNames.sortBy],
            direction = data.params[data.paramNames.direction],
            softIcon = grid.element.querySelector('thead tr th [data-gj-role="sorticon"]');

        softIcon && softIcon.remove();

        if (sortBy) {
            position = gj.grid.methods.getColumnPosition(grid.getConfig().columns, sortBy);
            if (position > -1) {
                columns = grid.element.querySelectorAll('thead tr th div[data-gj-role="title"]');
                cellTitle = columns[position];
                sortIcon = document.createElement('div');
                sortIcon.setAttribute('data-gj-role', 'sorticon');
                sortIcon.classList.add('gj-unselectable');
                sortIcon.innerHTML = ('desc' === direction) ? data.icons.desc : data.icons.asc;
                cellTitle.parentNode.appendChild(sortIcon);
            }
        }
    },

    useHtmlDataSource: function (grid, data) {
        let dataSource = [], i, j, cells, record,
            rows = grid.element.querySelectorAll('tbody tr:not([data-gj-role="empty"])');
        for (i = 0; i < rows.length; i++) {
            cells = rows[i].querySelectorAll('td');
            record = {};
            for (j = 0; j < cells.length; j++) {
                record[data.columns[j].field] = cells[j].innerHTML;
            }
            dataSource.push(record);
        }
        data.dataSource = dataSource;
    },

    startLoading: function (grid) {
        let tbody, cover, loading, width, height, top, data;
        gj.grid.methods.stopLoading(grid);
        data = grid.getConfig();
        if (0 === gj.core.height(grid.element)) {
            return;
        }
        tbody = grid.element.querySelector('tbody');
        width = gj.core.width(tbody);
        height = gj.core.height(tbody);
        top = gj.core.height(grid.element.querySelector('thead'));
        cover = document.createElement('div');
        cover.setAttribute('data-gj-role','loading-cover');
        gj.core.addClasses(cover, data.style.loadingCover);
        cover.style.width = width + 'px';
        cover.style.height = height + 'px';
        cover.style.top = top + 'px';
        loading = document.createElement('div');
        loading.setAttribute('data-gj-role','loading-text');
        gj.core.addClasses(loading, data.style.loadingText);
        loading.innerHTML = gj.grid.messages[data.locale].Loading;
        grid.element.parentNode.appendChild(loading);
        grid.element.parentNode.appendChild(cover);
        loading.style.top = (top + (height / 2) - (gj.core.height(loading) / 2)) + 'px';
        loading.style.left = ((width / 2) - (gj.core.width(loading) / 2)) + 'px';
    },

    stopLoading: function (grid) {
        let cover = grid.element.parentNode.querySelector('div[data-gj-role="loading-cover"]'),
            text = grid.element.parentNode.querySelector('div[data-gj-role="loading-text"]');
        cover && cover.remove();
        text && text.remove();
    },

    appendEmptyRow: function (grid, caption) {
        let data, row, cell, text;
        data = grid.getConfig();
        row = document.createElement('tr');
        row.setAttribute('data-gj-role', 'empty');
        cell = document.createElement('td');
        cell.style.width = '100%';
        cell.style.textAlign = 'center';
        cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
        text = document.createElement('div');
        text.innerHTML = caption || data.notFoundText;
        cell.appendChild(text);
        row.appendChild(cell);

        gj.grid.events.beforeEmptyRowInsert(grid.element);

        grid.element.querySelector('tbody').appendChild(row);
    },

    autoGenerateColumns: function (grid, records) {
        let names, value, type, i, data = grid.getConfig();
        data.columns = [];
        if (records.length > 0) {
            names = Object.getOwnPropertyNames(records[0]);
            for (i = 0; i < names.length; i++) {
                value = records[0][names[i]];
                type = 'text';
                if (value) {
                    if (typeof value === 'number') {
                        type = 'number';
                    } else if (value.indexOf('/Date(') > -1) {
                        type = 'date';
                    }
                }
                data.columns.push({ field: names[i], type: type });
            }
            gj.grid.methods.setDefaultColumnConfig(data.columns, data.defaultColumnSettings);
        }
        gj.grid.methods.renderHeader(grid);
    },

    loadData: function (grid) {
        let data, records, i, recLen, rowCount, tbody, rows;

        data = grid.getConfig();
        records = grid.getAll();
        gj.grid.events.dataBinding(grid.element, records);
        recLen = records.length;
        gj.grid.methods.stopLoading(grid);

        if (data.autoGenerateColumns) {
            gj.grid.methods.autoGenerateColumns(grid, records);
        }

        tbody = grid.element.querySelector('tbody');
        if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType) {
            grid.element.querySelector('thead input[data-gj-role="selectAll"]').checked = false;
        }
        rows = tbody.querySelectorAll('tr:not([data-gj-role="row"])')
        rows && rows.forEach(row => row.remove());
        if (0 === recLen) {
            tbody.innerHTML = '';
            gj.grid.methods.appendEmptyRow(grid);
        }

        rows = tbody.querySelectorAll('tr[data-gj-role="row"]');

        rowCount = rows.length;

        for (i = 0; i < rowCount; i++) {
            if (i < recLen) {
                gj.grid.methods.renderRow(grid, rows[i], records[i], i);
            } else {
                rows[i].remove();
            }
        }

        for (i = rowCount; i < recLen; i++) {
            gj.grid.methods.renderRow(grid, null, records[i], i);
        }
        gj.grid.events.dataBound(grid.element, records, grid.getTotalRecords());
    },

    getId: function (record, primaryKey, position) {
        return (primaryKey && record[primaryKey]) ? record[primaryKey] : position;
    },

    renderRow: function (grid, row, record, position) {
        let id, cell, i, data, mode;
        data = grid.getConfig();
        if (!row) {
            mode = 'create';
            row = document.createElement('tr');
            row.setAttribute('data-gj-role', 'row');
            grid.element.querySelector('tbody').appendChild(row);
        } else {
            mode = 'update';
            row.classList.remove(data.style.content.rowSelected)
            row.removeAttribute('data-gj-selected')
            gj.core.off(row, 'click');
        }
        id = gj.grid.methods.getId(record, data.primaryKey, (position + 1));
        row.setAttribute('data-gj-position', position + 1);
        if (data.selectionMethod !== 'checkbox') {
            row.addEventListener('click', gj.grid.methods.createRowClickHandler(grid, id));
        }
        for (i = 0; i < data.columns.length; i++) {
            if (mode === 'update') {
                cell = row.children[i];
                gj.grid.methods.renderCell(grid, cell, data.columns[i], record, id);
            } else {
                cell = gj.grid.methods.renderCell(grid, null, data.columns[i], record, id);
                row.appendChild(cell);
            }
        }
        gj.grid.events.rowDataBound(grid.element, row, id, record);
    },

    renderCell: function (grid, cell, column, record, id, mode) {
        let displayEl, key;

        if (!cell) {
            cell = document.createElement('td');
            displayEl = document.createElement('div');
            displayEl.setAttribute('data-gj-role', 'display');
            if (column.align) {
                cell.style.textAlign = column.align;
            }
            if (column.cssClass) {
                gj.core.addClasses(cell, column.cssClass);
            }
            cell.appendChild(displayEl);
            mode = 'create';
        } else {
            displayEl = cell.querySelector('div[data-gj-role="display"]');
            mode = 'update';
        }

        gj.grid.methods.renderDisplayElement(grid, displayEl, column, record, id, mode);

        //remove all event handlers
        if ('update' === mode) {
            gj.core.off(cell);
            gj.core.off(displayEl);
        }
        if (column.events) {
            for (key in column.events) {
                if (column.events.hasOwnProperty(key)) {
                    gj.core.on(cell, key, gj.grid.methods.createCellEventHandler(column, column.events[key], { id: id, field: column.field, record: record }));
                }
            }
        }
        if (column.hidden) {
            cell.style.display = 'none';
        }

        gj.grid.events.cellDataBound(grid.element, displayEl, id, column, record);

        return cell;
    },

    createCellEventHandler: function (column, func, detail) {
        return function (e) {
            if (column.stopPropagation) {
                e.stopPropagation();
            }
            e.detail = detail;
            func.call(this, e, detail.id, detail.field, detail.record);
        };
    },

    renderDisplayElement: function (grid, displayEl, column, record, id, mode) {
        let text, checkbox, icon;

        if ('checkbox' === column.type && gj.checkbox) {
            if ('create' === mode) {
                checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = id;
                checkbox.checked = record[column.field] ? true : false;
                column.role && checkbox.setAttribute('data-gj-role', column.role);
                displayEl.appendChild(checkbox);
                new GijgoCheckBox(checkbox, { uiLibrary: grid.getConfig().uiLibrary });
                if (column.role === 'selectRow') {
                    checkbox.addEventListener('click', function () { return false; });
                } else {
                    checkbox.disabled = true;
                }
            } else {
                checkbox = displayEl.querySelector('input[type="checkbox"]');
                checkbox.value = id;
                checkbox.checked = record[column.field] ? true : false;
            }
        } else if ('icon' === column.type) {
            if ('create' === mode) {
                icon = document.createElement('span');
                gj.core.addClasses(icon, column.icon);
                icon.style.cursor = 'pointer';
                displayEl.appendChild(icon);
                grid.getConfig().uiLibrary === 'bootstrap' && displayEl.querySelector('span').classList.add('glyphicon');
                column.stopPropagation = true;
            }
        } else if (column.tmpl) {
            text = column.tmpl;
            column.tmpl.replace(/\{(.+?)\}/g, function ($0, $1) {
                text = text.replace($0, gj.grid.methods.formatText(record[$1], column));
            });
            displayEl.innerHTML = text;
        } else if (column.renderer && typeof (column.renderer) === 'function') {
            text = column.renderer(record[column.field], record, displayEl.parentNode, displayEl, id, grid);
            if (text) {
                displayEl.innerHTML = text;
            }
        } else {
            record[column.field] = gj.grid.methods.formatText(record[column.field], column);
            if (!column.tooltip && record[column.field]) {
                displayEl.setAttribute('title', record[column.field]);
            }
            displayEl.innerHTML = record[column.field];
        }
        if (column.tooltip && 'create' === mode) {
            displayEl.setAttribute('title', column.tooltip);
        }
    },

    formatText: function (text, column) {
        if (text && ['date', 'time', 'datetime'].indexOf(column.type) > -1) {
            text = gj.core.formatDate(gj.core.parseDate(text, column.format), column.format);
        } else {
            text = (typeof (text) === 'undefined' || text === null) ? '' : text.toString();
        }
        if (column.decimalDigits && text) {
            text = parseFloat(text).toFixed(column.decimalDigits);
        }
        return text;
    },

    setRecordsData: function (grid, response) {
        let records = [],
            totalRecords = 0,
            data = grid.getConfig();
        if (Array.isArray(response)) {
            records = response;
            totalRecords = response.length;
        } else if (data && data.mapping && Array.isArray(response[data.mapping.dataField])) {
            records = response[data.mapping.dataField];
            totalRecords = response[data.mapping.totalRecordsField];
            if (!totalRecords || isNaN(totalRecords)) {
                totalRecords = 0;
            }
        }
        grid.setRecords(records);
        grid.setTotalRecords(totalRecords);
        return records;
    },

    createRowClickHandler: function (grid, id) {
        return function () {
            gj.grid.methods.setSelected(grid, id, this);
        };
    },

    selectRow: function (grid, data, row, id) {
        let checkbox;
        gj.core.addClasses(row, data.style.content.rowSelected);
        row.setAttribute('data-gj-selected', 'true');
        if ('checkbox' === data.selectionMethod) {
            checkbox = row.querySelector('input[type="checkbox"][data-gj-role="selectRow"]');
            if (checkbox && !checkbox.checked) {
                checkbox.checked = true;
            }
            if ('multiple' === data.selectionType && grid.getSelections().length === grid.count(false)) {
                checkbox = grid.element.querySelector('thead input[data-gj-role="selectAll"]');
                if (checkbox && !checkbox.checked) {
                    checkbox.checked = true;
                }
            }
        }
        return gj.grid.events.rowSelect(grid.element, row, id, grid.getById(id));
    },

    unselectRow: function (grid, data, row, id) {
        let checkbox;
        if (row.getAttribute('data-gj-selected') === 'true') {
            gj.core.removeClasses(row, data.style.content.rowSelected);
            if ('checkbox' === data.selectionMethod) {
                checkbox = row.querySelector('td input[type="checkbox"][data-gj-role="selectRow"]');
                if (checkbox && checkbox.checked) {
                    checkbox.checked = false;
                }
                if ('multiple' === data.selectionType) {
                    checkbox = grid.element.querySelector('thead input[data-gj-role="selectAll"]');
                    if (checkbox && checkbox.checked) {
                        checkbox.checked = false;
                    }
                }
            }
            row.removeAttribute('data-gj-selected');
            return gj.grid.events.rowUnselect(grid.element, row, id, grid.getById(id));
        }
    },

    setSelected: function (grid, id, row) {
        let data = grid.getConfig(), rows;
        if (!row) {
            row = gj.grid.methods.getRowById(grid, id);
        }
        if (row) {
            if (row.getAttribute('data-gj-selected') === 'true') {
                gj.grid.methods.unselectRow(grid, data, row, id);
            } else {
                if ('single' === data.selectionType) {
                    rows = row.parentNode.querySelectorAll('[data-gj-selected="true"]');
                    for (let i = 0; i < rows.length; i++)
                    {
                        gj.grid.methods.unselectRow(grid, data, rows[i], gj.grid.methods.getId(rows[i], data.primaryKey, rows[i].getAttribute('data-gj-position')));
                    }
                }
                gj.grid.methods.selectRow(grid, data, row, id);
            }
        }
        return grid;
    },

    selectAll: function (grid) {
        let data = grid.getConfig(), row, position, record, id,
            rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
        
        for (let i = 0; i < rows.length; i++)
        {
            position = rows[i].getAttribute('data-gj-position'),
            record = grid.get(position),
            id = gj.grid.methods.getId(record, data.primaryKey, position);
            gj.grid.methods.selectRow(grid, data, rows[i], id);
        };
        grid.element.querySelector('thead input[data-gj-role="selectAll"]').checked = true;
        return grid;
    },

    unSelectAll: function (grid) {
        let data = grid.getConfig(), row, position, record, id,
            rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
        
        for (let i = 0; i < rows.length; i++)
        {
            position = rows[i].getAttribute('data-gj-position'),
            record = grid.get(position),
            id = gj.grid.methods.getId(record, data.primaryKey, position);
            gj.grid.methods.unselectRow(grid, data, rows[i], id);
        };
        grid.element.querySelector('thead input[data-gj-role="selectAll"]').checked = false;
        return grid;
    },

    getSelected: function (grid) {
        let result = null, selection, record, position;
        selection = grid.element.querySelector('tbody>tr[data-gj-selected="true"]');
        if (selection) {
            position = selection.getAttribute('data-gj-position');
            record = grid.get(position);
            result = gj.grid.methods.getId(record, grid.getConfig().primaryKey, position);
        }
        return result;
    },

    getSelectedRows: function (grid) {
        return grid.element.querySelectorAll('tbody>tr[data-gj-selected="true"]');
    },

    getSelections: function (grid) {
        let result = [], position, record,
            data = grid.getConfig(),
            selections = gj.grid.methods.getSelectedRows(grid);
        if (0 < selections.length) {
            for (let i = 0; i < selections.length; i++) {
                position = selections[i].getAttribute('data-gj-position');
                record = grid.get(position);
                result.push(gj.grid.methods.getId(record, data.primaryKey, position));
            }
        }
        return result;
    },

    getById: function (grid, id) {
        let result = null, i, primaryKey = grid.getConfig().primaryKey, records = grid.getRecords();
        if (primaryKey) {
            for (i = 0; i < records.length; i++) {
                if (records[i][primaryKey] == id) {
                    result = records[i];
                    break;
                }
            }
        } else {
            result = grid.get(id);
        }
        return result;
    },

    getRecVPosById: function (grid, id) {
        let result = id, i, data = grid.getConfig();
        if (data.primaryKey) {
            for (i = 0; i < data.dataSource.length; i++) {
                if (data.dataSource[i][data.primaryKey] == id) {
                    result = i;
                    break;
                }
            }
        }
        return result;
    },

    getRowById: function (grid, id) {
        let records = grid.getAll(false),
            primaryKey = grid.getConfig().primaryKey,
            result = undefined,
            position,
            i;
        if (primaryKey) {
            for (i = 0; i < records.length; i++) {
                if (records[i][primaryKey] == id) {
                    position = i + 1;
                    break;
                }
            }
        } else {
            position = id;
        }
        if (position) {
            result = grid.element.querySelector('tbody tr[data-gj-position="' + position + '"]');
        }
        return result;
    },

    getByPosition: function (grid, position) {
        return grid.getAll(false)[position - 1];
    },

    getColumnPosition: function (columns, field) {
        let position = -1, i;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].field === field) {
                position = i;
                break;
            }
        }
        return position;
    },

    getColumnInfo: function (grid, field) {
        let i, result = {}, data = grid.getConfig();
        for (i = 0; i < data.columns.length; i += 1) {
            if (data.columns[i].field === field) {
                result = data.columns[i];
                break;
            }
        }
        return result;
    },

    getCell: function (grid, id, field) {
        let position, row, result = null;
        position = gj.grid.methods.getColumnPosition(grid.getConfig().columns, field);
        if (position > -1) {
            row = gj.grid.methods.getRowById(grid, id);
            result = row.children[position].querySelector('div[data-gj-role="display"]');
        }
        return result;
    },

    setCellContent: function (grid, id, field, value) {
        let column, displayEl = gj.grid.methods.getCell(grid, id, field);
        if (displayEl) {
            displayEl.innerHTML = '';
            if (typeof (value) === 'object') {
                displayEl.appendChild(value);
            } else {
                column = gj.grid.methods.getColumnInfo(grid, field);
                gj.grid.methods.renderDisplayElement(grid, displayEl, column, grid.getById(id), id, 'update');
            }
        }
    },

    clone: function (source) {
        let target = [];
        for(let i = 0; i < source.length; i++) {
            target.push(source[i].cloneNode(true));
        };
        return target;
    },

    getAll: function (grid) {
        return grid.getRecords();
    },

    countVisibleColumns: function (grid) {
        let columns, count, i;
        columns = grid.getConfig().columns;
        count = 0;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].hidden !== true) {
                count++;
            }
        }
        return count;
    },

    clear: function (grid, showNotFoundText) {
        let data = grid.getConfig();
        grid.xhr && grid.xhr.abort();
        grid.element.querySelector('tbody').innerHTML = '';
        grid.setRecords([]);
        gj.grid.methods.stopLoading(grid);
        gj.grid.methods.appendEmptyRow(grid, showNotFoundText ? data.notFoundText : '&nbsp;');
        gj.grid.events.dataBound(grid.element, [], 0);
        return grid;
    },

    render: function (grid, response) {
        if (response) {
            gj.grid.methods.setRecordsData(grid, response);
            gj.grid.methods.updateHeader(grid);
            gj.grid.methods.loadData(grid);
        }
        return grid;
    },

    filter: function (grid) {
        let field, column,
            data = grid.getConfig(),
            records = data.dataSource.slice();

        if (data.params[data.paramNames.sortBy]) {
            column = gj.grid.methods.getColumnInfo(grid, data.params[data.paramNames.sortBy]);
            records.sort(column.sortable.sorter ? column.sortable.sorter(column.direction, column) : gj.grid.methods.createDefaultSorter(column.direction, column.field));
        }

        for (field in data.params) {
            if (data.params[field] && !data.paramNames[field]) {
                column = gj.grid.methods.getColumnInfo(grid, field);
                records = records.filter(function (record) {
                    let value = record[field] || '',
                        searchStr = data.params[field] || '';
                    return column && typeof (column.filter) === 'function' ? column.filter(value, searchStr) : (value.toUpperCase().indexOf(searchStr.toUpperCase()) > -1);
                });
            }
        }

        gj.grid.events.dataFiltered(grid.element, records);

        return records;
    },

    createDefaultSorter: function (direction, field) {
        return function (recordA, recordB) {
            let a = (recordA[field] || '').toString(),
                b = (recordB[field] || '').toString();
            return (direction === 'asc') ? a.localeCompare(b) : b.localeCompare(a);
        };
    },

    destroy: function (grid, keepTableTag, keepWrapperTag) {
        let data = grid.getConfig();
        if (data) {
            gj.grid.events.destroying(grid.element);
            gj.grid.methods.stopLoading(grid);
            grid.xhr && grid.xhr.abort();
            grid.off();
            if (!keepWrapperTag && grid.element.parentNode.getAttribute('data-gj-role') === 'wrapper') {
                grid.unwrap();
            }
            grid.removeConfig();
            grid.removeRecords();
            grid.removeTotalRecords();
            if (keepTableTag === false) {
                grid.element.remove();
            } else {
                grid.element.className = '';
            }
            grid.element.removeAttribute('data-gj-type');
            grid.element.removeAttribute('data-gj-guid');
        }
        return grid;
    },

    showColumn: function (grid, field) {
        let data = grid.getConfig(),
            position = gj.grid.methods.getColumnPosition(data.columns, field),
            rows, cell;

        if (position > -1) {
            rows = grid.element.querySelectorAll('thead > tr');
            for (let i = 0; i < rows.length; i++) {
                rows[i].children[position].style.display = 'block';
            }
            rows = grid.element.querySelectorAll('tbody > tr[data-gj-role="row"]');
            for (let i = 0; i < rows.length; i++) {
                rows[i].children[position].style.display = 'block';
            }
            data.columns[position].hidden = false;

            cell = grid.element.querySelector('tbody > tr[data-gj-role="empty"] > td');
            if (cell) {
                cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
            }

            gj.grid.events.columnShow(grid.element, data.columns[position]);
        }

        return grid;
    },

    hideColumn: function (grid, field) {
        let data = grid.getConfig(),
            position = gj.grid.methods.getColumnPosition(data.columns, field),
            rows, cell;

        if (position > -1) {
            rows = grid.element.querySelectorAll('thead > tr');
            for (let i = 0; i < rows.length; i++) {
                rows[i].children[position].style.display = 'none';
            }
            rows = grid.element.querySelectorAll('tbody > tr[data-gj-role="row"]');
            for (let i = 0; i < rows.length; i++) {
                rows[i].children[position].style.display = 'none';
            }
            data.columns[position].hidden = true;

            cell = grid.element.querySelector('tbody > tr[data-gj-role="empty"] > td');
            if (cell) {
                cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
            }

            gj.grid.events.columnHide(grid.element, data.columns[position]);
        }

        return grid;
    },

    isLastRecordVisible: function () {
        return true;
    },

    addRow: function (grid, record) {
        let data = grid.getConfig(),
            records = grid.getRecords();
        data.totalRecords = grid.getTotalRecords() + 1;
        gj.grid.events.dataBinding(grid.element, [record]);
        records.push(record);
        grid.setRecords(records);
        if (Array.isArray(data.dataSource)) {
            data.dataSource.push(record);
        }
        if (grid.getTotalRecords() === 0) {
            grid.element.querySelector('tbody').innerHTML = '';
        }
        if (gj.grid.methods.isLastRecordVisible(grid)) {
            gj.grid.methods.renderRow(grid, null, record, grid.count() - 1);
        }
        gj.grid.events.dataBound(grid.element, [record], data.totalRecords);
        return grid;
    },

    updateRow: function (grid, id, record) {
        let row = gj.grid.methods.getRowById(grid, id),
            data = grid.getConfig(), records = grid.getRecords(), position;
        records[row.getAttribute('data-gj-position') - 1] = record;
        grid.setRecords(records);
        if (Array.isArray(data.dataSource)) {
            position = gj.grid.methods.getRecVPosById(grid, id);
            data.dataSource[position] = record;
        }
        gj.grid.methods.renderRow(grid, row, record, Array.from(row.parentNode.children).indexOf(row));
        return grid;
    },

    removeRow: function (grid, id) {
        let position,
            data = grid.getConfig(),
            row = gj.grid.methods.getRowById(grid, id);

        gj.grid.events.rowRemoving(grid.element, row, id, grid.getById(id));
        if (Array.isArray(data.dataSource)) {
            position = gj.grid.methods.getRecVPosById(grid, id);
            data.dataSource.splice(position, 1);
        }
        grid.reload();
        return grid;
    },

    count: function (grid, includeAllRecords) {
        return includeAllRecords ? grid.getTotalRecords(): grid.getAll().length;
    },

    getColumnPositionByRole: function (grid, role) {
        let i, result, columns = grid.getConfig().columns;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].role === role) {
                result = i;
                break;
            }
        }
        return result;
    },

    getColumnPositionNotInRole: function (grid) {
        let i, result = 0, columns = grid.getConfig().columns;
        for (i = 0; i < columns.length; i++) {
            if (!columns[i].role) {
                result = i;
                break;
            }
        }
        return result;
    }
};

/**
  * @widget Grid
  * @plugin Base
  */
GijgoGrid = function (element, jsConfig) {
    var self = this,
        methods = gj.grid.methods;

    self.type = 'grid';
    self.element = element;

    /**
     * Reload the data in the grid from a data source.
     * @method
     * @param {object} params - An object that contains a list with parameters that are going to be send to the server.
     * @fires beforeEmptyRowInsert, dataBinding, dataBound, cellDataBound
     * @return grid
     * @example sample <!-- grid -->
     * <input type="text" id="txtSearch">
     * <button id="btnSearch">Search</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     document.getElementById('btnSearch').addEventListener('click', function () {
     *         grid.reload({ name: document.getElementById('txtSearch').value });
     *     });
     * </script>
     */
    self.reload = function (params) {
        methods.startLoading(this);
        return gj.widget.prototype.reload.call(this, params);
    };

    /**
     * Clear the content in the grid.
     * @method
     * @param {boolean} showNotFoundText - Indicates if the "Not Found" text is going to show after the clearing of the grid.
     * @return grid
     * @example sample <!-- grid, dropdown -->
     * <button id="btnClear" class="gj-button-md">Clear</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         pager: { limit: 5 }
     *     });
     *     document.getElementById('btnClear').addEventListener('click', function () {
     *         grid.clear();
     *     });
     * </script>
     */
    self.clear = function (showNotFoundText) {
        return methods.clear(this, showNotFoundText);
    };

    /**
     * Return the number of records in the grid. By default return only the records that are visible in the grid.
     * @method
     * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
     * @return number
     * @example Local.DataSource <!-- grid, dropdown, bootstrap5 -->
     * <button class="btn btn-primary" onclick="alert(grid.count())">Count Visible Records</button>
     * <button class="btn btn-primary" onclick="alert(grid.count(true))">Count All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var data, grid;
     *     data = [
     *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *     ];
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap5',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     * @example Remote.DataSource <!-- grid, dropdown, bootstrap5 -->
     * <button class="btn btn-primary" onclick="alert(grid.count())">Count Visible Records</button>
     * <button class="btn btn-primary" onclick="alert(grid.count(true))">Count All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap5',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     */
    self.count = function (includeAllRecords) {
        return methods.count(this, includeAllRecords);
    };

    /**
     * Render data in the grid
     * @method
     * @param {object} response - An object that contains the data that needs to be loaded in the grid.
     * @fires beforeEmptyRowInsert, dataBinding, dataBound, cellDataBound
     * @return grid
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid, onSuccessFunc;
     *     onSuccessFunc = function (e) {
     *         //you can modify the response here if needed
     *         grid.render(JSON.parse(this.response));
     *     };
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: { url: '/Players/Get', success: onSuccessFunc },
     *         columns: [ { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     * </script>
     */
    self.render = function (response) {
        return methods.render(this, response);
    };

    /**
     * Destroy the grid. This method remove all data from the grid and all events attached to the grid.
     * @additionalinfo The grid table tag and wrapper tag are kept by default after the execution of destroy method,
     * but you can remove them if you pass false to the keepTableTag and keepWrapperTag parameters.
     * @method
     * @param {boolean} keepTableTag - If this flag is set to false, the table tag will be removed from the HTML dom tree.
     * @param {boolean} keepWrapperTag - If this flag is set to false, the table wrapper tag will be removed from the HTML dom tree.
     * @fires destroying
     * @return void
     * @example keep.wrapper.and.table <!-- grid -->
     * <button class="gj-button-md" id="btnDestroy">Destroy</button>
     * <button class="gj-button-md" id="btnCreate">Create</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     let grid, createFunc = function() {
     *         grid = new GijgoGrid(document.getElementById('grid'), {
     *             dataSource: '/Players/Get',
     *             columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *         });
     *     };
     *     createFunc();
     *     document.getElementById('btnDestroy').addEventListener('click', function () {
     *         grid.destroy(true, true);
     *     });
     *     document.getElementById('btnCreate').addEventListener('click', function () {
     *         createFunc();
     *     });
     * </script>
     * @example remove.wrapper.and.table <!-- grid -->
     * <button class="gj-button-md" id="btnRemove">Remove</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     document.getElementById('btnRemove').addEventListener('click', function () {
     *         grid.destroy();
     *     });
     * </script>
     */
    self.destroy = function (keepTableTag, keepWrapperTag) {
        return methods.destroy(this, keepTableTag, keepWrapperTag);
    };

    /**
     * Select a row from the grid based on id parameter.
     * @method
     * @param {string} id - The id of the row that needs to be selected
     * @return grid
     * @example sample <!-- checkbox, grid -->
     * <input type="text" id="txtNumber" value="1" />
     * <button id="btnSelect" class="gj-button-md">Select</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     document.getElementById('btnSelect').addEventListener('click', function () {
     *         grid.setSelected(parseInt(document.getElementById('txtNumber').value, 10));
     *     });
     * </script>
     */
    self.setSelected = function (id) {
        return methods.setSelected(this, id);
    };

    /**
     * Return the id of the selected record.
     * If the multiple selection method is one this method is going to return only the id of the first selected record.
     * @method
     * @return string
     * @example sample <!-- checkbox, grid -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selection</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox'
     *     });
     *     document.getElementById('btnShowSelection').addEventListener('click', function () {
     *         alert(grid.getSelected());
     *     });
     * </script>
     */
    self.getSelected = function () {
        return methods.getSelected(this);
    };

    /**
     * Return an array with the ids of the selected record.
     * @additionalinfo Specify primaryKey if you want to use field from the dataSource as identificator for selection.
     * @method
     * @return array
     * @example With.Primary.Ket <!-- checkbox, grid, dropdown -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selections</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid, data = [
     *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
     *         { 'ID': 104, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' }
     *     ];
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: data,
     *         primaryKey: 'ID',
     *         columns: [ { field: 'ID', width: 70 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     document.getElementById('btnShowSelection').addEventListener('click', function () {
     *         var selections = grid.getSelections();
     *         alert(selections.join());
     *     });
     * </script>
     * @example Without.Primary.Ket <!-- checkbox, grid, dropdown -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selections</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid, data = [
     *         { 'ID': 101, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 102, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 103, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
     *         { 'ID': 104, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' }
     *     ];
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 70 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     document.getElementById('btnShowSelection').addEventListener('click', function () {
     *         var selections = grid.getSelections();
     *         alert(selections.join());
     *     });
     * </script>
     */
    self.getSelections = function () {
        return methods.getSelections(this);
    };

    /**
     * Select all records from the grid.
     * @method
     * @return grid
     * @example sample <!-- checkbox, grid -->
     * <button id="btnSelectAll" class="gj-button-md">Select All</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple'
     *     });
     *     document.getElementById('btnSelectAll').addEventListener('click', function () {
     *         grid.selectAll();
     *     });
     * </script>
     */
    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all records from the grid.
     * @method
     * @return void
     * @example sample <!-- checkbox, grid -->
     * <button id="btnSelectAll" class="gj-button-md">Select All</button>
     * <button id="btnUnSelectAll" class="gj-button-md">UnSelect All</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         selectionMethod: 'checkbox',
     *         selectionType: 'multiple'
     *     });
     *     document.getElementById('btnSelectAll').addEventListener('click', function () {
     *         grid.selectAll();
     *     });
     *     document.getElementById('btnUnSelectAll').addEventListener('click', function () {
     *         grid.unSelectAll();
     *     });
     * </script>
     */
    self.unSelectAll = function () {
        return methods.unSelectAll(this);
    };

    /**
     * Return record by id of the record.
     * @method
     * @param {string} id - The id of the row that needs to be returned.
     * @return object
     * @example sample <!-- grid -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         primaryKey: 'ID' //define the name of the column that you want to use as ID here.
     *     });
     *     document.getElementById('btnGetData').addEventListener('click', function () {
     *         var data = grid.getById('2');
     *         alert(data.Name + ' born in ' + data.PlaceOfBirth);
     *     });
     * </script>
     */
    self.getById = function (id) {
        return methods.getById(this, id);
    };

    /**
     * Return record from the grid based on position.
     * @method
     * @param {number} position - The position of the row that needs to be return.
     * @return object
     * @example sample <!-- grid -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     document.getElementById('btnGetData').addEventListener('click', function () {
     *         var data = grid.get(3);
     *         alert(data.Name + ' born in ' + data.PlaceOfBirth);
     *     });
     * </script>
     */
    self.get = function (position) {
        return methods.getByPosition(this, position);
    };

    /**
     * Return an array with all records presented in the grid.
     * @method
     * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
     * @return number
     * @example Local.DataSource <!-- grid, bootstrap5 -->
     * <button onclick="alert(JSON.stringify(grid.getAll()))" class="btn btn-default">Get All Visible Records</button>
     * <button onclick="alert(JSON.stringify(grid.getAll(true)))" class="btn btn-default">Get All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var data, grid;
     *     data = [
     *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *     ];
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: data,
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap5',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     * @example Remote.DataSource <!-- grid, bootstrap5 -->
     * <button onclick="alert(JSON.stringify(grid.getAll()))" class="btn btn-default">Get All Visible Records</button>
     * <button onclick="alert(JSON.stringify(grid.getAll(true)))" class="btn btn-default">Get All Records</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
     *         uiLibrary: 'bootstrap5',
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     */
    self.getAll = function (includeAllRecords) {
        return methods.getAll(this, includeAllRecords);
    };

    /**
     * Show hidden column.
     * @method
     * @param {string} field - The name of the field bound to the column.
     * @return grid
     * @example sample <!-- grid -->
     * <button id="btnShowColumn" class="gj-button-md">Show Column</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth', hidden: true } ]
     *     });
     *     document.getElementById('btnShowColumn').addEventListener('click', function () {
     *         grid.showColumn('PlaceOfBirth');
     *     });
     * </script>
     */
    self.showColumn = function (field) {
        return methods.showColumn(this, field);
    };

    /**
     * Hide column from the grid.
     * @method
     * @param {string} field - The name of the field bound to the column.
     * @return grid
     * @example sample <!-- grid -->
     * <button id="btnHideColumn" class="gj-button-md">Hide Column</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     document.getElementById('btnHideColumn').addEventListener('click', function () {
     *         grid.hideColumn('PlaceOfBirth');
     *     });
     * </script>
     */
    self.hideColumn = function (field) {
        return methods.hideColumn(this, field);
    };

    /**
     * Add new row to the grid.
     * @method
     * @param {object} record - Object with data for the new record.
     * @return grid
     * @example without.pagination <!-- grid -->
     * <button id="btnAdd" class="gj-button-md">Add Row</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
     *     });
     *     document.getElementById('btnAdd').addEventListener('click', function () {
     *         grid.addRow({ 'ID': grid.count(true) + 1, 'Name': 'Test Player', 'PlaceOfBirth': 'Test City, Test Country' });
     *     });
     * </script>
     * @example with.pagination <!-- grid, dropdown -->
     * <button id="btnAdd" class="gj-button-md">Add Row</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             {
     *                 title: '',
     *                 width: 100,
     *                 align: 'center',
     *                 tmpl: '<i class="material-icons">delete</i>',
     *                 events: { 
     *                     'click': function(e) {
     *                          grid.removeRow(e.detail.id);
     *                     }
     *                 }
     *             }
     *         ],
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     document.getElementById('btnAdd').addEventListener('click', function () {
     *         grid.addRow({ 'ID': grid.count(true) + 1, 'Name': 'Test Player', 'PlaceOfBirth': 'Test City, Test Country' });
     *     });
     * </script>
     */
    self.addRow = function (record) {
        return methods.addRow(this, record);
    };

    /**
     * Update row data.
     * @method
     * @param {string} id - The id of the row that needs to be updated
     * @param {object} record - Object with data for the new record.
     * @return grid
     * @example sample <!-- grid, dropdown -->
     * <table id="grid"></table>
     * <script>
     *     var grid;
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { title: '', width: 90, align: 'center', tmpl: '<u>Edit</u>', events: { 'click': Edit } }
     *         ],
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     *     function Edit(e, id, field, record) {
     *         grid.updateRow(id, { 'ID': id, 'Name': 'Ronaldo', 'PlaceOfBirth': 'Rio, Brazil' });
     *     }
     * </script>
     */
    self.updateRow = function (id, record) {
        return methods.updateRow(this, id, record);
    };

    //TODO: needs to be removed
    self.setCellContent = function (id, index, value) {
        methods.setCellContent(this, id, index, value);
    };

    /**
     * Remove row from the grid
     * @additionalinfo This method is design to work only with local datasources. If you use remote datasource, you need to send a request to the server to remove the row and then reload the data in the grid.
     * @method
     * @param {string} id - Id of the record that needs to be removed.
     * @return grid
     * @example Without.Pagination <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     var grid;
     *     function Delete(e, id, field, record) {
     *         if (confirm('Are you sure?')) {
     *             grid.removeRow(id);
     *         }
     *     }
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { title: '', width: 100, align: 'center', tmpl: '<u class="gj-cursor-pointer">Delete</u>', events: { 'click': Delete } }
     *         ]
     *     });
     * </script>
     * @example With.Pagination <!-- grid, dropdown -->
     * <table id="grid"></table>
     * <script>
     *     var grid;
     *     function Delete(e, id, field, record) {
     *         if (confirm('Are you sure?')) {
     *             grid.removeRow(id);
     *         }
     *     }
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: [
     *             { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
     *             { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
     *             { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
     *         ],
     *         columns: [
     *             { field: 'ID', width: 56 },
     *             { field: 'Name' },
     *             { field: 'PlaceOfBirth' },
     *             { width: 100, align: 'center', tmpl: '<u class="gj-cursor-pointer">Delete</u>', events: { 'click': Delete } }
     *         ],
     *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
     *     });
     * </script>
     */
    self.removeRow = function (id) {
        return methods.removeRow(this, id);
    };

    if ('grid' !== element.getAttribute('data-gj-type')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoGrid.prototype = new gj.widget();
GijgoGrid.constructor = GijgoGrid;

GijgoGrid.prototype.readConfig = gj.grid.methods.readConfig;
GijgoGrid.prototype.readHTMLConfig = gj.grid.methods.readHTMLConfig;


if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.grid = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoGrid(this, method);
                } else {
                    widget = new GijgoGrid(this, null);
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

/**
 * @widget Grid
 * @plugin Fixed Header
 */
gj.grid.plugins.fixedHeader = {
    config: {
        base: {

            /** If set to true, add scroll to the table body
             * @type boolean
             * @default object
             * @example Material.Design.Without.Pager <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Material.Design.With.Pager <!-- grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.3.Without.Pager <!-- bootstrap, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         height: 200,
             *         columns: [ 
             *             { field: 'ID', width: 34 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.3.With.Pager <!-- bootstrap, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         height: 200,
             *         columns: [ 
             *             { field: 'ID', width: 34 }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ 
             *             { field: 'ID', width: 42 }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             * @example Bootstrap.5.Without.Pager <!-- bootstrap5, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap5',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         height: 200,
             *         columns: [ 
             *             { field: 'ID', width: 34 },
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.5.With.Pager <!-- bootstrap5, grid -->
             * <div class="container"><table id="grid"></table></div>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap5',
             *         dataSource: '/Players/Get',
             *         fixedHeader: true,
             *         columns: [ 
             *             { field: 'ID', width: 42 }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             */
            fixedHeader: false,

            height: 300
        }
    },

    private: {
        init: function (grid) {
            let data = grid.getConfig(),
                tbody = grid.element.querySelector('tbody'),
                thead = grid.element.querySelector('thead'),
                tfoot = grid.element.querySelector('tfoot'),
                bodyHeight = data.height - gj.core.height(thead, true) - (tfoot ? gj.core.height(tfoot, true) : 0);
            grid.element.classList.add('gj-grid-scrollable');
            tbody.setAttribute('width', gj.core.height(thead, true));
            tbody.style.height = bodyHeight + 'px';
        },

        refresh: function (grid) {
            let i, width,
                data = grid.getConfig(),
                tbody = grid.element.querySelector('tbody'),
                thead = grid.element.querySelector('thead'),
                tbodyCells = grid.element.querySelectorAll('tbody tr[data-gj-role="row"] td'),
                theadCells = grid.element.querySelectorAll('thead tr[data-gj-role="caption"] th');

            if (gj.core.height(tbody) < gj.grid.plugins.fixedHeader.private.getRowsHeight(grid)) {
                tbody.style.width = (gj.core.width(thead, true) + gj.grid.plugins.fixedHeader.private.getScrollBarWidth() + (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 1 : 0)) + 'px';
            } else {
                tbody.style.width = gj.core.width(thead, true) + 'px';
            }

            for (i = 0; i < theadCells.length; i++) {
                width = gj.core.width(theadCells[i], true);
                if (i === 0 && gj.core.isIE()) {
                    width = width - 1;
                }
                tbodyCells[i].setAttribute('width', width);
            }
        },

        getRowsHeight: function (grid) {
            let total = 0, rows = grid.element.querySelectorAll('tbody tr');
            for (const row of rows) {
                total += gj.core.height(row);
            };
            return total;
        },

        getScrollBarWidth: function () {
            let inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            let outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            let w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            let w2 = inner.offsetWidth;
            if (w1 == w2) w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return (w1 - w2);
        }
    },

    public: {
    },

    events: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.fixedHeader.public);
        let data = grid.getConfig();
        if (clientConfig.fixedHeader) {
            grid.on('initialized', function () {
                gj.grid.plugins.fixedHeader.private.init(grid);
            });
            grid.on('dataBound', function () {
                gj.grid.plugins.fixedHeader.private.refresh(grid);
            });
            grid.on('resize', function () {
                gj.grid.plugins.fixedHeader.private.refresh(grid);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Expand Collapse Rows
 */
gj.grid.plugins.expandCollapseRows = {
    config: {
        base: {
            /** Template for the content in the detail section of the row.
             * Automatically add expand collapse column as a first column in the grid during initialization.
             * @type string
             * @default undefined
             * @example Material.Design <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'materialdesign',
             *         detailTemplate: '<div style="text-align: left"><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         iconsLibrary: 'fontawesome',
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             * @example Bootstrap.5.Font.Awesome <!-- bootstrap5, fontawesome, grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap5',
             *         iconsLibrary: 'fontawesome',
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
             *     });
             * </script>
             */
            detailTemplate: undefined,

            /** If set try to persist the state of expanded rows.
             * You need to specify primaryKey on the initialization of the grid in order to enable this feature.
             * @default true
             * @example True <!-- bootstrap, grid  -->
             * <div class="container">
             *     <div class="row">
             *         <div class="col-xs-12">
             *             <p>Expand row, then change the page and return back to the page with expanded row in order to see that the expansion is kept.</p>
             *             <table id="grid"></table>
             *         </div>
             *     </div>
             * </div>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         primaryKey: 'ID',
             *         dataSource: '/Players/Get',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' } ],
             *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
             *         keepExpandedRows: true,
             *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
             *     });
             * </script>
             */
            keepExpandedRows: true,

            expandedRows: [],

            icons: {
                /** Expand row icon definition.
                 * @alias icons.expandRow
                 * @type String
                 * @default '<i class="gj-icon chevron-right" />'
                 * @example Plus.Minus.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' } ],
                 *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
                 *         icons: {
                 *             expandRow: '<i class="material-icons">add</i>',
                 *             collapseRow: '<i class="material-icons">remove</i>'
                 *         }
                 *     });
                 * </script>
                 */
                expandRow: '<i class="gj-icon chevron-right" />',

                /** Collapse row icon definition.
                 * @alias icons.collapseRow
                 * @type String
                 * @default '<i class="gj-icon chevron-down" />'
                 * @example Plus.Minus.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' } ],
                 *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
                 *         icons: {
                 *             expandRow: '<i class="material-icons">add</i>',
                 *             collapseRow: '<i class="material-icons">remove</i>'
                 *         }
                 *     });
                 * </script>
                 */
                collapseRow: '<i class="gj-icon chevron-down" />'
            }
        },

        fontawesome: {
            icons: {
                expandRow: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
                collapseRow: '<i class="fa fa-angle-down" aria-hidden="true"></i>'
            }
        },

        glyphicons: {
            icons: {
                expandRow: '<span class="glyphicon glyphicon-chevron-right" />',
                collapseRow: '<span class="glyphicon glyphicon-chevron-down" />'
            }
        }
    },

    'private': {
        expandDetail: function (grid, cell, id) {
            let contentRow = cell.closest('tr'),
                contentRowIcon = cell.querySelector('div[data-gj-role="display"]'),
                detailsRow = document.createElement('tr'),
                detailsCell = document.createElement('td'), 
                detailsWrapper = document.createElement('div'), 
                data = grid.getConfig(),
                position = contentRow.getAttribute('data-gj-position'),
                record = grid.get(position),
                plugin = gj.grid.plugins.expandCollapseRows;

            detailsRow.setAttribute('data-gj-role', 'details');
            detailsCell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
            detailsWrapper.setAttribute('data-gj-role', 'display');
            detailsRow.appendChild(detailsCell);
            detailsCell.appendChild(detailsWrapper);
            detailsWrapper.innerHTML = window.gijgoStorage.get(contentRow, 'details');

            if (typeof (id) === undefined) {
                id = gj.grid.methods.getId(record, data.primaryKey, record);
            }
            contentRow.parentNode.insertBefore(detailsRow, contentRow.nextSibling);
            contentRowIcon.innerHTML = '';
            contentRowIcon.innerHTML = data.icons.collapseRow;
            grid.updateDetails(position);
            plugin.private.keepSelection(grid, id);
            plugin.events.detailExpand(grid.element, detailsWrapper, id);
        },

        collapseDetail: function (grid, cell, id) {
            let contentRow = cell.closest('tr'),
                detailsRow = contentRow.nextSibling,
                contentRowIcon = cell.querySelector('div[data-gj-role="display"]'),
                data = grid.getConfig(),
                plugin = gj.grid.plugins.expandCollapseRows;

            if (typeof (id) === undefined) {
                id = gj.grid.methods.getId(record, data.primaryKey, record);
            }
            if (detailsRow) {
                detailsRow.remove();
                contentRowIcon.innerHTML = '';
                contentRowIcon.innerHTML = data.icons.expandRow;
                plugin.private.removeSelection(grid, id);
                plugin.events.detailCollapse(grid.element, detailsRow.querySelector('td>div'), id);
            }
        },

        keepSelection: function(grid, id) {
            let data = grid.getConfig();
            if (data.keepExpandedRows) {
                if (Array.isArray(data.expandedRows)) {
                    if (data.expandedRows.indexOf(id) == -1) {
                        data.expandedRows.push(id);
                    }
                } else {
                    data.expandedRows = [id];
                }
            }
        },

        removeSelection: function (grid, id) {
            let data = grid.getConfig();
            if (data.keepExpandedRows && Array.isArray(data.expandedRows) && data.expandedRows.indexOf(id) > -1) {
                data.expandedRows.splice(data.expandedRows.indexOf(id), 1);
            }
        },

        updateDetailsColSpan: function (grid) {
            let cell = grid.element.querySelector('tbody > tr[data-role="details"] > td');
            if (cell) {
                cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
            }
        }        
    },

    'public': {

        /**
         * Collapse all grid rows.
         * @method
         * @return jQuery object
         * @example Sample <!-- grid -->
         * <button onclick="grid.expandAll()" class="gj-button-md">Expand All</button>
         * <button onclick="grid.collapseAll()" class="gj-button-md">Collapse All</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div style="text-align: left"><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ],
         *         grouping: { groupBy: 'CountryName' },
         *     });
         * </script>
         */
        collapseAll: function () {
            let grid = this, data = grid.getConfig(), position, rows;
                

            if (typeof (data.detailTemplate) !== 'undefined') {
                position = gj.grid.methods.getColumnPositionByRole(grid, 'expander');
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
                for (const row of rows) {
                    gj.grid.plugins.expandCollapseRows.private.collapseDetail(grid, row.children[position]);
                };
            }

            if (typeof (data.grouping) !== 'undefined') {
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="group"]');
                for (const row of rows) {
                    gj.grid.plugins.grouping.private.collapseGroup(data, row.children[0]);
                };
            }
            return grid;
        },

        /**
         * Expand all grid rows.
         * @method
         * @return jQuery object
         * @example Sample <!-- grid -->
         * <button onclick="grid.expandAll()" class="gj-button-md">Expand All</button>
         * <button onclick="grid.collapseAll()" class="gj-button-md">Collapse All</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div style="text-align: left"><b>Place Of Birth:</b> {PlaceOfBirth}</div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ],
         *         grouping: { groupBy: 'CountryName' },
         *     });
         * </script>
         */
        expandAll: function () {
            let grid = this, data = grid.getConfig(), position, rows;

            if (typeof (data.detailTemplate) !== 'undefined') {
                position = gj.grid.methods.getColumnPositionByRole(grid, 'expander');
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
                for (const row of rows) {
                    gj.grid.plugins.expandCollapseRows.private.expandDetail(grid, row.children[position]);
                };
            }

            if (typeof (data.grouping) !== 'undefined') {
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="group"]');
                for (const row of rows) {
                    gj.grid.plugins.grouping.private.expandGroup(data, row.children[0]);
                };
            }
            return grid;
        },

        //TODO: add documentation
        updateDetails: function (position) {
            let grid = this,
                detailWrapper = grid.element.querySelector('tbody tr[data-gj-position="' + position + '"]').nextSibling.querySelector('div[data-gj-role="display"]'),
                content = detailWrapper.innerHTML,
                record = grid.get(position);

            if (record && content) {
                detailWrapper.innerHTML.replace(/\{(.+?)\}/g, function ($0, $1) {
                    let column = gj.grid.methods.getColumnInfo(grid, $1);
                    content = content.replace($0, gj.grid.methods.formatText(record[$1], column));
                });
                detailWrapper.innerHTML = content;
            }
            return grid;
        }
    },

    'events': {
        /**
         * Event fires when detail row is showing
         *
         * @event detailExpand
         * @param {object} e - event data
         * @param {object} e.detail.detailWrapper - the detail wrapper as jQuery object 
         * @param {string} e.detail.id - the id of the record
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         primaryKey: 'ID',
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div></div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
         *     });
         *     grid.on('detailExpand', function (e) {
         *         let record = grid.getById(e.detail.id);
         *         e.detail.detailWrapper.innerHTML = '';
         *         e.detail.detailWrapper.innerHTML = '<b>Place Of Birth:</b> ' + record.PlaceOfBirth;
         *     });
         * </script>
         */
        detailExpand: function (el, detailWrapper, id) {
            el.dispatchEvent(new CustomEvent('detailExpand', { detail: { detailWrapper: detailWrapper, id: id } }));
        },

        /**
         * Event fires when detail row is hiding
         *
         * @event detailCollapse
         * @param {object} e - event data
         * @param {object} e.detail.detailWrapper - the detail wrapper as jQuery object 
         * @param {string} e.detail.id - the id of the record
         * @example sample <!-- grid -->
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         primaryKey: 'ID',
         *         dataSource: '/Players/Get',
         *         detailTemplate: '<div></div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'DateOfBirth', type: 'date' } ]
         *     });
         *     grid.on('detailExpand', function (e) {
         *         let record = grid.getById(e.detail.id);
         *         e.detail.detailWrapper.innerHTML = '<b>Place Of Birth:</b>' + record.PlaceOfBirth;
         *     });
         *     grid.on('detailCollapse', function (e) {
         *         e.detail.detailWrapper.innerHTML = '';
         *         alert('detailCollapse is fired.');
         *     });
         * </script>
         */
        detailCollapse: function (el, detailWrapper, id) {
            el.dispatchEvent(new CustomEvent('detailCollapse', { detail: { detailWrapper: detailWrapper, id: id } }));
        }
    },

    'configure': function (grid) {
        let column, data = grid.getConfig();

        grid.extend(grid, gj.grid.plugins.expandCollapseRows.public);

        if (typeof (data.detailTemplate) !== 'undefined') {
            column = {
                title: '',
                width: data.defaultIconColumnWidth,
                align: 'center',
                stopPropagation: true,
                cssClass: 'gj-cursor-pointer gj-unselectable',
                tmpl: data.icons.expandRow,
                role: 'expander',
                events: {
                    'click': function (e, id, field, record) {
                        let methods = gj.grid.plugins.expandCollapseRows.private,
                            nextRow = this.closest('tr').nextElementSibling;
                        if (nextRow && nextRow.getAttribute('data-gj-role') === 'details') {
                            methods.collapseDetail(grid, this, id);
                        } else {
                            methods.expandDetail(grid, this, id);
                        }
                    }
                }
            };
            data.columns = [column].concat(data.columns);

            grid.on('rowDataBound', function (e) {
                window.gijgoStorage.put(e.detail.row, 'details', data.detailTemplate);
            });
            grid.on('columnShow', function (e, column) {
                gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan(grid);
            });
            grid.on('columnHide', function (e, column) {
                gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan(grid);
            });
            grid.on('rowRemoving', function (e) {
                gj.grid.plugins.expandCollapseRows.private.collapseDetail(grid, e.detail.row.children[0], e.detail.id);
            });
            grid.on('dataBinding', function () {
                grid.collapseAll();
            });
            grid.on('pageChanging', function () {
                grid.collapseAll();
            });
            grid.on('dataBound', function () {
                let i, cell, row, position, data = grid.getConfig();
                if (data.keepExpandedRows && Array.isArray(data.expandedRows)) {
                    for (i = 0; i < data.expandedRows.length; i++) {
                        row = gj.grid.methods.getRowById(grid, data.expandedRows[i]);
                        if (row) {
                            position = gj.grid.methods.getColumnPositionByRole(grid, 'expander');
                            cell = row.children[position];
                            if (cell) {
                                gj.grid.plugins.expandCollapseRows.private.expandDetail(grid, cell);
                            }
                        }
                    }
                }
            });
        }
    }
};
/** 
 * @widget Grid 
 * @plugin Inline Editing
 */
gj.grid.plugins.inlineEditing = {
    renderers: {
        editManager: function (value, record, cell, displayEl, id, grid) {
            let data = grid.getConfig(),
                edit = data.inlineEditing.editButton.cloneNode(true),
                del = data.inlineEditing.deleteButton.cloneNode(true),
                update = data.inlineEditing.updateButton.cloneNode(true),
                cancel = data.inlineEditing.cancelButton.cloneNode(true);

            edit.setAttribute('data-gj-key', id);
            del.setAttribute('data-gj-key', id);
            update.setAttribute('data-gj-key', id);
            cancel.setAttribute('data-gj-key', id);
            update.style.display = 'none';
            cancel.style.display = 'none';
            edit.addEventListener('click', function (e) {
                grid.edit(this.getAttribute('data-gj-key'));
            });
            del.addEventListener('click', function (e) {
                grid.removeRow(this.getAttribute('data-gj-key'));
            });
            update.addEventListener('click', function (e) {
                grid.update(this.getAttribute('data-gj-key'));
            });
            cancel.addEventListener('click', function (e) {
                grid.cancel(this.getAttribute('data-gj-key'));
            });
            displayEl.innerHTML = '';
            displayEl.appendChild(edit);
            displayEl.appendChild(del);
            displayEl.appendChild(update);
            displayEl.appendChild(cancel);
        }
    }
};

gj.grid.plugins.inlineEditing.config = {
    base: {
        defaultColumnSettings: {
            /** Provides a way to set an editing UI for the column.
             * @alias column.editor
             * @type function|boolean
             * @default undefined
             * @example Material.Design <!-- grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     let countries = [ 'Bulgaria', 'Brazil', 'England', 'Germany', 'Colombia', 'Poland' ];
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: countries } },
             *             { field: 'DateOfBirth', type: 'date', editor: true, format: 'dd.mm.yyyy' },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Custom.With.Select2 <!-- jquery, grid, datepicker, checkbox -->
             * <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
             * <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
             * <table id="grid"></table>
             * <script>
             *     function select2editor(editorContainer, value, record) {
             *         let select = document.createElement('select');
             *         select.innerHTML = '<option value="Bulgaria">Bulgaria</option><option value="Brazil">Brazil</option><option value="England">England</option><option value="Germany">Germany</option><option value="Colombia">Colombia</option><option value="Poland">Poland</option>';
             *         select.value = value;
             *         editorContainer.appendChild(select);
             *         $(select).select2();
             *     }
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: select2editor },
             *             { field: 'DateOfBirth', type: 'date', editor: true, format: 'dd.mm.yyyy' },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     let countries = [ 'Bulgaria', 'Brazil', 'England', 'Germany', 'Colombia', 'Poland' ];
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: countries } },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: '/Locations/GetCountries', valueField: 'id' }, editField: 'CountryID'  },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap5',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: '/Locations/GetCountries', valueField: 'id' }, editField: 'CountryID'  },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             */
            editor: undefined,

            /** The name of the field in the grid data where the grid is going to set the new value.
             * @additionalinfo This is usable when the editor is interface with key/value pairs like dropdowns where the key needs to be updated in a different field..
             * @alias column.editField
             * @type String
             * @default undefined
             * @example Bootstrap.4 <!-- bootstrap4, grid, datepicker, dropdown, checkbox -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         uiLibrary: 'bootstrap4',
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'Name', editor: true },
             *             { field: 'CountryName', type: 'dropdown', editor: { dataSource: '/Locations/GetCountries', valueField: 'id' }, editField: 'CountryID' },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type:'checkbox', editor: true, mode: 'editOnly', width: 80, align: 'center' }
             *         ]
             *     });
             * </script>
             */
            editField: undefined,

            /** Provides a way to specify a display mode for the column.
             * @alias column.mode
             * @type readEdit|editOnly|readOnly
             * @default readEdit
             * @example sample <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true, mode: 'editOnly' },
             *             { field: 'PlaceOfBirth', editor: true, mode: 'readOnly' }
             *         ]
             *     });
             * </script>
             */
            mode: 'readEdit'
        },
        inlineEditing: {

            /** Inline editing mode.
             * @alias inlineEditing.mode
             * @type click|dblclick|command
             * @default 'click'
             * @example Double.Click <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'dblclick' },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ]
             *     });
             * </script>
             * @example Command <!-- dropdown, grid -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3 }
             *     });
             * </script>
             * @example DateTime <!-- datetimepicker, grid -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Date': '05/15/2018', 'Time': '21:12', 'DateTime': '21:12 05/15/2018' },
             *         { 'ID': 2, 'Date': '05/16/2018', 'Time': '22:12', 'DateTime': '22:12 05/16/2018' },
             *         { 'ID': 3, 'Date': '05/17/2018', 'Time': '23:12', 'DateTime': '23:12 05/17/2018' }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Date', type: 'date', format: 'mm/dd/yyyy', editor: true },
             *             { field: 'Time', type: 'time', format: 'HH:MM', editor: true },
             *             { field: 'DateTime', type: 'datetime', format: 'HH:MM mm/dd/yyyy', editor: true }
             *         ]
             *     });
             * </script>
             */
            mode: 'click',
                
            /** If set to true, add column with buttons for edit, delete, update and cancel at the end of the grid.
             * @alias inlineEditing.managementColumn
             * @type Boolean
             * @default true
             * @example True <!-- grid, checkbox, datepicker -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', 'DateOfBirth': '\/Date(-122954400000)\/', IsActive: false },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', 'DateOfBirth': '\/Date(211842000000)\/', IsActive: false },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', 'DateOfBirth': '\/Date(-112417200000)\/', IsActive: false },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', 'DateOfBirth': '\/Date(512258400000)\/', IsActive: true },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', 'DateOfBirth': '\/Date(679266000000)\/', IsActive: true },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', 'DateOfBirth': '\/Date(349653600000)\/', IsActive: false }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command', managementColumn: true },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true },
             *             { field: 'DateOfBirth', type: 'date', editor: true },
             *             { field: 'IsActive', title: 'Active?', type: 'checkbox', editor: true, width: 100, align: 'center' }
             *         ]
             *     });
             * </script>
             * @example False <!-- materialicons, grid -->
             * <table id="grid"></table>
             * <script>;
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ],
             *     createButton = function (icon, text, id) {
             *         let button = document.createElement('button');
             *         button.classList.add('gj-button-md');
             *         button.innerHTML = '<i class="material-icons">' + icon + '</i> ' + text;
             *         button.setAttribute('data-gj-key', id);
             *         return button;
             *     },
             *     editManager = function (value, record, cell, displayEl, id, grid) {
             *         let data = grid.getConfig(),
             *             edit =  createButton('mode_edit', 'Edit', id),
             *             del = createButton('delete', 'Delete', id),
             *             update = createButton('check_circle', 'Update', id),
             *             cancel = createButton('cancel', 'Cancel', id);
             *         
             *         update.style.display = 'none';
             *         cancel.style.display = 'none';
             *         edit.addEventListener('click', function (e) {
             *             grid.edit(this.getAttribute('data-gj-key'));
             *             edit.style.display = 'none';
             *             del.style.display = 'none';
             *             update.style.display = 'inline-block';
             *             cancel.style.display = 'inline-block';
             *         });
             *         del.addEventListener('click', function (e) {
             *             grid.removeRow(this.getAttribute('data-gj-key'));
             *         });
             *         update.addEventListener('click', function (e) {
             *             grid.update(this.getAttribute('data-gj-key'));
             *             edit.style.display = 'inline-block';
             *             del.style.display = 'inline-block';
             *             update.style.display = 'none';
             *             cancel.style.display = 'none';
             *         });
             *         cancel.addEventListener('click', function (e) {
             *             grid.cancel(this.getAttribute('data-gj-key'));
             *             edit.style.display = 'inline-block';
             *             del.style.display = 'inline-block';
             *             update.style.display = 'none';
             *             cancel.style.display = 'none';
             *         });
             *         displayEl.innerHTML = '';
             *         displayEl.appendChild(edit);
             *         displayEl.appendChild(del);
             *         displayEl.appendChild(update);
             *         displayEl.appendChild(cancel);
             *     }
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command', managementColumn: false },
             *         columns: [
             *             { field: 'ID', width: 56 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true },
             *             { width: 300, align: 'center', renderer: editManager }
             *         ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3, sizes: [3, 5, 10, 20] }
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'bootstrap4',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3, sizes: [3, 5, 10, 20] }
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, grid, dropdown -->
             * <table id="grid"></table>
             * <script>
             *     let grid, data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         primaryKey: 'ID',
             *         inlineEditing: { mode: 'command' },
             *         uiLibrary: 'bootstrap5',
             *         columns: [
             *             { field: 'ID', width: 42 },
             *             { field: 'Name', editor: true },
             *             { field: 'PlaceOfBirth', editor: true }
             *         ],
             *         pager: { limit: 3, sizes: [3, 5, 10, 20] }
             *     });
             * </script>
            */
            managementColumn: true,

            managementColumnConfig: { width: 300, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    },

    bootstrap: {
        inlineEditing: {
            managementColumnConfig: { width: 200, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    },

    bootstrap4: {
        inlineEditing: {
            managementColumnConfig: { width: 280, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    },

    bootstrap5: {
        inlineEditing: {
            managementColumnConfig: { width: 280, role: 'managementColumn', align: 'center', renderer: gj.grid.plugins.inlineEditing.renderers.editManager, cssClass: 'gj-grid-management-column' }
        }
    }
};

gj.grid.plugins.inlineEditing.private = {
    createMdButton: function(role, icon, text) {
        let btn = document.createElement('button');
        btn.setAttribute('data-gj-role', role);
        btn.classList.add('gj-button-md');
        btn.innerHTML = '<i class="gj-icon ' + icon + '"></i> ' + text.toUpperCase();
        return btn;
    },

    createBtButton: function(role, icon, text, leftMargin) {
        let btn = document.createElement('button');
        btn.setAttribute('data-gj-role', role);
        gj.core.addClasses(btn, 'btn btn-default btn-sm');
        leftMargin && btn.classList.add('gj-button-md');
        btn.innerHTML = '<span class="glyphicon glyphicon-' + icon + '" aria-hidden="true"></span> ' + text;
        return btn;
    },

    localization: function (data) {
        let methods = gj.grid.plugins.inlineEditing.private;
        if (data.uiLibrary === 'bootstrap') {
            data.inlineEditing.editButton = methods.createBtButton('edit', 'pencil', gj.grid.messages[data.locale].Edit);
            data.inlineEditing.deleteButton = methods.createBtButton('delete', 'remove', gj.grid.messages[data.locale].Delete);
            data.inlineEditing.updateButton = methods.createBtButton('update', 'ok', gj.grid.messages[data.locale].Update);
            data.inlineEditing.cancelButton = methods.createBtButton('cancel', 'ban-circle', gj.grid.messages[data.locale].Cancel);
        } else {
            data.inlineEditing.editButton = methods.createMdButton('edit', 'pencil', gj.grid.messages[data.locale].Edit);
            data.inlineEditing.deleteButton = methods.createMdButton('delete', 'delete', gj.grid.messages[data.locale].Delete);
            data.inlineEditing.updateButton = methods.createMdButton('update', 'check-circle', gj.grid.messages[data.locale].Update);
            data.inlineEditing.cancelButton = methods.createMdButton('cancel', 'cancel', gj.grid.messages[data.locale].Cancel);
        }
    },

    editMode: function (grid, cell, column, record) {
        let displayContainer, editorContainer, editorField, value, config, data = grid.getConfig();
        if (cell.getAttribute('data-gj-mode') !== 'edit') {
            if (column.editor) {
                gj.grid.plugins.inlineEditing.private.updateOtherCells(grid, column.mode);
                displayContainer = cell.querySelector('div[data-gj-role="display"]');
                displayContainer.style.display = 'none';
                editorContainer = cell.querySelector('div[data-gj-role="edit"]');
                if (!editorContainer) {
                    editorContainer = document.createElement('div');
                    editorContainer.setAttribute('data-gj-role', 'edit');
                    cell.appendChild(editorContainer);
                }
                editorContainer.style.display = 'block';
                value = record[column.editField || column.field];
                editorField = editorContainer.querySelector('input, select, textarea');
                if (editorField) {
                    switch (column.type) {
                        case 'checkbox':
                            editorField.checked = value;
                            break;
                        case 'dropdown':
                            editorField = editorField.value;
                            break;
                        default:
                            editorField.value = value;
                    }
                } else {
                    if (typeof (column.editor) === 'function') {
                        column.editor(editorContainer, value, record);
                        editorField = editorContainer.querySelector('input, select, textarea');
                    } else {
                        config = typeof column.editor === "object" ? column.editor : {};
                        config.uiLibrary = data.uiLibrary;
                        config.iconsLibrary = data.iconsLibrary;
                        config.fontSize = window.getComputedStyle(grid.element, null).getPropertyValue('font-size');
                        config.showOnFocus = false;
                        if ('checkbox' === column.type && gj.checkbox) {
                            editorField = document.createElement('input');
                            editorField.setAttribute('type', 'checkbox');
                            editorField.checked = value;
                            editorContainer.appendChild(editorField);
                            new GijgoCheckBox(editorField, config);
                        } else if (('date' === column.type && gj.datepicker) || ('time' === column.type && gj.timepicker) || ('datetime' === column.type && gj.datetimepicker)) {
                            editorField = document.createElement('input');
                            editorField.setAttribute('type', 'text');
                            editorField.setAttribute('width', '100%');
                            editorContainer.appendChild(editorField);
                            if (column.format) {
                                config.format = column.format;
                            }
                            switch (column.type) {
                                case 'date':
                                    editorField = new GijgoDatePicker(editorField, config);
                                    break;
                                case 'time':
                                    editorField = new GijgoTimePicker(editorField, config);
                                    break;
                                case 'datetime':
                                    editorField = new GijgoDateTimePicker(editorField, config);
                                    break;
                            }
                            if (editorField.value) {
                                editorField.value(value);
                            }
                            editorField = editorField.element;
                        } else if ('dropdown' === column.type && gj.dropdown) {
                            editorField = document.createElement('select');
                            editorField.setAttribute('width', '100%');
                            editorContainer.appendChild(editorField);
                            config.dataBound = function (e) {
                                let dropdown = new GijgoDropDown(this);
                                if (column.editField) {
                                    dropdown.value(record[column.editField]);
                                } else {
                                    dropdown.value(record[column.field]);
                                }
                            };
                            editorField = new GijgoDropDown(editorField, config);
                        } else {
                            editorField = document.createElement('input');
                            editorField.setAttribute('type', 'text');
                            editorField.classList.add('gj-width-full');
                            editorField.value = value;
                            if (data.uiLibrary === 'materialdesign') {
                                editorField.classList.add('gj-textbox-md');
                                editorField.style.fontSize = window.getComputedStyle(grid.element, null).getPropertyValue('font-size');
                            }
                            editorContainer.appendChild(editorField);
                        }
                    }
                    if (data.inlineEditing.mode !== 'command' && column.mode !== 'editOnly') {
                        editorField = editorContainer.querySelectorAll('input, select, textarea')[0];
                        editorField.addEventListener('keyup', function (e) {
                            if (e.keyCode === 13 || e.keyCode === 27) {
                                gj.grid.plugins.inlineEditing.private.displayMode(grid, cell, column);
                            }
                        });
                    }
                }
                if (editorField.tagName.toUpperCase() === "INPUT" && editorField.getAttribute('type').toUpperCase() === 'TEXT') {
                    gj.core.setCaretAtEnd(editorField[0]);
                } else {
                    editorField.focus();
                }
                cell.setAttribute('data-gj-mode', 'edit');
            } else if (column.role === 'managementColumn') {
                cell.querySelector('[data-gj-role="edit"]').style.display = 'none';
                cell.querySelector('[data-gj-role="delete"]').style.display = 'none';
                cell.querySelector('[data-gj-role="update"]').style.display = 'inline-block';
                cell.querySelector('[data-gj-role="cancel"]').style.display = 'inline-block';
            }
        }
    },

    displayMode: function (grid, cell, column, cancel) {
        let editorContainer, displayContainer, ele, newValue, newEditFieldValue, record, position, style = '';
        if (column.mode !== 'editOnly') {
            if (cell.getAttribute('data-gj-mode') === 'edit') {
                editorContainer = cell.querySelector('div[data-gj-role="edit"]');
                displayContainer = cell.querySelector('div[data-gj-role="display"]');
                ele = editorContainer.querySelectorAll('input, select, textarea');
                if (ele[0].tagName.toUpperCase() === "SELECT" && ele[0].selectedIndex > -1) {
                    newValue = ele[0].options[ele[0].selectedIndex].innerHTML;
                    newEditFieldValue = ele[0].value;
                } else if (ele[0].tagName.toUpperCase() === "INPUT" && ele[0].type.toUpperCase() === "CHECKBOX") {
                    newValue = ele[0].checked;
                } else {
                    newValue = ele[0].value;
                }
                position = cell.parentNode.getAttribute('data-gj-position');
                record = grid.get(position);
                if (cancel !== true && newValue !== record[column.field]) {
                    record[column.field] = column.type === 'date' ? gj.core.parseDate(newValue, column.format) : newValue;
                    if (column.editField) {
                        record[column.editField] = newEditFieldValue || newValue;
                    }
                    if (column.mode !== 'editOnly') {
                        gj.grid.methods.renderDisplayElement(grid, displayContainer, column, record, gj.grid.methods.getId(record, grid.getConfig().primaryKey, position), 'update');
                        if (cell.querySelector('span.gj-dirty')) {
                            cell.insertBefore('<span class="gj-dirty" />', cell.firstChild);
                        }
                    }
                    gj.grid.plugins.inlineEditing.events.cellDataChanged(grid.element, cell, column, record, newValue);
                    gj.grid.plugins.inlineEditing.private.updateChanges(grid, column, record, newValue);
                }
                editorContainer.style.display = 'none';
                displayContainer.style.display = 'block';
                cell.setAttribute('data-gj-mode', 'display');
            }
            if (column.role === 'managementColumn') {
                cell.querySelector('[data-gj-role="update"]').style.display = 'none';
                cell.querySelector('[data-gj-role="cancel"]').style.display = 'none';
                cell.querySelector('[data-gj-role="edit"]').style.display = 'inline-block';
                cell.querySelector('[data-gj-role="delete"]').style.display = 'inline-block';
            }
        }
    },

    updateOtherCells: function(grid, mode) {
        let data = grid.getConfig(), editors, cell;
        if (data.inlineEditing.mode !== 'command' && mode !== 'editOnly') {
            editors = grid.element.querySelectorAll('div[data-gj-role="edit"]');
            for (const editor of editors) {
                if (editor.style.display === 'inline-block') {
                    cell = editor.parentNode;
                    column = data.columns[Array.from(cell.parentNode.children).indexOf(cell)];
                    gj.grid.plugins.inlineEditing.private.displayMode(grid, cell, column);
                }
            }
        }
    },

    updateChanges: function (grid, column, sourceRecord, newValue) {
        let targetRecords, filterResult, newRecord, data = grid.getConfig();
        if (data.primaryKey) {
            targetRecords = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
            if (targetRecords) {
                filterResult = targetRecords.filter(function (record) {
                    return record[data.primaryKey] === sourceRecord[data.primaryKey];
                });
            } else {
                targetRecords = [];
            }
            if (filterResult && filterResult.length === 1) {
                filterResult[0][column.field] = newValue;
            } else {
                newRecord = {};
                newRecord[data.primaryKey] = sourceRecord[data.primaryKey];
                if (data.primaryKey !== column.field) {
                    newRecord[column.field] = newValue;
                }
                targetRecords.push(newRecord);
            }
            sessionStorage.setItem('gj.grid.' + data.guid, JSON.stringify(targetRecords));
        }
    }
};

gj.grid.plugins.inlineEditing.public = {
    /**
     * Return array with all changes
     * @method
     * @return array
     * @example sample <!-- grid, grid.inlineEditing -->
     * <button id="btnGetChanges" class="gj-button-md">Get Changes</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     let grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID' }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
     *     });
     *     document.getElementById('btnGetChanges').addEventListener('click', function () {
     *         alert(JSON.stringify(grid.getChanges()));
     *     });
     * </script>
     */
    getChanges: function () {
        return JSON.parse(sessionStorage.getItem('gj.grid.' + this.getConfig().guid));
    },

    /**
     * Enable edit mode for all editable cells within a row.
     * @method
     * @param {string} id - The id of the row that needs to be edited
     * @return grid
     * @example Edit.Row <!-- grid -->
     * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
     * <table id="grid"></table>
     * <script>
     *     let grid, renderer;
     *     renderer = function (value, record, cell, displayEl, id) {
     *         let editBtn = document.createElement('i'),
     *             updateBtn = document.createElement('i');
     *         
     *         gj.core.addClasses(editBtn, 'fa fa-pencil gj-cursor-pointer');
     *         gj.core.addClasses(updateBtn, 'fa fa-save gj-cursor-pointer');
     *         editBtn.setAttribute('data-gj-key', id);
     *         updateBtn.setAttribute('data-gj-key', id);
     *         editBtn.style.display = 'inline-block';
     *         updateBtn.style.display = 'none';
     * 
     *         editBtn.addEventListener('click', function (e) {
     *             grid.edit(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'none';
     *             updateBtn.style.display = 'inline-block';
     *         });
     *         updateBtn.addEventListener('click', function (e) {
     *             grid.update(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'inline-block';
     *             updateBtn.style.display = 'none';
     *         });
     *         displayEl.appendChild(editBtn)
     *         displayEl.appendChild(updateBtn);
     *     }
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command', managementColumn: false },
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name', editor: true }, 
     *             { field: 'PlaceOfBirth', editor: true },
     *             { width: 56, align: 'center', renderer: renderer }
     *         ]
     *     });
     * </script>
     */
    edit: function (id) {
        let i, record = this.getById(id),
            cells = gj.grid.methods.getRowById(this, id).children,
            columns = this.getConfig().columns;

        for (i = 0; i < cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.editMode(this, cells[i], columns[i], record);
        }
            
        return this;
    },

    /**
     * Update all editable cells within a row, when the row is in edit mode.
     * @method
     * @param {string} id - The id of the row that needs to be updated
     * @return grid
     * @fires rowDataChanged
     * @example Update.Row <!-- grid -->
     * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
     * <table id="grid"></table>
     * <script>
     *     let grid, renderer;
     *     renderer = function (value, record, cell, displayEl, id) {
     *         let editBtn = document.createElement('i'),
     *             updateBtn = document.createElement('i');
     *         
     *         gj.core.addClasses(editBtn, 'fa fa-pencil gj-cursor-pointer');
     *         gj.core.addClasses(updateBtn, 'fa fa-save gj-cursor-pointer');
     *         editBtn.setAttribute('data-gj-key', id);
     *         updateBtn.setAttribute('data-gj-key', id);
     *         editBtn.style.display = 'inline-block';
     *         updateBtn.style.display = 'none';
     * 
     *         editBtn.addEventListener('click', function (e) {
     *             grid.edit(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'none';
     *             updateBtn.style.display = 'inline-block';
     *         });
     *         updateBtn.addEventListener('click', function (e) {
     *             grid.update(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'inline-block';
     *             updateBtn.style.display = 'none';
     *         });
     *         displayEl.appendChild(editBtn)
     *         displayEl.appendChild(updateBtn);
     *     }
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command', managementColumn: false },
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name', editor: true }, 
     *             { field: 'PlaceOfBirth', editor: true },
     *             { width: 56, align: 'center', renderer: renderer }
     *         ]
     *     });
     * </script>
     */
    update: function (id) {
        let i, record = this.getById(id),
            cells = gj.grid.methods.getRowById(this, id).children,
            columns = this.getConfig().columns;

        for (i = 0; i < cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.displayMode(this, cells[i], columns[i], false);
        }

        gj.grid.plugins.inlineEditing.events.rowDataChanged(this.element, id, record);

        return this;
    },

    /**
     * Cancel the edition of all editable cells, when the row is in edit mode.
     * @method
     * @param {string} id - The id of the row where you need to undo all changes
     * @return grid
     * @example Cancel.Row <!-- grid -->
     * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
     * <table id="grid"></table>
     * <script>
     *     let grid, renderer;
     *     renderer = function (value, record, cell, displayEl, id) {
     *         let editBtn = document.createElement('i'),
     *             cancelBtn = document.createElement('i');
     *         
     *         gj.core.addClasses(editBtn, 'fa fa-pencil gj-cursor-pointer');
     *         gj.core.addClasses(cancelBtn, 'fa fa-undo gj-cursor-pointer');
     *         editBtn.setAttribute('data-gj-key', id);
     *         cancelBtn.setAttribute('data-gj-key', id);
     *         editBtn.style.display = 'inline-block';
     *         cancelBtn.style.display = 'none';
     * 
     *         editBtn.addEventListener('click', function (e) {
     *             grid.edit(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'none';
     *             cancelBtn.style.display = 'inline-block';
     *         });
     *         cancelBtn.addEventListener('click', function (e) {
     *             grid.cancel(this.getAttribute('data-gj-key'));
     *             editBtn.style.display = 'inline-block';
     *             cancelBtn.style.display = 'none';
     *         });
     *         displayEl.appendChild(editBtn)
     *         displayEl.appendChild(cancelBtn);
     *     }
     *     grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command', managementColumn: false },
     *         columns: [ 
     *             { field: 'ID', width: 56 },
     *             { field: 'Name', editor: true }, 
     *             { field: 'PlaceOfBirth', editor: true },
     *             { width: 56, align: 'center', renderer: renderer }
     *         ]
     *     });
     * </script>
     */
    cancel: function (id) {
        let i, record = this.getById(id),
            cells = gj.grid.methods.getRowById(this, id).children,
            columns = this.getConfig().columns;

        for (i = 0; i < cells.length; i++) {
            gj.grid.plugins.inlineEditing.private.displayMode(this, cells[i], columns[i], true);
        }

        return this;
    }
};

gj.grid.plugins.inlineEditing.events = {
    /**
     * Event fires after inline edit of a cell in the grid.
     *
     * @event cellDataChanged
     * @param {object} e - event data
     * @param {object} e.detail.cell - the cell presented as jquery object 
     * @param {object} e.detail.column - the column configuration data
     * @param {object} e.detail.record - the data of the row record
     * @param {object} e.detail.oldValue - the old cell value
     * @param {object} e.detail.newValue - the new cell value
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     let grid = new GijgoGrid(document.getElementById('grid'), {
     *         dataSource: '/Players/Get',
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
     *     });
     *     grid.on('cellDataChanged', function (e) {
     *         alert('The value for "' + e.detail.column.field + '" is changed to "' + e.detail.newValue + '"');
     *     });
     * </script>
     */
    cellDataChanged: function (el, cell, column, record, newValue) {
        el.dispatchEvent(new CustomEvent('cellDataChanged', { detail: { cell: cell, column: column, record: record, newValue: newValue } }));
    },

    /**
     * Event fires after inline edit of a row in the grid.
     *
     * @event rowDataChanged
     * @param {object} e - event data
     * @param {object} e.detail.id - the id of the record
     * @param {object} e.detail.record - the data of the row record
     * @example sample <!-- grid -->
     * <table id="grid"></table>
     * <script>
     *     let grid = new GijgoGrid(document.getElementById('grid'), {
     *         primaryKey: 'ID',
     *         dataSource: '/Players/Get',
     *         inlineEditing: { mode: 'command' },
     *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
     *     });
     *     grid.on('rowDataChanged', function (e) {
     *         alert('Record with id="' + e.detail.id + '" is changed to "' + JSON.stringify(e.detail.record) + '"');
     *     });
     * </script>
     */
    rowDataChanged: function (el, id, record) {
        el.dispatchEvent(new CustomEvent('rowDataChanged', { detail: { id: id, record: record } }));
    }
};

gj.grid.plugins.inlineEditing.configure = function (grid, fullConfig, clientConfig) {
    let data = grid.getConfig();
    grid.extend(grid, gj.grid.plugins.inlineEditing.public);
    if (clientConfig.inlineEditing) {
        grid.on('dataBound', function () {
            grid.element.querySelectorAll('span.gj-dirty').forEach(function(el) { el.remove(); }); 
        });
        grid.on('rowDataBound', function (e) {
            grid.cancel(e.detail.id);
        });
    }
    if (data.inlineEditing.mode === 'command') {
        gj.grid.plugins.inlineEditing.private.localization(data);
        if (fullConfig.inlineEditing.managementColumn) {
            data.columns.push(fullConfig.inlineEditing.managementColumnConfig);
        }
    } else {
        grid.element.addEventListener('cellDataBound', function (e) {
            if (e.detail.column.editor) {
                if (e.detail.column.mode === 'editOnly') {
                    gj.grid.plugins.inlineEditing.private.editMode(grid, e.detail.displayEl.parentNode, e.detail.column, e.detail.record);
                } else {
                    e.detail.displayEl.closest('td').addEventListener(data.inlineEditing.mode === 'dblclick' ? 'dblclick' : 'click', function () {
                        gj.grid.plugins.inlineEditing.private.editMode(grid, e.detail.displayEl.parentNode, e.detail.column, e.detail.record);
                    });
                }
            }
        });
    }
};

/** 
 * @widget Grid 
 * @plugin Optimistic Persistence
 */
gj.grid.plugins.optimisticPersistence = {

    config: {
        base: {
            optimisticPersistence: {
                /** Array that contains a list with param names that needs to be saved in the localStorage. You need to specify guid on the initialization of the grid in order to enable this feature.
                 * @additionalinfo This feature is using <a href="https://developer.mozilla.org/en/docs/Web/API/Window/localStorage" target="_blank">HTML5 localStorage</a> to store params and values.
                 * You can clear the data saved in localStorage when you clear your browser cache.
                 * @alias optimisticPersistence.localStorage
                 * @type array
                 * @default undefined
                 * @example sample <!-- bootstrap, grid  -->
                 * <p>Change the page and/or page size and then refresh the grid.</p>
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = new GijgoGrid(document.getElementById('grid'), {
                 *         guid: '58d47231-ac7b-e6d2-ddba-5e0195b31f2e',
                 *         uiLibrary: 'bootstrap',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         optimisticPersistence: { localStorage: ["page", "limit"] },
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                localStorage: undefined,

                /** Array that contains a list with param names that needs to be saved in the sessionStorage. You need to specify guid on the initialization of the grid in order to enable this feature.
                 * @additionalinfo This feature is using <a href="https://developer.mozilla.org/en/docs/Web/API/Window/sessionStorage" target="_blank">HTML5 sessionStorage</a> to store params and values.
                 * You can clear the data saved in sessionStorage when you open and close the browser.
                 * @alias optimisticPersistence.sessionStorage
                 * @type array
                 * @default undefined
                 * @example sample <!-- bootstrap, grid  -->
                 * <p>Change the page and/or page size and then refresh the grid. </p>
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = new GijgoGrid(document.getElementById('grid'), {
                 *         guid: '58d47231-ac7b-e6d2-ddba-5e0195b31f2f',
                 *         uiLibrary: 'bootstrap',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         optimisticPersistence: { sessionStorage: ["page", "limit"] },
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                sessionStorage: undefined
            }
        }
    },

    private: {
        applyParams: function (grid) {
            var data = grid.getConfig(),
                params = {}, storage;
            storage = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
            if (storage && storage.optimisticPersistence) {
                grid.extend(params, storage.optimisticPersistence);
            }
            storage = JSON.parse(localStorage.getItem('gj.grid.' + data.guid));
            if (storage && storage.optimisticPersistence) {
                grid.extend(params, storage.optimisticPersistence);
            }
            grid.extend(data.params, params);
        },

        saveParams: function (grid) {
            var i, param,
                data = grid.getConfig(),
                storage = { optimisticPersistence: {} };

            if (data.optimisticPersistence.sessionStorage) {
                for (i = 0; i < data.optimisticPersistence.sessionStorage.length; i++) {
                    param = data.optimisticPersistence.sessionStorage[i];
                    storage.optimisticPersistence[param] = data.params[param];
                }
                storage = grid.extend(JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid)) || {}, storage);
                sessionStorage.setItem('gj.grid.' + data.guid, JSON.stringify(storage));
            }

            if (data.optimisticPersistence.localStorage) {
                storage = { optimisticPersistence: {} };
                for (i = 0; i < data.optimisticPersistence.localStorage.length; i++) {
                    param = data.optimisticPersistence.localStorage[i];
                    storage.optimisticPersistence[param] = data.params[param];
                }
                storage = grid.extend(JSON.parse(localStorage.getItem('gj.grid.' + data.guid)) || {}, storage);
                localStorage.setItem('gj.grid.' + data.guid, JSON.stringify(storage));
            }
        }
    },

    configure: function (grid, fullConfig) {
        if (fullConfig.guid) {
            if (fullConfig.optimisticPersistence.localStorage || fullConfig.optimisticPersistence.sessionStorage) {
                gj.grid.plugins.optimisticPersistence.private.applyParams(grid);
                grid.on('dataBound', function (e) {
                    gj.grid.plugins.optimisticPersistence.private.saveParams(grid);
                });
            }
        }
    }
};
/**
 * @widget Grid
 * @plugin Pagination
 */
gj.grid.plugins.pagination = {
    config: {
        base: {
            style: {
                pager: {
                    panel: '',
                    stateDisabled: '',
                    activeButton: ''
                }
            },

            paramNames: {
                /** The name of the parameter that is going to send the number of the page.
                 * The pager should be enabled in order this parameter to be in use.
                 * @alias paramNames.page
                 * @type string
                 * @default "page"
                 */
                page: 'page',

                /** The name of the parameter that is going to send the maximum number of records per page.
                 * The pager should be enabled in order this parameter to be in use.
                 * @alias paramNames.limit
                 * @type string
                 * @default "limit"
                 */
                limit: 'limit'
            },

            pager: {
                /** The maximum number of records that can be show by page.
                 * @alias pager.limit
                 * @type number
                 * @default 10
                 * @example local.data <!-- grid, dropdown -->
                 * <table id="grid"></table>
                 * <script>
                 *     let data, grid;
                 *     data = [
                 *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
                 *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
                 *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
                 *     ];
                 *     grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: data,
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 100] }
                 *     });
                 * </script>
                 * @example remote.data <!-- grid, dropdown -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 100] }
                 *     });
                 * </script>
                 */
                limit: 10,

                /** Array that contains the possible page sizes of the grid.
                 * When this setting is set, then a drop down with the options for each page size is visualized in the pager.
                 * @alias pager.sizes
                 * @type array
                 * @default [5, 10, 20, 100]
                 * @example Bootstrap.3 <!-- bootstrap, grid, grid.pagination, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Bootstrap.4.FontAwesome <!-- bootstrap4, fontawesome, grid, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap4',
                 *         iconsLibrary: 'fontawesome',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Bootstrap.4.Material.Icons <!-- bootstrap4, grid, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap4',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Bootstrap.5.Material.Icons <!-- bootstrap5, grid, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'bootstrap5',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 * @example Material.Design <!-- grid, grid.pagination, dropdown  -->
                 * <table id="grid"></table>
                 * <script>
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         uiLibrary: 'materialdesign',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                sizes: [5, 10, 20, 100],

                /** Array that contains a list with html element objects that are going to be used on the left side of the pager.
                 * @alias pager.leftControls
                 * @type array
                 * @default array
                 * @example Font.Awesome <!-- fontawesome, grid  -->
                 * <style>
                 * .icon-disabled { color: #ccc; }
                 * table.gj-grid div[data-gj-role="display"] div.custom-item { display: table; margin-right: 5px; }
                 * </style>
                 * <table id="grid"></table>
                 * <script>
                 * 
                 *     function createButton(title, role, icon) {
                 *         let button = document.createElement('div');
                 *         button.setAttribute('title', title);
                 *         button.setAttribute('data-gj-role', role);
                 *         button.classList.add('custom-item');
                 *         button.innerHTML = '<i class="fa ' + icon + '" aria-hidden="true"></i>';
                 *         return button;
                 *     };
                 * 
                 *     let grid = new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         style: {
                 *             pager: {
                 *                 stateDisabled: 'icon-disabled'
                 *             }
                 *         },
                 *         pager: { 
                 *             limit: 2, 
                 *             sizes: [2, 5, 10, 20],
                 *             leftControls: [
                 *                 createButton('First', 'page-first', 'fa-fast-backward'),
                 *                 createButton('Previous', 'page-previous', 'fa-backward'),
                 *                 ('<div> Page </div>'),
                 *                 ('<div class="custom-item"></div>').appendChild(('<input type="text" data-gj-role="page-number" style="margin: 0 5px; width: 34px; height: 16px; text-align: right;" value="0">')),
                 *                 ('<div>of&nbsp;</div>'),
                 *                 ('<div data-gj-role="page-label-last" style="margin-right: 5px;">0</div>'),
                 *                 createButton('Next', 'page-next', 'fa-forward'),
                 *                 createButton('Last', 'page-last', 'fa-fast-forward'),
                 *                 createButton('Reload', 'page-refresh', 'fa-refresh'),
                 *                 ('<div class="custom-item"></div>').appendChild(('<select data-gj-role="page-size" style="margin: 0 5px; width: 50px;"></select>'))
                 *             ],
                 *             rightControls: [
                 *                 ('<div>Displaying records&nbsp;</div>'),
                 *                 ('<div data-gj-role="record-first">0</div>'),
                 *                 ('<div>&nbsp;-&nbsp;</div>'),
                 *                 ('<div data-gj-role="record-last">0</div>'),
                 *                 ('<div>&nbsp;of&nbsp;</div>'),
                 *                 ('<div data-gj-role="record-total">0</div>').css({ "margin-right": "5px" })
                 *             ]
                 *         }
                 *     });
                 * </script>
                 */
                leftControls: undefined,

                /** Array that contains a list with html element objects that are going to be used on the right side of the pager.
                 * @alias pager.rightControls
                 * @type array
                 * @default array
                 */
                rightControls: undefined
            }
        },

        bootstrap: {
            style: {
                pager: {
                    panel: '',
                    stateDisabled: ''
                }
            }
        },

        bootstrap4: {
            style: {
                pager: {
                    panel: 'btn-toolbar',
                    stateDisabled: ''
                }
            }
        },

        glyphicons: {
            icons: {
                first: '<span class="glyphicon glyphicon-step-backward"></span>',
                previous: '<span class="glyphicon glyphicon-backward"></span>',
                next: '<span class="glyphicon glyphicon-forward"></span>',
                last: '<span class="glyphicon glyphicon-step-forward"></span>',
                refresh: '<span class="glyphicon glyphicon-refresh"></span>'
            }
        },

        materialicons: {
            icons: {
                first: '<i class="gj-icon first-page" />',
                previous: '<i class="gj-icon chevron-left" />',
                next: '<i class="gj-icon chevron-right" />',
                last: '<i class="gj-icon last-page" />',
                refresh: '<i class="gj-icon refresh" />'
            }
        },

        fontawesome: {
            icons: {
                first: '<i class="fa fa-fast-backward" aria-hidden="true"></i>',
                previous: '<i class="fa fa-backward" aria-hidden="true"></i>',
                next: '<i class="fa fa-forward" aria-hidden="true"></i>',
                last: '<i class="fa fa-fast-forward" aria-hidden="true"></i>',
                refresh: '<i class="fa fa-refresh" aria-hidden="true"></i>'
            }
        }
    },

    private: {
        init: function (grid) {
            let row, cell, data, controls, leftPanel, rightPanel, tfoot, leftControls, rightControls;

            data = grid.getConfig();

            if (data.pager) {
                if (!data.params[data.paramNames.page]) {
                    data.params[data.paramNames.page] = 1;
                }
                if (!data.params[data.paramNames.limit]) {
                    data.params[data.paramNames.limit] = data.pager.limit;
                }

                gj.grid.plugins.pagination.private.localization(data);

                row = document.createElement('tr');
                row.setAttribute('data-gj-role', 'pager');
                cell = document.createElement('th');
                row.appendChild(cell);

                leftPanel = document.createElement('div');
                leftPanel.setAttribute('data-gj-role', 'display');
                gj.core.addClasses(leftPanel, data.style.pager.panel);
                leftPanel.style.float = 'left';
                rightPanel = document.createElement('div');
                rightPanel.setAttribute('data-gj-role', 'display');
                gj.core.addClasses(rightPanel, data.style.pager.panel);
                rightPanel.style.float = 'right';

                cell.appendChild(leftPanel)
                cell.appendChild(rightPanel);

                tfoot = document.createElement('tfoot');
                tfoot.appendChild(row);
                grid.element.appendChild(tfoot);
                gj.grid.plugins.pagination.private.updatePagerColSpan(grid);

                leftControls = gj.grid.methods.clone(data.pager.leftControls); //clone array
                for (let i = 0; i < leftControls.length; i++) {
                    leftPanel.appendChild(leftControls[i]);
                };

                rightControls = gj.grid.methods.clone(data.pager.rightControls); //clone array
                for (let i = 0; i < rightControls.length; i++) {
                    rightPanel.appendChild(rightControls[i]);
                };

                controls = grid.element.querySelectorAll('tfoot [data-gj-role]');
                for (let i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.initPagerControl((controls[i]), grid);
                }
            }
        },

        localization: function (data) {
            if (data.uiLibrary === 'bootstrap') {
                gj.grid.plugins.pagination.private.localizationBootstrap(data);
            } else if (data.uiLibrary === 'bootstrap4') {
                gj.grid.plugins.pagination.private.localizationBootstrap4(data);
            } else if (data.uiLibrary === 'bootstrap5') {
                gj.grid.plugins.pagination.private.localizationBootstrap5(data);
            } else {
                gj.grid.plugins.pagination.private.localizationMaterialDesign(data);
            }
        },

        createButton: function(classes, role, title, text) {
            let result = document.createElement('button');
            gj.core.addClasses(result, classes);
            result.setAttribute('data-gj-role', role);
            result.setAttribute('title', title);
            result.innerHTML = text;
            return result;
        },

        localizationBootstrap: function (data) {
            let msg = gj.grid.messages[data.locale],
                methods = gj.grid.plugins.pagination.private,
                parser = new DOMParser(),
                labelLast = document.createElement('div'),
                labelPage = document.createElement('div'),
                labelOf = document.createElement('div'),
                pageNumber = document.createElement('input'),
                pager = document.createElement('select');

            if (typeof (data.pager.leftControls) === 'undefined') {
                labelLast.setAttribute('data-gj-role', 'page-label-last');
                labelLast.innerHTML = '0';

                labelPage.innerHTML = msg.Page;

                labelOf.innerHTML = msg.Of;

                pageNumber.setAttribute('data-gj-role', 'page-number');
                pageNumber.setAttribute('type', 'text');
                pageNumber.setAttribute('value', '0');
                gj.core.addClasses(pageNumber, 'form-control input-sm');

                gj.core.addClasses(pager, 'form-control input-sm');
                pager.style.width = '3.75rem';
                pager.setAttribute('data-gj-role', 'page-size');

                data.pager.leftControls = [
                    methods.createButton('btn btn-default btn-sm', 'page-first', msg.FirstPageTooltip, data.icons.first || msg.First),
                    methods.createButton('btn btn-default btn-sm', 'page-previous', msg.PreviousPageTooltip, data.icons.previous || msg.Previous),
                    labelPage,
                    pageNumber,
                    labelOf,
                    labelLast,
                    methods.createButton('btn btn-default btn-sm', 'page-next', msg.NextPageTooltip, data.icons.next || msg.Next),
                    methods.createButton('btn btn-default btn-sm', 'page-last', msg.LastPageTooltip, data.icons.last || msg.Last),
                    methods.createButton('btn btn-default btn-sm', 'page-refresh', msg.Refresh, data.icons.refresh || msg.Refresh),
                    pager
                ];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    parser.parseFromString('<div>' + msg.DisplayingRecords + '</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-first">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>-</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-last">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>' + msg.Of + '</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-total">0</div>', 'text/xml').firstChild
                ];
            }
        },

        localizationBootstrap4: function (data) {
            let msg = gj.grid.messages[data.locale],
                methods = gj.grid.plugins.pagination.private,
                parser = new DOMParser(),
                labelLast = document.createElement('div'),
                labelPage = document.createElement('div'),
                labelOf = document.createElement('div'),
                pageNumber = document.createElement('div'),
                input = document.createElement('input'),
                pager = document.createElement('select');
            if (typeof (data.pager.leftControls) === 'undefined') {
                labelLast.setAttribute('data-gj-role', 'page-label-last');
                labelLast.innerHTML = '0';

                labelPage.innerHTML = msg.Page;

                labelOf.innerHTML = msg.Of;

                pageNumber.classList.add('input-group');
                input.setAttribute('data-gj-role', 'page-number');
                input.setAttribute('type', 'text');
                input.setAttribute('value', '0');
                gj.core.addClasses(input, 'form-control form-control-sm');
                pageNumber.appendChild(input);

                gj.core.addClasses(pager, 'form-control input-sm');
                pager.style.width = '3.75rem';
                pager.setAttribute('data-gj-role', 'page-size');

                data.pager.leftControls = [
                    methods.createButton('btn btn-default btn-sm gj-cursor-pointer', 'page-first', msg.FirstPageTooltip, data.icons.first || msg.First),
                    methods.createButton('btn btn-default btn-sm gj-cursor-pointer', 'page-previous', msg.PreviousPageTooltip, data.icons.previous || msg.Previous),
                    labelPage,
                    pageNumber,
                    labelOf,
                    labelLast,
                    methods.createButton('btn btn-default btn-sm gj-cursor-pointer', 'page-next', msg.NextPageTooltip, data.icons.next || msg.Next),
                    methods.createButton('btn btn-default btn-sm gj-cursor-pointer', 'page-last', msg.LastPageTooltip, data.icons.last || msg.Last),
                    methods.createButton('btn btn-default btn-sm gj-cursor-pointer', 'page-refresh', msg.Refresh, data.icons.refresh || msg.Refresh),
                    pager
                ];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    parser.parseFromString('<div>' + msg.DisplayingRecords + ' </div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-first">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>-</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-last">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>' + msg.Of + '</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-total">0</div>', 'text/xml').firstChild
                ];
            }
        },

        localizationBootstrap5: function (data) {
            let msg = gj.grid.messages[data.locale],
                methods = gj.grid.plugins.pagination.private,
                parser = new DOMParser(),
                labelLast = document.createElement('div'),
                labelPage = document.createElement('div'),
                labelOf = document.createElement('div'),
                pageNumber = document.createElement('div'),
                input = document.createElement('input'),
                pager = document.createElement('select');

            if (typeof (data.pager.leftControls) === 'undefined') {

                labelLast.setAttribute('data-gj-role', 'page-label-last');
                labelLast.innerHTML = '0';

                labelPage.innerHTML = msg.Page;

                labelOf.innerHTML = msg.Of;

                pageNumber.classList.add('input-group');
                input.setAttribute('data-gj-role', 'page-number');
                input.setAttribute('type', 'text');
                input.setAttribute('value', '0');
                gj.core.addClasses(input, 'form-control form-control-sm');
                pageNumber.appendChild(input);

                gj.core.addClasses(pager, 'form-control input-sm');
                pager.style.width = '3.75rem';
                pager.setAttribute('data-gj-role', 'page-size');

                data.pager.leftControls = [
                    methods.createButton('btn btn-secondary btn-sm gj-cursor-pointer', 'page-first', msg.FirstPageTooltip, data.icons.first || msg.First),
                    methods.createButton('btn btn-secondary btn-sm gj-cursor-pointer', 'page-previous', msg.PreviousPageTooltip, data.icons.previous || msg.Previous),
                    labelPage,
                    pageNumber,
                    labelOf,
                    labelLast,
                    methods.createButton('btn btn-secondary btn-sm gj-cursor-pointer', 'page-next', msg.NextPageTooltip, data.icons.next || msg.Next),
                    methods.createButton('btn btn-secondary btn-sm gj-cursor-pointer', 'page-last', msg.LastPageTooltip, data.icons.last || msg.Last),
                    methods.createButton('btn btn-secondary btn-sm gj-cursor-pointer', 'page-refresh', msg.Refresh, data.icons.refresh || msg.Refresh),
                    pager
                ];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                data.pager.rightControls = [
                    parser.parseFromString('<div>' + msg.DisplayingRecords + ' </div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-first">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>-</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-last">0</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div>' + msg.Of + '</div>', 'text/xml').firstChild,
                    parser.parseFromString('<div data-gj-role="record-total">0</div>', 'text/xml').firstChild
                ];
            }
        },

        localizationMaterialDesign: function (data) {
            let msg = gj.grid.messages[data.locale],
                methods = gj.grid.plugins.pagination.private,
                parser = new DOMParser(),
                pager = document.createElement('select');
            if (typeof (data.pager.leftControls) === 'undefined') {
                data.pager.leftControls = [];
            }
            if (typeof (data.pager.rightControls) === 'undefined') {
                pager.classList.add('gj-grid-md-limit-select');
                pager.style.width = '3.25rem';
                pager.setAttribute('data-gj-role', 'page-size');
                data.pager.rightControls = [
                    parser.parseFromString('<span class="">' + msg.RowsPerPage + '</span>', 'text/xml').firstChild,
                    pager,
                    parser.parseFromString('<span class="gj-md-spacer-32"> </span>', 'text/xml').firstChild,
                    parser.parseFromString('<span data-gj-role="record-first" class="">0</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span class="">-</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span data-gj-role="record-last" class="">0</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span class="gj-grid-mdl-pager-label">' + msg.Of + '</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span data-gj-role="record-total" class="">0</span>', 'text/xml').firstChild,
                    parser.parseFromString('<span class="gj-md-spacer-32"> </span>', 'text/xml').firstChild,
                    methods.createButton('gj-button-md' + (data.icons.next ? ' gj-button-md-icon' : ''), 'page-previous', msg.PreviousPageTooltip, data.icons.previous || msg.Previous),
                    parser.parseFromString('<span class="gj-md-spacer-24"> </span>', 'text/xml').firstChild,
                    methods.createButton('gj-button-md' + (data.icons.next ? ' gj-button-md-icon' : ''), 'page-next', msg.NextPageTooltip, data.icons.next || msg.Next)
                ];
            }
        },

        initPagerControl: function (control, grid) {
            let data = grid.getConfig();
            switch (control.getAttribute('data-gj-role')) {
                case 'page-size':
                    if (data.pager.sizes && 0 < data.pager.sizes.length) {
                        control.style.display = 'block';
                        for (let i = 0; i < data.pager.sizes.length; i++) {
                            let option = document.createElement('option'),
                                value = data.pager.sizes[i].toString();
                            option.setAttribute('value', value);
                            option.innerText = value
                            control.appendChild(option);
                        };
                        control.value = data.params[data.paramNames.limit];
                        if (gj.dropdown) {
                            new GijgoDropDown(control, {
                                uiLibrary: data.uiLibrary,
                                iconsLibrary: data.iconsLibrary,
                                fontSize: window.getComputedStyle(control, null).getPropertyValue('font-size'),
                                style: {
                                    presenter: 'btn btn-default btn-sm'
                                }
                            });
                        }
                        control.addEventListener('change', function () {
                            let newSize = parseInt(this.value, 10);
                            data.params[data.paramNames.limit] = newSize;
                            gj.grid.plugins.pagination.private.changePage(grid, 1);
                            gj.grid.plugins.pagination.events.pageSizeChange(grid.element, newSize);
                        });
                    } else {
                        control.style.display = 'none';
                    }
                    break;
                case 'page-refresh':
                    control.addEventListener('click', function () { grid.reload(); });
                    break;
            }

        },

        reloadPager: function (grid, totalRecords) {
            let page, limit, lastPage, firstRecord, lastRecord, data, controls, i;

            data = grid.getConfig();

            if (data.pager) {
                page = (0 === totalRecords) ? 0 : parseInt(data.params[data.paramNames.page], 10);
                limit = parseInt(data.params[data.paramNames.limit], 10);
                lastPage = Math.ceil(totalRecords / limit);
                firstRecord = (0 === page) ? 0 : (limit * (page - 1)) + 1;
                lastRecord = (firstRecord + limit) > totalRecords ? totalRecords : (firstRecord + limit) - 1;

                controls = grid.element.querySelectorAll('TFOOT [data-gj-role]');
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.reloadPagerControl((controls[i]), grid, page, lastPage, firstRecord, lastRecord, totalRecords);
                }

                gj.grid.plugins.pagination.private.updatePagerColSpan(grid);
            }
        },

        reloadPagerControl: function (control, grid, page, lastPage, firstRecord, lastRecord, totalRecords) {
            let newPage;
            switch (control.getAttribute('data-gj-role')) {
                case 'page-first':
                    gj.grid.plugins.pagination.private.assignPageHandler(grid, control, 1, page < 2);
                    break;
                case 'page-previous':
                    gj.grid.plugins.pagination.private.assignPageHandler(grid, control, page - 1, page < 2);
                    break;
                case 'page-number':
                    control.value = page;
                    //control.off('change').on('change', gj.grid.plugins.pagination.private.createChangePageHandler(grid, page));
                    break;
                case 'page-label-last':
                    control.innerHTML = lastPage;
                    break;
                case 'page-next':
                    gj.grid.plugins.pagination.private.assignPageHandler(grid, control, page + 1, lastPage === page);
                    break;
                case 'page-last':
                    gj.grid.plugins.pagination.private.assignPageHandler(grid, control, lastPage, lastPage === page);
                    break;
                case 'page-button-one':
                    newPage = (page === 1) ? 1 : ((page == lastPage) ? (page - 2) : (page - 1));
                    gj.grid.plugins.pagination.private.assignButtonHandler(grid, control, page, newPage, lastPage);
                    break;
                case 'page-button-two':
                    newPage = (page === 1) ? 2 : ((page == lastPage) ? lastPage - 1 : page);
                    gj.grid.plugins.pagination.private.assignButtonHandler(grid, control, page, newPage, lastPage);
                    break;
                case 'page-button-three':
                    newPage = (page === 1) ? page + 2 : ((page == lastPage) ? page : (page + 1));
                    gj.grid.plugins.pagination.private.assignButtonHandler(grid, control, page, newPage, lastPage);
                    break;
                case 'record-first':
                    control.innerHTML = firstRecord;
                    break;
                case 'record-last':
                    control.innerHTML = lastRecord;
                    break;
                case 'record-total':
                    control.innerHTML = totalRecords;
                    break;
            }
        },

        assignPageHandler: function (grid, control, newPage, disabled) {
            let style = grid.getConfig().style.pager;
            if (disabled) {
                gj.core.addClasses(control, style.stateDisabled);
                control.disabled = true;
                gj.core.off(control, 'click');
            } else {
                gj.core.removeClasses(control, style.stateDisabled);
                control.disabled = false;
                gj.core.off(control, 'click');
                gj.core.on(control, 'click', function () {
                    gj.grid.plugins.pagination.private.changePage(grid, newPage);
                });
            }
        },

        assignButtonHandler: function (grid, control, page, newPage, lastPage) {
            let style = grid.getConfig().style.pager;
            if (newPage < 1 || newPage > lastPage) {
                control.style.display = 'none';
            } else {
                control.style.display = 'block';
                gj.core.off(control, 'click');
                control.innerHTML = newPage;
                if (newPage === page) {
                    gj.core.addClasses(control, style.activeButton);
                } else {
                    gj.core.removeClasses(control, style.activeButton);
                    gj.core.on(control, 'click', function () {
                        gj.grid.plugins.pagination.private.changePage(grid, newPage);
                    });
                }
            }
        },

        createChangePageHandler: function (grid, currentPage) {
            return function () {
                let data = grid.getConfig(),
                    newPage = parseInt(this.value, 10);
                gj.grid.plugins.pagination.private.changePage(grid, newPage);
            };
        },

        changePage: function (grid, newPage) {
            let data = grid.getConfig(), pageNumber;
            if (gj.grid.plugins.pagination.events.pageChanging(grid.element, newPage) !== false && !isNaN(newPage)) {
                pageNumber = grid.element.querySelector('TFOOT [data-gj-role="page-number"]');
                if (pageNumber) {
                    pageNumber.innerText = newPage;
                }
                data.params[data.paramNames.page] = newPage;
            }
            grid.reload();
        },

        updatePagerColSpan: function (grid) {
            let cell = grid.element.querySelector('tfoot tr[data-gj-role="pager"] th');
            cell && cell.setAttribute('colspan', gj.grid.methods.countVisibleColumns(grid));
        },
        
        isLastRecordVisible: function (grid) {
            let result = true,
                data = grid.getConfig(),
                limit = parseInt(data.params[data.paramNames.limit], 10),
                page = parseInt(data.params[data.paramNames.page], 10),
                count = grid.count();
            if (limit && page) {
                result = ((page - 1) * limit) + count === data.totalRecords;
            }
            return result;
        }
    },

    public: {
        getAll: function (includeAllRecords) {
            let limit, page, start,
                data = this.getConfig(),
                records = this.getRecords();
            if (Array.isArray(data.dataSource)) {
                if (includeAllRecords) {
                    return data.dataSource;
                } else if (data.params[data.paramNames.limit] && data.params[data.paramNames.page]) {                    
                    limit = parseInt(data.params[data.paramNames.limit], 10);
                    page = parseInt(data.params[data.paramNames.page], 10);
                    start = (page - 1) * limit;
                    return records.slice(start, start + limit);
                } else {
                    return records;
                }
            } else {
                return this.getRecords();
            }
        }
    },

    events: {
        /**
         * Triggered when the page size is changed.
         *
         * @event pageSizeChange
         * @param {object} e - event data
         * @param {number} e.detail.newSize - The new page size
         * @example sample <!-- bootstrap, grid, grid.pagination -->
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap',
         *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         *     grid.on('pageSizeChange', function (e) {
         *         alert('The new page size is ' + e.detail.newSize + '.');
         *     });
         * </script>
         */
        pageSizeChange: function (el, newSize) {
            return el.dispatchEvent(new CustomEvent('pageSizeChange', { detail: { newSize: newSize } }));
        },

        /**
         * Triggered before the change of the page.
         *
         * @event pageChanging
         * @param {object} e - event data
         * @param {number} e.detail.newPage - The new page
         * @example sample <!-- bootstrap5, fontawesome, dropdown, grid, grid.pagination -->
         * <table id="grid"></table>
         * <script>
         *     let grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         uiLibrary: 'bootstrap5',
         *         iconsLibrary: 'fontawesome',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         *     grid.on('pageChanging', function (e) {
         *         if (isNaN(e.detail.newPage)) {
         *             alert('Invalid page number');
         *             return false;
         *         } else {
         *             alert(e.detail.newPage + ' is valid page number.');
         *         }
         *     });
         * </script>
         */
        pageChanging: function (el, newPage) {
            return el.dispatchEvent(new CustomEvent('pageChanging', { detail: { newPage: newPage } }));
        }
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.pagination.public);
        let data = grid.getConfig();
        if (clientConfig.pager) {
            gj.grid.methods.isLastRecordVisible = gj.grid.plugins.pagination.private.isLastRecordVisible;

            grid.on('initialized', function () {
                gj.grid.plugins.pagination.private.init(grid);
            });
            grid.on('dataBound', function (e) {
                gj.grid.plugins.pagination.private.reloadPager(grid, e.detail.totalRecords);
            });
            grid.on('columnShow', function () {
                gj.grid.plugins.pagination.private.updatePagerColSpan(grid);
            });
            grid.on('columnHide', function () {
                gj.grid.plugins.pagination.private.updatePagerColSpan(grid);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Responsive Design
 */
gj.grid.plugins.responsiveDesign = {
    config: {
        base: {
            /** The interval in milliseconds for checking if the grid is resizing.
             * This setting is in use only if the resizeMonitoring setting is set to true.
             * @type number
             * @default 500
             * @example sample <!-- grid, grid.responsiveDesign -->
             * <p>Change browser window size in order to fire resize event.</p>
             * <table id="grid"></table>
             * <script>
             *     var grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         responsive: true,
             *         resizeCheckInterval: 2000, //check if the grid is resized on each 2 second
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             *     grid.on('resize', function () {
             *         alert('resize is fired.');
             *     });
             * </script>
             */
            resizeCheckInterval: 500,

            /** This setting enables responsive behaviour of the grid where some column are invisible when there is not enough space on the screen for them.
             * The visibility of the columns in this mode is driven by the column minWidth and priority settings.
             * The columns without priority setting are always visible and can't hide in small screen resolutions.
             * @type boolean
             * @default false
             * @example sample <!-- grid, grid.responsiveDesign -->
             * <p>Resize browser window in order to see his responsive behaviour.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         responsive: true,
             *         columns: [
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth', minWidth: 340, priority: 1 },
             *             { field: 'DateOfBirth', minWidth: 360, priority: 2, type: 'date' }
             *         ]
             *     });
             * </script>
             */
            responsive: false,

            /** Automatically adds hidden columns to the details section of the row.
             * This setting works only if the responsive setting is set to true and the detailTemplate is set.
             * You need to set priority and minWidth on the colums, that needs to be hidden in smaller screens.
             * @type boolean
             * @default false
             * @example Remote.Data.Source <!-- bootstrap, grid, grid.expandCollapseRows, grid.responsiveDesign -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         detailTemplate: '<div class="row"></div>',
             *         responsive: true,
             *         showHiddenColumnsAsDetails: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', minWidth: 320, priority: 1 },
             *             { field: 'PlaceOfBirth', minWidth: 320, priority: 2 }
             *         ]
             *     });
             * </script>
             * @example Local.Data.Source <!-- bootstrap, grid, grid.expandCollapseRows, grid.responsiveDesign -->
             * <table id="grid"></table>
             * <script>             
             *     var data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
             *     ];
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         detailTemplate: '<div class="row"></div>',
             *         responsive: true,
             *         showHiddenColumnsAsDetails: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [
             *             { field: 'ID', width: 34 },
             *             { field: 'Name', minWidth: 320, priority: 1 },
             *             { field: 'PlaceOfBirth', minWidth: 320, priority: 2 }
             *         ],
             *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
             *     });
             * </script>
             */
            showHiddenColumnsAsDetails: false,

            defaultColumn: {
                /** The priority of the column compared to other columns in the grid.
                 * The columns are hiding based on the priorities.
                 * This setting is working only when the responsive setting is set to true.
                 * @alias column.priority
                 * @type number
                 * @default undefined
                 * @example sample <!-- grid, grid.responsiveDesign -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         responsive: true,
                 *         columns: [
                 *             { field: 'Name' },
                 *             { field: 'PlaceOfBirth', priority: 1 },
                 *             { field: 'DateOfBirth', priority: 2, type: 'date' }
                 *         ]
                 *     });
                 * </script>
                 */
                priority: undefined,

                /** The minimum width of the column.
                 * The column is getting invisible when there is not enough space in the grid for this minimum width.
                 * This setting is working only when the responsive setting is set to true and the column priority setting is set.
                 * @alias column.minWidth
                 * @type number
                 * @default 250
                 * @example sample <!-- grid, grid.responsiveDesign -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         responsive: true,
                 *         columns: [
                 *             { field: 'Name' },
                 *             { field: 'PlaceOfBirth', minWidth: 240, priority: 1 },
                 *             { field: 'DateOfBirth', minWidth: 260, priority: 2, type: 'date' }
                 *         ]
                 *     });
                 * </script>
                 */
                minWidth: 250
            },
            style: {
                rowDetailItem: ''
            }
        },

        bootstrap: {
            style: {
                rowDetailItem: 'col-lg-4'
            }
        }
    },

    'private': {

        orderColumns: function (config) {
            var result = [];
            if (config.columns && config.columns.length) {
                for (i = 0; i < config.columns.length; i++) {
                    result.push({
                        position: i,
                        field: config.columns[i].field,
                        minWidth: config.columns[i].width || config.columns[i].minWidth || config.defaultColumn.minWidth,
                        priority: config.columns[i].priority || 0
                    });
                }
                result.sort(function (a, b) {
                    var result = 0;
                    if (a.priority < b.priority) {
                        result = -1;
                    } else if (a.priority > b.priority) {
                        result = 1;
                    }
                    return result;
                });
            }
            return result;
        },
        
        updateDetails: function (grid) {      
            var rows, data, i, j, $row, details, $placeholder, column, tmp;
            rows = grid.find('tbody > tr[data-role="row"]');
            data = grid.getConfig();
            for (i = 0; i < rows.length; i++) {
                $row = $(rows[i]);
                details = $row.data('details');
                for (j = 0; j < data.columns.length; j++) {
                    column = data.columns[j];
                    $placeholder = details && details.find('div[data-id="' + column.field + '"]');
                    if (data.columns[j].hidden) {
                        tmp = '<b>' + (column.title || column.field) + '</b>: {' + column.field + '}';
                        if (!$placeholder || !$placeholder.length) {
                            $placeholder = $('<div data-id="' + column.field + '"/>').html(tmp);
                            $placeholder.addClass(data.style.rowDetailItem);
                            if (!details || !details.length) {
                                details = $('<div class="row"/>');
                            }
                            details.append($placeholder);
                        } else {
                            $placeholder.empty().html(tmp);
                        }
                    } else if ($placeholder && $placeholder.length) {
                        $placeholder.remove();
                    }
                }
                grid.updateDetails($row);
            }
        }
    },

    'public': {

        oldWidth: undefined,

        resizeCheckIntervalId: undefined,

        /**
         * Make the grid responsive based on the available space.
         * Show column if the space for the grid is expanding and hide columns when the space for the grid is decreasing.
         * @method
         * @return grid object
         * @example sample <!-- grid -->
         * <button onclick="grid.makeResponsive()" class="gj-button-md">Make Responsive</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         responsive: false,
         *         columns: [
         *             { field: 'ID', width: 56 },
         *             { field: 'Name', minWidth: 320, priority: 1 },
         *             { field: 'PlaceOfBirth', minWidth: 320, priority: 2 }
         *         ]
         *     });
         * </script>
         */
        makeResponsive: function () {
            var i, $column,
                extraWidth = 0,
                config = this.getConfig(),
                columns = gj.grid.plugins.responsiveDesign.private.orderColumns(config);
            //calculate extra width
            for (i = 0; i < columns.length; i++) {
                $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                if ($column.is(':visible') && columns[i].minWidth < $column.width()) {
                    extraWidth += $column.width() - columns[i].minWidth;
                }
            }
            //show columns
            if (extraWidth) {
                for (i = 0; i < columns.length; i++) {
                    $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                    if (!$column.is(':visible') && columns[i].minWidth <= extraWidth) {
                        this.showColumn(columns[i].field);
                        extraWidth -= $column.width();
                    }
                }
            }
            //hide columns
            for (i = (columns.length - 1); i >= 0; i--) {
                $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                if ($column.is(':visible') && columns[i].priority && columns[i].minWidth > $column.outerWidth()) {
                    this.hideColumn(columns[i].field);
                }
            }

            return this;
        },
    },

    'events': {
        /**
         * Event fires when the grid width is changed. The "responsive" configuration setting should be set to true in order this event to fire.
         *
         * @event resize
         * @param {object} e - event data
         * @param {number} newWidth - The new width
         * @param {number} oldWidth - The old width
         * @example sample <!-- grid, grid.responsiveDesign -->
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         responsive: true,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         *     grid.on('resize', function (e, newWidth, oldWidth) {
         *         alert('resize is fired.');
         *     });
         * </script>
         */
        resize: function (grid, newWidth, oldWidth) {
            grid.triggerHandler('resize', [newWidth, oldWidth]);
        }
    },

    'configure': function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.responsiveDesign.public);
        if (fullConfig.responsive) {
            grid.on('initialized', function () {
                grid.makeResponsive();
                grid.oldWidth = grid.width();
                grid.resizeCheckIntervalId = setInterval(function () {
                    var newWidth = grid.width();
                    if (newWidth !== grid.oldWidth) {
                        gj.grid.plugins.responsiveDesign.events.resize(grid, newWidth, grid.oldWidth);
                    }
                    grid.oldWidth = newWidth;
                }, fullConfig.resizeCheckInterval);
            });
            grid.on('destroy', function () {
                if (grid.resizeCheckIntervalId) {
                    clearInterval(grid.resizeCheckIntervalId);
                }
            });
            grid.on('resize', function () {
                grid.makeResponsive();
            });
        }
        if (fullConfig.showHiddenColumnsAsDetails && gj.grid.plugins.expandCollapseRows) {
            grid.on('dataBound', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails(grid);
            });
            grid.on('columnHide', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails(grid);
            });
            grid.on('columnShow', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails(grid);
            });
            grid.on('rowDataBound', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails(grid);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Toolbar
 */
gj.grid.plugins.toolbar = {
    config: {
        base: {
            /** Template for the content in the toolbar. Appears in a separate row on top of the grid.
              * @type string
              * @default undefined
              * @example sample <!-- bootstrap, grid, grid.toolbar, grid.pagination -->
              * <table id="grid"></table>
              * <script>
              *     var grid = new GijgoGrid(document.getElementById('grid'), {
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap',
              *         toolbarTemplate: '<div class="row"><div class="col-xs-8" style="line-height:34px"><span data-gj-role="title">Grid Title</span></div><div class="col-xs-4 text-right"><button onclick="grid.reload()" class="btn btn-default">click here to refresh</button></div></div>',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
              *         pager: { limit: 5 }
              *     });
              * </script>
              */
            toolbarTemplate: undefined,

            /** The title of the grid. Appears in a separate row on top of the grid.
              * @type string
              * @default undefined
              * @example Material.Design <!-- grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     new GijgoGrid(document.getElementById('grid'), {
              *         dataSource: '/Players/Get',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     new GijgoGrid(document.getElementById('grid'), {
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     new GijgoGrid(document.getElementById('grid'), {
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap4',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              * @example Bootstrap.5 <!-- bootstrap5, grid, grid.toolbar -->
              * <table id="grid"></table>
              * <script>
              *     new GijgoGrid(document.getElementById('grid'), {
              *         dataSource: '/Players/Get',
              *         uiLibrary: 'bootstrap5',
              *         title: 'Players',
              *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              */
            title: undefined,

            style: {
                toolbar: 'gj-grid-md-toolbar'
            }
        },

        bootstrap: {
            style: {
                toolbar: 'gj-grid-bootstrap-toolbar'
            }
        },

        bootstrap4: {
            style: {
                toolbar: 'gj-grid-bootstrap-4-toolbar'
            }
        },

        bootstrap5: {
            style: {
                toolbar: 'gj-grid-bootstrap-5-toolbar'
            }
        }
    },

    private: {
        init: function (grid) {
            var data, toolbar, $title;
            data = grid.getConfig();
            toolbar = grid.element.parentNode.querySelector('div[data-gj-role="toolbar"]');
            if (typeof (data.toolbarTemplate) !== 'undefined' || typeof (data.title) !== 'undefined' || toolbar) {
                if (!toolbar) {
                    toolbar = document.createElement('div');
                    toolbar.setAttribute('data-gj-role', 'toolbar');
                    grid.element.parentNode.insertBefore(toolbar, grid.element);
                }
                gj.core.addClasses(toolbar, data.style.toolbar);

                if (!toolbar.firstChild && data.toolbarTemplate) {
                    toolbar.innerHTML = data.toolbarTemplate;
                }

                title = toolbar.querySelector('[data-gj-role="title"]');
                if (!title) {
                    title = document.createElement('div');
                    title.setAttribute('data-gj-role', 'title');
                    toolbar.appendChild(title);
                }
                if (data.title) {
                    title.innerHTML = data.title;
                }

                if (data.minWidth) {
                    gj.core.css(toolbar, 'minWidth', data.minWidth);
                }
            }
        }
    },

    public: {        
        /**
         * Get or set grid title.
         * @additionalinfo When you pass value in the text parameter this value with be in use for the new title of the grid and the method will return grid object.<br/>
         * When you don't pass value in the text parameter, then the method will return the text of the current grid title.<br/>
         * You can use this method in a combination with toolbarTemplate only if the title is wrapped in element with data-gj-role attribute that equals to "title".<br/>
         * @method
         * @param {object} text - The text of the new grid title.
         * @return string or grid object
         * @example text <!-- grid, grid.toolbar -->
         * <button onclick="grid.title('New Title')" class="gj-button-md">Set New Title</button>
         * <button onclick="alert(grid.title())" class="gj-button-md">Get Title</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         title: 'Initial Grid Title',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example html.template <!-- grid, grid.toolbar -->
         * <button onclick="grid.title('New Title')" class="gj-button-md">Set New Title</button>
         * <button onclick="alert(grid.title())" class="gj-button-md">Get Title</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         toolbarTemplate: '<div data-gj-role="title">Initial Grid Title</div>',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        title: function (text) {
            var titleEl = this.element.parentNode.querySelector('div[data-gj-role="toolbar"] [data-gj-role="title"]');
            if (typeof (text) !== 'undefined') {
                titleEl.innerHTML = text;
                return this;
            } else {
                return titleEl.innerText;
            }
        }
    },

    configure: function (grid) {
        grid.extend(grid, gj.grid.plugins.toolbar.public);
        grid.on('initialized', function () {
            gj.grid.plugins.toolbar.private.init(grid);
        });
        grid.on('destroying', function () {
            let el = grid.element.parentNode.querySelector('[data-gj-role="toolbar"]');
            el && el.remove();
        });
    }
};

/** 
 * @widget Grid 
 * @plugin Resizable Columns
 */
gj.grid.plugins.resizableColumns = {
    config: {
        base: {
            /** If set to true, users can resize columns by dragging the edges (resize handles) of their header cells.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [ { field: 'ID', width: 34 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, grid, draggable -->
             * <table id="grid"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         uiLibrary: 'bootstrap5',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4.FixedHeader <!-- bootstrap4, grid, draggable -->
             * <table id="grid" width="900"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         fixedHeader: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.5.FixedHeader <!-- bootstrap5, grid, draggable -->
             * <table id="grid" width="900"></table>
             * <script>
             *     let grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         resizableColumns: true,
             *         fixedHeader: true,
             *         uiLibrary: 'bootstrap5',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            resizableColumns: false
        }
    },

    private: {
        init: function (grid, config) {
            let columns, wrapper, resizer, marginRight;
            columns = grid.element.querySelectorAll('thead tr[data-gj-role="caption"] th');
            if (columns.length) {
                for (let i = 0; i < columns.length - 1; i++) {
                    wrapper = document.createElement('div');
                    wrapper.classList.add('gj-grid-column-resizer-wrapper');
                    marginRight = parseInt(getComputedStyle(columns[i]).paddingRight, 10) + 3;
                    resizer =  document.createElement('span');
                    resizer.classList.add('gj-grid-column-resizer');
                    resizer.style.marginRight = '-' + marginRight + 'px';
                    new GijgoDraggable(resizer, {
                        start: function () {
                            grid.element.classList.add('gj-unselectable');
                            grid.element.classList.add('gj-grid-resize-cursor');
                        },
                        stop: function () {
                            grid.element.classList.remove('gj-unselectable');
                            grid.element.classList.remove('gj-grid-resize-cursor');
                            this.style.removeProperty('top');
                            this.style.removeProperty('left');
                            this.style.removeProperty('position');
                        },
                        drag: gj.grid.plugins.resizableColumns.private.createResizeHandle(grid, columns[i], config.columns, i)
                    });
                    wrapper.appendChild(resizer)
                    columns[i].appendChild(wrapper);
                }
                for (let i = 0; i < columns.length; i++) {
                    if (!columns[i].getAttribute('width')) {
                        columns[i].setAttribute('width', gj.core.width(columns[i], true));
                    }
                }
            }
        },

        createResizeHandle: function (grid, column, columnsConfig, index) {
            let data = grid.getConfig();
            return function (e) {
                let i, rows, newWidth, nextWidth,
                    currentWidth = parseInt(column.getAttribute('width'), 10),
                    position = gj.core.position(this),
                    offset = { top: e.detail.newPosition.top - position.top, left: e.detail.newPosition.left - position.left };
                if (!currentWidth) {
                    currentWidth = gj.core.width(column);
                }
                if (offset.left) {
                    newWidth = currentWidth + offset.left;
                    nextWidth = parseInt(column.nextSibling.getAttribute('width'), 10) - offset.left;
                    columnsConfig[index].width = newWidth;
                    columnsConfig[index].width = newWidth;
                    column.setAttribute('width', newWidth);
                    column.nextSibling.setAttribute('width', nextWidth);
                    if (data.resizableColumns) {
                        rows = grid.element.querySelectorAll('tbody tr');
                        for (i = 0; i < rows.length; i++) {
                            rows[i].children[index].setAttribute('width', newWidth);
                            rows[i].children[index + 1].setAttribute('width', nextWidth);
                        }
                    }
                }
            };
        }
    },

    public: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.resizableColumns.public);
        if (fullConfig.resizableColumns && gj.draggable) {
            grid.on('initialized', function () {
                gj.grid.plugins.resizableColumns.private.init(grid, fullConfig);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Row Reorder
 */
gj.grid.plugins.rowReorder = {
    config: {
        base: {
            /** If set to true, enable row reordering with drag and drop.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.3 <!-- bootstrap, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         uiLibrary: 'bootstrap',
             *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         uiLibrary: 'bootstrap4',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, grid, grid.rowReorder, draggable, droppable -->
             * <p>Drag and Drop rows in order to reorder them.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         uiLibrary: 'bootstrap5',
             *         columns: [ { field: 'ID', width: 42 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            rowReorder: false,

            /** If set, enable row reordering only when you try to drag cell from the configured column.
             * Accept only field names of columns.
             * @type string
             * @default undefined
             * @example sample <!-- grid, grid.rowReorder, draggable, droppable -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         rowReorder: true,
             *         rowReorderColumn: 'ID',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            rowReorderColumn: undefined,

            /** If set, update the value in the field for all records. Accept only field names of columns.
             * @type string
             * @default undefined
             * @example Visible.OrderNumber <!-- grid, grid.rowReorder, draggable, droppable -->
             * <table id="grid"></table>
             * <script>
             *     let data = [
             *         { 'ID': 1, 'OrderNumber': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'OrderNumber': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'OrderNumber': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
             *     ];
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         rowReorder: true,
             *         orderNumberField: 'OrderNumber',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'OrderNumber', width:120 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Hidden.OrderNumber <!-- grid, grid.rowReorder, draggable, droppable -->
             * <button onclick="alert(JSON.stringify(grid.getAll()))" class="gj-button-md">Show Data</button><br/><br/>
             * <table id="grid"></table>
             * <script>
             *     let data = [
             *         { 'ID': 1, 'OrderNumber': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'OrderNumber': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'OrderNumber': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
             *     ],
             *     grid = new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         rowReorder: true,
             *         orderNumberField: 'OrderNumber',
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             */
            orderNumberField: undefined,

            style: {
                targetRowIndicatorTop: 'gj-grid-row-reorder-indicator-top',
                targetRowIndicatorBottom: 'gj-grid-row-reorder-indicator-bottom'
            }
        }
    },

    private: {
        init: function (grid) {
            let i, columnPosition,
                config = grid.getConfig(),
                methods = gj.grid.plugins.rowReorder.private,
                rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
            if (config.rowReorderColumn) {
                columnPosition = gj.grid.methods.getColumnPosition(config.columns, config.rowReorderColumn);
            }
            gj.core.on(document, 'mousemove', methods.createMouseMoveHandler(grid));
            gj.core.on(document, 'mouseup', methods.createMouseUpHandler(grid));
            for (i = 0; i < rows.length; i++) {
                if (typeof (columnPosition) !== 'undefined') {
                    gj.core.on(rows[i].children[columnPosition], 'mousedown', methods.createRowMouseDownHandler(grid, rows[i]));
                } else {
                    gj.core.on(rows[i], 'mousedown', methods.createRowMouseDownHandler(grid, rows[i]));
                }
            }
        },

        createRowMouseDownHandler: function (grid, trSource) {
            return function (e) {
                let dragEl, elements, cells,
                columns = grid.getConfig().columns,
                position = trSource.getAttribute('data-gj-position');
                
                grid.element.classList.add('gj-unselectable');

                dragEl = grid.element.cloneNode(true);
                dragEl.setAttribute('data-gj-role', 'draggable-clone');
                dragEl.classList.add('gj-unselectable');
                dragEl.style.cursor = 'move';
                dragEl.querySelector('thead').remove();
                elements = dragEl.querySelector('tfoot');
                elements && elements.remove();
                document.body.appendChild(dragEl);

                elements = dragEl.querySelectorAll('tbody tr:not([data-gj-position="' + position + '"])');                
                for (let i = 0; i < elements.length; i++) {
                    elements[i].remove();
                }

                cells = dragEl.querySelectorAll('tbody tr td');
                for (let i = 0; i < cells.length; i++) {
                    if (columns[i].width) {
                        cells[i].setAttribute('width', columns[i].width);
                    }
                }

                dragEl.style.position = 'absolute';
                dragEl.style.top = trSource.getBoundingClientRect().top + 'px';
                dragEl.style.left = trSource.getBoundingClientRect().left + 'px';
                dragEl.style.width = gj.core.width(trSource) + 'px';
                dragEl.style.zIndex = 1;
                new GijgoDraggable(dragEl, {
                    stop: gj.grid.plugins.rowReorder.private.createDragStopHandler(grid, trSource, position - 1)
                });
                dragEl.dispatchEvent(new Event('mousedown'));

                grid.element.setAttribute('data-gj-drag-row', position);
            };
        },

        createMouseUpHandler: function (grid) {
            return function (e) {
                if (grid.element.hasAttribute('data-gj-drag-row')) {
                    grid.element.removeAttribute('data-gj-drag-row');
                }
            }
        },

        createMouseMoveHandler: function (grid) {
            let body = grid.element.querySelector('tbody'),
                bodyPos = gj.core.position(body);
            return function (e) {
                if (grid.element.hasAttribute('data-gj-drag-row')) {
                    let mouse = { x: grid.mouseX(e), y: grid.mouseY(e) };
                    if (mouse.x > bodyPos.left && mouse.x < bodyPos.right && mouse.y > bodyPos.top && mouse.y < bodyPos.bottom) {
                        for (let i = 0; i < body.children.length; i++) {
                            let trPos = gj.core.position(body.children[i]) ;
                            if (mouse.x > trPos.left && mouse.x < trPos.right && mouse.y > trPos.top && mouse.y < trPos.bottom) {       
                                let trIndex = Array.from(body.children).indexOf(body.children[i]),
                                    srcIndex = parseInt(grid.element.getAttribute('data-gj-drag-row')) - 1,
                                    isTop = mouse.y < ((trPos.top + trPos.bottom) / 2);

                                grid.element.querySelectorAll('.gj-grid-top-border').forEach((element) => {  element.classList.remove('gj-grid-top-border'); });
                                grid.element.querySelectorAll('.gj-grid-bottom-border').forEach((element) => {  element.classList.remove('gj-grid-bottom-border'); });
                                if (srcIndex < trIndex) {
                                    if (!isTop || srcIndex + 1 < trIndex) {
                                        body.children[i].classList.add(isTop ? 'gj-grid-top-border' : 'gj-grid-bottom-border');
                                        break;
                                    }
                                }
                                if (srcIndex > trIndex) {
                                    if (isTop || trIndex + 1 < srcIndex) {
                                        body.children[i].classList.add(isTop ? 'gj-grid-top-border' : 'gj-grid-bottom-border');
                                        break;
                                    }
                                }
                            }
                        }                        
                    }
                }
            };
        },

        createDragStopHandler: function (grid, trSource, srcIndex) {
            let body = grid.element.querySelector('tbody'),
                bodyPos = gj.core.position(body),
                methods = gj.grid.plugins.rowReorder.private;
            return function (e) {
                let records = grid.getRecords();
                document.body.querySelector('table[data-gj-role="draggable-clone"]').remove();
                grid.element.classList.remove('gj-unselectable');
                grid.element.querySelectorAll('.gj-grid-top-border').forEach((element) => {  element.classList.remove('gj-grid-top-border'); });
                grid.element.querySelectorAll('.gj-grid-bottom-border').forEach((element) => {  element.classList.remove('gj-grid-bottom-border'); });
                
                if (e.detail.x > bodyPos.left && e.detail.x < bodyPos.right && e.detail.y > bodyPos.top && e.detail.y < bodyPos.bottom) {
                    for (let i = 0; i < body.children.length; i++) {
                        let trPos = gj.core.position(body.children[i]) ;
                        if (e.detail.x > trPos.left && e.detail.x < trPos.right && e.detail.y > trPos.top && e.detail.y < trPos.bottom) {       
                            let trIndex = Array.from(body.children).indexOf(body.children[i]),
                                isTop = e.detail.y < ((trPos.top + trPos.bottom) / 2);

                            grid.element.querySelectorAll('.gj-grid-top-border').forEach((element) => {  element.classList.remove('gj-grid-top-border'); });
                            grid.element.querySelectorAll('.gj-grid-bottom-border').forEach((element) => {  element.classList.remove('gj-grid-bottom-border'); });
                            if (srcIndex < trIndex) {
                                if (!isTop || srcIndex + 1 < trIndex) {
                                    body.insertBefore(trSource, isTop ? body.children[i] : body.children[i].nextSibling);
                                    records.splice(isTop ? trIndex - 1 : trIndex, 0, records.splice(srcIndex, 1)[0]);
                                    methods.updatePositions(grid, records);
                                    break;
                                }
                            }
                            if (srcIndex > trIndex) {
                                if (isTop || trIndex + 1 < srcIndex) {
                                    body.insertBefore(trSource, isTop ? body.children[i] : body.children[i].nextSibling);
                                    records.splice(isTop ? trIndex : trIndex + 1, 0, records.splice(srcIndex, 1)[0]);
                                    methods.updatePositions(grid, records);
                                    break;
                                }
                            }
                        }
                    }                        
                }
            }
        },

        updatePositions: function (grid, records) {
            let rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]'),
                config = grid.getConfig();
            if (config.orderNumberField) {
                for (i = 0; i < records.length; i++) {
                    records[i][config.orderNumberField] = i + 1;
                }
            }
            for (let i = 0; i < rows.length; i++) {
                rows[i].setAttribute('data-gj-position', i + 1);
                if (config.orderNumberField) {
                    let id = gj.grid.methods.getId(rows[i], config.primaryKey, i + 1),
                        record = gj.grid.methods.getByPosition(grid, i + 1);
                    grid.setCellContent(id, config.orderNumberField, record[data.orderNumberField]);
                }
            }
        }
    },

    public: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.rowReorder.public);
        if (fullConfig.rowReorder && gj.draggable && gj.droppable) {
            grid.on('dataBound', function () {
                gj.grid.plugins.rowReorder.private.init(grid);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Export
 */
gj.grid.plugins.export = {
    config: { base: {} },

    public: {
        /**
         * Get grid data in Comma Separated Values (CSV) format.
         * @method
         * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
         * @return string
         * @example Local.Data <!-- grid, dropdown -->
         * <button onclick="alert(grid.getCSV(true))" class="gj-button-md">Get All</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var data, grid;
         *     data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: data,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Remote.Data <!-- grid, dropdown -->
         * <button onclick="alert(grid.getCSV())" class="gj-button-md">Get CSV</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        getCSV: function (includeAllRecords) {
            var i, j, line = '', str = '',
                columns = this.getConfig().columns,
                records = this.getAll(includeAllRecords);

            if (records.length) {

                for (i = 0; i < columns.length; i++) {
                    if (gj.grid.plugins.export.public.isColumnApplicable(columns[i])) {
                        line += '"' + (columns[i].title || columns[i].field).replace(/<[^>]+>/g, ' ') + '",';
                    }
                }
                str += line.slice(0, line.length - 1) + '\r\n';

                for (i = 0; i < records.length; i++) {
                    line = '';

                    for (j = 0; j < columns.length; j++) {
                        if (gj.grid.plugins.export.public.isColumnApplicable(columns[j])) {
                            line += '"' + records[i][columns[j].field] + '",';
                        }
                    }                    
                    str += line.slice(0, line.length - 1) + '\r\n';
                }
            }

            return str;
        },

        /**
         * Download grid data in Comma Separated Values (CSV) format.
         * @method
         * @param {string} filename - name of the generated file.
         * @param {boolean} includeAllRecords - include records that are not visible when you are using local dataSource.
         * @return grid object
         * @example Local.Data <!-- grid, dropdown -->
         * <button onclick="grid.downloadCSV()" class="gj-button-md">Download Only First Page</button>
         * <button onclick="grid.downloadCSV('myfilename.csv', true)" class="gj-button-md">Download All Data</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var data, grid;
         *     data = [
         *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
         *         { 'ID': 2, 'Name': 'Ronaldo Luis Nazario de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
         *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' }
         *     ];
         *     grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: data,
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
         *     });
         * </script>
         * @example Remote.Data <!-- grid, dropdown -->
         * <button onclick="grid.downloadCSV('myfilename.csv')" class="gj-button-md">Download CSV</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = new GijgoGrid(document.getElementById('grid'), {
         *         dataSource: '/Players/Get',
         *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
         *         pager: { limit: 5 }
         *     });
         * </script>
         */
        downloadCSV: function (filename, includeAllRecords) {
            var link = document.createElement('a');
            document.body.appendChild(link);
            link.download = filename || 'griddata.csv'; 
            if (window.navigator.userAgent.indexOf("Edge") > -1) {
                link.href = URL.createObjectURL(new Blob([this.getCSV(includeAllRecords)], { type: 'text/csv;charset=utf-8;' }));
            } else {
                link.href = 'data:text/csv;charset=utf-8,' + escape(this.getCSV(includeAllRecords));
            }
            link.click();
            document.body.removeChild(link);
            return this;
        },

        isColumnApplicable: function (column) {
            return column.hidden !== true && !column.role;
        }
    },

    configure: function (grid) {
        grid.extend(grid, gj.grid.plugins.export.public);
    }
};

/** 
 * @widget Grid 
 * @plugin Column Reorder
 */
gj.grid.plugins.columnReorder = {
    config: {
        base: {
            /** If set to true, enable column reordering with drag and drop.
             * @type boolean
             * @default false
             * @example Material.Design <!-- grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 56 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap <!-- bootstrap, grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap4',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 48 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth', sortable: true } ]
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, grid, draggable, droppable -->
             * <p>Drag and Drop column headers in order to reorder the columns.</p>
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         uiLibrary: 'bootstrap5',
             *         columnReorder: true,
             *         columns: [ { field: 'ID', width: 48 }, { field: 'Name', sortable: true }, { field: 'PlaceOfBirth', sortable: true } ]
             *     });
             * </script>
             */
            columnReorder: false,

            dragReady: false,

            style: {
                targetRowIndicatorTop: 'gj-grid-row-reorder-indicator-top',
                targetRowIndicatorBottom: 'gj-grid-row-reorder-indicator-bottom'
            }
        }
    },

    private: {
        init: function (grid) {
            let i, cells = grid.element.querySelectorAll('thead tr th');
            gj.core.on(document, 'mousemove', gj.grid.plugins.columnReorder.private.createMouseMoveHandler(grid));
            gj.core.on(document, 'mouseup', gj.grid.plugins.columnReorder.private.createMouseUpHandler(grid));
            for (i = 0; i < cells.length; i++) {
                gj.core.on(cells[i], 'mousedown', gj.grid.plugins.columnReorder.private.createMouseDownHandler(grid, cells[i]));
                new GijgoDroppable(cells[i]);
            }
        },

        createMouseDownHandler: function (grid, thSource) {
            return function (e) {
                let dragEl, srcIndex, elements;

                dragEl = grid.element.cloneNode(true);
                grid.element.classList.add('gj-unselectable');
                dragEl.classList.add('gj-unselectable');
                document.body.appendChild(dragEl);
                dragEl.setAttribute('data-gj-role', 'draggable-clone')
                dragEl.style.cursor = 'move';
                srcIndex = Array.from(thSource.parentNode.children).indexOf(thSource);
                
                elements = dragEl.querySelectorAll('thead tr th');
                for (let i = 0; i < elements.length; i++) {
                    if (i !== srcIndex) {
                        elements[i].remove();
                    }
                }
                elements = dragEl.querySelectorAll('tbody tr:not([data-gj-role="row"])');
                for (let i = 0; i < elements.length; i++) {
                    elements[i].remove();
                }
                
                elements = dragEl.querySelectorAll('tbody tr');
                for (let i = 0; i < elements.length; i++) {
                    for (let index = srcIndex, j = 0; j < elements[i].children.length; j++) {
                        if (j !== index) {
                            elements[i].removeChild(elements[i].children[j]);
                            j--;
                            index--;
                        }
                    }
                }

                elements = dragEl.querySelector('tfoot');
                elements && elements.remove();

                dragEl.style.position = 'absolute';
                dragEl.style.top = thSource.getBoundingClientRect().top + 'px';
                dragEl.style.left = thSource.getBoundingClientRect().left + 'px';
                dragEl.style.width = gj.core.width(thSource) + 'px';
                dragEl.style.zIndex = 1;

                new GijgoDraggable(dragEl, {
                    stop: gj.grid.plugins.columnReorder.private.createDragStopHandler(grid, thSource, srcIndex)
                });
                dragEl.dispatchEvent(new Event('mousedown'));

                grid.element.setAttribute('data-gj-drag-column', srcIndex);
            }
        },

        createMouseUpHandler: function (grid) {
            return function (e) {
                if (grid.element.hasAttribute('data-gj-drag-column')) {
                    grid.element.removeAttribute('data-gj-drag-column');
                }
            }
        },

        createMouseMoveHandler: function (grid) {
            let header = grid.element.querySelector('thead tr'),
                body = grid.element.querySelector('tbody'),
                headerPos = gj.core.position(header);
            return function (e) {
                if (grid.element.hasAttribute('data-gj-drag-column')) {
                    let mouse = { x: grid.mouseX(e), y: grid.mouseY(e) };
                    if (mouse.x > headerPos.left && mouse.x < headerPos.right && mouse.y > headerPos.top && mouse.y < headerPos.bottom) {
                        for (let i = 0; i < header.children.length; i++) {
                            let thPos = gj.core.position(header.children[i]) ;
                            if (mouse.x > thPos.left && mouse.x < thPos.right && mouse.y > thPos.top && mouse.y < thPos.bottom) {       
                                let thIndex = Array.from(header.children).indexOf(header.children[i]),
                                    srcIndex = parseInt(grid.element.getAttribute('data-gj-drag-column')),
                                    isLeft = mouse.x < ((thPos.left + thPos.right) / 2);

                                grid.element.querySelectorAll('.gj-grid-left-border').forEach((element) => {  element.classList.remove('gj-grid-left-border'); });
                                grid.element.querySelectorAll('.gj-grid-right-border').forEach((element) => {  element.classList.remove('gj-grid-right-border'); });
                                if (srcIndex < thIndex) {
                                    if (!isLeft || srcIndex + 1 < thIndex) {
                                        gj.grid.plugins.columnReorder.private.addBorder(isLeft, header, body, i);
                                        break;
                                    }
                                }
                                if (srcIndex > thIndex) {
                                    if (isLeft || thIndex + 1 < srcIndex) {
                                        gj.grid.plugins.columnReorder.private.addBorder(isLeft, header, body, i);
                                        break;
                                    }
                                }
                            }
                        }                        
                    }
                }
            };
        },

        addBorder: function (isLeft, header, body, column) {
            header.children[column].classList.add(isLeft ? 'gj-grid-left-border' : 'gj-grid-right-border');
            for (let i = 0; i < body.children.length; i++) {
                body.children[i].children[column].classList.add(isLeft ? 'gj-grid-left-border' : 'gj-grid-right-border');
            }
        },

        createDragStopHandler: function (grid, thSource, srcIndex) {            
            let header = grid.element.querySelector('thead tr'),
                headerPos = gj.core.position(header),
                config = grid.getConfig();

            return function (e) {
                document.body.querySelector('table[data-gj-role="draggable-clone"]').remove();
                grid.element.classList.remove('gj-unselectable');
                grid.element.querySelectorAll('.gj-grid-left-border').forEach((element) => {  element.classList.remove('gj-grid-left-border'); });
                grid.element.querySelectorAll('.gj-grid-right-border').forEach((element) => {  element.classList.remove('gj-grid-right-border'); });
                if (e.detail.x > headerPos.left && e.detail.x < headerPos.right && e.detail.y > headerPos.top && e.detail.y < headerPos.bottom) {
                    for (let i = 0; i < header.children.length; i++) {
                        let thPos = gj.core.position(header.children[i]);
                        if (e.detail.x > thPos.left && e.detail.x < thPos.right && e.detail.y > thPos.top && e.detail.y < thPos.bottom) {  
                            let thIndex = Array.from(header.children).indexOf(header.children[i]),
                                isLeft = e.detail.x < ((thPos.left + thPos.right) / 2);
                            if (srcIndex < thIndex) {
                                if (!isLeft || srcIndex + 1 < thIndex) {
                                    header.insertBefore(thSource, isLeft ? header.children[i] : header.children[i].nextSibling);
                                    gj.grid.plugins.columnReorder.private.moveRowCells(grid, srcIndex, isLeft ? thIndex - 1 : thIndex);
                                    config.columns.splice(srcIndex, isLeft ? thIndex - 1 : thIndex, 0, config.columns.splice(srcIndex, 1)[0]);
                                    break;
                                }
                            }
                            if (srcIndex > thIndex) {
                                if (isLeft || thIndex + 1 < srcIndex) {
                                    header.insertBefore(thSource, isLeft ? header.children[i] : header.children[i].nextSibling);
                                    gj.grid.plugins.columnReorder.private.moveRowCells(grid, srcIndex, isLeft ? thIndex : thIndex + 1);
                                    config.columns.splice(srcIndex, isLeft ? thIndex : thIndex + 1, 0, config.columns.splice(srcIndex, 1)[0]);
                                    break; 
                                }
                            }
                            break;
                        }
                    }                        
                }
            }
        },

        moveRowCells: function (grid, sourcePosition, targetPosition) {
            let i, rows = grid.element.querySelectorAll('tbody tr[data-gj-role="row"]');
            for (i = 0; i < rows.length; i++) {
                if (targetPosition < sourcePosition) {
                    rows[i].insertBefore(rows[i].children[sourcePosition], rows[i].children[targetPosition]);
                } else {
                    rows[i].insertBefore(rows[i].children[sourcePosition], rows[i].children[targetPosition].nextSibling);
                }                
            }
        }
    },

    public: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.columnReorder.public);
        if (fullConfig.columnReorder) {
            grid.on('initialized', function () {
                gj.grid.plugins.columnReorder.private.init(grid);
            });
        }
    }
};

/**
 * @widget Grid
 * @plugin Header Filter
 */
gj.grid.plugins.headerFilter = {
    config: {
        base: {
            defaultColumnSettings: {
                /** Indicates if the column is sortable. If set to false the header filter is hidden.
                 * @alias column.filterable
                 * @type boolean
                 * @default true
                 * @example Material.Design <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: true,
                 *         columns: [
                 *             { field: 'ID', width: 56, filterable: false },
                 *             { field: 'Name', filterable: true },
                 *             { field: 'PlaceOfBirth' }
                 *         ]
                 *     });
                 * </script>
                 * @example Bootstrap.3 <!-- bootstrap, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: true,
                 *         uiLibrary: 'bootstrap',
                 *         columns: [
                 *             { field: 'ID', width: 56, filterable: false },
                 *             { field: 'Name', filterable: true },
                 *             { field: 'PlaceOfBirth' }
                 *         ]
                 *     });
                 * </script>
                 */
                filterable: true
            },

            /** If set to true, add filters for each column
             * @type boolean
             * @default object
             * @example Remote.DataSource <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: '/Players/Get',
             *         headerFilter: true,
             *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             * </script>
             * @example Local.DataSource <!-- grid -->
             * <table id="grid"></table>
             * <script>
             *     var data = [
             *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria' },
             *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil' },
             *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England' },
             *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany' },
             *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia' },
             *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria' }
             *     ];
             *     new GijgoGrid(document.getElementById('grid'), {
             *         dataSource: data,
             *         headerFilter: true,
             *         columns: [ 
             *             { field: 'ID', width: 56, filterable: false }, 
             *             { field: 'Name' }, 
             *             { field: 'PlaceOfBirth' } 
             *         ],
             *         pager: { limit: 5 }
             *     });
             * </script>
             */
            headerFilter: {
                /** Type of the header filter
                 * @alias headerFilter.type
                 * @type (onenterkeypress|onchange)
                 * @default 'onenterkeypress'
                 * @example OnEnterKeyPress <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: {
                 *             type: 'onenterkeypress'
                 *         },
                 *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
                 *     });
                 * </script>
                 * @example OnChange <!-- grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         dataSource: '/Players/Get',
                 *         headerFilter: {
                 *             type: 'onchange'
                 *         },
                 *         columns: [ { field: 'ID', width: 56, filterable: false }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
                 *     });
                 * </script>
                 */
                type: 'onenterkeypress'
            }
        }
    },

    private: {
        init: function (grid) {
            var i, th, ctrl, data = grid.getConfig(),
                filterTr = document.createElement('tr');

            filterTr.setAttribute('data-gj-role', 'filter');
            for (i = 0; i < data.columns.length; i++) {
                th = document.createElement('th');
                if (data.columns[i].filterable) {
                    ctrl = document.createElement('input');
                    ctrl.setAttribute('data-gj-field', data.columns[i].field);
                    ctrl.classList.add('gj-width-full');
                    if ('onchange' === data.headerFilter.type) {
                        ctrl.addEventListener('keyup', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                        ctrl.addEventListener('change', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                        ctrl.addEventListener('paste', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                    } else {
                        ctrl.addEventListener('keypress', function (e) {
                            if (e.key === 'Enter') {
                                gj.grid.plugins.headerFilter.private.reload(grid, this);
                            }
                        });
                        ctrl.addEventListener('blur', function (e) {
                            gj.grid.plugins.headerFilter.private.reload(grid, this);
                        });
                    }
                    th.appendChild(ctrl);
                }
                if (data.columns[i].hidden) {
                    th.style.display = 'none';
                }
                filterTr.appendChild(th);
            }

            grid.element.querySelector('thead').appendChild(filterTr);
        },

        reload: function (grid, ctrl) {
            var params = {};
            params[ctrl.getAttribute('data-gj-field')] = ctrl.value;
            grid.reload(params);
        }
    },

    public: {
    },

    events: {
    },

    configure: function (grid, fullConfig, clientConfig) {
        grid.extend(grid, gj.grid.plugins.headerFilter.public);
        var data = grid.getConfig();
        if (clientConfig.headerFilter) {
            grid.on('initialized', function () {
                gj.grid.plugins.headerFilter.private.init(grid);
            });
        }
    }
};

/** 
 * @widget Grid 
 * @plugin Grouping
 */
gj.grid.plugins.grouping = {
    config: {
        base: {
            paramNames: {
                /** The name of the parameter that is going to send the name of the column for grouping.
                 * The grouping should be enabled in order this parameter to be in use.
                 * @alias paramNames.groupBy
                 * @type string
                 * @default "groupBy"
                 */
                groupBy: 'groupBy',

                /** The name of the parameter that is going to send the direction for grouping.
                 * The grouping should be enabled in order this parameter to be in use.
                 * @alias paramNames.groupByDirection
                 * @type string
                 * @default "groupByDirection"
                 */
                groupByDirection: 'groupByDirection'
            },

            grouping: {
                /** The name of the field that needs to be in use for grouping.
                  * @type string
                  * @alias grouping.groupBy
                  * @default undefined
                  * @example Local.Data <!-- grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     let grid, data = [
                  *         { 'ID': 1, 'Name': 'Hristo Stoichkov', 'PlaceOfBirth': 'Plovdiv, Bulgaria', CountryName: 'Bulgaria' },
                  *         { 'ID': 2, 'Name': 'Ronaldo Luís Nazário de Lima', 'PlaceOfBirth': 'Rio de Janeiro, Brazil', CountryName: 'Brazil' },
                  *         { 'ID': 3, 'Name': 'David Platt', 'PlaceOfBirth': 'Chadderton, Lancashire, England', CountryName: 'England' },
                  *         { 'ID': 4, 'Name': 'Manuel Neuer', 'PlaceOfBirth': 'Gelsenkirchen, West Germany', CountryName: 'Germany' },
                  *         { 'ID': 5, 'Name': 'James Rodríguez', 'PlaceOfBirth': 'Cúcuta, Colombia', CountryName: 'Colombia' },
                  *         { 'ID': 6, 'Name': 'Dimitar Berbatov', 'PlaceOfBirth': 'Blagoevgrad, Bulgaria', CountryName: 'Bulgaria' }
                  *     ];
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: data,
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Remote.Data <!-- grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Bootstrap.3 <!-- bootstrap, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'DateOfBirth', type: 'date' } ],
                  *         detailTemplate: '<div><b>Place Of Birth:</b> {PlaceOfBirth}</div>'
                  *     });
                  * </script>
                  * @example Bootstrap.4 <!-- bootstrap4, fontawesome, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap4',
                  *         iconsLibrary: 'fontawesome',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  * @example Bootstrap.5 <!-- bootstrap5, fontawesome, grid -->
                  * <table id="grid"></table>
                  * <script>
                  *     new GijgoGrid(document.getElementById('grid'), {
                  *         dataSource: '/Players/Get',
                  *         uiLibrary: 'bootstrap5',
                  *         iconsLibrary: 'fontawesome',
                  *         grouping: { groupBy: 'CountryName' },
                  *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ]
                  *     });
                  * </script>
                  */
                groupBy: undefined,

                direction: 'asc'
            },

            icons: {
                /** Expand row icon definition.
                 * @alias icons.expandGroup
                 * @type String
                 * @default '<i class="gj-icon plus" />'
                 * @example Right.Down.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                 *         grouping: { groupBy: 'CountryName' },
                 *         icons: {
                 *             expandGroup: '<i class="material-icons">keyboard_arrow_right</i>',
                 *             collapseGroup: '<i class="material-icons">keyboard_arrow_down</i>'
                 *         }
                 *     });
                 * </script>
                 */
                expandGroup: '<i class="gj-icon plus" />',

                /** Collapse row icon definition.
                 * @alias icons.collapseGroup
                 * @type String
                 * @default '<i class="gj-icon minus" />'
                 * @example Right.Down.Icons <!-- materialicons, grid -->
                 * <table id="grid"></table>
                 * <script>
                 *     new GijgoGrid(document.getElementById('grid'), {
                 *         primaryKey: 'ID',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'Name', sortable: true }, { field: 'PlaceOfBirth' } ],
                 *         grouping: { groupBy: 'CountryName' },
                 *         icons: {
                 *             expandGroup: '<i class="material-icons">keyboard_arrow_right</i>',
                 *             collapseGroup: '<i class="material-icons">keyboard_arrow_down</i>'
                 *         }
                 *     });
                 * </script>
                 */
                collapseGroup: '<i class="gj-icon minus" />'
            }
        },

        fontawesome: {
            icons: {
                expandGroup: '<i class="fa fa-plus" aria-hidden="true"></i>',
                collapseGroup: '<i class="fa fa-minus" aria-hidden="true"></i>'
            }
        },

        glyphicons: {
            icons: {
                expandGroup: '<span class="glyphicon glyphicon-plus" />',
                collapseGroup: '<span class="glyphicon glyphicon-minus" />'
            }
        }
    },

    private: {
        init: function (grid) {
            let previousValue, data = grid.getConfig();

            previousValue = undefined;
            grid.on('rowDataBound', function (e) {
                if (previousValue !== e.detail.record[data.grouping.groupBy] || e.detail.row.rowIndex === 1) {
                    let colspan = gj.grid.methods.countVisibleColumns(grid) - 1,
                        groupRow = document.createElement('tr'),
                        expandCollapseCell = document.createElement('td'),
                        groupCell = document.createElement('td'),
                        icon = document.createElement('div'),
                        display = document.createElement('div'),
                        position = e.detail.row.getAttribute("data-gj-position");

                    groupRow.setAttribute('data-gj-role', 'group');
                    gj.core.addClasses(expandCollapseCell, 'gj-text-align-center gj-unselectable gj-cursor-pointer');

                    icon.setAttribute('data-gj-role', 'display');
                    icon.innerHTML = data.icons.collapseGroup;
                    gj.core.on(icon, 'click', gj.grid.plugins.grouping.private.createExpandCollapseHandler(grid, position));
                    expandCollapseCell.appendChild(icon);
                    groupRow.appendChild(expandCollapseCell);

                    groupCell.setAttribute('colspan', colspan);
                    display.setAttribute('data-gj-role', 'display');
                    display.innerHTML = data.grouping.groupBy + ': ' + e.detail.record[data.grouping.groupBy];
                    groupCell.appendChild(display);
                    groupRow.appendChild(groupCell);

                    e.detail.row.parentNode.insertBefore(groupRow, e.detail.row);
                    previousValue = e.detail.record[data.grouping.groupBy];
                }
                //TODO: row.show();
            });

            data.params[data.paramNames.groupBy] = data.grouping.groupBy;
            data.params[data.paramNames.groupByDirection] = data.grouping.direction;
        },

        grouping: function (grid, records) {
            let data = grid.getConfig();
            records.sort(gj.grid.methods.createDefaultSorter(data.grouping.direction, data.grouping.groupBy));
        },

        createExpandCollapseHandler: function (grid, position) {
            return function () {
                let methods = gj.grid.plugins.grouping.private,
                    row = this.parentNode.parentNode.nextSibling;
                if (row.style.display === 'none') {
                    methods.expandGroup(grid.getConfig().icons, this);
                } else {
                    methods.collapseGroup(grid.getConfig().icons, this);
                }
            };
        },

        collapseGroup: function (icons, icon) {
            let nextEl = icon.parentNode.parentNode.nextSibling;
            
            while (nextEl) {
                if (nextEl.getAttribute('data-gj-role') === 'group') {
                    break;
                } else {
                    nextEl.style.display = 'none';
                    nextEl = nextEl.nextSibling;
                }
            }
            icon.innerHTML = icons.expandGroup;
        },

        expandGroup: function (icons, icon) {
            let nextEl = icon.parentNode.parentNode.nextSibling;
            
            while (nextEl) {
                if (nextEl.getAttribute('data-gj-role') === 'group') {
                    break;
                } else {
                    nextEl.style.display = '';
                    nextEl = nextEl.nextSibling;
                }
            }
            icon.innerHTML = icons.collapseGroup;
        }
    },

    public: { },

    configure: function (grid) {
        let column, data = grid.getConfig();
        grid.extend(grid, gj.grid.plugins.grouping.public);
        if (data.grouping && data.grouping.groupBy) {
            column = {
                title: '',
                width: data.defaultIconColumnWidth,
                align: 'center',
                stopPropagation: true,
                cssClass: 'gj-cursor-pointer gj-unselectable'
            };
            data.columns = [column].concat(data.columns);

            grid.on('initialized', function () {
                gj.grid.plugins.grouping.private.init(grid);
            });

            grid.on('dataFiltered', function (e) {
                gj.grid.plugins.grouping.private.grouping(grid, e.detail.records);
            });
        }
    }
};

gj.grid.messages['en-us'] = {
    First: 'First',
    Previous: 'Previous',
    Next: 'Next',
    Last: 'Last',
    Page: 'Page',
    FirstPageTooltip: 'First Page',
    PreviousPageTooltip: 'Previous Page',
    NextPageTooltip: 'Next Page',
    LastPageTooltip: 'Last Page',
    Refresh: 'Refresh',
    Of: 'of',
    DisplayingRecords: 'Displaying records',
    RowsPerPage: 'Rows per page:',
    Edit: 'Edit',
    Delete: 'Delete',
    Update: 'Update',
    Cancel: 'Cancel',
    NoRecordsFound: 'No records found.',
    Loading: 'Loading...'
};
/* global window alert jQuery gj */
/**
  * @widget Tree
  * @plugin Base
  */
gj.tree = {
    plugins: {}
};

gj.tree.config = {
    base: {

        params: {},

        /** When this setting is enabled the content of the tree will be loaded automatically after the creation of the tree.
         * @type boolean
         * @default true
         * @example disabled <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         autoLoad: false
         *     });
         *     tree.reload(); //call .reload() explicitly in order to load the data in the tree
         * </script>
         * @example enabled <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         autoLoad: true
         *     });
         * </script>
         */
        autoLoad: true,

        /** The type of the node selection.<br/>
         * If the type is set to multiple the user will be able to select more then one node in the tree.
         * @type (single|multiple)
         * @default single
         * @example Single.Selection <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'single'
         *     });
         * </script>
         * @example Multiple.Selection <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple'
         *     });
         * </script>
         */
        selectionType: 'single',

        /** This setting enable cascade selection and unselection of children
         * @type boolean
         * @default false
         * @example Material.Design <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple',
         *         cascadeSelection: true
         *     });
         * </script>
         * @example Bootstrap.3 <!-- tree, bootstrap -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple',
         *         cascadeSelection: true,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- tree, bootstrap4 -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple',
         *         cascadeSelection: true,
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         * @example Bootstrap.5 <!-- tree, bootstrap5 -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         selectionType: 'multiple',
         *         cascadeSelection: true,
         *         uiLibrary: 'bootstrap5'
         *     });
         * </script>
         */
        cascadeSelection: false,

        /** The data source of tree.
         * @additionalinfo If set to string, then the tree is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the tree is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the tree is going to use the array as data for tree nodes.
         * @type (string|object|array)
         * @default undefined
         * @example Local.DataSource <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ]
         *     });
         * </script>
         * @example Remote.DataSource <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get'
         *     });
         * </script>
         */
        dataSource: undefined,

        /** Primary key field name.
         * @type string
         * @default undefined
         * @example defined <!-- tree -->
         * <p>Select a node to see the key.</p>
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         primaryKey: 'id',
         *         dataSource: [ { id: 101, text: 'foo', children: [ { id: 202, text: 'bar' } ] } ],
         *         select: function (e) {
         *             alert('Your key is ' + e.detail.id);
         *         }
         *     });
         * </script>
         * @example undefined <!-- tree -->
         * <p>Select a node to see the key.</p>
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: [ { id: 101, text: 'foo', children: [ { id: 202, text: 'bar' } ] } ],
         *         select: function (e) {
         *             alert('Your key is ' + e.detail.id);
         *         }
         *     });
         * </script>
         */
        primaryKey: undefined,

        /** Text field name.
         * @type string
         * @default 'text'
         * @example sample <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         textField: 'newTextName',
         *         dataSource: [ { newTextName: 'foo', children: [ { newTextName: 'bar' } ] } ]
         *     });
         * </script>
         */
        textField: 'text',

        /** Children field name.
         * @type string
         * @default 'children'
         * @example Custom.FieldName <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         childrenField: 'myChildrenNode',
         *         dataSource: [ { text: 'foo', myChildrenNode: [ { text: 'bar' } ] } ]
         *     });
         * </script>
         */
        childrenField: 'children',

        /** The name of the field that indicates if the node has children. Shows expand icon if the node has children.
         * @type string
         * @default 'hasChildren'
         * @example Custom.FieldName <!-- jquery, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var continents, countries, states, tree;
         *     continents = [
         *         { id: 1, anyChildren: true, text: 'Asia', type: 'continent' },
         *         { id: 2, anyChildren: true, text: 'North America', type: 'continent' },
         *         { id: 3, anyChildren: false, text: 'South America', type: 'continent' }
         *     ];
         *     countries = [
         *         { id: 1, anyChildren: false, continent: 'Asia', text: 'China', type: 'country' },
         *         { id: 2, anyChildren: false, continent: 'Asia', text: 'Japan', type: 'country' },
         *         { id: 3, anyChildren: true, continent: 'North America', text: 'USA', type: 'country' },
         *         { id: 4, anyChildren: false, continent: 'North America', text: 'Canada', type: 'country' }
         *     ];
         *     states = [
         *         { id: 1, country: 'USA', text: 'California', type: 'state' },
         *         { id: 2, country: 'USA', text: 'Florida', type: 'state' }
         *     ];
         *     tree = new GijgoTree(document.getElementById('tree'), {
         *         hasChildrenField: 'anyChildren',
         *         dataSource: continents
         *     });
         *     tree.on('expand', function (e) {
         *         var i, children, record = tree.getDataById(e.detail.id);
         *         if (tree.getChildren(e.detail.node).length === 0) {
         *             if (record.type === 'continent') {
         *                 children = $.grep(countries, function (i) { return i.continent === record.text; });
         *                 for (i = 0; i < children.length; i++) {
         *                     tree.addNode(children[i], e.detail.node);
         *                 }
         *             } else if (record.type === 'country') {
         *                 children = $.grep(states, function (i) { return i.country === record.text; });
         *                 for (i = 0; i < children.length; i++) {
         *                     tree.addNode(children[i], e.detail.node);
         *                 }
         *             }
         *         }
         *     });
         * </script>
         */
        hasChildrenField: 'hasChildren',

        /** Image css class field name.
         * @type string
         * @default 'imageCssClass'
         * @example Default.Name <!-- bootstrap, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         uiLibrary: 'bootstrap',
         *         dataSource: [ { text: 'folder', imageCssClass: 'glyphicon glyphicon-folder-close', children: [ { text: 'file', imageCssClass: 'glyphicon glyphicon-file' } ] } ]
         *     });
         * </script>
         * @example Custom.Name <!-- tree  -->
         * <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         imageCssClassField: 'faCssClass',
         *         dataSource: [ { text: 'folder', faCssClass: 'fa fa-folder', children: [ { text: 'file', faCssClass: 'fa fa-file' } ] } ]
         *     });
         * </script>
         */
        imageCssClassField: 'imageCssClass',

        /** Image url field name.
         * @type string
         * @default 'imageUrl'
         * @example Default.HTML.Field.Name <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: [ { text: 'World', imageUrl: 'http://gijgo.com/content/icons/world-icon.png', children: [ { text: 'USA', imageUrl: 'http://gijgo.com/content/icons/usa-oval-icon.png' } ] } ]
         *     });
         * </script>
         * @example Custom.HTML.Field.Name <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         imageUrlField: 'icon',
         *         dataSource: [ { text: 'World', icon: 'http://gijgo.com/content/icons/world-icon.png', children: [ { text: 'USA', icon: 'http://gijgo.com/content/icons/usa-oval-icon.png' } ] } ]
         *     });
         * </script>
         */
        imageUrlField: 'imageUrl',

        /** Image html field name.
         * @type string
         * @default 'imageHtml'
         * @example Default.HTML.Field.Name <!-- materialicons, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: [ { text: 'folder', imageHtml: '<i class="material-icons">folder</i>', children: [ { text: 'file', imageHtml: '<i class="material-icons">insert_drive_file</i>' } ] } ]
         *     });
         * </script>
         * @example Custom.HTML.Field.Name <!-- materialicons, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         imageHtmlField: 'icon',
         *         dataSource: [ { text: 'folder', icon: '<i class="material-icons">folder</i>', children: [ { text: 'file', icon: '<i class="material-icons">insert_drive_file</i>' } ] } ]
         *     });
         * </script>
         */
        imageHtmlField: 'imageHtml',

        /** Disabled field name. Assume that the item is not disabled if not set.
         * @type string
         * @default 'disabled'
         * @example Default.Value <!-- checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Custom.Value <!-- checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true,
         *         disabledField: 'disabledState',
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabledState: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabledState: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Bootstrap <!-- bootstrap, checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         uiLibrary: 'bootstrap',
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         uiLibrary: 'bootstrap4',
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         uiLibrary: 'bootstrap5',
         *         checkboxes: true,
         *         dataSource: [ { text: 'foo', children: [
         *                 { text: 'bar', disabled: true, children: [ { text: 'sub-bar' } ] },
         *                 { text: 'bar2', disabled: false }
         *             ] }
         *         ]
         *     });
         * </script>
         */
        disabledField: 'disabled',

        /** Width of the tree.
         * @type number
         * @default undefined
         * @example JS.Config <!-- bootstrap, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         border: true
         *     });
         * </script>
         * @example HTML.Config <!-- bootstrap, tree -->
         * <ul id="tree" width="500" data-gj-source="/Locations/Get" data-gj-ui-library="bootstrap" data-gj-border="true"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), );
         * </script>
         */
        width: undefined,

        /** When this setting is enabled the content of the tree will be wrapped by borders.
         * @type boolean
         * @default false
         * @example Material.Design.True <!-- checkbox, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         border: true,
         *         checkboxes: true
         *     });
         * </script>
         * @example Material.Design.False <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         border: false
         *     });
         * </script>
         * @example Bootstrap.3.True <!-- bootstrap, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         border: true
         *     });
         * </script>
         * @example Bootstrap.3.False <!-- bootstrap, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         border: false
         *     });
         * </script>
         * @example Bootstrap.4.True <!-- bootstrap4, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         border: true
         *     });
         * </script>
         * @example Bootstrap.4.False <!-- bootstrap4, tree -->
         * <ul id="tree"></ul>
         * <script>
         *     new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         border: false
         *     });
         * </script>
         */
        border: false,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- tree, checkbox -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'materialdesign',
         *         checkboxes: true
         *     });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, tree, checkbox -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap',
         *         checkboxes: true
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, tree, checkbox -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         checkboxes: true
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
         * @example Base.Theme.Material.Icons <!-- tree -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         iconsLibrary: 'materialicons'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, tree, checkbox -->
         * <ul id="tree"></ul>
         * <script>
         *     var tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         width: 500,
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         checkboxes: true
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        autoGenId: 1,

        autoGenFieldName: 'autoId_b5497cc5-7ef3-49f5-a7dc-4a932e1aee4a',

        indentation: 24,

        style: {
            wrapper: 'gj-unselectable',
            list: 'gj-list gj-list-md',
            item: undefined,
            active: 'gj-list-md-active',
            inactive: 'gj-list-md-inactive',
            leafIcon: undefined,
            border: 'gj-tree-md-border'
        },

        icons: {
            /** Expand icon definition.
             * @alias icons.expand
             * @type String
             * @default '<i class="gj-icon chevron-right" />'
             * @example Plus.Minus.Icons <!-- materialicons, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     var tree = new GijgoTree(document.getElementById('tree'), {
             *         dataSource: '/Locations/Get',
             *         icons: { 
             *             expand: '<i class="material-icons">add</i>',
             *             collapse: '<i class="material-icons">remove</i>'
             *         }
             *     });
             * </script>
             */
            expand: '<i class="gj-icon chevron-right" />',

            /** Collapse icon definition.
             * @alias icons.collapse
             * @type String
             * @default '<i class="gj-icon chevron-down" />'
             * @example Plus.Minus.Icons <!-- materialicons, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     var tree = new GijgoTree(document.getElementById('tree'), {
             *         dataSource: '/Locations/Get',
             *         icons: { 
             *             expand: '<i class="material-icons">add</i>',
             *             collapse: '<i class="material-icons">remove</i>'
             *         }
             *     });
             * </script>
             */
            collapse: '<i class="gj-icon chevron-down" />'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-3',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active',
            inactive: '',
            border: 'gj-tree-bootstrap-border'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-4',
            list: 'gj-list gj-list-bootstrap',
            item: 'list-group-item',
            active: 'active',
            inactive: '',
            border: 'gj-tree-bootstrap-border'
        },
        icons: {
            expand: '<i class="gj-icon plus" />',
            collapse: '<i class="gj-icon minus" />'
        }
    },

    bootstrap5: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-5',
            list: 'gj-list gj-list-bootstrap',
            item: 'list-group-item',
            active: 'active',
            inactive: 'inactive',
            border: 'gj-tree-bootstrap-border'
        },
        icons: {
            expand: '<i class="gj-icon plus" />',
            collapse: '<i class="gj-icon minus" />'
        }
    },

    materialicons: {
        style: {
            expander: 'gj-tree-material-icons-expander'
        }
    },

    fontawesome: {
        style: {
            expander: 'gj-tree-font-awesome-expander'
        },
        icons: {
            expand: '<i class="fa fa-plus" aria-hidden="true"></i>',
            collapse: '<i class="fa fa-minus" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        style: {
            expander: 'gj-tree-glyphicons-expander'
        },
        icons: {
            expand: '<span class="glyphicon glyphicon-plus" />',
            collapse: '<span class="glyphicon glyphicon-minus" />'
        }
    }
};
/**
  * @widget Tree
  * @plugin Base
  */
gj.tree.events = {

    /**
     * Event fires when the tree is initialized
     * @event initialized
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <button id="reload" class="gj-button-md">Reload</button>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         initialized: function (e) {
     *             alert('initialized is fired.');
     *         }
     *     });
     *     document.getElementById('reload').addEventListener('click', function() { 
     *         tree.reload();
     *     });
     * </script>
     */
    initialized: function (el) {
        el.dispatchEvent(new Event('initialized'));
    },

    /**
     * Event fired before data binding takes place.
     * @event dataBinding
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         dataBinding: function (e) {
     *             alert('dataBinding is fired.');
     *         }
     *     });
     * </script>
     */
    dataBinding: function (el) {
        el.dispatchEvent(new Event('dataBinding'));
    },

    /**
     * Event fires after the loading of the data in the tree.
     * @event dataBound
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    dataBound: function (el) {
        el.dispatchEvent(new Event('dataBound'));
    },

    /**
     * Event fires after selection of tree node.
     * @event select
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <p>Select tree node in order to fire the event.</p>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('select', function (e) {
     *         alert('select is fired for node with id=' + e.detail.id);
     *     });
     * </script>
     */
    select: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('select', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires on un selection of tree node
     * @event unselect
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <p>Select/Unselect tree node in order to fire the event.</p>
     * <ul id="tree" data-gj-source="/Locations/Get" data-gj-selection-type="multiple"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('unselect', function (e) {
     *         alert('unselect is fired for node with id=' + e.detail.id);
     *     });
     * </script>
     */
    unselect: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('unselect', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires before node expand.
     * @event expand
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('expand', function (e, node, id) {
     *         alert('expand is fired.');
     *     });
     * </script>
     */
    expand: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('expand', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires before node collapse.
     * @event collapse
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree -->
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('collapse', function (e, node, id) {
     *         alert('collapse is fired.');
     *     });
     * </script>
     */
    collapse: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('collapse', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires on enable of tree node.
     * @event enable
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America</button>
     * <br/><br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     *     tree.on('enable', function (e) {
     *         alert(e.detail.node.innerText + ' is enabled.');
     *     });
     * </script>
     */
    enable: function (el, node) {
        return el.dispatchEvent(new CustomEvent('enable', { detail: { node: node } }));
    },

    /**
     * Event fires on disable of tree node.
     * @event disable
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America</button>
     * <br/><br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     *     tree.on('disable', function (e) {
     *         alert(e.detail.node.innerText + ' is disabled.');
     *     });
     * </script>
     */
    disable: function (el, node) {
        return el.dispatchEvent(new CustomEvent('disable', { detail: { node: node } }));
    },

    /**
     * Event fires before tree destroy
     * @event destroying
     * @param {object} e - event data
     * @example Event.Sample <!-- tree -->
     * <button onclick="tree.destroy()" class="gj-button-md">Destroy</button>
     * <br/><br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('destroying', function (e) {
     *         alert('destroying is fired.');
     *     });
     * </script>
     */
    destroying: function (el) {
        return el.dispatchEvent(new Event('destroying'));
    },

    /**
     * Event fires when the data is bound to node.
     * @event nodeDataBound
     * @param {object} e - event data
     * @param {object} node - the node as html element object
     * @param {string} id - the id of the record
     * @param {object} record - the data of the node record
     * @example Event.Sample <!-- tree -->
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('nodeDataBound', function (e) {
     *         if ((parseInt(e.detail.id, 10) % 2) === 0) {
     *             e.detail.node.style.backgroundColor = 'red';
     *         }
     *     });
     * </script>
     */
    nodeDataBound: function (el, node, id, record) {
        return el.dispatchEvent(new CustomEvent('nodeDataBound', { detail: { node: node, id: id, record: record } }));
    }
}
/*global gj $*/
gj.tree.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);

        gj.tree.methods.initialize.call(this);

        if (this.getConfig().autoLoad) {
            this.reload();
        }
        return this;
    },

    initialize: function () {
        let data = this.getConfig(),
            wrapper = this.wrap('div');

        gj.core.addClasses(this.element, data.style.list);
        gj.core.addClasses(wrapper, data.style.wrapper);
        this.element.setAttribute('data-gj-type', this.type);
        if (data.width) {
            gj.core.css(wrapper, 'width', data.width);
        }
        if (data.border) {
            gj.core.addClasses(wrapper, data.style.border);
        }
        gj.tree.events.initialized(this.element);
    },

    useHtmlDataSource: function (tree, data) {
        data.dataSource = [];
    },

    render: function (tree, response) {
        let data;
        if (response) {
            if (typeof (response) === 'string' && JSON) {
                response = JSON.parse(response);
            }
            data = tree.getConfig();
            tree.setRecords(response);
            if (!data.primaryKey) {
                gj.tree.methods.genAutoId(data, response);
            }
            gj.tree.methods.loadData(tree);
        }
        return tree;
    },

    filter: function (tree) {
        return tree.getConfig().dataSource;
    },

    genAutoId: function (data, records) {
        let i;
        for (i = 0; i < records.length; i++) {
            records[i][data.autoGenFieldName] = data.autoGenId++;
            if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                gj.tree.methods.genAutoId(data, records[i][data.childrenField]);
            }
        }
    },

    loadData: function (tree) {
        let i, records = tree.getRecords();

        gj.tree.events.dataBinding(tree.element);
        tree.off();
        tree.element.innerHTML = '';
        for (i = 0; i < records.length; i++) {
            gj.tree.methods.appendNode(tree, tree.element, records[i], 1);
        }
        gj.tree.events.dataBound(tree.element);
    },

    appendNode: function (tree, parent, nodeData, level, position) {
        let i, node, wrapper, expander, display, spacer, newParent, span, img,
            data = tree.getConfig(),
            id = data.primaryKey ? nodeData[data.primaryKey] : nodeData[data.autoGenFieldName],
            hasChildren = typeof (nodeData[data.hasChildrenField]) !== 'undefined' && nodeData[data.hasChildrenField].toString().toLowerCase() === 'true',
            disabled = typeof (nodeData[data.disabledField]) !== 'undefined' && nodeData[data.disabledField].toString().toLowerCase() === 'true';
            
        node = document.createElement('li');
        node.setAttribute('data-gj-id', id);
        node.setAttribute('data-gj-role', 'node');
        gj.core.addClasses(node, data.style.item);
            
        wrapper = document.createElement('div');   
        wrapper.setAttribute('data-gj-role', 'wrapper');

        expander =  document.createElement('span');
        expander.setAttribute('data-gj-role', 'expander');
        expander.setAttribute('data-gj-mode', 'close');
        gj.core.addClasses(expander, data.style.expander);

        display =  document.createElement('span');
        display.setAttribute('data-gj-role', 'display');
        display.innerHTML = nodeData[data.textField];

        if (data.indentation) {
            spacer = document.createElement('span');
            spacer.setAttribute('data-gj-role', 'spacer');
            spacer.style.width = ((data.indentation * (level - 1)) / 16) + 'rem';
            wrapper.appendChild(spacer);
        }

        if (disabled) {
            gj.tree.methods.disableNode(tree, node);
        } else {
            gj.core.on(expander, 'click', gj.tree.methods.expanderClickHandler(tree));
            gj.core.on(display, 'click', gj.tree.methods.displayClickHandler(tree));
        }
        wrapper.appendChild(expander);
        wrapper.appendChild(display);
        node.appendChild(wrapper);

        if (position) {
            parent.insertBefore(node, parent.children[position - 1]);
        } else {
            parent.appendChild(node);
        }

        if (data.imageCssClassField && nodeData[data.imageCssClassField]) {
            span = document.createElement('span');
            span.setAttribute('data-gj-role', 'image');
            span.innerHTML = '<span class="' + nodeData[data.imageCssClassField] + '"></span>';
            wrapper.insertBefore(span, display);
        } else if (data.imageUrlField && nodeData[data.imageUrlField]) {
            span = document.createElement('span');
            span.setAttribute('data-gj-role', 'image');
            wrapper.insertBefore(span, display);
            img = document.createElement('img');
            img.setAttribute('src', nodeData[data.imageUrlField]);
            img.setAttribute('width', gj.core.width(span));
            img.setAttribute('height', gj.core.height(span));
            span.appendChild(img);
        } else if (data.imageHtmlField && nodeData[data.imageHtmlField]) {
            span = document.createElement('span');
            span.setAttribute('data-gj-role', 'image');
            span.innerHTML = nodeData[data.imageHtmlField];
            wrapper.insertBefore(span, display);
        }

        if ((nodeData[data.childrenField] && nodeData[data.childrenField].length) || hasChildren) {
            expander.innerHTML = data.icons.expand;
            newParent = document.createElement('ul');
            gj.core.addClasses(newParent, data.style.list + ' gj-hidden');
            node.appendChild(newParent);

            if (nodeData[data.childrenField] && nodeData[data.childrenField].length) {
                for (i = 0; i < nodeData[data.childrenField].length; i++) {
                    gj.tree.methods.appendNode(tree, newParent, nodeData[data.childrenField][i], level + 1);
                }
            }
        } else {
            data.style.leafIcon ? gj.core.addClasses(expander, data.style.leafIcon) : expander.innerHTML = '&nbsp;';
        }

        gj.tree.events.nodeDataBound(tree.element, node, nodeData.id, nodeData);
    },

    expanderClickHandler: function (tree) {
        return function (e) {
            let node = this.closest('li');
            if (this.getAttribute('data-gj-mode') === 'close') {
                tree.expand(node);
            } else {
                tree.collapse(node);
            }
        }
    },

    expand: function (tree, node, cascade) {
        let children, i,
            expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            data = tree.getConfig(),
            id = node.getAttribute('data-gj-id'),
            list = node.querySelector('ul');

        if (gj.tree.events.expand(tree.element, node, id) !== false && list) {
            list.style.display = 'block';
            expander.setAttribute('data-gj-mode', 'open');
            expander.innerHTML = data.icons.collapse;
            if (cascade) {
                children = node.querySelectorAll('ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.expand(tree, children[i], cascade);
                }
            }
        }
        return tree;
    },

    collapse: function (tree, node, cascade) {
        let children, i,
            expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            data = tree.getConfig(),
            id = node.getAttribute('data-gj-id'),
            list = node.querySelector('ul');

        if (gj.tree.events.collapse(tree.element, node, id) !== false && list) {
            list.style.display = 'none';
            expander.setAttribute('data-gj-mode', 'close');
            expander.innerHTML = data.icons.expand;
            if (cascade) {
                children = node.querySelectorAll('ul>li>[data-gj-role="wrapper"]>span[data-gj-mode="open"]');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.collapse(tree, children[i], cascade);
                }
            }
        }
        return tree;
    },

    expandAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.expand(tree, nodes[i], true);
        }
        return tree;
    },

    collapseAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.collapse(tree, nodes[i], true);
        }
        return tree;
    },

    displayClickHandler: function (tree) {
        return function () {
            let display = this,
                node = display.closest('li'),
                data = tree.getConfig()
                cascade = data.cascadeSelection;
            if (node.getAttribute('data-gj-selected') === 'true') {
                gj.tree.methods.unselect(tree, node, cascade);
            } else {
                if (data.selectionType === 'single') {
                    gj.tree.methods.unselectAll(tree);
                }
                gj.tree.methods.select(tree, node, cascade);
            }
        }
    },

    selectAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.select(tree, nodes[i], true);
        }
        return tree;
    },

    select: function (tree, node, cascade) {
        let data = tree.getConfig(),
            allowEvent = gj.tree.events.select(tree.element, node, node.getAttribute('data-gj-id')) !== false && !node.classList.contains('disabled');
        if (node.getAttribute('data-gj-selected') !== 'true' && allowEvent) {
            gj.core.removeClasses(node, data.style.inactive);
            gj.core.addClasses(node, data.style.active);
            node.setAttribute('data-gj-selected', 'true');
        }
        if (cascade && allowEvent) {
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].tagName.toUpperCase() === 'UL') {
                    for (let j = 0; j < node.children[i].children.length; j++) {
                        if (node.children[i].children[j].tagName.toUpperCase() === 'LI') {
                            gj.tree.methods.select(tree, node.children[i].children[j], cascade);
                        }
                    }
                }
            }
        }
    },
    
    unselectAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.unselect(tree, nodes[i], true);
        }
        return tree;
    },

    unselect: function (tree, node, cascade) {
        let data = tree.getConfig(),
            allowEvent = gj.tree.events.unselect(tree.element, node, node.getAttribute('data-gj-id')) !== false && !node.classList.contains('disabled');
        if (node.getAttribute('data-gj-selected') === 'true' && allowEvent) {
            gj.core.removeClasses(node, data.style.active);
            gj.core.addClasses(node, data.style.inactive);
            node.removeAttribute('data-gj-selected');
        }
        if (cascade && allowEvent) {
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].tagName.toUpperCase() === 'UL') {
                    for (let j = 0; j < node.children[i].children.length; j++) {
                        if (node.children[i].children[j].tagName.toUpperCase() === 'LI') {
                            gj.tree.methods.unselect(tree, node.children[i].children[j], cascade);
                        }
                    }
                }
            }
        }
    },

    getSelections: function (list) {
        let result = [],
            nodes = list.querySelectorAll('li');
        if (nodes && nodes.length) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].getAttribute('data-gj-selected') === 'true') {
                    result.push(nodes[i].getAttribute('data-gj-id'));
                }
            }
        }

        return result;
    },

    getDataById: function (tree, id, records) {
        let i, data = tree.getConfig(), result = undefined;
        for (i = 0; i < records.length; i++) {
            if (data.primaryKey && records[i][data.primaryKey] == id) {
                result = records[i];
                break;
            } else if (records[i][data.autoGenFieldName] == id) {
                result = records[i];
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                result = gj.tree.methods.getDataById(tree, id, records[i][data.childrenField]);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getDataByText: function (tree, text, records) {
        let i, id,
            result = undefined,
            data = tree.getConfig();
        for (i = 0; i < records.length; i++) {
            if (text === records[i][data.textField]) {
                result = records[i];
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                result = gj.tree.methods.getDataByText(tree, text, records[i][data.childrenField]);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getNodeById: function (list, id) {
        let i, node,
            result = undefined,
            nodes = list.querySelectorAll('li');
        if (nodes && nodes.length) {
            for (i = 0; i < nodes.length; i++) {
                node = nodes[i];
                if (id == node.getAttribute('data-gj-id')) {
                    result = node;
                    break;
                }
            }
        }
        return result;
    },

    getNodeByText: function (list, text) {
        let i, node,
            result = undefined,
            nodes = list.querySelectorAll('li');
        if (nodes && nodes.length) {
            for (i = 0; i < nodes.length; i++) {
                node = nodes[i];
                if (text === gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="display"]').innerText) {
                    result = node;
                    break;
                }
            }
        }
        return result;
    },

    addNode: function (tree, nodeData, parent, position) {
        let level, record, records, data = tree.getConfig();

        if (!parent) {
            parent = tree.element;
            records = tree.getRecords();
            records.push(nodeData)
            tree.setRecords(records);
        } else {
            if (parent.tagName.toUpperCase() === 'LI') {
                if (!parent.querySelector('ul')) {
                    parent.querySelector('[data-gj-role="expander"]').innerHTML = data.icons.collapse;
                    parent.appendChild(gj.core.addClasses(document.createElement('ul'), data.style.list));
                }
                parent = parent.querySelector('ul');
            }
            record = tree.getDataById(parent.parentNode.getAttribute('data-gj-id'));
            if (!record[data.childrenField]) {
                record[data.childrenField] = [];
            }
            record[data.childrenField].push(nodeData);
        }
        level = gj.tree.methods.getLevel(parent);
        if (!data.primaryKey) {
            gj.tree.methods.genAutoId(data, [nodeData]);
        }

        gj.tree.methods.appendNode(tree, parent, nodeData, level, position);

        return tree;
    },

    getLevel: function(node) {
        let count = 1, el = node.parentNode;
        while (el && (el.getAttribute('data-gj-type') !== 'tree') && (node.getAttribute('data-gj-type') !== 'tree')) {
            count++;
            el = el.parentNode;
        }
        return count;
    },

    remove: function (tree, node) {
        gj.tree.methods.removeDataById(tree, node.getAttribute('data-gj-id'), tree.getRecords());
        node.remove();
        return tree;
    },

    removeDataById: function (tree, id, records) {
        let i, data = tree.getConfig();
        for (i = 0; i < records.length; i++) {
            if (data.primaryKey && records[i][data.primaryKey] == id) {
                records.splice(i, 1);
                break;
            } else if (records[i][data.autoGenFieldName] == id) {
                records.splice(i, 1);
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                gj.tree.methods.removeDataById(tree, id, records[i][data.childrenField]);
            }
        }
    },

    update: function (tree, id, newRecord) {
        let data = tree.getConfig(),
            node = tree.getNodeById(id),
            oldRecord = tree.getDataById(id);
        oldRecord = newRecord;
        node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="display"]').innerHTML = newRecord[data.textField];
        gj.tree.events.nodeDataBound(tree.element, node, id, newRecord);
        return tree;
    },

    getChildren: function (node, cascade) {
        let result = [], i, children;
        
        cascade = typeof (cascade) === 'undefined' ? true : cascade;
        if (cascade) {
            children = node.querySelectorAll('ul>li');
        } else {
            children = gj.core.selectAll(node, 'ul>li');
        }

        for (i = 0; i < children.length; i++) {
            result.push(children[i].getAttribute('data-gj-id'));
        }

        return result;
    },

    enableAll: function (tree) {
        let i, children = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < children.length; i++) {
            gj.tree.methods.enableNode(tree, children[i], true);
        }
        return tree;
    },

    enableNode: function (tree, node, cascade) {
        let i, children,
            expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            display = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="display"]');
        
        if (expander && display) {
            cascade = typeof (cascade) === 'undefined' ? true : cascade;
            node.classList.remove('disabled');
            gj.core.on(expander, 'click', gj.tree.methods.expanderClickHandler(tree));
            gj.core.on(display, 'click', gj.tree.methods.displayClickHandler(tree));
            gj.tree.events.enable(tree.element, node);
            if (cascade) {
                children = gj.core.selectAll(node, 'ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.enableNode(tree, children[i], cascade);
                }
            }
        }
    },

    disableAll: function (tree) {
        let i, children = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < children.length; i++) {
            gj.tree.methods.disableNode(tree, children[i], true);
        }
        return tree;
    },

    disableNode: function (tree, node, cascade) {
        let i, children,
            expander = node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            display = node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="display"]');
        
        if (expander && display) {
            cascade = typeof (cascade) === 'undefined' ? true : cascade;
            node.classList.add('disabled');
            gj.core.off(expander, 'click');
            gj.core.off(display, 'click');
            gj.tree.events.disable(tree.element, node);
            if (cascade) {
                children = gj.core.selectAll(node, 'ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.disableNode(tree, children[i], cascade);
                }
            }
        }
    },

    destroy: function (tree) {
        let data = tree.getConfig();
        if (data) {
            gj.tree.events.destroying(tree.element);
            tree.xhr && tree.xhr.abort();
            tree.off();
            tree.removeConfig();
            grid.removeRecords();
            grid.removeTotalRecords();
            tree.element.removeAttribute('data-gj-guid');
            tree.element.removeAttribute('data-gj-type');
            tree.element.setAttribute('class', '');
            tree.element.innerHTML = '';
        }
        return tree;
    },

    pathFinder: function (data, list, id, parents) {
        let i, result = false;

        for (i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                result = true;
                break;
            } else if (list[i][data.childrenField] && gj.tree.methods.pathFinder(data, list[i][data.childrenField], id, parents)) {
                parents.push(list[i][data.textField]);
                result = true;
                break;
            }
        }

        return result;
    }
}
/**
  * @widget Tree
  * @plugin Base
  */
GijgoTree = function (element, jsConfig) {
    var self = this,
        methods = gj.tree.methods;

    self.type = 'tree';
    self.element = element;

    /**
     * Reload the tree.
     * @method
     * @param {object} params - Params that needs to be send to the server. Only in use for remote data sources.
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <button onclick="tree.reload()" class="gj-button-md">Click to load</button>
     * <br/><br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         autoLoad: false
     *     });
     * </script>
     * @example Search <!-- tree -->
     * <input type="text" id="query" /> <button onclick="Search()">Search</button>
     * <br/><br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function Search() {
     *         tree.reload({ query: document.getElementById('query').value });
     *     }
     * </script>
     */
    self.reload = function (params) {
        return gj.widget.prototype.reload.call(this, params);
    };

    /**
     * Render data in the tree
     * @method
     * @param {object} response - An object that contains the data that needs to be loaded in the tree.
     * @fires dataBinding, dataBound
     * @return tree
     * @example sample <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     var tree, onSuccessFunc;
     *     onSuccessFunc = function () {
     *         //you can modify the response here if needed
     *         tree.render(this.response);
     *     };
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: { url: '/Locations/Get', success: onSuccessFunc }
     *     });
     * </script>
     */
    self.render = function (response) {
        return methods.render(this, response);
    };

    /**
     * Add node to the tree.
     * @method
     * @param {object} data - The node data.
     * @param {object} parentNode - Parent node as html element object.
     * @param {Number} position - Position where the new node need to be added. 
     * @return html element object
     * @example Append.ToRoot <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Append To Root</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     *     function append() {
     *         tree.addNode({ text: 'New Node' });
     *     }
     * </script>
     * @example Append.Parent <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Append To Asia</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var parent, tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent);
     *     }
     * </script>
     * @example Bootstrap <!-- bootstrap, tree -->
     * <button onclick="append()" class="btn btn-default">Append To Asia</button>
     * <br/><br/>
     * <div id="tree" data-gj-source="/Locations/Get" data-gj-ui-library="bootstrap"></div>
     * <script>
     *     var parent, tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent);
     *     }
     * </script>
     * @example Prepend <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Prepend in Asia</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var parent, tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent, 1);
     *     }
     * </script>
     * @example Position <!-- tree -->
     * <button onclick="append()" class="gj-button-md">Append to Asia as second</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var parent, tree = new GijgoTree(document.getElementById('tree'));
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent, 2);
     *     }
     * </script>
     */
    self.addNode = function (data, parentNode, position) {
        return methods.addNode(this, data, parentNode, position);
    };

    /**
     * Remove node from the tree.
     * @method
     * @param {object} node - The node as html element object
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <button onclick="remove()" class="gj-button-md">Remove USA</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function remove() {
     *         var node = tree.getNodeByText('USA');
     *         tree.removeNode(node);
     *     }
     * </script>
     */
    self.removeNode = function (node) {
        return methods.remove(this, node);
    };

    /**
     * Update node from the tree.
     * @method
     * @param {string} id - The id of the node that needs to be updated
     * @param {object} record - The node as html element object
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <input type="text" id="nodeName" />
     * <button onclick="save()" class="gj-button-md">Save</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         primaryKey: 'id',
     *         dataSource: '/Locations/Get'
     *     });
     *     tree.on('select', function (e) {
     *         document.getElementById('nodeName').value = tree.getDataById(e.detail.id).text;
     *     });
     *     function save() {
     *         var id = tree.getSelections()[0],
     *             record = tree.getDataById(id);
     *         record.text = document.getElementById('nodeName').value;
     *         tree.updateNode(id, record);
     *     }
     * </script>
     */
    self.updateNode = function (id, record) {
        return methods.update(this, id, record);
    };

    /**
     * Destroy the tree.
     * @method
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <button onclick="tree.destroy()" class="gj-button-md">Destroy</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /**
     * Expand node from the tree.
     * @method
     * @param {object} node - The node as html element object
     * @param {boolean} cascade - Expand all children
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <button onclick="expand()" class="gj-button-md">Expand Asia</button>
     * <button onclick="collapse()" class="gj-button-md">Collapse Asia</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.expand(node);
     *     }
     *     function collapse() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.collapse(node);
     *     }
     * </script>
     * @example Cascade <!-- tree -->
     * <button onclick="expand()" class="gj-button-md">Expand North America</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('North America');
     *         tree.expand(node, true);
     *     }
     * </script>
     */
    self.expand = function (node, cascade) {
        return methods.expand(this, node, cascade);
    };

    /**
     * Collapse node from the tree.
     * @method
     * @param {object} node - The node as html element object
     * @param {boolean} cascade - Collapse all children
     * @return html element object
     * @example Method.Sample <!-- tree -->
     * <button onclick="expand()" class="gj-button-md">Expand Asia</button>
     * <button onclick="collapse()" class="gj-button-md">Collapse Asia</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.expand(node);
     *     }
     *     function collapse() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.collapse(node);
     *     }
     * </script>
     * @example Cascade <!-- tree -->
     * <button onclick="collapse()" class="gj-button-md">Collapse North America</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     function collapse() {
     *         var node = tree.getNodeByText('North America');
     *         tree.collapse(node, true);
     *     }
     * </script>
     */
    self.collapse = function (node, cascade) {
        return methods.collapse(this, node, cascade);
    };

    /**
     * Expand all tree nodes
     * @method
     * @return html element object
     * @example Sample <!-- tree -->
     * <button onclick="tree.expandAll()" class="gj-button-md">Expand All</button>
     * <button onclick="tree.collapseAll()" class="gj-button-md">Collapse All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     * </script>
     */
    self.expandAll = function () {
        return methods.expandAll(this);
    };

    /**
     * Collapse all tree nodes
     * @method
     * @return html element object
     * @example Sample <!-- tree -->
     * <button onclick="tree.expandAll()" class="gj-button-md">Expand All</button>
     * <button onclick="tree.collapseAll()" class="gj-button-md">Collapse All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'));
     * </script>
     */
    self.collapseAll = function () {
        return methods.collapseAll(this);
    };

    /**
     * Return node data by id of the record.
     * @method
     * @param {string|number} id - The id of the record that needs to be returned
     * @return object
     * @example sample <!-- tree -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         primaryKey: 'id' //define the name of the column that you want to use as ID here.
     *     });
     *     document.getElementById('btnGetData').addEventListener('click', function () {
     *         var data = tree.getDataById(9);
     *         alert('The population of ' + data.text + ' is ' + data.population);
     *     });
     * </script>
     */
    self.getDataById = function (id) {
        return methods.getDataById(this, id, this.getRecords());
    };

    /**
     * Return node data by text.
     * @method
     * @param {string} text - The text of the record that needs to be returned
     * @return object
     * @example sample <!-- tree -->
     * <button id="btnGetData" class="gj-button-md">Get Data</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *     });
     *     document.getElementById('btnGetData').addEventListener('click', function () {
     *         var data = tree.getDataByText('California');
     *         alert('The population of California is ' + data.population);
     *     });
     * </script>
     */
    self.getDataByText = function (text) {
        return methods.getDataByText(this, text, this.getRecords());
    };

    /**
     * Return node by id of the record.
     * @method
     * @param {string} id - The id of the node that needs to be returned
     * @return html element object
     * @example sample <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         primaryKey: 'id' //define the name of the column that you want to use as ID here.
     *     });
     *     tree.on('dataBound', function() {
     *         var node = tree.getNodeById('1');
     *         node.style.backgroundColor = 'red';
     *     });
     * </script>
     */
    self.getNodeById = function (id) {
        return methods.getNodeById(this.element, id);
    };

    /**
     * Return node by text.
     * @method
     * @param {string} text - The text in the node that needs to be returned
     * @return html element object
     * @example sample <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get'
     *     });
     *     tree.on('dataBound', function() {
     *         var node = tree.getNodeByText('Asia');
     *         node.style.backgroundColor = 'red';
     *     });
     * </script>
     */
    self.getNodeByText = function (text) {
        return methods.getNodeByText(this.element, text);
    };

    /**
     * Return an array with all records presented in the tree.
     * @method
     * @return Array
     * @example sample <!-- tree -->
     * <button onclick="alert(JSON.stringify(tree.getAll()))" class="gj-button-md">Get All Data</button>
     * <button onclick="tree.addNode({ text: 'New Node' });" class="gj-button-md">Add New Node</button>
     * <br/>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ]
     *     });
     * </script>
     */
    self.getAll = function () {
        return this.getRecords();
    };

    /**
     * Select node from the tree.
     * @method
     * @param {Object} node - The node as html element object.
     * @return html element object
     * @example Select.Method <!-- tree -->
     * <button onclick="tree.select(northAmerica)" class="gj-button-md">Select North America</button>
     * <button onclick="tree.unselect(northAmerica)" class="gj-button-md">Unselect North America</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         primaryKey: 'id',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         },
     *         select: function (e) {
     *             alert('select is fired for node with id=' + e.detail.id);
     *         }
     *     });
     * </script>
     */
    self.select = function (node) {
        return methods.select(this, node);
    };

    /**
     * Unselect node from the tree.
     * @method
     * @param {Object} node - The node as html element object.
     * @return html element object
     * @example UnSelect.Method <!-- tree -->
     * <button onclick="tree.select(northAmerica)" class="gj-button-md">Select North America</button>
     * <button onclick="tree.unselect(northAmerica)" class="gj-button-md">Unselect North America</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         primaryKey: 'id',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');  
     *         },
     *         unselect: function (e) {
     *             alert('unselect is fired for node with id=' + e.detail.id);
     *         }
     *     });
     * </script>
     */
    self.unselect = function (node) {
        return methods.unselect(this, node);
    };

    /**
     * Select all tree nodes
     * @method
     * @return html element object
     * @example Sample <!-- tree -->
     * <button onclick="tree.selectAll()" class="gj-button-md">Select All</button>
     * <button onclick="tree.unselectAll()" class="gj-button-md">Unselect All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         selectionType: 'multiple'
     *     });
     *     tree.on('dataBound', function() {
     *         tree.expandAll();
     *     });
     * </script>
     */
    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all tree nodes
     * @method
     * @return html element object
     * @example Sample <!-- tree -->
     * <button onclick="tree.selectAll()" class="gj-button-md">Select All</button>
     * <button onclick="tree.unselectAll()" class="gj-button-md">Unselect All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         selectionType: 'multiple'
     *     });
     *     tree.on('dataBound', function() {
     *         tree.expandAll();
     *     });
     * </script>
     */
    self.unselectAll = function () {
        return methods.unselectAll(this);
    };

    /**
     * Return an array with the ids of the selected nodes.
     * @method
     * @return array
     * @example Sample <!-- tree -->
     * <button id="btnShowSelection" class="gj-button-md">Show Selections</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         selectionType: 'multiple'
     *     });
     *     document.getElementById('btnShowSelection').addEventListener('click', function () {
     *         var selections = tree.getSelections();
     *         selections && selections.length && alert(selections.join());
     *     });
     * </script>
     */
    self.getSelections = function () {
        return methods.getSelections(this.element);
    };

    /**
     * Return an array with the ids of all children.
     * @method
     * @param {Object} node - The node as html element object.
     * @param {Boolean} cascade - Include all nested children. Set to true by default.
     * @return array
     * @example Cascade.True <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         dataBound: function () {
     *             var node = tree.getNodeByText('North America'),
     *                 children = tree.getChildren(node);
     *             alert(children.join());
     *         }
     *     });
     * </script>
     * @example Cascade.False <!-- tree -->
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         dataBound: function () {
     *             var node = tree.getNodeByText('North America'),
     *                 children = tree.getChildren(node, false);
     *             alert(children.join());
     *         }
     *     });
     * </script>
     */
    self.getChildren = function (node, cascade) {
        return methods.getChildren(node, cascade);
    };

    /**
     * Return an array with the names of all parents.
     * @method
     * @param {String} id - The id of the target node
     * @return array
     * @example sample <!-- tree -->
     * Location: <div id="location" style="display: inline-block;"></div>
     * <ul id="tree"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         dataSource: '/Locations/Get',
     *         primaryKey: 'id',
     *         select: function (e) {
     *             var parents = tree.parents(e.detail.id);
     *             document.getElementById('location').innerHTML = parents.join(' / ') + ' / ' + tree.getDataById(e.detail.id).text;
     *         }
     *     });
     * </script>
     */
    self.parents = function (id) {
        var parents = [];
        methods.pathFinder(this.getConfig(), this.getRecords(), id, parents);
        return parents.reverse();
    };

    /**
     * Enable node from the tree.
     * @method
     * @param {Object} node - The node as html element object.
     * @param {Boolean} cascade - Enable all children. Set to true by default.
     * @return html element object
     * @example Material.Design <!-- checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="gj-button-md">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="gj-button-md">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America (Non-Cascade)</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     * @example Bootstrap <!-- bootstrap, checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="btn btn-default">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="btn btn-default">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="btn btn-default">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="btn btn-default">Disable North America (Non-Cascade)</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         uiLibrary: 'bootstrap',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     * @example Bootstrap.4 <!-- bootstrap4, fontawesome, checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="btn btn-default">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="btn btn-default">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="btn btn-default">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="btn btn-default">Disable North America (Non-Cascade)</button>
     * <br/><br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         uiLibrary: 'bootstrap4',
     *         iconsLibrary: 'fontawesome',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     * @example Bootstrap.5 <!-- bootstrap5, fontawesome, checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="btn btn-default">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="btn btn-default">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="btn btn-default">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="btn btn-default">Disable North America (Non-Cascade)</button>
     * <br/><br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         uiLibrary: 'bootstrap5',
     *         iconsLibrary: 'fontawesome',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     */
    self.enable = function (node, cascade) {
        return methods.enableNode(this, node, cascade);
    };

    /**
     * Enable all nodes from the tree.
     * @method
     * @return html element object
     * @example Sample <!-- checkbox, tree -->
     * <button onclick="tree.enableAll()" class="gj-button-md">Enable All</button>
     * <button onclick="tree.disableAll()" class="gj-button-md">Disable All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true
     *     });
     * </script>
     */
    self.enableAll = function () {
        return methods.enableAll(this);
    };

    /**
     * Disable node from the tree.
     * @method
     * @param {Object} node - The node as html element object.
     * @param {Boolean} cascade - Disable all children. Set to true by default.
     * @return html element object
     * @example Sample <!-- checkbox, tree -->
     * <button onclick="tree.enable(northAmerica)" class="gj-button-md">Enable North America (Cascade)</button>
     * <button onclick="tree.disable(northAmerica)" class="gj-button-md">Disable North America (Cascade)</button>
     * <button onclick="tree.enable(northAmerica, false)" class="gj-button-md">Enable North America (Non-Cascade)</button>
     * <button onclick="tree.disable(northAmerica, false)" class="gj-button-md">Disable North America (Non-Cascade)</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree, northAmerica;
     *     tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true,
     *         primaryKey: 'ID',
     *         dataBound: function () {
     *             northAmerica = tree.getNodeByText('North America');
     *         }
     *     });
     * </script>
     */
    self.disable = function (node, cascade) {
        return methods.disableNode(this, node, cascade);
    };

    /**
     * Disable all nodes from the tree.
     * @method
     * @return html element object
     * @example Sample <!-- checkbox, tree -->
     * <button onclick="tree.enableAll()" class="gj-button-md">Enable All</button>
     * <button onclick="tree.disableAll()" class="gj-button-md">Disable All</button>
     * <br/>
     * <ul id="tree" data-gj-source="/Locations/Get"></ul>
     * <script>
     *     var tree = new GijgoTree(document.getElementById('tree'), {
     *         checkboxes: true
     *     });
     * </script>
     */
    self.disableAll = function () {
        return methods.disableAll(this);
    };

    if ('tree' !== element.getAttribute('data-gj-type')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoTree.prototype = new gj.widget();
GijgoTree.constructor = GijgoTree;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.tree = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoTree(this, method);
                } else {
                    widget = new GijgoTree(this, null);
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
/** 
 * @widget Tree 
 * @plugin Checkboxes
 */
gj.tree.plugins.checkboxes = {
    config: {
        base: {
            /** Add checkbox for each node, if set to true.
              * @type Boolean
              * @default undefined
              * @example Material.Design <!-- checkbox, tree -->
              * <ul id="tree"></ul>
              * <script>
              *     let tree = new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         checkboxes: true
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, checkbox, tree -->
              * <ul id="tree"></ul>
              * <script>
              *     let tree = new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap'
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, checkbox, tree -->
              * <ul id="tree"></ul>
              * <script>
              *     let tree = new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap4'
              *     });
              * </script>
              * @example Bootstrap.5 <!-- bootstrap5, checkbox, tree -->
              * <ul id="tree"></ul>
              * <script>
              *     let tree = new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         checkboxes: true,
              *         uiLibrary: 'bootstrap5'
              *     });
              * </script>
              */
            checkboxes: undefined,

            /** Name of the source field, that indicates if the checkbox is checked.
             * @type string
             * @default 'checked'
             * @example Custom.Name <!-- checkbox, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     let tree = new GijgoTree(document.getElementById('tree'), {
             *         checkboxes: true,
             *         checkedField: 'checkedFieldName',
             *         dataSource: [ { text: 'foo', checkedFieldName: false, children: [ { text: 'bar', checkedFieldName: true }, { text: 'bar2', checkedFieldName: false } ] }, { text: 'foo2', children: [ { text: 'bar2' } ] } ]
             *     });
             * </script>
             */
            checkedField: 'checked',

            /** This setting enable cascade check and uncheck of children
             * @type boolean
             * @default true
             * @example False.Remote.DataSource <!-- checkbox, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     let tree = new GijgoTree(document.getElementById('tree'), {
             *         checkboxes: true,
             *         dataSource: '/Locations/Get',
             *         cascadeCheck: false
             *     });
             *     tree.on('dataBound', function() {
             *         tree.expandAll();
             *     });
             * </script>
             * @example False.Local.DataSource <!-- checkbox, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     let tree = new GijgoTree(document.getElementById('tree'), {
             *         checkboxes: true,
             *         dataSource: [ { text: 'foo', checked: true, children: [ { text: 'bar', checked: true }, { text: 'bar2', checked: false } ] }, { text: 'foo2', checked: true, children: [ { text: 'bar2', checked: false } ] } ],
             *         cascadeCheck: false
             *     });
             * </script>
             * @example True <!-- checkbox, tree -->
             * <ul id="tree"></ul>
             * <script>
             *     let tree = new GijgoTree(document.getElementById('tree'), {
             *         checkboxes: true,
             *         dataSource: '/Locations/Get',
             *         cascadeCheck: true
             *     });
             *     tree.on('dataBound', function() {
             *         tree.expandAll();
             *     });
             * </script>
             */
            cascadeCheck: true,
        }
    },

    private: {
        dataBound: function (tree) {
            let nodes, chkb, state;
            if (tree.getConfig().cascadeCheck) {
                nodes = tree.element.querySelectorAll('li[data-gj-role="node"]');
                for (const node of nodes) {
                    chkb = node.querySelector('[data-gj-role="checkbox"] input[type="checkbox"]');
                    if (chkb) {
                        state = gj.checkbox.methods.state(chkb);
                        if (state === 'checked') {
                            gj.tree.plugins.checkboxes.private.updateChildrenState(node, state);
                            gj.tree.plugins.checkboxes.private.updateParentState(node, state);
                        }
                    }
                }
            }
        },

        nodeDataBound: function (tree, node, id, record) {
            let data, expander, checkbox, wrapper, disabled;
            
            if (!gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="checkbox"]'))
            {
                data = tree.getConfig();
                expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="display"]');
                checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                wrapper = document.createElement('span');
                wrapper.setAttribute('data-gj-role', 'checkbox');
                wrapper.appendChild(checkbox);
                expander.parentNode.insertBefore(wrapper, expander);
                disabled = typeof (record[data.disabledField]) !== 'undefined' && record[data.disabledField].toString().toLowerCase() === 'true';

                checkbox = new GijgoCheckBox(checkbox, {
                    uiLibrary: data.uiLibrary,
                    iconsLibrary: data.iconsLibrary,
                    change: function (e) {
                        let state = gj.checkbox.methods.state(e.target);
                        gj.tree.plugins.checkboxes.events.checkboxChange(tree.element, node, record, state);
                    }
                });
                if (disabled) {
                    checkbox.element.disabled = true;
                }
                record[data.checkedField] && checkbox.state('checked');
                checkbox.on('click', function (e) {
                    let node = this.closest('li'),
                        state = gj.checkbox.methods.state(this);
                    if (data.cascadeCheck) {
                        gj.tree.plugins.checkboxes.private.updateChildrenState(node, state);
                        gj.tree.plugins.checkboxes.private.updateParentState(node, state);
                    }
                });
            }
        },

        updateParentState: function (node, state) {
            let parentNode, parentCheckbox, siblingCheckboxes, allChecked, allUnchecked, parentState;

            parentNode = node.parentNode.parentNode;
            if (parentNode && parentNode.getAttribute('data-gj-role') === 'node') {
                parentCheckbox = parentNode.querySelector('[data-gj-role="wrapper"] > [data-gj-role="checkbox"] input[type="checkbox"]');
                siblingCheckboxes = node.parentNode.querySelectorAll('[data-gj-role="wrapper"] > span[data-gj-role="checkbox"] input[type="checkbox"]');
                allChecked = (state === 'checked');
                allUnchecked = (state === 'unchecked');
                parentState = 'indeterminate';
                for (const chkb of siblingCheckboxes) {
                    let state = gj.checkbox.methods.state(chkb);
                    if (allChecked && state !== 'checked') {
                        allChecked = false;
                    }
                    if (allUnchecked && state !== 'unchecked') {
                        allUnchecked = false;
                    }
                };
                if (allChecked && !allUnchecked) {
                    parentState = 'checked';
                }
                if (!allChecked && allUnchecked) {
                    parentState = 'unchecked';
                }
                gj.checkbox.methods.state(parentCheckbox, parentState);
                gj.tree.plugins.checkboxes.private.updateParentState(parentNode, parentState);
            }
        },

        updateChildrenState: function (node, state) {
            let childrenCheckboxes = node.querySelectorAll('ul li [data-gj-role="wrapper"] [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const chkb of childrenCheckboxes) {
                gj.checkbox.methods.state(chkb, state);
            }
        },

        update: function (tree, node, state) {
            let checkbox = node.querySelector('[data-gj-role="checkbox"] input[type="checkbox"]');
            gj.checkbox.methods.state(checkbox, state);
            if (tree.getConfig().cascadeCheck) {
                gj.tree.plugins.checkboxes.private.updateChildrenState(node, state);
                gj.tree.plugins.checkboxes.private.updateParentState(node, state);
            }
        }
    },

    public: {

        /** Get ids of all checked nodes
         * @method
         * @return Array
         * @example Base.Theme <!-- checkbox, tree -->
         * <button id="btnGet" class="gj-button-md">Get Checked Nodes</button>
         * <ul id="tree"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), {
         *         dataSource: '/Locations/Get',
         *         checkboxes: true
         *     });
         *     document.getElementById('btnGet').addEventListener('click', function() {
         *         let result = tree.getCheckedNodes();
         *         alert(result.join());
         *     });
         * </script>
         */
        getCheckedNodes: function () {
            let result = [],
                checkboxes = this.element.querySelectorAll('li [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const checkbox of checkboxes) {
                if (gj.checkbox.methods.state(checkbox) === 'checked') {
                    result.push(checkbox.closest('li').getAttribute('data-gj-id'));
                }
            };
            return result;
        },

        /**
         * Check all tree nodes
         * @method
         * @return tree as html element object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.checkAll()" class="gj-button-md">Check All</button>
         * <button onclick="tree.uncheckAll()" class="gj-button-md">Uncheck All</button>
         * <br/><br/>
         * <ul id="tree" data-gj-source="/Locations/Get"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        checkAll: function () {
            let checkboxes = this.element.querySelectorAll('li [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const checkbox of checkboxes) {
                gj.checkbox.methods.state(checkbox, 'checked');
            };
            return this;
        },

        /**
         * Uncheck all tree nodes
         * @method
         * @return tree as html element object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.checkAll()" class="gj-button-md">Check All</button>
         * <button onclick="tree.uncheckAll()" class="gj-button-md">Uncheck All</button>
         * <br/><br/>
         * <ul id="tree" data-gj-source="/Locations/Get"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        uncheckAll: function () {
            let checkboxes = this.element.querySelectorAll('li [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const checkbox of checkboxes) {
                gj.checkbox.methods.state(checkbox, 'unchecked');
            };
            return this;
        },

        /**
         * Check tree node.
         * @method
         * @param {object} node - The node as html element object
         * @return tree as html element object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.check(tree.getNodeByText('China'))" class="gj-button-md">Check China</button>
         * <br/>
         * <ul id="tree" data-gj-source="/Locations/Get"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *     });
         * </script>
         */
        check: function (node) {
            gj.tree.plugins.checkboxes.private.update(this, node, 'checked');
            return this;
        },

        /**
         * Uncheck tree node.
         * @method
         * @param {object} node - The node as html element object
         * @return tree as html element object
         * @example Sample <!-- checkbox, tree -->
         * <button onclick="tree.uncheck(tree.getNodeByText('China'))" class="gj-button-md">UnCheck China</button>
         * <br/>
         * <ul id="tree" data-gj-source="/Locations/Get"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), {
         *         checkboxes: true
         *     });
         *     tree.on('dataBound', function() {
         *         tree.expandAll();
         *         tree.check(tree.getNodeByText('China'));
         *     });
         * </script>
         */
        uncheck: function (node) {
            gj.tree.plugins.checkboxes.private.update(this, node, 'unchecked');
            return this;
        }
    },

    events: {
        /**
         * Event fires when the checkbox state is changed.
         * @event checkboxChange
         * @param {object} e - event data
         * @param {object} e.detail.node - the node object as html element
         * @param {object} e.detail.record - the record data
         * @param {string} e.detail.state - the new state of the checkbox
         * @example Event.Sample <!-- checkbox, tree -->
         * <ul id="tree" data-gj-source="/Locations/Get" data-gj-checkboxes="true"></ul>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'));
         *     tree.on('checkboxChange', function (e) {
         *         alert('The new state of record ' + e.detail.record.text + ' is ' + e.detail.state);
         *     });
         * </script>
         */
        checkboxChange: function (el, node, record, state) {
            return el.dispatchEvent(new CustomEvent('checkboxChange', { detail: { node: node, record: record, state: state } }));
        }
    },

    configure: function (tree) {
        if (tree.getConfig().checkboxes && gj.checkbox) {
            tree.extend(tree, gj.tree.plugins.checkboxes.public);
            tree.on('nodeDataBound', function (e) {
                gj.tree.plugins.checkboxes.private.nodeDataBound(tree, e.detail.node, e.detail.id, e.detail.record);
            });
            tree.on('dataBound', function () {
                gj.tree.plugins.checkboxes.private.dataBound(tree);
            });
            tree.on('enable', function (e) {
                let checkbox = e.detail.node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="checkbox"] input[type="checkbox"]');
                if (checkbox) {
                    checkbox.disabled = false;
                }
            });
            tree.on('disable', function (e) {
                let checkbox = e.detail.node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="checkbox"] input[type="checkbox"]');
                if (checkbox) {
                    checkbox.disabled = true;
                }
            });
        }
    }
};

/**
 * @widget Tree
 * @plugin DragAndDrop
 */
gj.tree.plugins.dragAndDrop = {
	config: {
		base: {
			/** Enables drag and drop functionality for each node.
              * @type Boolean
              * @default undefined
              * @example Material.Design <!-- draggable, droppable, tree -->
              * <h3>Drag and Drop Tree Nodes</h3>
              * <ul id="tree"></ul>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, draggable, droppable, tree -->
              * <div class="container">
              *     <h3>Drag and Drop Tree Nodes</h3>
              *     <ul id="tree"></ul>
              * </div>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true,
              *         uiLibrary: 'bootstrap'
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, draggable, droppable, tree -->
              * <div class="container">
              *     <h3>Drag and Drop Tree Nodes</h3>
              *     <ul id="tree"></ul>
              * </div>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true,
              *         uiLibrary: 'bootstrap4'
              *     });
              * </script>
              */
			dragAndDrop: undefined,

			style: {
			    dragEl: 'gj-tree-drag-el gj-tree-md-drag-el',
                dropAsChildIcon: 'gj-cursor-pointer gj-icon plus',
			    dropAbove: 'gj-tree-drop-above',
			    dropBelow: 'gj-tree-drop-below'
			}
        },

        bootstrap: {
            style: {
                dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
                dropAsChildIcon: 'glyphicon glyphicon-plus',
                dropAbove: 'drop-above',
                dropBelow: 'drop-below'
            }
        },

        bootstrap4: {
            style: {
                dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
                dropAsChildIcon: 'gj-cursor-pointer gj-icon plus',
                dropAbove: 'drop-above',
                dropBelow: 'drop-below'
            }
        }
	},

	private: {
	    nodeDataBound: function (tree, node) {
	        let wrapper = node.querySelector('>[data-gj-role="wrapper"]'),
    	        display = node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="display"]');
            if (wrapper && display) {
                display.addEventListener('mousedown', gj.tree.plugins.dragAndDrop.private.createNodeMouseDownHandler(tree));
                display.addEventListener('mousemove', gj.tree.plugins.dragAndDrop.private.createNodeMouseMoveHandler(tree, node, display));
                display.addEventListener('mouseup', gj.tree.plugins.dragAndDrop.private.createNodeMouseUpHandler(tree));
		    }
        },

        createNodeMouseDownHandler: function (tree) {
            return function (e) {
                tree.element.setAttribute('data-gj-drag-ready', true);
            }
        },

        createNodeMouseUpHandler: function (tree) {
            return function (e) {
                tree.element.setAttribute('data-gj-drag-ready', false);
            }
        },

	    createNodeMouseMoveHandler: function (tree, node, display) {
            return function (e) {
                if (tree.element.getAttribute('data-gj-drag-ready') === 'true') {
                    let data = tree.getConfig(), dragEl, wrapper, ul, li, indicator, offsetTop, offsetLeft;

                    tree.element.setAttribute('data-gj-drag-ready', false);
                    dragEl = display.cloneNode();
                    dragEl.setAttribute('data-gj-role', 'draggable-clone');
                    dragEl.classList.add('gj-unselectable');
                    gj.core.addClasses(dragEl, data.style.dragEl);
                    wrapper = gj.core.wrap(dragEl, 'div');

                    ul = document.createElement('ul');
                    gj.core.addClasses(ul, data.style.list);
                    wrapper.appendChild(ul);

                    li = document.createElement('li');
                    gj.core.addClasses(li, data.style.item);
                    ul.appendChild(li);
                    document.body.appendChild(dragEl);

                    indicator = document.createElement('span');
                    indicator.setAttribute('data-gj-role', 'indicator');
                    wrapper.parentNode.insertBefore(indicator, wrapper);
                    
                    new GijgoDraggable(dragEl, {
                        drag: gj.tree.plugins.dragAndDrop.private.createDragHandler(tree, node, display),
                        stop: gj.tree.plugins.dragAndDrop.private.createDragStopHandler(tree, node, display)
                    });
                    wrapper = display.parent();
                    offsetTop = display.offset().top;
                    offsetTop -= parseInt(wrapper.css("border-top-width")) + parseInt(wrapper.css("margin-top")) + parseInt(wrapper.css("padding-top"));
                    offsetLeft = display.offset().left;
                    offsetLeft -= parseInt(wrapper.css("border-left-width")) + parseInt(wrapper.css("margin-left")) + parseInt(wrapper.css("padding-left"));
                    offsetLeft -= dragEl.find('[data-gj-role="indicator"]').outerWidth(true);
                    dragEl.css({
                        position: 'absolute', top: offsetTop, left: offsetLeft, width: display.outerWidth(true)
                    });
                    if (display.attr('data-droppable') === 'true') {
                        display.droppable('destroy');
                    }
                    gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, node, display).each(function () {
                        let dropEl = (this);
                        if (dropEl.attr('data-droppable') === 'true') {
                            dropEl.droppable('destroy');
                        }
                        dropEl.droppable();
                    });
                    gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, node).each(function () {
                        let dropEl = (this);
                        if (dropEl.attr('data-droppable') === 'true') {
                            dropEl.droppable('destroy');
                        }
                        dropEl.droppable();
                    });
                    dragEl.trigger('mousedown');
                }
		    };
	    },

	    getTargetDisplays: function (tree, node, display) {
	        return tree.find('[data-gj-role="display"]').not(display).not(node.find('[data-gj-role="display"]'));
	    },

	    getTargetWrappers: function (tree, node) {
	        return tree.find('[data-gj-role="wrapper"]').not(node.find('[data-gj-role="wrapper"]'));
	    },

	    createDragHandler: function (tree, node, display) {
	        let displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, node, display),
                wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers(tree, node),
	            data = tree.getConfig();
	        return function (e, offset, mousePosition) {
	            let dragEl = (this), success = false;
	            displays.each(function () {
	                let targetDisplay = (this),
	                    indicator;
	                if (targetDisplay.droppable('isOver', mousePosition)) {
	                    indicator = dragEl.find('[data-gj-role="indicator"]');
	                    data.style.dropAsChildIcon ? indicator.addClass(data.style.dropAsChildIcon) : indicator.text('+');
	                    success = true;
	                    return false;
	                } else {
	                    dragEl.find('[data-gj-role="indicator"]').removeClass(data.style.dropAsChildIcon).empty();
                    }
	            });
	            wrappers.each(function () {
	                let wrapper = (this),
                        indicator, middle;
	                if (!success && wrapper.droppable('isOver', mousePosition)) {
	                    middle = wrapper.position().top + (wrapper.outerHeight() / 2);
	                    if (mousePosition.y < middle) {
	                        wrapper.addClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                    } else {
	                        wrapper.addClass(data.style.dropBelow).removeClass(data.style.dropAbove);
	                    }
	                } else {
	                    wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                }
	            });
	        };
        },

	    createDragStopHandler: function (tree, sourceNode, sourceDisplay) {
	        let displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, sourceNode, sourceDisplay),
                wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers(tree, sourceNode),
	            data = tree.getConfig();
	        return function (e, mousePosition) {
                let success = false, record, targetNode, sourceParentNode, parent;
	            (this).draggable('destroy').remove();
	            displays.each(function () {
	                let targetDisplay = (this), ul;
	                if (targetDisplay.droppable('isOver', mousePosition)) {
	                    targetNode = targetDisplay.closest('li');
	                    sourceParentNode = sourceNode.parent('ul').parent('li');
	                    ul = targetNode.children('ul');
	                    if (ul.length === 0) {
	                        ul = ('<ul />').addClass(data.style.list);
	                        targetNode.append(ul);
	                    }
	                    if (gj.tree.plugins.dragAndDrop.events.nodeDrop(tree, sourceNode.data('id'), targetNode.data('id'), ul.children('li').length + 1) !== false) {
                            ul.append(sourceNode);

                            //BEGIN: Change node position inside the backend data
                            record = tree.getDataById(sourceNode.data('id'));
                            gj.tree.methods.removeDataById(tree, sourceNode.data('id'), data.records);
                            parent = tree.getDataById(ul.parent().data('id'));
                            if (parent[data.childrenField] === undefined) {
                                parent[data.childrenField] = [];
                            }
                            parent[data.childrenField].push(record);
                            //END

	                        gj.tree.plugins.dragAndDrop.private.refresh(tree, sourceNode, targetNode, sourceParentNode);
	                    }
	                    success = true;
	                    return false;
	                }
	                targetDisplay.droppable('destroy');
	            });
	            if (!success) {
	                wrappers.each(function () {
	                    let targetWrapper = (this), prepend, orderNumber, sourceNodeId;
	                    if (targetWrapper.droppable('isOver', mousePosition)) {
	                        targetNode = targetWrapper.closest('li');
	                        sourceParentNode = sourceNode.parent('ul').parent('li');
	                        prepend = mousePosition.y < (targetWrapper.position().top + (targetWrapper.outerHeight() / 2));
	                        sourceNodeId = sourceNode.data('id');
	                        orderNumber = targetNode.prevAll('li:not([data-id="' + sourceNodeId + '"])').length + (prepend ? 1 : 2);
                            if (gj.tree.plugins.dragAndDrop.events.nodeDrop(tree, sourceNodeId, targetNode.parent('ul').parent('li').data('id'), orderNumber) !== false) {
                                //BEGIN: Change node position inside the backend data
                                record = tree.getDataById(sourceNode.data('id'));
                                gj.tree.methods.removeDataById(tree, sourceNode.data('id'), data.records);
                                tree.getDataById(targetNode.parent().data('id'))[data.childrenField].splice(targetNode.index() + (prepend ? 0 : 1), 0, record);
                                //END

	                            if (prepend) {
                                    sourceNode.insertBefore(targetNode);
	                            } else {
	                                sourceNode.insertAfter(targetNode);
                                }

                                gj.tree.plugins.dragAndDrop.private.refresh(tree, sourceNode, targetNode, sourceParentNode);
	                        }
	                        return false;
	                    }
	                    targetWrapper.droppable('destroy');
	                });
                }
	        }
	    },

	    refresh: function (tree, sourceNode, targetNode, sourceParentNode) {
	        let data = tree.getConfig();
	        gj.tree.plugins.dragAndDrop.private.refreshNode(tree, targetNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode(tree, sourceParentNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode(tree, sourceNode);
	        sourceNode.find('li[data-gj-role="node"]').each(function () {
	            gj.tree.plugins.dragAndDrop.private.refreshNode(tree, (this));
	        });
	        targetNode.children('[data-gj-role="wrapper"]').removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
        },

	    refreshNode: function (tree, node) {
	        let wrapper = node.children('[data-gj-role="wrapper"]'),
	            expander = wrapper.children('[data-gj-role="expander"]'),
	            spacer = wrapper.children('[data-gj-role="spacer"]'),
	            list = node.children('ul'),
                data = tree.getConfig(),
	            level = node.parentsUntil('[data-type="tree"]', 'ul').length;

	        if (list.length && list.children().length) {
	            if (list.is(':visible')) {
	                expander.empty().append(data.icons.collapse);
	            } else {
	                expander.empty().append(data.icons.expand);
	            }
	        } else {
	            expander.empty();
	        }
	        wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);

	        spacer.css('width', (data.indentation * (level - 1)));
	    }
	},

	public: {
	},

	events: {
	    /**
         * Event fires when the node is dropped.
         * @event nodeDrop
         * @param {object} e - event data
         * @param {string} id - the id of the record
         * @param {object} parentId - the id of the new parend node
         * @param {object} orderNumber - the new order number
         * @example Event.Sample <!-- draggable, droppable, tree -->
         * <div id="tree" data-source="/Locations/Get" data-drag-and-drop="true"></div>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), );
         *     tree.on('nodeDrop', function (e, id, parentId, orderNumber) {
         *         let node = tree.getDataById(id),
         *             parent = parentId ? tree.getDataById(parentId) : {};
         *         if (parent.text === 'North America') {
         *             alert('Can\'t add children to North America.');
         *             return false;
         *         } else {
         *             alert(node.text + ' is added to ' + parent.text + ' as ' + orderNumber);
         *             return true;
         *         }
         *     });
         * </script>
         */
	    nodeDrop: function (tree, id, parentId, orderNumber) {
	        return tree.triggerHandler('nodeDrop', [id, parentId, orderNumber]);
        }
    },

	configure: function (tree) {
		tree.extend(tree, gj.tree.plugins.dragAndDrop.public);
		if (tree.getConfig().dragAndDrop && gj.draggable && gj.droppable) {
			tree.on('nodeDataBound', function (e, node) {
				gj.tree.plugins.dragAndDrop.private.nodeDataBound(tree, node);
			});
		}
	}
};

/** 
 * @widget Tree 
 * @plugin Lazy Loading
 */
gj.tree.plugins.lazyLoading = {
    config: {
        base: {

            paramNames: {

                /** The name of the parameter that is going to send the parent identificator.
                 * Lazy Loading needs to be enabled in order this parameter to be in use.
                 * @alias paramNames.parentId
                 * @type string
                 * @default "parentId"
                 */
                parentId: 'parentId'
            },

            /** Enables lazy loading
              * @type Boolean
              * @default false
              * @example Material.Design <!-- tree -->
              * <ul id="tree"></ul>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/LazyGet',
              *         primaryKey: 'id',
              *         lazyLoading: true
              *     });
              * </script>
              */
            lazyLoading: false
        }
    },

    private: {
        nodeDataBound: function (tree, node, id, record) {
            let data = tree.getConfig(),
                expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]');

            if (record.hasChildren) {
                expander.innerHTML = data.icons.expand;
            }
        },

        createDoneHandler: function (tree, node) {
            return function () {
                let i, expander, list, data = tree.getConfig(), response = this.response;
                if (typeof (response) === 'string' && JSON) {
                    response = JSON.parse(response);
                }
                if (response && response.length) {
                    list = gj.core.select(node, 'ul');
                    if (list.length === 0) {
                        list = document.createElement('ul');
                        gj.core.addClasses(list, data.style.list);
                        node.appendChild(list);
                    }
                    for (i = 0; i < response.length; i++) {
                        tree.addNode(response[i], list);
                    }
                    expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
                    expander.setAttribute('data-gj-mode', 'open');
                    expander.innerHTML = data.icons.collapse;
                    gj.tree.events.dataBound(tree.element);
                }
            };
        },

        expand: function (tree, node, id) {
            let url, data = tree.getConfig(), params = {},
                children = gj.core.selectAll(node, 'ul>li');

            if (!children || !children.length) {
                if (typeof (data.dataSource) === 'string') {
                    params[data.paramNames.parentId] = id;
                    url = data.dataSource + '?' + new URLSearchParams(params).toString();                    
                    if (tree.xhr) {
                        tree.xhr.abort();
                    }
                    tree.xhr = new XMLHttpRequest();
                    tree.xhr.open('GET', url , true);
                    tree.xhr.onload = gj.tree.plugins.lazyLoading.private.createDoneHandler(tree, node);
                    tree.xhr.onerror = tree.createErrorHandler();
                    tree.xhr.send();
                }
            }
        }
    },

    public: {},

    events: {},

    configure: function (tree, fullConfig, clientConfig) {
        if (clientConfig.lazyLoading) {
            tree.on('nodeDataBound', function (e) {
                gj.tree.plugins.lazyLoading.private.nodeDataBound(tree, e.detail.node, e.detail.id, e.detail.record);
            });
            tree.on('expand', function (e) {
                gj.tree.plugins.lazyLoading.private.expand(tree, e.detail.node, e.detail.id);
            });
        }
    }
};

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
         * <button onclick="chkb.element.disabled = false" class="gj-button-md">Enable</button>
         * <button onclick="chkb.element.disabled = true" class="gj-button-md">Disable</button>
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
         *     <button onclick="chkb.element.disabled = false" class="btn btn-default">Enable</button>
         *     <button onclick="chkb.element.disabled = true" class="btn btn-default">Disable</button>
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
         *     <button onclick="chkb.element.disabled = false" class="btn btn-default">Enable</button>
         *     <button onclick="chkb.element.disabled = true" class="btn btn-default">Disable</button>
         * </div>
         * <script>
         *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'), {
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, checkbox -->
         * <div class="container-fluid" style="margin-top:10px">
         *     <input type="checkbox" id="checkbox"/><br/><br/>
         *     <button onclick="chkb.state('checked')" class="btn btn-primary">Checked</button>
         *     <button onclick="chkb.state('unchecked')" class="btn btn-primary">Unchecked</button>
         *     <button onclick="chkb.state('indeterminate')" class="btn btn-primary">Indeterminate</button>
         *     <button onclick="chkb.element.disabled = false" class="btn btn-primary">Enable</button>
         *     <button onclick="chkb.element.disabled = true" class="btn btn-primary">Disable</button>
         * </div>
         * <script>
         *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'), {
         *         uiLibrary: 'bootstrap5'
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
         *     <button onclick="chkb.element.disabled = false"" class="btn btn-default">Enable</button>
         *     <button onclick="chkb.element.disabled = true"" class="btn btn-default">Disable</button>
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
            wrapper: 'gj-checkbox-md',
            spanCssClass: undefined
        }
        
    },

    bootstrap: {
        style: {
            wrapper: 'gj-checkbox-bootstrap gj-checkbox-bootstrap-3'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-checkbox-bootstrap gj-checkbox-bootstrap-4'
        },
        iconsLibrary: 'materialicons'
    },

    bootstrap5: {
        style: {
            wrapper: 'gj-checkbox-bootstrap gj-checkbox-bootstrap-4'
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
        gj.widget.prototype.init.call(this, jsConfig);
        this.element.setAttribute('data-gj-checkbox', 'true');
        gj.checkbox.methods.initialize(this, this.getConfig());
        return this;
    },

    initialize: function (chkb, data) {
        var wrapper, span;
        wrapper = chkb.wrap('label');
        gj.core.addClasses(wrapper, data.style.iconsCssClass);
        if (chkb.element.getAttribute('id')) {
            wrapper.setAttribute('for', chkb.element.getAttribute('id'));
        }

        span = document.createElement('span');
        if (data.style.spanCssClass) {
            gj.core.addClasses(span, data.style.spanCssClass);
        }
        wrapper.appendChild(span);
    },

    state: function (chkb, value) {
        if (value) {
            if ('checked' === value) {
                chkb.checked = true;
                chkb.indeterminate = false;
            } else if ('unchecked' === value) {
                chkb.checked = false;
                chkb.indeterminate = false;
            } else if ('indeterminate' === value) {
                chkb.checked = false;
                chkb.indeterminate = true;
            }
            return chkb;
        } else {
            if (chkb.indeterminate) {
                value = 'indeterminate';
            } else if (chkb.checked) {
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
        var type = chkb.element.getAttribute('data-gj-type');
            data = chkb.getConfig();
        if (data) {
            chkb.removeConfig();
            chkb.element.removeAttribute('data-gj-type');
            chkb.element.removeAttribute('data-gj-guid');
            chkb.element.removeAttribute('data-gj-checkbox');
            chkb.element.removeAttribute('class');
            chkb.element.parentNode.removeChild(chkb.element.parentNode.querySelector('span'));
            chkb.element.parentNode.outerHTML = chkb.element.parentNode.innerHTML;
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
     * @return {GijgoCheckBox} GijgoCheckBox
     * @example sample <!-- checkbox -->
     * <input type="checkbox" id="checkbox"/>
     * <script>
     *     var chkb = new GijgoCheckBox(document.getElementById('checkbox'), {
     *         change: function (e) {
     *             alert('Checked: ' + e.target.checked);
     *         }
     *     });
     * </script>
     */
    change: function (el) {
        //Event dispatched by native html input from type=checkbox
    }
};


GijgoCheckBox = function (element, jsConfig) {
    var self = this,
        methods = gj.checkbox.methods;

    self.type = 'checkbox';
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
        return methods.state(this.element, value);
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

    if ('true' !== element.getAttribute('data-gj-checkbox')) {
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
/* global window alert jQuery */
/** 
 * @widget Editor
 * @plugin Base
 */
gj.editor = {
    plugins: {},
    messages: {}
};

gj.editor.config = {
    base: {

        /** The height of the editor. Numeric values are treated as pixels.
         * @type number|string
         * @default 300
         * @example sample <!-- editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     new GijgoEditor(document.getElementById('editor'), { height: 400 });
         * </script>
         */
        height: 300,

        /** The width of the editor. Numeric values are treated as pixels.
         * @type number|string
         * @default undefined
         * @example JS <!-- editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     new GijgoEditor(document.getElementById('editor'), { width: 900 });
         * </script>
         * @example HTML <!-- editor -->
         * <div id="editor" width="900"></div>
         * <script>
         *     new GijgoEditor(document.getElementById('editor'));
         * </script>
         */
        width: undefined,

        /** The name of the UI library that is going to be in use. Currently we support only Material Design and Bootstrap. 
         * @additionalinfo The css files for Bootstrap should be manually included to the page if you use bootstrap as uiLibrary.
         * @type string (materialdesign|bootstrap|bootstrap4)
         * @default 'materialdesign'
         * @example Material.Design <!-- editor, materialicons  -->
         * <textarea id="editor"></textarea>
         * <script>
         *     new GijgoEditor(document.getElementById('editor'), { uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     new GijgoEditor(document.getElementById('editor'), {
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     new GijgoEditor(document.getElementById('editor'), {
         *         uiLibrary: 'bootstrap4'
         *     });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons and Font Awesome.
         * @additionalinfo If you use Bootstrap as uiLibrary, then the iconsLibrary is set to font awesome by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons or Font Awesome should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome)
         * @default 'materialicons'
         * @example Bootstrap.4.FontAwesome <!-- bootstrap4, fontawesome, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     new GijgoEditor(document.getElementById('editor'), {
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         * @example Bootstrap.3.FontAwesome <!-- bootstrap, fontawesome, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     new GijgoEditor(document.getElementById('editor'), {
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example French <!-- editor -->
         * <script src="../../dist/modular/editor/js/messages/messages.fr-fr.js"></script>
         * <div id="editor">Hover buttons in the toolbar in order to see localized tooltips</div>
         * <script>
         *     new GijgoEditor(document.getElementById('editor'), {
         *         locale: 'fr-fr'
         *     });
         * </script>
         * @example German <!-- editor -->
         * <script src="../../dist/modular/editor/js/messages/messages.de-de.js"></script>
         * <div id="editor">Hover <b><u>buttons</u></b> in the toolbar in order to see localized tooltips</div>
         * <script>
         *     new GijgoEditor(document.getElementById('editor'), {
         *         locale: 'de-de'
         *     });
         * </script>
         */
        locale: 'en-us',

        buttons: undefined,

        style: {
            wrapper: 'gj-editor gj-editor-md',
            buttonsGroup: 'gj-button-md-group',
            button: 'gj-button-md',
            buttonActive: 'active'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-editor gj-editor-bootstrap',
            buttonsGroup: 'btn-group',
            button: 'btn btn-default gj-cursor-pointer',
            buttonActive: 'active'
        }
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-editor gj-editor-bootstrap',
            buttonsGroup: 'btn-group',
            button: 'btn btn-outline-secondary gj-cursor-pointer',
            buttonActive: 'active'
        }
    },

    materialicons: {
        icons: {
            bold: '<i class="gj-icon bold" />',
            italic: '<i class="gj-icon italic" />',
            strikethrough: '<i class="gj-icon strikethrough" />',
            underline: '<i class="gj-icon underlined" />',

            listBulleted: '<i class="gj-icon list-bulleted" />',
            listNumbered: '<i class="gj-icon list-numbered" />',
            indentDecrease: '<i class="gj-icon indent-decrease" />',
            indentIncrease: '<i class="gj-icon indent-increase" />',

            alignLeft: '<i class="gj-icon align-left" />',
            alignCenter: '<i class="gj-icon align-center" />',
            alignRight: '<i class="gj-icon align-right" />',
            alignJustify: '<i class="gj-icon align-justify" />',

            undo: '<i class="gj-icon undo" />',
            redo: '<i class="gj-icon redo" />'
        }
    },

    fontawesome: {
        icons: {
            bold: '<i class="fa fa-bold" aria-hidden="true"></i>',
            italic: '<i class="fa fa-italic" aria-hidden="true"></i>',
            strikethrough: '<i class="fa fa-strikethrough" aria-hidden="true"></i>',
            underline: '<i class="fa fa-underline" aria-hidden="true"></i>',

            listBulleted: '<i class="fa fa-list-ul" aria-hidden="true"></i>',
            listNumbered: '<i class="fa fa-list-ol" aria-hidden="true"></i>',
            indentDecrease: '<i class="fa fa-indent" aria-hidden="true"></i>',
            indentIncrease: '<i class="fa fa-outdent" aria-hidden="true"></i>',

            alignLeft: '<i class="fa fa-align-left" aria-hidden="true"></i>',
            alignCenter: '<i class="fa fa-align-center" aria-hidden="true"></i>',
            alignRight: '<i class="fa fa-align-right" aria-hidden="true"></i>',
            alignJustify: '<i class="fa fa-align-justify" aria-hidden="true"></i>',

            undo: '<i class="fa fa-undo" aria-hidden="true"></i>',
            redo: '<i class="fa fa-repeat" aria-hidden="true"></i>'
        }
    }
};

gj.editor.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);
        this.element.setAttribute('data-editor', 'true');
        gj.editor.methods.initialize(this, this.getConfig());
        return this;
    },

    initialize: function (editor, data) {
        var group, groupEl, btn, btnEl, wrapper, body, toolbar;

        editor.element.style.display = 'none';

        if (editor.element.parentElement.getAttributes('data-gj-role') !== 'wrapper') {
            wrapper = document.createElement('div');
            wrapper.setAttribute('data-gj-role', 'wrapper');
            editor.element.parentNode.insertBefore(wrapper, editor.element);
            wrapper.appendChild(editor.element);
        }

        gj.editor.methods.localization(data);
        gj.core.addClasses(wrapper, data.style.wrapper);
        if (data.width) {
            wrapper.style.width = data.width;
        }

        body = wrapper.querySelector('div[data-gj-role="body"]');
        if (!body) {
            body = document.createElement('div');
            body.setAttribute('data-gj-role', 'body');
            wrapper.appendChild(body);
            if (editor.element.innerText) {
                body.innerHTML = editor.element.innerText;
            }
        }
        body.setAttribute('contenteditable', true);
        body.addEventListener('keydown', function (e) {
            var key = e.keyCode || e.charCode;
            if (gj.editor.events.changing(editor.element) === false && key !== 8 && key !== 46) {
                e.preventDefault();
            }
        });
        body.addEventListener('mouseup keyup mouseout cut paste', function (e) {
            self.updateToolbar(editor, toolbar, data);
            gj.editor.events.changed(editor);
            editor.html(body.html());
        });

        toolbar = wrapper.querySelector('div[data-gj-role="toolbar"]');
        if (!toolbar) {
            toolbar = document.createElement('div');
            toolbar.setAttribute('data-gj-role', 'toolbar');
            body.parentNode.insertBefore(toolbar, body);

            for (group in data.buttons) {
                groupEl = document.createElement('div');
                groupEl.classList.add(data.style.buttonsGroup);
                for (btn in data.buttons[group]) {
                    btnEl = gj.core.createElement(data.buttons[group][btn]);
                    btnEl.addEventListener('click', function () {
                        gj.editor.methods.executeCmd(editor, body, toolbar, this, data);
                    });
                    groupEl.appendChild(btnEl);
                }
                toolbar.appendChild(groupEl);
            }
        }

        body.style.height = data.height - gj.core.height(toolbar, true) + 'px';
    },

    localization: function (data) {
        var msg = gj.editor.messages[data.locale];
        if (typeof (data.buttons) === 'undefined') {
            data.buttons = [
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.bold + '" data-gj-role="bold">' + data.icons.bold + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.italic + '" data-gj-role="italic">' + data.icons.italic + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.strikethrough + '" data-gj-role="strikethrough">' + data.icons.strikethrough + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.underline + '" data-gj-role="underline">' + data.icons.underline + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.listBulleted + '" data-gj-role="insertunorderedlist">' + data.icons.listBulleted + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.listNumbered + '" data-gj-role="insertorderedlist">' + data.icons.listNumbered + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.indentDecrease + '" data-gj-role="outdent">' + data.icons.indentDecrease + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.indentIncrease + '" data-gj-role="indent">' + data.icons.indentIncrease + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignLeft + '" data-gj-role="justifyleft">' + data.icons.alignLeft + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignCenter + '" data-gj-role="justifycenter">' + data.icons.alignCenter + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignRight + '" data-gj-role="justifyright">' + data.icons.alignRight + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignJustify + '" data-gj-role="justifyfull">' + data.icons.alignJustify + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.undo + '" data-gj-role="undo">' + data.icons.undo + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.redo + '" data-gj-role="redo">' + data.icons.redo + '</button>'
                ]
            ];
        }
    },

    updateToolbar: function (editor, toolbar, data) {
        buttons = toolbar.querySelectorAll('[data-gj-role]').forEach(function(btn) {
            var cmd = btn.getAttribute('data-gj-role');

            if (cmd && document.queryCommandEnabled(cmd) && document.queryCommandValue(cmd) === "true") {
                btn.classList.add(data.style.buttonActive);
            } else {
                btn.classList.remove(data.style.buttonActive);
            }
        });
    },

    executeCmd: function (editor, body, toolbar, btn, data) {
        body.focus();
        document.execCommand(btn.getAttribute('data-gj-role'), false);
        gj.editor.methods.updateToolbar(editor, toolbar, data);
    },

    content: function (editor, html) {
        var body = editor.element.parentElement.querySelector('div[data-gj-role="body"]');
        if (typeof html === "undefined") {
            return body.innerHTML;
        } else {
            body.innerHTML = html;
        }
    },

    destroy: function (editor) {
        var wrapper;
        if (editor.element.getAttribute('data-editor') === 'true') {
            wrapper = editor.element.parentElement;
            wrapper.querySelector('div[data-gj-role="body"]').remove();
            wrapper.querySelector('div[data-gj-role="toolbar"]').remove();
            editor.element.outerHTML = editor.element.innerHTML;
            editor.removeConfig();
            editor.element.removeAttribute('data-gj-guid');
            editor.element.removeAttribute('data-editor');
            //$editor.off();
            editor.element.display = 'block';
        }
        return editor;
    }
};

gj.editor.events = {

    /**
     * Event fires before change of text in the editor.
     *
     * @event changing
     * @param {object} e - event data
     * @return {object} - GijgoEditor
     * @example MaxLength <!-- editor -->
     * <textarea id="editor"></textarea>
     * <script>
     *     var editor = new GijgoEditor(document.getElementById('editor'));
     *     editor.element.addEventListener('changing', function (e) {
     *         return editor.content().length < 3;
     *     });
     * </script>
     */
    changing: function (el) {
        return el.dispatchEvent(new Event('changing'));
    },

    /**
     * Event fires after change of text in the editor.
     *
     * @event changed
     * @param {object} e - event data
     * @return {object} - GijgoEditor
     * @example sample <!-- editor -->
     * <textarea id="editor"></textarea>
     * <script>
     *     new GijgoEditor(document.getElementById('editor'), {
     *         changed: function (e) {
     *             alert('changed is fired');
     *         }
     *     });
     * </script>
     */
    changed: function (el) {
        return el.dispatchEvent(new Event('changed'));
    }
};

GijgoEditor = function (element, jsConfig) {
    var self = this,
        methods = gj.editor.methods;

    self.type = 'editor';
    self.element = element;

    /** Get or set html content in the body.
     * @method
     * @param {string} html - The html content that needs to be set.
     * @return {object} string | editor
     * @example Get <!-- editor, materialicons -->
     * <button class="gj-button-md" onclick="alert(editor.content())">Get Content</button>
     * <hr/>
     * <div id="editor">My <b>content</b>.</div>
     * <script>
     *     var editor = new GijgoEditor(document.getElementById('editor'));
     * </script>
     * @example Set <!-- editor, materialicons -->
     * <button class="gj-button-md" onclick="editor.content('<h1>new value</h1>')">Set Content</button>
     * <hr/>
     * <textarea id="editor"></textarea>
     * <script>
     *     var editor = new GijgoEditor(document.getElementById('editor'));
     * </script>
     */
    self.content = function (html) {
        return methods.content(this, html);
    };

    /** Remove editor functionality from the element.
     * @method
     * @return {GijgoEditor} GijgoEditor
     * @example sample <!-- editor, materialicons -->
     * <button class="gj-button-md" onclick="editor.destroy()">Destroy</button><br/>
     * <textarea id="editor"></textarea>
     * <script>
     *     var editor = new GijgoEditor(document.getElementById('editor'));
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    if ('true' !== element.getAttribute('data-editor')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoEditor.prototype = new gj.widget();
GijgoEditor.constructor = gj.editor.widget;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.editor = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoEditor(this, method);
                } else {
                    widget = new GijgoEditor(this, null);
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

gj.editor.messages['en-us'] = {
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    underline: 'Underline',
    listBulleted: 'List Bulleted',
    listNumbered: 'List Numbered',
    indentDecrease: 'Indent Decrease',
    indentIncrease: 'Indent Increase',
    alignLeft: 'Align Left',
    alignCenter: 'Align Center',
    alignRight: 'Align Right',
    alignJustify: 'Align Justify',
    undo: 'Undo',
    redo: 'Redo'
};
/* global window alert jQuery gj */
/**
  * @widget DropDown
  * @plugin Base
  */
gj.dropdown = {
    plugins: {}
};

gj.dropdown.config = {
    base: {

        /** The data source of dropdown.
         * @additionalinfo If set to string, then the dropdown is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the dropdown is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the dropdown is going to use the array as data for dropdown nodes.
         * @type (string|object|array)
         * @default undefined
         * @example Local.DataSource <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), {
         *         dataSource: [ { value: 1, text: 'One' }, { value: 2, text: 'Two' }, { value: 3, text: 'Three' } ]
         *     });
         * </script>
         * @example Remote.DataSource <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), {
         *         dataSource: '/Locations/Get',
         *         valueField: 'id'
         *     });
         * </script>
         */
        dataSource: undefined,

        /** Text field name.
         * @type string
         * @default 'text'
         * @example sample <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), {
         *         textField: 'newTextField',
         *         dataSource: [ { value: 1, newTextField: 'One' }, { value: 2, newTextField: 'Two' }, { value: 3, newTextField: 'Three' } ]
         *     });
         * </script>
         */
        textField: 'text',

        /** Value field name.
         * @type string
         * @default 'value'
         * @example sample <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), {
         *         valueField: 'newValueField',
         *         dataSource: [ { newValueField: 1, text: 'One' }, { newValueField: 2, text: 'Two' }, { newValueField: 3, text: 'Three' } ]
         *     });
         * </script>
         */
        valueField: 'value',

        /** Selected field name.
         * @type string
         * @default 'selected'
         * @example sample <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), {
         *         selectedField: 'newSelectedField',
         *         dataSource: [ { value: 1, text: 'One' }, { value: 2, text: 'Two', newSelectedField: true }, { value: 3, text: 'Three' } ]
         *     });
         * </script>
         */
        selectedField: 'selected',

        /** The width of the dropdown.
         * @type number
         * @default undefined
         * @example JS.Config <!-- dropdown -->
         * <select id="dropdown">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), { width: 200 });
         * </script>
         * @example HTML.Config <!-- dropdown -->
         * <select id="dropdown" width="200">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'));
         * </script>
         * @example 100.Percent <!-- dropdown -->
         * <select id="dropdown" width="100%">
         *     <option value=""></option>
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'));
         * </script>
         */
        width: undefined,

        /** The maximum height of the dropdown list. When set to auto adjust to the screen height.
         * @type Number|'auto'
         * @default 'auto'
         * @example Auto <!-- dropdown -->
         * <p>Note: Minimize the window in order to enable scrolling for the drop down list.</p>
         * <select id="dropdown" width="200"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), { maxHeight: 'auto', dataSource: '/Locations/GetCountries', valueField: 'id' });
         * </script>
         * @example Fixed <!-- dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), { maxHeight: 200, dataSource: '/Locations/GetCountries', valueField: 'id' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), { maxHeight: 200, dataSource: '/Locations/GetCountries', valueField: 'id', uiLibrary: 'bootstrap4' });
         * </script>
         */
        maxHeight: 'auto',

        /** Placeholder. This label appear only if the value is not set yet.
         * @type string
         * @default undefined
         * @example JS.Config <!-- dropdown -->
         * <select id="dropdown"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), { placeholder: 'Select One...', width: 200, dataSource: '/Locations/GetCountries', valueField: 'id' });
         * </script>
         * @example HTML.Config <!-- dropdown -->
         * <select id="dropdown" placeholder="Select One..." width="200" data-gj-source="/Locations/GetCountries" data-gj-value-field="id"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'));
         * </script>
         * @example Bootstrap <!-- bootstrap, dropdown -->
         * <select id="dropdown" placeholder="Select One..." width="200" data-gj-source="/Locations/GetCountries" data-gj-value-field="id"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), { uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, dropdown -->
         * <select id="dropdown" placeholder="Select One..." width="200" data-gj-source="/Locations/GetCountries" data-gj-value-field="id"></select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), { uiLibrary: 'bootstrap4' });
         * </script>
         */
        placeholder: undefined,

        fontSize: undefined,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- dropdown -->
         * <select id="dropdown" width="200">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     var dropdown = new GijgoDropDown(document.getElementById('dropdown'), {
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, dropdown -->
         * <select id="dropdown" width="200">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), { uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, dropdown -->
         * <select id="dropdown" width="200">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), { uiLibrary: 'bootstrap4', width: 300 });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, dropdown -->
         * <select id="dropdown" width="200">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     new GijgoDropDown(document.getElementById('dropdown'), { uiLibrary: 'bootstrap5', width: 300 });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Bootstrap.Material.Icons <!-- bootstrap, dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     var dropdown = new GijgoDropDown(document.getElementById('dropdown'), {
         *         dataSource: '/Locations/Get',
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'materialicons',
         *         valueField: 'id'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, dropdown -->
         * <select id="dropdown" width="200"></select>
         * <script>
         *     var dropdown = new GijgoDropDown(document.getElementById('dropdown'), {
         *         dataSource: '/Locations/Get',
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         valueField: 'id'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        icons: {
            /** DropDown icon definition.
             * @alias icons.dropdown
             * @type String
             * @default '<i class="gj-icon arrow-dropdown" />'
             * @example Custom.Material.Icon <!-- materialicons, dropdown -->
             * <select id="dropdown"></select>
             * <script>
             *     var dropdown = new GijgoDropDown(document.getElementById('dropdown'), {
             *         dataSource: '/Locations/Get',
             *         valueField: 'id',
             *         width: 200,
             *         icons: { 
             *             dropup: '<i class="material-icons">keyboard_arrow_up</i>',
             *             dropdown: '<i class="material-icons">keyboard_arrow_down</i>'
             *         }
             *     });
             * </script>
             * @example Custom.Glyphicon.Icon <!-- bootstrap, dropdown -->
             * <select id="dropdown"></select>
             * <script>
             *     var dropdown = new GijgoDropDown(document.getElementById('dropdown'), {
             *         dataSource: '/Locations/Get',
             *         valueField: 'id',
             *         uiLibrary: 'bootstrap',
             *         width: 200,
             *         icons: { 
             *             dropup: '<span class="glyphicon glyphicon-triangle-top" />',
             *             dropdown: '<span class="glyphicon glyphicon-triangle-bottom" />'
             *         }
             *     });
             * </script>
             */
            dropdown: '<i class="gj-icon arrow-dropdown" />',

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
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- dropdown, materialicons -->
     * <select id="dropdown" width="200">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     new GijgoDropDown(document.getElementById('dropdown'), {
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Event fires after the loading of the data in the dropdown.
     * @event dataBound
     * @param {object} e - event data
     * @example sample <!-- dropdown, materialicons -->
     * <select id="dropdown" width="200">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     new GijgoDropDown(document.getElementById('dropdown'), {
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    dataBound: function (el) {
        return el.dispatchEvent(new Event('dataBound'));;
    }
};

GijgoDropDown = function (element, jsConfig) {
    let self = this,
        methods = gj.dropdown.methods;

    self.type = 'dropdown';
    self.element = element;

    /** Gets or sets the value of the DropDown.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="alert(dropdown.value())">Get Value</button>
     * <hr/>
     * <select id="dropdown" width="200">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var dropdown = new GijgoDropDown(document.getElementById('dropdown'));
     * </script>
     * @example Set <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="dropdown.value('3')">Set Value</button>
     * <hr/>
     * <select id="dropdown" width="200">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var dropdown = new GijgoDropDown(document.getElementById('dropdown'));
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
     * <select id="dropdown" width="200">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var dropdown = new GijgoDropDown(document.getElementById('dropdown'));
     * </script>
     */
    self.destroy = function () {
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
/* global window alert jQuery gj */
/**
  * @widget DatePicker
  * @plugin Base
  */
gj.datepicker = {
    plugins: {}
};

gj.datepicker.config = {
    base: {
        /** Whether to display dates in other months at the start or end of the current month.
         * @additionalinfo Set to true by default for Bootstrap.
         * @type Boolean
         * @default false
         * @example JS.True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        showOtherMonths: true
         *    });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), {
         *         showOtherMonths: false
         *     });
         * </script>
         */
        showOtherMonths: false,

        /** Whether days in other months shown before or after the current month are selectable.
         * This only applies if the showOtherMonths option is set to true.
         * @type Boolean
         * @default true
         * @example JS.True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        showOtherMonths: true,
         *        selectOtherMonths: true
         *    });
         * </script>
         * @example JS.False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), {
         *        showOtherMonths: true,
         *        selectOtherMonths: false
         *     });
         * </script>
         */
        selectOtherMonths: true,

        /** The width of the datepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- datepicker -->
         * <input id="datepicker" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { width: 312 });
         * </script>
         * @example HTML.Config <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'));
         * </script>
         */
        width: undefined,

        /** The minimum selectable date. When not set, there is no minimum.
         * @additionalinfo If the minDate is set by string, then the date in the string needs to follow the format specified by the 'format' configuration option.
         * @type Date|String|Function
         * @default undefined
         * @example JS.Today <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        minDate: today
         *    });
         * </script>
         * @example Yesterday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), {
         *        minDate: function() {
         *            var date = new Date();
         *            date.setDate(date.getDate()-1);
         *            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
         *        }
         *     });
         * </script>
         * @example Bootstrap <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), {
         *        format: 'yyyy-mm-dd',
         *        value: '2023-01-15',
         *        minDate: '2023-01-12',
         *        uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), {
         *        value: '02/15/2023',
         *        minDate: '02/12/2023',
         *        uiLibrary: 'bootstrap4'
         *     });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), {
         *        value: '12/15/2022',
         *        minDate: '12/12/2022',
         *        uiLibrary: 'bootstrap5'
         *     });
         * </script>
         */
        minDate: undefined,

        /** The maximum selectable date. When not set, there is no maximum
         * @type Date|String|Function
         * @default undefined
         * @example JS.Today <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        maxDate: today
         *    });
         * </script>
         * @example Tomorrow <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), { 
         *        maxDate: function() {
         *            var date = new Date();
         *            date.setDate(date.getDate()+1);
         *            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
         *        }
         *     });
         * </script>
         */
        maxDate: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
         * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
         * <b>ddd</b> - Day of the week as a three-letter abbreviation.<br/>
         * <b>dddd</b> - Day of the week as its full name.<br/>
         * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
         * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
         * <b>mmm</b> - Month as a three-letter abbreviation.<br/>
         * <b>mmmm</b> - Month as its full name.<br/>
         * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
         * <b>yyyy</b> - Year represented by four digits.<br/>
         * @type String
         * @default 'mm/dd/yyyy'
         * @example Sample <!-- datepicker -->
         * <input id="datepicker" value="2023-25-07" width="312" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), { format: 'yyyy-dd-mm' });
         * </script>
         * @example Short.Month.Format <!-- datepicker -->
         * <input id="datepicker" value="10 Oct 2023" width="312" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), { format: 'dd mmm yyyy' });
         * </script>
         * @example Long.Month.Format <!-- datepicker -->
         * <input id="datepicker" value="10 October 2023" width="312" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), { format: 'dd mmmm yyyy' });
         * </script>
         */
        format: 'mm/dd/yyyy',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4|bootstrap5)
         * @default materialdesign
         * @example MaterialDesign <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), { uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4.Material.Icons <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), { uiLibrary: 'bootstrap4' });
         * </script>
         * @example Bootstrap.4.FontAwesome <!-- fontawesome, bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), { uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome' });
         * </script>
         * @example Bootstrap.5.Material.Icons <!-- bootstrap5, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), { uiLibrary: 'bootstrap5' });
         * </script>
         * @example Bootstrap.5.FontAwesome <!-- fontawesome, bootstrap5, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), { uiLibrary: 'bootstrap5', iconsLibrary: 'fontawesome' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Bootstrap.Font.Awesome <!-- bootstrap, fontawesome, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), {
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), {
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         * @example Bootstrap.5.Font.Awesome <!-- bootstrap5, fontawesome, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'), {
         *         uiLibrary: 'bootstrap5',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        /** The initial datepicker value.
         * @type String
         * @default undefined
         * @example Javascript <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        value: '01/01/2023'
         *    });
         * </script>
         * @example HTML <!-- datepicker -->
         * <input id="datepicker" width="312" value="01/01/2023" />
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker'));
         * </script>
         */
        value: undefined,

        /** Day of the week start. 0 (Sunday) to 6 (Saturday)
         * @type Number
         * @default 0
         * @example Monday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        weekStartDay: 1
         *    });
         * </script>
         * @example Saturday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        weekStartDay: 6
         *    });
         * </script>
         */
        weekStartDay: 0,

        /** An array or function that will be used to determine which dates to be disabled for selection by the widget.
         * @type Array|Function
         * @default undefined
         * @example Array <!-- jquery, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        value: '11/10/2023',
         *        disableDates: [new Date(2023,10,11), '11/12/2023']
         *    });
         * </script>
         * @example Function <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        value: '11/11/2023',
         *        disableDates:  function (date) {
         *            var disabled = [10,15,20,25];
         *            if (disabled.indexOf(date.getDate()) == -1 ) {
         *                return true;
         *            } else {
         *                return false;
         *            }
         *        }
         *    });
         * </script>
         */
        disableDates: undefined,

        /** An array that will be used to determine which days of week to be disabled for selection by the widget.
         * The array needs to contains only numbers where 0 is Sunday, 1 is Monday and etc.
         * @type Array
         * @default undefined
         * @example Saturday.Sunday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        disableDaysOfWeek: [0, 6]
         *    });
         * </script>
         */
        disableDaysOfWeek: undefined,

        /** Whether to display week number in year on the left side of the calendar.
         * @type Boolean
         * @default false
         * @example Material.Design <!-- datepicker -->
         * <input id="datepicker" width="356" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        calendarWeeks: true,
         *        modal: true,
         *        footer: true
         *    });
         * </script>
         * @example Bootstrap <!-- datepicker, bootstrap -->
         * <input id="datepicker" width="234" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { calendarWeeks: true, uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { calendarWeeks: true, uiLibrary: 'bootstrap4' });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { calendarWeeks: true, uiLibrary: 'bootstrap5' });
         * </script>
         */
        calendarWeeks: false,

        /** Whether to enable keyboard navigation.
         * @type Boolean
         * @default true
         * @example Material.Design <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        keyboardNavigation: true
         *    });
         * </script>
         * @example Material.Design.Modal <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { keyboardNavigation: true, modal: true, header: true, footer: true });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        uiLibrary: 'bootstrap4',
         *        keyboardNavigation: true,
         *        showOtherMonths: true
         *    });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        uiLibrary: 'bootstrap5',
         *        keyboardNavigation: true,
         *        showOtherMonths: true
         *    });
         * </script>
         */
        keyboardNavigation: true,

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'de-de',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Bulgarian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'bg-bg',
         *        format: 'dd mmm yyyy',
         *        weekStartDay: 1
         *    });
         * </script>
         * @example French <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'fr-fr',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Brazil <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'pt-br',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Russian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'ru-ru',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Spanish <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'es-es',
         *        format: 'dd/mm/yyyy'
         *    });
         * </script>
         * @example Italian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'it-it',
         *        format: 'dd/mm/yyyy'
         *    });
         * </script>
         * @example Japanise <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'ja-jp',
         *        format: 'dd mmmm yyyy'
         *    });
         * </script>
         * @example Chinise_Simplified <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'zh-cn',
         *        format: 'dd mmmm yyyy'
         *    });
         * </script>
         * @example Chinise_Traditional <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'zh-tw',
         *        format: 'dd mmmm yyyy'
         *    });
         * </script>
         * @example Latvian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'lv-lv',
         *        format: 'yyyy.dd.mm'
         *    });
         * </script>
         * @example Czech <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'cs-cz',
         *        format: 'dd.mm.yyyy'
         *    });
         * </script>
         * @example Azerbaijani <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'az-az',
         *        format: 'dd.mm.yyyy'
         *    });
         * </script>
         * @example Greek <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'el-gr',
         *        format: 'dd/mm/yyyy'
         *    });
         * </script>
         * @example Hungarian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'hu-hu',
         *        format: 'dd/mm/yyyy'
         *    });
         * </script>
         * @example Dutch <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        locale: 'nl-nl',
         *        format: 'dd/mm/yyyy'
         *    });
         * </script>
         */
        locale: 'en-us',

        icons: {
            /** datepicker icon definition.
             * @alias icons.rightIcon
             * @type String
             * @default '<i class="gj-icon event" />'
             * @example Custom.Material.Icon <!-- materialicons, datepicker -->
             * <input id="datepicker" width="312" />
             * <script>
             *     new GijgoDatePicker(document.getElementById('datepicker'), {
             *         icons: { 
             *             rightIcon: '<i class="material-icons">date_range</i>'
             *         }
             *     });
             * </script>
             * @example Custom.Glyphicon.Icon <!-- bootstrap, datepicker -->
             * <input id="datepicker" width="220" />
             * <script>
             *     new GijgoDatePicker(document.getElementById('datepicker'), {
             *         uiLibrary: 'bootstrap',
             *         icons: {
             *             rightIcon: '<span class="glyphicon glyphicon-chevron-down"></span>'
             *         }
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, materialicons, datepicker -->
             * <input id="datepicker" width="234" />
             * <script>
             *     new GijgoDatePicker(document.getElementById('datepicker'), {
             *         uiLibrary: 'bootstrap4',
             *         icons: {
             *             rightIcon: '<i class="material-icons">date_range</i>'
             *         }
             *     });
             * </script>
             * @example Bootstrap.5 <!-- bootstrap5, materialicons, datepicker -->
             * <input id="datepicker" width="234" />
             * <script>
             *     new GijgoDatePicker(document.getElementById('datepicker'), {
             *         uiLibrary: 'bootstrap5',
             *         icons: {
             *             rightIcon: '<i class="material-icons">date_range</i>'
             *         }
             *     });
             * </script>
             */
            rightIcon: '<i class="gj-icon">event</i>',

            previousMonth: '<i class="gj-icon chevron-left"></i>',
            nextMonth: '<i class="gj-icon chevron-right"></i>'
        },

        fontSize: undefined,

        /** The size of the datepicker input.
         * @type 'small'|'default'|'large'
         * @default 'default'
         * @example Bootstrap.5 <!-- bootstrap5, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="234" value="03/20/2023" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="234" value="03/20/2023" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="234" value="03/20/2023" /></p>
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker-small'), { uiLibrary: 'bootstrap5', size: 'small' });
         *     new GijgoDatePicker(document.getElementById('datepicker-default'), { uiLibrary: 'bootstrap5', size: 'default' });
         *     new GijgoDatePicker(document.getElementById('datepicker-large'), { uiLibrary: 'bootstrap5', size: 'large' });
         * </script>
         * @example Bootstrap.5.Font.Awesome <!-- bootstrap5, fontawesome, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="234" value="03/20/2023" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="234" value="03/20/2023" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="234" value="03/20/2023" /></p>
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker-small'), { uiLibrary: 'bootstrap5', iconsLibrary: 'fontawesome', size: 'small' });
         *     new GijgoDatePicker(document.getElementById('datepicker-default'), { uiLibrary: 'bootstrap5', iconsLibrary: 'fontawesome', size: 'default' });
         *     new GijgoDatePicker(document.getElementById('datepicker-large'), { uiLibrary: 'bootstrap5', iconsLibrary: 'fontawesome', size: 'large' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="234" value="03/20/2023" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="234" value="03/20/2023" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="234" value="03/20/2023" /></p>
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker-small'), { uiLibrary: 'bootstrap4', size: 'small' });
         *     new GijgoDatePicker(document.getElementById('datepicker-default'), { uiLibrary: 'bootstrap4', size: 'default' });
         *     new GijgoDatePicker(document.getElementById('datepicker-large'), { uiLibrary: 'bootstrap4', size: 'large' });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="234" value="03/20/2023" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="234" value="03/20/2023" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="234" value="03/20/2023" /></p>
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker-small'), { uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'small' });
         *     new GijgoDatePicker(document.getElementById('datepicker-default'), { uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'default' });
         *     new GijgoDatePicker(document.getElementById('datepicker-large'), { uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'large' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="220" value="03/20/2023" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="220" value="03/20/2023" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="220" value="03/20/2023" /></p>
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker-small'), { uiLibrary: 'bootstrap', size: 'small' });
         *     new GijgoDatePicker(document.getElementById('datepicker-default'), { uiLibrary: 'bootstrap', size: 'default' });
         *     new GijgoDatePicker(document.getElementById('datepicker-large'), { uiLibrary: 'bootstrap', size: 'large' });
         * </script>
         * @example Material.Design <!-- datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="276" value="03/20/2023" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="276" value="03/20/2023" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="276" value="03/20/2023" /></p>
         * <script>
         *     new GijgoDatePicker(document.getElementById('datepicker-small'), { size: 'small' });
         *     new GijgoDatePicker(document.getElementById('datepicker-default'), { size: 'default' });
         *     new GijgoDatePicker(document.getElementById('datepicker-large'), { size: 'large' });
         * </script>
         */
        size: 'default',

        /** If set to true, the datepicker will have modal behavior.
         * @type Boolean
         * @default false
         * @example Material.Design <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { modal: true });
         * </script>
         * @example Bootstrap <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        uiLibrary: 'bootstrap',
         *        modal: true,
         *        header: true,
         *        footer: true
         *    });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        uiLibrary: 'bootstrap4',
         *        modal: true,
         *        header: true,
         *        footer: true
         *    });
         * @example Bootstrap.5 <!-- bootstrap5, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), {
         *        uiLibrary: 'bootstrap5',
         *        modal: true,
         *        header: true,
         *        footer: true
         *    });
         * </script>
         */
        modal: false,

        /** If set to true, add header to the datepicker.
         * @type Boolean
         * @default false
         * @example True <!-- picker, datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { header: true, modal: true, footer: true });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { header: false });
         * </script>
         */
        header: false,

        /** If set to true, add footer with ok and cancel buttons to the datepicker.
         * @type Boolean
         * @default false
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { footer: true, modal: true, header: true });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { footer: false });
         * </script>
         */
        footer: false,

        /** If set to true, show datepicker on input focus.
         * @type Boolean
         * @default true
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { showOnFocus: true, showRightIcon: false });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { showOnFocus: false });
         * </script>
         */
        showOnFocus: true,

        /** If set to true, show datepicker icon on the right side of the input.
         * @type Boolean
         * @default true
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { showOnFocus: true, showRightIcon: false });
         * </script>
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    new GijgoDatePicker(document.getElementById('datepicker'), { showRightIcon: true });
         * </script>
         */
        showRightIcon: true,

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-datepicker gj-datepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            calendar: 'gj-picker gj-picker-md datepicker gj-unselectable',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        showOtherMonths: true
    },

    bootstrap5: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-outline-secondary'
        },
        showOtherMonths: true
    },

    fontawesome: {
        icons: {
            rightIcon: '<i class="fa fa-calendar" aria-hidden="true"></i>',
            previousMonth: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            nextMonth: '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            rightIcon: '<span class="glyphicon glyphicon-calendar"></span>',
            previousMonth: '<span class="glyphicon glyphicon-chevron-left"></span>',
            nextMonth: '<span class="glyphicon glyphicon-chevron-right"></span>'
        }
    }
};

gj.datepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);
        this.element.setAttribute('data-gj-datepicker', 'true');
        gj.datepicker.methods.initialize(this, this.getConfig());
        return this;
    },

    initialize: function (picker, data) {
        var wrapper, rightIcon, calendar;

        if (picker.element.parentElement.attributes["data-gj-role"] !== 'wrapper') {
            wrapper = document.createElement('div');
            wrapper.setAttribute('data-gj-role', 'wrapper');
            picker.element.parentNode.insertBefore(wrapper, picker.element);
            wrapper.appendChild(picker.element);
        } else {
            wrapper = picker.element.parentElement;
        }

        gj.core.addClasses(wrapper, data.style.wrapper);

        if (data.width) {
            gj.core.css(wrapper, 'width', data.width);
        }

        picker.element.value = data.value || '';
        gj.core.addClasses(picker.element, data.style.input);
        wrapper.setAttribute('data-gj-role', 'input');

        if (data.fontSize) {
            picker.element.style.fontSize = data.fontSize;
        }
        
        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4' || data.uiLibrary === 'bootstrap5') {
            if (data.size === 'small') {
                wrapper.classList.add('input-group-sm');
                picker.element.classList.add('form-control-sm');
            } else if (data.size === 'large') {
                wrapper.classList.add('input-group-lg');
                picker.element.classList.add('form-control-lg');
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
            } else if (data.uiLibrary === 'bootstrap5') {
                rightIcon = document.createElement('button');
                rightIcon.classList.add('btn', 'btn-outline-secondary', 'border-left-0');
                rightIcon.innerHTML = data.icons.rightIcon;
            } else {
                rightIcon = gj.core.createElement(data.icons.rightIcon);
            }
            rightIcon.setAttribute('data-gj-role', 'right-icon');
            gj.core.on(rightIcon, 'click', function (e) {
                var calendar = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');
                if (window.getComputedStyle(calendar).display === 'none') {
                    gj.datepicker.methods.open(picker, data);
                } else {
                    gj.datepicker.methods.close(picker);
                }
            });
            wrapper.appendChild(rightIcon);
        }

        if (data.showOnFocus) {
            gj.core.on(picker.element, 'focus', function () {
                gj.datepicker.methods.open(picker, data);
            });
        }

        calendar = gj.datepicker.methods.createCalendar(picker, data);

        if (data.footer !== true) {
            gj.core.on(picker.element, 'blur', function () {
                picker.timeout = setTimeout(function () {
                    gj.datepicker.methods.close(picker);
                }, 500);
            });
            gj.core.on(calendar, 'mousedown', function () {
                clearTimeout(picker.timeout);
                document.activeElement !== picker.element && picker.element.focus();
                return false;
            });
            gj.core.on(calendar, 'click', function () {
                clearTimeout(picker.timeout);
                //document.activeElement !== picker.element && picker.element.focus(); //breaks datetimepicker
            });
        }

        if (data.keyboardNavigation) {
            gj.core.on(document, 'keydown', gj.datepicker.methods.createKeyDownHandler(picker, calendar, data));
        }
    },

    createCalendar: function (picker, data) {
        var date, body, footer, btnCancel, btnOk, calendar, wrapper;

        calendar = document.createElement('div');
        calendar.setAttribute('data-gj-role', 'picker');
        calendar.setAttribute('type', 'month');
        gj.core.addClasses(calendar, data.style.calendar);
        calendar.setAttribute('data-gj-guid', picker.element.getAttribute('data-gj-guid'));
        
        if (data.fontSize) {
            calendar.style.fontSize = data.fontSize;
        }

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            picker.element.setAttribute('day', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
        }

        calendar.setAttribute('month', date.getMonth());
        calendar.setAttribute('year', date.getFullYear());

        gj.datepicker.methods.renderHeader(picker, calendar, data, date);

        body = document.createElement('div');
        body.setAttribute('data-gj-role', 'body');
        calendar.appendChild(body);

        if (data.footer) {
            footer = document.createElement('div');
            footer.setAttribute('data-gj-role', 'footer');
            gj.core.addClasses(footer, data.style.footer);

            btnCancel = gj.core.createElement('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].cancel + '</button>');
            btnCancel.addEventListener('click', function () { picker.close(); });
            footer.appendChild(btnCancel);

            btnOk = gj.core.createElement('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].ok + '</button>');
            btnOk.addEventListener('click', function () {
                var date, dayArr, dayStr = calendar.getAttribute('selectedDay');
                if (dayStr) {
                    dayArr = dayStr.split('-');
                    date = new Date(dayArr[0], dayArr[1], dayArr[2], calendar.getAttribute('hour') || 0, calendar.getAttribute('minute') || 0);
                    gj.datepicker.methods.change(picker, calendar, data, date);
                } else {
                    picker.close();
                }
            });
            footer.appendChild(btnOk);

            calendar.appendChild(footer);
        }

        calendar.style.display = 'none';
        document.body.appendChild(calendar);

        if (data.modal) {
            wrapper = document.createElement('div');
            wrapper.setAttribute('data-gj-role', 'modal');
            gj.core.addClasses(wrapper, data.style.modal);
            calendar.parentNode.insertBefore(wrapper, calendar);
            wrapper.appendChild(calendar);
            gj.core.center(calendar);
        }

        return calendar;
    },

    renderHeader: function (picker, calendar, data, date) {
        var header, dateEl, yearEl;

        if (data.header) {
            header = document.createElement('div');
            header.setAttribute('data-gj-role', 'header');

            yearEl = document.createElement('div');
            yearEl.setAttribute('data-gj-role', 'year');

            yearEl.addEventListener('click', function () {
                gj.datepicker.methods.renderDecade(picker, calendar, data);
                yearEl.classList.add('selected');
                dateEl.classList.remove('selected');
            });
            yearEl.innerHTML = gj.core.formatDate(date, 'yyyy', data.locale);
            header.appendChild(yearEl);

            dateEl = document.createElement('div');
            dateEl.setAttribute('data-gj-role', 'date');
            dateEl.classList.add('selected');
            dateEl.addEventListener('click', function () {
                gj.datepicker.methods.renderMonth(picker, calendar, data);
                dateEl.classList.add('selected');
                yearEl.classList.remove('selected');
            });
            dateEl.innerHTML = gj.core.formatDate(date, 'ddd, mmm dd', data.locale);
            header.appendChild(dateEl);
            calendar.appendChild(header);
        }
    },

    updateHeader: function (calendar, data, date) {
        var yearEl, dateEl, hour, minute,
            header = calendar.querySelector('[data-gj-role="header"]');

        if (header) {
            yearEl = header.querySelector('[data-gj-role="year"]');
            if (yearEl) {
                yearEl.classList.remove('selected');
                yearEl.innerHTML = gj.core.formatDate(date, 'yyyy', data.locale);
            }

            dateEl = header.querySelector('[data-gj-role="date"]');
            dateEl.classList.add('selected');
            dateEl.innerHTML = gj.core.formatDate(date, 'ddd, mmm dd', data.locale);

            // update hours and minutes for datetimepickers
            hour = header.querySelector('[data-gj-role="hour"]');
            if (hour) {
                hour.classList.remove('selected');
                hour.innerHTML = gj.core.formatDate(date, 'HH', data.locale);
            }

            minute = header.querySelector('[data-gj-role="minute"]');
            if (minute) {
                minute.classList.remove('selected');
                minute.innerHTML = gj.core.formatDate(date, 'MM', data.locale);
            }
        }
    },

    createNavigation: function (picker, body, table, data) {
        var navigator, row, prevIcon, period, nextIcon, th, thead = document.createElement('thead');

        navigator = document.createElement('div');
        navigator.setAttribute('data-gj-role', 'navigator');

        prevIcon = document.createElement('div');
        prevIcon.innerHTML = data.icons.previousMonth;
        prevIcon.addEventListener('click', gj.datepicker.methods.prev(picker, data));
        navigator.appendChild(prevIcon);

        period = document.createElement('div');
        period.setAttribute('data-gj-role', 'period');
        period.addEventListener('click', gj.datepicker.methods.changePeriod(picker, data));
        navigator.appendChild(period);

        nextIcon = document.createElement('div');
        nextIcon.innerHTML = data.icons.nextMonth;
        nextIcon.addEventListener('click', gj.datepicker.methods.next(picker, data));
        navigator.appendChild(nextIcon);

        body.append(navigator);

        row = document.createElement('tr');
        row.setAttribute('data-gj-role', 'week-days');
        
        if (data.calendarWeeks) {
            th = document.createElement('th');
            th.innerHTML = '<div>&nbsp;</div>';
            row.appendChild(th);
        }
        for (i = data.weekStartDay; i < gj.core.messages[data.locale].weekDaysMin.length; i++) {
            th = document.createElement('th');
            th.innerHTML = '<div>' + gj.core.messages[data.locale].weekDaysMin[i] + '</div>';
            row.appendChild(th);
        }
        for (i = 0; i < data.weekStartDay; i++) {
            th = document.createElement('th');
            th.innerHTML = '<div>' + gj.core.messages[data.locale].weekDaysMin[i] + '</div>';
            row.appendChild(th);
        }
        thead.appendChild(row);

        table.appendChild(thead);
    },

    getDaysInMonth: function (year) {
        var result = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (year % 4 == 0 && year != 1900) {
            result[1] = 29;
        }
        return result;
    },

    renderMonth: function (picker, calendar, data) {
        var weekDay, selectedDay, day, month, year, total, daysInMonth, firstDayPosition, i, now, prevMonth, nextMonth, cell, dayEl, date,
            body = calendar.querySelector('[data-gj-role="body"]'),
            table = document.createElement('table'),
            tbody = document.createElement('tbody'),
            period = gj.core.messages[data.locale].titleFormat;
        
        body.innerHTML = '';
        gj.datepicker.methods.createNavigation(picker, body, table, data);
        
        month = parseInt(calendar.getAttribute('month'), 10);
        year = parseInt(calendar.getAttribute('year'), 10);

        calendar.setAttribute('type', 'month');
        period = period.replace('mmmm', gj.core.messages[data.locale].monthNames[month]).replace('yyyy', year);
        calendar.querySelector('div[data-gj-role="period"]').innerText = period;
        daysInMonth = gj.datepicker.methods.getDaysInMonth(year);
        total = daysInMonth[month];

        firstDayPosition = (new Date(year, month, 1).getDay() + 7 - data.weekStartDay) % 7;

        weekDay = 0;
        row = document.createElement('tr');
        prevMonth = gj.datepicker.methods.getPrevMonth(month, year);
        for (i = 1; i <= firstDayPosition; i++) {
            day = (daysInMonth[prevMonth.month] - firstDayPosition + i);
            date = new Date(prevMonth.year, prevMonth.month, day);
            if (data.calendarWeeks && i === 1) {
                cell = document.createElement('td');
                cell.classList.add('calendar-week');
                cell.innerHTML = '<div>' + gj.datepicker.methods.getWeekNumber(date) + '</div>';
                row.appendChild(cell);
            }
            cell = document.createElement('td');
            cell.classList.add('other-month');
            if (data.showOtherMonths) {
                dayEl = document.createElement('div');
                dayEl.innerHTML = day;
                cell.appendChild(dayEl);
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    cell.classList.add('gj-cursor-pointer');
                    cell.setAttribute('day', day);
                    cell.setAttribute('month', prevMonth.month);
                    cell.setAttribute('year', prevMonth.year);
                    dayEl.addEventListener('click', gj.datepicker.methods.dayClickHandler(picker, calendar, data, date));
                    dayEl.addEventListener('mousedown', function (e) { e.stopPropagation(); });
                } else {
                    cell.classList.add('disabled');
                }
            }
            row.appendChild(cell);
            weekDay++;
        }
        if (i > 1) {
            tbody.appendChild(row);
        }

        now = new Date();
        for (i = 1; i <= total; i++) {
            date = new Date(year, month, i);
            if (weekDay == 0) {
                row = document.createElement('tr');
                if (data.calendarWeeks) {
                    cell = document.createElement('td');
                    cell.classList.add('calendar-week');
                    cell.innerHTML = '<div>' + gj.datepicker.methods.getWeekNumber(date) + '</div>';
                    row.appendChild(cell);
                }
            }
            cell = document.createElement('td');
            cell.setAttribute('day', i);
            cell.setAttribute('month', month);
            cell.setAttribute('year', year);
            if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
                cell.classList.add('today');
            } else {
                cell.classList.add('current-month');
            }
            dayEl = document.createElement('div');
            dayEl.innerText = i;
            if (gj.datepicker.methods.isSelectable(data, date)) {
                cell.classList.add('gj-cursor-pointer');
                dayEl.addEventListener('click', gj.datepicker.methods.dayClickHandler(picker, calendar, data, date));
                dayEl.addEventListener('mousedown', function (e) { e.stopPropagation() });
            } else {
                cell.classList.add('disabled');
            }
            cell.appendChild(dayEl);
            row.appendChild(cell);
            weekDay++;
            if (weekDay == 7) {
                tbody.appendChild(row);
                weekDay = 0;
            }
        }

        nextMonth = gj.datepicker.methods.getNextMonth(month, year);
        for (i = 1; weekDay != 0; i++) {
            date = new Date(nextMonth.year, nextMonth.month, i);
            cell = document.createElement('td');
            cell.classList.add('other-month');
            if (data.showOtherMonths) {
                dayEl = document.createElement('div');
                dayEl.innerText = i;
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    cell.classList.add('gj-cursor-pointer');
                    cell.setAttribute('day', i);
                    cell.setAttribute('month', nextMonth.month);
                    cell.setAttribute('year', nextMonth.year);                    
                    dayEl.addEventListener('click', gj.datepicker.methods.dayClickHandler(picker, calendar, data, date));
                    dayEl.addEventListener('mousedown', function (e) { e.stopPropagation() });
                } else {
                    cell.classList.add('disabled');
                }
                cell.appendChild(dayEl);
            }
            row.appendChild(cell);
            weekDay++;
            if (weekDay == 7) {
                tbody.appendChild(row);
                weekDay = 0;
            }
        }

        table.appendChild(tbody);
        body.appendChild(table);

        if (calendar.getAttribute('selectedDay')) {
            selectedDay = calendar.getAttribute('selectedDay').split('-');
            date = new Date(selectedDay[0], selectedDay[1], selectedDay[2], calendar.getAttribute('hour') || 0, calendar.getAttribute('minute') || 0);
            cell = calendar.querySelector('tbody td[day="' + selectedDay[2] + '"][month="' + selectedDay[1] + '"]');
            if (cell) {
                cell.classList.add('selected');
            }
            gj.datepicker.methods.updateHeader(calendar, data, date);
        }
    },

    renderYear: function (picker, calendar, data) {
        var year, i, m, row, month,
            table = calendar.querySelector('[data-gj-role="body"] table'),
            tbody = table.querySelector('tbody');
        
        table.querySelector('thead').style.display = 'none';

        year = parseInt(calendar.getAttribute('year'), 10);

        calendar.setAttribute('type', 'year');
        calendar.querySelector('div[data-gj-role="period"]').innerText = year;

        tbody.innerHTML = '';

        for (i = 0; i < 3; i++) {
            row = document.createElement('tr');
            for (m = (i * 4); m <= (i * 4) + 3; m++) {
                month = document.createElement('div');
                month.innerHTML = gj.core.messages[data.locale].monthShortNames[m];
                month.addEventListener('click', gj.datepicker.methods.selectMonth(picker, calendar, data, m));
                cell = document.createElement('td');
                cell.appendChild(month);
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    },

    renderDecade: function (picker, calendar, data) {
        var year, decade, i, y, year,
            table = calendar.querySelector('[data-gj-role="body"] table'),
            tbody = table.querySelector('tbody');
        
        table.querySelector('thead').style.display = 'none';

        year = parseInt(calendar.getAttribute('year'), 10);
        decade = year - (year % 10);

        calendar.setAttribute('type', 'decade');
        calendar.querySelector('div[data-gj-role="period"]').innerText = decade + ' - ' + (decade + 9);

        tbody.innerHTML = '';

        for (i = decade - 1; i <= decade + 10 ; i += 4) {
            row = document.createElement('tr');
            for (y = i; y <= i + 3; y++) {
                year = document.createElement('div');
                year.innerText = y;
                year.addEventListener('click', gj.datepicker.methods.selectYear(picker, calendar, data, y));
                cell = document.createElement('td')
                cell.appendChild(year);
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    },

    renderCentury: function (picker, calendar, data) {
        var year, century, i, d, decade,
            table = calendar.querySelector('[data-gj-role="body"] table'),
            tbody = table.querySelector('tbody');
        
        table.querySelector('thead').style.display = 'none';

        year = parseInt(calendar.getAttribute('year'), 10);
        century = year - (year % 100);

        calendar.setAttribute('type', 'century');
        calendar.querySelector('div[data-gj-role="period"]').innerText = century + ' - ' + (century + 99);

        tbody.innerHTML = '';

        for (i = (century - 10); i < century + 100; i += 40) {
            row = document.createElement('tr');
            for (d = i; d <= i + 30; d += 10) {
                decade = document.createElement('div');
                decade.innerText = d;
                decade.addEventListener('click', gj.datepicker.methods.selectDecade(picker, calendar, data, d));
                cell = document.createElement('td')
                cell.appendChild(decade);
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    },

    getWeekNumber: function (date) {
        var d = new Date(date.valueOf());
        d.setDate(d.getDate() + 6);
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    },

    getMinDate: function (data) {
        var minDate;
        if (data.minDate) {
            if (typeof (data.minDate) === 'string') {
                minDate = gj.core.parseDate(data.minDate, data.format, data.locale);
            } else if (typeof (data.minDate) === 'function') {
                minDate = data.minDate();
                if (typeof minDate === 'string') {
                    minDate = gj.core.parseDate(minDate, data.format, data.locale);
                }
            } else if (typeof data.minDate.getMonth === 'function') {
                minDate = data.minDate;
            }
        }
        return minDate;
    },

    getMaxDate: function (data) {
        var maxDate;
        if (data.maxDate) {
            if (typeof data.maxDate === 'string') {
                maxDate = gj.core.parseDate(data.maxDate, data.format, data.locale);
            } else if (typeof data.maxDate === 'function') {
                maxDate = data.maxDate();
                if (typeof maxDate === 'string') {
                    maxDate = gj.core.parseDate(maxDate, data.format, data.locale);
                }
            } else if (typeof data.maxDate.getMonth === 'function') {
                maxDate = data.maxDate;
            }
        }
        return maxDate;
    },

    isSelectable: function (data, date) {
        var result = true,
            minDate = gj.datepicker.methods.getMinDate(data),
            maxDate = gj.datepicker.methods.getMaxDate(data),
            i;

        if (minDate && date < minDate) {
            result = false;
        } else if (maxDate && date > maxDate) {
            result = false;
        }

        if (result) {
            if (data.disableDates) {
                if (Array.isArray(data.disableDates)) {
                    for (i = 0; i < data.disableDates.length; i++) {
                        if (data.disableDates[i] instanceof Date && data.disableDates[i].getTime() === date.getTime()) {
                            result = false;
                        } else if (typeof data.disableDates[i] === 'string' && gj.core.parseDate(data.disableDates[i], data.format, data.locale).getTime() === date.getTime()) {
                            result = false;
                        }
                    }
                } else if (data.disableDates instanceof Function) {
                    result = data.disableDates(date);
                }
            }
            if (Array.isArray(data.disableDaysOfWeek) && data.disableDaysOfWeek.indexOf(date.getDay()) > -1) {
                result = false;
            }
        }
        return result;
    },

    getPrevMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() - 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    getNextMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() + 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    prev: function (picker, data) {
        return function () {
            var date, month, year, decade, century,
                calendar = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');

            year = parseInt(calendar.getAttribute('year'), 10);
            switch (calendar.getAttribute('type')) {
                case 'month':
                    month = parseInt(calendar.getAttribute('month'), 10);
                    date = gj.datepicker.methods.getPrevMonth(month, year);
                    calendar.setAttribute('month', date.month);
                    calendar.setAttribute('year', date.year);
                    gj.datepicker.methods.renderMonth(picker, calendar, data);
                    break;
                case 'year':
                    calendar.setAttribute('year', year - 1);
                    gj.datepicker.methods.renderYear(picker, calendar, data);
                    break;
                case 'decade':
                    decade = year - (year % 10);
                    calendar.setAttribute('year', decade - 10);
                    gj.datepicker.methods.renderDecade(picker, calendar, data);
                    break;
                case 'century':
                    century = year - (year % 100);
                    calendar.setAttribute('year', century - 100);
                    gj.datepicker.methods.renderCentury(picker, calendar, data);
                    break;
            }
            
            return false;
        }
    },

    next: function (picker, data) {
        return function (e) {
            var date, month, year, decade, century,
                calendar = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');

            year = parseInt(calendar.getAttribute('year'), 10);
            switch (calendar.getAttribute('type')) {
                case 'month':
                    month = parseInt(calendar.getAttribute('month'), 10);
                    date = gj.datepicker.methods.getNextMonth(month, year);
                    calendar.setAttribute('month', date.month);
                    calendar.setAttribute('year', date.year);
                    gj.datepicker.methods.renderMonth(picker, calendar, data);
                    break;
                case 'year':
                    calendar.setAttribute('year', year + 1);
                    gj.datepicker.methods.renderYear(picker, calendar, data);
                    break;
                case 'decade':
                    decade = year - (year % 10);
                    calendar.setAttribute('year', decade + 10);
                    gj.datepicker.methods.renderDecade(picker, calendar, data);
                    break;
                case 'century':
                    century = year - (year % 100);
                    calendar.setAttribute('year', century + 100);
                    gj.datepicker.methods.renderCentury(picker, calendar, data);
                    break;
            }

            return false;
        };
    },

    changePeriod: function (picker, data) {
        return function (e) {
            var calendar = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');

            switch (calendar.getAttribute('type')) {
                case 'month':
                    gj.datepicker.methods.renderYear(picker, calendar, data);
                    break;
                case 'year':
                    gj.datepicker.methods.renderDecade(picker, calendar, data);
                    break;
                case 'decade':
                    gj.datepicker.methods.renderCentury(picker, calendar, data);
                    break;
            }
        };
    },

    dayClickHandler: function (picker, calendar, data, date) {
        return function (e) {
            e && e.stopPropagation();
            gj.datepicker.methods.selectDay(picker, calendar, data, date);
            gj.datepicker.events.select(picker.element, 'day');
            if (data.footer !== true && data.autoClose !== false) {
                gj.datepicker.methods.change(picker, calendar, data, date);
            }
            return picker;
        };
    },

    change: function (picker, calendar, data, date) {
        var day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear(),
            value = gj.core.formatDate(date, data.format, data.locale);
        calendar.setAttribute('month', month);
        calendar.setAttribute('year', year);
        picker.element.value = value;
        gj.datepicker.events.change(picker.element);
        if (window.getComputedStyle(calendar).display !== 'none') {
            gj.datepicker.methods.close(picker);
        }
    },

    selectDay: function (picker, calendar, data, date) {
        var cell, day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();
        calendar.setAttribute('selectedDay', year + '-' + month + '-' + day);
        [].forEach.call(calendar.querySelectorAll('tbody td'), function (el) {
            el.classList.remove('selected');
        });
        cell = calendar.querySelector('tbody td[day="' + day + '"][month="' + month + '"]');
        if (cell) {
            cell.classList.add('selected');
        }
        gj.datepicker.methods.updateHeader(calendar, data, date);
    },

    selectMonth: function (picker, calendar, data, month) {
        return function (e) {
            calendar.setAttribute('month', month);
            gj.datepicker.methods.renderMonth(picker, calendar, data);
            gj.datepicker.events.select(picker.element, 'month');
        };
    },

    selectYear: function (picker, calendar, data, year) {
        return function (e) {
            calendar.setAttribute('year', year);
            gj.datepicker.methods.renderYear(picker, calendar, data);
            gj.datepicker.events.select(picker.element, 'year');
        };
    },

    selectDecade: function (picker, calendar, data, year) {
        return function (e) {
            calendar.setAttribute('year', year);
            gj.datepicker.methods.renderDecade(picker, calendar, data);
            gj.datepicker.events.select(picker.element, 'decade');
        };
    },

    open: function (picker, data) {
        var date,
            calendar = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');

        if (window.getComputedStyle(calendar).display === 'none') {
            if (picker.element.value) {
                picker.value(picker.element.value);
            } else {
                date = new Date();
                calendar.setAttribute('month', date.getMonth());
                calendar.setAttribute('year', date.getFullYear());
            }

            switch (calendar.getAttribute('type')) {
                case 'year':
                    gj.datepicker.methods.renderYear(picker, calendar, data);
                    break;
                case 'decade':
                    gj.datepicker.methods.renderDecade(picker, calendar, data);
                    break;
                case 'century':
                    gj.datepicker.methods.renderCentury(picker, calendar, data);
                    break;
                default:
                    gj.datepicker.methods.renderMonth(picker, calendar, data);
                    break;
            }

            calendar.style.display = 'block';
            if (data.modal) {
                calendar.parentElement.style.display = 'block';
                gj.core.center(calendar);
            } else {
                gj.core.setChildPosition(picker.element, calendar);
                document.activeElement !== picker.element && picker.element.focus();
            }
            clearTimeout(picker.timeout);
            gj.datepicker.events.open(picker.element);
        }
    },

    close: function (picker) {
        var calendar = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');
        if (window.getComputedStyle(calendar).display !== 'none') {
            calendar.style.display = 'none';
            if (calendar.parentElement.getAttribute('data-gj-role') === 'modal') {
                calendar.parentElement.style.display = 'none';
            }
            gj.datepicker.events.close(picker.element);
        }
    },

    createKeyDownHandler: function (picker, calendar, data) {
        return function (e) {
            var activeCell;
            e = e || window.event;
            if (window.getComputedStyle(calendar).display !== 'none') {
                activeCell = gj.datepicker.methods.getActiveCell(calendar);
                gj.datepicker.methods.activateNextElement(picker, calendar, data, e.keyCode, activeCell);
            }
        };
    },

    activateNextElement: function (picker, calendar, data, keyCode, cell) {
        var day, month, year, index, newEl;

        if (keyCode == '38') { // up
            index = Array.prototype.slice.call(cell.parentElement.children).indexOf(cell);
            if (cell.parentElement.previousSibling) {
                newEl = cell.parentElement.previousSibling.children[index];
            }
            if (!newEl || !newEl.hasAttribute('day')) {
                gj.datepicker.methods.prev(picker, data)();
                nodes = calendar.querySelectorAll('tbody tr');
                newEl = nodes[nodes.length - 1].querySelectorAll('td')[index];
            }
            gj.datepicker.methods.selectElement(picker, calendar, data, keyCode, cell, newEl);
        } else if (keyCode == '40') { // down
            index = Array.prototype.slice.call(cell.parentElement.children).indexOf(cell);
            if (cell.parentElement.nextSibling) {
                newEl = cell.parentElement.nextSibling.children[index];
            }
            if (!newEl || !newEl.hasAttribute('day')) {
                gj.datepicker.methods.next(picker, data)();
                newEl = calendar.querySelector('tbody tr').querySelectorAll('td')[index];
            }
            gj.datepicker.methods.selectElement(picker, calendar, data, keyCode, cell, newEl);
        } else if (keyCode == '37') { // left
            newEl = cell.previousSibling;
            if (!newEl && cell.parentElement.previousSibling && cell.parentElement.previousSibling.children[6].hasAttribute('day')) { // Go To the previous row/week
                newEl = cell.parentElement.previousSibling.children[6];
            }
            if (!newEl) {
                gj.datepicker.methods.prev(picker, data)();
                month = parseInt(calendar.getAttribute('month'), 10);
                year = parseInt(calendar.getAttribute('year'), 10);
                day = data.showOtherMonths ? parseInt(cell.getAttribute('day'), 10) - 1 : gj.datepicker.methods.getDaysInMonth(year)[month];
                newEl = calendar.querySelector('tbody tr td[day="' + day + '"]');
            }
            gj.datepicker.methods.selectElement(picker, calendar, data, keyCode, cell, newEl);
        } else if (keyCode == '39') { // right
            newEl = cell.nextSibling;
            if (!newEl && cell.parentElement.nextSibling && cell.parentElement.nextSibling.children[0].hasAttribute('day')) { // Go To the next row/week
                newEl = cell.parentElement.nextSibling.children[0];
            }
            if (!newEl) { // Go To the next month
                gj.datepicker.methods.next(picker, data)();
                day = data.showOtherMonths ? parseInt(cell.getAttribute('day'), 10) + 1 : 1;
                newEl = calendar.querySelector('tbody tr td[day="' + day + '"]');
            }
            gj.datepicker.methods.selectElement(picker, calendar, data, keyCode, cell, newEl);
        } else if (keyCode == '13') { // enter
            day = parseInt(cell.getAttribute('day'), 10);
            month = parseInt(cell.getAttribute('month'), 10);
            year = parseInt(cell.getAttribute('year'), 10);
            gj.datepicker.methods.dayClickHandler(picker, calendar, data, new Date(year, month, day))();
        } else if (keyCode == '27') { // esc
            picker.close();
        }
    },

    selectElement: function (picker, calendar, data, keyCode, cell, newEl) {
        if (newEl) {
            if (newEl.classList.contains('disabled') || !newEl.hasAttribute('day')) {
                cell.classList.remove('focused');
                gj.datepicker.methods.activateNextElement(picker, calendar, data, keyCode, newEl);
            } else {
                newEl.classList.add('focused');
                cell.classList.remove('focused');
            }
        }
    },

    getActiveCell: function (calendar) {
        var cell = calendar.querySelector('td[day].focused');
        if (!cell) {
            cell = calendar.querySelector('td[day].selected');
            if (!cell) {
                cell = calendar.querySelector('td[day].today');
                if (!cell) {
                    cell = calendar.querySelector('td[day]:not(.disabled)');
                }
            }
        }
        return cell;
    },

    value: function (picker, value) {
        var calendar, date, data = picker.getConfig();
        if (typeof (value) === "undefined") {
            return picker.element.value;
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date && date.getTime()) {
                calendar = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');
                gj.datepicker.methods.dayClickHandler(picker, calendar, data, date)();
            } else {
                picker.element.value = '';
            }
            return picker;
        }
    },

    destroy: function (picker) {
        var data = picker.getConfig(), calendar;
        if (data) {
            picker.removeConfig();
            picker.off();

            calendar = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');
            if (calendar.parentElement.getAttribute('data-gj-role') === 'modal') {
                calendar.parentElement.outerHTML = calendar.parentElement.innerHTML;
            }
            calendar = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');
            calendar.remove();

            picker.element.parentElement.removeChild(picker.element.parentElement.querySelector('[data-gj-role="right-icon"]'));
            picker.element.removeAttribute('data-gj-type');
            picker.element.removeAttribute('data-gj-guid');
            picker.element.removeAttribute('data-gj-datepicker');
            picker.element.removeAttribute('class');
            picker.element.parentElement.outerHTML = picker.element.parentElement.innerHTML;
        }
        return picker;
    }
};

gj.datepicker.events = {
    /**
     * Triggered when the datepicker value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <script>
     *     new GijgoDatePicker(document.getElementById('datepicker'), {
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Triggered when new value is selected inside the picker.
     *
     * @event select
     * @param {object} e - event data
     * @param {string} type - The type of the selection. The options are day, month, year or decade.
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <p>Click on the month name in order to select another month.</p>
     * <script>
     *     new GijgoDatePicker(document.getElementById('datepicker'), {
     *         modal: true,
     *         header: true,
     *         footer: true,
     *         change: function (e) {
     *             alert('Change is fired');
     *         },
     *         select: function (e) {
     *             alert('Select from type of "' + e.detail.type + '" is fired');
     *         }
     *     });
     * </script>
     */
    select: function (el, type) {
        return el.dispatchEvent(new CustomEvent('select', { detail: { 'type': type } }));
    },

    /**
     * Event fires when the calendar is opened.
     * @event open
     * @param {object} e - event data
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <script>
     *     new GijgoDatePicker(document.getElementById('datepicker'), ({
     *         modal: true,
     *         open: function (e) {
     *             alert('open is fired.');
     *         }
     *     });
     * </script>
     */
    open: function (el) {
        return el.dispatchEvent(new Event('open'));
    },

    /**
     * Event fires when the calendar is closed.
     * @event close
     * @param {object} e - event data
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <script>
     *     new GijgoDatePicker(document.getElementById('datepicker'), ({
     *         modal: true,
     *         close: function (e) {
     *             alert('Close is fired.');
     *         }
     *     });
     * </script>
     */
    close: function (el) {
        return el.dispatchEvent(new Event('close'));
    }
};

GijgoDatePicker = function (element, jsConfig) {
    var self = this,
        methods = gj.datepicker.methods;

    self.type = 'datepicker';
    self.element = element;

    /** Gets or sets the value of the datepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string | datepicker object
     * @example Get <!-- datepicker -->
     * <button class="gj-button-md" onclick="alert(datepicker.value())">Get Value</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var datepicker = new GijgoDatePicker(document.getElementById('datepicker'));
     * </script>
     * @example Set <!-- datepicker -->
     * <button class="gj-button-md" onclick="datepicker.value('03/01/2023')">Set Value</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var datepicker = new GijgoDatePicker(document.getElementById('datepicker'));
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove datepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- datepicker -->
     * <button class="gj-button-md" onclick="datepicker.destroy()">Destroy</button>
     * <input id="datepicker" width="312" />
     * <script>
     *     var datepicker = new GijgoDatePicker(document.getElementById('datepicker'), { modal: true });
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Open the calendar.
     * @method
     * @return datepicker
     * @example Open.Close <!-- datepicker -->
     * <button class="gj-button-md" onclick="datepicker.open()">Open</button>
     * <button class="gj-button-md" onclick="datepicker.close()">Close</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var datepicker = new GijgoDatePicker(document.getElementById('datepicker'));
     * </script>
     */
    self.open = function () {
        return methods.open(this, this.data());
    };

    /** Close the calendar.
     * @method
     * @return datepicker
     * @example Open.Close <!-- datepicker -->
     * <button class="gj-button-md" onclick="datepicker.open()">Open</button>
     * <button class="gj-button-md" onclick="datepicker.close()">Close</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var datepicker = new GijgoDatePicker(document.getElementById('datepicker'));
     * </script>
     */
    self.close = function () {
        return methods.close(this);
    };
    
    if ('true' !== element.getAttribute('data-gj-datepicker')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDatePicker.prototype = new gj.widget();
GijgoDatePicker.constructor = GijgoDatePicker;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.datepicker = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDatePicker(this[0], method);
                } else {
                    $widget = new GijgoDatePicker(this[0], null);
                    if ($widget[method]) {
                        return $widget[method].apply(this[0], Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}

/* global window alert jQuery gj */
/**
  * @widget TimePicker
  * @plugin Base
  */
gj.timepicker = {
    plugins: {}
};

gj.timepicker.config = {
    base: {

        /** The width of the timepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { width: 280 });
         * </script>
         * @example HTML.Config <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'));
         * </script>
         */
        width: undefined,

        /** If set to true, the timepicker will have modal behavior.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { modal: true });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { modal: false, header: false, footer: false });
         * </script>
         */
        modal: true,

        /** If set to true, add header to the timepicker.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { header: true });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { header: false, mode: '24hr' });
         * </script>
         */
        header: true,

        /** If set to true, add footer with ok and cancel buttons to the timepicker.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { footer: true });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="timepicker" width="280" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { footer: false });
         * </script>
         */
        footer: true,

        /** Specifies the format, which is used to format the value of the timepicker displayed in the input.
         * @additionalinfo <b>M</b> - Minutes; no leading zero for single-digit minutes.<br/>
         * <b>MM</b> - Minutes; leading zero for single-digit minutes.<br/>
         * <b>H</b> - The hour, using a 24-hour clock from 0 to 23; no leading zero for single-digit hours.<br/>
         * <b>HH</b> - The hour, using a 24-hour clock from 0 to 23; leading zero for single-digit hours.<br/>
         * <b>h</b> - The hour, using a 12-hour clock from 1 to 12; no leading zero for single-digit hours.<br/>
         * <b>hh</b> - The hour, using a 12-hour clock from 1 to 12; leading zero for single-digit hours<br/>
         * <b>tt</b> - The AM/PM designator; lowercase.<br/>
         * <b>TT</b> - The AM/PM designator; upercase.<br/>
         * @type String
         * @default 'MM:HH'
         * @example Sample <!-- timepicker -->
         * <input id="timepicker" width="312" value="13.42" />
         * <script>
         *     var timepicker = new GijgoTimePicker(document.getElementById('timepicker'), {
         *         format: 'HH.MM'
         *     });
         * </script>
         */
        format: 'HH:MM',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, timepicker -->
         * <input id="timepicker" width="270" />
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker'), { uiLibrary: 'bootstrap', modal: false, footer: false });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker'), { uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial timepicker value.
         * @type String
         * @default undefined
         * @example Javascript <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        value: '13:42'
         *    });
         * </script>
         * @example HTML <!-- timepicker -->
         * <input id="timepicker" width="312" value="13:42" />
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker'));
         * </script>
         */
        value: undefined,

        /** The timepicker mode. Tells the component to display the picker in ampm (12hr) format or 24hr format.
         * @type ampm|24hr
         * @default 'ampm'
         * @example ampm <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), { mode: 'ampm' });
         * </script>
         * @example 24hr <!-- timepicker -->
         * <input id="timepicker" width="312" />
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker'), { mode: '24hr' });
         * </script>
         */
        mode: '24hr',

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        locale: 'de-de'
         *    });
         * </script>
         * @example Bulgarian <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        locale: 'bg-bg'
         *    });
         * </script>
         * @example French <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        locale: 'fr-fr'
         *    });
         * </script>
         * @example Brazil <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        locale: 'pt-br'
         *    });
         * </script>
         * @example Russian <!-- timepicker -->
         * <input id="timepicker" width="276" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('timepicker'), {
         *        locale: 'ru-ru'
         *    });
         * </script>
         */
        locale: 'en-us',

        /** The size of the timepicker input.
         * @type 'small'|'default'|'large'
         * @default 'default'
         * @example Bootstrap.4 <!-- bootstrap4, timepicker -->
         * <p><label for="timepicker-small">Small Size:</label> <input id="timepicker-small" width="220" value="15:20" /></p>
         * <p><label for="timepicker-default">Default Size:</label> <input id="timepicker-default" width="220" value="15:20" /></p>
         * <p><label for="timepicker-large">Large Size:</label> <input id="timepicker-large" width="220" value="15:20" /></p>
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker-small'), { uiLibrary: 'bootstrap4', size: 'small' });
         *     new GijgoTimePicker(document.getElementById('timepicker-default'), { uiLibrary: 'bootstrap4', size: 'default' });
         *     new GijgoTimePicker(document.getElementById('timepicker-large'), { uiLibrary: 'bootstrap4', size: 'large' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, timepicker -->
         * <p><label for="timepicker-small">Small Size:</label> <input id="timepicker-small" width="220" value="15:20" /></p>
         * <p><label for="timepicker-default">Default Size:</label> <input id="timepicker-default" width="220" value="15:20" /></p>
         * <p><label for="timepicker-large">Large Size:</label> <input id="timepicker-large" width="220" value="15:20" /></p>
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker-small'), { uiLibrary: 'bootstrap', size: 'small' });
         *     new GijgoTimePicker(document.getElementById('timepicker-default'), { uiLibrary: 'bootstrap', size: 'default' });
         *     new GijgoTimePicker(document.getElementById('timepicker-large'), { uiLibrary: 'bootstrap', size: 'large' });
         * </script>
         * @example Material.Design <!-- timepicker -->
         * <p><label for="timepicker-small">Small Size:</label> <input id="timepicker-small" width="220" value="15:20" /></p>
         * <p><label for="timepicker-default">Default Size:</label> <input id="timepicker-default" width="220" value="15:20" /></p>
         * <p><label for="timepicker-large">Large Size:</label> <input id="timepicker-large" width="220" value="15:20" /></p>
         * <script>
         *     new GijgoTimePicker(document.getElementById('timepicker-small'), { size: 'small' });
         *     new GijgoTimePicker(document.getElementById('timepicker-default'), { size: 'default' });
         *     new GijgoTimePicker(document.getElementById('timepicker-large'), { size: 'large' });
         * </script>
         */
        size: 'default',

        /** If set to true, show timepicker on input focus.
         * @type Boolean
         * @default true
         * @example True <!-- timepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('picker'), { showOnFocus: true, showRightIcon: false });
         * </script>
         * @example False <!-- timepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('picker'), { showOnFocus: false });
         * </script>
         */
        showOnFocus: true,

        /** If set to true, show timepicker icon on the right side of the input.
         * @type Boolean
         * @default true
         * @example False <!-- timepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('picker'), { showOnFocus: true, showRightIcon: false });
         * </script>
         * @example True <!-- timepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoTimePicker(document.getElementById('picker'), { showRightIcon: true });
         * </script>
         */
        showRightIcon: true,

        icons: {
            rightIcon: '<i class="gj-icon clock" />'
        },

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-timepicker gj-timepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            clock: 'gj-picker gj-picker-md timepicker',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            clock: 'gj-picker gj-picker-bootstrap timepicker',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-timepicker gj-timepicker-bootstrap gj-unselectable input-group',
            input: 'form-control border',
            clock: 'gj-picker gj-picker-bootstrap timepicker',
            footer: 'modal-footer',
            button: 'btn btn-default'
        }
    }
};

gj.timepicker.methods = {
    init: function (jsConfig) {
        gj.picker.widget.prototype.init.call(this, jsConfig);
        return this;
    },

    initialize: function () {

    },

    initMouse: function (input, popup, data) {
        var body = popup.querySelector('[data-gj-role="body"]');
        body.addEventListener('mousedown', gj.timepicker.methods.mouseDownHandler(popup));
        body.addEventListener('mousemove', gj.timepicker.methods.mouseMoveHandler(input, popup, data));
        body.addEventListener('mouseup', gj.timepicker.methods.mouseUpHandler(input, popup, data));
    },

    createPopup: function (picker) {
        var date, amEl, pmEl, wrapper,
            data = picker.getConfig(),
            clock = document.createElement('div'),
            hour = document.createElement('div'),
            separator = document.createElement('span'),
            minute = document.createElement('div'),
            header = document.createElement('div'),
            mode = document.createElement('div'),
            body = document.createElement('div'),
            btnOk = document.createElement('button'),
            btnCancel = document.createElement('button'),
            footer = document.createElement('div');

        gj.core.addClasses(clock, data.style.clock);
        clock.setAttribute('role', 'picker');
        clock.setAttribute('data-gj-guid', picker.element.getAttribute('data-gj-guid'));

        hour.setAttribute('role', 'hour');
        minute.setAttribute('role', 'minute');
        header.setAttribute('role', 'header');
        mode.setAttribute('role', 'mode');
        body.setAttribute('role', 'body');

        gj.core.addClasses(btnOk, data.style.button);
        btnOk.innerText = gj.core.messages[data.locale].ok;

        gj.core.addClasses(btnCancel, data.style.button);
        btnCancel.innerText = gj.core.messages[data.locale].cancel;

        footer.setAttribute('role', 'footer');
        gj.core.addClasses(footer, data.style.footer);

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            picker.element.setAttribute('hours', date.getHours());
        }

        if (data.header) {
            hour.addEventListener('click', function () {
                gj.timepicker.methods.renderHours(picker.element, clock, data);
            });
            minute.addEventListener('click', function () {
                gj.timepicker.methods.renderMinutes(picker.element, clock, data);
            });
            header.appendChild(hour);
            separator.innerText = ':';
            header.appendChild(separator);
            header.appendChild(minute);

            if (data.mode === 'ampm') {
                amEl = document.createElement('span');
                amEl.setAttribute('role', 'am');
                amEl.innerText = gj.core.messages[data.locale].am;
                mode.appendChild(amEl);
                amEl.addEventListener('click', function () {
                    var hour = gj.timepicker.methods.getHour(clock);
                    clock.setAttribute('mode', 'am');
                    this.classList.add('selected');
                    this.parentElement.querySelector('[data-gj-role="pm"]').classList.remove('selected');
                    if (hour >= 12) {
                        clock.setAttribute('hour', hour - 12);
                    }
                    if (!data.modal) {
                        clearTimeout(picker.timeout);
                        picker.element.focus();
                    }
                });
                mode.appendChild(document.createElement('br'));

                pmEl = document.createElement('span');
                pmEl.setAttribute('role', 'pm');
                pmEl.innerText = gj.core.messages[data.locale].pm;
                mode.appendChild(pmEl);
                pmEl.addEventListener('click', function () {
                    var hour = gj.timepicker.methods.getHour(clock);
                    clock.setAttribute('mode', 'pm');
                    this.classList.add('selected');
                    this.parentElement.querySelector('[data-gj-role="am"]').classList.remove('selected');
                    if (hour < 12) {
                        clock.setAttribute('hour', hour + 12);
                    }
                    if (!data.modal) {
                        clearTimeout(picker.timeout);
                        picker.element.focus();
                    }
                });
                header.appendChild(mode);
            }
            clock.appendChild(header);
        }
        
        clock.appendChild(body);

        if (data.footer) {
            btnCancel.addEventListener('click', function () { picker.close(); });
            footer.appendChild(btnCancel);
            btnOk.addEventListener('click', gj.timepicker.methods.setTime(picker, clock));
            footer.appendChild(btnOk);
            clock.appendChild(footer);
        }

        clock.style.display = 'none';

        document.body.appendChild(clock);

        if (data.modal) {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'modal');
            gj.core.addClasses(wrapper, data.style.modal);
            clock.parentNode.insertBefore(wrapper, clock);
            wrapper.appendChild(clock);
            gj.core.center(clock);
        }

        gj.timepicker.methods.initMouse(picker, clock, data);

        return clock;
    },

    getHour: function (clock) {
        return parseInt(clock.getAttribute('hour'), 10) || 0;
    },

    getMinute: function (clock) {
        return parseInt(clock.getAttribute('minute'), 10) || 0;
    },

    getMode: function (clock) {
        return clock.getAttribute('mode')
    },

    setTime: function (picker, clock) {
        return function () {
            var hour = gj.timepicker.methods.getHour(clock),
                minute = gj.timepicker.methods.getMinute(clock),
                mode = gj.timepicker.methods.getMode(clock),
                date = new Date(0, 0, 0, (hour === 12 && mode === 'am' ? 0 : hour), minute),
                data = picker.getConfig(),
                value = gj.core.formatDate(date, data.format, data.locale);
            picker.value(value);
            picker.close();
        };
    },

    getPointerValue: function (x, y, mode) {
        var value, radius, size = 256,
            angle = Math.atan2(size / 2 - x, size / 2 - y) / Math.PI * 180;

        if (angle < 0) {
            angle = 360 + angle;
        }

        switch (mode) {
            case 'ampm': {
                value = 12 - Math.round(angle * 12 / 360);
                return value === 0 ? 12 : value;
            }
            case '24hr': {
                radius = Math.sqrt(Math.pow(size / 2 - x, 2) + Math.pow(size / 2 - y, 2));
                value = 12 - Math.round(angle * 12 / 360);
                if (value === 0) {
                    value = 12;
                }
                if (radius < size / 2 - 32) {
                    value = value === 12 ? 0 : value + 12;
                }
                return value;
            }
            case 'minutes': {
                value = Math.round(60 - 60 * angle / 360);
                return value === 60 ? 0 : value;
            }
            default:
                throw 'missing timepicker mode.';
        }
    },

    updateArrow: function(e, picker, clock, data) {
        var rect, type, value,
            mouseX = picker.mouseX(e),
            mouseY = picker.mouseY(e),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        rect = e.target.getBoundingClientRect();
        type = clock.getAttribute('type');
        if (type === 'hours') {
            value = gj.timepicker.methods.getPointerValue(mouseX - scrollX - rect.left, mouseY - scrollY - rect.top, data.mode);
            clock.setAttribute('hour', data.mode === 'ampm' && clock.getAttribute('mode') === 'pm' && value < 12 ? value + 12 : value);
        } else if (type === 'minutes') {
            value = gj.timepicker.methods.getPointerValue(mouseX - scrollX - rect.left, mouseY - scrollY - rect.top, 'minutes');
            clock.setAttribute('minute', value);
        }

        gj.timepicker.methods.update(picker, clock, data);
    },

    update: function (picker, clock, data) {
        var hour, minute, mode, arrow, type, visualHour, header, numbers, i, number;

        // update the arrow
        hour = gj.timepicker.methods.getHour(clock);
        minute = gj.timepicker.methods.getMinute(clock);
        mode = gj.timepicker.methods.getMode(clock);
        arrow = clock.querySelector('[data-gj-role="arrow"]');
        type = clock.getAttribute('type');
        if (type === 'hours' && (hour == 0 || hour > 12) && data.mode === '24hr') {
            arrow.style.width = 'calc(50% - 52px)';
        } else {
            arrow.style.width = 'calc(50% - 20px)';
        }

        if (type === 'hours') {
            arrow.style.transform = 'rotate(' + ((hour * 30) - 90).toString() + 'deg)';
        } else {
            arrow.style.transform = 'rotate(' + ((minute * 6) - 90).toString() + 'deg)';
        }
        arrow.style.display = 'block';

        // update the numbers
        visualHour = (data.mode === 'ampm' && hour > 12 ? hour - 12 : (hour == 0 ? 12 : hour));
        numbers = clock.querySelectorAll('[data-gj-role="body"] span');
        for (i = 0; i < numbers.length; i++) {
            number = parseInt(numbers[i].innerText, 10);
            if (type === 'hours' && number === visualHour) {
                numbers[i].classList.add('selected');
            } else if (type === 'minutes' && number === minute) {
                numbers[i].classList.add('selected');
            } else {
                numbers[i].classList.remove('selected');
            }
        }

        // update the header
        if (data.header) {
            header = clock.querySelector('[data-gj-role="header"]');
            header.querySelector('[data-gj-role="hour"]').innerText = visualHour;
            header.querySelector('[data-gj-role="minute"]').innerText = gj.core.pad(minute);
            if (data.mode === 'ampm') {
                if (mode == "pm") {
                    header.querySelector('[data-gj-role="pm"]').classList.add('selected');
                    header.querySelector('[data-gj-role="am"]').classList.remove('selected');
                } else {
                    header.querySelector('[data-gj-role="am"]').classList.add('selected');
                    header.querySelector('[data-gj-role="pm"]').classList.remove('selected');
                }
            }
        }
    },

    mouseDownHandler: function (picker) {
        return function (e) {
            picker.mouseMove = true;
        };
    },

    mouseMoveHandler: function (picker, clock, data) {
        return function (e) {
            if (picker.mouseMove) {
                gj.timepicker.methods.updateArrow(e, picker, clock, data);
            }
        };
    },

    mouseUpHandler: function (picker, clock, data) {
        return function (e) {
            var type = clock.getAttribute('type');
            if (type === 'hours' || type === 'minutes') {
                gj.timepicker.methods.updateArrow(e, picker, clock, data);
                picker.mouseMove = false;
                if (!data.modal) {
                    clearTimeout(picker.timeout);
                    picker.element.focus();
                }
                if (type === 'hours') {
                    setTimeout(function () {
                        gj.timepicker.events.select(picker.element, 'hour');
                        gj.timepicker.methods.renderMinutes(picker, clock, data);
                    }, 1000);
                } else if (type === 'minutes') {
                    if (data.footer !== true && data.autoClose !== false) {
                        gj.timepicker.methods.setTime(picker, clock)();
                    }
                    gj.timepicker.events.select(picker.element, 'minute');
                }
            }
        };
    },

    renderHours: function (picker, clock, data) {
        var dial, arrow, body = clock.querySelector('[data-gj-role="body"]');

        clearTimeout(picker.timeout);
        body.innerHTML = '';
        dial = document.createElement('div');
        dial.setAttribute('data-gj-role', 'dial');

        arrow = gj.core.createElement('<div data-gj-role="arrow" style="display: none; transform: rotate(-90deg);" />');
        arrow.appendChild(gj.core.createElement('<div class="arrow-begin"></div>'));
        arrow.appendChild(gj.core.createElement('<div class="arrow-end"></div>'));
        dial.appendChild(arrow);

        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(54px, -93.5307px)">1</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(93.5307px, -54px)">2</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(108px, 0px)">3</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(93.5307px, 54px)">4</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(54px, 93.5307px)">5</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(6.61309e-15px, 108px)">6</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-54px, 93.5307px)">7</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-93.5307px, 54px)">8</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-108px, 1.32262e-14px)">9</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-93.5307px, -54px)">10</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-54px, -93.5307px)">11</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-1.98393e-14px, -108px)">12</span>'));
        if (data.mode === '24hr') {
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(38px, -65.8179px)">13</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(65.8179px, -38px)">14</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(76px, 0px)">15</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(65.8179px, 38px)">16</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(38px, 65.8179px)">17</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(4.65366e-15px, 76px)">18</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-38px, 65.8179px)">19</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-65.8179px, 38px)">20</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-76px, 9.30732e-15px)">21</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-65.8179px, -38px)">22</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-38px, -65.8179px)">23</span>'));
            dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-1.3961e-14px, -76px)">00</span>'));
        }
        body.appendChild(dial);

        if (data.header) {
            clock.querySelector('[data-gj-role="header"] [data-gj-role="hour"]').classList.add('selected');
            clock.querySelector('[data-gj-role="header"] [data-gj-role="minute"]').classList.remove('selected');
        }

        clock.setAttribute('type', 'hours');

        gj.timepicker.methods.update(picker, clock, data);
    },

    renderMinutes: function (picker, clock, data) {
        var arrow, body = clock.querySelector('[data-gj-role="body"]');

        clearTimeout(picker.timeout);
        body.innerHTML = '';
        dial = document.createElement('div');
        dial.setAttribute('data-gj-role', 'dial');

        arrow = document.createElement('div');
        arrow.setAttribute('data-gj-role', 'arrow');
        arrow.style.display = 'none';
        arrow.style.transform = 'rotate(-90deg)';
        arrow.appendChild(gj.core.createElement('<div class="arrow-begin"></div>'));
        arrow.appendChild(gj.core.createElement('<div class="arrow-end"></div>'));
        dial.appendChild(arrow);

        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(54px, -93.5307px)">5</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(93.5307px, -54px)">10</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(108px, 0px)">15</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(93.5307px, 54px)">20</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(54px, 93.5307px)">25</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(6.61309e-15px, 108px)">30</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-54px, 93.5307px)">35</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-93.5307px, 54px)">40</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-108px, 1.32262e-14px)">45</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-93.5307px, -54px)">50</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-54px, -93.5307px)">55</span>'));
        dial.appendChild(gj.core.createElement('<span data-gj-role="hour" style="transform: translate(-1.98393e-14px, -108px)">00</span>'));
        body.appendChild(dial);

        if (data.header) {
            clock.querySelector('[data-gj-role="header"] [data-gj-role="hour"]').classList.remove('selected');
            clock.querySelector('[data-gj-role="header"] [data-gj-role="minute"]').classList.add('selected');
        }
        
        clock.setAttribute('type', 'minutes');

        gj.timepicker.methods.update(picker, clock, data);
    },

    setAttributes: function (popup, data, date) {
        var hour = date.getHours();
        if (data.mode === 'ampm') {
            popup.setAttribute('mode', hour >= 12 ? 'pm' : 'am');
        }
        popup.setAttribute('hour', hour);
        popup.setAttribute('minute', date.getMinutes());

    },

    open: function (picker) {
        var time, data = picker.getConfig(),
            clock = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');

        if (picker.value()) {
            time = gj.core.parseDate(picker.value(), data.format, data.locale);
        } else {
            time = new Date();
        }

        gj.timepicker.methods.setAttributes(clock, data, time);

        gj.timepicker.methods.renderHours(picker, clock, data);

        gj.picker.widget.prototype.open.call(picker, 'timepicker');
        return picker;
    },

    value: function (picker, value) {
        if (typeof (value) === "undefined") {
            return picker.element.value;
        } else {
            picker.element.value = value;
            gj.timepicker.events.change(picker.element);
            return picker;
        }
    }
};

gj.timepicker.events = {
    /**
     * Triggered when the timepicker value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="picker" width="312" />
     * <script>
     *     new GijgoTimePicker(document.getElementById('picker'), {
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Triggered when new value is selected inside the picker.
     *
     * @event select
     * @param {object} e - event data
     * @param {string} type - The type of the selection. The options are hour and minute.
     * @example sample <!-- timepicker -->
     * <input id="picker" width="312" />
     * <script>
     *     new GijgoTimePicker(document.getElementById('picker'), {
     *         modal: true,
     *         header: true,
     *         footer: true,
     *         change: function (e) {
     *             alert('Change is fired');
     *         },
     *         select: function (e) {
     *             alert('Select from type of "' + e.detail.type + '" is fired');
     *         }
     *     });
     * </script>
     */
    select: function (el, type) {
        return el.dispatchEvent(new CustomEvent('select', { detail: { 'type': type } }));
    },

    /**
     * Event fires when the timepicker is opened.
     * @event open
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="picker" width="312" />
     * <script>
     *     new GijgoTimePicker(document.getElementById('picker'), {
     *         open: function (e) {
     *             alert('open is fired.');
     *         }
     *     });
     * </script>
     */
    open: function (el) {
        return el.dispatchEvent(new Event('open'));
    },

    /**
     * Event fires when the timepicker is closed.
     * @event close
     * @param {object} e - event data
     * @example sample <!-- timepicker -->
     * <input id="picker" width="312" />
     * <script>
     *     new GijgoTimePicker(document.getElementById('picker'), {
     *         close: function (e) {
     *             alert('close is fired.');
     *         }
     *     });
     * </script>
     */
    close: function (el) {
        return el.dispatchEvent(new Event('close'));
    }
};

GijgoTimePicker = function (element, jsConfig) {
    var self = this,
        methods = gj.timepicker.methods;

    self.type = 'timepicker';
    self.element = element;

    self.mouseMove = false;

    /** Gets or sets the value of the timepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- timepicker -->
     * <button class="gj-button-md" onclick="alert(picker.value())">Get Value</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoTimePicker(document.getElementById('picker'), );
     * </script>
     * @example Set <!-- timepicker -->
     * <button class="gj-button-md" onclick="picker.value('11:00')">Set Value</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoTimePicker(document.getElementById('picker'), );
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove timepicker functionality from the element.
     * @method
     * @return timepicker
     * @example sample <!-- timepicker -->
     * <button class="gj-button-md" onclick="timepicker.destroy()">Destroy</button>
     * <input id="picker" width="312" />
     * <script>
     *     var timepicker = new GijgoTimePicker(document.getElementById('picker'), );
     * </script>
     */
    self.destroy = function () {
        return gj.picker.widget.prototype.destroy.call(this, 'timepicker');
    };

    /** Open the clock.
     * @method
     * @return timepicker
     * @example Open.Close <!-- timepicker -->
     * <button class="gj-button-md" onclick="picker.open()">Open</button>
     * <button class="gj-button-md" onclick="picker.close()">Close</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoTimePicker(document.getElementById('picker'), { modal: false, header: false, footer: false, mode: '24hr' });
     * </script>
     */
    self.open = function () {
        return gj.timepicker.methods.open(this);
    };

    /** Close the clock.
     * @method
     * @return timepicker
     * @example Open.Close <!-- timepicker -->
     * <button class="gj-button-md" onclick="picker.open()">Open</button>
     * <button class="gj-button-md" onclick="picker.close()">Close</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoTimePicker(document.getElementById('picker'), { modal: false, header: false, footer: false, mode: '24hr' });
     * </script>
     */
    self.close = function () {
        return gj.picker.widget.prototype.close.call(this, 'timepicker');
    };

    //$.extend($element, self);
    if ('true' !== element.getAttribute('data-gj-timepicker')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoTimePicker.prototype = new gj.picker.widget();
GijgoTimePicker.constructor = GijgoTimePicker;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.timepicker = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoTimePicker(this[0], method);
                } else {
                    $widget = new GijgoTimePicker(this[0], null);
                    if ($widget[method]) {
                        return $widget[method].apply(this[0], Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}

/* global window alert jQuery gj */
/**
  * @widget DateTimePicker
  * @plugin Base
  */
gj.datetimepicker = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.datetimepicker.config = {
    base: {

        /** The datepicker configuration options. Valid only for datepicker specific configuration options.
         * @additionalinfo All configuration options that exists on the datetimepicker level are going to override the options at datepicker level.
         * @type object
         * @default undefined
         * @example Sample <!-- datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), {
         *        datepicker: { showOtherMonths: true }
         *    });
         * </script>
         */
        datepicker: gj.datepicker.config.base,

        timepicker: gj.timepicker.config.base,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'materialdesign' });
         * </script>
         * @example MaterialDesign.NoModal <!-- datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'materialdesign', modal: false, footer:false });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datetimepicker -->
         * <input id="picker" width="220" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datetimepicker -->
         * <input id="picker" width="234" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'bootstrap4' });
         * </script>
         * @example Bootstrap.5 <!-- bootstrap5, datetimepicker -->
         * <input id="picker" width="234" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'bootstrap5' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial datetimepicker value.
         * @type number
         * @default undefined
         * @example Javascript <!-- datetimepicker -->
         * <input id="picker" width="300" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { value: '22:10 03/27/2023' });
         * </script>
         * @example HTML <!-- datetimepicker -->
         * <input id="picker" width="300" value="22:10 03/27/2023" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'));
         * </script>
         */
        value: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo <b>M</b> - Minutes; no leading zero for single-digit minutes.<br/>
         * <b>MM</b> - Minutes; leading zero for single-digit minutes.<br/>
         * <b>H</b> - The hour, using a 24-hour clock from 0 to 23; no leading zero for single-digit hours.<br/>
         * <b>HH</b> - The hour, using a 24-hour clock from 0 to 23; leading zero for single-digit hours.<br/>
         * <b>h</b> - The hour, using a 12-hour clock from 1 to 12; no leading zero for single-digit hours.<br/>
         * <b>hh</b> - The hour, using a 12-hour clock from 1 to 12; leading zero for single-digit hours<br/>
         * <b>tt</b> - The AM/PM designator; lowercase.<br/>
         * <b>TT</b> - The AM/PM designator; upercase.<br/>
         * <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
         * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
         * <b>ddd</b> - Day of the week as a three-letter abbreviation.<br/>
         * <b>dddd</b> - Day of the week as its full name.<br/>
         * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
         * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
         * <b>mmm</b> - Month as a three-letter abbreviation.<br/>
         * <b>mmmm</b> - Month as its full name.<br/>
         * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
         * <b>yyyy</b> - Year represented by four digits.<br/>
         * @type String
         * @default 'HH:MM mm/dd/yyyy'
         * @example Sample <!-- datetimepicker -->
         * <input id="input" value="05:50 2023-27-03" width="312" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'), { format: 'HH:MM yyyy-dd-mm' });
         * </script>
         * @example Long.Month.Format <!-- datetimepicker -->
         * <input id="input" value="10 October 2023 05:50" width="312" />
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('picker'), { format: 'dd mmmm yyyy HH:MM' });
         * </script>
         */
        format: 'HH:MM mm/dd/yyyy',

        /** The width of the datetimepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- datetimepicker -->
         * <input id="input" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { width: 312 });
         * </script>
         * @example HTML.Config <!-- datetimepicker -->
         * <input id="input" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'));
         * </script>
         */
        width: undefined,

        /** If set to true, the datetimepicker will have modal behavior.
         * @type Boolean
         * @default true
         * @example Material.Design <!-- datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { modal: true });
         * </script>
         * @example Bootstrap <!-- bootstrap, datetimepicker -->
         * <input id="picker" width="220" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'bootstrap', modal: true, footer: true });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datetimepicker -->
         * <input id="picker" width="234" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { uiLibrary: 'bootstrap4', modal: true, footer: true });
         * </script>
         */
        modal: true,

        /** If set to true, add footer with ok and cancel buttons to the datetimepicker.
         * @type Boolean
         * @default true
         * @example True <!-- datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { footer: true, modal: true, header: true });
         * </script>
         * @example False <!-- datetimepicker -->
         * <input id="picker" width="312" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), { footer: false });
         * </script>
         */
        footer: true,

        /** The size of the datetimepicker input.
         * @type 'small'|'default'|'large'
         * @default 'default'
         * @example Bootstrap.4 <!-- bootstrap4, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="234" value="10:20 03/20/2023" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="234" value="10:20 03/20/2023" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="234" value="10:20 03/20/2023" /></p>
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('small'), { uiLibrary: 'bootstrap4', size: 'small' });
         *     new GijgoDateTimePicker(document.getElementById('default'), { uiLibrary: 'bootstrap4', size: 'default' });
         *     new GijgoDateTimePicker(document.getElementById('large'), { uiLibrary: 'bootstrap4', size: 'large' });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="234" value="10:20 03/20/2023" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="234" value="10:20 03/20/2023" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="234" value="10:20 03/20/2023" /></p>
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('small'), { uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'small' });
         *     new GijgoDateTimePicker(document.getElementById('default'), { uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'default' });
         *     new GijgoDateTimePicker(document.getElementById('large'), { uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'large' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="220" value="10:20 03/20/2023" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="220" value="10:20 03/20/2023" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="220" value="10:20 03/20/2023" /></p>
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('small'), { uiLibrary: 'bootstrap', size: 'small' });
         *     new GijgoDateTimePicker(document.getElementById('default'), { uiLibrary: 'bootstrap', size: 'default' });
         *     new GijgoDateTimePicker(document.getElementById('large'), { uiLibrary: 'bootstrap', size: 'large' });
         * </script>
         * @example Material.Design <!-- datetimepicker -->
         * <p><label for="small">Small Size:</label> <input id="small" width="276" value="10:20 03/20/2023" /></p>
         * <p><label for="default">Default Size:</label> <input id="default" width="276" value="10:20 03/20/2023" /></p>
         * <p><label for="large">Large Size:</label> <input id="large" width="276" value="10:20 03/20/2023" /></p>
         * <script>
         *     new GijgoDateTimePicker(document.getElementById('small'), { size: 'small' });
         *     new GijgoDateTimePicker(document.getElementById('default'), { size: 'default' });
         *     new GijgoDateTimePicker(document.getElementById('large'), { size: 'large' });
         * </script>
         */
        size: 'default',
        
        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- datetimepicker -->
         * <input id="picker" width="276" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), {
         *        locale: 'de-de',
         *        format: 'HH:MM dd mmm yyyy'
         *    });
         * </script>
         * @example Bulgarian <!-- datetimepicker -->
         * <input id="picker" width="276" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), {
         *        locale: 'bg-bg',
         *        format: 'HH:MM dd mmm yyyy',
         *        datepicker: { weekStartDay: 1 }
         *    });
         * </script>
         * @example Chinise_Simplified <!-- datetimepicker -->
         * <input id="picker" width="276" />
         * <script>
         *    new GijgoDateTimePicker(document.getElementById('picker'), {
         *        locale: 'zh-cn',
         *        format: 'HH:MM dd mmm yyyy',
         *        datepicker: { weekStartDay: 1 }
         *    });
         * </script>
         */
        locale: 'en-us',

        icons: {},

        style: {
            calendar: 'gj-picker gj-picker-md datetimepicker gj-unselectable'
        }
    },

    bootstrap: {
        style: {
            calendar: 'gj-picker gj-picker-bootstrap datetimepicker gj-unselectable'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            calendar: 'gj-picker gj-picker-bootstrap datetimepicker gj-unselectable'
        }
    },

    bootstrap5: {
        style: {
            calendar: 'gj-picker gj-picker-bootstrap datetimepicker gj-unselectable'
        }
    }
};

gj.datetimepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);
        this.element.setAttribute('data-datetimepicker', 'true');
        gj.datetimepicker.methods.initialize(this, this.getConfig());
        return this;
    },

    readConfig: function (clientConfig) {
        var config = gj.widget.prototype.readConfig.call(this, clientConfig);

        uiLibrary = clientConfig.hasOwnProperty('uiLibrary') ? clientConfig.uiLibrary : config.uiLibrary;
        if (gj.datepicker.config[uiLibrary]) {
            this.extend(config.datepicker, gj.datepicker.config[uiLibrary]);
        }
        if (gj.timepicker.config[uiLibrary]) {
            this.extend(config.timepicker, gj.timepicker.config[uiLibrary]);
        }

        iconsLibrary = clientConfig.hasOwnProperty('iconsLibrary') ? clientConfig.iconsLibrary : config.iconsLibrary;
        if (gj.datepicker.config[iconsLibrary]) {
            this.extend(config.datepicker, gj.datepicker.config[iconsLibrary]);
        }
        if (gj.timepicker.config[iconsLibrary]) {
            this.extend(config.timepicker, gj.timepicker.config[iconsLibrary]);
        }

        return config;
    },

    initialize: function (picker, data) {
        var date, headerEl, dateEl, switchEl, timeEl, hourEl, separatorEl, minuteEl, calendarMode, clockMode, popup;

        // Init datepicker
        data.datepicker.uiLibrary = data.uiLibrary;
        data.datepicker.iconsLibrary = data.iconsLibrary;
        data.datepicker.width = data.width;
        data.datepicker.format = data.format;
        data.datepicker.locale = data.locale;
        data.datepicker.modal = data.modal;
        data.datepicker.footer = data.footer;
        data.datepicker.style.calendar = data.style.calendar;
        data.datepicker.value = data.value;
        data.datepicker.size = data.size;
        data.datepicker.autoClose = false;
        gj.datepicker.methods.initialize(picker, data.datepicker);

        popup = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');

        picker.element.addEventListener('select', function (e) {
            var selectedDay, date, value;
            if (e.detail.type === 'day') {
                gj.datetimepicker.methods.createShowHourHandler(picker, popup, data)();
            } else if (e.detail.type === 'minute') {
                if (popup.getAttribute('selectedDay') && data.footer !== true) {
                    selectedDay = popup.getAttribute('selectedDay').split('-');
                    date = new Date(selectedDay[0], selectedDay[1], selectedDay[2], popup.getAttribute('hour') || 0, popup.getAttribute('minute') || 0);
                    value = gj.core.formatDate(date, data.format, data.locale);
                    picker.element.value = value;
                    gj.datetimepicker.events.change(picker.element);
                    gj.datetimepicker.methods.close(picker);
                }
            }
        });
        picker.element.addEventListener('open', function () {
            var headerEl = popup.querySelector('[data-gj-role="header"]');
            headerEl.querySelector('[data-gj-role="calendarMode"]').classList.add('selected');
            headerEl.querySelector('[data-gj-role="clockMode"]').classList.remove('selected');
        });
        
        date = data.value ? gj.core.parseDate(data.value, data.format, data.locale) : new Date();
        popup.setAttribute('hour', date.getHours());
        popup.setAttribute('minute', date.getMinutes());

        // Init timepicker
        data.timepicker.uiLibrary = data.uiLibrary;
        data.timepicker.iconsLibrary = data.iconsLibrary;
        data.timepicker.format = data.format;
        data.timepicker.locale = data.locale;
        data.timepicker.header = true;
        data.timepicker.footer = data.footer;
        data.timepicker.size = data.size;
        data.timepicker.mode = '24hr';
        data.timepicker.autoClose = false;
        gj.timepicker.methods.initMouse(picker, popup, data.timepicker);

        // Init header
        headerEl = document.createElement('div');
        headerEl.setAttribute('data-gj-role', 'header');

        dateEl = document.createElement('div');
        dateEl.setAttribute('data-gj-role', 'date');
        dateEl.classList.add('selected');
        dateEl.addEventListener('click', gj.datetimepicker.methods.createShowDateHandler(picker, popup, data));
        dateEl.innerHTML = gj.core.formatDate(new Date(), 'ddd, mmm dd', data.locale);
        headerEl.appendChild(dateEl);

        switchEl = document.createElement('div');
        switchEl.setAttribute('data-gj-role', 'switch');

        calendarMode = document.createElement('i');
        calendarMode.classList.add('gj-icon');
        calendarMode.classList.add('selected');
        calendarMode.setAttribute('data-gj-role', 'calendarMode');
        calendarMode.innerHTML = 'event';
        calendarMode.addEventListener('click', gj.datetimepicker.methods.createShowDateHandler(picker, popup, data));
        switchEl.appendChild(calendarMode);

        timeEl = document.createElement('div');
        timeEl.setAttribute('data-gj-role', 'time');
        hourEl = document.createElement('div');
        hourEl.setAttribute('data-gj-role', 'hour');
        hourEl.addEventListener('click', gj.datetimepicker.methods.createShowHourHandler(picker, popup, data));
        hourEl.innerHTML = gj.core.formatDate(new Date(), 'HH', data.locale);
        separatorEl = document.createElement('div');
        separatorEl.innerText = ':';
        minuteEl = document.createElement('div');
        minuteEl.setAttribute('data-gj-role', 'minute');
        minuteEl.addEventListener('click', gj.datetimepicker.methods.createShowMinuteHandler(picker, popup, data));
        minuteEl.innerHTML = gj.core.formatDate(new Date(), 'MM', data.locale);
        timeEl.appendChild(hourEl);
        timeEl.appendChild(separatorEl);
        timeEl.appendChild(minuteEl);
        switchEl.appendChild(timeEl);
        
        clockMode = document.createElement('i');
        clockMode.classList.add('gj-icon');
        clockMode.setAttribute('data-gj-role', 'clockMode');
        clockMode.innerHTML = 'clock';
        clockMode.addEventListener('click', gj.datetimepicker.methods.createShowHourHandler(picker, popup, data));
        switchEl.appendChild(clockMode);

        headerEl.appendChild(switchEl);

        popup.prepend(headerEl);
    },

    createShowDateHandler: function (picker, clock, data) {
        return function () {
            var header = clock.querySelector('[data-gj-role="header"]');
            header.querySelector('[data-gj-role="date"]').classList.add('selected');
            header.querySelector('[data-gj-role="calendarMode"]').classList.add('selected');
            header.querySelector('[data-gj-role="clockMode"]').classList.remove('selected');
            header.querySelector('[data-gj-role="hour"]').classList.remove('selected');
            header.querySelector('[data-gj-role="minute"]').classList.remove('selected');
            gj.datepicker.methods.renderMonth(picker, clock, data.datepicker);
        };
    },

    createShowHourHandler: function (picker, popup, data) {
        return function () {
            var header = popup.querySelector('[data-gj-role="header"]');
            header.querySelector('[data-gj-role="calendarMode"]').classList.remove('selected');
            header.querySelector('[data-gj-role="date"]').classList.remove('selected');
            header.querySelector('[data-gj-role="clockMode"]').classList.add('selected');
            header.querySelector('[data-gj-role="hour"]').classList.add('selected');
            header.querySelector('[data-gj-role="minute"]').classList.remove('selected');

            gj.timepicker.methods.renderHours(picker, popup, data.timepicker);
        };
    },

    createShowMinuteHandler: function (picker, clock, data) {
        return function () {
            var header = clock.querySelector('[data-gj-role="header"]');
            header.querySelector('[data-gj-role="calendarMode"]').classList.remove('selected');
            header.querySelector('[data-gj-role="date"]').classList.remove('selected');
            header.querySelector('[data-gj-role="clockMode"]').classList.add('selected');
            header.querySelector('[data-gj-role="hour"]').classList.remove('selected');
            header.querySelector('[data-gj-role="minute"]').classList.add('selected');

            gj.timepicker.methods.renderMinutes(picker, clock, data.timepicker);
        };
    },

    close: function (picker) {
        gj.datepicker.methods.close(picker);
    },

    value: function (picker, value) {
        var clock, date, hour,
            data = picker.getConfig();
        if (typeof value === "undefined") {
            return picker.element.value;
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date) {
                clock = document.body.querySelector('[data-gj-role="picker"][data-gj-guid="' + picker.element.getAttribute('data-gj-guid') + '"]');                
                gj.datepicker.methods.selectDay(picker, clock, data.datepicker, date);
                gj.timepicker.methods.setAttributes(clock, data.timepicker, date);
                picker.element.value = value;
            } else {
                picker.element.value = '';
            }
            return picker;
        }
    },

    destroy: function (picker) {
        gj.datepicker.methods.destroy(picker);
    }
};

gj.datetimepicker.events = {
    /**
     * Fires when the datetimepicker value changes as a result of selecting a new value.
     *
     * @event change
     * @param {object} e - event data
     * @return Boolean
     * @example sample <!--datetimepicker -->
     * <input id="input" width="312" />
     * <script>
     *     new GijgoDateTimePicker(document.getElementById('picker'), {
     *         footer: true,
     *         modal: true,
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    }
};

GijgoDateTimePicker = function (element, jsConfig) {
    var self = this,
        methods = gj.datetimepicker.methods;

    self.type = 'datetimepicker';
    self.element = element;
    self.mouseMove = false;

    /** Gets or sets the value of the datetimepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="alert(datetimepicker.value())">Get Value</button>
     * <hr/>
     * <input id="picker" width="312" value="17:50 03/27/2023" />
     * <script>
     *     var datetimepicker = new GijgoDateTimePicker(document.getElementById('picker'));
     * </script>
     * @example Set <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="datetimepicker.value('13:40 08/01/2023')">Set Value</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var datetimepicker = new GijgoDateTimePicker(document.getElementById('picker'));
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Open the calendar.
     * @method
     * @return datetimepicker
     * @example Open.Close <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="picker.open()">Open</button>
     * <button class="gj-button-md" onclick="picker.close()">Close</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoDateTimePicker(document.getElementById('picker'));
     * </script>
     */
    self.open = function () {
        gj.datepicker.methods.open(this, this.data().datepicker);
    };

    /** Close the calendar.
     * @method
     * @return datetimepicker
     * @example Open.Close <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="picker.open()">Open</button>
     * <button class="gj-button-md" onclick="picker.close()">Close</button>
     * <hr/>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoDateTimePicker(document.getElementById('picker'));
     * </script>
     */
    self.close = function () {
        gj.datepicker.methods.close(this);
    };

    /** Remove datetimepicker functionality from the element.
     * @method
     * @return datetimepicker
     * @example sample <!-- datetimepicker -->
     * <button class="gj-button-md" onclick="picker.destroy()">Destroy</button>
     * <input id="picker" width="312" />
     * <script>
     *     var picker = new GijgoDateTimePicker(document.getElementById('picker'));
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    //$.extend($element, self);
    if ('true' !== element.getAttribute('data-datetimepicker')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoDateTimePicker.prototype = new gj.widget();
GijgoDateTimePicker.constructor = GijgoDatePicker;
GijgoDateTimePicker.prototype.readConfig = gj.datetimepicker.methods.readConfig;

if (typeof jQuery !== "undefined") {
    (function ($) {
        $.fn.datetimepicker = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoDateTimePicker(this[0], method);
                } else {
                    $widget = new GijgoDateTimePicker(this[0], null);
                    if ($widget[method]) {
                        return $widget[method].apply(this[0], Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}

/* global window alert jQuery gj */
/**
  * @widget Slider
  * @plugin Base
  */
gj.slider = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.slider.config = {
    base: {

        /** The minimum value of the Slider.
         * @type number
         * @default 0
         * @example JS.Config <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        min: 5,
         *        max: 15,
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        min: 0,

        /** The maximum value of the Slider.
         * @type number
         * @default 10
         * @example JS.Config <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        max: 20,
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        max: 100,

        /** The width of the slider.
         * @type number
         * @default undefined
         * @example JS.Config <!-- slider -->
         * <input id="slider" />
         * <script>
         *    $('#slider').slider({ width: 400 });
         * </script>
         * @example HTML.Config <!-- slider -->
         * <input id="slider" width="400" />
         * <script>
         *    $('#slider').slider();
         * </script>
         */
        width: undefined,

        /** The orientation of a Slider: "horizontal" or "vertical".
         * @type (horizontal|vertical)
         * @default horizontal
         */
        // TODO orientation

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        uiLibrary: 'materialdesign',
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        uiLibrary: 'bootstrap',
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, slider -->
         * <div class="container" />
         *     <input id="slider" width="300" />
         *     Value: <span id="value"></span>
         * </div>
         * <script>
         *    $('#slider').slider({
         *        uiLibrary: 'bootstrap4',
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial slider value.
         * @type number
         * @default undefined
         * @example Javascript <!-- slider -->
         * <input id="slider" width="300" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        value: 30,
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         * @example HTML <!-- slider -->
         * <input id="slider" width="300" value="44" />
         * Value: <span id="value"></span>
         * <script>
         *    $('#slider').slider({
         *        slide: function (e, value) {
         *            document.getElementById('value').innerText = value;
         *        }
         *    });
         * </script>
         */
        value: undefined,

        icons: {},

        style: {
            wrapper: 'gj-slider gj-slider-md',
            progress: undefined,
            track: undefined
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-slider gj-slider-bootstrap gj-slider-bootstrap-3',
            progress: 'progress-bar',
            track: 'progress'
        }
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-slider gj-slider-bootstrap gj-slider-bootstrap-4',
            progress: 'progress-bar',
            track: 'progress'
        }
    }
};

gj.slider.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);
        this.element.setAttribute('data-slider', 'true');
        gj.slider.methods.initialize(this.element, this.getConfig());
        return this;
    },

    initialize: function (el, data) {
        var wrapper, track, handle, progress;

        el.style.display = 'none';

        wrapper = this.wrap('div');

        if (data.width) {
            gj.core.css(wrapper, 'width', data.width);
        }
        
        gj.core.addClasses(wrapper, data.style.wrapper);

        track = el.querySelector('[role="track"]');
        if (track == null) {
            track = document.createElement('div');
            track.setAttribute('role', 'track');
            wrapper.appendChild(track);
        }
        gj.core.addClasses(track, data.style.track);

        handle = el.querySelector('[role="handle"]');
        if (handle == null) {
            handle = document.createElement('div');
            handle.setAttribute('role', 'handle');
            wrapper.appendChild(handle);
        }

        progress = el.querySelector('[role="progress"]');
        if (progress == null) {
            progress = document.createElement('div');
            progress.setAttribute('role', 'progress');
            wrapper.appendChild(progress);
        }
        gj.core.addClasses(progress, data.style.progress);

        if (!data.value) {
            data.value = data.min;
        }
        gj.slider.methods.value(el, data, data.value);
        
        gj.documentManager.subscribeForEvent('mouseup', data.guid, gj.slider.methods.createMouseUpHandler(el, handle, data));
        handle.addEventListener('mousedown', gj.slider.methods.createMouseDownHandler(handle, data));
        gj.documentManager.subscribeForEvent('mousemove', data.guid, gj.slider.methods.createMouseMoveHandler(el, track, handle, progress, data));

        handle.addEventListener('click', function (e) { e.stopPropagation(); });
        wrapper.addEventListener('click', gj.slider.methods.createClickHandler(el, track, handle, data));
    },

    createClickHandler: function (el, track, handle, data) {
        return function (e) {
            var sliderPos, x, offset, stepSize, newValue;
            if (handle.getAttribute('drag') !== 'true') {
                sliderPos = gj.core.position(el.parentElement);
                x = new gj.widget().mouseX(e) - sliderPos.left;
                offset = gj.core.width(handle) / 2;
                stepSize = gj.core.width(track) / (data.max - data.min);
                newValue = Math.round((x - offset) / stepSize) + data.min;
                gj.slider.methods.value(el, data, newValue);
            }
        };
    },

    createMouseUpHandler: function (el, handle, data) {
        return function (e) {
            if (handle.getAttribute('drag') === 'true') {
                handle.setAttribute('drag', 'false');
                gj.slider.events.change(el);
            }
        }
    },

    createMouseDownHandler: function (handle, data) {
        return function (e) {
            handle.setAttribute('drag', 'true');
        }
    },

    createMouseMoveHandler: function (el, track, handle, progress, data) {
        return function (e) {
            var sliderPos, x, trackWidth, offset, stepSize, valuePos, newValue;
            if (handle.getAttribute('drag') === 'true') {
                sliderPos = gj.core.position(el.parentElement);
                x = new gj.widget().mouseX(e) - sliderPos.left;

                trackWidth = gj.core.width(track);
                offset = gj.core.width(handle) / 2;
                stepSize = trackWidth / (data.max - data.min);
                valuePos = (data.value - data.min) * stepSize;

                if (x >= offset && x <= (trackWidth + offset)) {
                    if (x > valuePos + (stepSize / 2) || x < valuePos - (stepSize / 2)) {
                        newValue = Math.round((x - offset) / stepSize) + data.min;
                        gj.slider.methods.value(el, data, newValue);
                    }
                }
            }
        }
    },

    value: function (el, data, value) {
        var stepSize, track, handle, progress;
        if (typeof (value) === "undefined") {
            return el.value;
        } else {
            el.setAttribute('value', value);
            data.value = value;
            track = el.parentElement.querySelector('[role="track"]')
            stepSize = gj.core.width(track) / (data.max - data.min);
            handle = el.parentElement.querySelector('[role="handle"]');
            handle.style.left = ((value - data.min) * stepSize) + 'px';
            progress = el.parentElement.querySelector('[role="progress"]');
            progress.style.width = ((value - data.min) * stepSize) + 'px';
            gj.slider.events.slide(el, value);
            return el;
        }
    },

    destroy: function (el) {
        var data = slider.getConfig(),
            wrapper = el.parentElement;
        if (data) {
            wrapper.removeChild(wrapper.querySelector('[role="track"]'));
            wrapper.removeChild(wrapper.querySelector('[role="handle"]'));
            wrapper.removeChild(wrapper.querySelector('[role="progress"]'));
            el.unwrap();
            slider.off();
            slider.removeConfig();
            el.removeAttribute('data-type');
            el.removeAttribute('data-gj-guid')
            el.removeAttribute('data-slider');
            el.removeAttribute('class');
            el.style.display = 'block';
        }
        return $slider;
    }
};

gj.slider.events = {
    /**
     * Fires when the slider value changes as a result of selecting a new value with the drag handle, buttons or keyboard.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- nojquery, slider -->
     * <input id="slider" width="300" />
     * <script>
     *     new GijgoSlider(document.getElementById('slider'), {
     *         change: function (e) {
     *             alert('Change is fired. The new value is ' + slider.value());
     *         }
     *     });
     * </script>
     */
    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Fires when the user drags the drag handle to a new position.
     * @event slide
     * @param {object} e - event data
     * @param {object} value - The value of the slider.
     * @example sample <!-- slider -->
     * <input id="slider" width="300" />
     * Value: <span id="value"></span>
     * <script>
     *    $('#slider').slider({
     *        value: 30,
     *        slide: function (e, value) {
     *            document.getElementById('value').innerText = value;
     *        }
     *    });
     * </script>
     */
    slide: function (el, value) {
        return el.dispatchEvent(new CustomEvent('slide', { 'value': value }));
    }
};

GijgoSlider = function (element, jsConfig) {
    var self = this,
        methods = gj.slider.methods;

    self.type = 'slider';
    self.element = element;

    /** Gets or sets the value of the slider.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- slider -->
     * <button class="gj-button-md" onclick="alert($slider.value())">Get Value</button>
     * <hr/>
     * <input id="slider" width="300" />
     * <script>
     *     var $slider = $('#slider').slider();
     * </script>
     * @example Set <!-- slider -->
     * <button class="gj-button-md" onclick="$slider.value(77)">Set Value</button>
     * <hr/>
     * <input id="slider" width="300"  />
     * <script>
     *     var $slider = $('#slider').slider();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this.element, this.getConfig(), value);
    };

    /** Remove slider functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- slider -->
     * <button class="gj-button-md" onclick="slider.destroy()">Destroy</button>
     * <input id="slider" width="300" />
     * <script>
     *     var slider = $('#slider').slider();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this.element);
    };

    //$.extend(element, self);
    if ('true' !== element.getAttribute('data-slider')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoSlider.prototype = new gj.widget();
GijgoSlider.constructor = GijgoSlider;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.slider = function (method) {
            var $widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoSlider(this[0], method);
                } else {
                    $widget = new GijgoSlider(this[0], null);
                    if ($widget[method]) {
                        return $widget[method].apply(this[0], Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}
/* global window alert jQuery gj */
/**
  * @widget ColorPicker
  * @plugin Base
  */
gj.colorpicker = {
    plugins: {},
    messages: {
        'en-us': {
        }
    }
};

gj.colorpicker.config = {
    base: {

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *    new GijgoColorPicker(document.getElementById('colorpicker'), { uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *     new GijgoColorPicker(document.getElementById('colorpicker'), { uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *     new GijgoColorPicker(document.getElementById('colorpicker'), { uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The initial colorpicker value.
         * @type number
         * @default undefined
         * @example Javascript <!-- colorpicker -->
         * <input id="colorpicker" width="300" />
         * <script>
         *    new GijgoColorPicker(document.getElementById('colorpicker'), { value: '#FF0000' });
         * </script>
         * @example HTML <!-- colorpicker -->
         * <input id="colorpicker" width="300" value="#FF0000" />
         * <script>
         *     new GijgoColorPicker(document.getElementById('colorpicker'));
         * </script>
         */
        value: undefined,

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
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="picker" />
     * <script>
     *     new GijgoColorPicker(document.getElementById('picker'),
     *         change: function (e) {
     *             console.log('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function (el) {
        return el.dispatchEvent(new Event('change'));
    },

    /**
     * Fires as a new color is displayed in the drop-down picker.
     * @additionalinfo This is not necessarily the "final" value; for example this event triggers when the sliders in the HSV selector are dragged, but then pressing ESC would cancel the selection and the color will revert to the original value.
     * @event select
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="picker" />
     * <script>
     *     new GijgoColorPicker(document.getElementById('picker'),
     *         select: function (e) {
     *             console.log('select is fired');
     *         }
     *     });
     * </script>
     */
    select: function (el) {
        return el.dispatchEvent(new Event('select'));
    },

    /**
     * Fires when the picker popup is opening.
     * @event open
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="picker" />
     * <script>
     *     new GijgoColorPicker(document.getElementById('picker'),
     *         open: function (e) {
     *             console.log('open is fired');
     *         }
     *     });
     * </script>
     */
    open: function (el) {
        return el.dispatchEvent(new Event('open'));
    },

    /**
     * Fires when the picker popup is closing.
     * @event close
     * @param {object} e - event data
     * @example sample <!-- colorpicker -->
     * <input id="colorpicker" />
     * <script>
     *     new GijgoColorPicker(document.getElementById('picker'),
     *         close: function (e) {
     *             console.log('close is fired');
     *         }
     *     });
     * </script>
     */
    close: function (el) {
        return el.dispatchEvent(new Event('close'));
    }
};

GijgoColorPicker = function (element, jsConfig) {
    var self = this,
        methods = gj.colorpicker.methods;

    self.type = 'colorpicker';
    self.element = element;

    /** Gets or sets the value of the colorpicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- colorpicker -->
     * <button class="gj-button-md" onclick="alert(colorpicker.value())">Get Value</button>
     * <hr/>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = new GijgoColorPicker(document.getElementById('colorpicker'));
     * </script>
     * @example Set <!-- colorpicker -->
     * <button class="gj-button-md" onclick="colorpicker.value('#FF0000')">Set Value</button>
     * <hr/>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = new GijgoColorPicker(document.getElementById('colorpicker'));
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove colorpicker functionality from the element.
     * @method
     * @return colorpicker
     * @example sample <!-- colorpicker -->
     * <button class="gj-button-md" onclick="colorpicker.destroy()">Destroy</button>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = new GijgoColorPicker(document.getElementById('colorpicker'));
     * </script>
     */
    self.destroy = function () {
        return gj.picker.widget.prototype.destroy.call(this, 'colorpicker');
    };

    /** Opens the popup element with the color selector.
     * @method
     * @return colorpicker
     * @example sample <!-- colorpicker -->
     * <button class="gj-button-md" onclick="colorpicker.open()">Open</button>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = new GijgoColorPicker(document.getElementById('colorpicker'));
     * </script>
     */
    self.open = function () {
        return methods.open(this);
    };

    /** Close the popup element with the color selector.
     * @method
     * @return colorpicker
     * @example sample <!-- colorpicker -->
     * <button class="gj-button-md" onclick="colorpicker.close()">Close</button>
     * <input id="colorpicker" />
     * <script>
     *     var colorpicker = new GijgoColorPicker(document.getElementById('colorpicker'));
     * </script>
     */
    self.close = function () {
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