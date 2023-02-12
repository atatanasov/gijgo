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