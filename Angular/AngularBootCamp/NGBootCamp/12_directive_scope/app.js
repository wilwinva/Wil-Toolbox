angular.module('example', [])
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
