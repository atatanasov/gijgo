gj.dialog.methods = {

    init: function (jsConfig) {
        this.attr('data-type', 'dialog');
        gj.widget.prototype.init.call(this, jsConfig, 'dialog');

        gj.dialog.methods.initialize(this);
        gj.dialog.events.initialized(this);
        return this;
    },

    getHTMLConfig: function () {
        var result = gj.widget.prototype.getHTMLConfig.call(this),
            attrs = this[0].attributes;
        if (attrs['title']) {
            result.title = attrs['title'].nodeValue;
        }
        return result;
    },

    initialize: function ($dialog) {
        var data = $dialog.data(),
            $header, $body;

        $dialog.addClass(data.style.content);

        gj.dialog.methods.setSize($dialog);

        if (data.closeOnEscape) {
            $(document).keyup(function (e) {
                if (e.keyCode === 27) {
                    $dialog.close();
                }
            });
        }

        $body = $dialog.children('div[data-role="body"]');
        if ($body.length === 0) {
            $body = $('<div data-role="body"/>').addClass(data.style.body);
            $dialog.wrapInner($body);
        } else {
            $body.addClass(data.style.body);
        }

        $header = gj.dialog.methods.renderHeader($dialog);

        $dialog.children('div[data-role="footer"]').addClass(data.style.footer);

        $dialog.find('[data-role="close"]').on('click', function () {
            $dialog.close();
        });

        if (data.draggable && $.fn.draggable) {
            gj.dialog.methods.draggable($dialog, $header);
        }

        if (data.resizable && $.fn.draggable) {
            gj.dialog.methods.resizable($dialog);
        }

        gj.dialog.methods.setPosition($dialog);

        if (data.modal) {
            $dialog.wrapAll('<div data-role="modal" class="' + data.style.modal + '"/>');
        }

        if (data.autoOpen) {
            $dialog.open();
        }
    },

    setSize: function ($dialog) {
        var data = $dialog.data();
        if (data.width) {
            $dialog.css("width", data.width);
        }
        if (data.height) {
            $dialog.css("height", data.height);
        }
    },

    renderHeader: function ($dialog) {
        var $header, $title, $closeButton, data = $dialog.data();
        $header = $dialog.children('div[data-role="header"]');
        if ($header.length === 0) {
            $header = $('<div data-role="header" />');
            $dialog.prepend($header);
        }
        $header.addClass(data.style.header);

        $title = $header.find('[data-role="title"]');
        if ($title.length === 0) {
            $title = $('<h4 data-role="title">' + data.title + '</h4>');
            $header.append($title);
        }
        $title.addClass(data.style.headerTitle);

        $closeButton = $header.find('[data-role="close"]');
        if ($closeButton.length === 0 && data.closeButtonInHeader) {
            $closeButton = $('<button type="button" data-role="close"><span>×</span></button>');
            $closeButton.addClass(data.style.headerCloseButton);
            $header.prepend($closeButton);
        } else if ($closeButton.length > 0 && data.closeButtonInHeader === false) {
            $closeButton.hide();
        }

        return $header;
    },

    setPosition: function ($dialog) {
        var left = ($(window).width() / 2) - ($dialog.width() / 2),
            top = ($(window).height() / 2) - ($dialog.height() / 2);
        $dialog.css('position', 'absolute');
        $dialog.css('left', left > 0 ? left : 0);
        $dialog.css('top', top > 0 ? top : 0);
    },

    draggable: function ($dialog, $header) {
        $dialog.appendTo('body');
        $header.addClass('gj-draggable');
        $dialog.draggable({
            handle: $header,
            start: function () {
                $dialog.addClass('gj-dialog-unselectable');
                gj.dialog.events.dragStart($dialog);
            },
            stop: function () {
                $dialog.removeClass('gj-dialog-unselectable');
                gj.dialog.events.dragStop($dialog);
            }
        });
    },

    resizable: function ($dialog) {
        var config = {
            'drag': gj.dialog.methods.resize,
            'start': function () {
                $dialog.addClass('gj-dialog-unselectable');
                gj.dialog.events.resizeStart($dialog);
            },
            'stop': function () {
                $dialog.removeClass('gj-dialog-unselectable');
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

    resize: function (e, offset) {
        var $el, $dialog, data, height, width, top, left, result = false;

        $el = $(this);
        $dialog = $el.parent();
        data = $dialog.data();

        //TODO: Include margins in the calculations
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

    open: function ($dialog) {
        var $footer;
        gj.dialog.events.opening($dialog);
        $dialog.css('display', 'block');
        $dialog.closest('div[data-role="modal"]').css('display', 'block');
        $footer = $dialog.children('div[data-role="footer"]');
        if ($footer.length && $footer.outerHeight()) {
            $dialog.children('div[data-role="body"]').css('margin-bottom', $footer.outerHeight());
        }
        gj.dialog.events.opened($dialog);
        return $dialog;
    },

    close: function ($dialog) {
        if ($dialog.is(':visible')) {
            gj.dialog.events.closing($dialog);
            $dialog.css('display', 'none');
            $dialog.closest('div[data-role="modal"]').css('display', 'none');
            gj.dialog.events.closed($dialog);
        }
        return $dialog;
    },

    isOpen: function ($dialog) {
        return $dialog.is(':visible');
    }
};