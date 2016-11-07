'use strict';
angular.module('enApp')
    /**
     * @ngdoc directive
     * @name enApp.directive:snlSiteFooter
     * @scope
     * @restrict E
     * @replace true
     * @description used to build an footer object using app/components/footer/footer.tpl.html using FooterCtrl
     */
    .directive('snlSiteFooter', function () {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/footer/footer.tpl.html',
        controller: 'FooterCtrl as ctrlFooter'
      }
    })
    /**
     * @ngdoc controller
     * @name enApp.controller:FooterCtrl
     * @description controller for footer
     */
    .controller('FooterCtrl', ['VERSIONINFO', function (VERSIONINFO) {
      var versionInfo = VERSIONINFO.versionNumber + "." + VERSIONINFO.releaseNumber + "." + VERSIONINFO.buildNumber;
      /**
       * @ngdoc property
       * @name versionInfo
       * @propertyOf enApp.controller:FooterCtrl
       * @description - version info string populated from constant VERSIONINFO
       */
      this.versionInfo = versionInfo;
      /**
       * @ngdoc property
       * @name releaseNotesUrl
       * @propertyOf enApp.controller:FooterCtrl
       * @description - release notes url string populated from constant VERSIONINFO
       */
      this.releaseNotesUrl = VERSIONINFO.releaseNotesUrl;
    }]);
