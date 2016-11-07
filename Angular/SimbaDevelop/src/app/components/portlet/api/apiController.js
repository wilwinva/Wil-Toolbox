'use strict';
angular.module('insideApp')
    /**
     * @ngdoc controller
     * @name insideApp.controller:ApiCtrl
     * @description DirectoryCtrl Quick Search Controller of the insideApp
     */
    .controller('ApiCtrl', ['insideApiModel', 'API_URL', 'ENV', '$scope', /*'$timeout',*/ function (insideApiModel, API_URL, ENV, $scope/*, $timeout*/) {
        var self = this;  // 'this' keyword unavailable inside promise callback
        self.fetching = true;
        self.orgnum = $scope.orgnum;

        self.orgUrl = ENV.orgUrl;
        self.tedsUrl = ENV.tedsUrl;
        self.mySupportTeamContactsUrl = ENV.mySupportTeamContactsUrl;
        self.digsUrl = ENV.digsUrl;
        self.vacationBalanceUrl = ENV.vacationBalanceUrl;
        self.timesheetUrl = ENV.timesheetUrl;
        self.propertyPageUrl = ENV.propertyPageUrl;

        self.pageOptions = [5, 10, 25];
        self.pageSize = self.pageOptions[0];
        self.showPagination = false;
        self.numRecords = 0;

        /**
         * @ngdoc method
         * @name renderPagination
         * @methodOf insideApp.controller:ApiCtrl
         * @description - show pagination or not
         */
        self.renderPagination = function () {
            self.showPagination = true;
        };

        /**
         * @ngdoc method
         * @name getTemplateUrl
         * @methodOf insideApp.controller:ApiCtrl
         * @description - get the templateUrl to use
         */
        self.getTemplateUrl = function () {
            return $scope.template;
        };

        /**
         * @ngdoc method
         * @name fetchApiResults
         * @methodOf insideApp.controller:ApiCtrl
         * @description - fetch results
         */
        self.fetchApiResults = function (orgNum) {
            if (orgNum) {
                if (isNaN(orgNum)) {
                    alert('Please enter a Org number.');
                    return;
                }
                if (orgNum.length < 5) {
                    for (var a = orgNum.length; a < 5; a++) {
                        orgNum = "0" + orgNum;
                    }
                    self.orgnum = orgNum;
                }
            }
//            $timeout(function() {self.fetching = false; }, 10000);
            insideApiModel.fetch(API_URL[$scope.url], orgNum).then(function (data) {
                //reset error
                $scope.error = false;
                self.error = false;

                self.data = data;
                if (self.data){
                    self.numRecords = self.data.length;
                    if (typeof(self.numRecords) == 'undefined'){
                        // Computers by Org returns data in different format. Probably deserves its own controller.
                        if (typeof (self.data.computers) != 'undefined'){
                            self.numRecords = self.data.computers.length;
                        } else {
                            self.numRecords = 0;
                        }
                    }
                }
                else {
                    self.numRecords = 0;
                }
                self.showPagination = self.numRecords > self.pageOptions[0];
                self.fetching = false;
            }, function (reason) {
                console.error('ApiController results not found WS error: ' + reason);
                $scope.error = true;
                self.error = true;
                self.data = [];
                self.fetching = false;
                self.showPagination = false;
            });
        };

        self.fetching = true;
        self.fetchApiResults();

        /**
         * @ngdoc method
         * @name sort
         * @methodOf insideApp.controller:ApiCtrl
         * @description - sort ascending, decending
         */
        self.sort = function (keyname) {
            if (self.sortKey == keyname) {
                self.reverse = !self.reverse;//if true make it false and visa versa
            } else {
                self.sortKey = keyname;//set the sortkey to the param passed
                self.reverse = false;//if true make it false and visa versa
            }
        };

        self.updateExpand = function (portlet) {
        };
    }])
    .constant('API_URL', {
        alphabetIndex: 'alphaIndex',
        categories: 'categories',
        classroomEnrollments: 'classroomEnrollments',
        computersByOrg: 'computersByOrg',
        groups: 'groups',
        jobs: 'jobs',
        links: 'links',
        preferences: 'preferences',
        property: 'property',
        rss: 'rss',
        rssFeed: 'rssFeed',
        soma : 'soma',
        supportTeam: 'supportTeams',
        trainingByOrg: 'trainingByOrg',
        trainingCompliance: 'trainingCompliance',
        user: 'user',
        vacation: 'vacation'
    })
;
