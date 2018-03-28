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
         *     $('#editor').editor({ height: 400 });
         * </script>
         */
        height: 300,

        /** The width of the editor. Numeric values are treated as pixels.
         * @type number|string
         * @default undefined
         * @example JS <!-- editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({ width: 900 });
         * </script>
         * @example HTML <!-- editor -->
         * <div id="editor" width="900"></div>
         * <script>
         *     $('#editor').editor();
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
         *     $('#editor').editor({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({
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
         *     $('#editor').editor({
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         * @example Bootstrap.3.FontAwesome <!-- bootstrap, fontawesome, editor -->
         * <textarea id="editor"></textarea>
         * <script>
         *     $('#editor').editor({
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
         *     $("#editor").editor({
         *         locale: 'fr-fr'
         *     });
         * </script>
         * @example German <!-- editor -->
         * <script src="../../dist/modular/editor/js/messages/messages.de-de.js"></script>
         * <div id="editor">Hover <b><u>buttons</u></b> in the toolbar in order to see localized tooltips</div>
         * <script>
         *     $("#editor").editor({
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
        gj.widget.prototype.init.call(this, jsConfig, 'editor');
        this.attr('data-editor', 'true');
        gj.editor.methods.initialize(this);
        return this;
    },

    initialize: function ($editor) {
        var self = this, data = $editor.data(),
            $group, $btn, wrapper, $body, $toolbar;

        $editor.hide();

        if ($editor[0].parentElement.attributes.role !== 'wrapper') {
            wrapper = document.createElement('div');
            wrapper.setAttribute('role', 'wrapper');
            $editor[0].parentNode.insertBefore(wrapper, $editor[0]);
            wrapper.appendChild($editor[0]);
        }

        gj.editor.methods.localization(data);
        $(wrapper).addClass(data.style.wrapper);
        if (data.width) {
            $(wrapper).width(data.width);
        }

        $body = $(wrapper).children('div[role="body"]');
        if ($body.length === 0) {
            $body = $('<div role="body"></div>');
            $(wrapper).append($body);
            if ($editor[0].innerText) {
                $body[0].innerHTML = $editor[0].innerText;
            }
        }
        $body.attr('contenteditable', true);
        $body.on('keydown', function (e) {
            var key = event.keyCode || event.charCode;
            if (gj.editor.events.changing($editor) === false && key !== 8 && key !== 46) {
                e.preventDefault();
            }
        });
        $body.on('mouseup keyup mouseout cut paste', function (e) {
            self.updateToolbar($editor, $toolbar);
            gj.editor.events.changed($editor);
            $editor.html($body.html());
        });

        $toolbar = $(wrapper).children('div[role="toolbar"]');
        if ($toolbar.length === 0) {
            $toolbar = $('<div role="toolbar"></div>');
            $body.before($toolbar);

            for (var group in data.buttons) {
                $group = $('<div />').addClass(data.style.buttonsGroup);
                for (var btn in data.buttons[group]) {
                    $btn = $(data.buttons[group][btn]);
                    $btn.on('click', function () {
                        gj.editor.methods.executeCmd($editor, $body, $toolbar, $(this));
                    });
                    $group.append($btn);
                }
                $toolbar.append($group);
            }
        }

        $body.height(data.height - gj.core.height($toolbar[0], true));
    },

    localization: function (data) {
        var msg = gj.editor.messages[data.locale];
        if (typeof (data.buttons) === 'undefined') {
            data.buttons = [
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.bold + '" role="bold">' + data.icons.bold + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.italic + '" role="italic">' + data.icons.italic + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.strikethrough + '" role="strikethrough">' + data.icons.strikethrough + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.underline + '" role="underline">' + data.icons.underline + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.listBulleted + '" role="insertunorderedlist">' + data.icons.listBulleted + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.listNumbered + '" role="insertorderedlist">' + data.icons.listNumbered + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.indentDecrease + '" role="outdent">' + data.icons.indentDecrease + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.indentIncrease + '" role="indent">' + data.icons.indentIncrease + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignLeft + '" role="justifyleft">' + data.icons.alignLeft + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignCenter + '" role="justifycenter">' + data.icons.alignCenter + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignRight + '" role="justifyright">' + data.icons.alignRight + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.alignJustify + '" role="justifyfull">' + data.icons.alignJustify + '</button>'
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.undo + '" role="undo">' + data.icons.undo + '</button>',
                    '<button type="button" class="' + data.style.button + '" title="' + msg.redo + '" role="redo">' + data.icons.redo + '</button>'
                ]
            ];
        }
    },

    updateToolbar: function ($editor, $toolbar) {
        var data = $editor.data();
        $buttons = $toolbar.find('[role]').each(function() {
            var $btn = $(this),
                cmd = $btn.attr('role');

            if (cmd && document.queryCommandEnabled(cmd) && document.queryCommandValue(cmd) === "true") {
                $btn.addClass(data.style.buttonActive);
            } else {
                $btn.removeClass(data.style.buttonActive);
            }
        });
    },

    executeCmd: function ($editor, $body, $toolbar, $btn) {
        $body.focus();
        document.execCommand($btn.attr('role'), false);
        gj.editor.methods.updateToolbar($editor, $toolbar);
    },

    content: function ($editor, html) {
        var $body = $editor.parent().children('div[role="body"]');
        if (typeof (html) === "undefined") {
            return $body.html();
        } else {
            return $body.html(html);
        }
    },

    destroy: function ($editor) {
        var $wrapper;
        if ($editor.attr('data-editor') === 'true') {
            $wrapper = $editor.parent();
            $wrapper.children('div[role="body"]').remove();
            $wrapper.children('div[role="toolbar"]').remove();
            $editor.unwrap();
            $editor.removeData();
            $editor.removeAttr('data-guid');
            $editor.removeAttr('data-editor');
            $editor.off();
            $editor.show();
        }
        return $editor;
    }
};

gj.editor.events = {

    /**
     * Event fires before change of text in the editor.
     *
     * @event changing
     * @param {object} e - event data
     * @example MaxLength <!-- editor -->
     * <textarea id="editor"></textarea>
     * <script>
     *     var editor = $('#editor').editor();
     *     editor.on('changing', function (e) {
     *         return $(e.target).text().length < 3;
     *     });
     * </script>
     */
    changing: function ($editor) {
        return $editor.triggerHandler('changing');
    },

    /**
     * Event fires after change of text in the editor.
     *
     * @event changed
     * @param {object} e - event data
     * @example sample <!-- editor -->
     * <textarea id="editor"></textarea>
     * <script>
     *     $('#editor').editor({
     *         changed: function (e) {
     *             alert('changed is fired');
     *         }
     *     });
     * </script>
     */
    changed: function ($editor) {
        return $editor.triggerHandler('changed');
    }
};

gj.editor.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.editor.methods;

    /** Get or set html content in the body.
     * @method
     * @param {string} html - The html content that needs to be set.
     * @return string | editor
     * @example Get <!-- editor, materialicons -->
     * <button class="gj-button-md" onclick="alert($editor.content())">Get Content</button>
     * <hr/>
     * <div id="editor">My <b>content</b>.</div>
     * <script>
     *     var $editor = $('#editor').editor();
     * </script>
     * @example Set <!-- editor, materialicons -->
     * <button class="gj-button-md" onclick="$editor.content('<h1>new value</h1>')">Set Content</button>
     * <hr/>
     * <textarea id="editor"></textarea>
     * <script>
     *     var $editor = $('#editor').editor();
     * </script>
     */
    self.content = function (html) {
        return methods.content(this, html);
    };

    /** Remove editor functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- editor, materialicons -->
     * <button class="gj-button-md" onclick="editor.destroy()">Destroy</button><br/>
     * <textarea id="editor"></textarea>
     * <script>
     *     var editor = $('#editor').editor();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-editor')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.editor.widget.prototype = new gj.widget();
gj.editor.widget.constructor = gj.editor.widget;

(function ($) {
    $.fn.editor = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.editor.widget(this, method);
            } else {
                $widget = new gj.editor.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);