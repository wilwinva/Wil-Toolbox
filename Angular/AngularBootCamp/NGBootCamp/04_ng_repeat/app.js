angular.module('example', [])
  .controller('AppCtrl', function AppCtrl() {
    var app = this;

    app.people = [
      {
        firstName: 'Mary'
      },
      {
        firstName: 'Anita'
      },
      {
        firstName: 'Wilson'
      },
      {
        firstName: 'Hector'
      },
      {
        firstName: 'Bob'
      }
    ]

  })
;
