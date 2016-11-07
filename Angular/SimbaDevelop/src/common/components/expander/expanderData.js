'use strict';

angular.module('snlComponents.expander', [])
    /**
     * @ngdoc directive
     * @name snlComponents.directive:snlExpanderData
     * @restrict E
     * @replace true
     * @description used as a generic expander for data using common/components/expander/expanderData.tpl.html
     */
    .directive('snlExpanderData', function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          show: "="
        },
        templateUrl: 'common/components/expander/expanderData.tpl.html'
      }
    });
