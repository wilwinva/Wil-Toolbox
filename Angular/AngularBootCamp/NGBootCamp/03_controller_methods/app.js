angular.module('example', [])
  .controller('AppCtrl', function AppCtrl() {
    var app = this;

    app.name = "Jim";

    app.submit = function(name) {
      console.log(name);
      app.name = name;
    }
  })
;
