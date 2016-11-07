'use strict';

/**
 * @ngdoc overview
 * @project MBE
 * @name mbeApp
 * @description
 * # mbeApp
 *
 * Main module of the application.
 */
angular
    .module('mbeApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ui.router',
      'ngSanitize',
      'ngTouch',
      'ngAria',
      'mbeApp.config.constants'
    ])
    .run(['$rootScope', '$timeout', '$window', '$location', '$state', '$stateParams',
      function ($rootScope, $timeout, $window, $location, $state) {
        $rootScope.angular = angular;
      }
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$sceDelegateProvider', '$locationProvider', 'ENV',
      function ($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider, $locationProvider, ENV) {
        $httpProvider.defaults.withCredentials = true; // Allow cookies with ajax

        // For any unmatched url, redirect to the home page
        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'app/components/views/home.tpl.html'
            ,controller: 'HomeCtrl as homeCtrl'
          });
      }
    ])
;
