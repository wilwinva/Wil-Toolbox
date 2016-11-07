'use strict';
/**
 * @ngdoc function
 * @name searchResultsApp.module:models
 * @description
 * # searchModel
 * searchModel of the searchResultsApp
 */

angular.module('searchResultsApp.models.search', ['searchResultsApp.config.constants'])
  .service('searchModel', ['$q', '$http', '$timeout', 'ENV', function SearchModel($q, $http, $timeout, ENV) {
    var searchModel = this;

    searchModel.fetchResults = function (topic, terms, pageBegin, numResults, resourceType, parentSearchId) {
      var searchUrl, deferred = $q.defer();

      $timeout(function () {
        deferred.reject({error: 500, message: 'The Search request timed out!'});
      }, 15000);

      terms = escape(terms);

      var sourceValue = null;

      if (resourceType == null || resourceType == 'All Items' || resourceType == 'null') {
        if (topic == 'techlib')
          resourceType = 'AI';
        else
          resourceType = 'null';
      }
      if (topic == "web")
        searchUrl = ENV.searchPointUrl + '&pageBegin=' + pageBegin + '&numResults=' + numResults + '&currentColl=snl1&queryText=' + terms + '&source=' + resourceType + '&parentSearchId=' + parentSearchId;
      else if (topic == "cps")
        searchUrl = ENV.searchPointUrl + '&pageBegin=' + pageBegin + '&numResults=' + numResults + '&currentColl=cps&queryText=' + terms + '&source=' + sourceValue + '&resourceType=' + resourceType + '&parentSearchId=' + parentSearchId;
      else if (topic == 'techlib')
        searchUrl = ENV.searchPointUrl + '&pageBegin=' + pageBegin + '&numResults=' + numResults + '&currentColl=catalog&queryText=' + terms + '&source=' + sourceValue + '&resourceType=' + resourceType + '&parentSearchId=' + parentSearchId;
      else if (topic == 'filenet')
        searchUrl = ENV.fileNetSearchUrl + '&maxRows=150&queryText=' + terms;
      else
        searchUrl = ENV.searchPointUrl + '&pageBegin=' + pageBegin + '&numResults=' + numResults + '&currentColl=snl1&queryText=' + terms + '&source=' + sourceValue + '&resourceType=' + resourceType + '&parentSearchId=' + parentSearchId;

      $http.jsonp(searchUrl, {cache: true, timeout: deferred.promise}).then(function successHandler(response) {
        var responseDetails;

        responseDetails = response.data;
        deferred.resolve(responseDetails);
      }, function () {
        deferred.reject({error: 400, message: ''});
      });
      return deferred.promise;
    };
  }]);
