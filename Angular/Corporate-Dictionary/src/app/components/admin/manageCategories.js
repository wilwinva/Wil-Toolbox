'use strict';
/**
 * @ngdoc overview
 * @project CADM
 * @name corpDictApp.ManageCategoriesCtrl
 * @description
 * # corpDictApp
 *
 * ManageCategories Ctrl of the application.
 */
angular.module('corpDictApp')
    .controller('ManageCategoriesCtrl', ['$state', '$mdDialog', '$scope', 'ENV', 'dictionaryModel', function ($state, $mdDialog, $scope, ENV, dictionaryModel) {
        var self = this;
        self.addCategory = false;
        self.categoryUsed = false;
        self.categoryObj = {};
        self.newCategory = null;

        dictionaryModel.fetch(ENV.categoryUrl).then(function (data) {
            self.categoryOptions = data;
        });

        self.createNewCategory = function () {
            self.categoryObj.id = 0;
            self.categoryObj.name = self.newCategory;
            self.categoryObj.subCategories = [];
        };

        self.selectedCategory = function (categoryObj) {
            //need to run query in background to look if category.id is being used
            self.categoryUsed = true;
            self.categoryObj = categoryObj;
        };

        self.deleteCategory = function (selectedCategory) {
            return true;
        };

        self.submitCategory = function (addCategory) {
            if (addCategory) {
                //addCategory
                console.log('add category - id:' + self.categoryObj.id + "  name:" + self.categoryObj.name);
            } else {
                //modifyCategory
                console.log('update category - id:' + self.categoryObj.id + "  name:" + self.categoryObj.name);
            }
            return true;
        };
        self.cancel = function () {
            //TODO: need an are you sure alert
            $state.go('home');
        };
    }]);
