'use strict';

/**
 * @ngdoc function
 * @name insideApp.directive:Paginator
 * @description
 * # Api
 * Paginator directive of the insideApp
 */
angular.module('insideApp')
    .directive('snlPaginator', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                paginationId: '@',
                pageSize: '=',
                pageOptions: '=',
                numRecords: '=',
                minDataLength: '=',
                noRecords: '=',
                scrollTo: '@'
            },
            templateUrl: 'app/components/portlet/api/pagination/paginator.tpl.html'
        };
    })
;
