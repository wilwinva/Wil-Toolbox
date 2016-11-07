angular.module('example', [])
  .directive('radicalComponent', function() {
    return {
      restrict: 'E',
      template: '<h1>This is a radical component.</h1>'
    }; // directive definition object (DDO)
  })
  .directive('evenMoreRadicalComponent', function() {
    return {
      restrict: 'E',
      templateUrl: 'radical.html'
    }; // directive definition object (DDO)
  })
;
