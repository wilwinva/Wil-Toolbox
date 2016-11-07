'use strict';

/**
 * @ngdoc directive
 * @name corpDictApp.directive:snlAdminActions
 * @description
 * # snlAdminActions
 */
angular.module('corpDictApp')
    .directive('snlAdminActions', function () {
      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/admin/actions/adminActions.tpl.html',
        controller: 'AdminCtrl as ctrl'
      };
    })
    .controller('AdminCtrl', ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
      var self = this;
      self.template = "";

      self.actionSelected = function () {
        if (self.template === 'definition') {
          console.log("Going to definition " + self.template);
          $state.go('manageTerm', {type: 'definition', action: 'create', data: {}}, {reload: true});
        }
        else if (self.template === 'acronym') {
          console.log("Going to acronym " + self.template);
          $state.go('manageTerm', {type: 'acronym', action: 'create', data: {}}, {reload: true});
        }
        else if (self.template === 'categories') {
          $state.go('manageCategories', {}, {reload: true});
        }
      };
      self.popupHelpDialog = function (ev) {
        console.log('help clicked');
        var helpText = $(ev.target).attr('title');
        $mdDialog.show({
          locals: {helpText: $(ev.target).attr('title')},
          clickOutsideToClose: false,
          parent: angular.element(document.body),
          targetEvent: ev,
          escapeToClose: true,
          templateUrl: 'app/components/admin/helpModal.tpl.html',
          controller: function ($scope, $mdDialog, helpText) {
            var w = this;
            w.data = {};
            w.data = self.data;
            w.helpText = helpText;
            $scope.cancel = function () {
              $mdDialog.cancel();
            };

          },
          controllerAs: 'ctrl'
        });
      };

    }]);
