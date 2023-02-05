/*
 * Gijgo Tree v2.0.0-alpha-1
 * http://gijgo.com/tree
 *
 * Copyright 2014, 2023 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**  */gj.tree = {
    plugins: {}
};

gj.tree.config = {
    base: {

        params: {},

        /** When this setting is enabled the content of the tree will be loaded automatically after the creation of the tree.         */        autoLoad: true,

        /** The type of the node selection.<br/>
         * If the type is set to multiple the user will be able to select more then one node in the tree.         */        selectionType: 'single',

        /** This setting enable cascade selection and unselection of children         */        cascadeSelection: false,

        /** The data source of tree.         */        dataSource: undefined,

        /** Primary key field name.         */        primaryKey: undefined,

        /** Text field name.         */        textField: 'text',

        /** Children field name.         */        childrenField: 'children',

        /** The name of the field that indicates if the node has children. Shows expand icon if the node has children.         */        hasChildrenField: 'hasChildren',

        /** Image css class field name.         */        imageCssClassField: 'imageCssClass',

        /** Image url field name.         */        imageUrlField: 'imageUrl',

        /** Image html field name.         */        imageHtmlField: 'imageHtml',

        /** Disabled field name. Assume that the item is not disabled if not set.         */        disabledField: 'disabled',

        /** Width of the tree.         */        width: undefined,

        /** When this setting is enabled the content of the tree will be wrapped by borders.         */        border: false,

        /** The name of the UI library that is going to be in use.         */        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.         */        iconsLibrary: 'materialicons',

        autoGenId: 1,

        autoGenFieldName: 'autoId_b5497cc5-7ef3-49f5-a7dc-4a932e1aee4a',

        indentation: 24,

        style: {
            wrapper: 'gj-unselectable',
            list: 'gj-list gj-list-md',
            item: undefined,
            active: 'gj-list-md-active',
            inactive: 'gj-list-md-inactive',
            leafIcon: undefined,
            border: 'gj-tree-md-border'
        },

        icons: {
            /** Expand icon definition.             */            expand: '<i class="gj-icon chevron-right" />',

            /** Collapse icon definition.             */            collapse: '<i class="gj-icon chevron-down" />'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-3',
            list: 'gj-list gj-list-bootstrap list-group',
            item: 'list-group-item',
            active: 'active',
            inactive: '',
            border: 'gj-tree-bootstrap-border'
        },
        iconsLibrary: 'glyphicons'
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-4',
            list: 'gj-list gj-list-bootstrap',
            item: 'list-group-item',
            active: 'active',
            inactive: '',
            border: 'gj-tree-bootstrap-border'
        },
        icons: {
            expand: '<i class="gj-icon plus" />',
            collapse: '<i class="gj-icon minus" />'
        }
    },

    bootstrap5: {
        style: {
            wrapper: 'gj-unselectable gj-tree-bootstrap-5',
            list: 'gj-list gj-list-bootstrap',
            item: 'list-group-item',
            active: 'active',
            inactive: 'inactive',
            border: 'gj-tree-bootstrap-border'
        },
        icons: {
            expand: '<i class="gj-icon plus" />',
            collapse: '<i class="gj-icon minus" />'
        }
    },

    materialicons: {
        style: {
            expander: 'gj-tree-material-icons-expander'
        }
    },

    fontawesome: {
        style: {
            expander: 'gj-tree-font-awesome-expander'
        },
        icons: {
            expand: '<i class="fa fa-plus" aria-hidden="true"></i>',
            collapse: '<i class="fa fa-minus" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        style: {
            expander: 'gj-tree-glyphicons-expander'
        },
        icons: {
            expand: '<span class="glyphicon glyphicon-plus" />',
            collapse: '<span class="glyphicon glyphicon-minus" />'
        }
    }
};
/**  */gj.tree.events = {

    /**
     * Event fires when the tree is initialized     */    initialized: function (el) {
        el.dispatchEvent(new Event('initialized'));
    },

    /**
     * Event fired before data binding takes place.     */    dataBinding: function (el) {
        el.dispatchEvent(new Event('dataBinding'));
    },

    /**
     * Event fires after the loading of the data in the tree.     */    dataBound: function (el) {
        el.dispatchEvent(new Event('dataBound'));
    },

    /**
     * Event fires after selection of tree node.     */    select: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('select', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires on un selection of tree node     */    unselect: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('unselect', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires before node expand.     */    expand: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('expand', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires before node collapse.     */    collapse: function (el, node, id) {
        return el.dispatchEvent(new CustomEvent('collapse', { detail: { node: node, id: id } }));
    },

    /**
     * Event fires on enable of tree node.     */    enable: function (el, node) {
        return el.dispatchEvent(new CustomEvent('enable', { detail: { node: node } }));
    },

    /**
     * Event fires on disable of tree node.     */    disable: function (el, node) {
        return el.dispatchEvent(new CustomEvent('disable', { detail: { node: node } }));
    },

    /**
     * Event fires before tree destroy     */    destroying: function (el) {
        return el.dispatchEvent(new Event('destroying'));
    },

    /**
     * Event fires when the data is bound to node.     */    nodeDataBound: function (el, node, id, record) {
        return el.dispatchEvent(new CustomEvent('nodeDataBound', { detail: { node: node, id: id, record: record } }));
    }
}
/*global gj $*/
gj.tree.methods = {

    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig);

        gj.tree.methods.initialize.call(this);

        if (this.getConfig().autoLoad) {
            this.reload();
        }
        return this;
    },

    initialize: function () {
        let data = this.getConfig(),
            wrapper = this.wrap('div');

        gj.core.addClasses(this.element, data.style.list);
        gj.core.addClasses(wrapper, data.style.wrapper);
        this.element.setAttribute('data-gj-type', this.type);
        if (data.width) {
            gj.core.css(wrapper, 'width', data.width);
        }
        if (data.border) {
            gj.core.addClasses(wrapper, data.style.border);
        }
        gj.tree.events.initialized(this.element);
    },

    useHtmlDataSource: function (tree, data) {
        data.dataSource = [];
    },

    render: function (tree, response) {
        let data;
        if (response) {
            if (typeof (response) === 'string' && JSON) {
                response = JSON.parse(response);
            }
            data = tree.getConfig();
            tree.setRecords(response);
            if (!data.primaryKey) {
                gj.tree.methods.genAutoId(data, response);
            }
            gj.tree.methods.loadData(tree);
        }
        return tree;
    },

    filter: function (tree) {
        return tree.getConfig().dataSource;
    },

    genAutoId: function (data, records) {
        let i;
        for (i = 0; i < records.length; i++) {
            records[i][data.autoGenFieldName] = data.autoGenId++;
            if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                gj.tree.methods.genAutoId(data, records[i][data.childrenField]);
            }
        }
    },

    loadData: function (tree) {
        let i, records = tree.getRecords();

        gj.tree.events.dataBinding(tree.element);
        tree.off();
        tree.element.innerHTML = '';
        for (i = 0; i < records.length; i++) {
            gj.tree.methods.appendNode(tree, tree.element, records[i], 1);
        }
        gj.tree.events.dataBound(tree.element);
    },

    appendNode: function (tree, parent, nodeData, level, position) {
        let i, node, wrapper, expander, display, spacer, newParent, span, img,
            data = tree.getConfig(),
            id = data.primaryKey ? nodeData[data.primaryKey] : nodeData[data.autoGenFieldName],
            hasChildren = typeof (nodeData[data.hasChildrenField]) !== 'undefined' && nodeData[data.hasChildrenField].toString().toLowerCase() === 'true',
            disabled = typeof (nodeData[data.disabledField]) !== 'undefined' && nodeData[data.disabledField].toString().toLowerCase() === 'true';
            
        node = document.createElement('li');
        node.setAttribute('data-gj-id', id);
        node.setAttribute('data-gj-role', 'node');
        gj.core.addClasses(node, data.style.item);
            
        wrapper = document.createElement('div');   
        wrapper.setAttribute('data-gj-role', 'wrapper');

        expander =  document.createElement('span');
        expander.setAttribute('data-gj-role', 'expander');
        expander.setAttribute('data-gj-mode', 'close');
        gj.core.addClasses(expander, data.style.expander);

        display =  document.createElement('span');
        display.setAttribute('data-gj-role', 'display');
        display.innerHTML = nodeData[data.textField];

        if (data.indentation) {
            spacer = document.createElement('span');
            spacer.setAttribute('data-gj-role', 'spacer');
            spacer.style.width = ((data.indentation * (level - 1)) / 16) + 'rem';
            wrapper.appendChild(spacer);
        }

        if (disabled) {
            gj.tree.methods.disableNode(tree, node);
        } else {
            gj.core.on(expander, 'click', gj.tree.methods.expanderClickHandler(tree));
            gj.core.on(display, 'click', gj.tree.methods.displayClickHandler(tree));
        }
        wrapper.appendChild(expander);
        wrapper.appendChild(display);
        node.appendChild(wrapper);

        if (position) {
            parent.insertBefore(node, parent.children[position - 1]);
        } else {
            parent.appendChild(node);
        }

        if (data.imageCssClassField && nodeData[data.imageCssClassField]) {
            span = document.createElement('span');
            span.setAttribute('data-gj-role', 'image');
            span.innerHTML = '<span class="' + nodeData[data.imageCssClassField] + '"></span>';
            wrapper.insertBefore(span, display);
        } else if (data.imageUrlField && nodeData[data.imageUrlField]) {
            span = document.createElement('span');
            span.setAttribute('data-gj-role', 'image');
            wrapper.insertBefore(span, display);
            img = document.createElement('img');
            img.setAttribute('src', nodeData[data.imageUrlField]);
            img.setAttribute('width', gj.core.width(span));
            img.setAttribute('height', gj.core.height(span));
            span.appendChild(img);
        } else if (data.imageHtmlField && nodeData[data.imageHtmlField]) {
            span = document.createElement('span');
            span.setAttribute('data-gj-role', 'image');
            span.innerHTML = nodeData[data.imageHtmlField];
            wrapper.insertBefore(span, display);
        }

        if ((nodeData[data.childrenField] && nodeData[data.childrenField].length) || hasChildren) {
            expander.innerHTML = data.icons.expand;
            newParent = document.createElement('ul');
            gj.core.addClasses(newParent, data.style.list + ' gj-hidden');
            node.appendChild(newParent);

            if (nodeData[data.childrenField] && nodeData[data.childrenField].length) {
                for (i = 0; i < nodeData[data.childrenField].length; i++) {
                    gj.tree.methods.appendNode(tree, newParent, nodeData[data.childrenField][i], level + 1);
                }
            }
        } else {
            data.style.leafIcon ? gj.core.addClasses(expander, data.style.leafIcon) : expander.innerHTML = '&nbsp;';
        }

        gj.tree.events.nodeDataBound(tree.element, node, nodeData.id, nodeData);
    },

    expanderClickHandler: function (tree) {
        return function (e) {
            let node = this.closest('li');
            if (this.getAttribute('data-gj-mode') === 'close') {
                tree.expand(node);
            } else {
                tree.collapse(node);
            }
        }
    },

    expand: function (tree, node, cascade) {
        let children, i,
            expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            data = tree.getConfig(),
            id = node.getAttribute('data-gj-id'),
            list = node.querySelector('ul');

        if (gj.tree.events.expand(tree.element, node, id) !== false && list) {
            list.style.display = 'block';
            expander.setAttribute('data-gj-mode', 'open');
            expander.innerHTML = data.icons.collapse;
            if (cascade) {
                children = node.querySelectorAll('ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.expand(tree, children[i], cascade);
                }
            }
        }
        return tree;
    },

    collapse: function (tree, node, cascade) {
        let children, i,
            expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            data = tree.getConfig(),
            id = node.getAttribute('data-gj-id'),
            list = node.querySelector('ul');

        if (gj.tree.events.collapse(tree.element, node, id) !== false && list) {
            list.style.display = 'none';
            expander.setAttribute('data-gj-mode', 'close');
            expander.innerHTML = data.icons.expand;
            if (cascade) {
                children = node.querySelectorAll('ul>li>[data-gj-role="wrapper"]>span[data-gj-mode="open"]');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.collapse(tree, children[i], cascade);
                }
            }
        }
        return tree;
    },

    expandAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.expand(tree, nodes[i], true);
        }
        return tree;
    },

    collapseAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.collapse(tree, nodes[i], true);
        }
        return tree;
    },

    displayClickHandler: function (tree) {
        return function () {
            let display = this,
                node = display.closest('li'),
                data = tree.getConfig()
                cascade = data.cascadeSelection;
            if (node.getAttribute('data-gj-selected') === 'true') {
                gj.tree.methods.unselect(tree, node, cascade);
            } else {
                if (data.selectionType === 'single') {
                    gj.tree.methods.unselectAll(tree);
                }
                gj.tree.methods.select(tree, node, cascade);
            }
        }
    },

    selectAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.select(tree, nodes[i], true);
        }
        return tree;
    },

    select: function (tree, node, cascade) {
        let data = tree.getConfig(),
            allowEvent = gj.tree.events.select(tree.element, node, node.getAttribute('data-gj-id')) !== false && !node.classList.contains('disabled');
        if (node.getAttribute('data-gj-selected') !== 'true' && allowEvent) {
            gj.core.removeClasses(node, data.style.inactive);
            gj.core.addClasses(node, data.style.active);
            node.setAttribute('data-gj-selected', 'true');
        }
        if (cascade && allowEvent) {
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].tagName.toUpperCase() === 'UL') {
                    for (let j = 0; j < node.children[i].children.length; j++) {
                        if (node.children[i].children[j].tagName.toUpperCase() === 'LI') {
                            gj.tree.methods.select(tree, node.children[i].children[j], cascade);
                        }
                    }
                }
            }
        }
    },
    
    unselectAll: function (tree) {
        let i, nodes = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.unselect(tree, nodes[i], true);
        }
        return tree;
    },

    unselect: function (tree, node, cascade) {
        let data = tree.getConfig(),
            allowEvent = gj.tree.events.unselect(tree.element, node, node.getAttribute('data-gj-id')) !== false && !node.classList.contains('disabled');
        if (node.getAttribute('data-gj-selected') === 'true' && allowEvent) {
            gj.core.removeClasses(node, data.style.active);
            gj.core.addClasses(node, data.style.inactive);
            node.removeAttribute('data-gj-selected');
        }
        if (cascade && allowEvent) {
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].tagName.toUpperCase() === 'UL') {
                    for (let j = 0; j < node.children[i].children.length; j++) {
                        if (node.children[i].children[j].tagName.toUpperCase() === 'LI') {
                            gj.tree.methods.unselect(tree, node.children[i].children[j], cascade);
                        }
                    }
                }
            }
        }
    },

    getSelections: function (list) {
        let result = [],
            nodes = list.querySelectorAll('li');
        if (nodes && nodes.length) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].getAttribute('data-gj-selected') === 'true') {
                    result.push(nodes[i].getAttribute('data-gj-id'));
                }
            }
        }

        return result;
    },

    getDataById: function (tree, id, records) {
        let i, data = tree.getConfig(), result = undefined;
        for (i = 0; i < records.length; i++) {
            if (data.primaryKey && records[i][data.primaryKey] == id) {
                result = records[i];
                break;
            } else if (records[i][data.autoGenFieldName] == id) {
                result = records[i];
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                result = gj.tree.methods.getDataById(tree, id, records[i][data.childrenField]);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getDataByText: function (tree, text, records) {
        let i, id,
            result = undefined,
            data = tree.getConfig();
        for (i = 0; i < records.length; i++) {
            if (text === records[i][data.textField]) {
                result = records[i];
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                result = gj.tree.methods.getDataByText(tree, text, records[i][data.childrenField]);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getNodeById: function (list, id) {
        let i, node,
            result = undefined,
            nodes = list.querySelectorAll('li');
        if (nodes && nodes.length) {
            for (i = 0; i < nodes.length; i++) {
                node = nodes[i];
                if (id == node.getAttribute('data-gj-id')) {
                    result = node;
                    break;
                }
            }
        }
        return result;
    },

    getNodeByText: function (list, text) {
        let i, node,
            result = undefined,
            nodes = list.querySelectorAll('li');
        if (nodes && nodes.length) {
            for (i = 0; i < nodes.length; i++) {
                node = nodes[i];
                if (text === gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="display"]').innerText) {
                    result = node;
                    break;
                }
            }
        }
        return result;
    },

    addNode: function (tree, nodeData, parent, position) {
        let level, record, records, data = tree.getConfig();

        if (!parent) {
            parent = tree.element;
            records = tree.getRecords();
            records.push(nodeData)
            tree.setRecords(records);
        } else {
            if (parent.tagName.toUpperCase() === 'LI') {
                if (!parent.querySelector('ul')) {
                    parent.querySelector('[data-gj-role="expander"]').innerHTML = data.icons.collapse;
                    parent.appendChild(gj.core.addClasses(document.createElement('ul'), data.style.list));
                }
                parent = parent.querySelector('ul');
            }
            record = tree.getDataById(parent.parentNode.getAttribute('data-gj-id'));
            if (!record[data.childrenField]) {
                record[data.childrenField] = [];
            }
            record[data.childrenField].push(nodeData);
        }
        level = gj.tree.methods.getLevel(parent);
        if (!data.primaryKey) {
            gj.tree.methods.genAutoId(data, [nodeData]);
        }

        gj.tree.methods.appendNode(tree, parent, nodeData, level, position);

        return tree;
    },

    getLevel: function(node) {
        let count = 1, el = node.parentNode;
        while (el && (el.getAttribute('data-gj-type') !== 'tree') && (node.getAttribute('data-gj-type') !== 'tree')) {
            count++;
            el = el.parentNode;
        }
        return count;
    },

    remove: function (tree, node) {
        gj.tree.methods.removeDataById(tree, node.getAttribute('data-gj-id'), tree.getRecords());
        node.remove();
        return tree;
    },

    removeDataById: function (tree, id, records) {
        let i, data = tree.getConfig();
        for (i = 0; i < records.length; i++) {
            if (data.primaryKey && records[i][data.primaryKey] == id) {
                records.splice(i, 1);
                break;
            } else if (records[i][data.autoGenFieldName] == id) {
                records.splice(i, 1);
                break;
            } else if (records[i][data.childrenField] && records[i][data.childrenField].length) {
                gj.tree.methods.removeDataById(tree, id, records[i][data.childrenField]);
            }
        }
    },

    update: function (tree, id, newRecord) {
        let data = tree.getConfig(),
            node = tree.getNodeById(id),
            oldRecord = tree.getDataById(id);
        oldRecord = newRecord;
        node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="display"]').innerHTML = newRecord[data.textField];
        gj.tree.events.nodeDataBound(tree.element, node, id, newRecord);
        return tree;
    },

    getChildren: function (node, cascade) {
        let result = [], i, children;
        
        cascade = typeof (cascade) === 'undefined' ? true : cascade;
        if (cascade) {
            children = node.querySelectorAll('ul>li');
        } else {
            children = gj.core.selectAll(node, 'ul>li');
        }

        for (i = 0; i < children.length; i++) {
            result.push(children[i].getAttribute('data-gj-id'));
        }

        return result;
    },

    enableAll: function (tree) {
        let i, children = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < children.length; i++) {
            gj.tree.methods.enableNode(tree, children[i], true);
        }
        return tree;
    },

    enableNode: function (tree, node, cascade) {
        let i, children,
            expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            display = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="display"]');
        
        if (expander && display) {
            cascade = typeof (cascade) === 'undefined' ? true : cascade;
            node.classList.remove('disabled');
            gj.core.on(expander, 'click', gj.tree.methods.expanderClickHandler(tree));
            gj.core.on(display, 'click', gj.tree.methods.displayClickHandler(tree));
            gj.tree.events.enable(tree.element, node);
            if (cascade) {
                children = gj.core.selectAll(node, 'ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.enableNode(tree, children[i], cascade);
                }
            }
        }
    },

    disableAll: function (tree) {
        let i, children = gj.core.selectAll(tree.element, 'li');
        for (i = 0; i < children.length; i++) {
            gj.tree.methods.disableNode(tree, children[i], true);
        }
        return tree;
    },

    disableNode: function (tree, node, cascade) {
        let i, children,
            expander = node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            display = node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="display"]');
        
        if (expander && display) {
            cascade = typeof (cascade) === 'undefined' ? true : cascade;
            node.classList.add('disabled');
            gj.core.off(expander, 'click');
            gj.core.off(display, 'click');
            gj.tree.events.disable(tree.element, node);
            if (cascade) {
                children = gj.core.selectAll(node, 'ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.disableNode(tree, children[i], cascade);
                }
            }
        }
    },

    destroy: function (tree) {
        let data = tree.getConfig();
        if (data) {
            gj.tree.events.destroying(tree.element);
            tree.xhr && tree.xhr.abort();
            tree.off();
            tree.removeConfig();
            grid.removeRecords();
            grid.removeTotalRecords();
            tree.element.removeAttribute('data-gj-guid');
            tree.element.removeAttribute('data-gj-type');
            tree.element.setAttribute('class', '');
            tree.element.innerHTML = '';
        }
        return tree;
    },

    pathFinder: function (data, list, id, parents) {
        let i, result = false;

        for (i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                result = true;
                break;
            } else if (list[i][data.childrenField] && gj.tree.methods.pathFinder(data, list[i][data.childrenField], id, parents)) {
                parents.push(list[i][data.textField]);
                result = true;
                break;
            }
        }

        return result;
    }
}
/**  */GijgoTree = function (element, jsConfig) {
    var self = this,
        methods = gj.tree.methods;

    self.type = 'tree';
    self.element = element;

    /**
     * Reload the tree.     */    self.reload = function (params) {
        return gj.widget.prototype.reload.call(this, params);
    };

    /**
     * Render data in the tree     */    self.render = function (response) {
        return methods.render(this, response);
    };

    /**
     * Add node to the tree.     */    self.addNode = function (data, parentNode, position) {
        return methods.addNode(this, data, parentNode, position);
    };

    /**
     * Remove node from the tree.     */    self.removeNode = function (node) {
        return methods.remove(this, node);
    };

    /**
     * Update node from the tree.     */    self.updateNode = function (id, record) {
        return methods.update(this, id, record);
    };

    /**
     * Destroy the tree.     */    self.destroy = function () {
        return methods.destroy(this);
    };

    /**
     * Expand node from the tree.     */    self.expand = function (node, cascade) {
        return methods.expand(this, node, cascade);
    };

    /**
     * Collapse node from the tree.     */    self.collapse = function (node, cascade) {
        return methods.collapse(this, node, cascade);
    };

    /**
     * Expand all tree nodes     */    self.expandAll = function () {
        return methods.expandAll(this);
    };

    /**
     * Collapse all tree nodes     */    self.collapseAll = function () {
        return methods.collapseAll(this);
    };

    /**
     * Return node data by id of the record.     */    self.getDataById = function (id) {
        return methods.getDataById(this, id, this.getRecords());
    };

    /**
     * Return node data by text.     */    self.getDataByText = function (text) {
        return methods.getDataByText(this, text, this.getRecords());
    };

    /**
     * Return node by id of the record.     */    self.getNodeById = function (id) {
        return methods.getNodeById(this.element, id);
    };

    /**
     * Return node by text.     */    self.getNodeByText = function (text) {
        return methods.getNodeByText(this.element, text);
    };

    /**
     * Return an array with all records presented in the tree.     */    self.getAll = function () {
        return this.getRecords();
    };

    /**
     * Select node from the tree.     */    self.select = function (node) {
        return methods.select(this, node);
    };

    /**
     * Unselect node from the tree.     */    self.unselect = function (node) {
        return methods.unselect(this, node);
    };

    /**
     * Select all tree nodes     */    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all tree nodes     */    self.unselectAll = function () {
        return methods.unselectAll(this);
    };

    /**
     * Return an array with the ids of the selected nodes.     */    self.getSelections = function () {
        return methods.getSelections(this.element);
    };

    /**
     * Return an array with the ids of all children.     */    self.getChildren = function (node, cascade) {
        return methods.getChildren(node, cascade);
    };

    /**
     * Return an array with the names of all parents.     */    self.parents = function (id) {
        var parents = [];
        methods.pathFinder(this.getConfig(), this.getRecords(), id, parents);
        return parents.reverse();
    };

    /**
     * Enable node from the tree.     */    self.enable = function (node, cascade) {
        return methods.enableNode(this, node, cascade);
    };

    /**
     * Enable all nodes from the tree.     */    self.enableAll = function () {
        return methods.enableAll(this);
    };

    /**
     * Disable node from the tree.     */    self.disable = function (node, cascade) {
        return methods.disableNode(this, node, cascade);
    };

    /**
     * Disable all nodes from the tree.     */    self.disableAll = function () {
        return methods.disableAll(this);
    };

    if ('tree' !== element.getAttribute('data-gj-type')) {
        methods.init.call(self, jsConfig);
    }

    return self;
};

GijgoTree.prototype = new gj.widget();
GijgoTree.constructor = GijgoTree;

if (typeof (jQuery) !== "undefined") {
    (function ($) {
        $.fn.tree = function (method) {
            var widget;
            if (this && this.length) {
                if (typeof method === 'object' || !method) {
                    return new GijgoTree(this, method);
                } else {
                    widget = new GijgoTree(this, null);
                    if (widget[method]) {
                        return widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                    } else {
                        throw 'Method ' + method + ' does not exist.';
                    }
                }
            }
        };
    })(jQuery);
}
/**  */gj.tree.plugins.checkboxes = {
    config: {
        base: {
            /** Add checkbox for each node, if set to true.              */            checkboxes: undefined,

            /** Name of the source field, that indicates if the checkbox is checked.             */            checkedField: 'checked',

            /** This setting enable cascade check and uncheck of children             */            cascadeCheck: true,
        }
    },

    private: {
        dataBound: function (tree) {
            let nodes, chkb, state;
            if (tree.getConfig().cascadeCheck) {
                nodes = tree.element.querySelectorAll('li[data-gj-role="node"]');
                for (const node of nodes) {
                    chkb = node.querySelector('[data-gj-role="checkbox"] input[type="checkbox"]');
                    if (chkb) {
                        state = gj.checkbox.methods.state(chkb);
                        if (state === 'checked') {
                            gj.tree.plugins.checkboxes.private.updateChildrenState(node, state);
                            gj.tree.plugins.checkboxes.private.updateParentState(node, state);
                        }
                    }
                }
            }
        },

        nodeDataBound: function (tree, node, id, record) {
            let data, expander, checkbox, wrapper, disabled;
            
            if (!gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="checkbox"]'))
            {
                data = tree.getConfig();
                expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="display"]');
                checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                wrapper = document.createElement('span');
                wrapper.setAttribute('data-gj-role', 'checkbox');
                wrapper.appendChild(checkbox);
                expander.parentNode.insertBefore(wrapper, expander);
                disabled = typeof (record[data.disabledField]) !== 'undefined' && record[data.disabledField].toString().toLowerCase() === 'true';

                checkbox = new GijgoCheckBox(checkbox, {
                    uiLibrary: data.uiLibrary,
                    iconsLibrary: data.iconsLibrary,
                    change: function (e) {
                        let state = gj.checkbox.methods.state(e.target);
                        gj.tree.plugins.checkboxes.events.checkboxChange(tree.element, node, record, state);
                    }
                });
                if (disabled) {
                    checkbox.element.disabled = true;
                }
                record[data.checkedField] && checkbox.state('checked');
                checkbox.on('click', function (e) {
                    let node = this.closest('li'),
                        state = gj.checkbox.methods.state(this);
                    if (data.cascadeCheck) {
                        gj.tree.plugins.checkboxes.private.updateChildrenState(node, state);
                        gj.tree.plugins.checkboxes.private.updateParentState(node, state);
                    }
                });
            }
        },

        updateParentState: function (node, state) {
            let parentNode, parentCheckbox, siblingCheckboxes, allChecked, allUnchecked, parentState;

            parentNode = node.parentNode.parentNode;
            if (parentNode && parentNode.getAttribute('data-gj-role') === 'node') {
                parentCheckbox = parentNode.querySelector('[data-gj-role="wrapper"] > [data-gj-role="checkbox"] input[type="checkbox"]');
                siblingCheckboxes = node.parentNode.querySelectorAll('[data-gj-role="wrapper"] > span[data-gj-role="checkbox"] input[type="checkbox"]');
                allChecked = (state === 'checked');
                allUnchecked = (state === 'unchecked');
                parentState = 'indeterminate';
                for (const chkb of siblingCheckboxes) {
                    let state = gj.checkbox.methods.state(chkb);
                    if (allChecked && state !== 'checked') {
                        allChecked = false;
                    }
                    if (allUnchecked && state !== 'unchecked') {
                        allUnchecked = false;
                    }
                };
                if (allChecked && !allUnchecked) {
                    parentState = 'checked';
                }
                if (!allChecked && allUnchecked) {
                    parentState = 'unchecked';
                }
                gj.checkbox.methods.state(parentCheckbox, parentState);
                gj.tree.plugins.checkboxes.private.updateParentState(parentNode, parentState);
            }
        },

        updateChildrenState: function (node, state) {
            let childrenCheckboxes = node.querySelectorAll('ul li [data-gj-role="wrapper"] [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const chkb of childrenCheckboxes) {
                gj.checkbox.methods.state(chkb, state);
            }
        },

        update: function (tree, node, state) {
            let checkbox = node.querySelector('[data-gj-role="checkbox"] input[type="checkbox"]');
            gj.checkbox.methods.state(checkbox, state);
            if (tree.getConfig().cascadeCheck) {
                gj.tree.plugins.checkboxes.private.updateChildrenState(node, state);
                gj.tree.plugins.checkboxes.private.updateParentState(node, state);
            }
        }
    },

    public: {

        /** Get ids of all checked nodes         */        getCheckedNodes: function () {
            let result = [],
                checkboxes = this.element.querySelectorAll('li [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const checkbox of checkboxes) {
                if (gj.checkbox.methods.state(checkbox) === 'checked') {
                    result.push(checkbox.closest('li').getAttribute('data-gj-id'));
                }
            };
            return result;
        },

        /**
         * Check all tree nodes         */        checkAll: function () {
            let checkboxes = this.element.querySelectorAll('li [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const checkbox of checkboxes) {
                gj.checkbox.methods.state(checkbox, 'checked');
            };
            return this;
        },

        /**
         * Uncheck all tree nodes         */        uncheckAll: function () {
            let checkboxes = this.element.querySelectorAll('li [data-gj-role="checkbox"] input[type="checkbox"]');
            for (const checkbox of checkboxes) {
                gj.checkbox.methods.state(checkbox, 'unchecked');
            };
            return this;
        },

        /**
         * Check tree node.         */        check: function (node) {
            gj.tree.plugins.checkboxes.private.update(this, node, 'checked');
            return this;
        },

        /**
         * Uncheck tree node.         */        uncheck: function (node) {
            gj.tree.plugins.checkboxes.private.update(this, node, 'unchecked');
            return this;
        }
    },

    events: {
        /**
         * Event fires when the checkbox state is changed.         */        checkboxChange: function (el, node, record, state) {
            return el.dispatchEvent(new CustomEvent('checkboxChange', { detail: { node: node, record: record, state: state } }));
        }
    },

    configure: function (tree) {
        if (tree.getConfig().checkboxes && gj.checkbox) {
            tree.extend(tree, gj.tree.plugins.checkboxes.public);
            tree.on('nodeDataBound', function (e) {
                gj.tree.plugins.checkboxes.private.nodeDataBound(tree, e.detail.node, e.detail.id, e.detail.record);
            });
            tree.on('dataBound', function () {
                gj.tree.plugins.checkboxes.private.dataBound(tree);
            });
            tree.on('enable', function (e) {
                let checkbox = e.detail.node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="checkbox"] input[type="checkbox"]');
                if (checkbox) {
                    checkbox.disabled = false;
                }
            });
            tree.on('disable', function (e) {
                let checkbox = e.detail.node.querySelector('[data-gj-role="wrapper"]>[data-gj-role="checkbox"] input[type="checkbox"]');
                if (checkbox) {
                    checkbox.disabled = true;
                }
            });
        }
    }
};

/** */gj.tree.plugins.dragAndDrop = {
	config: {
		base: {
			/** Enables drag and drop functionality for each node.              */			dragAndDrop: undefined,

			style: {
			    dragEl: 'gj-tree-drag-el gj-tree-md-drag-el',
                dropAsChildIcon: 'gj-cursor-pointer gj-icon plus',
			    dropAbove: 'gj-tree-drop-above',
			    dropBelow: 'gj-tree-drop-below'
			}
        },

        bootstrap: {
            style: {
                dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
                dropAsChildIcon: 'glyphicon glyphicon-plus',
                dropAbove: 'drop-above',
                dropBelow: 'drop-below'
            }
        },

        bootstrap4: {
            style: {
                dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
                dropAsChildIcon: 'gj-cursor-pointer gj-icon plus',
                dropAbove: 'drop-above',
                dropBelow: 'drop-below'
            }
        }
	},

	private: {
	    nodeDataBound: function (tree, node) {
	        let wrapper = node.querySelector('>[data-gj-role="wrapper"]'),
    	        display = node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="display"]');
            if (wrapper && display) {
                display.addEventListener('mousedown', gj.tree.plugins.dragAndDrop.private.createNodeMouseDownHandler(tree));
                display.addEventListener('mousemove', gj.tree.plugins.dragAndDrop.private.createNodeMouseMoveHandler(tree, node, display));
                display.addEventListener('mouseup', gj.tree.plugins.dragAndDrop.private.createNodeMouseUpHandler(tree));
		    }
        },

        createNodeMouseDownHandler: function (tree) {
            return function (e) {
                tree.element.setAttribute('data-gj-drag-ready', true);
            }
        },

        createNodeMouseUpHandler: function (tree) {
            return function (e) {
                tree.element.setAttribute('data-gj-drag-ready', false);
            }
        },

	    createNodeMouseMoveHandler: function (tree, node, display) {
            return function (e) {
                if (tree.element.getAttribute('data-gj-drag-ready') === 'true') {
                    let data = tree.getConfig(), dragEl, wrapper, ul, li, indicator, offsetTop, offsetLeft;

                    tree.element.setAttribute('data-gj-drag-ready', false);
                    dragEl = display.cloneNode();
                    dragEl.setAttribute('data-gj-role', 'draggable-clone');
                    dragEl.classList.add('gj-unselectable');
                    gj.core.addClasses(dragEl, data.style.dragEl);
                    wrapper = gj.core.wrap(dragEl, 'div');

                    ul = document.createElement('ul');
                    gj.core.addClasses(ul, data.style.list);
                    wrapper.appendChild(ul);

                    li = document.createElement('li');
                    gj.core.addClasses(li, data.style.item);
                    ul.appendChild(li);
                    document.body.appendChild(dragEl);

                    indicator = document.createElement('span');
                    indicator.setAttribute('data-gj-role', 'indicator');
                    wrapper.parentNode.insertBefore(indicator, wrapper);
                    
                    new GijgoDraggable(dragEl, {
                        drag: gj.tree.plugins.dragAndDrop.private.createDragHandler(tree, node, display),
                        stop: gj.tree.plugins.dragAndDrop.private.createDragStopHandler(tree, node, display)
                    });
                    wrapper = display.parent();
                    offsetTop = display.offset().top;
                    offsetTop -= parseInt(wrapper.css("border-top-width")) + parseInt(wrapper.css("margin-top")) + parseInt(wrapper.css("padding-top"));
                    offsetLeft = display.offset().left;
                    offsetLeft -= parseInt(wrapper.css("border-left-width")) + parseInt(wrapper.css("margin-left")) + parseInt(wrapper.css("padding-left"));
                    offsetLeft -= dragEl.find('[data-gj-role="indicator"]').outerWidth(true);
                    dragEl.css({
                        position: 'absolute', top: offsetTop, left: offsetLeft, width: display.outerWidth(true)
                    });
                    if (display.attr('data-droppable') === 'true') {
                        display.droppable('destroy');
                    }
                    gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, node, display).each(function () {
                        let dropEl = (this);
                        if (dropEl.attr('data-droppable') === 'true') {
                            dropEl.droppable('destroy');
                        }
                        dropEl.droppable();
                    });
                    gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, node).each(function () {
                        let dropEl = (this);
                        if (dropEl.attr('data-droppable') === 'true') {
                            dropEl.droppable('destroy');
                        }
                        dropEl.droppable();
                    });
                    dragEl.trigger('mousedown');
                }
		    };
	    },

	    getTargetDisplays: function (tree, node, display) {
	        return tree.find('[data-gj-role="display"]').not(display).not(node.find('[data-gj-role="display"]'));
	    },

	    getTargetWrappers: function (tree, node) {
	        return tree.find('[data-gj-role="wrapper"]').not(node.find('[data-gj-role="wrapper"]'));
	    },

	    createDragHandler: function (tree, node, display) {
	        let displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, node, display),
                wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers(tree, node),
	            data = tree.getConfig();
	        return function (e, offset, mousePosition) {
	            let dragEl = (this), success = false;
	            displays.each(function () {
	                let targetDisplay = (this),
	                    indicator;
	                if (targetDisplay.droppable('isOver', mousePosition)) {
	                    indicator = dragEl.find('[data-gj-role="indicator"]');
	                    data.style.dropAsChildIcon ? indicator.addClass(data.style.dropAsChildIcon) : indicator.text('+');
	                    success = true;
	                    return false;
	                } else {
	                    dragEl.find('[data-gj-role="indicator"]').removeClass(data.style.dropAsChildIcon).empty();
                    }
	            });
	            wrappers.each(function () {
	                let wrapper = (this),
                        indicator, middle;
	                if (!success && wrapper.droppable('isOver', mousePosition)) {
	                    middle = wrapper.position().top + (wrapper.outerHeight() / 2);
	                    if (mousePosition.y < middle) {
	                        wrapper.addClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                    } else {
	                        wrapper.addClass(data.style.dropBelow).removeClass(data.style.dropAbove);
	                    }
	                } else {
	                    wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                }
	            });
	        };
        },

	    createDragStopHandler: function (tree, sourceNode, sourceDisplay) {
	        let displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays(tree, sourceNode, sourceDisplay),
                wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers(tree, sourceNode),
	            data = tree.getConfig();
	        return function (e, mousePosition) {
                let success = false, record, targetNode, sourceParentNode, parent;
	            (this).draggable('destroy').remove();
	            displays.each(function () {
	                let targetDisplay = (this), ul;
	                if (targetDisplay.droppable('isOver', mousePosition)) {
	                    targetNode = targetDisplay.closest('li');
	                    sourceParentNode = sourceNode.parent('ul').parent('li');
	                    ul = targetNode.children('ul');
	                    if (ul.length === 0) {
	                        ul = ('<ul />').addClass(data.style.list);
	                        targetNode.append(ul);
	                    }
	                    if (gj.tree.plugins.dragAndDrop.events.nodeDrop(tree, sourceNode.data('id'), targetNode.data('id'), ul.children('li').length + 1) !== false) {
                            ul.append(sourceNode);

                            //BEGIN: Change node position inside the backend data
                            record = tree.getDataById(sourceNode.data('id'));
                            gj.tree.methods.removeDataById(tree, sourceNode.data('id'), data.records);
                            parent = tree.getDataById(ul.parent().data('id'));
                            if (parent[data.childrenField] === undefined) {
                                parent[data.childrenField] = [];
                            }
                            parent[data.childrenField].push(record);
                            //END

	                        gj.tree.plugins.dragAndDrop.private.refresh(tree, sourceNode, targetNode, sourceParentNode);
	                    }
	                    success = true;
	                    return false;
	                }
	                targetDisplay.droppable('destroy');
	            });
	            if (!success) {
	                wrappers.each(function () {
	                    let targetWrapper = (this), prepend, orderNumber, sourceNodeId;
	                    if (targetWrapper.droppable('isOver', mousePosition)) {
	                        targetNode = targetWrapper.closest('li');
	                        sourceParentNode = sourceNode.parent('ul').parent('li');
	                        prepend = mousePosition.y < (targetWrapper.position().top + (targetWrapper.outerHeight() / 2));
	                        sourceNodeId = sourceNode.data('id');
	                        orderNumber = targetNode.prevAll('li:not([data-id="' + sourceNodeId + '"])').length + (prepend ? 1 : 2);
                            if (gj.tree.plugins.dragAndDrop.events.nodeDrop(tree, sourceNodeId, targetNode.parent('ul').parent('li').data('id'), orderNumber) !== false) {
                                //BEGIN: Change node position inside the backend data
                                record = tree.getDataById(sourceNode.data('id'));
                                gj.tree.methods.removeDataById(tree, sourceNode.data('id'), data.records);
                                tree.getDataById(targetNode.parent().data('id'))[data.childrenField].splice(targetNode.index() + (prepend ? 0 : 1), 0, record);
                                //END

	                            if (prepend) {
                                    sourceNode.insertBefore(targetNode);
	                            } else {
	                                sourceNode.insertAfter(targetNode);
                                }

                                gj.tree.plugins.dragAndDrop.private.refresh(tree, sourceNode, targetNode, sourceParentNode);
	                        }
	                        return false;
	                    }
	                    targetWrapper.droppable('destroy');
	                });
                }
	        }
	    },

	    refresh: function (tree, sourceNode, targetNode, sourceParentNode) {
	        let data = tree.getConfig();
	        gj.tree.plugins.dragAndDrop.private.refreshNode(tree, targetNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode(tree, sourceParentNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode(tree, sourceNode);
	        sourceNode.find('li[data-gj-role="node"]').each(function () {
	            gj.tree.plugins.dragAndDrop.private.refreshNode(tree, (this));
	        });
	        targetNode.children('[data-gj-role="wrapper"]').removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
        },

	    refreshNode: function (tree, node) {
	        let wrapper = node.children('[data-gj-role="wrapper"]'),
	            expander = wrapper.children('[data-gj-role="expander"]'),
	            spacer = wrapper.children('[data-gj-role="spacer"]'),
	            list = node.children('ul'),
                data = tree.getConfig(),
	            level = node.parentsUntil('[data-type="tree"]', 'ul').length;

	        if (list.length && list.children().length) {
	            if (list.is(':visible')) {
	                expander.empty().append(data.icons.collapse);
	            } else {
	                expander.empty().append(data.icons.expand);
	            }
	        } else {
	            expander.empty();
	        }
	        wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);

	        spacer.css('width', (data.indentation * (level - 1)));
	    }
	},

	public: {
	},

	events: {
	    /**
         * Event fires when the node is dropped.         */	    nodeDrop: function (tree, id, parentId, orderNumber) {
	        return tree.triggerHandler('nodeDrop', [id, parentId, orderNumber]);
        }
    },

	configure: function (tree) {
		tree.extend(tree, gj.tree.plugins.dragAndDrop.public);
		if (tree.getConfig().dragAndDrop && gj.draggable && gj.droppable) {
			tree.on('nodeDataBound', function (e, node) {
				gj.tree.plugins.dragAndDrop.private.nodeDataBound(tree, node);
			});
		}
	}
};

/**  */gj.tree.plugins.lazyLoading = {
    config: {
        base: {

            paramNames: {

                /** The name of the parameter that is going to send the parent identificator.
                 * Lazy Loading needs to be enabled in order this parameter to be in use.                 */                parentId: 'parentId'
            },

            /** Enables lazy loading              */            lazyLoading: false
        }
    },

    private: {
        nodeDataBound: function (tree, node, id, record) {
            let data = tree.getConfig(),
                expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]');

            if (record.hasChildren) {
                expander.innerHTML = data.icons.expand;
            }
        },

        createDoneHandler: function (tree, node) {
            return function () {
                let i, expander, list, data = tree.getConfig(), response = this.response;
                if (typeof (response) === 'string' && JSON) {
                    response = JSON.parse(response);
                }
                if (response && response.length) {
                    list = gj.core.select(node, 'ul');
                    if (list.length === 0) {
                        list = document.createElement('ul');
                        gj.core.addClasses(list, data.style.list);
                        node.appendChild(list);
                    }
                    for (i = 0; i < response.length; i++) {
                        tree.addNode(response[i], list);
                    }
                    expander = gj.core.select(node, '[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
                    expander.setAttribute('data-gj-mode', 'open');
                    expander.innerHTML = data.icons.collapse;
                    gj.tree.events.dataBound(tree.element);
                }
            };
        },

        expand: function (tree, node, id) {
            let url, data = tree.getConfig(), params = {},
                children = gj.core.selectAll(node, 'ul>li');

            if (!children || !children.length) {
                if (typeof (data.dataSource) === 'string') {
                    params[data.paramNames.parentId] = id;
                    url = data.dataSource + '?' + new URLSearchParams(params).toString();                    
                    if (tree.xhr) {
                        tree.xhr.abort();
                    }
                    tree.xhr = new XMLHttpRequest();
                    tree.xhr.open('GET', url , true);
                    tree.xhr.onload = gj.tree.plugins.lazyLoading.private.createDoneHandler(tree, node);
                    tree.xhr.onerror = tree.createErrorHandler();
                    tree.xhr.send();
                }
            }
        }
    },

    public: {},

    events: {},

    configure: function (tree, fullConfig, clientConfig) {
        if (clientConfig.lazyLoading) {
            tree.on('nodeDataBound', function (e) {
                gj.tree.plugins.lazyLoading.private.nodeDataBound(tree, e.detail.node, e.detail.id, e.detail.record);
            });
            tree.on('expand', function (e) {
                gj.tree.plugins.lazyLoading.private.expand(tree, e.detail.node, e.detail.id);
            });
        }
    }
};

