'use strict';

/**
 * @ngdoc directive
 * @name searchResultsApp.directive:smiPageRange
 * @description
 * # smiPageRange
 */

angular.module('searchResultsApp')
  .directive('smiPageRange', function () {
    return {
      restrict: "E",
      scope: {
        pageBegin: '=',
        numResults: '=',
        totalResults: '='
      },
      templateUrl: 'app/pagination/pageRange/smiPageRange.tpl.html',
      transclude: true,
      link: postLink
    };

    function postLink(scope) {
      scope.pageEnd = parseInt(scope.pageBegin, 10) + parseInt(scope.numResults, 10) - 1;
      ////console.log("wil@@@scope.pageEnd: " + scope.pageEnd);
      if (scope.pageEnd > scope.totalResults) {
        scope.pageEnd = scope.totalResults;
      }
      if (scope.totalResults == 0) {
        scope.pageBegin = 0;
      }
    }
  });
