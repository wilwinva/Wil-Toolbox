'use strict';

/**
 * @ngdoc filter
 * @name searchResultsApp.component:appFooter
 * @function
 * @description
 * # appFooter
 * Footer of the searchResultsApp.
 */

angular.module('searchResultsApp')
    .directive('appFooter', function () {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/footer/footer.tpl.html',
        controller: 'FooterCtrl as ctrlFooter'
      }
    })
    .controller('FooterCtrl', ['CONFIG', function (CONFIG) {
      var versionInfo = CONFIG.versionInfo.versionNumber + "." + CONFIG.versionInfo.releaseNumber + "." + CONFIG.versionInfo.buildNumber;
      this.versionInfo = versionInfo;
    }]);
