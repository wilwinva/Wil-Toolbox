'use strict';

/**
 * @ngdoc filter
 * @name searchResultsApp.filter:vacationBalances
 * @function
 * @description
 * # vacationBalances
 * Filter in the searchResultsApp.
 */
angular.module('searchResultsApp')
  .filter('formatVacationBalances', function () {
    return function (description) {
      if (!description) {
        return;
      }//if null return

      var balances = "{" + description.slice(description.indexOf("vacation:")) + "}";//split balances from the rest of the trash
      eval('description=' + balances);//assign balances to description via eval

      return description;
    };
  })
;
