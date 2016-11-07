'use strict';

angular.module('snlComponents.expander', [])
    /**
     * @ngdoc directive
     * @name snlComponents.directive:snlExpanderPortlet
     * @restrict E
     * @replace true
     * @description used as a generic expander for portlets using common/components/expander/expanderPortlet.tpl.html
     */
    .directive('snlExpanderPortlet', function () {
        return {
        restrict: 'E',
        replace: true,
        scope: {
          expanded: "="
        },
        templateUrl: 'common/components/expander/expanderPortlet.tpl.html'
      }
    });
