'use strict';

angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlApiContent
     * @restrict E
     * @scope
     * @replace true
     * @description used to build an header using templateUrl is dynamic and apiCtrl
     */
    .directive('snlApiContent', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                url: '@',
                template: '@',
                error: '=',
                userid: '@',
                orgnum: '@',
                preferences: '='
            },
            template: '<ng-include src="apiCtrl.getTemplateUrl()"/>',
            controller: '@',
            name: 'ctrlName',
            controllerAs: 'apiCtrl'
        };
    })
;
