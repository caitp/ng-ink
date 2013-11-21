var inkDraggableOptions = {
  // Options
  "constraint": "@dragDirection",
  "constraintElm": "!dragConstraint",
  "!rect": "=dragRect:#top:#left:#bottom:#right",
  "revert": "?dragRevert",
  "cursor": "@dragCursor",
  "zIndex": "#dragZIndex",
  "dragClass": "@dragClass",
  "mouseAnchor": "@dragMouseAnchor",
  "droppableProxy": "!dragDroppableProxy",

  // Expressions
  "onStart": "&onDragStart",
  "onEnd": "&onDragEnd",
  "onDrag": "&onDrag",
  "onChange": "&onChange"
};

//@directive inkDraggable
var inkDraggable = ['$ink', '$rootScope', function($ink, $rootScope) {
  return {
    restrict: "AC",
    link: function($scope, $element, $attr) {
      Ink.requireModules(['Ink.UI.Draggable_1'], function(Draggable) {
        var options = $ink.options(inkDraggableOptions, $element, $attr, $scope),
            onDrag = options.onDrag,
            onEnd = options.onEnd,
            start = false,
            $events = {
              '$ink.draggable.lower': function(event, opt, dropped, z) {
                if (dropped !== $element && (opt.constraintElm === options.constraintElm &&
                    angular.equals(opt.constraint, options.constraint))) {
                  var mine = $element.css("z-index");
                  if (mine > 0) {
                    $element.css("z-index", --mine);
                  }
                }
              }
            };
        angular.forEach($events, function(fn, name) {
          $events[name].unregister = $rootScope.$on(name, fn);
        });
        $scope.$on('$destroy', function() {
          angular.forEach($events, function(fn, name) {
            console.log($events[name]);
            fn.unregister();
          });
        });
        options.onDrag = function() {
          if (!start) {
            var z = $element.css("z-index");
            $rootScope.$emit('$ink.draggable.lower', options, $element, z);
          }
          start = true;
          if (onDrag) {
            onDrag();
          }
        }
        options.onEnd = function() {
          start = false;
          if (onEnd) {
            onEnd();
          }
        }
        console.log(options);
        $element.data('$ink.draggable', new Draggable($element[0], options));
      });
    }
  };
}];
