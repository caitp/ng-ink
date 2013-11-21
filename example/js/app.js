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