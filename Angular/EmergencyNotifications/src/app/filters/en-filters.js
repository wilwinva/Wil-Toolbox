'use strict';
angular.module('enApp')
    /**
     * @ngdoc filter
     * @name enApp.filters:trimSpaces
     * @description trimSpaces filter in the enApp.
     */
    .filter('trimSpaces', function () {
      return function (encodedString) {
        if (!encodedString) {
          return '';
        }//if null return
        return encodedString.trim();
      };
    })
    /**
     * @ngdoc filter
     * @name enApp.filters:phone
     * @description phone filter in the enApp.
     */
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
    /**
     * @ngdoc filter
     * @name enApp.filters:validateEmail
     * @description validateEmail filter in the enApp.
     */
    .filter('validateEmail', function () {
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
