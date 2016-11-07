'use strict';
angular.module('insideApp')
    /**
     * @ngdoc controller
     * @name insideApp.controller:AlphabetSelectCtrl
     * @description
     * # AlphabetSelectCtrl
     * Alphabet Select Controller of the insideApp
     */
    .controller('AlphabetSelectCtrl', ['$state', function ($state) {
      this.data = {
        alphaIndex: null,
        indexOptions: [
          {value: 'a', name: 'A'},
          {value: 'b', name: 'B'},
          {value: 'c', name: 'C'},
          {value: 'd', name: 'D'},
          {value: 'e', name: 'E'},
          {value: 'f', name: 'F'},
          {value: 'g', name: 'G'},
          {value: 'h', name: 'H'},
          {value: 'i', name: 'I'},
          {value: 'j', name: 'J'},
          {value: 'k', name: 'K'},
          {value: 'l', name: 'L'},
          {value: 'm', name: 'M'},
          {value: 'n', name: 'N'},
          {value: 'o', name: 'O'},
          {value: 'p', name: 'P'},
          {value: 'q', name: 'Q'},
          {value: 'r', name: 'R'},
          {value: 's', name: 'S'},
          {value: 't', name: 'T'},
          {value: 'u', name: 'U'},
          {value: 'v', name: 'V'},
          {value: 'w', name: 'W'},
          {value: 'x', name: 'X'},
          {value: 'y', name: 'Y'},
          {value: 'z', name: 'Z'},
          {value: 'other', name: '...'}
        ]
      };
      /**
       * @ngdoc method
       * @name loadIndexPage
       * @methodOf insideApp.controller:AlertsCtrl
       * @description - fire off $state.go passing in object
       */
      this.loadIndexPage = function () {
        $state.go('inside.alphabetIndex', {'letter': this.data.alphaIndex}, { 'reload': false}); // Removed 'location': 'replace'
      }
    }])
;
