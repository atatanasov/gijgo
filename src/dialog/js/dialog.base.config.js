/* global window alert jQuery */
/*
 * Gijgo JavaScript Library v0.6.0
 * http://gijgo.com/
 *
 * Copyright 2014, 2015 gijgo.com
 * Released under the MIT license
 */
/** 
  * @widget Dialog 
  * @plugin Base
  */
if (typeof (gj) === 'undefined') {
    gj = {};
}
if (typeof (gj.dialog) === 'undefined') {
    gj.dialog = {};
}

gj.dialog.configuration = {
    base: {
        /** If set to true, the dialog will automatically open upon initialization.
          * If false, the dialog will stay hidden until the open() method is called.
          * @type boolean
          * @default true
          * @example <!-- draggable.base, dialog.base, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         autoOpen: true
          *     });
          * </script>
          * @example <!-- draggable.base, dialog.base, bootstrap -->
          * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <button onclick="dialog.open()">Open Dialog</button>
          * <script>
          *     var dialog = $("#dialog").dialog({
          *         autoOpen: false
          *     });
          * </script>
          */
        autoOpen: true,
        /** Specifies whether the dialog should close when it has focus and the user presses the escape (ESC) key.
          * @type boolean
          * @default true
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         closeOnEscape: true
          *     });
          * </script>
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <button onclick="dialog.open()">Open Dialog</button>
          * <script>
          *     var dialog = $("#dialog").dialog({
          *         closeOnEscape: false
          *     });
          * </script>
          */
        closeOnEscape: true,
        /** If set to true, the dialog will be draggable by the title bar.
          * @type boolean
          * @default true
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         draggable: true
          *     });
          * </script>
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
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
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         height: 400
          *     });
          * </script>
          */
        height: 'auto',
        /** The minimum height in pixels to which the dialog can be resized.
          * @type number
          * @default undefined
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         resizable: true,
          *         minHeight: 500
          *     });
          * </script>
          */
        minHeight: undefined,
        /** The maximum height in pixels to which the dialog can be resized.
          * @type number
          * @default undefined
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         resizable: true,
          *         maxHeight: 500
          *     });
          * </script>
          */
        maxHeight: undefined,
        /** The width of the dialog.
          * @type number
          * @default 300
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         width: 400
          *     });
          * </script>
          */
        width: 300,
        /** The minimum width in pixels to which the dialog can be resized.
          * @type number
          * @default undefined
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         resizable: true,
          *         minWidth: 1000
          *     });
          * </script>
          */
        minWidth: undefined,
        /** The maximum width in pixels to which the dialog can be resized.
          * @type number
          * @default undefined
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         resizable: true,
          *         maxWidth: 1000
          *     });
          * </script>
          */
        maxWidth: undefined,
        /** If set to true, the dialog will have modal behavior.
          * Modal dialogs create an overlay below the dialog, but above other page elements and you can't interact with them.
          * @type boolean
          * @default false
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         modal: true
          *     });
          * </script>
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         modal: false
          *     });
          * </script>
          */
        modal: false,
        /** If set to true, the dialog will be resizable.
          * @type boolean
          * @default false
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         resizable: true
          *     });
          * </script>
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         resizable: false
          *     });
          * </script>
          */
        resizable: false,
        /** The title of the dialog. Can be also set through the title attribute of the html element.
          * @type string
          * @default "Dialog"
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         title: 'My Custom Title'
          *     });
          * </script>
          * @example <!-- draggable, dialog, bootstrap -->
          * <div id="dialog" title="My Custom Title">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog();
          * </script>
          */
        title: 'Dialog',
        /** The name of the UI library that is going to be in use. Currently we support only jQuery UI and Bootstrap. 
          * @additionalinfo The css files for jQuery UI, Foundation or Bootstrap should be manually included to the page where the dialog is in use.
          * @type (jqueryui|bootstrap|foundation)
          * @default "bootstrap"
          * @example  <!-- draggable, dialog, jqueryui -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         uiLibrary: 'jqueryui'
          *     });
          * </script>
          * @example  <!-- draggable, dialog, jqueryui -->
          * <link href="https://code.jquery.com/ui/1.11.4/themes/start/jquery-ui.css" rel="stylesheet">
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         uiLibrary: 'jqueryui'
          *     });
          * </script>
          * @example  <!-- draggable, dialog, foundation -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         uiLibrary: 'foundation'
          *     });
          * </script>
          * @example  <!-- draggable, dialog, bootstrap -->
          * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
          * <script>
          *     $("#dialog").dialog({
          *         uiLibrary: 'bootstrap'
          *     });
          * </script>
          */
        uiLibrary: 'bootstrap',
        style: {
            modal: 'modal',
            content: 'modal-content',
            header: 'modal-header',
            headerTitle: 'modal-title',
            headerCloseButton: 'close',
            body: 'modal-body',
            footer: 'gj-dialog-footer modal-footer'
        }
    }
};