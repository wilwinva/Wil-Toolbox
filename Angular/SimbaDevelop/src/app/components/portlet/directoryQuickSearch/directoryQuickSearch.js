'use strict';
angular.module('insideApp')
    /**
     * @ngdoc directive
     * @name insideApp.directive:snlDirectory
     * @restrict E
     * @replace true
     * @description used to build an DQS using templateUrl app/components/portlet/directoryQuickSearch/directoryQuickSearch.tpl.html and DirectoryCtrl
     */
    .directive('snlDirectory', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/portlet/directoryQuickSearch/directoryQuickSearch.tpl.html',
            controller: 'DirectoryCtrl as ctrl'
        };
    })

    /**
     * @ngdoc controller
     * @name insideApp.controller:DirectoryCtrl
     * @description DirectoryCtrl Quick Search Controller of the insideApp
     */
    .controller('DirectoryCtrl', ['sapleModel', '$rootScope', '$scope', '$window', 'ENV',
        function (sapleModel, $rootScope, $scope, $window, ENV) {
            var self = this;
            self.resultsDivId = "SNLDirectoryDisplay";
            self.noResultsFound = false;

            // Id's order of queries. Reject responses on prev queries when a later query has already returned
            self.callBackNumber = 0;
            self.curCallBack = 0;

            self.pageOptions = [5, 10, 25];
            self.pageSize = self.pageOptions[1];
            self.currentPage = 1;
            self.numRecords = 0;

            /**
             * @ngdoc method
             * @name clearSearchTerm
             * @methodOf insideApp.controller:DirectoryCtrl
             * @description - clear searchterm and reset interface
             */
            self.clearSearchTerm = function () {
                //reset error and root scope vars
                $scope.error = false;
                self.error = false;

                self.searchTerm = "";
                self.searchTermLength = 0;
                self.isOrg = false;//switch to trigger showing org link
                $rootScope.rosterInfo = [];

                $rootScope.searchTerm = "";
                self.noResultsFound = false;
                $rootScope.hasResult = false;
                $rootScope.numPersonnel = 0;
                $rootScope.quickSearchResults = [];

                self.currentPage = 1;
                self.showPagination = false;
                self.ename = '';
                self.dept = '';
                self.bldg = '';
                self.phone = '';
                self.mailstop = '';
                self.emailid = '';
                self.empltype = '';
            };

            if (!$rootScope.quickSearchResults) {
                self.clearSearchTerm();
            }
            else if ($rootScope.searchTerm) {
                self.searchTerm = $rootScope.searchTerm;
                self.searchTermLength = self.searchTerm.length;

                if ($rootScope.quickSearchResults && $rootScope.quickSearchResults.length > self.pageOptions[0]) {
                    self.showPagination = true;
                    self.currentPage = 1;
                }
            }

            /**
             * @ngdoc method
             * @name fetchResults
             * @methodOf insideApp.controller:DirectoryCtrl
             * @description - fetch the teaser messages from teasersModel.fetchTeasers method
             * @param {string} searchTerm - the term to search with can be a name, org
             */

            self.fetchResults = function (searchTerm) {
                searchTerm = searchTerm.toString();
                self.searchTermLength = searchTerm.length;

                // Only perform search when one of these criteria is met:
                // - term is a number other than 0
                // - term is not a number and has at least 2 characters
                if ((!isNaN(searchTerm) && searchTerm != 0) || (isNaN(searchTerm) && searchTerm.length > 1)) {

                    //reset error and root scope vars
                    $scope.error = false;
                    self.error = false;

                    self.searchTerm = searchTerm;
                    $rootScope.searchTerm = searchTerm;

                    self.callBackNumber++;

                    sapleModel.fetchResults(searchTerm, self.callBackNumber).then(function (data) {
                        if (data.callBackNumber > self.curCallBack) {
                            self.curCallBack = data.callBackNumber;

                            // Did the search return relevant data to display
                            if ((data.result && data.result.length > 0) ||
                                data.rosterInfo) {
                                //&& data.rosterInfo.childOrg && data.rosterInfo.childOrg.length > 0)) {

                                $rootScope.quickSearchResults = data.result;
                                if (data.result && data.result.length) {
                                    $rootScope.numPersonnel = data.result.length;
                                    self.numRecords = data.result.length;
                                }
                                else {
                                    $rootScope.numPersonnel = 0;
                                    self.numRecords = 0;
                                }
                                $rootScope.hasResult = true;

                                if (data.result && data.result.length > self.pageSize) {
                                    self.showPagination = true;
                                    self.currentPage = 1;
                                }
                                else {
                                    self.showPagination = false;
                                }

                                if (isNaN(searchTerm)) {
                                    self.isOrg = false;
                                }
                                else {
                                    self.isOrg = true;
                                    $rootScope.rosterInfo = data.rosterInfo;
                                }

                                self.noResultsFound = false;
                            }
                            else {
                                $rootScope.quickSearchResults = [];
                                $rootScope.numPersonnel = 0;
                                self.numRecords = 0;
                                $rootScope.hasResult = false;
                                self.isOrg = false;
                                self.showPagination = false;
                                self.noResultsFound = true;
                            }
                        }

                    }, function (reason) {
                        console.error('Directory Quick search error: ' + reason.error);
                        $scope.error = true;
                        self.error = true;
                        $rootScope.quickSearchResults = [];
                        $rootScope.numPersonnel = 0;
                        $rootScope.hasResult = false;
                        self.showPagination = false;
                        self.noResultsFound = true;
                        self.numRecords = 0;
                    });
                }
                else { // reset search
                    var temp = self.searchTerm;
                    self.clearSearchTerm();
                    self.searchTerm = temp;
                }
            };

            self.singleResultsUrl = ENV.sapleSingleRecordUrl;
            self.sapleMultipleRecordsUrl = ENV.sapleMultipleRecordsUrl;

            /**
             * @ngdoc method
             * @name fetchSingleResults
             * @methodOf insideApp.controller:DirectoryCtrl
             * @description - build a search string based on form fields
             */
            this.fetchSingleResults = function () {
                var advQuery = "";

                if (self.ename != '') {
                    advQuery += self.ename;
                }
                if (self.dept != '') {
                    if (advQuery.length > 0) {
                        advQuery += "+";
                    }
                    advQuery += "org:" + self.dept;
                }
                if (self.bldg != '') {
                    if (advQuery.length > 0) {
                        advQuery += "+";
                    }
                    advQuery += "bldg:" + self.bldg;
                }
                if (self.phone != '') {
                    if (advQuery.length > 0) {
                        advQuery += "+";
                    }
                    advQuery += "phone:" + self.phone;
                }
                if (self.mailstop != '') {
                    if (advQuery.length > 0) {
                        advQuery += "+";
                    }
                    advQuery += "mailstop:" + self.mailstop;
                }
                if (self.emailid != '') {
                    if (advQuery.length > 0) {
                        advQuery += "+";
                    }
                    advQuery += "userid:" + self.emailid;
                }
                if (self.empltype != '') {
                    if (advQuery.length > 0) {
                        advQuery += "+";
                    }
                    advQuery += "type:" + self.empltype;
                }
                if (advQuery.length > 0) {
                    self.singleResultsUrl += advQuery;
                    $window.location.href = self.singleResultsUrl;
                }
            };
        }]);
