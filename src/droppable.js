var inkDroppableOptions = {
  // Options
  "hoverClass": "@dropHoverClass",
  "accept": "@dropAccept",

  // Expressions
  "onHover": "&onDropHover:$draggable:$droppable",
  "onDrop": "&onDrop:$draggable:$droppable:$event",
  "onDropOut": "&onDropOut:$draggable:$droppable:$event",
};

//@directive inkDroppable
var inkDroppable = ['$ink', function($ink) {
  return {
    restrict: "AC",
    link: function($scope, $element, $attr) {
      Ink.requireModules(['Ink.UI.Droppable_1'], function(Droppable) {
        var options = $ink.options(inkDroppableOptions, $element, $attr, $scope);
        if (!options.onDrop) {
          options.onDrop = 'move';
        }
        Droppable.add($element[0], options);
      });
    }
  };
}];
