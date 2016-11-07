'use strict';

/**
 * @ngdoc directive
 * @name mbeApp.component:siteHeader
 * @function
 * @description
 * # siteHeader
 * Header of the mbeApp.
 */

angular.module('mbeApp')
    .directive('snlSiteHeader', function () {
        return {
            restrict: 'E',
            scope: {
                userFirstName: '@',
                userLastName: '@'
            },
            replace: true,
            templateUrl: 'app/components/header/header.tpl.html',
            controller: 'HomeCtrl as homeCtrl'
        }
    })
;
