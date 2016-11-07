'use strict';

/**
 * @ngdoc function
 * @name searchResultsApp.module:models
 * @description
 * # autocompleteModel
 * autocompleteModel of the searchResultsApp
 */

angular.module('searchResultsApp.models.autocomplete', ['searchResultsApp.config.constants'])
  .service('autocompleteModel', ['$q', '$http', 'ENV', function SearchModel($q, $http, ENV) {
    var autocompleteModel = this;

    function removeDuplicates(duplicateArray) {
      var returnArray;// = duplicateArray;

      for (var i = 0; i < duplicateArray.length; i++) {
        var termForDuplication = duplicateArray[i].term;
        for (var j = i + 1; j < duplicateArray.length; j++) {
          if (termForDuplication === duplicateArray[j].term) {
            duplicateArray.splice(j, 1);
          }
        }
      }

      returnArray = duplicateArray;
      return returnArray;
    };

    autocompleteModel.fetchAutocomplete = function (terms) {
      var autocompleteResponse = [], acronymResponse = [],
        deferred = $q.defer(), autocompleteResponded = false,
        acronymResponded = false, acronymResponses = 0, autocompleteResponses = 0;

      $http.jsonp(ENV.acronymUrl + terms, {cache: true, timeout: 10000}).then(function successHandler(response) {
        acronymResponses = response.data.length;
        if (acronymResponses > 10) {
          acronymResponses = 10;
        }
        if (autocompleteResponded) {
          var totalResponses = acronymResponses + autocompleteResponses;
          if (totalResponses <= 10) {
            for (var i in response.data) {
              autocompleteResponse[autocompleteResponses + i * 1] = {
                term: response.data[i].acronymExpansion,
                index: autocompleteResponses * 1 + i * 1,
                searchTerm: "\"" + response.data[i].acronymExpansion + "\""
              };
            }
          }
          else {
            if (autocompleteResponses >= 5 && acronymResponses >= 5) {
              for (var i in response.data) {
                if (i > 4) {
                  break;
                }
                autocompleteResponse[i * 1 + 5] = {
                  term: response.data[i].acronymExpansion,
                  index: i * 1 + 5,
                  searchTerm: "\"" + response.data[i].acronymExpansion + "\""
                };
              }
            } else if (autocompleteResponses < acronymResponses) {
              for (var i in response.data) {
                if (i * 1 + autocompleteResponses * 1 > 9) {
                  break;
                }
                autocompleteResponse[autocompleteResponses * 1 + i * 1] = {
                  term: response.data[i].acronymExpansion,
                  index: autocompleteResponses * 1 + i * 1,
                  searchTerm: "\"" + response.data[i].acronymExpansion + "\""
                };
              }
            } else if (acronymResponses < autocompleteResponses) {
              for (var i in response.data) {
                if (10 - acronymResponses * 1 + i * 1 > 9) {
                  break;
                }
                autocompleteResponse[10 - acronymResponses * 1 + i * 1] = {
                  term: response.data[i].acronymExpansion,
                  index: 10 - acronymResponses * 1 + i * 1,
                  searchTerm: "\"" + response.data[i].acronymExpansion + "\""
                };
              }
            }
          }
        } else {
          for (var i in response.data) {
            if (i > 9)
              break;
            acronymResponse.push({term: response.data[i].acronymExpansion, index: autocompleteResponse.length, searchTerm: "\"" + response.data[i].acronymExpansion + "\""});
          }
        }

        if (autocompleteResponded) {
          autocompleteResponse = removeDuplicates(autocompleteResponse);
          deferred.resolve(autocompleteResponse);
        }
        acronymResponded = true;
      }, function () {
        deferred.reject({error: 400, message: ''});
      });

      $http.jsonp(ENV.autocompleteUrl + terms, {cache: true, timeout: 10000}).then(function successHandler(response) {
        autocompleteResponses = response.data.length;

        if (autocompleteResponses > 10) {
          autocompleteResponses = 10;
        }

        for (var i in response.data) {
          if (i > 9) {
            break;
          }

          autocompleteResponse.push({
            term: response.data[i].term.split('+').join(' '),
            index: autocompleteResponse.length,
            searchTerm: response.data[i].term.split('+').join(' ')
          });
        }

        if (acronymResponded) {
          var totalResponses = acronymResponses + autocompleteResponses;

          if (totalResponses < 10) {
            for (var i in acronymResponse) {
              acronymResponse[i].index = autocompleteResponse.length;
              autocompleteResponse.push(acronymResponse[i]);
            }

          } else if (autocompleteResponses >= 5 && acronymResponses >= 5) {
            for (var i in acronymResponse) {
              if (i > 4) {
                break;
              }
              acronymResponse[i].index = 5 + i * 1; //needed to prevent string addition
              autocompleteResponse[5 + i * 1] = (acronymResponse[i]);
            }

          } else if (autocompleteResponses < acronymResponses) {
            for (var i in acronymResponse) {
              if (i * 1 + autocompleteResponses * 1 > 9) {
                break;
              }

              acronymResponse[i].index = autocompleteResponses * 1 + i * 1;
              autocompleteResponse.push(acronymResponse[i]);
            }
          } else if (acronymResponses < autocompleteResponses) {
            for (var i in acronymResponse) {
              if (10 - acronymResponses * 1 + i * 1 > 9) {
                break;
              }

              acronymResponse[i].index = 10 - acronymResponses * 1 + i * 1;
              autocompleteResponse[10 - acronymResponses * 1 + i * 1] = acronymResponse[i];
            }
          }
        }

        if (acronymResponded) {
          //console.log(autocompleteResponse);
          autocompleteResponse = removeDuplicates(autocompleteResponse);
          deferred.resolve(autocompleteResponse);
        }
        autocompleteResponded = true;
      }, function () {
        deferred.reject({error: 400, message: ''});
      });

      return deferred.promise;
    };

  }]);
