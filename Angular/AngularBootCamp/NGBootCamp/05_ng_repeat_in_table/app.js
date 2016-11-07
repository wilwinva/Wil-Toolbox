angular.module('example', [])
  .controller('AppCtrl', function AppCtrl() {
    var app = this;

    app.people = [
      {
        firstName: 'Mary',
        lastName: 'Higgins',
        job: 'Programmer'
      },
      {
        firstName: 'Anita',
        lastName: 'Rayman',
        job: 'Civil Engineer'
      },
      {
        firstName: 'Wilson',
        lastName: 'Johnson',
        job: 'Painter'
      },
      {
        firstName: 'Hector',
        lastName: 'Grolumpus',
        job: 'Dishwasher'
      },
      {
        firstName: 'Bob',
        lastName: 'McDonald',
        job: 'Unemployed'
      }
    ]

  })
;
