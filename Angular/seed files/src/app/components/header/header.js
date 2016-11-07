'use strict';

/**
 * @ngdoc component
 * @name angularApp.component:siteHeader
 * @function
 * @description
 * # siteHeader
 * Header of the angularApp.
 */

angular.module('angularApp')
    .directive('snlSiteHeader', function () {
        return {
            restrict: 'E',
            scope: {
                userFirstName: '@',
                userLastName: '@'
            },
            replace: true,
            templateUrl: 'app/components/header/header.tpl.html'
        }
    });
