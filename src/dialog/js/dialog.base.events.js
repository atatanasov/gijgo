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
     *     var dialog = $("#dialog").dialog({
     *         autoOpen: false,
     *         initialized: function (e) {
     *             alert('The initialized event is fired.');
     *         }
     *     });
     * </script>
     */
    initialized: function ($dialog) {
        $dialog.trigger("initialized");
    },

    /**
     * Triggered before the dialog is opened.
     * @event opening
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog({
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
    opening: function ($dialog) {
        $dialog.trigger("opening");
    },

    /**
     * Triggered when the dialog is opened.
     * @event opened
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog({
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
    opened: function ($dialog) {
        $dialog.trigger("opened");
    },

    /**
     * Triggered before the dialog is closed.
     * @event closing
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Close the dialog in order to fire closing event.</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog({
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
    closing: function ($dialog) {
        $dialog.trigger("closing");
    },

    /**
     * Triggered when the dialog is closed.
     * @event closed
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Close the dialog in order to fire closed event.</div>
     * <button onclick="dialog.open()" class="gj-button-md">Open Dialog</button>
     * <script>
     *     var dialog = $("#dialog").dialog({
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
    closed: function ($dialog) {
        $dialog.trigger("closed");
    },

    /**
     * Triggered while the dialog is being dragged.
     * @event drag
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         drag: function (e) {
     *             log.append('<div class="row">The drag event is fired.</div>');
     *         },
     *         dragStart: function (e) {
     *             log.append('<div class="row">The dragStart event is fired.</div>');
     *         },
     *         dragStop: function (e) {
     *             log.append('<div class="row">The dragStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    drag: function ($dialog) {
        $dialog.trigger("drag");
    },

    /**
     * Triggered when the user starts dragging the dialog.
     * @event dragStart
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         drag: function (e) {
     *             log.append('<div class="row">The drag event is fired.</div>');
     *         },
     *         dragStart: function (e) {
     *             log.append('<div class="row">The dragStart event is fired.</div>');
     *         },
     *         dragStop: function (e) {
     *             log.append('<div class="row">The dragStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    dragStart: function ($dialog) {
        $dialog.trigger("dragStart");
    },

    /**
     * Triggered after the dialog has been dragged.
     * @event dragStop
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         drag: function (e) {
     *             log.append('<div class="row">The drag event is fired.</div>');
     *         },
     *         dragStart: function (e) {
     *             log.append('<div class="row">The dragStart event is fired.</div>');
     *         },
     *         dragStop: function (e) {
     *             log.append('<div class="row">The dragStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    dragStop: function ($dialog) {
        $dialog.trigger("dragStop");
    },

    /**
     * Triggered while the dialog is being resized.
     * @event resize
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         resizable: true,
     *         resize: function (e) {
     *             log.append('<div class="row">The resize event is fired.</div>');
     *         },
     *         resizeStart: function (e) {
     *             log.append('<div class="row">The resizeStart event is fired.</div>');
     *         },
     *         resizeStop: function (e) {
     *             log.append('<div class="row">The resizeStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    resize: function ($dialog) {
        $dialog.trigger("resize");
    },

    /**
     * Triggered when the user starts resizing the dialog.
     * @event resizeStart
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         resizable: true,
     *         resize: function (e) {
     *             log.append('<div class="row">The resize event is fired.</div>');
     *         },
     *         resizeStart: function (e) {
     *             log.append('<div class="row">The resizeStart event is fired.</div>');
     *         },
     *         resizeStop: function (e) {
     *             log.append('<div class="row">The resizeStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    resizeStart: function ($dialog) {
        $dialog.trigger("resizeStart");
    },

    /**
     * Triggered after the dialog has been resized.
     * @event resizeStop
     * @param {object} e - event data
     * @example sample <!-- draggable, dialog.base, bootstrap -->
     * <div id="dialog" style="display: none">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
     * <div id="logPanel" class="col-xs-12 well pre-scrollable" style="height: 200px"></div>
     * <script>
     *     var log = $('#logPanel');
     *     $("#dialog").dialog({
     *         resizable: true,
     *         resize: function (e) {
     *             log.append('<div class="row">The resize event is fired.</div>');
     *         },
     *         resizeStart: function (e) {
     *             log.append('<div class="row">The resizeStart event is fired.</div>');
     *         },
     *         resizeStop: function (e) {
     *             log.append('<div class="row">The resizeStop event is fired.</div>');
     *         }
     *     });
     * </script>
     */
    resizeStop: function ($dialog) {
        $dialog.trigger("resizeStop");
    }
};
