'use strict';

/**
 * @ngdoc function
 * @name searchResultsApp.controller:SearchBoxCtrl
 * @description
 * # SearchBoxCtrl
 * Controller of the searchResultsApp
 */
angular.module('searchResultsApp')
  .controller('SearchBoxCtrl',
    function ($state, $rootScope, $scope, $log, autocompleteModel, admin) {
      var searchBox = this;
      $rootScope.searching = false;

      searchBox.admin = admin;

      searchBox.showResults = function (searchTerm, searchType, pageBegin, numResults, currentPage, resourceType,parentSearchId) {

        if (!searchTerm) {
          return;
        }
        $rootScope.searching = true;

        $state.go('searchResults', {
          'terms': searchTerm,
          'topic': searchType,
          'pageBegin': pageBegin,
          'numResults': numResults,
          'currentPage': currentPage,
          'resourceType': resourceType,
          'parentSearchId': parentSearchId,
          'admin': searchBox.admin
        }, {
//location: 'replace',
          reload: true
        });
        $log.info('going to results with search term ' + searchTerm);
      };

      searchBox.onSelect = function ($item, $model, $label, searchType, pageBegin, numResults, currentPage, resourceType,searchTerm) {
        $scope.$item = $item;
        $scope.$model = $model;
        $scope.$label = $label;

        if(searchTerm.length > $item.searchTerm.length){
          searchBox.showResults(searchTerm, searchType, pageBegin, numResults, currentPage, resourceType,null);
        }else {
          searchBox.showResults($item.searchTerm, searchType, pageBegin, numResults, currentPage, resourceType, null);
        }
      };

      searchBox.fetchAutocompleteResults = function (terms) {
        return autocompleteModel.fetchAutocomplete(terms);
      };

    });
