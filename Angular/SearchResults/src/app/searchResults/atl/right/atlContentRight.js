'use strict';

/**
 * @ngdoc directive
 * @name searchResultsApp.directive:atlContentRight
 * @description
 * # atlContentRight
 */
angular.module('searchResultsApp')
  .directive('atlContentRight', function () {
    return {
      restrict: 'E',
      scope: {
        atl: '=',
        env: '=',
        searchType: '=',
        searchTerm: '='
      },
      transclude: true,
      templateUrl: 'app/searchResults/atl/right/atlWrapperRight.tpl.html'
    };
  })
;
