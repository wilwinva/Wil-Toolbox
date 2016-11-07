'use strict';

angular.module('insideApp.models.alerts', [])
    /**
     * @ngdoc service
     * @name insideApp.service:alertsModel
     * @description
     * alertsModel of the insideApp
     */
    .service('alertsModel', ['$q', '$http', 'ENV', '$timeout', function AlertsModel($q, $http, ENV, $timeout) {
        var alertsModel = this;

      /**
       * @ngdoc method
       * @name insideApiModel.fetch
       * @methodOf insideApp.service:alertsModel
       * @description - fetch alerts data object
       * @param {string} userid - the userid
       */
        alertsModel.fetchAlerts = function (userid) {
            var deferred = $q.defer();
          /*//TODO: this can be removed since the interval is being done in the alert.js file instead
            var timeout = $timeout(function () {
           //console.error('Alerts model: Timeout!');
           var errorObj={'error':500,'message':'The Alerts request timed out!'};
           deferred.reject(errorObj);
           //              deferred.reject({error: 500, message: 'The Alerts request timed out! Missing alert file!'});
           //          console.error('Alerts model: Missing alert file!!');
            }, 15000);
           */

            $http.jsonp(ENV.alertsUrl + userid, {cache: true, timeout: deferred.promise})
                .then(function successHandler(response) {
                    deferred.resolve(response.data);
                  //$timeout.cancel(timeout);
                }, function () {
                  //console.error('Alerts model: Rejection!');
                  deferred.reject({error: 400, message: ' Missing cgi file!'});
                });

            return deferred.promise;
        };
    }]);
