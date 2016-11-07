'use strict';
/**
 * @ngdoc controller
 * @name mbeApp.controller:HomeCtrl
 * @description Home Methods
 */
angular.module('mbeApp')
    .controller('HomeCtrl', ['$anchorScroll', function ($anchorScroll) {
      var self = this;
      self.scrollToSection = function(section){
        console.log('scrolling to ' + section);
        $anchorScroll(section);
      }
    }])
;
