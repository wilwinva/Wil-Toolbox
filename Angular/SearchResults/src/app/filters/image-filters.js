'use strict';

/**
 * @ngdoc filter
 * @name searchResultsApp.filter:image
 * @function
 * @description
 * # image
 * Filter in the searchResultsApp.
 */
angular.module('searchResultsApp')
  .filter('imageIsStandard', function () {
    return function (encodedString) {
      if (!encodedString) {
        return '';
      }//if null return

      var returnValue = true;
      var decoded = decodeURIComponent(encodedString);
      if (decoded.indexOf('icon_book.png') != -1 || decoded.indexOf('icon_article.png') != -1 || decoded.indexOf('icon_journal.png') != -1) {
        returnValue = false;
      }
      return returnValue;
    }
  })
;
