'use strict';

angular.module('enApp')
    /**
     * @ngdoc controller
     * @name enApp.controller:UserCtrl
     * @description
     * # UserCtrl
     * User Controller of the enApp
     */
    .controller('UserCtrl', ['user', function (userData) {
        var self = this;

        self.snl_id = userData.snl_id;
        self.userFirstName = userData.first_name;
        self.userLastName = userData.last_name;
    }]);
