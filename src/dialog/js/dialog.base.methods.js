gj.dialog.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.initJS.call(this, jsConfig, 'dialog');

        gj.dialog.methods.localization(this);
        gj.dialog.methods.initialize(this);
        gj.dialog.events.initialized(this.element);
        return this;
    },

    localization: function(dialog) {
        var data = gijgoStorage.get(dialog.element, 'gijgo');
        if (typeof data.title === 'undefined') {
            data.title = gj.dialog.messages[data.locale].DefaultTitle;
        }
    },

    getHTMLConfig: function () {
        var result = gj.widget.prototype.getHTMLConfig.call(this),
            attrs = this.attributes;
        if (attrs['title']) {
            result.title = attrs['title'].value;
        }
        return result;
    },

    initialize: function (dialog) {
        var data, header, body, footer;
        data = gijgoStorage.get(dialog.element, 'gijgo');

        gj.core.addClasses(dialog.element, data.style.content);

        gj.dialog.methods.setSize(dialog.element, data);

        if (data.closeOnEscape) {
            document.addEventListener('keyup', function (e) {
                if (e.key === 27) {
                    dialog.close();
                }
            });
        }

        body = dialog.element.querySelector('div[data-role="body"]');
        if (!body) {
            body = document.createElement('div');
            body.setAttribute('role', 'body');
            for(var i = 0; i < dialog.element.childNodes.length; i++)
            {
                body.appendChild(dialog.element.childNodes[i]);
            }
            dialog.element.appendChild(body);
        }
        gj.core.addClasses(body, data.style.body);

        header = gj.dialog.methods.renderHeader(dialog, data);

        footer = dialog.element.querySelector('div[data-role="footer"]');
        if (footer) {
            gj.core.addClasses(footer, data.style.footer);
        }

        dialog.element.querySelector('[data-role="close"]').addEventListener('click', function () {
            dialog.close();
        });

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
                var body = dialog.element.querySelector('div[data-role="body"]');
                body.style.height = (data.height - $header.outerHeight() - ($footer.length ? $footer.outerHeight() : 0)) + 'px';
            });            
        }

        if (data.modal) {
            $dialog.wrapAll('<div data-role="modal" class="' + data.style.modal + '"/>');
        }

        if (data.autoOpen) {
            dialog.open();
        }
    },

    setSize: function (el, data) {
        if (data.width) {
            el.style.width = data.width + 'px';
        }
        if (data.height) {
            el.style.height = data.height + 'px';
        }
    },

    renderHeader: function (dialog, data) {
        var header, title, closeButton;
        header = dialog.element.querySelector('div[data-role="header"]');
        if (!header) {
            header = document.createElement('div');
            header.setAttribute('data-role', 'header');
            dialog.element.insertBefore(header, dialog.element.children[0]);
        }
        gj.core.addClasses(header, data.style.header);

        title = header.querySelector('[data-role="title"]');
        if (!title) {
            title = document.createElement('h4');
            title.setAttribute('role', 'title');
            title.innerHTML = data.title;
            header.appendChild(title);
        }
        gj.core.addClasses(title, data.style.headerTitle);

        closeButton = header.querySelector('[data-role="close"]');
        if (!closeButton && data.closeButtonInHeader) {
            closeButton = document.createElement('button');
            closeButton.setAttribute('type', 'button');
            closeButton.setAttribute('data-role', 'close');
            closeButton.setAttribute('title', gj.dialog.messages[data.locale].Close);
            closeButton.innerHTML = '<span>×</span>';
            gj.core.addClasses(closeButton, data.style.headerCloseButton);
            header.appendChild(closeButton);
        } else if (closeButton && data.closeButtonInHeader === false) {
            closeButton.style.display = 'node';
        } else {
            closeButton.classList.add(data.style.headerCloseButton);
        }

        return header;
    },

    draggable: function ($dialog, $header) {
        $dialog.appendTo('body');
        $header.addClass('gj-draggable');
        $dialog.draggable({
            handle: $header,
            start: function () {
                $dialog.addClass('gj-unselectable');
                gj.dialog.events.dragStart($dialog);
            },
            stop: function () {
                $dialog.removeClass('gj-unselectable');
                gj.dialog.events.dragStop($dialog);
            }
        });
    },

    resizable: function ($dialog) {
        var config = {
            'drag': gj.dialog.methods.resize,
            'start': function () {
                $dialog.addClass('gj-unselectable');
                gj.dialog.events.resizeStart($dialog);
            },
            'stop': function () {
                this.removeAttribute('style');
                $dialog.removeClass('gj-unselectable');
                gj.dialog.events.resizeStop($dialog);
            }
        };
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-n"></div>').draggable($.extend(true, { horizontal: false }, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-e"></div>').draggable($.extend(true, { vertical: false }, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-s"></div>').draggable($.extend(true, { horizontal: false }, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-w"></div>').draggable($.extend(true, { vertical: false }, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-ne"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-nw"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-sw"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-se"></div>').draggable($.extend(true, {}, config)));
    },

    resize: function (e, newPosition) {
        var $el, $dialog, position, data, height, width, top, left, result = false;

        $el = $(this);
        $dialog = $el.parent();
        position = gj.core.position(this);
        offset = { top: newPosition.top - position.top, left: newPosition.left - position.left };
        data = $dialog.data();

        // TODO: Include margins in the calculations
        if ($el.hasClass('gj-resizable-n')) {
            height = $dialog.height() - offset.top;
            top = $dialog.offset().top + offset.top;
        } else if ($el.hasClass('gj-resizable-e')) {
            width = $dialog.width() + offset.left;
        } else if ($el.hasClass('gj-resizable-s')) {
            height = $dialog.height() + offset.top;
        } else if ($el.hasClass('gj-resizable-w')) {
            width = $dialog.width() - offset.left;
            left = $dialog.offset().left + offset.left;
        } else if ($el.hasClass('gj-resizable-ne')) {
            height = $dialog.height() - offset.top;
            top = $dialog.offset().top + offset.top;
            width = $dialog.width() + offset.left;
        } else if ($el.hasClass('gj-resizable-nw')) {
            height = $dialog.height() - offset.top;
            top = $dialog.offset().top + offset.top;
            width = $dialog.width() - offset.left;
            left = $dialog.offset().left + offset.left;
        } else if ($el.hasClass('gj-resizable-se')) {
            height = $dialog.height() + offset.top;
            width = $dialog.width() + offset.left;
        } else if ($el.hasClass('gj-resizable-sw')) {
            height = $dialog.height() + offset.top;
            width = $dialog.width() - offset.left;
            left = $dialog.offset().left + offset.left;
        }

        if (height && (!data.minHeight || height >= data.minHeight) && (!data.maxHeight || height <= data.maxHeight)) {
            $dialog.height(height);
            if (top) {
                $dialog.css('top', top);
            }
            result = true;
        }

        if (width && (!data.minWidth || width >= data.minWidth) && (!data.maxWidth || width <= data.maxWidth)) {
            $dialog.width(width);
            if (left) {
                $dialog.css('left', left);
            }
            result = true;
        }

        if (result) {
            gj.dialog.events.resize($dialog);
        }
        
        return result;
    },

    open: function (dialog, title) {
        var footer, modal, el = dialog.element;
        gj.dialog.events.opening(el);
        if (title !== undefined) {
            el.querySelector('[data-role="title"]').innerHTML = title;
        }
        el.style.display = 'block';
        modal = el.closest('div[data-role="modal"]');
        if (modal) {
            modal.style.display = 'block';
        }
        footer = el.querySelector('div[data-role="footer"]');
        if (footer) {
            el.querySelector('div[data-role="body"]').style.marginBottom = footer.offsetHeight;
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
            modal = el.closest('div[data-role="modal"]');
            if (modal) {
                modal.style.display = 'none';
            }
            gj.dialog.events.closed(el);
        }
        return dialog;
    },

    isOpen: function ($dialog) {
        return el.style.display != 'none';
    },

    content: function (dialog, html) {
        var body = dialog.element.querySelector('div[data-role="body"]');
        if (typeof (html) === "undefined") {
            return body.innerHTML;
        } else {
            body.innerHTML = html;
            return dialog;
        }
    },

    destroy: function ($dialog, keepHtml) {
        var data = $dialog.data();
        if (data) {
            if (keepHtml === false) {
                $dialog.remove();
            } else {
                $dialog.close();
                $dialog.off();
                $dialog.removeData();
                $dialog.removeAttr('data-type');
                $dialog.removeClass(data.style.content);
                $dialog.find('[data-role="header"]').removeClass(data.style.header);
                $dialog.find('[data-role="title"]').removeClass(data.style.headerTitle);
                $dialog.find('[data-role="close"]').remove();
                $dialog.find('[data-role="body"]').removeClass(data.style.body);
                $dialog.find('[data-role="footer"]').removeClass(data.style.footer);
            }
            
        }
        return $dialog;
    }
};