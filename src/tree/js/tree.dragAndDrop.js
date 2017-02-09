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
              * @example Base.Theme <!-- draggable.base, droppable.base, tree.base -->
              * <div id="tree"></div>
              * <script>
              *     $('#tree').tree({
              *         dataSource: '/DataSources/GetCountries',
              *         dragAndDrop: true
              *     });
              * </script>
              * @example Bootstrap <!-- bootstrap, draggable.base, droppable.base, tree.base -->
              * <div class="container">
              *     <h3>Drag and Drop Tree Nodes</h3>
              *     <div id="tree"></div>
              * </div>
              * <script>
              *     $('#tree').tree({
              *         dataSource: '/DataSources/GetCountries',
              *         dragAndDrop: true,
              *         uiLibrary: 'bootstrap'
              *     });
              * </script>
              * @example Material.Design <!-- materialdesign, draggable.base, droppable.base, tree.base -->
              * <h3>Drag and Drop Tree Nodes</h3>
              * <div id="tree"></div>
              * <script>
              *     $('#tree').tree({
              *         dataSource: '/DataSources/GetCountries',
              *         dragAndDrop: true,
              *         uiLibrary: 'materialdesign'
              *     });
              * </script>
              */
			dragAndDrop: undefined,

			style: {
			    dragEl: 'gj-tree-drag-el',
			    dropAsChildIcon: undefined,
			    dropAbove: 'gj-tree-drop-above',
			    dropBelow: 'gj-tree-drop-below'
			}
		},

		bootstrap: {
		    style: {
		        dragEl: 'gj-tree-drag-el gj-tree-bootstrap-drag-el',
		        dropAsChildIcon: 'glyphicon glyphicon-plus',
		        dropAbove: 'gj-tree-drop-above',
		        dropBelow: 'gj-tree-drop-below'
		    }
		},

		materialdesign: {
		    style: {
		        dragEl: 'gj-tree-drag-el gj-tree-mdl-drag-el',
		        dropAsChildIcon: 'material-icons gj-cursor-pointer gj-mdl-icon-plus',
		        dropAbove: 'gj-tree-drop-above',
		        dropBelow: 'gj-tree-drop-below'
		    }
		}
	},

	private: {
	    nodeDataBound: function ($tree, $node) {
	        var $wrapper = $node.children('[data-role="wrapper"]'),
    	        $display = $node.find('>[data-role="wrapper"]>[data-role="display"]');
	        if ($wrapper.length && $display.length) {
	            $display.on('mousedown', gj.tree.plugins.dragAndDrop.private.createNodeMouseDownHandler($tree, $node, $display));
		    }
		},

	    createNodeMouseDownHandler: function ($tree, $node, $display) {
		    return function (e) {
		        var data = $tree.data(), $dragEl, $wrapper, offsetTop, offsetLeft;
		        $dragEl = $display.clone().wrap('<div data-role="wrapper"/>').closest('div')
                            .wrap('<li class="' + data.style.item + '" />').closest('li')
                            .wrap('<ul class="' + data.style.list + '" />').closest('ul');
		        $('body').append($dragEl);
		        $dragEl.attr('data-role', 'draggable-clone').addClass('gj-unselectable').addClass(data.style.dragEl);
		        $dragEl.find('[data-role="wrapper"]').prepend('<span data-role="indicator" />');
		        $dragEl.draggable({
		            drag: gj.tree.plugins.dragAndDrop.private.createDragHandler($tree, $node, $display),
		            stop: gj.tree.plugins.dragAndDrop.private.createDragStopHandler($tree, $node, $display)
		        });
		        $wrapper = $display.parent();
		        offsetTop = $display.offset().top;
		        offsetTop -= parseInt($wrapper.css("border-top-width")) + parseInt($wrapper.css("margin-top")) + parseInt($wrapper.css("padding-top"));
		        offsetLeft = $display.offset().left;
		        offsetLeft -= parseInt($wrapper.css("border-left-width")) + parseInt($wrapper.css("margin-left")) + parseInt($wrapper.css("padding-left"));
		        offsetLeft -= $dragEl.find('[data-role="indicator"]').outerWidth(true);
		        $dragEl.css({
		            position: 'absolute', top: offsetTop, left: offsetLeft, width: $display.outerWidth(true)
		        });
		        if ($display.attr('data-droppable') === 'true') {
		            $display.droppable('destroy');
		        }
		        gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $node, $display).each(function () {
		            var $dropEl = $(this);
		            if ($dropEl.attr('data-droppable') === 'true') {
		                $dropEl.droppable('destroy');
		            }
		            $dropEl.droppable();
		        });
		        gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $node).each(function () {
		            var $dropEl = $(this);
		            if ($dropEl.attr('data-droppable') === 'true') {
		                $dropEl.droppable('destroy');
		            }
		            $dropEl.droppable();
		        });
		        $dragEl.trigger('mousedown');
		    };
	    },

	    getTargetDisplays: function ($tree, $node, $display) {
	        return $tree.find('[data-role="display"]').not($display).not($node.find('[data-role="display"]'));
	    },

	    getTargetWrappers: function ($tree, $node) {
	        return $tree.find('[data-role="wrapper"]').not($node.find('[data-role="wrapper"]'));
	    },

	    createDragHandler: function ($tree, $node, $display) {
	        var $displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $node, $display),
                $wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers($tree, $node),
	            data = $tree.data();
	        return function (e, offset, mousePosition) {
	            var $dragEl = $(this), success = false;
	            $displays.each(function () {
	                var $targetDisplay = $(this),
	                    $indicator;
	                if ($targetDisplay.droppable('isOver', mousePosition)) {
	                    $indicator = $dragEl.find('[data-role="indicator"]');
	                    data.style.dropAsChildIcon ? $indicator.addClass(data.style.dropAsChildIcon) : $indicator.text('+');
	                    success = true;
	                    return false;
	                } else {
	                    $dragEl.find('[data-role="indicator"]').removeClass(data.style.dropAsChildIcon).empty();
                    }
	            });
	            $wrappers.each(function () {
	                var $wrapper = $(this),
                        $indicator, middle;
	                if (!success && $wrapper.droppable('isOver', mousePosition)) {
	                    middle = $wrapper.position().top + ($wrapper.outerHeight() / 2);
	                    if (mousePosition.top < middle) {
	                        $wrapper.addClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                    } else {
	                        $wrapper.addClass(data.style.dropBelow).removeClass(data.style.dropAbove);
	                    }
	                } else {
	                    $wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
	                }
	            });
	        };
        },

	    createDragStopHandler: function ($tree, $sourceNode, $sourceDisplay) {
	        var $displays = gj.tree.plugins.dragAndDrop.private.getTargetDisplays($tree, $sourceNode, $sourceDisplay),
                $wrappers = gj.tree.plugins.dragAndDrop.private.getTargetWrappers($tree, $sourceNode),
	            data = $tree.data();
	        return function (e, mousePosition) {
	            var success = false;
	            $(this).draggable('destroy').remove();
	            $displays.each(function () {
	                var $targetDisplay = $(this), $targetNode, $sourceParentNode, $ul;
	                if ($targetDisplay.droppable('isOver', mousePosition)) {
	                    $targetNode = $targetDisplay.closest('li');
	                    $sourceParentNode = $sourceNode.parent('ul').parent('li');
	                    $ul = $targetNode.children('ul');
	                    if ($ul.length === 0) {
	                        $ul = $('<ul />').addClass(data.style.list);
	                        $targetNode.append($ul);
	                    }
	                    $ul.append($sourceNode);
	                    gj.tree.plugins.dragAndDrop.private.refresh($tree, $sourceNode, $targetNode, $sourceParentNode);
	                    success = true;
	                }
	                $targetDisplay.droppable('destroy');
	            });
	            if (!success) {
	                $wrappers.each(function () {
	                    var $targetWrapper = $(this), $targetNode, $sourceParentNode, middle;
	                    if ($targetWrapper.droppable('isOver', mousePosition)) {
	                        $targetNode = $targetWrapper.closest('li');
	                        $sourceParentNode = $sourceNode.parent('ul').parent('li');
	                        middle = $targetWrapper.position().top +($targetWrapper.outerHeight() / 2);
	                        if (mousePosition.top < middle) {
	                            $sourceNode.insertBefore($targetNode);
	                        } else {
	                            $sourceNode.insertAfter($targetNode);
	                        }
	                        gj.tree.plugins.dragAndDrop.private.refresh($tree, $sourceNode, $targetNode, $sourceParentNode);
	                    }
	                    $targetWrapper.droppable('destroy');
	                });
                }
	        }
	    },

	    refresh: function ($tree, $sourceNode, $targetNode, $sourceParentNode) {
	        var data = $tree.data();
	        gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $targetNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $sourceParentNode);
	        gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $sourceNode);
	        $sourceNode.find('li[data-role="node"]').each(function () {
	            gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $(this));
	        });
	        $targetNode.children('[data-role="wrapper"]').removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);
        },

	    refreshNode: function ($tree, $node) {
	        var $wrapper = $node.children('[data-role="wrapper"]'),
	            $expander = $wrapper.children('[data-role="expander"]'),
	            $spacer = $wrapper.children('[data-role="spacer"]'),
	            $list = $node.children('ul'),
                data = $tree.data(),
	            level = $node.parentsUntil('[data-type="tree"]', 'ul').length;

	        if ($list.length && $list.children().length) {
	            if ($list.is(':visible')) {
	                data.style.collapseIcon ? $expander.addClass(data.style.collapseIcon) : $expander.text('-');
	            } else {
	                data.style.expandIcon ? $expander.addClass(data.style.expandIcon) : $expander.text('+');
	            }
	        } else {
	            $expander.removeClass(data.style.expandIcon).removeClass(data.style.collapseIcon).empty();
	        }
	        $wrapper.removeClass(data.style.dropAbove).removeClass(data.style.dropBelow);

	        $spacer.css('width', (data.indentation * (level - 1)));
	    }
	},

	public: {
	},

	configure: function ($tree) {
		$.extend(true, $tree, gj.tree.plugins.dragAndDrop.public);
		if ($tree.data('dragAndDrop') && $.fn.draggable && $.fn.droppable) {
			$tree.on('nodeDataBound', function (e, $node) {
				gj.tree.plugins.dragAndDrop.private.nodeDataBound($tree, $node);
			});
		}
	}
};
