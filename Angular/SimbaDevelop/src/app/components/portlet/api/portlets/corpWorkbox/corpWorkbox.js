'use strict';

angular.module('insideApp')
    /**
     * @ngdoc controller
     * @name insideApp.controller:CorpWorkboxCtrl
     * @description CorpWorkbox Controller of the insideApp
     */
    .controller('CorpWorkboxCtrl', ['$scope', '$sce', 'ENV', function ($scope, $sce, ENV) {
        var self = this;

        self.getTemplateUrl = function () {
            return $scope.template;
        };

        $scope.corpWorkboxUrl = $sce.trustAsResourceUrl(ENV.corpWorkboxUrl);
    }])
;

function listenMessage(msg) {
  var iframeHeight = msg.data;
  var ifrm = document.getElementById("corpWorkboxIframe");
  ifrm.style.height = iframeHeight + "px";
}

if (window.addEventListener) {
  window.addEventListener("message", listenMessage, false);
} else {
  window.attachEvent("onmessage", listenMessage);
}
