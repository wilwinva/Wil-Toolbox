'use strict';

/**
 * @ngdoc directive
 * @name searchResultsApp.directive:atlContentTop
 * @description
 * # atlContentTop
 */
angular.module('searchResultsApp')
  .directive('atlContentTop', function () {
    return {
      restrict: 'E',
      scope: {
        atl: '=',
        searchType: "=",
        searchTerm: "="
      },
      transclude: true,
      templateUrl: 'app/searchResults/atl/top/atlWrapperTop.tpl.html'
    };
  })
;
