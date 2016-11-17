'use strict';

/**
 * @ngdoc overview
 * @project CADM
 * @name corpDictApp
 * @description
 * # corpDictApp
 *
 * Main module of the application.
 */
angular
    .module('corpDictApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'LocalStorageModule',
        'ui.router',
        'ngSanitize',
        'ngAria',
        'ngMaterial',
        'ngMessages',
      /*'froala',*/
        /*'material.svgAssetsCache',*/
        'corpDictApp.config.constants',
      'angularUtils.directives.dirPagination',
      'summernote'
    ])
    .value('froalaConfig', {
        toolbarInline: false,
        placeholderText: 'Enter Text Here'
    })
    .run(['$rootScope', '$state', 'localStorageService',
        function ($rootScope, $state, localStorageService) {
            $rootScope.angular = angular;

            /*$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
                var prefix = "stateParams.";
                var fromStateName = prefix + fromState.name;
                var toStateName = prefix + toState.name;
                var f = true;
                for (var k in toState.params) {
                    f = f && (JSON.stringify(toParams[k]) == JSON.stringify(toState.params[k]));
                }
                if (f && localStorageService.get(toStateName) != null) {
                    event.preventDefault();
                    var savedToParams = localStorageService.get(toStateName); //retrieving toParams from local storage
                    localStorageService.remove(toStateName);
                    for (var k in toState.params) {
                        toParams[k] = savedToParams[k]; //update only the params {} not url params
                    }
                    $state.transitionTo(toState, angular.extend(toParams, {stateChangeStart_reenter: true}));
                } else {
                    var toSave = {};
                    for (var k in toState.params) {
                        toSave[k] = toParams[k]; //save only the params {} not url params
                    }
                    localStorageService.set(toStateName, toSave);
                }
            });*/
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$sceDelegateProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider, $locationProvider) {
            $httpProvider.defaults.withCredentials = true; // Allow cookies with ajax

            // For any unmatched url, redirect to the home page
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/?id',
                    templateUrl: 'app/components/viewTerms.tpl.html',
                    controller: 'ViewTermsCtrl as ctrl',
                    resolve: {
                        searchTerm: ['$stateParams', function ($stateParams) {
                            return $stateParams.id;
                        }]
                    }
                })
                .state('manageTerm', {
                    url: '/manageTerm',
                    params: {
                        data: {},
                        action: 'create',
                        type: 'definition'
                    },
                    templateUrl: 'app/components/admin/manageTerm.tpl.html',
                    controller: 'ManageTermCtrl as ctrl'
                })
                .state('manageCategories', {
                    url: '/manageCategories',
                    templateUrl: 'app/components/admin/manageCategories.tpl.html',
                    controller: 'ManageCategoriesCtrl as ctrl'
                })
                .state('createChangeReport', {
                    url: '/createChangeReport',
                    templateUrl: 'app/components/report/createChangeReport.tpl.html',
                    controller: 'RecordViewCtrl as ctrl'
                })
                .state('createHistoryReport', {
                    url: '/createHistoryReport',
                    templateUrl: 'app/components/report/createHistoryReport.tpl.html',
                    controller: 'RecordViewCtrl as ctrl'
                })
                .state('createTermByDateReport', {
                    url: '/createTermByDateReport',
                    templateUrl: 'app/components/report/createTermByDateReport.tpl.html',
                    controller: 'RecordViewCtrl as ctrl'
                })
                .state('createReviewSpreadsheet', {
                    url: '/createReviewSpreadsheet',
                    templateUrl: 'app/components/report/createReviewSpreadsheet.tpl.html',
                    controller: 'RecordViewCtrl as ctrl'
                });
        }
    ])
;
