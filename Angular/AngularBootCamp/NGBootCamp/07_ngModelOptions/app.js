angular.module('example', [])
  .controller('AppCtrl', function AppCtrl($http) {
    var app = this,
      url = 'http://www.json-generator.com/api/json/get/bSjEaaTGiG';

    app.orderBy = 'name';

    app.setOrder = function(newOrder) {
      if(app.orderBy === newOrder) {
        newOrder = '-' + newOrder;
      }
      app.orderBy = newOrder;
      console.log(newOrder)
    };

    $http.get(url).then(function successHandler(results) {
      app.people = results.data;
    });
  })
;
