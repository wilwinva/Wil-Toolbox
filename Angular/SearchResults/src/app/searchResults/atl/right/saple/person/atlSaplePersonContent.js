'use strict';

/**
 * @ngdoc directive
 * @name searchResultsApp.directive:atlSaplePersonContent
 * @description
 * # atlSaplePersonContent
 */
angular.module('searchResultsApp')
  .directive('atlSaplePersonContent', function () {
    return {
      restrict: 'E',
      scope: {
        saple: '=',
        map: '='
      },
      transclude: true,
      templateUrl: 'app/searchResults/atl/right/saple/person/atlSaplePersonContent.tpl.html'
    };
  })
;
