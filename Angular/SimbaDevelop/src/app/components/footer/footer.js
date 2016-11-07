'use strict';

angular.module('insideApp')
/**
 * @ngdoc directive
 * @name insideApp.directive:snlFooter
 * @scope
 * @restrict E
 * @replace true
 * @description used to build an footer using templateUrl app/components/footer/footer.tpl.html and FooterCtrl
 */
    .directive('snlFooter', function () {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/footer/footer.tpl.html',
        controller: 'FooterCtrl as ctrlFooter'
      }
    })

    /**
     * @ngdoc controller
     * @name insideApp.controller:FooterCtrl
     * @description Footer Controller of the insideApp
     */
    .controller('FooterCtrl', ['VERSIONINFO', function (VERSIONINFO) {
      var versionInfo = VERSIONINFO.versionNumber + "." + VERSIONINFO.releaseNumber + "." + VERSIONINFO.buildNumber;
      this.versionInfo = versionInfo;
      this.releaseNotesUrl = VERSIONINFO.releaseNotesUrl;
    }]);
