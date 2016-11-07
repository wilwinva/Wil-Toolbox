'use strict';

/**
 * @ngdoc overview
 * @project Inside
 * @name insideApp
 * @description
 * # insideApp
 *
 * Main module of the application.
 * This app requires the userid and userRole cookies to be set
 * in the page header since it only loads once for the application.
 * This will ensure the cookies are set if a url is bookmarked.
 * The cookies are updated when preferences are loaded (to catch if the impersonate route is loaded).
 */
angular
    .module('insideApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'angularUtils.directives.dirPagination',
        'ngDialog',
        'ngAria',
        'snlCommon',
        'insideApp.config.constants',
        'insideApp.models'
    ])
    .run(['$rootScope', '$timeout', '$window', '$location', '$state', '$stateParams',
        function ($rootScope, $timeout, $window, $location, $state) {
            $rootScope.angular = angular;

            $rootScope.$on(
                '$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams) {
                    if (toState.externalUrl) {
                        event.preventDefault();
                        $window.open(toState.externalUrl, '_self');
                    }
                }
            );

            $rootScope.$on('$stateChangeSuccess', function () {
                //console.debug('***************************In run().stateChangeSuccess');
                var title = getTitleValue($state.$current.locals.globals.$title);
                $timeout(function () {
                    $rootScope.$title = title;
                });
            });

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                console.error('stateChangeError toState:  ' + toState + 'error: ' + error.error);
                if (error.error == 500) {
                    $state.go('inside.error');
                }
                else if (error.error == 403) {
                    $state.go('inside.notAuthorized');
                }
                else {
                    $state.go('inside.notFound');
                }
            });

            $rootScope.$on('$stateNotFound', function () {
                $state.go('inside.notFound');
            });

            $rootScope.$on('$locationChangeSuccess', function () {
                $rootScope.previousLocation = $rootScope.actualLocation;
                $rootScope.actualLocation = $location.path();
            });

            function getTitleValue(title) {
                return angular.isFunction(title) ? title() : title;
            }
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$sceDelegateProvider', '$locationProvider', 'ENV', 'API_URL',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider, $locationProvider, ENV, API_URL) {
            $httpProvider.defaults.withCredentials = true; // Allow cookies with ajax

            // use the HTML5 History API
            //TODO:$locationProvider.html5Mode({enabled: true, requireBase: true, rewriteLinks: true});

            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                'self',
                // Allow loading from our assets domain.  Notice the difference between * and **.
                'https://info.sandia.gov/**'
            ]);

            // For any unmatched url, redirect to the home page
            $urlRouterProvider.otherwise('/'); //needs to be '' or category pages break from browse techweb


            $stateProvider
                .state('search', { //search redirect
                    url: '/search',
                    externalUrl: ENV.appUrl + 'search/#/'
                })
                .state('smi', { //smi redirect
                    url: '/smi',
                    externalUrl: ENV.appUrl + 'smi/#/'
                })
                .state('inside', {
                    abstract: true,
                    url: '/',
                    templateUrl: 'app/components/wrapper.tpl.html',
                    controller: 'UserCtrl as userCtrl',
                    resolve: {
                        user: ['$q', '$interval', '$cookies', 'insideApiModel', 'ENV', 'API_URL',
                            function ($q, $interval, $cookies, insideApiModel, ENV, API_URL) {
                                var userIdParam = null;
                                var path = window.location.hash;
                                if(path.substr(0, 7) === '#/user/'){
                                    userIdParam = path.substr(7);
                                }
                                if (!ENV.isStatic) {
                                    return setAuthCookie($q, $interval, insideApiModel, ENV, API_URL, userIdParam).then(function (data) {
                                        insideApiModel.storeCookies(data);
                                        return data;
                                    }, function () {
                                        insideApiModel.storeCookies(DEFAULT_USER_DATA);
                                        return DEFAULT_USER_DATA;
                                    });
                                }
                                else {
                                    return retrieveUser($q, insideApiModel, API_URL).then(function (data) {
                                        insideApiModel.storeCookies(data); //because we are serving locally from http must be unsecure
                                        return data;
                                    }, function () {
                                        insideApiModel.storeCookies(DEFAULT_USER_DATA);
                                        return DEFAULT_USER_DATA;
                                    });
                                }
                            }
                        ]
                    }
                })
                .state('inside.home', {
                    url: '',
                    templateUrl: 'app/components/portal/portal.tpl.html',
                    controller: 'PreferencesCtrl as prefCtrl',
                    resolve: {
                        preferences: ['user', '$q', 'insideApiModel', 'API_URL', function (user, $q, insideApiModel, API_URL) { //dependent on user loading
                            var defer = $q.defer();
                            defer.resolve(insideApiModel.fetch(API_URL.preferences));

                            return defer.promise.then(function (data) {
                                    return data;
                                },
                                function () {
                                    return DEFAULT_PREFERENCE_DATA;
                                });
                        }],
                        $title: function () {
                            return 'Home';
                        }
                    }
                })
                .state('inside.impersonate', {
                    url: 'user/:id', //id can be an snlId or username
                    templateUrl: 'app/components/portal/portal.tpl.html',
                    controller: 'PreferencesCtrl as prefCtrl',
                    resolve: {
                        preferences: ['user', '$q', 'insideApiModel', 'API_URL',
                            function (user, $q, insideApiModel, API_URL) { //don't call this until id and impersonatedUser load
                                var defer = $q.defer();
                                defer.resolve(insideApiModel.fetch(API_URL.preferences));
                                return defer.promise;
                            }],
                        $title: ['$stateParams', function ($stateParams) {
                            return 'Impersonate ' + $stateParams.id;
                        }]
                    }
                })
                .state('inside.contact', {
                    url: 'contact',
                    templateUrl: 'app/components/contactUs.tpl.html',
                    resolve: {
                        $title: function () {
                            return 'Contact Us';
                        }
                    }
                })
                .state('inside.alertsHelp', {
                    url: 'alertsHelp',
                    templateUrl: 'app/components/alerts-help.tpl.html',
                    resolve: {
                        $title: function () {
                            return 'Alerts/Help';
                        }
                    }
                })
                .state('inside.sandiaAddresses', {
                    url: 'sandiaAddresses',
                    templateUrl: 'app/components/sandiaAddresses.tpl.html',
                    resolve: {
                        $title: function () {
                            return 'Sandia Addresses';
                        }
                    }
                })
                .state('inside.alphabetIndex', {
                    url: 'links/:letter',
                    templateUrl: 'app/components/alphabet/alphabetIndexContent.tpl.html',
                    controller: 'AlphabetIndexContentCtrl as alphabetIndexCtrl',
                    resolve: {
                        curlData: ['insideApiModel', '$stateParams', function (insideApiModel, $stateParams) {
                            return insideApiModel.fetch(API_URL.alphabetIndex + '/' + $stateParams.letter);
                        }],
                        $title: ['$filter', '$stateParams', function ($filter, $stateParams) {
                            return 'Index - ' + $filter('uppercase')($stateParams.letter);
                        }],
                        $letter: ['$filter', '$stateParams', function ($filter, $stateParams) {
                            return $stateParams.letter;
                        }]
                    }
                })
                .state('inside.categoriesFromMenu', {
                    url: 'menu/:page',
                    templateUrl: 'app/components/category/categoryFromMenu.tpl.html',
                    controller: 'CategoryCtrl as categoryCtrl',
                    resolve: {
                        menuData: ['insideApiModel', '$stateParams', function (insideApiModel, $stateParams) {
                            return insideApiModel.fetch(API_URL.categories + '/' + $stateParams.page + '.toc');
                        }],
                        curlData: ['insideApiModel', '$stateParams', function (insideApiModel, $stateParams) {
                            return insideApiModel.fetch(API_URL.categories + '/' + $stateParams.page);
                        }],
                        page: ['$stateParams', function ($stateParams) {
                            return $stateParams.page;
                        }],
                        section: [function () {
                            return '';
                        }],
                        $title: ['$stateParams', function ($stateParams) {
                            return 'Menu - ' + $stateParams.page;
                        }]
                    }
                })
                .state('inside.categories', {
                    url: 'categories/:page/:section', //note that this url is hardcoded into category.js
                    templateUrl: 'app/components/category/category.tpl.html',
                    controller: 'CategoryCtrl as categoryCtrl',
                    resolve: {
                        menuData: ['insideApiModel', '$stateParams', function (insideApiModel, $stateParams) {
                            return insideApiModel.fetch(API_URL.categories + '/' + $stateParams.page + '.toc');
                        }],
                        curlData: ['insideApiModel', '$stateParams', function (insideApiModel, $stateParams) {
                            return insideApiModel.fetch(API_URL.categories + '/' + $stateParams.page);
                        }],
                        page: ['$stateParams', function ($stateParams) {
                            return $stateParams.page;
                        }],
                        section: ['$stateParams', function ($stateParams) {
                            return $stateParams.section;
                        }],
                        $title: ['$stateParams', function ($stateParams) {
                            var title = $stateParams.page;
                            if ($stateParams.section != '') {
                                title = title + ' - ' + $stateParams.section;
                            }
                            return title;
                        }]
                    }
                })
                .state('inside.soma', {
                    url: 'soma',
                    template: '<snl-api-content ctrl-name="ApiCtrl" error="error" url="soma" template="app/components/portal/soma.tpl.html"></snl-api-content>',
                    resolve: {
                        $title: function (){
                            return "State of my Application"
                        }
                    }
                })
                .state('inside.notFound', {
                    url: 'NotFound',
                    templateUrl: 'app/components/error/404.html',
                    resolve: {
                        $title: function () {
                            return 'Not Found';
                        }
                    }
                })
                .state('inside.notAuthorized', {
                    url: 'NotAuthorized',
                    templateUrl: 'app/components/error/403.html',
                    resolve: {
                        $title: function () {
                            return 'Not Authorized';
                        }
                    }
                })
                .state('inside.error', {
                    url: 'Error',
                    templateUrl: 'app/components/error/500.html',
                    resolve: {
                        $title: function () {
                            return 'Error';
                        }
                    }
                });

            /**
             * This bipasses the auth cookie for testing with static data
             * @param $q
             * @param $interval
             * @param insideApiModel
             * @param ENV
             * @param API_URL
             * @param id
             * @returns {*}
             */
            function retrieveUser($q, insideApiModel, API_URL) {
                var defer = $q.defer();
                defer.resolve(insideApiModel.fetch(API_URL.user));
                return defer.promise;
            }

            /**
             * This is a hack to get around the Shibboleth 302 redirects when authenticating cross-site.
             * The image being retrieved sets a cookie on the server, so that subsequent requests do not
             * get redirected.
             *
             * This checks the image is ready by testing its width.
             * @param $q
             * @param $interval
             * @param insideApiModel
             * @param ENV
             * @param API_URL
             * @param id
             * @returns {*}
             */
            function setAuthCookie($q, $interval, insideApiModel, ENV, API_URL, id) {
                var randomNumber = new Date().getTime();
                var img = document.createElement('img');
                img.src = ENV.insideApiUrl + 'empty.png?cache=' + randomNumber;
                img.id = 'cookieImage';
                img.style.visibility = 'hidden';
                var srcHolder = document.getElementsByTagName('body')[0];
                srcHolder.appendChild(img);
                var defer = $q.defer();
                var imageCheck = function () {
                    if (img.width === 1) {
                        $('#cookieImage').remove();
                        $interval.cancel(timer);
                        if (id) {
                            defer.resolve(insideApiModel.fetch(API_URL.user, id));
                        }
                        else {
                            defer.resolve(insideApiModel.fetch(API_URL.user));
                        }
                    }
                };

                var timer = $interval(imageCheck, 100);
                return defer.promise;
            }

            var DEFAULT_USER_DATA = {role: 'employee', orgnum: '', userid: '', snl_id: '', first_name: '', last_name: ''};
            var DEFAULT_PREFERENCE_DATA = {
                portletExpanded: {
                    aroundSandia: 0, browseTechweb: 0,
                    corpWorkbox: 0, trainingCompliance: 0, classroomEnrollments: 0, rss: 0, dirQuickSearch: 0,
                    links: 0, supportTeams: 0, vacation: 0, property: 0, jobs: 0, trainingByOrg: 0,
                    computersByOrg: 0
                }, hasRss: false
            };

        }
    ])
;
