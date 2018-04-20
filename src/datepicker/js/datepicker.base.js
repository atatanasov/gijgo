/* global window alert jQuery gj */
/**
  * @widget DatePicker
  * @plugin Base
  */
gj.datepicker = {
    plugins: {}
};

gj.datepicker.config = {
    base: {
        /** Whether to display dates in other months at the start or end of the current month.
         * @additionalinfo Set to true by default for Bootstrap.
         * @type Boolean
         * @default false
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var datepicker = $('#datepicker').datepicker({ 
         *        showOtherMonths: true
         *    });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({
         *         showOtherMonths: false
         *     });
         * </script>
         */
        showOtherMonths: false,

        /** Whether days in other months shown before or after the current month are selectable.
         * This only applies if the showOtherMonths option is set to true.
         * @type Boolean
         * @default true
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        showOtherMonths: true,
         *        selectOtherMonths: true
         *    });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ 
         *        showOtherMonths: true,
         *        selectOtherMonths: false
         *     });
         * </script>
         */
        selectOtherMonths: true,

        /** The width of the datepicker.
         * @type number
         * @default undefined
         * @example JS.Config <!-- datepicker -->
         * <input id="datepicker" />
         * <script>
         *    $('#datepicker').datepicker({ width: 312 });
         * </script>
         * @example HTML.Config <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker();
         * </script>
         */
        width: undefined,

        /** The minimum selectable date. When not set, there is no minimum.
         * @additionalinfo If the minDate is set by string, then the date in the string needs to follow the format specified by the 'format' configuration option.
         * @type Date|String|Function
         * @default undefined
         * @example Today <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var today, datepicker;
         *    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
         *    datepicker = $('#datepicker').datepicker({
         *        minDate: today
         *    });
         * </script>
         * @example Yesterday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({
         *        minDate: function() {
         *            var date = new Date();
         *            date.setDate(date.getDate()-1);
         *            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
         *        }
         *     });
         * </script>
         * @example Bootstrap <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *     $('#datepicker').datepicker({
         *        format: 'yyyy-mm-dd',
         *        value: '2017-12-15',
         *        minDate: '2017-12-12',
         *        uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     $('#datepicker').datepicker({
         *        value: '12/15/2017',
         *        minDate: '12/12/2017',
         *        uiLibrary: 'bootstrap4'
         *     });
         * </script>
         */
        minDate: undefined,

        /** The maximum selectable date. When not set, there is no maximum
         * @type Date|String|Function
         * @default undefined
         * @example Today <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var today, datepicker;
         *    today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
         *    datepicker = $('#datepicker').datepicker({
         *        maxDate: today
         *    });
         * </script>
         * @example Tomorrow <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ 
         *        maxDate: function() {
         *            var date = new Date();
         *            date.setDate(date.getDate()+1);
         *            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
         *        }
         *     });
         * </script>
         */
        maxDate: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         * @additionalinfo <b>d</b> - Day of the month as digits; no leading zero for single-digit days.<br/>
         * <b>dd</b> - Day of the month as digits; leading zero for single-digit days.<br/>
         * <b>ddd</b> - Day of the week as a three-letter abbreviation.<br/>
         * <b>dddd</b> - Day of the week as its full name.<br/>
         * <b>m</b> - Month as digits; no leading zero for single-digit months.<br/>
         * <b>mm</b> - Month as digits; leading zero for single-digit months.<br/>
         * <b>mmm</b> - Month as a three-letter abbreviation.<br/>
         * <b>mmmm</b> - Month as its full name.<br/>
         * <b>yy</b> - Year as last two digits; leading zero for years less than 10.<br/>
         * <b>yyyy</b> - Year represented by four digits.<br/>
         * @type String
         * @default 'mm/dd/yyyy'
         * @example Sample <!-- datepicker -->
         * <input id="datepicker" value="2017-25-07" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ format: 'yyyy-dd-mm' });
         * </script>
         * @example Short.Month.Format <!-- datepicker -->
         * <input id="datepicker" value="10 Oct 2017" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ format: 'dd mmm yyyy' });
         * </script>
         * @example Long.Month.Format <!-- datepicker -->
         * <input id="datepicker" value="10 October 2017" width="312" />
         * <script>
         *     $('#datepicker').datepicker({ format: 'dd mmmm yyyy' });
         * </script>
         */
        format: 'mm/dd/yyyy',

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css file for bootstrap should be manually included if you use bootstrap.
         * @type (materialdesign|bootstrap|bootstrap4)
         * @default materialdesign
         * @example MaterialDesign <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    var datepicker = $('#datepicker').datepicker({ uiLibrary: 'materialdesign' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4.Material.Icons <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'materialicons' });
         * </script>
         * @example Bootstrap.4.FontAwesome <!-- fontawesome, bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     $('#datepicker').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome' });
         * </script>
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         * @additionalinfo If you use Bootstrap 3 as uiLibrary, then the iconsLibrary is set to Glyphicons by default.<br/>
         * If you use Material Design as uiLibrary, then the iconsLibrary is set to Material Icons by default.<br/>
         * The css files for Material Icons, Font Awesome or Glyphicons should be manually included to the page where the grid is in use.
         * @type (materialicons|fontawesome|glyphicons)
         * @default 'materialicons'
         * @example Bootstrap.Font.Awesome <!-- bootstrap, fontawesome, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *     $('#datepicker').datepicker({
         *         uiLibrary: 'bootstrap',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *     $('#datepicker').datepicker({
         *         uiLibrary: 'bootstrap4',
         *         iconsLibrary: 'fontawesome'
         *     });
         * </script>
         */
        iconsLibrary: 'materialicons',

        /** The initial datepicker value.
         * @type String
         * @default undefined
         * @example Javascript <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        value: '01/01/2018'
         *    });
         * </script>
         * @example HTML <!-- datepicker -->
         * <input id="datepicker" width="312" value="01/01/2018" />
         * <script>
         *     $('#datepicker').datepicker();
         * </script>
         */
        value: undefined,

        /** Day of the week start. 0 (Sunday) to 6 (Saturday)
         * @type Number
         * @default 0
         * @example Monday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        weekStartDay: 1
         *    });
         * </script>
         * @example Saturday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        weekStartDay: 6
         *    });
         * </script>
         */
        weekStartDay: 0,

        /** An array or function that will be used to determine which dates to be disabled for selection by the widget.
         * @type Array|Function
         * @default undefined
         * @example Array <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        value: '11/10/2017',
         *        disableDates: [new Date(2017,10,11), '11/12/2017']
         *    });
         * </script>
         * @example Function <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        value: '11/11/2017',
         *        disableDates:  function (date) {
         *            var disabled = [10,15,20,25];
         *            if (disabled.indexOf(date.getDate()) == -1 ) {
         *                return true;
         *            } else {
         *                return false;
         *            }
         *        }
         *    });
         * </script>
         */
        disableDates: undefined,

        /** An array that will be used to determine which days of week to be disabled for selection by the widget.
         * The array needs to contains only numbers where 0 is Sunday, 1 is Monday and etc.
         * @type Array
         * @default undefined
         * @example Saturday.Sunday <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        disableDaysOfWeek: [0, 6]
         *    });
         * </script>
         */
        disableDaysOfWeek: undefined,

        /** Whether to display week number in year on the left side of the calendar.
         * @type Boolean
         * @default false
         * @example Material.Design <!-- datepicker -->
         * <input id="datepicker" width="356" />
         * <script>
         *    $('#datepicker').datepicker({ calendarWeeks: true, modal: true, footer: true });
         * </script>
         * @example Bootstrap <!-- datepicker, bootstrap -->
         * <input id="datepicker" width="220" />
         * <script>
         *    $('#datepicker').datepicker({ calendarWeeks: true, uiLibrary: 'bootstrap' });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    $('#datepicker').datepicker({ calendarWeeks: true, uiLibrary: 'bootstrap4' });
         * </script>
         */
        calendarWeeks: false,

        /** Whether to enable keyboard navigation.
         * @type Boolean
         * @default true
         * @example Material.Design <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({
         *        keyboardNavigation: true
         *    });
         * </script>
         * @example Material.Design.Modal <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ keyboardNavigation: true, modal: true, header: true, footer: true });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    $('#datepicker').datepicker({
         *        uiLibrary: 'bootstrap4',
         *        keyboardNavigation: true,
         *        showOtherMonths: true
         *    });
         * </script>
         */
        keyboardNavigation: true,

        /** The language that needs to be in use.
         * @type string
         * @default 'en-us'
         * @example German <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'de-de',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Bulgarian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'bg-bg',
         *        format: 'dd mmm yyyy',
         *        weekStartDay: 1
         *    });
         * </script>
         * @example French <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'fr-fr',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Brazil <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'pt-br',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Russian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'ru-ru',
         *        format: 'dd mmm yyyy'
         *    });
         * </script>
         * @example Spanish <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'es-es',
         *        format: 'dd/mm/yyyy'
         *    });
         * </script>
         * @example Italian <!-- datepicker -->
         * <input id="datepicker" width="276" />
         * <script>
         *    $('#datepicker').datepicker({
         *        locale: 'it-it',
         *        format: 'dd/mm/yyyy'
         *    });
         * </script>
         */
        locale: 'en-us',

        icons: {
            /** datepicker icon definition.
             * @alias icons.rightIcon
             * @type String
             * @default '<i class="gj-icon event" />'
             * @example Custom.Material.Icon <!-- materialicons, datepicker -->
             * <input id="datepicker" width="312" />
             * <script>
             *     $('#datepicker').datepicker({
             *         icons: { 
             *             rightIcon: '<i class="material-icons">date_range</i>'
             *         }
             *     });
             * </script>
             * @example Custom.Glyphicon.Icon <!-- bootstrap, datepicker -->
             * <input id="datepicker" width="220" />
             * <script>
             *     $('#datepicker').datepicker({
             *         uiLibrary: 'bootstrap',
             *         icons: {
             *             rightIcon: '<span class="glyphicon glyphicon-chevron-down"></span>'
             *         }
             *     });
             * </script>
             * @example Bootstrap.4 <!-- bootstrap4, materialicons, datepicker -->
             * <input id="datepicker" width="234" />
             * <script>
             *     $('#datepicker').datepicker({
             *         uiLibrary: 'bootstrap4',
             *         icons: {
             *             rightIcon: '<i class="material-icons">date_range</i>'
             *         }
             *     });
             * </script>
             */
            rightIcon: '<i class="gj-icon">event</i>',

            previousMonth: '<i class="gj-icon chevron-left"></i>',
            nextMonth: '<i class="gj-icon chevron-right"></i>'
        },

        fontSize: undefined,

        /** The size of the datepicker input.
         * @type 'small'|'default'|'large'
         * @default 'default'
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="234" value="03/20/2018" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="234" value="03/20/2018" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="234" value="03/20/2018" /></p>
         * <script>
         *     $('#datepicker-small').datepicker({ uiLibrary: 'bootstrap4', size: 'small' });
         *     $('#datepicker-default').datepicker({ uiLibrary: 'bootstrap4', size: 'default' });
         *     $('#datepicker-large').datepicker({ uiLibrary: 'bootstrap4', size: 'large' });
         * </script>
         * @example Bootstrap.4.Font.Awesome <!-- bootstrap4, fontawesome, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="234" value="03/20/2018" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="234" value="03/20/2018" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="234" value="03/20/2018" /></p>
         * <script>
         *     $('#datepicker-small').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'small' });
         *     $('#datepicker-default').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'default' });
         *     $('#datepicker-large').datepicker({ uiLibrary: 'bootstrap4', iconsLibrary: 'fontawesome', size: 'large' });
         * </script>
         * @example Bootstrap.3 <!-- bootstrap, datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="220" value="03/20/2018" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="220" value="03/20/2018" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="220" value="03/20/2018" /></p>
         * <script>
         *     $('#datepicker-small').datepicker({ uiLibrary: 'bootstrap', size: 'small' });
         *     $('#datepicker-default').datepicker({ uiLibrary: 'bootstrap', size: 'default' });
         *     $('#datepicker-large').datepicker({ uiLibrary: 'bootstrap', size: 'large' });
         * </script>
         * @example Material.Design <!-- datepicker -->
         * <p><label for="datepicker-small">Small Size:</label> <input id="datepicker-small" width="276" value="03/20/2018" /></p>
         * <p><label for="datepicker-default">Default Size:</label> <input id="datepicker-default" width="276" value="03/20/2018" /></p>
         * <p><label for="datepicker-large">Large Size:</label> <input id="datepicker-large" width="276" value="03/20/2018" /></p>
         * <script>
         *     $('#datepicker-small').datepicker({ size: 'small' });
         *     $('#datepicker-default').datepicker({ size: 'default' });
         *     $('#datepicker-large').datepicker({ size: 'large' });
         * </script>
         */
        size: 'default',

        /** If set to true, the datepicker will have modal behavior.
         * @type Boolean
         * @default false
         * @example Material.Design <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ modal: true });
         * </script>
         * @example Bootstrap <!-- bootstrap, datepicker -->
         * <input id="datepicker" width="220" />
         * <script>
         *    $('#datepicker').datepicker({ uiLibrary: 'bootstrap', modal: true, header: true, footer: true });
         * </script>
         * @example Bootstrap.4 <!-- bootstrap4, datepicker -->
         * <input id="datepicker" width="234" />
         * <script>
         *    $('#datepicker').datepicker({ uiLibrary: 'bootstrap4', modal: true, header: true, footer: true });
         * </script>
         */
        modal: false,

        /** If set to true, add header to the datepicker.
         * @type Boolean
         * @default false
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ header: true, modal: true, footer: true });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ header: false });
         * </script>
         */
        header: false,

        /** If set to true, add footer with ok and cancel buttons to the datepicker.
         * @type Boolean
         * @default false
         * @example True <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ footer: true, modal: true, header: true });
         * </script>
         * @example False <!-- datepicker -->
         * <input id="datepicker" width="312" />
         * <script>
         *    $('#datepicker').datepicker({ footer: false });
         * </script>
         */
        footer: false,

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-datepicker gj-datepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            calendar: 'gj-picker gj-picker-md datepicker gj-unselectable',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        showOtherMonths: true
    },

    fontawesome: {
        icons: {
            rightIcon: '<i class="fa fa-calendar" aria-hidden="true"></i>',
            previousMonth: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            nextMonth: '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            rightIcon: '<span class="glyphicon glyphicon-calendar"></span>',
            previousMonth: '<span class="glyphicon glyphicon-chevron-left"></span>',
            nextMonth: '<span class="glyphicon glyphicon-chevron-right"></span>'
        }
    }
};

gj.datepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'datepicker');
        this.attr('data-datepicker', 'true');
        gj.datepicker.methods.initialize(this, this.data());
        return this;
    },

    initialize: function ($datepicker, data) {
        var $calendar, $rightIcon,
            $wrapper = $datepicker.parent('div[role="wrapper"]');

        if (data.uiLibrary === 'bootstrap') {
            $rightIcon = $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>');
        } else if (data.uiLibrary === 'bootstrap4') {
            $rightIcon = $('<span class="input-group-append"><button class="btn btn-outline-secondary border-left-0" type="button">' + data.icons.rightIcon + '</button></span>');
        } else {
            $rightIcon = $(data.icons.rightIcon);
        }

        $rightIcon.attr('role', 'right-icon');
        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $datepicker.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $datepicker.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $datepicker.val(data.value).addClass(data.style.input).attr('role', 'input');

        data.fontSize && $datepicker.css('font-size', data.fontSize);
        
        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4') {
            if (data.size === 'small') {
                $wrapper.addClass('input-group-sm');
                $datepicker.addClass('form-control-sm');
            } else if (data.size === 'large') {
                $wrapper.addClass('input-group-lg');
                $datepicker.addClass('form-control-lg');
            }
        } else {
            if (data.size === 'small') {
                $wrapper.addClass('small');
            } else if (data.size === 'large') {
                $wrapper.addClass('large');
            }
        }

        $rightIcon.on('click', function (e) {
            var $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
            if ($calendar.is(':visible')) {
                gj.datepicker.methods.close($datepicker);
            } else {
                gj.datepicker.methods.open($datepicker, data);
            }
        });
        $wrapper.append($rightIcon);

        $calendar = gj.datepicker.methods.createCalendar($datepicker, data);

        if (data.footer !== true) {
            $datepicker.on('blur', function () {
                $datepicker.timeout = setTimeout(function () {
                    gj.datepicker.methods.close($datepicker);
                }, 500);
            });
            $calendar.mousedown(function () {
                clearTimeout($datepicker.timeout);
                $datepicker.focus();
                return false;
            });
            $calendar.on('click', function () {
                clearTimeout($datepicker.timeout);
                $datepicker.focus();
            });
        }

        if (data.keyboardNavigation) {
            $(document).on('keydown', gj.datepicker.methods.createKeyDownHandler($datepicker, $calendar, data));
        }
    },

    createCalendar: function ($datepicker, data) {
        var date, $body, $footer, $btnCancel, $btnOk,
            $calendar = $('<div role="calendar" type="month"/>').addClass(data.style.calendar).attr('guid', $datepicker.attr('data-guid'));
        
        data.fontSize && $calendar.css('font-size', data.fontSize);

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $datepicker.attr('day', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
        }

        $calendar.attr('month', date.getMonth());
        $calendar.attr('year', date.getFullYear());

        gj.datepicker.methods.renderHeader($datepicker, $calendar, data, date);

        $body = $('<div role="body" />');
        $calendar.append($body);

        if (data.footer) {
            $footer = $('<div role="footer" class="' + data.style.footer + '" />');

            $btnCancel = $('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].cancel + '</button>');
            $btnCancel.on('click', function () { $datepicker.close(); });
            $footer.append($btnCancel);

            $btnOk = $('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].ok + '</button>');
            $btnOk.on('click', function () {
                var date, dayArr, dayStr = $calendar.attr('selectedDay');
                if (dayStr) {
                    dayArr = dayStr.split('-');
                    date = new Date(dayArr[0], dayArr[1], dayArr[2], $calendar.attr('hour') || 0, $calendar.attr('minute') || 0);
                    gj.datepicker.methods.change($datepicker, $calendar, data, date);
                } else {
                    $datepicker.close();
                }
            });
            $footer.append($btnOk);

            $calendar.append($footer);
        }

        $calendar.hide();
        $('body').append($calendar);

        if (data.modal) {
            $calendar.wrapAll('<div role="modal" class="' + data.style.modal + '"/>');
            gj.core.center($calendar);
        }

        return $calendar;
    },

    renderHeader: function ($datepicker, $calendar, data, date) {
        var $header, $date, $year;

        if (data.header) {
            $header = $('<div role="header" />');
            $year = $('<div role="year" />').on('click', function () {
                gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                $year.addClass('selected');
                $date.removeClass('selected');
            });
            $year.html(gj.core.formatDate(date, 'yyyy', data.locale));
            $header.append($year);
            $date = $('<div role="date" class="selected" />').on('click', function () {
                gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                $date.addClass('selected');
                $year.removeClass('selected');
            });
            $date.html(gj.core.formatDate(date, 'ddd, mmm dd', data.locale));
            $header.append($date);
            $calendar.append($header);
        }
    },

    updateHeader: function ($calendar, data, date) {
        $calendar.find('[role="header"] [role="year"]').removeClass('selected').html(gj.core.formatDate(date, 'yyyy', data.locale));
        $calendar.find('[role="header"] [role="date"]').addClass('selected').html(gj.core.formatDate(date, 'ddd, mmm dd', data.locale));
        $calendar.find('[role="header"] [role="hour"]').removeClass('selected').html(gj.core.formatDate(date, 'HH', data.locale));
        $calendar.find('[role="header"] [role="minute"]').removeClass('selected').html(gj.core.formatDate(date, 'MM', data.locale));
    },

    createNavigation: function ($datepicker, $body, $table, data) {
        var $row, $navigator, $thead = $('<thead/>');

        $navigator = $('<div role="navigator" />');
        $navigator.append($('<div>' + data.icons.previousMonth + '</div>').on('click', gj.datepicker.methods.prev($datepicker, data)));
        $navigator.append($('<div role="period"></div>').on('click', gj.datepicker.methods.changePeriod($datepicker, data)));
        $navigator.append($('<div>' + data.icons.nextMonth + '</div>').on('click', gj.datepicker.methods.next($datepicker, data)));
        $body.append($navigator);
        
        $row = $('<tr role="week-days" />');
        if (data.calendarWeeks) {
            $row.append('<th><div>&nbsp;</div></th>');
        }
        for (i = data.weekStartDay; i < gj.core.messages[data.locale].weekDaysMin.length; i++) {
            $row.append('<th><div>' + gj.core.messages[data.locale].weekDaysMin[i] + '</div></th>');
        }
        for (i = 0; i < data.weekStartDay; i++) {
            $row.append('<th><div>' + gj.core.messages[data.locale].weekDaysMin[i] + '</div></th>');
        }
        $thead.append($row);

        $table.append($thead);
    },

    renderMonth: function ($datepicker, $calendar, data) {
        var weekDay, selectedDay, day, month, year, daysInMonth, total, firstDayPosition, i, now, prevMonth, nextMonth, $cell, $day, date,
            $body = $calendar.children('[role="body"]'),
            $table = $('<table/>'),
            $tbody = $('<tbody/>');
        
        $body.off().empty();
        gj.datepicker.methods.createNavigation($datepicker, $body, $table, data);
        
        month = parseInt($calendar.attr('month'), 10);
        year = parseInt($calendar.attr('year'), 10);

        $calendar.attr('type', 'month');
        $calendar.find('div[role="period"]').text(gj.core.messages[data.locale].monthNames[month] + ' ' + year);

        daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (year % 4 == 0 && year != 1900) {
            daysInMonth[1] = 29;
        }
        total = daysInMonth[month];

        firstDayPosition = (new Date(year, month, 1).getDay() + 7 - data.weekStartDay) % 7;

        weekDay = 0;
        $row = $('<tr />');
        prevMonth = gj.datepicker.methods.getPrevMonth(month, year);
        for (i = 1; i <= firstDayPosition; i++) {
            day = (daysInMonth[prevMonth.month] - firstDayPosition + i);
            date = new Date(prevMonth.year, prevMonth.month, day);
            if (data.calendarWeeks && i === 1) {
                $row.append('<td class="calendar-week"><div>' + gj.datepicker.methods.getWeekNumber(date) + '</div></td>');
            }
            $cell = $('<td class="other-month" />');
            if (data.showOtherMonths) {
                $day = $('<div>' + day + '</div>');
                $cell.append($day);
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    $cell.addClass('gj-cursor-pointer').attr('day', day).attr('month', prevMonth.month).attr('year', prevMonth.year);
                    $day.on('click', gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date));
                    $day.on('mousedown', function (e) { e.stopPropagation() });
                } else {
                    $cell.addClass('disabled');
                }
            }
            $row.append($cell);
            weekDay++;
        }
        if (i > 1) {
            $tbody.append($row);
        }

        now = new Date();
        for (i = 1; i <= total; i++) {
            date = new Date(year, month, i);
            if (weekDay == 0) {
                $row = $('<tr>');
                if (data.calendarWeeks) {
                    $row.append('<td class="calendar-week"><div>' + gj.datepicker.methods.getWeekNumber(date) + '</div></td>');
                }
            }
            $cell = $('<td day="' + i + '" month="' + month + '" year="' + year + '" />');
            if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
                $cell.addClass('today');
            } else {
                $cell.addClass('current-month');
            }
            $day = $('<div>' + i + '</div>');
            if (gj.datepicker.methods.isSelectable(data, date)) {
                $cell.addClass('gj-cursor-pointer');
                $day.on('click', gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date));
                $day.on('mousedown', function (e) { e.stopPropagation() });
            } else {
                $cell.addClass('disabled');
            }
            $cell.append($day);
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }

        nextMonth = gj.datepicker.methods.getNextMonth(month, year);
        for (i = 1; weekDay != 0; i++) {
            date = new Date(nextMonth.year, nextMonth.month, i);
            $cell = $('<td class="other-month" />');
            if (data.showOtherMonths) {
                $day = $('<div>' + i + '</div>');
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    $cell.addClass('gj-cursor-pointer').attr('day', i).attr('month', nextMonth.month).attr('year', nextMonth.year);
                    $day.on('click', gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date));
                    $day.on('mousedown', function (e) { e.stopPropagation() });
                } else {
                    $cell.addClass('disabled');
                }
                $cell.append($day);
            }
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }

        $table.append($tbody);
        $body.append($table);

        if ($calendar.attr('selectedDay')) {
            selectedDay = $calendar.attr('selectedDay').split('-');
            date = new Date(selectedDay[0], selectedDay[1], selectedDay[2], $calendar.attr('hour') || 0, $calendar.attr('minute') || 0);
            $calendar.find('tbody td[day="' + selectedDay[2] + '"][month="' + selectedDay[1] + '"]').addClass('selected');
            gj.datepicker.methods.updateHeader($calendar, data, date);
        }
    },

    renderYear: function ($datepicker, $calendar, data) {
        var year, i, m, $month,
            $table = $calendar.find('>[role="body"]>table'),
            $tbody = $table.children('tbody');
        
        $table.children('thead').hide();

        year = parseInt($calendar.attr('year'), 10);

        $calendar.attr('type', 'year');
        $calendar.find('div[role="period"]').text(year);

        $tbody.empty();

        for (i = 0; i < 3; i++) {
            $row = $('<tr />');
            for (m = (i * 4); m <= (i * 4) + 3; m++) {
                $month = $('<div>' + gj.core.messages[data.locale].monthShortNames[m] + '</div>');
                $month.on('click', gj.datepicker.methods.selectMonth($datepicker, $calendar, data, m));
                $cell = $('<td></td>').append($month);
                $row.append($cell);
            }
            $tbody.append($row);
        }
    },

    renderDecade: function ($datepicker, $calendar, data) {
        var year, decade, i, y, $year,
            $table = $calendar.find('>[role="body"]>table'),
            $tbody = $table.children('tbody');
        
        $table.children('thead').hide();

        year = parseInt($calendar.attr('year'), 10);
        decade = year - (year % 10);

        $calendar.attr('type', 'decade');
        $calendar.find('div[role="period"]').text(decade + ' - ' + (decade + 9));

        $tbody.empty();

        for (i = decade - 1; i <= decade + 10 ; i += 4) {
            $row = $('<tr />');
            for (y = i; y <= i + 3; y++) {
                $year = $('<div>' + y + '</div>');
                $year.on('click', gj.datepicker.methods.selectYear($datepicker, $calendar, data, y));
                $cell = $('<td></td>').append($year);
                $row.append($cell);
            }
            $tbody.append($row);
        }
    },

    renderCentury: function ($datepicker, $calendar, data) {
        var year, century, i, d, $decade,
            $table = $calendar.find('>[role="body"]>table'),
            $tbody = $table.children('tbody');
        
        $table.children('thead').hide();

        year = parseInt($calendar.attr('year'), 10);
        century = year - (year % 100);

        $calendar.attr('type', 'century');
        $calendar.find('div[role="period"]').text(century + ' - ' + (century + 99));

        $tbody.empty();

        for (i = (century - 10); i < century + 100; i += 40) {
            $row = $('<tr />');
            for (d = i; d <= i + 30; d += 10) {
                $decade = $('<div>' + d + '</div>');
                $decade.on('click', gj.datepicker.methods.selectDecade($datepicker, $calendar, data, d));
                $cell = $('<td></td>').append($decade);
                $row.append($cell);
            }
            $tbody.append($row);
        }
    },

    getWeekNumber: function (date) {
        var d = new Date(date.valueOf());
        d.setDate(d.getDate() + 6);
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    },

    getMinDate: function (data) {
        var minDate;
        if (data.minDate) {
            if (typeof (data.minDate) === 'string') {
                minDate = gj.core.parseDate(data.minDate, data.format, data.locale);
            } else if (typeof (data.minDate) === 'function') {
                minDate = data.minDate();
                if (typeof minDate === 'string') {
                    minDate = gj.core.parseDate(minDate, data.format, data.locale);
                }
            } else if (typeof data.minDate.getMonth === 'function') {
                minDate = data.minDate;
            }
        }
        return minDate;
    },

    getMaxDate: function (data) {
        var maxDate;
        if (data.maxDate) {
            if (typeof data.maxDate === 'string') {
                maxDate = gj.core.parseDate(data.maxDate, data.format, data.locale);
            } else if (typeof data.maxDate === 'function') {
                maxDate = data.maxDate();
                if (typeof maxDate === 'string') {
                    maxDate = gj.core.parseDate(maxDate, data.format, data.locale);
                }
            } else if (typeof data.maxDate.getMonth === 'function') {
                maxDate = data.maxDate;
            }
        }
        return maxDate;
    },

    isSelectable: function (data, date) {
        var result = true,
            minDate = gj.datepicker.methods.getMinDate(data),
            maxDate = gj.datepicker.methods.getMaxDate(data),
            i;

        if (minDate && date < minDate) {
            result = false;
        } else if (maxDate && date > maxDate) {
            result = false;
        }

        if (result) {
            if (data.disableDates) {
                if ($.isArray(data.disableDates)) {
                    for (i = 0; i < data.disableDates.length; i++) {
                        if (data.disableDates[i] instanceof Date && data.disableDates[i].getTime() === date.getTime()) {
                            result = false;
                        } else if (typeof data.disableDates[i] === 'string' && gj.core.parseDate(data.disableDates[i], data.format, data.locale).getTime() === date.getTime()) {
                            result = false;
                        }
                    }
                } else if (data.disableDates instanceof Function) {
                    result = data.disableDates(date);
                }
            }
            if ($.isArray(data.disableDaysOfWeek) && data.disableDaysOfWeek.indexOf(date.getDay()) > -1) {
                result = false;
            }
        }
        return result;
    },

    getPrevMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() - 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    getNextMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() + 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    prev: function ($datepicker, data) {
        return function () {
            var date, month, year, decade, century,
                $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            switch ($calendar.attr('type')) {
                case 'month':
                    month = parseInt($calendar.attr('month'), 10);
                    year = parseInt($calendar.attr('year'), 10);
                    date = gj.datepicker.methods.getPrevMonth(month, year);
                    $calendar.attr('month', date.month);
                    $calendar.attr('year', date.year);
                    gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                    break;
                case 'year':
                    year = parseInt($calendar.attr('year'), 10);
                    $calendar.attr('year', year - 1);
                    gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                    break;
                case 'decade':
                    year = parseInt($calendar.attr('year'), 10);
                    decade = year - (year % 10);
                    $calendar.attr('year', decade - 10);
                    gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                    break;
                case 'century':
                    year = parseInt($calendar.attr('year'), 10);
                    century = year - (year % 100);
                    $calendar.attr('year', century - 100);
                    gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                    break;
            }
        }
    },

    next: function ($datepicker, data) {
        return function () {
            var date, month, year, decade, century,
                $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            switch ($calendar.attr('type')) {
                case 'month':
                    month = parseInt($calendar.attr('month'), 10);
                    year = parseInt($calendar.attr('year'), 10);
                    date = gj.datepicker.methods.getNextMonth(month, year);
                    $calendar.attr('month', date.month);
                    $calendar.attr('year', date.year);
                    gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                    break;
                case 'year':
                    year = parseInt($calendar.attr('year'), 10);
                    $calendar.attr('year', year + 1);
                    gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                    break;
                case 'decade':
                    year = parseInt($calendar.attr('year'), 10);
                    decade = year - (year % 10);
                    $calendar.attr('year', decade + 10);
                    gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                    break;
                case 'century':
                    year = parseInt($calendar.attr('year'), 10);
                    century = year - (year % 100);
                    $calendar.attr('year', century + 100);
                    gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                    break;
            }
        }
    },

    changePeriod: function ($datepicker, data) {
        return function (e) {
            var $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            switch ($calendar.attr('type')) {
                case 'month':
                    gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                    break;
                case 'year':
                    gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                    break;
                case 'decade':
                    gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                    break;
            }
        }
    },

    dayClickHandler: function ($datepicker, $calendar, data, date) {
        return function (e) {
            e && e.stopPropagation();
            gj.datepicker.methods.selectDay($datepicker, $calendar, data, date);
            if (data.footer !== true && data.autoClose !== false) {
                gj.datepicker.methods.change($datepicker, $calendar, data, date);
            }
            return $datepicker;
        };
    },

    change: function ($datepicker, $calendar, data, date) {
        var day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear(),
            value = gj.core.formatDate(date, data.format, data.locale);
        $calendar.attr('month', month);
        $calendar.attr('year', year);
        $datepicker.val(value);
        gj.datepicker.events.change($datepicker);
        if (window.getComputedStyle($calendar[0]).display !== 'none') {
            gj.datepicker.methods.close($datepicker);
        }
    },

    selectDay: function ($datepicker, $calendar, data, date) {
        var day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();
        $calendar.attr('selectedDay', year + '-' + month + '-' + day);
        $calendar.find('tbody td').removeClass('selected');
        $calendar.find('tbody td[day="' + day + '"][month="' + month + '"]').addClass('selected');
        gj.datepicker.methods.updateHeader($calendar, data, date);
        gj.datepicker.events.select($datepicker, 'day');
    },

    selectMonth: function ($datepicker, $calendar, data, month) {
        return function (e) {
            $calendar.attr('month', month);
            gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
            gj.datepicker.events.select($datepicker, 'month');
        };
    },

    selectYear: function ($datepicker, $calendar, data, year) {
        return function (e) {
            $calendar.attr('year', year);
            gj.datepicker.methods.renderYear($datepicker, $calendar, data);
            gj.datepicker.events.select($datepicker, 'year');
        };
    },

    selectDecade: function ($datepicker, $calendar, data, year) {
        return function (e) {
            $calendar.attr('year', year);
            gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
            gj.datepicker.events.select($datepicker, 'decade');
        };
    },

    open: function ($datepicker, data) {
        var $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

        if ($datepicker.val()) {
            $datepicker.value($datepicker.val());
        }

        switch ($calendar.attr('type')) {
            case 'month':
                gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                break;
            case 'year':
                gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                break;
            case 'decade':
                gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                break;
            case 'century':
                gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                break;
        }

        $calendar.show();
        $calendar.closest('div[role="modal"]').show();
        if (data.modal) {
            gj.core.center($calendar);
        } else {
            gj.core.setChildPosition($datepicker[0], $calendar[0]);
            $datepicker.focus();
        }
        clearTimeout($datepicker.timeout);
        gj.datepicker.events.open($datepicker);
    },

    close: function ($datepicker) {
        var $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
        $calendar.hide();
        $calendar.closest('div[role="modal"]').hide();
        gj.datepicker.events.close($datepicker);
    },

    createKeyDownHandler: function ($datepicker, $calendar, data) {
        return function (e) {
            var month, year, day, index, $new, $active, e = e || window.event;

            if (window.getComputedStyle($calendar[0]).display !== 'none')
            {
                $active = gj.datepicker.methods.getActiveCell($calendar);
                if (e.keyCode == '38') { // up
                    index = $active.index();
                    $new = $active.closest('tr').prev('tr').find('td:eq(' + index + ')');
                    if (!$new.is('[day]')) {
                        gj.datepicker.methods.prev($datepicker, data)();
                        $new = $calendar.find('tbody tr').last().find('td:eq(' + index + ')');
                        if ($new.is(':empty')) {
                            $new = $calendar.find('tbody tr').last().prev().find('td:eq(' + index + ')');
                        }
                    }
                    if ($new.is('[day]')) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '40') { // down
                    index = $active.index();
                    $new = $active.closest('tr').next('tr').find('td:eq(' + index + ')');
                    if (!$new.is('[day]')) {
                        gj.datepicker.methods.next($datepicker, data)();
                        $new = $calendar.find('tbody tr').first().find('td:eq(' + index + ')');
                        if (!$new.is('[day]')) {
                            $new = $calendar.find('tbody tr:eq(1)').find('td:eq(' + index + ')');
                        }
                    }
                    if ($new.is('[day]')) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '37') { // left
                    $new = $active.prev('td[day]:not(.disabled)');
                    if ($new.length === 0) {
                        $new = $active.closest('tr').prev('tr').find('td[day]').last();
                    }
                    if ($new.length === 0) {
                        gj.datepicker.methods.prev($datepicker, data)();
                        $new = $calendar.find('tbody tr').last().find('td[day]').last();
                    }
                    if ($new.length > 0) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '39') { // right
                    $new = $active.next('[day]:not(.disabled)');
                    if ($new.length === 0) {
                        $new = $active.closest('tr').next('tr').find('td[day]').first();
                    }
                    if ($new.length === 0) {
                        gj.datepicker.methods.next($datepicker, data)();
                        $new = $calendar.find('tbody tr').first().find('td[day]').first();
                    }
                    if ($new.length > 0) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '13') { // enter
                    day = parseInt($active.attr('day'), 10);
                    month = parseInt($active.attr('month'), 10);
                    year = parseInt($active.attr('year'), 10);
                    gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, new Date(year, month, day))();
                } else if (e.keyCode == '27') { // esc
                    $datepicker.close();
                }
            }
        }
    },

    getActiveCell: function ($calendar) {
        var $cell = $calendar.find('td[day].focused');
        if ($cell.length === 0) {
            $cell = $calendar.find('td[day].selected');
            if ($cell.length === 0) {
                $cell = $calendar.find('td[day].today');
                if ($cell.length === 0) {
                    $cell = $calendar.find('td[day]:not(.disabled)').first();
                }
            }
        }
        return $cell;
    },

    value: function ($datepicker, value) {
        var $calendar, date, data = $datepicker.data();
        if (typeof (value) === "undefined") {
            return $datepicker.val();
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date) {
                $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
                gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date)();
            } else {
                $datepicker.val('');
            }            
            return $datepicker;
        }
    },

    destroy: function ($datepicker) {
        var data = $datepicker.data(),
            $parent = $datepicker.parent(),
            $picker = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
        if (data) {
            $datepicker.off();
            if ($picker.parent('[role="modal"]').length > 0) {
                $picker.unwrap();
            }
            $picker.remove();
            $datepicker.removeData();
            $datepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-datepicker');
            $datepicker.removeClass();
            $parent.children('[role="right-icon"]').remove();
            $datepicker.unwrap();
        }
        return $datepicker;
    }
};

gj.datepicker.events = {
    /**
     * Triggered when the datepicker value is changed.
     *
     * @event change
     * @param {object} e - event data
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <script>
     *     $('#datepicker').datepicker({
     *         change: function (e) {
     *             alert('Change is fired');
     *         }
     *     });
     * </script>
     */
    change: function ($datepicker) {
        return $datepicker.triggerHandler('change');
    },

    /**
     * Triggered when new value is selected inside the picker.
     *
     * @event select
     * @param {object} e - event data
     * @param {string} type - The type of the selection. The options are day, month, year or decade.
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <p>Click on the month name in order to select another month.</p>
     * <script>
     *     $('#datepicker').datepicker({
     *         modal: true,
     *         header: true,
     *         footer: true,
     *         change: function (e) {
     *             alert('Change is fired');
     *         },
     *         select: function (e, type) {
     *             alert('Select from type of "' + type + '" is fired');
     *         }
     *     });
     * </script>
     */
    select: function ($datepicker, type) {
        return $datepicker.triggerHandler('select', [type]);
    },

    /**
     * Event fires when the calendar is opened.
     * @event open
     * @param {object} e - event data
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <script>
     *     $('#datepicker').datepicker({
     *         modal: true,
     *         open: function (e) {
     *             alert('open is fired.');
     *         }
     *     });
     * </script>
     */
    open: function ($datepicker) {
        return $datepicker.triggerHandler('open');
    },

    /**
     * Event fires when the calendar is closed.
     * @event close
     * @param {object} e - event data
     * @example sample <!-- datepicker -->
     * <input id="datepicker" width="312" />
     * <script>
     *     $('#datepicker').datepicker({
     *         modal: true,
     *         close: function (e) {
     *             alert('Close is fired.');
     *         }
     *     });
     * </script>
     */
    close: function ($datepicker) {
        return $datepicker.triggerHandler('close');
    }
};

gj.datepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.datepicker.methods;

    /** Gets or sets the value of the datepicker.
     * @method
     * @param {string} value - The value that needs to be selected.
     * @return string | datepicker object
     * @example Get <!-- datepicker -->
     * <button class="gj-button-md" onclick="alert($datepicker.value())">Get Value</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     * @example Set <!-- datepicker -->
     * <button class="gj-button-md" onclick="$datepicker.value('08/01/2017')">Set Value</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove datepicker functionality from the element.
     * @method
     * @return jquery element
     * @example sample <!-- datepicker -->
     * <button class="gj-button-md" onclick="datepicker.destroy()">Destroy</button>
     * <input id="datepicker" width="312" />
     * <script>
     *     var datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Open the calendar.
     * @method
     * @return datepicker
     * @example Open.Close <!-- datepicker -->
     * <button class="gj-button-md" onclick="$datepicker.open()">Open</button>
     * <button class="gj-button-md" onclick="$datepicker.close()">Close</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.open = function () {
        return methods.open(this, this.data());
    };

    /** Close the calendar.
     * @method
     * @return datepicker
     * @example Open.Close <!-- datepicker -->
     * <button class="gj-button-md" onclick="$datepicker.open()">Open</button>
     * <button class="gj-button-md" onclick="$datepicker.close()">Close</button>
     * <hr/>
     * <input id="datepicker" width="312" />
     * <script>
     *     var $datepicker = $('#datepicker').datepicker();
     * </script>
     */
    self.close = function () {
        return methods.close(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-datepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.datepicker.widget.prototype = new gj.widget();
gj.datepicker.widget.constructor = gj.datepicker.widget;

(function ($) {
    $.fn.datepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.datepicker.widget(this, method);
            } else {
                $widget = new gj.datepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);