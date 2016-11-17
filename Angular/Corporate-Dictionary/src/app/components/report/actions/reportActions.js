'use strict';

/**
 * @ngdoc directive
 * @name corpDictApp.directive:snlReportActions
 * @description
 * # snlReportActions
 */
angular.module('corpDictApp')
    .directive('snlReportActions', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/components/report/actions/reportActions.tpl.html',
            controller: 'ReportsCtrl as ctrl'
        };
    })
    .controller('ReportsCtrl', [ '$scope','$state', function($scope,$state){

        $scope.options = [
            { label: 'Change Report', value: 'createChangeReport' },
            { label: 'History Report', value: 'createHistoryReport' },
            { label: 'Term By Date Report', value: 'createTermByDateReport' },
            { label: 'Review Spreadsheet', value: 'createReviewSpreadsheet' }
        ];

        $scope.goToSelectedReport = function(){
            $state.go($scope.reportSelected);
        };

    }]);
