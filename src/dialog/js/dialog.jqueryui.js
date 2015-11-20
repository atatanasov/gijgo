/** 
  * @widget Dialog 
  * @plugin jQuery UI
  */
if (typeof (gj.dialog.plugins) === 'undefined') {
    gj.dialog.plugins = {};
}

gj.dialog.plugins.jqueryui = {
    'configuration': {
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

    'configure': function ($dialog) {
        if ($dialog.data('uiLibrary') === 'jqueryui') {
            $dialog.data('style', gj.dialog.plugins.jqueryui.configuration.style);
        }
    }
};