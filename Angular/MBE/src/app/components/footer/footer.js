'use strict';

/**
 * @ngdoc directive
 * @name mbeApp.component:siteFooter
 * @function
 * @description
 * # siteFooter
 * Footer of the mbeApp.
 */

angular.module('mbeApp')
    .directive('snlSiteFooter', function () {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/footer/footer.tpl.html',
        controller: 'FooterCtrl as ctrlFooter'
      }
    })
    .controller('FooterCtrl', ['VERSIONINFO', function (VERSIONINFO) {
      var versionInfo = VERSIONINFO.versionNumber + "." + VERSIONINFO.releaseNumber + "." + VERSIONINFO.buildNumber;
      this.versionInfo = versionInfo;
      this.releaseNotesUrl = VERSIONINFO.releaseNotesUrl;
    }]);
