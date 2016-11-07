'use strict';

/**
 * @ngdoc function
 * @name searchResultsApp.controller:SearchResultsCtrl
 * @description
 * # SearchResultsCtrl
 * Controller of the searchResultsApp
 */
angular.module('searchResultsApp')
  .controller('SearchResultsCtrl', ['$rootScope', '$state', 'CONFIG', 'ENV', 'results', 'atls', 'saple', 'queryTerm', 'queryType', 'resourceType', 'pageBegin', 'numResults', 'currentPage', 'admin',
    function ($rootScope, $state, CONFIG, ENV, results, atls, saple, queryTerm, queryType, resourceType, pageBegin, numResults, currentPage, admin) {

      var searchResults = this;
      searchResults.env = ENV;
      searchResults.searchResultsContent = results;
      searchResults.atls = atls;
      searchResults.atlSapleContent = saple;
      searchResults.searchTerm = queryTerm;
      searchResults.searchType = queryType;
      searchResults.pageBegin = parseInt(pageBegin, 10) + 1;
      searchResults.numResults = numResults;
      searchResults.numSearchResults = CONFIG.numSearchResults;//this is the array of possible search results per page defined in the config.js
      searchResults.currentPage = parseInt(currentPage, 10);
      searchResults.resourceType = (resourceType === null ? "All Items" : resourceType);
      searchResults.cpsSubSearchTypes = CONFIG.cpsSubSearchTypes;
      searchResults.facets = results.facets;
      searchResults.facetSubSearchTypes = CONFIG.facetSubSearchTypes;
      searchResults.admin = admin;

      if (results.facets) {
        for (var k = 0; k < searchResults.facets.length; k++) {
          if (searchResults.facets[k].label === "srn_web") {
            searchResults.facets[k].prettyLabel = "Sandia Internal";
          } else if (searchResults.facets[k].label === "cps") {
            searchResults.facets[k].prettyLabel = "Corporate Policies";
          } else if (searchResults.facets[k].label === "best_bets") {
            searchResults.facets[k].prettyLabel = "Best Bets";
          } else if (searchResults.facets[k].label === "hbe") {
            searchResults.facets[k].prettyLabel = "Health and Benefits";
          } else if (searchResults.facets[k].label === "teds") {
            searchResults.facets[k].prettyLabel = "Training";
          } else if (searchResults.facets[k].label === "sand") {
            searchResults.facets[k].prettyLabel = "SAND Reports";
          } else if (searchResults.facets[k].label === "videos") {
            searchResults.facets[k].prettyLabel = "Videos";
          } else if (searchResults.facets[k].label === "sharepoint") {
            searchResults.facets[k].prettyLabel = "SharePoint";
          } else if (searchResults.facets[k].label === "news") {
            searchResults.facets[k].prettyLabel = "News";
          } else if (searchResults.facets[k].label === "son_web") {
            searchResults.facets[k].prettyLabel = "Sandia External";
          } else if (searchResults.facets[k].label === "smi") {
            searchResults.facets[k].prettyLabel = "Sandia Management Infrastructure";
          } else if (searchResults.facets[k].label === "return") {
            searchResults.facets[k].prettyLabel = "All Items";
          } else {
            searchResults.facets[k].prettyLabel = searchResults.facets[k].label;
          }

        }
      }


      searchResults.getFileNetResults = function  (pageBegin, loopCeiling, content) {
        var tempSearchResultsContent = [];
        for (var a = pageBegin; a < loopCeiling; a++) {
          tempSearchResultsContent.push(content[a]);
        }
        return tempSearchResultsContent;
      };

      /*this is a temp fix until the backend can fix their issue of sending all 150 results instead of the request record range*/
      if (searchResults.searchType === 'filenet' && searchResults.searchResultsContent.content.length > parseInt(searchResults.numResults, 10)) {
        searchResults.searchResultsContent.content = searchResults.getFileNetResults(parseInt(pageBegin, 10), (parseInt(pageBegin, 10) + parseInt(numResults, 10)), searchResults.searchResultsContent.content);
      }

      searchResults.totalResults = parseInt(results.count, 10);
      searchResults.pageEnd = parseInt(pageBegin, 10) + parseInt(numResults, 10);
      searchResults.parentSearchId = parseInt(results.searchID, 10);

      // solr bug...results.count value will equal the num results from prev search if no results for current search
      if (results.content.length === 0) {
        searchResults.totalResults = 0;
      }
      searchResults.hasResults = results.content.length > 0 || searchResults.atls.length > 0 || searchResults.atlSapleContent.totalResults > 0;
      searchResults.showResults = function (searchTerm, searchType, pageBegin, numResults, currentPage, resourceType, parentSearchId, admin) {

        if (resourceType === 'return') {
//        console.info('resource type was return');
          resourceType = 'null';
        }
//      console.info(resourceType);
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
          'admin': admin,
        }, {
//location: 'replace',
          reload: true
        });
        //console.log('going to results with search term ' + searchTerm);
      };

    }]);
