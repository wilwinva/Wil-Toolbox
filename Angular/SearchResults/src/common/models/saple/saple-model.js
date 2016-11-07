'use strict';

/**
 * @ngdoc function
 * @name smiModels.module:models.sapleModel
 * @description
 * # Models.Saple
 * Saple Model of the smiModels
 */
angular.module('smiModels.saple', [])
  .service('sapleModel', ['$q', '$http', 'ENV', function SapleModel($q, $http, ENV) {
    var sapleModel = this;
    var numRecords = 11;

    sapleModel.fetchResults = function (terms) {
      var searchTermPrefix = '',
        searchUrl;
        //deferred = $q.defer();

      // It's technically possible to search on mailstop and phone number. This overrides that capability.
      if (!isNaN(terms)) {
        searchTermPrefix = 'org:'; // only number type searched on is org
      }

      searchUrl = ENV.sapleUrl + '&query=' + encodeURIComponent(searchTermPrefix + terms) + '&end=' + numRecords;

      return $http.jsonp(searchUrl, {cache: false, timeout: 10000}).then(function successHandler(response) {

        var responseDetails = response.data;
        //testing if input has any numbers like 800 or M401
        var queryInput = (responseDetails.query.input).toString();
        if (queryInput.search(/\d+/g) === -1) {
          if (responseDetails.result && responseDetails.result.length !== 0) {
            var newResponseDetails = [];

            if (responseDetails.result.length > 1) {
              var tempData = responseDetails.result;

              var tempDataLength = responseDetails.result.length;

              if (tempDataLength > numRecords) {
                tempDataLength = numRecords;
              }

              for (var a = 0; a < tempDataLength; a++) {
                var tempObj = tempData[a];
                if (tempObj.score >= 0.95) {//only include records with a search score of .95 or better
                  newResponseDetails.push(tempObj);
                }
              }
              responseDetails.result = newResponseDetails;
            } else {
              if (responseDetails.result.score >= 0.95) {
                newResponseDetails.push(responseDetails.result);
              }
              responseDetails.result = newResponseDetails;
            }

            if (responseDetails.result.length < numRecords) {
              responseDetails.totalResults = responseDetails.result.length;
            }
            if (responseDetails.totalResults > 0) {
              responseDetails.source = 'SAPLE';
            }
          }
        } else {
          responseDetails.totalResults = 0;
        }
        return responseDetails;
      }, function () {
        return null;
      });
    };

  }]);
