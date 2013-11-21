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
