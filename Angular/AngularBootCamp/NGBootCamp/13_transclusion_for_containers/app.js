angular.module('example', [])

  .directive('donut', function() {
    return {
      restrict: 'E',
      scope: {
        flavor: '@',
        toppings: '='
      },
      templateUrl: 'donut.html'
    }
  })

  .directive('grayBox', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      template: '<div class="well" ng-transclude></div>'
    }; // directive definition object
  })
  .directive('book', function() {
    return {
      restrict: 'E',
      scope: {
        title: '@',
        author: '=',
        action: '&'
      },
      templateUrl: 'book.tpl.html'
    }; // directive definition object (DDO)
  })
  .controller('AppCtrl', function AppCtrl() {
    var app = this;

    app.reviewBook = function(title) {
      console.log(title + ' is horrible.')
    };

    app.trashBook = function(title) {
      console.log(title + ' is in the trash.')
    };

    app.books = [
      {
        title: 'Green Eggs and Ham',
        author: {
          firstName: 'Dr.',
          lastName: 'Suess'
        }
      },
      {
        title: 'Foundation',
        author: {
          firstName: 'Issac',
          lastName: 'Asimov'
        }
      }
    ]

  })

;
