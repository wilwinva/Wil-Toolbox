'use strict';

/**
 * @ngdoc filter
 * @name searchResultsApp.filter:phone
 * @function
 * @description
 * # phone
 * Filter in the searchResultsApp.
 */
angular.module('searchResultsApp')
  .filter('phone', function () {
    return function (phone) {
      if (!phone) {
        return '';
      }//if null return

      phone = phone.trim();//trim any leading/trailing spaces
      if (phone.match(/[^0-9]/)) {//if any characters other than numbers return
        return phone;
      }
      var city, number;
      city = phone.slice(0, 3);//split out areacode
      number = phone.slice(3);//split out phonenumber
      number = number.slice(0, 3) + '-' + number.slice(3);//add dash

      return ("(" + city + ") " + number).trim();//build number and return
    };
  })
;
