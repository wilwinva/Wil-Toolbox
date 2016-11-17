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

      self.isAdmin = true;
      self.isESH = false;

      self.statusOptions = [{value: 'N', option: 'Active'},
        {value: 'Y', option: 'Inactive'},
        {value: '', option: 'Any Status'}];

      dictionaryModel.fetch(ENV.categoryUrl).then(function (data) {
        self.categoryOptions = data;
        self.subCategoryOptions = self.categoryOptions[1].subCategories;
      });

      self.categorySelected = function () {
        if (self.search.category.name === 'ES&H') {
          self.isESH = true;
        }
        else {
          self.isESH = false;
        }
      };


      self.loadFilteredResults = function () {
        if (self.search.text.length > 0) {
//          console.log('calling search ws with filter: ' + self.search.text + ' searching Term: ' + self.search.term + ' searching definition: ' + self.search.definition + ' searching id: ' + self.search.id);
          dictionaryModel.fetchFilteredTerms(self.search.text).then(function (data) {
            self.terms = data.results;
//            console.log('loadFilteredResults'+JSON.stringify(self.terms.length));
//              self.queryText = data.q;
            self.queryText = self.search.text;
          });
        }
      };


      self.filterTerms = function (element) {
        function getCats(element, obj) {
          // grep will return an array of items containing the match (if the json's "categories" array contains the select box value.
          var temp = $.grep(element.categories, function (n) {
            return n.name === self.search.category.name;
          });

          // If the grepped array is larger than 0, it found a match.
          if (temp.length > 0) {
            // If obj, we're passing a search term or definition too. If it matches along with the cat, return it.
            if (obj) {
              if (obj.toLowerCase().indexOf(self.search.text.toLocaleLowerCase()) !== -1) {
                return true;
              }
              else { // otherwise, dump it.
                return false;
              }
            }
            else { // We're not passing a search term.  Return the element that has a matching cat.
              return true;
            }
          }
          // Otherwise, the array was empty - grep found no matches.
          return false;
        }

//        console.log('calling filterTerms with: ' + self.search.text + ' searching Term: ' + self.search.term + ' searching definition: ' + self.search.definition + ' searching id: ' + self.search.id + '  element.id:' + element.id);
//        return true;
        if (!self.search) {
          return true;
        }
        var searchText = self.search.text;
        /*if ((!searchText || angular.isUndefined(items) || '' === searchText || (typeof(items) === "undefined")) && !search.category) {
         //                return items; // No filtering.  Get out of here with all the results.
         return true; // No filtering.  Get out of here with all the results.
         }*/

        var addToList = false;
        // Dump items based on status (if chosen).
        /*        if (self.search.active && self.search.active.value && self.search.active.value !== '' && element.deleteFlag !== self.search.active.value) {
         return false;
         }*/
        var searchTextLength = searchText.length;
        var searchLowerCased = self.search.text.toLocaleLowerCase();
        var searchTerm = element.term.toLowerCase().indexOf(searchLowerCased);
        var definitionTerm = element.definition.toLowerCase().indexOf(searchLowerCased);
         var acronymTerm;
         if (element.acronym && typeof(element.acronym) !== "undefined") {
         acronymTerm = element.acronym.toLowerCase().indexOf(searchLowerCased);
         }
        //var acronymTerm = element.acronym.toLowerCase().indexOf(searchLowerCased);
        //console.log('in filterTerms with: searchTerm: ' + searchTerm + ' acronymTerm: ' + acronymTerm + ' definitionTerm: ' + definitionTerm);

        if (searchTextLength > 0) {
          // If checkbox "term" is checked AND there is a search value AND and it appears in the json's "term"
          if (self.search.term && searchTerm >= 0) {
            //console.log('in search.term: ' + element.id);
            addToList = true;
          } else if (self.search.acronym && acronymTerm >= 0) {
            // If checkbox "acronym" is checked AND there is a search value AND and it appears in the json's "acronym"
            //console.log('in search.acronym: ' + element.id);
            addToList = true;
          } else if (self.search.definition && definitionTerm >= 0) {
            // For definition checkbox
            //console.log('in search.definition: ' + element.id);
            addToList = true;
          } else if (self.search.id && element.id.indexOf(self.search.text) !== -1) {
            // For id checkbox
            //console.log('in search.id: ' + element.id);
            addToList = true;
          }
          if (self.search.category && addToList) {
            addToList = getCats(element);
          }
//          if (self.search.active && self.search.active.value && self.search.active.value !== '' && element.deleteFlag !== self.search.active.value) {
          if (self.search.active && self.search.active.value !== '' && element.deleteFlag !== self.search.active.value) {
            addToList = false;
          }

          /*
           // No text in the search box, but a category has been selected from the dropdown.
           if (search.category && (typeof(searchText) === "undefined" || searchText === "")) {
           console.log('in search.category');
           return getCats(element);
           }
           */
        }
        return addToList;
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
        var $evTarget = $(ev.target);
        var helpText = '';
        if ($evTarget.data('title')) {
          helpText = $evTarget.data('title');
        } else {
          helpText = $evTarget.attr('title');
        }
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

