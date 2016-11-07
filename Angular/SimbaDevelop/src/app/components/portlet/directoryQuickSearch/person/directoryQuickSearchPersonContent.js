'use strict';
angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlDirectoryPersonContent
     * @restrict E
     * @scope
     * @transclude true
     * @description used to build an header using templateUrl app/components/portlet/directoryQuickSearch/person/directoryQuickSearchPersonContent.tpl.html
     */
    .directive('snlDirectoryPersonContent', function () {
        return {
            restrict: 'E',
            scope: {
                saple: '=',
                map: '='
            },
            transclude: true,
            templateUrl: 'app/components/portlet/directoryQuickSearch/person/directoryQuickSearchPersonContent.tpl.html'
        };
    })
;
