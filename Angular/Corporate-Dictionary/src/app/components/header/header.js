'use strict';

/**
 * @ngdoc directive
 * @name corpDictApp.component:siteHeader
 * @function
 * @description
 * # siteHeader
 * Header of the corpDictApp.
 */

angular.module('corpDictApp')
    .directive('snlSiteHeader', function () {
        return {
            restrict: 'E',
            scope: {
            },
            replace: true,
            templateUrl: 'app/components/header/header.tpl.html'
        };
    });
