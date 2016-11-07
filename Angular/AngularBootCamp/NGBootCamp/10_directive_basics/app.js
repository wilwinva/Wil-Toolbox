angular.module('example', [])
  .directive('slSecond', function() {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        console.log('scope:', scope);
        console.log('element:', element);
        console.log('attrs:', attrs);

        element.on('click', function() {
          element.append(attrs.slSecond);
          scope.message = attrs.slSecond;
          scope.$apply();
        })
      }
    }; // directive definition object (DDO)
  })
;
