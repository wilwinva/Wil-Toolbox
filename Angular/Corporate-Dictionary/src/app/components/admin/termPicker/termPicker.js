'use strict';

/**
 * @ngdoc directive
 * @name corpDictApp.component:termPicker
 * @function
 * @description
 * # termPicker
 * Term Picker for the corpDictApp.
 */

angular.module('corpDictApp')
    .directive('termPicker', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                multiSelect: '=',
                parentId: '=',
                selected: '='
            },
            templateUrl: 'app/components/admin/termPicker/termPicker.tpl.html',
            controller: 'TermPickerCtrl as ctrl'
        };
    })
    .controller('TermPickerCtrl', ['$scope', 'ENV', 'dictionaryModel', function ($scope, ENV, dictionaryModel) {
        var self = this;

        //pagination vars for related term list
        self.pageSize = 5;
        self.pageOptions = ['5', '10', '25'];
        self.terms = [];
        self.numRecords = 0;
        self.sortKey = 'termID';
        self.reverse = false;

        self.closeModal = function () {
            $scope.parentId = false; //close the modal
        }

        self.inList = function (id) {
            var position = -1;
            var len = $scope.selected.length;
            for (var a = 0; a < len; a++) {
                var relatedTerm = $scope.selected[a];
                if (relatedTerm.id === id) {
                    position = a;
                    break;
                }
            }
            return position;
        };

        self.updateMultiSelect = function (termGroup) {
            var thisID = termGroup.id;
            var position = self.inList(thisID);
            if (position !== -1) {//found now remove
                $scope.selected.splice(position, 1);
            } else {//not found now add
                console.log('adding related term: ' + termGroup.id + ' ' + termGroup.term);
                $scope.selected.push(termGroup);
            }
        };

        self.updateSingleSelect = function (obj) {
            $scope.selected = obj;
            self.closeModal();
        };

        self.loadFilteredResults = function () {
            dictionaryModel.fetchFilteredTerms(ENV.termByFilterUrl).then(function (data) {
                self.terms = data.results;
                self.numRecords = self.terms.length;
            });
        };

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
