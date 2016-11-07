'use strict';

angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:insideHeader
     * @restrict E
     * @scope
     * @replace true
     * @description used to build an headerusing templateUrl app/components/portal/header/header.tpl.html
     */
    .directive('insideHeader', function () {
        return {
            restrict: 'E',
            scope: {
                userFirstName: '@',
                userLastName: '@',
                userBadgePhoto: '@'
            },
            replace: true,
            templateUrl: 'app/components/portal/header/header.tpl.html'
        }
    });
