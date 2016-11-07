'use strict';

angular.module('insideApp')
    /**
     * @ngdoc controller
     * @name insideApp.controller:UserCtrl
     * @description
     * # UserCtrl
     * User Controller of the insideApp
     */
    .controller('UserCtrl', ['sapleModel', 'user', function (sapleModel, userData) {
        var self = this;

        self.snl_id = userData.snl_id;
        self.userFirstName = userData.first_name;
        self.userLastName = userData.last_name;

        //retrieve the user's badge photo based on their snl_id (won't have snl_id if user ws call failed)
        /*if(self.snl_id) {
            sapleModel.fetchResultsBySnlId(self.snl_id).then(function (response) {
                if ((response.result && response.result.length == 1)) { // there should only be one result
                    self.userBadgePhoto = response.result[0].misc.badgephoto.value;
                }
                else {
                    self.userBadgePhoto = '';
                }
            }, function (reason) {
                console.error('Error retrieving badge photo: ' + reason.error);
                self.error = true;
            });
        }*/
    }]);
