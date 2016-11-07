angular.module('ps.user-profile', [
  'ui.router'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('userProfile', {
        url: '/users/:username',
        views: {
          'content@': {
            templateUrl: 'user-profile/user-profile.tpl.html',
            controller: 'UserProfileCtrl as userProfile'
          }
        }
      })
  })
  .controller('UserProfileCtrl', function UserProfileCtrl($stateParams, usersModel) {
    var userProfile = this;

    usersModel.fetchUser($stateParams.username).then(function(user) {
      userProfile.user =  user;
    });
  })
;