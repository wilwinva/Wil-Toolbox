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
            templateUrl: 'app/components/report/actions/reportActions.tpl.html'
        };
    });
