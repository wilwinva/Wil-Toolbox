'use strict';
angular.module('enApp')
/**
 * @ngdoc controller
 * @name enApp.controller:SysAdminCtrl
 * @description controller for SysAdmin template
 */
    .controller('SysAdminCtrl', function () {
        var self = this;
      self.users = [
        {'name':'Bob Saget','email':'bsaget@sandia.gov','status':'active'},
        {'name':'Mike Miller','email':'mmiller@sandia.gov','status':'active'},
        {'name':'Jaque Strap','email':'jstrap@sandia.gov','status':'active'},
        {'name':'Doit Know','email':'dknow@sandia.gov','status':'inactive'}
      ];
      /**
       * @ngdoc method
       * @name sort
       * @methodOf enApp.controller:SysAdminCtrl
       * @description - sort ascending, decending
       */
      self.sort = function (keyname) {
        if (self.sortKey == keyname) {
          self.reverse = !self.reverse;//if true make it false and visa versa
        } else {
          self.sortKey = keyname;//set the sortkey to the param passed
          self.reverse = false;//if true make it false and visa versa
        }
      };
    });

