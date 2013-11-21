(function(window, document, undefined) {'use strict';

var $ink = function() {
  this.$get = ['$rootScope', '$interpolate', '$parse', function($rootScope, $interpolate, $parse) {
    var $ink = function() {
    };
    $ink.prototype = {
      options: function($options, $element, $attr, $scope) {
        var options = {};

        angular.forEach($options, function(attr, key) {
          var detail = prop(attr),
              data = value(detail),
              result = data;
          if (typeof data !== 'undefined') {
            if (key.indexOf('!') === 0) {
              if (detail.type === '=' && detail.props.length) {
                result = {};
                angular.forEach(detail.props, function(val, _) {
                  if (typeof data[val] !== 'undefined') {
                    result[val] = data[val];
                  }
                });
                options = angular.extend(options, result);
              } else {
                options[key] = data;
              }
              return result;
            } else {
              options[key] = data;
            }
          }
        });

        return options;

        function prop(attr) {
          var type = attr.charAt(0),
              props;
          if ("@?!=#&".indexOf(type) >= 0) {
            attr = attr.slice(1);
          }
          attr = attr.split(":");
          props = attr.slice(1);
          angular.forEach(props, function(name, _) {
            props[_] = prop(name);
          });
          attr = new String(attr[0]);
          attr.props = props;
          attr.type = type;
          return attr;
        }
        
        function value(attr, child, childValue) {
          var result;
          if (!child && typeof $attr[attr] === 'undefined') {
            return;
          }
          switch (attr.type) {
          case '@':
            result = $interpolate($attr[attr], false)($scope);
            break;
          case '!': // jQuery element
          case '=': // Object
          case '#': // Number
          case '?': // Boolean
          case '&': // Expression
            if ($element && attr.type === '!') {
              var str = $attr[attr].replace(/^\s+/, '').replace(/\s+$/, '');
              if (str === 'parent' || str === '^') {
                // Don't parse if it's a special string
                result = $element.parent();
              } else if ("[.#".indexOf(str.charAt(0)) >= 0) {
                result = str;
              }
            } else if (!child) {
              result = $parse($attr[attr]);
              if (attr.type !== '&') {
                result = result($scope);
              }
            } else {
              result = childValue;
            }
            if (attr.type === '&') {
              var expr = result;
              result = function() {
                var locals = {};
                var i = 0;
                angular.forEach(attr.props, function(name) {
                  locals[name] = arguments[i++];
                });
                if ($rootScope.$$phase) {
                  expr($scope, locals);
                } else {
                  $scope.$apply(function() {
                    expr($scope, locals);
                  });
                }
              };
            } else if (attr.type === '!') {
              // Expecting a jQuery element.
              if (!angular.isElement(result)) {
                if (typeof result !== 'string' || "[.#".indexOf(str.charAt(0)) < 0) {
                  result = undefined;
                }
              } else if (result.scope === $element.scope) {
                result = result[0];
              }
            } else if (attr.type === '#') {
              if (angular.isString(result)) {
                var num = parseFloat(value);
                if (num !== num) {
                  num = parseInt(result, 10);
                }
                if (num === num) {
                  result = num;
                } else {
                  result = undefined;
                }
              }
            } else if (attr.type === '?') {
              result = !!value;
            } else if (attr.type === '=') {
              if (attr.props.length) {
                var x = {};
                angular.forEach(attr.props, function(val, _) {
                  var child = prop(val);
                  var childValue = angular.isArray(value) ?
                                   result.unshift() :
                                   result[child];
                  if (typeof childValue !== 'undefined') {
                    val = value(child, true, childValue);
                    if (typeof val !== 'undefined') {
                      x[child] = val;
                    }
                  }
                });
                result = x;
              }
            }
            break;
          }
          return result;
        }
      }
    };
    return new $ink();
  }];
};

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

var inkDroppableOptions = {
  // Options
  "hoverClass": "@dropHoverClass",
  "accept": "@dropAccept",

  // Expressions
  "onHover": "&onDropHover:$draggable:$droppable",
  "onDrop": "&onDrop:$draggable:$droppable:$event",
  "onDropOut": "&onDropOut:$draggable:$droppable:$event",
};

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


angular.module('ink', [])
.directive({
  'inkDraggable': inkDraggable,
  'inkDroppable': inkDroppable
})
.provider({
  '$ink': $ink
});

})(window, document);