/* global window alert jQuery gj */
/**
  * @widget DropDown
  * @plugin Base
  */
if (typeof (gj.dropdown) === 'undefined') {
    gj.dropdown = {
        plugins: {}
    };
}

gj.dropdown.config = {
    base: {

        /** The data source of dropdown.
         * @additionalinfo If set to string, then the dropdown is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the dropdown is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the dropdown is going to use the array as data for dropdown nodes.
         * @type (string|object|array)
         * @default undefined
         * @example Local.DataSource <!-- materialicons, dropdown -->
         * <select id="dropdown"></select>
         * <script>
         *     $('#dropdown').dropdown({
         *         dataSource: [ { value: 1, text: 'One' }, { value: 2, text: 'Two' }, { value: 3, text: 'Three' } ]
         *     });
         * </script>
         * @example Remote.DataSource <!-- materialicons, dropdown -->
         * <select id="dropdown"></select>
         * <script>
         *     $('#dropdown').dropdown({
         *         dataSource: '/Locations/Get',
         *         dataValueField: 'id'
         *     });
         * </script>
         */
        dataSource: undefined,

        dataTextField: 'text',

        dataValueField: 'value',

        dataSelectedField: 'selected',

        optionsDisplay: 'materialDesign',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- materialicons, dropdown -->
         * <select id="dropdown">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     var dropdown = $('#dropdown').dropdown({
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, dropdown -->
         * <select id="dropdown">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     $('#dropdown').dropdown({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- materialicons, bootstrap4, dropdown -->
         * <select id="dropdown">
         *     <option value="1">One</option>
         *     <option value="2">Two</option>
         *     <option value="3">Three</option>
         * </select>
         * <script>
         *     $('#dropdown').dropdown({ uiLibrary: 'bootstrap4' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Bootstrap.Material.Icons <!-- bootstrap, materialicons, dropdown -->
         * <select id="dropdown"></select>
         * <script>
         *     var dropdown = $('#dropdown').dropdown({
         *         dataSource: '/Locations/Get',
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'materialicons',
         *         dataValueField: 'id'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, dropdown -->
         * <select id="dropdown"></select>
         * <script>
         *     var dropdown = $('#dropdown').dropdown({
         *         dataSource: '/Locations/Get',
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome',
         *         dataValueField: 'id'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        icons: {
            /** DropDown icon definition.
             * @alias icons.dropdown
             * @type String
             * @default '<i class="material-icons">arrow_drop_down</i>'
             * @example Custom.Material.Icon <!-- materialicons, dropdown -->
             * <select id="dropdown"></select>
             * <script>
             *     var dropdown = $('#dropdown').dropdown({
             *         dataSource: '/Locations/Get',
             *         dataValueField: 'id',
             *         icons: { 
             *             dropdown: '<i class="material-icons">keyboard_arrow_down</i>'
             *         }
             *     });
             * </script>
             * @example Custom.Glyphicon.Icon <!-- bootstrap, dropdown -->
             * <select id="dropdown"></select>
             * <script>
             *     var dropdown = $('#dropdown').dropdown({
             *         dataSource: '/Locations/Get',
             *         dataValueField: 'id',
             *         uiLibrary: 'bootstrap',
             *         icons: { 
             *             dropdown: '<span class="glyphicon glyphicon-triangle-bottom" />'
             *         }
             *     });
             * </script>
             */
            dropdown: '<i class="material-icons">arrow_drop_down</i>'
        },

        indentation: 24,

        style: {
            wrapper: 'gj-dropdown gj-dropdown-md gj-unselectable',
            list: 'gj-list gj-list-md',
            active: 'gj-list-md-active'
        }
    },

    bootstrap: {
        indentation: 24,
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-3 gj-unselectable',
            presenter: 'btn btn-default',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        },
        iconsLibrary: 'glyphicons',
        optionsDisplay: 'standard'
    },

    bootstrap4: {
        indentation: 24,
        style: {
            wrapper: 'gj-dropdown gj-dropdown-bootstrap gj-dropdown-bootstrap-4 gj-unselectable',
            presenter: 'btn btn-secondary',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active'
        },
        optionsDisplay: 'standard'
    },

    materialicons: {
        indentation: 24,
        style: {
            expander: 'gj-dropdown-expander-mi'
        }
    },

    fontawesome: {
        icons: {
            dropdown: '<i class="fa fa-caret-down" aria-hidden="true"></i>'
        },
        style: {
            expander: 'gj-dropdown-expander-fa'
        }
    },

    glyphicons: {
        icons: {
            dropdown: '<span class="caret"></span>'
        },
        style: {
            expander: 'gj-dropdown-expander-glyphicons'
        }
    }
};

gj.dropdown.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'dropdown');
        this.attr('data-dropdown', 'true');
        gj.dropdown.methods.initialize(this);
        return this;
    },

    initialize: function ($dropdown) {
        var $item,
            data = $dropdown.data(),
            $wrapper = $dropdown.parent('div[role="wrapper"]'),
            $display = $('<span role="display"></span>'),
            $expander = $('<span role="expander">' + data.icons.dropdown + '</span>').addClass(data.style.expander),
            $presenter = $('<button role="presenter"></button>').addClass(data.style.presenter),
            $list = $('<ul role="list" class="' + data.style.list + '"></ul>');

        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $dropdown.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }

        $presenter.on('click', function (e) {
            if ($list.is(':visible')) {
                $list.hide();
            } else {
                if (data.optionsDisplay === 'standard') {
                    $list.css('top', $presenter.outerHeight() + 2);
                }
                $list.show();
            }
        });
        $presenter.on('blur', function (e) {
            setTimeout(function () {
                $list.hide();
            }, 100);
        });
        $presenter.append($display).append($expander);

        $dropdown.hide();
        $dropdown.after($presenter);
        $presenter.after($list);
        $list.hide();

        $dropdown.reload();
    },

    useHtmlDataSource: function ($dropdown, data) {
        var dataSource = [], i, $option, record,
            $options = $dropdown.find('option');
        for (i = 0; i < $options.length; i++) {
            $option = $($options[i]);
            record = {};
            record[data.dataValueField] = $option.val();
            record[data.dataTextField] = $option.html();
            record[data.dataSelectedField] = $option.prop('selected');
            dataSource.push(record);
        }
        data.dataSource = dataSource;
    },

    filter: function ($dropdown) {
        return $dropdown.data().dataSource;
    },

    render: function ($dropdown, response) {
        var width,
            selected = false,
            data = $dropdown.data(),
            $parent = $dropdown.parent(),
            $list = $parent.children('[role="list"]'),
            $presenter = $parent.children('[role="presenter"]'),
            $expander = $parent.find('[role="expander"]');

        $dropdown.data('records', response);
        $dropdown.empty();
        $list.empty();

        if (response && response.length) {
            $.each(response, function () {
                var record = this, $item, $option;

                $item = $('<li value="' + record[data.dataValueField] + '"><div data-role="wrapper"><span data-role="display">' + record[data.dataTextField] + '</span></div></li>');
                $item.addClass(data.style.item);
                $item.on('click', function (e) {
                    gj.dropdown.methods.select($dropdown, record[data.dataValueField]);
                });
                $list.append($item);

                $option = $('<option value="' + record[data.dataValueField] + '">' + record[data.dataTextField] + '</option>');
                $dropdown.append($option);

                if (record[data.dataSelectedField]) {
                    gj.dropdown.methods.select($dropdown, record[data.dataValueField]);
                    selected = true;
                }
            });
            if (selected === false) {
                gj.dropdown.methods.select($dropdown, response[0][data.dataValueField]);
            }
        }

        width = data.width ? data.width : ($list.width() + $expander.outerWidth() + 10);
        $parent.css('width', width);
        $list.css('width', width);

        gj.dropdown.events.dataBound($dropdown);

        return $dropdown;
    },

    select: function ($dropdown, value) {
        var data = $dropdown.data(),
            $list = $dropdown.parent().children('ul[role="list"]'),
            $item = $list.children('li[value="' + value + '"]'),
            record = gj.dropdown.methods.getRecordByValue($dropdown, value);
        $list.children('li').removeClass(data.style.active);
        $item.addClass(data.style.active);
        $dropdown.val(value);
        $dropdown.next('[role="presenter"]').find('[role="display"]').html(record[data.dataTextField]);
        gj.dropdown.events.change($dropdown);
        $list.hide();
        return $dropdown;
    },

    getRecordByValue: function ($dropdown, value) {
        var data = $dropdown.data(),
            i, result = undefined;

        for (i = 0; i < data.records.length; i++) {
            if (data.records[i][data.dataValueField] === value) {
                result = data.records[i];
                break;
            }
        }

        return result;
    },

    value: function ($dropdown, value) {
        if (typeof (value) === "undefined") {
            return $dropdown.val();
        } else {
            return gj.dropdown.methods.select($dropdown, value);
        }
    },

    destroy: function ($dropdown) {
        var data = $dropdown.data(),
            $parent = $dropdown.parent('div[role="wrapper"]');
        if (data) {
            $dropdown.xhr && $dropdown.xhr.abort();
            $dropdown.off();
            $dropdown.removeData();
            $dropdown.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-dropdown');
            $dropdown.removeClass();
            if ($parent.length > 0) {
                $parent.children('[role="presenter"]').remove();
                $parent.children('[role="list"]').remove();
                $dropdown.unwrap();
            }
            $dropdown.show();
        }
        return $tree;
    }
};

gj.dropdown.events = {
    /**
     * Triggered when the dropdown value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- dropdown, materialicons -->
     * <select id="dropdown">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     $('#dropdown').dropdown({
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($dropdown) {
        return $dropdown.triggerHandler('change');
    },

    /**
     * Event fires after the loading of the data in the dropdown.
     * @event dataBound
     * @param {object} e - event data
     * @example sample <!-- dropdown, materialicons -->
     * <select id="dropdown">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     $('#dropdown').dropdown({
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    dataBound: function ($dropdown) {
        return $dropdown.triggerHandler('dataBound');
    }
};

gj.dropdown.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.dropdown.methods;

    /** Gets or sets the value of the DropDown.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string
     * @example Get <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="alert($dropdown.value())">Get Content</button>
     * <hr/>
     * <select id="dropdown">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var $dropdown = $('#dropdown').dropdown();
     * </script>
     * @example Set <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="$dropdown.value('3')">Set Value</button>
     * <hr/>
     * <select id="dropdown">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var $dropdown = $('#dropdown').dropdown();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    self.enable = function () {
        return methods.enable(this);
    };

    self.disable = function () {
        return methods.disable(this);
    };

    /** Remove dropdown functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- dropdown, materialicons -->
     * <button class="gj-button-md" onclick="dropdown.destroy()">Destroy</button>
     * <select id="dropdown">
     *     <option value="1">One</option>
     *     <option value="2" selected>Two</option>
     *     <option value="3">Three</option>
     * </select>
     * <script>
     *     var dropdown = $('#dropdown').dropdown();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-dropdown')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.dropdown.widget.prototype = new gj.widget();
gj.dropdown.widget.constructor = gj.dropdown.widget;

(function ($) {
    $.fn.dropdown = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.dropdown.widget(this, method);
            } else {
                $widget = new gj.dropdown.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);