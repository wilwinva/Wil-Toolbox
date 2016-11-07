'use strict';

/**
 * @ngdoc filter
 * @name searchResultsApp.filter:decode
 * @function
 * @description
 * # decode
 * Filter in the searchResultsApp.
 */
angular.module('searchResultsApp')
  .filter('decode', function () {
    return function (encodedString) {
      if (!encodedString) {
        return '';
      }//if null return

      var txt = document.createElement('textarea');
      txt.innerHTML = decodeURIComponent(encodedString);

      return txt.value;
    };
  })
  .filter('removeBreakingSpace',function () {
    return function (encodedString) {
      if (!encodedString) {
        return '';
      }//if null return

      return encodedString.replace(/&nbsp;/gi,' ');
    };
  })
  .filter('replaceSpaces', function () {
    return function (encodedString) {
      if (!encodedString) {
        return '';
      }//if null return

      return encodedString.replace(/([+])/g, ' ');
    };
  })
  .filter('trimSpaces', function () {
    return function (encodedString) {
      if (!encodedString) {
        return '';
      }//if null return

      return encodedString.trim();
    };
  })
  .filter('limitCharacters', function () {
    return function (encodedString) {
      if (!encodedString) {
        return '';
      }//if null return
      var strLen = 92;

      if (encodedString.length > strLen) {
        var newStr = encodedString.substring(0, strLen);
        if (newStr.length === strLen) {
          newStr += '...';

        }
        encodedString = newStr;
        var last7Chars = encodedString.substr(encodedString.length-7);
        if(last7Chars.indexOf('</em>') === -1 && last7Chars.indexOf('<em>') === -1 &&
          (last7Chars.indexOf('</em') > -1 || last7Chars.indexOf('</e') > -1
          || last7Chars.indexOf('</') > -1 || last7Chars.indexOf('<') > -1 ||
          last7Chars.indexOf('<em') > -1 || last7Chars.indexOf('<e') > -1)){

          encodedString = encodedString.substring(0,encodedString.length-7);
          encodedString +='...';
        }
      }

      return encodedString;
    };
  })
  .filter('limitCharacters200', function () {
    return function (encodedString) {
      if (!encodedString) {
        return '';
      }//if null return
      var strLen = 200;

      if (encodedString.length > strLen) {
        var newStr = encodedString.substring(0, strLen);
        if (newStr.length == strLen) {
          newStr += '...';

        }
        encodedString = newStr;
      }

      return encodedString;
    };
  }).filter('parenFilter',function(){
    return function(encodedString){
      if(encodedString == 0)
        return '';
      return '(' + encodedString + ')';
    }
  })
;
