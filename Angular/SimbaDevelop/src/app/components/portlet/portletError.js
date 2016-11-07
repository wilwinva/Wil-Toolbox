'use strict';

angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlPortletError
     * @restrict E
     * @scope
     * @replace true
     * @description used to build an error page using templateUrl app/components/portlet/portletError.tpl.html
     */
    .directive('snlPortletError', [function () {
        return {
            restict: 'E',
            replace: true,
            scope: {
                error: "="
            },
            templateUrl: 'app/components/portlet/portletError.tpl.html'
        }
    }]);
