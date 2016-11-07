'use strict';

angular.module('snlModels.saple', [])
    /**
     * @ngdoc service
     * @name snlModels.service:sapleModel
     * @description
     * sapleModel of the snlModels
     */
    .service('sapleModel', function SapleModel($q, $http, ENV) {
        var sapleModel = this;

        /**
         * @ngdoc method
         * @name insideApiModel.fetch
         * @methodOf snlModels.service:sapleModel
         * @description - fetch data object
         * @param {string} url - the url
         * @param {string} terms - the terms
         * @param {integer} callBackNumber - the callBackNumber
         */
        sapleModel.fetch = function (url, terms, callBackNumber) {
            var searchUrl,
                searchTermPrefix = '',
                deferred = $q.defer();

            // It's technically possible to search on mailstop and phone number. This overrides that capability.
            if (!isNaN(terms)) {
                searchTermPrefix = 'org:'; // only number type searched on is org
            }

            searchUrl = url + '&query=' + encodeURIComponent(searchTermPrefix + terms) + '&end=100';
            $http.jsonp(searchUrl, {cache: false, timeout: 10000}).then(function successHandler(response) {
                var responseDetails;
                if (response.data) {
                    responseDetails = response.data;
                    responseDetails.callBackNumber = callBackNumber;
                    if (responseDetails.result && responseDetails.result.length != 0) {
                        var newResponseDetails = [];

                        if (responseDetails.result.length > 1) {
                            var tempData = responseDetails.result;
                            var bestResultScore = tempData[0].score;
                            var scoreMinimum = .95;
                            if (bestResultScore >= .95) {
                                scoreMinimum = .95;
                            } else {
                                scoreMinimum = .55;
                            }

                            var tempDataLength = responseDetails.result.length;

                            // limit the number of results returned (angular was hanging when 1000 results were returned, e.g search for john)
                            if (tempDataLength > 100) {
                                tempDataLength = 100;
                            }

                            for (var a = 0; a < tempDataLength; a++) {
                                var tempObj = tempData[a];
                                if (typeof tempObj !== 'undefined' && tempObj.score >= scoreMinimum) {//only include records with a search score of .95 or better
                                    newResponseDetails.push(tempObj);
                                }
                            }
                            responseDetails.result = newResponseDetails;
                            responseDetails.totalResults = tempDataLength;
                        } else {
                            var bestResultScore = responseDetails.result.score;
                            var scoreMinimum = .95;
                            if (bestResultScore >= .95) {
                                scoreMinimum = .95;
                            } else {
                                scoreMinimum = .55;
                            }
                            if (responseDetails.result.score >= scoreMinimum) {
                                newResponseDetails.push(responseDetails.result);
                            }
                            responseDetails.result = newResponseDetails;
                        }
                        if (responseDetails.result.length < 11) {
                            responseDetails.totalResults = responseDetails.result.length;
                        }
                        if (responseDetails.totalResults > 0) {
                            responseDetails.source = 'SAPLE';
                        }
                    }
                }
                else {
                    responseDetails = [];
                }
                deferred.resolve(responseDetails);
            }, function () {
                deferred.reject({error: 400, message: ''});
            });

          return deferred.promise;
        };

        /**
         * @ngdoc method
         * @name insideApiModel.fetchResults
         * @methodOf snlModels.service:sapleModel
         * @description - Makes query to saple web service
         * @param {string} terms - the terms
         * @param {integer} callBackNumber - Used to track order of calls made. Without a tracking system, it's possible
         *                       to overwrite results from a more recent query with a late-returning earlier
         *                       query.
         * //@returns {deferred.promise|{then, catch, finally}}
         */
        sapleModel.fetchResults = function (terms, callBackNumber) {
            return sapleModel.fetch(ENV.sapleUrl, terms, callBackNumber);
        };

        /**
         * @ngdoc method
         * @name insideApiModel.fetchResultsBySnlId
         * @methodOf snlModels.service:sapleModel
         * @description - Makes query to saple web service
         * @param {string} snlid - the snlid
         */
        sapleModel.fetchResultsBySnlId = function (snlid) {
            var url = ENV.sapleUrl + '&showVisitors=true'; //visitors can log into Techweb
            return sapleModel.fetch(url, 'snlid:' + snlid);
        }
    });
