'use strict';
angular.module('enApp')
    /**
     * @ngdoc directive
     * @name enApp.directive:snlSiteHeader
     * @scope
     * @restrict E
     * @replace true
     * @description used to build an header object using app/components/header/header.tpl.html
     */
    .directive('snlSiteHeader', function () {
        return {
            restrict: 'E',
            scope: {
                userFirstName: '@',
                userLastName: '@'
            },
            templateUrl: 'app/components/header/header.tpl.html'
        }
    });
