'use strict';

angular.module('corpDictApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlOnFinishRender
     * @restrict A
     * @description used to scroll to last element
     */
    .directive('snlOnFinishRender', function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function () {
              scope.$eval(attr.snlOnFinishRender);
            });
          }
        }
      };
    })
;
