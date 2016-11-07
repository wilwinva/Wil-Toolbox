'use strict';
angular.module('insideApp')
    /**
     * @ngdoc filter
     * @name insideApp.filters:decode
     * @description decode filter in the insideApp.
     */
    .filter('decode', function () {
      return function (encodedString) {
        if (!encodedString) {
          return '';
        }//if null return
        return decodeURIComponent(encodedString);
      }
    })
    /**
     * @ngdoc filter
     * @name insideApp.filters:replaceSpaces
     * @description replaceSpaces filter in the insideApp.
     */
    .filter('replaceSpaces', function () {
      return function (encodedString) {
        if (!encodedString) {
          return '';
        }//if null return
        return encodedString.replace(/([+])/g, ' ');
      };
    })
    /**
     * @ngdoc filter
     * @name insideApp.filters:trimSpaces
     * @description trimSpaces filter in the insideApp.
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
     * @name insideApp.filters:limitCharacters
     * @description limitCharacters filter in the insideApp.
     */
    .filter('limitCharacters', function () {
      return function (encodedString, error) {
        if (!encodedString) {
          return '';
        }//if null return
        var strLen = 240;
        if (error==null && encodedString.length > strLen) {
          var newStr = encodedString.substring(0, strLen);
          if (newStr.length == strLen) {
            newStr += "...";
          }
          encodedString = newStr;
        }
        return encodedString;
      };
    })
    /**
     * @ngdoc filter
     * @name insideApp.filters:html
     * @description html filter in the insideApp.
     */
    .filter('html', function ($sce) {
      return function (val) {
        return $sce.trustAsHtml(val);
      };
    })
    /**
     * @ngdoc filter
     * @name insideApp.filters:phone
     * @description phone filter in the insideApp.
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
     * @name insideApp.filters:stripImageFromTeasersATL
     * @description stripImageFromTeasersATL filter in the insideApp.
     */
    .filter('stripImageFromTeasersATL', function () {
      return function (description) {
        if (!description) {
          return;
        }//if null return

        var fromHere = description.indexOf('<img src=');
        description = description.substr(fromHere);//remove first bit of text
        var toHere = description.indexOf('>') + 1;//find first closing >
        description = description.substr(0, toHere);//remove the last bit

        return description;
      };
    })
    /**
     * @ngdoc filter
     * @name insideApp.filters:createDateFromString
     * @description createDateFromString filter in the insideApp.
     */
    .filter('createDateFromString', function () {
      return function (theDate) {
        if (!theDate) {
          return;
        }//if null return
        var newDate = new Date(theDate)
        return newDate;
      };
    })
    /**
     * @ngdoc filter
     * @name insideApp.filters:reformatDate
     * @description reformatDate filter in the insideApp.
     */
    .filter('reformatDate', function () {
      return function (theDate) {
        if (!theDate) {
          return;
        }//if null return
        return new Date(theDate);
      };
    })
    /**
     * @ngdoc filter
     * @name insideApp.filters:http2https
     * @description http2https filter in the insideApp.
     */
    .filter('http2https', function () {
      return function (theUrl) {
        if (!theUrl) {
          return;
        }//if null return
        if (theUrl.indexOf('https:') == -1) {
          theUrl = theUrl.replace('http:', 'https:');
        }
        return theUrl;
      };
    })
    /**
     * @ngdoc filter
     * @name insideApp.filters:validateSapleEmail
     * @description validateSapleEmail filter in the insideApp.
     */
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
    /**
     * @ngdoc filter
     * @name insideApp.filters:validateMyLinkText
     * @description validateMyLinkText filter in the insideApp.
     */
    .filter('validateMyLinkText', function () {
      var returnValue = false;
      return function (linkText) {
        if (!linkText) {
          return false;
        }//if null return
        if (linkText.match(/[^\w\s\(\)\-\&\']/)) {
          alert('Illegal character found./r/t ')
          return true;
        }
        return false;
      };
    })
;
