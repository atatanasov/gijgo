/*global gj $*/
gj.tree.methods = {

    init: function (jsConfig) {
        this.attr('data-type', 'tree');
        gj.widget.prototype.init.call(this, jsConfig, 'tree');

        gj.tree.methods.initialize.call(this);

        if (this.data('autoLoad')) {
            this.reload();
        }
        return this;
    },

    initialize: function () {
        var data = this.data(),
            $root = $('<ul class="' + data.style.list + '"/>');
        this.empty().addClass(data.style.wrapper).append($root);
        if (data.width) {
            this.width(data.width);
        }
        gj.tree.events.initialized(this);
    },

    useHtmlDataSource: function ($tree, data) {
        data.dataSource = [];
    },

    render: function ($tree, response) {
        if (response) {
            if (typeof (response) === 'string' && JSON) {
                response = JSON.parse(response);
            }
            $tree.data('records', gj.tree.methods.getRecords($tree, response));
            gj.tree.methods.loadData($tree);
        }
        return $tree;
    },

    filter: function ($grid) {
        return $grid.data().dataSource;
    },

    getRecords: function ($tree, response) {
        var i, id, nodeData, result = [],
            data = $tree.data();
        for (i = 0; i < response.length; i++) {
            id = data.primaryKey ? response[i][data.primaryKey] : data.autoGenId++;
            nodeData = { id: id, data: response[i] };
            if (response[i][data.childrenField] && response[i][data.childrenField].length) {
                nodeData.children = gj.tree.methods.getRecords($tree, response[i][data.childrenField]);
                delete response[i][data.childrenField];
            }
            result.push(nodeData);
        }
        return result;
    },

    loadData: function ($tree) {
        var i,
            records = $tree.data('records'),
            $root = $tree.children('ul');

        gj.tree.events.dataBinding($tree);
        $root.off().empty();
        for (i = 0; i < records.length; i++) {
            gj.tree.methods.appendNode($tree, $root, records[i], 1);
        }
        gj.tree.events.dataBound($tree);
    },

    appendNode: function ($tree, $parent, nodeData, level, position) {
        var i, $node, $newParent,
            data = $tree.data(),
            $node = $('<li data-id="' + nodeData.id + '"/>').addClass(data.style.item),
            $expander = $('<span data-role="expander" data-mode="close"></span>'),
            $display = $('<span data-role="display">' + nodeData.data[data.textField] + '</span>');

        if (data.style.leftSpacer) {
            if (!level) {
                level = $parent.parents('ul').length + 1;
            }
            for (i = 1; i < level; i++) {
                $node.append('<span data-role="spacer" class="' + data.style.leftSpacer + '"></span>');
            }
        }

        $expander.on('click', gj.tree.methods.expanderClickHandler($tree));
        $node.append($expander);

        if (data.iconField && nodeData.data[data.iconField]) {
            if (nodeData.data[data.iconField].indexOf('<') === 0) {
                $node.append(nodeData.data[data.iconField]);
            } else {
                $node.append('<span data-role="icon" class="' + nodeData.data[data.iconField] + '"></span>');
            }
        }

        $display.addClass(data.style.display).on('click', gj.tree.methods.displayClickHandler($tree));
        $node.append($display);

        if (nodeData.children && nodeData.children.length) {
            data.style.expandIcon ? $expander.addClass(data.style.expandIcon) : $expander.text('+');
            $newParent = $('<ul />').addClass(data.style.list).addClass('gj-hidden');
            $node.append($newParent);

            for (i = 0; i < nodeData.children.length; i++) {
                gj.tree.methods.appendNode($tree, $newParent, nodeData.children[i], level + 1);
            }
        } else {
            data.style.leafIcon ? $expander.addClass(data.style.leafIcon) : $expander.html('&nbsp;');
        }

        if (position) {
            $parent.find('li:eq(' + (position - 1) + ')').before($node);
        } else {
            $parent.append($node);
        }
    },

    expanderClickHandler: function ($tree) {
        return function (e) {
            var $expander = $(this),
                $node = $expander.parent('li');
            if ($expander.attr('data-mode') === 'close') {
                $tree.expand($node);
            } else {
                $tree.collapse($node);
            }
        }
    },

    expand: function ($tree, $node, cascade) {
        var $children, i,
            $expander = $node.children('[data-role="expander"]'),
            data = $tree.data(),
            id = $node.attr('data-id'),
            $list = $node.children('ul');
        if ($list && $list.length) {
            if (gj.tree.events.expand($tree, $node, id) !== false) {
                $list.show();
                $expander.attr('data-mode', 'open');
                data.style.collapseIcon ? $expander.removeClass(data.style.expandIcon).addClass(data.style.collapseIcon) : $expander.text('-');
                if (cascade) {
                    $children = $node.find('ul>li');
                    for (i = 0; i < $children.length; i++) {
                        gj.tree.methods.expand($tree, $($children[i]), cascade);
                    }
                }
            }
        }
        return $tree;
    },

    collapse: function ($tree, $node, cascade) {
        var $children, i,
            $expander = $node.children('[data-role="expander"]'),
            data = $tree.data(),
            id = $node.attr('data-id'),
            $list = $node.children('ul');
        if ($list && $list.length) {
            if (gj.tree.events.collapse($tree, $node, id) !== false) {
                $list.hide();
                $expander.attr('data-mode', 'close');
                data.style.expandIcon ? $expander.removeClass(data.style.collapseIcon).addClass(data.style.expandIcon) : $expander.text('+');
                if (cascade) {
                    $children = $node.find('ul>li');
                    for (i = 0; i < $children.length; i++) {
                        gj.tree.methods.collapse($tree, $($children[i]), cascade);
                    }
                }
            }
        }
        return $tree;
    },

    expandAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.expand($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    collapseAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.collapse($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    displayClickHandler: function ($tree) {
        return function (e) {
            var $display = $(this),
                $node = $display.parent('li'),
                cascade = $tree.data().cascadeSelection;
            if ($node.attr('data-selected') === 'true') {
                gj.tree.methods.unselect($tree, $node, cascade);
            } else {
                if ($tree.data('selectionType') === 'single') {
                    gj.tree.methods.unselectAll($tree);
                }
                gj.tree.methods.select($tree, $node, cascade);
            }
        }
    },

    selectAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.select($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    select: function ($tree, $node, cascade) {
        var i, $children, data = $tree.data();
        if ($node.attr('data-selected') !== 'true' && gj.tree.events.select($tree, $node) !== false) {
            $node.addClass(data.style.active).attr('data-selected', 'true');
            if (cascade) {
                $children = $node.find('ul>li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.select($tree, $($children[i]), cascade);
                }
            }
        }
    },
    
    unselectAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.unselect($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    unselect: function ($tree, $node, cascade) {
        var i, $children, data = $tree.data();
        if ($node.attr('data-selected') === 'true' && gj.tree.events.unselect($tree, $node) !== false) {
            $node.removeClass($tree.data().style.active).removeAttr('data-selected');
            if (cascade) {
                $children = $node.find('ul li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.unselect($tree, $($children[i]), cascade);
                }
            }
        }
    },

    getSelections: function ($list) {
        var i, $node, children,
            result = [],
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if ($node.attr('data-selected') === 'true') {
                    result.push($node.attr('data-id'));
                } else if ($node.has('ul')) {
                    children = gj.tree.methods.getSelections($node.children('ul'));
                    if (children.length) {
                        result = result.concat(children);
                    }
                }
            }
        }

        return result;
    },

    getById: function ($tree, id, records) {
        var i, result = undefined;
        for (i = 0; i < records.length; i++) {
            if (id == records[i].id) {
                result = records[i];
                break;
            } else if (records[i].children && records[i].children.length) {
                result = gj.tree.methods.getById($tree, id, records[i].children);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getDataById: function ($tree, id, records) {
        var result = gj.tree.methods.getById($tree, id, records);
        return result ? result.data : result;
    },

    getDataByText: function ($tree, text, records) {
        var i, id,
            result = undefined,
            data = $tree.data();
        for (i = 0; i < records.length; i++) {
            if (text === records[i].data[data.textField]) {
                result = records[i].data;
                break;
            } else if (records[i].children && records[i].children.length) {
                result = gj.tree.methods.getDataByText($tree, text, records[i].children);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getNodeById: function ($list, id) {
        var i, $node,
            $result = undefined,
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if (id == $node.attr('data-id')) {
                    $result = $node;
                    break;
                } else if ($node.has('ul')) {
                    $result = gj.tree.methods.getNodeById($node.children('ul'), id);
                    if ($result) {
                        break;
                    }
                }
            }
        }
        return $result;
    },

    getNodeByText: function ($list, text) {
        var i, $node,
            $result = undefined,
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if (text === $node.children('[data-role="display"]').text()) {
                    $result = $node;
                    break;
                } else if ($node.has('ul')) {
                    $result = gj.tree.methods.getNodeByText($node.children('ul'), text);
                    if ($result) {
                        break;
                    }
                }
            }
        }
        return $result;
    },

    addNode: function ($tree, data, $parent, position) {
        var nodeData = gj.tree.methods.getRecords($tree, [data]);
        if (!$parent || !$parent.length) {
            $parent = $tree.children('ul');
        }
        
        gj.tree.methods.appendNode($tree, $parent, nodeData[0], undefined, position);

        return $tree;
    },

    remove: function ($tree, $node) {
        gj.tree.methods.removeDataById($tree, $node.attr('data-id'), $tree.data('records'));
        $node.remove();    
        return $tree;
    },

    removeDataById: function ($tree, id, records) {
        var i;
        for (i = 0; i < records.length; i++) {
            if (id == records[i].id) {
                records.splice(i, 1);
                break;
            } else if (records[i].children && records[i].children.length) {
                gj.tree.methods.removeDataById($tree, id, records[i].children);
            }
        }
    },

    destroy: function ($tree) {
        var data = $tree.data();
        if (data) {
            gj.tree.events.destroying($tree);
            $tree.xhr && $tree.xhr.abort();
            $tree.off();
            $tree.removeData();
            $tree.removeAttr('data-type');
            $tree.removeClass().empty();
        }
        return $tree;
    }
}