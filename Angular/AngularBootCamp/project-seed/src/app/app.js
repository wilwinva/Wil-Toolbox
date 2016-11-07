angular.module('project-seed', [
  'ui.router',
  'ps.user-profile',
  'ps.user-list',
  'project-seed.common',
  'ngAria',
  'angularMoment',
  'templates-app'
])
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('users');
  })
  .controller('AppCtrl', function() {
    var app = this;
  })
;