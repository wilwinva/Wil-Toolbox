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
    .controller('ViewTermsCtrl', ['$state', 'ENV', '$mdDialog', 'dictionaryModel', 'searchTerm', function ($state, ENV, $mdDialog, dictionaryModel, searchTerm) {
        var self = this;
        self.statusOptions = [{value: 'N', option: 'Active'},
            {value: 'Y', option: 'Inactive'},
            {value: '', option: 'Any Status'}];

        dictionaryModel.fetch(ENV.categoryUrl).then(function (data) {
            self.categoryOptions = data;
        });

        self.loadFilteredResults = function () {
            console.log('calling search ws with filter: ' + self.search.text + ' searching Term: ' + self.search.term + ' searching definition: ' + self.search.definition + ' searching id: ' + self.search.id);
            dictionaryModel.fetchFilteredTerms(ENV.termByFilterUrl, self.search.text, self.search.term, self.search.definition, self.search.id).then(function (data) {
                self.terms = data.results;
                self.queryText = data.q;
            });
        };

        self.editTerm = function (data) {
            //console.log("results: " + results);
            $state.go('manageTerm', {data: data, action: 'update'});
        };

        self.search = {
            'term': true,
            'acronym': true,
            'definition': false,
            'id': false,
            'active': self.statusOptions[0]
        };

        if (searchTerm) {
            console.log("searching for term with id " + searchTerm);
            self.search.text = searchTerm;
            self.search.term = false;
            self.search.acronym = false;
            self.search.definition = false;
            self.search.id = true;
            self.loadFilteredResults();
            console.log("searching for term with id " + self.search.text);
        }

        self.popupHelpDialog = function (ev) {
            console.log('help clicked');
            var helpText = $(ev.target).attr('title');
            $mdDialog.show({
                locals: {helpText: helpText},
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

    }])
;

