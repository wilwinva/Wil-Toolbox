'use strict';

/**
 * @ngdoc directive
 * @name corpDictApp.component:siteFooter
 * @function
 * @description
 * # siteFooter
 * Footer of the corpDictApp.
 */

angular.module('corpDictApp')
    .directive('snlSiteFooter', function () {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/footer/footer.tpl.html',
        controller: 'FooterCtrl as ctrlFooter'
      };
    })
    .controller('FooterCtrl', ['VERSIONINFO', function (VERSIONINFO) {
      var versionInfo = VERSIONINFO.versionNumber + "." + VERSIONINFO.releaseNumber + "." + VERSIONINFO.buildNumber;
      this.versionInfo = versionInfo;
      this.releaseNotesUrl = VERSIONINFO.releaseNotesUrl;
    }]);
