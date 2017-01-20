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
              * @example sample <!-- draggable.base, droppable.base, tree.base -->
              * <div id="tree"></div>
              * <script>
              *     var tree = $('#tree').tree({
              *         dataSource: '/DataSources/GetCountries',
              *         dragAndDrop: true
              *     });
              * </script>
              */
			dragAndDrop: undefined,

			style: {
			    dropAsChildIcon: undefined,
			    dropBelow: 'gj-tree-base-drop-below'
			}
		},

		jqueryui: {
			style: {}
		},

		bootstrap: {
			style: {}
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
		        var $dragEl = $display.clone();
		        $('body').append($dragEl);
		        $dragEl.attr('data-role', 'draggable-clone').css('cursor', 'move');
		        $dragEl.prepend('<span data-role="indicator" />');
		        $dragEl.draggable({
		            stop: gj.tree.plugins.dragAndDrop.private.createDragStopHandler($tree, $node, $display)
		        });
		        $dragEl.css({
		            position: 'absolute', top: $display.offset().top, left: $display.offset().left, width: $display.width()
		        });
		        if ($display.attr('data-droppable') === 'true') {
		            $display.droppable('destroy');
		        }
		        $tree.find('[data-role="display"]').not($display).not($node.find('[data-role="display"]')).each(function () {
		            var $dropEl = $(this);
		            if ($dropEl.attr('data-droppable') === 'true') {
		                $dropEl.droppable('destroy');
		            }
		            $dropEl.droppable({
		                over: gj.tree.plugins.dragAndDrop.private.createOverDisplayHandler($tree, $dragEl),
		                out: gj.tree.plugins.dragAndDrop.private.createOutDisplayHandler($tree, $dragEl)
		            });
		        });
		        $tree.find('[data-role="wrapper"]').not($node.find('[data-role="wrapper"]')).each(function () {
		            var $dropEl = $(this);
		            if ($dropEl.attr('data-droppable') === 'true') {
		                $dropEl.droppable('destroy');
		            }
		            $dropEl.droppable({
		                over: gj.tree.plugins.dragAndDrop.private.createOverNodeHandler($tree, $dragEl),
		                out: gj.tree.plugins.dragAndDrop.private.createOutNodeHandler($tree, $dragEl)
		            });
		        });
		        $dragEl.trigger('mousedown');
		    };
	    },

	    createDragStopHandler: function ($tree, $sourceNode, $sourceDisplay) {
	        return function (e, mouseEvent) {
	            $('[data-role="draggable-clone"]').draggable('destroy').remove();
	            $tree.find('[data-role="display"]').not($sourceDisplay).each(function () {
	                var $targetDisplay = $(this), $targetNode, $ul, $sourceParentNode;
	                if ($targetDisplay.droppable('isOver', mouseEvent)) {
	                    $sourceParentNode = $sourceNode.parent('ul').parent('li');
	                    $targetNode = $targetDisplay.closest('li');
	                    $ul = $targetNode.children('ul');
	                    if ($ul.length === 0) {
	                        $ul = $('<ul />').addClass($tree.data().style.list);
	                        $targetNode.append($ul);
	                    }
	                    $ul.append($sourceNode);
	                    gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $targetNode);
	                    gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $sourceNode);
	                    gj.tree.plugins.dragAndDrop.private.refreshNode($tree, $sourceParentNode);
	                }
	                $targetDisplay.droppable('destroy');
	            });
	        }
	    },

	    createOverDisplayHandler: function ($tree, $dragEl) {
	        return function (e) {
	            var $indicator = $dragEl.find('[data-role="indicator"]'),
	                data = $tree.data();
	            if ($indicator.length) {
	                data.style.addAsChildIcon ? $indicator.attr('class', data.style.dropAsChildIcon) : $indicator.text('+');
	            }
	            $(this).closest('[data-role="wrapper"]').removeClass(data.style.dropBelow);
	            $tree.attr('data-over-display', 'true');
	        };
	    },

	    createOutDisplayHandler: function ($tree, $dragEl) {
	        return function (e) {
	            $dragEl.find('[data-role="indicator"]').removeClass($tree.data().style.dropAsChildIcon).empty();
	            $tree.attr('data-over-display', 'false');
	        };
	    },

	    createOverNodeHandler: function ($tree, $dragEl) {
	        return function (e) {
	            var $indicator = $dragEl.find('[data-role="indicator"]'),
	                data = $tree.data();
	            if ($indicator.length && $tree.attr('data-over-display') === 'false') {
	                $(this).addClass(data.style.dropBelow);
	            }
	        };
	    },

	    createOutNodeHandler: function ($tree, $dragEl) {
	        return function (e) {
	            $(this).removeClass($tree.data().style.dropBelow);
	        };
	    },

	    refreshNode: function ($tree, $node) {
	        var $expander = $node.find('>[data-role="wrapper"]>[data-role="expander"]'),
	            $spacer = $node.find('>[data-role="wrapper"]>[data-role="spacer"]'),
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
	            $expander.empty();
	        }

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
