var inkToolipOptions = {
  "__target__": "!tooltipFor",
  "text": "@inkTooltip",
  "where": "@tooltipWhere",
  "color": "@tooltipColor",
  "fade": "#tooltipFade",
  "forever": "?tooltipForever",
  "timeout": "#tooltipTimeout",
  "delay": "#tooltipDelay",
  "template": "!tooltipTemplate",
  "templateUrl": "@tooltipTemplateUrl",
  "templatefield": "@tooltipTemplateField",
  "!position": "=tooltipPosition:#left:#top",
  "!spacing": "#tooltipSpacing"
};

//@directive inkTooltip
var inkTooltip = ['$ink', '$http', '$q', function($ink, $http, $q) {
  return {
    restrict: "AC",
    link: function($scope, $element, $attr) {
      Ink.requireModules(['Ink.UI.Tooltip_1'], function(Tooltip) {
        var options = $ink.options(inkToolipOptions, $element, $attr, $scope),
            target = options.__target__ || $element,
            template;
        if (target.scope === $element.scope) {
          target = target[0];
        }
        $q.when(options.template || options.templateUrl && $http.get(options.templateUrl, {cache: true}))
        .then(function(res) {
          if (res) {
            if (res.data) {
              template = angular.element(res.data)[0];
            } else {
              template = res;
            }
          }
          options.template = template;
          delete options.templateUrl;
          new Tooltip(target, options);
        });
      });
    }
  };
}];
