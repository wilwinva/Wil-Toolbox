'use strict';

/**
 * @ngdoc overview
 * @name searchResultsApp
 * @description
 * # searchResultsApp
 *
 * Main module of the application.
 */
angular
  .module('searchResultsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngAria',
    'searchResultsApp.config.constants',
    'searchResultsApp.models',
    'smiCommon',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to the main page
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: '/',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('home.search_box', {
        url: '?admin',
        views: {
          '@': {
            templateUrl: 'app/searchBox/home.tpl.html'
          },
          'search_box@home.search_box': {
            templateUrl: 'app/searchBox/searchBox.tpl.html',
            controller: 'SearchBoxCtrl as searchBox'
          }
        },
        resolve: {
          admin: ['$stateParams', function ($stateParams) {
            return $stateParams.admin;
          }]
        }
      })
      .state('searchResults', {
        url: '/results?topic?terms?pageBegin?numResults?currentPage?resourceType?parentSearchId?admin',
        resolve: {
          results: ['searchModel', '$stateParams', '$rootScope', function (searchModel, $stateParams, $rootScope) {
            $rootScope.searching = true;
            return searchModel.fetchResults($stateParams.topic, $stateParams.terms, $stateParams.pageBegin, $stateParams.numResults, $stateParams.resourceType, $stateParams.parentSearchId);
          }],
          atls: ['atlModel', '$stateParams', function (atlModel, $stateParams) {
            return atlModel.fetchAtls($stateParams.terms);
          }],
          saple: ['sapleModel', '$stateParams', function (sapleModel, $stateParams) {
            return sapleModel.fetchResults($stateParams.terms);
          }],
          queryTerm: ['$stateParams', function ($stateParams) {
            return $stateParams.terms;
          }],
          queryType: ['$stateParams', function ($stateParams) {
            return $stateParams.topic;
          }],
          resourceType: ['$stateParams', function ($stateParams) {
            return $stateParams.resourceType;
          }],
          pageBegin: ['$stateParams', function ($stateParams) {
            return $stateParams.pageBegin;
          }],
          numResults: ['$stateParams', function ($stateParams) {
            return $stateParams.numResults;
          }],
          currentPage: ['$stateParams', function ($stateParams) {
            return $stateParams.currentPage;
          }],
          parentSearchId: ['$stateParams', function ($stateParams) { //TODO: Adam is this being used?
            return $stateParams.parentSearchId;
          }],
          admin: ['$stateParams', function ($stateParams) {
            return $stateParams.admin;
          }],
          $title: ['$stateParams', function ($stateParams) {
            return $stateParams.terms;
          }]
        },
        views: {
          '@': {
            templateUrl: 'app/searchResults/searchResults.tpl.html', //'<smi-search-results results="searchResults.searchResultsContent" searching="searchResults.searching"> </smi-search-results>',
            controller: 'SearchResultsCtrl as searchResults'
          },
          'search_box@searchResults': {
            templateUrl: 'app/searchBox/searchBox.tpl.html',
            controller: 'SearchBoxCtrl as searchBox'
          }
        }
      })
      .state('notFound', {
        url: '/NotFound',
        templateUrl: 'app/404.html'
      })
      .state('notAuthorized', {
        url: '/NotAuthorized',
        templateUrl: 'app/403.html'
      })
      .state('error', {
        url: '/Error',
        templateUrl: 'app/500.html'
      })
      .state('otherwise', {
        templateUrl: 'app/404.html'
      });
  })
  .run(['$rootScope', '$timeout', '$window', '$location', '$state', function ($rootScope, $timeout, $window, $location, $state) {
      $rootScope.$on('$stateChangeSuccess', function () {
        var title = getTitleValue($state.$current.locals.globals.$title);
        $timeout(function () {
          $rootScope.$title = title;
        });
      });

      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error.error === '500') {
          $state.go('error');
        }
      });

      /*$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

       $rootScope.title = "hi this is the title now";//current.$$route.title;
       if (current.hasOwnProperty('$$route')) {

       $rootScope.title = "hi this is the title now";//current.$$route.title;
       }
       });

      $rootScope.title = "hi this is the title now";//current.$$route.title;
      if (current.hasOwnProperty('$$route')) {
        console.info("setting the title to be something");
        $rootScope.title = "hi this is the title now";//current.$$route.title;
       $rootScope.$on('$locationChangeSuccess', function () {
       if ($rootScope.previousLocation == $location.path()) {
       console.log("*****Back Button Pressed");
       }
       $rootScope.previousLocation = $rootScope.actualLocation;
       $rootScope.actualLocation = $location.path();
       });*/

      function getTitleValue(title) {
        return angular.isFunction(title) ? title() : title;
      }

    }]
  );
