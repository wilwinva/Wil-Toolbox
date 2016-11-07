'use strict';

/**
 * @ngdoc filter
 * @name searchResultsApp.filter:searchDecode
 * @function
 * @description
 * # search specific decode filter
 * Filter in the searchResultsApp.
 */
angular.module('searchResultsApp')
  .filter('removeStars', function () {
    return function (encodedString) {
      if (!encodedString) {
        return '';
      }//if null return

      return encodedString.replace('&#9734;', '');
    };
  })
    .filter('removeFormsText', function () {
      return function (encodedString) {
        if (!encodedString) {
          return '';
        }//if null return

        return encodedString.replace(/forms/i, '');
      };
    })
  // note this is needed because of defect in ATL WS code
    .filter('policyCategory', function () {
      return function (encodedString) {
        if (!encodedString) {
          return '';
        }//if null return
        var dotCount = (encodedString.split('.')).length;
        var categoryTest = "Policy";
        switch (dotCount) {
          case 1:
            break;
          case 2:
            categoryTest = "Process";
            break;
          default:
            categoryTest = "Procedure"
        }

        return categoryTest;
      };
    })
    .filter('escapeTerms', function () {
      return function (encodedString) {
        if (!encodedString) {
          return '';
        }//if null return
        var newTerms = encodedString.replace('"', '\"');
        newTerms = newTerms.replace("'", "\'");
        newTerms = escape(newTerms);

        return newTerms;
      };
    })
  .filter('trustAsHtml', function ($sce) {
    return function (encodedString) {
      if (!encodedString) {
        return '';
      }//if null return
      return $sce.trustAsHtml(encodedString);
    };
  })
  .filter('unwantedUnicode', function () {
    return function (encodedString) {
      if (!encodedString) {
        return '';
      }//if null return
      encodedString = encodedString.replace(/\&amp\;nbsp\;/g, " ");
      encodedString = encodedString.replace(/\&#160\;/g, " ");
      encodedString = encodedString.replace(/\&lt\;p\&gt\;/g, "<p>");
      encodedString = encodedString.replace(/\&lt\;\/p\&gt;/g, "</p>");
      encodedString = encodedString.replace(/\&lt\;br\s\/\&gt;/g, "<br/>");
      return encodedString;
    };
  })
;
