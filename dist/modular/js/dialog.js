/*
 * Gijgo Dialog v2.0.0-alpha-1
 * http://gijgo.com/dialog
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
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
         * @type string (bootstrap|bootstrap4|bootstrap5|materialdesign|shadcn)
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
         * @example Shadcn <!-- draggable, dialog.base -->
         * <div id="dialog">
         *     <div data-gj-role="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
         *     <div data-gj-role="footer">
         *         <button type="button" data-gj-role="close">Cancel</button>
         *         <button type="button" data-gj-role="close">OK</button>
         *     </div>
         * </div>
         * <script>
         *     var dialog = new GijgoDialog(document.getElementById('dialog'), {
         *         uiLibrary: 'shadcn'
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
    },

    shadcn: {
        style: {
            modal: 'gj-modal',
            content: 'gj-dialog-shadcn',
            header: 'gj-dialog-shadcn-header gj-unselectable',
            headerTitle: 'gj-dialog-shadcn-title',
            headerCloseButton: 'gj-dialog-shadcn-close',
            body: 'gj-dialog-shadcn-body',
            footer: 'gj-dialog-footer gj-dialog-shadcn-footer'
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
