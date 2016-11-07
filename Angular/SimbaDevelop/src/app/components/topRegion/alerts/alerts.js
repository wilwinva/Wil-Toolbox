'use strict';

angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlAlerts
     * @restrict E
     * @replace true
     * @description used to build an alerts using templateUrl app/components/topRegion/alerts/alerts.tpl.html and AlertsCtrl
     */
    .directive('snlAlerts', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/topRegion/alerts/alerts.tpl.html',
            controller: 'AlertsCtrl as alertsCtrl'
        };
    })
    /**
     * @ngdoc controller
     * @name insideApp.controller:AlertsCtrl
     * @description Alerts Controller of the insideApp
     */
    .controller('AlertsCtrl', ['ENV', 'insideApiModel', 'API_URL', '$window', '$cookies', '$scope', '$interval', 'ALERTINTERVAL',
        function (ENV, insideApiModel, API_URL, $window, $cookies, $scope, $interval, ALERTINTERVAL) {
            this.data = '';
            var self = this;
            self.userid = $cookies.get('userid');

            /**
             * @ngdoc method
             * @name fetchAlerts
             * @methodOf insideApp.controller:AlertsCtrl
             * @description - fetch the alert messages from insideApiModel.fetch method
             */
            self.fetchAlerts = function () {
                insideApiModel.fetch(ENV.alertsUrl).then(function (data) {
                    //reset error
                    $scope.error = false;
                    self.error = false;
                    self.data = data;
                }, function (reason) {
                    // 400 timing out - meaning the cgi file is missing
                    if (reason.error == 400) {
                        console.error('Alerts.js error received from model: Error Code:' + reason.error + ' Reason:' + reason.message);
                    }
                    $scope.error = true;
                    self.error = true;
                    self.data = [''];
                })
            };

            /**
             * @ngdoc method
             * @name reloadAlerts
             * @methodOf insideApp.controller:AlertsCtrl
             * @description - force reload of Alerts
             */
            self.reloadAlerts = function () {
                self.fetchAlerts();
            };
            /*fetchAlerts on page load*/
            self.fetchAlerts();
            /*reloadAlerts based in time interval constant ALERTINTERVAL*/
            $interval(self.reloadAlerts, ALERTINTERVAL);

        }]);
