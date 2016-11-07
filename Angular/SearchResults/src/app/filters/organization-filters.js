'use strict';

/**
 * @ngdoc filter
 * @name searchResultsApp.filter:organization
 * @function
 * @description
 * # organization
 * Filter in the searchResultsApp.
 */
angular.module('searchResultsApp')
  .filter('orgCode', function () {
    return function (description) {
      if (!description) {
        return '';
      }//if null return

      var fromHere = description.lastIndexOf('+') + 1;
      description = description.slice(fromHere);//split out orgnumber
      description = description.replace(".", "");

      return description;
    };
  })
  .filter('validateSapleEmail', function () {
    var returnValue = false;
    return function (theEmail) {
      if (!theEmail) {
        return false;
      }//if null return
      if (theEmail.indexOf('@sandia.gov') != -1) {
        return true;
      }
      return false;
    };
  })

;
