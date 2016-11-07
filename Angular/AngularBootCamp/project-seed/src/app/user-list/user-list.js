angular.module('ps.user-list', [
  'ui.router',
  'ps.models.users'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('userList', {
        url: '/users',

        views: {
          'content@': {
            templateUrl: 'user-list/user-list.tpl.html',
            controller: 'UserListCtrl as userList'
          },
          'footer@': {
            template: 'the footer is changed.'
          }
        }
      })
  })

  .controller('UserListCtrl', function UserListCtrl(usersModel) {
    var userList = this;

    usersModel.fetchUsers().then(function(users) {
      userList.users = users;
    });
  })

;