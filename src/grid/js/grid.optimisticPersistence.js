/** 
 * @widget Grid 
 * @plugin Optimistic Persistence
 */
gj.grid.plugins.optimisticPersistence = {

    config: {
        base: {
            optimisticPersistence: {
                /** Array that contains a list with param names that needs to be saved in the localStorage. You need to specify guid on the initialization of the grid in order to enable this feature.
                 * @additionalinfo This feature is using <a href="https://developer.mozilla.org/en/docs/Web/API/Window/localStorage" target="_blank">HTML5 localStorage</a> to store params and values.
                 * You can clear the data saved in localStorage when you clear your browser cache.
                 * @alias optimisticPersistence.localStorage
                 * @type array
                 * @default undefined
                 * @example sample <!-- bootstrap, grid  -->
                 * <p>Change the page and/or page size and then refresh the grid.</p>
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         guid: '58d47231-ac7b-e6d2-ddba-5e0195b31f2e',
                 *         uiLibrary: 'bootstrap',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         optimisticPersistence: { localStorage: ["page", "limit"] },
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                localStorage: undefined,

                /** Array that contains a list with param names that needs to be saved in the sessionStorage. You need to specify guid on the initialization of the grid in order to enable this feature.
                 * @additionalinfo This feature is using <a href="https://developer.mozilla.org/en/docs/Web/API/Window/sessionStorage" target="_blank">HTML5 sessionStorage</a> to store params and values.
                 * You can clear the data saved in sessionStorage when you open and close the browser.
                 * @alias optimisticPersistence.sessionStorage
                 * @type array
                 * @default undefined
                 * @example sample <!-- bootstrap, grid  -->
                 * <p>Change the page and/or page size and then refresh the grid. </p>
                 * <table id="grid"></table>
                 * <script>
                 *     var grid = $('#grid').grid({
                 *         guid: '58d47231-ac7b-e6d2-ddba-5e0195b31f2f',
                 *         uiLibrary: 'bootstrap',
                 *         dataSource: '/Players/Get',
                 *         columns: [ { field: 'ID', width: 36 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ],
                 *         optimisticPersistence: { sessionStorage: ["page", "limit"] },
                 *         pager: { limit: 2, sizes: [2, 5, 10, 20] }
                 *     });
                 * </script>
                 */
                sessionStorage: undefined
            }
        }
    },

    private: {
        applyParams: function ($grid) {
            var data = $grid.data(),
                params = {}, storage;
            storage = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
            if (storage && storage.optimisticPersistence) {
                $.extend(params, storage.optimisticPersistence);
            }
            storage = JSON.parse(localStorage.getItem('gj.grid.' + data.guid));
            if (storage && storage.optimisticPersistence) {
                $.extend(params, storage.optimisticPersistence);
            }
            $.extend(data.params, params);
        },

        saveParams: function ($grid) {
            var i, param,
                data = $grid.data(),
                storage = { optimisticPersistence: {} };

            if (data.optimisticPersistence.sessionStorage) {
                for (i = 0; i < data.optimisticPersistence.sessionStorage.length; i++) {
                    param = data.optimisticPersistence.sessionStorage[i];
                    storage.optimisticPersistence[param] = data.params[param];
                }
                storage = $.extend(true, JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid)), storage);
                sessionStorage.setItem('gj.grid.' + data.guid, JSON.stringify(storage));
            }

            if (data.optimisticPersistence.localStorage) {
                storage = { optimisticPersistence: {} };
                for (i = 0; i < data.optimisticPersistence.localStorage.length; i++) {
                    param = data.optimisticPersistence.localStorage[i];
                    storage.optimisticPersistence[param] = data.params[param];
                }
                storage = $.extend(true, JSON.parse(localStorage.getItem('gj.grid.' + data.guid)), storage);
                localStorage.setItem('gj.grid.' + data.guid, JSON.stringify(storage));
            }
        }
    },

    configure: function ($grid, fullConfig, clientConfig) {
        if (fullConfig.guid) {
            if (fullConfig.optimisticPersistence.localStorage || fullConfig.optimisticPersistence.sessionStorage) {
                gj.grid.plugins.optimisticPersistence.private.applyParams($grid);
                $grid.on('dataBound', function (e) {
                    gj.grid.plugins.optimisticPersistence.private.saveParams($grid);
                });
            }
        }
    }
};