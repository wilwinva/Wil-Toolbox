'use strict';

/**
 * @ngdoc overview
 * @project Angular Project Seed
 * @name enApp
 * @description
 * # enApp
 *
 * Main module of the application.
 */
angular
    .module('enApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'ngAria',
        'enApp.config.constants'
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
                    abstract: true,
                    template: '<ui-view/>',
                    controller: 'UserCtrl as userCtrl',
                    resolve: {
                        user: ['$q', '$interval', '$cookies', 'insideApiModel', 'ENV', 'API_URL',
                            function ($q, $interval, $cookies, insideApiModel, ENV, API_URL) {
                                return insideApiModel.fetch(API_URL.user).then(function (data) {
                                    console.log('logged in user retrieved ' + data.userid);
                                    insideApiModel.storeCookies(data);
                                    return data;
                                }, function () {
                                    console.log('error retrieving logged in user')
                                    insideApiModel.storeCookies(DEFAULT_USER_DATA);
                                    return DEFAULT_USER_DATA;
                                });
                            }]
                    }
                })
                .state('home.subscribe', {
                    url: '',
                    templateUrl: 'app/components/subscribe.tpl.html',
                    controller: 'SubscriptionCtrl as ctrl'
                })
                .state('home.confirmation', {
                    url: 'confirmation',
                    templateUrl: 'app/components/confirmation.tpl.html',
                    controller: 'ConfirmationCtrl as ctrl',
                    resolve: {
                        confirmation: ['user', function (user) { return;
                        }]
                    }
                })
                .state('home.manage', {
                    url: 'manage',
                    templateUrl: 'app/components/manageSubscription.tpl.html',
                    controller: 'ManageCtrl as ctrl',
                    resolve: {
                        manage: ['user', function (user) { return;
                        }]
                    }
                })
                .state('home.sysAdmin', {
                    url: 'admin/system',
                    templateUrl: 'app/components/sysAdmin.tpl.html',
                    controller: 'SysAdminCtrl as ctrl'
                })
                .state('home.contentAdmin', {
                    url: 'admin/content',
                    templateUrl: 'app/components/contentAdmin.tpl.html',
                    controller: 'ContentAdminCtrl as ctrl'
                })
        }
    ])
    .constant('API_URL', {
        publish: 'alerts/subscribe',
        subscribe: 'alerts/subscribe',
        user: 'user',
        unsubscribe: 'alerts/unsubscribe'
    })

var DEFAULT_USER_DATA = {role: 'employee', orgnum: '', userid: '', snl_id: '', first_name: '', last_name: ''};

;
