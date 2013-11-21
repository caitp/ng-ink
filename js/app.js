var directives = [
  "draggable",
  "droppable",
];
angular.module("ink.example", ["ink", "ui.router"])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state("ink", {
    url: "",
    abstract: true,
    templateUrl: "views/root.tpl",
    controller: "RootController"
  })
  .state("ink.overview", {
    url: "/",
    views: {
      main: {
        templateUrl: "views/overview.tpl"
      }
    }
  })
  .state("ink.directives", {
    url: "/directives",
    views: {
      main: {
        templateUrl: "views/directives.tpl",
      }
    }
    //controller: "DirectivesController"
  });
  angular.forEach(directives, function(name) {
    $stateProvider.state("ink.directives." + name, {
      url: '/' + name,
      views: {
        directive: {
          templateUrl: "views/directives/" + name + ".tpl"
        }
      }
    });
  });
  $urlRouterProvider.otherwise("/");
})
.run(function($rootScope) {
  $rootScope.directives = directives;
});
angular.module("ink.example")
.controller("DraggableDirectiveController", function($scope, $rootScope) {
  $rootScope.title = "ink-draggable directive";
});

angular.module("ink.example")
.controller("DroppableDirectiveController", function($scope, $rootScope) {
  $rootScope.title = "ink-droppable directive";
  $scope.fn = function() {
    
  }
});

angular.module("ink.example")
.controller("DirectivesController", function($scope) {
  
});

angular.module("ink.example")
.controller("RootController", function($scope) {
  
});

angular.module("ink.example")
.directive("prettyprint", function() {
  return {
    restrict: "C",
    priority: 1000,
    terminal: true,
    link: function(scope, element) {
      var html = element.html();
      html = html.replace(/</g, '&lt;');
      html = html.replace(/>/g, '&gt;');
      html = html.replace(/(\r\n|\r)/g,'<br />');
      element.html(html);
      PR.prettyPrint(element[0]);
    }
  }; 
});
