'use strict';

angular.module('insideApp')
    /**
     * @ngdoc controller
     * @name insideApp.controller:RssCtrl
     * @description Rss Controller of the insideApp
     */
    .controller('RssCtrl', ['insideApiModel', 'API_URL', 'ENV', '$scope', '$http',
      function (insideApiModel, API_URL, ENV, $scope, $http) {
      this.fetching = true;

      this.getTemplateUrl = function () {
        return $scope.template;
      };

      var self = this;
      insideApiModel.fetch(API_URL[$scope.url]).then(function (data) {
        //reset error
        $scope.error = false;
        self.error = false;
        self.data = data;
        self.fetching = false;
      }, function () {
        $scope.error = true;
        self.error = true;
        self.data = [];
        self.fetching = false;
      });

      /**
       * @ngdoc method
       * @name fetchFeedResults
       * @methodOf insideApp.controller:RssCtrl
       * @description - fetch the rss feed insideApiModel.fetch method passing in linkUrl
       */
      this.fetchFeedResults = function (group, feed, linkUrl) {
        if (typeof this.data[group].feeds[feed].articles === 'undefined') {
          this.data[group].feeds[feed].fetchingFeed = true;
          insideApiModel.fetch('rssFeed', linkUrl).then(function (feedData) {
            var refreshedOn = new Date().toLocaleString();
            self.data[group].feeds[feed].refreshedOn = refreshedOn;
            self.data[group].feeds[feed].articles = feedData;
            self.data[group].feeds[feed].fetchingFeed = false;
          });
        }
      };

      /**
       * @ngdoc method
       * @name clearFeedResults
       * @methodOf insideApp.controller:RssCtrl
       * @description - clear the rss feed results
       */
      this.clearFeedResults = function (group, feed, linkUrl) {
        delete this.data[group].feeds[feed].articles;
        this.fetchFeedResults(group, feed, linkUrl);
      };

      this.saveExpanded = function (groupId, feedIndex, expanded){
        var exp = expanded ? '1' : '0';
        var data = {
          expanded: exp
        };

        var urlSuffix = '/rss-' + groupId;
        if (feedIndex !== ''){
          urlSuffix += '-' + feedIndex;
        }
        
        $http.put(ENV.insideApiUrl + API_URL.preferences + urlSuffix, data)
            .then(function (response) {
            }, function (error) {
              console.error('An error occurred updating expanded.', error.data);
            });
      };

    }]);
