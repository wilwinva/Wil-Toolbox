'use strict';

angular.module('insideApp.models.insideApi', ['insideApp.mocks'])
    /**
     * @ngdoc service
     * @name insideApp.service:insideApiModel
     * @description
     * insideApiModel of the insideApp
     */
    .service('insideApiModel', ['$q', '$http', '$timeout', '$cookies', 'ENV', 'insideApiModelMock',
        function InsideApiModel($q, $http, $timeout, $cookies, ENV, insideApiModelMock) {
            var insideApiModel = this;

            /**
             * @ngdoc method
             * @name insideApiModel.fetch
             * @methodOf insideApp.service:insideApiModel
             * @description - fetch data - real or mock
             * @param {string} service - the service
             * @param {string} urlParam - the urlParam
             * @param {boolean} cache - true or false
             */
            insideApiModel.fetch = function (service, urlParam , cache) {
                if (!ENV.isStatic) {
                    var deferred = $q.defer();

                    var timeout = $timeout(function () {
                        console.error('Inside model fetch(): Timeout!');
                        deferred.reject({error: 500, message: 'The inside-api request timed out!'});
                    }, 15000);

                    var urlSuffix;
                    if (typeof urlParam !== 'undefined' && urlParam !== null) {
                        urlSuffix = '/' + urlParam;
                    }
                    else {
                        urlSuffix = '';
                    }
                    var url = ENV.insideApiUrl + service + urlSuffix;

                    cache = cache !== false; // Default cache to true
                    $http.get(url, {cache: cache, timeout: deferred.promise}).then(
                        function successHandler(response) {
                            var responseDetails = response.data;
                            deferred.resolve(responseDetails);
                            $timeout.cancel(timeout);
                        }, function errorHandler() {
                            deferred.reject({error: 400, message: 'Call failed: ' + url});
                        });

                    return deferred.promise;
                }
                else {
                    console.log('Retrieving smi mock model data for ' + service);
                    //read local data from insideApiModel mock
                    return $q.when(insideApiModelMock[service]);
                }
            };

            /**
             * @ngdoc method
             * @name insideApiModel.add
             * @methodOf insideApp.service:insideApiModel
             * @description - add
             * @param {string} service - the service
             * @param {string} data - the data
             */
            insideApiModel.add = function (service, data) {
                var deferred = $q.defer();
                var url = ENV.insideApiUrl + service;

                var timeout = $timeout(function () {
                    console.error('Inside Model add(): Timeout!');
                    deferred.reject({error: 500, message: 'The inside-api post request timed out!'});
                }, 15000);

                $http.post(url, data).then(
                    function successHandler(response) {
                        var responseDetails = response.data;
                        deferred.resolve(responseDetails);
                        $timeout.cancel(timeout);
                    }, function errorHandler(error) {
                        deferred.reject({error: 400, message: 'Call failed: ' + url});
                    });

                return deferred.promise;
            };

            /**
             * @ngdoc method
             * @name insideApiModel.edit
             * @methodOf insideApp.service:insideApiModel
             * @description - edit
             * @param {string} service - the service
             * @param {string} param - the param
             * @param {string} data - the data
             */
            insideApiModel.edit = function (service, param, data) {
                var deferred = $q.defer();
                var url = ENV.insideApiUrl + service + '/' + param;

                var timeout = $timeout(function () {
                    console.error('Links Model.edit(): Timeout!');
                    deferred.reject({error: 500, message: 'The inside-api put request timed out!'});
                }, 15000);

                $http.put(url, data).then(
                    function successHandler(response) {
                        var responseDetails = response.data;
                        deferred.resolve(responseDetails);
                        $timeout.cancel(timeout);
                    }, function errorHandler(error) {
                        deferred.reject({error: 400, message: 'Call failed: ' + url});
                    });

                return deferred.promise;
            };

            /**
             * @ngdoc method
             * @name insideApiModel.delete
             * @methodOf insideApp.service:insideApiModel
             * @description - delete
             * @param {string} service - the service
             * @param {string} param - the param
             */
            insideApiModel.delete = function (service, param) {
                var deferred = $q.defer();
                var url = ENV.insideApiUrl + service+ '/' + param;

                var timeout = $timeout(function () {
                    console.error('Links Model.delete(): Timeout!');
                    deferred.reject({error: 500, message: 'The smi-api delete request timed out!'});
                }, 15000);

                $http.delete(url).then(
                    function successHandler(response) {
                        var responseDetails = response.data;
                        deferred.resolve(responseDetails);
                        $timeout.cancel(timeout);
                    }, function errorHandler(error) {
                        deferred.reject({error: 400, message: 'Call failed: ' + url});
                    });

                return deferred.promise;
            };

            /**
             * @ngdoc method
             * @name insideApiModel.storeCookies
             * @methodOf insideApp.service:insideApiModel
             * @description - store cookie
             * @param {string} data - the data
             */
            insideApiModel.storeCookies = function (data) {
                //Cookies can't be secure for local development
                var isSecure = ENV.secureCookies;

                //Add userId as a cookie so other pages have access to it for retrieving alerts (even if back is pressed)
                $cookies.put('userid', data.userid, {secure: isSecure});

                //Add userRole cookie necessary for loading the customized view and menu
                $cookies.put('userRole', data.role, {secure: isSecure});

                //Add user's orgnum cookie necessary for loading the manager byOrg portlets
                $cookies.put('orgnum', data.orgnum, {secure: isSecure});
            }
        }]);
