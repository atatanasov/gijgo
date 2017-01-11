/* global window alert jQuery */
/** 
 * @widget Dialog 
 * @plugin Base
 */
if (typeof (gj.dialog) === 'undefined') {
    gj.dialog = {
        plugins: {}
    };
}

gj.dialog.config = {
    base: {
        /** If set to true, the dialog will automatically open upon initialization.
         * If false, the dialog will stay hidden until the open() method is called.
         * @type boolean
         * @default true
         * @example True <!-- dialog.base, draggable.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         autoOpen: true
         *     });
         * </script>
         * @example False <!-- dialog.base, bootstrap -->
         * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <button onclick="dialog.open()">Open Dialog</button>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         uiLibrary: 'bootstrap',
         *         autoOpen: false
         *     });
         * </script>
         */
        autoOpen: true,

        /** Specifies whether the dialog should close when it has focus and the user presses the escape (ESC) key.
         * @type boolean
         * @default true
         * @example True <!-- dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         closeOnEscape: true
         *     });
         * </script>
         * @example False <!-- dialog.base, draggable.base -->
         * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <button onclick="dialog.open()">Open Dialog</button>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         closeOnEscape: false
         *     });
         * </script>
         */
        closeOnEscape: true,

        /** Specifies whether the dialog should have a close button in right part of dialog header.
         * @type boolean
         * @default true
         * @example True <!-- dialog.base, draggable.base -->
         * <div id="dialog">
         *     <div data-role="header"><h4 data-role="title">Dialog</h4></div>
         *     <div data-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         *     <div data-role="footer">
         *         <button onclick="dialog.close()" class="gj-button">Ok</button>
         *         <button onclick="dialog.close()" class="gj-button">Cancel</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         closeButtonInHeader: true,
         *         height: 200
         *     });
         * </script>
         * @example False <!-- dialog.base, draggable.base, materialdesign -->
         * <div id="dialog">
         *     <div data-role="header"><h4 data-role="title">Dialog</h4></div>
         *     <div data-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         *     <div data-role="footer">
         *         <div class="mdl-dialog__actions">
         *             <button onclick="dialog.close()" class="mdl-button">Ok</button>
         *             <button onclick="dialog.close()" class="mdl-button">Cancel</button>
         *         </div>
         *     </div>
         * </div>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         closeButtonInHeader: false,
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         */
        closeButtonInHeader: true,

        /** If set to true, the dialog will be draggable by the title bar.
         * @type boolean
         * @default true
         * @example True <!-- draggable.base, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         draggable: true
         *     });
         * </script>
         * @example False <!-- draggable.base, dialog.base -->
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
         * @example sample <!-- draggable.base, dialog.base -->
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
         * @example sample <!-- draggable.base, dialog.base -->
         * <div id="dialog">The minimum height of this dialog is set to 200 px. Try to resize it for testing.</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true,
         *         height: 300,
         *         minHeight: 200
         *     });
         * </script>
         */
        minHeight: undefined,

        /** The maximum height in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable.base, dialog.base -->
         * <div id="dialog">The maximum height of this dialog is set to 300 px. Try to resize it for testing.</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true,
         *         height: 200,
         *         maxHeight: 300
         *     });
         * </script>
         */
        maxHeight: undefined,

        /** The width of the dialog.
         * @type number
         * @default 300
         * @example Fixed.Width <!-- draggable.base, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         width: 400
         *     });
         * </script>
         * @example Auto.Width <!-- draggable.base, dialog.base -->
         * <div id="dialog" title="Wikipedia">
         *   <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1122px-Wikipedia-logo-v2.svg.png" width="420"/>
         * </div>
         * <script>
         *     $("#dialog").dialog({
         *         width: 'auto'
         *     });
         * </script>
         */
        width: 300,

        /** The minimum width in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable.base, dialog.base -->
         * <div id="dialog">The minimum width of this dialog is set to 200 px. Try to resize it for testing.</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true,
         *         minWidth: 200
         *     });
         * </script>
         */
        minWidth: undefined,

        /** The maximum width in pixels to which the dialog can be resized.
         * @type number
         * @default undefined
         * @example sample <!-- draggable.base, dialog.base -->
         * <div id="dialog">The maximum width of this dialog is set to 400 px. Try to resize it for testing.</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true,
         *         maxWidth: 400
         *     });
         * </script>
         */
        maxWidth: undefined,

        /** If set to true, the dialog will have modal behavior.
         * Modal dialogs create an overlay below the dialog, but above other page elements and you can't interact with them.
         * @type boolean
         * @default false
         * @example True <!-- draggable.base, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         modal: true
         *     });
         * </script>
         * @example False <!-- draggable.base, dialog.base, bootstrap -->
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
         * @example True <!-- draggable.base, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         resizable: true
         *     });
         * </script>
         * @example False <!-- draggable.base, dialog.base -->
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
         * @example Js.Config <!-- draggable.base, dialog.base -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         title: 'My Custom Title'
         *     });
         * </script>
         * @example Html.Config <!-- draggable.base, dialog.base -->
         * <div id="dialog" title="My Custom Title">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog();
         * </script>
         */
        title: 'Dialog',

        /** The name of the UI library that is going to be in use. Currently we support only jQuery UI and Bootstrap. 
         * @additionalinfo The css files for jQuery UI, Foundation or Bootstrap should be manually included to the page where the dialog is in use.
         * @type string (jqueryui|bootstrap|foundation)
         * @default undefined
         * @example jQueryUI <!-- draggable.base, dialog.base, jqueryui -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         uiLibrary: 'jqueryui'
         *     });
         * </script>
         * @example jQueryUI.Theme <!-- draggable.base, dialog.base, jqueryui -->
         * <link href="https://code.jquery.com/ui/1.11.4/themes/start/jquery-ui.css" rel="stylesheet">
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         uiLibrary: 'jqueryui'
         *     });
         * </script>
         * @example Foundation <!-- draggable.base, dialog.base, foundation -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         uiLibrary: 'foundation'
         *     });
         * </script>
         * @example Bootstrap <!-- draggable.base, dialog.base, bootstrap -->
         * <div id="dialog">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         * <script>
         *     $("#dialog").dialog({
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Material.Design <!-- materialdesign, draggable.base, dialog.base  -->
         * <div id="dialog">
         *   <div data-role="body">
         *     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         *     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
         *   </div>
         *   <div data-role="footer">
         *     <div class="mdl-dialog__actions">
         *       <button class="mdl-button" onclick="dialog.close()">OK</button>
         *       <button class="mdl-button" data-role="close">Cancel</button>
         *     </div>
         *   </div>
         * </div>
         * <script>
         *     var dialog = $("#dialog").dialog({
         *         uiLibrary: 'materialdesign',
         *         resizable: true
         *     });
         * </script>
         */
        uiLibrary: undefined,

        style: {
            modal: 'gj-modal',
            content: 'gj-content',
            header: 'gj-header',
            headerTitle: 'gj-title gj-unselectable',
            headerCloseButton: 'gj-close',
            body: 'gj-body',
            footer: 'gj-dialog-footer gj-footer'
        }
    },

    bootstrap: {
        style: {
            modal: 'modal',
            content: 'modal-content',
            header: 'modal-header',
            headerTitle: 'modal-title',
            headerCloseButton: 'close',
            body: 'modal-body',
            footer: 'gj-dialog-footer modal-footer'
        }
    },

    jqueryui: {
        style: {
            modal: 'gj-modal',
            content: 'ui-widget ui-widget-content gj-dialog-content',
            header: 'gj-dialog-ui-header ui-widget-header',
            headerTitle: 'gj-dialog-ui-title',
            headerCloseButton: 'gj-dialog-ui-close ui-button ui-widget ui-state-default ui-corner-all',
            body: 'gj-dialog-ui-body',
            footer: 'gj-dialog-footer'
        }
    },

    foundation: {
        style: {
            modal: 'reveal-modal-bg',
            content: 'reveal-modal gj-dialog-fd-content',
            header: '',
            headerTitle: 'gj-dialog-fd-title gj-unselectable',
            headerCloseButton: 'close-reveal-modal right gj-dialog-fd-close',
            body: 'gj-dialog-fd-body',
            footer: 'gj-dialog-footer gj-dialog-fd-footer'
        }
    },

    materialdesign: {
        style: {
            modal: 'gj-modal',
            content: 'mdl-dialog gj-dialog-mdl-content',
            header: '',
            headerTitle: 'mdl-dialog__title gj-unselectable',
            headerCloseButton: 'gj-dialog-mdl-close',
            body: 'mdl-dialog__content',
            footer: 'gj-dialog-footer'
        }
    }
};