angular.module('ps.models.users', [
  "project-seed.config.constants"
])
  .service('usersModel', function UsersModel($http, baseApiUrl) {
    var usersModel = this,
      rootEntity = '/users';

    usersModel.fetchUser = function(username) {
      var url = baseApiUrl + rootEntity + '/' + username;

      return $http.get(url).then(function (results) {
       return results.data;
      });
    };

    usersModel.fetchUsers = function() {
      // fetchUsers returns a PROMISE
      return $http.get(baseApiUrl+ rootEntity)
        .then(function successHandler(results) {
          usersModel.users = results.data;
          return usersModel.users;
        });
    }
  })
;