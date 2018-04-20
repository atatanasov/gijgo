gj.picker = {
    messages: {
        'en-us': {
        }
    }
};

gj.picker.methods = {

    initialize: function ($input, data, methods) {
        var $calendar, $rightIcon,
            $picker = methods.createPicker($input, data),
            $wrapper = $input.parent('div[role="wrapper"]');

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
            $input.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $input.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $input.val(data.value).addClass(data.style.input).attr('role', 'input');

        data.fontSize && $input.css('font-size', data.fontSize);

        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4') {
            if (data.size === 'small') {
                $wrapper.addClass('input-group-sm');
                $input.addClass('form-control-sm');
            } else if (data.size === 'large') {
                $wrapper.addClass('input-group-lg');
                $input.addClass('form-control-lg');
            }
        } else {
            if (data.size === 'small') {
                $wrapper.addClass('small');
            } else if (data.size === 'large') {
                $wrapper.addClass('large');
            }
        }

        $rightIcon.on('click', function (e) {
            if ($picker.is(':visible')) {
                $input.close();
            } else {
                $input.open();
            }
        });
        $wrapper.append($rightIcon);

        if (data.footer !== true) {
            $input.on('blur', function () {
                $input.timeout = setTimeout(function () {
                    $input.close();
                }, 500);
            });
            $picker.mousedown(function () {
                clearTimeout($input.timeout);
                $input.focus();
                return false;
            });
            $picker.on('click', function () {
                clearTimeout($input.timeout);
                $input.focus();
            });
        }

        // Picker Specific
        //if (data.keyboardNavigation) {
        //    $(document).on('keydown', gj.datepicker.methods.createKeyDownHandler($input, $calendar, data));
        //}
    }
};


gj.picker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.picker.methods;

    self.destroy = function () {
        return methods.destroy(this);
    };

    return $element;
};

gj.picker.widget.prototype = new gj.widget();
gj.picker.widget.constructor = gj.picker.widget;

gj.picker.widget.prototype.init = function (jsConfig, type, methods) {
    gj.widget.prototype.init.call(this, jsConfig, type);
    this.attr('data-' + type, 'true');
    gj.picker.methods.initialize(this, this.data(), methods);
    return this;
};
