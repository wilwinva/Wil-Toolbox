/**
 * Created by aoserra on 11/9/2016.
 */
'use strict';
/**
 * @ngdoc overview
 * @project CADM
 * @name corpDictApp
 * @description
 * # corpDictApp
 *
 * Record View controller
 */
angular.module('corpDictApp')
    .controller('RecordViewCtrl', ['$scope', 'ENV', 'dictionaryModel',
        function ($scope, ENV, dictionaryModel) {
        var self = this;

        //Change report variables.
        self.recordquery = {};
        self.queryresults = [];

          //pagination vars for related term list
          self.pageSize = 5;
          self.pageOptions = ['5', '10', '25'];
          self.numRecords = 10;
          self.sortKey = 'term_name';
          self.reverse = false;

          /**
           * @ngdoc method
           * @name sort
           * @methodOf insideApp.controller:ApiCtrl
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


        }]);
