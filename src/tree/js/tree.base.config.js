/* global window alert jQuery gj */
/*
 * Gijgo JavaScript Library v0.7.0
 * http://gijgo.com/
 *
 * Copyright 2014, 2016 gijgo.com
 * Released under the MIT license
 */
/**
  * @widget Tree
  * @plugin Base
  */
if (typeof(gj) === 'undefined') {
    gj = {};
}
if (typeof(gj.tree) === 'undefined') {
    gj.tree = {
        plugins: {}
    };
}

gj.tree.config = {
    base: {
        autoLoad: true,
        selectionType: 'single',
        selectionMethod: 'basic',
        checkChildren: false,
        dataSource: undefined,
        primaryKey: undefined,
        textField: 'text',
        childrenField: 'children',
        lazyLoading: false,
        tmpl: undefined
    },

    bootstrap: {},

    jqueryui: {}
};