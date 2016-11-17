'use strict';
/**
 * @ngdoc overview
 * @project CADM
 * @name corpDictApp.dictionaryModel
 * @description
 * # corpDictApp.dictionaryModel
 *
 * dictionaryModel of the application.
 */
angular.module('corpDictApp')
    .service('dictionaryModel', ['$q', '$http', 'ENV', function DictionaryModel($q, $http, ENV) {
        var dictionaryModel = this;

        dictionaryModel.fetch = function ($url) {
            return $http.get($url).then(function (response) {
                return response.data;
            });
        };

        dictionaryModel.fetchFilteredTerms = function (filterText) {
            //TODO: add logic to construct $url based on filter criteria
//            console.info("running fetchFilteredTerms: " + ENV.termByFilterUrl + filterText);
            return $http.get(ENV.termByFilterUrl + filterText).then(function (response) {
//              console.log('fetchFilteredTerms'+JSON.stringify(response.data));
                return response.data;
            });
        };

        /**
         * @ngdoc method
         * @name insideApiModel.add
         * @methodOf insideApp.service:insideApiModel
         * @description - add
         * @param {string} service - the service
         * @param {string} data - the data
         */
        dictionaryModel.postTerm = function (data, prevData) {

            console.info("in postTerm");
            /*var deferred = $q.defer();
            //TODO:var url = ENV.insideApiUrl;

            var timeout = $timeout(function () {
                console.error('Dictionary Model postTerm(): Timeout!');
                deferred.reject({error: 500, message: 'The dictionary model post request timed out!'});
            }, 15000);*/
/*
            $http.post(url, data).then(
                function successHandler(response) {
                    var responseDetails = response.data;
                    deferred.resolve(responseDetails);
                    $timeout.cancel(timeout);
                }, function errorHandler(error) {
                    deferred.reject({error: 400, message: 'Call failed: ' + url});
                });

            return deferred.promise;*/


            /*
             var data = JSON.stringify({
             acronym: self.result.acronym,
             abbrev_simplified: self.result.abbrev_simplified,
             term_name: self.result.term,
             delete_flag: self.deleteFlag,
             definition: self.definition,
             sub_policy_areas: self.result.categories,
             related_terms: self.relatedTermsList,
             update_reason: self.noteText
             });
             */

            console.info("Acronym: " + data.acronym);
            console.info("Full-name: " + data.term);
            console.info("Status: " + data.deleteFlag);
            console.info("SupersededBy: " + data.termSupersededBy);
            console.info("Definition: " + data.definition);
            console.info("Categories: " + data.categories);
            console.info("Related terms: " + data.relatedTerms);
            console.info("Reason for creation: " + data.updateReason);
            console.info("Is Update: " + data.isUpdate);

          var url = ENV.cadmUrl;
          var x = $http.post(url, data);
          return x;
        };

    }]);

