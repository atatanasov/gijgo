/** 
  * @widget Dialog 
  * @plugin Bootstrap
  */
if (typeof (gj.dialog.plugins) === 'undefined') {
    gj.dialog.plugins = {};
}

gj.dialog.plugins.bootstrap = {
    'configuration': {
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

    'configure': function ($dialog) {
        if ($dialog.data('uiLibrary') === 'bootstrap') {
            $dialog.data('style', gj.dialog.plugins.bootstrap.configuration.style);
        }
    }
};