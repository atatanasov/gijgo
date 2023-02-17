/*
 * Gijgo Dialog v2.0.0-alpha-1
 * http://gijgo.com/dialog
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery */
/**  */gj.dialog = {
    plugins: {},
    messages: {}
};

gj.dialog.config = {
    base: {
        /** If set to true, the dialog will automatically open upon initialization.
         * If false, the dialog will stay hidden until the open() method is called.         */        autoOpen: true,

        /** Specifies whether the dialog should have a close button in right part of dialog header.         */        closeButtonInHeader: true,

        /** Specifies whether the dialog should close when it has focus and the user presses the escape (ESC) key.         */        closeOnEscape: true,

        /** If set to true, the dialog will be draggable by the title bar.         */        draggable: true,

        /** The height of the dialog.         */        height: 'auto',

        /** The language that needs to be in use.         */        locale: 'en-us',

        /** The maximum height in pixels to which the dialog can be resized.         */        maxHeight: undefined,

        /** The maximum width in pixels to which the dialog can be resized.         */        maxWidth: undefined,

        /** The minimum height in pixels to which the dialog can be resized.         */        minHeight: undefined,

        /** The minimum width in pixels to which the dialog can be resized.         */        minWidth: undefined,

        /** If set to true, the dialog will have modal behavior.
         * Modal dialogs create an overlay below the dialog, but above other page elements and you can't interact with them.         */        modal: false,

        /** If set to true, the dialog will be resizable.         */        resizable: false,

        /** If set to true, add vertical scroller to the dialog body.         */        scrollable: false,

        /** The title of the dialog. Can be also set through the title attribute of the html element.         */        title: undefined,

        /** The name of the UI library that is going to be in use. Currently we support Material Design and Bootstrap.         */        uiLibrary: undefined,

        /** The width of the dialog.         */        width: 300,

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
/**   */gj.dialog.events = {
    /**
     * Triggered when the dialog is initialized.
     *     */    initialized: function (el) {
        return el.dispatchEvent(new Event('initialized'));
    },

    /**
     * Triggered before the dialog is opened.     */    opening: function (el) {
        return el.dispatchEvent(new Event('opening'));
    },

    /**
     * Triggered when the dialog is opened.     */    opened: function (el) {
        return el.dispatchEvent(new Event('opened'));
    },

    /**
     * Triggered before the dialog is closed.     */    closing: function (el) {
        return el.dispatchEvent(new Event('closing'));
    },

    /**
     * Triggered when the dialog is closed.     */    closed: function (el) {
        return el.dispatchEvent(new Event('closed'));
    },

    /**
     * Triggered while the dialog is being dragged.     */    drag: function (el) {
        return el.dispatchEvent(new Event('drag'));
    },

    /**
     * Triggered when the user starts dragging the dialog.     */    dragStart: function (el) {
        return el.dispatchEvent(new Event('dragStart'));
    },

    /**
     * Triggered after the dialog has been dragged.     */    dragStop: function (el) {
        return el.dispatchEvent(new Event('dragStop'));
    },

    /**
     * Triggered while the dialog is being resized.     */    resize: function (el) {
        return el.dispatchEvent(new Event('resize'));
    },

    /**
     * Triggered when the user starts resizing the dialog.     */    resizeStart: function (el) {
        return el.dispatchEvent(new Event('resizeStart'));
    },

    /**
     * Triggered after the dialog has been resized.     */    resizeStop: function (el) {
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
/**   */GijgoDialog = function (element, jsConfig) {
    var self = this,
        methods = gj.dialog.methods;

    self.type = 'dialog';
    self.element = element;

    /**
     * Opens the dialog.     */    self.open = function (title) {
        return methods.open(this, title);
    };

    /**
     * Close the dialog.     */    self.close = function () {
        return methods.close(this);
    };

    /**
     * Check if the dialog is currently open.     */    self.isOpen = function () {
        return methods.isOpen(this.element);
    };

    /**
     * Gets or set the content of a dialog. Supports chaining when used as a setter.     */    self.content = function (content) {
        return methods.content(this, content);
    };

    /**
     * Destroy the dialog.     */    self.destroy = function (keepHtml) {
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
gj.dialog.messages['bg-bg'] = {
    Close: 'Затваряне',
    DefaultTitle: 'Диалогов Прозорец'
};
gj.dialog.messages['fr-fr'] = {
    Close: 'Fermer',
    DefaultTitle: 'Dialogue'
};
gj.dialog.messages['de-de'] = {
    Close: 'Schlie\u00dfen',
    DefaultTitle: 'Dialog'
};
gj.dialog.messages['pt-br'] = {
    Close: 'Fechar',
    DefaultTitle: 'Caixa de diálogo'
};
gj.dialog.messages['ru-ru'] = {
    Close: 'Закрыть',
    DefaultTitle: 'Сообщение'
};
gj.dialog.messages['es-es'] = {
    Close: 'Cerrar',
    DefaultTitle: 'Titulo por defecto'
};
gj.dialog.messages['it-it'] = {
    Close: 'Chiudi',
    DefaultTitle: 'Dialogo'
};
gj.dialog.messages['tr-tr'] = {
    Close: 'Kapat',
    DefaultTitle: 'Diyalog'
};
gj.dialog.messages['ja-jp'] = {
    Close: '閉じる',
    DefaultTitle: 'ダイアログ'
};
gj.dialog.messages['zh-cn'] = {
    Close: '关闭',
    DefaultTitle: '对话框'
};
gj.dialog.messages['zh-tw'] = {
    Close: '關閉',
    DefaultTitle: '對話框'
};
gj.dialog.messages['lv-lv'] = {
    Close: 'Aizvert',
    DefaultTitle: 'Īsziņa'
};
gj.dialog.messages['cs-cz'] = {
    Close: 'Zavřít',
    DefaultTitle: 'Dialog'
};
gj.dialog.messages['az-az'] = {
    Close: 'Bağla',
    DefaultTitle: 'Dialoq'
};
gj.dialog.messages['el-gr'] = {
    Close: 'Κλέισιμο',
    DefaultTitle: 'Πλαίσιο Διαλόγου'
};
gj.dialog.messages['hu-hu'] = {
    Close: 'Bezár',
    DefaultTitle: 'Dialógus'
};
gj.dialog.messages['nl-nl'] = {
    Close: 'Sluiten',
    DefaultTitle: 'Venster'
};

gj.dialog.messages['ro-ro'] = {
    Close: 'Închide',
    DefaultTitle: 'Mesaj'
};

