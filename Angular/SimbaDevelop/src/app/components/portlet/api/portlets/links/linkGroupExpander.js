'use strict';

angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:linkGroupExpander
     * @restrict E
     * @replace true
     * @description used to build an alerts using templateUrl app/components/portlet/api/portlets/links/linkGroupExpander.tpl.html
     */
    .directive('linkGroupExpander', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                show: "="
            },
            templateUrl: 'app/components/portlet/api/portlets/links/linkGroupExpander.tpl.html'
        }
    });
