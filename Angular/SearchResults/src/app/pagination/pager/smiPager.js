'use strict';

/**
 * @ngdoc directive
 * @name searchResultsApp.directive:smiPager
 * @description
 * # smiPager
 */
angular.module('searchResultsApp')
  .directive('smiPager', ['$state', function ($state) {
    return {
      restrict: "E",
      scope: {
        searchTerm: '=',
        searchType: '=',
        currentPage: '=',
        pageBegin: '=',
        numResults: '=',
        totalResults: '=',
        numSearchResults: '=',
        parentSearchId: '='
      },
      templateUrl: 'app/pagination/pager/smiPager.tpl.html',
      transclude: true,
      link: postLink
    };

    function postLink(scope) {
      scope.pageEnd = parseInt(scope.pageBegin, 10) + parseInt(scope.numResults, 10) - 1;

      if (scope.pageEnd > scope.totalResults) {
        scope.pageEnd = scope.totalResults;
      }

      scope.setPagination = function (currentPage) {
        /*logic for pagination */
        if (currentPage) {
          scope.currentPage = parseInt(currentPage, 10);
          scope.currentPage = currentPage;
        } else {
          if (scope.pageBegin == 0) {
            scope.currentPage = 1;
          } else {
            scope.currentPage = parseInt(scope.pageBegin / parseInt(scope.numResults, 10), 10);
            scope.currentPage += 1;
          }
        }

        scope.totalItems = parseInt(scope.totalResults);
        scope.itemsPerPage = scope.numResults;
        scope.totalPages = parseInt((scope.totalItems / scope.itemsPerPage), 10);
        if ((scope.totalItems % scope.itemsPerPage) != 0) {
          scope.totalPages += 1;
        }
      };

      scope.setPagination();//initialize pagination

      scope.getNumResults = function () {
        scope.pageBegin = (scope.currentPage * scope.numResults) - scope.numResults;
        scope.setPagination();
        $state.go('searchResults', {
          'terms': scope.searchTerm,
          'topic': scope.searchType,
          'pageBegin': scope.pageBegin,
          'numResults': scope.numResults,
          'currentPage': scope.currentPage,
          'parentSearchId': scope.parentSearchId
        }, {
          reload: true
        });
        //$log.info('going to results with search term ' + searchTerm)
      };
    }
  }])
;
