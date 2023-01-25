/**
 * @widget Tree
 * @plugin DragAndDrop
 */
gj.tree.plugins.dragAndDrop = {
	config: {
		base: {
			/** Enables drag and drop functionality for each node.
              * @type Boolean
              * @default undefined
              * @example Material.Design <!-- draggable, droppable, tree -->
              * <h3>Drag and Drop Tree Nodes</h3>
              * <ul id="tree"></ul>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true
              *     });
              * </script>
              * @example Bootstrap.3 <!-- bootstrap, draggable, droppable, tree -->
              * <div class="container">
              *     <h3>Drag and Drop Tree Nodes</h3>
              *     <ul id="tree"></ul>
              * </div>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true,
              *         uiLibrary: 'bootstrap'
              *     });
              * </script>
              * @example Bootstrap.4 <!-- bootstrap4, draggable, droppable, tree -->
              * <div class="container">
              *     <h3>Drag and Drop Tree Nodes</h3>
              *     <ul id="tree"></ul>
              * </div>
              * <script>
              *     new GijgoTree(document.getElementById('tree'), {
              *         dataSource: '/Locations/Get',
              *         dragAndDrop: true,
              *         uiLibrary: 'bootstrap4'
              *     });
              * </script>
              */
			dragAndDrop: undefined,

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
         * Event fires when the node is dropped.
         * @event nodeDrop
         * @param {object} e - event data
         * @param {string} id - the id of the record
         * @param {object} parentId - the id of the new parend node
         * @param {object} orderNumber - the new order number
         * @example Event.Sample <!-- draggable, droppable, tree -->
         * <div id="tree" data-source="/Locations/Get" data-drag-and-drop="true"></div>
         * <script>
         *     let tree = new GijgoTree(document.getElementById('tree'), );
         *     tree.on('nodeDrop', function (e, id, parentId, orderNumber) {
         *         let node = tree.getDataById(id),
         *             parent = parentId ? tree.getDataById(parentId) : {};
         *         if (parent.text === 'North America') {
         *             alert('Can\'t add children to North America.');
         *             return false;
         *         } else {
         *             alert(node.text + ' is added to ' + parent.text + ' as ' + orderNumber);
         *             return true;
         *         }
         *     });
         * </script>
         */
	    nodeDrop: function (tree, id, parentId, orderNumber) {
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
