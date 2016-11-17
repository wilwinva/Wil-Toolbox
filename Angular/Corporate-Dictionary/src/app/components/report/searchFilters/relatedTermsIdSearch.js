'use strict';

/**
 * @ngdoc directive
 * @name corpDictApp.directive:snlRelatedTermsByIdSearchForm
 * @description
 * # snlRelatedTermsByIdSearchForm
 */
angular.module('corpDictApp')
    .directive('snlRelatedTermsByIdSearchForm', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/components/report/searchFilters/relatedTermsIdSearch.tpl.html'
        };
    })
    .controller('relatedTermsByIdCtrl',['$scope', function ($scope) {

    }]);
