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
            redo: '<i class="gj-icon redo" />',
            html: '<i class="gj-icon pencil" />'
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
            redo: '<i class="fa fa-repeat" aria-hidden="true"></i>',
            html: '<i class="fa fa-code" aria-hidden="true"></i>'
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

        if (editor.element.parentElement && editor.element.parentElement.getAttribute('data-gj-role') === 'wrapper') {
            wrapper = editor.element.parentElement;
        } else {
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
            gj.editor.methods.updateToolbar(editor, toolbar, data);
            gj.editor.events.changed(editor);
            editor.html(body.innerHTML);
        });
        
        // Add event listener for HTML textarea changes
        wrapper.addEventListener('input', function(e) {
            if (e.target.getAttribute('data-gj-role') === 'html-editor') {
                gj.editor.events.changed(editor);
                editor.html(e.target.value);
            }
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
                ],
                [
                    '<button type="button" class="' + data.style.button + '" title="' + msg.html + '" data-gj-role="html">' + data.icons.html + '</button>'
                ]
            ];
        }
    },

    updateToolbar: function (editor, toolbar, data) {
        var wrapper = editor.element.parentElement;
        var htmlTextarea = wrapper.querySelector('textarea[data-gj-role="html-editor"]');
        var isHtmlMode = htmlTextarea && htmlTextarea.style.display !== 'none';
        
        toolbar.querySelectorAll('[data-gj-role]').forEach(function(btn) {
            var cmd = btn.getAttribute('data-gj-role');
            
            if (cmd === 'html') {
                // Handle HTML button separately
                if (isHtmlMode) {
                    btn.classList.add(data.style.buttonActive);
                } else {
                    btn.classList.remove(data.style.buttonActive);
                }
            } else if (cmd && document.queryCommandEnabled(cmd) && document.queryCommandValue(cmd) === "true") {
                btn.classList.add(data.style.buttonActive);
            } else {
                btn.classList.remove(data.style.buttonActive);
            }
        });
    },

    executeCmd: function (editor, body, toolbar, btn, data) {
        var cmd = btn.getAttribute('data-gj-role');
        if (cmd === 'html') {
            gj.editor.methods.toggleHtmlMode(editor, body, toolbar, data);
        } else {
            body.focus();
            document.execCommand(cmd, false);
            gj.editor.methods.updateToolbar(editor, toolbar, data);
        }
    },

    toggleHtmlMode: function (editor, body, toolbar, data) {
        var wrapper = editor.element.parentElement;
        var htmlTextarea = wrapper.querySelector('textarea[data-gj-role="html-editor"]');
        var isHtmlMode = htmlTextarea && htmlTextarea.style.display !== 'none';

        if (isHtmlMode) {
            // Switch from HTML mode to rich text mode
            body.innerHTML = htmlTextarea.value;
            htmlTextarea.style.display = 'none';
            body.style.display = 'block';
            body.focus();
            gj.editor.methods.updateToolbar(editor, toolbar, data);
        } else {
            // Switch from rich text mode to HTML mode
            if (!htmlTextarea) {
                htmlTextarea = document.createElement('textarea');
                htmlTextarea.setAttribute('data-gj-role', 'html-editor');
                htmlTextarea.style.width = '100%';
                htmlTextarea.style.fontFamily = 'monospace';
                htmlTextarea.style.fontSize = '12px';
                htmlTextarea.style.border = '1px solid #ccc';
                htmlTextarea.style.padding = '5px';
                htmlTextarea.style.boxSizing = 'border-box';
                body.parentNode.insertBefore(htmlTextarea, body.nextSibling);
            }
            htmlTextarea.value = body.innerHTML;
            htmlTextarea.style.height = body.style.height;
            htmlTextarea.style.display = 'block';
            body.style.display = 'none';
            htmlTextarea.focus();
            
            // Update button state
            var htmlBtn = toolbar.querySelector('[data-gj-role="html"]');
            if (htmlBtn) {
                htmlBtn.classList.add(data.style.buttonActive);
            }
        }
    },

    content: function (editor, html) {
        var wrapper = editor.element.parentElement;
        var body = wrapper.querySelector('div[data-gj-role="body"]');
        var htmlTextarea = wrapper.querySelector('textarea[data-gj-role="html-editor"]');
        var isHtmlMode = htmlTextarea && htmlTextarea.style.display !== 'none';
        
        if (typeof html === "undefined") {
            // Get content
            if (isHtmlMode) {
                return htmlTextarea.value;
            } else {
                return body.innerHTML;
            }
        } else {
            // Set content
            if (isHtmlMode) {
                htmlTextarea.value = html;
            } else {
                body.innerHTML = html;
            }
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
