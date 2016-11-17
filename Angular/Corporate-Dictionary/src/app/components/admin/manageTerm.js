'use strict';
/**
 * @ngdoc overview
 * @project CADM
 * @name corpDictApp
 * @description
 * # corpDictApp
 *
 * Main module of the application.
 */
angular.module('corpDictApp')
    .controller('ManageTermCtrl', ['$state', '$mdDialog', '$scope', 'ENV', 'dictionaryModel', function ($state, $mdDialog, $scope, ENV, dictionaryModel) {
      var self = this;
        self.rteOptions = {
          height: 150,
            focus: true,
            toolbar: [
              ['edit', ['undo', 'redo']],
              ['headline', ['bold', 'italic', 'underline', 'clear']],
              ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'hr']],
              ['view', ['codeview']]
            ]
        };
      self.initEditor = function () {
        $('.dropdown-toggle').dropdown();
        $('.note-btn, .note-editable').attr('tabindex', -1);
      };

      //Populate dropdowns
      self.statusOptions = [{value: 'N', option: 'Active'},
        {value: 'Y', option: 'Inactive'},
        {value: '', option: 'Any Status'}];

      dictionaryModel.fetch(ENV.categoryUrl).then(function (data) {
        self.categoryOptions = data;
      });

      // TODO: these will be retrieved from the WS call for editing a term
      if ($state.params.action === 'update') {
        self.data = angular.copy($state.params.data);
        self.isUpdate = true;
        self.isAcronym = self.data.acronym ? true : false;
      }
      else {
        self.isUpdate = false;
        self.data = {};
        //self.data.id = 9402; //TODO: will be retrieved from insert
        self.data.acronym = '';
        self.data.term = '';
        self.data.definition = '';
        self.data.categories = [];
        self.data.relatedTerms = [];

        self.data.deleteFlag = "N"; //new terms default to active
        self.data.supersededByTerm = {'id': '', 'term': ''};
        self.data.updateReason = '';

        self.pageType = $state.params.type;
        self.isAcronym = self.pageType === 'acronym';
        console.log("Is acronym: " + self.isAcronym + " self.pageType " + self.pageType);
      }

      self.termTitle = self.isAcronym ? 'Full-name' : 'Term';

      //methods for category list
      //self.categoryOptions
      self.removeCategory = function (index) {
        self.data.categories.splice(index, 1);
      };

      self.addCategory = function (selectedCategory) {
        var found = -1;
        var count = self.data.categories.length;
        for (var a = 0; a < count; a++) {
          var category = self.data.categories[a];
          if (category.name === selectedCategory.name) {
            found = a;
            break;
          }
        }
        if (found === -1) {
          self.data.categories.push(selectedCategory);
        }
      };

      self.inList = function (id) {
        var position = -1;
        var len = self.data.relatedTerms.length;
        for (var a = 0; a < len; a++) {
          var relatedTerm = self.data.relatedTerms[a];
          if (relatedTerm.id === id) {
            position = a;
            break;
          }
        }
        return position;
      };

      self.removeTerm = function (termGroup) {
        var thisID = termGroup.id;
        var position = self.inList(thisID);
        if (position !== -1) {//found now remove
          self.data.relatedTerms.splice(position, 1);
        }
      };

      //action buttons
      self.submitChange = function () {

        if (!self.isUpdate || (self.isUpdate && !angular.equals(self.data, $state.params.data))) {
            self.data.isUpdate = (self.isUpdate) ? "true" : "false";
            dictionaryModel.postTerm(self.data, $state.params.data).then(function (result) {
            $state.go('home', {
              'id': result.data.id
            });
          });
        }
        else {
          console.log('Submit button pressed but no changes were made');
          //TODO: Where to go when this happens. Probably when editing and clicking submit
        }

      };
      self.cancel = function () {
        //TODO: need an are you sure alert
        $state.go('home');
      };

      self.popupHistoryDialog = function (ev) {
        console.log('history clicked');
        $mdDialog.show({
          clickOutsideToClose: false,
          parent: angular.element(document.body),
          targetEvent: ev,
          escapeToClose: true,
          templateUrl: 'app/components/admin/historyModal.tpl.html',
          controller: function ($scope, $mdDialog) {
            var w = this;
            w.data = {};
            w.data = self.data;
            $scope.cancel = function () {
              $mdDialog.cancel();
            };
          },
          controllerAs: 'ctrl'
        });

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

      //manage definitions/acronyms
      self.validated = false;
      self.validate = function () {
        if (self.isAcronym) {
          if (self.data.acronym != "" && self.data.term != "" && self.data.categories.length != 0) {
            self.validated = true;
          }
        } else {
          if (self.data.term != "" && self.data.definition != "" && self.data.categories.length != 0) {
            self.validated = true;
          }
        }
      };

      //Change report variables.
      self.recordquery = {};
      self.queryresults = [];

    }]);

