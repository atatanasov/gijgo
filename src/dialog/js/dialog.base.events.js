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
