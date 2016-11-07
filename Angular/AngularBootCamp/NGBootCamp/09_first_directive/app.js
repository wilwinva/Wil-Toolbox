angular.module('example', [])
  .controller('AppCtrl', function AppCtrl() {

  })
  .directive('first', function() {
    console.log('test')
    return function postLink() {
      console.log('I am a very lame directive.')
    }
  })
;
