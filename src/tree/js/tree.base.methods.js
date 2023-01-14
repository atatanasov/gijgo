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
            wrapper = this.wrap('div');;

        gj.core.addClasses(this.element, data.style.list);
        gj.core.addClasses(wrapper, data.style.wrapper);
        if (data.width) {
            this.width(data.width);
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

        gj.tree.events.dataBinding(tree);
        //TODO: tree.element.off()
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
            expander.addEventListener('click', gj.tree.methods.expanderClickHandler(tree));
            display.addEventListener('click', gj.tree.methods.displayClickHandler(tree));
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
            expander = node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            data = tree.getConfig(),
            id = node.getAttribute('data-gj-id'),
            list = node.querySelector('>ul');

        if (gj.tree.events.expand(tree.element, node, id) !== false && list && list.length) {
            list.style.display = 'block';
            expander.setAttribute('data-gj-mode', 'open');
            expander.innerHTML = data.icons.collapse;
            if (cascade) {
                children = node.querySelector('>ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.expand(tree, children[i], cascade);
                }
            }
        }
        return tree;
    },

    collapse: function (tree, node, cascade) {
        let children, i,
            expander = node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            data = tree.getConfig(),
            id = node.getAttribute('data-gj-id'),
            list = node.children('ul');
        if (gj.tree.events.collapse(tree, node, id) !== false && list && list.length) {
            list.style.display = 'none';
            expander.setAttribute('data-gj-mode', 'close');
            expander.innerHTML = data.icons.expand;
            if (cascade) {
                children = node.find('>ul>li>[data-gj-role="wrapper"]>span[data-gj-mode="open"]');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.collapse(tree, children[i], cascade);
                }
            }
        }
        return tree;
    },

    expandAll: function (tree) {
        let i, nodes = tree.find('ul>li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.expand(tree, $(nodes[i]), true);
        }
        return tree;
    },

    collapseAll: function (tree) {
        let i, nodes = tree.querySelectorAll('>ul>li>[data-gj-role="wrapper"]>span[data-gj-mode="open"]');
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
        let i, nodes = tree.querySelectorAll('ul>li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.select(tree, nodes[i], true);
        }
        return tree;
    },

    select: function (tree, node, cascade) {
        let i, children, data = tree.getConfig();
        if (node.getAttribute('data-gj-selected') !== 'true' && gj.tree.events.select(tree, node, node.getAttribute('data-gj-id')) !== false) {
            node.addClass(data.style.active).attr('data-gj-selected', 'true');
            if (cascade) {
                children = node.querySelectorAll('ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.select(tree, $(children[i]), cascade);
                }
            }
        }
    },
    
    unselectAll: function (tree) {
        let i, nodes = tree.querySelectorAll('>ul>li');
        for (i = 0; i < nodes.length; i++) {
            gj.tree.methods.unselect(tree, nodes[i], true);
        }
        return tree;
    },

    unselect: function (tree, node, cascade) {
        let i, children, data = tree.getConfig();
        if (node.getAttribute('data-gj-selected') === 'true' && gj.tree.events.unselect(tree, node, node.getAttribute('data-gj-id')) !== false) {
            gj.core.removeClasses(node, data.style.active)
            node.removeAttribute('data-gj-selected');
            if (cascade) {
                children = node.querySelectorAll('>ul>li');
                for (i = 0; i < children.length; i++) {
                    gj.tree.methods.unselect(tree, children[i], cascade);
                }
            }
        }
    },

    getSelections: function (list) {
        let i, node, children,
            result = [],
            nodes = list.children;
        if (nodes && nodes.length) {
            for (i = 0; i < nodes.length; i++) {
                node = $(nodes[i]);
                if (node.getAttribute('data-gj-selected') === 'true') {
                    result.push(node.getAttribute('data-gj-id'));
                } else if (node.has('ul')) {
                    children = gj.tree.methods.getSelections(node.querySelector('>ul'));
                    if (children.length) {
                        result = result.concat(children);
                    }
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
            nodes = list.children('li');
        if (nodes && nodes.length) {
            for (i = 0; i < nodes.length; i++) {
                node = $(nodes[i]);
                if (id == node.getAttribute('data-gj-id')) {
                    result = node;
                    break;
                } else if (node.has('ul')) {
                    result = gj.tree.methods.getNodeById(node.querySelector('>ul'), id);
                    if (result) {
                        break;
                    }
                }
            }
        }
        return result;
    },

    getNodeByText: function (list, text) {
        let i, node,
            result = undefined,
            nodes = list.children('li');
        if (nodes && nodes.length) {
            for (i = 0; i < nodes.length; i++) {
                node = $(nodes[i]);
                if (text === node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="display"]').innerText) {
                    result = node;
                    break;
                } else if (node.has('ul')) {
                    result = gj.tree.methods.getNodeByText(node.querySelector('>ul'), text);
                    if (result) {
                        break;
                    }
                }
            }
        }
        return result;
    },

    addNode: function (tree, nodeData, parent, position) {
        let level, record, data = tree.getConfig();

        if (!parent || !parent.length) {
            parent = tree.children('ul');
            tree.setRecords(tree.getRecords().push(nodeData));
        } else {
            if (parent[0].tagName.toLowerCase() === 'li') {
                if (parent.querySelectorAll('>ul').length === 0) {
                    parent.querySelector('[data-gj-role="expander"]').innerHTML = data.icons.collapse;
                    parent.appendChild(gj.core.addClasses(document.createElement('ul'), data.style.list));
                }
                parent = parent.querySelector('>ul');
            }
            record = tree.getDataById(parent.parentNode.getAttribute('data-gj-id'));
            if (!record[data.childrenField]) {
                record[data.childrenField] = [];
            }
            record[data.childrenField].push(nodeData);
        }
        level = gj.tree.getLevel(parent);
        if (!data.primaryKey) {
            gj.tree.methods.genAutoId(data, [nodeData]);
        }

        gj.tree.methods.appendNode(tree, parent, nodeData, level, position);

        return tree;
    },

    getLevel: function(node) {
        let count = 1, el = node.parentNode;
        while (el && el.getAttribute('data-gj-type') !== 'tree') {
            count++;
            el = el.parentNode;
        }
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

    getChildren: function (tree, node, cascade) {
        let result = [], i, children,
            cascade = typeof (cascade) === 'undefined' ? true : cascade;

        if (cascade) {
            children = node.querySelectorAll('ul li');
        } else {
            children = node.querySelectorAll('>ul>li');
        }

        for (i = 0; i < children.length; i++) {
            result.push(children[i].getAttribute('data-gj-id'));
        }

        return result;
    },

    enableAll: function (tree) {
        let i, children = tree.querySelectorAll('ul>li');
        for (i = 0; i < children.length; i++) {
            gj.tree.methods.enableNode(tree, children[i], true);
        }
        return tree;
    },

    enableNode: function (tree, node, cascade) {
        let i, children,
            expander = node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            display = node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="display"]'),
            cascade = typeof (cascade) === 'undefined' ? true : cascade;

        node.classList.remove('disabled');
        expander.addEventListener('click', gj.tree.methods.expanderClickHandler(tree));
        display.addEventListener('click', gj.tree.methods.displayClickHandler(tree));
        gj.tree.events.enable(tree, node);
        if (cascade) {
            children = node.querySelectorAll('ul>li');
            for (i = 0; i < children.length; i++) {
                gj.tree.methods.enableNode(tree, children[i], cascade);
            }
        }
    },

    disableAll: function (tree) {
        let i, children = tree.querySelectorAll('ul>li');
        for (i = 0; i < children.length; i++) {
            gj.tree.methods.disableNode(tree, children[i], true);
        }
        return tree;
    },

    disableNode: function (tree, node, cascade) {
        let i, children,
            expander = node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="expander"]'),
            display = node.querySelector('>[data-gj-role="wrapper"]>[data-gj-role="display"]'),
            cascade = typeof (cascade) === 'undefined' ? true : cascade;

        node.classList.add('disabled');
        //TODO: expander.off('click');
        //TODO: display.off('click');
        gj.tree.events.disable(tree.element, node);
        if (cascade) {
            children = node.querySelectorAll('ul>li');
            for (i = 0; i < children.length; i++) {
                gj.tree.methods.disableNode(tree, children[i], cascade);
            }
        }
    },

    destroy: function (tree) {
        let data = tree.getConfig();
        if (data) {
            gj.tree.events.destroying(tree.element);
            tree.xhr && tree.xhr.abort();
            //TODO: tree.off();
            tree.removeData();
            tree.removeAttribute('data-gj-type');
            tree.removeClass()
            tree.innerHTML = '';
        }
        return tree;
    },

    pathFinder: function (data, list, id, parents) {
        let i, result = false;

        for (i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                result = true;
                break;
            } else if (gj.tree.methods.pathFinder(data, list[i][data.childrenField], id, parents)) {
                parents.push(list[i].data[data.textField]);
                result = true;
                break;
            }
        }

        return result;
    }
}