'use strict';

angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlPageSizer
     * @restrict E
     * @replace true
     * @description used to build an alerts using templateUrl app/components/portlet/api/pagination/pageSizer.tpl.html
     */
    .directive('snlPageSizer', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                pageSize: '=',
                pageOptions: '=',
                minDataLength: '=',
                numRecords: '=',
                scrollTo: '@'
            },
            templateUrl: 'app/components/portlet/api/pagination/pageSizer.tpl.html'
        };
    })
;
