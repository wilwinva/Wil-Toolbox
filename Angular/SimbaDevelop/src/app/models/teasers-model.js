'use strict';

angular.module('insideApp.models.teasers', [])
    /**
     * @ngdoc service
     * @name insideApp.service:teasersModel
     * @description
     * teasersModel of the insideApp
     */
    .service('teasersModel', ['$q', '$http', 'ENV', '$timeout', function TeasersModel($q, $http, ENV, $timeout) {
        var teasersModel = this;

      /**
       * @ngdoc method
       * @name insideApiModel.fetchTeasers
       * @methodOf insideApp.service:teasersModel
       * @description - fetch teasers data object
       */
        teasersModel.fetchTeasers = function () {
            var deferred = $q.defer();

            var timeout = $timeout(function () {
                console.error('Teasers model: Timeout!');
                deferred.reject({error: 500, message: 'The Teasers request timed out!'});
            }, 15000);

            $http.jsonp(ENV.teasersUrl, {cache: true, timeout: deferred.promise})
                .then(function successHandler(response) {
                  deferred.resolve(response.data);
                    $timeout.cancel(timeout);
                }, function () {
                    deferred.reject({error: 400, message: ''});
                });

            return deferred.promise;
        };
    }]);
