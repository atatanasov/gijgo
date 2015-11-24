/** 
  * @widget Dialog 
  * @plugin Bootstrap
  */
gj.dialog.plugins.bootstrap = {
    config: {
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
            $dialog.data('style', gj.dialog.plugins.bootstrap.config.style);
        }
    }
};